"use client";
import React, { useState, useEffect } from 'react';
import { CartProvider } from '../context/CartContext';
import TopNavBar from './TopNavBar';
import CartDrawer from './CartDrawer';
import SplashScreen from './SplashScreen';
import { AnimatePresence } from 'framer-motion';

export default function ClientWrapper({ children }) {
  const [isAppLoaded, setIsAppLoaded] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (!hasSeenSplash) {
      setShowSplash(true);
      setIsAppLoaded(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setIsAppLoaded(true);
    setShowSplash(false);
    sessionStorage.setItem('hasSeenSplash', 'true');
  };

  return (
    <CartProvider>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      {/* Only render the actual app content once the splash is loaded or skipped */}
      {isAppLoaded && (
        <>
          <TopNavBar />
          {children}
          <CartDrawer />
        </>
      )}
    </CartProvider>
  );
}
