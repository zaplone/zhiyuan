import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/Hero';
import { ManufacturingExcellence } from '@/components/ManufacturingExcellence';
import { GlobalCompliance } from '@/components/GlobalCompliance';
import { TechnicalMatrix } from '@/components/TechnicalMatrix';
import { GlobalReach } from '@/components/GlobalReach';
import { TechnicalOEM } from '@/components/TechnicalOEM';
import { Testimonials } from '@/components/Testimonials';
import { FAQAndContact } from '@/components/FAQAndContact';
import { locales } from '@/locales';
import { loadHomeProducts } from '@/lib/homepageData';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomeMeta' });
  const title = t('title');
  const description = t('description');
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['/images/about/gongchang.jpg'],
    },
  };
}

type HomePageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const { gallery: showcaseProducts } = await loadHomeProducts(locale);

  return (
    <>
      <Hero />
      <ManufacturingExcellence />
      <GlobalCompliance />
      <TechnicalMatrix initialProducts={showcaseProducts} />
      <GlobalReach />
      <TechnicalOEM />
      <Testimonials />
      <FAQAndContact />
    </>
  );
}
