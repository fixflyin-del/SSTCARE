import React, { useState, useEffect } from 'react';
import { ServiceItem, ReviewItem, BlogPost, SiteSettings } from './types';
import { INITIAL_SERVICES, getServiceImage } from './data/servicesData';
import { INITIAL_REVIEWS } from './data/reviewsData';
import { INITIAL_BLOG_POSTS } from './data/blogData';
import { INITIAL_SETTINGS } from './data/settingsData';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { DirectCallFloatingButton } from './components/DirectCallFloatingButton';
import { LoadingAnimation } from './components/LoadingAnimation';
import { HomeView } from './views/HomeView';
import { ServicesListView } from './views/ServicesListView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { BlogListView } from './views/BlogListView';
import { BlogPostView } from './views/BlogPostView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { LegalView } from './views/LegalView';
import { AdminView } from './views/AdminView';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  // Resilient initial states with instant local data and localStorage caching
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('sstcare_services');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(s => ({ ...s, image: getServiceImage(s) }));
        }
      }
    } catch {}
    return INITIAL_SERVICES.map(s => ({ ...s, image: getServiceImage(s) }));
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('sstcare_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_REVIEWS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('sstcare_blog_posts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_BLOG_POSTS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('sstcare_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.brandName) return parsed;
      }
    } catch {}
    return INITIAL_SETTINGS;
  });

  // State update handlers that sync to localStorage
  const handleUpdateServices = (newServices: ServiceItem[]) => {
    const withImages = newServices.map(s => ({ ...s, image: getServiceImage(s) }));
    setServices(withImages);
    try {
      localStorage.setItem('sstcare_services', JSON.stringify(withImages));
    } catch {}
  };

  const handleUpdateReviews = (newReviews: ReviewItem[]) => {
    setReviews(newReviews);
    try {
      localStorage.setItem('sstcare_reviews', JSON.stringify(newReviews));
    } catch {}
  };

  const handleUpdateBlogPosts = (newPosts: BlogPost[]) => {
    setBlogPosts(newPosts);
    try {
      localStorage.setItem('sstcare_blog_posts', JSON.stringify(newPosts));
    } catch {}
  };

  const handleUpdateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('sstcare_settings', JSON.stringify(newSettings));
    } catch {}
  };

  // Sync with browser navigation
  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Background API data sync (if backend server is reachable)
  const loadData = async () => {
    try {
      const [resServices, resReviews, resBlog, resSettings] = await Promise.allSettled([
        fetch('/api/services?all=true').then(r => r.json()),
        fetch('/api/reviews?all=true').then(r => r.json()),
        fetch('/api/blog?all=true').then(r => r.json()),
        fetch('/api/settings').then(r => r.json())
      ]);

      if (resServices.status === 'fulfilled' && Array.isArray(resServices.value) && resServices.value.length > 0) {
        handleUpdateServices(resServices.value);
      }
      if (resReviews.status === 'fulfilled' && Array.isArray(resReviews.value) && resReviews.value.length > 0) {
        handleUpdateReviews(resReviews.value);
      }
      if (resBlog.status === 'fulfilled' && Array.isArray(resBlog.value) && resBlog.value.length > 0) {
        handleUpdateBlogPosts(resBlog.value);
      }
      if (resSettings.status === 'fulfilled' && resSettings.value && resSettings.value.brandName) {
        handleUpdateSettings(resSettings.value);
      }
    } catch (err) {
      // In static hosting environments like Vercel, offline static data remains seamlessly active
      console.log('Background API sync not available, operating in resilient static mode');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update document title for general pages
  useEffect(() => {
    if (currentPath === '/') {
      document.title = "SST CARE — Laptop, MacBook & Desktop Repair at Your Doorstep in Mumbai";
    } else if (currentPath === '/services') {
      document.title = "Our Services | SST CARE Doorstep Electronics Repair Mumbai";
    } else if (currentPath === '/blog') {
      document.title = "Blog & Technical Hardware Guides | SST CARE Mumbai";
    } else if (currentPath === '/about-us') {
      document.title = "About Us | SST CARE Professional Electronics Repair";
    } else if (currentPath === '/contact-us') {
      document.title = "Contact SST CARE | WhatsApp +91 79 7795 4302";
    } else if (currentPath.startsWith('/admin')) {
      document.title = "SST CARE Admin Console";
    }
  }, [currentPath]);

  // Route Dispatcher
  const renderCurrentView = () => {
    const cleanPath = currentPath.replace(/\/+$/, '') || '/';

    // 1. Home View
    if (cleanPath === '/') {
      return (
        <HomeView
          services={services}
          reviews={reviews}
          settings={settings}
          navigate={navigate}
        />
      );
    }

    // 2. All Services List (/services)
    if (cleanPath === '/services') {
      return (
        <ServicesListView
          services={services}
          navigate={navigate}
        />
      );
    }

    // 3. Individual Service (/services/:slug)
    if (cleanPath.startsWith('/services/')) {
      const slug = cleanPath.replace('/services/', '');
      const found = services.find(s => s.slug === slug || s.id === slug);
      if (found) {
        return (
          <ServiceDetailView
            service={found}
            allServices={services}
            navigate={navigate}
          />
        );
      }
    }

    // 4. Blog list (/blog)
    if (cleanPath === '/blog') {
      return (
        <BlogListView
          posts={blogPosts.filter(p => p.status === 'published')}
          navigate={navigate}
        />
      );
    }

    // 5. Blog Category (/blog/category/:category)
    if (cleanPath.startsWith('/blog/category/')) {
      const category = decodeURIComponent(cleanPath.replace('/blog/category/', ''));
      return (
        <BlogListView
          posts={blogPosts.filter(p => p.status === 'published')}
          filterCategory={category}
          navigate={navigate}
        />
      );
    }

    // 6. Blog Tag (/blog/tag/:tag)
    if (cleanPath.startsWith('/blog/tag/')) {
      const tag = decodeURIComponent(cleanPath.replace('/blog/tag/', ''));
      return (
        <BlogListView
          posts={blogPosts.filter(p => p.status === 'published')}
          filterTag={tag}
          navigate={navigate}
        />
      );
    }

    // 7. Single Blog Post via /blog/:slug
    if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.replace('/blog/', '');
      const decodedSlug = decodeURIComponent(slug).toLowerCase();
      const post = blogPosts.find(p => 
        p.slug.toLowerCase() === slug.toLowerCase() || 
        decodeURIComponent(p.slug).toLowerCase() === decodedSlug ||
        p.id === slug
      );
      if (post) {
        return (
          <BlogPostView
            post={post}
            allPosts={blogPosts.filter(p => p.status === 'published')}
            services={services}
            navigate={navigate}
          />
        );
      }
    }

    // 8. Direct root slug for WordPress migrated URLs (e.g. /laptop-macbook-battery-replacement-in-kurla-mumbai-fast-affordable-service-sst-care)
    const rawSlug = cleanPath.replace(/^\//, '');
    const decodedRawSlug = decodeURIComponent(rawSlug).toLowerCase();
    const migratedPost = blogPosts.find(p => {
      const pSlug = p.slug.toLowerCase();
      const decodedPSlug = decodeURIComponent(p.slug).toLowerCase();
      return pSlug === rawSlug.toLowerCase() || 
             pSlug === decodedRawSlug || 
             decodedPSlug === decodedRawSlug ||
             p.id === rawSlug ||
             (p.originalWordPressUrl && decodeURIComponent(p.originalWordPressUrl).toLowerCase().includes(decodedRawSlug));
    });
    if (migratedPost) {
      return (
        <BlogPostView
          post={migratedPost}
          allPosts={blogPosts.filter(p => p.status === 'published')}
          services={services}
          navigate={navigate}
        />
      );
    }

    // 9. About Us
    if (cleanPath === '/about-us') {
      return <AboutView navigate={navigate} />;
    }

    // 10. Contact Us
    if (cleanPath === '/contact-us') {
      return <ContactView settings={settings} navigate={navigate} />;
    }

    // 11. Legal Pages
    if (cleanPath === '/privacy-policy') {
      return <LegalView type="privacy" navigate={navigate} />;
    }
    if (cleanPath === '/terms-and-conditions') {
      return <LegalView type="terms" navigate={navigate} />;
    }
    if (cleanPath === '/disclaimer') {
      return <LegalView type="disclaimer" navigate={navigate} />;
    }
    if (cleanPath === '/service-policy') {
      return <LegalView type="service" navigate={navigate} />;
    }

    // 12. Admin Console Routes (Accessible instantly without passwords or credentials)
    if (cleanPath === '/admin' || cleanPath.startsWith('/admin')) {
      let subSection = 'dashboard';
      if (cleanPath.startsWith('/admin/services')) subSection = 'services';
      else if (cleanPath.startsWith('/admin/reviews')) subSection = 'reviews';
      else if (cleanPath.startsWith('/admin/blog')) subSection = 'blog';
      else if (cleanPath.startsWith('/admin/settings')) subSection = 'settings';
      else if (cleanPath.startsWith('/admin/migration')) subSection = 'migration';

      return (
        <AdminView
          services={services}
          reviews={reviews}
          blogPosts={blogPosts}
          settings={settings}
          onRefreshData={loadData}
          navigate={navigate}
          subSection={subSection}
          onUpdateServices={handleUpdateServices}
          onUpdateReviews={handleUpdateReviews}
          onUpdateBlogPosts={handleUpdateBlogPosts}
          onUpdateSettings={handleUpdateSettings}
        />
      );
    }

    // 13. 404 Fallback
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-[#0b192c]">404 — Page Not Found</h1>
        <p className="text-sm text-slate-600">
          The requested page or repair service does not exist or has been moved.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => navigate('/blog')}
            className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold cursor-pointer"
          >
            View Technical Blog
          </button>
        </div>
      </div>
    );
  };

  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 1.5s - 2.0s Brand Loading Animation (on first visit) */}
      <LoadingAnimation />

      {/* Sticky Header with Brand Navigation */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* Main Content View */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Persistent Direct Call Floating Button (Right side, whole website) */}
      {!isAdminRoute && <DirectCallFloatingButton />}

      {/* Persistent WhatsApp Trigger (Desktop) */}
      {!isAdminRoute && <WhatsAppFloatingButton />}

      {/* Mobile Bottom Navigation (Mobile & Tablet) */}
      {!isAdminRoute && (
        <MobileBottomNav currentPath={currentPath} navigate={navigate} />
      )}

      {/* Comprehensive Brand Footer */}
      {!isAdminRoute && <Footer navigate={navigate} />}
    </div>
  );
}
