/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight, HardHat, Eye, Maximize2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface GalleryProps {
  onOpenInquiry?: (itemTitle: string) => void;
}

export default function Gallery({ onOpenInquiry }: GalleryProps) {
  const cms = useCMS();
  const items = (cms.galleryItems || []).map((item) => ({
    id: item.id,
    tag: item.category === 'project' ? 'site' : item.category,
    title: item.title,
    description: (item as any).description || 'High-capacity, industrial-grade equipment deployment.',
    image: item.url,
  }));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'workshop' | 'site'>('all');

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const navHeight = 85;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navHeight),
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#contact');
    }
  };

  const filteredItems = items.filter((item) => filter === 'all' || item.tag === filter);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary uppercase bg-secondary/5 px-3 py-1 rounded-full">
            WORKSHOP & SITE DISPATCH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-secondary mt-3 tracking-tight uppercase">
            REAL MACHINERY DEPLOYMENTS & ASSEMBLY
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Gallery Filter controls */}
        <div className="flex justify-center gap-2 mb-10 pb-2">
          {(['all', 'workshop', 'site'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4.5 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === t
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-white text-gray-400 border border-gray-100 hover:text-secondary hover:bg-gray-50'
              }`}
            >
              {t === 'all' ? 'All Images' : t === 'workshop' ? 'Moula-Ali Workshop' : 'Live Job Sites'}
            </button>
          ))}
        </div>

        {/* Masonry Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-primary shadow-sm hover:shadow-md group cursor-pointer transition-all duration-300"
              onClick={() => setLightboxIndex(idx)}
            >
              {/* Image box */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual hover glass overlay with action icons */}
                <div className="absolute inset-0 bg-secondary/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <span className="bg-primary text-secondary font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-bold shadow-md">
                      {item.tag.toUpperCase()}
                    </span>
                    <div className="p-1.5 bg-white/10 rounded-lg text-white">
                      <Maximize2 className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-black text-sm uppercase tracking-tight text-white line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FULLSCREEN LIGHTBOX PREVIEW MODAL */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 bg-secondary/95 backdrop-blur-md flex items-center justify-center p-4">
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-primary hover:text-secondary text-white rounded-xl transition-all"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="max-w-4xl w-full text-center space-y-4">
                <div className="relative aspect-16/10 max-h-[70vh] bg-black/30 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img
                    src={filteredItems[lightboxIndex].image}
                    alt={filteredItems[lightboxIndex].title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent p-6 text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <span className="bg-primary text-secondary font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-bold shadow-md">
                        {filteredItems[lightboxIndex].tag.toUpperCase()}
                      </span>
                      <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight mt-2.5">
                        {filteredItems[lightboxIndex].title}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm mt-1 leading-relaxed max-w-xl">
                        {filteredItems[lightboxIndex].description}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const title = filteredItems[lightboxIndex].title;
                        setLightboxIndex(null);
                        if (onOpenInquiry) {
                          onOpenInquiry(title);
                        } else {
                          scrollToContact();
                        }
                      }}
                      className="bg-primary hover:bg-primary-dark text-secondary font-display font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-md"
                    >
                      Inquire About This Asset →
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="absolute right-4 p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
