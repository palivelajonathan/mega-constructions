/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, ShieldAlert, BadgePercent, ShieldCheck, Truck, Users, Sparkles, Quote, Settings2, Hammer } from 'lucide-react';
import { REVIEWS } from '../data/products';

export default function Benefits() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Industry-Grade Durability',
      description: 'Manufactured with high-tensile 10mm working plates and reinforced structural channel chassis to withstand demanding 24/7 construction schedules.'
    },
    {
      icon: BadgePercent,
      title: 'Affordable Direct Pricing',
      description: 'By selling direct ex-factory from Moula-Ali, we bypass reseller margins, delivering multi-crore manufacturer quality at competitive project prices.'
    },
    {
      icon: Users,
      title: 'Experienced Technician Crew',
      description: 'Our senior technicians carry up to 15 years of mechanical expertise. We troubleshoot mechanical and electrical issues directly on your project site.'
    },
    {
      icon: Truck,
      title: 'Rapid Telangana Delivery',
      description: 'We maintain extensive stocks in our central Hyderabad warehouse, assuring rapid dispatch, setup, and commissioning across Telangana and Andhra Pradesh.'
    },
    {
      icon: Settings2,
      title: '100% Original OEM Spares',
      description: 'We inventory original alloy shearing blades, bending bushes, motor carbon brushes, brake pads, and gear rings, keeping your project operations live.'
    },
    {
      icon: ShieldAlert,
      title: 'Phase Loss Electrical Safety',
      description: 'Our equipment includes state-of-the-art Phase Loss Preventers to protect expensive heavy copper winding motors from local power grid voltage drops.'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-dark-slate text-white relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 industrial-grid-dark opacity-10 pointer-events-none" />
      <div className="absolute inset-0 grate-pattern-dark opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Customer benefits title */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary uppercase bg-white/5 px-3 py-1 rounded-full">
            WHY CONTRACTORS TRUST US
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mt-3 tracking-tight uppercase">
            UNMATCHED ENGINEERING STRENGTH & SERVICE CONTINUITY
          </h2>
          <div className="w-12 h-1 bg-primary mt-4 rounded-full" />
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {benefits.map((ben, idx) => {
            const Icon = ben.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4, borderColor: 'rgba(253,185,19,0.5)' }}
                className="bg-slate-900 border border-white/10 p-6 sm:p-8 rounded-2xl transition-all duration-300 relative group flex flex-col justify-between shadow-sm"
              >
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-5 grate-pattern-dark" />
                
                <div>
                  <div className="p-3 bg-white/5 text-primary rounded-xl w-fit mb-6 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-tight">
                    {ben.title}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                    {ben.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                  SECURE_SPEC // APPROVED_ASSET
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* TESTIMONIALS SECTION */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-primary uppercase">
              INFRASTRUCTURE REVIEWS
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight leading-snug">
              WHAT OUR CONTRACTORS & BUILDERS ARE SAYING
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We have supported hundreds of private developers, infrastructure conglomerates, and metro builders across Telangana. Here is a review of our performance.
            </p>
            <div className="flex items-center gap-1 text-primary pt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary stroke-none" />
              ))}
              <span className="text-white text-xs font-bold font-mono ml-2">4.9 / 5.0 RATING</span>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-900 border border-white/10 hover:border-primary/40 p-6 rounded-2xl relative flex flex-col justify-between transition-colors duration-300 shadow-sm"
              >
                {/* Big quotes graphic */}
                <div className="absolute top-4 right-4 text-white/5 pointer-events-none select-none">
                  <Quote className="w-16 h-16 fill-white/5" />
                </div>

                <div className="space-y-4">
                  {/* Rating stars */}
                  <div className="flex text-primary">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-primary stroke-none" />
                    ))}
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm italic leading-relaxed">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-display font-black text-xs text-primary">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-white leading-none uppercase">
                      {rev.name}
                    </h5>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase font-mono tracking-wider line-clamp-1">
                      {rev.designation}, {rev.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
