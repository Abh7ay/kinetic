"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-[90] backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-[450px] bg-white z-[100] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-black/10">
              <h2 className="font-headline-lg text-2xl text-primary tracking-tight">CART ({totalItems})</h2>
              <button onClick={closeCart} className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant transition-colors rounded-full text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-8 scrollbar-hide">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <span className="material-symbols-outlined text-[48px] mb-4">shopping_bag</span>
                  <p className="font-label-caps tracking-widest text-primary">Your bag is empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6">
                    <div className="w-24 h-32 bg-surface-variant flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col flex-grow justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-body-md font-medium text-primary leading-tight pr-4">{item.name}</h3>
                          <span className="font-label-caps text-primary">₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="font-label-caps text-[10px] text-on-surface-variant tracking-widest mb-1">{item.color} / SIZE {item.size}</p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-black/20">
                          <button onClick={() => updateQuantity(item.id, item.size, -1)} className="w-8 h-8 flex items-center justify-center text-primary hover:bg-black/5 transition-colors">-</button>
                          <span className="font-label-caps w-8 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.size, 1)} className="w-8 h-8 flex items-center justify-center text-primary hover:bg-black/5 transition-colors">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id, item.size)} className="font-label-caps text-[10px] text-on-surface-variant hover:text-error transition-colors tracking-widest underline underline-offset-4">
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-black/10 p-6 bg-surface-variant/30">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-label-caps tracking-widest text-primary">SUBTOTAL</span>
                  <span className="font-body-lg text-primary">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="font-body-md text-xs text-on-surface-variant mb-6">Shipping & taxes calculated at checkout.</p>
                <button className="w-full bg-primary text-white font-label-caps py-5 tracking-widest hover:bg-accent transition-colors">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
