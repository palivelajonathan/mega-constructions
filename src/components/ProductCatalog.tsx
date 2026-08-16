/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Settings2, FileDown, CheckCircle2, ShoppingBag, ArrowRight, Heart, X, Sparkles, MessageSquare, ListCollapse, BookOpen } from 'lucide-react';
import { Product } from '../types';
import { useCMS } from '../context/CMSContext';

interface ProductCatalogProps {
  searchQuery: string;
  onClearSearch?: () => void;
  selectedCategory?: 'all' | 'rebar' | 'concrete' | 'lifting' | 'spares';
  onSelectCategory?: (category: 'all' | 'rebar' | 'concrete' | 'lifting' | 'spares') => void;
  onSelectProduct: (product: Product) => void;
  onOpenInquiry: (productName: string) => void;
  onUpdateComparingCount: (count: number) => void;
  showComparison: boolean;
  onCloseComparison: () => void;
}

export default function ProductCatalog({
  searchQuery,
  onClearSearch,
  selectedCategory: propCategory,
  onSelectCategory: propOnSelectCategory,
  onSelectProduct,
  onOpenInquiry,
  onUpdateComparingCount,
  showComparison,
  onCloseComparison
}: ProductCatalogProps) {
  const cms = useCMS();
  const productsList = useMemo(() => cms.products.filter(p => !p.isHidden), [cms.products]);

  const [internalCategory, setInternalCategory] = useState<'all' | 'rebar' | 'concrete' | 'lifting' | 'spares'>('all');
  const selectedCategory = propCategory !== undefined ? propCategory : internalCategory;
  const setSelectedCategory = (cat: 'all' | 'rebar' | 'concrete' | 'lifting' | 'spares') => {
    setInternalCategory(cat);
    if (propOnSelectCategory) propOnSelectCategory(cat);
  };

  const [comparingIds, setComparingIds] = useState<string[]>([]);
  const [showBrochureModal, setShowBrochureModal] = useState<Product | null>(null);
  const [compareAlert, setCompareAlert] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'rebar', label: 'Rebar Processing' },
    { id: 'concrete', label: 'Concrete Mixing' },
    { id: 'lifting', label: 'Lifting & Shifting' },
    { id: 'spares', label: 'Genuine Spares' }
  ];

  // Filtering products list
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.specs.model && product.specs.model.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.specs.rebarDiameter && product.specs.rebarDiameter.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, productsList]);

  // Handling compare list toggle
  const toggleComparing = (productId: string) => {
    setComparingIds((prev) => {
      let updated;
      if (prev.includes(productId)) {
        updated = prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 3) {
          setCompareAlert('You can compare a maximum of 3 machinery assets at a time.');
          setTimeout(() => setCompareAlert(null), 3000);
          return prev;
        }
        updated = [...prev, productId];
      }
      onUpdateComparingCount(updated.length);
      return updated;
    });
  };

  const comparedProducts = useMemo(() => {
    return productsList.filter((p) => comparingIds.includes(p.id));
  }, [comparingIds, productsList]);

  return (
    <section id="products" className="py-20 bg-slate-100 relative overflow-hidden">
      
      {/* Decorative structures */}
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary uppercase bg-secondary/5 px-3 py-1 rounded-full">
            HEAVY INDUSTRY PRODUCTS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-secondary mt-3 tracking-tight uppercase">
            EXPLORE THE MEGA MACHINERY FLEET
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-3 font-light leading-relaxed max-w-xl mx-auto">
            Engineered for high compaction density, rapid reinforcement shaping, and massive vertical material lift cycles. Select an asset below to explore full technical data.
          </p>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filter Pills & Info Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4.5 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-secondary text-white shadow-md border-b-2 border-primary'
                    : 'bg-white text-gray-500 border border-gray-200 hover:text-secondary hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
            <Settings2 className="w-4.5 h-4.5 text-primary animate-spin" style={{ animationDuration: '4s' }} />
            <span>FOUND {filteredProducts.length} PRODUCTS MATCHING CRITERIA</span>
          </div>
        </div>

        {/* Compare notice alert banner */}
        <AnimatePresence>
          {compareAlert && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-amber-500/10 border border-amber-500/30 text-amber-900 px-4 py-3 rounded-xl mb-6 text-xs font-mono flex items-center justify-between"
            >
              <span>{compareAlert}</span>
              <button onClick={() => setCompareAlert(null)} className="text-amber-800 font-bold ml-2">✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Query Filter Notice */}
        {searchQuery && (
          <div className="bg-primary/10 border border-primary/20 text-secondary p-3.5 rounded-xl mb-6 text-xs font-mono flex items-center justify-between">
            <span>SHOWING RESULTS FOR: &quot;{searchQuery}&quot;</span>
            <button
              onClick={() => onClearSearch ? onClearSearch() : null}
              className="text-red-600 font-bold hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Products Grid Layout */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isComparing = comparingIds.includes(product.id);
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:border-primary hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                {/* Product Image Frame */}
                <div
                  className="relative aspect-4/3 overflow-hidden bg-slate-50 group cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category overlay */}
                  <span className="absolute top-3.5 left-3.5 bg-secondary/90 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded shadow-md border-l-2 border-primary">
                    {product.category.toUpperCase()}
                  </span>

                  {/* Brochure download floating trigger */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBrochureModal(product);
                    }}
                    className="absolute top-3.5 right-3.5 p-2 bg-white/90 hover:bg-primary text-secondary hover:text-secondary rounded-lg shadow-md transition-colors cursor-pointer"
                    title="View Technical Data Sheet"
                  >
                    <BookOpen className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Content info card */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-lg sm:text-xl font-display font-bold text-secondary uppercase tracking-tight line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                    >
                      {product.name}
                    </h3>
                    <p className="text-primary font-display font-bold text-xs uppercase tracking-wide">
                      Model: {product.specs.model}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    {/* Specifications mini bullet highlights */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-4 border-t border-gray-100 font-mono text-[10px] text-gray-500">
                      {product.specs.power && (
                        <div>• POWER: <span className="font-semibold text-secondary">{product.specs.power}</span></div>
                      )}
                      {product.specs.rebarDiameter && (
                        <div>• REBAR: <span className="font-semibold text-secondary">{product.specs.rebarDiameter}</span></div>
                      )}
                      {product.specs.voltage && (
                        <div>• VOLT: <span className="font-semibold text-secondary">{product.specs.voltage}</span></div>
                      )}
                      {product.specs.weight && (
                        <div>• WEIGHT: <span className="font-semibold text-secondary">{product.specs.weight}</span></div>
                      )}
                    </div>
                  </div>

                  {/* Actions buttons footer */}
                  <div className="pt-6 mt-4 border-t border-gray-50 flex flex-col gap-2.5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-slate-900 text-white font-display font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider shadow-sm"
                      >
                        Explore Technical details <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => toggleComparing(product.id)}
                        className={`p-3.5 rounded-xl border transition-all ${
                          isComparing
                            ? 'bg-primary text-secondary border-primary shadow-inner'
                            : 'bg-white text-gray-400 border-gray-200 hover:text-secondary hover:bg-gray-50'
                        }`}
                        title={isComparing ? 'Remove from Comparison' : 'Add to Compare'}
                      >
                        <SlidersHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => onOpenInquiry(product.name)}
                      className="w-full bg-primary/10 border border-primary/20 hover:bg-primary text-secondary hover:text-secondary font-display font-black py-3 rounded-xl transition-all text-[11px] uppercase tracking-wider text-center block"
                    >
                      Instant Quote Request
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>

        {/* RELATED PRODUCTS DRAWER: Compare Machinery asset dashboard */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-secondary text-white border-t border-primary/30 shadow-[0_-10px_40px_rgba(17,17,17,0.4)]"
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-primary animate-pulse" />
                    <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">
                      MACHINERY SPECIFICATION COMPARISON MATRIX
                    </h3>
                  </div>
                  <button
                    onClick={onCloseComparison}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {comparingIds.length === 0 ? (
                  <div className="py-6 text-center text-gray-400 text-xs font-mono">
                    No machinery assets selected for comparison. Add up to 3 machines using the <SlidersHorizontal className="inline w-3.5 h-3.5 text-primary" /> icon on product cards.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch divide-y md:divide-y-0 md:divide-x divide-white/10">
                    
                    {/* The Spec Matrix Left Title column */}
                    <div className="hidden md:flex flex-col justify-between text-xs font-mono text-gray-400 pr-4 space-y-2 py-2">
                      <div className="font-semibold text-primary uppercase text-[10px]">Parameter Column</div>
                      <div>MODEL ID</div>
                      <div>POWER PROFILE</div>
                      <div>INPUT VOLTAGE</div>
                      <div>WEIGHT TOTAL</div>
                      <div>CAPACITY / SHEAR</div>
                      <div>DRIVING DESIGN</div>
                    </div>

                    {/* Compared Products Details Columns */}
                    {comparedProducts.map((p) => (
                      <div key={p.id} className="relative bg-slate-950/50 p-4.5 rounded-xl border border-white/5 flex flex-col justify-between">
                        <button
                          onClick={() => toggleComparing(p.id)}
                          className="absolute top-2 right-2 p-1 bg-white/5 hover:bg-red-600 rounded-full text-gray-400 hover:text-white transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>

                        <div className="space-y-3.5">
                          <div>
                            <h4 className="font-display font-black text-sm uppercase tracking-tight text-white">{p.name}</h4>
                            <p className="text-[10px] text-primary font-mono font-bold uppercase mt-0.5">{p.specs.model}</p>
                          </div>

                          <div className="space-y-1 text-xs font-mono text-gray-300">
                            <div className="flex justify-between md:block"><span className="md:hidden text-gray-500 uppercase text-[9px] font-mono">POWER: </span>{p.specs.power || 'N/A'}</div>
                            <div className="flex justify-between md:block"><span className="md:hidden text-gray-500 uppercase text-[9px] font-mono">VOLT: </span>{p.specs.voltage || 'N/A'}</div>
                            <div className="flex justify-between md:block"><span className="md:hidden text-gray-500 uppercase text-[9px] font-mono">WEIGHT: </span>{p.specs.weight || 'N/A'}</div>
                            <div className="flex justify-between md:block"><span className="md:hidden text-gray-500 uppercase text-[9px] font-mono">CAPACITY: </span>{p.specs.capacity || p.specs.rebarDiameter || 'N/A'}</div>
                            <div className="flex justify-between md:block"><span className="md:hidden text-gray-500 uppercase text-[9px] font-mono">DRIVE: </span>{p.specs.drivingMode || 'Direct Axis'}</div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/10">
                          <button
                            onClick={() => {
                              onCloseComparison();
                              onOpenInquiry(p.name);
                            }}
                            className="w-full bg-primary hover:bg-primary-dark text-secondary font-display font-black py-2 rounded-lg text-[10px] uppercase tracking-wider text-center"
                          >
                            Inquire Asset
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Placeholder Slot */}
                    {comparingIds.length < 3 && (
                      <div className="hidden md:flex flex-col items-center justify-center border-2 border-dashed border-white/15 rounded-xl p-6 text-center text-xs text-gray-500 font-mono">
                        <span>SELECT {3 - comparingIds.length} MORE</span>
                        <span className="text-[10px] mt-1 text-gray-600">to fill the comparison slots</span>
                      </div>
                    )}

                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Simulated print-ready Brochure overlay */}
        <AnimatePresence>
          {showBrochureModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl p-6 md:p-8 max-w-xl w-full border border-gray-100 shadow-2xl relative text-secondary"
              >
                <button
                  onClick={() => setShowBrochureModal(null)}
                  className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-lg text-gray-400 hover:text-secondary"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  {/* Top brand header */}
                  <div className="flex items-center gap-2.5 border-b pb-4">
                    <div className="bg-primary text-secondary p-2 rounded-lg">
                      <Settings2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-sm uppercase tracking-tight text-secondary">
                        MEGA CONSTRUCTION EQUIPMENTS
                      </h4>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-mono">
                        TECHNICAL DATA SHEET GENERATOR
                      </p>
                    </div>
                  </div>

                  {/* Sheet metadata */}
                  <div>
                    <h3 className="text-xl font-display font-black text-secondary uppercase tracking-tight">
                      {showBrochureModal.name} DATA SHEET
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 font-mono">
                      Ref Code: TDS-MEGA-{showBrochureModal.id.toUpperCase()}-2026
                    </p>
                  </div>

                  {/* Core specifications block */}
                  <div className="bg-slate-50 rounded-xl p-4.5 border border-gray-100 text-xs font-mono space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-400">MODEL CODE:</span>
                      <span className="font-bold text-secondary">{showBrochureModal.specs.model}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-400">POWERTRAIN OUTPUT:</span>
                      <span className="font-bold text-secondary">{showBrochureModal.specs.power}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-400">NOMINAL VOLTAGE:</span>
                      <span className="font-bold text-secondary">{showBrochureModal.specs.voltage}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-gray-400">ESTIMATED ASSET WEIGHT:</span>
                      <span className="font-bold text-secondary">{showBrochureModal.specs.weight}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-gray-400">DISPATCH PORT:</span>
                      <span className="font-bold text-secondary">MOULA-ALI, HYDERABAD</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 leading-relaxed">
                    This generated sheet compiles official manufacturer limits. Mega certifies that the model conforms to Indian Standard (IS) reinforcement and electrical safety grid policies.
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="flex-1 bg-secondary hover:bg-slate-900 text-white font-display font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider text-center"
                    >
                      Print Technical Spec Sheet
                    </button>
                    <a
                      href={`https://wa.me/918790940354?text=Please%20send%20me%20the%20official%20PDF%20catalogue%20for%20the%20${encodeURIComponent(showBrochureModal.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary hover:bg-primary-dark text-secondary font-display font-black px-5 py-3.5 rounded-xl transition-all text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
                    >
                      <FileDown className="w-4 h-4" /> Request PDF Catalog
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
