import type { Metadata } from 'next';
import { locales } from '@/locales';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { Toaster } from 'react-hot-toast';
import { IntlProvider } from '@/components/IntlProvider';
import { LocaleHtmlAttributes } from '@/components/LocaleHtmlAttributes';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: {
    default: 'Shenglei Safety Shoes - Your Trusted Partner for Safety Footwear',
    template: '%s | Shenglei Safety Shoes'
  },
  description: 'Shenglei Safety Shoes: Professional manufacturer of labor protection shoes since 1990. 8 production lines, 2M pairs annual output. Europe, Asia, Africa, Russia. OEM/ODM available.',
  keywords: [
    'safety shoes',
    'steel toe boots',
    'composite toe shoes',
    'slip resistant boots',
    'industrial footwear',
    'work boots',
    'safety boots',
    'OEM manufacturing',
    'safety footwear',
    'construction boots'
  ],
  authors: [{ name: 'Shenglei Safety Shoes' }],
  creator: 'Shenglei Safety Shoes',
  publisher: 'Shenglei Safety Shoes',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'zh': '/zh',
      'de': '/de',
      'ru': '/ru',
      'ar': '/ar',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Shenglei Safety Shoes - Your Trusted Partner for Safety Footwear',
    description: 'Shenglei Safety Shoes: Professional manufacturer of labor protection shoes since 1990. 8 production lines, 2M pairs annual output. OEM/ODM available.',
    siteName: 'Shenglei Safety Shoes',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shenglei Safety Shoes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shenglei Safety Shoes - Your Trusted Partner for Safety Footwear',
    description: 'Shenglei Safety Shoes: Professional manufacturer of labor protection shoes since 1990. 8 production lines, 2M pairs annual output. OEM/ODM available.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '6uGTJxkgd5VAXpTvkK9OHPR4MsSVXo6d-UB_DcQLqMM',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params to get locale
  const { locale } = await params;

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Shenglei Safety Shoes',
            description:
              'Shenglei Safety Shoes: Professional manufacturer of labor protection shoes since 1990. 8 production lines, 2 million pairs annual output.',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/logo.png`,
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+86 157 2606 2996',
              email: 'sales@slsafetyshoes.com',
              contactType: 'customer service',
              availableLanguage: ['English', 'Chinese', 'German', 'Russian', 'Arabic'],
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: '261531, Zhanglusi Village',
              addressLocality: 'Gaomi City',
              addressRegion: 'Shandong Province',
              postalCode: '261531',
              addressCountry: 'CN',
            },
            sameAs: [
              'https://www.facebook.com/luyuanshoes',
              'https://www.linkedin.com/company/luyuanshoes',
              'https://www.twitter.com/luyuanshoes',
            ],
          }),
        }}
      />
      <IntlProvider locale={locale} messages={messages}>
        <LocaleHtmlAttributes locale={locale} />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                      page_title: document.title,
                      page_location: window.location.href,
                    });
                  `,
              }}
            />
          </>
        )}
      </IntlProvider>
    </>
  );
}
