import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import profile1 from '../../assets/profil1.jpg';
import profile2 from '../../assets/profil2.png';
import profile3 from '../../assets/profil3.png';

// --- IMPORT FONT AWESOME REACT WAY (BEST PRACTICE!) ---
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn, faInstagram, faSpotify } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const MagneticIcon = ({ children, href }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    x.set(middleX * 0.3); 
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 hover:bg-gray-800 transition-colors"
    >
      {children}
    </motion.a>
  );
};

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const [textIndex, setTextIndex] = useState(0);
  const words = ["HENRY.", "WEB DEV."];

// Tunda animasi teks jalan selama 6 detik biar ga keburu ganti pas masih loading
  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setTextIndex((prev) => (prev + 1) % words.length);
      }, 3000); 
      return () => clearInterval(interval);
    }, 6000); // <--- Nahan 6 detik

    return () => clearTimeout(delayTimeout);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // --- UPDATE 1: Pake Object Variable langsung dari FontAwesomeIcon ---
  const socialLinks = [
    { icon: faGithub, url: '#github' },
    { icon: faLinkedinIn, url: '#linkedin' },
    { icon: faInstagram, url: '#instagram' },
    { icon: faEnvelope, url: '#contact' }
  ];

  return (
    <div className="w-full grid grid-cols-1 mt-11 lg:mt-0 lg:grid-cols-2 gap-16 lg:gap-8 items-stretch min-h-[75vh]">
      
      {/* === KIRI: TEKS & TOMBOL === */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        // Kasih delay: 6.0 di sini
        transition={{ duration: 0.8, delay: 6.0, ease: "easeOut" }}
        className="flex flex-col justify-between h-full"
      >
        <div className="flex-grow flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
          
          <motion.div 
            className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full mb-8 cursor-default"
            animate={{ 
              opacity: [0.7, 1, 0.7], 
              boxShadow: ["0px 0px 0px rgba(34,197,94,0)", "0px 0px 15px rgba(34,197,94,0.3)", "0px 0px 0px rgba(34,197,94,0)"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-green-500 text-xs font-mono font-semibold tracking-widest uppercase">Online</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[1.1]">
            HALO, SAYA <br />
            <AnimatePresence mode="wait">
              <motion.span
                key={textIndex}
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
            {/* --- UPDATE 2: Lempar ke FontAwesomeIcon component --- */}
            {socialLinks.map((item, index) => (
              <MagneticIcon key={index} href={item.url}>
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
              </MagneticIcon>
            ))}
          </div>
        </div>

        <div className="mt-10 flex gap-4 justify-center lg:justify-start">
          <motion.a 
            href="#projects" 
            className="btn bg-white text-black hover:bg-gray-200 border-none rounded-xl px-8 py-3 font-semibold"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}  
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            View Projects
          </motion.a>
          
          <motion.a 
            href="#contact" 
            className="btn btn-outline border border-gray-700 text-white hover:bg-gray-800 hover:text-white hover:border-gray-600 rounded-xl px-8 py-3 font-semibold"
            whileTap={{ scale: 0.95 }} 
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Contact Me
          </motion.a>
        </div>
      </motion.div>

      {/* === KANAN: PROFIL & SPOTIFY === */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        // Kasih delay: 6.2 di sini (Biar munculnya nyusul dikit setelah teks)
        transition={{ duration: 0.8, delay: 6.2, ease: "easeOut" }}
        className="flex flex-col items-center lg:items-center justify-between h-full relative"
      >
        <div className="flex-grow flex items-center justify-center relative w-full lg:mt-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-600/30 blur-[80px] rounded-full z-0"></div>

          <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 overflow-hidden flex items-center justify-center">
              <figure className="hover-gallery w-full h-full">
                <img 
                src={profile1} 
                alt="Profile 1"
                loading="lazy"         
                decoding="async" 
                className="w-full h-full object-cover" />
                <img 
                src={profile2} 
                alt="Profile 2" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover" />
                <img 
                src={profile3} 
                alt="Profile 3" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover" />
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
        <div className="mt-10 w-full max-w-sm relative z-10 bg-[#121212]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 flex flex-col gap-3 group hover:border-gray-600 transition-colors">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center relative overflow-hidden shrink-0">
                {/* --- UPDATE 3: LOGO SPOTIFY PAKE FONT AWESOME COMPONENT --- */}
                <FontAwesomeIcon 
                  icon={faSpotify} 
                  className={`text-3xl relative z-20 transition-colors duration-300 ${isPlaying ? 'text-[#1DB954]' : 'text-gray-400'}`} 
                />
                {isPlaying && <div className="absolute inset-0 bg-[#1DB954]/20 z-10 animate-pulse"></div>}
              </div>
              
              <div className="overflow-hidden">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs text-gray-400 tracking-wider uppercase font-semibold">
                    {isPlaying ? 'Now Playing' : 'Not Playing'}
                  </p>
                  
                  <div className="flex items-end gap-[2px] h-3">
                    {[0, 1, 2].map((bar) => (
                      <motion.div
                        key={bar}
                        className={`w-1 rounded-sm ${isPlaying ? 'bg-[#1DB954]' : 'bg-gray-600'}`}
                        animate={
                          isPlaying 
                            ? { height: ["4px", "12px", "4px", "10px", "4px"] } 
                            : { height: "4px" }
                        }
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "easeInOut",
                          delay: bar * 0.2 
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-[150px] overflow-hidden whitespace-nowrap relative">
                  {isPlaying ? (
                    <motion.div 
                      className="flex gap-4 w-max"
                      animate={{ x: ["0%", "-50%"] }} 
                      transition={{ repeat: Infinity, ease: "linear", duration: 8 }} 
                    >
                      <p className="text-sm font-medium text-white shrink-0">rxseboy - stay for the night</p>
                      <p className="text-sm font-medium text-white shrink-0">rxseboy - stay for the night</p>
                    </motion.div>
                  ) : (
                    <p className="text-sm font-medium text-white truncate">
                      Spotify
                    </p>
                  )}
                </div>

              </div>
            </div>

            <motion.button 
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg shrink-0"
              whileTap={{ scale: 0.85 }}
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
          </div>

          <div className="w-full flex items-center gap-3 mt-1">
            <span className="text-[10px] text-gray-400 font-mono w-8 text-right">
              {formatTime(currentTime)}
            </span>
            
            <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              ></div>
            </div>
            
            <span className="text-[10px] text-gray-400 font-mono w-8 text-left">
              {formatTime(duration)}
            </span>
          </div>

          <audio 
            ref={audioRef} 
            src="/rxseboy.mp3" 
            loop 
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
        </div>
      </motion.div>

    </div>
  );
}