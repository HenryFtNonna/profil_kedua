import React from 'react';

const MeshGradientBackground = () => {
  return (
    // Background dasar hitam pekat
    <div className="fixed inset-0 -z-10 bg-[#050505] overflow-hidden">
      
      {/* 1. CYBER GRID PATTERN (Super Ringan!) */}
      <div 
        className="absolute inset-0"
        style={{
          // Bikin garis kotak-kotak tipis warna putih transparan
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          // Masking biar gridnya makin ke pinggir makin ngilang (vignette effect)
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 10%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 10%, transparent 100%)'
        }}
      ></div>

      {/* 2. STATIC NEON GLOWS (Pengganti animasi blur yang berat) 
          Kita pake radial-gradient CSS biasa, bukan filter CSS Blur, jadi GPU ga nangis 
      */}
      {/* Biru di kiri atas */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,rgba(0,0,0,0)_60%)] pointer-events-none mix-blend-screen"></div>
      
      {/* Ungu di kanan bawah */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,rgba(0,0,0,0)_60%)] pointer-events-none mix-blend-screen"></div>

      {/* 3. NOISE OVERLAY (Tetep dipake biar ada teksturnya, ini enteng kok) */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      ></div>
      
    </div>
  );
};

export default MeshGradientBackground;