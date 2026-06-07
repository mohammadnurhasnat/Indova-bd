import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Phone, Calendar } from 'lucide-react';

interface HospitalDetailModalProps {
  selectedHospitalInfo: any;
  setSelectedHospitalInfo: (info: any) => void;
  handleOpenUnifiedModal: (service: string, message: string) => void;
}

export function HospitalDetailModal({
  selectedHospitalInfo,
  setSelectedHospitalInfo,
  handleOpenUnifiedModal
}: HospitalDetailModalProps) {
  if (!selectedHospitalInfo) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 select-text">
        {/* Backdrop with blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedHospitalInfo(null)}
          className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Hospital Info Modal Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="bg-white border border-slate-200 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.22)] w-full max-w-lg relative z-10 flex flex-col font-sans text-slate-800 overflow-hidden"
        >
          {/* Top Banner Header */}
          <div className="bg-[#80461B]/5 border-b border-black/[0.04] p-5 sm:p-6 flex items-start gap-4 select-none pr-12 relative">
            <div className="w-14 h-14 bg-white rounded-2xl border border-black/[0.04] p-1.5 flex items-center justify-center shrink-0 shadow-3xs">
              {selectedHospitalInfo.logo}
            </div>
            <div className="text-left font-sans">
              <h3 className="font-display font-black text-slate-900 text-lg leading-tight">
                {selectedHospitalInfo.name}
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                {selectedHospitalInfo.desc}
              </p>
            </div>

            {/* Close Button absolute top-right */}
            <button
              type="button"
              onClick={() => setSelectedHospitalInfo(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer border-none outline-none"
              aria-label="Close details"
            >
              <X size={16} />
            </button>
          </div>

          {/* Modal Core Coordinates & Specialties */}
          <div className="p-5 sm:p-6 text-left flex-1 overflow-y-auto max-h-[350px] space-y-5">
            {/* Micro Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-black/[0.02]">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#80461B]">Preferred Cities</span>
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <MapPin size={12} className="text-[#80461B]/80 shrink-0" />
                  {selectedHospitalInfo.city}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#80461B]">Global Helpline</span>
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <Phone size={12} className="text-[#80461B]/80 shrink-0" />
                  {selectedHospitalInfo.phone}
                </p>
              </div>
              <div className="col-span-1 sm:col-span-2 border-t border-slate-200/50 pt-2 space-y-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#80461B]">Official Address</span>
                <p className="text-slate-700 leading-normal">
                  {selectedHospitalInfo.address}
                </p>
              </div>
            </div>

            {/* Scope Specialties Segment */}
            <div>
              <h4 className="text-xs font-black uppercase text-[#80461B] tracking-widest mb-2 px-1">
                Top Specialty Departments
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {selectedHospitalInfo.departments.map((dept: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium font-sans">
                    <span className="w-5 h-5 rounded-md bg-[#80461B]/5 border border-[#80461B]/10 flex items-center justify-center text-[#80461B] font-bold text-[10px] shrink-0 mt-0.5 select-none">
                      {i + 1}
                    </span>
                    <span className="mt-0.5 leading-relaxed">{dept}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer CTA and actions wrapper */}
          <div className="bg-slate-50 border-t border-black/[0.04] p-4 flex gap-3 select-none">
            <button
              type="button"
              onClick={() => setSelectedHospitalInfo(null)}
              className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl transition-all cursor-pointer"
            >
              Close Details
            </button>
            <button
              type="button"
              onClick={() => {
                const hospName = selectedHospitalInfo.name;
                setSelectedHospitalInfo(null);
                handleOpenUnifiedModal(
                  "Hospital Doctor Appointment",
                  `Hello Meditrip, I would like to book a doctor appointment at ${hospName}. Please help me secure this appointment.`
                );
              }}
              className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#80461B] hover:bg-[#80461B]/95 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Calendar size={13} className="stroke-[2.5]" />
              Book Appointment
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
