"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';

export default function Archive() {
  const seasons = [
    {
      title: "SERIES 02",
      description: "Graphic exploration. Bold prints and relaxed, oversized silhouettes.",
      image: "/mokups/design 3/front.png",
      year: "2024"
    },
    {
      title: "SERIES 01",
      description: "Foundational pieces. Premium cotton and minimalist execution.",
      image: "/mokups/design 1/front.png",
      year: "2023"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex-grow pt-[120px] md:pt-[160px] flex flex-col min-h-screen"
    >
      <main className="flex-grow mb-section-gap-sm md:mb-section-gap-lg">
        <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-primary pb-8">
            <h1 className="font-display-xl-mobile md:font-display-xl text-[64px] md:text-[120px] text-primary tracking-tighter uppercase leading-none">
              ARCHIVE
            </h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant max-w-[200px] mb-4 md:text-right">
              A CHRONOLOGICAL RECORD OF OUR PAST DESIGN ITERATIONS.
            </p>
          </div>
        </section>

        <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col gap-24 md:gap-48">
            {seasons.map((season, index) => (
              <div key={season.title} className="relative group">
                {/* Year Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.03]">
                  <span className="font-display-xl text-[200px] md:text-[400px] font-bold tracking-tighter">{season.year}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center relative z-10">
                  <div className={`md:col-span-7 aspect-square md:aspect-[16/10] bg-gradient-to-br from-surface to-surface-variant border border-surface-variant overflow-hidden p-12 flex items-center justify-center ${index % 2 !== 0 ? 'md:order-2 md:col-start-6' : ''}`}>
                    <img 
                      src={season.image} 
                      alt={season.title} 
                      className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-[10s]"
                    />
                  </div>
                  <div className={`md:col-span-4 flex flex-col ${index % 2 !== 0 ? 'md:items-end md:text-right md:col-start-2' : ''}`}>
                    <span className="font-label-caps text-label-caps text-primary mb-6 block border border-primary px-3 py-1 self-start md:self-auto w-max">{season.year}</span>
                    <h2 className="font-display-xl-mobile md:font-display-xl text-[48px] md:text-[80px] text-primary tracking-tighter mb-6 leading-[0.9]">{season.title}</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-12">
                      {season.description}
                    </p>
                    <button className="font-label-caps text-label-caps text-primary border-b border-primary pb-1 self-start md:self-auto hover:text-surface-tint hover:border-surface-tint transition-colors flex items-center gap-2 group/btn">
                      VIEW ARCHIVE
                      <span className="material-symbols-outlined text-[16px] transform group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
}
