'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Award, FileCheck, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { CertificateLightbox } from '@/components/CertificateLightbox';
import {
  HOMEPAGE_CERTIFICATE_IDS,
  certificateSrc,
  type CertificateId,
} from '@/lib/certificates';

export function CertPreviewStrip() {
  const t = useTranslations('Certifications.documents');
  const locale = useLocale();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; title?: string } | null>(null);

  // Display first 3 certificates as preview
  const previewCerts = HOMEPAGE_CERTIFICATE_IDS.slice(0, 3);

  return (
    <section className="bg-gradient-to-r from-slate-50 to-white border-y border-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          {/* Left: Title and CTA */}
          <div className="flex-shrink-0 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Award className="w-5 h-5 text-primary-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                {t('title')}
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-xs">
              {locale === 'zh' 
                ? 'ISO 9001 / 14001 / 45001 认证工厂，欧盟 CE 型式检验'
                : 'ISO 9001 / 14001 / 45001 Certified Factory, EU CE Type Examination'}
            </p>
            <Link
              href={`/${locale}/about#certificates`}
              className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              <FileCheck className="w-4 h-4" />
              {locale === 'zh' ? '查看全部证书' : 'View All Certificates'}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Certificate thumbnails */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {previewCerts.map((id: CertificateId) => {
                const src = certificateSrc(id);
                const title = t(`items.${id}.title` as Parameters<typeof t>[0]);
                const alt = t(`items.${id}.alt` as Parameters<typeof t>[0]);
                
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setLightbox({ src, alt, title })}
                    className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-primary-300"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-contain p-2 transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 33vw, 150px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="text-[10px] font-medium text-white truncate">
                          {id === 'eu_ce' ? 'CE' : id.replace('_en', '').toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <CertificateLightbox
          src={lightbox?.src ?? null}
          alt={lightbox?.alt ?? ''}
          title={lightbox?.title}
          closeLabel={t('close')}
          open={lightbox !== null}
          onClose={() => setLightbox(null)}
        />
      </div>
    </section>
  );
}
