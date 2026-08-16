/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import Gallery from './components/Gallery';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { Product } from './types';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'website' | 'admin'>('website');
  const isLocalAdminEnabled = import.meta.env.DEV;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'rebar' | 'concrete' | 'lifting' | 'spares'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryProduct, setInquiryProduct] = useState('');
  const [comparingCount, setComparingCount] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Active section scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'products', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 85;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navHeight),
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  // Handle opening of Inquiry page with prefilled product
  const handleOpenInquiry = (productName: string) => {
    setInquiryProduct(productName);
    setSelectedProduct(null); // Close the detail popup
    scrollToSection('contact');
  };

  const handleSelectCategory = (cat: 'all' | 'rebar' | 'concrete' | 'lifting' | 'spares') => {
    setSelectedCategory(cat);
    scrollToSection('products');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      scrollToSection('products');
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : isLocalAdminEnabled && viewMode === 'admin' ? (
        <AdminDashboard onClose={() => setViewMode('website')} />
      ) : (
        <div className="relative min-h-screen bg-slate-50 text-secondary selection:bg-primary selection:text-secondary antialiased overflow-x-hidden">
          {/* Header Sticky Navigation bar */}
          <Navbar
            onSearch={handleSearch}
            searchQuery={searchQuery}
            comparingCount={comparingCount}
            onOpenComparison={() => setShowComparison(true)}
            activeSection={activeSection}
            onToggleAdmin={isLocalAdminEnabled ? () => setViewMode('admin') : undefined}
          />

          {/* Full Screen Parallax Hero */}
          <Hero
            onSelectCategory={handleSelectCategory}
            onOpenInquiry={handleOpenInquiry}
          />

          {/* Company Core Overview & Interactive Owner Business Card */}
          <About />

          {/* Core Technical Services and Commissioning Support */}
          <Services onOpenInquiry={handleOpenInquiry} />

          {/* Multi-parameter Filter Product Catalog & Comparison Board */}
          <ProductCatalog
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={setSelectedProduct}
            onOpenInquiry={handleOpenInquiry}
            onUpdateComparingCount={setComparingCount}
            showComparison={showComparison}
            onCloseComparison={() => setShowComparison(false)}
          />

          {/* Workshop & Site Masonry Gallery */}
          <Gallery onOpenInquiry={handleOpenInquiry} />

          {/* Features Checklist, Customer Benefits & Professional Client Reviews */}
          <Benefits />

          {/* Frequently Asked Questions accordion */}
          <FAQ onOpenInquiry={handleOpenInquiry} />

          {/* Contact maps and Quotation Form */}
          <Contact
            prefilledProductName={inquiryProduct}
            onClearPrefill={() => setInquiryProduct('')}
          />

          {/* Quick Shortcuts Floating Widgets */}
          <FloatingActions />

          {/* Multi-column SEO Footings */}
          <Footer
            onToggleAdmin={isLocalAdminEnabled ? () => setViewMode('admin') : undefined}
            onSelectCategory={handleSelectCategory}
          />

          {/* Immersive technical detail Lightbox overlay */}
          {selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onOpenInquiry={handleOpenInquiry}
            />
          )}
        </div>
      )}
    </>
  );
}
