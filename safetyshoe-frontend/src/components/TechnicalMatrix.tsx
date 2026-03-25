'use client';

import { useState, useEffect } from 'react';
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
import { fetchProducts } from '@/lib/siteApi';

const categories = [
  { id: "all", label: "All", icon: <Globe className="w-3 h-3" /> },
  { id: "steel", label: "Steel Toe", icon: <ShieldCheck className="w-3 h-3" /> },
  { id: "composite", label: "Composite", icon: <Zap className="w-3 h-3" /> },
  { id: "specialty", label: "Specialty", icon: <Flame className="w-3 h-3" /> }
];

function mapToProductFormat(product: any) {
  const certifications = product.additional_certs || product.certifications || [];
  const safety = product.safety_standard || '';
  
  let category = 'steel';
  if (safety.includes('S1') || safety.includes('S2')) category = 'composite';
  if (safety.includes('WR') || safety.includes('HRO') || safety.includes('FO')) category = 'specialty';

  const images = product.images || (product.image ? [product.image] : []);
  
  const specs = {
    toe: product.specs_extra?.toe || (safety.includes('Steel') ? 'Steel Toe Cap' : 'Composite Toe'),
    midsole: product.specs_extra?.midsole || 'Anti-Puncture Steel Plate',
    sole: product.specs_extra?.sole || 'PU/Rubber Sole',
    upper: product.materials?.upper || 'Full Grain Leather',
    lining: product.materials?.lining || 'Breathable Mesh'
  };

  return {
    id: product.model_code || product.id,
    name: product.name,
    category: category,
    isFlagship: product.is_hot || product.featured || false,
    image: images[0] || '/images/placeholder.svg',
    gallery: images.length > 0 ? images : ['/images/placeholder.svg'],
    features: product.features || [],
    compliance: safety || 'EN ISO 20345',
    techTags: certifications.slice(0, 3),
    description: product.description || '',
    specs: specs,
    slug: product.slug,
    model_code: product.model_code,
    moq: product.moq || '500 Pairs'
  };
}

export function TechnicalMatrix() {
  const t = useTranslations('TechnicalMatrix');
  const locale = useLocale();
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(locale, { limit: 50 });
        const transformed = data.map((p: any) => mapToProductFormat(p));
        setProducts(transformed);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [locale]);

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const flagship = products.find(p => p.isFlagship);
  const gridItems = filteredProducts.filter(p => !p.isFlagship || activeCategory !== "all");

  const handleNext = () => {
    if (!selectedProduct) return;
    const currentIndex = products.findIndex(p => p.id === selectedProduct.id);
    const nextIndex = (currentIndex + 1) % products.length;
    setSelectedProduct(products[nextIndex]);
    setCurrentImageIndex(0);
  };

  const handlePrev = () => {
    if (!selectedProduct) return;
    const currentIndex = products.findIndex(p => p.id === selectedProduct.id);
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    setSelectedProduct(products[prevIndex]);
    setCurrentImageIndex(0);
  };

  if (loading) {
    return (
      <section id="matrix" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="matrix" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 pb-8 border-b border-slate-100 gap-8">
          <div className="flex items-center gap-6">
            <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
              {t('title') || 'Technical'} <span className="text-orange-600">Matrix.</span>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {activeCategory === "all" && flagship && (
            <div 
              onClick={() => setSelectedProduct(flagship)}
              className="lg:col-span-2 bg-slate-900 group relative flex flex-col sm:flex-row overflow-hidden cursor-pointer"
            >
              <div className="sm:w-1/2 relative overflow-hidden">
                <img 
                  src={flagship.image} 
                  alt={flagship.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest italic">
                  {t('flagship') || 'Flagship'}
                </div>
              </div>
              <div className="sm:w-1/2 p-8 flex flex-col justify-center">
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-3">{flagship.name}</h4>
                <p className="text-slate-400 text-[11px] mb-6 leading-relaxed font-medium line-clamp-2">
                  {flagship.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {flagship.techTags.map((tag: string, i: number) => (
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

          {gridItems.map((p) => (
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
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute top-3 left-3 bg-slate-900 text-white px-2 py-0.5 text-[7px] font-black uppercase tracking-widest">
                  {p.model_code || p.id}
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1">
                  {p.techTags?.slice(0, 2).map((tag: string, i: number) => (
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
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{p.features[0] || p.category}</span>
                </div>
                <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{p.compliance}</span>
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-orange-600 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
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
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-50" 
                   style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

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
                    src={selectedProduct.gallery[currentImageIndex]} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end z-20">
                    <div className="space-y-3">
                      <div className="text-[9px] font-black text-white bg-slate-900 px-3 py-1 uppercase tracking-[0.2em] inline-block">
                        Detail {currentImageIndex + 1}/{selectedProduct.gallery.length}
                      </div>
                      <div className="flex gap-1.5">
                        {selectedProduct.gallery.map((_: any, i: number) => (
                          <button 
                            key={i} 
                            onClick={() => setCurrentImageIndex(i)}
                            className={`h-1 transition-all duration-500 ${i === currentImageIndex ? 'w-10 bg-orange-600' : 'w-4 bg-slate-200'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="w-1/2 h-full bg-white p-16 flex flex-col relative overflow-y-auto">
                <div className="relative z-20">
                  <div className="flex justify-between items-start mb-14">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-orange-600" />
                        <span className="text-[9px] font-black text-orange-600 uppercase tracking-[0.4em]">{selectedProduct.model_code || selectedProduct.id}</span>
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
                      <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-6 flex items-center gap-4">
                        02. Engineering <div className="flex-grow h-px bg-slate-100" />
                      </h5>
                      <div className="grid grid-cols-1 gap-3">
                        {Object.entries(selectedProduct.specs || {}).map(([key, value]: [string, any]) => (
                          <div key={key} className="flex justify-between items-center group">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest group-hover:text-orange-600 transition-colors">{key}</span>
                            <div className="flex-grow mx-4 border-b border-dotted border-slate-200" />
                            <span className="text-[10px] font-bold text-slate-900 uppercase">{value}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    <div className="grid grid-cols-2 gap-10">
                      <section>
                        <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Compliance</h5>
                        <div className="text-2xl font-black text-slate-900 italic tracking-tighter">{selectedProduct.compliance}</div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase mt-1">Certified Industrial Grade</div>
                      </section>
                      <section>
                        <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Logistics</h5>
                        <div className="space-y-1">
                          <div className="text-[10px] font-bold text-slate-900 uppercase">MOQ: {selectedProduct.moq || '500 Pairs'}</div>
                          <div className="text-[10px] font-bold text-slate-900 uppercase">Lead: 35-45 Days</div>
                        </div>
                      </section>
                    </div>
                  </div>

                  <div className="mt-24 pt-10 border-t border-slate-200 flex justify-between items-center">
                    <div className="flex gap-2">
                      {selectedProduct.techTags?.map((tag: string, i: number) => (
                        <span key={i} className="px-2 py-1 border border-slate-200 text-slate-400 text-[8px] font-black uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={`/${locale}/products/${selectedProduct.slug || selectedProduct.model_code}`}
                      className="bg-slate-900 text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-orange-600 transition-all flex items-center gap-3"
                    >
                      {t('viewDetail') || 'View Detail'} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="absolute bottom-8 right-12 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
                  Shenglei / Technical Lookbook / P.0{products.findIndex(p => p.id === selectedProduct.id) + 1}
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