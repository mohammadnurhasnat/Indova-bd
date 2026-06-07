import React from 'react';
import { motion } from 'motion/react';
import { VISA_SERVICES } from '../data';
import { RenderIcon } from './RenderIcon';

interface ServicesSectionProps {
  dataLoading: boolean;
}

export function ServicesSection({ dataLoading }: ServicesSectionProps) {
  return (
    <section id="processing" className="py-16 lg:py-24 relative z-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section tag */}
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#80461B]/5 border border-[#80461B]/20 px-4 py-1.5 rounded-full mb-3 text-xs font-display font-bold uppercase tracking-wider text-[#80461B]">
            <RenderIcon name="BookOpen" size={14} className="text-[#80461B]" /> Services Suite
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Indian Visa Processing Services
          </h2>
          <div className="w-16 h-1 bg-[#80461B] mx-auto my-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-sans mb-4">
            Expert documentation matching, embassy requirements check, and fast-tracked visa services from Bangladesh.
          </p>
        </div>

        {/* Service grid panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {dataLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={`srv-skeleton-${idx}`}
                className="group backdrop-blur-2xl transition-all duration-300 rounded-[18px] sm:rounded-[24px] border border-black/[0.05] flex flex-col py-5 px-5 sm:p-6 lg:p-8 relative bg-white/70 shadow-sm animate-pulse"
              >
                {/* Service icon skeleton */}
                <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-slate-200/70 mb-4 sm:mb-6 shrink-0" />
                
                {/* Title skeleton */}
                <div className="h-5 sm:h-6 bg-slate-200/70 rounded w-2/3 mb-2 sm:mb-3" />
                
                {/* Description lines skeleton */}
                <div className="space-y-1.5 sm:space-y-2 mb-3.5 sm:mb-5">
                  <div className="h-3 sm:h-3.5 bg-slate-200/50 rounded w-full" />
                  <div className="h-3 sm:h-3.5 bg-slate-200/50 rounded w-5/6" />
                </div>

                {/* Checklist items skeleton */}
                <div className="space-y-2 mb-4 flex-grow">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200/60 shrink-0" />
                    <div className="h-3 bg-slate-200/50 rounded w-1/2" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200/60 shrink-0" />
                    <div className="h-3 bg-slate-200/50 rounded w-2/3" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200/60 shrink-0" />
                    <div className="h-3 bg-slate-200/50 rounded w-5/12" />
                  </div>
                </div>

                {/* Badge placeholder */}
                <div className="h-6 bg-slate-200/60 rounded-full w-24 mt-auto" />
              </div>
            ))
          ) : (
            VISA_SERVICES.map((srv) => {
              const isExtra = srv.id === 'additional';
              return (
                <motion.div
                  whileHover={!srv.isClosed ? { y: -10, scale: 1.025 } : {}}
                  transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.3 }}
                  key={srv.id}
                  className={`group backdrop-blur-2xl transition-all duration-200 rounded-[22px] sm:rounded-[28px] border flex flex-col py-3.5 px-3.5 sm:p-7 lg:p-9 relative ${
                    srv.isClosed
                      ? 'bg-slate-100/50 border-black/[0.05] opacity-70 shadow-sm'
                      : isExtra
                      ? 'bg-gradient-to-br from-[#80461B]/15 to-white/95 border-[#80461B]/50 shadow-[0_15px_35px_rgba(128,70,27,0.12)] ring-1 ring-[#80461B]/30 hover:border-[#80461B]/80 hover:shadow-[0_25px_50px_rgba(128,70,27,0.22),0_0_30px_rgba(128,70,27,0.1)]'
                      : 'bg-white/80 border-black/[0.06] shadow-sm hover:border-[#80461B]/40 hover:shadow-[0_20px_45px_rgba(128,70,27,0.14),0_0_24px_rgba(128,70,27,0.06)]'
                  }`}
                >
                  {/* Highlight Ribbon for Additional Services */}
                  {isExtra && (
                    <div className="absolute -top-3 left-4 sm:left-6 z-10">
                      <span className="bg-[#80461B] text-white font-display font-bold text-[10px] sm:text-xs uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                        <RenderIcon name="Star" size={12} className="text-white fill-white" /> Popular Add-ons
                      </span>
                    </div>
                  )}

                  {/* Glow effect on hover */}
                  {!srv.isClosed && !isExtra && (
                    <div className="absolute inset-0 bg-[#80461B]/[0.01] group-hover:bg-[#80461B]/[0.03] rounded-[18px] sm:rounded-[24px] pointer-events-none transition-all duration-300" />
                  )}
                  {isExtra && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#80461B]/[0.05] to-transparent rounded-[18px] sm:rounded-[24px] pointer-events-none" />
                  )}

                  {/* Service dynamic icon */}
                  <div className={`w-9 h-9 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl flex items-center justify-center mb-1.5 sm:mb-6 border ${srv.colorClass} bg-white shadow-sm shrink-0 relative z-10`}>
                    <RenderIcon name={srv.icon} className="w-[18px] h-[18px] sm:w-[26px] sm:h-[26px]" />
                  </div>

                  <h3 className="font-display font-black text-sm sm:text-xl text-slate-900 mb-1 sm:mb-3 flex items-center gap-1.5 group-hover:text-[#80461B] transition-colors leading-tight relative z-10">
                    {srv.title}
                  </h3>
                  
                  {/* Paragraph description */}
                  <p className={`text-xs sm:text-sm md:text-base leading-relaxed mb-2 sm:mb-4 font-sans relative z-10 ${isExtra ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                    {srv.description}
                  </p>

                  {/* Bullet Points description - clean checklist layout */}
                  {srv.points && (
                    <ul className="space-y-1 sm:space-y-1.5 mb-1.5 sm:mb-6 flex-grow font-sans text-left w-full relative z-10">
                      {srv.points.map((pt, idx) => (
                        <li key={idx} className={`flex items-start gap-1 sm:gap-1.5 text-xs sm:text-sm md:text-base leading-relaxed ${isExtra ? 'text-slate-800 font-semibold' : 'text-slate-600'}`}>
                          <span className="text-[#80461B] font-bold shrink-0">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Conditional Badge */}
                  {srv.badgeText && (
                    <div className="self-start mt-auto pt-1 relative z-10">
                      {srv.isClosed ? (
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20">
                          <RenderIcon name="Clock" size={10} className="w-2.5 h-2.5 shrink-0" /> Closed
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-3 py-1 rounded-full ${isExtra ? 'bg-[#80461B] text-white shadow-sm' : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full status-indicator-dot shrink-0 ${isExtra ? 'bg-white' : 'bg-emerald-500'}`} /> {srv.badgeText}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
