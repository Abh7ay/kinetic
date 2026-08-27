import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, index, isFeatured }) {
  const { addToCart } = useCart();
  // Create an asymmetrical layout effect based on index
  const isStaggered = !isFeatured && index % 2 !== 0;

  return (
    <article className={`group flex flex-col ${isStaggered ? 'md:mt-32' : ''} h-full`}>
      <div className={`overflow-hidden mb-6 relative ${isFeatured ? 'aspect-[4/5] md:aspect-square' : isStaggered ? 'aspect-[3/4] md:aspect-[4/5]' : 'aspect-[3/4]'}`}>
        <Link href={product.route || `/product/${product.id}`} className="block w-full h-full cursor-hover-target relative">
          <img 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-out group-hover:opacity-0" 
            src={product.image}
          />
          <img 
            alt={`${product.name} Alternate View`} 
            className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 group-hover:scale-[1.02]" 
            src={product.images?.detail || product.images?.back || product.image}
          />
        </Link>
        
        <button 
          onClick={(e) => { e.preventDefault(); addToCart(product, 'L'); }}
          className="absolute bottom-4 right-4 bg-white/90 text-primary w-10 h-10 flex items-center justify-center shadow-lg hover:bg-accent hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20"
          title="Quick Add to Bag (Size L)"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
        
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-label-sm rounded-[2px] shadow-sm tracking-widest pointer-events-none z-10 text-[10px]">
            NEW IN
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <Link href={product.route || '/product/1'} className="flex flex-col gap-1 cursor-hover-target group-hover:opacity-70 transition-opacity">
          <h4 className="font-body-md text-primary font-medium tracking-tight text-lg">{product.name}</h4>
          <p className="font-label-sm text-on-surface-variant text-[10px] uppercase tracking-widest">{product.color} — KINETIC QUALITY</p>
        </Link>
        <span className="font-label-caps text-primary">₹{product.price.toLocaleString('en-IN')}</span>
      </div>
    </article>
  );
}
