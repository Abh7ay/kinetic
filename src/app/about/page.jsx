"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';

export default function About() {
  return (
    <div className="flex-grow pt-[120px] md:pt-[160px] flex flex-col min-h-screen bg-background">
      <main className="flex-grow pb-24">
        <section className="max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-label-caps text-accent mb-6 block tracking-widest">ABOUT KINETIC</span>
            <h1 className="font-headline-lg text-5xl md:text-7xl text-primary tracking-tight uppercase mb-12">
              Our Story
            </h1>
            
            <div className="space-y-8 font-body-lg text-on-surface-variant max-w-2xl text-lg md:text-xl leading-relaxed">
              <p>
                KINETIC was created around a simple belief: <br/><strong className="text-primary font-bold">Movement creates growth.</strong>
              </p>
              <p>
                Whether you're building a business, creating art, training for something bigger, or chasing a dream, progress comes from motion.
              </p>
              <p>
                We design premium streetwear for people committed to moving forward.
              </p>
            </div>
          </motion.div>
        </section>
        
        <section className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden">
           <img alt="Brand Story" className="absolute inset-0 w-full h-full object-cover object-center" src="/mokups/design 1/detailed view.png"/>
        </section>
      </main>
      <Footer />
    </div>
  );
}
