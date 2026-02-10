import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    compress: true,
    reactCompiler: true,
    cssChunking: 'loose' as const,
    images: {
        formats: ['image/avif', 'image/webp'] as any,
        minimumCacheTTL: 31536000,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ] as any,
    },
    async headers() {
        return [
            {
                source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)',
                headers: [
                    {
                        key: 'Cache-Control',
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
            { source: '/Anker/anker-powercore-26800', destination: '/Anker/power-banks/anker-powercore-26800', permanent: true },
            { source: '/Anker/anker-powercore-10000', destination: '/Anker/power-banks/anker-powercore-10000', permanent: true },
            { source: '/Anker/anker-powercore-20000', destination: '/Anker/power-banks/anker-powercore-20000', permanent: true },
            { source: '/Anker/anker-737-powerbank', destination: '/Anker/power-banks/anker-737-powerbank', permanent: true },
            { source: '/Anker/anker-soundcore-motion-plus', destination: '/Anker/speakers/anker-soundcore-motion-plus', permanent: true },
            { source: '/en/Anker/anker-powercore-26800', destination: '/en/Anker/power-banks/anker-powercore-26800', permanent: true },
            { source: '/en/Anker/anker-powercore-10000', destination: '/en/Anker/power-banks/anker-powercore-10000', permanent: true },
            { source: '/en/Anker/anker-powercore-20000', destination: '/en/Anker/power-banks/anker-powercore-20000', permanent: true },
            { source: '/en/Anker/anker-737-powerbank', destination: '/en/Anker/power-banks/anker-737-powerbank', permanent: true },
            { source: '/en/Anker/anker-soundcore-motion-plus', destination: '/en/Anker/speakers/anker-soundcore-motion-plus', permanent: true },

            // === Joyroom products: Missing category in URL ===
            { source: '/Joyroom/joyroom-power-bank-10000', destination: '/Joyroom/power-banks/joyroom-power-bank-10000', permanent: true },
            { source: '/Joyroom/joyroom-power-bank-20000', destination: '/Joyroom/power-banks/joyroom-power-bank-20000', permanent: true },
            { source: '/Joyroom/joyroom-jr-t03-wireless-earbuds', destination: '/Joyroom/audio/joyroom-jr-t03-wireless-earbuds', permanent: true },
            { source: '/Joyroom/joyroom-20w-usb-c-charger', destination: '/Joyroom/wall-chargers/joyroom-20w-usb-c-charger', permanent: true },
            { source: '/Joyroom/joyroom-usb-c-lightning-cable', destination: '/Joyroom/cables/joyroom-usb-c-lightning-cable', permanent: true },
            { source: '/en/Joyroom/joyroom-power-bank-10000', destination: '/en/Joyroom/power-banks/joyroom-power-bank-10000', permanent: true },
            { source: '/en/Joyroom/joyroom-power-bank-20000', destination: '/en/Joyroom/power-banks/joyroom-power-bank-20000', permanent: true },
            { source: '/en/Joyroom/joyroom-20w-usb-c-charger', destination: '/en/Joyroom/wall-chargers/joyroom-20w-usb-c-charger', permanent: true },
            { source: '/en/Joyroom/joyroom-usb-c-lightning-cable', destination: '/en/Joyroom/cables/joyroom-usb-c-lightning-cable', permanent: true },

            // === Anker products: Existing product missing category (Feb 2026) ===
            { source: '/Anker/anker-powerport-25w', destination: '/Anker/wall-chargers/anker-powerport-25w', permanent: true },
            { source: '/en/Anker/anker-powerport-25w', destination: '/en/Anker/wall-chargers/anker-powerport-25w', permanent: true },

            // === Anker products: Existing in Firebase, missing category in URL ===
            { source: '/Anker/anker-usb-c-lightning-sureistrong', destination: '/Anker/cables/anker-usb-c-lightning-sureistrong', permanent: true },
            { source: '/en/Anker/anker-usb-c-lightning-sureistrong', destination: '/en/Anker/cables/anker-usb-c-lightning-sureistrong', permanent: true },
            { source: '/Anker/anker-622-maggo', destination: '/Anker/power-banks/anker-622-maggo', permanent: true },
            { source: '/en/Anker/anker-622-maggo', destination: '/en/Anker/power-banks/anker-622-maggo', permanent: true },
            { source: '/Anker/anker-soundcore-flare-2', destination: '/Anker/speakers/anker-soundcore-flare-2', permanent: true },
            { source: '/en/Anker/anker-soundcore-flare-2', destination: '/en/Anker/speakers/anker-soundcore-flare-2', permanent: true },
            { source: '/Anker/anker-521-powerhouse', destination: '/Anker/power-banks/anker-521-powerhouse', permanent: true },
            { source: '/en/Anker/anker-521-powerhouse', destination: '/en/Anker/power-banks/anker-521-powerhouse', permanent: true },

            // === Non-existent Anker products → Category ===
            { source: '/Anker/anker-soundcore-life-p2i', destination: '/Anker/audio', permanent: true },
            { source: '/en/Anker/anker-soundcore-life-p2i', destination: '/en/Anker/audio', permanent: true },

            // === Non-existent Joyroom car products → Appropriate category ===
            { source: '/Joyroom/joyroom-60w-car-charger', destination: '/Joyroom/car-accessories', permanent: true },
            { source: '/en/Joyroom/joyroom-60w-car-charger', destination: '/en/Joyroom/car-accessories', permanent: true },
            { source: '/Joyroom/joyroom-car-phone-mount', destination: '/Joyroom/car-holders', permanent: true },
            { source: '/en/Joyroom/joyroom-car-phone-mount', destination: '/en/Joyroom/car-holders', permanent: true },

            // === Category aliases (old names → current names) ===
            { source: '/Joyroom/earbuds', destination: '/Joyroom/audio', permanent: true },
            { source: '/en/Joyroom/earbuds', destination: '/en/Joyroom/audio', permanent: true },
            { source: '/Joyroom/car-chargers', destination: '/Joyroom/car-accessories', permanent: true },
            { source: '/en/Joyroom/car-chargers', destination: '/en/Joyroom/car-accessories', permanent: true },

            // === Non-existent product WITH category in URL → Category page ===
            { source: '/Joyroom/cables/joyroom-usb-a-lightning-1.2m', destination: '/Joyroom/cables', permanent: true },
            { source: '/en/Joyroom/cables/joyroom-usb-a-lightning-1.2m', destination: '/en/Joyroom/cables', permanent: true },

            // === Non-existent Joyroom power banks → Power Banks category ===
            { source: '/Joyroom/joyroom-magnetic-power-bank-10000', destination: '/Joyroom/power-banks', permanent: true },
            { source: '/en/Joyroom/joyroom-magnetic-power-bank-10000', destination: '/en/Joyroom/power-banks', permanent: true },

            // === Non-existent Joyroom smartwatch → Smart Watches category ===
            { source: '/Joyroom/joyroom-ft3-smartwatch', destination: '/Joyroom/smart-watches', permanent: true },
            { source: '/en/Joyroom/joyroom-ft3-smartwatch', destination: '/en/Joyroom/smart-watches', permanent: true },

            // === Joyroom products: Existing in Firebase, missing category in URL ===
            { source: '/Joyroom/joyroom-3-in-1-wireless-charging-station', destination: '/Joyroom/wall-chargers/joyroom-3-in-1-wireless-charging-station', permanent: true },
            { source: '/en/Joyroom/joyroom-3-in-1-wireless-charging-station', destination: '/en/Joyroom/wall-chargers/joyroom-3-in-1-wireless-charging-station', permanent: true },

            // === Joyroom cables: Existing in Firebase, missing category in URL ===
            { source: '/Joyroom/joyroom-usb-a-type-c-cable', destination: '/Joyroom/cables/joyroom-usb-a-type-c-cable', permanent: true },
            { source: '/Joyroom/joyroom-type-c-to-type-c-cable', destination: '/Joyroom/cables/joyroom-type-c-to-type-c-cable', permanent: true },
            { source: '/Joyroom/joyroom-30w-pd-cable', destination: '/Joyroom/cables/joyroom-30w-pd-cable', permanent: true },
            { source: '/Joyroom/joyroom-type-c-lightning-braided', destination: '/Joyroom/cables/joyroom-type-c-lightning-braided', permanent: true },
            { source: '/Joyroom/joyroom-type-c-lightning-36mos', destination: '/Joyroom/cables/joyroom-type-c-lightning-36mos', permanent: true },
            { source: '/Joyroom/joyroom-3-in-1-data-cable', destination: '/Joyroom/cables/joyroom-3-in-1-data-cable', permanent: true },
            { source: '/Joyroom/joyroom-usb-c-cable-60w', destination: '/Joyroom/cables/joyroom-usb-c-cable-60w', permanent: true },
            { source: '/Joyroom/joyroom-usb-a-micro-cable', destination: '/Joyroom/cables/joyroom-usb-a-micro-cable', permanent: true },
            { source: '/en/Joyroom/joyroom-usb-a-type-c-cable', destination: '/en/Joyroom/cables/joyroom-usb-a-type-c-cable', permanent: true },
            { source: '/en/Joyroom/joyroom-type-c-to-type-c-cable', destination: '/en/Joyroom/cables/joyroom-type-c-to-type-c-cable', permanent: true },
            { source: '/en/Joyroom/joyroom-30w-pd-cable', destination: '/en/Joyroom/cables/joyroom-30w-pd-cable', permanent: true },
            { source: '/en/Joyroom/joyroom-type-c-lightning-braided', destination: '/en/Joyroom/cables/joyroom-type-c-lightning-braided', permanent: true },
            { source: '/en/Joyroom/joyroom-type-c-lightning-36mos', destination: '/en/Joyroom/cables/joyroom-type-c-lightning-36mos', permanent: true },
            { source: '/en/Joyroom/joyroom-3-in-1-data-cable', destination: '/en/Joyroom/cables/joyroom-3-in-1-data-cable', permanent: true },
            { source: '/en/Joyroom/joyroom-usb-c-cable-60w', destination: '/en/Joyroom/cables/joyroom-usb-c-cable-60w', permanent: true },
            { source: '/en/Joyroom/joyroom-usb-a-micro-cable', destination: '/en/Joyroom/cables/joyroom-usb-a-micro-cable', permanent: true },

            // === Non-existent Joyroom cables → Cables category ===
            { source: '/Joyroom/joyroom-usb-a-lightning-cable', destination: '/Joyroom/cables', permanent: true },
            { source: '/Joyroom/joyroom-type-c-lightning-24mos', destination: '/Joyroom/cables', permanent: true },
            { source: '/Joyroom/joyroom-usb-a-type-c-1.2m', destination: '/Joyroom/cables', permanent: true },
            { source: '/Joyroom/joyroom-usb-a-lightning-1.2m', destination: '/Joyroom/cables', permanent: true },
            { source: '/en/Joyroom/joyroom-type-c-lightning-24mos', destination: '/en/Joyroom/cables', permanent: true },
            { source: '/en/Joyroom/joyroom-usb-a-type-c-1.2m', destination: '/en/Joyroom/cables', permanent: true },
            { source: '/en/Joyroom/joyroom-usb-a-lightning-1.2m', destination: '/en/Joyroom/cables', permanent: true },

            // === Joyroom chargers: Existing in Firebase, missing category in URL ===
            { source: '/Joyroom/joyroom-30w-fast-charger', destination: '/Joyroom/wall-chargers/joyroom-30w-fast-charger', permanent: true },
            { source: '/en/Joyroom/joyroom-30w-fast-charger', destination: '/en/Joyroom/wall-chargers/joyroom-30w-fast-charger', permanent: true },

            // === Non-existent Joyroom chargers → Wall Chargers category ===
            { source: '/Joyroom/joyroom-25w-fast-charger', destination: '/Joyroom/wall-chargers', permanent: true },
        ];
    },
};

export default withNextIntl(nextConfig);
