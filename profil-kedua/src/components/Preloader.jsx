import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader({ onComplete }) {
  const [helloIndex, setHelloIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const hellos = [
    "Hello", "Halo", "Bonjour", "Hola", "Ciao", "こんにちは", "안녕하세요", "Привет", "Halo"
  ];

  useEffect(() => {
    // Kunci scrollbar di tag <html> biar ga ilang-timbul
    // document.documentElement.style.overflow = 'hidden';

    const helloInterval = setInterval(() => {
      setHelloIndex((prev) => (prev + 1) % hellos.length);
    }, 200);

    const t1 = setTimeout(() => setStep(1), 1200); 
    const t2 = setTimeout(() => setStep(2), 2400); 
    const t3 = setTimeout(() => setStep(3), 3600); 
    const t4 = setTimeout(() => {
        setStep(4); 
        clearInterval(helloInterval); 
    }, 4800);
    const t5 = setTimeout(() => {
        setIsVisible(false);
        document.documentElement.style.overflow = ''; // ✅ reset dulu
    }, 5800);

    const t6 = setTimeout(() => {
        document.documentElement.style.overflow = ''; // ✅ double-reset buat safety
        if (onComplete) onComplete();
    }, 6600);

    return () => {
      clearInterval(helloInterval);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
      document.documentElement.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
          className="fixed inset-0 z-[999999] bg-[#050505] flex flex-col justify-center items-center p-6 font-mono text-sm md:text-lg text-gray-400 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

          <div className="relative z-10 flex flex-col gap-2 w-full max-w-sm md:max-w-md">
            
            <div className="flex items-center gap-4">
              <span className="text-blue-500 font-bold">{"[ INIT ]"}</span>
              <span className="text-white">{hellos[helloIndex]}</span>
            </div>

            {step >= 1 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-purple-500 mr-3">{">"}</span> 
                Booting up portfolio...
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-purple-500 mr-3">{">"}</span> 
                I'm Henry, a Web Developer.
              </motion.div>
            )}

            {/* FIX: Bungkus pake step >= 3 biar ga nongol duluan */}
            {step >= 3 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center">
                <span className="text-green-500 mr-3">{">"}</span> 
                
                {step === 3 ? (
                  <span className="text-yellow-500">Best experienced on desktop.</span>
                ) : (
                  <span className="text-green-400 font-bold tracking-widest uppercase flex items-center">
                    <span className="animate-pulse">Welcome</span>
                    
                    {/* TANGAN DADAH-DADAH */}
                    <motion.span
                      className="ml-2 inline-block"
                      style={{ transformOrigin: "70% 70%" }}
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }} 
                      transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      👋
                    </motion.span>
                  </span>
                )}
                
                {/* Blinking Cursor */}
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-5 md:w-3 md:h-6 bg-white ml-2"
                />
              </motion.div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}