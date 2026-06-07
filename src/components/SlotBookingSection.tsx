import React from 'react';
import { motion } from 'motion/react';
import { SLOT_SERVICES } from '../data';
import { RenderIcon } from './RenderIcon';

interface SlotBookingSectionProps {
  slotPrices: {
    medical_price: number;
    business_price: number;
    double_entry_price: number;
    entry_price: number;
    tourist_price: number;
  } | null;
  handleOpenUnifiedModal: (serviceType: string, defaultMessage: string) => void;
}

export function SlotBookingSection({ slotPrices, handleOpenUnifiedModal }: SlotBookingSectionProps) {
  return (
    <section id="slot-booking" className="py-16 lg:py-24 relative z-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 lg:mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#80461B]/5 border border-[#80461B]/20 px-4 py-1.5 rounded-full mb-3 text-xs font-display font-bold uppercase tracking-wider text-[#80461B]">
            IVAC Appointments
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            IVAC Visa Slot Booking
          </h2>
          <div className="w-16 h-1 bg-[#80461B] mx-auto my-4 rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            We help you secure embassy interview dates. Note: slot prices fluctuate continuously depending on IVAC server allocations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {SLOT_SERVICES.map((slot, idx) => (
            <motion.div
              whileHover={!slot.isClosed ? { y: -12, scale: 1.03 } : {}}
              transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.3 }}
              key={slot.id}
              className={`backdrop-blur-2xl rounded-[18px] p-4 sm:p-5 shadow-md flex flex-col border justify-between relative transition-all duration-200 cursor-pointer ${
                slot.isClosed
                  ? 'bg-slate-100/50 border-black/[0.05] opacity-60'
                  : 'bg-white/80 border-black/[0.06] hover:border-[#80461B]/40 hover:shadow-[0_22px_44px_rgba(128,70,27,0.12),0_0_24px_rgba(128,70,27,0.06)]'
              }`}
            >
              <div>
                <h3 className="font-display font-black text-sm sm:text-base lg:text-lg text-slate-900 mb-2.5 tracking-wide leading-snug">
                  {slot.title}
                </h3>
              </div>

              <div>
                {slot.isClosed ? (
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 border border-rose-500/20">
                      Suspended
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col mb-3">
                    {slot.deliveryTime ? (
                      <span className={`font-display font-bold text-[10px] sm:text-xs uppercase tracking-wider px-2.5 py-1.5 rounded-lg text-center leading-normal border ${
                        idx % 3 === 0
                          ? 'bg-red-50 text-red-700 border-red-200/50'
                          : idx % 3 === 1
                          ? 'bg-amber-50 text-amber-700 border-amber-200/50'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200/50'
                      }`}>
                        {slot.deliveryTime}
                      </span>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="font-display font-black text-lg sm:text-xl text-slate-900">
                          ৳{slot.approxPrice?.toLocaleString()}
                        </span>
                        <span className="text-[10px] sm:text-xs text-slate-500 font-medium font-sans">approx.</span>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-3.5 italic border-l border-black/10 pl-2">
                  {slot.notes}
                </p>
                {slotPrices && !slot.isClosed && (
                  <p className="text-sm font-bold text-slate-800 mt-1">
                    ৳{(slot.id === 'slot-med' ? slotPrices.medical_price : slot.id === 'slot-bus' ? slotPrices.business_price : slot.id === 'slot-double' ? slotPrices.double_entry_price : slot.id === 'slot-tourist' ? slotPrices.tourist_price : slotPrices.entry_price).toLocaleString()}
                  </p>
                )}
                {!slot.isClosed && (
                  <button
                    onClick={() => handleOpenUnifiedModal("IVAC Slot Booking Support", `Hello Meditrip, I need assistance with securing an ${slot.title}.`)}
                    className={`w-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase py-2 rounded-[12px] transition-all duration-300 hover:scale-[1.03] shadow-3xs cursor-pointer border ${
                      idx % 3 === 0
                        ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-900'
                        : idx % 3 === 1
                        ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 hover:text-amber-950'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-950'
                    }`}
                  >
                    Book Slot
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
