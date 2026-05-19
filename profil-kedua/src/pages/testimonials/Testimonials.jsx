import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image1 from '../../assets/ceomatrix.png';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = Next, -1 = Prev

  // PLACEHOLDER DATA: Nanti lu ganti isinya di sini ya dawg
  const testimonials = [
    {
      name: "Isthifa-ul Mawaddah",
      title: "CEO, Matrix Data Corp",
      quote: "Overall sangat puas dengan hasil pengerjaan website Matrix. Semua request yang saya inginkan dikerjakan dengan baik, bahkan banyak detail dan hasil akhirnya yang melebihi ekspektasi saya. Proses komunikasinya juga enak, responsif, dan benar-benar memperhatikan kebutuhan perusahaan. Terima kasih sudah membantu merealisasikan website yang profesional dan sesuai visi kami.",
      image: Image1 
    },
    {
      name: "Muhammad Muchson Attoyibi",
      title: "Mentee, Alterra Academy",
      quote: "Mohan built a clean, responsive, and performant web application for us. Communication was smooth throughout. Highly recommended for any frontend needs.",
      image: "https://placehold.co/150x150/111/white?text=CN"
    }
  ];

  // Fungsi Next & Prev dengan Infinite Loop
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Logic Animasi Geser Kanan-Kiri
  const slideVariants = {
    hidden: (dir) => ({
      x: dir > 0 ? 100 : -100, // Halusin jarak geser biar ringan
      opacity: 0,
      scale: 0.95 // Tambahin efek scale dikit biar estetik
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
    })
  };

  return (
    <div className="w-full relative">
      
      {/* Title Animasi "Patented" Style */}
      <motion.div 
        initial={{ opacity: 0, x: -30, skewX: 10 }}
        whileInView={{ opacity: 1, x: 0, skewX: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex flex-col sm:flex-row sm:items-center gap-4 mb-16"
      >
        <div className="inline-block border border-gray-700 bg-gray-900 px-4 py-1.5 rounded-full overflow-hidden relative group cursor-default">
          <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative text-xs font-mono text-gray-400 tracking-widest uppercase group-hover:text-white transition-colors">
            07. Testimonials
          </span>
        </div>
        {/* <span className="text-gray-500 text-sm font-mono cursor-default">
          // What people are saying
        </span> */}
      </motion.div>

      {/* Main Container dengan Tombol Navigasi Kanan Kiri */}
      <div className="relative px-4 lg:px-5 w-full max-w-6xl mx-auto flex items-center justify-center min-h-[350px]">
        
        {/* Tombol PREV (Kiri) - Style disesuain sama slider Sertifikat */}
        <button 
          onClick={handlePrev}
          className="absolute left-0 lg:-left-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#111]/80 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.8)] z-20 group"
        >
          <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        {/* Carousel Area dengan AnimatePresence */}
        <div className="w-full overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* CARD TESTIMONI PREMIUM GEIST STYLE */}
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full bg-[#111] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center gap-10 lg:gap-12 cursor-default group hover:border-gray-600 transition-colors duration-500"
            >
              
              {/* SISI KIRI: Foto Profil dengan Border Aksen */}
              <div className="relative shrink-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-600/30 blur-[40px] rounded-full z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name} 
                  className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-2 border-gray-700 shadow-xl"
                />
              </div>

              {/* SISI KANAN: Teks Quote, Nama, Jabatan */}
              <div className="flex flex-col text-center lg:text-left flex-1 relative z-10">
                
                {/* Quote Icons */}
                <svg className="absolute -top-6 -left-6 lg:-left-10 w-12 h-12 text-blue-500/10" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8v8H6v6h6V8h-2zm12 0v8h-4v6h6V8h-2z"/>
                </svg>

                {/* Quote Teks - Pake font-sans (Geist Sans) biar clean */}
                <p className="text-gray-300 text-md md:text-xl leading-relaxed tracking-tight mb-8 font-sans">
                  "{testimonials[currentIndex].quote}"
                </p>

                {/* Info Client - Nama pake font-display, Title pake font-mono */}
                <div className="mt-auto">
                  <p className="text-xl md:text-2xl font-display font-bold text-white tracking-wide">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm md:text-xs font-mono text-gray-500 mt-1 uppercase tracking-widest">
                    {testimonials[currentIndex].title}
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tombol NEXT (Kanan) */}
        <button 
          onClick={handleNext}
          className="absolute right-0 lg:-right-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#111]/80 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.8)] z-20 group"
        >
          <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

      </div>

      {/* Indikator Halaman (Dots) reuse style dari slider Sertifikat */}
      <div className="flex gap-2.5 justify-center mt-12">
        {testimonials.map((_, i) => (
          <span 
            key={i} 
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-gray-700'}`}
          ></span>
        ))}
      </div>

    </div>
  );
}