import React from 'react';
import { motion } from 'motion/react';
import { CHECK_PACKAGES } from '../data';
import { RenderIcon } from './RenderIcon';

interface PricingSectionProps {
  selectedPackage: string | null;
  setSelectedPackage: (pkg: string | null) => void;
  checkPrices: {
    basic_price: number;
    standard_price: number;
    premium_price: number;
  };
  handleOpenUnifiedModal: (serviceType: string, defaultMessage: string) => void;
}

export function PricingSection({
  selectedPackage,
  setSelectedPackage,
  checkPrices,
  handleOpenUnifiedModal
}: PricingSectionProps) {
  return (
    <section id="check-documents" className="py-16 lg:py-24 relative z-10 bg-slate-50/70 border-y border-black/[0.05]">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#80461B]/5 border border-[#80461B]/20 px-4 py-1.5 rounded-full mb-3 text-xs font-display font-bold uppercase tracking-wider text-[#80461B]">
            Check Packages
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Document Checking Services
          </h2>
          <div className="w-16 h-1 bg-[#80461B] mx-auto my-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Choose the level of service charge package required for verifying and composing your embassy forms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {CHECK_PACKAGES.map((pkg, idx) => (
            <motion.div
              whileHover={{ y: -12, scale: 1.025 }}
              transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.3 }}
              key={pkg.title}
              className={`backdrop-blur-2xl rounded-2xl p-4 sm:p-6 lg:p-7 shadow-sm flex flex-col relative border transition-all duration-200 cursor-pointer ${
                selectedPackage === pkg.title
                  ? idx === 0 
                    ? 'bg-white border-red-500 shadow-[0_25px_50px_rgba(239,68,68,0.15)]' 
                    : idx === 1 
                    ? 'bg-white border-amber-500 shadow-[0_25px_50px_rgba(245,158,11,0.15)]' 
                    : 'bg-white border-emerald-500 shadow-[0_25px_50px_rgba(16,185,129,0.15)]'
                  : pkg.isPopular
                  ? idx === 0 
                    ? 'bg-white border-red-350 shadow-[0_15px_30px_rgba(239,68,68,0.06)] hover:shadow-[0_25px_50px_rgba(239,68,68,0.18)] hover:border-red-500' 
                    : idx === 1 
                    ? 'bg-white border-amber-350 shadow-[0_15px_30px_rgba(245,158,11,0.06)] hover:shadow-[0_25px_50px_rgba(245,158,11,0.18)] hover:border-amber-500' 
                    : 'bg-white border-emerald-350 shadow-[0_15px_30px_rgba(16,185,129,0.06)] hover:shadow-[0_25px_50px_rgba(16,185,129,0.18)] hover:border-emerald-500'
                  : idx === 0
                  ? 'bg-white/85 border-black/[0.06] hover:border-red-400 hover:shadow-[0_25px_50px_rgba(239,68,68,0.12)]'
                  : idx === 1
                  ? 'bg-white/85 border-black/[0.06] hover:border-amber-400 hover:shadow-[0_25px_50px_rgba(245,158,11,0.12)]'
                  : 'bg-white/85 border-black/[0.06] hover:border-emerald-400 hover:shadow-[0_25px_50px_rgba(16,185,129,0.12)]'
              }`}
            >
              {/* Popular Ribbon Tag */}
              {pkg.isPopular && (
                <div className="absolute top-3 right-3">
                  <span className={`font-display font-bold text-[9px] sm:text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full leading-none shadow-xs text-white ${
                    idx === 0 ? 'bg-red-505 bg-red-550 bg-red-500' : idx === 1 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}>
                    Most Popular
                  </span>
                </div>
              )}

              {/* Package Service Badging */}
              <div className="mb-1.5 sm:mb-4 self-start">
                <span className={`text-[10px] sm:text-xs font-display font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  pkg.badgeStyle === 'free'
                    ? 'bg-emerald-505/10 text-emerald-600 border border-emerald-500/20'
                    : idx === 0
                    ? 'bg-red-50 text-red-700 border border-red-200/50'
                    : idx === 1
                    ? 'bg-amber-50 text-amber-700 border border-amber-200/50'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                }`}>
                  {pkg.badgeText}
                </span>
              </div>

              {/* Pricing Numeric */}
              <div className="flex items-baseline gap-1 mb-1 sm:mb-2">
                <span className="font-display font-black text-xl sm:text-3.5xl text-slate-900 tracking-tight">
                  ৳{(idx === 0 ? checkPrices.basic_price : idx === 1 ? checkPrices.standard_price : checkPrices.premium_price).toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm text-slate-500 font-sans">{pkg.periodText}</span>
              </div>

              <h3 className="font-display font-black text-sm sm:text-lg text-slate-900 mb-1 sm:mb-2 tracking-wide uppercase">{pkg.title}</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-5 font-sans">{pkg.description}</p>

              {/* Features checklist */}
              <ul className="flex flex-col gap-1.5 sm:gap-3 mb-3.5 sm:mb-6 flex-grow">
                {pkg.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-1.5 text-xs sm:text-sm md:text-base text-slate-600 font-sans">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 shrink-0 flex items-center justify-center text-[10px] mt-0.5">
                      ✓
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Styled Buttons based on colors requested by the user */}
              {selectedPackage === pkg.title ? (
                <button
                  onClick={() => {
                    setSelectedPackage(pkg.title);
                    handleOpenUnifiedModal("Document Verification", `Hello Meditrip, I would like to book the "${pkg.title}" service package for document verification.`);
                  }}
                  className={`w-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase py-2.5 sm:py-3.5 rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-2xs mt-auto cursor-pointer ${
                    idx === 0
                      ? 'bg-red-50 text-red-955 border border-red-200 hover:bg-red-100'
                      : idx === 1
                      ? 'bg-amber-50 text-amber-955 border border-amber-200 hover:bg-amber-100'
                      : 'bg-emerald-50 text-emerald-955 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {pkg.ctaLabel}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedPackage(pkg.title);
                    handleOpenUnifiedModal("Document Verification", `Hello Meditrip, I would like to book the "${pkg.title}" service package for document verification.`);
                  }}
                  className={`w-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase py-2.5 sm:py-3.5 rounded-lg transition-all duration-300 hover:scale-[1.02] mt-auto cursor-pointer border ${
                    idx === 0
                      ? 'border-red-200 bg-transparent text-red-700 hover:bg-red-50 hover:text-red-900 hover:border-red-300'
                      : idx === 1
                      ? 'border-amber-200 bg-transparent text-amber-800 hover:bg-amber-50 hover:text-amber-955 hover:border-amber-300'
                      : 'border-emerald-200 bg-transparent text-emerald-700 hover:bg-emerald-50 hover:text-emerald-955 hover:border-emerald-300'
                  }`}
                >
                  {pkg.ctaLabel}
                </button>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
