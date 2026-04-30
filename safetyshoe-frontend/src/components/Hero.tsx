'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const SLIDE_IMAGES = [
  '/images/hero/1.webp',
  '/images/hero/yuanpan-02.webp',
  '/images/hero/3.webp',
  '/images/hero/production-002.webp',
] as const;

const SLIDE_MESSAGE_KEYS = ['slide1', 'slide2', 'slide3', 'slide4'] as const;

const SLIDE_ALT_KEYS = ['slides.alt1', 'slides.alt2', 'slides.alt3', 'slides.alt4'] as const;

const AUTO_MS = 6000;

const heroTextShadow = '0 2px 18px rgba(15, 23, 42, 0.45)';

export function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const [slide, setSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setSlide((s) => (s + 1) % SLIDE_IMAGES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(nextSlide, AUTO_MS);
    return () => clearInterval(id);
  }, [nextSlide]);

  const slideKey = SLIDE_MESSAGE_KEYS[slide];

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <motion.div
          key={slide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img 
            src={SLIDE_IMAGES[slide]} 
            alt={t(SLIDE_ALT_KEYS[slide])}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Gradient Mask - readable text while preserving the showroom image */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/66 via-42% to-slate-950/8" />
        
        {/* Bottom gradient for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/42 via-transparent to-transparent" />
        
        {/* Decorative dot pattern */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100dvh] items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pb-32 pt-28">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-[34rem] lg:-translate-y-4"
          >
            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-black text-white uppercase tracking-tighter leading-[0.94] mb-6"
              style={{ textShadow: heroTextShadow }}
            >
              <span className="block max-w-[11ch] sm:max-w-[12ch]">
                {t(`${slideKey}.title`)}
              </span>
              <span className="mt-2 block max-w-[15ch] text-orange-500">
                {t(`${slideKey}.highlight`)}
              </span>
            </h1>

            {/* Description */}
            <p
              className="max-w-md text-sm leading-7 text-slate-100/90 sm:text-base sm:leading-8 mb-8"
              style={{ textShadow: '0 1px 12px rgba(15, 23, 42, 0.42)' }}
            >
              {t(`${slideKey}.description`)}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link 
                href={`/${locale}/products`}
                className="bg-orange-600 text-white px-7 py-3.5 font-bold text-xs sm:text-sm uppercase tracking-[0.14em] hover:bg-orange-500 transition-all shadow-xl shadow-orange-900/25"
              >
                {t('cta1')}
              </Link>
              <Link 
                href={`/${locale}/services/oem`}
                className="border border-white/25 bg-white/5 text-white px-7 py-3.5 font-bold text-xs sm:text-sm uppercase tracking-[0.14em] backdrop-blur-[2px] hover:bg-white/12 hover:border-white/45 transition-all flex items-center gap-2"
              >
                {t('cta2')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {SLIDE_IMAGES.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setSlide(i)}
            aria-label={t('slides.goTo', { n: i + 1 })}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === slide ? 'w-7 bg-orange-500' : 'w-2.5 bg-white/35 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
