'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Award, Globe2, ShieldCheck, BadgeCheck, TrendingUp, Clock, FileBadge, Shield } from 'lucide-react';
import { CertificateLightbox } from '@/components/CertificateLightbox';
import {
  HOMEPAGE_CERTIFICATE_IDS,
  certificateSrc,
  type CertificateId,
} from '@/lib/certificates';

function ColumnHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
}) {
  return (
    <div className="mb-6 flex min-h-[148px] flex-col border-b border-slate-200/90 pb-6 sm:min-h-[132px] lg:mb-8 lg:min-h-[158px]">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{eyebrow}</p>
      <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl">{title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

export function Certifications() {
  const t = useTranslations('Certifications');
  const td = useTranslations('Certifications.documents');
  const locale = useLocale();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; title?: string } | null>(null);

  const certs = [
    {
      icon: '🇨🇳',
      name: 'GB 12011-2009',
      desc: t('certs.gb.desc'),
      tag: t('certs.gb.tag'),
    },
    {
      icon: '🇪🇺',
      name: 'EN ISO 20345',
      desc: t('certs.en.desc'),
      tag: t('certs.en.tag'),
    },
    {
      icon: '🌐',
      name: 'ANSI Z41 / ASTM F2413',
      desc: t('certs.ansi.desc'),
      tag: t('certs.ansi.tag'),
    },
    {
      icon: '✅',
      name: 'ISO 9001:2015',
      desc: t('certs.iso.desc'),
      tag: t('certs.iso.tag'),
    },
  ];

  const certCornerIcons = [Award, Globe2, ShieldCheck, BadgeCheck] as const;

  const metrics = [
    { n: '99.2', unit: '%', label: t('metrics.qualityRate'), icon: TrendingUp },
    { n: '97.8', unit: '%', label: t('metrics.onTime'), icon: Clock },
    { n: '12', unit: '', label: t('metrics.certs'), icon: FileBadge },
    { n: '0', unit: '', label: t('metrics.recall'), icon: Shield },
  ];

  return (
    <section
      className="relative overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-white via-slate-50/90 to-slate-50 py-20 lg:py-24"
      id="certs"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,58,95,0.06),transparent)]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">
            {t('standardsSectionTitle')}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t('title')} <span className="text-primary-800">{t('titleHighlight')}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{t('description')}</p>
        </div>

        <div className="mx-auto mb-14 max-w-5xl lg:mb-16">
          <div className="mb-6 text-center">
            <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{td('title')}</h3>
            <p className="mt-2 text-sm text-slate-600">{td('subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {HOMEPAGE_CERTIFICATE_IDS.map((id: CertificateId) => {
              const src = certificateSrc(id);
              const title = td(`items.${id}.title` as Parameters<typeof td>[0]);
              const subtitle = td(`items.${id}.subtitle` as Parameters<typeof td>[0]);
              const alt = td(`items.${id}.alt` as Parameters<typeof td>[0]);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setLightbox({ src, alt, title })}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white text-left shadow-sm ring-1 ring-slate-100/80 transition hover:border-primary-200 hover:shadow-md"
                >
                  <div className="relative aspect-[3/4] w-full bg-slate-100">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-contain p-2 transition group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <div className="border-t border-slate-100 p-3">
                    <p className="text-[13px] font-semibold leading-snug text-slate-900">{title}</p>
                    <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500">{subtitle}</p>
                    <span className="mt-2 inline-block text-[11px] font-medium text-primary-700">
                      {td('openFullSize')} →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-500 sm:text-xs">{td('disclosure')}</p>
          <p className="mt-3 text-center">
            <Link
              href={`/${locale}/about#certificates`}
              className="text-sm font-semibold text-primary-700 underline-offset-4 hover:text-primary-800 hover:underline"
            >
              {td('viewAll')}
            </Link>
          </p>
        </div>

        <CertificateLightbox
          src={lightbox?.src ?? null}
          alt={lightbox?.alt ?? ''}
          title={lightbox?.title}
          closeLabel={td('close')}
          open={lightbox !== null}
          onClose={() => setLightbox(null)}
        />

        {/* 两栏等宽：左右标题结构一致，避免 7/5 带来的轻重失调 */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="min-w-0">
            <ColumnHeader
              eyebrow={t('label')}
              title={t('standardsColumnTitle')}
              description={t('standardsDesc')}
            />

            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-100/80 sm:p-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {certs.map((cert, i) => {
                  const Corner = certCornerIcons[i];
                  return (
                    <article
                      key={cert.name}
                      className="group flex h-full min-h-0 flex-col rounded-xl border border-slate-100 bg-slate-50/40 p-4 transition-all duration-300 hover:border-primary-200 hover:bg-white hover:shadow-md sm:p-4"
                    >
                      <div className="mb-2.5 flex items-start justify-between gap-2">
                        <span className="text-2xl leading-none" aria-hidden>
                          {cert.icon}
                        </span>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700 transition group-hover:bg-primary-100">
                          <Corner className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                        </div>
                      </div>
                      <h4 className="text-[15px] font-semibold leading-snug text-slate-900">{cert.name}</h4>
                      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-600">{cert.desc}</p>
                      <span className="mt-3 inline-flex w-fit rounded-md bg-accent-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent-800 ring-1 ring-accent-200/60">
                        {cert.tag}
                      </span>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <ColumnHeader
              eyebrow={t('metricsLabel')}
              title={
                <>
                  {t('metricsTitle')}{' '}
                  <span className="text-primary-800">{t('metricsTitleHighlight')}</span>
                </>
              }
              description={t('metricsDescription')}
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100/80">
              <div className="grid grid-cols-2 divide-x divide-y divide-slate-100">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  const isAccent = index % 2 === 0;
                  return (
                    <div
                      key={metric.label}
                      className={`flex min-h-[132px] flex-col items-center justify-center gap-2 px-4 py-6 text-center sm:min-h-[144px] sm:px-5 sm:py-7 ${
                        index % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 shrink-0 ${isAccent ? 'text-primary-600' : 'text-accent-600'}`}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      <div
                        className={`font-bold tabular-nums tracking-tight ${isAccent ? 'text-primary-800' : 'text-accent-700'}`}
                      >
                        <span className="text-3xl sm:text-4xl">{metric.n}</span>
                        {metric.unit ? (
                          <span className="ml-0.5 text-xl font-semibold text-slate-400">{metric.unit}</span>
                        ) : null}
                      </div>
                      <p className="max-w-[11rem] text-center text-[11px] font-medium uppercase leading-snug tracking-wide text-slate-500">
                        {metric.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
