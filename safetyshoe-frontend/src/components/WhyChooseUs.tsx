'use client';

import { useState } from 'react';
import { Shield, Settings, Truck, Award, CheckCircle2, TrendingUp, Users, Factory, Play, X, TestTube, Package, Globe, Gem } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export function WhyChooseUs() {
  const t = useTranslations('WhyChooseUs');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const features = [
    {
      id: 'certification',
      icon: Shield,
      iconBg: 'bg-amber-50 border-amber-200',
      title: t('cards.certification.title'),
      desc: t('cards.certification.desc'),
      color: '#e8a820'
    },
    {
      id: 'manufacturing',
      icon: Factory,
      iconBg: 'bg-amber-50 border-amber-200',
      title: t('cards.manufacturing.title'),
      desc: t('cards.manufacturing.desc'),
      color: '#e8a820'
    },
    {
      id: 'customization',
      icon: Gem,
      iconBg: 'bg-amber-50 border-amber-200',
      title: t('cards.customization.title'),
      desc: t('cards.customization.desc'),
      color: '#e8a820'
    },
    {
      id: 'quality',
      icon: TestTube,
      iconBg: 'bg-blue-50 border-blue-200',
      title: t('cards.quality.title'),
      desc: t('cards.quality.desc'),
      color: '#3b82f6'
    },
    {
      id: 'flexibility',
      icon: Package,
      iconBg: 'bg-green-50 border-green-200',
      title: t('cards.flexibility.title'),
      desc: t('cards.flexibility.desc'),
      color: '#16a34a'
    },
    {
      id: 'logistics',
      icon: Globe,
      iconBg: 'bg-purple-50 border-purple-200',
      title: t('cards.logistics.title'),
      desc: t('cards.logistics.desc'),
      color: '#9333ea'
    }
  ];

  return (
    <section className="bg-[#f7f8fa] py-24" id="features">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        {/* 标题区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-16 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#d4460a] font-['Share_Tech_Mono'] text-xs tracking-[4px] uppercase">
                {t('label')}
              </span>
            </div>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-slate-900 leading-tight">
              {t('title')} <span className="text-[#d4460a]">{t('subtitle')}</span>
            </h2>
          </div>
          <p className="text-slate-500 text-base leading-[1.85]">
            {t('description')}
          </p>
        </div>

        {/* 6个特性卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#e8a820] hover:shadow-xl"
              >
                {/* 底部金色线条 */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 transform transition-transform duration-350 group-hover:scale-x-100"
                  style={{ backgroundColor: feature.color }}
                />

                {/* 序号作弱水印，不与图标抢视线 */}
                <span
                  className="pointer-events-none absolute right-5 top-5 select-none font-['Share_Tech_Mono'] text-4xl font-bold tabular-nums leading-none text-slate-100 sm:text-5xl"
                  aria-hidden
                >
                  0{index + 1}
                </span>

                {/* 首行：图标 + 标题并排，扫读顺序更自然 */}
                <div className="relative flex gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border ${feature.iconBg}`}
                  >
                    <Icon className="h-6 w-6 text-slate-700" aria-hidden />
                  </div>
                  <h3 className="min-w-0 flex-1 pt-0.5 text-lg font-bold leading-snug text-slate-900">
                    {feature.title}
                  </h3>
                </div>

                <p className="relative mt-4 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-500">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* Video Modal Overlay */}
      {activeVideo && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                src={activeVideo}
                title="Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}