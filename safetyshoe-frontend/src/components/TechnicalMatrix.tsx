'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  ShieldCheck, 
  Zap, 
  Flame, 
  ChevronRight, 
  X,
  ArrowRight 
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

interface TechnicalMatrixProps {
  products?: any[];
}

const categories = [
  { id: 'all', label: 'All', icon: <Globe className="w-3 h-3" /> },
  { id: 'steel', label: 'Steel Toe', icon: <ShieldCheck className="w-3 h-3" /> },
  { id: 'composite', label: 'Composite', icon: <Zap className="w-3 h-3" /> },
  { id: 'specialty', label: 'Specialty', icon: <Flame className="w-3 h-3" /> }
];

export function TechnicalMatrix({ products = [] }: TechnicalMatrixProps) {
  const t = useTranslations('TechnicalMatrix');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter((p: any) => p.category === activeCategory);

  const flagship = products.find((p: any) => p.isFlagship);
  const gridItems = filteredProducts.filter((p: any) => !p.isFlagship || activeCategory !== 'all');

  const handleNext = () => {
    if (!selectedProduct) return;
    const currentIndex = products.findIndex((p: any) => p.id === selectedProduct.id);
    const nextIndex = (currentIndex + 1) % products.length;
    setSelectedProduct(products[nextIndex]);
    setCurrentImageIndex(0);
  };

  const handlePrev = () => {
    if (!selectedProduct) return;
    const currentIndex = products.findIndex((p: any) => p.id === selectedProduct.id);
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    setSelectedProduct(products[prevIndex]);
    setCurrentImageIndex(0);
  };

  return (
    <section id="matrix" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 pb-8 border-b border-slate-100 gap-8">
          <div className="flex items-center gap-6">
            <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
              {t('title') || 'Technical'} <span className="text-orange-600">{t('titleHighlight') || 'Matrix.'}</span>
            </h3>
            <div className="hidden md:block h-8 w-px bg-slate-200" />
            <p className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[200px] leading-tight">
              {t('subtitle') || 'Precision engineered safety solutions for global industry.'}
            </p>
          </div>
          
          <div className="flex bg-slate-50 p-1 border border-slate-200">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat.id 
                    ? "bg-slate-900 text-white shadow-lg" 
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeCategory === 'all' && flagship && (
              <div 
                onClick={() => setSelectedProduct(flagship)}
                className="lg:col-span-2 bg-slate-900 group relative flex flex-col sm:flex-row overflow-hidden cursor-pointer"
              >
                <div className="sm:w-1/2 relative overflow-hidden">
                  <img 
                    src={(flagship as any).image || (flagship as any).images?.[0] || '/images/placeholder.svg'} 
                    alt={(flagship as any).name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest italic">
                    {t('flagship') || 'Flagship'}
                  </div>
                </div>
                <div className="sm:w-1/2 p-8 flex flex-col justify-center">
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-3">{(flagship as any).name}</h4>
                  <p className="text-slate-400 text-[11px] mb-6 leading-relaxed font-medium line-clamp-2">
                    {(flagship as any).description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(flagship as any).certifications?.slice(0, 3).map((tag: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-white/10 text-white text-[8px] font-black uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-3 bg-white text-slate-900 text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">
                    {t('viewSpecs') || 'View Specs'}
                  </button>
                </div>
              </div>
            )}

            {gridItems.slice(0, 7).map((p: any) => (
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={p.id} 
                onClick={() => setSelectedProduct(p)}
                className="bg-white border border-slate-100 group hover:border-orange-600 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden relative bg-slate-50">
                  <img 
                    src={p.image || p.images?.[0] || '/images/placeholder.svg'} 
                    alt={p.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute top-3 left-3 bg-slate-900 text-white px-2 py-0.5 text-[7px] font-black uppercase tracking-widest">
                    {p.model_code || p.id}
                  </div>
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    {p.certifications?.slice(0, 2).map((tag: string, i: number) => (
                      <span key={i} className="px-1.5 py-0.5 bg-white/90 text-slate-900 text-[7px] font-black uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-orange-600 transition-colors">{p.name}</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-1 bg-orange-600 rounded-full" />
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{p.category}</span>
                  </div>
                  <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">
                      {p.safety_standard || 'EN ISO'}
                    </span>
                    <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-orange-600 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link 
            href={`/${locale}/products`}
            className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-all"
          >
            {t('viewAll') || 'View All Products'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-2xl"
            />
            
            <motion.div 
              key={selectedProduct.id}
              initial={{ scale: 0.95, opacity: 0, x: 50, rotateY: -10 }}
              animate={{ scale: 1, opacity: 1, x: 0, rotateY: 0 }}
              exit={{ scale: 0.95, opacity: 0, x: -50, rotateY: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative w-full max-w-6xl aspect-[16/10] bg-white shadow-[0_60px_120px_-20px_rgba(0,0,0,0.7)] flex overflow-hidden origin-center rounded-sm"
              style={{ perspective: "2500px" }}
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-900/10 text-slate-400 flex items-center justify-center z-[100] hover:bg-orange-600 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-1/2 h-full bg-white relative overflow-hidden border-r border-slate-100">
                <motion.div 
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full w-full relative"
                >
                  <img 
                    src={selectedProduct.image || selectedProduct.images?.[currentImageIndex] || '/images/placeholder.svg'} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>

              <div className="w-1/2 h-full bg-white p-16 flex flex-col relative overflow-y-auto">
                <div className="relative z-20">
                  <div className="flex justify-between items-start mb-14">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-orange-600" />
                        <span className="text-[9px] font-black text-orange-600 uppercase tracking-[0.4em]">{selectedProduct.model_code}</span>
                      </div>
                      <h4 className="text-5xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">{selectedProduct.name}</h4>
                    </div>
                    <div className="bg-slate-900 text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest">
                      {selectedProduct.category}
                    </div>
                  </div>

                  <div className="space-y-14">
                    <section>
                      <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-6 flex items-center gap-4">
                        01. Overview <div className="flex-grow h-px bg-slate-100" />
                      </h5>
                      <p className="text-slate-600 text-[13px] leading-relaxed font-medium italic border-l-2 border-slate-100 pl-6">
                        "{selectedProduct.description}"
                      </p>
                    </section>

                    <section>
                      <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Logistics</h5>
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-slate-900 uppercase">MOQ: 500 Pairs</div>
                        <div className="text-[10px] font-bold text-slate-900 uppercase">Lead: 35-45 Days</div>
                      </div>
                    </section>
                  </div>

                  <div className="mt-24 pt-10 border-t border-slate-200 flex justify-between items-center">
                    <div className="flex gap-2">
                      {selectedProduct.certifications?.slice(0, 5).map((tag: string, i: number) => (
                        <span key={i} className="px-2 py-1 border border-slate-200 text-slate-400 text-[8px] font-black uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={`/${locale}/products/${selectedProduct.slug}`}
                      className="bg-slate-900 text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-orange-600 transition-all flex items-center gap-3"
                    >
                      {t('viewDetail') || 'View Detail'} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute right-0 top-0 w-1 h-full bg-slate-100 z-[70]" />
            </motion.div>

            <div className="absolute inset-y-0 left-8 flex items-center z-[110]">
              <button 
                onClick={handlePrev}
                className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all shadow-2xl group"
              >
                <ChevronRight className="w-8 h-8 rotate-180 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="absolute bottom-12 right-12 z-[110]">
              <button 
                onClick={handleNext}
                className="px-6 h-14 rounded-full bg-orange-600 text-white flex items-center gap-3 hover:bg-white hover:text-orange-600 transition-all shadow-xl group"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">{t('next') || 'Next Product'}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}