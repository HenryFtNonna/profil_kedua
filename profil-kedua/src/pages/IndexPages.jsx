import React from 'react'
import HeroSection from './hero/HeroSection'
import AboutMe from './about/AboutMe'
import '../css/style.css' 

export default function IndexPages() {
  return (
    <main className="w-full bg-[#0a0a0a] text-slate-900">

      {/* Hero - Hapus bg-white dan ganti jadi dark background biar mulus */}
      <section id="hero" className="relative w-full min-h-screen flex items-center bg-[#0a0a0a] text-white py-20">
        {/* Hapus bg-amber-100 biar gak ada border kuning */}
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-12">
          <HeroSection />
        </div>
      </section>

      {/* About - Balikin ke mode terang (kalau mau) */}
      <section id="about" className="bg-white text-slate-900 py-20 relative w-full min-h-screen flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6">
          <AboutMe/>
        </div>
      </section>
      
    </main>
  )
}