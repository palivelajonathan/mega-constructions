/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Settings, HardHat, Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onToggleAdmin?: () => void;
  onSelectCategory?: (category: 'all' | 'rebar' | 'concrete' | 'lifting' | 'spares') => void;
}

export default function Footer({ onToggleAdmin, onSelectCategory }: FooterProps) {
  const currentYear = new Date().getFullYear();

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

  const handleCategoryClick = (category: 'all' | 'rebar' | 'concrete' | 'lifting' | 'spares') => {
    if (onSelectCategory) {
      onSelectCategory(category);
    } else {
      scrollToSection('products');
    }
  };

  const seoKeywords = [
    'Construction Equipment Hyderabad',
    'Construction Machinery Hyderabad',
    'Concrete Mixer Supplier Hyderabad',
    'Rebar Bending Machine Hyderabad',
    'Rebar Cutting Machine Hyderabad',
    'Construction Equipment Dealer Telangana',
    'Construction Equipment Rental Hyderabad',
    'Industrial Machinery Supplier Hyderabad'
  ];

  return (
    <footer id="app-footer" className="bg-secondary text-gray-400 text-sm border-t border-primary/20 relative overflow-hidden">
      {/* Decorative corner visual */}
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-5 overflow-hidden">
        <div className="w-full h-full grate-pattern-dark" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        
        {/* Top 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/5">
          
          {/* Brand block */}
          <div className="space-y-4">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <div className="bg-primary text-secondary p-2.5 rounded-sm shadow-md relative border border-amber-300">
                <Settings className="w-5.5 h-5.5 stroke-[2.5]" />
                <div className="absolute -top-1 -right-1 bg-secondary text-primary p-0.5 rounded-sm shadow border border-primary/50">
                  <HardHat className="w-2.5 h-2.5" />
                </div>
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-normal text-white block uppercase leading-none">
                  MEGA <span className="text-primary">CONSTRUCTIONS</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 block mt-1 font-mono font-bold">
                  Heavy Equipment & Spares
                </span>
              </div>
            </button>
            
            <p className="text-gray-400 text-xs leading-relaxed">
              Trusted supplier and stockist in Hyderabad for concrete mixers, rebar benders, mini cranes, and genuine spare parts. Providing reliable site equipment and maintenance support.
            </p>

            <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex items-center gap-2 text-xs font-mono text-gray-300">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0 animate-pulse" />
              <span>REG_ESTD: Moul-Ali Secunderabad</span>
            </div>
          </div>

          {/* Quick Navigation links */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs uppercase tracking-wider text-white border-l-2 border-primary pl-2.5">
              MACHINERY RANGE
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleCategoryClick('rebar')} className="hover:text-primary hover:underline transition-all text-left cursor-pointer">
                  Rebar Bending Machine (GW-42J)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('rebar')} className="hover:text-primary hover:underline transition-all text-left cursor-pointer">
                  Rebar Cutting Machine (GQ-40)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('concrete')} className="hover:text-primary hover:underline transition-all text-left cursor-pointer">
                  Concrete Mixer (Heavy Duty)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('lifting')} className="hover:text-primary hover:underline transition-all text-left cursor-pointer">
                  Industrial Mini Cranes & Hoists
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('spares')} className="hover:text-primary hover:underline transition-all text-left cursor-pointer">
                  Original Spare Parts Range
                </button>
              </li>
            </ul>
          </div>

          {/* Services Quick list */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs uppercase tracking-wider text-white border-l-2 border-primary pl-2.5">
              OUR SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-primary hover:underline transition-all text-left cursor-pointer">
                  On-Site Installation & Assembly
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-primary hover:underline transition-all text-left cursor-pointer">
                  Flexible Machinery Rentals
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-primary hover:underline transition-all text-left cursor-pointer">
                  Copper Motor Winding Repairs
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="hover:text-primary hover:underline transition-all text-left cursor-pointer">
                  Monthly Preventative Servicing
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Coordinates */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-xs uppercase tracking-wider text-white border-l-2 border-primary pl-2.5">
              HEAD OFFICE
            </h4>
            <div className="space-y-3.5 text-xs font-mono text-gray-300">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  #5-12-193, Mangapuram Colony,<br />
                  Moula-Ali, Hyderabad,<br />
                  Telangana State - 500040
                </span>
              </div>
              <div className="flex gap-2.5 items-center border-t border-white/5 pt-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+918790940354" className="hover:text-primary font-bold">+91 8790940354</a>
              </div>
              <div className="flex gap-2.5 items-center border-t border-white/5 pt-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:megaconcretspares@gmail.com" className="hover:text-primary">megaconcretspares@gmail.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Keywords Tag Cloud */}
        <div className="mb-10 pb-8 border-b border-white/5">
          <span className="block font-display font-black text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-mono">
            TELANGANA INFRASTRUCTURE REGISTRY (SEO KEYWORDS):
          </span>
          <div className="flex flex-wrap gap-2">
            {seoKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="bg-white/5 border border-white/5 text-gray-500 hover:text-white px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors cursor-default"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom copyright info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© {currentYear} Mega Constructions. All rights reserved.</p>
          <div className="flex gap-4 text-gray-500">
            <span>Proprietor: L. Venkat Rao</span>
            <span>•</span>
            <span>GSTIN: 36ASDPV4379E1ZD</span>
            <span>•</span>
            <a
              href="https://google.com/maps?q=Moula+Ali+Hyderabad+500040"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary flex items-center gap-1"
            >
              Get Coordinates <ExternalLink className="w-3 h-3" />
            </a>
            {onToggleAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={onToggleAdmin}
                  className="hover:text-primary hover:underline transition-all font-semibold flex items-center gap-1"
                >
                  <Settings className="w-3 h-3 text-primary animate-spin-slow" /> CMS Admin Panel
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
