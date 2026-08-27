"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default function HomeClient({ initialProducts }) {
  const products = initialProducts || [];
  const heroRef = useRef(null);
  const philosophyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: philScroll } = useScroll({
    target: philosophyRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const philY = useTransform(philScroll, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex-grow flex flex-col min-h-screen bg-background text-primary"
    >
      <main className="flex-grow">
        
        <section ref={heroRef} className="relative w-full h-[85vh] md:h-screen overflow-hidden flex items-end justify-start bg-surface-variant">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
             <motion.img style={{ y: opacity }} alt="KINETIC Hero" className="block md:hidden w-full h-[120%] object-cover object-[center_top] -mt-[10%]" src="/hero-new.png"/>
             <motion.img style={{ y: opacity }} alt="KINETIC Hero" className="hidden md:block w-full h-[120%] object-cover object-[center_20%] -mt-[10%]" src="/hero-landscape.png"/>
             {/* Subtle gradient overlay for text readability without cheap drop shadows */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 md:from-black/60 md:via-black/20 to-transparent"></div>
          </div>
          
          <motion.div style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }} className="relative z-10 px-margin-mobile md:px-margin-desktop w-full max-w-[1440px] mx-auto pb-8 md:pb-24 flex flex-col items-start">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.2 }
                }
              }}
              className="mb-3 md:mb-6"
            >
              <div className="overflow-hidden">
                <motion.h1 
                  variants={{ hidden: { y: "100%" }, visible: { y: 0 } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-headline-lg text-4xl md:text-7xl lg:text-8xl text-white tracking-tight leading-none uppercase"
                >
                  Built For
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  variants={{ hidden: { y: "100%" }, visible: { y: 0 } }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-headline-lg text-4xl md:text-7xl lg:text-8xl text-white tracking-tight leading-none uppercase"
                >
                  Motion.
                </motion.h1>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 md:mb-10 max-w-[85%] md:max-w-lg text-white/90"
            >
              <p className="font-body-md text-xs md:text-lg mb-2 md:mb-6 leading-relaxed">
                Movement isn't just physical. It's growth, ambition, creativity, and progress.
              </p>
              <p className="font-label-caps opacity-90 leading-relaxed text-[8px] md:text-xs">
                KINETIC creates premium oversized T-shirts for people who refuse to stand still.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-row gap-2 md:gap-4 w-full sm:w-auto"
            >
              <Link className="inline-flex items-center justify-center bg-white text-black px-4 md:px-10 py-3 md:py-4 hover:bg-accent hover:text-white transition-all duration-300 w-1/2 sm:w-auto text-center" href="/collections">
                <span className="font-label-caps tracking-widest text-[9px] md:text-[11px]">SHOP COLLECTION</span>
              </Link>
              <Link className="inline-flex items-center justify-center bg-transparent border border-white/30 text-white px-4 md:px-10 py-3 md:py-4 hover:border-white hover:bg-white/10 transition-all duration-300 w-1/2 sm:w-auto text-center" href="/editorial">
                <span className="font-label-caps tracking-widest text-[9px] md:text-[11px]">EXPLORE LOOKBOOK</span>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* MARQUEE */}
        <div className="w-full bg-primary text-white py-6 overflow-hidden">
          <div className="whitespace-nowrap flex font-label-caps text-sm tracking-[0.3em] animate-marquee">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="mx-8">STAY IN MOTION // KINETIC // PHASE 01</span>
            ))}
          </div>
        </div>

        {/* FEATURED COLLECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-24 md:py-32"
        >
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <span className="font-label-caps text-accent mb-4 tracking-widest block">FEATURED COLLECTION</span>
            <h2 className="font-headline-lg text-4xl md:text-6xl text-primary mb-6">PHASE 01</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl">
              The first KINETIC drop. Six oversized heavyweight tees inspired by the forces that drive progress. Designed for people who move with purpose and wear their mindset.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.slice(0, 6).map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link className="inline-flex items-center gap-4 border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors font-label-caps tracking-widest" href="/collections">
              EXPLORE THE COLLECTION <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </motion.section>

        {/* BRAND PHILOSOPHY */}
        <motion.section 
          ref={philosophyRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="bg-surface-variant py-24 md:py-32"
        >
          <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
               <div className="w-full bg-white flex items-center justify-center p-4 md:p-8 aspect-square md:aspect-[4/5]">
                 <img 
                   alt="Brand Concept" 
                   className="w-full h-full object-contain" 
                   src="/mokups/design 2/detailed view.png"
                 />
               </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
              <span className="font-label-caps text-accent mb-6 block tracking-widest">BRAND PHILOSOPHY</span>
              <h3 className="font-headline-lg text-4xl md:text-5xl text-primary mb-8 leading-tight">WHY KINETIC EXISTS</h3>
              <p className="font-body-lg text-primary/80 mb-6 leading-relaxed">
                The world rewards movement. Not just running faster or working harder—but evolving, learning, creating, and pushing beyond where you were yesterday.
              </p>
              <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                KINETIC was built for people who believe progress is a lifestyle. Every oversized tee is designed with premium materials, modern fits, and intentional graphics that represent energy, ambition, and momentum.
              </p>
              <p className="font-body-md font-bold text-primary uppercase tracking-wide">
                Because staying still was never the plan.
              </p>
            </div>
          </div>
        </motion.section>

        {/* FEATURES SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-24 md:py-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div>
              <span className="material-symbols-outlined text-[32px] text-accent mb-4">layers</span>
              <h4 className="font-label-caps text-lg mb-4 text-primary tracking-widest">Heavyweight Comfort</h4>
              <p className="font-body-md text-on-surface-variant">Premium heavyweight cotton engineered for durability and everyday comfort.</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-[32px] text-accent mb-4">open_with</span>
              <h4 className="font-label-caps text-lg mb-4 text-primary tracking-widest">Made To Move</h4>
              <p className="font-body-md text-on-surface-variant">Relaxed oversized silhouettes designed for freedom and effortless styling.</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-[32px] text-accent mb-4">architecture</span>
              <h4 className="font-label-caps text-lg mb-4 text-primary tracking-widest">Built To Last</h4>
              <p className="font-body-md text-on-surface-variant">Quality craftsmanship in every stitch, print, and finish.</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-[32px] text-accent mb-4">hourglass_bottom</span>
              <h4 className="font-label-caps text-lg mb-4 text-primary tracking-widest">Limited Runs</h4>
              <p className="font-body-md text-on-surface-variant">Intentional small-batch releases focused on creativity and exclusivity.</p>
            </div>
          </div>
        </motion.section>

        {/* LOOKBOOK PREVIEW */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center bg-inverse-surface overflow-hidden"
        >
          <img src="/mokups/design 5/detailed.png" alt="Lookbook Preview" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[2s]" />
          <div className="relative z-10 text-center px-6">
            <h3 className="font-headline-lg text-4xl md:text-6xl text-white mb-6 uppercase">Movement In Real Life</h3>
            <p className="font-body-lg text-white/80 max-w-xl mx-auto mb-10">A collection of moments captured in motion. Real people. Real energy. Real stories.</p>
            <Link className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 hover:bg-accent hover:text-white transition-all duration-300 font-label-caps tracking-widest" href="/editorial">
              VIEW FULL LOOKBOOK
            </Link>
          </div>
        </motion.section>

        {/* COMMUNITY & REVIEWS */}
        <motion.section 
          className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-24 md:py-32"
        >
          <div className="text-center mb-16">
            <span className="font-label-caps text-accent mb-4 block tracking-widest">COMMUNITY</span>
            <h3 className="font-headline-lg text-4xl text-primary mb-6">JOIN THE MOVEMENT</h3>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              KINETIC is more than clothing. It's a community of creators, athletes, artists, students, entrepreneurs, and dreamers committed to moving forward.
            </p>
          </div>

          <div className="mt-20">
            <h4 className="font-label-caps text-center text-primary mb-12 tracking-widest">WHAT THE COMMUNITY SAYS</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface-variant p-8 border border-black/5">
                <div className="flex gap-1 text-accent mb-4">
                  {[1,2,3,4,5].map(star => <span key={star} className="material-symbols-outlined text-[18px]">star</span>)}
                </div>
                <p className="font-body-md text-primary mb-6">"The fit is exactly what I wanted. Oversized without feeling sloppy."</p>
                <span className="font-label-caps text-on-surface-variant opacity-70">VERIFIED BUYER</span>
              </div>
              <div className="bg-surface-variant p-8 border border-black/5">
                <div className="flex gap-1 text-accent mb-4">
                  {[1,2,3,4,5].map(star => <span key={star} className="material-symbols-outlined text-[18px]">star</span>)}
                </div>
                <p className="font-body-md text-primary mb-6">"The quality feels premium from the first wear. Highly recommended."</p>
                <span className="font-label-caps text-on-surface-variant opacity-70">VERIFIED BUYER</span>
              </div>
              <div className="bg-surface-variant p-8 border border-black/5">
                <div className="flex gap-1 text-accent mb-4">
                  {[1,2,3,4,5].map(star => <span key={star} className="material-symbols-outlined text-[18px]">star</span>)}
                </div>
                <p className="font-body-md text-primary mb-6">"Clean design, heavyweight fabric, and perfect everyday styling."</p>
                <span className="font-label-caps text-on-surface-variant opacity-70">VERIFIED BUYER</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* NEWSLETTER */}
        <section className="bg-surface-variant border-y border-black/10 py-24">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h3 className="font-headline-lg text-3xl md:text-5xl text-primary mb-6 uppercase">Stay In Motion</h3>
            <p className="font-body-md text-on-surface-variant mb-8">
              Be the first to know about new drops, exclusive releases, and community updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white border border-black/20 px-6 py-4 focus:outline-none focus:border-accent transition-colors font-body-md"
                required
              />
              <button type="submit" className="bg-primary text-white font-label-caps tracking-widest px-8 py-4 hover:bg-accent transition-colors">
                JOIN NOW
              </button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </motion.div>
  );
}
