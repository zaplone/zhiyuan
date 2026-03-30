'use client';

import { useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Settings, Layers, Activity, Globe, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FACTORY_VIDEO_URL = 'https://pub-096b407387664ba49b08b4ff7cc609de.r2.dev/1bb13ae1f21ef0caedf08c08088178d3.mp4';

export function ManufacturingExcellence() {
  const t = useTranslations('Manufacturing');
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const factoryImages = [
    { src: '/images/about/生产环境1.jpg', alt: 'Cutting Zone' },
    { src: '/images/about/生产环境2.jpg', alt: 'Stitching Zone' },
    { src: '/images/about/生产环境3.jpg', alt: 'Forming Zone' },
    { src: '/images/about/生产环境4.jpg', alt: 'Quality Control' },
    { src: '/images/about/生产环境5.jpg', alt: 'Assembly Line' },
  ];

  const openModal = () => setIsModalOpen(true);
  
  const closeModal = () => {
    setIsModalOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  };

  const stats = [
    { label: t('stats.automation'), value: '6', icon: <Settings className="w-5 h-5" /> },
    { label: t('stats.rd'), value: '45+', icon: <Layers className="w-5 h-5" /> },
    { label: t('stats.output'), value: '3M+', icon: <Activity className="w-5 h-5" /> },
    { label: t('stats.export'), value: '50+', icon: <Globe className="w-5 h-5" /> }
  ];

  return (
    <>
      <section id="factory" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Content: Left Text + Right Video Image */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">

            {/* Left: Text Content */}
            <div className="flex flex-col justify-center py-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-orange-600" />
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
                  {t('subtitle')}
                </h2>
              </div>
              <h3 className="text-5xl lg:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] mb-6">
                {t('title')} <br />
                <span className="text-orange-600">{t('titleHighlight')}</span>
              </h3>

              <div className="space-y-4 text-slate-600 leading-relaxed mb-8">
                <p>{t('desc1')}</p>
                <p className="text-sm font-medium text-slate-500">{t('desc2')}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="border-l-2 border-slate-100 pl-4 py-1 hover:border-orange-600 transition-colors group">
                    <div className="text-2xl font-black text-slate-900 italic">{stat.value}</div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Large Video Thumbnail */}
            <div className="relative">
              <div
                className="aspect-[4/3] overflow-hidden shadow-2xl cursor-pointer group rounded-2xl"
                onClick={openModal}
              >
                <img
                  src="/images/about/生产环境3.jpg"
                  alt={t('imageAlt')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-orange-600/90 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-orange-600/30">
                    <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Video Label Below Image */}
              <div className="mt-3 text-center">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  Click to Watch Factory Tour Video
                </span>
              </div>
            </div>
          </div>

          {/* Factory Thumbnails Row - 5 images */}
          <div className="mt-10">
            <div className="grid grid-cols-5 gap-3">
              {factoryImages.map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            {/* View More Link */}
            <div className="mt-6 text-center">
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-500 transition-colors"
              >
                View Factory Gallery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={closeModal}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <video
                  ref={modalVideoRef}
                  src={FACTORY_VIDEO_URL}
                  className="w-full h-full"
                  controls
                  autoPlay
                  muted
                  playsInline
                />
              </div>
              
              {/* Video Info */}
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Deng Tai Factory Tour</h3>
                <p className="text-white/60 text-sm">Experience our state-of-the-art manufacturing facility</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
