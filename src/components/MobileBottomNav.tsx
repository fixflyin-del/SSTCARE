import React from 'react';
import { Home, Wrench, BookOpen, User, MessageSquare } from 'lucide-react';
import { getWhatsAppBookingUrl } from '../lib/whatsapp';

interface MobileBottomNavProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentPath, navigate }) => {
  const items = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Services', path: '/services', icon: Wrench },
    { label: 'Blog', path: '/blog', icon: BookOpen },
    { label: 'About', path: '/about-us', icon: User },
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] safe-area-pb"
    >
      <div className="grid grid-cols-5 h-15 max-w-md mx-auto items-center px-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                isActive ? 'text-blue-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* 5th Item: Direct WhatsApp Trigger */}
        <a
          href={getWhatsAppBookingUrl({ customMessage: "Hello SST CARE, I want to enquire about doorstep repair in Mumbai." })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-emerald-600 hover:text-emerald-700 active:scale-95 transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
          </div>
          <span className="text-[10px] font-medium mt-0.5 text-emerald-700">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};
