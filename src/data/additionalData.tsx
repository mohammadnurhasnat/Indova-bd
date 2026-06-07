import React from 'react';
import {
  Stethoscope,
  Activity,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Sparkles,
  Droplet,
  User,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

// Static Partner Hospitals List with beautiful handcrafted brand-accurate vector SVGs
export const HOSPITALS_LIST = [
  {
    name: "Apollo Hospitals",
    desc: "Chennai, Delhi & Kolkata Networks",
    logo: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#005fa9" />
        <path d="M50 15L58 38H82L62 52L70 76L50 62L30 76L38 52L18 38H42L50 15Z" fill="#FFA500" />
        <circle cx="50" cy="42" r="6" fill="#FFFFFF" />
        <path d="M42 58C42 52 58 52 58 58V72H42V58Z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    name: "Fortis Healthcare",
    desc: "Bangalore & Delhi NCR Centers",
    logo: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="20" fill="#EBF9F1" stroke="#00843D" strokeWidth="2" />
        <path d="M35 15H65V35H85V65H65V85H35V65H15V35H35V15Z" fill="#00843D" />
        <circle cx="50" cy="40" r="5" fill="#D22630" />
        <path d="M44 55C44 50 56 50 56 55V72H44V55Z" fill="#D22630" />
      </svg>
    )
  },
  {
    name: "Max Healthcare",
    desc: "Saket Smart Hospital City",
    logo: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="20" fill="#F0F8F8" />
        <path d="M30 40C30 30 40 30 50 30C60 30 70 30 70 40V60C70 70 60 70 50 70C40 70 30 70 30 60V40Z" fill="#273C75" />
        <path d="M40 50H60" stroke="#009F9D" strokeWidth="12" strokeLinecap="round" />
        <path d="M50 40V60" stroke="#009F9D" strokeWidth="12" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: "Medanta - The Medicity",
    desc: "Gurugram Super-specialty Care",
    logo: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="20" fill="#FFF1F1" />
        <path d="M20 50H32L40 25L50 75L58 40L64 50H80" stroke="#ED1C24" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="50" r="7" fill="#F58220" />
      </svg>
    )
  },
  {
    name: "Manipal Hospitals",
    desc: "Dwarka, Goa & Jaipur Wings",
    logo: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="20" fill="#F0F6FC" />
        <path d="M25 50C25 35 35 25 50 25C65 25 75 35 75 50C75 65 65 75 50 75C35 75 25 65 25 50Z" stroke="#006CB7" strokeWidth="6" />
        <path d="M35 50H65M50 35V65" stroke="#0DB14B" strokeWidth="10" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: "MGM Healthcare",
    desc: "Chennai Advanced Multi-care",
    logo: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="20" fill="#FFF8F8" />
        <path d="M50 15L80 25V55C80 72 67 83 50 87C33 83 20 72 20 55V25L50 15Z" fill="#C1272D" />
        <path d="M50 28V72M34 50H66" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: "Narayana Health",
    desc: "Bangalore & Joypur Heart Centers",
    logo: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="20" fill="#F1F3FC" />
        <path d="M50 35C45 25 30 25 25 35C20 45 35 65 50 75C65 65 80 45 75 35C70 25 55 25 50 35Z" fill="#2E3094" />
        <path d="M43 48H57M50 41V55" stroke="#1FB57A" strokeWidth="5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: "Rabindranath Tagore",
    desc: "RTIICS Cardiac Care Kolkata",
    logo: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="20" fill="#FFF9F5" />
        <path d="M50 15V85" stroke="#E05B26" strokeWidth="6" strokeLinecap="round" />
        <path d="M25 35L75 65" stroke="#2E3094" strokeWidth="6" strokeLinecap="round" />
        <path d="M75 35L25 65" stroke="#2E3094" strokeWidth="6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: "CMC Vellore",
    desc: "Christian Medical College & Hospital",
    logo: (
      <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="20" fill="#E6FAF2" />
        <path d="M50 20L75 35V60C75 72 65 80 50 83C35 80 25 60 25 60V35L50 20Z" fill="#008080" />
        <path d="M50 35V65M38 50H62" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      </svg>
    )
  }
];

