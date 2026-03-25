'use client';

import { useTranslations } from 'next-intl';
import {
  ClipboardList,
  Scan,
  Package,
  Factory,
  ShieldCheck,
  Truck,
  Clock,
} from 'lucide-react';

const STEP_ICONS = [ClipboardList, Scan, Package, Factory, ShieldCheck, Truck] as const;

export function ProductionProcess() {
  const t = useTranslations('ProductionProcess');

  const steps = [
    {
      num: '01',
      tag: t('steps.demand.tag'),
      title: t('steps.demand.title'),
      desc: t('steps.demand.desc'),
    },
    {
      num: '02',
      tag: t('steps.sample.tag'),
      title: t('steps.sample.title'),
      desc: t('steps.sample.desc'),
    },
    {
      num: '03',
      tag: t('steps.material.tag'),
      title: t('steps.material.title'),
      desc: t('steps.material.desc'),
    },
    {
      num: '04',
      tag: t('steps.manufacturing.tag'),
      title: t('steps.manufacturing.title'),
      desc: t('steps.manufacturing.desc'),
    },
    {
      num: '05',
      tag: t('steps.testing.tag'),
      title: t('steps.testing.title'),
      desc: t('steps.testing.desc'),
    },
    {
      num: '06',
      tag: t('steps.delivery.tag'),
      title: t('steps.delivery.title'),
      desc: t('steps.delivery.desc'),
    },
  ];

  return (
    <section
      className="relative overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-slate-50/90 py-20 lg:py-28"
      id="process"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 标题区 */}
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700 shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden />
            {t('label')}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t('title')}{' '}
            <span className="text-primary-700">{t('titleHighlight')}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{t('description')}</p>

          {/* 交期：浅色信纸感，不再用深色块 */}
          <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:flex-row sm:justify-center sm:gap-8 sm:p-6">
            <div className="flex items-center gap-3 text-primary-800">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50">
                <Clock className="h-5 w-5 text-primary-700" strokeWidth={2} aria-hidden />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  {t('avgLeadTime')}
                </p>
                <p className="text-xs text-slate-600">{t('leadTimeDesc')}</p>
              </div>
            </div>
            <div className="hidden h-10 w-px bg-slate-200 sm:block" aria-hidden />
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold tabular-nums text-slate-900 sm:text-5xl">35</span>
              <span className="text-lg font-semibold text-slate-500">{t('days')}</span>
            </div>
          </div>
        </div>

        {/* 步骤卡片 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <article
                key={step.num}
                className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-slate-50 text-primary-800 ring-1 ring-slate-100 transition group-hover:from-primary-100 group-hover:ring-primary-200/60">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <span className="font-mono text-xs font-medium tabular-nums text-slate-300 transition group-hover:text-slate-400">
                    {step.num}
                  </span>
                </div>
                <span className="mb-2 inline-block w-fit rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                  {step.tag}
                </span>
                <h3 className="mb-2 text-base font-semibold leading-snug text-slate-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
