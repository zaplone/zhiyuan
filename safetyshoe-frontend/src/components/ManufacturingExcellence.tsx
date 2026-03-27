'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Settings, Layers, Activity, Globe, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FACTORY_VIDEO_URL = 'https://pub-096b407387664ba49b08b4ff7cc609de.r2.dev/1bb13ae1f21ef0caedf08c08088178d3.mp4';

export function ManufacturingExcellence() {
  const t = useTranslations('Manufacturing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

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
      <section id="factory" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-orange-600" />
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">
                  {t('subtitle')}
                </h2>
              </div>
              <h3 className="text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85] mb-10 italic">
                {t('title')} <br />
                <span className="text-orange-600">{t('titleHighlight')}</span>
              </h3>
              
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-12">
                <p>
                  {t('desc1')}
                </p>
                <p className="text-sm font-medium text-slate-500">
                  {t('desc2')}
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

            {/* Video Section */}
            <div className="order-1 lg:order-2 relative">
              <div 
                className="aspect-[4/5] overflow-hidden border-[16px] border-slate-50 shadow-2xl cursor-pointer group"
                onClick={openModal}
              >
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070" 
                  alt={t('imageAlt')} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-black/50 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group-hover:scale-110">
                    <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                
                {/* Video Label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                    <div className="text-sm font-bold">Factory Tour Video</div>
                    <div className="text-xs text-white/70">Click to watch</div>
                  </div>
                </div>
              </div>
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
