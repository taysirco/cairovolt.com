// Homepage curated showcase products.
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

// Curated popular picks across the three families sold by CairoVolt.
// Prices and brand labels mirror src/data/products/* (the catalog source of truth).
export const showcaseProducts: ShowcaseProduct[] = [
  {
    slug: 'anker-zolo-a110e-20000',
    name: { en: 'Anker ZOLO 20,000mAh', ar: 'أنكر زولو 20,000' },
    image: '/products/anker/anker-zolo-a110e-20000/anker-zolo-a110e-20000mah-power-bank-builtin-cable-dual-output-cairovolt-thumb.webp',
    price: 1730,
    originalPrice: 1950,
    brand: 'Anker',
    badge: { en: 'Featured', ar: 'اختيار مميز' },
    href: '/anker/power-banks/anker-zolo-a110e-20000',
    categorySlug: 'power-banks',
  },
  {
    slug: 'anker-soundcore-r50i-nc',
    name: { en: 'Soundcore R50i NC ANC', ar: 'ساوندكور R50i NC' },
    image: '/products/anker/anker-soundcore-r50i-nc/anker-soundcore-r50i-nc-active-noise-cancelling-earbuds-cairovolt-thumb.webp',
    price: 1199,
    originalPrice: 1550,
    brand: 'Soundcore',
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
    categorySlug: 'wall-chargers',
  },
  {
    slug: 'anker-prime-a1695-25000',
    name: { en: 'Anker Prime 25,000mAh 165W', ar: 'أنكر برايم 25,000 — 165 واط' },
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
    brand: 'Soundcore',
    href: '/soundcore/audio/anker-soundcore-k20i',
    categorySlug: 'audio',
  },
  {
    slug: 'joyroom-t03s-pro-earbuds',
    name: { en: 'Joyroom T03S Pro ANC Earbuds', ar: 'جوي روم T03S Pro ANC' },
    image: '/products/joyroom/joyroom-t03s-pro-earbuds/joyroom-joyroom-t03s-pro-earbuds-egypt-cairo-9-thumb.webp',
    price: 664,
    originalPrice: 799,
    brand: 'Joyroom',
    badge: { en: 'Smart Value', ar: 'قيمة ممتازة' },
    href: '/joyroom/audio/joyroom-t03s-pro-earbuds',
    categorySlug: 'audio',
  },
  {
    slug: 'anker-soundcore-flare-2',
    name: { en: 'Soundcore Flare 2 Speaker', ar: 'سبيكر ساوندكور Flare 2' },
    image: '/products/anker/anker-soundcore-flare-2/anker-soundcore-flare-2-ipx7-waterproof-pool-outdoor-thumb.webp',
    price: 2999,
    originalPrice: 3400,
    brand: 'Soundcore',
    href: '/soundcore/speakers/anker-soundcore-flare-2',
    categorySlug: 'speakers',
  },
  {
    slug: 'joyroom-20w-usb-c-charger',
    name: { en: 'Joyroom 20W USB-C PD Charger', ar: 'شاحن جوي روم USB-C 20 واط' },
    image: '/products/joyroom/joyroom-20w-usb-c-charger/joyroom-joyroom-20w-usb-c-charger-egypt-cairo-1-thumb.webp',
    price: 236,
    originalPrice: 279,
    brand: 'Joyroom',
    badge: { en: 'Everyday Value', ar: 'اختيار اقتصادي' },
    href: '/joyroom/wall-chargers/joyroom-20w-usb-c-charger',
    categorySlug: 'wall-chargers',
  },
];
