'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';

export function GlobalCompliance() {
  const t = useTranslations('GlobalCompliance');

  const certifications = [
    { 
      name: "ASTM F2413", 
      desc: "US Standard", 
      detail: t('certs.astm') || "Impact & Compression resistance testing." 
    },
    { 
      name: "CE EN 20345", 
      desc: "EU Certified", 
      detail: t('certs.ce') || "Full S1P/S3 certification for Europe." 
    },
    { 
      name: "ISO 9001", 
      desc: "Quality Mgmt", 
      detail: t('certs.iso') || "International manufacturing quality control." 
    },
    { 
      name: "UKCA", 
      desc: "UK Compliance", 
      detail: t('certs.ukca') || "Post-Brexit market access for UK." 
    },
  ];

  return (
    <section className="bg-slate-50 py-24 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-8 h-px bg-slate-300" />
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
              {t('subtitle') || 'Global Compliance'}
            </h2>
            <div className="w-8 h-px bg-slate-300" />
          </div>
          <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter italic">
            {t('title') || 'Certified'} <span className="text-orange-600">{t('titleHighlight') || 'Authority.'}</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {certifications.map((cert, i) => (
            <div key={i} className="bg-white p-8 border-t-4 border-slate-100 hover:border-orange-600 transition-all shadow-sm hover:shadow-xl group">
              <div className="text-xl font-black text-slate-900 mb-2 tracking-tighter uppercase italic">{cert.name}</div>
              <div className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-4">{cert.desc}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-6">{cert.detail}</p>
              <div className="flex items-center gap-2 text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3 text-green-500" /> {t('verified') || 'Original Document Verified'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}