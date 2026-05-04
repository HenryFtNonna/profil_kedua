import React, { useEffect } from 'react';
import HeroSection from './hero/HeroSection';
import AboutMe from './about/AboutMe';
import SkillStack from './skillstack/SkillStack';
import Experience from './experience/Experience';
import Education from './education/Education';
import Project from './project/Project'; // <--- Update path folder di sini

import { motion, useScroll, useSpring } from 'motion/react';
import Lenis from 'lenis';

export default function IndexPages() {
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      wheelMultiplier: 1, 
      touchMultiplier: 2, 
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="w-full bg-transparent text-white relative z-10">

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
        style={{ scaleX }}
      />

      {/* Hero */}
      <section id="hero" className="relative w-full min-h-screen flex items-center bg-transparent py-20">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
          <HeroSection />
        </div>
      </section>

      {/* About & SkillStack Container */}
      <section id="about" className="relative w-full min-h-screen flex items-center bg-transparent py-20">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col">
          <AboutMe/>
          {/* SkillStack gw masukin di container yang sama biar ga kejauhan gap-nya */}
          <SkillStack/>
          <Experience/>
          <Education/>
          <Project/>  
        </div>
      </section>
      
    </main>
  );
}