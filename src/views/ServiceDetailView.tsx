import React, { useEffect } from 'react';
import { ServiceItem } from '../types';
import { getWhatsAppBookingUrl, SST_PHONE_CALL_LINK, SST_PHONE_DISPLAY } from '../lib/whatsapp';
import { 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  Phone, 
  MapPin, 
  AlertCircle,
  Wrench,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

interface ServiceDetailViewProps {
  service: ServiceItem;
  allServices: ServiceItem[];
  navigate: (path: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ service, allServices, navigate }) => {
  // Update document title and SEO dynamically
  useEffect(() => {
    document.title = `${service.name} in Mumbai | SST CARE Doorstep Electronics Repair`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Professional ${service.name} at your home or office in Mumbai. Convenient doorstep visit & expert WhatsApp booking at +91 79 7795 4302.`
      );
    }
  }, [service]);

  const priceDisplay = service.startingPrice && service.startingPrice.trim() !== '' 
    ? `Starts at ${service.startingPrice}` 
    : 'Contact for Pricing';

  const bookingUrl = getWhatsAppBookingUrl({
    serviceName: service.name,
    price: service.startingPrice,
    location: "Mumbai"
  });

  const relatedServices = allServices.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Structured Data for Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.name,
            "provider": {
              "@type": "LocalBusiness",
              "name": "SST CARE",
              "telephone": "+91 79 7795 4302",
              "url": "https://www.sstcare.com"
            },
            "areaServed": "Mumbai, Maharashtra, India",
            "description": service.shortDescription,
            "offers": {
              "@type": "Offer",
              "price": service.startingPrice.replace(/[^\d]/g, '') || "499",
              "priceCurrency": "INR"
            }
          })
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => navigate('/')} className="hover:text-slate-800 transition-colors">Home</button>
        <span>/</span>
        <button onClick={() => navigate('/services')} className="hover:text-slate-800 transition-colors">Services</button>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{service.name}</span>
      </nav>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>Doorstep Visit Available across Mumbai</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b192c] tracking-tight leading-tight">
            {service.name}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed max-w-xl">
            {service.fullDescription}
          </p>

          {/* Pricing & Booking Card */}
          <div className="bg-slate-100/90 rounded-2xl p-5 border border-slate-200 max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-semibold text-slate-500">Transparent Pricing</span>
                <p className="text-2xl font-black text-blue-900">{priceDisplay}</p>
              </div>
              <span className="text-[11px] font-medium text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Doorstep Visit Included
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book on WhatsApp</span>
              </a>

              <a
                href={SST_PHONE_CALL_LINK}
                className="py-3 px-4 rounded-xl font-semibold text-xs text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg relative bg-slate-900 group">
            <img
              src={service.image || '/images/hero-technician.jpg'}
              alt={service.name}
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
              <p className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Certified On-Site Servicing in Mumbai</span>
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">Technicians equipped with ESD workmats and precision testing tools</p>
            </div>
          </div>
        </div>
      </div>

      {/* Common Problems Addressed */}
      {service.commonProblems && service.commonProblems.length > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0b192c]">
              Common Issues &amp; Problems Addressed
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Our technicians frequently diagnose and resolve these specific symptoms on-site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {service.commonProblems.map((prob, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs"
              >
                <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {prob}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Doorstep Service Benefits & Diagnostic Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Benefits */}
        {service.doorstepBenefits && service.doorstepBenefits.length > 0 && (
          <div className="bg-blue-50/70 rounded-2xl p-6 sm:p-8 border border-blue-100 space-y-4">
            <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
              <span>Doorstep Service Advantages</span>
            </h3>
            <ul className="space-y-3">
              {service.doorstepBenefits.map((ben, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-blue-900 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Diagnostic Checklist */}
        {service.diagnosticChecklist && service.diagnosticChecklist.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-orange-600" />
              <span>Our Multi-Point Diagnostic Protocol</span>
            </h3>
            <ul className="space-y-3">
              {service.diagnosticChecklist.map((check, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Relevant FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0b192c]">
              Questions About {service.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Helpful answers regarding this specific repair service.
            </p>
          </div>

          <div className="space-y-3 max-w-4xl">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WhatsApp Booking Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold">
            Book {service.name} in Mumbai
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100">
            Contact our technician desk now on WhatsApp for instant estimate &amp; appointment confirmation.
          </p>
        </div>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-6 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-emerald-700" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* Related Services */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Other Electronics Repair Services
          </h3>
          <button
            onClick={() => {
              navigate('/services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-blue-700 hover:underline"
          >
            View All Services
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {relatedServices.map((rel) => (
            <div
              key={rel.id}
              onClick={() => {
                navigate(`/services/${rel.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-400 cursor-pointer transition-colors space-y-2 group"
            >
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {rel.name}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                {rel.shortDescription}
              </p>
              <span className="text-xs font-semibold text-blue-700 flex items-center gap-1 pt-1">
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
