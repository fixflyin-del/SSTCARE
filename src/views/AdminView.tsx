import React, { useState, useEffect } from 'react';
import { 
  ServiceItem, 
  ReviewItem, 
  BlogPost, 
  SiteSettings, 
  MigrationReportItem,
  UrlRedirect 
} from '../types';
import { parseWordPressExport } from '../server/wordpressParser';
import { 
  Lock, 
  LogOut, 
  Layers, 
  Wrench, 
  Star, 
  BookOpen, 
  Settings as SettingsIcon, 
  FileCode, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  AlertCircle, 
  Upload, 
  Eye, 
  ExternalLink,
  Save,
  ArrowRight
} from 'lucide-react';

interface AdminViewProps {
  services: ServiceItem[];
  reviews: ReviewItem[];
  blogPosts: BlogPost[];
  settings: SiteSettings;
  onRefreshData: () => Promise<void>;
  navigate: (path: string) => void;
  subSection?: string;
  onUpdateServices?: (services: ServiceItem[]) => void;
  onUpdateReviews?: (reviews: ReviewItem[]) => void;
  onUpdateBlogPosts?: (posts: BlogPost[]) => void;
  onUpdateSettings?: (settings: SiteSettings) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  services,
  reviews,
  blogPosts,
  settings,
  onRefreshData,
  navigate,
  subSection = 'dashboard',
  onUpdateServices,
  onUpdateReviews,
  onUpdateBlogPosts,
  onUpdateSettings
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'reviews' | 'blog' | 'settings' | 'migration'>(
    (subSection as any) || 'dashboard'
  );

  // Status feedback
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Editing state for Services
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Editing state for Reviews
  const [editingReview, setEditingReview] = useState<Partial<ReviewItem> | null>(null);

  // Editing state for Blog
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  // Editing state for Settings
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [newAreaInput, setNewAreaInput] = useState('');

  // WordPress XML Import
  const [xmlInput, setXmlInput] = useState('');
  const [migrationLoading, setMigrationLoading] = useState(false);
  const [migrationReport, setMigrationReport] = useState<MigrationReportItem[]>([]);
  const [migrationStatusMsg, setMigrationStatusMsg] = useState('');

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  const showSuccess = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // -------------------------------------------------------------
  // SERVICE CMS ACTIONS
  // -------------------------------------------------------------
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const updatedList = services.map(s => s.id === editingService.id ? editingService : s);
    if (!services.some(s => s.id === editingService.id)) {
      updatedList.push(editingService);
    }
    if (onUpdateServices) {
      onUpdateServices(updatedList);
    }
    showSuccess(`Service "${editingService.name}" updated successfully!`);
    const serviceToSave = editingService;
    setEditingService(null);

