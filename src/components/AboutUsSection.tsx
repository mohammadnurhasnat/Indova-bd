import React from 'react';

export function AboutUsSection() {
  return (
    <section id="about" className="py-12 lg:py-16 relative z-10 bg-slate-100/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          
          {/* About us narrative */}
          <div className="flex flex-col items-center text-center w-full">
            <span className="inline-flex items-center gap-1.5 bg-[#80461B]/5 border border-[#80461B]/20 px-4 py-1.5 rounded-full mb-3 text-xs font-display font-bold uppercase tracking-wider text-[#80461B]">
              About Us
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mb-1">
              We Build Trust
            </h2>
            <div className="w-16 h-1 bg-[#80461B] mt-1.5 mb-5 rounded-full" />
            
            <div className="text-slate-655 text-base leading-relaxed flex flex-col gap-4 font-sans max-w-2xl text-center mb-8">
              <p>
                At Meditrip, we simplify Indian medical visas, IVAC slot booking, and hospital appointments for travelers across Bangladesh. Instead of dealing with confusing forms on your own, you can sit with our warm, friendly team face-to-face at Jamuna Future Park, Dhaka. We review each of your files for errors, secure doctor letters, and take complete responsibility for your paperwork so you can travel with full peace of mind.
              </p>
            </div>

            {/* Our Goal & Focus Points/Quotes Grid added below the description */}
            <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Point 1 */}
              <div className="bg-white border border-black/[0.08] p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-[#FF1111] font-display font-black text-sm flex items-center justify-center shrink-0 border border-red-100 shadow-sm">
                  01
                </div>
                <div>
                  <h5 className="font-display font-black text-slate-900 text-xs mb-1.5 uppercase tracking-wide">
                    Real Eyes on Every Document
                  </h5>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans text-slate-500 font-medium">
                    Computers miss small details, but our hands-on team doesn't. We carefully check your passports, utility house bills, and profession certificates to handle tiny discrepancies before submitting them to the embassy.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-white border border-black/[0.08] p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#FFAE00] font-display font-black text-sm flex items-center justify-center shrink-0 border border-amber-100 shadow-sm">
                  02
                </div>
                <div>
                  <h5 className="font-display font-black text-slate-900 text-xs mb-1.5 uppercase tracking-wide">
                    Authorized Hospital Letters
                  </h5>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans text-slate-500 font-medium">
                    We communicate directly with coordinators in major networks like Apollo, Fortis, Max Healthcare, and Medanta in India to acquire real, valid Doctor Invitation Letters that make your medical visa application safe and solid.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="bg-white border border-black/[0.08] p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00D064] font-display font-black text-sm flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm">
                  03
                </div>
                <div>
                  <h5 className="font-display font-black text-slate-900 text-xs mb-1.5 uppercase tracking-wide">
                    Smooth Booking Assistance
                  </h5>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans text-slate-500 font-medium">
                    Obtaining appointment slots at the IVAC can be frustrating. Our desk is constantly reviewing live slot patterns to help prioritize your dates and bypass slot booking queues.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
