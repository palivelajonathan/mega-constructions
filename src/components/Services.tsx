/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, CalendarClock, Settings2, Hammer, Layers, ShieldCheck, ChevronRight, HardHat, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ServicesProps {
  onOpenInquiry?: (serviceName: string) => void;
}

export default function Services({ onOpenInquiry }: ServicesProps) {
  const [activeService, setActiveService] = useState<string | null>(null);
  const cms = useCMS();
  const services = cms.services;

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

  const getIcon = (name: string) => {
    switch (name) {
      case 'Truck': return Truck;
      case 'CalendarClock': return CalendarClock;
      case 'Settings2': return Settings2;
      case 'Hammer': return Hammer;
      case 'Layers': return Layers;
      case 'ShieldCheck': return ShieldCheck;
      default: return HardHat;
    }
  };

  return (
    <section id="services" className="py-20 bg-dark-slate text-white relative overflow-hidden">
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 industrial-grid-dark opacity-10 pointer-events-none" />
      <div className="absolute inset-0 grate-pattern-dark opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[45vw] h-[45vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary uppercase bg-white/5 px-3 py-1 rounded-full">
            OUR TECHNICAL SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mt-3 tracking-tight uppercase">
            RELIABLE SALES, RENTALS, & MACHINERY MAINTENANCE
          </h2>
          <div className="w-12 h-1 bg-primary mt-4 rounded-full" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = getIcon(service.iconName);
            const isExpanded = activeService === service.id;

            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveService(isExpanded ? null : service.id)}
                className={`bg-slate-900 border transition-all duration-300 rounded-2xl cursor-pointer p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group ${
                  isExpanded 
                    ? 'border-primary ring-2 ring-primary/20 shadow-[0_12px_32px_rgba(253,185,19,0.15)] bg-slate-950' 
                    : 'border-white/10 hover:border-primary/50 hover:shadow-xl'
                }`}
              >
                {/* Visual Accent Corner Grate */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="w-full h-full grate-pattern-dark" />
                </div>

                <div>
                  {/* Icon Frame */}
                  <div className={`p-3.5 rounded-xl w-fit mb-6 transition-all duration-300 ${
                    isExpanded ? 'bg-primary text-secondary' : 'bg-white/5 text-primary group-hover:bg-primary/15'
                  }`}>
                    <Icon className="w-6.5 h-6.5 stroke-[2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Expanded list details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-6 border-t border-white/10 mt-6 space-y-3 overflow-hidden"
                      >
                        <span className="text-[10px] font-mono tracking-widest text-primary uppercase block mb-1">
                          TECHNICAL CAPABILITIES:
                        </span>
                        {service.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                            <span className="text-primary font-bold mt-0.5 shrink-0">✓</span>
                            <span>{detail}</span>
                          </div>
                        ))}
                        <div className="pt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenInquiry) {
                                onOpenInquiry(`Service: ${service.title}`);
                              } else {
                                scrollToContact();
                              }
                            }}
                            className="w-full mt-2 bg-primary/20 hover:bg-primary text-primary hover:text-secondary border border-primary/40 font-display font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Inquire About This Service →
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Action Link */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">
                    {isExpanded ? 'TAP TO COLLAPSE' : 'TAP FOR DETAILS'}
                  </span>
                  <div className={`p-1.5 rounded-full transition-transform duration-300 ${
                    isExpanded ? 'bg-primary text-secondary rotate-90' : 'bg-white/5 text-primary group-hover:translate-x-1'
                  }`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Quality Banner Bottom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-950 border border-primary/20 rounded-2xl p-6 sm:p-8 mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6 relative"
        >
          <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-[0.03] overflow-hidden">
            <Sparkles className="w-full h-full text-white" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-lg text-white uppercase tracking-tight">
              NEED PROFESSIONAL EQUIPMENT SETUP OR SERVICES?
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm">
              We offer reliable equipment supply, rental solutions, and responsive service support. Contact our team to discuss your project needs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => {
                if (onOpenInquiry) {
                  onOpenInquiry('General Technical Service Inquiry');
                } else {
                  scrollToContact();
                }
              }}
              className="bg-primary hover:bg-primary-dark text-secondary font-display font-extrabold px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider text-center shadow-[0_4px_12px_rgba(253,185,19,0.15)] transition-all cursor-pointer"
            >
              Request Service Quote
            </button>
            <a
              href="tel:+918790940354"
              className="bg-white/10 hover:bg-white/20 border border-white/15 text-white font-display font-bold px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider text-center transition-all"
            >
              Call Support Team
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
