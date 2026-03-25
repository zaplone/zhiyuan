'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function HomeOemCta() {
  const t = useTranslations('HomeOemCta');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-[#0f1623] py-16 md:py-20">
      {/* 网格背景 */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* 光晕效果 */}
      <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-[#e8a820] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-48 w-48 rounded-full bg-[#d4460a] opacity-10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 border border-[#e8a820]/30 bg-[#e8a820]/10 px-3 py-1 text-xs font-bold uppercase tracking-[2px] text-[#e8a820] rounded-[2px]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {t('badge')}
            </div>
            <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-white leading-tight mb-4">
              {t('title')}
            </h2>
            <p className="text-white/55 text-base leading-relaxed max-w-xl">
              {t('desc')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href={`/${locale}/services/oem`}
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-[#0f1623] text-sm tracking-[2px] bg-[#e8a820] hover:bg-[#f5c842] hover:-translate-y-0.5 transition-all rounded-[2px] shadow-lg shadow-[#e8a820]/25"
            >
              {t('primary')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center justify-center border border-white/25 bg-white/5 px-8 py-4 font-bold text-white text-sm tracking-[1.5px] backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all rounded-[2px]"
            >
              {t('secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
