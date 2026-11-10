import React from 'react';
import { ShieldCheck, MapPin, Wrench, Clock, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import { getWhatsAppBookingUrl, SST_PHONE_CALL_LINK, SST_PHONE_DISPLAY } from '../lib/whatsapp';

interface AboutViewProps {
  navigate: (path: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => navigate('/')} className="hover:text-slate-800 transition-colors">Home</button>
        <span>/</span>
        <span className="text-slate-900 font-semibold">About Us</span>
      </nav>

      {/* Hero */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>Professional Electronics Repair Service</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b192c] tracking-tight leading-tight">
          Your Trusted Partner for Professional Electronics Repair
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          SST CARE provides professional laptop, MacBook and desktop repair services with a dedicated focus on convenient doorstep assistance across Mumbai.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xs space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Our Purpose &amp; Service Philosophy
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            The electronics repair industry has historically burdened consumers with long commutes to crowded repair markets, uncertain turnaround times, and lack of transparency regarding internal components. SST CARE was established to solve these exact friction points by making technical repair services easier, honest, and directly accessible at your home or workplace.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We specialize exclusively in computers — Windows laptops, Apple MacBook models, custom desktop PCs, and All-in-One machines. By concentrating our technical expertise on computer architectures, our technicians provide in-depth diagnostics rather than superficial workarounds.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center">
              <MapPin className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Doorstep Convenience</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You do not need to carry delicate monitors or heavy towers across Mumbai traffic. We come to you with certified diagnostic tools and replacement spares.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Direct Transparency &amp; Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When repairs happen on your desk, your personal photos, documents, and private business data remain safe and in your sight throughout the entire inspection.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center">
              <Wrench className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Precision Equipment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We carry electrostatic discharge (ESD) safe mats, digital multimeters, thermal compound applicators, and micro-tools to protect delicate silicon circuits.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
              <CheckCircle2 className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Honest Pricing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Estimates are explained clearly before any part is replaced or work is begun. No surprise fees, no hidden labor multipliers.
            </p>
          </div>
        </div>

        {/* Commitment note */}
        <div className="p-6 bg-blue-50/80 border border-blue-200/80 rounded-2xl text-xs sm:text-sm text-blue-950 space-y-2">
          <p className="font-bold">Our Commitment to Mumbai Customers:</p>
          <p className="text-blue-900 leading-relaxed">
            We aim to deliver same-day or next-day service across all major Mumbai localities, ensuring minimal downtime for your study, remote work, or business operations.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-br from-[#0b192c] to-[#1e3e62] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Ready to Service Your Device at Your Doorstep?
        </h2>
        <p className="text-sm text-blue-100 max-w-xl mx-auto">
          Contact our team on WhatsApp or phone to describe your computer issue and schedule an on-site visit.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getWhatsAppBookingUrl({ customMessage: "Hello SST CARE, I would like to book a doorstep repair visit in Mumbai." })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs sm:text-sm text-white shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp (+91 79 7795 4302)</span>
          </a>
          <a
            href={SST_PHONE_CALL_LINK}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 font-semibold text-xs sm:text-sm text-white transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>Call Directly</span>
          </a>
        </div>
      </div>
    </div>
  );
};
