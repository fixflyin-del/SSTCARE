import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Search, Calendar, Clock, ChevronRight, Tag, BookOpen, ArrowRight } from 'lucide-react';

interface BlogListViewProps {
  posts: BlogPost[];
  filterCategory?: string;
  filterTag?: string;
  navigate: (path: string) => void;
}

export const BlogListView: React.FC<BlogListViewProps> = ({ 
  posts, 
  filterCategory, 
  filterTag, 
  navigate 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>(filterCategory || 'all');

  // Gather categories
  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean)));

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCat === 'all' || p.category === selectedCat;
    const matchesTag = !filterTag || p.tags.includes(filterTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  const featuredPost = posts[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-slate-800 transition-colors">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Blog &amp; Hardware Guides</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b192c] tracking-tight">
              Electronics Repair &amp; Maintenance Guides
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Technical insights, cooling best practices, and laptop troubleshooting advice from our Mumbai repair technicians.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-blue-600 shadow-2xs"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedCat === 'all'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Guides
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCat === cat
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Article (if no search or specific filter) */}
      {!searchTerm && selectedCat === 'all' && !filterTag && featuredPost && (
        <section 
          onClick={() => {
            navigate(`/blog/${featuredPost.slug}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-lg transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto overflow-hidden bg-slate-900">
            <img
              src={featuredPost.featuredImage || '/images/hero-technician.jpg'}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-blue-700">{featuredPost.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {featuredPost.publishedAt}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {featuredPost.readTimeMinutes || 4} min read
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                {featuredPost.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => {
              navigate(`/blog/${post.slug}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="h-48 overflow-hidden bg-slate-900">
                <img
                  src={post.featuredImage || '/images/hero-technician.jpg'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-blue-700">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTimeMinutes || 4}m read</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between text-xs border-t border-slate-100 mt-2">
              <span className="font-medium text-slate-500">
                By {post.author?.name || 'SST CARE'}
              </span>
              <span className="text-blue-700 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Read guide <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-800">No blog articles match your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCat('all');
            }}
            className="mt-3 text-xs font-semibold text-blue-700 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
