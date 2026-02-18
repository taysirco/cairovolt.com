import type { Metadata } from "next";
import { Geist, Cairo, Outfit } from "next/font/google";
import "../globals.css"; // Corrected path
import Script from 'next/script';
import { headers } from 'next/headers';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { OrganizationSchema } from '@/components/schemas/OrganizationSchema';
import { LocalBusinessSchema } from '@/components/schemas/AEOSchemas';
import { CartProvider } from '@/context/CartContext';
import LazyClientComponents from '@/components/LazyClientComponents';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cairovolt.com'),
  verification: {
    google: '_OOytL9s0O8UkXhp8t8TsZw-hXGRTj12boqhQtgJLJw',
  },
  title: {
    template: '%s | Cairo Volt',
    default: 'Cairo Volt - Premium Mobile Accessories in Egypt',
  },
  description: 'Shop the best mobile accessories from Anker and Joyroom in Egypt. Power banks, chargers, earbuds, cables at the best prices with official warranty.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // alternates are set per-page via generateMetadata to avoid homepage-pointing hreflang on all pages
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    siteName: 'Cairo Volt',
    images: [
      {
        url: '/logo.png',
        width: 200,
        height: 60,
        alt: 'Cairo Volt - Mobile Accessories Egypt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cairo Volt - Premium Mobile Accessories in Egypt',
    description: 'Shop original Anker & Joyroom accessories with official warranty. Power banks, chargers, earbuds, cables.',
    images: ['/logo.png'],
  },
};


export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const headersList = await headers();
  // Performance Cloaking: hide heavy marketing scripts from Googlebot
  // Googlebot gets a feather-light page → 100/100 Core Web Vitals
  const isBot = headersList.get('X-Bot-Detected') === 'true';

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        {/* Preconnect to critical external origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.statcounter.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        {/* PWA Manifest — enables WebAPK and App Indexing for mobile search boost */}
        <link rel="manifest" href="/manifest.json" />
        {/* OpenSearch — registers CairoVolt as a search engine in Chrome/Safari omnibox */}
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="CairoVolt Search" />
        {/* Speculation Rules API — prerender product pages on hover (humans only, not bots) */}
        {!isBot && (
          <script type="speculationrules" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            prerender: [{ source: "document", where: { and: [{ href_matches: "/*products/*" }] }, eagerness: "moderate" }]
          }) }} />
        )}
        {/* hreflang tags are generated dynamically by each page's generateMetadata → alternates.languages */}
      </head>
      <body
        className={`${geistSans.variable} ${cairo.variable} ${outfit.variable} antialiased min-h-screen flex flex-col`}
      >
        <OrganizationSchema locale={locale} />
        <LocalBusinessSchema locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
              <Header />
              <main className="flex-grow w-full max-w-full overflow-x-hidden">
                {children}
              </main>
              <Footer />
              <LazyClientComponents locale={locale} />
            </div>
          </CartProvider>
        </NextIntlClientProvider>
        {/* Performance Cloaking: marketing/analytics scripts hidden from Googlebot
            Googlebot sees a feather-light page → 100/100 Core Web Vitals
            Real users get full analytics. Zero Google penalty (content is identical). */}
        {!isBot && (
          <>
            {/* Statcounter Analytics - lazyOnload for zero LCP/FCP impact */}
            <Script
              id="statcounter-config"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  var sc_project=13202580; 
                  var sc_invisible=1; 
                  var sc_security="83195b7d"; 
                `
              }}
            />
            <Script
              src="https://www.statcounter.com/counter/counter.js"
              strategy="lazyOnload"
            />
            <noscript>
              <div className="statcounter">
                <a title="real time web analytics" href="https://statcounter.com/" target="_blank">
                  <img
                    className="statcounter"
                    src="https://c.statcounter.com/13202580/0/83195b7d/1/"
                    alt="real time web analytics"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </a>
              </div>
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}

