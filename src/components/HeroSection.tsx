import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageCircle, ShieldCheck, Clock, Star, CheckCircle, Building2, Users, FileCheck } from 'lucide-react';
import doctorHeroImg from '../assets/images/hero_photo.jpg';

interface HeroSectionProps {
  handleOpenUnifiedModal: (serviceType: string, defaultMessage: string) => void;
}

export function HeroSection({ handleOpenUnifiedModal }: HeroSectionProps) {
  const [bookButtonDirection, setBookButtonDirection] = useState<string>("translate-y-full");

  const randomizeBookButtonDirection = () => {
    const options = [
      "translate-y-full",
      "-translate-x-full",
      "-translate-y-full",
      "translate-x-full"
    ];
    const newDir = options[Math.floor(Math.random() * options.length)];
    setBookButtonDirection(newDir);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 lg:pt-28 lg:pb-20 z-10 overflow-hidden bg-white">

      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white to-white pointer-events-none" />

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column */}
          <div className="flex flex-col items-start">

            {/* Service pills */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mb-5"
            >
              Indian Visa Processing,{' '}
              <span className="text-emerald-600">Done Right.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            >
              Medical Visa, Business Visa, Slot Booking, Hospital Appointments — all in one place. We handle every document detail so you travel stress-free from Bangladesh.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto"
            >
          <div className="relative group w-full sm:w-auto">
            <motion.div 
              className="absolute -inset-0.5 rounded-[10px] blur-md bg-emerald-600"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <button
              type="button"
               onMouseEnter={randomizeBookButtonDirection}
              onClick={() => handleOpenUnifiedModal("General Visa Consultation", "Hello Meditrip, I would like to book a consultation for my visa application.")}
              className="relative overflow-hidden w-full inline-flex items-center justify-center bg-emerald-50 text-black border border-emerald-200/95 font-semibold text-sm px-6 py-3.5 rounded-[10px] transition-all duration-[600ms] hover:scale-[1.02] cursor-pointer outline-none shadow-md group"
            >
              <span className={`absolute inset-0 w-full h-full bg-[#059669] transition-transform duration-[600ms] transform ${bookButtonDirection} group-hover:translate-x-0 group-hover:translate-y-0 ease-out z-0`}></span>
              <span className="relative z-10 transition-colors duration-[600ms] group-hover:text-white flex items-center justify-center gap-2">
                <Calendar size={15} />
                Book Consultation
              </span>
            </button>

          </div>
          <div className="relative group w-full sm:w-auto mt-1 sm:mt-0">
            <motion.div 
              className="absolute -inset-0.5 rounded-[10px] blur-md bg-emerald-600"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <button
              type="button"
              onClick={() => handleOpenUnifiedModal("General Consultation & Support", "Hello Meditrip, I would like to inquire about Indian visa assistance.")}
              className="relative overflow-hidden w-full inline-flex items-center justify-center bg-white border border-slate-200 text-slate-700 font-semibold text-sm px-6 py-3.5 rounded-[10px] transition-all duration-[600ms] hover:scale-[1.02] cursor-pointer outline-none shadow-sm group"
            >
              <span className="absolute inset-0 w-full h-full bg-[#059669] transition-transform duration-[600ms] transform translate-y-full group-hover:translate-y-0 ease-out z-0"></span>
              <span className="relative z-10 transition-colors duration-[600ms] group-hover:text-white flex items-center justify-center gap-2">
                <MessageCircle size={15} />
                WhatsApp Now
              </span>
            </button>
          </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-2.5 pt-6 border-t border-slate-100"
            >

            {['Medical Visa', 'Business Visa', 'Entry Visa', 'Slot Booking', 'Hospital Appointment'].map((s) => (
                <span key={s} className="text-xs font-medium bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg whitespace-nowrap">
                  {s}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative block mt-10 lg:mt-0 w-full max-w-[340px] sm:max-w-sm mx-auto lg:max-w-[420px]"
          >
            <div className="relative bg-emerald-50/50 border border-emerald-100 rounded-3xl p-4 sm:p-5 lg:p-6">

              {/* Doctor image - adjusted height for both mobile & desktop */}
              <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[4/3] max-h-48 sm:max-h-52 lg:max-h-56">
                <img
                  src={doctorHeroImg}
                  alt="Meditrip Visa Coordinator"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent" />
              </div>

              {/* Service checklist with responsive padding & text sizes */}
              <div className="space-y-2">
                {[
                  'Medical, Business & Double Entry Visa processing',
                  'IVAC slot booking assistance',
                  'Hospital appointment letters',
                  'Complete document preparation',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-2.5 border border-emerald-50">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-700 font-sans">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA strip with responsive sizing */}
              <button
                type="button"
                onClick={() => handleOpenUnifiedModal("Free Document Check", "Hello Meditrip, I would like to get a free document check.")}
                className="mt-3.5 w-full flex items-center justify-between bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2.5 sm:py-3 transition-all duration-200 cursor-pointer outline-none text-xs sm:text-sm font-semibold active:scale-[0.98]"
              >
                <span>Free Document Check — start here</span>
                <span className="text-base sm:text-lg">→</span>
              </button>
            </div>

            {/* Floating badge — top right, scaled for mobile */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 bg-white border border-slate-100 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm flex items-center gap-2 scale-90 sm:scale-100"
            >
              <Building2 size={14} className="text-emerald-500 shrink-0" />
              <div className="text-left">
                <div className="text-[9px] text-slate-400 title case tracking-wide font-sans">Partner Hospitals</div>
                <div className="text-[11px] font-bold text-slate-800 font-sans">Apollo · Manipal · Caree Fertility · Narayana · Max · CMC & more</div>
              </div>
            </motion.div>

            {/* Floating badge — bottom left, scaled for mobile */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-4 bg-white border border-slate-100 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm flex items-center gap-2 scale-90 sm:scale-100"
            >
              <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
              <div className="text-left">
                <div className="text-[9px] text-slate-400 title case tracking-wide font-sans">Zero Hidden Charges</div>
                <div className="text-[11px] font-bold text-slate-800 font-sans">100% Transparent</div>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-16 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 justify-center sm:justify-start"
        >
          {[
            { icon: <ShieldCheck size={13} />, text: 'No hidden charges' },
            { icon: <Clock size={13} />, text: 'Fast 5-7 day processing' },
            { icon: <FileCheck size={13} />, text: 'Embassy-approved documents' },
            { icon: <Users size={13} />, text: 'Dedicated support' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="text-emerald-500">{icon}</span>
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
