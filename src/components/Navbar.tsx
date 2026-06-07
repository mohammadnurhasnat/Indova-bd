import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  sectionId: string;
  color: string;
}

interface NavbarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  desktopNavDirections: Record<number, string>;
  mobileNavDirections: Record<number, string>;
  consultButtonDirection: string;
  randomizeDesktopNavDirection: (index: number) => void;
  randomizeMobileNavDirection: (index: number) => void;
  randomizeConsultButtonDirection: () => void;
  handleNavClick: (sectionId: string) => void;
  navItems: NavItem[];
  handleOpenUnifiedModal: (defaultService: string, defaultMessage?: string) => void;
  setIsChatOpen: (open: boolean) => void;
}

export function Navbar({
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
  navItems,
  handleOpenUnifiedModal,
  setIsChatOpen
}: NavbarProps) {
  return (
    <>
      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav id="navbar" className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/50 backdrop-blur-xl border-b border-black/[0.06] transition-all duration-300 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between">
          
          {/* Logo brand - Modern text-based typography logo in solid black */}
          <a href="#hero" className="flex items-center gap-1.5 group cursor-pointer select-none">
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-black">
              Meditrip
            </span>
          </a>

          {/* Desktop Navigation links */}
          <div className="hidden lg:flex items-center gap-1 bg-black/[0.02] border border-black/[0.05] rounded-[10px] p-1.5 backdrop-blur-md">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.sectionId;
              const slideClass = desktopNavDirections[index] || "translate-y-full";

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative overflow-hidden px-4 py-2 rounded-[10px] font-display font-medium text-xs tracking-wide transition-all duration-[600ms] outline-none focus:outline-none border group hover:-translate-y-0.5 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm font-semibold border-[#059669]'
                      : 'text-slate-600 bg-black/[0.04] border-transparent'
                  }`}
                  onClick={() => handleNavClick(item.sectionId)}
                  onMouseEnter={() => randomizeDesktopNavDirection(index)}
                >
                  <span className={`absolute inset-0 w-full h-full bg-[#059669] transition-transform duration-[600ms] transform ${slideClass} group-hover:translate-x-0 group-hover:translate-y-0 ease-out z-0`}></span>
                  <span className="relative z-10 transition-colors duration-[600ms] group-hover:text-white">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Nav Right CTA Button - Beautiful Black to White Hover Inversion */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleOpenUnifiedModal("General Visa Consultation", "Hello Meditrip, I would like to get a visa consultation support from you.")}
              onMouseEnter={randomizeConsultButtonDirection}
              className="relative overflow-hidden inline-flex items-center gap-2 bg-emerald-50 text-[#059669] border border-emerald-200/95 font-display font-semibold text-xs tracking-wider uppercase px-5 py-3 rounded-[10px] transition-all duration-[600ms] hover:-translate-y-0.5 shadow-sm hover:shadow-md outline-none cursor-pointer group"
            >
              <span className={`absolute inset-0 w-full h-full bg-[#059669] transition-transform duration-[600ms] transform ${consultButtonDirection} group-hover:translate-x-0 group-hover:translate-y-0 ease-out z-0`}></span>
              <span className="relative z-10 transition-colors duration-[600ms] group-hover:text-white flex items-center gap-2">
                Consult Now
              </span>
            </button>
          </div>

          {/* Hamburger Mobile Toggle icon */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden flex items-center gap-1 p-2 border border-black/[0.05] bg-slate-50 hover:bg-slate-100 rounded-[5px] transition-all duration-300 shadow-sm"
            aria-label="Toggle mobile menu"
            id="mobile-drawer-toggle"
          >
            <span className="w-2 h-2 rounded-full bg-[#EF4444] shadow-[0_0_5px_rgba(239,68,68,0.35)]" />
            <span className="w-2 h-2 rounded-full bg-[#FBBF24] shadow-[0_0_5px_rgba(251,191,36,0.35)]" />
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_5px_rgba(16,185,129,0.35)]" />
          </button>
        </div>
      </nav>

      {/* ═══════════════ MOBILE DRAWER ═══════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay - Fully Transparent without blur or darken */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-transparent"
            />

            {/* Premium Drawer Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3, y: -20, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.3, y: -20, x: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="fixed right-4 top-20 z-[101] w-full max-w-[310px] bg-white border border-slate-200 shadow-2xl rounded-[24px] flex flex-col items-center overflow-hidden max-h-[calc(100vh-8rem)]"
              style={{
                transformOrigin: "top right"
              }}
              id="mobile-drawer-popup"
            >
              {/* Inner container to hold menu items */}
              <div className="w-full bg-white rounded-[23px] p-5 flex flex-col items-center overflow-y-auto max-h-[calc(100vh-8.5rem)] relative">
                {/* Radial underlying glows for mobile modal feel */}
                <div className="absolute top-[-55px] w-60 h-60 rounded-full bg-sky-500/[0.04] blur-3xl pointer-events-none" />

                <div className="w-full flex items-center justify-end z-10 pb-2 border-b border-black/[0.06] mb-3">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-7 h-7 rounded-full bg-white/60 border border-black/10 hover:border-black/20 text-slate-700 hover:text-black flex items-center justify-center transition-all duration-300"
                  >
                    <X size={13} />
                  </button>
                </div>

                <div className="w-full flex flex-col gap-1 z-10">
                  {navItems.map((item, index) => {
                    const slideClass = mobileNavDirections[index] || "translate-y-full";

                    return (
                      <motion.a
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          handleNavClick(item.sectionId);
                          setMobileMenuOpen(false);
                        }}
                        onMouseEnter={() => randomizeMobileNavDirection(index)}
                        className={`relative overflow-hidden w-full py-2.5 px-4 rounded-xl font-display font-bold text-sm flex items-center justify-between border transition-all duration-[600ms] outline-none focus:outline-none group hover:-translate-y-0.5 ${
                          activeSection === item.sectionId
                            ? 'bg-slate-50 border-black/[0.04] text-slate-900 shadow-sm'
                            : 'text-slate-600 border-transparent'
                        }`}
                      >
                        {/* Interactive slide background */}
                        <span className={`absolute inset-0 w-full h-full bg-[#059669] transition-transform duration-[600ms] transform ${slideClass} group-hover:translate-x-0 group-hover:translate-y-0 ease-out z-0`}></span>
                        
                        <span className="relative z-10 flex items-center gap-2.5 group-hover:text-white transition-colors duration-300">
                          {activeSection === item.sectionId ? (
                            <motion.span
                              layoutId="activeDot"
                              className="w-2.5 h-2.5 rounded-full shrink-0 relative flex items-center justify-center"
                            >
                              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: item.color }} />
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                            </motion.span>
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-300/40 shrink-0" />
                          )}
                          <span>{item.label}</span>
                        </span>
                        {activeSection === item.sectionId && (
                          <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-black/[0.03] text-slate-500 scale-[0.85] origin-right">
                            Active
                          </span>
                        )}
                      </motion.a>
                    );
                  })}

                  {/* Premium Direct Support Chat Button directly in mobile menu */}
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: navItems.length * 0.05 } }}
                    onClick={() => {
                      setIsChatOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full mt-3 py-3 px-4 rounded-xl font-display font-black text-xs bg-gradient-to-tr from-[#fef08a] to-[#bbf7d0] text-emerald-950 border border-emerald-400/20 shadow-md flex items-center justify-between transition-all outline-none focus:outline-none cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      <span>Meditrip Assistant</span>
                    </span>
                    <MessageSquare size={13} className="text-emerald-950" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
