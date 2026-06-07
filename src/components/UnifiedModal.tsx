import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, Check } from 'lucide-react';

interface UnifiedModalProps {
  waModalOpen: boolean;
  modalService: string;
  setModalService: (service: string) => void;
  modalCustomMsg: string;
  setModalCustomMsg: (msg: string) => void;
  handleCloseUnifiedModal: () => void;
  handleUnifiedSubmit: (e: React.FormEvent, localName: string, localPhone: string) => void;
}

export function UnifiedModal({
  waModalOpen,
  modalService,
  setModalService,
  modalCustomMsg,
  setModalCustomMsg,
  handleCloseUnifiedModal,
  handleUnifiedSubmit
}: UnifiedModalProps) {
  const [modalName, setModalName] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);

  if (!waModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3.5 sm:p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleCloseUnifiedModal}
          className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Compact Authentic WhatsApp Brand Card Popup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="bg-white border border-slate-200 rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.18)] w-full max-w-[325px] sm:max-w-[360px] relative z-10 flex flex-col font-sans text-slate-900 overflow-hidden transition-all duration-200"
        >
          {/* WhatsApp Brand Header Bar */}
          <div className="bg-[#075E54] text-white px-4 py-3.5 flex items-center justify-between relative">
            <div className="flex items-center gap-2 text-left">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                <svg viewBox="0 0 448 512" className="w-4.5 h-4.5 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 512l148.4-38.9c32.4 17.7 68.9 27 105.8 27 122.4 0 222-99.6 222-222 0-59.3-23.2-115-65.3-157zM223.9 474c-33.2 0-65.7-8.9-94-25.7l-6.7-4-88 23.1 23.5-85.8-4.4-7c-18.4-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54 130.5 0 101.7-82.8 184.5-184.6 184.5zm101.1-138.8c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.8-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.3 5.7 23.6 9.1 31.7 11.7 13.8 4.4 26.3 3.8 36.3 2.3 11-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-display font-bold text-sm tracking-tight leading-none text-white">Meditrip Support</h3>
                <p className="text-[10px] text-teal-100 font-sans mt-1">Typically replies instantly</p>
              </div>
            </div>

            {/* Close Button inline with banner branding */}
            <button
              type="button"
              onClick={handleCloseUnifiedModal}
              className="w-6.5 h-6.5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer outline-none focus:ring-1 focus:ring-white/20"
              aria-label="Close form"
            >
              <X size={13} />
            </button>
          </div>

          {/* Interactive Form */}
          <form
            onSubmit={(e) => handleUnifiedSubmit(e, modalName, modalPhone)}
            className="p-4 flex flex-col gap-3.5 text-left font-sans bg-[#fbf9f7] border border-black/[0.03] rounded-b-2xl"
          >
            {/* Full Name */}
            <div>
              <label className="block text-[10px] sm:text-xs font-semibold text-[#80461B] uppercase tracking-wide mb-1 px-0.5">
                Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={modalName}
                onChange={(e) => setModalName(e.target.value)}
                className="w-full text-xs font-sans text-slate-900 bg-white border border-slate-200 focus:border-[#80461B] focus:outline-none transition-all py-2 px-3 rounded-lg outline-none shadow-xs"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-[10px] sm:text-xs font-semibold text-[#80461B] uppercase tracking-wide mb-1 px-0.5">
                Phone / WhatsApp Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. +880 17XXXXXXXX"
                value={modalPhone}
                onChange={(e) => setModalPhone(e.target.value)}
                className="w-full text-xs font-sans text-slate-900 bg-white border border-slate-200 focus:border-[#80461B] focus:outline-none transition-all py-2 px-3 rounded-lg outline-none shadow-xs"
              />
            </div>

            {/* Service Dropdown Selector */}
            <div className="relative">
              <label className="block text-[10px] sm:text-xs font-semibold text-[#80461B] uppercase tracking-wide mb-1 px-0.5">
                Choose Visa/Slot Service
              </label>
              <button
                type="button"
                onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-left text-xs text-slate-800 font-medium flex items-center justify-between cursor-pointer focus:border-[#80461B] transition-all outline-none shadow-xs"
              >
                <span>{modalService}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-155 ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {serviceDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setServiceDropdownOpen(false)} />
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-md z-40 max-h-40 overflow-y-auto">
                    {[
                      'Medical Visa Support',
                      'Business Visa Support',
                      'Double Entry Visa Support',
                      'IVAC Slot Booking Support',
                      'Hospital Doctor Appointment',
                      'Document Verification',
                      'General Consultation & Support'
                    ].map((serviceName) => (
                      <button
                        key={serviceName}
                        type="button"
                        onClick={() => {
                          setModalService(serviceName);
                          setServiceDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs text-slate-705 hover:bg-slate-50 hover:text-black transition-colors flex items-center justify-between cursor-pointer ${
                          modalService === serviceName ? 'bg-amber-50 text-amber-955 font-bold font-sans' : 'font-sans'
                        }`}
                      >
                        <span>{serviceName}</span>
                        {modalService === serviceName && <Check size={11} className="text-[#80461B]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Message Input Box */}
            <div>
              <label className="block text-[10px] sm:text-xs font-semibold text-[#80461B] uppercase tracking-wide mb-1 px-0.5">
                Your Requirements / Message
              </label>
              <textarea
                rows={2}
                placeholder="Describe your case briefly..."
                value={modalCustomMsg}
                onChange={(e) => setModalCustomMsg(e.target.value)}
                className="w-full text-xs font-sans text-slate-900 bg-white border border-slate-200 focus:border-[#80461B] focus:outline-none transition-all py-1.5 px-3 rounded-lg resize-none outline-none shadow-xs"
              />
            </div>

            {/* Metadata Subtitle */}
            <span className="text-[10px] text-slate-400 leading-normal mb-1">
              Clicking the action button below will register your query in our backend dashboard and immediately open standard WhatsApp handoff.
            </span>

            {/* WhatsApp Send Button */}
            <button
              type="submit"
              className="w-full bg-[#25D366] text-white hover:bg-[#20ba59] font-sans font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-all duration-150 active:scale-[0.98] shadow-md hover:shadow-[0_4px_12px_rgba(37,211,102,0.25)] flex items-center justify-center gap-1.5 cursor-pointer outline-none border-none"
            >
              <svg viewBox="0 0 448 512" className="w-3.5 h-3.5 text-white fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 512l148.4-38.9c32.4 17.7 68.9 27 105.8 27 122.4 0 222-99.6 222-222 0-59.3-23.2-115-65.3-157zM223.9 474c-33.2 0-65.7-8.9-94-25.7l-6.7-4-88 23.1 23.5-85.8-4.4-7c-18.4-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54 130.5 0 101.7-82.8 184.5-184.6 184.5zm101.1-138.8c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.8-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.3 5.7 23.6 9.1 31.7 11.7 13.8 4.4 26.3 3.8 36.3 2.3 11-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
              Send to WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
