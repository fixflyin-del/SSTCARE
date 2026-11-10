import { XMLParser } from 'fast-xml-parser';
import { BlogPost, MigrationReportItem, UrlRedirect } from '../types';

export interface ParseResult {
  posts: BlogPost[];
  redirects: UrlRedirect[];
  report: MigrationReportItem[];
  rawCount: number;
}

export function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#038;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#([0-9]{1,7});/g, (_, num) => String.fromCharCode(parseInt(num, 10)));
}

export function parseWordPressExport(xmlContent: string): ParseResult {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    textNodeName: "#text",
    cdataPropName: "__cdata",
    trimValues: true,
    isArray: (name) => {
      return ['item', 'category', 'wp:postmeta'].indexOf(name) !== -1;
    }
  });

  const parsed = parser.parse(xmlContent);
  const items = parsed?.rss?.channel?.item || [];

  const rawPosts: BlogPost[] = [];
  const redirects: UrlRedirect[] = [];
  const report: MigrationReportItem[] = [];

  for (const item of items) {
    const postType = getText(item['wp:post_type']);
    if (postType && postType !== 'post' && postType !== 'page') {
      continue;
    }

    const rawTitle = getText(item.title) || 'Untitled Post';
    const title = decodeHtmlEntities(rawTitle).trim();
    let rawSlug = getText(item['wp:post_name']) || generateSlug(title);
    if (!rawSlug || rawSlug === '__trashed' || rawSlug.startsWith('trashed-')) {
      rawSlug = generateSlug(title);
    }
    const slug = rawSlug;

    const content = getText(item['content:encoded']) || getText(item.description) || '';
    // Skip empty dummy drafts without title or content
    if (!content && title === 'Untitled Post') continue;

    const rawExcerpt = getText(item['excerpt:encoded']) || stripHtml(content).slice(0, 160) + '...';
    const excerpt = decodeHtmlEntities(rawExcerpt).trim();
    const pubDate = getText(item['wp:post_date']) || getText(item.pubDate) || new Date().toISOString();
    const link = getText(item.link) || '';

    // Categories & Tags
    const categories: string[] = [];
    const tags: string[] = [];

    const rawCats = item.category || [];
    const catArray = Array.isArray(rawCats) ? rawCats : [rawCats];
    for (const cat of catArray) {
      const domain = cat['@_domain'];
      const val = decodeHtmlEntities(getText(cat)).trim();
      if (!val) continue;
      if (domain === 'category') {
        categories.push(val);
      } else if (domain === 'post_tag') {
        tags.push(val);
      }
    }

    // Extract meta fields (Yoast / RankMath SEO)
    const postMetas = item['wp:postmeta'] || [];
    const metaArray = Array.isArray(postMetas) ? postMetas : [postMetas];
    let seoTitle = '';
    let seoDescription = '';
    let canonicalUrl = '';

    for (const meta of metaArray) {
      const key = getText(meta['wp:meta_key']);
      const value = getText(meta['wp:meta_value']);
      if (key === '_yoast_wpseo_title' || key === 'rank_math_title') {
        seoTitle = decodeHtmlEntities(value);
      }
      if (key === '_yoast_wpseo_metadesc' || key === 'rank_math_description') {
        seoDescription = decodeHtmlEntities(value);
      }
      if (key === '_yoast_wpseo_canonical' || key === 'rank_math_canonical_url') {
        canonicalUrl = value;
      }
    }

    // Count embedded images
    const imageMatches = content.match(/<img[^>]+src="([^">]+)"/g) || [];
    const imageCount = imageMatches.length;

    // Determine target URL and redirects
    // Primary URL is root slug /:slug (as requested by user) and /blog/:slug
    const rootPath = `/${slug}`;
    const blogPath = `/blog/${slug}`;
    let originalPath = '';
    if (link) {
      try {
        const parsedUrl = new URL(link);
        originalPath = parsedUrl.pathname;
      } catch {
        originalPath = link.startsWith('/') ? link : `/${link}`;
      }
    } else {
      originalPath = `/${slug}`;
    }

    const newPost: BlogPost = {
      id: `wp-${slug}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title,
      slug,
      excerpt,
      content,
      featuredImage: "/images/hero-technician.jpg",
      category: categories[0] || 'Hardware Repair Guides',
      tags: tags.length ? tags : ['Laptop Repair', 'Mumbai', 'Doorstep Service'],
      author: {
        name: decodeHtmlEntities(getText(item['dc:creator'])) || 'SST CARE Team',
        role: 'Certified Hardware Specialist'
      },
      publishedAt: pubDate.split(' ')[0] || new Date().toISOString().split('T')[0],
      status: 'published', // All integrated WordPress posts active
      seoTitle: seoTitle || `${title} | SST CARE Mumbai`,
      seoDescription: seoDescription || excerpt.slice(0, 155),
      canonicalUrl: canonicalUrl || `https://www.sstcare.com/${slug}`,
      originalWordPressUrl: link || originalPath,
      readTimeMinutes: Math.max(2, Math.ceil(stripHtml(content).split(/\s+/).length / 200))
    };

    rawPosts.push(newPost);

    report.push({
      id: `rep-${Date.now()}-${slug}`,
      originalUrl: originalPath,
      migratedUrl: rootPath,
      title,
      redirectStatus: 'Active on Original URL',
      seoStatus: seoTitle ? 'Original Preserved' : 'Synthesized from Article',
      imagesFound: imageCount,
      migratedAt: new Date().toISOString()
    });
  }

  // Deduplicate by slug, preferring items with longer content
  const slugMap = new Map<string, BlogPost>();
  for (const post of rawPosts) {
    const existing = slugMap.get(post.slug);
    if (!existing) {
      slugMap.set(post.slug, post);
    } else {
      if ((post.content?.length || 0) >= (existing.content?.length || 0)) {
        slugMap.set(post.slug, post);
      }
    }
  }

  const posts = Array.from(slugMap.values());

  return {
    posts,
    redirects,
    report,
    rawCount: items.length
  };
}

function getText(node: any): string {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (node.__cdata) return String(node.__cdata);
  if (node['#text']) return String(node['#text']);
  return '';
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

