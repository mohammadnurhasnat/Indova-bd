import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../data';
import { RenderIcon } from './RenderIcon';

export function FaqSection() {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const handleFaqToggle = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#80461B]/5 border border-[#80461B]/20 px-4 py-1.5 rounded-full mb-3 text-xs font-display font-bold uppercase tracking-wider text-[#80461B]">
            Assistance Centre
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-[#80461B] mx-auto my-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-sans">
            Clear answers regarding timeframes, mandatory documentation, and slot allocation rules.
          </p>
        </div>

        <div className="flex flex-col gap-3 font-sans">
          {FAQ_ITEMS.map((faq, index) => (
            <div
              key={index}
              className="backdrop-blur-2xl bg-white/70 border border-black/[0.05] rounded-[18px] overflow-hidden transition-colors shadow-sm"
            >
              {/* Question Trigger tab */}
              <button
                onClick={() => handleFaqToggle(index)}
                className="w-full text-left px-5 sm:px-6 py-5 flex items-center justify-between gap-4 text-sm sm:text-lg font-bold text-slate-800 hover:bg-[#80461B]/5 transition-all text-slate-900"
              >
                <span>{faq.question}</span>
                <span className={`text-slate-500 shrink-0 transition-transform duration-300 ${expandedFaqIndex === index ? 'rotate-180 text-[#80461B]' : ''}`}>
                  <RenderIcon name="ChevronDown" size={16} />
                </span>
              </button>

              {/* Animated expand panel for heights dynamically */}
              <AnimatePresence initial={false}>
                {expandedFaqIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden bg-white/30"
                  >
                    <p className="px-5 sm:px-6 pb-5 text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-medium border-t border-black/[0.05] pt-4 text-left">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
