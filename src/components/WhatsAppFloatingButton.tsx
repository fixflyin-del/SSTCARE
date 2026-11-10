import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getWhatsAppBookingUrl } from '../lib/whatsapp';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <a
      href={getWhatsAppBookingUrl({ customMessage: "Hello SST CARE, I would like to book a doorstep repair visit in Mumbai." })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SST CARE on WhatsApp"
      className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 group"
    >
      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
        <MessageSquare className="w-3.5 h-3.5 fill-white" />
      </div>
      <span className="text-xs font-semibold tracking-wide">
        WhatsApp Us
      </span>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200"></span>
      </span>
    </a>
  );
};
