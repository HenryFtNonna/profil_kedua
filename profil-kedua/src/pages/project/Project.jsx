import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useMotionValueEvent, AnimatePresence } from 'motion/react';
import image1 from '../../assets/henrimonitoring.png'
import image2 from '../../assets/tepilangit.png'
import image3 from '../../assets/blueharvest.png'
import Image4 from '../../assets/matrixlp.png'
import Image5 from '../../assets/duittt.png'
import Image6 from '../../assets/matrixojs.png'
import Image7 from '../../assets/henricrosshair.png'


export default function Project() {
  const projects = [
    {
      title: "BlueHarvest 🎏",
      desc: "Sistem manajemen E-Commerce tema aquaculture. Mengelola produk, tambak, artikel, dan promo terintegrasi RESTful API.",
      tech: ["ReactJS", "TailwindCSS", "Axios", "Git Flow"],
      image: image3, 
      github: "https://github.com/blueharvest-alterra",
      live: "https://blueharvest.vercel.app/" 
    },
    {
      title: "Matrix Data Corp 📊",
      desc: "Membangun landing page Matrix Data Corp yang cepat, aman, dan teroptimasi SEO untuk visibilitas bisnis yang maksimal.",
      tech: ["WordPress", "Elementor", "SEO", "LiteSpeed"],
      image: Image4, 
      github: "", 
      live: "https://matrix.or.id"
    },
    {
      title: "Matrix Journal 📚",
      desc: "Develop end-to-end Open Journal System (OJS). Memastikan platform publikasi yang fungsional, aman, dan siap digunakan",
      tech: ["Open Journal System", "SMTP", "HTML", "cPanel"],
      image: Image6, 
      github: "", 
      live: "https://jurnal.matrix.or.id/"
    },
    {
      title: "DUITTT 💰",
      desc: "Aplikasi manajemen keuangan. Dilengkapi pelacakan transaksi, rekap bulanan, dan asisten chatbot pintar.",
      tech: ["ReactJS", "TailwindCSS", "DaisyUI", "Rest API"],
      image: Image5, 
      github: "https://github.com/HenryFtNonna/React_Mohan-Henry-Kusuma/tree/main/mini-project",
      live: "https://react-mohan-henry-kusuma-3oad.vercel.app/" 
    },
    {
      title: "Henri Monitoring (IoT) 💻",
      desc: "Sistem monitoring data tinggi badan IoT secara real-time. Menghubungkan sensor ke mikrokontroler ESP8266 dan Firebase API.",
      tech: ["ReactJS", "TailwindCSS", "Firebase", "ESP8266"],
      image: image1, 
      github: "https://github.com/HenryFtNonna/reactjs-tinggibadan",
      live: "https://henry-monitoring.vercel.app/"
    },
    {
      title: "Tepi Langit Restaurant 🍷",
      desc: "Aplikasi katalog menu restoran dengan tampilan clean dan dinamis. Dilengkapi dashboard admin untuk manajemen menu real-time.",
      tech: ["Vue.js", "TailwindCSS", "DaisyUI", "Supabase"],
      image: image2, 
      github: "https://github.com/HenryFtNonna/restaurant-menu",
      live: "https://tepi-langit.vercel.app/"
    },
    {
      title: "Henri Crosshair 🎯",
      desc: "Platform galeri crosshair Valorant. Memudahkan user menyalin kode dan dilengkapi dashboard admin untuk manajemen data.",
      tech: ["ReactJS", "TailwindCSS", "Supabase", "Auth"],
      image: Image7, 
      github: "https://github.com/HenryFtNonna/henri-crosshair",
      live: "https://henri-crosshair.vercel.app/"
    }
  ];

  // 1. TAMBAHIN STATE BUAT NGELACAK KARTU YANG AKTIF (MEKAR)
  const [activeProject, setActiveProject] = useState(null);

  const carouselRef = useRef();
  const [width, setWidth] = useState(0);
  
  const x = useMotionValue(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if(carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const offsetWidth = carouselRef.current.offsetWidth;
        setWidth(scrollWidth - offsetWidth);
        
        if (scrollWidth <= offsetWidth) {
          setCanScrollRight(false);
        }
      }
    }, 100);
  }, []);

  useMotionValueEvent(x, "change", (latest) => {
    setCanScrollLeft(latest < -5); 
    setCanScrollRight(latest > -width + 5); 
  });

  return (
    <div className="w-full relative overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, x: -30, skewX: 10 }}
        whileInView={{ opacity: 1, x: 0, skewX: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 lg:mb-12"
      >
        <div className="inline-block border border-gray-700 bg-gray-900 px-4 py-1.5 rounded-full overflow-hidden relative group cursor-default">
          <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative text-xs font-mono text-gray-400 tracking-widest uppercase group-hover:text-white transition-colors">
            05. Projects
          </span>
        </div>
        <span className="text-gray-500 text-sm font-mono animate-pulse">
          &lt;-- Drag to explore --&gt;
        </span>
      </motion.div>

      <div className="relative">

        <AnimatePresence>
          {canScrollLeft && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#111]/80 backdrop-blur-md border border-gray-700 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)] text-white group cursor-grab hover:border-blue-500 transition-colors"
            >
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none z-40">
                <div className="relative bg-[#1a1a1a] border border-blue-500/50 text-blue-400 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-[0_0_10px_rgba(59,130,246,0.3)] whitespace-nowrap">
                  Swipe it!
                  <div className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a1a] border-b border-r border-blue-500/50 rotate-45"></div>
                </div>
              </div>

              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {canScrollRight && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#111]/80 backdrop-blur-md border border-gray-700 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)] text-white group cursor-grab hover:border-blue-500 transition-colors"
            >
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none z-40">
                <div className="relative bg-[#1a1a1a] border border-blue-500/50 text-blue-400 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-[0_0_10px_rgba(59,130,246,0.3)] whitespace-nowrap">
                  Swipe it!
                  <div className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a1a] border-b border-r border-blue-500/50 rotate-45"></div>
                </div>
              </div>

              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          ref={carouselRef} 
          className="cursor-grab active:cursor-grabbing overflow-visible"
        >
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            style={{ x }} 
            className="flex gap-6 lg:gap-8 py-4 items-start"
          >
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.1 }}
              >
                {/* 2. UPDATE WRAPPER KARTU */}
                {/* Hapus whileHover bawaan framer motion, ganti pake event listener klik & mouse */}
                <motion.div
                  onClick={() => setActiveProject(activeProject === index ? null : index)} // Di-tap di HP bakal nutup/buka
                  onMouseEnter={() => setActiveProject(index)} // Di-hover di desktop bakal buka
                  onMouseLeave={() => setActiveProject(null)} // Mouse keluar bakal nutup
                  initial="rest"
                  animate={activeProject === index ? "hover" : "rest"} // Animasi jalan berdasarkan state
                  className="px-2 py-2 min-w-[320px] max-w-[320px] md:min-w-[400px] md:max-w-[400px] bg-[#111] border border-gray-800 rounded-2xl overflow-hidden flex flex-col group shadow-lg transition-colors hover:border-gray-600 cursor-pointer"
                >
                  {/* Thumbnail Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden shrink-0 rounded-xl">
                    <div className="absolute inset-0 bg-blue-500/20 group-hover:bg-transparent transition-colors z-10 "></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    {/* ACCORDION ANIMATION: Deskripsi Sembunyi */}
                    {/* Ini otomatis ngikutin trigger 'animate={...}' dari bungkus kartunya */}
                    <motion.div
                      variants={{
                        rest: { height: 0, opacity: 0 },
                        hover: { height: "auto", opacity: 1 }
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {project.desc}
                      </p>
                    </motion.div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-[11px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Buttons Layout */}
                    <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-800/50">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all font-semibold text-sm"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          Code
                        </a>
                      )}

                      {project.live && (
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 rounded-lg bg-white hover:bg-gray-200 text-black text-center transition-all font-bold text-sm shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}