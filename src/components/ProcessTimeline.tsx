import React from 'react';
import { TIMELINE_STEPS } from '../data';
import { RenderIcon } from './RenderIcon';

export function ProcessTimeline() {
  return (
    <section id="process-timeline" className="py-16 lg:py-24 relative z-10 bg-slate-50/70 border-y border-black/[0.05]">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#80461B]/5 border border-[#80461B]/20 px-4 py-1.5 rounded-full mb-3 text-xs font-display font-bold uppercase tracking-wider text-[#80461B]">
            How it works
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Our Simple 6-Step Process
          </h2>
          <div className="w-16 h-1 bg-[#80461B] mx-auto my-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            From first contact to final visa-passport delivery, we handhold you through a verified, clean process.
          </p>
        </div>

        {/* Timeline Process grid elements */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-6 relative">

          {TIMELINE_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="group flex flex-col items-center text-center relative z-10 p-3 sm:p-4 pt-6 sm:pt-7 pb-4.5 rounded-2xl bg-white border border-black/[0.04] hover:border-[#80461B]/25 transition-all duration-150 ease-out hover:scale-[1.03] hover:-translate-y-0.5 shadow-3xs hover:shadow-[0_12px_24px_rgba(128,70,27,0.05),0_0_20px_rgba(128,70,27,0.12)] h-full overflow-hidden cursor-pointer select-none"
            >
              {/* Ambient backdrop glow layer */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#80461B]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none" />

              {/* Step mono-space flag at top-left/top-right */}
              <div className="absolute top-2 left-2.5 font-mono text-[9px] font-black text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded group-hover:bg-[#80461B]/10 group-hover:text-[#80461B] group-hover:border-[#80461B]/10 transition-all duration-150">
                STEP 0{step.stepNumber}
              </div>

              {/* Single Beautiful unified Icon Container */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-black/[0.03] text-[#80461B] flex items-center justify-center mt-1.5 sm:mt-2 mb-2 shrink-0 group-hover:bg-[#80461B]/70 group-hover:text-white group-hover:border-[#80461B]/20 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-3xs">
                <RenderIcon name={step.icon} size={15} className="sm:hidden transition-transform group-hover:scale-110" />
                <RenderIcon name={step.icon} size={18} className="hidden sm:block transition-transform group-hover:scale-110" />
              </div>

              <h3 className="font-display font-black text-xs sm:text-sm text-slate-900 mb-0.5 tracking-tight leading-tight group-hover:text-[#80461B] transition-colors relative z-10">
                {step.label}
              </h3>
              <p className="text-slate-500 text-[10.5px] sm:text-xs leading-tight font-sans relative z-10">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
