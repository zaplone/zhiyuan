'use client';

import { Star } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const ITEM_IDS = ['1', '2', '3'] as const;

export function Testimonials() {
  const locale = useLocale();
  const t = useTranslations('Testimonials');

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEM_IDS.map((id) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-soft p-6 hover:shadow-medium transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-gray-700 mb-4 italic">
                &quot;{t(`items.${id}.content`)}&quot;
              </blockquote>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-gray-600">
                      {t(`items.${id}.name`)
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t(`items.${id}.name`)}</div>
                    <div className="text-xs text-gray-500">{t(`items.${id}.company`)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('ctaTitle')}</h3>
            <p className="text-lg mb-6 opacity-90">
              {t('ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/products`}
                className="btn bg-white text-primary-600 hover:bg-gray-100"
              >
                {t('browseProducts')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
