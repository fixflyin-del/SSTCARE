import express, { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { db } from './src/server/db';
import { parseWordPressExport } from './src/server/wordpressParser';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sstcare2026';
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'sstcare_secure_session_key_2026';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Static files in /public
app.use(express.static(path.resolve(process.cwd(), 'public')));

// Open admin access - no password or credentials required
function isAdminAuthenticated(_req: Request): boolean {
  return true;
}

function requireAdminAuth(_req: Request, _res: Response, next: NextFunction) {
  return next();
}

// -------------------------------------------------------------
// 301 Redirect Middleware (Preserves old WordPress URLs)
// -------------------------------------------------------------
app.use((req: Request, res: Response, next: NextFunction) => {
  const reqPath = req.path;
  const redirects = db.getRedirects();
  
  // Exact or normalized match
  const match = redirects.find(r => {
    const s = r.sourcePath.replace(/\/+$/, '');
    const p = reqPath.replace(/\/+$/, '');
    return s.toLowerCase() === p.toLowerCase();
  });

  if (match) {
    return res.redirect(match.statusCode || 301, match.targetPath);
  }
  next();
});

// -------------------------------------------------------------
// Public SEO Routes: /sitemap.xml and /robots.txt
// -------------------------------------------------------------
app.get('/robots.txt', (req: Request, res: Response) => {
  const settings = db.getSettings();
  const domain = settings.websiteUrl || 'https://www.sstcare.com';
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/

Sitemap: ${domain}/sitemap.xml
`;
  res.setHeader('Content-Type', 'text/plain');
  res.send(robots);
});

app.get('/sitemap.xml', (req: Request, res: Response) => {
  const settings = db.getSettings();
  const domain = settings.websiteUrl || 'https://www.sstcare.com';
  const services = db.getServices();
  const blogs = db.getBlogPosts();

  const staticPages = [
    { loc: '/', changefreq: 'daily', priority: '1.0' },
    { loc: '/services', changefreq: 'weekly', priority: '0.9' },
    { loc: '/about-us', changefreq: 'monthly', priority: '0.8' },
    { loc: '/contact-us', changefreq: 'monthly', priority: '0.8' },
    { loc: '/blog', changefreq: 'daily', priority: '0.9' },
    { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    { loc: '/terms-and-conditions', changefreq: 'yearly', priority: '0.3' },
    { loc: '/disclaimer', changefreq: 'yearly', priority: '0.3' },
    { loc: '/service-policy', changefreq: 'yearly', priority: '0.3' }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  staticPages.forEach(p => {
    xml += `  <url>
    <loc>${domain}${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>\n`;
  });

  services.forEach(s => {
    xml += `  <url>
    <loc>${domain}/services/${s.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
  });

  blogs.forEach(b => {
    // Root slug URL (exact original WordPress permalink)
    xml += `  <url>
    <loc>${domain}/${b.slug}</loc>
    <lastmod>${b.updatedAt || b.publishedAt || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    // /blog/slug URL
    xml += `  <url>
    <loc>${domain}/blog/${b.slug}</loc>
    <lastmod>${b.updatedAt || b.publishedAt || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  });

  xml += `</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.send(xml);
});

// -------------------------------------------------------------
// Authentication Endpoints (Open Access - No credentials needed)
// -------------------------------------------------------------
app.post('/api/admin/login', (_req: Request, res: Response) => {
  return res.json({ success: true, message: 'Admin access granted' });
});

app.get('/api/admin/verify', (_req: Request, res: Response) => {
  return res.json({ authenticated: true });
});

app.post('/api/admin/logout', (_req: Request, res: Response) => {
  return res.json({ success: true });
});

// -------------------------------------------------------------
// Services Endpoints
// -------------------------------------------------------------
app.get('/api/services', (req: Request, res: Response) => {
  const all = req.query.all === 'true' && isAdminAuthenticated(req);
  const services = db.getServices(all);
  return res.json(services);
});

app.get('/api/services/:slug', (req: Request, res: Response) => {
  const service = db.getServiceBySlug(req.params.slug);
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }
  return res.json(service);
});

app.put('/api/services/:id', requireAdminAuth, (req: Request, res: Response) => {
  const updated = db.updateService(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Service not found to update' });
  }
  return res.json(updated);
});

// -------------------------------------------------------------
// Reviews Endpoints
// -------------------------------------------------------------
app.get('/api/reviews', (req: Request, res: Response) => {
  const all = req.query.all === 'true' && isAdminAuthenticated(req);
  const reviews = db.getReviews(all);
  return res.json(reviews);
});

app.post('/api/reviews', requireAdminAuth, (req: Request, res: Response) => {
  const { authorName, rating, text, date, sourceUrl, isVerified, isPublished, displayOnHome, location, deviceRepaired } = req.body;
  if (!authorName || !text || !rating) {
    return res.status(400).json({ error: 'Author name, rating, and review text are required' });
  }
  const created = db.addReview({
    authorName,
    rating: Number(rating),
    text,
    date: date || new Date().toISOString().split('T')[0],
    sourceUrl: sourceUrl || 'https://maps.app.goo.gl/RgC4ZUFohx93mFne8',
    isVerified: Boolean(isVerified),
    isPublished: isPublished !== false,
    displayOnHome: displayOnHome !== false,
    location,
    deviceRepaired
  });
  return res.json(created);
});

app.put('/api/reviews/:id', requireAdminAuth, (req: Request, res: Response) => {
  const updated = db.updateReview(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Review not found' });
  }
  return res.json(updated);
});

app.delete('/api/reviews/:id', requireAdminAuth, (req: Request, res: Response) => {
  const deleted = db.deleteReview(req.params.id);
  return res.json({ success: deleted });
});

// -------------------------------------------------------------
// Blog Endpoints
// -------------------------------------------------------------
app.get('/api/blog', (req: Request, res: Response) => {
  const all = req.query.all === 'true' && isAdminAuthenticated(req);
  const posts = db.getBlogPosts(all);
  return res.json(posts);
});

app.get('/api/blog/:slug', (req: Request, res: Response) => {
  const post = db.getBlogPostBySlug(req.params.slug);
  if (!post) {
    return res.status(404).json({ error: 'Blog article not found' });
  }
  return res.json(post);
});

app.post('/api/blog', requireAdminAuth, (req: Request, res: Response) => {
  const { title, slug, excerpt, content, featuredImage, category, tags, author, status, seoTitle, seoDescription, canonicalUrl } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const created = db.addBlogPost({
    title,
    slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    excerpt: excerpt || content.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
    content,
    featuredImage: featuredImage || '/images/hero-technician.jpg',
    category: category || 'General Care',
    tags: Array.isArray(tags) ? tags : ['Laptop Repair'],
    author: author || { name: 'SST CARE Technical Desk', role: 'Hardware Specialist' },
    publishedAt: new Date().toISOString().split('T')[0],
    status: status || 'published',
    seoTitle,
    seoDescription,
    canonicalUrl
  });
  return res.json(created);
});

app.put('/api/blog/:id', requireAdminAuth, (req: Request, res: Response) => {
  const updated = db.updateBlogPost(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Blog article not found' });
  }
  return res.json(updated);
});

app.delete('/api/blog/:id', requireAdminAuth, (req: Request, res: Response) => {
  const deleted = db.deleteBlogPost(req.params.id);
  return res.json({ success: deleted });
});

// -------------------------------------------------------------
// Settings Endpoints
// -------------------------------------------------------------
app.get('/api/settings', (req: Request, res: Response) => {
  return res.json(db.getSettings());
});

app.put('/api/settings', requireAdminAuth, (req: Request, res: Response) => {
  const updated = db.updateSettings(req.body);
  return res.json(updated);
});

// -------------------------------------------------------------
// WordPress Migration Endpoints
// -------------------------------------------------------------
app.post('/api/admin/wordpress-import', requireAdminAuth, (req: Request, res: Response) => {
  const { xmlContent } = req.body;
  if (!xmlContent || typeof xmlContent !== 'string') {
    return res.status(400).json({ error: 'Valid WordPress XML content string required' });
  }

  try {
    const parseResult = parseWordPressExport(xmlContent);
    // Add redirects to DB
    parseResult.redirects.forEach(r => db.addRedirect(r));
    // Save imported articles and migration report
    db.addMigrationBatch(parseResult.posts, parseResult.report);

    return res.json({
      success: true,
      importedPostsCount: parseResult.posts.length,
      redirectsCreatedCount: parseResult.redirects.length,
      report: parseResult.report
    });
  } catch (err: any) {
    console.error('WordPress import error:', err);
    return res.status(500).json({ error: `Failed to parse WordPress XML: ${err?.message || err}` });
  }
});

app.get('/api/admin/migration-report', requireAdminAuth, (req: Request, res: Response) => {
  return res.json({
    history: db.getMigrationHistory(),
    redirects: db.getRedirects()
  });
});

// -------------------------------------------------------------
// Vite Middlewares in Dev / Static index.html in Prod
// -------------------------------------------------------------
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SST CARE Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
});
