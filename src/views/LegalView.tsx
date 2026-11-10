import React, { useEffect } from 'react';

interface LegalViewProps {
  type: 'privacy' | 'terms' | 'disclaimer' | 'service';
  navigate: (path: string) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ type, navigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type]);

  const config = {
    privacy: {
      title: 'Privacy Policy',
      updated: 'November 2026',
      content: (
        <>
          <p>
            At SST CARE (www.sstcare.com), we respect the privacy of our clients and visitors. This Privacy Policy outlines how we collect, handle, and safeguard your personal details when you request doorstep laptop, MacBook, or desktop repair services in Mumbai.
          </p>
          <h2>1. Information We Collect</h2>
          <p>
            When you contact SST CARE via WhatsApp, telephone, or website enquiry, we collect only the necessary information to fulfill your service request, including:
          </p>
          <ul>
            <li>Your name and contact phone / WhatsApp number</li>
            <li>Your residential or office address in Mumbai for doorstep technician visits</li>
            <li>Details concerning your computer hardware, symptoms, and service requirements</li>
          </ul>
          <h2>2. Customer Device Data &amp; Confidentiality</h2>
          <p>
            We adhere strictly to on-site data confidentiality. Our technicians perform diagnostics directly in your presence. We do not access, browse, copy, or distribute any personal files, documents, photos, or passwords stored on your computer drives.
          </p>
          <h2>3. Third-Party Sharing</h2>
          <p>
            SST CARE does not sell, rent, or trade your personal contact details to third-party telemarketers or advertisers. Information is used strictly for scheduling your appointment, providing service estimates, and following up on repair quality.
          </p>
          <h2>4. Contact Us</h2>
          <p>
            If you have questions regarding our privacy practices, please contact SST CARE at +91 79 7795 4302 or through www.sstcare.com.
          </p>
        </>
      )
    },
    terms: {
      title: 'Terms & Conditions',
      updated: 'November 2026',
      content: (
        <>
          <p>
            Welcome to SST CARE (www.sstcare.com). By engaging our doorstep electronics repair services, contacting us via WhatsApp, or using this website, you agree to comply with and be bound by the following Terms &amp; Conditions.
          </p>
          <h2>1. Scope of Service</h2>
          <p>
            SST CARE provides on-site diagnostic, repair, cleaning, and software installation services for laptops, MacBooks, desktops, and All-in-One computers in Mumbai, Maharashtra.
          </p>
          <h2>2. On-Site Inspection &amp; Approvals</h2>
          <p>
            Before any hardware component is replaced or repair procedure initiated, the technician will explain the findings and provide a transparent cost estimate. Work proceeds only upon customer consent.
          </p>
          <h2>3. Data Backup Responsibility</h2>
          <p>
            While SST CARE takes utmost care during all operations, customers are advised to maintain backup copies of critical personal and business data. SST CARE is not liable for data loss arising from pre-existing drive degradation, corrupt filesystems, or viral infections.
          </p>
          <h2>4. Payment Terms</h2>
          <p>
            Payment for completed doorstep service and replacement parts is due upon completion of the visit and customer verification. We do not require advance online booking fees.
          </p>
        </>
      )
    },
    disclaimer: {
      title: 'Disclaimer',
      updated: 'November 2026',
      content: (
        <>
          <p>
            The information provided by SST CARE on www.sstcare.com is for general informational and service booking purposes only.
          </p>
          <h2>1. Independent Service Provider</h2>
          <p>
            SST CARE is an independent electronics repair and technical maintenance service provider in Mumbai. Product brand names (such as Apple, MacBook, Windows, Microsoft Office, Dell, HP, Lenovo, Asus, Acer) are referenced purely for identification and compatibility purposes. SST CARE does not claim direct affiliation or authorized dealership unless explicitly certified.
          </p>
          <h2>2. Service Outcomes</h2>
          <p>
            Electronics repairs depend upon the underlying condition of silicon chipsets, circuits, and motherboards. While our technicians employ professional diagnostic standards, devices subjected to severe electrical surges or water immersion may exhibit non-recoverable internal damage.
          </p>
          <h2>3. External Links</h2>
          <p>
            Our website provides links to external destinations such as our verified Google Business Profile. We are not responsible for content or availability on third-party domains.
          </p>
        </>
      )
    },
    service: {
      title: 'Cancellation and Service Policy',
      updated: 'November 2026',
      content: (
        <>
          <p>
            At SST CARE, our priority is providing prompt, transparent, and hassle-free electronics repair at your doorstep in Mumbai.
          </p>
          <h2>1. Appointment Rescheduling &amp; Cancellation</h2>
          <p>
            We understand that schedules can change. You may reschedule or cancel your doorstep appointment free of charge by notifying us via WhatsApp or phone at +91 79 7795 4302 at least 2 hours before the scheduled technician arrival time.
          </p>
          <h2>2. On-Site Inspection Fee</h2>
          <p>
            If a technician visits your premises and performs diagnostic testing, but you decide not to proceed with the recommended repair, a nominal doorstep inspection fee (as stated in our starting prices) applies to cover travel and diagnostic time. If you approve the repair, the inspection fee is absorbed into the service charge.
          </p>
          <h2>3. Warranty on Replacement Hardware</h2>
          <p>
            New replacement hardware components installed by SST CARE (such as SSDs, RAM, replacement laptop screens, and cooling fans) carry standard manufacturer warranty terms, which are provided upon job completion. Physical breakage, water damage, or electrical burnt chips occurring after delivery are excluded from warranty coverage.
          </p>
        </>
      )
    }
  }[type];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button onClick={() => navigate('/')} className="hover:text-slate-800 transition-colors">Home</button>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{config.title}</span>
      </nav>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xs space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">Legal Document</span>
          <h1 className="text-3xl font-extrabold text-[#0b192c] tracking-tight mt-1">{config.title}</h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: {config.updated} · SST CARE Mumbai</p>
        </div>

        <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-4 border-t border-slate-100 pt-6">
          {config.content}
        </div>
      </div>
    </div>
  );
};
