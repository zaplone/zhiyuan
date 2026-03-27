'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Zap, Droplets, Hammer, ShieldCheck } from 'lucide-react';
import { CertificateLightbox } from '@/components/CertificateLightbox';
import {
  GALLERY_EN_IDS,
  GALLERY_ZH_IDS,
  certificateSrc,
  type CertificateId,
} from '@/lib/certificates';

type GalleryTab = 'all' | 'en' | 'zh';

export function CertificationsBar() {
  const t = useTranslations('Certifications');
  const td = useTranslations('Certifications.documents');
  const [tab, setTab] = useState<GalleryTab>('all');
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; title?: string } | null>(null);

  const standards = [
    {
      code: 'SB / SBP',
      title: t('standards.sb.title'),
      desc: t('standards.sb.desc'),
      icon: Hammer,
      color: 'bg-slate-100 text-slate-600',
    },
    {
      code: 'S1 / S1P',
      title: t('standards.s1.title'),
      desc: t('standards.s1.desc'),
      icon: Zap,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      code: 'S3',
      title: t('standards.s3.title'),
      desc: t('standards.s3.desc'),
      icon: Droplets,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      code: 'ASTM F2413',
      title: t('standards.astm.title'),
      desc: t('standards.astm.desc'),
      icon: ShieldCheck,
      color: 'bg-red-50 text-red-600',
    },
  ];

  const galleryIds: CertificateId[] = useMemo(() => {
    if (tab === 'en') return [...GALLERY_EN_IDS];
    if (tab === 'zh') return [...GALLERY_ZH_IDS];
    return [...GALLERY_EN_IDS, ...GALLERY_ZH_IDS];
  }, [tab]);

  const tabBtn = (id: GalleryTab, label: string) => (
    <button
      key={id}
      type="button"
      onClick={() => setTab(id)}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        tab === id
          ? 'bg-primary-700 text-white shadow-sm'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="certificates" className="scroll-mt-24 border-t border-slate-100 bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">{t('standardsSectionTitle')}</h2>
          <p className="text-lg leading-relaxed text-slate-600">{t('standardsDesc')}</p>
        </div>

        <div className="mb-20">
          <h3 className="mb-3 text-center text-xl font-bold text-slate-900">{td('galleryTitle')}</h3>
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {tabBtn('all', td('tabAll'))}
            {tabBtn('en', td('tabEn'))}
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {galleryIds.map((id) => {
              const src = certificateSrc(id);
              const title = td(`items.${id}.title` as Parameters<typeof td>[0]);
              const alt = td(`items.${id}.alt` as Parameters<typeof td>[0]);
              return (
                <button
                  key={`${tab}-${id}`}
                  type="button"
                  onClick={() => setLightbox({ src, alt, title })}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 text-left shadow-sm transition hover:border-primary-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="relative aspect-[3/4] w-full bg-white">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-contain p-3 transition group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="border-t border-slate-100 p-3">
                    <p className="text-sm font-semibold text-slate-900">{title}</p>
                    <span className="mt-1 inline-block text-xs font-medium text-primary-700">
                      {td('openFullSize')} →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-slate-500">{td('disclosure')}</p>
        </div>

        <CertificateLightbox
          src={lightbox?.src ?? null}
          alt={lightbox?.alt ?? ''}
          title={lightbox?.title}
          closeLabel={td('close')}
          open={lightbox !== null}
          onClose={() => setLightbox(null)}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {standards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-8 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className={`rounded-lg px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider ${item.color}`}
                  >
                    {item.code}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5 text-slate-500 transition-colors group-hover:text-primary-600" />
                  </div>
                </div>
                <h4 className="mb-3 text-lg font-bold text-slate-900 transition-colors group-hover:text-primary-700">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
