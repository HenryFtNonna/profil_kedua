import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';

// --- KOMPONEN BENTO CARD ---
const BentoCard = ({ skill, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const getSpotlightColor = (colorClass) => {
    if (colorClass.includes('blue')) return 'rgba(59, 130, 246, 0.15)';
    if (colorClass.includes('purple')) return 'rgba(168, 85, 247, 0.15)';
    if (colorClass.includes('emerald')) return 'rgba(16, 185, 129, 0.15)';
    if (colorClass.includes('amber')) return 'rgba(245, 158, 11, 0.15)';
    return 'rgba(255, 255, 255, 0.1)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, skewY: 3 }} 
      whileInView={{ opacity: 1, y: 0, skewY: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 + (index * 0.1) }}
      whileHover={{ y: -5 }} 
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group p-6 lg:p-8 rounded-2xl bg-[#151515] border border-gray-800 transition-all duration-300 ${skill.colSpan}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${getSpotlightColor(skill.color)}, transparent 80%)`
        }}
      />

      <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${skill.color} transition-all duration-300 ease-out group-hover:w-full z-10`}></div>

      <div className="relative z-10 flex flex-col h-full justify-start gap-3">
        {/* UPDATE FONT: Pake font-display buat judul card biar kerasa techy */}
        <h3 className="text-xl font-bold font-display tracking-tight text-gray-200 group-hover:text-white transition-colors flex items-center">
          
          {/* UPDATE FONT: JetBrains Mono udah pas di sini */}
          <span className="inline-block max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover:max-w-xs group-hover:opacity-100 group-hover:mr-2 text-white font-mono">
            &gt;
          </span>
          <span className="transform transition-transform duration-300 group-hover:translate-x-1">
            {skill.title}
          </span>
        </h3>
        
        {/* Paragraf otomatis pake Plus Jakarta Sans. Gw tambahin leading-relaxed biar jarak antar barisnya lega buat dibaca */}
        <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          {skill.desc}
        </p>
      </div>
    </motion.div>
  );
};

export default function AboutMe() {
  const skills = [
    {
      title: "Front-End Development",
      desc: "Membangun antarmuka web yang modern, responsif, dan interaktif. Terbiasa menerjemahkan desain menjadi clean code bersama tim lintas divisi menggunakan ReactJS, Vue.js, dan TailwindCSS.",
      color: "from-blue-500 to-indigo-600",
      colSpan: "col-span-2 md:col-span-2", 
    },
    {
      title: "WordPress / CMS",
      desc: "Mengembangkan landing page bertenaga WordPress yang tidak hanya estetik, tapi juga teroptimasi. Fokus pada kecepatan tinggi (PageSpeed optimal) dan perlindungan keamanan berlapis.",
      color: "from-purple-500 to-pink-500",
      colSpan: "col-span-2 md:col-span-1", 
    },
    {
      title: "Open Journal System",
      desc: "Menyediakan setup end-to-end untuk platform publikasi jurnal akademik. Mencakup proses instalasi, manajemen server (cPanel), kustomisasi antarmuka, hingga integrasi sistem.",
      color: "from-emerald-400 to-cyan-500",
      colSpan: "col-span-2 md:col-span-1", 
    },
    {
      title: "IoT & Hardware",
      desc: "Menghubungkan perangkat keras dengan aplikasi web. Merancang arsitektur sistem monitoring real-time yang mengintegrasikan mikrokontroler langsung ke cloud database.",
      color: "from-amber-400 to-orange-500",
      colSpan: "col-span-2 md:col-span-2", 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8 }}
      className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
    >
      
      {/* === KIRI: ABOUT ME === */}
      <div className="lg:col-span-5 h-full pt-4 pl-4 lg:pt-6 lg:pl-6 relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-full"
        >
          <motion.div
            className="relative w-full h-full cursor-pointer"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div
              variants={{
                rest: { rotate: -4, scale: 1.02, x: -8, y: 8 },
                hover: { rotate: 0, scale: 1, x: 0, y: 0 }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -inset-1.5 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-[2rem] z-0"
            />

            <div className="relative z-10 w-full h-full bg-[#111] border border-gray-800 rounded-3xl p-8 lg:p-10 flex flex-col justify-center gap-8 shadow-2xl backdrop-blur-xl">
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -30, skewX: 10 }}
                  whileInView={{ opacity: 1, x: 0, skewX: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className=" flex items-center gap-4"
                >
                  <div className="inline-block border border-gray-700 bg-gray-900 px-4 py-1.5 rounded-full overflow-hidden relative group">
                    <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    {/* UPDATE FONT: Label kecil pake JetBrains Mono */}
                    <span className="relative text-xs font-mono font-semibold text-gray-400 tracking-widest uppercase group-hover:text-white transition-colors">
                      01. About Me
                    </span>
                  </div>
                </motion.div>
                          
                {/* UPDATE FONT: Judul utama pake Space Grotesk (font-display) */}
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-white leading-[1.1]">
                  Mohan <br/> 
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Henry Kusuma.
                  </span>
                </h2>
              </div>

              {/* Teks panjang otomatis pake Plus Jakarta Sans. Dikasih leading-relaxed biar gampang dibaca */}
              <div className="space-y-5 text-gray-400 text-base leading-relaxed">
                <p>
                  Halo! Saya Henry, Web Developer yang berdomisili di Yogyakarta. Dengan Latar belakang Teknik Komputer membuat saya melihat pengembangan web lebih dari sekadar antarmuka visual.
                </p>
                <p>
                  Saya menikmati proses membangun sistem dari nol mulai dari merancang arsitektur aplikasi, mengelola ekosistem WordPress & OJS, hingga eksperimen integrasi IoT dengan cloud database.
                </p>
                <p>
                  Saat ini, saya fokus pada teknologi web modern (React, Vue, Tailwind). Saya selalu excited berkolaborasi menciptakan solusi digital yang tidak hanya estetik, tapi juga benar-benar bekerja.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* === KANAN: BENTO GRID === */}
      <div className="lg:col-span-7 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          {/* UPDATE FONT: Judul section pake Space Grotesk */}
          <h2 className="text-3xl font-display font-bold uppercase tracking-tight text-white mt-8">What I Do</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <BentoCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>

    </motion.div>
  );
}