import React from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Lock
} from 'lucide-react';
import { 
  SST_PHONE_CALL_LINK, 
  SST_PHONE_DISPLAY, 
  SST_GOOGLE_MAPS_URL, 
  getWhatsAppBookingUrl 
} from '../lib/whatsapp';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'All Services', path: '/services' },
    { label: 'Blog & Maintenance Guides', path: '/blog' },
    { label: 'Contact Us', path: '/contact-us' },
  ];

  const servicesList = [
    { label: 'Laptop Repair at Doorstep', path: '/services/laptop-repair' },
    { label: 'MacBook Repair', path: '/services/macbook-repair' },
    { label: 'Laptop Deep Cleaning', path: '/services/laptop-deep-cleaning' },
    { label: 'All-in-One PC Repair', path: '/services/all-in-one-pc-repair' },
    { label: 'Desktop Computer Repair', path: '/services/desktop-repair' },
    { label: 'Gaming Laptop Deep Cleaning', path: '/services/gaming-laptop-deep-cleaning' },
    { label: 'Software Installation', path: '/services/software-installation' },
    { label: 'MS Office Installation', path: '/services/ms-office-installation' },
    { label: 'Windows Installation', path: '/services/windows-installation' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms & Conditions', path: '/terms-and-conditions' },
    { label: 'Disclaimer', path: '/disclaimer' },
    { label: 'Cancellation & Service Policy', path: '/service-policy' },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b192c] text-slate-300 pt-16 pb-24 md:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column (Span 2 on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/5 p-3 rounded-xl inline-block border border-white/10">
              <BrandLogo height={42} isDarkBg={true} />
            </div>
            
            <p className="text-sm font-semibold text-white tracking-wide uppercase">
              Professional Electronics Repair Service
            </p>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Specialized doorstep repair and maintenance for Windows laptops, Apple MacBooks, and desktop computers across Mumbai. Professional diagnostic instruments and certified component care delivered directly to your home or office.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Doorstep Service across Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Mon – Sun: 9:00 AM – 9:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct on-site diagnosis with full data privacy</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-orange-400 transition-colors" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services (9 services strictly) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              {servicesList.map((service) => (
                <li key={service.path}>
                  <button
                    onClick={() => handleLinkClick(service.path)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact Information
            </h4>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-xs text-slate-400">Phone Support:</span>
                <a 
                  href={SST_PHONE_CALL_LINK} 
                  className="font-medium text-white hover:text-orange-400 transition-colors flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  {SST_PHONE_DISPLAY}
                </a>
              </div>

              <div>
                <span className="block text-xs text-slate-400">WhatsApp Booking:</span>
                <a 
                  href={getWhatsAppBookingUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 mt-0.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {SST_PHONE_DISPLAY}
                </a>
              </div>

              <div>
                <span className="block text-xs text-slate-400">Official Website:</span>
                <span className="font-medium text-slate-300">www.sstcare.com</span>
              </div>

              <div className="pt-2">
                <a
                  href={SST_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white border border-white/10 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
                  <span>Google Business Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Administrative Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            {legalLinks.map((legal) => (
              <button
                key={legal.path}
                onClick={() => handleLinkClick(legal.path)}
                className="hover:text-slate-200 transition-colors cursor-pointer"
              >
                {legal.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>© 2026 SST CARE. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
