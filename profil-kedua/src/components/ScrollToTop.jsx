import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > window.innerHeight * 0.8) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const scrollToTop = () => {
    // 1. Kunci interaksi cuma di area konten (Sama persis kayak Navbar)
    const sectionsToLock = ['about', 'skills', 'experience', 'education', 'projects', 'certificates', 'contact'];
    
    sectionsToLock.forEach(secId => {
      const secEl = document.getElementById(secId);
      if (secEl) secEl.style.pointerEvents = 'none';
    });

    // 2. Trik Jitu: Pake scrollIntoView ngarah ke id="hero" (Bukan window.scrollTo)
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback jaga-jaga kalo id="hero" ga ketemu
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 3. Nyalain lagi sensornya pas scroll beres
    setTimeout(() => {
      sectionsToLock.forEach(secId => {
        const secEl = document.getElementById(secId);
        if (secEl) secEl.style.pointerEvents = ''; 
      });
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 150, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, y: 150, rotate: 180 }}
          transition={{ type: "spring", stiffness: 500, damping: 15, mass: 1 }}
          
          whileHover={{ 
            scale: 1.15, 
            boxShadow: "0px 0px 25px rgba(168,85,247,0.9)",
            rotate: 5
          }}
          whileTap={{ scale: 0.7, rotate: -10 }}
          
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-xl border border-white/20 group overflow-hidden cursor-pointer"
        >
          <svg 
            className="w-6 h-6 md:w-7 md:h-7 relative z-10 transition-transform duration-300 group-hover:-translate-y-1 pointer-events-none" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity delay-100 pointer-events-none"></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}