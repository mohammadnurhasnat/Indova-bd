import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, MapPin, Mail, Globe, Calendar, Award, Check } from 'lucide-react';

export interface HospitalType {
  name: string;
  desc: string;
  logoUrl: string;
  speciality: string;
  departments: string[];
  city: string;
  whatsappMsg: string;
}

export const HOSPITALS_DATA: HospitalType[] = [
  {
    name: "Apollo Hospital",
    desc: "Chennai & Delhi Networks",
    city: "Chennai, Delhi, Kolkata, Mumbai & Hyderabad",
    speciality: "Organ Transplants, Cardiology, Robotic Surgery & Oncology",
    whatsappMsg: "Hello Meditrip! I want to book an appointment or get details for Apollo Hospital.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Apollo_Hospitals_Logo.svg",
    departments: [
      "Apollo Heart Institute (Adult & Pediatric Cardiology)",
      "Comprehensive Cancer Institute (Oncology & Proton Therapy)",
      "Neurology, Epilepsy & Neurosurgery Centre",
      "Gastroenterology, Hepatology & Liver Transplant Units",
      "Robotic Spine & Complex Total Joint Replacements",
      "Multi-Organ Transplantation (Kidney, Liver & Heart Transplants)"
    ]
  },
  {
    name: "Fortis Hospital",
    desc: "Bangalore & Delhi NCR Centers",
    city: "Bangalore, Delhi NCR, Mohali, Kolkata & Mumbai",
    speciality: "Heart Institute, Joint replacement, Kidney & Urology Care",
    whatsappMsg: "Hello Meditrip! I want to book an appointment or get details for Fortis Hospital.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Fortis_Healthcare_logo.svg",
    departments: [
      "Fortis Escorts Heart Institute (FEHI) & Cardiac Sciences",
      "Orthopedics, Joint Reconstruction & Sports Medicine",
      "Neurosciences, Stroke Management & Micro-Neurosurgery",
      "Nephrology, Urology & Organ Transplant Institute",
      "Gastroenterology & Advanced Laparoscopic GI Surgery",
      "Pulmonology, Respiratory Care & Thoracic Surgery"
    ]
  },
  {
    name: "Max Hospital",
    desc: "Saket Smart Hospital City",
    city: "New Delhi (Saket, Patparganj, Shalimar Bagh) & NCR Locations",
    speciality: "Biliary Sciences, Minimal Access Surgery, Neuro & Aesthetic Care",
    whatsappMsg: "Hello Meditrip! I want to book an appointment or get details for Max Hospital.",
    logoUrl: "https://companieslogo.com/img/orig/MAXHEALTH.NS-28b3f276.png",
    departments: [
      "Center for Liver and Biliary Sciences (Liver Transplant)",
      "Max Super Speciality Cancer Care (Oncology & BMT)",
      "Institute of Minimal Access, Metabolic & Bariatric Surgery",
      "Institute of Neurosciences (Brain & Spine Care)",
      "Department of Aesthetic, Cleft & Reconstructive Surgery",
      "Cardiothoracic & Vascular Sciences (CTVS)"
    ]
  },
  {
    name: "Medanta (Medinatar) Hospital",
    desc: "Gurugram Super-specialty Care",
    city: "Gurugram (Delhi NCR), Lucknow, Patna & Indore",
    speciality: "Complex Valve Surgeries, Bone & Joint, Cancer Institute",
    whatsappMsg: "Hello Meditrip! I want to book an appointment or get details for Medanta (Medinatar) Hospital.",
    logoUrl: "https://companieslogo.com/img/orig/MEDANTA.NS-b94d93ee.png",
    departments: [
      "Medanta Heart Institute & Complex Valve Repairs",
      "Bone & Joint Institute (Revision & Robotic Surgeries)",
      "Medanta Cancer Institute (Modern Oncology Therapeutics)",
      "Institute of Kidney Surgery, Urology & Nephrology",
      "Institute of Digestive and Hepatobiliary Sciences",
      "Institute of Respiratory, Sleep & Critical Care"
    ]
  },
  {
    name: "Manipal Hospital",
    desc: "Dwarka, Goa & Jaipur Wings",
    city: "Bangalore, Dwarka (New Delhi), Jaipur, Goa & Kolkata",
    speciality: "Deformity Correction, Vascular Units, NICU & Renal Sciences",
    whatsappMsg: "Hello Meditrip! I want to book an appointment or get details for Manipal Hospital.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/Manipal_Hospitals_Logo.svg",
    departments: [
      "Spine Surgery & Complex Pediatric Scoliometer Corrections",
      "Cardiothoracic, Vascular & Coronary Heart Bypass Units",
      "Pediatric Super-specialty Hospital & High-dependency NICU",
      "Institute of Renal Sciences & Automated Nephrology",
      "Neurology, Neuro-Surgery & Neuro-rehabilitation Wings",
      "Joint Replacement, Arthroscopy & Sports Medicine Care"
    ]
  },
  {
    name: "M.G.M. Hospital",
    desc: "Chennai Advanced Multi-care",
    city: "Chennai (Nelson Manickam Road & Mogappair Systems)",
    speciality: "Heart-Lung Transplants, Spine & HBP Sciences, Neural Units",
    whatsappMsg: "Hello Meditrip! I want to book an appointment or get details for M.G.M. Hospital.",
    logoUrl: "https://mgmhealthcare.in/wp-content/themes/mgm-healthcare/images/MGM-vlogo.png",
    departments: [
      "Advanced Heart & Lung Transplant Institute",
      "Multi-Organ Transplantation & Hepatobiliary (HPB) Sciences",
      "Institute of Renal Sciences (Nephrology, Urology & Dialysis)",
      "Comprehensive Spine Surgery & Advanced Scoliosis Centre",
      "Institute of Neurosciences & Advanced Stroke Care",
      "Internal Medicine, Critical Care & Pulmonology"
    ]
  },
  {
    name: "Narayana Hospital",
    desc: "Bangalore & Jaipur Heart Centers",
    city: "Bangalore, Kolkata, Jaipur, Ahmedabad & Delhi NCR",
    speciality: "Cardiac Surgery, Bone Marrow, Hematology & Kidney Transplant",
    whatsappMsg: "Hello Meditrip! I want to book an appointment or get details for Narayana Hospital.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Narayana_Health_logo.svg",
    departments: [
      "Narayana Institute of Cardiac Sciences (Heart Surgeries)",
      "Mazumdar Shaw Cancer Centre & Advanced Oncology",
      "Bone Marrow & Stem Cell Transplantation Services (One of India's Largest)",
      "Comprehensive Hematological Sciences division",
      "Kidney Transplantation, Advanced Urology & Nephrology",
      "Pediatric Cardiac Services & Congenital Care Unit"
    ]
  },
  {
    name: "AIIMS New Delhi",
    desc: "India's Premier Medical Institute",
    city: "Ansari Nagar, New Delhi",
    speciality: "Advanced Oncology, Cardiology, Neurology & BMT",
    whatsappMsg: "Hello Meditrip! I want to book an appointment or get details for AIIMS New Delhi.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/All_India_Institute_of_Medical_Sciences_New_Delhi_Logo.svg",
    departments: [
      "Dr. BR Ambedkar Institute Rotary Cancer Hospital (IRCH)",
      "Cardiothoracic and Neurosciences Centre (CNC)",
      "Department of Hematology & Stem Cell Transplant Division",
      "Gastroenterology, Hepatology & Endoscopy Division",
      "Department of Rheumatology & Immune Disorders",
      "Advanced Pediatric Specialties & Neonatal Intensive Care"
    ]
  },
  {
    name: "R.T. Hospital",
    desc: "RTIICS Cardiac Care Kolkata",
    city: "Kolkata, West Bengal (Mukundapur Network)",
    speciality: "Pediatric & Adult Valve bypass, Renal Sciences",
    whatsappMsg: "Hello Meditrip! I want to book an appointment or get details for RTIICS Rabindranath Tagore Hospital.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Narayana_Health_logo.svg",
    departments: [
      "Pediatric Cardiothoracic, Valve & Congenital Bypass Surgery",
      "Adult Complex Bypass Surgeries, Off-Pump Procedures (CABG)",
      "Interventional Cardiology, Electrophysiology & ICCU Care",
      "Nephrology, Chronic Kidney Disease Management & Dialysis",
      "Urology & Endourology Services (Kidney Keyhole Procedures)",
      "Neurological Diagnostics & Spine Decompression Centre"
    ]
  },
  {
    name: "CMC Vellore Hospital",
    desc: "Christian Medical College & Hospital",
    city: "Vellore, Tamil Nadu (Main Campus & Ranipet Campus)",
    speciality: "BMT, Rheumatology, GI Sciences, Endocrinology & Pediatrics",
    whatsappMsg: "Hello Meditrip! I want to book an appointment or get details for CMC Vellore Hospital.",
    logoUrl: "https://www.cmch-vellore.edu/images/logo.png",
    departments: [
      "Department of Haematology, Bone Marrow & Stem Cell Transplant",
      "Neurological Sciences (Neurology, Neurosurgery & Neuropathology)",
      "Rheumatology & Autoimmune Systemic Disease Centre",
      "Gastrointestinal Sciences, Hepatology & Endoscopic Surgery",
      "Endocrinology, Diabetes & Metabolic Bone Disease Center",
      "Renal Sciences (Advanced Pediatric & Adult Nephrology)"
    ]
  }
];

