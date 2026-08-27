"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../../context/CartContext';
import Footer from '../../../components/Footer';
import MagneticButton from '../../../components/MagneticButton';
import FitGuideModal from '../../../components/FitGuideModal';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

export default function ProductDetail({ product }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('L');
  const [showToast, setShowToast] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('details');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });
  const [showFitGuide, setShowFitGuide] = useState(false);
  const { addToCart } = useCart();
  
  // product is now passed as a prop
  useEffect(() => {
    if (!product) {
      router.push('/collections');
    }
  }, [product, router]);

  if (!product) return null;

  const imagesArray = [product.images.front, product.images.side, product.images.back, product.images.detail].filter(Boolean);

  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % imagesArray.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev === 0 ? imagesArray.length - 1 : prev - 1));

  const handleMouseMove = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x: `${x}%`, y: `${y}%` });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const toggleAccordion = (section) => setActiveAccordion(activeAccordion === section ? null : section);

  return (
    <>
    <FitGuideModal isOpen={showFitGuide} onClose={() => setShowFitGuide(false)} />
    <AnimatePresence>
      {showToast && (
        <motion.div 
          key="product-toast"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 right-8 z-[70] bg-accent text-white px-6 py-4 font-label-caps flex items-center gap-3 shadow-lg"
        >
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          Added to Bag
        </motion.div>
      )}

    </AnimatePresence>

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex-grow pt-[120px] md:pt-[160px] flex flex-col min-h-screen bg-background"
    >
      <main className="flex-grow pb-24">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Image Gallery */}
            <div className="flex flex-col gap-4 relative">
              <div 
                className="w-full relative group bg-surface-variant cursor-crosshair overflow-hidden"
                onMouseEnter={() => { if (typeof window !== 'undefined' && window.innerWidth >= 1024) setIsHoveringImage(true); }}
                onMouseLeave={() => setIsHoveringImage(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setShowMobileControls(prev => !prev)}
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImageIndex}
                    src={imagesArray[activeImageIndex]}
                    alt={`${product.name} View ${activeImageIndex + 1}`} 
                    className="w-full h-auto object-contain mix-blend-multiply"
                    style={{
                      transformOrigin: `${mousePos.x} ${mousePos.y}`,
                      transform: isHoveringImage ? 'scale(2)' : 'scale(1)',
                      transition: isHoveringImage ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold) nextImage();
                      else if (swipe > swipeConfidenceThreshold) prevImage();
                    }}
                  />
                </AnimatePresence>

                <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white hover:bg-accent hover:text-white text-black transition-all rounded-full shadow-lg ${showMobileControls ? 'opacity-100' : 'opacity-0 md:opacity-100'} md:pointer-events-auto pointer-events-none`}>
                  <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white hover:bg-accent hover:text-white text-black transition-all rounded-full shadow-lg ${showMobileControls ? 'opacity-100' : 'opacity-0 md:opacity-100'} md:pointer-events-auto pointer-events-none`}>
                  <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                </button>
              </div>
              
              <div className="flex justify-center gap-2 mt-4">
                {imagesArray.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-[2px] transition-all duration-300 ${activeImageIndex === index ? 'w-12 bg-primary' : 'w-6 bg-primary/20 hover:bg-primary/50'}`}
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="pt-4 lg:pt-12">
              <div className="lg:sticky lg:top-[160px]">
                <div className="mb-12">
                  <span className="font-label-caps text-accent mb-4 tracking-widest block">PHASE 01 DROP</span>
                  <h1 className="font-headline-lg text-4xl md:text-5xl text-primary tracking-tight uppercase mb-4">
                    {product.name}
                  </h1>
                  <span className="font-body-lg text-primary block mb-6">₹{product.price.toLocaleString('en-IN')}</span>
                  
                  <div className="flex gap-2 mb-8">
                    <span className="border border-black/10 text-primary font-label-sm px-3 py-1 uppercase tracking-widest">{product.color}</span>
                    <span className="border border-black/10 text-primary font-label-sm px-3 py-1 uppercase tracking-widest">{product.material}</span>
                  </div>

                  <div className="mb-12">
                    <h3 className="font-label-caps text-primary mb-4 tracking-widest">PRODUCT STORY</h3>
                    <p className="font-body-lg text-on-surface-variant leading-relaxed">
                      {product.description}
                    </p>
                    {product.id === 'pride-001' && (
                      <p className="font-body-lg text-on-surface-variant leading-relaxed mt-4">
                        Pride is not arrogance. It's the confidence earned through effort, discipline, and consistency. Built for those who trust their work, own their journey, and move through the world without seeking validation.
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-label-caps text-primary tracking-widest">SELECT SIZE</span>
                      <button onClick={() => setShowFitGuide(true)} className="font-label-sm text-on-surface-variant underline underline-offset-4 hover:text-accent transition-colors">SIZE GUIDE</button>
                    </div>
                    <div className="grid grid-cols-5 gap-2 mb-8">
                      {sizes.map(size => (
                        <button 
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`font-label-caps py-4 transition-all border ${selectedSize === size ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary border-black/10 hover:border-black'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 mb-12">
                      <MagneticButton 
                        onClick={handleAddToCart}
                        className="w-full bg-primary text-white font-label-caps py-5 hover:bg-accent transition-colors flex items-center justify-center gap-4"
                      >
                        ADD TO BAG
                      </MagneticButton>
                      <button 
                        className="w-full bg-white text-primary border border-primary font-label-caps py-5 hover:bg-surface-variant transition-colors flex items-center justify-center gap-4"
                      >
                        BUY NOW
                      </button>
                    </div>

                    <div className="border-t border-black/10">
                      {/* Product Details Accordion */}
                      <div className="border-b border-black/10">
                        <button onClick={() => toggleAccordion('details')} className="w-full py-6 flex justify-between items-center text-primary font-label-caps tracking-widest hover:text-accent transition-colors">
                          <span>PRODUCT DETAILS</span>
                          <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: activeAccordion === 'details' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                        </button>
                        <AnimatePresence>
                          {activeAccordion === 'details' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <ul className="pb-6 text-on-surface-variant font-body-md list-disc pl-4 space-y-2">
                                <li>Premium heavyweight cotton</li>
                                <li>Oversized fit</li>
                                <li>Durable graphic print</li>
                                <li>Soft-touch finish</li>
                                <li>Reinforced stitching</li>
                                <li>Everyday comfort</li>
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Fit Notes Accordion */}
                      <div className="border-b border-black/10">
                        <button onClick={() => toggleAccordion('fit')} className="w-full py-6 flex justify-between items-center text-primary font-label-caps tracking-widest hover:text-accent transition-colors">
                          <span>FIT NOTES</span>
                          <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: activeAccordion === 'fit' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                        </button>
                        <AnimatePresence>
                          {activeAccordion === 'fit' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="pb-6 text-on-surface-variant font-body-md space-y-4">
                                <p>Model wears size L for an oversized fit.</p>
                                <p>Choose your normal size for a relaxed fit or size up for a more oversized silhouette.</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Shipping Accordion */}
                      <div className="border-b border-black/10">
                        <button onClick={() => toggleAccordion('shipping')} className="w-full py-6 flex justify-between items-center text-primary font-label-caps tracking-widest hover:text-accent transition-colors">
                          <span>SHIPPING & RETURNS</span>
                          <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: activeAccordion === 'shipping' ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                        </button>
                        <AnimatePresence>
                          {activeAccordion === 'shipping' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="pb-6 text-on-surface-variant font-body-md space-y-4">
                                <p>Pan-India delivery within 5-7 business days. Complimentary shipping on all prepaid orders.</p>
                                <p>We accept returns and exchanges within 7 days of delivery. Garments must remain in their original, unwashed condition with all tags attached.</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
    </>
  );
}