    try {
      await fetch(`/api/services/${serviceToSave.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceToSave)
      });
      await onRefreshData();
    } catch {
      // Local state is already updated and saved
    }
  };

  // -------------------------------------------------------------
  // REVIEW CMS ACTIONS
  // -------------------------------------------------------------
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview || !editingReview.authorName) return;

    const fullReview: ReviewItem = {
      id: editingReview.id || `rev-${Date.now()}`,
      authorName: editingReview.authorName,
      rating: editingReview.rating || 5,
      date: editingReview.date || 'Recent',
      text: editingReview.text || '',
      deviceRepaired: editingReview.deviceRepaired || 'Laptop Repair',
      sourceUrl: editingReview.sourceUrl || 'https://maps.app.goo.gl/RgC4ZUFohx93mFne8',
      isVerified: editingReview.isVerified ?? true,
      isPublished: editingReview.isPublished ?? true,
      displayOnHome: editingReview.displayOnHome ?? true,
      location: editingReview.location || 'Mumbai'
    };

    const updatedList = reviews.map(r => r.id === fullReview.id ? fullReview : r);
    if (!reviews.some(r => r.id === fullReview.id)) {
      updatedList.unshift(fullReview);
    }
    if (onUpdateReviews) {
      onUpdateReviews(updatedList);
    }
    showSuccess('Customer review saved successfully.');
    setEditingReview(null);

    try {
      const url = editingReview.id ? `/api/reviews/${editingReview.id}` : '/api/reviews';
      const method = editingReview.id ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullReview)
      });
      await onRefreshData();
    } catch {
      // Local state is already updated
    }
  };

  const handleDeleteReview = async (id: string) => {
    const filtered = reviews.filter(r => r.id !== id);
    if (onUpdateReviews) {
      onUpdateReviews(filtered);
    }
    showSuccess('Review deleted.');

    try {
      await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      await onRefreshData();
    } catch {
      // Local state is already updated
    }
  };

  // -------------------------------------------------------------
  // BLOG CMS ACTIONS
  // -------------------------------------------------------------
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editingPost.title) return;

    const fullPost: BlogPost = {
      id: editingPost.id || `blog-${Date.now()}`,
      title: editingPost.title,
      slug: editingPost.slug || editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      excerpt: editingPost.excerpt || '',
      content: editingPost.content || '',
      featuredImage: editingPost.featuredImage || '/images/hero-technician.jpg',
      category: editingPost.category || 'Hardware Guides',
      tags: editingPost.tags || ['Repair', 'Mumbai'],
      author: editingPost.author || { name: 'SST CARE Team', role: 'Hardware Specialist' },
      publishedAt: editingPost.publishedAt || new Date().toISOString().split('T')[0],
      status: editingPost.status || 'published',
      seoTitle: editingPost.seoTitle || `${editingPost.title} | SST CARE Mumbai`,
      seoDescription: editingPost.seoDescription || editingPost.excerpt?.slice(0, 160) || '',
      canonicalUrl: editingPost.canonicalUrl || `https://www.sstcare.com/${editingPost.slug}`,
      originalWordPressUrl: editingPost.originalWordPressUrl,
      readTimeMinutes: editingPost.readTimeMinutes || 4
    };

    const updatedList = blogPosts.map(p => p.id === fullPost.id ? fullPost : p);
    if (!blogPosts.some(p => p.id === fullPost.id)) {
      updatedList.unshift(fullPost);
    }
    if (onUpdateBlogPosts) {
      onUpdateBlogPosts(updatedList);
    }
    showSuccess('Blog article saved successfully.');
    setEditingPost(null);

    try {
      const url = editingPost.id ? `/api/blog/${editingPost.id}` : '/api/blog';
      const method = editingPost.id ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPost)
      });
      await onRefreshData();
    } catch {
      // Local state is already updated
    }
  };

  const handleDeletePost = async (id: string) => {
    const filtered = blogPosts.filter(p => p.id !== id);
    if (onUpdateBlogPosts) {
      onUpdateBlogPosts(filtered);
    }
    showSuccess('Article deleted.');

    try {
      await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      await onRefreshData();
    } catch {
      // Local state is already updated
    }
  };

  // -------------------------------------------------------------
  // SETTINGS CMS ACTIONS
  // -------------------------------------------------------------
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateSettings) {
      onUpdateSettings(settingsForm);
    }
    showSuccess('Website settings updated successfully! Hero offer is now live.');

    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm)
      });
      await onRefreshData();
    } catch {
      // Local state and localStorage are already updated
    }
  };

  const handleAddArea = () => {
    if (!newAreaInput.trim()) return;
    const updatedForm = {
      ...settingsForm,
      serviceAreas: [...settingsForm.serviceAreas, newAreaInput.trim()]
    };
    setSettingsForm(updatedForm);
    if (onUpdateSettings) onUpdateSettings(updatedForm);
    setNewAreaInput('');
  };

  const handleRemoveArea = (idx: number) => {
    const updatedForm = {
      ...settingsForm,
      serviceAreas: settingsForm.serviceAreas.filter((_, i) => i !== idx)
    };
    setSettingsForm(updatedForm);
    if (onUpdateSettings) onUpdateSettings(updatedForm);
  };

  // -------------------------------------------------------------
  // WORDPRESS XML IMPORT
  // -------------------------------------------------------------
  const handleWordPressImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!xmlInput.trim()) return;

    setMigrationLoading(true);
    setMigrationStatusMsg('');
    try {
      // Client-side instant parse fallback
      const parsedLocal = parseWordPressExport(xmlInput);
      if (parsedLocal.posts.length > 0) {
        // Merge into current blog posts
        const existingSlugs = new Set(blogPosts.map(p => p.slug.toLowerCase()));
        const newPosts = parsedLocal.posts.filter(p => !existingSlugs.has(p.slug.toLowerCase()));
        const merged = [...blogPosts, ...newPosts];
        if (onUpdateBlogPosts) {
          onUpdateBlogPosts(merged);
        }
        setMigrationReport(parsedLocal.report || []);
        setMigrationStatusMsg(`Successfully extracted and active: ${parsedLocal.posts.length} WordPress articles!`);
        showSuccess(`Migrated ${parsedLocal.posts.length} WordPress articles successfully!`);
      }

      // Also send to backend if running
      const res = await fetch('/api/admin/wordpress-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xmlContent: xmlInput })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMigrationReport(data.report || []);
        setXmlInput('');
        await onRefreshData();
      }
    } catch {
      // Local client-side parse has already succeeded
      setXmlInput('');
    } finally {
      setMigrationLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setXmlInput(event.target?.result as string || '');
    };
    reader.readAsText(file);
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // Calculate Metrics
  const publishedCount = blogPosts.filter(b => b.status === 'published').length;
  const draftCount = blogPosts.filter(b => b.status === 'draft').length;
  const verifiedReviewsCount = reviews.filter(r => r.isVerified).length;
  const activeServicesCount = services.filter(s => s.active).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Administrator Console</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b192c]">SST CARE Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Eye className="w-4 h-4" />
            <span>View Public Website</span>
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
        {[
          { key: 'dashboard', label: 'Dashboard', icon: Layers },
          { key: 'services', label: 'Services & Pricing (9)', icon: Wrench },
          { key: 'reviews', label: 'Google Reviews', icon: Star },
          { key: 'blog', label: 'Blog Articles', icon: BookOpen },
          { key: 'migration', label: 'WordPress Migration', icon: FileCode },
          { key: 'settings', label: 'Website Settings', icon: SettingsIcon },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: DASHBOARD METRICS                                       */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium">Published Articles</span>
              <p className="text-3xl font-extrabold text-[#0b192c] mt-1">{publishedCount}</p>
              <span className="text-[11px] text-emerald-600 mt-1 block">Live on /blog</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium">Draft Articles</span>
              <p className="text-3xl font-extrabold text-[#0b192c] mt-1">{draftCount}</p>
              <span className="text-[11px] text-slate-400 mt-1 block">Pending publication</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium">Verified Reviews</span>
              <p className="text-3xl font-extrabold text-[#0b192c] mt-1">{verifiedReviewsCount}</p>
              <span className="text-[11px] text-blue-600 mt-1 block">Google profile links</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium">Active Services</span>
              <p className="text-3xl font-extrabold text-[#0b192c] mt-1">{activeServicesCount}</p>
              <span className="text-[11px] text-emerald-600 mt-1 block">Dynamic pricing enabled</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setEditingPost({
                    title: '',
                    slug: '',
                    excerpt: '',
                    content: '',
                    featuredImage: '/images/hero-technician.jpg',
                    category: 'Hardware Guides',
                    tags: ['Laptop Repair', 'Mumbai'],
                    status: 'published'
                  });
                  setActiveTab('blog');
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Blog Post</span>
              </button>

              <button
                onClick={() => {
                  setEditingReview({
                    authorName: '',
                    rating: 5,
                    text: '',
                    date: new Date().toISOString().split('T')[0],
                    sourceUrl: 'https://maps.app.goo.gl/RgC4ZUFohx93mFne8',
                    isVerified: true,
                    isPublished: true,
                    displayOnHome: true,
                    location: 'Mumbai'
                  });
                  setActiveTab('reviews');
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-2"
              >
                <Star className="w-4 h-4 text-amber-500" />
                <span>Add Customer Review</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-blue-700" />
                <span>Edit Service Prices</span>
              </button>

              <button
                onClick={() => setActiveTab('migration')}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-2"
              >
                <FileCode className="w-4 h-4 text-orange-500" />
                <span>Import WordPress XML</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: SERVICES & DYNAMIC PRICING                             */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Service &amp; Dynamic Pricing Management</h2>
              <p className="text-xs text-slate-500">
                Any price change reflects immediately on homepage cards, individual service pages, and WhatsApp messages.
              </p>
            </div>
          </div>

          {/* Edit Service Modal/Form */}
          {editingService && (
            <form onSubmit={handleSaveService} className="bg-slate-50 p-6 rounded-2xl border border-blue-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-blue-900">Edit Service: {editingService.name}</h3>
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Service Name</label>
                  <input
                    type="text"
                    required
                    value={editingService.name}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Starting Price (e.g. ₹499, or leave blank for "Contact for Pricing")
                  </label>
                  <input
                    type="text"
                    value={editingService.startingPrice}
                    onChange={(e) => setEditingService({ ...editingService, startingPrice: e.target.value })}
                    placeholder="e.g. ₹499"
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs font-bold text-blue-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description (for cards)</label>
                  <textarea
                    rows={2}
                    value={editingService.shortDescription}
                    onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Description (for dedicated page)</label>
                  <textarea
                    rows={4}
                    value={editingService.fullDescription}
                    onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingService.image}
                    onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="serviceActive"
                    checked={editingService.active}
                    onChange={(e) => setEditingService({ ...editingService, active: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="serviceActive" className="text-xs font-semibold text-slate-700">
                    Active on Website
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Service Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* Service Cards Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">URL Path</th>
                  <th className="py-3 px-4">Starting Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={s.image} alt={s.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                        <div>
                          <p className="font-bold text-slate-900">{s.name}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{s.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono">
                      /services/{s.slug}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md">
                        {s.startingPrice || 'Contact for Pricing'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {s.active ? (
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">Active</span>
                      ) : (
                        <span className="text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full text-[11px]">Disabled</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setEditingService(s)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1 ml-auto"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Price</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: CUSTOMER REVIEWS MANAGEMENT                             */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Google Customer Reviews Management</h2>
              <p className="text-xs text-slate-500">
                Only genuine reviews linked directly to the SST CARE Google Business Profile should be added.
              </p>
            </div>
            <button
              onClick={() => setEditingReview({
                authorName: '',
                rating: 5,
                text: '',
                date: new Date().toISOString().split('T')[0],
                sourceUrl: 'https://maps.app.goo.gl/RgC4ZUFohx93mFne8',
                isVerified: true,
                isPublished: true,
                displayOnHome: true,
                location: 'Mumbai'
              })}
              className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Verified Review</span>
            </button>
          </div>

          {/* Form */}
          {editingReview && (
            <form onSubmit={handleSaveReview} className="bg-slate-50 p-6 rounded-2xl border border-blue-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  {editingReview.id ? 'Edit Review' : 'Add New Genuine Review'}
                </h3>
                <button type="button" onClick={() => setEditingReview(null)} className="text-xs text-slate-500">Cancel</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Reviewer Name</label>
                  <input
                    type="text"
                    required
                    value={editingReview.authorName || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, authorName: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Star Rating (1-5)</label>
                  <select
                    value={editingReview.rating || 5}
                    onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Original Review Text</label>
                  <textarea
                    rows={3}
                    required
                    value={editingReview.text || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, text: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Review Date</label>
                  <input
                    type="date"
                    value={editingReview.date || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, date: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Google Maps Profile URL</label>
                  <input
                    type="url"
                    value={editingReview.sourceUrl || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, sourceUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Location (e.g. Bandra, Andheri)</label>
                  <input
                    type="text"
                    value={editingReview.location || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, location: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Device Repaired</label>
                  <input
                    type="text"
                    placeholder="e.g. MacBook Pro M1, Dell Inspiron"
                    value={editingReview.deviceRepaired || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, deviceRepaired: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingReview.displayOnHome ?? true}
                    onChange={(e) => setEditingReview({ ...editingReview, displayOnHome: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Show on Homepage Carousel</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingReview.isVerified ?? true}
                    onChange={(e) => setEditingReview({ ...editingReview, isVerified: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>Verified Google Review</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button type="button" onClick={() => setEditingReview(null)} className="px-4 py-2 border rounded-lg text-xs">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-blue-700 text-white rounded-lg text-xs font-bold">Save Review</button>
              </div>
            </form>
          )}

          {/* Reviews Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4">Author &amp; Rating</th>
                  <th className="py-3 px-4">Review Excerpt</th>
                  <th className="py-3 px-4">Date &amp; Location</th>
                  <th className="py-3 px-4">Homepage</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reviews.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{r.authorName}</p>
                      <div className="flex items-center gap-0.5 mt-0.5 text-amber-500">
                        {[...Array(r.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs">
                      <p className="line-clamp-2 italic">"{r.text}"</p>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      <p>{r.date}</p>
                      <p className="text-[11px] text-slate-400">{r.location || 'Mumbai'}</p>
                    </td>
                    <td className="py-3 px-4">
                      {r.displayOnHome ? (
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">Yes</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingReview(r)}
                        className="px-2.5 py-1 text-xs border rounded-md hover:bg-slate-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(r.id)}
                        className="px-2.5 py-1 text-xs border border-red-200 text-red-600 rounded-md hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: BLOG ARTICLE MANAGEMENT                                */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'blog' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Technical Blog &amp; Content CMS</h2>
              <p className="text-xs text-slate-500">
                Create and publish technical guides with rich formatting, SEO metadata, and custom slugs.
              </p>
            </div>
            <button
              onClick={() => setEditingPost({
                title: '',
                slug: '',
                excerpt: '',
                content: '',
                featuredImage: '/images/hero-technician.jpg',
                category: 'Laptop Maintenance',
                tags: ['Laptop Repair', 'Mumbai'],
                status: 'published'
              })}
              className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Blog Article</span>
            </button>
          </div>

          {/* Form */}
          {editingPost && (
            <form onSubmit={handleSavePost} className="bg-slate-50 p-6 rounded-2xl border border-blue-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  {editingPost.id ? 'Edit Article' : 'Compose New Article'}
                </h3>
                <button type="button" onClick={() => setEditingPost(null)} className="text-xs text-slate-500">Cancel</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={editingPost.title || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingPost.slug || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    placeholder="leave blank to auto-generate"
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingPost.category || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Excerpt (Summary)</label>
                  <textarea
                    rows={2}
                    value={editingPost.excerpt || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Article HTML Content
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Featured Image URL</label>
                  <input
                    type="text"
                    value={editingPost.featuredImage || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, featuredImage: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingPost.status || 'published'}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs font-semibold"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">SEO Title (Optional)</label>
                  <input
                    type="text"
                    value={editingPost.seoTitle || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, seoTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Meta Description (Optional)</label>
                  <input
                    type="text"
                    value={editingPost.seoDescription || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, seoDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button type="button" onClick={() => setEditingPost(null)} className="px-4 py-2 border rounded-lg text-xs">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-blue-700 text-white rounded-lg text-xs font-bold">Save Article</button>
              </div>
            </form>
          )}

          {/* Blog Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{post.title}</p>
                      <p className="text-[11px] text-slate-400 font-mono">/blog/{post.slug}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{post.category}</td>
                    <td className="py-3 px-4 text-slate-500">{post.publishedAt}</td>
                    <td className="py-3 px-4">
                      {post.status === 'published' ? (
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">Published</span>
                      ) : (
                        <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full text-[11px]">Draft</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => navigate(`/blog/${post.slug}`)}
                        className="px-2 py-1 text-xs border rounded-md hover:bg-slate-100"
                        title="View Live"
                      >
                        <Eye className="w-3.5 h-3.5 inline" />
                      </button>
                      <button
                        onClick={() => setEditingPost(post)}
                        className="px-2 py-1 text-xs border rounded-md hover:bg-slate-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="px-2 py-1 text-xs border border-red-200 text-red-600 rounded-md hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: WORDPRESS MIGRATION                                     */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'migration' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">WordPress XML Content Migration Engine</h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Upload or paste the WordPress export XML file (.xml / WXR). SST CARE automatically extracts all articles, categories, publication dates, and tags, maintains the exact URL slug structure or creates automatic permanent 301 redirects, ensuring zero broken links or 404 indexing errors.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Import WordPress Export File</h3>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2 border border-slate-300">
                <Upload className="w-4 h-4 text-blue-700" />
                <span>Upload .xml Export File</span>
                <input
                  type="file"
                  accept=".xml,text/xml"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-slate-400">or paste XML content directly below</span>
            </div>

            <form onSubmit={handleWordPressImport} className="space-y-3 pt-2">
              <textarea
                rows={6}
                value={xmlInput}
                onChange={(e) => setXmlInput(e.target.value)}
                placeholder="Paste <?xml version='1.0' encoding='UTF-8'?> ... WordPress WXR export here"
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-300 text-xs font-mono"
              />

              <div className="flex items-center justify-between">
                <p className="text-[11px] text-slate-500">
                  {xmlInput.length > 0 ? `${(xmlInput.length / 1024).toFixed(1)} KB loaded` : 'Ready for WordPress XML'}
                </p>

                <button
                  type="submit"
                  disabled={!xmlInput.trim() || migrationLoading}
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold disabled:opacity-50 flex items-center gap-2 shadow-xs"
                >
                  {migrationLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Parsing &amp; Migrating...</span>
                    </>
                  ) : (
                    <>
                      <FileCode className="w-4 h-4" />
                      <span>Execute WordPress Migration</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {migrationStatusMsg && (
              <div className={`p-4 rounded-xl text-xs font-semibold flex items-start gap-2 ${
                migrationStatusMsg.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                {migrationStatusMsg.includes('Error') ? <AlertCircle className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0 text-emerald-600" />}
                <span>{migrationStatusMsg}</span>
              </div>
            )}
          </div>

          {/* Migration Verification Report */}
          {migrationReport.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs space-y-3 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Migration Verification Report ({migrationReport.length} Articles)
                </h3>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> All URLs Mapped
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Original WordPress URL</th>
                      <th className="py-2.5 px-3">Migrated URL</th>
                      <th className="py-2.5 px-3">Redirect Status</th>
                      <th className="py-2.5 px-3">SEO Metadata</th>
                      <th className="py-2.5 px-3">Images</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {migrationReport.map((rep, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono text-slate-600 truncate max-w-[200px]">
                          {rep.originalUrl}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-blue-700 font-semibold truncate max-w-[200px]">
                          {rep.migratedUrl}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px] font-medium">
                            {rep.redirectStatus}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">{rep.seoStatus}</td>
                        <td className="py-2.5 px-3 text-slate-500">{rep.imagesFound}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: WEBSITE SETTINGS                                        */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">General Website Settings</h2>
            <p className="text-xs text-slate-500">Manage business contacts, Google Business Profile links, and Mumbai doorstep service localities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Blinking Today's Offer (Hero Section) */}
            <div className="md:col-span-2 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="block font-bold text-amber-950 text-xs flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                  Todays Offer (Blinking in Hero Section)
                </label>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-200/70 px-2.5 py-0.5 rounded-full">
                  Hero Section Offer
                </span>
              </div>
              <input
                type="text"
                value={settingsForm.todaysOffer || ''}
                onChange={(e) => setSettingsForm({ ...settingsForm, todaysOffer: e.target.value })}
                placeholder="e.g. Todays Offer - Free Home Visit"
                className="w-full px-3.5 py-2.5 bg-white rounded-lg border border-amber-300 font-bold text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-xs"
              />
              <p className="text-[11px] text-amber-800">
                This promotional badge blinks/pulses continuously at the top of the homepage hero banner to attract customer attention.
              </p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Business Phone Number</label>
              <input
                type="text"
                value={settingsForm.phone}
                onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">WhatsApp Booking Number</label>
              <input
                type="text"
                value={settingsForm.whatsapp}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Support Email</label>
              <input
                type="email"
                value={settingsForm.email}
                onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Google Business Profile URL</label>
              <input
                type="url"
                value={settingsForm.googleBusinessUrl}
                onChange={(e) => setSettingsForm({ ...settingsForm, googleBusinessUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Homepage SEO Title</label>
              <input
                type="text"
                value={settingsForm.homepageSeoTitle}
                onChange={(e) => setSettingsForm({ ...settingsForm, homepageSeoTitle: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Homepage Meta Description</label>
              <textarea
                rows={2}
                value={settingsForm.homepageSeoDescription}
                onChange={(e) => setSettingsForm({ ...settingsForm, homepageSeoDescription: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-300"
              />
            </div>
          </div>

          {/* Service Areas Section */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Mumbai Doorstep Service Areas ({settingsForm.serviceAreas.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {settingsForm.serviceAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-800"
                >
                  <span>{area}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveArea(idx)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 max-w-sm pt-1">
              <input
                type="text"
                placeholder="Add Mumbai locality (e.g. Chembur East)"
                value={newAreaInput}
                onChange={(e) => setNewAreaInput(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-300 text-xs"
              />
              <button
                type="button"
                onClick={handleAddArea}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold"
              >
                Add Area
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save General Settings</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
