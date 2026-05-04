import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';

// --- KOMPONEN CUSTOM BUAT EFEK CARD ---
const SkillCard = ({ block, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Animasi masuk yang agresif (3D tilt & snap)
  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -40, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1, 
      transition: { type: "spring", stiffness: 300, damping: 18 } // Kaku dan responsif
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      // Pas hover, kotak loncat nembus ke depan
      whileHover={{ y: -8, scale: 1.02, zIndex: 10 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden bg-[#151515] border border-gray-800 rounded-2xl p-6 lg:p-8 transition-colors duration-300 group shadow-lg"
    >
      {/* 1. Cyber Spotlight: Senter ungu yang ngikutin kursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(168, 85, 247, 0.15), transparent 80%)`
        }}
      />

      {/* 2. Neon Laser Scan: Garis tembak di pucuk card */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-10"></div>

      {/* Header Kategori */}
      <div className="relative z-10 flex items-center gap-3 mb-6">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.9)] group-hover:scale-125 transition-all duration-300"></span>
        <h3 className="text-blue-400 text-sm font-mono font-bold tracking-widest uppercase group-hover:text-white transition-colors duration-300">
          {block.category}
        </h3>
      </div>

      {/* List Item */}
      <ul className="relative z-10 space-y-4">
        {block.items.map((item, i) => (
          // 3. Kinetic List Hover: Gerak agresif saat item disentuh
          <motion.li 
            key={i}
            whileHover={{ x: 12 }} // Lari ke kanan 12px
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-start gap-3 group/item cursor-default"
          >
            <motion.span 
              className="text-gray-600 font-mono text-sm mt-0.5 transition-colors"
              whileHover={{ scale: 1.3, color: "#a855f7" }} // Symbol ">" membesar dan jadi ungu
            >
              &gt;
            </motion.span>
            <span className="text-gray-400 text-base group-hover/item:text-white transition-colors duration-200">
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};


export default function SkillStack() {
  const skillCategories = [
    {
      category: "CORE",
      items: [
        "Front-End Development",
        "WordPress / CMS",
        "Open Journal System",
        "IoT & Hardware"
      ]
    },
    {
      category: "LANGUAGES",
      items: [
        "JavaScript",
        "PHP",
        "SQL",
        "HTML & CSS"
      ]
    },
    {
      category: "FRAMEWORKS",
      items: [
        "React.js",
        "Vue.js",
        "TailwindCSS",
        "Bootstrap"
      ]
    },
    {
      category: "DATABASE",
      items: [
        "Supabase",
        "Firebase",
        "MySQL",
        "PostgreSQL"
      ]
    },
    {
      category: "TOOLS",
      items: [
        "Git & GitHub",
        "Postman",
        "Notion",
        "cPanel"
      ]
    },
    {
      category: "CONCEPTS",
      items: [
        "Clean Code",
        "Web Perf. Optimization",
        "SEO & Analytics",
        "Real-time Sync",
        "Git Flow Collaboration"
      ]
    }
  ];

  // Container Stagger: Munculnya beruntun dari kiri ke kanan cepet
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  return (
    <div className="w-full py-20">
      
      {/* Title Animasi */}
      <motion.div 
        initial={{ opacity: 0, x: -30, skewX: 10 }}
        whileInView={{ opacity: 1, x: 0, skewX: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-12 flex items-center gap-4"
      >
        <div className="inline-block border border-gray-700 bg-gray-900 px-4 py-1.5 rounded-full overflow-hidden relative group">
          <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative text-xs font-mono text-gray-400 tracking-widest uppercase group-hover:text-white transition-colors">
            02. Skills & Stack
          </span>
        </div>
      </motion.div>

      {/* Render Grid & Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillCategories.map((block, index) => (
          <SkillCard key={index} block={block} index={index} />
        ))}
      </motion.div>

    </div>
  );
}