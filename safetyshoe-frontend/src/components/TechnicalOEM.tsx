'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { HardHat, ShieldCheck, Activity, Layers, ArrowRight } from 'lucide-react';

export function TechnicalOEM() {
  const t = useTranslations('TechnicalOEM');

  const components = [
    { 
      title: t('components.toe') || 'Steel Toe Cap', 
      desc: t('components.toeDesc') || '200J Impact resistance.', 
      icon: <HardHat className="w-5 h-5" /> 
    },
    { 
      title: t('components.midsole') || 'Kevlar Midsole', 
      desc: t('components.midsoleDesc') || 'Zero-penetration protection.', 
      icon: <ShieldCheck className="w-5 h-5" /> 
    },
    { 
      title: t('components.sole') || 'PU/Rubber Sole', 
      desc: t('components.soleDesc') || 'SRC slip resistance.', 
      icon: <Activity className="w-5 h-5" /> 
    },
    { 
      title: t('components.lining') || 'Breathable Lining', 
      desc: t('components.liningDesc') || 'Moisture-wicking mesh.', 
      icon: <Layers className="w-5 h-5" /> 
    }
  ];

  const steps = [
    { step: "01", title: t('steps.1') || 'Technical Brief', desc: t('steps.1desc') || "Market standards & safety analysis." },
    { step: "02", title: t('steps.2') || 'R&D Prototyping', desc: t('steps.2desc') || "Rapid sample development." },
    { step: "03", title: t('steps.3') || 'Tooling & Mold', desc: t('steps.3desc') || "Precision custom molds." },
    { step: "04", title: t('steps.4') || 'Mass Production', desc: t('steps.4desc') || "ISO-certified high volume." },
    { step: "05", title: t('steps.5') || 'Global Logistics', desc: t('steps.5desc') || "Seamless supply chain." }
  ];

  return (
    <section id="oem" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24">
          
          <div className="space-y-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-orange-600" />
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
                  {t('subtitle') || 'Engineering Core'}
                </h2>
              </div>
              <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] italic mb-8">
                {t('title') || 'Technical'} <br />
                <span className="text-orange-600">{t('titleHighlight') || 'Foundation.'}</span>
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed max-w-md font-medium">
                {t('desc') || 'Our OEM capability is rooted in our mastery of core components. We manufacture our own safety elements to ensure total quality control.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {components.map((c, i) => (
                <div key={i} className="p-6 bg-slate-50 border border-slate-100 hover:border-orange-600 transition-all group">
                  <div className="text-orange-600 mb-4 group-hover:scale-110 transition-transform">{c.icon}</div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2">{c.title}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-12 lg:p-20 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h4 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-12">
                {t('workflow') || 'OEM/ODM'} <span className="text-orange-600">{t('workflowHighlight') || 'Workflow.'}</span>
              </h4>
              
              <div className="space-y-10">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-2xl font-black text-orange-600/30 group-hover:text-orange-600 transition-colors italic">{s.step}</div>
                    <div>
                      <h5 className="text-xs font-black text-white uppercase tracking-widest mb-2">{s.title}</h5>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t border-white/10">
                <Link 
                  href="/en/services/oem"
                  className="w-full bg-orange-600 text-white py-5 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-slate-900 transition-all text-center block"
                >
                  {t('cta') || 'Start Custom Project'}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}