import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Marquee } from '@/components/Marquee';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { ProductCategories } from '@/components/ProductCategories';
import { ProductionProcess } from '@/components/ProductionProcess';
import { Certifications } from '@/components/Certifications';
import { HomeOemCta } from '@/components/HomeOemCta';
import { GlobalFootprint } from '@/components/GlobalFootprint';
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
      <TrustBar />
      <Marquee />
      <WhyChooseUs />
      <ProductCategories
        initialProducts={galleryProducts.length > 0 ? galleryProducts : undefined}
        initialGalleryProducts={galleryProducts}
        hideFilters
      />
      <ProductionProcess />
      <Certifications />
      <HomeOemCta />
      <GlobalFootprint />
      <FAQAndContact />
    </>
  );
}