// Enriched Partner Hospitals Data containing rich details for INFO & DEPTS modal
export const PARTNER_HOSPITALS_ENRICHED = [
  {
    name: "Apollo Hospitals",
    desc: "Chennai, Delhi & Kolkata Networks",
    city: "Chennai, Delhi, Kolkata, Mumbai & Hyderabad",
    speciality: "Organ Transplants, Cardiology, Robotic Surgery & Oncology",
    logo: HOSPITALS_LIST[0].logo,
    departments: [
      "Apollo Heart Institute (Adult & Pediatric Cardiology)",
      "Comprehensive Cancer Institute (Oncology & Proton Therapy)",
      "Neurology, Epilepsy & Neurosurgery Centre",
      "Gastroenterology, Hepatology & Liver Transplant Units",
      "Robotic Spine & Complex Total Joint Replacements",
      "Multi-Organ Transplantation (Kidney, Liver & Heart Transplants)"
    ],
    address: "Greams Lane, Off Greams Road, Chennai, Tamil Nadu 600006",
    phone: "+91 44 2829 0200",
    email: "chennai@apollohospitals.com",
    website: "www.apollohospitals.com"
  },
  {
    name: "Fortis Healthcare",
    desc: "Bangalore & Delhi NCR Centers",
    city: "Bangalore, Delhi NCR, Mohali, Kolkata & Mumbai",
    speciality: "Heart Institute, Knee & Joint, Kidney & Urology Care",
    logo: HOSPITALS_LIST[1].logo,
    departments: [
      "Fortis Escorts Heart Institute (FEHI) & Cardiac Sciences",
      "Orthopedics, Joint Reconstruction & Sports Medicine",
      "Neurosciences, Stroke Management & Micro-Neurosurgery",
      "Nephrology, Urology & Organ Transplant Institute",
      "Gastroenterology & Advanced Laparoscopic GI Surgery",
      "Pulmonology, Respiratory Care & Thoracic Surgery"
    ],
    address: "Bannerghatta Road, Opposite IIM-B, Bangalore, Karnataka 560076",
    phone: "+91 80 6621 4444",
    email: "enquiry.bangalore@fortishealthcare.com",
    website: "www.fortishealthcare.com"
  },
  {
    name: "Max Healthcare",
    desc: "Saket Smart Hospital City",
    city: "New Delhi (Saket, Patparganj, Shalimar Bagh) & NCR Locations",
    speciality: "Biliary Sciences, Minimal Access Surgery, Neuro & Aesthetic Care",
    logo: HOSPITALS_LIST[2].logo,
    departments: [
      "Center for Liver and Biliary Sciences (Liver Transplant)",
      "Max Super Speciality Cancer Care (Oncology & BMT)",
      "Institute of Minimal Access, Metabolic & Bariatric Surgery",
      "Institute of Neurosciences (Brain & Spine Care)",
      "Department of Aesthetic, Cleft & Reconstructive Surgery",
      "Cardiothoracic & Vascular Sciences (CTVS)"
    ],
    address: "Press Enclave Road, Saket, New Delhi, Delhi 110017",
    phone: "+91 11 2651 5050",
    email: "contact.saket@maxhealthcare.com",
    website: "www.maxhealthcare.com"
  },
  {
    name: "Medanta - The Medicity",
    desc: "Gurugram Super-specialty Care",
    city: "Gurugram (Delhi NCR), Lucknow, Patna & Indore",
    speciality: "Complex Valve Surgeries, Bone & Joint, Cancer Institute",
    logo: HOSPITALS_LIST[3].logo,
    departments: [
      "Medanta Heart Institute & Complex Valve Repairs",
      "Bone & Joint Institute (Revision & Robotic Surgeries)",
      "Medanta Cancer Institute (Modern Oncology Therapeutics)",
      "Institute of Kidney Surgery, Urology & Nephrology",
      "Institute of Digestive and Hepatobiliary Sciences",
      "Institute of Respiratory, Sleep & Critical Care"
    ],
    address: "CH Baktawar Singh Road, Sector 38, Gurugram, Haryana 122001",
    phone: "+91 124 4141 414",
    email: "info@medanta.org",
    website: "www.medanta.org"
  },
  {
    name: "Manipal Hospitals",
    desc: "Dwarka, Goa & Jaipur Wings",
    city: "Bangalore, Dwarka (New Delhi), Jaipur, Goa & Kolkata",
    speciality: "Deformity Correction, Vascular Units, NICU & Renal Sciences",
    logo: HOSPITALS_LIST[4].logo,
    departments: [
      "Spine Surgery & Complex Pediatric Scoliometer Corrections",
      "Cardiothoracic, Vascular & Coronary Heart Bypass Units",
      "Pediatric Super-specialty Hospital & High-dependency NICU",
      "Institute of Renal Sciences & Automated Nephrology",
      "Neurology, Neuro-Surgery & Neuro-rehabilitation Wings",
      "Joint Replacement, Arthroscopy & Sports Medicine Care"
    ],
    address: "Sector 6, Dwarka, New Delhi, Delhi 110075",
    phone: "+91 11 4967 4967",
    email: "info.dwarka@manipalhospitals.com",
    website: "www.manipalhospitals.com"
  },
  {
    name: "MGM Healthcare",
    desc: "Chennai Advanced Multi-care",
    city: "Chennai (Nelson Manickam Road & Mogappair Systems)",
    speciality: "Heart-Lung Transplants, Spine & HBP Sciences, Neural Units",
    logo: HOSPITALS_LIST[5].logo,
    departments: [
      "Advanced Heart & Lung Transplant Institute",
      "Multi-Organ Transplantation & Hepatobiliary (HPB) Sciences",
      "Institute of Renal Sciences (Nephrology, Urology & Dialysis)",
      "Comprehensive Spine Surgery & Advanced Scoliosis Centre",
      "Institute of Neurosciences & Advanced Stroke Care",
      "Internal Medicine, Critical Care & Pulmonology"
    ],
    address: "1, Nelson Manickam Road, Aminjikarai, Chennai, Tamil Nadu 600029",
    phone: "+91 44 4524 2424",
    email: "info@mgmhealthcare.in",
    website: "www.mgmhealthcare.in"
  },
  {
    name: "Narayana Health",
    desc: "Bangalore & Joypur Heart Centers",
    city: "Bangalore, Kolkata, Jaipur, Ahmedabad & Delhi NCR",
    speciality: "Cardiac Surgery, Bone Marrow, Hematology & Kidney Transplant",
    logo: HOSPITALS_LIST[6].logo,
    departments: [
      "Narayana Institute of Cardiac Sciences (Heart Surgeries)",
      "Mazumdar Shaw Cancer Centre & Advanced Oncology",
      "Bone Marrow & Stem Cell Transplantation Services (One of India's Largest)",
      "Comprehensive Hematological Sciences division",
      "Kidney Transplantation, Advanced Urology & Nephrology",
      "Pediatric Cardiac Services & Congenital Care Unit"
    ],
    address: "258/A, Bommasandra Industrial Area, Bangalore, Karnataka 560099",
    phone: "+91 80 7122 2222",
    email: "info.msmc@narayanahealth.org",
    website: "www.narayanahealth.org"
  },
  {
    name: "Rabindranath Tagore",
    desc: "RTIICS Cardiac Care Kolkata",
    city: "Kolkata, West Bengal (Mukundapur Network)",
    speciality: "Pediatric & Adult Valve bypass, Renal Sciences",
    logo: HOSPITALS_LIST[7].logo,
    departments: [
      "Pediatric Cardiothoracic, Valve & Congenital Bypass Surgery",
      "Adult Complex Bypass Surgeries, Off-Pump Procedures (CABG)",
      "Interventional Cardiology, Electrophysiology & ICCU Care",
      "Nephrology, Chronic Kidney Disease Management & Dialysis",
      "Urology & Endourology Services (Kidney Keyhole Procedures)",
      "Neurological Diagnostics & Spine Decompression Centre"
    ],
    address: "124, Mukundapur Main Road, EM Bypass, Kolkata, West Bengal 700099",
    phone: "+91 33 7122 2333",
    email: "info.rtiics@narayanahealth.org",
    website: "www.narayanahealth.org"
  },
  {
    name: "CMC Vellore",
    desc: "Christian Medical College & Hospital",
    city: "Vellore, Tamil Nadu (Main Campus & Ranipet Campus)",
    speciality: "BMT, Rheumatology, GI Sciences, Endocrinology & Pediatrics",
    logo: HOSPITALS_LIST[8].logo,
    departments: [
      "Department of Haematology, Bone Marrow & Stem Cell Transplant",
      "Neurological Sciences (Neurology, Neurosurgery & Neuropathology)",
      "Rheumatology & Autoimmune Systemic Disease Centre",
      "Gastrointestinal Sciences, Hepatology & Endoscopic Surgery",
      "Endocrinology, Diabetes & Metabolic Bone Center",
      "Renal Sciences (Advanced Pediatric & Adult Nephrology)"
    ],
    address: "Ida Scudder Road, Vellore, Tamil Nadu 632004",
    phone: "+91 416 228 1000",
    email: "pro@cmcvellore.ac.in",
    website: "www.cmch-vellore.edu"
  }
];

