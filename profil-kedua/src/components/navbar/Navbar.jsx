import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { name: 'Home', id: 'hero', num: '01', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
    { name: 'About', id: 'about', num: '02', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
    { name: 'Projects', id: 'projects', num: '03', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /> },
    { name: 'Certificates', id: 'certificates', num: '04', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /> },
    { name: 'Contact', id: 'contact', num: '05', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + (window.innerHeight / 3);
      let currentSection = 'hero';

      for (let i = 0; i < navItems.length; i++) {
        const section = document.getElementById(navItems[i].id);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= sectionTop - 100) { 
            currentSection = navItems[i].id;
          }
        }
      }

      if (window.scrollY < 50) {
        currentSection = 'hero';
      }

      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        currentSection = 'contact';
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    
    if (element) {
      // 1. Kunci interaksi HANYA di bagian konten, JANGAN di navbar/body
      const sectionsToLock = ['about', 'skills', 'experience', 'education', 'projects', 'certificates', 'contact'];
      
      sectionsToLock.forEach(secId => {
        const secEl = document.getElementById(secId);
        if (secEl) secEl.style.pointerEvents = 'none';
      });

      // 2. SCROLL KE TUJUAN
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);

      // 3. NYALAIN LAGI SENSORNYA PAS SCROLL BERES
      setTimeout(() => {
        sectionsToLock.forEach(secId => {
          const secEl = document.getElementById(secId);
          // Hapus style inline biar balik ke normal
          if (secEl) secEl.style.pointerEvents = ''; 
        });
      }, 1200);
    }
  };

  const slimePhysics = { type: "spring", stiffness: 350, damping: 25 };

  return (
    <>
      {/* --- DESKTOP NAVBAR (VERSI COMPACT) --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        // px-2 py-2 gw kecilin jadi px-1 py-1 biar lebih slim
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#0a0a0a]/60 backdrop-blur-lg border border-gray-800/80 rounded-full px-1 py-1 items-center gap-1 shadow-2xl"
      >
        <div 
          onClick={() => scrollToSection('hero')}
          // px-4 py-2 dikecilin jadi px-3 py-1.5
          className="flex items-center gap-2 px-3 py-1.5 cursor-pointer group"
        >
          {/* Logo w-8 h-8 dikecilin jadi w-7 h-7 */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-[10px] shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform">
            M
          </div>
          <span className="font-black tracking-widest text-white text-xs uppercase">Mohan</span>
        </div>

        <div className="w-[1px] h-5 bg-gray-800 mx-1"></div>

        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              layout
              onClick={() => scrollToSection(item.id)}
              // Padding tombol px-4 py-2.5 dikecilin jadi px-3 py-1.5
              className={`relative flex items-center justify-center px-3 py-1.5 rounded-full transition-colors duration-300 ${
                activeSection === item.id 
                  ? 'text-blue-400' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {activeSection === item.id && (
                <motion.div 
                  layoutId="desktopSlime" 
                  className="absolute inset-0 bg-blue-500/10 border border-blue-500/30 rounded-full z-0"
                  transition={slimePhysics}
                />
              )}

              <div className="relative z-10 flex items-center gap-2">
                {/* Icon w-5 h-5 dikecilin jadi w-4 h-4 */}
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
                
                <AnimatePresence>
                  {activeSection === item.id && (
                    <motion.span 
                      initial={{ width: 0, opacity: 0, marginLeft: -6 }}
                      animate={{ width: "auto", opacity: 1, marginLeft: 0 }}
                      exit={{ width: 0, opacity: 0, marginLeft: -6 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      // Text dikecilin dikit jadi text-[10px] atau tetep text-xs
                      className="text-[10px] font-bold tracking-widest uppercase overflow-hidden whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* --- MOBILE NAVBAR (VERSI COMPACT) --- */}
      <motion.nav
        layout
        className={`md:hidden fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-800/80 flex items-center justify-between p-1 shadow-2xl transition-all duration-500 overflow-hidden ${
          // Bulatan awal w-14 dikecilin jadi w-12, max-width ditarik jadi 280px aja
          !isScrolled ? 'w-12 rounded-full' : 'w-[85vw] max-w-[280px] rounded-full px-2'
        }`}
      >
        <AnimatePresence>
          {isScrolled && (
            <motion.div 
              initial={{ opacity: 0, x: -20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "auto" }}
              exit={{ opacity: 0, x: -20, width: 0 }}
              className="flex items-center gap-2 pl-2 overflow-hidden"
            >
              {/* Logo w-8 h-8 jadi w-7 h-7 */}
              <div className="w-7 h-7 rounded-full shrink-0 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-black text-[10px] shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                M
              </div>
              <span className="font-black tracking-widest text-white text-xs uppercase shrink-0">Mohan</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          // Tombol hamburger w-11 h-11 dikecilin jadi w-10 h-10
          className={`w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1 transition-colors shrink-0 ${
            isOpen ? 'bg-blue-500/20 text-blue-400' : 'bg-transparent text-white hover:bg-white/10'
          }`}
        >
          {/* Garis hamburger w-5 jadi w-4, jarak Y pas disilang (isOpen ? 5) disesuaikan biar pas */}
          <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }} className="w-4 h-[2px] bg-current rounded-full origin-center transition-all"></motion.div>
          <motion.div animate={{ opacity: isOpen ? 0 : 1 }} className="w-4 h-[2px] bg-current rounded-full transition-all"></motion.div>
          <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }} className="w-4 h-[2px] bg-current rounded-full origin-center transition-all"></motion.div>
        </button>
      </motion.nav>

{/* --- MOBILE DROPDOWN (VERSI COMPACT) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            // top-24 naik dikit jadi top-20. max-w disamain kayak navbar 280px. p-4 dikecilin jadi p-2. gap-2 jadi gap-1
            className="md:hidden fixed top-20 left-1/2 -translate-x-1/2 z-[90] w-[85vw] max-w-[280px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-gray-800 rounded-2xl p-2 shadow-2xl flex flex-col gap-1"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                // px-4 py-4 didietin jadi px-3 py-3, rounded-xl jadi rounded-lg biar rapi
                className={`flex items-center justify-between px-3 py-3 rounded-lg transition-colors duration-300 relative overflow-hidden group ${
                  activeSection === item.id ? 'text-blue-400' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {activeSection === item.id && (
                  <>
                    <motion.div 
                      layoutId="mobileSlimeBg" 
                      className="absolute inset-0 bg-blue-500/10 z-0" 
                      transition={slimePhysics}
                    />
                    {/* Garis slime samping gw tipisin dikit dari w-1 jadi w-[3px] */}
                    <motion.div 
                      layoutId="mobileSlimeLine" 
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-500 rounded-r-md z-10" 
                      transition={slimePhysics}
                    />
                  </>
                )}

                <div className="relative z-10 flex items-center gap-3">
                  {/* Icon w-5 h-5 dikecilin jadi w-4 h-4 */}
                  <svg className={`w-4 h-4 ${activeSection === item.id ? 'text-blue-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                  {/* text-sm dikecilin jadi text-xs */}
                  <span className="font-black tracking-widest text-xs uppercase">
                    {item.name}
                  </span>
                </div>

                {/* Nomor 01, 02 text-xs dikecilin jadi text-[10px] */}
                <span className="relative z-10 font-mono text-[10px] text-gray-600 group-hover:text-gray-400 transition-colors">
                  {item.num}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}