/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, MessageCircle, ArrowRight, Settings, Shield, Hammer, FileText, CheckCircle2, Check } from 'lucide-react';
import { Product, InquiryFormData } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenInquiry: (productName: string) => void;
}

export default function ProductDetailModal({ product, onClose, onOpenInquiry }: ProductDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'applications'>('specs');
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!product) return null;

  // Visual gallery backup using stock industrial site backgrounds for realism
  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
  ];

  // Extracted specs list
  const specList = Object.entries(product.specs).filter(([_, value]) => value && value !== 'N/A');

  // WhatsApp template inquiry
  const getWhatsAppLink = (pName: string) => {
    const text = `Hello Mega Construction Equipments, I am interested in obtaining a quotation and technical specifications sheet for the "${pName}". Please send details.`;
    return `https://wa.me/918790940354?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative bg-white text-secondary rounded-2xl shadow-[0_24px_64px_rgba(17,17,17,0.4)] border border-gray-100 w-full max-w-5xl overflow-hidden my-8"
        >
          {/* Header Bar */}
          <div className="bg-secondary text-white px-6 py-4 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary animate-spin" style={{ animationDuration: '8s' }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400">
                PRODUCT_ID: {product.id.toUpperCase()}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 bg-white/10 hover:bg-primary hover:text-secondary rounded-lg transition-all"
              aria-label="Close product view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
            {/* Left Column: Gallery & Buttons */}
            <div className="lg:col-span-5 space-y-6">
              {/* Primary large image display with badge overlays */}
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                <img
                  src={galleryImages[galleryIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-primary text-secondary font-display font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow-md">
                  Original Quality
                </div>
              </div>

              {/* Grid indicators (mini gallery thumbs) */}
              <div className="grid grid-cols-4 gap-2.5">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGalleryIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 bg-gray-100 relative ${
                      galleryIndex === idx ? 'border-primary shadow-md' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>

              {/* Inquiry CTA Buttons */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                <button
                  onClick={() => onOpenInquiry(product.name)}
                  className="bg-primary hover:bg-primary-dark text-secondary font-display font-black py-4.5 rounded-xl shadow-[0_4px_16px_rgba(253,185,19,0.25)] hover:scale-[1.02] transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <FileText className="w-4.5 h-4.5 stroke-[2.5]" /> Inquiry Form
                </button>
                <a
                  href={getWhatsAppLink(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-display font-black py-4.5 rounded-xl shadow-[0_4px_16px_rgba(37,211,102,0.25)] hover:scale-[1.02] transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4.5 h-4.5 fill-white stroke-none" /> WhatsApp Sales
                </a>
              </div>
              
              <div className="bg-slate-50 border border-gray-100 rounded-xl p-4.5 flex items-center gap-3.5">
                <Shield className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h5 className="font-display font-bold text-xs uppercase text-secondary">
                    1-Year Powertrain Warranty Included
                  </h5>
                  <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">
                    We deploy dedicated senior machinery specialists for rapid on-site commissioning and repair calls.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Descriptions & Detailed specs */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary bg-secondary px-2 py-0.5 rounded">
                  {product.category.toUpperCase()} SERIES
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-secondary uppercase tracking-tight mt-1.5">
                  {product.name}
                </h3>
                <p className="text-primary font-display font-bold text-xs uppercase tracking-wider mt-1">
                  {product.tagline}
                </p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed border-l-3 border-primary pl-4 py-1">
                {product.description}
              </p>

              {/* Tab options (Specs / Features / Applications) */}
              <div className="flex border-b border-gray-200">
                {(['specs', 'features', 'applications'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-4 text-xs font-display font-bold uppercase tracking-wider border-b-2 -mb-[2px] transition-all duration-200 ${
                      activeTab === tab
                        ? 'border-primary text-secondary font-black'
                        : 'border-transparent text-gray-400 hover:text-secondary'
                    }`}
                  >
                    {tab === 'specs' ? 'Technical Specifications' : tab === 'features' ? 'Core Features' : 'Key Applications'}
                  </button>
                ))}
              </div>

              <div className="min-h-[220px]">
                {/* 1. Tech specs table */}
                {activeTab === 'specs' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden border border-gray-100 rounded-xl shadow-sm"
                  >
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 text-gray-500 font-mono uppercase tracking-wider text-[10px] border-b border-gray-100">
                          <th className="py-3 px-4">Technical Parameter</th>
                          <th className="py-3 px-4">Manufacturer Specification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 font-mono text-gray-700">
                        {specList.map(([key, val]) => (
                          <tr key={key} className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-4 font-semibold uppercase text-[10px] text-gray-500">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </td>
                            <td className="py-2.5 px-4 text-secondary font-medium">
                              {val}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}

                {/* 2. Core features */}
                {activeTab === 'features' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid sm:grid-cols-2 gap-3"
                  >
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start bg-slate-50 p-3 rounded-lg border border-gray-50">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700 font-medium leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* 3. Key Applications */}
                {activeTab === 'applications' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2.5"
                  >
                    {product.applications.map((app, idx) => (
                      <div key={idx} className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-xs text-gray-700 font-semibold uppercase tracking-wide">{app}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Product Advantages Checklist */}
              <div className="bg-secondary text-white p-5 rounded-xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-5 grate-pattern-dark" />
                <h4 className="text-xs font-display font-black text-primary uppercase tracking-widest flex items-center gap-2">
                  <Hammer className="w-4 h-4" /> COMPACTION & ENGINEERING ADVANTAGES
                </h4>
                <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-300 font-medium">
                  {product.advantages.map((adv, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="bg-primary/20 text-primary p-0.5 rounded-full mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-primary stroke-[3]" />
                      </span>
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
