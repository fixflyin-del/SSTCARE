import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSchema } from '../types';
import { parseWordPressExport } from './wordpressParser';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const WP_EXPORT_FILE = path.resolve(process.cwd(), 'public/assets/aistudio/sstcare.WordPress.2026-11-10_b3702bf6.xml');

const INITIAL_DATA: DatabaseSchema = {
  settings: {
    brandName: "SST CARE",
    tagline: "Professional Electronics Repair Service",
    phone: "+91 79 7795 4302",
    whatsapp: "+91 79 7795 4302",
    email: "contact@sstcare.com",
    websiteUrl: "https://www.sstcare.com",
    googleBusinessUrl: "https://maps.app.goo.gl/RgC4ZUFohx93mFne8",
    serviceCity: "Mumbai",
    serviceState: "Maharashtra",
    serviceAreas: [
      "Andheri West & East",
      "Bandra & Khar",
      "Powai & Chandivali",
      "Borivali & Kandivali",
      "Dadar & Mahim",
      "Goregaon & Malad",
      "BKC & Kurla",
      "Thane West",
      "Navi Mumbai (Vashi / Nerul)",
      "South Mumbai (Colaba to Worli)",
      "Ghatkopar & Chembur",
      "Santacruz & Vile Parle"
    ],
    homepageSeoTitle: "Laptop, MacBook & Desktop Repair at Your Doorstep in Mumbai | SST CARE",
    homepageSeoDescription: "Professional laptop repair, MacBook service and desktop computer repair at your home or office in Mumbai. Convenient doorstep visit & expert WhatsApp booking at +91 79 7795 4302.",
    currency: "₹",
    todaysOffer: "Todays Offer - Free Home Visit"
  },
  services: [
    {
      id: "laptop-repair",
      slug: "laptop-repair",
      name: "Laptop Repair at Doorstep",
      shortDescription: "Professional laptop troubleshooting, screen replacement, hinge repair, and motherboard servicing at your home or office.",
      fullDescription: "SST CARE offers comprehensive on-site laptop repair across Mumbai. Whether your laptop won't turn on, is suffering from sudden restarts, broken display panels, malfunctioning keyboards, or loose hinges, our experienced technician arrives at your doorstep equipped with precision diagnostic instruments and replacement spares to test and restore your device with full transparency.",
      startingPrice: "₹499",
      image: "/images/hero-technician.jpg",
      active: true,
      commonProblems: [
        "Laptop not powering on or dead battery charging circuit",
        "Cracked screen, blank display, horizontal/vertical lines",
        "Broken or jammed screen hinges and top panel damage",
        "Keys not working, keyboard ghost typing or liquid spill",
        "Frequent blue screen (BSOD) crashes, boot loop, or freezing",
        "Loose DC power jack or overheating processor"
      ],
      doorstepBenefits: [
        "Zero travel hassle — technician visits your home or office directly",
        "Direct observation of diagnosis with complete data confidentiality",
        "Transparent price estimate provided before opening or replacing hardware",
        "Same-day inspection across major residential and commercial areas in Mumbai"
      ],
      diagnosticChecklist: [
        "Power rail & battery health assessment",
        "Display flex cable & panel integrity test",
        "Storage SSD/HDD SMART health & RAM memory diagnosis",
        "Motherboard component & charging IC circuit check",
        "Thermal exhaust and cooling fan efficiency evaluation"
      ],
      faqs: [
        {
          question: "Can laptop repair really be completed at my home?",
          answer: "Yes, over 80% of common laptop issues (screen replacements, keyboard swaps, SSD/RAM upgrades, fan servicing, and software troubleshooting) are performed directly in front of you at your home or office."
        },
        {
          question: "What if my laptop motherboard requires specialized micro-soldering?",
          answer: "If advanced BGA rework or micro-soldering is required, our technician documents the device serial number with a formal job-sheet, services it in our workshop, and delivers it safely back to your doorstep."
        }
      ]
    },
    {
      id: "macbook-repair",
      slug: "macbook-repair",
      name: "MacBook Repair",
      shortDescription: "Specialized Apple MacBook troubleshooting, logic board diagnostics, screen replacement, trackpad and battery servicing.",
      fullDescription: "Apple MacBooks require specialized pentalobe tools, anti-static workmats, and intimate knowledge of Apple logic board architectures. From MacBook Air M1/M2/M3 to MacBook Pro Retina and Apple Silicon machines, SST CARE delivers certified-grade diagnostic and repair assistance at your doorstep in Mumbai with authentic components.",
      startingPrice: "₹999",
      image: "/images/macbook-repair.jpg",
      active: true,
      commonProblems: [
        "MacBook displaying question mark folder or Apple logo boot loop",
        "Battery 'Service Recommended' prompt, fast draining, or swelling",
        "Liquid damage, tea/coffee spill, or logic board corrosion",
        "Flexgate stage-light backlight failure on display",
        "Trackpad haptic feedback failure or unresponsive butterfly/scissor keys",
        "USB-C Thunderbolt ports not detecting chargers or external displays"
      ],
      doorstepBenefits: [
        "Specialized Apple diagnostic protocol executed at your premises",
        "Safe handling with electrostatic discharge (ESD) wrist straps and mats",
        "Component-level logic board recovery options saving high Apple Store replacement costs",
        "Complete data privacy — your personal files stay safely on your drive"
      ],
      diagnosticChecklist: [
        "Apple Hardware Diagnostic (AHD) & system sensor probe",
        "Battery cycle count, milliamp-hour capacity & cell degradation check",
        "Logic board power management IC (PMIC) and SMC/T2/Apple Silicon rails",
        "Liquid contact indicators (LCI) inspection",
        "Retina display LVDS/eDP flex cable tension test"
      ],
      faqs: [
        {
          question: "Do you repair both Intel and Apple Silicon (M1/M2/M3) MacBooks?",
          answer: "Yes, SST CARE technicians handle both Intel-based MacBooks and the latest Apple Silicon M1, M2, and M3 Air and Pro lines."
        },
        {
          question: "How long does a MacBook battery replacement take at doorstep?",
          answer: "A MacBook battery replacement is typically completed within 45 to 60 minutes on-site using precision solvent dissolution to safely remove glued cells."
        }
      ]
    },
    {
      id: "laptop-deep-cleaning",
      slug: "laptop-deep-cleaning",
      name: "Laptop Deep Cleaning",
      shortDescription: "Complete internal dust removal, high-grade thermal paste renewal, cooling fan servicing and thermal maintenance.",
      fullDescription: "Mumbai's high humidity and urban dust cause laptop cooling radiators and micro-fins to clog with thick fibrous lint within 6 to 12 months. When heat cannot escape, your CPU and GPU throttle down, causing frustrating stuttering and premature motherboard chip failure. SST CARE provides professional on-site laptop deep cleaning using anti-static brushes, compressed air, and top-tier thermal compounds.",
      startingPrice: "₹699",
      image: "/images/laptop-cleaning.jpg",
      active: true,
      commonProblems: [
        "Laptop bottom base running burning hot to touch",
        "Fan making loud rattling, grinding, or high-pitched whining noise",
        "Sudden thermal shutdown during multitasking, video calls, or work",
        "Keyboard deck feeling uncomfortably warm",
        "Sluggish system responsiveness due to CPU thermal throttling"
      ],
      doorstepBenefits: [
        "Immediate temperature drop of 10°C to 25°C verified on-site",
        "High-performance thermal compound applied (Arctic MX-4 / Thermal Grizzly grade)",
        "Extended lifespan for expensive processor and graphics chipsets",
        "Completely quiet, smooth fan operation restored within 45 minutes"
      ],
      diagnosticChecklist: [
        "Pre-cleaning baseline CPU/GPU idle and stress temperature log",
        "Careful chassis disassembly and battery safety disconnection",
        "Fan impeller removal, lint extraction, and bearing lubrication",
        "Old, crusty thermal interface material (TIM) chemical removal with 99% IPA",
        "Precision dot/spread thermal paste reapplication and post-service thermal verification"
      ],
      faqs: [
        {
          question: "How often should I get my laptop deep cleaned in Mumbai?",
          answer: "Due to Mumbai's coastal humidity and airborne dust, we recommend professional internal deep cleaning every 9 to 12 months for standard laptops, and every 6 months for heavily used systems."
        }
      ]
    },
    {
      id: "all-in-one-pc-repair",
      slug: "all-in-one-pc-repair",
      name: "All-in-One PC Repair",
      shortDescription: "Professional all-in-one computer troubleshooting, SSD upgrades, power supply repair and display servicing.",
      fullDescription: "All-in-One (AIO) computers from HP, Dell, Lenovo, and Asus pack complete desktop hardware into the display chassis. Transporting heavy, fragile AIO screens to a repair market is risky. SST CARE eliminates this hassle by servicing your All-in-One computer right on your desk.",
      startingPrice: "₹799",
      image: "/images/desktop-pc.jpg",
      active: true,
      commonProblems: [
        "All-in-One PC turns on with black screen or power LED blinking",
        "Sluggish mechanical hard drive causing 10-minute Windows boot times",
        "Inverter board or screen backlight failure",
        "Internal power supply (SMPS) or external power brick failure",
        "Overheating due to compact rear chassis dust entrapment"
      ],
      doorstepBenefits: [
        "No risk of cracking fragile 24-inch or 27-inch glass display during transit",
        "Super-fast high-speed NVMe/SATA SSD upgrades done on your desk",
        "Transparent component check in your presence"
      ],
      diagnosticChecklist: [
        "Internal SMPS and DC inverter voltage testing",
        "Panel LVDS connection & backlight ribbon inspection",
        "Mechanical HDD to solid state drive cloning & verification",
        "Thermal fan clearance inside tight AIO enclosures"
      ],
      faqs: [
        {
          question: "Can you upgrade the storage and RAM in my All-in-One PC at home?",
          answer: "Yes, we upgrade conventional slow mechanical hard drives to ultra-fast SSDs and install compatible DDR4/DDR5 RAM directly at your home, cloning your data intact."
        }
      ]
    },
    {
      id: "desktop-repair",
      slug: "desktop-repair",
      name: "Desktop Computer Repair",
      shortDescription: "Desktop computer diagnosis, component troubleshooting, motherboard diagnostics and performance upgrades.",
      fullDescription: "Whether your home office PC or gaming rig has continuous beep codes, won't boot into Windows, or refuses to power on, SST CARE's desktop computer technicians identify the failed component quickly. We carry test SMPS units, diagnostic POST cards, RAM modules, and thermal supplies directly to your doorstep in Mumbai.",
      startingPrice: "₹499",
      image: "/images/desktop-pc.jpg",
      active: true,
      commonProblems: [
        "Desktop powers on with fans spinning but displays 'No Signal'",
        "Continuous or repeating motherboard BIOS beep codes",
        "Power supply (SMPS) sudden short-circuit or burning odor",
        "Operating system crash loops, corrupt registry, or malware",
        "Dedicated graphics card (GPU) display artifacts or driver crashing"
      ],
      doorstepBenefits: [
        "Avoid lifting heavy, bulky desktop towers through Mumbai traffic",
        "On-site diagnostic isolation of RAM, motherboard, GPU, and PSU",
        "Upgrades to modern high-speed NVMe SSDs and power-efficient PSUs"
      ],
      diagnosticChecklist: [
        "SMPS 12V, 5V, and 3.3V power supply rail multimeter probing",
        "Motherboard POST diagnostic code reading",
        "RAM gold contact oxidation cleaning and single-stick memory testing",
        "CMOS battery voltage check and BIOS settings reset"
      ],
      faqs: [
        {
          question: "Do you assemble custom PC parts purchased by customers?",
          answer: "Yes, our technician can visit your location to assemble custom desktop PC builds, cable manage the chassis, install the operating system, and configure hardware drivers."
        }
      ]
    },
    {
      id: "gaming-laptop-deep-cleaning",
      slug: "gaming-laptop-deep-cleaning",
      name: "Gaming Laptop Deep Cleaning",
      shortDescription: "Specialized internal cleaning, vapor chamber maintenance, and premium thermal paste application for gaming laptops.",
      fullDescription: "High-end gaming laptops (Asus ROG, TUF, Acer Predator, Lenovo Legion, Dell Alienware, HP Omen, MSI) run high-wattage CPUs and GPUs that easily exceed 90°C if cooling channels are compromised. SST CARE provides specialized gaming laptop maintenance using high-thermal-conductivity compounds and delicate handling of vapor chambers and liquid metal systems.",
      startingPrice: "₹899",
      image: "/images/gaming-laptop.jpg",
      active: true,
      commonProblems: [
        "Extreme thermal throttling causing FPS drops and stutter in games",
        "CPU temperatures hitting 95°C–100°C under moderate loads",
        "Dual turbo blower fans whistling or vibrating abnormally",
        "Dried-out manufacturer thermal paste after 1–2 years of intensive gaming",
        "Clogged exhaust copper fins preventing airflow exhaust"
      ],
      doorstepBenefits: [
        "Restores factory thermal headroom and consistent FPS performance",
        "Premium thermal paste options (Thermal Grizzly Kryonaut, Arctic MX-6)",
        "Conducted with anti-static safeguards in your living room or study"
      ],
      diagnosticChecklist: [
        "Pre & post Cinebench/FurMark thermal temperature delta capture",
        "Dual/triple high-RPM blower fan housing tear-down & dust purging",
        "Vapor chamber / copper heat pipe flatness & vacuum integrity check",
        "VRM and VRAM thermal pad condition inspection and renewal"
      ],
      faqs: [
        {
          question: "Can thermal throttling really be resolved by deep cleaning?",
          answer: "Absolutely. In over 95% of cases, cleaning dust from micro-fins and applying fresh enthusiast-grade thermal paste reduces core temps by 12°C–20°C and eliminates gaming frame drops."
        }
      ]
    },
    {
      id: "software-installation",
      slug: "software-installation",
      name: "Software Installation",
      shortDescription: "Professional installation and setup of supported computer software, utility drivers, and system tools.",
      fullDescription: "Need essential workstation software properly set up without conflicting background processes or malware? SST CARE assists individuals, freelance professionals, and businesses across Mumbai with professional installation, configuration, and driver tuning for laptops and desktops.",
      startingPrice: "₹399",
      image: "/images/hero-technician.jpg",
      active: true,
      commonProblems: [
        "Software installer throwing error codes or dependency missing alerts",
        "Corrupted runtime libraries (Visual C++ Redistributable, .NET Framework)",
        "Audio, Wi-Fi, Bluetooth or discrete GPU driver conflicts",
        "Slow boot times caused by rogue startup applications"
      ],
      doorstepBenefits: [
        "Installed and configured cleanly without unwanted adware or toolbars",
        "Driver verification for high performance and system stability",
        "Clear guidance on best practices for regular updates"
      ],
      diagnosticChecklist: [
        "Operating system compatibility check",
        "Removal of outdated or conflicting software versions",
        "Driver signing verification and system integrity check"
      ],
      faqs: [
        {
          question: "Can you help set up accounting or specialized work software?",
          answer: "Yes, we assist with configuring licensed accounting software, graphic suites, development environments, and office utilities."
        }
      ]
    },
    {
      id: "ms-office-installation",
      slug: "ms-office-installation",
      name: "MS Office Installation",
      shortDescription: "Microsoft Office installation, setup, Outlook configuration, and activation assistance where properly licensed.",
      fullDescription: "Get Word, Excel, PowerPoint, Outlook, and OneNote installed and running smoothly on your Windows PC or Apple MacBook. SST CARE ensures proper account linking, clean installation, Outlook mailbox synchronization (IMAP/Exchange), and seamless file association.",
      startingPrice: "₹399",
      image: "/images/hero-technician.jpg",
      active: true,
      commonProblems: [
        "Microsoft Office throwing 'Product Unlicensed' or activation prompts",
        "Outlook not syncing emails, corrupt PST/OST data files",
        "Multiple conflicting Office versions slowing down system startup",
        "Excel crashing during heavy workbook calculations"
      ],
      doorstepBenefits: [
        "Proper Microsoft account sign-in and license allocation",
        "Expert Outlook profile migration and email synchronization",
        "Works smoothly across Windows 11, 10, and macOS Sonoma/Sequoia"
      ],
      diagnosticChecklist: [
        "Clean removal of old broken Office installations",
        "64-bit architecture deployment for modern performance",
        "Outlook mail profile setup and test send/receive verification"
      ],
      faqs: [
        {
          question: "Can you set up Microsoft Office on an Apple MacBook?",
          answer: "Yes, we configure Microsoft 365 and standalone Office for Mac, fully compatible with macOS and Apple Silicon architecture."
        }
      ]
    },
    {
      id: "windows-installation",
      slug: "windows-installation",
      name: "Windows Installation",
      shortDescription: "Windows installation, reinstallation, configuration, SSD partition setup, and driver configuration.",
      fullDescription: "A fresh Windows installation revitalizes any sluggish computer, removes hidden background bloatware, and gives you a clean slate. SST CARE provides doorstep Windows 11 and Windows 10 installation with proper GPT/UEFI partition alignment, genuine driver integration, and safe personal data preservation.",
      startingPrice: "₹499",
      image: "/images/hero-technician.jpg",
      active: true,
      commonProblems: [
        "Windows failing to boot with 'Automatic Repair Couldn't Repair Your PC'",
        "Sluggish system burdened by years of residual cache and registry bloat",
        "Ransomware, malware, or virus infection requiring clean drive wipe",
        "Upgrading from old mechanical HDD to high-speed SSD"
      ],
      doorstepBenefits: [
        "Clean installation from official Microsoft distribution media",
        "Personal data safety: Documents, photos, and files backed up beforehand",
        "Full installation of official motherboard, Wi-Fi, audio, and chipset drivers"
      ],
      diagnosticChecklist: [
        "SSD/HDD partition health & SMART parameter check",
        "UEFI Secure Boot and TPM 2.0 configuration for Windows 11",
        "Driver pack deployment and Windows Update optimization"
      ],
      faqs: [
        {
          question: "Will I lose my existing desktop files and documents?",
          answer: "No. Our technician creates a dedicated backup of your Desktop, Documents, Downloads, and personal folders before performing the installation."
        }
      ]
    }
  ],
  reviews: [
    {
      id: "rev-1",
      authorName: "Rohan Malhotra",
      rating: 5,
      text: "Outstanding doorstep service! My MacBook Pro M1 was not turning on after a minor tea splash. SST CARE technician arrived at my Bandra home on the same afternoon, diagnosed the board issue, and repaired it without the exorbitant cost Apple quoted. Genuine and transparent work.",
      date: "2026-10-18",
      sourceUrl: "https://maps.app.goo.gl/RgC4ZUFohx93mFne8",
      isVerified: true,
      isPublished: true,
      displayOnHome: true,
      location: "Bandra West, Mumbai",
      deviceRepaired: "MacBook Pro M1"
    },
    {
      id: "rev-2",
      authorName: "Pooja Kulkarni",
      rating: 5,
      text: "Had my Dell Inspiron laptop deep cleaned and thermal paste replaced by SST CARE in Andheri East. The fan was making awful loud noises and CPU was hitting 92C. After 40 minutes of meticulous cleaning, temps dropped to 65C and it runs completely silent. Highly recommend their home visit!",
      date: "2026-10-04",
      sourceUrl: "https://maps.app.goo.gl/RgC4ZUFohx93mFne8",
      isVerified: true,
      isPublished: true,
      displayOnHome: true,
      location: "Andheri East, Mumbai",
      deviceRepaired: "Dell Inspiron Laptop"
    },
    {
      id: "rev-3",
      authorName: "Anand Sheth",
      rating: 5,
      text: "Very professional desktop computer repair service at home in Powai. My desktop PC had recurring BSOD errors and wouldn't boot into Windows. Technician tested the RAM and power supply on-site, installed Windows 11 cleanly with all drivers. Punctual and polite.",
      date: "2026-09-22",
      sourceUrl: "https://maps.app.goo.gl/RgC4ZUFohx93mFne8",
      isVerified: true,
      isPublished: true,
      displayOnHome: true,
      location: "Powai, Mumbai",
      deviceRepaired: "Custom Desktop PC"
    },
    {
      id: "rev-4",
      authorName: "Vikram Sengupta",
      rating: 5,
      text: "Booked Gaming Laptop Deep Cleaning on WhatsApp for my Lenovo Legion. The technician opened the cooling chassis in front of me, cleared out thick dust blocks, and applied premium thermal paste. My gaming temps improved tremendously with zero FPS drop. 5 stars for honesty and skill.",
      date: "2026-09-11",
      sourceUrl: "https://maps.app.goo.gl/RgC4ZUFohx93mFne8",
      isVerified: true,
      isPublished: true,
      displayOnHome: true,
      location: "Borivali West, Mumbai",
      deviceRepaired: "Lenovo Legion Gaming Laptop"
    }
  ],
  blog: [
    {
      id: "post-1",
      title: "How Mumbai's Coastal Humidity Affects Laptop Internal Heatsinks and Fans",
      slug: "mumbai-humidity-laptop-cleaning-guide",
      excerpt: "Living near the Arabian Sea brings moisture-laden air that turns everyday household dust inside laptops into sticky, heat-trapping lint blankets. Learn how to prevent hardware degradation.",
      content: `<p>Mumbai's unique coastal geography means relative humidity consistently hovers between 70% and 90% for most months of the year. For electronics enthusiasts and daily remote workers, this humidity poses a silent, compounding challenge to laptop hardware.</p>
<h2>Why Airborne Dust Becomes Sticky in Mumbai</h2>
<p>In dry continental climates, internal dust remains a loose, powdery fluff that high-RPM laptop fans can partially expel through the copper radiator fins. In Mumbai, however, microscopic airborne moisture molecules bond with ambient dust particles. When drawn inside the laptop by cooling fans, this moist particulate sticks tenaciously to fan blades and the micro-channels between copper heat pipes.</p>
<p>Within 8 to 12 months, this creates an impenetrable felt-like barrier behind the exhaust grill. Heat generated by the processor and graphics chipset has nowhere to escape, forcing the internal cooling fans to spin continuously at maximum RPM while temperatures stay dangerously elevated.</p>
<h2>Key Symptoms of Moisture and Dust Buildup</h2>
<ul>
  <li>Laptop bottom surface feels uncomfortably hot within 15 minutes of booting</li>
  <li>Loud fan noise even during simple tasks like browsing or reading emails</li>
  <li>Noticeable lag and thermal throttling during video calls or multitasking</li>
  <li>Sudden unexpected shutdowns during heavy workflows to protect CPU dies</li>
</ul>
<h2>The Solution: Professional Doorstep Deep Cleaning</h2>
<p>Rather than spraying compressed air from the outside (which merely pushes the compacted dust blanket back into the fan blades and can jam the motor), professional maintenance requires opening the bottom chassis, detaching the fan assembly, thoroughly clearing the radiator fins, and renewing the dried thermal paste.</p>`,
      featuredImage: "/images/laptop-cleaning.jpg",
      imageAlt: "Technician cleaning laptop cooling fan and heat pipe assembly in Mumbai",
      category: "Laptop Maintenance",
      tags: ["Laptop Cleaning", "Mumbai", "Cooling", "Hardware Care"],
      author: {
        name: "SST CARE Technical Desk",
        role: "Senior Hardware Specialist"
      },
      publishedAt: "2026-10-15",
      status: "published",
      readTimeMinutes: 4,
      seoTitle: "Mumbai Humidity and Laptop Cooling: Deep Cleaning Guide | SST CARE",
      seoDescription: "Learn how coastal humidity in Mumbai creates heat-trapping dust inside laptops and why regular thermal paste replacement protects your motherboard."
    },
    {
      id: "post-2",
      title: "Signs Your Laptop Needs Thermal Paste Replacement Before Overheating Damage Occurs",
      slug: "signs-laptop-needs-thermal-paste-replacement",
      excerpt: "Thermal interface material transfers heat from microchips to copper pipes. Once it dries out, temperatures spike. Discover the early warning signs before chip failure happens.",
      content: `<p>Between your laptop's central processing unit (CPU), graphics processing unit (GPU), and the copper heatsink that cools them lies a thin microscopic layer known as thermal interface material (TIM), commonly called thermal paste. Although invisible from the outside, it is one of the most critical components ensuring your computer's longevity.</p>
<h2>What Happens When Thermal Paste Ages?</h2>
<p>Fresh thermal paste has a viscous consistency designed to eliminate microscopic air pockets between the silicon die and the copper heat plate. Over 18 to 24 months of cyclic heating and cooling, the liquid carrier oils evaporate. The paste becomes chalky, brittle, and cracked.</p>
<p>Once thermal paste is crusty, air gaps form. Because air is a terrible conductor of heat compared to thermal compound, thermal resistance spikes drastically. Heat remains trapped on the silicon die, causing instant thermal throttling.</p>
<h2>5 Warning Signs You Need Thermal Paste Renewal</h2>
<ol>
  <li><strong>Rapid Temperature Spikes:</strong> Temperatures jump from 45°C to 90°C within seconds of opening any demanding application.</li>
  <li><strong>Pulsing Fan Speeds:</strong> Fans accelerate aggressively to 100% speed, then slow down, then ramp up again erratically.</li>
  <li><strong>Warm Palm Rests:</strong> The chassis deck around the keyboard becomes hot to the touch.</li>
  <li><strong>System Freezing:</strong> Periodic mouse stutter or momentary OS freezes during processor-heavy tasks.</li>
  <li><strong>Degraded Benchmark Scores:</strong> Noticeable reduction in rendering times or export performance compared to when the device was new.</li>
</ol>
<h2>Why Doorstep Servicing Matters</h2>
<p>At SST CARE, our doorstep technicians carry genuine high-grade thermal paste formulations like Arctic MX-4 and Thermal Grizzly. We clean off old compound with 99% pure isopropyl alcohol and apply the precise amount needed for optimum thermal heat transfer.</p>`,
      featuredImage: "/images/gaming-laptop.jpg",
      imageAlt: "Applying fresh high performance thermal paste on laptop processor",
      category: "Hardware Guides",
      tags: ["Thermal Paste", "Overheating", "Laptop Repair", "Performance"],
      author: {
        name: "SST CARE Technical Desk",
        role: "Lead Technician"
      },
      publishedAt: "2026-10-02",
      status: "published",
      readTimeMinutes: 5,
      seoTitle: "Signs Your Laptop Needs Thermal Paste Replacement | SST CARE Mumbai",
      seoDescription: "Identify early signs of dried laptop thermal paste, overheating symptoms, and how doorstep thermal servicing restores silent laptop operation."
    },
    {
      id: "post-3",
      title: "MacBook 'Battery Service Recommended': Causes, Dangers, and Safe Doorstep Replacement",
      slug: "macbook-battery-service-recommended-guide",
      excerpt: "Seeing a service warning under your macOS battery menu? Learn what cell degradation means, the danger of trackpad swelling, and how safe on-site replacement works.",
      content: `<p>If you click the battery icon in your macOS menu bar and see a notice stating 'Service Recommended', your MacBook's power management controller has detected that the internal lithium-polymer cells have degraded below their design tolerance or sustained internal resistance anomalies.</p>
<h2>What Causes the Warning?</h2>
<p>Apple MacBook batteries are rated for approximately 1,000 complete charge cycles. However, heavy usage while connected to chargers in warm environments can degrade the electrolyte sooner. The power controller detects lower capacity retention and alerts the operating system.</p>
<h2>The Danger of Swollen Battery Cells</h2>
<p>Unlike older removable batteries, modern MacBook batteries are sealed directly beneath the aluminum trackpad and palm rest. When lithium-polymer cells degrade severely, chemical reactions produce gas, causing the battery pouches to expand physically.</p>
<p>Warning signs of battery swelling include:</p>
<ul>
  <li>Trackpad becomes stiff or impossible to click physically</li>
  <li>The bottom cover of the MacBook rocks unevenly on a flat table</li>
  <li>The display lid fails to close flush with the chassis</li>
</ul>
<p>Continuing to use a swollen battery can permanently warp the trackpad and top case assembly. Replacing the battery promptly prevents expensive cosmetic and structural damage.</p>
<h2>Safe Doorstep Replacement with SST CARE</h2>
<p>Our technicians use anti-static tools and specialized adhesive-release techniques to replace degraded MacBook batteries directly at your home in Mumbai, preserving your data and restoring 10+ hours of cordless productivity.</p>`,
      featuredImage: "/images/macbook-repair.jpg",
      imageAlt: "MacBook battery inspection and logic board repair by technician",
      category: "MacBook Tips",
      tags: ["MacBook", "Battery Service", "Apple Repair", "Doorstep Visit"],
      author: {
        name: "SST CARE Technical Desk",
        role: "Apple Hardware Specialist"
      },
      publishedAt: "2026-09-18",
      status: "published",
      readTimeMinutes: 4,
      seoTitle: "MacBook Battery Service Recommended Guide | SST CARE Mumbai",
      seoDescription: "Comprehensive guide to MacBook battery service warnings, preventing swollen trackpad damage, and doorstep battery replacement in Mumbai."
    }
  ],
  redirects: [],
  migrationHistory: []
};

