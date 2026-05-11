import React from 'react';
import { motion } from 'motion/react';

export default function Education() {
  const educationData = [
    {
      school: "Universitas Amikom Yogyakarta",
      degree: "S1 Teknik Komputer",
      period: "September 2021 – Agustus 2025",
      points: [
        "Jaringan Komputer: Mendalami arsitektur jaringan dan routing, divalidasi dengan sertifikasi resmi CCNA v7 dari Cisco Networking Academy.",
        "Web Development: Mengembangkan aplikasi web dinamis berfokus pada efisiensi sistem, dengan proyek akhir berupa sistem manajemen rental konsol game.",
        "Internet of Things (IoT): Merancang arsitektur perangkat keras dan lunak untuk smart system, dengan pencapaian akhir berupa sistem monitoring data tinggi badan real-time menggunakan ESP8266 dan Firebase."
      ],
      tech: ["Cisco Networking", "IoT Architecture", "PHP & SQL", ]
    },
    {
      school: "SMKN 02 Karanganyar",
      degree: "Rekayasa Perangkat Lunak (RPL)",
      period: "Juli 2018 – Juni 2021",
      points: [
        "Software Engineering: Mempelajari fundamental pemrograman web dan basis data relasional, menghasilkan proyek akhir sistem kasir terintegrasi (CRUD).",
        "Object-Oriented Programming: Membangun fondasi logika pemrograman terstruktur dan problem-solving berbasis objek menggunakan Java.",
        "Hardware Maintenance: Memahami arsitektur perangkat keras melalui praktik perakitan, instalasi OS, dan pemeliharaan komputer."
      ],
      tech: ["PHP", "Bootstrap", "MySQL", "Java", "Hardware Maintenance"]
    }
  ];

  return (
    <div className="w-full">
      
      {/* Title Animasi (Format dipatenin) */}
      <motion.div 
        initial={{ opacity: 0, x: -30, skewX: 10 }}
        whileInView={{ opacity: 1, x: 0, skewX: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex items-center gap-4 mb-12 lg:mb-16"
      >
        <div className="inline-block border border-gray-700 bg-gray-900 px-4 py-1.5 rounded-full overflow-hidden relative group cursor-default">
          <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative text-xs font-mono text-gray-400 tracking-widest uppercase group-hover:text-white transition-colors">
            04. Education
          </span>
        </div>
      </motion.div>

      {/* Grid Layout buat Terminal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            // Agresive Entrance dari bawah
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.2 }}
            whileHover={{ y: -5, boxShadow: "0px 10px 30px -10px rgba(59, 130, 246, 0.3)" }}
            className="flex flex-col bg-[#111] border border-gray-800 rounded-xl overflow-hidden group transition-all duration-300"
          >
            {/* Fake Terminal Header */}
            <div className="bg-[#1a1a1a] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-xs font-mono text-gray-500 group-hover:text-blue-400 transition-colors">
                ~/education/{edu.degree.split(' ')[0].toLowerCase()}.sh
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 lg:p-8 flex-grow flex flex-col justify-between gap-6 relative overflow-hidden">
              {/* Efek Neon Halus di dalem Terminal */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] -z-10 group-hover:bg-blue-500/20 transition-colors duration-500"></div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                  {edu.school}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                  <p className="text-blue-500 font-semibold font-mono text-sm">{edu.degree}</p>
                  <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                  <p className="text-sm text-gray-500 font-mono">{edu.period}</p>
                </div>

                <ul className="space-y-4 mb-6">
                  {edu.points.map((point, i) => {
                    // Misahin kalimat pertama (judul tebal) pake titik dua (:)
                    const [title, ...rest] = point.split(':');
                    const desc = rest.join(':');

                    return (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-green-500 font-mono text-sm mt-1 shrink-0">~%</span>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          <span className="text-gray-200 font-semibold">{title}:</span>{desc}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Tech Stack/Keywords */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800/50">
                {edu.tech.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 text-[11px] font-mono text-gray-400 bg-[#1a1a1a] border border-gray-700/50 rounded-md group-hover:border-blue-500/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}