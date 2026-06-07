import {
  VisaService,
  TimelineStep,
  RequirementGroup,
  DocumentCheckPackage,
  SlotService,
  FAQItem,
  TestimonialItem
} from './types';

export const VISA_SERVICES: VisaService[] = [
  {
    id: 'medical',
    title: 'Medical Visa',
    description: 'Complete medical visa processing for patients and up to 3 medical attendants. We handle documentation, appointment letters, and IVAC slot booking for a hassle-free experience.',
    points: [
      'Patient & 3 Attendant Support',
      'Doctor Appointment Letter',
      'Embassy Document Matching',
      'IVAC Slot Booking Support'
    ],
    icon: 'Stethoscope',
    colorClass: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    badgeText: 'Active'
  },
  {
    id: 'business',
    title: 'Business Visa',
    description: 'Business visa processing for business owners and company employees. Includes cover letters, trade license support, company documentation, and invitation letter coordination.',
    points: [
      'Owners & Employee Process',
      'Company Invitation Matching',
      'Cover & Forwarding Letters',
      'Trade License Translation'
    ],
    icon: 'Briefcase',
    colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    badgeText: 'Active'
  },
  {
    id: 'double',
    title: 'Double Entry Visa',
    description: 'Double entry visa for frequent travelers requiring multiple India visits. Full documentation support including work permit, notary, hotel booking, and return ticket assistance.',
    points: [
      'Work Permit Integration',
      'Notary & Affidavit Support',
      'Hotel & Ticket Booking',
      'Double Entry Permission'
    ],
    icon: 'RefreshCw',
    colorClass: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    badgeText: 'Active'
  },
  {
    id: 'entry',
    title: 'Entry Visa',
    description: 'Entry visa for those visiting family or relatives in India. We coordinate with Indian sponsors and manage all required affidavit, marriage certificate, and identity documents.',
    points: [
      'Family Visit Invitation',
      'Indian Sponsor Coordination',
      'Affidavit & Marriage Proof',
      'Full Identity Support'
    ],
    icon: 'DoorOpen',
    colorClass: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    badgeText: 'Active'
  },
  {
    id: 'tourist',
    title: 'Tourist Visa',
    description: 'Tourist visa service is temporarily suspended as per Indian Embassy guidelines. We will resume as soon as the embassy reopens tourist visa applications.',
    points: [
      'Temporarily Suspended',
      'On Hold by Indian Embassy',
      'Opens as Embassy Resumes'
    ],
    icon: 'Clock',
    colorClass: 'text-slate-500 bg-slate-500/5 border-slate-500/10',
    badgeText: 'Temporarily Closed',
    isClosed: true
  },
  {
    id: 'additional',
    title: 'Additional Services',
    description: 'Air ticket booking, travel card servicing, bank statement assistance, service card, NOC preparation, salary certificate, online visa application, and all types of visa slot booking.',
    points: [
      'Ticket & Travel Cards',
      'Bank Statement Support',
      'NOC & Salary Certificates',
      'All Visa Slot Bookings'
    ],
    icon: 'Plane',
    colorClass: 'text-dodgerblue bg-dodgerblue/10 border-dodgerblue/20',
    badgeText: 'Active'
  }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    stepNumber: 1,
    label: 'Contact Us',
    description: 'WhatsApp or call us',
    icon: 'MessageCircle'
  },
  {
    stepNumber: 2,
    label: 'Documents Check',
    description: 'We verify all docs',
    icon: 'FolderOpen'
  },
  {
    stepNumber: 3,
    label: 'Visa Application',
    description: 'We apply online',
    icon: 'FileText'
  },
  {
    stepNumber: 4,
    label: 'Slot Booking',
    description: 'IVAC slot secured',
    icon: 'Calendar'
  },
  {
    stepNumber: 5,
    label: 'Processing',
    description: 'Embassy review',
    icon: 'Clock'
  },
  {
    stepNumber: 6,
    label: 'Delivery',
    description: 'Passport returned',
    icon: 'Package'
  }
];

