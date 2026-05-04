import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      // Kita kurangi 10px biar kursor pas di tengah titiknya (ukuran kursor kita w-5,h-5 adalah 20x20)
      cursorX.set(e.clientX - 10); 
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      // --- UPDATE UTAMA: PERLUAS DETEKSI HOVER ---
      // Kita bikin dua selector, satu buat tombol/link interaktif, satu buat teks biasa
      const interactiveSelector = 'a, button';
      // Kita targetin semua tag teks yang umum (h1 s/d h6, p, span, li)
      const textSelector = 'p, h1, h2, h3, h4, h5, h6, li, span';
      
      // Kita cek, kalo menyentuh elemen interaktif ATAU elemen teks wrapped
      if (e.target.closest(interactiveSelector) || e.target.closest(textSelector)) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <motion.div
      // Putih solid, no border/glow
      className="fixed top-0 left-0 w-5 h-5 rounded-full bg-white z-[9999] pointer-events-none flex items-center justify-center"
      style={{
        x: smoothX,
        y: smoothY,
        // The magic x-ray/mask blend mode
        mixBlendMode: "difference" 
      }}
      animate={{
        // Large scale when over text/buttons (sama gede kayak di buttons sekarang)
        scale: isHovering ? 3.5 : 1,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
}