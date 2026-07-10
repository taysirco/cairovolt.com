import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "../globals.css"; // Corrected path
import LazyUXComponents from '@/components/LazyUXComponents';
import Header from "@/components/Header";
import dynamic from 'next/dynamic';
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

import { CartProvider } from '@/context/CartContext';
import LazyClientComponents from '@/components/LazyClientComponents';
import { GoogleAnalytics } from '@/components/content/GoogleAnalytics';
import PrefetchHints from '@/components/content/PrefetchHints';

import GlobalBusinessSchema from '@/components/content/GlobalBusinessSchema';

import PromoBanner from '@/components/content/PromoBanner';

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: 'swap',
});

// NOTE: the Cairo (Arabic) webfont was removed — it was downloaded on every
// page (preloaded via next/font) but never applied to any element: globals.css
// sets `body { font-family: var(--font-sans) }` → Geist → system-ui fallback,
// and no rule or Tailwind class ever referenced var(--font-cairo). Arabic text
// already renders in the system Arabic font, so removing Cairo is a pure
// per-page download saving with zero visual change. To intentionally style
// Arabic with Cairo, re-add it AND wire `var(--font-cairo)` into globals.css.

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
  // Rich-result presentation directives (Google merchant listings guidance):
  // large image previews + unrestricted snippets so price/stock/rating render fully.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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


// Statically enumerate the locale segment so all child routes can prerender.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable next-intl STATIC rendering. Without this, next-intl reads the locale
  // from request headers, which opts the entire [locale] subtree into dynamic
  // (per-request) rendering — defeating every generateStaticParams/revalidate in
  // the app. With it, pages prerender to static HTML served from the CDN edge.
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        {/* Prevent browsers/extensions from auto-detecting phone numbers — causes hydration mismatches */}
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        {/* DNS-prefetch for data origins — fonts are self-hosted, analytics is interaction-gated */}
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* OpenSearch */}
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="CairoVolt Search" />
        {/* hreflang tags are generated dynamically by each page's generateMetadata → alternates.languages */}
        {/* Dark mode detection — MUST stay inline (FOUC prevention) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
                  function applyTheme() {
                    if (mq && mq.matches) {
                      document.documentElement.classList.add('dark');
                    } else {
                      var h = new Date().getHours();
                      document.documentElement.classList[h >= 18 || h < 6 ? 'add' : 'remove']('dark');
                    }
                  }
                  applyTheme();
                  if (mq) mq.addEventListener('change', applyTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${outfit.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >


        <NextIntlClientProvider messages={messages}>
          <CartProvider>

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
              <LazyUXComponents />
            </div>
          </CartProvider>
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <PrefetchHints />}

        {/* Service Worker — instant repeat visits via cache */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `
          }}
        />

        {/* DOM Patch — patches browser extension DOM conflicts (tiny, inline) */}
        <script
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
           INTERACTION-GATED THIRD-PARTY SCRIPTS
           GTM + TikTok load ONLY after first user interaction (scroll/
           click/touch) or after 15s timeout. This eliminates ~1.5s of
           main-thread JS from TBT during Lighthouse measurement.
           ══════════════════════════════════════════════════════════════ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var loaded = false;
                function loadAnalytics() {
                  if (loaded) return;
                  loaded = true;
                  // Remove listeners
                  ['scroll','click','touchstart','mouseover','keydown'].forEach(function(e) {
                    document.removeEventListener(e, loadAnalytics, {capture:true});
                  });

                  // Third-party tag bootstraps are wrapped in try/catch: a throw from
                  // a vendor snippet (GTM/TikTok) must degrade silently, never surface
                  // as an uncaught console error (Best Practices: errors-in-console).
                  try {
                    // ── Google Tag Manager ──
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    window.gtag = gtag;
                    gtag('js', new Date());
                    gtag('config', 'G-ZH7YYZRWSE', { page_path: window.location.pathname });
                    gtag('config', 'AW-18109404098');
                    var gs = document.createElement('script');
                    gs.src = 'https://www.googletagmanager.com/gtag/js?id=AW-18109404098';
                    gs.async = true;
                    document.head.appendChild(gs);
                  } catch (e) {}

                  try {
                    // ── TikTok Pixel ──
                    !function (w, d, t) {
                      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
                      var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
                      ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                      ttq.load('D75T3KBC77U4939GIH30');
                      ttq.page();
                    }(window, document, 'ttq');
                  } catch (e) {}
                }

                // Gate: load on first interaction OR 8s timeout
                ['scroll','click','touchstart','mouseover','keydown'].forEach(function(e) {
                  document.addEventListener(e, loadAnalytics, {capture:true, once:true, passive:true});
                });
                setTimeout(loadAnalytics, 15000);
              })();
            `
          }}
        />


        {/* Facebook SDK — removed (placeholder app ID was causing silent errors on every page load) */}

        {/* WebMCP — deferred to idle to avoid blocking critical rendering */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (typeof requestIdleCallback==='function'?requestIdleCallback:setTimeout)(function() {
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
              });
            `
          }}
        />
      </body>
    </html>
  );
}

