// Homepage "Best Sellers" showcase products.
//
// Extracted out of the ProductShowcase client component so that the SERVER
// homepage (src/app/[locale]/page.tsx) can read these slugs, compute their
// aggregate ratings from productReviewsDb server-side, and pass only a tiny
// ratings map down as a prop. This keeps the full ~16KB productReviewsDb OUT of
// the client bundle (it used to ship to every homepage visitor just to render 8
// star ratings). This file is plain display data and is safe to ship to the
// client.

export interface ShowcaseProduct {
  slug: string;
  name: { en: string; ar: string };
  image: string;
  price: number;
  originalPrice?: number;
  brand: string;
  badge?: { en: string; ar: string };
  href: string;
  categorySlug: string;
}

// Diverse Anker products across all categories: power banks, audio, chargers, cables, speakers
export const showcaseProducts: ShowcaseProduct[] = [
  {
    slug: 'anker-zolo-a110e-20000',
    name: { en: 'Anker ZOLO 20,000mAh', ar: 'أنكر زولو 20,000' },
    image: '/products/anker/anker-zolo-a110e-20000/anker-zolo-a110e-20000mah-power-bank-builtin-cable-dual-output-cairovolt-thumb.webp',
    price: 1730,
    originalPrice: 1950,
    brand: 'Anker',
    badge: { en: 'Best Seller', ar: 'الأكثر مبيعاً' },
    href: '/anker/power-banks/anker-zolo-a110e-20000',
    categorySlug: 'power-banks',
  },
  {
    slug: 'anker-soundcore-r50i-nc',
    name: { en: 'Soundcore R50i NC ANC', ar: 'ساوندكور R50i NC' },
    image: '/products/anker/anker-soundcore-r50i-nc/anker-soundcore-r50i-nc-active-noise-cancelling-earbuds-cairovolt-thumb.webp',
    price: 1199,
    originalPrice: 1550,
    brand: 'Anker',
    badge: { en: 'New', ar: 'جديد' },
    href: '/soundcore/audio/anker-soundcore-r50i-nc',
    categorySlug: 'audio',
  },
  {
    slug: 'anker-nano-45w',
    name: { en: 'Anker Nano 45W Charger', ar: 'شاحن أنكر نانو 45 واط' },
    image: '/products/anker/anker-nano-45w/anker-nano-45w-package-box-contents-specifications-thumb.webp',
    price: 790,
    originalPrice: 1100,
    brand: 'Anker',
    badge: { en: 'Hot Deal', ar: 'عرض مميز' },
    href: '/anker/wall-chargers/anker-nano-45w',
    categorySlug: 'chargers',
  },
  {
    slug: 'anker-prime-a1695-25000',
    name: { en: 'Anker Prime 165W', ar: 'أنكر برايم 165 واط' },
    image: '/products/anker/anker-prime-a1695-25000/anker-prime-a1695-25000mah-165w-power-bank-premium-cairovolt-thumb.webp',
    price: 3950,
    originalPrice: 4200,
    brand: 'Anker',
    badge: { en: 'Flagship', ar: 'الفلاجشيب' },
    href: '/anker/power-banks/anker-prime-a1695-25000',
    categorySlug: 'power-banks',
  },
  {
    slug: 'anker-soundcore-k20i',
    name: { en: 'Soundcore K20i Earbuds', ar: 'ساوندكور K20i' },
    image: '/products/anker/anker-soundcore-k20i/anker-soundcore-k20i-wireless-earbuds-charging-case-cairovolt-thumb.webp',
    price: 750,
    originalPrice: 830,
    brand: 'Anker',
    href: '/soundcore/audio/anker-soundcore-k20i',
    categorySlug: 'audio',
  },
  {
    slug: 'anker-zolo-a110d-10000',
    name: { en: 'Anker ZOLO 10,000mAh', ar: 'أنكر زولو 10,000' },
    image: '/products/anker/anker-zolo-a110d-10000/anker-zolo-a110d-10000mah-power-bank-builtin-usb-c-cable-led-display-cairovolt-thumb.webp',
    price: 1270,
    brand: 'Anker',
    badge: { en: 'Pocket Size', ar: 'حجم الجيب' },
    href: '/anker/power-banks/anker-zolo-a110d-10000',
    categorySlug: 'power-banks',
  },
  {
    slug: 'anker-soundcore-flare-2',
    name: { en: 'Soundcore Flare 2 Speaker', ar: 'سماعة فلير 2' },
    image: '/products/anker/anker-soundcore-flare-2/anker-soundcore-flare-2-ipx7-waterproof-pool-outdoor-thumb.webp',
    price: 2999,
    originalPrice: 3400,
    brand: 'Anker',
    href: '/soundcore/speakers/anker-soundcore-flare-2',
    categorySlug: 'speakers',
  },
  {
    slug: 'anker-a8050-usb-c-cable',
    name: { en: 'Anker USB-C Cable 100W', ar: 'كابل أنكر USB-C' },
    image: '/products/anker/anker-a8050-usb-c-cable/anker-a8050-braided-nylon-cable-texture-close-up-durability-thumb.webp',
    price: 240,
    originalPrice: 270,
    brand: 'Anker',
    badge: { en: 'Essential', ar: 'أساسي' },
    href: '/anker/cables/anker-a8050-usb-c-cable',
    categorySlug: 'cables',
  },
];

/** Minimal aggregate-rating shape passed from the server homepage to the client showcase. */
export type ShowcaseRating = { ratingValue: string; reviewCount: string };
export type ShowcaseRatings = Record<string, ShowcaseRating>;
