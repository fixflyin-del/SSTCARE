import React, { useState, useEffect } from 'react';
import { ServiceItem, ReviewItem, BlogPost, SiteSettings } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
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
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    brandName: "SST CARE",
    tagline: "Professional Electronics Repair Service",
    phone: "+91 79 7795 4302",
    whatsapp: "+91 79 7795 4302",
    email: "contact@sstcare.com",
    websiteUrl: "https://www.sstcare.com",
    googleBusinessUrl: "https://maps.app.goo.gl/RgC4ZUFohx93mFne8",
    serviceCity: "Mumbai",
    serviceState: "Maharashtra",
    serviceAreas: [
      "Andheri West & East",
      "Bandra & Khar",
      "Powai & Chandivali",
      "Borivali & Kandivali",
      "Dadar & Mahim",
      "Goregaon & Malad",
      "BKC & Kurla",
      "Thane West",
      "Navi Mumbai",
      "South Mumbai"
    ],
    homepageSeoTitle: "Laptop, MacBook & Desktop Repair at Your Doorstep in Mumbai | SST CARE",
    homepageSeoDescription: "Professional laptop repair, MacBook service and desktop computer repair at your home or office in Mumbai. Convenient doorstep visit & expert WhatsApp booking at +91 79 7795 4302.",
    currency: "₹",
    todaysOffer: "Todays Offer - Free Home Visit"
  });

  const [loadingInitial, setLoadingInitial] = useState(true);

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
    }
  };

  const loadData = async () => {
    try {
      const [resServices, resReviews, resBlog, resSettings] = await Promise.allSettled([
        fetch('/api/services?all=true').then(r => r.json()),
        fetch('/api/reviews?all=true').then(r => r.json()),
        fetch('/api/blog?all=true').then(r => r.json()),
        fetch('/api/settings').then(r => r.json())
      ]);

      if (resServices.status === 'fulfilled' && Array.isArray(resServices.value)) {
        setServices(resServices.value);
      }
      if (resReviews.status === 'fulfilled' && Array.isArray(resReviews.value)) {
        setReviews(resReviews.value);
      }
      if (resBlog.status === 'fulfilled' && Array.isArray(resBlog.value)) {
        setBlogPosts(resBlog.value);
      }
      if (resSettings.status === 'fulfilled' && resSettings.value) {
        setSettings(resSettings.value);
      }
    } catch (err) {
      console.warn('Network fetch error, using local state:', err);
    } finally {
      setLoadingInitial(false);
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

    // Home
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

    // All Services
    if (cleanPath === '/services') {
      return (
        <ServicesListView
          services={services}
          navigate={navigate}
        />
      );
    }

    // Individual Service (/services/:slug)
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

    // Blog list (/blog)
    if (cleanPath === '/blog') {
      return (
        <BlogListView
          posts={blogPosts.filter(p => p.status === 'published')}
          navigate={navigate}
        />
      );
    }

    // Blog Category (/blog/category/:category)
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

    // Blog Tag (/blog/tag/:tag)
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

    // Single Blog Post (/blog/:slug)
    if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.replace('/blog/', '');
      const post = blogPosts.find(p => p.slug === slug || p.id === slug);
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

    // Check if the path matches an old migrated WordPress URL (e.g., /my-old-post/ or sample url)
    const rawSlug = cleanPath.replace(/^\//, '');
    const decodedRawSlug = decodeURIComponent(rawSlug);
    const migratedPost = blogPosts.find(p => {
      const pSlug = p.slug;
      const decodedPSlug = decodeURIComponent(p.slug);
      return pSlug === rawSlug || 
             pSlug === decodedRawSlug || 
             decodedPSlug === decodedRawSlug ||
             p.id === rawSlug;
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

    // About Us
    if (cleanPath === '/about-us') {
      return <AboutView navigate={navigate} />;
    }

    // Contact Us
    if (cleanPath === '/contact-us') {
      return <ContactView settings={settings} navigate={navigate} />;
    }

    // Legal Pages
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

    // Admin Routes
    if (cleanPath === '/admin') {
      return (
        <AdminView
          services={services}
          reviews={reviews}
          blogPosts={blogPosts}
          settings={settings}
          onRefreshData={loadData}
          navigate={navigate}
          subSection="dashboard"
        />
      );
    }
    if (cleanPath === '/admin/services') {
      return (
        <AdminView
          services={services}
          reviews={reviews}
          blogPosts={blogPosts}
          settings={settings}
          onRefreshData={loadData}
          navigate={navigate}
          subSection="services"
        />
      );
    }
    if (cleanPath === '/admin/reviews') {
      return (
        <AdminView
          services={services}
          reviews={reviews}
          blogPosts={blogPosts}
          settings={settings}
          onRefreshData={loadData}
          navigate={navigate}
          subSection="reviews"
        />
      );
    }
    if (cleanPath === '/admin/blog') {
      return (
        <AdminView
          services={services}
          reviews={reviews}
          blogPosts={blogPosts}
          settings={settings}
          onRefreshData={loadData}
          navigate={navigate}
          subSection="blog"
        />
      );
    }
    if (cleanPath === '/admin/settings') {
      return (
        <AdminView
          services={services}
          reviews={reviews}
          blogPosts={blogPosts}
          settings={settings}
          onRefreshData={loadData}
          navigate={navigate}
          subSection="settings"
        />
      );
    }
    if (cleanPath === '/admin/migration') {
      return (
        <AdminView
          services={services}
          reviews={reviews}
          blogPosts={blogPosts}
          settings={settings}
          onRefreshData={loadData}
          navigate={navigate}
          subSection="migration"
        />
      );
    }

    // 404 Fallback
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-[#0b192c]">404 — Page Not Found</h1>
        <p className="text-sm text-slate-600">
          The requested page or repair service does not exist or has been moved.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => navigate('/services')}
            className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold"
          >
            Explore Services
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

      {/* Sticky Header with Top Bar Contract */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* Main Content View */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

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
