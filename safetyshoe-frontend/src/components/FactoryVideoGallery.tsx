'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FactoryZone {
  id: string;
  titleKey: string;
  image: string;
}

const FACTORY_ZONES: FactoryZone[] = [
  {
    id: 'cutting',
    titleKey: 'zones.cutting',
    image: '/images/about/裁切区.jpg',
  },
  {
    id: 'stitching',
    titleKey: 'zones.stitching',
    image: '/images/about/车缝区.jpg',
  },
  {
    id: 'forming',
    titleKey: 'zones.forming',
    image: '/images/about/成型区.jpg',
  },
  {
    id: 'assembly',
    titleKey: 'zones.assembly',
    image: '/images/about/装配区.jpg',
  },
  {
    id: 'quality',
    titleKey: 'zones.quality',
    image: '/images/about/质检区.jpg',
  },
  {
    id: 'packaging',
    titleKey: 'zones.packaging',
    image: '/images/about/包装发货.png',
  },
];

export function FactoryVideoGallery() {
  const t = useTranslations('About');
  const [activeImage, setActiveImage] = useState<FactoryZone | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImage = (zone: FactoryZone, index: number) => {
    setActiveImage(zone);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setActiveImage(null);
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % FACTORY_ZONES.length;
    setCurrentIndex(nextIndex);
    setActiveImage(FACTORY_ZONES[nextIndex]);
  };

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + FACTORY_ZONES.length) % FACTORY_ZONES.length;
    setCurrentIndex(prevIndex);
    setActiveImage(FACTORY_ZONES[prevIndex]);
  };

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-1 bg-orange-600" />
              <span className="text-xs font-bold text-orange-600 uppercase tracking-[0.2em]">
                {t('factoryGallery')}
              </span>
              <div className="w-12 h-1 bg-orange-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              {t('factoryTitle')}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t('factoryDescription')}
            </p>
          </div>

          {/* Factory Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {FACTORY_ZONES.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="group cursor-pointer"
                onClick={() => openImage(zone, index)}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-slate-100">
                  {/* Background Image */}
                  <Image
                    src={zone.image}
                    alt={t(`${zone.titleKey}.title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Light bottom overlay keeps labels readable without dulling the workshop photos. */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/38 via-black/8 to-transparent transition-opacity group-hover:from-black/48" />

                  {/* Orange Accent Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    {/* Zone Number */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 bg-orange-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                        {t(`${zone.titleKey}.zh`)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base md:text-lg font-bold text-white mb-1 drop-shadow-md">
                      {t(`${zone.titleKey}.title`)}
                    </h3>

                    {/* Description - Hidden on mobile */}
                    <p className="hidden md:block text-xs text-white/75 line-clamp-2">
                      {t(`${zone.titleKey}.desc`)}
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-2xl md:text-3xl font-black text-orange-600">30+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Years Experience</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-2xl md:text-3xl font-black text-orange-600">6</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Production Lines</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-2xl md:text-3xl font-black text-orange-600">100%</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">QC Pass Rate</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="text-2xl md:text-3xl font-black text-orange-600">50K+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Pairs / Day</div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={closeImage}
          >
            {/* Close Button */}
            <button
              onClick={closeImage}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation - Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Navigation - Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <motion.div
              key={activeImage.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] bg-black rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={activeImage.image}
                  alt={t(`${activeImage.titleKey}.title`)}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Image Info */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-orange-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {currentIndex + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white">{t(`${activeImage.titleKey}.title`)}</h3>
                  <span className="text-orange-400 text-sm">/ {t(`${activeImage.titleKey}.zh`)}</span>
                </div>
                <p className="text-white/60 text-sm">{t(`${activeImage.titleKey}.desc`)}</p>
              </div>

              {/* Image Counter */}
              <div className="mt-4 flex justify-center gap-2">
                {FACTORY_ZONES.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-orange-500 w-6' : 'bg-white/30'}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
