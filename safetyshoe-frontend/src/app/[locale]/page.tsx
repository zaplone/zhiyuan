import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Shenglei Safety Shoes - Your Trusted Partner for Safety Footwear',
  description:
    'Shenglei Safety Shoes: Professional manufacturer of labor protection shoes since 1990. 8 production lines, 2M pairs annual output. OEM/ODM available.',
  openGraph: {
    title: 'Shenglei Safety Shoes - Your Trusted Partner for Safety Footwear',
    description:
      'Shenglei Safety Shoes: Professional manufacturer of labor protection shoes since 1990. 8 production lines, 2M pairs annual output. OEM/ODM available.',
    images: ['/images/og-image.jpg'],
  },
};

type HomePageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const { gallery } = await loadHomeProducts(locale);
  const galleryProducts = gallery;

  return (
    <>
      <Hero />
      <ManufacturingExcellence />
      <GlobalCompliance />
      <TechnicalMatrix products={galleryProducts} />
      <GlobalReach />
      <TechnicalOEM />
      <Testimonials />
      <FAQAndContact />
    </>
  );
}