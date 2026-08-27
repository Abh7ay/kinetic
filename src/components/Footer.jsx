import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-24 overflow-hidden mt-auto">
      
      {/* Infinite Marquee */}
      <div className="w-full border-y border-white/20 py-4 mb-24 overflow-hidden">
        <div className="whitespace-nowrap flex font-label-caps text-sm tracking-[0.3em] animate-marquee text-white/50">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="mx-8">SIGN UP FOR NEWSLETTER // STAY IN MOTION // PHASE 01</span>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-white mb-24">
        <div className="lg:col-span-2">
          <p className="font-body-md text-white/70 max-w-sm">
            Premium oversized streetwear designed for individuals who embrace movement, growth, and self-expression.
          </p>
        </div>
        <div>
          <h4 className="font-label-caps tracking-widest text-white/50 mb-6">EXPLORE</h4>
          <div className="flex flex-col gap-4 font-body-md">
            <Link href="/collections" className="hover:text-white/70 transition-colors">Phase 01 Collection</Link>
            <Link href="/editorial" className="hover:text-white/70 transition-colors">The Movement Archive</Link>
            <Link href="/about" className="hover:text-white/70 transition-colors">Our Story</Link>
          </div>
        </div>
        <div>
          <h4 className="font-label-caps tracking-widest text-white/50 mb-6">CONNECT</h4>
          <div className="flex flex-col gap-4 font-body-md">
            <a href="#" className="hover:text-white/70 transition-colors">Instagram</a>
            <a href="#" className="hover:text-white/70 transition-colors">Twitter</a>
            <a href="#" className="hover:text-white/70 transition-colors">Contact Us</a>
          </div>
        </div>
      </div>

      {/* Massive Typography */}
      <div className="w-full px-margin-mobile md:px-margin-desktop overflow-hidden flex justify-center">
        <h2 className="font-headline-lg text-[15vw] leading-none tracking-tighter uppercase text-white/90 select-none">
          KINETIC
        </h2>
      </div>

      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/50 font-label-caps tracking-widest text-xs">
        <p>© {new Date().getFullYear()} KINETIC. ALL RIGHTS RESERVED.</p>
        <p>DESIGNED IN INDIA</p>
      </div>
    </footer>
  );
}