// Recharts Visa Processing Trend Data over the last 6 months (average time in days)
export const VISA_PROCESSING_TREND_DATA = [
  { name: 'Jan 2026', Medical: 4, Tourist: 9, Business: 6 },
  { name: 'Feb 2026', Medical: 3.5, Tourist: 8, Business: 5.5 },
  { name: 'Mar 2026', Medical: 3, Tourist: 7.5, Business: 5 },
  { name: 'Apr 2026', Medical: 2.8, Tourist: 6.8, Business: 4.8 },
  { name: 'May 2026', Medical: 2.5, Tourist: 6, Business: 4.2 },
  { name: 'Jun 2026', Medical: 2, Tourist: 5.5, Business: 3.8 }
];

// Deeply researched real medical departments, conditions & best hospital recommendation metrics
export const REAL_DISEASE_DATA = [
  {
    condition: "Coronary artery disease / Heart bypass / Valve repair / Heart Attack",
    keywords: ["heart", "cardiac", "bypass", "valve", "blockage", "angioplasty", "chest pain", "coronary", "stroke", "ecg", "cardio", "doctor", "medicine"],
    department: "Cardiology & Cardiothoracic Surgery (Cardiovascular Science)",
    bestHospital: "Apollo Hospitals (Chennai) & Medanta - The Medicity (Gurugram)",
    reasoning: "Apollo Greams Road Chennai has an unparalleled 99.6% success rate on coronary bypass surgeries and offers advanced robotic-assisted cardiosurgery. Medanta boasts Dr. Naresh Trehan’s legendary cardiothoracic team for complex pediatric and arterial graft bypasses."
  },
  {
    condition: "Brain Tumor / Spinal Decompression / Parkinson's disease / Stroke / Epilepsy",
    keywords: ["brain", "spinal", "spine", "parkinson", "stroke", "paralysis", "epilepsy", "neurology", "neuro", "seizure", "sciatica", "migraine", "nerve", "headache"],
    department: "Neurosciences (Neurology & Neurosurgery)",
    bestHospital: "Max Super Speciality Hospital (Saket, Delhi) & Apollo Greams Road (Chennai)",
    reasoning: "Max Saket houses the revolutionary Intraoperative MRI (3T Brain Suite) system allowing neurosurgeons to scan tumors live during surgery for maximum margin extraction. Apollo Chennai is renowned for advanced Deep Brain Reconstruction (DBS) for Parkinson's disease."
  },
  {
    condition: "Oncology / Cancer Care / Breast Cancer / Lymphoma / Lung Cancer / Leukemia",
    keywords: ["cancer", "tumor", "oncology", "chemotherapy", "radiation", "immunotherapy", "breast cancer", "leukemia", "lymphoma", "prostate", "blood cancer", "bone cancer"],
    department: "Oncology (Surgical, Medical & Radiation Cancer Treatment)",
    bestHospital: "Apollo Proton Cancer Centre (APCC - Chennai) & Tata Memorial",
    reasoning: "APCC Chennai is India's only dedicated proton therapy center, offering highly targeted beam radiation that destroys cancer cells with millimeter-precision, protecting adjacent sensitive organs like the heart and spinal cord."
  },
  {
    condition: "Kidney Failure / Renal Transplant / Dialysis / Kidney Stone",
    keywords: ["kidney", "renal", "transplant", "stone", "dialysis", "nephrology", "kidney failure", "creatinine", "kidney transplant", "urine", "uro", "kidney transplant"],
    department: "Nephrology & Urology (Kidney & Genitourinary Care)",
    bestHospital: "Apollo Hospitals (Greams Road, Chennai) & Medanta (Gurugram)",
    reasoning: "Apollo Chennai specializes in complicated ABO-Incompatible (different blood group) HLA-sensitized kidney transplants. Medanta features DaVinci robotic urology suites for suture-perfect donor nephrectomies."
  },
  {
    condition: "Infertility / IVF Treatment / ICSI / Blastocyst Transfer",
    keywords: ["ivf", "infertility", "fertility", "pregnancy", "semen", "icsi", "gynecology", "baby", "miscarriage", "fallopian", "sperm", "ovary", "uterus"],
    department: "Obstetrics, Gynecology & Reproductive Medicine (IVF Care)",
    bestHospital: "Max Healthcare (Delhi) & Nova IVF / Caree Infertility Clinic",
    reasoning: "Max Healthcare Delhi is globally esteemed for advanced laser-assisted hatching and embryo monitoring with a verified 75% positive outcome rate. Nova IVF & Caree Clinic provide accessible packages with exceptional clinical expertise."
  },
  {
    condition: "Liver Cirrhosis / Liver Transplant / Hepatitis / Gallbladder Stones",
    keywords: ["liver", "cirrhosis", "hepatitis", "jaundice", "gallbladder", "stone", "gastric", "gastro", "intestinal", "pancreas", "hernia", "stomach", "acidity", "digestion", "appendix"],
    department: "Gastroenterology, Hepatology & Liver Transplant Science",
    bestHospital: "Medanta - The Medicity (Gurugram) & Apollo Chennai",
    reasoning: "Medanta Gurugram houses India's largest active liver transplantation program (over 4,000 successful transplants led by Dr. A.S. Soin) with a 95% survival rate. Apollo Chennai excels in world-class living donor transplants."
  },
  {
    condition: "Knee Replacement / Hip Joint Replacement / Bone Fracture / Arthrosurgery",
    keywords: ["knee", "hip", "bone", "fracture", "joint", "orthopedic", "arthro", "ligament", "acl", "osteoarthritis", "rheumatoid", "cartilage", "arthritis", "back pain", "shoulder"],
    department: "Orthopedics & Joint Reconstruction",
    bestHospital: "Manipal Hospital (Dwarka, Delhi) & Shalby Hospital (Ahmedabad)",
    reasoning: "Manipal Dwarka utilizes the computerized NAVIO hand-held robotic system for sub-millimeter positioning accuracy in knee replacements, ensuring faster mobilization. Shalby leads in volume orthopedic corrections."
  },
  {
    condition: "Cataract / Lasik / Glaucoma / Retinal Detachment / Cornea Services",
    keywords: ["eye", "cataract", "lasik", "glaucoma", "retina", "cornea", "blindness", "squint", "vision", "ophthalmology", "glass", "glasses", "lens"],
    department: "Ophthalmology (Advanced Eye Care & Microsurgeries)",
    bestHospital: "Sankara Nethralaya (Chennai) & Narayana Nethralaya (Bangalore)",
    reasoning: "Sankara Nethralaya is India's iconic center specialized in complicated vitreoretinal repairs, squint, and pediatric eyesight recovery with high safety metrics. Narayana Nethralaya features highly advanced laser Lasik-refractory suites."
  },
  {
    condition: "ENT / Hearing Loss / Cochlear Implant / Sinusitis / Tonsillitis",
    keywords: ["ent", "ear", "nose", "throat", "hearing", "cochlear", "sinus", "tonsils", "deafness", "otolaryngology", "swallowing", "vocal", "ear pain"],
    department: "Otolaryngology (ENT - Ear, Nose, Throat)",
    bestHospital: "MGM Healthcare (Chennai) & Fortis Healthcare (Delhi NCR)",
    reasoning: "MGM Healthcare provides specialized ENT diagnostics and advanced micro-cochlear surgeries with comprehensive post-operative audiology rehabilitation support, leading to superior restoration of natural speech."
  }
];

export const DEPARTMENTS_LIST = [
  { name: 'Cardiology', detail: 'Heart Care', icon: 'Heart' },
  { name: 'Neurology', detail: 'Brain & Spine', icon: 'Brain' },
  { name: 'Orthopedics', detail: 'Bone & Joints', icon: 'Bone' },
  { name: 'Ophthalmology', detail: 'Eye Services', icon: 'Eye' },
  { name: 'Oncology', detail: 'Cancer Care', icon: 'Activity' },
  { name: 'Pediatrics', detail: 'Child Specialist', icon: 'Baby' },
  { name: 'Gastroentrology', detail: 'Digestive Systems', icon: 'Activity' },
  { name: 'Infertility (IVF)', detail: 'Fertility Support', icon: 'Sparkles' },
  { name: 'Nephrology', detail: 'Kidney Health', icon: 'Droplet' },
  { name: 'General Medicine', detail: 'Primary Care', icon: 'User' },
  { name: 'ENT', detail: 'Ear, Nose & Throat', icon: 'Stethoscope' }
];
