'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const SLIDE_IMAGES = [
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070',
  'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=2071'
] as const;

const AUTO_MS = 6000;

export function Hero() {
  const t = useTranslations('Hero');
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide((s) => (s + 1) % SLIDE_IMAGES.length);
  };

  const prevSlide = () => {
    setSlide((s) => (s - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
  };

  useEffect(() => {
    const id = setInterval(nextSlide, AUTO_MS);
    return () => clearInterval(id);
  }, [nextSlide]);

  const stats = [
    { value: '20+', label: 'Years Experience' },
    { value: '12', label: 'Production Lines' },
    { value: '100%', label: 'QC Inspection' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-stretch bg-slate-900 overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="flex flex-col lg:flex-row w-full items-stretch">
        <div className="lg:w-1/2 p-12 lg:p-24 xl:p-32 flex flex-col justify-center bg-slate-900 relative z-10">
          <div className="max-w-xl ml-auto w-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-1 bg-orange-600" />
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em]">
                {t('badge') || 'Direct Manufacturing Hub'}
              </span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-10 italic">
              {t('title') || '5 Million Pairs'} <br />
              <span className="text-orange-600">{t('highlight') || 'Annual Capacity.'}</span>
            </h1>
            
            <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-md font-medium">
              {t('description') || 'Your reliable global OEM/ODM partner. Precision-engineered safety footwear built for international industrial standards.'}
            </p>

            <div className="flex flex-wrap gap-6 mb-16">
              <Link 
                href="/en/products" 
                className="bg-orange-600 text-white px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all shadow-2xl"
              >
                {t('cta1') || 'View Products'}
              </Link>
              <Link 
                href="/en/services/oem" 
                className="border border-white/20 text-white px-10 py-5 font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-3"
              >
                {t('cta2') || 'OEM Solutions'} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-black text-white italic">{stat.value}</div>
                  <div className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 relative min-h-[500px] lg:min-h-full overflow-hidden group">
          <div
            key={slide}
            className="absolute inset-0 transition-all duration-1000"
          >
            <img 
              src={SLIDE_IMAGES[slide]} 
              alt="Factory Excellence" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-orange-600/10 mix-blend-multiply" />
          
          <div className="absolute bottom-10 right-10 bg-white p-6 hidden xl:block">
            <div className="text-slate-900 font-black text-xl tracking-tighter italic leading-none mb-1 uppercase">
              {t('certified') || 'Certified Factory'}
            </div>
            <div className="text-[8px] text-orange-600 font-black uppercase tracking-[0.2em]">ISO 9001 // BSCI</div>
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {SLIDE_IMAGES.map((_, i) => (
              <button 
                key={i}
                onClick={() => setSlide(i)}
                className={`h-1 transition-all duration-500 ${i === slide ? 'w-10 bg-orange-600' : 'w-4 bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}