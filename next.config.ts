import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    poweredByHeader: false,
    trailingSlash: false,
    compress: true,
    reactCompiler: true,
    // Large bilingual catalog + blog sitemap can exceed the default 60s on cold Firebase.
    staticPageGenerationTimeout: 180,
    outputFileTracingIncludes: {
        '/api/admin/wholesale': ['./src/server/wholesale-dashboard.html'],
    },
    // Remove development logging from production client bundles.
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production'
            ? { exclude: ['error', 'warn'] }
            : false,
    },
    serverExternalPackages: ['firebase-admin', '@google-cloud/secret-manager'],
    images: {
        // Use the local optimizer route supported by the App Hosting runtime.
        loaderFile: './src/lib/image-loader.ts',
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 31536000,
        // Optimized breakpoints — match actual device widths to avoid oversized images
        deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
        // Thumbnail sizes for gallery thumbnails and listing cards
        imageSizes: [64, 80, 96, 128, 160, 256, 320, 384],
        // Next.js 16 requires explicit whitelist when local image URLs carry a
        // query string (we use ?v=N to cache-bust replaced webp covers).
        // Once `localPatterns` is set it also gates every local path, so list
        // the roots actually used: the logo at /public root and /images/**.
        // Omitting `search` allows any query string on these paths.
        localPatterns: [
            { pathname: '/**' },
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },
    experimental: {
        // inlineCss is deliberately OFF.
        //
        // It saves one request, but this project's Tailwind bundle is ~250 KB,
        // and Next ships an inlined bundle TWICE per document: once in the
        // <style> tag and again as a string inside the RSC flight payload (so
        // the client router can re-apply it on navigation). Measured on the
        // live site: 511 KB of the 891 KB product-page HTML — 57% — was that
        // one stylesheet, duplicated, on every single page, uncacheable.
        //
        // As an external file it is content-hashed and served
        // `max-age=31536000, immutable` (see the /_next/static rule below), so
        // it is fetched once per visitor instead of re-parsed on every page.
        // Re-enable only if the CSS bundle ever shrinks to true critical-CSS size.
        inlineCss: false,
        optimizePackageImports: ['next-intl', 'react-hook-form'],  // Tree-shake barrel exports
        staleTimes: {
            dynamic: 180,   // 3 min — RSC payloads stay cached longer in client router
            static: 600,    // 10 min — static pages (about, faq, blog) cached longer
        },
    },
    async headers() {
        return [
            {
                // Public discovery documents set their own content type.
                source: '/.well-known/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, s-maxage=86400',
                    },
                    {
                        // Cloudflare edge: cache 7 days (longer than browser)
                        key: 'CDN-Cache-Control',
                        value: 'public, max-age=604800',
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, HEAD, OPTIONS',
                    },
                    {
                        // RFC 9727 — Link to API Catalog for discoverability
                        key: 'Link',
                        value: '<https://cairovolt.com/.well-known/api-catalog>; rel="service-desc"; type="application/linkset+json"',
                    },
                ],
            },
            {
                source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=604800',
                    },
                    {
                        // Public asset names are not universally content-hashed.
                        // Keep edge caching useful without pinning an HTML
                        // fallback under an image-looking URL for a full year.
                        key: 'CDN-Cache-Control',
                        value: 'public, max-age=604800, stale-while-revalidate=86400',
                    },
                ],
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    // In prod, `/_next/static/*` names are content-hashed → safe
                    // to mark immutable and cache for a year. In dev (Turbopack)
                    // chunk names are STABLE while contents change, so immutable
                    // makes browsers serve stale CSS/JS forever — e.g., pre-Cairo
                    // fonts persist even after edits + hard reloads.
                    {
                        key: 'Cache-Control',
                        value: process.env.NODE_ENV === 'production'
                            ? 'public, max-age=31536000, immutable'
                            : 'no-store, must-revalidate',
                    },
                    {
                        key: 'CDN-Cache-Control',
                        value: process.env.NODE_ENV === 'production'
                            ? 'public, max-age=31536000, immutable'
                            : 'no-store, must-revalidate',
                    },
                ],
            },
            {
                source: '/wholesale-dashboard.html',
                headers: [
                    {
                        key: 'X-Robots-Tag',
                        value: 'noindex, nofollow, noarchive',
                    },
                ],
            },
            {
                // Cache static informational pages (about, faq, contact, policies)
                source: '/:locale(ar|en)/(about|faq|contact|shipping|return-policy|warranty|terms|privacy)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
                    },
                    {
                        // Cloudflare edge: cache 7 days, serve stale for 30 days while revalidating
                        key: 'CDN-Cache-Control',
                        value: 'public, max-age=604800, stale-while-revalidate=2592000',
                    },
                ],
            },
            {
                // Product + category pages — Cloudflare edge caching with SWR
                source: '/:locale(ar|en)/:brand/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
                    },
                    {
                        // Cloudflare edge: cache 2 hours, serve stale for 24h while revalidating
                        key: 'CDN-Cache-Control',
                        value: 'public, max-age=7200, stale-while-revalidate=86400',
                    },
                ],
            },
            {
                // Homepage — Cloudflare edge caching
                source: '/:locale(ar|en)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
                    },
                    {
                        key: 'CDN-Cache-Control',
                        value: 'public, max-age=7200, stale-while-revalidate=86400',
                    },
                ],
            },
            {
                // Security headers for ALL pages
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(self)',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        // COOP — proper origin isolation (Best Practices)
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin-allow-popups',
                    },
                    {
                        // Content Security Policy for application and analytics resources.
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.tiktok.com https://www.statcounter.com https://googleads.g.doubleclick.net https://www.google.com https://www.google.com.eg https://static.cloudflareinsights.com https://accounts.google.com https://apis.google.com https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com https://connect.facebook.net; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https: wss:; frame-src 'self' https://www.google.com https://td.doubleclick.net https://accounts.google.com https://www.facebook.com https://staticxx.facebook.com https://connect.facebook.net; media-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self';",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            // Staff-tool alias → tracked admin login route (served by src/app/admin/wholesale/page.tsx).
            { source: '/admin/catalog', destination: '/admin/wholesale', permanent: false },

            // === Generic category: /products/slug → /slug (clean URLs) ===
            { source: '/products/power-banks', destination: '/power-banks', permanent: true },
            { source: '/en/products/power-banks', destination: '/en/power-banks', permanent: true },
            { source: '/products/chargers', destination: '/chargers', permanent: true },
            { source: '/en/products/chargers', destination: '/en/chargers', permanent: true },
            { source: '/products/earbuds', destination: '/earbuds', permanent: true },
            { source: '/en/products/earbuds', destination: '/en/earbuds', permanent: true },
            { source: '/products/cables', destination: '/cables', permanent: true },
            { source: '/en/products/cables', destination: '/en/cables', permanent: true },

            // NOTE: Generic /ar/ and case-insensitive redirects removed - they conflict with next-intl middleware
            // The specific redirects below only handle legacy URLs from Google Search Console

            // === Anker products: Missing category in URL ===
            { source: '/anker/anker-powercore-26800', destination: '/anker/power-banks/anker-powercore-26800', permanent: true },
            { source: '/anker/anker-powercore-10000', destination: '/anker/power-banks/anker-powercore-10000', permanent: true },
            { source: '/anker/anker-powercore-20000', destination: '/anker/power-banks/anker-powercore-20000', permanent: true },
            { source: '/anker/anker-737-powerbank', destination: '/anker/power-banks/anker-737-powerbank', permanent: true },
            { source: '/anker/anker-soundcore-motion-plus', destination: '/soundcore/speakers/anker-soundcore-motion-plus', permanent: true },
            { source: '/en/anker/anker-powercore-26800', destination: '/en/anker/power-banks/anker-powercore-26800', permanent: true },
            { source: '/en/anker/anker-powercore-10000', destination: '/en/anker/power-banks/anker-powercore-10000', permanent: true },
            { source: '/en/anker/anker-powercore-20000', destination: '/en/anker/power-banks/anker-powercore-20000', permanent: true },
            { source: '/en/anker/anker-737-powerbank', destination: '/en/anker/power-banks/anker-737-powerbank', permanent: true },
            { source: '/en/anker/anker-soundcore-motion-plus', destination: '/en/soundcore/speakers/anker-soundcore-motion-plus', permanent: true },

            // === Joyroom products: Missing category in URL ===
            { source: '/joyroom/joyroom-power-bank-10000', destination: '/joyroom/power-banks/joyroom-power-bank-10000', permanent: true },
            { source: '/joyroom/joyroom-power-bank-20000', destination: '/joyroom/power-banks/joyroom-power-bank-20000', permanent: true },
            { source: '/joyroom/joyroom-jr-t03-wireless-earbuds', destination: '/joyroom/audio/joyroom-jr-t03-wireless-earbuds', permanent: true },
            { source: '/joyroom/joyroom-20w-usb-c-charger', destination: '/joyroom/wall-chargers/joyroom-20w-usb-c-charger', permanent: true },
            { source: '/joyroom/joyroom-usb-c-lightning-cable', destination: '/joyroom/cables/joyroom-usb-c-lightning-cable', permanent: true },
            { source: '/en/joyroom/joyroom-power-bank-10000', destination: '/en/joyroom/power-banks/joyroom-power-bank-10000', permanent: true },
            { source: '/en/joyroom/joyroom-power-bank-20000', destination: '/en/joyroom/power-banks/joyroom-power-bank-20000', permanent: true },
            { source: '/en/joyroom/joyroom-20w-usb-c-charger', destination: '/en/joyroom/wall-chargers/joyroom-20w-usb-c-charger', permanent: true },
            { source: '/en/joyroom/joyroom-usb-c-lightning-cable', destination: '/en/joyroom/cables/joyroom-usb-c-lightning-cable', permanent: true },

            // === Anker products: Existing product missing category (Feb 2026) ===
            { source: '/anker/anker-powerport-25w', destination: '/anker/wall-chargers/anker-powerport-25w', permanent: true },
            { source: '/en/anker/anker-powerport-25w', destination: '/en/anker/wall-chargers/anker-powerport-25w', permanent: true },

            // === Anker products: Existing in Firebase, missing category in URL ===
            { source: '/anker/anker-usb-c-lightning-sureistrong', destination: '/anker/cables/anker-usb-c-lightning-sureistrong', permanent: true },
            { source: '/en/anker/anker-usb-c-lightning-sureistrong', destination: '/en/anker/cables/anker-usb-c-lightning-sureistrong', permanent: true },
            { source: '/anker/anker-622-maggo', destination: '/anker/power-banks/anker-622-maggo', permanent: true },
            { source: '/en/anker/anker-622-maggo', destination: '/en/anker/power-banks/anker-622-maggo', permanent: true },
            { source: '/anker/anker-soundcore-flare-2', destination: '/soundcore/speakers/anker-soundcore-flare-2', permanent: true },
            { source: '/en/anker/anker-soundcore-flare-2', destination: '/en/soundcore/speakers/anker-soundcore-flare-2', permanent: true },
            { source: '/anker/anker-521-powerhouse', destination: '/anker/power-banks/anker-521-powerhouse', permanent: true },
            { source: '/en/anker/anker-521-powerhouse', destination: '/en/anker/power-banks/anker-521-powerhouse', permanent: true },

            // === Joyroom earbuds: Missing category in URL ===
            { source: '/joyroom/joyroom-t03s-pro-earbuds', destination: '/joyroom/audio/joyroom-t03s-pro-earbuds', permanent: true },
            { source: '/en/joyroom/joyroom-t03s-pro-earbuds', destination: '/en/joyroom/audio/joyroom-t03s-pro-earbuds', permanent: true },

            // === Non-existent Anker products → Category ===
            { source: '/anker/anker-soundcore-life-p2i', destination: '/soundcore/audio/anker-soundcore-life-p2i', permanent: true },
            { source: '/en/anker/anker-soundcore-life-p2i', destination: '/en/soundcore/audio/anker-soundcore-life-p2i', permanent: true },

            // === Non-existent Joyroom car products → Appropriate category ===
            { source: '/joyroom/joyroom-60w-car-charger', destination: '/joyroom/car-chargers/joyroom-60w-car-charger', permanent: true },
            { source: '/en/joyroom/joyroom-60w-car-charger', destination: '/en/joyroom/car-chargers/joyroom-60w-car-charger', permanent: true },
            { source: '/joyroom/joyroom-car-phone-mount', destination: '/joyroom/car-holders', permanent: true },
            { source: '/en/joyroom/joyroom-car-phone-mount', destination: '/en/joyroom/car-holders', permanent: true },

            // === Category aliases (old names → current names) ===
            { source: '/joyroom/earbuds', destination: '/joyroom/audio', permanent: true },
            { source: '/en/joyroom/earbuds', destination: '/en/joyroom/audio', permanent: true },

            // === Non-existent product WITH category in URL → Category page ===
            { source: '/joyroom/cables/joyroom-usb-a-lightning-1.2m', destination: '/joyroom/cables', permanent: true },
            { source: '/en/joyroom/cables/joyroom-usb-a-lightning-1.2m', destination: '/en/joyroom/cables', permanent: true },
            { source: '/joyroom/cables/joyroom-usb-a-type-c-1.2m', destination: '/joyroom/cables', permanent: true },
            { source: '/en/joyroom/cables/joyroom-usb-a-type-c-1.2m', destination: '/en/joyroom/cables', permanent: true },

            // === Legacy-shaped product URLs → the product's own PDP ===
            //
            // Nano 45W 1C-PD and R50i NC were previously 301'd onto Nano 45W and
            // P30i as "duplicate identities". They are not duplicates: each holds
            // its own SKU (AC09 vs AC01, SH21 on a record with barcode
            // 194644197421) and — decisively — its own independently tracked
            // stock, 222 and 812 units. One catalogue record cannot carry two
            // stock counts. Both are active products and answer at their own
            // URLs again; only the legacy URL shapes still redirect, and now to
            // the product itself rather than to a different one.
            { source: '/anker/anker-nano-45w-1c-pd', destination: '/anker/wall-chargers/anker-nano-45w-1c-pd', permanent: true },
            { source: '/en/anker/anker-nano-45w-1c-pd', destination: '/en/anker/wall-chargers/anker-nano-45w-1c-pd', permanent: true },
            { source: '/anker/audio/anker-soundcore-r50i-nc', destination: '/soundcore/audio/anker-soundcore-r50i-nc', permanent: true },
            { source: '/en/anker/audio/anker-soundcore-r50i-nc', destination: '/en/soundcore/audio/anker-soundcore-r50i-nc', permanent: true },

            // === Phantom category segments Google actually ranks → the real category ===
            //
            // The 2026-08-02 GSC export shows these URL shapes drawing impressions
            // at page-one positions while returning 404 — e.g.
            // /soundcore/earbuds/anker-soundcore-r50i-nc at position ~5-6 with
            // ~1,000 impressions across locales. The category segment never
            // existed ("earbuds" vs the real "audio", "chargers" vs
            // "wall-chargers"), so every click lands on an error page. All six
            // source patterns 404'd in production before these rules, so they
            // cannot shadow any live route; they only convert dead ends into the
            // product the searcher wanted.
            { source: '/soundcore/earbuds/:slug', destination: '/soundcore/audio/:slug', permanent: true },
            { source: '/en/soundcore/earbuds/:slug', destination: '/en/soundcore/audio/:slug', permanent: true },
            { source: '/soundcore/headphones/:slug', destination: '/soundcore/audio/:slug', permanent: true },
            { source: '/en/soundcore/headphones/:slug', destination: '/en/soundcore/audio/:slug', permanent: true },
            { source: '/anker/chargers/:slug', destination: '/anker/wall-chargers/:slug', permanent: true },
            { source: '/en/anker/chargers/:slug', destination: '/en/anker/wall-chargers/:slug', permanent: true },
            { source: '/anker/power-stations/:slug', destination: '/anker/power-banks/:slug', permanent: true },
            { source: '/en/anker/power-stations/:slug', destination: '/en/anker/power-banks/:slug', permanent: true },
            { source: '/joyroom/chargers/:slug', destination: '/joyroom/wall-chargers/:slug', permanent: true },
            { source: '/en/joyroom/chargers/:slug', destination: '/en/joyroom/wall-chargers/:slug', permanent: true },
            { source: '/joyroom/wireless-chargers/:slug', destination: '/joyroom/wall-chargers/:slug', permanent: true },
            { source: '/en/joyroom/wireless-chargers/:slug', destination: '/en/joyroom/wall-chargers/:slug', permanent: true },

            // === Non-existent Joyroom power banks → Power Banks category ===
            { source: '/joyroom/joyroom-magnetic-power-bank-10000', destination: '/joyroom/power-banks', permanent: true },
            { source: '/en/joyroom/joyroom-magnetic-power-bank-10000', destination: '/en/joyroom/power-banks', permanent: true },

            // === Non-existent Joyroom smartwatch → Smart Watches category ===
            { source: '/joyroom/joyroom-ft3-smartwatch', destination: '/joyroom/smart-watches', permanent: true },
            { source: '/en/joyroom/joyroom-ft3-smartwatch', destination: '/en/joyroom/smart-watches', permanent: true },

            // === Joyroom products: Existing in Firebase, missing category in URL ===
            { source: '/joyroom/joyroom-3-in-1-wireless-charging-station', destination: '/joyroom/wall-chargers/joyroom-3-in-1-wireless-charging-station', permanent: true },
            { source: '/en/joyroom/joyroom-3-in-1-wireless-charging-station', destination: '/en/joyroom/wall-chargers/joyroom-3-in-1-wireless-charging-station', permanent: true },

            // === Joyroom cables: Existing in Firebase, missing category in URL ===
            { source: '/joyroom/joyroom-usb-a-type-c-cable', destination: '/joyroom/cables/joyroom-usb-a-type-c-cable', permanent: true },
            { source: '/joyroom/joyroom-type-c-to-type-c-cable', destination: '/joyroom/cables/joyroom-type-c-to-type-c-cable', permanent: true },
            { source: '/joyroom/joyroom-30w-pd-cable', destination: '/joyroom/cables/joyroom-30w-pd-cable', permanent: true },
            { source: '/joyroom/joyroom-type-c-lightning-braided', destination: '/joyroom/cables/joyroom-type-c-lightning-braided', permanent: true },
            { source: '/joyroom/joyroom-type-c-lightning-36mos', destination: '/joyroom/cables/joyroom-type-c-lightning-36mos', permanent: true },
            { source: '/joyroom/joyroom-3-in-1-data-cable', destination: '/joyroom/cables/joyroom-3-in-1-data-cable', permanent: true },
            { source: '/joyroom/joyroom-usb-c-cable-60w', destination: '/joyroom/cables/joyroom-usb-c-cable-60w', permanent: true },
            { source: '/joyroom/joyroom-usb-a-micro-cable', destination: '/joyroom/cables/joyroom-usb-a-micro-cable', permanent: true },
            { source: '/en/joyroom/joyroom-usb-a-type-c-cable', destination: '/en/joyroom/cables/joyroom-usb-a-type-c-cable', permanent: true },
            { source: '/en/joyroom/joyroom-type-c-to-type-c-cable', destination: '/en/joyroom/cables/joyroom-type-c-to-type-c-cable', permanent: true },
            { source: '/en/joyroom/joyroom-30w-pd-cable', destination: '/en/joyroom/cables/joyroom-30w-pd-cable', permanent: true },
            { source: '/en/joyroom/joyroom-type-c-lightning-braided', destination: '/en/joyroom/cables/joyroom-type-c-lightning-braided', permanent: true },
            { source: '/en/joyroom/joyroom-type-c-lightning-36mos', destination: '/en/joyroom/cables/joyroom-type-c-lightning-36mos', permanent: true },
            { source: '/en/joyroom/joyroom-3-in-1-data-cable', destination: '/en/joyroom/cables/joyroom-3-in-1-data-cable', permanent: true },
            { source: '/en/joyroom/joyroom-usb-c-cable-60w', destination: '/en/joyroom/cables/joyroom-usb-c-cable-60w', permanent: true },
            { source: '/en/joyroom/joyroom-usb-a-micro-cable', destination: '/en/joyroom/cables/joyroom-usb-a-micro-cable', permanent: true },

            // === Non-existent Joyroom cables → Cables category ===
            { source: '/joyroom/joyroom-usb-a-lightning-cable', destination: '/joyroom/cables', permanent: true },
            { source: '/en/joyroom/joyroom-usb-a-lightning-cable', destination: '/en/joyroom/cables', permanent: true },
            { source: '/joyroom/joyroom-type-c-lightning-24mos', destination: '/joyroom/cables', permanent: true },
            { source: '/joyroom/joyroom-usb-a-type-c-1.2m', destination: '/joyroom/cables', permanent: true },
            { source: '/joyroom/joyroom-usb-a-lightning-1.2m', destination: '/joyroom/cables', permanent: true },
            { source: '/en/joyroom/joyroom-type-c-lightning-24mos', destination: '/en/joyroom/cables', permanent: true },
            { source: '/en/joyroom/joyroom-usb-a-type-c-1.2m', destination: '/en/joyroom/cables', permanent: true },
            { source: '/en/joyroom/joyroom-usb-a-lightning-1.2m', destination: '/en/joyroom/cables', permanent: true },

            // === Joyroom chargers: Existing in Firebase, missing category in URL ===
            { source: '/joyroom/joyroom-30w-fast-charger', destination: '/joyroom/wall-chargers/joyroom-30w-fast-charger', permanent: true },
            { source: '/en/joyroom/joyroom-30w-fast-charger', destination: '/en/joyroom/wall-chargers/joyroom-30w-fast-charger', permanent: true },

            // === Non-existent Joyroom chargers → Wall Chargers category ===
            { source: '/joyroom/joyroom-25w-fast-charger', destination: '/joyroom/wall-chargers', permanent: true },
        ];
    },
};

export default withNextIntl(nextConfig);
