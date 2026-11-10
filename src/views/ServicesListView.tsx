import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { getWhatsAppBookingUrl } from '../lib/whatsapp';
import { Wrench, MessageSquare, ChevronRight, Search, ShieldCheck } from 'lucide-react';

interface ServicesListViewProps {
  services: ServiceItem[];
  navigate: (path: string) => void;
}

export const ServicesListView: React.FC<ServicesListViewProps> = ({ services, navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = services.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-slate-800 transition-colors">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Services</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b192c] tracking-tight">
              Electronics Repair Services in Mumbai
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Professional on-site laptop repair, Apple MacBook servicing, desktop computer troubleshooting, and thermal maintenance at your doorstep.
            </p>
          </div>

          {/* Search Filter */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-blue-600 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => {
          const priceDisplay = s.startingPrice && s.startingPrice.trim() !== '' 
            ? `Starts at ${s.startingPrice}` 
            : 'Contact for Pricing';

          const whatsappUrl = getWhatsAppBookingUrl({
            serviceName: s.name,
            price: s.startingPrice,
            location: "Mumbai"
          });

          return (
            <div
              key={s.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={s.image || '/images/hero-technician.jpg'}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs text-[11px] font-semibold text-white border border-white/10">
                    {priceDisplay}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {s.name}
                  </h2>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {s.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    navigate(`/services/${s.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold text-center transition-colors"
                >
                  View Details
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-sm text-slate-600">No services matched your query.</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-3 text-xs font-semibold text-blue-700 hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Doorstep Trust Note */}
      <div className="bg-slate-100/90 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Custom Diagnostics &amp; Multi-Device Servicing</h3>
            <p className="text-xs text-slate-600">Have multiple laptops or unique workstation hardware? Enquire on WhatsApp for customized home/office visit packages.</p>
          </div>
        </div>
        <a
          href={getWhatsAppBookingUrl({ customMessage: "Hello SST CARE, I would like to enquire about multi-device servicing at my premises." })}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-2xs"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
};
