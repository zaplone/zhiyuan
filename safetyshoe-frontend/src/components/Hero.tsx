'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const SLIDE_IMAGES = [
  '/images/hero/1.webp',
  '/images/hero/圆盘机.webp',
  '/images/hero/3.webp',
] as const;

const SLIDE_MESSAGE_KEYS = ['slide1', 'slide2', 'slide3'] as const;

const SLIDE_ALT_KEYS = ['slides.alt1', 'slides.alt2', 'slides.alt3'] as const;

const AUTO_MS = 6000;

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
    { value: '30+', label: t('stats.years') },
    { value: '6', label: t('stats.lines') },
    { value: '100%', label: t('stats.qc') },
  ];

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
        
        {/* Gradient Mask - Strong on left, transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 via-35% to-transparent" />
        
        {/* Bottom gradient for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        
        {/* Decorative dot pattern */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100dvh] items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-24">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-orange-600" />
              <span className="text-xs font-bold text-orange-500 uppercase tracking-[0.3em]">
                {t(`${slideKey}.badge`)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
              {t(`${slideKey}.title`)} <br />
              <span className="text-orange-500">{t(`${slideKey}.highlight`)}</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg mb-8">
              {t(`${slideKey}.description`)}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                href={`/${locale}/products`}
                className="bg-orange-600 text-white px-8 py-4 font-bold text-sm uppercase tracking-[0.15em] hover:bg-orange-500 transition-all shadow-xl shadow-orange-900/30"
              >
                {t('cta1')}
              </Link>
              <Link 
                href={`/${locale}/services/oem`}
                className="border-2 border-white/30 text-white px-8 py-4 font-bold text-sm uppercase tracking-[0.15em] hover:bg-white/10 hover:border-white/50 transition-all flex items-center gap-2"
              >
                {t('cta2')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 sm:gap-12 border-t border-white/10 pt-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={prevSlide}
            aria-label={t('slides.prev')}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <button 
            type="button"
            onClick={nextSlide}
            aria-label={t('slides.next')}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {SLIDE_IMAGES.map((_, i) => (
            <button 
              type="button"
              key={i}
              onClick={() => setSlide(i)}
              aria-label={t('slides.goTo', { n: i + 1 })}
              className={`h-1 transition-all duration-500 ${i === slide ? 'w-8 bg-orange-500' : 'w-4 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
