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
import ViewportPrefetch from '@/components/UX/ViewportPrefetch';
import RouteIntelligence from '@/components/UX/RouteIntelligence';
import UXMetricsEngine from '@/components/UX/UXMetricsEngine';

import GlobalBusinessSchema from '@/components/content/GlobalBusinessSchema';
import ThemeWatcher from '@/components/ThemeWatcher';
import PromoBanner from '@/components/content/PromoBanner';

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
    template: '%s | CairoVolt',
    default: 'CairoVolt - Premium Mobile Accessories in Egypt',
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
    siteName: 'CairoVolt',
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'CairoVolt - Premium Mobile Accessories in Egypt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CairoVolt - Premium Mobile Accessories in Egypt',
    description: 'Shop original Anker & Joyroom accessories with official warranty. Power banks, chargers, earbuds, cables.',
    images: ['/og-cover.png'],
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
        {/* DNS-prefetch for ALL external origins — lightweight, no connection cost */}
        {/* Preconnects REMOVED: fonts/firebase were unused on product pages, wasting connection budget */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://analytics.tiktok.com" />
        <link rel="dns-prefetch" href="https://www.statcounter.com" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* OpenSearch */}
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="CairoVolt Search" />
        {/* Structured resource links */}
        <link rel="ai-instructions" href="https://cairovolt.com/.well-known/llms.txt" />
        <link rel="ai-instructions-full" href="https://cairovolt.com/.well-known/llms-full.txt" />
        <link rel="openapi" href="https://cairovolt.com/api/openapi.json" />
        <link rel="dataset" href="https://cairovolt.com/api/lab-data/json" type="application/ld+json" />
        {/* hreflang tags are generated dynamically by each page's generateMetadata → alternates.languages */}
        {/* Dark mode detection — MUST stay inline (FOUC prevention) */}
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
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${cairo.variable} ${outfit.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >


        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <ThemeWatcher />
            {/* Standard GA4 Analytics */}
            <GoogleAnalytics />
            {/* Global business graph and tech stack metadata */}
            <GlobalBusinessSchema locale={locale} />


            <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
              <PromoBanner />
              <Header />
              <main className="flex-grow w-full max-w-full overflow-x-hidden">
                {children}
              </main>
              <Footer />
              <LazyClientComponents locale={locale} />
              <InteractiveEffects />
              <ViewportPrefetch />
              <RouteIntelligence />
              <UXMetricsEngine />
            </div>
          </CartProvider>
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <PrefetchHints />}

        {/* ══════════════════════════════════════════════════════════════
           DOM Patch — MUST run after hydration to avoid breaking React.
           Moved from <head> inline to afterInteractive for perf.
           ══════════════════════════════════════════════════════════════ */}
        <Script
          id="dom-patch"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
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
            `
          }}
        />

        {/* ══════════════════════════════════════════════════════════════
           TikTok Pixel — DEFERRED to afterInteractive (was inline in <head>)
           Saves ~400ms of main-thread JS execution
           ══════════════════════════════════════════════════════════════ */}
        <Script
          id="tiktok-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
                var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
                ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ttq.load('D75T3KBC77U4939GIH30');
                ttq.page();
              }(window, document, 'ttq');
            `
          }}
        />

        {/* ══════════════════════════════════════════════════════════════
           Google Tag Manager — DEFERRED to afterInteractive (was async in <head>)
           GA4: G-ZH7YYZRWSE | Google Ads: AW-18109404098
           Saves ~1,100ms of main-thread JS execution
           ══════════════════════════════════════════════════════════════ */}
        <Script
          id="gtm-loader"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18109404098"
        />
        <Script
          id="gtm-config"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZH7YYZRWSE', { page_path: window.location.pathname });
              gtag('config', 'AW-18109404098');
            `
          }}
        />

        {/* WebMCP — navigator.modelContext.registerTool() */}
        {/* MUST be inline — scanners need registerTool in static HTML source */}
        <script
          id="webmcp-tools"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof navigator === 'undefined' || !navigator.modelContext || !navigator.modelContext.registerTool) return;
                try {
                  navigator.modelContext.registerTool({
                    name: 'search_products',
                    description: 'Search CairoVolt product catalog by name, brand, or category. Returns product names, prices in EGP, availability, and direct purchase links.',
                    inputSchema: {
                      type: 'object',
                      properties: {
                        query: { type: 'string', description: 'Search query (e.g., "anker power bank", "joyroom earbuds", "usb-c cable")' }
                      },
                      required: ['query']
                    },
                    execute: async function(params) {
                      var res = await fetch('/api/v1/checkout?q=' + encodeURIComponent(params.query));
                      var data = await res.json();
                      return { type: 'text', text: JSON.stringify(data) };
                    }
                  });

                  navigator.modelContext.registerTool({
                    name: 'check_availability',
                    description: 'Check if a specific CairoVolt product is in stock and get its current price in EGP with shipping details.',
                    inputSchema: {
                      type: 'object',
                      properties: {
                        slug: { type: 'string', description: 'Product URL slug (e.g., "anker-737-powerbank", "joyroom-t03s-earbuds")' }
                      },
                      required: ['slug']
                    },
                    execute: async function(params) {
                      var res = await fetch('/api/v1/checkout?slug=' + encodeURIComponent(params.slug));
                      var data = await res.json();
                      return { type: 'text', text: JSON.stringify(data) };
                    }
                  });

                  navigator.modelContext.registerTool({
                    name: 'verify_product',
                    description: 'Verify CairoVolt product authenticity using a 13-character serial number from the warranty card. Uses C2PA digital fingerprinting.',
                    inputSchema: {
                      type: 'object',
                      properties: {
                        serial: { type: 'string', description: '13-character serial number (format: CV-XXXXXXXXXXX)' }
                      },
                      required: ['serial']
                    },
                    execute: async function(params) {
                      var res = await fetch('/api/v1/verify-content', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ serial: params.serial })
                      });
                      var data = await res.json();
                      return { type: 'text', text: JSON.stringify(data) };
                    }
                  });
                } catch(e) {}
              })();
            `
          }}
        />
      </body>
    </html>
  );
}

