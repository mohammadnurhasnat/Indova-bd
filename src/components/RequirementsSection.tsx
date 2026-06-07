import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import { REQUIREMENTS_DATA } from '../data';
import { RenderIcon } from './RenderIcon';

interface RequirementsSectionProps {
  handleOpenUnifiedModal: (serviceType: string, defaultMessage: string) => void;
}

export function RequirementsSection({ handleOpenUnifiedModal }: RequirementsSectionProps) {
  const [activeReqTab, setActiveReqTab] = useState<string>('medical');

  const handleReqTabChange = (tabId: string) => {
    setActiveReqTab(tabId);
  };

  return (
    <section id="requirements" className="py-16 lg:py-24 relative z-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#80461B]/5 border border-[#80461B]/20 px-4 py-1.5 rounded-full mb-3 text-xs font-display font-bold uppercase tracking-wider text-[#80461B]">
            Embassy Checklists
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Detailed Visa Requirements
          </h2>
          <div className="w-16 h-1 bg-[#80461B] mx-auto my-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Please prepare the exact documents specified in your desired category below to ensure 100% submission success.
          </p>
        </div>

        {/* Premium Glassmorphic Tab Selector Capsules */}
        <div className="max-w-4xl mx-auto bg-slate-100/90 border border-black/[0.05] rounded-2xl p-1.5 backdrop-blur-xl shadow-inner mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {[
              { id: 'medical', label: 'Medical Visa' },
              { id: 'business', label: 'Business Visa' },
              { id: 'double', label: 'Double Entry' },
              { id: 'entry', label: 'Entry Visa' },
              { id: 'tourist', label: 'Tourist Visa' }
            ].map((tab) => {
              const getTabColorClass = (id: string) => {
                switch(id) {
                  case 'medical': return 'bg-red-50 text-red-900 border border-red-250/80 shadow-3xs';
                  case 'business': return 'bg-amber-50 text-amber-900 border border-amber-250/80 shadow-3xs';
                  case 'double': return 'bg-emerald-50 text-emerald-900 border border-emerald-250/80 shadow-3xs';
                  case 'entry': return 'bg-sky-50 text-sky-900 border border-sky-250/80 shadow-3xs';
                  default: return 'bg-rose-50 text-rose-900 border border-rose-250/80 shadow-3xs';
                }
              };
              return (
                <button
                  key={tab.id}
                  onClick={() => handleReqTabChange(tab.id)}
                  className={`px-3 py-3 rounded-xl transition-all duration-300 font-display font-bold text-xs sm:text-xs md:text-sm tracking-wide ${
                    tab.id === 'tourist' ? 'col-span-2 sm:col-span-1' : ''
                  } ${
                    activeReqTab === tab.id
                      ? `${getTabColorClass(tab.id)}`
                      : 'text-slate-600 hover:bg-white/65 hover:text-slate-900 bg-transparent border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Requirements Checklists view panels */}
        <div className="min-h-[300px]">
          {activeReqTab === 'tourist' ? (
            <div className="max-w-3xl mx-auto p-8 rounded-[24px] backdrop-blur-2xl bg-rose-50/50 border border-rose-300/30 shadow-md text-center">
              <div className="w-14 h-14 bg-rose-100 border border-rose-200 rounded-full flex items-center justify-center text-rose-600 mx-auto mb-5">
                <AlertTriangle size={28} />
              </div>
              <h3 className="font-display font-black text-xl text-rose-600 mb-3">Tourist Visa — Temporarily Suspended</h3>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
                The Indian Embassy has suspended tourist visa applications from Bangladesh. We will update you immediately on our WhatsApp channel and Facebook page as soon as the embassy reopens guidelines.
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 sm:gap-8 ${
              REQUIREMENTS_DATA[activeReqTab]?.length === 1 
                ? 'grid-cols-1 max-w-2xl mx-auto' 
                : REQUIREMENTS_DATA[activeReqTab]?.length === 2 
                ? 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto' 
                : 'grid-cols-1 lg:grid-cols-3'
            }`}>
              {REQUIREMENTS_DATA[activeReqTab]?.map((group, gIdx) => (
                <motion.div
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.3 }}
                  key={gIdx}
                  className="backdrop-blur-2xl bg-white/70 border border-black/[0.06] rounded-[24px] p-6 shadow-md relative overflow-hidden cursor-pointer hover:border-[#80461B]/30 hover:shadow-[0_20px_40px_rgba(128,70,27,0.08)] transition-all duration-150 transform-gpu"
                >
                  {/* Underlying premium glass accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#80461B]/40 via-sky-400/10 to-transparent" />

                  <h3 className="font-display font-black text-sm sm:text-base text-slate-900 mb-6 border-b border-black/[0.06] pb-3 flex items-center gap-2.5">
                    <span className="text-[#80461B]">
                      <RenderIcon name={group.iconName === 'User' ? 'User' : group.iconName === 'Users' ? 'Users' : group.iconName === 'RefreshCw' ? 'RefreshCw' : group.iconName === 'ShieldCheck' ? 'ShieldCheck' : 'Activity'} size={18} />
                    </span>
                    {group.title}
                  </h3>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 w-full">
                    {group.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-black mt-0.5 border border-emerald-500/20">
                          ✓
                        </span>
                        <div>
                          <span className="font-semibold text-slate-900">{item.text}</span>
                          {item.note && (
                            <span className="block text-sm sm:text-base text-amber-600 font-extrabold italic mt-0.5">
                              ({item.note})
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  {group.extraAlert && (
                    <div className="mt-6 p-4 rounded-xl bg-[#80461B]/5 border border-[#80461B]/20 text-xs sm:text-sm text-slate-800 font-sans font-bold flex items-center gap-2 shadow-sm">
                      <RenderIcon name="AlertTriangle" size={14} className="text-[#80461B]" /> {group.extraAlert}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
