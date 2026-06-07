import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { RenderIcon } from './RenderIcon';

interface FooterProps {
  contact: any;
  handleOpenUnifiedModal: (defaultService: string, defaultMessage?: string) => void;
}

export function Footer({ contact, handleOpenUnifiedModal }: FooterProps) {
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  return (
    <footer id="footer" className="relative z-10 bg-white border-t border-black/[0.06] pt-10 pb-6 sm:pt-12 sm:pb-8">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-black/[0.06]">
          
          {/* Branding Column */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left font-sans col-span-1">
            <div className="flex items-center gap-1.5 mb-2 sm:mb-4 flex-wrap select-none">
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-black">
                Meditrip
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xs font-sans mb-3 sm:mb-6">
              Bangladesh's premium trusted Indian visa logistics partner. Direct medical inviter letters, business clearances and secure slots bookings.
            </p>

            {/* Socials */}
            <div className="flex gap-2.5 mt-1 sm:mt-2 flex-wrap">
              <a
                href={contact?.facebook || 'https://facebook.com/mymeditrip'}
                target="_blank"
                rel="noreferrer"
                title="Facebook"
                className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center border border-transparent shadow-sm transition-all duration-300 hover:scale-105"
              >
                <RenderIcon name="Facebook" size={14} />
              </a>
              <button
                type="button"
                onClick={() => handleOpenUnifiedModal("General Consultation & Support", "Hello Meditrip, I need support with my Indian visa application.")}
                title="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center border border-transparent shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer outline-none focus:outline-none"
              >
                <RenderIcon name="MessageCircle" size={14} />
              </button>
              <a
                href={`tel:${contact?.phone || '+8801332601510'}`}
                title="Call Us"
                className="w-9 h-9 rounded-full bg-[#059669] text-white flex items-center justify-center border border-transparent shadow-sm transition-all duration-300 hover:scale-105"
              >
                <RenderIcon name="Phone" size={14} />
              </a>
              <a
                href={`mailto:${contact?.email || 'bdmeditrip@gmail.com'}`}
                title="Email Us"
                className="w-9 h-9 rounded-full bg-[#EA4335] text-white flex items-center justify-center border border-transparent shadow-sm transition-all duration-300 hover:scale-105"
              >
                <RenderIcon name="Mail" size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left font-sans text-xs sm:text-sm col-span-1">
            <h4 className="font-display font-bold text-xs sm:text-sm uppercase tracking-widest text-[#80461B] mb-2 sm:mb-3">Quick Links</h4>
            <div className="flex flex-col gap-1.5 text-slate-600">
              <a href="#hero" className="hover:text-[#80461B] transition-colors leading-tight sm:leading-snug">Home Landing</a>
              <a href="#requirements" className="hover:text-[#80461B] transition-colors leading-tight sm:leading-snug">Guidelines Requirements</a>
              <a href="#check-documents" className="hover:text-[#80461B] transition-colors leading-tight sm:leading-snug">Document Packages</a>
              <a href="#faq" className="hover:text-[#80461B] transition-colors leading-tight sm:leading-snug">Questions Centre</a>
            </div>
          </div>

          {/* Office Contact Info Column */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left font-sans text-xs sm:text-sm col-span-1">
            <h4 className="font-display font-bold text-xs sm:text-sm uppercase tracking-widest text-[#80461B] mb-2 sm:mb-3">Office Address</h4>
            <div className="flex flex-col gap-2 text-slate-600 text-xs sm:text-sm">
              <div className="flex items-start gap-1.5 leading-snug">
                <RenderIcon name="MapPin" size={12} className="text-[#80461B] shrink-0 mt-0.5" />
                <span>{contact?.address || 'Shop-35/A, Zone-A, Level-3, Travel Zone, Jamuna Future Park, Dhaka-1229'}</span>
              </div>
              <div className="flex items-start gap-1.5 leading-snug">
                <RenderIcon name="Phone" size={12} className="text-[#80461B] shrink-0 mt-0.5" />
                <span>{contact?.phone || '+8801332601510'}</span>
              </div>
              <div className="flex items-start gap-1.5 leading-snug break-all">
                <RenderIcon name="Mail" size={12} className="text-[#80461B] shrink-0 mt-0.5" />
                <span>{contact?.email || 'bdmeditrip@gmail.com'}</span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription Column */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left font-sans col-span-1">
            <h4 className="font-display font-bold text-xs sm:text-sm uppercase tracking-widest text-[#80461B] mb-2 sm:mb-3">Newsletter</h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3">
              Subscribe to receive real-time Indian visa updates, policy alerts, and slot news.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get('email');
                if (email) {
                  setNewsletterSubscribed(true);
                }
              }}
              className="w-full flex flex-col gap-2"
            >
              {newsletterSubscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-emerald-500/5 border border-emerald-500/20 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1.5 font-sans leading-snug"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  Subscribed successfully!
                </motion.div>
              ) : (
                <>
                  <div className="relative w-full">
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="Your email address..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#80461B] focus:ring-1 focus:ring-[#80461B]/20 py-2.5 pl-3.5 pr-10 rounded-xl text-xs sm:text-sm font-sans text-slate-800 placeholder-slate-400 outline-none transition-all shadow-xs"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#80461B] transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 cursor-pointer outline-none border-none shadow-none"
                    >
                      <RenderIcon name="Send" size={12} className="text-[#80461B]" />
                    </button>
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-400 tracking-wide font-sans">
                    ✓ No spam. Revoke notification delivery anytime.
                  </span>
                </>
              )}
            </form>
          </div>

        </div>

        <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-sans text-sm sm:text-base">
          <p className="text-slate-500 text-center sm:text-left text-xs sm:text-sm">
            © 2026 Meditrip. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-1 text-slate-500 text-center sm:items-end">
            <span className="text-[11px] sm:text-xs">Built with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline-block align-middle" /> by</span> 
            <span className="text-slate-700 font-extrabold uppercase tracking-wider bg-slate-100 border border-black/[0.06] py-1 px-3 rounded-full leading-none shrink-0 text-[10px] sm:text-xs shadow-xs">
              MOHAMMAD NUR HASNAT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
