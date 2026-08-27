"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Editorial() {
  
  const images = [
    { src: "/hero-landscape.png", title: "MOTION", subtitle: "PHASE 01" },
    { src: "/mokups/design 5/detailed.png", title: "RESILIENCE", subtitle: "004" },
    { src: "/mokups/design 3/detailed view.png", title: "FOCUS", subtitle: "003" },
    { src: "/mokups/design 6/detail.png", title: "MOMENTUM", subtitle: "006" },
  ];

  useEffect(() => {
    // Hide footer and nav background by manipulating global scroll
    document.documentElement.style.scrollSnapType = 'y mandatory';
    return () => {
      document.documentElement.style.scrollSnapType = 'none';
    };
  }, []);

  return (
    <div className="flex flex-col w-full bg-black text-white h-[100dvh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      
      {/* Intro Slide */}
      <section className="snap-start snap-always w-full h-[100dvh] flex flex-col justify-center items-center px-6 relative flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center z-10 mix-blend-difference"
        >
          <span className="font-label-caps text-white mb-6 block tracking-[0.3em]">LOOKBOOK</span>
          <h1 className="font-headline-lg text-6xl md:text-9xl text-white tracking-tighter uppercase mb-6">
            THE ARCHIVE
          </h1>
          <p className="font-label-caps tracking-widest text-white/70">SCROLL TO EXPLORE</p>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 z-10 text-white mix-blend-difference"
        >
          <span className="material-symbols-outlined text-[32px] font-light">expand_more</span>
        </motion.div>
      </section>

      {/* Image Slides */}
      {images.map((img, index) => (
        <section key={index} className="snap-start snap-always w-full h-[100dvh] relative flex-shrink-0 overflow-hidden group">
          <img 
            src={img.src} 
            alt={img.title} 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row justify-between items-end z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-headline-lg text-5xl md:text-8xl text-white tracking-tight uppercase leading-none">{img.title}</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 md:mt-0"
            >
              <span className="font-label-caps text-white tracking-widest text-lg md:text-xl border-b border-white pb-2">{img.subtitle}</span>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Footer / Outro Slide */}
      <section className="snap-start snap-always w-full h-[100dvh] flex flex-col justify-center items-center px-6 bg-surface-variant text-primary flex-shrink-0">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-headline-lg text-5xl md:text-7xl uppercase mb-8"
        >
          KEEP MOVING.
        </motion.h2>
        <a href="/collections" className="bg-primary text-white font-label-caps tracking-widest px-12 py-5 hover:bg-accent transition-colors">
          SHOP THE COLLECTION
        </a>
      </section>
    </div>
  );
}
