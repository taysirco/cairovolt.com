import type { Metadata } from "next";
import { Geist, Cairo, Outfit } from "next/font/google";
import "../globals.css"; // Corrected path
import Script from 'next/script';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { CartProvider } from '@/context/CartContext';
import LazyClientComponents from '@/components/LazyClientComponents';
import { GoogleAnalytics } from '@/components/content/GoogleAnalytics';
import PrefetchHints from '@/components/content/PrefetchHints';
import InteractiveEffects from '@/components/UX/InteractiveEffects';

import GlobalBusinessSchema from '@/components/content/GlobalBusinessSchema';
import ThemeWatcher from '@/components/ThemeWatcher';

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: 'swap',
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
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* Prevent browsers/extensions from auto-detecting phone numbers — causes hydration mismatches */}
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        {/* Preconnect to critical external origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.statcounter.com" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* OpenSearch */}
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="CairoVolt Search" />
        {/* hreflang tags are generated dynamically by each page's generateMetadata → alternates.languages */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
                  if (mq && mq.matches) {
                    document.documentElement.classList.add('dark');
                  } else {
                    var currentHour = new Date().getHours();
                    var isNight = currentHour >= 18 || currentHour < 6;
                    if (isNight) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  }
                } catch (e) {}
              })();

              // Patch DOM methods to handle browser extensions (phone number detectors,
              // Grammarly, etc.) that modify the DOM between SSR and hydration.
              // When they wrap/move nodes, React's removeChild fails because
              // the target node is no longer in its expected parent.
              if (typeof window !== 'undefined') {
                var origRemoveChild = Node.prototype.removeChild;
                Node.prototype.removeChild = function(child) {
                  if (child.parentNode !== this) {
                    try { child.parentNode.removeChild(child); } catch(e) { 
                      try { child.remove(); } catch(e2) {} 
                    }
                    return child;
                  }
                  return origRemoveChild.apply(this, arguments);
                };

                var origInsertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function(newNode, refNode) {
                  if (refNode && refNode.parentNode !== this) {
                    return origInsertBefore.call(this, newNode, null);
                  }
                  return origInsertBefore.apply(this, arguments);
                };
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${cairo.variable} ${outfit.variable} antialiased min-h-screen flex flex-col`}
      >


        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <ThemeWatcher />
            {/* Standard GA4 Analytics */}
            <GoogleAnalytics />
            {/* Global business graph and tech stack metadata */}
            <GlobalBusinessSchema locale={locale} />


            <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
              <Header />
              <main className="flex-grow w-full max-w-full overflow-x-hidden">
                {children}
              </main>
              <Footer />
              <LazyClientComponents locale={locale} />
              <InteractiveEffects />
            </div>
          </CartProvider>
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <PrefetchHints />}
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
      </body>
    </html>
  );
}

