'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Product } from '@/types';
import { ProductCertBadges } from '@/components/ProductCertBadges';
import { heroSellingLine } from '@/lib/productCardHighlights';
import {
  type ShowcaseMode,
  getShowcasePool,
  pickFiveProductsFromPool,
  showcaseUsedFallback,
} from '@/lib/homeShowcasePool';

/**
 * 首页两 Tab 与后端字段一致（standalone_products 公开接口）：
 * - 热销：is_hot → Product.featured
 * - 新品：is_new
 */

const SHOWCASE_TABS = [
  { key: 'featured' as const, mode: 'featured' as const },
  { key: 'newArrivals' as const, mode: 'new' as const },
];

function heroImageUrl(p: Product): string | null {
  const main = p.image;
  if (main && (main.startsWith('http') || main.startsWith('/'))) return main;
  const first = p.images?.[0];
  if (first && (first.startsWith('http') || first.startsWith('/'))) return first;
  return null;
}

type ShowcaseProps = {
  locale: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  /** 与下方画廊共用同一 Tab，切换时更新画廊顺序 */
  onShowcaseModeChange?: (mode: ShowcaseMode) => void;
};

export function HomeProductShowcase({
  locale,
  products,
  onProductClick,
  onShowcaseModeChange,
}: ShowcaseProps) {
  const t = useTranslations('ProductCategories');
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tabLabel = (key: string) => t(`showcaseTab.${key}` as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroBadge = (key: string) => t(`showcaseHero.${key}` as any);

  const def = SHOWCASE_TABS[activeIdx]!;
  const mode = def.mode;

  useEffect(() => {
    onShowcaseModeChange?.(mode);
  }, [mode, onShowcaseModeChange]);

  const pool = useMemo(() => getShowcasePool(products, mode), [products, mode]);
  const { hero, side } = useMemo(
    () => pickFiveProductsFromPool(pool, products),
    [pool, products]
  );
  const usedFallback = useMemo(() => showcaseUsedFallback(products, mode), [products, mode]);

  const heroBlurb = heroSellingLine(hero);
  const heroHref = `/${locale}/products/${hero.slug}`;
  const badgeKey = def.key === 'featured' ? 'badgeFeatured' : 'badgeNew';

  const heroImg = heroImageUrl(hero);

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-2.5">
        {SHOWCASE_TABS.map((item, idx) => {
          const active = idx === activeIdx;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
                active
                  ? 'bg-primary-800 text-white shadow-md ring-2 ring-primary-800 ring-offset-2'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-primary-300 hover:text-primary-800'
              }`}
            >
              {tabLabel(item.key)}
            </button>
          );
        })}
      </div>

      {usedFallback && (
        <p className="mb-4 text-center text-xs text-amber-800/90 sm:text-left">{t('showcaseFallback')}</p>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={def.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-3"
        >
          <Link
            href={heroHref}
            className="group relative block min-h-[360px] overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm transition-all hover:border-primary-200 hover:shadow-md sm:col-span-2 sm:min-h-[400px] lg:col-span-2 lg:row-span-2 lg:min-h-[min(560px,58vh)]"
          >
            <div className="absolute inset-0 bg-white">
              {heroImg ? (
                <Image
                  src={heroImg}
                  alt={hero.name}
                  fill
                  className="object-contain object-center p-4 transition duration-500 group-hover:scale-[1.02] sm:p-5"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-white text-sm text-slate-400">No Image</div>
              )}
            </div>

            <div className="absolute left-3 top-3 z-10">
              <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-800 shadow-sm">
                {heroBadge(badgeKey)}
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
              {heroBlurb && (
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/95 [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]">
                  {heroBlurb}
                </p>
              )}
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]">
                {t('showcaseHero.ctaHint')}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>

          {side.map((product) => (
            <motion.div
              key={`${def.key}-${product.id}`}
              layout
              className="group flex min-h-[220px] flex-col overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onProductClick(product)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onProductClick(product);
              }}
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-white ring-1 ring-inset ring-slate-100">
                {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain object-center p-2 transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-400">No Image</div>
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
                    MOQ <span className="font-semibold text-slate-800">{product.moq ?? '—'}</span>
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 text-primary-600 ${hoveredId === product.id ? 'translate-x-0.5' : ''}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
