import React, { useEffect } from 'react';
import { BlogPost, ServiceItem } from '../types';
import { getWhatsAppBookingUrl } from '../lib/whatsapp';
import { 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  ArrowLeft, 
  MessageSquare, 
  ArrowRight, 
  Wrench,
  Check
} from 'lucide-react';

interface BlogPostViewProps {
  post: BlogPost;
  allPosts: BlogPost[];
  services: ServiceItem[];
  navigate: (path: string) => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ post, allPosts, services, navigate }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    document.title = `${post.title} | SST CARE Blog`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', post.seoDescription || post.excerpt);
    }
  }, [post]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch {
        // User cancelled or failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 2);
  const featuredServices = services.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Schema.org BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.featuredImage,
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt || post.publishedAt,
            "author": {
              "@type": "Person",
              "name": post.author?.name || "SST CARE Technical Desk"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SST CARE",
              "url": "https://www.sstcare.com"
            },
            "description": post.excerpt
          })
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => navigate('/')} className="hover:text-slate-800 transition-colors">Home</button>
        <span>/</span>
        <button onClick={() => navigate('/blog')} className="hover:text-slate-800 transition-colors">Blog</button>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-blue-700">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Published {post.publishedAt}
          </span>
          {post.updatedAt && (
            <>
              <span aria-hidden="true">·</span>
              <span>Updated {post.updatedAt.split('T')[0]}</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {post.readTimeMinutes || 4} min read
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b192c] tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Author & Share Bar */}
        <div className="flex items-center justify-between py-4 border-y border-slate-200 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900">{post.author?.name || 'SST CARE Team'}</p>
              <p className="text-slate-500">{post.author?.role || 'Electronics Specialist'}</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </header>

      {/* Featured Image */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md max-h-[440px] bg-slate-900">
        <img
          src={post.featuredImage || '/images/hero-technician.jpg'}
          alt={post.imageAlt || post.title}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Article Body */}
      <article 
        className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Tags:</span>
          {post.tags.map((t, idx) => (
            <span
              key={idx}
              className="text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* WhatsApp Doorstep Booking CTA */}
      <div className="bg-gradient-to-r from-[#0b192c] to-[#1e3e62] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold">
            Need Doorstep Laptop or Desktop Assistance in Mumbai?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100">
            Our expert technicians visit your home or office with diagnostic tools. No travel needed.
          </p>
        </div>
        <a
          href={getWhatsAppBookingUrl({ customMessage: `Hello SST CARE, I read your article "${post.title}" and would like to book a doorstep repair visit in Mumbai.` })}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* Related Services Links */}
      <section className="space-y-4 pt-6 border-t border-slate-200">
        <h3 className="text-base font-bold text-slate-900">
          Related Electronics Services in Mumbai
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {featuredServices.map(s => (
            <button
              key={s.id}
              onClick={() => {
                navigate(`/services/${s.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-3 text-left rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-400 transition-colors flex items-center justify-between group"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">{s.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{s.startingPrice ? `From ${s.startingPrice}` : 'Doorstep Visit'}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-200">
          <h3 className="text-base font-bold text-slate-900">
            More Technical Guides
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map(rel => (
              <div
                key={rel.id}
                onClick={() => {
                  navigate(`/blog/${rel.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-400 cursor-pointer transition-colors space-y-2 group"
              >
                <span className="text-[11px] text-blue-700 font-semibold">{rel.category}</span>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">{rel.excerpt}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
