import React from 'react';
import { motion } from 'motion/react';

export default function Experience() {
  // Data experience diambil dari CV lu[cite: 1]
  const experiences = [
    {
      company: "Matrix Data Corp",
      role: "Web Developer (Intern)",
      period: "Nov 2025 – Mei 2026",
      location: "Yogyakarta, Indonesia",
      desc: [
        "WordPress Developer: Mengembangkan landing page dan mengoptimasi performa website hingga menembus skor 90-100 di Google PageSpeed Insights. Dilengkapi optimasi SEO dan keamanan  berlapis.",
        "OJS Developer: Menangani instalasi end-to-end, konfigurasi server (cPanel), hingga penyesuaian UI/UX ekosistem Open Journal System (OJS) untuk berbagai publikasi akademik hingga siap production."
      ],
      techStack: ["WordPress", "Elementor", "OJS", "cPanel", "LiteSpeed"]
    },
    {
      company: "Alterra Academy",
      role: "Front-End Engineer (Intern)",
      period: "Feb 2024 - Jun 2024",
      location: "Remote, Indonesia",
      desc: [
        "Dashboard Development: Membangun antarmuka Admin Dashboard yang user-friendly untuk platform e-commerce aquaculture, memfasilitasi manajemen produk hingga monitoring data secara efisien.",
        "Integration & Collaboration: Mengintegrasikan RESTful API untuk sinkronisasi data real-time. Terbiasa berkolaborasi lintas divisi (UI/UX, Backend, QA) dengan menerapkan alur kerja Git Flow.",
      ],
      techStack: ["ReactJS", "TailwindCSS", "Axios", "Git Flow", "Vite"]
    }
  ];

  return (
    <div className="w-full relative">
      
      {/* Title Animasi (Udah dipatenin sesuai request lu) */}
      <motion.div 
        initial={{ opacity: 0, x: -30, skewX: 10 }}
        whileInView={{ opacity: 1, x: 0, skewX: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex items-center gap-4 mb-16"
      >
        <div className="inline-block border border-gray-700 bg-gray-900 px-4 py-1.5 rounded-full overflow-hidden relative group cursor-default">
          <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative text-xs font-mono text-gray-400 tracking-widest uppercase group-hover:text-white transition-colors">
            03. Experience
          </span>
        </div>
      </motion.div>

      {/* Container Timeline */}
      <div className="relative max-w-4xl mx-auto">
        
        {/* Garis vertikal timeline (Efek Laser Turun) */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent -translate-x-1/2 rounded-full z-0"
        ></motion.div>

        {/* Map Data Experience */}
        <div className="space-y-12">
          {experiences.map((exp, index) => {
            // Logic buat nentuin card-nya di kiri atau kanan (kalo di layar gede)
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="relative flex items-center justify-between md:justify-normal group w-full">
                
                {/* Node Titik Nyala di tengah garis */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-gray-900 border-2 border-purple-500 -translate-x-1/2 z-20 group-hover:bg-purple-500 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all duration-300"
                ></motion.div>

                {/* Container Card */}
                <motion.div
                  // Animasi masuk terbang dari samping nge-snap ke tengah
                  initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20, delay: 0.2 }}
                  // Hover agresif: loncat ke atas & bayangan neon
                  whileHover={{ y: -8 }}
                  className={`relative z-10 w-[calc(100%-50px)] md:w-[calc(50%-40px)] ml-[50px] md:ml-0 bg-[#151515] border border-gray-800 rounded-2xl p-6 lg:p-8 hover:border-gray-600 shadow-xl transition-colors duration-300 ${
                    isEven ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  {/* Dekorasi Neon di dalem card pas hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                        {exp.role}
                      </h3>
                      <span className="text-sm font-mono text-purple-400 font-semibold shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                      <p className="text-blue-500 font-semibold">{exp.company}</p>
                      <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                      <p className="text-sm text-gray-500 flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {exp.location}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {exp.desc.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-purple-500 font-mono text-sm mt-0.5">&gt;</span>
                          <span className="text-gray-400 text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 text-xs font-mono text-gray-300 bg-gray-900 border border-gray-700 rounded-md group-hover:border-gray-500 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}