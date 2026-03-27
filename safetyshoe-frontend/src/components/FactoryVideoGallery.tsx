'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FACTORY_VIDEO_URL = 'https://pub-096b407387664ba49b08b4ff7cc609de.r2.dev/1bb13ae1f21ef0caedf08c08088178d3.mp4';

interface VideoSection {
  id: string;
  title: string;
  titleZh: string;
  image: string;
  description: string;
}

const VIDEO_SECTIONS: VideoSection[] = [
  {
    id: 'about',
    title: 'About Factory',
    titleZh: '关于工厂',
    image: '/images/about/gongchang.jpg',
    description: 'Overview of our production facility'
  },
  {
    id: 'materials',
    title: 'Materials Zone',
    titleZh: '原材料区',
    image: '/images/about/steel-toe-boot.jpg',
    description: 'Raw material selection and storage'
  },
  {
    id: 'cutting',
    title: 'Cutting Zone',
    titleZh: '裁切区',
    image: '/images/about/composite-shoe.jpg',
    description: 'Precision cutting process'
  },
  {
    id: 'forming',
    title: 'Forming Zone',
    titleZh: '成型区',
    image: '/images/about/slip-resistant.jpg',
    description: 'Shoe forming and assembly'
  },
  {
    id: 'packaging',
    title: 'Packaging Zone',
    titleZh: '包装区',
    image: '/images/about/winter-boot.jpg',
    description: 'Quality inspection and packaging'
  },
  {
    id: 'shipping',
    title: 'Shipping Zone',
    titleZh: '发货区',
    image: '/images/about/gongchang.jpg',
    description: 'Warehouse and logistics'
  }
];

export function FactoryVideoGallery() {
  const t = useTranslations('About');
  const [activeVideo, setActiveVideo] = useState<VideoSection | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const openVideo = (section: VideoSection) => {
    setActiveVideo(section);
  };

  const closeVideo = () => {
    setActiveVideo(null);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_SECTIONS.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openVideo(section)}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-slate-200">
                  {/* Background Image */}
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group-hover:scale-110 border-2 border-white/50">
                      <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 bg-primary-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{section.title}</h3>
                        <p className="text-sm text-white/70">{section.titleZh}</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/60 line-clamp-2">{section.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={closeVideo}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
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
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="w-8 h-8 bg-primary-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {VIDEO_SECTIONS.findIndex(s => s.id === activeVideo.id) + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white">{activeVideo.title}</h3>
                </div>
                <p className="text-white/60 text-sm">{activeVideo.titleZh}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
