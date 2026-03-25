'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { Product } from '@/types';
import { ProductCertBadges } from '@/components/ProductCertBadges';

const SHOWCASE_TABS = [
  { key: 'featured', mode: 'featured' as const },
  { key: 'newArrivals', mode: 'new' as const },
];

function heroImageUrl(p: Product): string | null {
  const main = p.image;
  if (main && (main.startsWith('http') || main.startsWith('/'))) return main;
  const first = p.images?.[0];
  if (first && (first.startsWith('http') || first.startsWith('/'))) return first;
  return null;
}

export interface TechnicalMatrixProps {
  /** 构建时由服务端注入，静态导出后不再请求后端 */
  initialProducts: Product[];
}

export function TechnicalMatrix({ initialProducts }: TechnicalMatrixProps) {
  const t = useTranslations('TechnicalMatrix');
  const locale = useLocale() || 'en';
  const products = initialProducts;
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const mode = SHOWCASE_TABS[activeTab].mode;

  const pool = useMemo(() => {
    if (mode === 'featured') {
      return products.filter((p) => p.featured || p.is_new);
    }
    if (mode === 'new') {
      return products.filter((p) => p.is_new);
    }
    return products;
  }, [products, mode]);

  const hero = pool[0] || products[0];
  const side = pool.length > 1 ? pool.slice(1, 5) : products.slice(1, 5);

  const heroImg = hero ? heroImageUrl(hero) : null;

  const handleNext = () => {
    if (!selectedProduct) return;
    const allProducts = products;
    const currentIndex = allProducts.findIndex((p) => p.id === selectedProduct.id);
    const nextIndex = (currentIndex + 1) % allProducts.length;
    setSelectedProduct(allProducts[nextIndex]);
    setCurrentImageIndex(0);
  };

  const handlePrev = () => {
    if (!selectedProduct) return;
    const allProducts = products;
    const currentIndex = allProducts.findIndex((p) => p.id === selectedProduct.id);
    const prevIndex = (currentIndex - 1 + allProducts.length) % allProducts.length;
    setSelectedProduct(allProducts[prevIndex]);
    setCurrentImageIndex(0);
  };

  if (products.length === 0) {
    return (
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm">{t('emptyBuild')}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-8 h-px bg-slate-300" />
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
              {t('title')}
            </h2>
            <div className="w-8 h-px bg-slate-300" />
          </div>
          <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter italic">
            {t('titleHighlight')} <span className="text-orange-600">{t('titleHighlight2')}</span>
          </h3>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {SHOWCASE_TABS.map((item, idx) => {
            const active = idx === activeTab;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {item.key === 'featured' ? t('featured') : t('newArrivals')}
              </button>
            );
          })}
        </div>

        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-3"
        >
          {hero && heroImg && (
            <Link
              href={`/${locale}/products/${hero.slug || hero.model_code}`}
              className="group relative block min-h-[360px] overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm transition-all hover:border-primary-200 hover:shadow-md sm:col-span-2 sm:min-h-[400px] lg:col-span-2 lg:row-span-2 lg:min-h-[min(560px,58vh)]"
            >
              <div className="absolute inset-0 bg-white">
                {heroImg ? (
                  <Image
                    src={heroImg}
                    alt={hero.name}
                    fill
                    className="object-contain object-center p-4 transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">{t('noImage')}</div>
                )}
              </div>

              <div className="absolute left-3 top-3 z-10">
                <span className="rounded-full bg-orange-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  {hero.is_new ? t('newArrivals') : t('featured')}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                <ProductCertBadges product={hero} compact inline />
                <h3 className="mt-2 text-lg font-bold leading-snug text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_12px_rgba(0,0,0,0.65)] sm:text-xl lg:text-2xl">
                  {hero.name}
                </h3>
                {hero.model_code && (
                  <p className="mt-1 font-mono text-xs text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
                    {hero.model_code}
                  </p>
                )}
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]">
                  {t('viewDetail')} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          )}

          {side.map((product: Product) => (
            <motion.div
              key={product.id}
              layout
              className="group flex min-h-[220px] flex-col overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
              onClick={() => {
                setSelectedProduct(product);
                setCurrentImageIndex(0);
              }}
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-white ring-1 ring-inset ring-slate-100">
                {product.image || product.images?.[0] ? (
                  <Image
                    src={product.image || product.images![0]}
                    alt={product.name}
                    fill
                    className="object-contain object-center p-2 transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-400">{t('noImage')}</div>
                )}
                <ProductCertBadges product={product} compact />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3">
                <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">{product.name}</h4>
                {product.model_code && (
                  <p className="truncate font-mono text-[10px] text-slate-400">{product.model_code}</p>
                )}
                <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-2 text-[11px] text-slate-500">
                  <span>
                    {t('moqLabel')} <span className="font-semibold text-slate-800">{product.moq || '500'}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-orange-600" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-all"
          >
            {t('viewAll')} <ArrowRight className="w-4 h-4" />
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
              key={String(selectedProduct.id)}
              initial={{ scale: 0.95, opacity: 0, x: 50, rotateY: -10 }}
              animate={{ scale: 1, opacity: 1, x: 0, rotateY: 0 }}
              exit={{ scale: 0.95, opacity: 0, x: -50, rotateY: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="relative w-full max-w-6xl aspect-[16/10] bg-white shadow-[0_60px_120px_-20px_rgba(0,0,0,0.7)] flex overflow-hidden origin-center rounded-sm"
              style={{ perspective: '2500px' }}
            >
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-900/10 text-slate-400 flex items-center justify-center z-50 hover:bg-orange-600 hover:text-white transition-all"
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
                  <Image
                    src={selectedProduct.images?.[currentImageIndex] || selectedProduct.image || '/images/products/steel-toe-boot.jpg'}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain p-4"
                  />
                </motion.div>

                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2 justify-center">
                      {selectedProduct.images.map((img: string, i: number) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCurrentImageIndex(i)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            i === currentImageIndex ? 'border-orange-600' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <Image src={img} alt="" width={64} height={64} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-1/2 h-full bg-white p-8 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">{selectedProduct.model_code}</span>
                    </div>
                    <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{selectedProduct.name}</h4>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">{selectedProduct.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.additional_certs?.map((cert, i: number) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                        {cert}
                      </span>
                    ))}
                    {selectedProduct.safety_standard && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                        {selectedProduct.safety_standard}
                      </span>
                    )}
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{t('featuresLabel')}</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.features?.map((feature: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={`/${locale}/products/${selectedProduct.slug || selectedProduct.model_code}`}
                      className="w-full bg-orange-600 text-white py-4 text-center font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all block"
                    >
                      {t('viewDetail')}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute inset-y-0 left-4 flex items-center z-[110]">
              <button
                type="button"
                onClick={handlePrev}
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all shadow-xl"
              >
                <ChevronRight className="w-7 h-7 rotate-180" />
              </button>
            </div>

            <div className="absolute bottom-8 right-8 z-[110]">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 h-12 rounded-full bg-orange-600 text-white flex items-center gap-3 hover:bg-white hover:text-orange-600 transition-all shadow-xl"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">{t('next')}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
