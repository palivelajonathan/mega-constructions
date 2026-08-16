/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Service, FAQItem, Testimonial, Inquiry, MediaFile, GalleryItem, SiteSettings } from '../types';
import { PRODUCTS, STATISTICS, REVIEWS, FAQS } from '../data/products';

interface CMSContextType {
  // Data States
  products: Product[];
  services: Service[];
  faqs: FAQItem[];
  testimonials: Testimonial[];
  inquiries: Inquiry[];
  mediaFiles: MediaFile[];
  galleryItems: GalleryItem[];
  siteSettings: SiteSettings;
  statistics: typeof STATISTICS;

  // Authentication State
  isAuthenticated: boolean;
  adminEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Product Operations
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  toggleHideProduct: (id: string) => void;
  toggleFeaturedProduct: (id: string) => void;

  // Service Operations
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Service) => void;
  deleteService: (id: string) => void;

  // FAQ Operations
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, faq: FAQItem) => void;
  deleteFAQ: (id: string) => void;

  // Testimonial Operations
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;

  // Enquiry / Inquiry Operations
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status'], replyMessage?: string) => void;
  deleteInquiry: (id: string) => void;

  // Media Library Operations
  addMediaFile: (name: string, url: string, category: string, size?: string) => void;
  deleteMediaFile: (id: string) => void;
  renameMediaFile: (id: string, newName: string) => void;

  // Gallery Operations
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  toggleGalleryFeatured: (id: string) => void;

  // Settings & SEO Operations
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updateStatistics: (stats: Partial<typeof STATISTICS>) => void;
  generateSitemap: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'mega_cms_products',
  SERVICES: 'mega_cms_services',
  FAQS: 'mega_cms_faqs',
  TESTIMONIALS: 'mega_cms_testimonials',
  INQUIRIES: 'mega_cms_inquiries',
  MEDIA: 'mega_cms_media_files',
  GALLERY: 'mega_cms_gallery_items',
  SETTINGS: 'mega_cms_site_settings',
  STATISTICS: 'mega_cms_statistics',
  AUTH: 'mega_cms_auth_session',
};

function readJson<T>(storage: Storage, key: string): T | null {
  try {
    const rawValue = storage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : null;
  } catch {
    // A damaged browser cache should never prevent the public site from loading.
    try {
      storage.removeItem(key);
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }
    return null;
  }
}

