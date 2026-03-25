'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const SLIDE_IMAGES = [
  '/images/about/gongchang.jpg',
  '/images/products/steel-toe-boot.jpg',
  '/images/products/composite-shoe.jpg',
] as const;

/** 与 messages 中 Hero.slide1 / slide2 / slide3 一一对应 */
const SLIDE_MESSAGE_KEYS = ['slide1', 'slide2', 'slide3'] as const;

const SLIDE_ALT_KEYS = ['slides.alt1', 'slides.alt2', 'slides.alt3'] as const;

const AUTO_MS = 6000;

/**
 * 桌面首屏铺满整视口（100dvh），避免下方白底区块露在「第一屏」里。
 * pt-20 仅在内容区为固定顶栏留白，背景仍从页面顶部铺满。
 */
const HERO_VIEWPORT = 'min-h-0 lg:h-[100dvh] lg:max-h-[100dvh]';

export function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const [slide, setSlide] = useState(0);

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

  const slideKey = SLIDE_MESSAGE_KEYS[slide];

  const stats = [
    { value: '20+', label: t('stats.years') },
    { value: '12', label: t('stats.lines') },
    { value: '100%', label: t('stats.qc') },
  ];

  return (
    <section
      className={`relative box-border flex flex-col bg-slate-900 overflow-hidden pt-20 ${HERO_VIEWPORT}`}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row w-full items-stretch">
        <div className="lg:w-1/2 flex min-h-0 flex-col justify-center bg-slate-900 relative z-10 px-8 py-10 sm:px-10 lg:max-h-full lg:overflow-y-auto lg:overscroll-contain lg:py-8 lg:pl-12 lg:pr-6 xl:pl-16 xl:pr-10 xl:py-10">
          <div className="max-w-xl ml-auto w-full">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex items-center gap-4 mb-4 lg:mb-5">
                <div className="w-12 h-1 bg-orange-600" />
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em]">
                  {t(`${slideKey}.badge`)}
                </span>
              </div>

              <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4 italic sm:text-5xl lg:text-6xl lg:mb-5 xl:text-7xl">
                {t(`${slideKey}.title`)} <br />
                <span className="text-orange-600">{t(`${slideKey}.highlight`)}</span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg mb-6 leading-relaxed max-w-md font-medium lg:mb-7">
                {t(`${slideKey}.description`)}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 lg:mb-9">
              <Link 
                href={`/${locale}/products`}
                className="bg-orange-600 text-white px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all shadow-2xl"
              >
                {t('cta1')}
              </Link>
              <Link 
                href={`/${locale}/services/oem`}
                className="border border-white/20 text-white px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-3"
              >
                {t('cta2')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:gap-6 sm:pt-8 lg:pt-7">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-black text-white italic">{stat.value}</div>
                  <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-h-[min(42vh,320px)] w-full shrink-0 overflow-hidden group max-lg:max-h-[46vh] lg:min-h-0 lg:h-full lg:w-1/2 lg:max-h-full">
          <div
            key={slide}
            className="absolute inset-0 transition-all duration-1000"
          >
            <img 
              src={SLIDE_IMAGES[slide]} 
              alt={t(SLIDE_ALT_KEYS[slide])}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-orange-600/10 mix-blend-multiply" />

          <button 
            type="button"
            onClick={prevSlide}
            aria-label={t('slides.prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <button 
            type="button"
            onClick={nextSlide}
            aria-label={t('slides.next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {SLIDE_IMAGES.map((_, i) => (
              <button 
                type="button"
                key={i}
                onClick={() => setSlide(i)}
                aria-label={t('slides.goTo', { n: i + 1 })}
                className={`h-1 transition-all duration-500 ${i === slide ? 'w-10 bg-orange-600' : 'w-4 bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