const CONTACT_INFO_MAP: Record<string, { address: string; phone: string; email: string; website: string }> = {
  "Apollo Hospital": {
    address: "Greams Lane, Off Greams Road, Chennai, Tamil Nadu 600006",
    phone: "+91 44 2829 0200",
    email: "chennai@apollohospitals.com",
    website: "www.apollohospitals.com"
  },
  "Fortis Hospital": {
    address: "Bannerghatta Road, Opposite IIM-B, Bangalore, Karnataka 560076",
    phone: "+91 80 6621 4444",
    email: "enquiry.bangalore@fortishealthcare.com",
    website: "www.fortishealthcare.com"
  },
  "Max Hospital": {
    address: "Press Enclave Road, Saket, New Delhi, Delhi 110017",
    phone: "+91 11 2651 5050",
    email: "contact.saket@maxhealthcare.com",
    website: "www.maxhealthcare.com"
  },
  "Medanta (Medinatar) Hospital": {
    address: "CH Baktawar Singh Road, Sector 38, Gurugram, Haryana 122001",
    phone: "+91 124 4141 414",
    email: "info@medanta.org",
    website: "www.medanta.org"
  },
  "Manipal Hospital": {
    address: "Sector 6, Dwarka, New Delhi, Delhi 110075",
    phone: "+91 11 4967 4967",
    email: "info.dwarka@manipalhospitals.com",
    website: "www.manipalhospitals.com"
  },
  "M.G.M. Hospital": {
    address: "1, Nelson Manickam Road, Aminjikarai, Chennai, Tamil Nadu 600029",
    phone: "+91 44 4524 2424",
    email: "info@mgmhealthcare.in",
    website: "www.mgmhealthcare.in"
  },
  "Narayana Hospital": {
    address: "258/A, Bommasandra Industrial Area, Bangalore, Karnataka 560099",
    phone: "+91 80 7122 2222",
    email: "info.msmc@narayanahealth.org",
    website: "www.narayanahealth.org"
  },
  "AIIMS New Delhi": {
    address: "Ansari Nagar, New Delhi, Delhi 110029",
    phone: "+91 11 2658 8500",
    email: "info@aiims.edu",
    website: "www.aiims.edu"
  },
  "R.T. Hospital": {
    address: "124, Mukundapur Main Road, EM Bypass, Kolkata, West Bengal 700099",
    phone: "+91 33 7122 2333",
    email: "info.rtiics@narayanahealth.org",
    website: "www.narayanahealth.org"
  },
  "CMC Vellore Hospital": {
    address: "Ida Scudder Road, Vellore, Tamil Nadu 632004",
    phone: "+91 416 228 1000",
    email: "pro@cmcvellore.ac.in",
    website: "www.cmch-vellore.edu"
  }
};

