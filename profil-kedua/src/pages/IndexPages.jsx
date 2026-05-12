import React, { useEffect, useState } from 'react';

import HeroSection from './hero/HeroSection';
import AboutMe from './about/AboutMe';
import SkillStack from './skillstack/SkillStack';
import Experience from './experience/Experience';
import Education from './education/Education';
import Project from './project/Project';
import Certificates from './certificates/Certificates';
import Contact from './contact/Contact';
import Navbar from '../components/navbar/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Preloader from '../components/Preloader'; // <--- Import Navbar lu di sini

import '../css/style.css'; 

import { motion, useScroll, useSpring } from 'motion/react';
import Lenis from 'lenis';

export default function IndexPages() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (window.innerWidth > 768) {
      const lenis = new Lenis({
        duration: 1.2, 
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, []);

    useEffect(() => {
    if (!isLoaded) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isLoaded]);

  return (
    <main className="w-full bg-transparent text-white relative z-10">

      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* --- PANGGIL NAVBAR DI SINI --- */}
      <Navbar />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
        style={{ scaleX }}
      />

      <section id="hero" className="relative w-full min-h-screen flex items-center bg-transparent py-10">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
          <HeroSection />
        </div>
      </section>

      {/* Konten Utama */}
      <section className="relative w-full bg-transparent overflow-hidden">
        {/* FIX JARAK MOBILE: Ganti gap-32 jadi gap-12 md:gap-24 lg:gap-32 */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-12 flex flex-col gap-12 md:gap-24 lg:gap-32 py-10">
          
          {/* scroll-mt juga kita bikin responsive biar pas dipencet dari navbar ga terlalu ke bawah di mobile */}
          <div id="about" className="scroll-mt-24 md:scroll-mt-32"><AboutMe /></div>
          <div id="skills" className="scroll-mt-24 md:scroll-mt-32"><SkillStack /></div>
          <div id="experience" className="scroll-mt-24 md:scroll-mt-32"><Experience /></div>
          <div id="education" className="scroll-mt-24 md:scroll-mt-32"><Education /></div>
          <div id="projects" className="scroll-mt-24 md:scroll-mt-32"><Project /></div>
          <div id="certificates" className="scroll-mt-24 md:scroll-mt-32"><Certificates /></div>
          
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative w-full bg-transparent">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
          <Contact />
        </div>
      </section>
      <ScrollToTop />
      
    </main>
  );
}