import { useState, useEffect, useRef } from 'react';

export const navItems = [
  { label: 'Home', href: '#hero', sectionId: 'hero', color: '#EF4444' }, // Red
  { label: 'Services', href: '#processing', sectionId: 'processing', color: '#FBBF24' }, // Yellow
  { label: 'Requirements', href: '#requirements', sectionId: 'requirements', color: '#10B981' }, // Green
  { label: 'Slot Booking', href: '#slot-booking', sectionId: 'slot-booking', color: '#FBBF24' }, // Yellow
  { label: 'Appointment', href: '#doctor-appointment', sectionId: 'doctor-appointment', color: '#10B981' }, // Green
  { label: 'Free Doc Check', href: '#check-documents', sectionId: 'check-documents', color: '#EF4444' }, // Red
  { label: 'About', href: '#about', sectionId: 'about', color: '#EF4444' } // Red
];

export function useNav() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isManualScroll = useRef<boolean>(false);
  const scrollTimeout = useRef<any>(null);

  // Dynamic random slide directions for nav items to animate from "every angle" dynamically on hover
  const [desktopNavDirections, setDesktopNavDirections] = useState<Record<number, string>>({
    0: "translate-y-full",
    1: "-translate-x-full",
    2: "-translate-y-full",
    3: "translate-x-full",
    4: "translate-y-full",
    5: "-translate-x-full",
    6: "-translate-y-full"
  });

  const [mobileNavDirections, setMobileNavDirections] = useState<Record<number, string>>({
    0: "translate-y-full",
    1: "-translate-x-full",
    2: "-translate-y-full",
    3: "translate-x-full",
    4: "translate-y-full",
    5: "-translate-x-full",
    6: "-translate-y-full"
  });

  const [consultButtonDirection, setConsultButtonDirection] = useState<string>("translate-y-full");

  const randomizeDesktopNavDirection = (index: number) => {
    const options = [
      "translate-y-full",
      "-translate-x-full",
      "-translate-y-full",
      "translate-x-full"
    ];
    const newDir = options[Math.floor(Math.random() * options.length)];
    setDesktopNavDirections(prev => ({ ...prev, [index]: newDir }));
  };

  const randomizeMobileNavDirection = (index: number) => {
    const options = [
      "translate-y-full",
      "-translate-x-full",
      "-translate-y-full",
      "translate-x-full"
    ];
    const newDir = options[Math.floor(Math.random() * options.length)];
    setMobileNavDirections(prev => ({ ...prev, [index]: newDir }));
  };

  const randomizeConsultButtonDirection = () => {
    const options = [
      "translate-y-full",
      "-translate-x-full",
      "-translate-y-full",
      "translate-x-full"
    ];
    const newDir = options[Math.floor(Math.random() * options.length)];
    setConsultButtonDirection(newDir);
  };

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    isManualScroll.current = true;
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 850);
  };

  // Synchronically detect active section based on scroll position in viewport
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll.current) return;

      const sections = ['hero', 'processing', 'requirements', 'check-documents', 'slot-booking', 'doctor-appointment', 'about'];
      let bestSection = '';
      let maxVisibleHeight = 0;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const topVisible = Math.max(rect.top, 0);
          const bottomVisible = Math.min(rect.bottom, window.innerHeight);
          const visibleHeight = Math.max(0, bottomVisible - topVisible);
          
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            bestSection = id;
          }
        }
      });

      const viewportMid = window.innerHeight * 0.4;
      let activeId = '';
      
      const activeEl = document.elementFromPoint(window.innerWidth / 2, viewportMid);
      if (activeEl) {
        const closestSection = activeEl.closest('section');
        if (closestSection && closestSection.id) {
          activeId = closestSection.id;
        }
      }

      if (activeId && sections.includes(activeId)) {
        setActiveSection(activeId);
      } else if (activeId && !sections.includes(activeId)) {
        setActiveSection('');
      } else {
        if (maxVisibleHeight > window.innerHeight * 0.25 && sections.includes(bestSection)) {
          setActiveSection(bestSection);
        } else {
          setActiveSection('');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    activeSection,
    setActiveSection,
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
  };
}
