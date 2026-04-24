import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import profile1 from '../../assets/profil1.jpg';
import profile2 from '../../assets/profil2.png';
import profile3 from '../../assets/profil3.png';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // State untuk Glitch Text Loop
  const [textIndex, setTextIndex] = useState(0);
  const words = ["HENRY.", "WEB DEV."]; // Kata yang mau di-loop

  // Timer buat ganti teks tiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % words.length);
    }, 4000); // 9000ms = 9 detik (bisa lu ubah kecepatannya di sini)
    
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-stretch min-h-[75vh]">
      
      {/* === KIRI: TEKS & TOMBOL === */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col justify-between h-full"
      >
        <div className="flex-grow flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-green-500 text-xs font-mono font-semibold tracking-widest uppercase">Online</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[1.1]">
            HALO, SAYA <br />
            {/* Animasi Transisi Teks (Glitch / Digital Reveal) */}
            <AnimatePresence mode="wait">
              <motion.span
                key={textIndex} // Key ini penting biar motion tau kapan harus re-animate
                initial={{ opacity: 0, y: 15, skewX: 25, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, skewX: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, skewX: -25, filter: "blur(8px)" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block"
              >
                {words[textIndex]}
              </motion.span>
            </AnimatePresence>
          </h1>

          <p className="mt-6 text-gray-400 text-lg sm:text-xl max-w-md">
            Frontend Developer & Tech Enthusiast. Saya bikin UI yang rapi dan gak berantakan.
          </p>

          <div className="flex gap-4 mt-8">
            {['Github', 'LinkedIn', 'Instagram', 'Email'].map((item, index) => (
              <a 
                key={index} 
                href={`#${item.toLowerCase()}`} 
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 hover:bg-gray-800 transition-all"
              >
                <span className="text-xs">{item[0]}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex gap-4 justify-center lg:justify-start">
          <a href="#portfolio" className="btn bg-white text-black hover:bg-gray-200 border-none rounded-xl px-8">
            View Projects
          </a>
          <a href="#contact" className="btn btn-outline border-gray-700 text-white hover:bg-gray-800 hover:text-white hover:border-gray-600 rounded-xl px-8">
            Contact Me
          </a>
        </div>
      </motion.div>

      {/* === KANAN: PROFIL & SPOTIFY === */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col items-center lg:items-center justify-between h-full relative"
      >
        {/* Konten Atas: Wadah Foto Profil */}
        <div className="flex-grow flex items-center justify-center relative w-full mt-10 lg:mt-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-600/30 blur-[80px] rounded-full z-0"></div>

          <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72">
            {/* Bagian overflow-hidden ini yang bikin gallery-nya tetep bentuk bulat */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 overflow-hidden flex items-center justify-center">
              
              {/* Terapin Hover Gallery DaisyUI Di Sini */}
              <figure className="hover-gallery w-full h-full">
                <img src={profile1} alt="Profile 1" className="w-full h-full object-cover" />
                <img src={profile2} alt="Profile 2" className="w-full h-full object-cover" />
                <img src={profile3} alt="Profile 3" className="w-full h-full object-cover" />
              </figure>

            </div>
            
            <div className="absolute bottom-4 -left-4 bg-[#111] border border-gray-800 rounded-xl p-3 shadow-xl backdrop-blur-sm z-20">
              <p className="text-sm font-bold text-white mb-1">Henry</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span className="text-green-500 text-xs font-mono">Available for Hire</span>
              </div>
            </div>
          </div>
        </div>

        {/* Konten Bawah: Spotify Card */}
        <div className="mt-10 w-full max-w-sm relative z-10 bg-[#121212]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 flex items-center justify-between group hover:border-gray-600 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            
            <div>
              <p className="text-xs text-gray-400 tracking-wider mb-1 uppercase font-semibold">
                {isPlaying ? 'Now Playing' : 'Not Playing'}
              </p>
              <p className="text-sm font-medium text-white">
                {isPlaying ? 'rxseboy - stay for the night' : 'Spotify'}
              </p>
            </div>
          </div>
        <motion.button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg"
            whileTap={{ scale: 0.90 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {isPlaying ? (
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </motion.button>
          <audio ref={audioRef} src="/rxseboy.mp3" loop />
        </div>
      </motion.div>

    </div>
  );
}