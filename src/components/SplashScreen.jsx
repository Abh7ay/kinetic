"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    // Hide scrollbar while splash is active
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      document.body.style.overflow = 'unset';
      onComplete();
    }, 2000); // 2 second delay for the splash screen

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999] bg-black flex items-center justify-center pointer-events-none"
    >
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline-lg text-white text-5xl md:text-8xl tracking-tight uppercase"
        >
          KINETIC
        </motion.h1>
      </div>
    </motion.div>
  );
}
