import React from 'react';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  ExternalLink, 
  Clock, 
  ShieldCheck,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { 
  getWhatsAppBookingUrl, 
  SST_PHONE_CALL_LINK, 
  SST_PHONE_DISPLAY, 
  SST_GOOGLE_MAPS_URL 
} from '../lib/whatsapp';
import { SiteSettings } from '../types';

interface ContactViewProps {
  settings: SiteSettings;
  navigate: (path: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ settings, navigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => navigate('/')} className="hover:text-slate-800 transition-colors">Home</button>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Contact Us</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b192c] tracking-tight">
          Contact SST CARE
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Reach our Mumbai doorstep repair team directly by phone, WhatsApp, or connect through our Google Business Profile.
        </p>
      </div>

      {/* Primary Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">WhatsApp Booking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fastest response for estimates, technician visits, and symptom diagnosis.
            </p>
            <p className="text-sm font-bold text-emerald-800">{settings.whatsapp || SST_PHONE_DISPLAY}</p>
          </div>

          <a
            href={getWhatsAppBookingUrl({ customMessage: "Hello SST CARE, I would like to book a doorstep repair visit in Mumbai." })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Phone Call Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Telephone Call</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Speak directly with our technical coordinator for urgent laptop or desktop assistance.
            </p>
            <p className="text-sm font-bold text-blue-900">{settings.phone || SST_PHONE_DISPLAY}</p>
          </div>

          <a
            href={SST_PHONE_CALL_LINK}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call {SST_PHONE_DISPLAY}</span>
          </a>
        </div>

        {/* Google Business Profile Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Google Business Profile</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Read verified reviews, verify ratings, or leave your feedback on Google Maps.
            </p>
            <p className="text-xs font-semibold text-slate-700">Verified Listing</p>
          </div>

          <a
            href={SST_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-orange-500" />
            <span>View on Google Maps</span>
          </a>
        </div>
      </div>

      {/* Service Availability Details */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-700" />
          <span>Doorstep Service Coverage across Mumbai</span>
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          SST CARE provides on-site technician visits directly to your residence, co-working space, or office building. We eliminate the need for you to transport fragile monitors, laptops, or desktop towers.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {(settings.serviceAreas || []).map((area, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{area}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-700" />
            <span>Operating Hours: Monday to Sunday, 9:00 AM – 9:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-700" />
            <span>Official Domain: www.sstcare.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
