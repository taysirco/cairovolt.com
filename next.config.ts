import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    trailingSlash: false,
    compress: true,
    reactCompiler: true,
    serverExternalPackages: ['firebase-admin', '@google-cloud/secret-manager'],
    images: {
        // Custom loader bypasses broken /_next/image on Firebase App Hosting
        // (FAH adapter nextjs-14.0.21 doesn't support Next.js 16 image pipeline)
        loaderFile: './src/lib/image-loader.ts',
        formats: ['image/avif', 'image/webp'] as any,
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
        ] as any,
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
        ] as any,
    },
    experimental: {
        optimizeCss: true,  // Uses Critters to inline critical CSS — reduces FCP/LCP by ~300ms
        optimizePackageImports: ['next-intl', 'react-hook-form'],  // Tree-shake barrel exports
        staleTimes: {
            dynamic: 180,   // 3 min — RSC payloads stay cached longer in client router
            static: 600,    // 10 min — static pages (about, faq, blog) cached longer
        },
    },
    async headers() {
        return [
            {
                // .well-known files — accessible for agent discovery, C2PA, MCP, etc.
                // NOTE: Each route handler sets its own Content-Type (JSON, markdown, text)
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
                        value: 'public, max-age=31536000, immutable',
                    },
                    {
                        // Cloudflare edge: cache forever (immutable assets)
                        key: 'CDN-Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                    {
                        key: 'CDN-Cache-Control',
                        value: 'public, max-age=31536000, immutable',
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
                        // CSP — effective XSS mitigation (Best Practices)
                        // Removed 'unsafe-eval' — not needed in production Next.js
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.tiktok.com https://www.statcounter.com https://googleads.g.doubleclick.net https://www.google.com https://www.google.com.eg https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https: http:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https: wss:; frame-src 'self' https://www.google.com https://td.doubleclick.net; media-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self' https:;",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
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
            { source: '/anker/anker-soundcore-motion-plus', destination: '/anker/speakers/anker-soundcore-motion-plus', permanent: true },
            { source: '/en/anker/anker-powercore-26800', destination: '/en/anker/power-banks/anker-powercore-26800', permanent: true },
            { source: '/en/anker/anker-powercore-10000', destination: '/en/anker/power-banks/anker-powercore-10000', permanent: true },
            { source: '/en/anker/anker-powercore-20000', destination: '/en/anker/power-banks/anker-powercore-20000', permanent: true },
            { source: '/en/anker/anker-737-powerbank', destination: '/en/anker/power-banks/anker-737-powerbank', permanent: true },
            { source: '/en/anker/anker-soundcore-motion-plus', destination: '/en/anker/speakers/anker-soundcore-motion-plus', permanent: true },

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
            { source: '/anker/anker-soundcore-flare-2', destination: '/anker/speakers/anker-soundcore-flare-2', permanent: true },
            { source: '/en/anker/anker-soundcore-flare-2', destination: '/en/anker/speakers/anker-soundcore-flare-2', permanent: true },
            { source: '/anker/anker-521-powerhouse', destination: '/anker/power-banks/anker-521-powerhouse', permanent: true },
            { source: '/en/anker/anker-521-powerhouse', destination: '/en/anker/power-banks/anker-521-powerhouse', permanent: true },

            // === Joyroom earbuds: Missing category in URL ===
            { source: '/joyroom/joyroom-t03s-pro-earbuds', destination: '/joyroom/audio/joyroom-t03s-pro-earbuds', permanent: true },
            { source: '/en/joyroom/joyroom-t03s-pro-earbuds', destination: '/en/joyroom/audio/joyroom-t03s-pro-earbuds', permanent: true },

            // === Non-existent Anker products → Category ===
            { source: '/anker/anker-soundcore-life-p2i', destination: '/anker/audio', permanent: true },
            { source: '/en/anker/anker-soundcore-life-p2i', destination: '/en/anker/audio', permanent: true },

            // === Non-existent Joyroom car products → Appropriate category ===
            { source: '/joyroom/joyroom-60w-car-charger', destination: '/joyroom/car-accessories', permanent: true },
            { source: '/en/joyroom/joyroom-60w-car-charger', destination: '/en/joyroom/car-accessories', permanent: true },
            { source: '/joyroom/joyroom-car-phone-mount', destination: '/joyroom/car-holders', permanent: true },
            { source: '/en/joyroom/joyroom-car-phone-mount', destination: '/en/joyroom/car-holders', permanent: true },

            // === Category aliases (old names → current names) ===
            { source: '/joyroom/earbuds', destination: '/joyroom/audio', permanent: true },
            { source: '/en/joyroom/earbuds', destination: '/en/joyroom/audio', permanent: true },
            { source: '/joyroom/car-chargers', destination: '/joyroom/car-accessories', permanent: true },
            { source: '/en/joyroom/car-chargers', destination: '/en/joyroom/car-accessories', permanent: true },

            // === Non-existent product WITH category in URL → Category page ===
            { source: '/joyroom/cables/joyroom-usb-a-lightning-1.2m', destination: '/joyroom/cables', permanent: true },
            { source: '/en/joyroom/cables/joyroom-usb-a-lightning-1.2m', destination: '/en/joyroom/cables', permanent: true },

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
