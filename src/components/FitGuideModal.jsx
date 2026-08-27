"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FitGuideModal({ isOpen, onClose }) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-[500px] bg-white z-[110] shadow-2xl flex flex-col overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-black/10 sticky top-0 bg-white z-10">
              <h2 className="font-headline-lg text-2xl text-primary tracking-tight uppercase">Size & Fit Guide</h2>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant transition-colors rounded-full text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-8 flex flex-col gap-8">
              <div className="aspect-[4/5] bg-surface-variant w-full flex items-center justify-center relative border border-black/10">
                 {/* A minimalist line-art representation of a T-Shirt */}
                 <svg width="200" height="250" viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M70 20C70 20 80 40 100 40C120 40 130 20 130 20L180 30L190 90L140 100L140 230H60L60 100L10 90L20 30L70 20Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
                    {/* Measurement Lines */}
                    <line x1="40" y1="130" x2="160" y2="130" stroke="black" strokeDasharray="4 4" />
                    <text x="100" y="125" textAnchor="middle" fontSize="10" className="font-label-caps uppercase" fill="black">Chest</text>
                    
                    <line x1="150" y1="100" x2="150" y2="230" stroke="black" strokeDasharray="4 4" />
                    <text x="160" y="170" fontSize="10" className="font-label-caps uppercase" fill="black">Length</text>
                 </svg>
              </div>

              <div>
                <h3 className="font-label-caps text-accent tracking-widest mb-4">THE KINETIC FIT</h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Our garments are constructed with a signature oversized silhouette. The shoulders are dramatically dropped, the chest is widened, and the length is slightly cropped to maintain a boxy, structured look.
                </p>
                <p className="font-body-md font-medium mt-4 text-primary">We recommend taking your true size for the intended oversized look.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black/20 font-label-caps text-xs tracking-widest text-primary">
                      <th className="py-4 pr-4">SIZE</th>
                      <th className="py-4 px-4">CHEST (IN)</th>
                      <th className="py-4 px-4">LENGTH (IN)</th>
                      <th className="py-4 pl-4">SHOULDER (IN)</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-on-surface-variant">
                    <tr className="border-b border-black/5 hover:bg-black/5 transition-colors">
                      <td className="py-4 pr-4 font-label-caps text-primary">S</td>
                      <td className="py-4 px-4">22</td>
                      <td className="py-4 px-4">27</td>
                      <td className="py-4 pl-4">21</td>
                    </tr>
                    <tr className="border-b border-black/5 hover:bg-black/5 transition-colors">
                      <td className="py-4 pr-4 font-label-caps text-primary">M</td>
                      <td className="py-4 px-4">23</td>
                      <td className="py-4 px-4">28</td>
                      <td className="py-4 pl-4">22</td>
                    </tr>
                    <tr className="border-b border-black/5 hover:bg-black/5 transition-colors bg-surface-variant">
                      <td className="py-4 pr-4 font-label-caps text-primary">L</td>
                      <td className="py-4 px-4">24</td>
                      <td className="py-4 px-4">29</td>
                      <td className="py-4 pl-4">23</td>
                    </tr>
                    <tr className="border-b border-black/5 hover:bg-black/5 transition-colors">
                      <td className="py-4 pr-4 font-label-caps text-primary">XL</td>
                      <td className="py-4 px-4">25.5</td>
                      <td className="py-4 px-4">30</td>
                      <td className="py-4 pl-4">24</td>
                    </tr>
                    <tr className="border-b border-black/5 hover:bg-black/5 transition-colors">
                      <td className="py-4 pr-4 font-label-caps text-primary">XXL</td>
                      <td className="py-4 px-4">27</td>
                      <td className="py-4 px-4">31</td>
                      <td className="py-4 pl-4">25</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
