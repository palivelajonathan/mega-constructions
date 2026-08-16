/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TechnicalSpecs {
  model: string;
  power: string;
  voltage: string;
  capacity?: string;
  weight: string;
  motor?: string;
  speed?: string;
  dimensions?: string;
  rebarDiameter?: string;
  bendingSpeed?: string;
  cuttingSpeed?: string;
  plateDiameter?: string;
  drivingMode?: string;
  tableThickness?: string;
  bladeSize?: string;
  packingDimension?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'rebar' | 'concrete' | 'lifting' | 'spares' | 'others';
  tagline: string;
  description: string;
  image: string;
  features: string[];
  specs: Record<string, string>; // Dynamic specification dictionary for easy row editing
  applications: string[];
  advantages: string[];
  brochureUrl?: string;
  // CMS Fields
  longDescription?: string;
  price?: string;
  warranty?: string;
  availability?: 'available' | 'low_stock' | 'out_of_stock' | 'on_request';
  status?: 'active' | 'draft';
  images?: string[]; // Multiple images list
  videoUrl?: string;
  docUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  isFeatured?: boolean;
  isHidden?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
  image?: string;
  isHidden?: boolean;
  order?: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company: string;
  comment: string;
  rating: number;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  productName: string;
  message: string;
  inquiryType: 'purchase' | 'rental' | 'repair' | 'spares';
}

export interface Inquiry extends InquiryFormData {
  id: string;
  date: string;
  status: 'pending' | 'replied' | 'read' | 'deleted';
  replyMessage?: string;
}

export interface MediaFile {
  id: string;
  url: string;
  name: string;
  category: string; // 'products' | 'gallery' | 'projects' | 'workshops' | 'services' | 'banners'
  size: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  category: 'product' | 'home' | 'featured' | 'project' | 'lightbox' | 'related' | 'detail' | 'workshop' | 'service';
  title: string;
  isFeatured?: boolean;
}

export interface SiteSettings {
  heroHeading: string;
  heroSubtitle: string;
  heroVideoUrl?: string;
  heroImageUrls: string[];
  companyIntroTitle: string;
  companyIntroText: string;
  aboutTitle: string;
  aboutText: string;
  brands: string[]; // infinite logo slider
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogTitle: string;
  ogDescription: string;
  canonicalUrl: string;
  sitemapGeneratedDate?: string;
}

