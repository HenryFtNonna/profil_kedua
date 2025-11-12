import React from 'react'
import HeroSection from './hero/HeroSection'
import '../css/style.css' // import CSS custom (lebih aman daripada <link> di index.html)

export default function IndexPages() {
  return (
    <main className="w-full bg-white text-slate-900">
      {/* Hero - full viewport height; kasih background biar shape terlihat */}
      <section
        id="hero"
        className="relative w-full min-h-screen flex items-center bg-white text-white"
      >
        <div className="w-full max-w-6xl mx-auto px-4">
          <HeroSection />
        </div>

        {/* shape divider (kelas sama seperti yang kamu paste) */}
        <div className="custom-shape-divider-bottom-1762963540">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
              className="shape-fill"
            />
          </svg>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white text-slate-900 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold">Tentang Saya</h2>
          <p className="mt-4">Isi section about...</p>
        </div>
      </section>
    </main>
  )
}