export const REQUIREMENTS_DATA: Record<string, RequirementGroup[]> = {
  medical: [
    {
      title: 'Medical Documents',
      iconName: 'Activity',
      items: [
        { text: 'Indian Doctor Appointment Letter' },
        { text: 'Bangladesh Medical Documents' }
      ]
    },
    {
      title: 'Applicant Personal Documents',
      iconName: 'User',
      items: [
        { text: 'Passport', note: 'min. 7–8 months validity required' },
        { text: 'GD Copy', note: 'if passport was ever lost' },
        { text: 'National ID Card (NID)' },
        { text: 'Utility Bill' },
        { text: 'All Previous Passports' },
        { text: '2×2 Size Photograph' },
        { text: 'Bank Statement', note: '6 months minimum' },
        { text: 'Solvency Certificate', note: 'not mandatory' },
        { text: 'Trade License / NOC' },
        { text: 'Salary Certificate', note: 'private service holders only' }
      ]
    },
    {
      title: 'Medical Attendant Documents',
      iconName: 'Users',
      items: [
        { text: 'Passport', note: 'min. 7–8 months validity required' },
        { text: 'GD Copy', note: 'if passport was ever lost' },
        { text: 'National ID Card (NID)' },
        { text: 'Utility Bill' },
        { text: 'All Previous Passports' },
        { text: '2×2 Size Photograph' },
        { text: 'Bank Statement', note: '6 months minimum' },
        { text: 'Solvency Certificate', note: 'not mandatory' },
        { text: 'Trade License / NOC' },
        { text: 'Salary Certificate', note: 'private service holders only' }
      ],
      extraAlert: 'Up to 3 medical attendants can accompany the patient.'
    }
  ],
  business: [
    {
      title: 'For Business Owners',
      iconName: 'Briefcase',
      items: [
        { text: 'Passport', note: 'min. 7–8 months validity' },
        { text: 'GD Copy', note: 'if passport was ever lost' },
        { text: 'NID' },
        { text: 'Utility Bill' },
        { text: 'All Previous Passports' },
        { text: '2×2 Size Photograph' },
        { text: 'Personal TIN Certificate' },
        { text: 'Personal E-Return' },
        { text: 'Personal Bank Statement' },
        { text: 'Hotel Booking Confirmation' },
        { text: 'Cover Letter on Company Letterhead' },
        { text: 'Trade License' },
        { text: 'Company TIN Certificate' },
        { text: 'Company E-Return' },
        { text: 'BIN Certificate' },
        { text: 'Company Bank Statement' },
        { text: 'IRC (Import Registration Certificate)' },
        { text: 'LC (Letter of Credit)' },
        { text: 'Chamber of Commerce Certificate' },
        { text: 'Invoice' },
        { text: 'Invitation Letter from Indian Company' }
      ]
    },
    {
      title: 'For Company Employees  ',
      iconName: 'User',
      items: [
        { text: 'Passport', note: 'min. 7–8 months validity' },
        { text: 'GD Copy', note: 'if passport was ever lost' },
        { text: 'NID' },
        { text: 'Utility Bill' },
        { text: 'All Previous Passports' },
        { text: '2×2 Size Photograph' },
        { text: 'Personal TIN Certificate' },
        { text: 'Personal E-Return' },
        { text: 'Personal Bank Statement' },
        { text: 'Hotel Booking Confirmation' },
        { text: 'NOC from Employer' },
        { text: 'Salary Certificate' },
        { text: 'Cover Letter on Company Letterhead' },
        { text: 'Invitation Letter from Indian Company' }
      ]
    }
  ],
  double: [
    {
      title: 'Double Entry Visa Documents',
      iconName: 'RefreshCw',
      items: [
        { text: 'Passport', note: 'min. 7–8 months validity' },
        { text: 'GD Copy', note: 'if passport was ever lost' },
        { text: 'NID' },
        { text: 'Utility Bill' },
        { text: 'All Previous Passports' },
        { text: '2×2 Size Photograph' },
        { text: 'Bank Statement', note: '6 months minimum' },
        { text: 'Work Permit' },
        { text: 'Notary Documents' },
        { text: 'Hotel Booking Confirmation' },
        { text: 'Return Ticket' }
      ]
    }
  ],
  entry: [
    {
      title: 'Applicant Documents',
      iconName: 'User',
      items: [
        { text: 'Passport', note: 'min. 7–8 months validity' },
        { text: 'GD Copy', note: 'if passport was ever lost' },
        { text: 'NID' },
        { text: 'Utility Bill' },
        { text: 'All Previous Passports' },
        { text: '2×2 Size Photograph' },
        { text: 'Financial Proof' },
        { text: 'Marriage Certificate' },
        { text: 'Birth Certificate' },
        { text: 'Affidavit' },
        { text: 'Previous Visit Proof' }
      ]
    },
    {
      title: 'Indian Sponsor Documents',
      iconName: 'ShieldCheck',
      items: [
        { text: 'Indian Passport Copy' },
        { text: 'Aadhaar / PAN Card' },
        { text: 'Address Proof' },
        { text: 'Invitation Letter' }
      ]
    }
  ]
};

