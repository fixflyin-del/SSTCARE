import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  Clock, 
  MapPin, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Laptop,
  Cpu,
  Monitor,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';
import { ServiceItem, ReviewItem, SiteSettings } from '../types';
import { getWhatsAppBookingUrl, SST_GOOGLE_MAPS_URL } from '../lib/whatsapp';

interface HomeViewProps {
  services: ServiceItem[];
  reviews: ReviewItem[];
  settings: SiteSettings;
  navigate: (path: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ services, reviews, settings, navigate }) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Filter home reviews
  const homeReviews = reviews.filter(r => r.displayOnHome && r.isPublished);

  const faqs = [
    {
      q: "Does SST CARE provide doorstep laptop repair?",
      a: "Yes. SST CARE delivers professional doorstep repair across Mumbai. Our technician visits your residence or workplace equipped with diagnostic gear, replacement parts, and anti-static tools to repair your laptop in your presence."
    },
    {
      q: "Do you repair Apple MacBook devices?",
      a: "Yes. We specialize in Apple MacBook servicing, including MacBook Air, MacBook Pro, Intel, and Apple Silicon (M1/M2/M3) models. We handle screen replacements, logic board diagnostics, battery service, and liquid damage recovery."
    },
    {
      q: "Do you provide desktop repair at home?",
      a: "Yes. We diagnose and repair all desktop tower PCs, custom gaming rigs, and All-in-One computers at your home or office, addressing motherboard issues, power supply failures, RAM errors, and display problems."
    },
    {
      q: "Can I book a technician through WhatsApp?",
      a: "Yes, WhatsApp is our primary and most convenient booking system. Simply click any WhatsApp button on this website or message +91 79 7795 4302 with your device issue and location to receive an estimate and confirm your visit time."
    },
    {
      q: "Do you provide gaming laptop deep cleaning?",
      a: "Yes. High-performance gaming laptops require dedicated maintenance. We disassemble cooling assemblies, purge compacted dust from multi-fin copper radiators, and reapply high-grade thermal compound (such as Thermal Grizzly / Arctic) to restore thermal headroom and eliminate thermal throttling."
    },
    {
      q: "What is the cost of laptop repair?",
      a: "Our inspection and basic doorstep service starts at the transparent price listed on each service page. We provide a clear estimate on-site before initiating any repair. If specialized replacement hardware is needed, prices are shared upfront with zero hidden charges."
    },
    {
      q: "Do you provide Windows installation?",
      a: "Yes. We perform clean installations and upgrades of Windows 11 and Windows 10 with proper GPT/UEFI configuration, certified driver setup, and personal file preservation."
    },
    {
      q: "Do you provide MS Office installation?",
      a: "Yes. We install and configure Microsoft Office packages, set up Outlook mail accounts with proper sync parameters, and assist with genuine activation."
    },
    {
      q: "How can I check service availability in my location?",
      a: "SST CARE covers all major suburbs and central areas in Mumbai, including Andheri, Bandra, Powai, Borivali, Dadar, Thane, Navi Mumbai, and surrounding regions. Send us a message on WhatsApp with your pin code or locality to confirm instant availability."
    },
    {
      q: "Can I enquire about service charges before booking?",
      a: "Certainly! You can WhatsApp or call us anytime at +91 79 7795 4302 with your laptop model and symptoms. We will provide a preliminary estimate and explain the doorstep process."
    }
  ];

  return (
    <div className="space-y-20 sm:space-y-24 pb-16">
      {/* ---------------------------------------------------------- */}
      {/* SECTION 1: HERO SECTION                                     */}
      {/* ---------------------------------------------------------- */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Text & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges & Blinking Todays Offer */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Blinking Todays Offer Badge */}
                <div className="animate-offer-blink inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white text-xs font-extrabold shadow-md tracking-wide">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-300"></span>
                  </span>
                  <span className="uppercase tracking-wider">{settings.todaysOffer || "Todays Offer - Free Home Visit"}</span>
                </div>

                {/* Trust Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-blue-700" />
                  <span>Mumbai Doorstep Service</span>
                  <span className="text-blue-300">·</span>
                  <span>Home &amp; Office Visits</span>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b192c] tracking-tight leading-[1.15] text-balance">
                Laptop, MacBook &amp; Desktop Repair at Your Doorstep in Mumbai
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Professional laptop repair, MacBook service and desktop repair at your home or office. Get expert technical assistance with convenient doorstep service from SST CARE.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={getWhatsAppBookingUrl({ customMessage: "Hello SST CARE, I would like to book a doorstep repair visit in Mumbai. Please share technician availability." })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <MessageSquare className="w-4.5 h-4.5 fill-white/20" />
                  <span>Book a Repair on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  onClick={() => navigate('/services')}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore Our Services</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                  <span className="font-medium">Professional Repair</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="font-medium">Doorstep Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-blue-700 shrink-0" />
                  <span className="font-medium">MacBook Experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">WhatsApp Booking</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group">
                <img
                  src="/images/hero-technician.jpg"
                  alt="SST CARE technician repairing open laptop in Mumbai home office"
                  className="w-full h-80 sm:h-96 lg:h-[430px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Floating On-Site Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-md rounded-xl border border-white/40 shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Doorstep Diagnostics in Mumbai</p>
                    <p className="text-[11px] text-slate-600">Technician visits your home with precision tools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SECTION 2: GENUINE CUSTOMER REVIEWS (Immediately below Hero)*/}
      {/* ---------------------------------------------------------- */}
      <section className="bg-slate-100/80 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-800 mb-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Verified Google Business Reviews</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b192c]">
                Genuine Customer Feedback
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Read authentic feedback from laptop, MacBook, and desktop owners serviced at their doorstep across Mumbai.
              </p>
            </div>

            {/* Google Profile Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={SST_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <span>Read All Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href={SST_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <span>Write a Google Review</span>
                <Star className="w-3.5 h-3.5 fill-white/80" />
              </a>
            </div>
          </div>

          {/* Review Carousel */}
          {homeReviews.length > 0 ? (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {homeReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      {/* Rating Stars & Google Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-0.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      </div>

                      {/* Review Text */}
                      <p className="text-sm text-slate-700 leading-relaxed italic">
                        "{rev.text}"
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{rev.authorName}</p>
                        {rev.location && <p className="text-slate-500">{rev.location}</p>}
                      </div>
                      {rev.deviceRepaired && (
                        <span className="text-[10px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                          {rev.deviceRepaired}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-sm text-slate-600">
                Check our official ratings and submit your feedback directly on our Google Business Profile.
              </p>
              <a
                href={SST_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:underline"
              >
                <span>View SST CARE on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SECTION 3: WHY CHOOSE SST CARE?                            */}
      {/* ---------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Professional &amp; Transparent
          </p>
          <h2 className="text-3xl font-extrabold text-[#0b192c]">
            Why Choose SST CARE for Your Repair?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We built SST CARE around customer convenience, honest technical diagnosis, and direct home assistance without middlemen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Convenient Doorstep Service
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Skip Mumbai traffic and parking queues. Our technician travels directly to your home or office address at a scheduled appointment time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Professional Technicians
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipped with precision screwdrivers, thermal pastes, diagnostic multimeters, and anti-static ESD safeguards to protect delicate electronics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Laptop &amp; MacBook Expertise
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Extensive hands-on experience across Dell, HP, Lenovo, Asus, Acer, and Apple MacBook Air &amp; Pro logic board architectures.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Transparent Service Pricing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clear upfront starting prices with live on-site explanation. You only pay for the work performed with zero hidden surcharges.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Convenient WhatsApp Booking
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No lengthy forms or account registrations. Chat directly with technical coordinators on WhatsApp to confirm quotes and visits.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Home and Office Service
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Whether you are an individual working remotely or a business office needing multi-PC maintenance, we cater to flexible schedules.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SECTION 4: OUR SERVICES (9 official services)             */}
      {/* ---------------------------------------------------------- */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
              Comprehensive Hardware &amp; OS Care
            </p>
            <h2 className="text-3xl font-extrabold text-[#0b192c]">
              Our Doorstep Repair Services
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Select from our 9 specialized doorstep electronics repair and servicing options available across Mumbai.
            </p>
          </div>

          <button
            onClick={() => navigate('/services')}
            className="text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 self-start md:self-end"
          >
            <span>View Full Service Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
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
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={s.image || '/images/hero-technician.jpg'}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-[11px] font-semibold text-white border border-white/10">
                      {priceDisplay}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {s.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate(`/services/${s.slug}`)}
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
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SECTION 5: HOW OUR DOORSTEP SERVICE WORKS                  */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Simple 4-Step Process
            </p>
            <h2 className="text-3xl font-extrabold text-white mt-1">
              How Our Doorstep Service Works
            </h2>
            <p className="text-sm text-blue-200 mt-2">
              From initial enquiry to verified device restoration right inside your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
              <span className="text-2xl font-black text-orange-400">01</span>
              <h3 className="text-base font-bold text-white mt-3 mb-1">
                Choose Your Service
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Identify your issue: laptop screen, MacBook battery, slow Windows, or gaming laptop overheating.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
              <span className="text-2xl font-black text-orange-400">02</span>
              <h3 className="text-base font-bold text-white mt-3 mb-1">
                Contact SST CARE on WhatsApp
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Message us at +91 79 7795 4302 with your device symptoms and preferred Mumbai address.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
              <span className="text-2xl font-black text-orange-400">03</span>
              <h3 className="text-base font-bold text-white mt-3 mb-1">
                Confirm Your Service Visit
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Agree on a convenient time slot. Our technician arrives with diagnostic gear and parts.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
              <span className="text-2xl font-black text-orange-400">04</span>
              <h3 className="text-base font-bold text-white mt-3 mb-1">
                Get Your Device Serviced
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Watch the repair executed in front of you. Test your computer and pay easily on completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SECTION 6: SUPPORTED DEVICES                               */}
      {/* ---------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Broad Hardware Capability
          </p>
          <h2 className="text-3xl font-extrabold text-[#0b192c]">
            Devices We Repair &amp; Maintain
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Genuine diagnostic tools for all major computer form factors and operating systems.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center hover:border-blue-400 transition-colors">
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Windows Laptops</h3>
            <p className="text-[11px] text-slate-500 mt-1">Dell, HP, Lenovo, Asus, Acer</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center hover:border-blue-400 transition-colors">
            <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center mb-3">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Apple MacBook</h3>
            <p className="text-[11px] text-slate-500 mt-1">Air &amp; Pro (M1, M2, M3, Intel)</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center hover:border-blue-400 transition-colors">
            <div className="w-12 h-12 mx-auto rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Desktop Computers</h3>
            <p className="text-[11px] text-slate-500 mt-1">Towers, SMPS &amp; Motherboards</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center hover:border-blue-400 transition-colors">
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">All-in-One PCs</h3>
            <p className="text-[11px] text-slate-500 mt-1">HP, Lenovo, Dell All-in-Ones</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center hover:border-blue-400 transition-colors col-span-2 md:col-span-1">
            <div className="w-12 h-12 mx-auto rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Gaming Laptops</h3>
            <p className="text-[11px] text-slate-500 mt-1">ROG, Legion, Alienware, Predator</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SECTION: VERIFIED CUSTOMER REVIEWS (HORIZONTAL SCROLL)     */}
      {/* ---------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-2">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>4.9 / 5.0 Star Rated on Google</span>
              <span className="text-amber-300">·</span>
              <span>100% Genuine Visits</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b192c] tracking-tight">
              Customer Reviews &amp; Feedback
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Read real doorstep repair stories from customers across Bandra, Andheri, Powai, Kurla, Chembur, and Mumbai.
            </p>
          </div>

          {/* Navigation Scroll Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('reviews-horizontal-container');
                if (el) el.scrollBy({ left: -360, behavior: 'smooth' });
              }}
              className="p-3 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              aria-label="Scroll reviews left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('reviews-horizontal-container');
                if (el) el.scrollBy({ left: 360, behavior: 'smooth' });
              }}
              className="p-3 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              aria-label="Scroll reviews right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          id="reviews-horizontal-container"
          className="flex gap-5 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'thin' }}
        >
          {homeReviews.map((rev) => (
            <div
              key={rev.id}
              className="w-[300px] sm:w-[360px] md:w-[400px] shrink-0 snap-start bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  {rev.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Visit
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic line-clamp-5">
                  &ldquo;{rev.text}&rdquo;
                </p>

                {/* Device Repaired Badge */}
                {rev.deviceRepaired && (
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-[11px] font-semibold">
                      <Wrench className="w-3 h-3 text-blue-600" />
                      {rev.deviceRepaired}
                    </span>
                  </div>
                )}
              </div>

              {/* Author & Location */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                    {rev.authorName ? rev.authorName.charAt(0).toUpperCase() : 'C'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{rev.authorName}</h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {rev.location || 'Mumbai, Maharashtra'}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Link to Google Business Profile */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
          <span>👈 Swipe horizontally or use arrow buttons to browse all reviews</span>
          <a
            href={settings.googleBusinessUrl || SST_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900 transition-colors"
          >
            <span>View all Google Reviews</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SECTION 7: SERVICE AREA                                    */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-slate-100/70 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-800">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Service Coverage</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b192c]">
                Doorstep Repair Availability in Mumbai
              </h2>
              <p className="text-sm text-slate-600 max-w-xl">
                Technicians provide doorstep visits across residential societies, commercial offices, and IT hubs throughout Mumbai, Maharashtra.
              </p>
            </div>

            <a
              href={getWhatsAppBookingUrl({ customMessage: "Hello SST CARE, can you check if doorstep technician visit is available at my Mumbai location?" })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs transition-colors self-start md:self-center flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Check My Area on WhatsApp</span>
            </a>
          </div>

          {/* Area Chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {(settings.serviceAreas || []).map((area, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SECTION 8: FREQUENTLY ASKED QUESTIONS                     */}
      {/* ---------------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Answers &amp; Transparency
          </p>
          <h2 className="text-3xl font-extrabold text-[#0b192c]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600">
            Got questions about our doorstep repair protocol, pricing, or turnaround times?
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 hover:text-blue-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-orange-500 shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SECTION 9: FINAL WHATSAPP CTA                              */}
      {/* ---------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0b192c] to-[#1e3e62] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Need Professional Laptop Repair?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Get convenient doorstep repair assistance for your laptop, MacBook or desktop. Contact SST CARE today.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppBookingUrl({ customMessage: "Hello SST CARE, I need professional laptop repair at my doorstep in Mumbai. Please advise." })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5 fill-white/20" />
                <span>Chat with SST CARE on WhatsApp</span>
              </a>
              <span className="text-xs text-blue-200">or call +91 79 7795 4302</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
