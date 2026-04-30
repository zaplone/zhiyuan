'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Eye, Layers, Shield, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { Product } from '@/types';
import { ProductCertBadges } from '@/components/ProductCertBadges';
import { ImageViewer } from './ImageViewer';

const SHOWCASE_TABS = [
  { key: 'featured', mode: 'featured' as const },
  { key: 'newArrivals', mode: 'new' as const },
];

const TRUST_KEYS = ['ce', 'enIso', 'astm', 'oem', 'moq'] as const;
const STORY_KEYS = ['lightweight', 'heavyDuty', 'outsole', 'oem'] as const;

function heroImageUrl(p: Product): string | null {
  const main = p.image;
  if (main && (main.startsWith('http') || main.startsWith('/'))) return main;
  const first = p.images?.[0];
  if (first && (first.startsWith('http') || first.startsWith('/'))) return first;
  return null;
}

function uniqueProducts(products: Product[]): Product[] {
  const seen = new Set<string>();
  return products.filter((product) => {
    const id = String(product.id);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
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
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const featuredProducts = uniqueProducts([...pool, ...products]).slice(0, 8);
  const storyProducts = uniqueProducts([...pool, ...products]).slice(0, 4);

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
    <section id="products" className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-orange-600" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                {t('title')}
              </h2>
            </div>
            <h3 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-tighter text-slate-950 sm:text-5xl lg:text-6xl">
              {t('titleHighlight')}{' '}
              <span className="text-orange-600">{t('titleHighlight2')}</span>
            </h3>
          </div>
          <div className="max-w-xl lg:justify-self-end">
            <p className="text-base leading-8 text-slate-600">{t('subtitle')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 bg-orange-600 px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-orange-600/15 transition hover:bg-slate-900"
              >
                {t('viewAll')} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/services/oem`}
                className="inline-flex items-center gap-2 border border-slate-200 bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-slate-900 transition hover:border-orange-300 hover:text-orange-600"
              >
                {t('oemCta')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {STORY_KEYS.map((key, idx) => {
            const product = storyProducts[idx];
            const img = product ? heroImageUrl(product) : null;
            const isOemTile = key === 'oem';
            const content = (
              <>
                <div className="absolute inset-x-0 top-0 h-[68%] bg-white">
                  {img ? (
                    <Image
                      src={img}
                      alt={product?.name || t(`stories.${key}.title`)}
                      fill
                      className="object-contain object-center p-5 transition duration-500 group-hover:scale-[1.025] sm:p-8"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">{t('noImage')}</div>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[42%] bg-white/96 shadow-[0_-24px_70px_rgba(255,255,255,0.98)]" />
                <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                  <span className="rounded-full bg-orange-600 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-sm">
                    {t(`stories.${key}.tag1`)}
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-slate-900 shadow-sm backdrop-blur">
                    {t(`stories.${key}.tag2`)}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                  {product && <ProductCertBadges product={product} compact inline />}
                  <h4 className="mt-3 max-w-md text-2xl font-black uppercase leading-none tracking-tighter text-slate-950 sm:text-3xl">
                    {t(`stories.${key}.title`)}
                  </h4>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
                    {t(`stories.${key}.description`)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-orange-600">
                    {t(`stories.${key}.action`)}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </>
            );

            if (isOemTile) {
              return (
                <Link
                  key={key}
                  href={`/${locale}/services/oem`}
                  className="group relative min-h-[390px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-xl sm:min-h-[430px]"
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (!product) return;
                  setSelectedProduct(product);
                  setCurrentImageIndex(0);
                }}
                className="group relative min-h-[390px] overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-xl sm:min-h-[430px]"
              >
                {content}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-y border-slate-200 bg-slate-50 px-4 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
          {TRUST_KEYS.map((key) => (
            <span key={key}>{t(`trust.${key}`)}</span>
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h4 className="text-2xl font-black uppercase tracking-tighter text-slate-950 sm:text-3xl">
                {t('featuredGridTitle')}
              </h4>
              <p className="mt-2 text-sm text-slate-500">{t('featuredGridSubtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
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
          </div>

          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {featuredProducts.map((product) => {
              const img = heroImageUrl(product);

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    setSelectedProduct(product);
                    setCurrentImageIndex(0);
                  }}
                  className="group flex min-h-[360px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white ring-1 ring-inset ring-slate-100">
                    {img ? (
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        className="object-contain object-center p-4 transition duration-500 group-hover:scale-[1.025]"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-400">{t('noImage')}</div>
                    )}
                    <ProductCertBadges product={product} compact />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h5 className="line-clamp-2 text-sm font-bold leading-snug text-slate-950 transition group-hover:text-orange-600">
                      {product.name}
                    </h5>
                    {product.model_code && (
                      <p className="mt-2 truncate font-mono text-[10px] uppercase tracking-widest text-slate-400">
                        {product.model_code}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                      <span>
                        {t('moqLabel')} <span className="font-semibold text-slate-800">{product.moq || '500 Pairs'}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-orange-600">
                        <Eye className="h-3.5 w-3.5" />
                        {t('quickView')}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>

          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-3 bg-slate-900 px-9 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-orange-600"
            >
              {t('viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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

              <div className="w-[60%] h-full bg-white relative overflow-hidden border-r border-slate-100">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full w-full relative cursor-zoom-in"
                  onClick={() => setIsFullscreen(true)}
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

              <div className="w-[40%] h-full bg-white p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">{selectedProduct.model_code}</span>
                    </div>
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{selectedProduct.name}</h4>
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

                  {/* Materials - 材质规格 */}
                  {selectedProduct.materials && Object.keys(selectedProduct.materials).length > 0 && (
                    <div className="border-t border-slate-200 pt-6">
                      <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Material Specs
                      </h5>
                      <div className="space-y-2 text-sm">
                        {selectedProduct.materials.upper && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Upper</span>
                            <span className="font-semibold text-slate-900">{selectedProduct.materials.upper}</span>
                          </div>
                        )}
                        {selectedProduct.materials.toe_cap && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Toe Cap</span>
                            <span className="font-semibold text-slate-900">{selectedProduct.materials.toe_cap}</span>
                          </div>
                        )}
                        {selectedProduct.materials.midsole && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Midsole</span>
                            <span className="font-semibold text-slate-900">{selectedProduct.materials.midsole}</span>
                          </div>
                        )}
                        {selectedProduct.materials.outsole && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Outsole</span>
                            <span className="font-semibold text-slate-900">{selectedProduct.materials.outsole}</span>
                          </div>
                        )}
                        {selectedProduct.materials.lining && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Lining</span>
                            <span className="font-semibold text-slate-900">{selectedProduct.materials.lining}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Colors - 颜色 */}
                  {(selectedProduct as any).specs_extra?.colors && (
                    <div className="border-t border-slate-200 pt-6">
                      <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        Colors
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {(selectedProduct as any).specs_extra.colors.split(',').map((color: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs border border-slate-200 rounded-md">
                            {color.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Test Standard - 测试标准 */}
                  {(selectedProduct as any).specs_extra?.test_standard && (
                    <div className="border-t border-slate-200 pt-6">
                      <h5 className="text-xs font-black text-amber-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4" /> Test Standard
                      </h5>
                      <p className="text-sm font-semibold text-amber-800 bg-amber-50 px-4 py-2 rounded-lg inline-block">
                        {(selectedProduct as any).specs_extra.test_standard}
                      </p>
                    </div>
                  )}

                  {/* Features - 特点 */}
                  {selectedProduct.features && selectedProduct.features.length > 0 && (
                    <div className="border-t border-slate-200 pt-6">
                      <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{t('featuresLabel')}</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.features.map((feature: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* MOQ & Sizes */}
                  <div className="border-t border-slate-200 pt-6 flex items-center justify-between text-sm">
                    <div>
                      <span className="text-slate-500">MOQ: </span>
                      <span className="font-semibold text-slate-900">{selectedProduct.moq || 'Negotiable'}</span>
                    </div>
                    {(selectedProduct as any).specs_extra?.sizes && (
                      <div>
                        <span className="text-slate-500">Sizes: </span>
                        <span className="font-semibold text-slate-900">{(selectedProduct as any).specs_extra.sizes} (EU)</span>
                      </div>
                    )}
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

            {/* 全屏图片查看器 */}
            {isFullscreen && selectedProduct && (
              <ImageViewer
                images={selectedProduct.images?.length ? selectedProduct.images : [selectedProduct.image || '/images/products/steel-toe-boot.jpg']}
                initialIndex={currentImageIndex}
                productName={selectedProduct.name}
                onClose={() => setIsFullscreen(false)}
              />
            )}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
