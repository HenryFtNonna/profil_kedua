import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [isCopied, setIsCopied] = useState(false);
  const email = "hello@mohanhenry.com"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); 
  };

  return (
    // FIX SPACE BAWAH: Kurangin padding atas-bawah (pt-16 pb-8) & hapus margin-top tambahan
    <div className="w-full pt-16 pb-8 flex flex-col items-center justify-center relative border-t border-gray-800/50">
      
      <motion.p 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="text-blue-500 font-mono text-xs md:text-sm tracking-widest uppercase mb-6 text-center px-4"
      >
        Ready to scale your vision?
      </motion.p>

      {/* FIX MOBILE PADDING: Tambahin px-4 md:px-8 biar ga nabrak pinggiran layar */}
      <div 
        className="relative flex flex-col items-center justify-center cursor-pointer group w-full px-4 md:px-8"
        onClick={handleCopy}
      >
        {/* FIX KEPOTONG: Hapus overflow-hidden dan ganti fixed height jadi min-height */}
        <div className="flex items-center justify-center w-full min-h-[80px] md:min-h-[120px]">
            {/* mode="wait" memastikan teks lama ngilang dulu baru teks baru muncul, jadi ga akan tumpang tindih */}
            <AnimatePresence mode="wait">
              {!isCopied ? (
                <motion.h1
                  key="email"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  // FIX SCALING: Pake text-[vw] (viewport width) biar ukurannya nge-zoom in/out otomatis ngikutin lebar layar.
                  // Ditambah leading-tight dan break-words jaga-jaga kalo di HP super kecil dia harus turun baris, tetep rapi.
                  className="text-[7.5vw] sm:text-[6vw] lg:text-[5.5vw] font-black tracking-tighter text-gray-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300 leading-tight text-center break-words"
                >
                  {email}
                </motion.h1>
              ) : (
                <motion.h1
                  key="copied"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[7vw] sm:text-[6vw] lg:text-[5vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 leading-tight text-center"
                >
                  COPIED TO CLIPBOARD!
                </motion.h1>
              )}
            </AnimatePresence>
        </div>

        {/* Teks Click to copy tetep dibikin animasi nimbul dari bawah */}
        <div className="h-6 mt-1 overflow-hidden">
           <p className="text-gray-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
             {isCopied ? "Email Copied!" : "Click to copy"}
           </p>
        </div>
      </div>

      <motion.a 
        href="https://wa.me/6281234567890" 
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 md:mt-10 flex items-center gap-3 px-6 py-3 rounded-full border border-gray-700 bg-[#111] hover:border-gray-500 hover:bg-[#1a1a1a] transition-colors shadow-lg group"
      >
         <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] group-hover:bg-purple-500 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.8)] transition-colors"></span>
         <span className="text-xs md:text-sm font-mono text-gray-300 tracking-widest uppercase group-hover:text-white transition-colors">
           Chat on WhatsApp
         </span>
      </motion.a>

      {/* Social Links dibikin flex-wrap biar kalo di HP ga nabrak */}
      <div className="mt-12 md:mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-8 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest px-4">
        <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-purple-400 transition-colors">GitHub</a>
        <a href="#" className="hover:text-pink-400 transition-colors">Instagram</a>
      </div>

      <div className="mt-8 text-[10px] font-mono text-gray-700 text-center px-4">
         © {new Date().getFullYear()} Mohan Henry. All rights reserved.
      </div>

    </div>
  );
}