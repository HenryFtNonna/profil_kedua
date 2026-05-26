import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import Image1 from '../../assets/certificates/alterra1.jpg';
import Image2 from '../../assets/certificates/alterra2.jpg';
import Image3 from '../../assets/certificates/CCNAN.jpg';
import Image4 from '../../assets/certificates/CCNAS.jpg';
import Image5 from '../../assets/certificates/KPPS.jpg';
import Image6 from '../../assets/certificates/Medic.jpg';
import Image7 from '../../assets/certificates/blkk.jpg';
import Image8 from '../../assets/certificates/maganghub.jpg';

// --- KOMPONEN KHUSUS 3D HOVER CARD ---
const CertificateCard = ({ cert, index, onClick }) => {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.1 }}
      style={{ perspective: 1000 }} 
      className="w-full h-full"
    >
      {/* UPDATE 1: Ganti motion.a jadi motion.div, hapus href, pake onClick */}
      <motion.div
        ref={cardRef}
        onClick={() => onClick(cert)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="block relative w-full h-full bg-[#111] border border-gray-800 rounded-2xl p-6 md:p-8 cursor-pointer group shadow-xl transition-colors hover:border-gray-600"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-2xl transition-colors duration-500 z-0"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20 group-hover:shadow-blue-500/40 transition-shadow">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
          </div>

          <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {cert.title}
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-400 font-mono text-[12px]">{cert.issuer}</span>
            <span className="w-1 h-1 rounded-full bg-gray-700"></span>
            <span className="text-gray-500 font-mono text-sm">{cert.year}</span>
          </div>
          
          <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-grow group-hover:text-gray-400 transition-colors">
            {cert.desc}
          </p>

          <div className="mt-auto flex items-center gap-2 font-mono text-xs font-bold text-blue-500 tracking-widest uppercase opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            View Certificate
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};


export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  
  // State buat Modal Gambar
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // State buat Navigasi Grid (Kanan-Kiri)
  const [currentGridPage, setCurrentGridPage] = useState(0);
  const itemsPerPage = 6; // Tetep 6 item (2 baris x 3 kolom)

  useEffect(() => {
    if (selectedCert) {
      document.documentElement.style.overflow = 'hidden';
      setCurrentImageIndex(0); 
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [selectedCert]);

  // Handler buat Modal Gambar
  const handleNextImage = (e) => {
    e.stopPropagation(); 
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % selectedCert.images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation(); 
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev === 0 ? selectedCert.images.length - 1 : prev - 1));
  };

  const slideVariants = {
    hidden: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0, transition: { duration: 0.2 } })
  };

  const certificates = [
    {
      title: "Studi Independen Front-End Engineering",
      issuer: "Alterra Academy",
      year: "2024",
      desc: "Sertifikat kelulusan program MSIB dengan fokus pada pengembangan antarmuka web modern menggunakan ekosistem ReactJS.",
      images: [Image1, Image2]
    },
    {
      title: "CCNA v7: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      year: "2023",
      desc: "Sertifikasi keahlian dalam merancang, mengkonfigurasi, dan memelihara arsitektur jaringan komputer dan routing dasar.",
      images: [Image3]
    },
    {
      title: "CCNA v7: Switching, Routing...",
      issuer: "Cisco Networking Academy",
      year: "2023",
      desc: "Sertifikasi keahlian dalam operasional switch, optimasi inter-VLAN routing, dan manajemen dasar teknologi wireless.",
      images: [Image4]
    },
    {
      title: "Kemnaker - Sertifikat MagangHub",
      issuer: "Kemnaker RI - MagangHub",
      year: "2026",
      desc: "Sertifikasi atas keberhasilan menyelesaikan program magang kerja sebagai web developer di MagangHub, platform resmi Kementerian Ketenagakerjaan Republik Indonesia.",
      images: [Image8]
    },
    {
      title: "Volunteer Certificate - Amikom Fest",
      issuer: "Universitas Amikom Yogyakarta",
      year: "2023",
      desc: "Sertifikasi atas peran aktif sebagai tenaga medis lapangan dalam melakukan pemantauan kondisi kesehatan peserta.",
      images: [Image6]
    },
    {
      title: "Sertifikat Pelatihan Kerja",
      issuer: "BLKK Amumarta",
      year: "2025",
      desc: "Sertifikasi pelatihan kerja sebagai web developer di Balai Latihan Kerja Komunitas Amumarta.",
      images: [Image7]
    },
     {
      title: "Piagam Penghargaan Anggota KPPS",
      issuer: "Komisi Pemilihan Umum (KPU)",
      year: "2024",
      desc: "Penghargaan atas dedikasi dalam menjalankan tugas sebagai penyelenggara pemungutan dan penghitungan suara pada Pemilu.",
      images: [Image5]
    },
  ];

  // Logika Potong Array buat Navigasi Kanan-Kiri
  const totalPages = Math.ceil(certificates.length / itemsPerPage);
  
  const currentCertificates = certificates.slice(
    currentGridPage * itemsPerPage,
    (currentGridPage + 1) * itemsPerPage
  );

  // Bikin array selalu isi 6 (Disumpel Kotak Hantu)
  const paddedCertificates = Array.from({ length: itemsPerPage }, (_, i) => currentCertificates[i] || null);