export const CHECK_PACKAGES: DocumentCheckPackage[] = [
  {
    title: 'Basic Check',
    badgeText: 'Free',
    badgeStyle: 'free',
    price: 0,
    periodText: '/ one-time',
    description: 'A one-time complimentary check to see if your documents are in order before applying.',
    features: [
      'One-time document review',
      'Basic checklist verification',
      'Feedback via WhatsApp',
      'No commitment required'
    ],
    ctaLabel: 'Book Service'
  },
  {
    title: 'Missing Documents',
    badgeText: 'Popular',
    badgeStyle: 'pro',
    price: 2000,
    periodText: '/ service charge',
    description: 'Multiple rounds of document review. We identify and help you complete any missing documents.',
    features: [
      'Multiple review rounds',
      'Missing documents identified',
      'Guidance to complete missing items',
      'Priority WhatsApp support',
      'Checklist report provided'
    ],
    ctaLabel: 'Book Service',
    isPopular: true
  },
  {
    title: 'Full Documentation',
    badgeText: 'Complete',
    badgeStyle: 'complete',
    price: 5500,
    periodText: '/ service charge',
    description: 'We prepare and provide all required documents based on your visa type — completely done for you.',
    features: [
      'All documents prepared for you',
      'Covers all visa types',
      'Bank statement assistance',
      'NOC & salary certificate preparation',
      'Dedicated support agent',
      'End-to-end document service'
    ],
    ctaLabel: 'Book Service'
  }
];

