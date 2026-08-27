"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import Footer from '../../components/Footer';

export default function CollectionClient({ initialProducts }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  
  // Use products passed from server component
  const products = initialProducts || [];
  
  const categories = ['ALL', 'OVERSIZED', 'GRAPHIC', 'BASICS', 'HEAVYWEIGHT'];

  const filteredProducts = activeCategory === 'ALL' 
    ? products 
    : products.filter(p => p.category?.toUpperCase() === activeCategory);

  return (
    <div className="flex-grow pt-[120px] md:pt-[160px] flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop mb-12 border-b border-black/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-headline-lg text-4xl md:text-6xl text-primary tracking-tight uppercase mb-4"
            >
              PHASE 01
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-body-lg text-on-surface-variant max-w-xl text-sm md:text-base leading-relaxed"
            >
              The first KINETIC drop. Six oversized heavyweight tees inspired by the forces that drive progress. Designed for people who move with purpose and wear their mindset.
            </motion.p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-label-caps whitespace-nowrap transition-colors border-b-2 pb-1 ${activeCategory === cat ? 'border-accent text-accent' : 'border-transparent text-primary/60 hover:text-primary'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>


        
        <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop pb-32 min-h-[50vh]">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex justify-center py-32"
              >
                <p className="font-body-lg text-black/40">No pieces found in this category.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 lg:gap-x-12 gap-y-12 md:gap-y-24 lg:gap-y-32"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={index === 0 ? "col-span-2 md:col-span-2 lg:col-span-2" : ""}
                  >
                    <ProductCard product={product} index={index} isFeatured={index === 0} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </div>
  );
}
