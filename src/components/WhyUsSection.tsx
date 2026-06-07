import React from 'react';
import { motion } from 'motion/react';

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-16 lg:py-24 relative z-10 font-sans">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#80461B]/5 border border-[#80461B]/20 px-4 py-1.5 rounded-full mb-3 text-xs font-display font-bold uppercase tracking-wider text-[#80461B]">
            Transparency Guarantee
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Why Thousands Trust Meditrip
          </h2>
          <div className="w-16 h-1 bg-[#80461B] mx-auto my-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            We stand apart through our integrity. We communicate clear costs upfront with absolute transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            whileHover={{ y: -10, scale: 1.025 }}
            transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.3 }}
            className="backdrop-blur-2xl bg-white/80 border border-black/[0.06] rounded-[28px] p-6 sm:p-8 hover:border-[#80461B]/35 hover:shadow-[0_24px_48px_rgba(128,70,27,0.08)] transition-all duration-200 cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-505/10 bg-sky-500/10 border border-sky-500/20 text-[#80461B] flex items-center justify-center mb-6">
              <span className="text-slate-500 font-display font-extrabold text-lg">01</span>
            </div>
            <h3 className="font-display font-black text-md text-slate-900 mb-3">100% Transparent Fee Structure</h3>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
              Zero hidden charges, zero surprises. We discuss and list every IVAC service charge, invoice, and process fee before document compilation starts.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10, scale: 1.025 }}
            transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.3 }}
            className="backdrop-blur-2xl bg-white/80 border border-black/[0.06] rounded-[28px] p-6 sm:p-8 hover:border-[#80461B]/35 hover:shadow-[0_24px_48px_rgba(128,70,27,0.08)] transition-all duration-200 cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-505/10 bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-6">
              <span className="text-slate-500 font-display font-extrabold text-lg">02</span>
            </div>
            <h3 className="font-display font-black text-md text-slate-900 mb-3">Fast 7-10 Days Processing</h3>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
              Our operations team tracks and submissions directly. Most medical and business visa guidelines are completed internally within 7 to 10 working days.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10, scale: 1.025 }}
            transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.3 }}
            className="backdrop-blur-2xl bg-white/80 border border-black/[0.06] rounded-[28px] p-6 sm:p-8 hover:border-[#80461B]/35 hover:shadow-[0_24px_48px_rgba(128,70,27,0.08)] transition-all duration-200 cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1ebd5d]/10 border border-[#1ebd5d]/20 text-[#1ebd5d] flex items-center justify-center mb-6">
              <span className="text-slate-500 font-display font-extrabold text-lg">03</span>
            </div>
            <h3 className="font-display font-black text-md text-slate-900 mb-3">Expert Credentials Review</h3>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
              Each profile is thoroughly vetted. We identify missing references, bank statement errors, or mismatch issues to ensure no rejection delays.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