export const SLOT_SERVICES: SlotService[] = [
  {
    id: 'slot-med',
    category: 'Medical',
    icon: 'Stethoscope',
    title: 'Medical',
    deliveryTime: '5 to 7 days delivery',
    notes: 'Price may vary, contact for the latest rate'
  },
  {
    id: 'slot-bus',
    category: 'Business',
    icon: 'Briefcase',
    title: 'Business',
    deliveryTime: '7 to 10 days delivery',
    notes: 'Price may vary, contact for the latest rate'
  },
  {
    id: 'slot-double',
    category: 'Double Entry',
    icon: 'RefreshCw',
    title: 'Double Entry',
    deliveryTime: '20 to 30 days delivery',
    notes: 'Price may vary, contact for the latest rate'
  },
  {
    id: 'slot-entry',
    category: 'Entry',
    icon: 'DoorOpen',
    title: 'Entry',
    deliveryTime: '20 to 30 days delivery',
    notes: 'Price may vary, contact for the latest rate'
  },
  {
    id: 'slot-tourist',
    category: 'Tourist',
    icon: 'Clock',
    title: 'Tourist',
    isClosed: true,
    notes: 'Embassy has suspended tourist visa services.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Processing time koto din lage?',
    answer: 'সাধারণত ৭–১০ কার্যদিবস লাগে। Medical visa এবং business visa উভয়ের জন্য এই সময়সীমা প্রযোজ্য। তবে embassy পরিস্থিতি অনুযায়ী সময় কম-বেশি হতে পারে।'
  },
  {
    question: 'Slot booking কি refundable?',
    answer: 'না, slot booking fee refundable নয়। একবার slot confirm হয়ে গেলে সেটি cancel বা refund করা সম্ভব নয়। তাই booking এর আগে সব কিছু নিশ্চিত করে নিন।'
  },
  {
    question: 'কী কী documents mandatory?',
    answer: 'Required documents ভিসার ধরন অনুযায়ী আলাদা হয়। সম্পূর্ণ তালিকা আমাদের Requirements section এ পাওয়া যাবে। প্রতিটি ভিসা ক্যাটাগরির জন্য আলাদা আলাদা তালিকা দেওয়া আছে।'
  },
  {
    question: 'Tourist visa কবে open হবে?',
    answer: 'Indian Embassy যেদিন tourist visa চালু করবে, আমরা সেদিন থেকেই service শুরু করব। আপাতত tourist visa temporarily closed। সর্বশেষ আপডেটের জন্য আমাদের Facebook page follow করুন।'
  },
  {
    question: 'Medical attendant কতজন দেওয়া যায়?',
    answer: 'Medical patient এর সাথে সর্বোচ্চ ৩ জন medical attendant দেওয়া যায়। প্রত্যেক attendant কে আলাদাভাবে ভিসার জন্য আবেদন করতে হবে এবং সব documents জমা দিতে হবে।'
  },
  {
    question: 'Original passport কি mandatory?',
    answer: 'হ্যাঁ, original passport mandatory, অবশ্যই লাগবে। কোনো কারণে যদি আগের passport হারিয়ে যায়, তাহলে সেই হারানো passport এর জন্য GD করে GD copy জমা দিতে হবে।'
  },
  {
    question: 'Bank statement minimum কত মাসের লাগবে?',
    answer: 'Bank statement minimum ৬ মাসের প্রয়োজন। ৬ মাসের কম statement embassy accept করে না। সম্ভব হলে ৬ মাসের বেশিও দিতে পারেন, তবে minimum ৬ মাস আবশ্যক।'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 1,
    name: 'Rahim Uddin',
    stars: 5,
    reviewText: '"Meditrip amar medical visa 7 diner moddhe process kore diyeche. Documentation niye kono tension korte hoy nai — shob kichu tara handle koreche. Highly recommended!"',
    avatarInitials: 'R',
    avatarColorClass: 'from-amber-400 to-amber-600',
    visaCategory: 'Medical Visa'
  },
  {
    id: 2,
    name: 'Kamal Hossain',
    stars: 5,
    reviewText: '"Business visa er jonno অনেক documents lagto, tader complete documentation service niye shob sorted hoye gelo. Service charge absolutely worth it. Khub satisfied."',
    avatarInitials: 'K',
    avatarColorClass: 'from-blue-400 to-blue-600',
    visaCategory: 'Business Visa'
  },
  {
    id: 3,
    name: 'Salma Begum',
    stars: 5,
    reviewText: '"Ma er cancer treatment er jonno India jete hoyechilo. Doctor appointment theke medical visa — shob Meditrip handle koreche. Amon trusted service dekhini ager age."',
    avatarInitials: 'S',
    avatarColorClass: 'from-emerald-400 to-emerald-600',
    visaCategory: 'Medical Visa'
  },
  {
    id: 4,
    name: 'Tanvir Ahmed',
    stars: 5,
    reviewText: '"Double entry visa er jonno slot booking khub costly but Meditrip best rate e diyeche. WhatsApp e sobar age update peyechi. Tader sathe kaj kore khub shanti lagche."',
    avatarInitials: 'T',
    avatarColorClass: 'from-purple-400 to-purple-600',
    visaCategory: 'Double Entry Visa'
  },
  {
    id: 5,
    name: 'Nasrin Akter',
    stars: 5,
    reviewText: '"India te bon er kache jete entry visa lagchilo. Meditrip shob documents check kore diyeche, missing items complete kore diyeche. First try te visa peyechi. Thanks!"',
    avatarInitials: 'N',
    avatarColorClass: 'from-pink-400 to-pink-600',
    visaCategory: 'Entry Visa'
  }
];