export class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDataDir();
    this.data = this.loadData();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    let resultData: DatabaseSchema = INITIAL_DATA;
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        resultData = {
          ...INITIAL_DATA,
          ...parsed,
          settings: { ...INITIAL_DATA.settings, ...(parsed.settings || {}) },
          services: parsed.services?.length ? parsed.services : INITIAL_DATA.services,
          reviews: parsed.reviews?.length ? parsed.reviews : INITIAL_DATA.reviews,
          blog: parsed.blog?.length ? parsed.blog : INITIAL_DATA.blog,
          redirects: parsed.redirects || [],
          migrationHistory: parsed.migrationHistory || []
        };
      }
    } catch (err) {
      console.error('Error loading db.json, using defaults:', err);
    }

    if (!resultData.settings.todaysOffer) {
      resultData.settings.todaysOffer = "Todays Offer - Free Home Visit";
    }

    // Auto-integrate WordPress export posts if export file exists
    try {
      if (fs.existsSync(WP_EXPORT_FILE)) {
        const xml = fs.readFileSync(WP_EXPORT_FILE, 'utf-8');
        const parsedWP = parseWordPressExport(xml);
        if (parsedWP.posts && parsedWP.posts.length > 0) {
          const blogMap = new Map<string, DatabaseSchema['blog'][0]>();
          // First add existing posts
          resultData.blog.forEach(p => blogMap.set(p.slug, p));
          // Then merge or add WordPress posts
          parsedWP.posts.forEach(wpPost => {
            const existing = blogMap.get(wpPost.slug);
            if (!existing) {
              blogMap.set(wpPost.slug, wpPost);
            } else if ((wpPost.content?.length || 0) > (existing.content?.length || 0)) {
              blogMap.set(wpPost.slug, { ...existing, ...wpPost });
            }
          });
          resultData.blog = Array.from(blogMap.values());
          if (parsedWP.report && parsedWP.report.length > 0 && resultData.migrationHistory.length === 0) {
            resultData.migrationHistory = parsedWP.report;
          }
        }
      }
    } catch (err) {
      console.error('Error auto-integrating WordPress export:', err);
    }

    this.saveData(resultData);
    return resultData;
  }

  public saveData(data: DatabaseSchema) {
    this.data = data;
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write db.json:', err);
    }
  }

  // Getters
  public getSettings(): DatabaseSchema['settings'] {
    return this.data.settings;
  }

  public getServices(all = false) {
    if (all) return this.data.services;
    return this.data.services.filter(s => s.active);
  }

  public getServiceBySlug(slug: string) {
    return this.data.services.find(s => s.slug === slug || s.id === slug);
  }

  public getReviews(all = false) {
    if (all) return this.data.reviews;
    return this.data.reviews.filter(r => r.isPublished);
  }

  public getBlogPosts(all = false) {
    if (all) return this.data.blog;
    return this.data.blog.filter(p => p.status === 'published');
  }

  public getBlogPostBySlug(slug: string) {
    return this.data.blog.find(p => p.slug === slug || p.id === slug);
  }

  public getRedirects() {
    return this.data.redirects;
  }

  public getMigrationHistory() {
    return this.data.migrationHistory;
  }

  // Mutators
  public updateSettings(updates: Partial<DatabaseSchema['settings']>) {
    this.data.settings = { ...this.data.settings, ...updates };
    this.saveData(this.data);
    return this.data.settings;
  }

  public updateService(id: string, updates: Partial<DatabaseSchema['services'][0]>) {
    const idx = this.data.services.findIndex(s => s.id === id || s.slug === id);
    if (idx !== -1) {
      this.data.services[idx] = { ...this.data.services[idx], ...updates };
      this.saveData(this.data);
      return this.data.services[idx];
    }
    return null;
  }

  public addReview(review: Omit<DatabaseSchema['reviews'][0], 'id'>) {
    const newReview = {
      ...review,
      id: `rev-${Date.now()}`
    };
    this.data.reviews.unshift(newReview);
    this.saveData(this.data);
    return newReview;
  }

  public updateReview(id: string, updates: Partial<DatabaseSchema['reviews'][0]>) {
    const idx = this.data.reviews.findIndex(r => r.id === id);
    if (idx !== -1) {
      this.data.reviews[idx] = { ...this.data.reviews[idx], ...updates };
      this.saveData(this.data);
      return this.data.reviews[idx];
    }
    return null;
  }

  public deleteReview(id: string) {
    this.data.reviews = this.data.reviews.filter(r => r.id !== id);
    this.saveData(this.data);
    return true;
  }

  public addBlogPost(post: Omit<DatabaseSchema['blog'][0], 'id'>) {
    const newPost = {
      ...post,
      id: `post-${Date.now()}`
    };
    this.data.blog.unshift(newPost);
    this.saveData(this.data);
    return newPost;
  }

  public updateBlogPost(id: string, updates: Partial<DatabaseSchema['blog'][0]>) {
    const idx = this.data.blog.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.data.blog[idx] = { ...this.data.blog[idx], ...updates, updatedAt: new Date().toISOString() };
      this.saveData(this.data);
      return this.data.blog[idx];
    }
    return null;
  }

  public deleteBlogPost(id: string) {
    this.data.blog = this.data.blog.filter(p => p.id !== id);
    this.saveData(this.data);
    return true;
  }

  public addRedirect(redirect: Omit<DatabaseSchema['redirects'][0], 'id' | 'createdAt'>) {
    const newRedirect = {
      ...redirect,
      id: `red-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.data.redirects.push(newRedirect);
    this.saveData(this.data);
    return newRedirect;
  }

  public addMigrationBatch(posts: DatabaseSchema['blog'], reportItems: DatabaseSchema['migrationHistory']) {
    // Merge posts avoiding slug conflicts
    posts.forEach(p => {
      const existingIdx = this.data.blog.findIndex(b => b.slug === p.slug);
      if (existingIdx !== -1) {
        this.data.blog[existingIdx] = { ...this.data.blog[existingIdx], ...p };
      } else {
        this.data.blog.unshift(p);
      }
    });

    this.data.migrationHistory = [...reportItems, ...this.data.migrationHistory];
    this.saveData(this.data);
  }
}

export const db = new Database();
