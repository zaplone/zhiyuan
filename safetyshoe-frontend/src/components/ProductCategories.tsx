'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Shield, Zap, Droplets, Snowflake, HardHat, Factory, Utensils, Hammer, Sparkles } from 'lucide-react';
import { ProductQuickView } from './ProductQuickView';
import { HomeProductShowcase } from './HomeProductShowcase';
import { transformProduct } from '@/lib/siteApi';
import { useTranslations, useLocale } from 'next-intl';
import { Product } from '@/types';
import {
  type CatalogFiltersState,
  defaultCatalogFilters,
  productMatchesCatalogFilters,
} from '@/lib/productCatalogFilters';
import { ProductCatalogFilterBar } from '@/components/ProductCatalogFilterBar';
import { productCardSellingTags } from '@/lib/productCardHighlights';
import { type ShowcaseMode, getShowcasePool } from '@/lib/homeShowcasePool';

interface ProductCategoriesProps {
  initialProducts?: any[];
  /** 首页画廊用产品列表，与产品页一致由服务端传入，不依赖客户端请求 */
  initialGalleryProducts?: any[];
  hideFilters?: boolean;
}

export function ProductCategories({ initialProducts, initialGalleryProducts, hideFilters = false }: ProductCategoriesProps = {}) {
  const t = useTranslations('ProductCategories');
  const locale = useLocale();
  const router = useRouter();

  // Industry Categories
  const INDUSTRIES = [
    {
      id: 'Construction', // Updated to match new industry values
      name: t('categories.construction'),
      icon: HardHat,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80',
      desc: t('categories.construction')
    },
    {
      id: 'Oil & Gas',
      name: t('categories.industrial'),
      icon: Factory,
      image: 'https://images.unsplash.com/photo-1516937941348-c09e554b9631?auto=format&fit=crop&q=80',
      desc: t('categories.industrial')
    },
    {
      id: 'Food Industry', // Corrected ID to match Seeding Data
      name: t('categories.executive'),
      icon: Utensils,
      image: 'https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?auto=format&fit=crop&q=80',
      desc: t('categories.executive')
    },
    {
      id: 'Logistics',
      name: t('categories.logistics'),
      icon: Hammer,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      desc: t('categories.logistics')
    },
  ];

  const [activeTab, setActiveTab] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<string | number | null>(null);

  const [products, setProducts] = useState<Product[]>(
    initialProducts?.length
      ? initialProducts.map((p) => (p.id ? (p as Product) : transformProduct(p as any, locale)))
      : []
  );
  const [filters, setFilters] = useState<CatalogFiltersState>(() => defaultCatalogFilters());

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  /** 首页画廊：仅使用服务端/构建传入的 initialGalleryProducts */
  const [galleryProducts, setGalleryProducts] = useState<Product[]>(
    initialGalleryProducts ? initialGalleryProducts.map((p: any) => p.id ? p : transformProduct(p)) : []
  );
  const [galleryHovered, setGalleryHovered] = useState(false);
  /** 与 HomeProductShowcase Tab 同步，画廊顺序随 Tab 变化 */
  const [showcaseMode, setShowcaseMode] = useState<ShowcaseMode>('featured');

  useEffect(() => {
    if (initialProducts?.length) {
      setProducts(initialProducts.map((p) => (p.id ? (p as Product) : transformProduct(p as any, locale))));
    } else {
      setProducts([]);
    }
  }, [locale, initialProducts]);

  useEffect(() => {
    if (initialGalleryProducts && initialGalleryProducts.length > 0) {
      setGalleryProducts(
        initialGalleryProducts.map((p: any) => (p.id ? p : transformProduct(p as any, locale)))
      );
    }
  }, [initialGalleryProducts, locale]);

  // 画廊展示用：服务端传入或客户端拉取；都没有则用顶部 6 款兜底
  const displayGalleryProducts = hideFilters
    ? (galleryProducts.length > 0 ? galleryProducts : products)
    : [];

  const galleryOrderedProducts = useMemo(
    () => getShowcasePool(displayGalleryProducts, showcaseMode),
    [displayGalleryProducts, showcaseMode]
  );

  const filteredProducts = products.filter((p) =>
    productMatchesCatalogFilters(p, filters, { industryTab: activeTab })
  );

  const handleProductClick = (product: Product) => {
    // 移动端：直接跳到详情页
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      router.push(`/${locale}/products/${product.slug}`);
      return;
    }
    // 桌面端：打开弹窗快速预览
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-slate-50 relative overflow-x-hidden" id="products">
        {/* ... Background ... */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-7xl">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 text-slate-500 rounded-full text-sm font-semibold mb-4 shadow-sm">
              {hideFilters && <Sparkles className="w-4 h-4 text-amber-500" aria-hidden />}
              {t('label')}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-slate-600">
              {t('subtitle')}
            </p>
          </div>

          {/* Industry Visual Navigation */}
          {!hideFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {INDUSTRIES.map((ind) => (
                <div
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`relative h-40 rounded-xl overflow-hidden cursor-pointer group border-2 transition-all ${activeTab === ind.id ? 'border-primary-600 ring-2 ring-primary-600 ring-offset-2' : 'border-transparent hover:border-slate-300'
                    }`}
                >
                  {ind.image && (ind.image.startsWith('http') || ind.image.startsWith('/')) ? (
                    <Image
                      src={ind.image}
                      alt={ind.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <ind.icon className="w-12 h-12 text-slate-400" />
                    </div>
                  )}
                  <div className={`absolute inset-0 transition-colors ${activeTab === ind.id ? 'bg-primary-900/80' : 'bg-slate-900/60 group-hover:bg-slate-900/70'
                    }`} />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <ind.icon className={`w-8 h-8 mb-2 ${activeTab === ind.id ? 'text-accent-500' : 'text-white'}`} />
                    <h3 className="text-white font-bold text-lg leading-tight">{ind.name}</h3>
                    <p className="text-white/70 text-xs mt-1 hidden md:block">{ind.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!hideFilters && (
            <ProductCatalogFilterBar
              products={products}
              filters={filters}
              onFiltersChange={setFilters}
              onResetComplete={() => setActiveTab('all')}
            />
          )}

          {/* Product Grid */}
          {hideFilters ? (
              <>
                {/* 首页：精选/新品/热销 Tab + 左主推款右四款；下方为画廊 */}
                {(() => {
                  const showcaseSource =
                    displayGalleryProducts.length > 0 ? displayGalleryProducts : products;
                  return showcaseSource.length > 0 ? (
                    <HomeProductShowcase
                      locale={locale}
                      products={showcaseSource}
                      onProductClick={handleProductClick}
                      onShowcaseModeChange={setShowcaseMode}
                    />
                  ) : (
                    <p className="text-center text-sm text-slate-500">{t('noProductsLoaded')}</p>
                  );
                })()}
                {displayGalleryProducts.length > 0 && (
                  <div
                    className={`mt-20 w-screen overflow-hidden ${galleryHovered ? 'gallery-scroll-paused' : ''}`}
                    style={{ marginLeft: 'calc(-50vw + 50%)' }}
                    onMouseLeave={() => setGalleryHovered(false)}
                  >
                    <h3 className="text-center text-xl font-bold text-slate-800 mb-6">{t('allProductsGallery')}</h3>
                    <div className="overflow-hidden">
                      <div className="flex gap-6 gallery-scroll-track" style={{ width: 'max-content' }}>
                        {[1, 2].map((copy) => (
                          <div key={copy} className="flex flex-shrink-0 gap-6">
                            {galleryOrderedProducts.map((product) => (
                              <div
                                key={`${copy}-${showcaseMode}-${product.id}`}
                                className="group flex h-[352px] w-[300px] flex-shrink-0 flex-col cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
                                onClick={() => handleProductClick(product)}
                                onMouseEnter={() => setGalleryHovered(true)}
                                onMouseLeave={() => setGalleryHovered(false)}
                              >
                                <div className="relative h-[176px] w-full flex-shrink-0 bg-white ring-1 ring-inset ring-slate-100">
                                  {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                                    <Image
                                      src={product.image}
                                      alt={product.name}
                                      fill
                                      className="object-contain object-center p-3 transition-transform duration-300 group-hover:scale-[1.02]"
                                      sizes="300px"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">{t('noImage')}</div>
                                  )}
                                  <div className="absolute top-2 left-2 flex flex-col gap-1 max-w-[60%]">
                                    {product.safety_standard && (
                                      <span className="bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{product.safety_standard}</span>
                                    )}
                                    {product.additional_certs?.slice(0, 2).map((cert, idx) => (
                                      <span key={idx} className="bg-white/90 text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-200">{cert}</span>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex min-h-0 flex-1 flex-col bg-white p-3">
                                  <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900">{product.name}</h3>
                                  {product.model_code && (
                                    <p className="mt-1 font-mono text-xs text-slate-400">{t('card.model')}: {product.model_code}</p>
                                  )}
                                  <div className="mt-1.5 flex min-h-0 flex-1 flex-wrap content-start gap-1.5">
                                    {productCardSellingTags(product).map((tag) => (
                                      <span
                                        key={`${product.id}-${tag}`}
                                        className="rounded border border-primary-100/90 bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary-900"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="flex flex-wrap gap-1.5 mt-2">
                                    {product.style && (
                                      <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{product.style}</span>
                                    )}
                                    {product.materials?.toe_cap && (
                                      <span className="text-[10px] font-medium border border-slate-200 text-slate-600 px-2 py-0.5 rounded">{product.materials.toe_cap}</span>
                                    )}
                                  </div>
                                  <div className="flex justify-between items-center text-xs mt-3 pt-3 border-t border-slate-100">
                                    <span className="text-slate-500">
                                      {t('card.moq')} <span className="text-slate-900 font-semibold">{product.moq ?? '—'}</span>
                                      {product.price_range && (
                                        <span className="ml-2">
                                          · {t('card.from')} <span className="text-slate-900 font-semibold">{product.price_range}</span>
                                        </span>
                                      )}
                                    </span>
                                    <span className="text-primary-600 font-semibold">{t('card.wholesale')}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : filteredProducts.length > 0 ? (
              /* 产品页：标准网格 + 交错 + 更强 hover */
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
                  hidden: {},
                }}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 20 },
                    }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="group relative h-[420px] rounded-2xl overflow-hidden shadow-sm transition-all duration-500 cursor-pointer bg-white border border-slate-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/80"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="relative h-3/4 w-full bg-white ring-1 ring-inset ring-slate-100">
                      {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className={`object-contain object-center p-4 transition-transform duration-700 ${hoveredProduct === product.id ? 'scale-[1.03]' : 'scale-100'}`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <span className="text-sm">{t('noImage')}</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.safety_standard && (
                          <span className="bg-primary-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-primary-500">
                            {product.safety_standard}
                          </span>
                        )}
                        {product.additional_certs?.map((cert, idx) => (
                          <span key={idx} className="bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-slate-200">
                            {cert}
                          </span>
                        ))}
                      </div>
                      <div
                        className={`pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-900/85 via-slate-900/35 to-transparent p-5 pt-16 text-center transition-all duration-300 ${
                          hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                        }`}
                      >
                        <div className="pointer-events-none mb-3 flex flex-wrap justify-center gap-2">
                          {product.materials?.toe_cap && (
                            <span className="inline-block rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[11px] text-white">
                              {t('card.toe')}: {product.materials.toe_cap}
                            </span>
                          )}
                          {product.materials?.upper && (
                            <span className="inline-block max-w-[90%] truncate rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[11px] text-white">
                              {product.materials.upper}
                            </span>
                          )}
                        </div>
                        <span className="pointer-events-none inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 py-2.5 text-sm font-bold text-slate-900 shadow-lg shadow-accent-500/25">
                          {t('viewDetails')}
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                    <div className="h-1/4 p-5 bg-white flex flex-col justify-between relative z-10">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{product.name}</h3>
                        <ArrowRight className={`w-5 h-5 text-primary-600 transition-transform duration-300 ${hoveredProduct === product.id ? 'translate-x-1' : ''}`} />
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">{t('card.moq')}: <span className="text-slate-900 font-semibold">{product.moq}</span></span>
                        <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded">{t('card.wholesale')}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{t('emptyState.title')}</h3>
              <p className="text-slate-500">{t('emptyState.description')}</p>
              <button
                onClick={() => {
                  setActiveTab('all');
                  setFilters(defaultCatalogFilters());
                }}
                className="mt-6 text-primary-600 font-bold hover:underline"
              >
                {t('emptyState.clearFilters')}
              </button>
            </div>
          )}

          {(hideFilters || filteredProducts.length > 0) && (
            <div className="mt-16 text-center">
              <Link href={`/${locale}/products`} className="inline-flex items-center px-8 py-3 border-2 border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-600 font-bold rounded-lg transition-all">
                {t('loadMore')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}