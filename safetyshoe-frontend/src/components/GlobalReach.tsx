'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Truck, Zap } from 'lucide-react';

const STAT_ROWS = [
  { key: 'export' as const, value: '1,500,000', icon: Truck },
  { key: 'reach' as const, value: '85+', icon: Globe },
  { key: 'compliance' as const, value: '100%', icon: ShieldCheck },
  { key: 'patents' as const, value: '120+', icon: Zap },
];

const REGION_KEYS = ['northAmerica', 'eu', 'sea', 'middleEast', 'australia'] as const;

export function GlobalReach() {
  const t = useTranslations('GlobalReach');

  return (
    <section id="global" className="py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" fill="none" stroke="white" strokeWidth="0.5">
          <path d="M150,150 Q200,100 250,150 T350,150 M450,200 Q500,150 550,200 T650,200 M750,100 Q800,50 850,100 T950,100" strokeDasharray="2,2" />
          <circle cx="500" cy="250" r="6" fill="#ea580c" className="animate-pulse" />
          <circle cx="500" cy="250" r="20" stroke="#ea580c" strokeWidth="1" opacity="0.3" className="animate-ping" />
          
          {[...Array(10)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="500" stroke="white" opacity="0.1" />
          ))}
          {[...Array(5)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 100} x2="1000" y2={i * 100} stroke="white" opacity="0.1" />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-1 bg-orange-600" />
              <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em]">
                {t('subtitle')}
              </h2>
            </div>
            <h3 className="text-7xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-12 italic">
              {t('title')} <br />
              <span className="text-orange-600">{t('titleHighlight')}</span>
            </h3>
            <p className="text-slate-400 text-xl mb-16 leading-relaxed max-w-lg font-medium">
              {t('desc')}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-12">
              {STAT_ROWS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={s.key} 
                    className="group"
                  >
                    <div className="text-orange-600 mb-4"><Icon className="w-5 h-5" /></div>
                    <div className="text-4xl font-black text-white italic mb-1 tracking-tighter">{s.value}</div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{t(`stats.${s.key}`)}</div>
                    <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{t(`statsSub.${s.key}`)}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-orange-600/10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] blur-[120px]" />
            <div className="relative z-10 p-12 bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-3 h-3 bg-orange-600 rounded-full animate-ping" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                  {t('hub')}
                </span>
              </div>
              <div className="space-y-8">
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {t('production')}
                  </span>
                  <span className="text-2xl font-black text-white italic">94%</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {t('shipping')}
                  </span>
                  <span className="text-2xl font-black text-green-500 italic uppercase">{t('optimal')}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {t('destinations')}
                  </span>
                  <span className="text-2xl font-black text-white italic">{t('nations')}</span>
                </div>
              </div>
              <div className="mt-12">
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
                  {t('corridors')}
                </div>
                <div className="flex flex-wrap gap-3">
                  {REGION_KEYS.map((regionKey) => (
                    <span key={regionKey} className="px-3 py-1 bg-white/10 text-white text-[9px] font-black uppercase tracking-widest">
                      {t(`regions.${regionKey}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
