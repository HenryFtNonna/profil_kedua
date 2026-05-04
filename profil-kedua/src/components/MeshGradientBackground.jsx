import React from 'react';
import { motion } from 'motion/react';

const MeshGradientBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
      
      {/* Blob 1 - Biru */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/15 blur-[120px] rounded-full"
      />

      {/* Blob 2 - Ungu */}
      <motion.div
        animate={{
          x: [0, -120, 60, 0],
          y: [0, 100, -80, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] -right-[15%] w-[50%] h-[50%] bg-purple-600/15 blur-[120px] rounded-full"
      />

      {/* Blob 3 - Pink */}
      <motion.div
        animate={{
          x: [0, 80, -100, 0],
          y: [0, 120, 40, 0],
          scale: [1, 1.3, 0.7, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[15%] left-[15%] w-[55%] h-[55%] bg-pink-600/10 blur-[130px] rounded-full"
      />

      {/* FIXED: Noise Overlay pake Inline Data URI biar gak 404 */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      ></div>
    </div>
  );
};

export default MeshGradientBackground;