return (
    <div className="w-full relative">
      
      <motion.div 
        initial={{ opacity: 0, x: -30, skewX: 10 }}
        whileInView={{ opacity: 1, x: 0, skewX: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12"
      >
        <div className="inline-block border border-gray-700 bg-gray-900 px-4 py-1.5 rounded-full overflow-hidden relative group cursor-default">
          <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative text-xs font-mono text-gray-400 tracking-widest uppercase group-hover:text-white transition-colors">
            06. Certificates
          </span>
        </div>
      </motion.div>

      {/* CONTAINER UTAMA */}
      <div className="relative w-full max-w-[1400px] mx-auto">

        {/* TOMBOL KIRI (DESKTOP ONLY) - Pake hidden md:flex */}
        {totalPages > 1 && (
          <button
            onClick={() => setCurrentGridPage(prev => Math.max(0, prev - 1))}
            disabled={currentGridPage === 0}
            className={`hidden md:flex absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] backdrop-blur-md group ${
              currentGridPage === 0 
                ? 'opacity-0 pointer-events-none' 
                : 'text-gray-400 bg-[#111]/80 border border-gray-700 hover:border-white hover:text-white cursor-pointer'
            }`}
          >
            <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        )}

        {/* Grid List */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]">
          {paddedCertificates.map((cert, index) => (
            cert ? (
              <CertificateCard key={`${cert.title}-${index}`} cert={cert} index={index} onClick={setSelectedCert} />
            ) : (
              <div key={`empty-${index}`} className="w-full h-[350px] pointer-events-none hidden md:block"></div>
            )
          ))}
        </div>

        {/* TOMBOL KANAN (DESKTOP ONLY) - Pake hidden md:flex */}
        {totalPages > 1 && (
          <button
            onClick={() => setCurrentGridPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentGridPage === totalPages - 1}
            className={`hidden md:flex absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] backdrop-blur-md group ${
              currentGridPage === totalPages - 1 
                ? 'opacity-0 pointer-events-none' 
                : 'text-gray-400 bg-[#111]/80 border border-gray-700 hover:border-white hover:text-white cursor-pointer'
            }`}
          >
            <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        )}

      </div>

      {/* BOTTOM NAVIGATION (MOBILE BUTTONS & INDICATOR) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-6 font-mono text-sm">
          
          {/* TOMBOL KIRI (MOBILE ONLY) - Pake flex md:hidden */}
          <button
            onClick={() => setCurrentGridPage(prev => Math.max(0, prev - 1))}
            disabled={currentGridPage === 0}
            className={`flex md:hidden w-12 h-12 rounded-full items-center justify-center transition-all duration-300 ${
              currentGridPage === 0 
                ? 'text-gray-700 bg-transparent border border-gray-800 cursor-not-allowed' 
                : 'text-gray-400 bg-[#111] border border-gray-700 hover:text-white active:scale-95 shadow-lg cursor-pointer'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          {/* INDIKATOR 1 / 2 (Tampil di Desktop & Mobile) */}
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">{currentGridPage + 1}</span>
            <span className="text-gray-600">/</span>
            <span className="text-gray-500">{totalPages}</span>
          </div>

          {/* TOMBOL KANAN (MOBILE ONLY) - Pake flex md:hidden */}
          <button
            onClick={() => setCurrentGridPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentGridPage === totalPages - 1}
            className={`flex md:hidden w-12 h-12 rounded-full items-center justify-center transition-all duration-300 ${
              currentGridPage === totalPages - 1 
                ? 'text-gray-700 bg-transparent border border-gray-800 cursor-not-allowed' 
                : 'text-gray-400 bg-[#111] border border-gray-700 hover:text-white active:scale-95 shadow-lg cursor-pointer'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

        </div>
      )}

      {/* MODAL FULLSCREEN GAMBAR (Tetap Sama) */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[999999] bg-[#050505]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            {/* Isi modalnya sama persis kayak sebelumnya */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full cursor-default flex items-center justify-center"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 md:-right-4 text-gray-400 hover:text-white transition-colors cursor-pointer p-2 z-50"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              {selectedCert.images.length > 1 && (
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/50 hover:bg-white border border-gray-700 hover:border-white rounded-full flex items-center justify-center text-white hover:text-black transition-all z-50 cursor-pointer backdrop-blur-sm"
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
              )}

              <div className="w-full max-h-[85vh] flex items-center justify-center overflow-hidden rounded-xl shadow-2xl border border-gray-800 bg-[#111]">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.img 
                    key={currentImageIndex} 
                    src={selectedCert.images[currentImageIndex]} 
                    alt={`${selectedCert.title} - Page ${currentImageIndex + 1}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full h-auto max-h-[85vh] object-contain"
                  />
                </AnimatePresence>
              </div>

              {selectedCert.images.length > 1 && (
                <button 
                  onClick={handleNextImage}
                  className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/50 hover:bg-white border border-gray-700 hover:border-white rounded-full flex items-center justify-center text-white hover:text-black transition-all z-50 cursor-pointer backdrop-blur-sm"
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              )}
              
              <div className="absolute -bottom-10 left-0 w-full flex flex-col items-center gap-2">
                {selectedCert.images.length > 1 && (
                  <div className="flex gap-2">
                    {selectedCert.images.map((_, i) => (
                      <span 
                        key={i} 
                        className={`w-2 h-2 rounded-full transition-colors ${i === currentImageIndex ? 'bg-blue-500' : 'bg-gray-700'}`}
                      ></span>
                    ))}
                  </div>
                )}
                <p className="text-gray-400 font-mono text-xs md:text-sm">{selectedCert.title}</p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}