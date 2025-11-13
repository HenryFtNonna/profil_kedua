import React from 'react'

export default function HeroSection(){
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-800">
          Halo, saya Henry. <span className="text-indigo-600">Frontend dev</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-600">
          Saya bikin UI yang rapi dan gak berantakan. Contoh portfolio ada di bawah.
        </p>
        <div className="mt-6 flex justify-center lg:justify-start gap-4">
          <a href="#portfolio" className="px-4 py-2 rounded-md bg-indigo-600 text-white">Lihat kerjaan</a>
          <a href="#contact" className="px-4 py-2 rounded-md border">Hubungi</a>
        </div>
      </div>

      <div className="flex-1 flex justify-center lg:justify-end">
        {/* Ganti ini dengan image / ilustrasi */}
        <div className="w-56 h-56 bg-slate-100 rounded-lg flex items-center justify-center">
          <span className="text-slate-400">Illustrasi</span>
        </div>
      </div>
    </div>
  )
}
