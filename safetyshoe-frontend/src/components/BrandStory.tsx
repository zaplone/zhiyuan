'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Calendar, Award, TrendingUp, Globe, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FACTORY_VIDEO_URL = 'https://pub-096b407387664ba49b08b4ff7cc609de.r2.dev/1bb13ae1f21ef0caedf08c08088178d3.mp4';
const VIDEO_POSTER = '/images/about/gongchang.jpg';

export function BrandStory() {
  const t = useTranslations('BrandStory');
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

  const milestones = [
    {
      year: '1990',
      title: t('milestones.founded.title'),
      desc: t('milestones.founded.desc'),
      icon: Calendar
    },
    {
      year: '2005',
      title: t('milestones.expansion.title'),
      desc: t('milestones.expansion.desc'),
      icon: TrendingUp
    },
    {
      year: '2012',
      title: t('milestones.certification.title'),
      desc: t('milestones.certification.desc'),
      icon: Award
    },
    {
      year: '2023',
      title: t('milestones.global.title'),
      desc: t('milestones.global.desc'),
      icon: Globe
    }
  ];

  return (
    <>
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Story Text */}
            <div className="order-2 lg:order-1">
              <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-4 block">
                {t('label')}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                {t('title')}
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>{t('p1')}</p>
                <p>{t('p2')}</p>
                <blockquote className="border-l-4 border-primary-500 pl-6 italic text-slate-700 font-medium my-8">
                  "{t('quote')}"
                </blockquote>
                <p>{t('p3')}</p>
              </div>
            </div>

            {/* Video Section */}
            <div className="order-1 lg:order-2 relative group">
              <div 
                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                onClick={openModal}
              >
                {/* Video Poster */}
                <Image
                  src={VIDEO_POSTER}
                  alt="Factory Overview"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group-hover:scale-110">
                    <svg className="w-10 h-10 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                
                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-sm text-white/80 mb-2 font-medium uppercase tracking-wider">Watch Our Story</div>
                  <div className="text-2xl font-bold text-white">Factory Tour Video</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 top-12 -right-12 w-24 h-24 opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute -z-10 -bottom-12 -left-12 w-32 h-32 opacity-20 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-slate-900">{t('timelineTitle')}</h3>
            </div>

            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
               {milestones.map((item, index) => {
                 const Icon = item.icon;
                 return (
                   <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative group">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors mx-auto md:mx-0">
                        <Icon className="w-6 h-6 text-slate-400 group-hover:text-primary-600 transition-colors" />
                      </div>
                      <div className="text-3xl font-bold text-slate-200 absolute top-4 right-4">{item.year}</div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2 relative z-10">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed relative z-10">
                        {item.desc}
                      </p>
                   </div>
                 );
               })}
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