function writeJson<T>(storage: Storage, key: string, value: T): void {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // Content editing is best-effort when browser storage is unavailable/full.
  }
}

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({} as SiteSettings);
  const [statistics, setStatistics] = useState<typeof STATISTICS>(STATISTICS);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  // Initialize Data
  useEffect(() => {
    // 1. Load Products (or fallback to seed PRODUCTS)
    const storedProducts = readJson<Product[]>(localStorage, STORAGE_KEYS.PRODUCTS);
    if (storedProducts) {
      setProducts(storedProducts);
    } else {
      // Convert initial PRODUCTS schema structure to CMS Record-based spec format for ease
      const parsedProducts: Product[] = PRODUCTS.map(p => ({
        ...p,
        isFeatured: p.id === 'rebar-bending' || p.id === 'rebar-cutting' || p.id === 'concrete-mixer',
        isHidden: false,
        status: 'active',
        availability: 'available',
        warranty: '1 Year Warranty',
        images: [p.image],
        price: p.id === 'rebar-bending' ? '₹2,50,000' : p.id === 'rebar-cutting' ? '₹2,80,000' : 'On Request',
        seoTitle: `${p.name} - Mega Construction Equipments Hyderabad`,
        seoDescription: p.description.slice(0, 150),
        specs: p.specs as any
      }));
      setProducts(parsedProducts);
      writeJson(localStorage, STORAGE_KEYS.PRODUCTS, parsedProducts);
    }

    // 2. Load Services
    const storedServices = readJson<Service[]>(localStorage, STORAGE_KEYS.SERVICES);
    if (storedServices) {
      setServices(storedServices);
    } else {
      const initialServices: Service[] = [
        {
          id: 'supply',
          title: 'Construction Equipment Supply',
          description: 'Reliable supplier of rebar benders, cutting machines, concrete mixers, and spare parts.',
          iconName: 'Truck',
          details: [
            'Direct ex-factory dispatch from Moula-Ali assembly workshop.',
            'Detailed quality check before delivery.',
            'Fully compliant with Indian power grid safety regulations.',
            'Custom paint colors matching your corporate contracting brand.'
          ],
          image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
          isHidden: false,
          order: 1
        },
        {
          id: 'rental',
          title: 'Machinery Rental Solutions',
          description: 'Lease high-performance machinery on custom daily, weekly, or monthly plans to balance upfront cash requirements.',
          iconName: 'CalendarClock',
          details: [
            'Large fleet of fully-serviced GW-42J benders and GQ-40 cutters.',
            'Immediate on-site setup, operator induction, and commissioning.',
            'Zero-charge replacement in case of unexpected mechanical wear.',
            'Flexible term upgrades based on construction project phases.'
          ],
          image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
          isHidden: false,
          order: 2
        },
        {
          id: 'maintenance',
          title: 'Preventative Maintenance Contracts',
          description: 'Scheduled monthly checks by certified senior engineers to ensure high production speed and zero on-site accidents.',
          iconName: 'Settings2',
          details: [
            'Oil lubrication of gears, chain tightening, and blade adjustments.',
            'Electrical isolation inspections and phase preventer recalibration.',
            'Hydraulic pressure test and rotor clearance verification.',
            'Complete safety log generation for statutory industrial audits.'
          ],
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
          isHidden: false,
          order: 3
        },
        {
          id: 'repair',
          title: 'Heavy Machinery Rehabilitation',
          description: 'Expert diagnostics and rapid mechanical/electrical repairs to salvage broken or deteriorated site equipment.',
          iconName: 'Hammer',
          details: [
            'Complete copper wire rewinding for damaged 3-phase electric motors.',
            'Gearbox rehabilitation, gear replacement, and axle balancing.',
            'Heat treatment and custom hardening of worn-out cutting shears.',
            'On-site welding repairs and structural strengthening of mixer drums.'
          ],
          image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
          isHidden: false,
          order: 4
        }
      ];
      setServices(initialServices);
      writeJson(localStorage, STORAGE_KEYS.SERVICES, initialServices);
    }

    // 3. Load FAQs
    const storedFaqs = readJson<FAQItem[]>(localStorage, STORAGE_KEYS.FAQS);
    if (storedFaqs) {
      setFaqs(storedFaqs);
    } else {
      setFaqs(FAQS);
      writeJson(localStorage, STORAGE_KEYS.FAQS, FAQS);
    }

    // 4. Load Testimonials
    const storedTestimonials = readJson<Testimonial[]>(localStorage, STORAGE_KEYS.TESTIMONIALS);
    if (storedTestimonials) {
      setTestimonials(storedTestimonials);
    } else {
      setTestimonials(REVIEWS);
      writeJson(localStorage, STORAGE_KEYS.TESTIMONIALS, REVIEWS);
    }

    // 5. Load Statistics
    const storedStats = readJson<typeof STATISTICS>(localStorage, STORAGE_KEYS.STATISTICS);
    if (storedStats) {
      setStatistics(storedStats);
    } else {
      setStatistics(STATISTICS);
      writeJson(localStorage, STORAGE_KEYS.STATISTICS, STATISTICS);
    }

    // 6. Load enquiries. New sites start empty; live requests are supplied by the form endpoint.
    const storedInquiries = readJson<Inquiry[]>(localStorage, STORAGE_KEYS.INQUIRIES);
    if (storedInquiries) {
      setInquiries(storedInquiries);
    } else {
      const initialInquiries: Inquiry[] = [];
      /*
          replyMessage: 'Sent quotation of ₹45,000/month with setup/dismantling extra. Customer accepted terms and we scheduled commissioning for August.'
      */
      setInquiries([]);
      writeJson(localStorage, STORAGE_KEYS.INQUIRIES, []);
    }

    // 7. Load Media Library (Prepopulate with awesome high-res industrial machine stock photos)
    const storedMedia = readJson<MediaFile[]>(localStorage, STORAGE_KEYS.MEDIA);
    if (storedMedia) {
      setMediaFiles(storedMedia);
    } else {
      const initialMedia: MediaFile[] = [
        {
          id: 'med-1',
          url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
          name: 'gw_42j_bender_workshop',
          category: 'products',
          size: '420 KB',
          date: '2026-07-01'
        },
        {
          id: 'med-2',
          url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
          name: 'gq_40_cutter_shearing',
          category: 'products',
          size: '390 KB',
          date: '2026-07-01'
        },
        {
          id: 'med-3',
          url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
          name: 'heavy_duty_concrete_mixer',
          category: 'products',
          size: '512 KB',
          date: '2026-07-01'
        },
        {
          id: 'med-4',
          url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
          name: 'mini_crane_hoist_site',
          category: 'products',
          size: '280 KB',
          date: '2026-07-01'
        },
        {
          id: 'med-5',
          url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
          name: 'original_spare_parts_hyd',
          category: 'gallery',
          size: '1.2 MB',
          date: '2026-07-05'
        },
        {
          id: 'med-6',
          url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
          name: 'workshop_assembly_floor',
          category: 'workshops',
          size: '980 KB',
          date: '2026-07-06'
        }
      ];
      setMediaFiles(initialMedia);
      writeJson(localStorage, STORAGE_KEYS.MEDIA, initialMedia);
    }

    // 8. Load Gallery Items
    const storedGallery = readJson<GalleryItem[]>(localStorage, STORAGE_KEYS.GALLERY);
    if (storedGallery) {
      setGalleryItems(storedGallery);
    } else {
      const initialGallery: GalleryItem[] = [
        {
          id: 'gal-1',
          url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
          category: 'project',
          title: 'Orange Mini Crane Hoist Deployment',
          isFeatured: true
        },
        {
          id: 'gal-2',
          url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
          category: 'workshop',
          title: 'Heavy Duty 10/7 Concrete Mixers Assembly',
          isFeatured: true
        },
        {
          id: 'gal-3',
          url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
          category: 'workshop',
          title: 'Rebar Processing Machine Commissioning',
          isFeatured: true
        },
        {
          id: 'gal-4',
          url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
          category: 'workshop',
          title: 'GQ-40 Shear Hardening Station',
          isFeatured: false
        }
      ];
      setGalleryItems(initialGallery);
      writeJson(localStorage, STORAGE_KEYS.GALLERY, initialGallery);
    }

    // 9. Load Site Settings
    const storedSettings = readJson<SiteSettings>(localStorage, STORAGE_KEYS.SETTINGS);
    if (storedSettings) {
      setSiteSettings(storedSettings);
    } else {
      const initialSettings: SiteSettings = {
        heroHeading: 'QUALITY CONSTRUCTION MACHINERY & SPARE PARTS',
        heroSubtitle: 'Reliable supply, rental, and servicing in Hyderabad. Durable rebar processing machines, mixers, and genuine spare parts direct from our yard.',
        heroVideoUrl: '',
        heroImageUrls: [
          'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200',
          'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200',
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200'
        ],
        companyIntroTitle: 'TRUSTED CONSTRUCTION MACHINERY SUPPLIER WITH 18+ YEARS EXPERIENCE',
        companyIntroText: 'Mega Constructions has been a trusted supplier in Hyderabad and surrounding areas for dependable machinery and spare parts. Our machines are selected for durability and performance to ensure reliable site operations.',
        aboutTitle: 'OUR WORKSHOP IN MOULA-ALI, HYDERABAD',
        aboutText: 'Our assembly workshop is located in Moula-Ali, Hyderabad, where we perform quality checks and stock key equipment. We maintain a reliable inventory of rebar benders, shears, concrete mixers, mini cranes, and common spare parts.',
        brands: ['Caterpillar', 'Liebherr', 'Volvo CE', 'Komatsu', 'JCB', 'Schwing Stetter', 'Putzeister', 'Sany', 'Hitachi', 'Kobelco'],
        seoTitle: 'Mega Constructions | Reliable Rebar & Concrete Machines Hyderabad',
        seoDescription: 'Reliable supply of rebar benders, cutting machines, and concrete mixers in Hyderabad by Mega Constructions. Quality construction equipment and dedicated parts support.',
        seoKeywords: 'mega constructions, rebar bending machine hyderabad, rebar cutting machine telangana, concrete mixers moula-ali, mini cranes hyderabad, spare parts construction equipment',
        ogTitle: 'Mega Constructions | Heavy Industrial Equipment & Genuine Spares',
        ogDescription: 'Experience industry-grade durability on site with GW-42J benders, GQ-40 cutting shears, MC-107 heavy mixers from Mega Constructions. Get customized on-site setup and ex-stock spares.',
        canonicalUrl: 'https://megaconstructions.com',
        sitemapGeneratedDate: '2026-07-12'
      };
      setSiteSettings(initialSettings);
      writeJson(localStorage, STORAGE_KEYS.SETTINGS, initialSettings);
    }

    // 10. Load Authentication Session
    const authSession = readJson<{ email: string; timestamp: number }>(sessionStorage, STORAGE_KEYS.AUTH);
    if (authSession) {
      setIsAuthenticated(true);
      setAdminEmail(authSession.email);
    }
  }, []);

  // Helper to persist states helper
  const persist = <T,>(key: string, data: T) => {
    writeJson(localStorage, key, data);
  };

  // Auth Operations
  const login = async (email: string, password: string): Promise<boolean> => {
    const configuredEmail = import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase();
    const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (configuredEmail && configuredPassword && email.trim().toLowerCase() === configuredEmail && password === configuredPassword) {
      setIsAuthenticated(true);
      setAdminEmail(email.trim());
      writeJson(sessionStorage, STORAGE_KEYS.AUTH, { email: email.trim(), timestamp: Date.now() });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminEmail(null);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  // Product Operations
  const addProduct = (p: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...p,
      id: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000)
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    persist(STORAGE_KEYS.PRODUCTS, updated);

    // Also register image in Media Library if it's not already there
    if (p.image) {
      addMediaFile(p.name + '_thumbnail', p.image, 'products');
    }
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    const updated = products.map(p => p.id === id ? updatedProduct : p);
    setProducts(updated);
    persist(STORAGE_KEYS.PRODUCTS, updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    persist(STORAGE_KEYS.PRODUCTS, updated);
  };

  const toggleHideProduct = (id: string) => {
    const updated = products.map(p => p.id === id ? { ...p, isHidden: !p.isHidden } : p);
    setProducts(updated);
    persist(STORAGE_KEYS.PRODUCTS, updated);
  };

  const toggleFeaturedProduct = (id: string) => {
    const updated = products.map(p => p.id === id ? { ...p, isFeatured: !p.isFeatured } : p);
    setProducts(updated);
    persist(STORAGE_KEYS.PRODUCTS, updated);
  };

  // Service Operations
  const addService = (s: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...s,
      id: s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000),
      isHidden: false,
      order: services.length + 1
    };
    const updated = [...services, newService];
    setServices(updated);
    persist(STORAGE_KEYS.SERVICES, updated);
  };

  const updateService = (id: string, updatedService: Service) => {
    const updated = services.map(s => s.id === id ? updatedService : s);
    setServices(updated);
    persist(STORAGE_KEYS.SERVICES, updated);
  };

  const deleteService = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    persist(STORAGE_KEYS.SERVICES, updated);
  };

  // FAQ Operations
  const addFAQ = (f: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = {
      ...f,
      id: 'faq-' + Math.floor(Math.random() * 10000)
    };
    const updated = [...faqs, newFaq];
    setFaqs(updated);
    persist(STORAGE_KEYS.FAQS, updated);
  };

  const updateFAQ = (id: string, updatedFaq: FAQItem) => {
    const updated = faqs.map(f => f.id === id ? updatedFaq : f);
    setFaqs(updated);
    persist(STORAGE_KEYS.FAQS, updated);
  };

  const deleteFAQ = (id: string) => {
    const updated = faqs.filter(f => f.id !== id);
    setFaqs(updated);
    persist(STORAGE_KEYS.FAQS, updated);
  };

  // Testimonial Operations
  const addTestimonial = (t: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...t,
      id: 'testimonial-' + Math.floor(Math.random() * 10000)
    };
    const updated = [...testimonials, newTestimonial];
    setTestimonials(updated);
    persist(STORAGE_KEYS.TESTIMONIALS, updated);
  };

  const updateTestimonial = (id: string, updatedTestimonial: Testimonial) => {
    const updated = testimonials.map(t => t.id === id ? updatedTestimonial : t);
    setTestimonials(updated);
    persist(STORAGE_KEYS.TESTIMONIALS, updated);
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    persist(STORAGE_KEYS.TESTIMONIALS, updated);
  };

  // Enquiry / Inquiry Operations
  const addInquiry = (i: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...i,
      id: 'enq-' + Math.floor(Math.random() * 100000),
      date: new Date().toISOString(),
      status: 'pending'
    };
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    persist(STORAGE_KEYS.INQUIRIES, updated);
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status'], replyMessage?: string) => {
    const updated = inquiries.map(i => {
      if (i.id === id) {
        return {
          ...i,
          status,
          ...(replyMessage !== undefined ? { replyMessage } : {})
        };
      }
      return i;
    });
    setInquiries(updated);
    persist(STORAGE_KEYS.INQUIRIES, updated);
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    persist(STORAGE_KEYS.INQUIRIES, updated);
  };

  // Media Library Operations
  const addMediaFile = (name: string, url: string, category: string, size?: string) => {
    const newMedia: MediaFile = {
      id: 'med-' + Math.floor(Math.random() * 100000),
      url,
      name: name.toLowerCase().replace(/[^a-z0-9_]+/g, '_'),
      category,
      size: size || `${Math.floor(Math.random() * 400) + 100} KB`,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [newMedia, ...mediaFiles];
    setMediaFiles(updated);
    persist(STORAGE_KEYS.MEDIA, updated);
  };

  const deleteMediaFile = (id: string) => {
    const updated = mediaFiles.filter(m => m.id !== id);
    setMediaFiles(updated);
    persist(STORAGE_KEYS.MEDIA, updated);
  };

  const renameMediaFile = (id: string, newName: string) => {
    const updated = mediaFiles.map(m => m.id === id ? { ...m, name: newName.toLowerCase().replace(/[^a-z0-9_]+/g, '_') } : m);
    setMediaFiles(updated);
    persist(STORAGE_KEYS.MEDIA, updated);
  };

  // Gallery Operations
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: 'gal-' + Math.floor(Math.random() * 100000),
      isFeatured: item.isFeatured || false
    };
    const updated = [newItem, ...galleryItems];
    setGalleryItems(updated);
    persist(STORAGE_KEYS.GALLERY, updated);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = galleryItems.filter(g => g.id !== id);
    setGalleryItems(updated);
    persist(STORAGE_KEYS.GALLERY, updated);
  };

  const toggleGalleryFeatured = (id: string) => {
    const updated = galleryItems.map(g => g.id === id ? { ...g, isFeatured: !g.isFeatured } : g);
    setGalleryItems(updated);
    persist(STORAGE_KEYS.GALLERY, updated);
  };

  // Settings & SEO Operations
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...settings };
    setSiteSettings(updated);
    persist(STORAGE_KEYS.SETTINGS, updated);
  };

  const updateStatistics = (stats: Partial<typeof STATISTICS>) => {
    const updated = { ...statistics, ...stats };
    setStatistics(updated);
    persist(STORAGE_KEYS.STATISTICS, updated);
  };

  const generateSitemap = () => {
    const updated = {
      ...siteSettings,
      sitemapGeneratedDate: new Date().toISOString().split('T')[0]
    };
    setSiteSettings(updated);
    persist(STORAGE_KEYS.SETTINGS, updated);
  };

  return (
    <CMSContext.Provider value={{
      products,
      services,
      faqs,
      testimonials,
      inquiries,
      mediaFiles,
      galleryItems,
      siteSettings,
      statistics,
      isAuthenticated,
      adminEmail,
      login,
      logout,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleHideProduct,
      toggleFeaturedProduct,
      addService,
      updateService,
      deleteService,
      addFAQ,
      updateFAQ,
      deleteFAQ,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addInquiry,
      updateInquiryStatus,
      deleteInquiry,
      addMediaFile,
      deleteMediaFile,
      renameMediaFile,
      addGalleryItem,
      deleteGalleryItem,
      toggleGalleryFeatured,
      updateSiteSettings,
      updateStatistics,
      generateSitemap
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
