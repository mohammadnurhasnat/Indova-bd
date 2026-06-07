import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNav } from './hooks/useNav';
import { useChat } from './hooks/useChat';
import { useGoogleSheets } from './hooks/useGoogleSheets';

import { HeroSection } from './components/HeroSection';
import { TrustMarquee } from './components/TrustMarquee';
import { ServicesSection } from './components/ServicesSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { RequirementsSection } from './components/RequirementsSection';
import { SlotBookingSection } from './components/SlotBookingSection';
import { DoctorAppointmentSection } from './components/DoctorAppointmentSection';
import { PricingSection } from './components/PricingSection';
import { WhyUsSection } from './components/WhyUsSection';
import { FaqSection } from './components/FaqSection';
import { AboutUsSection } from './components/AboutUsSection';
import { ChatBot } from './components/ChatBot';
import { HospitalDetailModal } from './components/HospitalDetailModal';
import { UnifiedModal } from './components/UnifiedModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export default function App() {
  const {
    activeSection,
    mobileMenuOpen,
    setMobileMenuOpen,
    desktopNavDirections,
    mobileNavDirections,
    consultButtonDirection,
    randomizeDesktopNavDirection,
    randomizeMobileNavDirection,
    randomizeConsultButtonDirection,
    handleNavClick,
    navItems
  } = useNav();

  const {
    isChatOpen,
    setIsChatOpen,
    isChatTyping,
    setIsChatTyping,
    chatInput,
    setChatInput,
    chatMessages,
    setChatMessages,
    handleClearChat,
    handleChatSubmit,
    playTypingSound
  } = useChat();

  // Instantiate Google Sheets hooks for lead center administration
  const { sheetsUser } = useGoogleSheets();

  // Selected hospital modal state
  const [selectedHospitalInfo, setSelectedHospitalInfo] = useState<any | null>(null);

  // Skeleton loading states (improves initial perceived performance)
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [checkPrices, setCheckPrices] = useState({ basic_price: 0, standard_price: 2000, premium_price: 5500 });
  const [contact, setContact] = useState<any>(null);
  const [slotPrices, setSlotPrices] = useState({ medical_price: 0, business_price: 0, double_entry_price: 0, entry_price: 0, tourist_price: 0 }); 

  // Selected package state
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // WhatsApp Unified Modal states
  const [waModalOpen, setWaModalOpen] = useState<boolean>(false);
  const [modalName, setModalName] = useState<string>('');
  const [modalPhone, setModalPhone] = useState<string>('');
  const [modalService, setModalService] = useState<string>('General Consultation & Support');
  const [modalCustomMsg, setModalCustomMsg] = useState<string>('');

  useEffect(() => {
    // Simulated initial high-fidelity data loading delay
    const timer = setTimeout(() => {
      setDataLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'contact'));
        if (snap.exists()) setContact(snap.data());
      } catch (err) {
        console.error(err);
      }
    };
    fetchContact();

    const fetchPricing = async () => {
      try {
        const docCheck = await getDoc(doc(db, 'pricing', 'doc_check'));
        if (docCheck.exists()) setCheckPrices(docCheck.data() as any);
        const slot = await getDoc(doc(db, 'pricing', 'slot_booking'));
        if (slot.exists()) setSlotPrices(slot.data() as any);
      } catch (err) {
        console.error('Pricing fetch error:', err);
      }
    };
    fetchPricing();
  }, []);

  // Lock background scroll when the dialog is active
  useEffect(() => {
    if (waModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vw'; // extra lock to prevent mobile rubberband bouncing
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    };
  }, [waModalOpen]);

  const handleOpenUnifiedModal = (defaultService: string, defaultMessage: string = '') => {
    setModalService(defaultService);
    setModalCustomMsg(defaultMessage);
    setWaModalOpen(true);
  };

  const handleCloseUnifiedModal = () => {
    setWaModalOpen(false);
  };

  const handleUnifiedSubmit = (e: React.FormEvent, localName?: string, localPhone?: string) => {
    e.preventDefault();

    // Store local snapshot of values to avoid any race conditions if inputs are cleared
    const targetName = localName !== undefined ? localName : modalName;
    const targetPhone = localPhone !== undefined ? localPhone : modalPhone;
    const targetService = modalService;
    const targetMsg = modalCustomMsg;
    const targetPkg = selectedPackage || 'Standard Plan';
    const guestUid = auth.currentUser?.uid || 'anonymous_guest';

    const id = 'app_' + Math.random().toString(36).substring(2, 11);
    setDoc(doc(db, 'applications', id), {
      id,
      userId: guestUid,
      name: targetName,
      phone: targetPhone,
      visaType: targetService,
      notes: targetMsg || 'Submitted via WhatsApp contact channel.',
      package: targetPkg,
      status: 'pending',
      createdAt: serverTimestamp()
    })
    .then(() => {
      console.log('Submission successfully synchronized with Firebase backend.');
    })
    .catch((err) => {
      console.error('Error writing modal application to Firestore:', err);
    });

    const fullMessage = `Hello Meditrip!\n\nI want to request assistance:\n*Name:* ${targetName || 'Not provided'}\n*Phone/WhatsApp:* ${targetPhone || 'Not provided'}\n*Selected Service:* ${targetService}\n*Message:* ${targetMsg || 'No details provided'}\n\nPlease assist me.`;
    const encodedText = encodeURIComponent(fullMessage);
    
    // Using standard API endpoint which has maximum cross-browser, cross-device, and iframe compatibility
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${contact?.whatsapp || '8801332601510'}&text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
    setWaModalOpen(false);
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col relative overflow-hidden">
      
      {/* ─── LUXURIOUS AMBIENT BACKGROUNDS AND GRADIENT ORBS ─── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[8%] right-[-10vw] w-[60vw] h-[60vw] max-w-[800px] rounded-full bg-sky-500/[0.03] blur-[150px] animate-[radial-pulse_12s_infinite]" />
        <div className="absolute top-[40%] left-[-15vw] w-[50vw] h-[50vw] max-w-[700px] rounded-full bg-purple-500/[0.02] blur-[160px] animate-[radial-pulse_15s_infinite_2s]" />
        <div className="absolute bottom-[10%] right-[10vw] w-[55vw] h-[55vw] max-w-[800px] rounded-full bg-blue-500/[0.03] blur-[140px] animate-[radial-pulse_10s_infinite_4s]" />
        
        {/* Subtle dot pattern grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.025]" 
          style={{ 
            backgroundImage: 'radial-gradient(ellipse 1px 1px at 50% 50%, #000000 100%, transparent 100%)',
            backgroundSize: '36px 36px'
          }} 
        />
      </div>

      <Navbar
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        desktopNavDirections={desktopNavDirections}
        mobileNavDirections={mobileNavDirections}
        consultButtonDirection={consultButtonDirection}
        randomizeDesktopNavDirection={randomizeDesktopNavDirection}
        randomizeMobileNavDirection={randomizeMobileNavDirection}
        randomizeConsultButtonDirection={randomizeConsultButtonDirection}
        handleNavClick={handleNavClick}
        navItems={navItems}
        handleOpenUnifiedModal={handleOpenUnifiedModal}
        setIsChatOpen={setIsChatOpen}
      />

      <HeroSection handleOpenUnifiedModal={handleOpenUnifiedModal} />
      <TrustMarquee />
      <ServicesSection dataLoading={dataLoading} />
      <ProcessTimeline />
      <RequirementsSection handleOpenUnifiedModal={handleOpenUnifiedModal} />
      <SlotBookingSection slotPrices={slotPrices} handleOpenUnifiedModal={handleOpenUnifiedModal} />
      <DoctorAppointmentSection setSelectedHospitalInfo={setSelectedHospitalInfo} handleOpenUnifiedModal={handleOpenUnifiedModal} />
      <PricingSection selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} checkPrices={checkPrices} handleOpenUnifiedModal={handleOpenUnifiedModal} />
      <WhyUsSection />
      <FaqSection />
      <AboutUsSection />

      <Footer
        contact={contact}
        handleOpenUnifiedModal={handleOpenUnifiedModal}
      />

      <ChatBot
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        isChatTyping={isChatTyping}
        setIsChatTyping={setIsChatTyping}
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleChatSubmit={handleChatSubmit}
        handleClearChat={handleClearChat}
        playTypingSound={playTypingSound}
      />

      <HospitalDetailModal
        selectedHospitalInfo={selectedHospitalInfo}
        setSelectedHospitalInfo={setSelectedHospitalInfo}
        handleOpenUnifiedModal={handleOpenUnifiedModal}
      />

      <UnifiedModal
        waModalOpen={waModalOpen}
        handleCloseUnifiedModal={handleCloseUnifiedModal}
        modalService={modalService}
        setModalService={setModalService}
        modalCustomMsg={modalCustomMsg}
        setModalCustomMsg={setModalCustomMsg}
        handleUnifiedSubmit={handleUnifiedSubmit}
      />
    </div>
  );
}
