import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

// --- KOMPONEN KHUSUS 3D HOVER CARD ---
const CertificateCard = ({ cert, index }) => {
  const cardRef = useRef(null);

  // Motion values buat nyimpen persentase posisi mouse (-0.5 sampe 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Kasih physics spring biar efek miringnya ngaret dan smooth
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Transform posisi mouse jadi derajat kemiringan (rotasi X dan Y maks 10 derajat)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Hitung posisi kursor relatif ke titik tengah card
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Balikin posisi ke tengah (datar) pas mouse keluar
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      // Animasi masuk bareng grid
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.1 }}
      // Penting: perspective biar efek 3D-nya jalan
      style={{ perspective: 1000 }} 
      className="w-full h-full"
    >
      <motion.a
        href={cert.pdfLink} // Nanti lu isi pake link PDF lu
        target="_blank"
        rel="noopener noreferrer"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        // Pake group biar gampang atur efek hover di dalemnya
        className="block relative w-full h-full bg-[#111] border border-gray-800 rounded-2xl p-6 md:p-8 cursor-pointer group shadow-xl transition-colors hover:border-gray-600"
      >
        {/* Glow efek halus pas di-hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-2xl transition-colors duration-500 z-0"></div>

        <div className="relative z-10 flex flex-col h-full">
          
          {/* Header Card (Icon) */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20 group-hover:shadow-blue-500/40 transition-shadow">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
            </svg>
          </div>

          {/* Konten Utama */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
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

          {/* Indikator "View Document" (Bukan tombol, cuma visual) */}
          <div className="mt-auto flex items-center gap-2 font-mono text-xs font-bold text-blue-500 tracking-widest uppercase opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            View Document
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </div>

        </div>
      </motion.a>
    </motion.div>
  );
};

export default function Certificates() {
  // Data mock sementara pake apa yang ada di CV lu
  const certificates = [
    {
      title: "Studi Independen Front-End Engineering",
      issuer: "Alterra Academy",
      year: "2024",
      desc: "Sertifikat kelulusan program MSIB dengan fokus pada pengembangan antarmuka web modern menggunakan ekosistem ReactJS.",
      pdfLink: "#"
    },
    {
      title: "CCNA v7: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      year: "2023",
      desc: "Sertifikasi keahlian dalam merancang, mengkonfigurasi, dan memelihara arsitektur jaringan komputer dan routing dasar.",
      pdfLink: "#" // Nanti diganti link PDF
    },
    {
      title: "CCNA v7: Switching, Routing, and Wireless Essentials",
      issuer: "Cisco Networking Academy",
      year: "2023",
      desc: "Sertifikasi keahlian dalam operasional switch, optimasi inter-VLAN routing, dan manajemen dasar teknologi wireless serta protokol keamanan jaringan.",
      pdfLink: "#" // Nanti diganti link PDF
    },
    
    {
      title: "Piagam Penghargaan Anggota KPPS",
      issuer: "Komisi Pemilihan Umum (KPU)",
      year: "2024",
      desc: "Penghargaan atas dedikasi dalam menjalankan tugas sebagai penyelenggara pemungutan dan penghitungan suara pada Pemilihan Umum.",
      pdfLink: "#"
    },
    {
      title: "Volunteer Certificate - Amikom Fest 2023",
      issuer: "Universitas Amikom Yogyakarta",
      year: "2023",
      desc: "Sertifikasi atas peran aktif sebagai tenaga medis lapangan dalam melakukan pemantauan kondisi kesehatan peserta pada Amikom Fest 2023.",
      pdfLink: "#"
    }
  ];

  return (
    <div className="w-full relative">
      
      {/* Title Animasi Dipatenin */}
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
        <span className="text-gray-500 text-sm font-mono cursor-default">
          {/* // Klik kartu untuk melihat dokumen asli */}
        </span>
      </motion.div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {certificates.map((cert, index) => (
          <CertificateCard key={index} cert={cert} index={index} />
        ))}
      </div>

    </div>
  );
}