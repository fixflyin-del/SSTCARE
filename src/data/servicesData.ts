import { ServiceItem } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    "id": "laptop-repair",
    "slug": "laptop-repair",
    "name": "Laptop Repair at Doorstep",
    "shortDescription": "Professional laptop troubleshooting, screen replacement, hinge repair, and motherboard servicing at your home or office.",
    "fullDescription": "SST CARE offers comprehensive on-site laptop repair across Mumbai. Whether your laptop won't turn on, is suffering from sudden restarts, broken display panels, malfunctioning keyboards, or loose hinges, our experienced technician arrives at your doorstep equipped with precision diagnostic instruments and replacement spares to test and restore your device with full transparency.",
    "startingPrice": "₹499",
    "image": "/images/hero-technician.jpg",
    "active": true,
    "commonProblems": [
      "Laptop not powering on or dead battery charging circuit",
      "Cracked screen, blank display, horizontal/vertical lines",
      "Broken or jammed screen hinges and top panel damage",
      "Keys not working, keyboard ghost typing or liquid spill",
      "Frequent blue screen (BSOD) crashes, boot loop, or freezing",
      "Loose DC power jack or overheating processor"
    ],
    "doorstepBenefits": [
      "Zero travel hassle — technician visits your home or office directly",
      "Direct observation of diagnosis with complete data confidentiality",
      "Transparent price estimate provided before opening or replacing hardware",
      "Same-day inspection across major residential and commercial areas in Mumbai"
    ],
    "diagnosticChecklist": [
      "Power rail & battery health assessment",
      "Display flex cable & panel integrity test",
      "Storage SSD/HDD SMART health & RAM memory diagnosis",
      "Motherboard component & charging IC circuit check",
      "Thermal exhaust and cooling fan efficiency evaluation"
    ],
    "faqs": [
      {
        "question": "Can laptop repair really be completed at my home?",
        "answer": "Yes, over 80% of common laptop issues (screen replacements, keyboard swaps, SSD/RAM upgrades, fan servicing, and software troubleshooting) are performed directly in front of you at your home or office."
      },
      {
        "question": "What if my laptop motherboard requires specialized micro-soldering?",
        "answer": "If advanced BGA rework or micro-soldering is required, our technician documents the device serial number with a formal job-sheet, services it in our workshop, and delivers it safely back to your doorstep."
      }
    ]
  },
  {
    "id": "macbook-repair",
    "slug": "macbook-repair",
    "name": "MacBook Repair",
    "shortDescription": "Specialized Apple MacBook troubleshooting, logic board diagnostics, screen replacement, trackpad and battery servicing.",
    "fullDescription": "Apple MacBooks require specialized pentalobe tools, anti-static workmats, and intimate knowledge of Apple logic board architectures. From MacBook Air M1/M2/M3 to MacBook Pro Retina and Apple Silicon machines, SST CARE delivers certified-grade diagnostic and repair assistance at your doorstep in Mumbai with authentic components.",
    "startingPrice": "₹999",
    "image": "/images/macbook-repair.jpg",
    "active": true,
    "commonProblems": [
      "MacBook displaying question mark folder or Apple logo boot loop",
      "Battery 'Service Recommended' prompt, fast draining, or swelling",
      "Liquid damage, tea/coffee spill, or logic board corrosion",
      "Flexgate stage-light backlight failure on display",
      "Trackpad haptic feedback failure or unresponsive butterfly/scissor keys",
      "USB-C Thunderbolt ports not detecting chargers or external displays"
    ],
    "doorstepBenefits": [
      "Specialized Apple diagnostic protocol executed at your premises",
      "Safe handling with electrostatic discharge (ESD) wrist straps and mats",
      "Component-level logic board recovery options saving high Apple Store replacement costs",
      "Complete data privacy — your personal files stay safely on your drive"
    ],
    "diagnosticChecklist": [
      "Apple Hardware Diagnostic (AHD) & system sensor probe",
      "Battery cycle count, milliamp-hour capacity & cell degradation check",
      "Logic board power management IC (PMIC) and SMC/T2/Apple Silicon rails",
      "Liquid contact indicators (LCI) inspection",
      "Retina display LVDS/eDP flex cable tension test"
    ],
    "faqs": [
      {
        "question": "Do you repair both Intel and Apple Silicon (M1/M2/M3) MacBooks?",
        "answer": "Yes, SST CARE technicians handle both Intel-based MacBooks and the latest Apple Silicon M1, M2, and M3 Air and Pro lines."
      },
      {
        "question": "How long does a MacBook battery replacement take at doorstep?",
        "answer": "A MacBook battery replacement is typically completed within 45 to 60 minutes on-site using precision solvent dissolution to safely remove glued cells."
      }
    ]
  },
  {
    "id": "laptop-deep-cleaning",
    "slug": "laptop-deep-cleaning",
    "name": "Laptop Deep Cleaning",
    "shortDescription": "Complete internal dust removal, high-grade thermal paste renewal, cooling fan servicing and thermal maintenance.",
    "fullDescription": "Mumbai's high humidity and urban dust cause laptop cooling radiators and micro-fins to clog with thick fibrous lint within 6 to 12 months. When heat cannot escape, your CPU and GPU throttle down, causing frustrating stuttering and premature motherboard chip failure. SST CARE provides professional on-site laptop deep cleaning using anti-static brushes, compressed air, and top-tier thermal compounds.",
    "startingPrice": "₹699",
    "image": "/images/laptop-cleaning.jpg",
    "active": true,
    "commonProblems": [
      "Laptop bottom base running burning hot to touch",
      "Fan making loud rattling, grinding, or high-pitched whining noise",
      "Sudden thermal shutdown during multitasking, video calls, or work",
      "Keyboard deck feeling uncomfortably warm",
      "Sluggish system responsiveness due to CPU thermal throttling"
    ],
    "doorstepBenefits": [
      "Immediate temperature drop of 10°C to 25°C verified on-site",
      "High-performance thermal compound applied (Arctic MX-4 / Thermal Grizzly grade)",
      "Extended lifespan for expensive processor and graphics chipsets",
      "Completely quiet, smooth fan operation restored within 45 minutes"
    ],
    "diagnosticChecklist": [
      "Pre-cleaning baseline CPU/GPU idle and stress temperature log",
      "Careful chassis disassembly and battery safety disconnection",
      "Fan impeller removal, lint extraction, and bearing lubrication",
      "Old, crusty thermal interface material (TIM) chemical removal with 99% IPA",
      "Precision dot/spread thermal paste reapplication and post-service thermal verification"
    ],
    "faqs": [
      {
        "question": "How often should I get my laptop deep cleaned in Mumbai?",
        "answer": "Due to Mumbai's coastal humidity and airborne dust, we recommend professional internal deep cleaning every 9 to 12 months for standard laptops, and every 6 months for heavily used systems."
      }
    ]
  },
  {
    "id": "all-in-one-pc-repair",
    "slug": "all-in-one-pc-repair",
    "name": "All-in-One PC Repair",
    "shortDescription": "Professional all-in-one computer troubleshooting, SSD upgrades, power supply repair and display servicing.",
    "fullDescription": "All-in-One (AIO) computers from HP, Dell, Lenovo, and Asus pack complete desktop hardware into the display chassis. Transporting heavy, fragile AIO screens to a repair market is risky. SST CARE eliminates this hassle by servicing your All-in-One computer right on your desk.",
    "startingPrice": "₹799",
    "image": "/images/desktop-pc.jpg",
    "active": true,
    "commonProblems": [
      "All-in-One PC turns on with black screen or power LED blinking",
      "Sluggish mechanical hard drive causing 10-minute Windows boot times",
      "Inverter board or screen backlight failure",
      "Internal power supply (SMPS) or external power brick failure",
      "Overheating due to compact rear chassis dust entrapment"
    ],
    "doorstepBenefits": [
      "No risk of cracking fragile 24-inch or 27-inch glass display during transit",
      "Super-fast high-speed NVMe/SATA SSD upgrades done on your desk",
      "Transparent component check in your presence"
    ],
    "diagnosticChecklist": [
      "Internal SMPS and DC inverter voltage testing",
      "Panel LVDS connection & backlight ribbon inspection",
      "Mechanical HDD to solid state drive cloning & verification",
      "Thermal fan clearance inside tight AIO enclosures"
    ],
    "faqs": [
      {
        "question": "Can you upgrade the storage and RAM in my All-in-One PC at home?",
        "answer": "Yes, we upgrade conventional slow mechanical hard drives to ultra-fast SSDs and install compatible DDR4/DDR5 RAM directly at your home, cloning your data intact."
      }
    ]
  },
  {
    "id": "desktop-repair",
    "slug": "desktop-repair",
    "name": "Desktop Computer Repair",
    "shortDescription": "Desktop computer diagnosis, component troubleshooting, motherboard diagnostics and performance upgrades.",
    "fullDescription": "Whether your home office PC or gaming rig has continuous beep codes, won't boot into Windows, or refuses to power on, SST CARE's desktop computer technicians identify the failed component quickly. We carry test SMPS units, diagnostic POST cards, RAM modules, and thermal supplies directly to your doorstep in Mumbai.",
    "startingPrice": "₹499",
    "image": "/images/desktop-pc.jpg",
    "active": true,
    "commonProblems": [
      "Desktop powers on with fans spinning but displays 'No Signal'",
      "Continuous or repeating motherboard BIOS beep codes",
      "Power supply (SMPS) sudden short-circuit or burning odor",
      "Operating system crash loops, corrupt registry, or malware",
      "Dedicated graphics card (GPU) display artifacts or driver crashing"
    ],
    "doorstepBenefits": [
      "Avoid lifting heavy, bulky desktop towers through Mumbai traffic",
      "On-site diagnostic isolation of RAM, motherboard, GPU, and PSU",
      "Upgrades to modern high-speed NVMe SSDs and power-efficient PSUs"
    ],
    "diagnosticChecklist": [
      "SMPS 12V, 5V, and 3.3V power supply rail multimeter probing",
      "Motherboard POST diagnostic code reading",
      "RAM gold contact oxidation cleaning and single-stick memory testing",
      "CMOS battery voltage check and BIOS settings reset"
    ],
    "faqs": [
      {
        "question": "Do you assemble custom PC parts purchased by customers?",
        "answer": "Yes, our technician can visit your location to assemble custom desktop PC builds, cable manage the chassis, install the operating system, and configure hardware drivers."
      }
    ]
  },
  {
    "id": "gaming-laptop-deep-cleaning",
    "slug": "gaming-laptop-deep-cleaning",
    "name": "Gaming Laptop Deep Cleaning",
    "shortDescription": "Specialized internal cleaning, vapor chamber maintenance, and premium thermal paste application for gaming laptops.",
    "fullDescription": "High-end gaming laptops (Asus ROG, TUF, Acer Predator, Lenovo Legion, Dell Alienware, HP Omen, MSI) run high-wattage CPUs and GPUs that easily exceed 90°C if cooling channels are compromised. SST CARE provides specialized gaming laptop maintenance using high-thermal-conductivity compounds and delicate handling of vapor chambers and liquid metal systems.",
    "startingPrice": "₹899",
    "image": "/images/gaming-laptop.jpg",
    "active": true,
    "commonProblems": [
      "Extreme thermal throttling causing FPS drops and stutter in games",
      "CPU temperatures hitting 95°C–100°C under moderate loads",
      "Dual turbo blower fans whistling or vibrating abnormally",
      "Dried-out manufacturer thermal paste after 1–2 years of intensive gaming",
      "Clogged exhaust copper fins preventing airflow exhaust"
    ],
    "doorstepBenefits": [
      "Restores factory thermal headroom and consistent FPS performance",
      "Premium thermal paste options (Thermal Grizzly Kryonaut, Arctic MX-6)",
      "Conducted with anti-static safeguards in your living room or study"
    ],
    "diagnosticChecklist": [
      "Pre & post Cinebench/FurMark thermal temperature delta capture",
      "Dual/triple high-RPM blower fan housing tear-down & dust purging",
      "Vapor chamber / copper heat pipe flatness & vacuum integrity check",
      "VRM and VRAM thermal pad condition inspection and renewal"
    ],
    "faqs": [
      {
        "question": "Can thermal throttling really be resolved by deep cleaning?",
        "answer": "Absolutely. In over 95% of cases, cleaning dust from micro-fins and applying fresh enthusiast-grade thermal paste reduces core temps by 12°C–20°C and eliminates gaming frame drops."
      }
    ]
  },
  {
    "id": "software-installation",
    "slug": "software-installation",
    "name": "Software Installation",
    "shortDescription": "Professional installation and setup of supported computer software, utility drivers, and system tools.",
    "fullDescription": "Need essential workstation software properly set up without conflicting background processes or malware? SST CARE assists individuals, freelance professionals, and businesses across Mumbai with professional installation, configuration, and driver tuning for laptops and desktops.",
    "startingPrice": "₹399",
    "image": "/images/hero-technician.jpg",
    "active": true,
    "commonProblems": [
      "Software installer throwing error codes or dependency missing alerts",
      "Corrupted runtime libraries (Visual C++ Redistributable, .NET Framework)",
      "Audio, Wi-Fi, Bluetooth or discrete GPU driver conflicts",
      "Slow boot times caused by rogue startup applications"
    ],
    "doorstepBenefits": [
      "Installed and configured cleanly without unwanted adware or toolbars",
      "Driver verification for high performance and system stability",
      "Clear guidance on best practices for regular updates"
    ],
    "diagnosticChecklist": [
      "Operating system compatibility check",
      "Removal of outdated or conflicting software versions",
      "Driver signing verification and system integrity check"
    ],
    "faqs": [
      {
        "question": "Can you help set up accounting or specialized work software?",
        "answer": "Yes, we assist with configuring licensed accounting software, graphic suites, development environments, and office utilities."
      }
    ]
  },
  {
    "id": "ms-office-installation",
    "slug": "ms-office-installation",
    "name": "MS Office Installation",
    "shortDescription": "Microsoft Office installation, setup, Outlook configuration, and activation assistance where properly licensed.",
    "fullDescription": "Get Word, Excel, PowerPoint, Outlook, and OneNote installed and running smoothly on your Windows PC or Apple MacBook. SST CARE ensures proper account linking, clean installation, Outlook mailbox synchronization (IMAP/Exchange), and seamless file association.",
    "startingPrice": "₹399",
    "image": "/images/hero-technician.jpg",
    "active": true,
    "commonProblems": [
      "Microsoft Office throwing 'Product Unlicensed' or activation prompts",
      "Outlook not syncing emails, corrupt PST/OST data files",
      "Multiple conflicting Office versions slowing down system startup",
      "Excel crashing during heavy workbook calculations"
    ],
    "doorstepBenefits": [
      "Proper Microsoft account sign-in and license allocation",
      "Expert Outlook profile migration and email synchronization",
      "Works smoothly across Windows 11, 10, and macOS Sonoma/Sequoia"
    ],
    "diagnosticChecklist": [
      "Clean removal of old broken Office installations",
      "64-bit architecture deployment for modern performance",
      "Outlook mail profile setup and test send/receive verification"
    ],
    "faqs": [
      {
        "question": "Can you set up Microsoft Office on an Apple MacBook?",
        "answer": "Yes, we configure Microsoft 365 and standalone Office for Mac, fully compatible with macOS and Apple Silicon architecture."
      }
    ]
  },
  {
    "id": "windows-installation",
    "slug": "windows-installation",
    "name": "Windows Installation",
    "shortDescription": "Windows installation, reinstallation, configuration, SSD partition setup, and driver configuration.",
    "fullDescription": "A fresh Windows installation revitalizes any sluggish computer, removes hidden background bloatware, and gives you a clean slate. SST CARE provides doorstep Windows 11 and Windows 10 installation with proper GPT/UEFI partition alignment, genuine driver integration, and safe personal data preservation.",
    "startingPrice": "₹499",
    "image": "/images/hero-technician.jpg",
    "active": true,
    "commonProblems": [
      "Windows failing to boot with 'Automatic Repair Couldn't Repair Your PC'",
      "Sluggish system burdened by years of residual cache and registry bloat",
      "Ransomware, malware, or virus infection requiring clean drive wipe",
      "Upgrading from old mechanical HDD to high-speed SSD"
    ],
    "doorstepBenefits": [
      "Clean installation from official Microsoft distribution media",
      "Personal data safety: Documents, photos, and files backed up beforehand",
      "Full installation of official motherboard, Wi-Fi, audio, and chipset drivers"
    ],
    "diagnosticChecklist": [
      "SSD/HDD partition health & SMART parameter check",
      "UEFI Secure Boot and TPM 2.0 configuration for Windows 11",
      "Driver pack deployment and Windows Update optimization"
    ],
    "faqs": [
      {
        "question": "Will I lose my existing desktop files and documents?",
        "answer": "No. Our technician creates a dedicated backup of your Desktop, Documents, Downloads, and personal folders before performing the installation."
      }
    ]
  }
];
