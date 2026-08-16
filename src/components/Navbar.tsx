/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Search, SlidersHorizontal, Settings, HardHat, FileText, Compass, HeartHandshake } from 'lucide-react';
import { Product } from '../types';

interface NavbarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  comparingCount: number;
  onOpenComparison: () => void;
  activeSection: string;
  onToggleAdmin?: () => void;
}

export default function Navbar({
  onSearch,
  searchQuery,
  comparingCount,
  onOpenComparison,
  activeSection,
  onToggleAdmin
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home', icon: Compass },
    { label: 'About', href: '#about', id: 'about', icon: HardHat },
    { label: 'Services', href: '#services', id: 'services', icon: HeartHandshake },
    { label: 'Products', href: '#products', id: 'products', icon: Settings },
    { label: 'Gallery', href: '#gallery', id: 'gallery', icon: FileText },
    { label: 'Contact', href: '#contact', id: 'contact', icon: Phone }
  ];

  const handleNavClick = (e: React.MouseEvent | React.TouchEvent, targetId: string) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsOpen(false);
    
    // Smooth scroll with offset for sticky navbar
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navHeight),
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  const handleMobileSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById('products');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navHeight),
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#products');
    }
  };

  return (
    <>
      {/* Top micro banner */}
      <div id="top-banner" className="bg-secondary text-gray-400 text-xs py-2 px-4 md:px-12 flex justify-between items-center border-b border-white/10 relative z-40">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-primary animate-pulse" />
            HEAVY_PLANT_YARD: MOULA-ALI, HYDERABAD
          </span>
          <span className="hidden md:inline font-mono text-[11px]">GSTIN: 36ASDPV4379E1ZD</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+918790940354" className="flex items-center gap-1 hover:text-primary transition-colors text-white font-mono font-bold">
            <Phone className="w-3.5 h-3.5 text-primary" /> +91 8790940354
          </a>
        </div>
      </div>

      {/* Hazard warning stripe divider bar */}
      <div className="h-1 hazard-stripes w-full relative z-40" />

      <header
        id="app-header"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-secondary/95 backdrop-blur-md shadow-2xl py-3 border-b-2 border-primary/40'
            : 'bg-secondary py-4.5 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand Logo Container */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="bg-primary text-secondary p-2.5 rounded-sm shadow-md relative transition-transform duration-300 group-hover:scale-105 border border-amber-300">
              <motion.div
                animate={{ rotate: isScrolled ? 180 : 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              >
                <Settings className="w-6 h-6 stroke-[2.5]" />
              </motion.div>
              <div className="absolute -top-1 -right-1 bg-secondary text-primary p-0.5 rounded-sm shadow border border-primary/50">
                <HardHat className="w-2.5 h-2.5" />
              </div>
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-normal text-white block uppercase leading-none">
                MEGA <span className="text-primary">CONSTRUCTIONS</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 block mt-1 font-mono font-bold">
                Heavy Equipment & Spares
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative px-3.5 py-2 rounded-lg font-display text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search toggler / input */}
            <div className="relative">
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-10 top-1/2 -translate-y-1/2"
                  >
                    <input
                      type="text"
                      placeholder="Search machinery, specs..."
                      value={searchQuery}
                      onChange={(e) => onSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setShowSearch(false);
                          const el = document.getElementById('products');
                          if (el) {
                            const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                            window.scrollTo({ top: Math.max(0, elementPosition - 80), behavior: 'smooth' });
                          }
                        }
                      }}
                      className="w-full bg-slate-900 border border-white/20 text-white rounded-full py-1.5 pl-4 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-mono"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => onSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                id="search-toggle"
                onClick={() => {
                  setShowSearch(!showSearch);
                  if (showSearch) onSearch('');
                }}
                className={`p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer ${
                  showSearch ? 'text-primary bg-white/10' : ''
                }`}
                aria-label="Search items"
              >
                <Search className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Comparison button trigger */}
            <button
              id="comparison-trigger"
              onClick={onOpenComparison}
              className="relative p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
              aria-label="Open machinery comparison"
            >
              <SlidersHorizontal className="w-4.5 h-4.5" />
              {comparingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-secondary font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  {comparingCount}
                </span>
              )}
            </button>

            {onToggleAdmin && (
              <button
                onClick={onToggleAdmin}
                className="p-2.5 rounded-full text-gray-400 hover:text-primary hover:bg-white/5 transition-all duration-200 cursor-pointer"
                title="CMS Admin Panel"
                aria-label="CMS Admin Panel"
              >
                <Settings className="w-4.5 h-4.5 text-primary" />
              </button>
            )}

            {/* Contact CTA */}
            <a
              id="nav-cta"
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-secondary font-display font-bold px-4.5 py-2.5 rounded-lg shadow-[0_4px_12px_rgba(253,185,19,0.2)] hover:shadow-[0_6px_20px_rgba(253,185,19,0.4)] hover:scale-[1.02] transition-all duration-200 text-xs uppercase tracking-wider cursor-pointer"
            >
              Request Quote
            </a>

            {/* Mobile Hamburger menu toggle */}
            <button
              id="hamburger-menu"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu slideout attached seamlessly to header */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Dimmed backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="lg:hidden fixed inset-0 top-[65px] bg-black/60 backdrop-blur-xs z-40"
              />

              <motion.div
                id="mobile-drawer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden absolute top-full left-0 right-0 w-full bg-secondary border-b-2 border-primary/40 shadow-2xl z-50 max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain"
              >
                <div className="px-4 pt-4 pb-8 space-y-3">
                  {/* Search Input Form in Drawer */}
                  <form onSubmit={handleMobileSearchSubmit} className="relative mb-3">
                    <button
                      type="submit"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary cursor-pointer p-1"
                      aria-label="Search"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      placeholder="Search machines, tools..."
                      value={searchQuery}
                      onChange={(e) => onSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleMobileSearchSubmit();
                        }
                      }}
                      className="w-full bg-slate-900 border border-white/15 text-white rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono placeholder:text-gray-500"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => onSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </form>

                  {/* Navigation Links */}
                  <div className="space-y-1.5">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.id;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.id)}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-wide transition-all cursor-pointer ${
                            isActive
                              ? 'bg-primary text-secondary shadow-md font-black'
                              : 'text-gray-200 hover:text-white hover:bg-white/5 active:bg-white/10'
                          }`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                          {item.label}
                        </a>
                      );
                    })}
                  </div>

                  {/* Drawer Action Trays */}
                  <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onOpenComparison();
                        const el = document.getElementById('products');
                        if (el) {
                          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                          window.scrollTo({ top: Math.max(0, elementPosition - 80), behavior: 'smooth' });
                        }
                      }}
                      className="flex items-center justify-between px-4 py-3.5 bg-slate-900 hover:bg-slate-850 text-white rounded-xl font-display font-bold text-xs uppercase tracking-wider border border-white/10 cursor-pointer transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <SlidersHorizontal className="w-4.5 h-4.5 text-primary" /> Machinery Comparison
                      </span>
                      <span className="bg-primary text-secondary font-mono text-xs font-bold px-2.5 py-0.5 rounded-full shadow">
                        {comparingCount}
                      </span>
                    </button>

                    <button
                      onClick={(e) => handleNavClick(e, 'contact')}
                      className="w-full bg-primary hover:bg-primary-dark text-secondary font-display font-black py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer hover:scale-[1.01] transition-all"
                    >
                      Request Quote
                    </button>

                    {onToggleAdmin && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onToggleAdmin();
                        }}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-primary border border-primary/30 font-display font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-primary" /> CMS Admin Panel
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
