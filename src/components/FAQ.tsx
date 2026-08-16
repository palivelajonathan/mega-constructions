/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, HardHat, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface FAQProps {
  onOpenInquiry?: (topic: string) => void;
}

export default function FAQ({ onOpenInquiry }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const cms = useCMS();
  const faqs = cms.faqs;

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

  return (
    <section id="faq" className="py-20 bg-slate-100 relative overflow-hidden">
      
      {/* Decorative background grids */}
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary uppercase bg-secondary/5 px-3 py-1 rounded-full">
            KNOWLEDGE BASE
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-secondary mt-3 tracking-tight uppercase">
            FREQUENTLY ASKED MACHINERY QUESTIONS
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* FAQs Accordions List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`bg-white border transition-all duration-300 rounded-2xl overflow-hidden ${
                  isOpen 
                    ? 'border-primary shadow-lg ring-1 ring-primary/10' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {/* Header click bar */}
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left py-5 px-6 sm:px-8 flex items-center justify-between gap-4 font-display"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-primary' : 'text-gray-400'}`} />
                    <span className="font-bold text-sm sm:text-base text-secondary uppercase tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-lg bg-slate-50 text-gray-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-primary/10 text-primary' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated drawer content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout banner */}
        <div className="text-center mt-12 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-xs sm:text-sm text-secondary uppercase leading-none">
                HAVE A CUSTOM PROCUREMENT OR LEASE INQUIRY?
              </h4>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-1">
                Reach out to L. Venkat Rao directly for volume pricing discounts.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (onOpenInquiry) {
                onOpenInquiry('Machinery & Engineering Technical Consultation');
              } else {
                scrollToContact();
              }
            }}
            className="bg-secondary hover:bg-slate-900 text-white font-display font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
          >
            Ask Our Engineers
          </button>
        </div>

      </div>
    </section>
  );
}
