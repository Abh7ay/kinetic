"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';

export default function TopNavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname() || '/';
  const { totalItems, toggleCart } = useCart();

  useEffect(() => {
    // Check initial dark mode preference
    if (typeof document !== 'undefined') {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleDarkMode = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark');
      setIsDarkMode(!isDarkMode);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const isCargo = pathname.startsWith('/collections') || pathname.startsWith('/product');
  const isEditorial = pathname === '/editorial';
  const isArchive = pathname === '/archive';

  // Determine colors based on scroll and page
  const navBgClass = isScrolled ? 'bg-white/90 border-b border-surface-variant backdrop-blur-xl' : 'bg-transparent';
  
  // Text color logic: white if on home and not scrolled, black otherwise
  const textColor = (isHome && !isScrolled) ? 'text-white hover:text-white/70' : 'text-primary hover:text-primary/70';
  const iconColor = (isHome && !isScrolled) ? 'text-white' : 'text-primary';
  const brandColor = (isHome && !isScrolled) ? 'text-white' : 'text-primary';
  const unselectedTextColor = (isHome && !isScrolled) ? 'text-white/60 hover:text-white' : 'text-on-surface-variant hover:text-primary';

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${navBgClass}`} id="main-nav">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-margin-mobile md:px-margin-desktop py-4 md:py-6 w-full max-w-[1440px] mx-auto">
          {/* Left Column: Navigation Links (Desktop) or Hamburger (Mobile) */}
          <div className="flex justify-start">
            <div className="hidden lg:flex gap-8 items-center">
              <Link 
                className={`font-label-caps transition-all duration-300 ${isHome ? textColor + ' border-b border-current pb-1' : unselectedTextColor} hover:text-accent`} 
                href="/"
              >
                HOME
              </Link>
              <Link 
                className={`font-label-caps transition-all duration-300 ${isCargo ? textColor + ' border-b border-current pb-1' : unselectedTextColor} hover:text-accent`} 
                href="/collections"
              >
                SHOP
              </Link>
              <Link 
                className={`font-label-caps transition-all duration-300 ${pathname === '/about' ? textColor + ' border-b border-current pb-1' : unselectedTextColor} hover:text-accent`} 
                href="/about"
              >
                OUR STORY
              </Link>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className={`lg:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 ${iconColor} transition-all duration-300 hover:opacity-70`}
            >
              <div className="w-6 h-[2px] bg-current rounded-full" />
              <div className="w-6 h-[2px] bg-current rounded-full" />
              <div className="w-6 h-[2px] bg-current rounded-full" />
            </button>
          </div>
          
          {/* Center Column: Logo */}
          <div className="flex justify-center">
            <Link className={`font-display-xl-mobile text-[24px] md:text-[36px] tracking-tight hover:opacity-70 transition-all duration-300 ${brandColor}`} href="/">
              KINETIC
            </Link>
          </div>
          
          {/* Right Column: User & Cart Icons */}
          <div className="flex justify-end gap-4 md:gap-6 items-center">
            <button onClick={toggleDarkMode} className={`${iconColor} hover:opacity-70 transition-all active:scale-95 duration-300`} title="Toggle Midnight Mode">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 300, 'FILL' 0" }}>
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button className={`${iconColor} hover:opacity-70 transition-all active:scale-95 duration-300`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 300, 'FILL' 0" }}>person</span>
            </button>
            <button onClick={toggleCart} className={`${iconColor} hover:opacity-70 transition-all active:scale-95 duration-300 relative`}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 300, 'FILL' 0" }}>shopping_bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white z-[60] flex flex-col"
          >
            <div className="flex justify-between items-center px-margin-mobile py-8 border-b border-surface-variant">
              <Link className="font-display-xl-mobile tracking-tighter text-primary text-[24px]" href="/">KINETIC</Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex flex-col justify-center items-center w-8 h-8 hover:opacity-70 transition-opacity relative"
              >
                <div className="w-6 h-[2px] bg-primary absolute rotate-45 rounded-full" />
                <div className="w-6 h-[2px] bg-primary absolute -rotate-45 rounded-full" />
              </button>
            </div>
            <div className="flex flex-col p-margin-mobile gap-8 mt-12 items-center text-center">
              <Link onClick={() => setIsMobileMenuOpen(false)} className="font-display-xl-mobile text-[32px] text-primary hover:opacity-70 transition-opacity" href="/">HOME</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} className="font-display-xl-mobile text-[32px] text-primary hover:opacity-70 transition-opacity" href="/collections">SHOP</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} className="font-display-xl-mobile text-[32px] text-on-surface-variant hover:text-primary transition-colors" href="/about">MANIFESTO</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
