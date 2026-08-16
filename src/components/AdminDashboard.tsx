/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Edit2, Trash2, Eye, EyeOff, Star, Search, Filter, 
  UploadCloud, FileText, Mail, Phone, Shield, Globe, Sliders, 
  User, Lock, LogOut, ArrowLeft, Check, Database, Images, 
  MessageSquare, Settings2, ExternalLink, FileSpreadsheet, 
  ChevronRight, HardHat, RefreshCw, Layers, Grid, List, CheckSquare
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { Product, Service, FAQItem, Testimonial, Inquiry, MediaFile, GalleryItem } from '../types';

export default function AdminDashboard({ onClose }: { onClose: () => void }) {
  const cms = useCMS();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'media' | 'services' | 'enquiries' | 'settings'>('overview');
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Search & Filters inside Admin tabs
  const [prodSearch, setProdSearch] = useState('');
  const [mediaSearch, setMediaSearch] = useState('');
  const [mediaFilter, setMediaFilter] = useState('all');
  const [enqFilter, setEnqFilter] = useState<'all' | 'pending' | 'replied' | 'read'>('all');

  // Form Editing Modals / States
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [replyingEnquiry, setReplyingEnquiry] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Unsplash Simulation URL Input
  const [simulatedImageUrl, setSimulatedImageUrl] = useState('');
  const [simulatedImageName, setSimulatedImageName] = useState('');
  const [simulatedImageCat, setSimulatedImageCat] = useState('products');

  // Helper function to show notifications
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    const success = await cms.login(email, password);
    setIsLoggingIn(false);
    if (!success) {
      setLoginError('Invalid Administrator credentials. Please check your credentials and try again.');
    } else {
      showToast('Logged in successfully! Welcome to MegaCMS.');
    }
  };

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedImageUrl) return;
    const name = simulatedImageName || 'uploaded_image_' + Date.now();
    cms.addMediaFile(name, simulatedImageUrl, simulatedImageCat);
    setSimulatedImageUrl('');
    setSimulatedImageName('');
    showToast(`Asset "${name}" successfully registered in Media Library!`);
  };

  const exportEnquiriesCSV = () => {
    const headers = ['ID', 'Date', 'Full Name', 'Company', 'Phone', 'Email', 'Product', 'Message', 'Status'];
    const rows = cms.inquiries.map(i => [
      i.id,
      i.date.split('T')[0],
      i.fullName,
      i.company,
      i.phone,
      i.email,
      i.productName,
      i.message.replace(/"/g, '""'),
      i.status
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Mega_Enquiries_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CRM enquiries successfully exported to CSV file.');
  };

  // Secure Login Gate
  if (!cms.isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-secondary z-50 flex items-center justify-center p-4">
        {/* Ambient Industrial Accents */}
        <div className="absolute inset-0 industrial-grid opacity-[0.03] pointer-events-none" />
        <div className="absolute inset-0 grate-pattern opacity-[0.02] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Top Yellow Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />
          
          <div className="flex flex-col items-center mb-8">
            <div className="bg-primary text-secondary p-3.5 rounded-2xl shadow-lg mb-4">
              <Shield className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
              MEGA CONSTRUCTIONS PORTAL
            </h1>
            <p className="text-gray-400 text-xs text-center mt-1 uppercase tracking-widest font-mono">
              AUTHORIZED OWNERSHIP VERIFICATION
            </p>
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl mb-6 leading-relaxed font-mono">
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-bold">
                Admin Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@megaconstructions.com"
                  className="w-full bg-slate-900 border border-slate-800 text-white placeholder-gray-600 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-mono transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-bold">
                Secure Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-800 text-white placeholder-gray-600 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-mono transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-primary hover:bg-primary-dark text-secondary font-display font-black py-4 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:shadow-primary/10 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoggingIn ? 'Verifying Credentials...' : 'Authenticate & Unlock'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <button
            onClick={onClose}
            className="w-full text-center text-xs text-gray-500 hover:text-white transition-colors mt-6 font-mono uppercase tracking-widest flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
          </button>
        </motion.div>
      </div>
    );
  }

  // Active Enquiries Calculations
  const pendingEnquiriesCount = cms.inquiries.filter(i => i.status === 'pending').length;

  return (
    <div className="fixed inset-0 bg-secondary text-white z-50 flex flex-col overflow-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-primary text-secondary px-6 py-3.5 rounded-xl shadow-2xl font-mono text-xs font-black z-[100] uppercase tracking-wider flex items-center gap-2 border border-yellow-300"
          >
            <Check className="w-4 h-4 stroke-[3]" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main CMS Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-secondary p-2 rounded-lg">
            <Settings2 className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg tracking-tight uppercase">
                MEGA<span className="text-primary">CMS</span> ENGINE
              </span>
              <span className="bg-primary/15 text-primary text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-primary/20">
                PRO-SYSTEM v3.5
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono block">Signed in: {cms.adminEmail}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="bg-white/5 hover:bg-white/10 px-4.5 py-2 rounded-xl text-xs font-display font-bold tracking-wider uppercase transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Live Website
          </button>
          
          <button
            onClick={() => cms.logout()}
            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* CMS Workspace Container */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-slate-950/80 border-r border-slate-900 flex flex-col justify-between p-4 shrink-0 overflow-y-auto">
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block px-3 mb-2 font-black">
              CMS MODULES
            </span>

            {[
              { id: 'overview', label: 'Dashboard Overview', icon: Database },
              { id: 'products', label: 'Product Catalog', icon: Sliders },
              { id: 'media', label: 'Media Library', icon: Images },
              { id: 'services', label: 'Services Manager', icon: HardHat },
              { id: 'enquiries', label: 'Enquiries Inbox', icon: MessageSquare, badge: pendingEnquiriesCount },
              { id: 'settings', label: 'Site Settings & SEO', icon: Globe }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wide transition-all ${
                    isActive 
                      ? 'bg-primary text-secondary shadow-lg' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    {tab.label}
                  </span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`font-mono text-[9px] font-black px-1.5 py-0.5 rounded-full ${isActive ? 'bg-secondary text-white' : 'bg-primary text-secondary'}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-900 pt-4 mt-6">
            <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-900 text-center">
              <span className="text-[10px] font-mono text-gray-400 block uppercase font-bold">
                SYSTEM STORAGE
              </span>
              <div className="w-full bg-slate-850 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-primary h-full w-[28%]" />
              </div>
              <span className="text-[9px] font-mono text-gray-500 mt-1 block">
                Using 284KB of 10MB Local quota
              </span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-secondary overflow-y-auto p-6 md:p-8">
          
          {/* =======================================================
              1. OVERVIEW / DASHBOARD TAB
             ======================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="text-2xl font-display font-bold uppercase tracking-tight">
                  CMS Control Overview
                </h2>
                <p className="text-gray-400 text-xs font-mono mt-1">
                  CURRENT SYSTEM METRICS AND DATABASE INDEX SUMMARY
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: 'Total Products', val: cms.products.length, desc: 'Registered inventory', color: 'border-yellow-500/20' },
                  { label: 'Media Assets', val: cms.mediaFiles.length, desc: 'WordPress Media Library', color: 'border-blue-500/20' },
                  { label: 'Core Services', val: cms.services.length, desc: 'Displayed services', color: 'border-purple-500/20' },
                  { label: 'Form Enquiries', val: cms.inquiries.length, desc: `CRM requests (${pendingEnquiriesCount} active)`, color: 'border-emerald-500/20' }
                ].map((stat, i) => (
                  <div key={i} className={`bg-slate-950 border ${stat.color} rounded-2xl p-5 shadow-lg relative overflow-hidden`}>
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block font-bold">
                      {stat.label}
                    </span>
                    <span className="text-4xl font-display font-black text-white mt-2 block">
                      {stat.val}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono mt-1 block uppercase">
                      {stat.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* CRM Live Feed & Quick Enquiries list */}
              <div className="grid lg:grid-cols-3 gap-6">
                
                {/* Enquiries Feed Card */}
                <div className="lg:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-lg space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                    <div>
                      <h3 className="font-display font-bold uppercase text-sm tracking-wide">
                        Recent Site Enquiries (CRM Inbox)
                      </h3>
                      <p className="text-[10px] text-gray-500 font-mono">
                        LATEST CUSTOMER QUOTATIONS FILED FROM THE FORM
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('enquiries')}
                      className="text-xs text-primary hover:underline flex items-center font-mono font-bold uppercase"
                    >
                      CRM Inbox <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cms.inquiries.slice(0, 3).map((enq) => (
                      <div key={enq.id} className="bg-slate-900/60 hover:bg-slate-900 border border-slate-900 rounded-xl p-4 transition-colors flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold font-display text-white">{enq.fullName}</span>
                            <span className="text-[10px] font-mono text-gray-500">| {enq.company}</span>
                            <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                              enq.status === 'pending' 
                                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' 
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}>
                              {enq.status}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-primary block">
                            Interested: <strong className="text-white">{enq.productName}</strong>
                          </span>
                          <p className="text-xs text-gray-400 leading-normal line-clamp-1 italic">
                            "{enq.message}"
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 shrink-0">
                          {new Date(enq.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Shortcuts & Diagnostics */}
                <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-lg space-y-4">
                  <h3 className="font-display font-bold uppercase text-sm tracking-wide border-b border-slate-900 pb-3">
                    Owner Fast Actions
                  </h3>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setIsAddingProduct(true);
                        setActiveTab('products');
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-850 text-white font-display font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-left flex items-center justify-between transition-colors border border-slate-850"
                    >
                      <span className="flex items-center gap-2"><Plus className="w-4 h-4 text-primary" /> Add New Machine</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('media');
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-850 text-white font-display font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-left flex items-center justify-between transition-colors border border-slate-850"
                    >
                      <span className="flex items-center gap-2"><UploadCloud className="w-4 h-4 text-primary" /> Upload Image Asset</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>

                    <button
                      onClick={exportEnquiriesCSV}
                      className="w-full bg-slate-900 hover:bg-slate-850 text-white font-display font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-left flex items-center justify-between transition-colors border border-slate-850"
                    >
                      <span className="flex items-center gap-2"><FileSpreadsheet className="w-4 h-4 text-primary" /> Export CRM CSV</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-xl text-xs space-y-2">
                    <span className="font-mono text-[10px] text-primary uppercase font-bold block">
                      SYSTEM DIAGNOSTICS:
                    </span>
                    <div className="flex justify-between font-mono text-gray-400">
                      <span>Server Engine</span>
                      <span className="text-emerald-400">ONLINE</span>
                    </div>
                    <div className="flex justify-between font-mono text-gray-400">
                      <span>Database Connection</span>
                      <span className="text-emerald-400">VERIFIED</span>
                    </div>
                    <div className="flex justify-between font-mono text-gray-400">
                      <span>Sync Mode</span>
                      <span className="text-primary font-bold">CLIENT-CMS STORAGE</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* =======================================================
              2. PRODUCT MANAGER TAB
             ======================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-display font-bold uppercase tracking-tight">
                    Machinery Inventory
                  </h2>
                  <p className="text-gray-400 text-xs font-mono mt-1">
                    MANAGE ACTIVE AND DRAFT CONSTRUCTION PRODUCTS
                  </p>
                </div>
                {!isAddingProduct && !editingProduct && (
                  <button
                    onClick={() => setIsAddingProduct(true)}
                    className="bg-primary hover:bg-primary-dark text-secondary font-display font-black px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 self-start"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" /> Add Machine Asset
                  </button>
                )}
              </div>

              {/* Dynamic Forms / List Toggle */}
              {isAddingProduct || editingProduct ? (
                <ProductForm 
                  product={editingProduct || undefined} 
                  onCancel={() => {
                    setEditingProduct(null);
                    setIsAddingProduct(false);
                  }}
                  onSave={(saved) => {
                    if (editingProduct) {
                      cms.updateProduct(editingProduct.id, saved);
                      showToast(`Product "${saved.name}" successfully updated!`);
                    } else {
                      cms.addProduct(saved);
                      showToast(`Product "${saved.name}" successfully added to catalog!`);
                    }
                    setEditingProduct(null);
                    setIsAddingProduct(false);
                  }}
                  mediaFiles={cms.mediaFiles}
                />
              ) : (
                <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-xl space-y-4">
                  {/* Search bar inside products */}
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search catalog by name, model, tag..."
                        value={prodSearch}
                        onChange={(e) => setProdSearch(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-850 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary font-mono"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-slate-900 rounded-xl">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-900 text-[10px] font-mono uppercase tracking-widest text-gray-400 border-b border-slate-850">
                        <tr>
                          <th className="py-4 px-4">Asset Details</th>
                          <th className="py-4 px-4">Category</th>
                          <th className="py-4 px-4">Model</th>
                          <th className="py-4 px-4">Power / Price</th>
                          <th className="py-4 px-4">Featured</th>
                          <th className="py-4 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 font-mono text-xs">
                        {cms.products
                          .filter(p => p.name.toLowerCase().includes(prodSearch.toLowerCase()) || p.category.toLowerCase().includes(prodSearch.toLowerCase()))
                          .map((prod) => (
                            <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                              <td className="py-4 px-4 flex items-center gap-3">
                                <img 
                                  src={prod.image} 
                                  alt={prod.name} 
                                  className="w-12 h-12 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <span className="font-display font-bold text-xs uppercase tracking-tight text-white block">
                                    {prod.name}
                                  </span>
                                  {prod.isHidden && (
                                    <span className="inline-block bg-red-500/10 text-red-400 text-[8px] font-bold px-1.5 py-0.5 rounded border border-red-500/15 uppercase mt-0.5">
                                      HIDDEN
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-4 px-4 uppercase font-bold text-primary text-[10px]">
                                {prod.category}
                              </td>
                              <td className="py-4 px-4 text-gray-300">
                                {prod.specs.model || 'N/A'}
                              </td>
                              <td className="py-4 px-4">
                                <span className="block text-white">{prod.price || 'On Request'}</span>
                                <span className="block text-[10px] text-gray-500">{prod.specs.power || 'N/A'}</span>
                              </td>
                              <td className="py-4 px-4">
                                <button
                                  onClick={() => {
                                    cms.toggleFeaturedProduct(prod.id);
                                    showToast(`${prod.isFeatured ? 'Removed' : 'Added'} featured machine.`);
                                  }}
                                  className={`p-1.5 rounded-lg transition-all ${
                                    prod.isFeatured 
                                      ? 'bg-primary/20 text-primary border border-primary/25' 
                                      : 'bg-slate-900 text-gray-600 border border-slate-850 hover:text-gray-400'
                                  }`}
                                  title={prod.isFeatured ? 'Remove featured' : 'Mark as featured'}
                                >
                                  <Star className={`w-4 h-4 ${prod.isFeatured ? 'fill-primary' : ''}`} />
                                </button>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex justify-end gap-1.5">
                                  <button
                                    onClick={() => {
                                      cms.toggleHideProduct(prod.id);
                                      showToast(`Product is now ${prod.isHidden ? 'visible' : 'hidden'}.`);
                                    }}
                                    className="p-1.5 bg-slate-900 hover:bg-slate-850 rounded-lg text-gray-400 hover:text-white border border-slate-850 transition-colors"
                                    title={prod.isHidden ? 'Show product' : 'Hide product'}
                                  >
                                    {prod.isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                  </button>

                                  <button
                                    onClick={() => setEditingProduct(prod)}
                                    className="p-1.5 bg-slate-900 hover:bg-slate-850 rounded-lg text-primary hover:text-primary-dark border border-slate-850 transition-colors"
                                    title="Edit machinery"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => {
                                      if (confirm(`Are you sure you want to delete ${prod.name}?`)) {
                                        cms.deleteProduct(prod.id);
                                        showToast('Product successfully deleted.');
                                      }
                                    }}
                                    className="p-1.5 bg-slate-900 hover:bg-red-900/20 rounded-lg text-red-400 hover:text-red-300 border border-slate-850 transition-colors"
                                    title="Delete product"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =======================================================
              3. MEDIA LIBRARY & GALLERY TAB
             ======================================================= */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-2xl font-display font-bold uppercase tracking-tight">
                  Media Library & Gallery
                </h2>
                <p className="text-gray-400 text-xs font-mono mt-1">
                  DRAG AND DROP OR REGISTER IMAGE ASSETS USED ACROSS THE PLATFORM
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Upload Simulated Form */}
                <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 shadow-lg h-fit space-y-4">
                  <span className="text-[10px] font-mono tracking-widest text-primary uppercase block font-black border-b border-slate-900 pb-2">
                    ADD IMAGE BY URL (SIMULATE UPLOAD)
                  </span>
                  
                  <form onSubmit={handleSimulatedUpload} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 mb-1">
                        UNSPLASH OR CDN IMAGE URL
                      </label>
                      <input
                        type="url"
                        required
                        value={simulatedImageUrl}
                        onChange={(e) => setSimulatedImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-slate-900 border border-slate-800 text-white placeholder-gray-600 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 mb-1">
                        FRIENDLY ASSET NAME
                      </label>
                      <input
                        type="text"
                        value={simulatedImageName}
                        onChange={(e) => setSimulatedImageName(e.target.value)}
                        placeholder="e.g., crawler_crane_hydraulic"
                        className="w-full bg-slate-900 border border-slate-800 text-white placeholder-gray-600 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 mb-1">
                        CATEGORY PLACEMENT
                      </label>
                      <select
                        value={simulatedImageCat}
                        onChange={(e) => setSimulatedImageCat(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary font-mono"
                      >
                        <option value="products">Product Gallery</option>
                        <option value="gallery">Project Gallery</option>
                        <option value="workshops">Workshop highlights</option>
                        <option value="banners">Banners / BGs</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-dark text-secondary font-display font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <UploadCloud className="w-4 h-4" /> Register Image Asset
                    </button>
                  </form>

                  {/* Drag and drop mock zone */}
                  <div className="border border-dashed border-slate-800 bg-slate-900/30 rounded-xl p-8 text-center cursor-pointer hover:bg-slate-900/50 transition-all flex flex-col items-center justify-center gap-2">
                    <UploadCloud className="w-8 h-8 text-gray-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-gray-400">
                      DRAG & DROP REAL IMAGE HERE
                    </span>
                    <span className="text-[9px] font-mono text-gray-600 uppercase">
                      Convert to base64 instantly & save to system
                    </span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            cms.addMediaFile(file.name.split('.')[0], reader.result as string, 'gallery', `${Math.round(file.size / 1024)} KB`);
                            showToast(`Uploaded "${file.name}" to media library.`);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="opacity-0 absolute w-0 h-0"
                      id="cms-file-uploader"
                    />
                    <label htmlFor="cms-file-uploader" className="mt-2 text-[10px] text-primary underline uppercase font-mono font-bold cursor-pointer">
                      Browse Files
                    </label>
                  </div>
                </div>

                {/* Media Grid */}
                <div className="lg:col-span-2 bg-slate-950 border border-slate-900 rounded-2xl p-5 shadow-lg space-y-4 flex flex-col h-[650px]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-slate-900 pb-3">
                    <span className="text-xs font-mono font-bold text-gray-400 uppercase">
                      Media Library Archive
                    </span>
                    
                    <div className="flex gap-2">
                      <select
                        value={mediaFilter}
                        onChange={(e) => setMediaFilter(e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-white rounded-lg py-1.5 px-2.5 text-xs font-mono"
                      >
                        <option value="all">All segments</option>
                        <option value="products">Products only</option>
                        <option value="gallery">Projects</option>
                        <option value="workshops">Workshops</option>
                      </select>
                      
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Search media..."
                          value={mediaSearch}
                          onChange={(e) => setMediaSearch(e.target.value)}
                          className="bg-slate-900 border border-slate-800 text-white placeholder-gray-600 rounded-lg py-1.5 pl-8 pr-2.5 text-xs font-mono focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {cms.mediaFiles
                      .filter(m => mediaFilter === 'all' || m.category === mediaFilter)
                      .filter(m => m.name.toLowerCase().includes(mediaSearch.toLowerCase()))
                      .map((media) => (
                        <div key={media.id} className="group bg-slate-900/60 border border-slate-850 rounded-xl p-2.5 flex flex-col justify-between relative overflow-hidden transition-all hover:border-primary">
                          <img 
                            src={media.url} 
                            alt={media.name} 
                            className="w-full h-32 object-cover rounded-lg bg-black/50"
                            referrerPolicy="no-referrer"
                          />
                          <div className="mt-2 space-y-0.5">
                            <span className="block text-[10px] font-mono text-white truncate font-semibold" title={media.name}>
                              {media.name}
                            </span>
                            <div className="flex justify-between font-mono text-[9px] text-gray-500 uppercase">
                              <span>{media.category}</span>
                              <span>{media.size}</span>
                            </div>
                          </div>

                          {/* Float actions hover */}
                          <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(media.url);
                                showToast('Copied image URL to clipboard!');
                              }}
                              className="w-full bg-primary hover:bg-primary-dark text-secondary text-[10px] font-mono font-bold py-1.5 rounded uppercase transition-colors"
                            >
                              Copy URL
                            </button>
                            <button
                              onClick={() => {
                                const newName = prompt("Enter new filename for asset:", media.name);
                                if (newName) {
                                  cms.renameMediaFile(media.id, newName);
                                  showToast('Asset renamed.');
                                }
                              }}
                              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-mono py-1.5 rounded uppercase border border-slate-800 transition-colors"
                            >
                              Rename
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Delete this asset from media library? This might break connected elements if the URL was custom.")) {
                                  cms.deleteMediaFile(media.id);
                                  showToast('Asset deleted.');
                                }
                              }}
                              className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-mono py-1.5 rounded uppercase border border-red-500/20 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =======================================================
              4. SERVICES MANAGER TAB
             ======================================================= */}
          {activeTab === 'services' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-display font-bold uppercase tracking-tight">
                    Technical Services CMS
                  </h2>
                  <p className="text-gray-400 text-xs font-mono mt-1">
                    ADD, EDIT, REORDER, AND HIDE SERVICE PORTFOLIO
                  </p>
                </div>
                {!editingService && !isAddingService && (
                  <button
                    onClick={() => setIsAddingService(true)}
                    className="bg-primary hover:bg-primary-dark text-secondary font-display font-black px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" /> Create Service Card
                  </button>
                )}
              </div>

              {isAddingService || editingService ? (
                <ServiceForm 
                  service={editingService || undefined}
                  onCancel={() => {
                    setEditingService(null);
                    setIsAddingService(false);
                  }}
                  onSave={(saved) => {
                    if (editingService) {
                      cms.updateService(editingService.id, saved);
                      showToast('Service successfully updated.');
                    } else {
                      cms.addService(saved);
                      showToast('New service card generated.');
                    }
                    setEditingService(null);
                    setIsAddingService(false);
                  }}
                />
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cms.services.map((ser) => (
                    <div key={ser.id} className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded">
                            {ser.iconName || 'Truck'}
                          </span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => setEditingService(ser)}
                              className="p-1.5 bg-slate-900 hover:bg-slate-850 rounded-lg text-primary border border-slate-850 transition-colors"
                              title="Edit service details"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm("Delete this service permanently?")) {
                                  cms.deleteService(ser.id);
                                  showToast('Service card deleted.');
                                }
                              }}
                              className="p-1.5 bg-slate-900 hover:bg-red-900/20 rounded-lg text-red-400 border border-slate-850 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <h3 className="font-display font-bold uppercase text-base text-white">
                          {ser.title}
                        </h3>
                        <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                          {ser.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-slate-900 space-y-1.5">
                          <span className="text-[10px] font-mono uppercase text-gray-500 block font-bold">
                            SPECS / DETAILS ({ser.details?.length || 0})
                          </span>
                          {ser.details?.slice(0, 2).map((det, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-400 font-mono">
                              <span className="text-primary">✓</span>
                              <span className="truncate">{det}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =======================================================
              5. ENQUIRIES CRM INBOX TAB
             ======================================================= */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-display font-bold uppercase tracking-tight">
                    Enquiries CRM Workspace
                  </h2>
                  <p className="text-gray-400 text-xs font-mono mt-1">
                    MANAGE AND RESPOND TO QUOTE INTERESTS SUBMITTED BY CLIENTS
                  </p>
                </div>
                <button
                  onClick={exportEnquiriesCSV}
                  className="bg-primary hover:bg-primary-dark text-secondary font-display font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 self-start"
                >
                  <FileSpreadsheet className="w-4 h-4 stroke-[2]" /> Export Database to CSV
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Enquiries List */}
                <div className="lg:col-span-2 bg-slate-950 border border-slate-900 rounded-3xl p-5 shadow-xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                    <div className="flex gap-1.5">
                      {(['all', 'pending', 'replied'] as const).map((filterOpt) => (
                        <button
                          key={filterOpt}
                          onClick={() => setEnqFilter(filterOpt)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${
                            enqFilter === filterOpt
                              ? 'bg-primary text-secondary'
                              : 'bg-slate-900 text-gray-400 hover:text-white'
                          }`}
                        >
                          {filterOpt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {cms.inquiries
                      .filter(i => enqFilter === 'all' || i.status === enqFilter)
                      .map((enq) => (
                        <div 
                          key={enq.id} 
                          onClick={() => {
                            setReplyingEnquiry(enq);
                            setReplyText(enq.replyMessage || '');
                          }}
                          className={`bg-slate-900/40 hover:bg-slate-900/80 border rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between ${
                            replyingEnquiry?.id === enq.id ? 'border-primary bg-slate-900' : 'border-slate-850'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono text-gray-500 uppercase">
                                ID: {enq.id} • {new Date(enq.date).toLocaleString()}
                              </span>
                              <h3 className="font-display font-bold text-base text-white">
                                {enq.fullName}
                              </h3>
                              <p className="font-mono text-xs text-primary">
                                {enq.company || 'Private Contractor'}
                              </p>
                            </div>
                            <span className={`text-[10px] font-mono uppercase font-black px-2.5 py-1 rounded-full ${
                              enq.status === 'pending'
                                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 animate-pulse'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}>
                              {enq.status}
                            </span>
                          </div>

                          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-850 mt-4">
                            <span className="text-[9px] font-mono uppercase text-gray-500 block font-bold">
                              PRODUCT INTERESTED:
                            </span>
                            <span className="text-xs font-bold text-white block mt-0.5">
                              {enq.productName}
                            </span>
                            <p className="text-xs text-gray-300 mt-2 leading-relaxed italic">
                              "{enq.message}"
                            </p>
                          </div>

                          <div className="flex gap-4 mt-4 pt-3 border-t border-slate-900 text-[11px] font-mono text-gray-400">
                            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-primary" /> {enq.email}</span>
                            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-primary" /> {enq.phone}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Respond / CRM Quick Reply Card */}
                <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-xl h-fit space-y-4">
                  <span className="text-[10px] font-mono tracking-widest text-primary uppercase block font-black border-b border-slate-900 pb-2">
                    CRM RESPONSE WORKSPACE
                  </span>

                  {replyingEnquiry ? (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-gray-500 block">REPLYING TO:</span>
                        <span className="text-sm font-bold font-display text-white">{replyingEnquiry.fullName}</span>
                        <span className="text-[11px] font-mono text-primary block">{replyingEnquiry.email}</span>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 mb-1">
                          DISPATCHED QUOTE / COMMENTS LOG
                        </label>
                        <textarea
                          rows={6}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Log quotation details, prices discussed, and delivery date schedule here for statutory tracking..."
                          className="w-full bg-slate-900 border border-slate-800 text-white placeholder-gray-600 rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono leading-relaxed"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            cms.updateInquiryStatus(replyingEnquiry.id, 'replied', replyText);
                            showToast('Enquiry successfully responded and logged.');
                            setReplyingEnquiry(null);
                          }}
                          className="flex-1 bg-primary hover:bg-primary-dark text-secondary font-display font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                        >
                          <Check className="w-4 h-4" /> Save Response
                        </button>

                        <button
                          onClick={() => {
                            if (confirm("Delete this quotation record completely?")) {
                              cms.deleteInquiry(replyingEnquiry.id);
                              showToast('Quotation record removed.');
                              setReplyingEnquiry(null);
                            }
                          }}
                          className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 p-3 rounded-xl transition-all"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 flex flex-col items-center justify-center gap-3 text-gray-500 font-mono text-xs">
                      <Mail className="w-10 h-10 text-gray-600 stroke-[1.5]" />
                      <span>Select a quotation card from the list to respond or log call details.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =======================================================
              6. HOME PAGE & SEO SETTINGS TAB
             ======================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-xl">
              <div>
                <h2 className="text-2xl font-display font-bold uppercase tracking-tight">
                  Global CMS Configurations
                </h2>
                <p className="text-gray-400 text-xs font-mono mt-1">
                  MANAGE SEO METADATA, HERO MEDIA CARDS, COMPANY COPYWRITING AND METRICS
                </p>
              </div>

              {/* Sub Settings Component */}
              <SettingsForm cms={cms} showToast={showToast} />
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

/* =======================================================
   PRODUCT FORM COMPONENT
   ======================================================= */
function ProductForm({ 
  product, 
  onCancel, 
  onSave,
  mediaFiles
}: { 
  product?: Product; 
  onCancel: () => void; 
  onSave: (product: any) => void;
  mediaFiles: MediaFile[];
}) {
  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState<any>(product?.category || 'rebar');
  const [tagline, setTagline] = useState(product?.tagline || '');
  const [description, setDescription] = useState(product?.description || '');
  const [longDescription, setLongDescription] = useState(product?.longDescription || '');
  const [price, setPrice] = useState(product?.price || '');
  const [warranty, setWarranty] = useState(product?.warranty || '1 Year Structural Warranty');
  const [availability, setAvailability] = useState(product?.availability || 'available');
  const [status, setStatus] = useState(product?.status || 'active');
  const [image, setImage] = useState(product?.image || '');
  const [videoUrl, setVideoUrl] = useState(product?.videoUrl || '');
  const [brochureUrl, setBrochureUrl] = useState(product?.brochureUrl || '');

  // Dynamic Specifications state (Row editing)
  const [specs, setSpecs] = useState<Record<string, string>>(product?.specs || {
    model: '',
    power: '',
    voltage: '415V (3-Phase)',
    weight: '',
    dimensions: ''
  });

  // Checklist arrays
  const [features, setFeatures] = useState<string[]>(product?.features || ['']);
  const [applications, setApplications] = useState<string[]>(product?.applications || ['']);
  const [advantages, setAdvantages] = useState<string[]>(product?.advantages || ['']);

  const [seoTitle, setSeoTitle] = useState(product?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(product?.seoDescription || '');

  const handleSpecChange = (key: string, val: string) => {
    setSpecs(prev => ({ ...prev, [key]: val }));
  };

  const addSpecRow = () => {
    const key = prompt("Enter specification field label (e.g. Blade Size, Capacity, Speed):");
    if (key) {
      const sanitized = key.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      setSpecs(prev => ({ ...prev, [sanitized]: '' }));
    }
  };

  const deleteSpecRow = (key: string) => {
    const next = { ...specs };
    delete next[key];
    setSpecs(next);
  };

  const handleArrayChange = (idx: number, val: string, setter: any, arr: string[]) => {
    const copy = [...arr];
    copy[idx] = val;
    setter(copy);
  };

  const addArrayRow = (setter: any, arr: string[]) => {
    setter([...arr, '']);
  };

  const deleteArrayRow = (idx: number, setter: any, arr: string[]) => {
    setter(arr.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(product ? { id: product.id } : {}),
      name,
      category,
      tagline,
      description,
      longDescription,
      price,
      warranty,
      availability,
      status,
      image: image || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
      videoUrl,
      brochureUrl,
      specs,
      features: features.filter(f => f.trim() !== ''),
      applications: applications.filter(a => a.trim() !== ''),
      advantages: advantages.filter(ad => ad.trim() !== ''),
      seoTitle: seoTitle || `${name} Technical Specifications`,
      seoDescription: seoDescription || description,
      isFeatured: product?.isFeatured || false,
      isHidden: product?.isHidden || false,
      images: product?.images || [image]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-xl space-y-8 max-w-4xl">
      
      {/* Title */}
      <div className="border-b border-slate-900 pb-4 flex justify-between items-center">
        <div>
          <h3 className="font-display font-bold uppercase text-lg text-white">
            {product ? 'Modify Heavy Machine Record' : 'Enroll New Industrial Asset'}
          </h3>
          <p className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">
            CONSTRUCT TECHNICAL SPECIFICATION MATRIX AND SEO CARDS
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-gray-400 hover:text-white font-mono uppercase tracking-wider"
        >
          Cancel
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
              Machine Title / Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Rebar Bending Machine Gw42J"
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                Category Segments
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary font-mono"
              >
                <option value="rebar">Rebar Machinery</option>
                <option value="concrete">Concrete Mixers</option>
                <option value="lifting">Material Hoists & Cranes</option>
                <option value="spares">Genuine Spares</option>
                <option value="others">Other Assets</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                Availability Status
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary font-mono"
              >
                <option value="available">In Stock (Moula-Ali)</option>
                <option value="low_stock">Low Stock (Dispatching)</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="on_request">On Quotation request</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                Powertrain Price (Optional)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., ₹2,50,000 or On Request"
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                Warranty Coverage
              </label>
              <input
                type="text"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                placeholder="e.g., 1 Year Warranty"
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
              Short Marketing Tagline
            </label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g., High-Precision Gearbox Driven Rebar Bending"
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
              Short Catalog Description
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide clean and short technical overview..."
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
              Detailed/Long Technical Spec Description
            </label>
            <textarea
              rows={4}
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              placeholder="Provide elaborate metallurgy details, structural build details, and drive systems..."
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono leading-relaxed"
            />
          </div>
        </div>

        {/* Media & Specs Table */}
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
              Main Machine Image (Select or Paste URL)
            </label>
            <input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono"
            />

            {/* Media picker helper */}
            <div className="flex gap-1.5 overflow-x-auto mt-2 py-1">
              {mediaFiles.slice(0, 5).map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setImage(m.url)}
                  className={`w-10 h-10 rounded border overflow-hidden shrink-0 transition-all ${image === m.url ? 'border-primary ring-1 ring-primary' : 'border-slate-800'}`}
                >
                  <img src={m.url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                Demo Video Link (Optional)
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="YouTube or CDN URL"
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                Download Brochure PDF
              </label>
              <input
                type="text"
                value={brochureUrl}
                onChange={(e) => setBrochureUrl(e.target.value)}
                placeholder="Brochure PDF Link"
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>

          {/* Dynamic Specifications Table Creator */}
          <div className="bg-slate-900/60 p-4 border border-slate-850 rounded-2xl space-y-3">
            <div className="flex justify-between items-center border-b border-slate-850 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                SPECIFICATIONS ROW ENGINE
              </span>
              <button
                type="button"
                onClick={addSpecRow}
                className="text-[9px] font-mono bg-primary text-secondary px-2 py-1 rounded font-bold uppercase"
              >
                + Add Custom Row
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {Object.keys(specs).map((key) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-400 uppercase w-24 truncate font-semibold" title={key}>
                    {key}
                  </span>
                  <input
                    type="text"
                    value={specs[key] || ''}
                    onChange={(e) => handleSpecChange(key, e.target.value)}
                    placeholder="Specification value"
                    className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-lg py-1 px-2.5 text-xs font-mono focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => deleteSpecRow(key)}
                    className="text-red-400 hover:text-red-300 font-mono text-xs px-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-slate-900">
        {/* Core Features */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">
              MACHINE FEATURES
            </span>
            <button
              type="button"
              onClick={() => addArrayRow(setFeatures, features)}
              className="text-[9px] font-mono text-primary uppercase font-bold"
            >
              + Add Line
            </button>
          </div>
          <div className="space-y-2">
            {features.map((feat, idx) => (
              <div key={idx} className="flex gap-1.5 items-center">
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => handleArrayChange(idx, e.target.value, setFeatures, features)}
                  placeholder="e.g., Heavy Duty Gearbox"
                  className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-lg py-1.5 px-2.5 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => deleteArrayRow(idx, setFeatures, features)}
                  className="text-red-400 font-mono text-xs px-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Applications */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">
              APPLICATIONS
            </span>
            <button
              type="button"
              onClick={() => addArrayRow(setApplications, applications)}
              className="text-[9px] font-mono text-primary uppercase font-bold"
            >
              + Add Line
            </button>
          </div>
          <div className="space-y-2">
            {applications.map((app, idx) => (
              <div key={idx} className="flex gap-1.5 items-center">
                <input
                  type="text"
                  value={app}
                  onChange={(e) => handleArrayChange(idx, e.target.value, setApplications, applications)}
                  placeholder="e.g., Prefabrication Yards"
                  className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-lg py-1.5 px-2.5 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => deleteArrayRow(idx, setApplications, applications)}
                  className="text-red-400 font-mono text-xs px-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">
              ADVANTAGES
            </span>
            <button
              type="button"
              onClick={() => addArrayRow(setAdvantages, advantages)}
              className="text-[9px] font-mono text-primary uppercase font-bold"
            >
              + Add Line
            </button>
          </div>
          <div className="space-y-2">
            {advantages.map((adv, idx) => (
              <div key={idx} className="flex gap-1.5 items-center">
                <input
                  type="text"
                  value={adv}
                  onChange={(e) => handleArrayChange(idx, e.target.value, setAdvantages, advantages)}
                  placeholder="e.g., Safe Limit Switches"
                  className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-lg py-1.5 px-2.5 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => deleteArrayRow(idx, setAdvantages, advantages)}
                  className="text-red-400 font-mono text-xs px-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEO metadata */}
      <div className="bg-slate-900/40 p-4 border border-slate-850 rounded-2xl space-y-4 pt-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold block border-b border-slate-850 pb-1">
          SEO META TAG CONSOLE
        </span>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-mono text-gray-400 mb-1">
              Meta Title (For Google SERPs)
            </label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="e.g., GW-42J Rebar Bender | Custom Industrial Spares"
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2 px-3 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-gray-400 mb-1">
              Meta Description
            </label>
            <input
              type="text"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="e.g., High-torque gearbox driven benders direct from assembly yard..."
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2 px-3 text-xs font-mono"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-slate-900">
        <button
          type="button"
          onClick={onCancel}
          className="bg-slate-900 hover:bg-slate-850 text-white font-mono uppercase tracking-widest text-[10px] py-3.5 px-6 rounded-xl border border-slate-850"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-secondary font-display font-black py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider shadow-lg"
        >
          Commit Asset Change
        </button>
      </div>

    </form>
  );
}

/* =======================================================
   SERVICES FORM COMPONENT
   ======================================================= */
function ServiceForm({
  service,
  onCancel,
  onSave
}: {
  service?: Service;
  onCancel: () => void;
  onSave: (service: any) => void;
}) {
  const [title, setTitle] = useState(service?.title || '');
  const [description, setDescription] = useState(service?.description || '');
  const [iconName, setIconName] = useState(service?.iconName || 'Truck');
  const [details, setDetails] = useState<string[]>(service?.details || ['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(service ? { id: service.id, order: service.order, isHidden: service.isHidden } : {}),
      title,
      description,
      iconName,
      details: details.filter(d => d.trim() !== '')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-xl space-y-6 max-w-2xl">
      <div className="border-b border-slate-900 pb-3">
        <h3 className="font-display font-bold uppercase text-lg text-white">
          {service ? 'Edit Technical Service Card' : 'Add Technical Service Card'}
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-mono text-gray-400 mb-1">SERVICE TITLE</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Hydraulic Cylinder Rehabilitation"
            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-gray-400 mb-1">SHORT DESCRIPTION</label>
          <textarea
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Fast re-chroming and sealing support for excavator booms..."
            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3.5 text-xs focus:outline-none focus:border-primary font-mono"
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono text-gray-400 mb-1 font-bold">LUCIDE ICON SELECTOR</label>
          <select
            value={iconName}
            onChange={(e) => setIconName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-primary font-mono"
          >
            <option value="Truck">Truck (Delivery / Logistics)</option>
            <option value="CalendarClock">CalendarClock (Rentals)</option>
            <option value="Settings2">Settings2 (Contracts / Auditing)</option>
            <option value="Hammer">Hammer (Rehab / Welding)</option>
            <option value="Layers">Layers (Spares / Gear rings)</option>
            <option value="ShieldCheck">ShieldCheck (Commissioning / Setup)</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-gray-400 font-bold">CAPABILITY BULLETS</span>
            <button
              type="button"
              onClick={() => setDetails([...details, ''])}
              className="text-[9px] font-mono text-primary font-bold uppercase"
            >
              + Add Bullet
            </button>
          </div>
          {details.map((det, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={det}
                onChange={(e) => {
                  const copy = [...details];
                  copy[idx] = e.target.value;
                  setDetails(copy);
                }}
                placeholder="Capability detail statement"
                className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-lg py-1.5 px-2.5 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setDetails(details.filter((_, i) => i !== idx))}
                className="text-red-400 text-xs px-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-slate-900">
        <button
          type="button"
          onClick={onCancel}
          className="bg-slate-900 hover:bg-slate-850 text-white font-mono uppercase tracking-widest text-[10px] py-3 px-5 rounded-xl border border-slate-850"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-secondary font-display font-black py-3 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg"
        >
          Save Service Card
        </button>
      </div>
    </form>
  );
}

/* =======================================================
   SETTINGS & GLOBAL CMS CONFIGURATIONS FORM
   ======================================================= */
function SettingsForm({ cms, showToast }: { cms: any; showToast: any }) {
  const [heroHeading, setHeroHeading] = useState(cms.siteSettings.heroHeading || '');
  const [heroSubtitle, setHeroSubtitle] = useState(cms.siteSettings.heroSubtitle || '');
  
  const [companyIntroTitle, setCompanyIntroTitle] = useState(cms.siteSettings.companyIntroTitle || '');
  const [companyIntroText, setCompanyIntroText] = useState(cms.siteSettings.companyIntroText || '');
  
  const [aboutTitle, setAboutTitle] = useState(cms.siteSettings.aboutTitle || '');
  const [aboutText, setAboutText] = useState(cms.siteSettings.aboutText || '');

  const [yearsExperience, setYearsExperience] = useState(cms.statistics.yearsExperience);
  const [happyClients, setHappyClients] = useState(cms.statistics.happyClients);
  const [machinesDelivered, setMachinesDelivered] = useState(cms.statistics.machinesDelivered);
  const [projectsCompleted, setProjectsCompleted] = useState(cms.statistics.projectsCompleted);

  const [seoTitle, setSeoTitle] = useState(cms.siteSettings.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(cms.siteSettings.seoDescription || '');
  const [seoKeywords, setSeoKeywords] = useState(cms.siteSettings.seoKeywords || '');
  const [ogTitle, setOgTitle] = useState(cms.siteSettings.ogTitle || '');
  const [ogDescription, setOgDescription] = useState(cms.siteSettings.ogDescription || '');
  const [canonicalUrl, setCanonicalUrl] = useState(cms.siteSettings.canonicalUrl || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save site configurations
    cms.updateSiteSettings({
      heroHeading,
      heroSubtitle,
      companyIntroTitle,
      companyIntroText,
      aboutTitle,
      aboutText,
      seoTitle,
      seoDescription,
      seoKeywords,
      ogTitle,
      ogDescription,
      canonicalUrl
    });

    // Save statistics metrics
    cms.updateStatistics({
      yearsExperience: Number(yearsExperience),
      happyClients: Number(happyClients),
      machinesDelivered: Number(machinesDelivered),
      projectsCompleted: Number(projectsCompleted)
    });

    showToast('Global home configuration committed and synced.');
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 text-xs font-mono text-gray-300">
      
      {/* Hero Media Content */}
      <div className="space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold block border-b border-slate-900 pb-1">
          HERO BANNER HEADLINES
        </span>
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] text-gray-400 mb-1">HERO DISPLAY HEADING (CAPS)</label>
            <textarea
              rows={2}
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono uppercase"
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 mb-1">HERO SUBTITLE / MOTTO</label>
            <textarea
              rows={3}
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono"
            />
          </div>
        </div>
      </div>

      {/* Corporate Copywriting sections */}
      <div className="space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold block border-b border-slate-900 pb-1">
          COMPANY INTRODUCTION & ABOUT SECTIONS
        </span>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">INTRO CARD TITLE</label>
              <input
                type="text"
                value={companyIntroTitle}
                onChange={(e) => setCompanyIntroTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">INTRO CARD BODY COPY</label>
              <textarea
                rows={4}
                value={companyIntroText}
                onChange={(e) => setCompanyIntroText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono leading-relaxed"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">ABOUT SECTION HEADLINE</label>
              <input
                type="text"
                value={aboutTitle}
                onChange={(e) => setAboutTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">ABOUT WORKSHOP BODY COPY</label>
              <textarea
                rows={4}
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Statistics Counters */}
      <div className="space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold block border-b border-slate-900 pb-1">
          PROJECT METRIC COUNTERS (ANIMATED)
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[10px] text-gray-400 mb-1">YEARS EXPERIENCE</label>
            <input
              type="number"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 mb-1">ON-SITE CLIENTS</label>
            <input
              type="number"
              value={happyClients}
              onChange={(e) => setHappyClients(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 mb-1">MACHINES DELIVERED</label>
            <input
              type="number"
              value={machinesDelivered}
              onChange={(e) => setMachinesDelivered(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono"
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 mb-1">PROJECTS COMPLETED</label>
            <input
              type="number"
              value={projectsCompleted}
              onChange={(e) => setProjectsCompleted(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono"
            />
          </div>
        </div>
      </div>

      {/* Enterprise SEO Management */}
      <div className="space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold block border-b border-slate-900 pb-1">
          ENTERPRISE SEO ENGINE
        </span>
        <div className="space-y-4 bg-slate-900/40 p-4 border border-slate-900 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">GLOBAL PAGE SEO TITLE *</label>
              <input
                type="text"
                required
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">CANONICAL HOMEPAGE URL</label>
              <input
                type="url"
                required
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 mb-1">META META KEYWORDS (COMMA SEPARATED)</label>
            <input
              type="text"
              required
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 mb-1">GLOBAL SEO SERP DESCRIPTION</label>
            <textarea
              rows={3}
              required
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono leading-relaxed"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-3 border-t border-slate-850">
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">OPEN GRAPH SOCIAL TITLE (OG:TITLE)</label>
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 mb-1">OPEN GRAPH DESCRIPTION (OG:DESCRIPTION)</label>
              <input
                type="text"
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-between items-center pt-6 border-t border-slate-900">
        <button
          type="button"
          onClick={() => {
            cms.generateSitemap();
            showToast(`XML sitemap successfully regenerated for ${canonicalUrl}/sitemap.xml`);
          }}
          className="bg-slate-900 hover:bg-slate-850 text-white font-mono uppercase tracking-widest text-[10px] py-4 px-5 rounded-xl border border-slate-850 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4 text-primary animate-spin" /> Force Sitemap Rebuild
        </button>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-secondary font-display font-black py-4 px-8 rounded-xl text-xs uppercase tracking-wider shadow-lg"
        >
          Commit Global Settings
        </button>
      </div>

    </form>
  );
}
