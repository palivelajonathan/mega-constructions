/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, HardHat } from 'lucide-react';
import { InquiryFormData } from '../types';
import { useCMS } from '../context/CMSContext';

interface ContactProps {
  prefilledProductName: string;
  onClearPrefill: () => void;
}

export default function Contact({ prefilledProductName, onClearPrefill }: ContactProps) {
  const cms = useCMS();
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    productName: '',
    message: '',
    inquiryType: 'purchase'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const inquiryEndpoint = import.meta.env.VITE_INQUIRY_ENDPOINT?.trim();

  // Apply prefilled product name from the detail page quote triggers
  useEffect(() => {
    if (prefilledProductName) {
      setFormData((prev) => ({
        ...prev,
        productName: prefilledProductName,
        inquiryType: 'purchase'
      }));
    }
  }, [prefilledProductName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formData.fullName || !formData.phone) {
      setFormError('Please provide your name and phone number so our team can contact you.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (inquiryEndpoint) {
        const response = await fetch(inquiryEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Inquiry endpoint responded with ${response.status}`);
        }
      } else {
        // Development fallback. Configure VITE_INQUIRY_ENDPOINT before launch
        // so live enquiries are delivered to a server-side system.
        cms.addInquiry(formData);
      }

      setIsSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        productName: '',
        message: '',
        inquiryType: 'purchase'
      });
      onClearPrefill();
    } catch {
      setFormError('We could not send your request. Please call us directly or try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary uppercase bg-secondary/5 px-3 py-1 rounded-full">
            CONNECT SQUAD
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-secondary mt-3 tracking-tight uppercase">
            REQUEST MACHINERY PRICING & DEALS
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Coordinates details & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-secondary text-white p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-5 grate-pattern-dark" />
              
              <h3 className="font-display font-bold text-lg text-primary uppercase tracking-tight">
                MEGA CONSTRUCTIONS HEAD OFFICE
              </h3>

              <div className="space-y-4 text-sm font-mono text-gray-300">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-semibold text-gray-400">PHYSICAL ADDRESS</span>
                    <span className="block text-white mt-1 leading-normal">
                      #5-12-193, Mangapuram Colony,<br />
                      Moula-Ali, Hyderabad, Telangana - 500040
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-white/5 pt-4">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-semibold text-gray-400">DIRECT SALES LINE</span>
                    <a href="tel:+918790940354" className="block text-white font-bold hover:text-primary mt-1">
                      +91 8790940354
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-white/5 pt-4">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-semibold text-gray-400">EMAIL INBOX</span>
                    <a href="mailto:megaconcretspares@gmail.com" className="block text-white hover:text-primary mt-1">
                      megaconcretspares@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-white/5 pt-4">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-semibold text-gray-400">BUSINESS HOURS</span>
                    <span className="block text-white mt-1">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: Closed (Emergency dispatch available)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Responsive Google Map of Moula-Ali Hyderabad */}
            <div className="h-[280px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative">
              <iframe
                title="Mega Constructions Moula-Ali Hyderabad"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.241517409277!2d78.54419997592476!3d17.44812830104711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9bcf1ff6783d%3A0xc6b8bfd50c70d49f!2sMangapuram%20Colony%2C%20Moula%20Ali%2C%20Secunderabad%2C%20Telangana%20500040!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Interaction pricing form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xl relative">
              
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <HardHat className="w-5 h-5 text-primary animate-pulse" />
                <h3 className="font-display font-bold text-base sm:text-lg text-secondary uppercase tracking-tight">
                  SUBMIT SPECIFICATION QUOTE REQUEST
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-gray-500">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full bg-slate-50 border border-gray-200 text-secondary rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-gray-500">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-50 border border-gray-200 text-secondary rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-gray-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@company.com"
                      className="w-full bg-slate-50 border border-gray-200 text-secondary rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-gray-500">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Hyderabad Infra Projects"
                      className="w-full bg-slate-50 border border-gray-200 text-secondary rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Product prefill / select */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-gray-500">
                      Machinery Model / Spares Range
                    </label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      placeholder="e.g. GW-42J Bending Machine"
                      className="w-full bg-slate-50 border border-gray-200 text-secondary rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white font-mono"
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-gray-500">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value as any })}
                      className="w-full bg-slate-50 border border-gray-200 text-secondary rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                    >
                      <option value="purchase">Direct Purchase</option>
                      <option value="rental">Machinery Lease / Rental</option>
                      <option value="repair">Maintenance & Repairs</option>
                      <option value="spares">Genuine Spares Order</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold uppercase text-gray-500">
                    Project Requirements / Spares Specifications
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on project size, scheduled start date, or specific replacement parts needed..."
                    className="w-full bg-slate-50 border border-gray-200 text-secondary rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>

                {/* Submit button */}
                {formError && (
                  <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-secondary font-display font-extrabold py-4 rounded-xl shadow-[0_4px_16px_rgba(253,185,19,0.3)] hover:scale-[1.01] transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>PROCESSING DISPATCH TICKET...</span>
                  ) : (
                    <>
                      <span>Submit Quote Ticket</span> <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* SUCCESS POPUP MODAL */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-10"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 animate-bounce mb-4" />
                    <span className="text-[10px] font-mono tracking-[0.25em] text-primary uppercase block mb-1">
                      DISPATCH TICKET SUBMITTED
                    </span>
                    <h4 className="text-xl font-display font-bold text-secondary uppercase tracking-tight">
                      INQUIRY LOGGED SUCCESSFULLY
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm max-w-md mt-2 leading-relaxed">
                      {inquiryEndpoint
                        ? 'Your request has been delivered to our team. We will review the details and contact you shortly.'
                        : 'Your request was saved in this browser. Configure a live inquiry endpoint before publishing to deliver requests to your team.'}
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-6 bg-secondary hover:bg-slate-900 text-white font-display font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
                    >
                      Log another ticket
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
