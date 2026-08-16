/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, ChevronUp } from 'lucide-react';

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsAppLink = 'https://wa.me/918790940354?text=Hello%20Mega%20Construction%20Equipments%2C%20I%20visited%20your%20website%20and%20need%20a%20pricing%20quote%20for%20your%20machinery.';

  return (
    <div id="floating-actions" className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
      {/* WhatsApp Sales Button */}
      <motion.a
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-13 h-13 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.6)] transition-shadow relative group cursor-pointer"
        aria-label="Chat with sales on WhatsApp"
      >
        <MessageCircle className="w-6.5 h-6.5 fill-white stroke-none" />
        <span className="absolute right-15 bg-secondary text-white text-[10px] font-display font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          WhatsApp Sales
        </span>
      </motion.a>

      {/* Call Sales Button */}
      <motion.a
        href="tel:+918790940354"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-13 h-13 bg-primary text-secondary rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(253,185,19,0.4)] hover:shadow-[0_8px_24px_rgba(253,185,19,0.6)] transition-shadow relative group cursor-pointer"
        aria-label="Call Sales"
      >
        <Phone className="w-5.5 h-5.5 fill-current animate-pulse" />
        <span className="absolute right-15 bg-secondary text-white text-[10px] font-display font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Call Sales Squad
        </span>
      </motion.a>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-13 h-13 bg-secondary text-white border border-white/10 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-slate-900 transition-colors"
            aria-label="Scroll back to top"
          >
            <ChevronUp className="w-6 h-6 text-primary" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
