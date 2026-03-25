'use client';

import { useTranslations } from 'next-intl';
import { Settings, Layers, Activity, Globe } from 'lucide-react';

export function ManufacturingExcellence() {
  const t = useTranslations('Manufacturing');

  const stats = [
    { label: t('stats.automation') || 'Automated Lines', value: '12', icon: <Settings className="w-5 h-5" /> },
    { label: t('stats.rd') || 'R&D Engineers', value: '45+', icon: <Layers className="w-5 h-5" /> },
    { label: t('stats.output') || 'Annual Output', value: '5M+', icon: <Activity className="w-5 h-5" /> },
    { label: t('stats.export') || 'Export Regions', value: '50+', icon: <Globe className="w-5 h-5" /> }
  ];

  return (
    <section id="factory" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-orange-600" />
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
                {t('subtitle') || 'Manufacturing Power'}
              </h2>
            </div>
            <h3 className="text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] mb-10 italic">
              {t('title') || 'Precision'} <br />
              <span className="text-orange-600">{t('titleHighlight') || 'Engineering.'}</span>
            </h3>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-12">
              <p>
                {t('desc1') || 'With over two decades of specialized experience in safety footwear, our manufacturing facility stands as a benchmark of industrial excellence. We don\'t just assemble shoes; we engineer protection.'}
              </p>
              <p className="text-sm font-medium text-slate-500">
                {t('desc2') || 'Our 12 fully automated production lines integrate the latest injection technology and robotic precision, ensuring that every pair meets the exact specifications required for high-risk industrial environments. From material sourcing to final stress testing, our in-house laboratory monitors every stage of the lifecycle.'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="border-l-2 border-slate-100 pl-6 py-1 hover:border-orange-600 transition-colors group">
                  <div className="text-2xl font-black text-slate-900 italic">{stat.value}</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/5] bg-slate-100 overflow-hidden border-[16px] border-slate-50 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070" 
                alt="Advanced Production Facility" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}