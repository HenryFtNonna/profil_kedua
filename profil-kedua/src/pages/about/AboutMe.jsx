import React from 'react'

export default function AboutMe() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
        
        {/* Card kiri */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-sm md:max-w-md lg:max-w-2xl bg-amber-200 p-6 rounded-xl flex items-center justify-center h-100">
            wkwk
          </div>
        </div>

        {/* Card kanan */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-sm md:max-w-md lg:max-w-2xl bg-indigo-300 p-6 rounded-xl flex flex-col gap-4 items-center justify-center h-100">
            what im doing
            {/* Dua card di dalam, numpuk kebawah */}
            <div className="w-full bg-amber-100 flex items-center justify-center h-30 rounded-md mt-3">
              sadasda
            </div>
            <div className="w-full bg-amber-300 flex items-center justify-center h-30 rounded-md">
              asda
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
