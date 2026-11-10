export interface ServiceItem {
  id: string; // e.g. 'laptop-repair'
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  startingPrice: string; // e.g. "₹499" or "Contact for Pricing"
  image: string;
  active: boolean;
  commonProblems: string[];
  doorstepBenefits: string[];
  diagnosticChecklist: string[];
  faqs: { question: string; answer: string }[];
  whatsappMessageTemplate?: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  rating: number; // 1 to 5
  text: string;
  date: string;
  sourceUrl: string;
  isVerified: boolean;
  isPublished: boolean;
  displayOnHome: boolean;
  location?: string;
  deviceRepaired?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // rich HTML or markdown
  featuredImage: string;
  imageAlt?: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  updatedAt?: string;
  status: 'published' | 'draft';
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  originalWordPressUrl?: string;
  readTimeMinutes?: number;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  websiteUrl: string;
  googleBusinessUrl: string;
  serviceCity: string;
  serviceState: string;
  serviceAreas: string[];
  homepageSeoTitle: string;
  homepageSeoDescription: string;
  currency: string;
  todaysOffer?: string;
}

export interface UrlRedirect {
  id: string;
  sourcePath: string; // e.g. "/old-blog-url" or "/2023/05/laptop-repair"
  targetPath: string; // e.g. "/blog/laptop-repair"
  statusCode: 301 | 302;
  createdAt: string;
  notes?: string;
}

export interface MigrationReportItem {
  id: string;
  originalUrl: string;
  migratedUrl: string;
  title: string;
  redirectStatus: string;
  seoStatus: string;
  imagesFound: number;
  migratedAt: string;
}

export interface DatabaseSchema {
  services: ServiceItem[];
  reviews: ReviewItem[];
  blog: BlogPost[];
  settings: SiteSettings;
  redirects: UrlRedirect[];
  migrationHistory: MigrationReportItem[];
}
