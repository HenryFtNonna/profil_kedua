import React, { useEffect } from 'react';
import HeroSection from './hero/HeroSection';
import AboutMe from './about/AboutMe';
import '../css/style.css'; 

// Import Framer Motion buat Progress Bar
import { motion, useScroll, useSpring } from 'motion/react';
// Import Lenis buat efek momentum scroll ala sosmed HP
import Lenis from 'lenis';

export default function IndexPages() {
  
  // --- LOGIC 1: SCROLL PROGRESS BAR ---
  const { scrollYProgress } = useScroll();
  // Pake useSpring biar pergerakan bar-nya mantul halus, ga kaku
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- LOGIC 2: LENIS SMOOTH SCROLL ---
  useEffect(() => {
    // Inisialisasi Lenis dengan settingan momentum yang pas
    const lenis = new Lenis({
      duration: 1.2, // Makin gede angkanya, makin pelan dan panjang momentumnya
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function biar smooth
      smoothWheel: true,
      wheelMultiplier: 1, // Kecepatan scroll mouse
      touchMultiplier: 2, // Kecepatan scroll kalo pake touchpad/layar sentuh
    });

    // Fungsi loop biar Lenis terus sinkron sama animasi frame browser
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup: Matiin Lenis pas pindah halaman biar ga memory leak
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="w-full bg-transparent text-white relative z-10">

      {/* === SCROLL PROGRESS BAR NEON === */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section id="hero" className="relative w-full min-h-screen flex items-center bg-transparent py-20">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
          <HeroSection />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative w-full min-h-screen flex items-center bg-transparent py-20">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
          <AboutMe/>
        </div>
      </section>
      
    </main>
  );
}