interface DraggableMarqueeProps {
  onBookAppointment: (hospitalName: string) => void;
}

export function DraggableMarquee({ onBookAppointment }: DraggableMarqueeProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeHospital, setActiveHospital] = useState<HospitalType | null>(null);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  
  // Ref for the outer scrolling view
  const marqueeContainerRef = useRef<HTMLDivElement | null>(null);
  
  // Interaction and speed state/refs
  const isUserInteracting = useRef<boolean>(false);
  const isMouseDown = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);
  const interactionTimeout = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize scroll position so scrolling left-to-right has continuous head room
  useEffect(() => {
    const el = marqueeContainerRef.current;
    if (!el) return;

    const initScroll = () => {
      const halfWidth = el.scrollWidth / 2;
      if (halfWidth > 0) {
        el.scrollLeft = halfWidth;
      }
    };

    // Safe double frame measurements
    requestAnimationFrame(() => {
      requestAnimationFrame(initScroll);
    });
  }, [mounted]);

  // Handle scroll wrapping & indicator percentage tracking
  useEffect(() => {
    const el = marqueeContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const halfWidth = el.scrollWidth / 2;
      if (halfWidth > 0) {
        // Seamless looping boundaries
        if (el.scrollLeft <= 2) {
          el.scrollLeft = halfWidth;
        } else if (el.scrollLeft >= halfWidth * 2 - 2) {
          el.scrollLeft = halfWidth;
        }

        // Percentage tracking [0 to 1] visual mapping for indicator
        const normalizedScroll = el.scrollLeft % halfWidth;
        const pct = (halfWidth - normalizedScroll) / halfWidth;
        setScrollPercent(Math.max(0, Math.min(1, pct)));
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [mounted]);

  // Setup automated scrolling loop left-to-right (el.scrollLeft -= scrollSpeed)
  useEffect(() => {
    const el = marqueeContainerRef.current;
    if (!el) return;

    let animationFrameId: number;
    const scrollSpeed = 0.85; // Slow premium constant scrolling index

    const performAutoScroll = () => {
      if (!isUserInteracting.current && el) {
        // Decreasing scrollLeft scrolls the viewport leftward, visual animation represents items sliding from left to right!
        el.scrollLeft -= scrollSpeed;
        
        // Loop boundary
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0 && el.scrollLeft <= 2) {
          el.scrollLeft = halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(performAutoScroll);
    };

    animationFrameId = requestAnimationFrame(performAutoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
    };
  }, []);

  // Pause auto scroll on drag and touch interaction
  const handleInteractionStart = () => {
    isUserInteracting.current = true;
    if (interactionTimeout.current) {
      clearTimeout(interactionTimeout.current);
    }
  };

  // Resume auto scroll after interactions stop
  const handleInteractionEnd = () => {
    if (interactionTimeout.current) {
      clearTimeout(interactionTimeout.current);
    }
    interactionTimeout.current = setTimeout(() => {
      isUserInteracting.current = false;
    }, 2200);
  };

  // Desktop Mouse drag event handlers
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = marqueeContainerRef.current;
    if (!el) return;
    
    handleInteractionStart();
    isMouseDown.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;
    const el = marqueeContainerRef.current;
    if (!el) return;
    
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed modifier
    el.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUpOrLeave = () => {
    isMouseDown.current = false;
    handleInteractionEnd();
  };

  // Touch handlers
  const onTouchStart = () => {
    handleInteractionStart();
  };

  const onTouchEnd = () => {
    handleInteractionEnd();
  };

  const contactDetails = activeHospital ? CONTACT_INFO_MAP[activeHospital.name] || {
    address: "India Super Specialty Network Hub",
    phone: "+91 Phone Support Available",
    email: "support@meditripbd.com",
    website: "https://meditripbd.com"
  } : null;

  return (
    <div className="relative w-full">
      {/* Draggable Scrolling Marquee Wrapper */}
      <div className="relative overflow-hidden w-full py-4 bg-slate-50/40 rounded-2xl border border-black/[0.03] shadow-inner select-none">
        {/* Soft edge blur overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none" />
 
        {/* Scroll Container */}
        <div
          ref={marqueeContainerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="flex overflow-x-auto scrollbar-none whitespace-nowrap py-2.5 cursor-grab active:cursor-grabbing select-none items-center"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Double map dataset arrays for infinite scroll simulation */}
          {[...HOSPITALS_DATA, ...HOSPITALS_DATA].map((hosp, idx) => (
            <div
              key={`hosp-ref-${idx}`}
              onClick={() => setActiveHospital(hosp)}
              className="flex items-center justify-center shrink-0 w-[130px] sm:w-[160px] h-[65px] sm:h-[80px] mx-5 sm:mx-9 transition-all duration-300 transform-gpu hover:scale-108 active:scale-95 cursor-pointer select-none outline-none relative"
              title={`Click to view ${hosp.name}`}
            >
              {/* Image element with blend multiply configured to blend away solid white background from hospital logos */}
              <img
                src={hosp.logoUrl}
                alt={hosp.name}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain filter select-none pointer-events-none mix-blend-multiply opacity-85 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Elegant scroll progress track indicator */}
      <div className="flex flex-col items-center justify-center mt-4 sm:mt-5 gap-1.5 select-none">
        <span className="text-[10px] font-sans font-extrabold tracking-widest text-[#80461B]/60 uppercase">
          Drag or swipe to explore
        </span>
        <div className="relative w-36 sm:w-48 h-1 bg-slate-200/50 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 bottom-0 h-full bg-gradient-to-r from-[#80461B] via-amber-600 to-stone-500 rounded-full transition-all duration-75"
            style={{ 
              width: '30%', // Indicator slider size
              left: `${scrollPercent * 70}%` // Sliding bounds (0 to 70%)
            }}
          />
        </div>
      </div>

      {/* Hospital details, contacts & medical departments Popup Modal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeHospital && contactDetails && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 select-text overflow-y-auto">
              {/* High-Contrast elegant dark blur overlay to block background blending */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveHospital(null)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 cursor-pointer"
              />

              {/* Modal Box Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: 'spring', duration: 0.35 }}
                className="bg-white rounded-3xl border border-black/[0.08] shadow-2xl w-full max-w-lg overflow-hidden relative z-50 flex flex-col max-h-[90vh]"
              >
                {/* Header banner */}
                <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-white px-5 sm:px-6 py-4 border-b border-black/[0.04] flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-12 bg-white rounded-xl p-1.5 shadow-sm border border-black/[0.04] flex items-center justify-center">
                      <img 
                        src={activeHospital.logoUrl}
                        alt={activeHospital.name}
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-full object-contain select-none pointer-events-none mix-blend-multiply"
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-black text-slate-900 text-base sm:text-lg tracking-tight leading-tight">
                        {activeHospital.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-sans mt-0.5 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#80461B]" />
                        {activeHospital.city}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveHospital(null)}
                    className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Scrollable content block */}
                <div className="p-5 sm:p-6 overflow-y-auto space-y-5 font-sans scrollbar-thin">
                  {/* Section: Contact Details Card */}
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2.5">
                      Contact & Logistics Desk
                    </h4>
                    <div className="bg-slate-50 rounded-2xl border border-black/[0.03] p-4 space-y-3">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#80461B] shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-slate-650 font-medium">
                          <strong>Address:</strong><br />
                          {contactDetails.address}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2.5 border-t border-slate-200/50">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="text-xs text-slate-600 truncate">
                            <strong>Direct Line:</strong><br />
                            {contactDetails.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span className="text-xs text-slate-600 truncate">
                            <strong>International Help Desk:</strong><br />
                            {contactDetails.email}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-2.5 border-t border-slate-200/50">
                        <Globe className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <a
                          href={`https://${contactDetails.website}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-[#80461B] font-bold hover:underline truncate"
                        >
                          <strong>Official Portal:</strong> {contactDetails.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Section: Specialized Medical Departments */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        Specialized Medical Departments
                      </h4>
                      <span className="bg-[#80461B]/10 text-[#80461B] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                        {activeHospital.departments.length} Key Divisions
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {activeHospital.departments.map((dept, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl border border-black/[0.04] bg-white hover:border-amber-200 hover:bg-amber-50/10 transition-colors"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="text-xs text-slate-700 font-medium">
                            {dept}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer CTAs */}
                <div className="p-4 sm:p-5 border-t border-black/[0.04] bg-slate-50 flex flex-col sm:flex-row gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveHospital(null)}
                    className="w-full sm:w-1/3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-350 bg-white rounded-xl transition-all cursor-pointer uppercase tracking-wider text-center"
                  >
                    Close Window
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onBookAppointment(activeHospital.name);
                      setActiveHospital(null);
                    }}
                    className="w-full sm:w-2/3 py-2 text-xs font-bold text-white bg-[#80461B] hover:bg-[#80461B]/95 rounded-xl transition-all shadow-md cursor-pointer uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4 text-white" />
                    Book Appointment Here
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
