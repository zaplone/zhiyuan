'use client';

import { useTranslations } from 'next-intl';

export function TrustBar() {
  const t = useTranslations('TrustBar');

  const stats = [
    { n: t('stats.yearsNumber'), unit: t('stats.yearsUnit'), label: t('stats.years') },
    { n: t('stats.clientsNumber'), unit: t('stats.clientsUnit'), label: t('stats.clients') },
    { n: t('stats.capacityNumber'), unit: t('stats.capacityUnit'), label: t('stats.capacity') },
    { n: t('stats.countriesNumber'), unit: t('stats.countriesUnit'), label: t('stats.countries') },
  ];

  return (
    <section
      className="bg-[#1e2840] border-b-4 border-[#e8a820]"
      aria-label="Trust indicators"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16 grid grid-cols-4 divide-x divide-white/6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="py-8 text-center"
          >
            <div className="font-['Bebas_Neue'] text-5xl text-[#e8a820] leading-none">
              {stat.n}
              {stat.unit ? <sup className="text-2xl">{stat.unit}</sup> : null}
            </div>
            <div className="text-white/45 text-xs tracking-[2px] uppercase mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}