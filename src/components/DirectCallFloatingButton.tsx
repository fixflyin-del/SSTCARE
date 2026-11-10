import React from 'react';
import { Phone } from 'lucide-react';
import { SST_PHONE_CALL_LINK, SST_PHONE_DISPLAY } from '../lib/whatsapp';

export const DirectCallFloatingButton: React.FC = () => {
  return (
    <aside
      aria-label="Direct Phone Call Trigger"
      className="fixed right-4 sm:right-6 bottom-20 md:bottom-24 z-40 flex items-center"
    >
      <a
        href={SST_PHONE_CALL_LINK}
        aria-label={`Direct Call SST CARE at ${SST_PHONE_DISPLAY}`}
        title={`Call SST CARE Directly: ${SST_PHONE_DISPLAY}`}
        className="relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
      >
        {/* Subtle continuous glowing pulse ring */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-35 pointer-events-none" />
        
        {/* Phone icon */}
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-white/20 group-hover:rotate-12 transition-transform duration-300" />
        
        {/* Hover Pill on Desktop */}
        <span className="hidden lg:group-hover:inline-block absolute right-full mr-3 px-3 py-1.5 bg-slate-900/90 backdrop-blur-xs text-white text-xs font-bold rounded-lg shadow-md whitespace-nowrap pointer-events-none transition-opacity">
          Call Now: {SST_PHONE_DISPLAY}
        </span>
      </a>
    </aside>
  );
};
