/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Target, Eye, ShieldAlert, Award, Star, History, Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function About() {
  const cms = useCMS();
  const { siteSettings, statistics } = cms;

  const cards = [
    {
      icon: Target,
      title: 'Our Mission',
      color: 'border-l-primary',
      description: 'To supply dependable, high-quality construction machinery and spare parts that help builders and contractors in Hyderabad and neighboring areas complete their projects efficiently and safely.'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      color: 'border-l-accent',
      description: 'To be a trusted and preferred local partner for construction machinery, rentals, and spare parts in our region by providing high-quality equipment and reliable service support.'
    },
    {
      icon: ShieldAlert,
      title: 'Quality Safeguard',
      color: 'border-l-amber-600',
      description: 'We focus on strict quality inspections. Every gearbox, blade, plate, and safety relay is checked in our Moula-Ali workshop prior to hand-over to ensure reliability on site.'
    }
  ];

  const milestones = [
    { year: '2001', title: 'Foundation Staged', desc: 'L. Venkat Rao launches Mega Spares, distributing custom heavy-duty cement mixer gear rings and accessories in Hyderabad.' },
    { year: '2008', title: 'Assembly Yard Established', desc: 'Opened our assembly workshop in Moula-Ali, initiating assembly of Concrete Mixers.' },
    { year: '2015', title: 'Rebar Machinery Expansion', desc: 'Introduced the GW-42J Benders and GQ-40 Cutting machines equipped with built-in Phase Loss Preventers.' },
    { year: '2022', title: 'Expanded Operations', desc: 'Supported numerous local projects and infrastructure developments across Hyderabad with reliable equipment sales and rental fleets.' },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative Grid Overlays */}
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary uppercase bg-secondary/5 px-3 py-1 rounded-full">
            ABOUT THE MANUFACTURER
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-secondary mt-3 tracking-tight uppercase">
            PROVIDING QUALITY MACHINERY & SPARES FOR 18+ YEARS
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Brand overview + Digital Business Card Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-display font-bold text-secondary uppercase tracking-tight">
              {siteSettings.companyIntroTitle || 'MEGA CONSTRUCTIONS – TRUSTED SUPPLIER IN HYDERABAD'}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              {siteSettings.companyIntroText || (
                <>
                  Founded and steered by <strong>L. Venkat Rao</strong>, Mega Constructions has grown from a specialized spares workshop into a reliable supplier of construction machinery and spare parts in Hyderabad.
                </>
              )}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              We understand that project downtime can be costly. This is why our machines, from rebar cutters to mini cranes, are built for durability and ease of maintenance. We keep a responsive stock of parts in Hyderabad to support your project operations.
            </p>

            {/* Quick stats list with staggered stagger-child hover effect */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              {[
                { val: `${statistics.yearsExperience || 18}+ Yrs`, lbl: 'Experience' },
                { val: 'Heavy Duty', lbl: 'Machinery' },
                { val: 'Genuine', lbl: 'OEM Spares' },
                { val: '100%', lbl: 'On-Site Support' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center hover:border-primary transition-all duration-300"
                >
                  <span className="block text-2xl sm:text-3xl font-display font-bold text-secondary uppercase">{stat.val}</span>
                  <span className="block text-[9px] font-mono uppercase tracking-widest text-gray-500 mt-1 font-semibold">{stat.lbl}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Owner's Visiting Card Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <motion.div
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md bg-secondary text-white rounded-2xl shadow-[0_20px_50px_rgba(17,17,17,0.35)] border-t border-white/10 overflow-hidden relative group"
              style={{ perspective: 1000 }}
            >
              {/* Card top edge color indicator */}
              <div className="h-2 bg-primary w-full" />
              <div className="absolute top-2 right-2 opacity-5 pointer-events-none select-none">
                <History className="w-56 h-56 text-white" />
              </div>
              
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-display font-bold tracking-tight text-white uppercase">
                      L. Venkat Rao
                    </h4>
                    <p className="text-xs text-primary font-mono tracking-widest uppercase font-semibold mt-0.5">
                      PROPRIETOR
                    </p>
                  </div>
                  <div className="bg-primary/15 text-primary border border-primary/20 px-2.5 py-1 rounded text-[10px] font-mono uppercase">
                    ESTD 2001
                  </div>
                </div>

                <div className="border-t border-white/10 my-4" />

                <div className="space-y-4">
                  {/* Brand name */}
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-secondary p-2 rounded-lg">
                      <Sparkles className="w-4.5 h-4.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-sm uppercase tracking-tight text-white leading-tight">
                        MEGA Constructions
                      </h5>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                        Service & Spares
                      </p>
                    </div>
                  </div>

                  {/* Direct Contact specs */}
                  <div className="space-y-2.5 text-xs text-gray-300 pt-2 font-mono">
                    <a href="tel:+918790940354" className="flex items-center gap-3 hover:text-primary transition-colors">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <span>+91 8790940354</span>
                    </a>
                    <a href="mailto:megaconcretspares@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <span>megaconcretspares@gmail.com</span>
                    </a>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-300 leading-normal">
                        5-12-193, Mangapuram Colony,<br />
                        Moula-Ali, Hyderabad, Telangana - 500040
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative industrial grate strip */}
              <div className="h-6 bg-slate-900 border-t border-white/5 flex items-center justify-between px-6 text-[9px] font-mono text-gray-500">
                <span>GST: 36ASDPV4379E1ZD</span>
                <span>VERIFIED MANUFACTURER</span>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Mission, Vision, and Quality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className={`bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm border-l-4 ${card.color} hover:border-primary hover:shadow-md transition-all duration-300`}
              >
                <div className="bg-secondary/5 p-3 rounded-xl w-fit text-secondary mb-5">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h4 className="text-lg font-display font-bold text-secondary uppercase tracking-tight mb-3">
                  {card.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose Us: Animated Timeline */}
        <div className="bg-secondary text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 grate-pattern-dark opacity-[0.03] pointer-events-none" />
          <div className="absolute inset-0 industrial-grid-dark opacity-10 pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center mb-12 relative z-10">
            <span className="text-xs font-mono tracking-widest text-primary uppercase">TIMELINE OF EXCELLENCE</span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-2 uppercase tracking-tight">
              MILESTONES OF OUR GROWTH
            </h3>
            <div className="w-16 h-1 bg-primary mx-auto mt-3 rounded-full" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* The line connector */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />
            
            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-12 md:gap-x-8 items-center">
              {milestones.map((milestone, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={idx} className="md:contents">
                    {/* Block spacer (Desktop left/right) */}
                    {isLeft && <div className="hidden md:block md:col-span-5" />}

                    {/* Milestone Dot Indicator */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="hidden md:flex md:col-span-2 justify-center relative"
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-900 border-4 border-primary flex items-center justify-center font-display font-bold text-xs text-primary shadow-lg relative z-10">
                        {milestone.year}
                      </div>
                    </motion.div>

                    {/* Milestone Card Content */}
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.15 }}
                      whileHover={{ scale: 1.02, borderColor: 'rgba(253,185,19,0.3)' }}
                      className={`col-span-5 bg-slate-950/80 border border-white/5 p-6 rounded-2xl relative ${
                        isLeft ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      <span className="block md:hidden text-primary font-display font-bold text-lg mb-1">{milestone.year}</span>
                      <h4 className="text-base font-display font-bold text-white uppercase tracking-tight">
                        {milestone.title}
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-sm mt-2 leading-relaxed">
                        {milestone.desc}
                      </p>
                    </motion.div>

                    {/* Block spacer (Desktop left/right opposite) */}
                    {!isLeft && <div className="hidden md:block md:col-span-5" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
