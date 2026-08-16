/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Phone, ShieldCheck, Award, TrendingUp, Settings, MapPin, Mail, MessageSquare, Shield, ExternalLink } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface HeroProps {
  onSelectCategory?: (category: 'all' | 'rebar' | 'concrete' | 'lifting' | 'spares') => void;
  onOpenInquiry?: (productName: string) => void;
}

export default function Hero({ onSelectCategory, onOpenInquiry }: HeroProps) {
  const cms = useCMS();
  const { siteSettings, statistics } = cms;
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navHeight = 85;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navHeight),
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  const slides = [
    {
      image: (siteSettings.heroImageUrls && siteSettings.heroImageUrls[0]) || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1920',
      title: siteSettings.heroHeading || 'INDUSTRIAL-GRADE CONSTRUCTION MACHINERY',
      subtitle: 'MEGA CONSTRUCTIONS',
      description: siteSettings.heroSubtitle || 'Trusted construction equipment supplier in Hyderabad. Providing durable rebar processing systems, quality concrete mixers, and reliable on-site maintenance across Hyderabad and Telangana.',
    },
    {
      image: (siteSettings.heroImageUrls && siteSettings.heroImageUrls[1]) || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1920',
      title: 'TRUSTED BY LEADING CONTRACTORS & BUILDERS',
      subtitle: `${statistics.yearsExperience || 18}+ YEARS OF RELIABLE SERVICE & SUPPLY`,
      description: 'Our machines are built to be durable and dependable for construction needs. Backed by genuine spare parts and responsive technical support directly from our Moula-Ali assembly workshop.',
    },
    {
      image: (siteSettings.heroImageUrls && siteSettings.heroImageUrls[2]) || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920',
      title: 'DEPENDABLE EQUIPMENT RENTALS & SPARES',
      subtitle: 'IMMEDIATE DISPATCH & COMMISSIONING',
      description: 'Keep your project running smoothly. Lease durable rebar processing machines or concrete mixers under flexible terms, with on-site setup and reliable maintenance support.',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="py-12 bg-[#F8F9FA] relative overflow-hidden">
      
      {/* Dynamic Grids Overlay */}
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 grate-pattern opacity-[0.03] pointer-events-none" />

      {/* Main Bento Grid Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Title Micro Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-gray-200 pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-secondary uppercase bg-primary/20 px-3 py-1 rounded-full">
              Heavy Industry Portal
            </span>
            <h2 className="text-sm font-display font-black text-secondary tracking-tight uppercase mt-1">
              HYDERABAD DIRECT DISPATCH YARD
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>EX-FACTORY SHIPPING: LIVE</span>
          </div>
        </div>

        {/* 12-Column Responsive Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">
          
          {/* Tile 1: Flagship Slider Presentation Area (7 col, 4 row span equivalents) */}
          <div className="col-span-12 lg:col-span-7 lg:row-span-4 bg-[#111111] rounded-2xl relative overflow-hidden group border-2 border-transparent hover:border-primary transition-all duration-300 min-h-[460px] flex flex-col justify-between p-6 sm:p-8 text-white shadow-lg">
            
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 0.38, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/30" />
              <div className="absolute inset-0 industrial-grid-dark opacity-10 pointer-events-none" />
              <div className="absolute inset-0 grate-pattern-dark opacity-[0.03] pointer-events-none" />
            </div>

            {/* Rotating Gear in Slide Background */}
            <div className="absolute right-[-8%] top-[10%] opacity-5 z-0 pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
              >
                <Settings className="w-[380px] h-[380px] text-white stroke-[0.5]" />
              </motion.div>
            </div>

            {/* Slide Header */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-3.5 py-1 rounded-full backdrop-blur-sm mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest text-primary">
                  {slides[currentSlide].subtitle}
                </span>
              </div>

              {/* Slider Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight tracking-tight uppercase max-w-2xl">
                {slides[currentSlide].title}
              </h1>

              {/* Slider Description */}
              <p className="text-gray-300 text-xs sm:text-sm mt-4 max-w-xl font-light leading-relaxed">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Slide Footer (CTAs & Slide Dots) */}
            <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollToSection('products')}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-secondary font-display font-extrabold px-5 py-3 rounded-xl transition-all duration-300 text-xs uppercase tracking-wider shadow-sm cursor-pointer hover:scale-[1.02]"
                >
                  Explore Machinery <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 border border-white/15 text-white font-display font-bold px-5 py-3 rounded-xl transition-all duration-300 text-xs uppercase tracking-wider backdrop-blur-sm cursor-pointer hover:scale-[1.02]"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" /> Contact Sales
                </button>
              </div>

              {/* Slider Dots */}
              <div className="flex gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                      currentSlide === idx ? 'w-7 bg-primary' : 'w-2.5 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Tile 2: Technical Excellence / Project Metrics Panel (5 col, 3 row span) */}
          <div className="col-span-12 lg:col-span-5 lg:row-span-3 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[310px]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            
            <div>
              <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-2">
                <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase font-bold">
                  PROJECT METRICS
                </span>
                <span className="text-[9px] font-mono bg-secondary/5 px-2 py-0.5 rounded text-secondary font-semibold">
                  AUDITED 2026
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[11px] font-bold tracking-tight text-gray-500 uppercase">EXPERIENCE LEVEL</span>
                    <span className="text-base font-display font-bold text-secondary">{statistics.yearsExperience || 18}+ Years</span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-[100%] h-full bg-primary" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[11px] font-bold tracking-tight text-gray-500 uppercase">EQUIPMENT STANDARD</span>
                    <span className="text-base font-display font-bold text-secondary">Heavy-Duty Industrial</span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-[100%] h-full bg-primary" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[11px] font-bold tracking-tight text-gray-500 uppercase">ON-SITE SERVICE</span>
                    <span className="text-base font-display font-bold text-secondary">Dedicated Hyderabad Yard</span>
                  </div>
                  <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-[100%] h-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2.5 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shrink-0" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
                STRESS TEST PROTOCOL: COMPLETE
              </span>
            </div>
          </div>

          {/* Tile 3: Experience Badge Solid Slate (2 col, 1 row span) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-2 lg:row-span-1 bg-secondary border border-slate-800 text-white rounded-2xl flex flex-col items-center justify-center text-center p-4 shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            <span className="text-3xl font-display font-bold text-primary italic">
              {statistics.yearsExperience || 18}+ YRS
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-semibold mt-1">
              EXPERIENCE
            </span>
          </div>

          {/* Tile 4: Client Satisfaction Badge White (3 col, 1 row span) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 lg:row-span-1 bg-white border border-gray-200 rounded-2xl flex items-center px-6 py-4 gap-4 shadow-sm">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="block text-lg font-display font-bold text-secondary">
                99.8%
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 font-bold">
                SATISFACTION RATE
              </span>
            </div>
          </div>

          {/* Tile 5: Our Location Card (3 col, 2 row span) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 lg:row-span-2 bg-secondary border border-slate-800 text-white rounded-2xl p-6 flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
                  OUR LOCATION
                </h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-mono">
                5-12-193, Mangapuram Colony,<br />
                Moula-Ali, Hyderabad,<br />
                Telangana - 500040
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-[11px] text-gray-400 font-mono">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">megaconcretspares@gmail.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>+91 8790940354</span>
              </div>
            </div>
          </div>

          {/* Tile 6: Hot Categories / Chips (4 col, 2 row span) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:row-span-2 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-secondary mb-3">
                HOT CATEGORIES
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed mb-4 font-light">
                Click on a segment below to view custom specifications instantly in our catalog:
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => onSelectCategory ? onSelectCategory('rebar') : scrollToSection('products')}
                className="px-3 py-1.5 bg-slate-50 hover:bg-primary/10 hover:text-primary hover:border-primary border border-gray-200 rounded-lg text-[10px] font-mono uppercase font-bold text-gray-600 transition-all duration-300 cursor-pointer"
              >
                Rebar Machinery
              </button>
              <button
                onClick={() => onSelectCategory ? onSelectCategory('concrete') : scrollToSection('products')}
                className="px-3 py-1.5 bg-slate-50 hover:bg-primary/10 hover:text-primary hover:border-primary border border-gray-200 rounded-lg text-[10px] font-mono uppercase font-bold text-gray-600 transition-all duration-300 cursor-pointer"
              >
                Concrete Mixers
              </button>
              <button
                onClick={() => onSelectCategory ? onSelectCategory('lifting') : scrollToSection('products')}
                className="px-3 py-1.5 bg-slate-50 hover:bg-primary/10 hover:text-primary hover:border-primary border border-gray-200 rounded-lg text-[10px] font-mono uppercase font-bold text-gray-600 transition-all duration-300 cursor-pointer"
              >
                Material Cranes
              </button>
              <button
                onClick={() => onSelectCategory ? onSelectCategory('spares') : scrollToSection('products')}
                className="px-3 py-1.5 bg-slate-50 hover:bg-primary/10 hover:text-primary hover:border-primary border border-gray-200 rounded-lg text-[10px] font-mono uppercase font-bold text-gray-600 transition-all duration-300 cursor-pointer"
              >
                Genuine Spares
              </button>
            </div>
          </div>

          {/* Tile 7: WhatsApp Inquire Card (5 col, 2 row span) */}
          <div className="col-span-12 lg:col-span-5 lg:row-span-2 bg-[#111111] text-white rounded-2xl p-6 flex items-center justify-between overflow-hidden relative group border border-white/5 shadow-md">
            
            {/* Ambient circle glow background */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            
            <div className="space-y-2 z-10 max-w-[65%]">
              <span className="text-[9px] font-mono text-primary uppercase tracking-widest font-bold">
                DIRECT CHAT HELPLINE
              </span>
              <h4 className="text-base font-display font-bold uppercase tracking-tight text-white">
                REACH OUT TODAY
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                Connect directly with owner L. Venkat Rao on WhatsApp for pricing.
              </p>
            </div>

            <div className="z-10">
              <a
                href="https://wa.me/918790940354?text=Hello%20Mega%20Construction%20Equipments,%20I%20am%20interested%20in%20inquiring%20about%20your%20machinery%20fleet."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-14 h-14 bg-primary hover:bg-primary-dark text-secondary rounded-2xl shadow-[0_4px_16px_rgba(253,185,19,0.35)] hover:scale-105 transition-all duration-300"
                title="Direct WhatsApp chat"
              >
                <MessageSquare className="w-5 h-5 stroke-[2]" />
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
