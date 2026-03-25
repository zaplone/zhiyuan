'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

/**
 * 首页全屏轮播：public/images/
 * 顺序：hero-banner.png → hero-slide2.png → hero-slide3.png
 * 每帧文案见 messages 中 Hero.slide1 / slide2 / slide3（与轮播同步切换）
 */
const SLIDE_IMAGES = ['/images/hero-banner.png', '/images/hero-slide2.png', '/images/hero-slide3.png'] as const;

const AUTO_MS = 5000;

export function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const [slide, setSlide] = useState(0);

  const slideCopy = useMemo(
    () => [
      {
        badge: t('slide1.badge'),
        title: t('slide1.title'),
        highlight: t('slide1.highlight'),
        description: t('slide1.description'),
      },
      {
        badge: t('slide2.badge'),
        title: t('slide2.title'),
        highlight: t('slide2.highlight'),
        description: t('slide2.description'),
      },
      {
        badge: t('slide3.badge'),
        title: t('slide3.title'),
        highlight: t('slide3.highlight'),
        description: t('slide3.description'),
      },
    ],
    [t]
  );

  const copy = slideCopy[slide];

  const nextSlide = useCallback(() => {
    setSlide((s) => (s + 1) % SLIDE_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setSlide((s) => (s - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(nextSlide, AUTO_MS);
    return () => clearInterval(id);
  }, [nextSlide]);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const slideAlts = [t('slides.alt1'), t('slides.alt2'), t('slides.alt3')];

  return (
    <section className="relative flex min-h-[min(100vh,940px)] flex-col overflow-hidden">
      <div className="absolute inset-0 bg-slate-900">
        {SLIDE_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
              i === slide ? 'z-[1] opacity-100' : 'z-0 opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={slideAlts[i]}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}

        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              'linear-gradient(105deg, rgba(15, 22, 35, 0.88) 0%, rgba(15, 22, 35, 0.55) 42%, rgba(15, 22, 35, 0.2) 72%, rgba(15, 22, 35, 0.35) 100%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#0f1623]/75 via-transparent to-[#0f1623]/25" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[#1e293b]/[0.12]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-24 pt-28 lg:px-16 lg:pb-28 lg:pt-32">
        <div key={slide} className="max-w-2xl animate-fade-up">
          <p className="mb-6 font-['Share_Tech_Mono'] text-xs uppercase tracking-[0.28em] text-[#fbbf24]">
            {copy.badge}
          </p>

          {/* 主标题与高亮分两行，避免同一行内混排导致「Standards You / Can Trust. CE」等怪异断行 */}
          <h1 className="mb-7 font-['Bebas_Neue'] text-[2.75rem] leading-[1.02] tracking-[0.02em] text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[0.98]">
            <span className="block text-balance text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.65)]">
              {copy.title}
            </span>
            <span className="mt-2 block text-[#fde68a] sm:mt-3 [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
              {copy.highlight}
            </span>
          </h1>

          {/* 说明段：强制浅色 + 重阴影 + 轻底衬，避免被全局样式或蒙版压成「黑字看不清」 */}
          <p className="mb-12 max-w-2xl rounded-md border border-white/10 bg-black/30 px-4 py-3 text-base font-normal leading-[1.75] !text-zinc-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] [text-shadow:0_1px_14px_rgba(0,0,0,0.85)] md:text-lg md:leading-[1.75]">
            {copy.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={scrollToProducts}
              className="rounded-[2px] bg-[#e8a820] px-8 py-3.5 text-sm font-bold tracking-[0.12em] text-[#1c1917] shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-[#f5c842]"
            >
              {t('cta_primary')}
            </button>
            <Link
              href={`/${locale}/products`}
              className="rounded-[2px] border border-white/35 bg-white/10 px-7 py-3.5 text-sm tracking-[0.08em] text-white/95 backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/15"
            >
              {t('cta_secondary')}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-4 z-30 flex items-center gap-2 sm:bottom-24 sm:right-6 md:bottom-8 md:right-10">
        <button
          type="button"
          onClick={prevSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white/90 backdrop-blur-md transition hover:border-white/45 hover:bg-black/35"
          aria-label={t('slides.prev')}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1.5 px-1">
          {SLIDE_IMAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === slide ? 'w-6 bg-[#e8a820]' : 'w-2 bg-white/35 hover:bg-white/55'
              }`}
              aria-label={t('slides.goTo', { n: i + 1 })}
              aria-current={i === slide}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={nextSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white/90 backdrop-blur-md transition hover:border-white/45 hover:bg-black/35"
          aria-label={t('slides.next')}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
        <button
          type="button"
          onClick={scrollToProducts}
          className="flex flex-col items-center text-white/50 transition-colors hover:text-white"
          aria-label={t('scroll')}
        >
          <span className="mb-1 text-xs font-medium">{t('scroll')}</span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
