import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { getWhatsAppBookingUrl, SST_PHONE_CALL_LINK, SST_PHONE_DISPLAY } from '../lib/whatsapp';
import { Menu, X, Phone, MessageSquare, ChevronRight, ShieldCheck, Wrench, Home, BookOpen, Info, MapPin } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Blog', path: '/blog' },
    { label: 'About Us', path: '/about-us' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-18 sm:h-20">
            {/* Zone 1: Brand Zone */}
            <div 
              onClick={() => handleNavClick('/')}
              className="cursor-pointer py-1"
            >
              <BrandLogo height={44} variant="transparent" showTagline={true} />
            </div>

            {/* Zone 2: Navigation Links (Desktop: Home, Services, Blog, About Us) */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
              {navLinks.map((item) => {
                const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isActive 
                        ? 'text-blue-700 font-semibold' 
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action (WhatsApp Button) */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Optional direct call icon for quick mobile reach */}
              <a
                href={SST_PHONE_CALL_LINK}
                className="hidden sm:inline-flex md:hidden items-center justify-center p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                title={`Call SST CARE at ${SST_PHONE_DISPLAY}`}
              >
                <Phone className="w-5 h-5 text-blue-700" />
              </a>

              {/* Primary WhatsApp Action */}
              <a
                href={getWhatsAppBookingUrl({ customMessage: "Hello SST CARE, I would like to book a doorstep electronics repair visit in Mumbai. Please share details." })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-xl shadow-xs transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>WhatsApp Booking</span>
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex md:hidden items-center justify-center p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile & Tablet Drawer Menu from the RIGHT */}
      {mobileMenuOpen && (
        <aside aria-label="Mobile Navigation Drawer" className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content on RIGHT */}
          <div className="relative bg-white w-80 max-w-[85vw] h-full overflow-y-auto shadow-2xl p-6 flex flex-col z-10 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <BrandLogo height={38} variant="transparent" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-1">
              <button
                onClick={() => handleNavClick('/')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <Home className="w-4 h-4 text-slate-500" />
                  Home
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('/services')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <Wrench className="w-4 h-4 text-slate-500" />
                  All Services (9)
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('/blog')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  Technical Blog & Guides
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('/about-us')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-slate-500" />
                  About SST CARE
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('/contact-us')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-800 font-medium hover:bg-slate-50"
              >
                <span className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  Contact & Location
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Doorstep Trust Note */}
            <div className="my-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Doorstep Electronics Repair in Mumbai</p>
                <p className="mt-0.5 text-slate-500">Technicians equipped with precision testing tools visit your home or office directly.</p>
              </div>
            </div>

            {/* Direct Contact Actions */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={getWhatsAppBookingUrl({ customMessage: "Hello SST CARE, I would like to book a doorstep repair visit in Mumbai." })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp (+91 79 7795 4302)
              </a>

              <a
                href={SST_PHONE_CALL_LINK}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-50"
              >
                <Phone className="w-4 h-4 text-blue-700" />
                Call Directly: {SST_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
