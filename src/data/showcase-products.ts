// Curated homepage products sourced from the maintained storefront catalog.

export interface ShowcaseProduct {
  slug: string;
  name: { en: string; ar: string };
  image: string;
  price: number;
  originalPrice: number;
  brand: string;
  badge?: { en: string; ar: string };
  href: string;
  categorySlug: string;
}

// Curated catalogue picks across the three families sold by CairoVolt.
// Prices and brand labels mirror src/data/products/* (the catalog source of truth).
export const showcaseProducts: ShowcaseProduct[] = [
  {
    slug: 'anker-zolo-a110e-20000',
    name: { en: 'Anker ZOLO 20,000mAh', ar: 'انكر زولو 20,000' },
    image: '/products/anker/anker-zolo-a110e-20000/anker-zolo-a110e-20000mah-power-bank-builtin-cable-dual-output-cairovolt-thumb.webp',
    price: 1730,
    originalPrice: 1959,
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
    originalPrice: 1440,
    brand: 'Soundcore',
    badge: { en: 'New', ar: 'جديد' },
    href: '/soundcore/audio/anker-soundcore-r50i-nc',
    categorySlug: 'audio',
  },
  {
    slug: 'anker-nano-45w',
    name: { en: 'Anker Nano 45W Charger', ar: 'شاحن انكر نانو 45 واط' },
    image: '/products/anker/anker-nano-45w/anker-nano-45w-package-box-contents-specifications-thumb.webp',
    price: 790,
    originalPrice: 949,
    brand: 'Anker',
    badge: { en: 'Featured', ar: 'اختيار مميز' },
    href: '/anker/wall-chargers/anker-nano-45w',
    categorySlug: 'wall-chargers',
  },
  {
    slug: 'anker-prime-a1695-25000',
    name: { en: 'Anker Prime 25,000mAh 165W', ar: 'انكر برايم 25,000 — 165 واط' },
    image: '/products/anker/anker-prime-a1695-25000/anker-prime-a1695-25000mah-165w-power-bank-premium-cairovolt-thumb.webp',
    price: 3950,
    originalPrice: 4750,
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
    originalPrice: 849,
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
    originalPrice: 3569,
    brand: 'Soundcore',
    href: '/soundcore/speakers/anker-soundcore-flare-2',
    categorySlug: 'speakers',
  },
  {
    slug: 'joyroom-20w-usb-c-charger',
    name: { en: 'Joyroom 20W USB-C PD Charger', ar: 'شاحن جوي روم USB-C 20 واط' },
    image: '/products/joyroom/joyroom-20w-usb-c-charger/joyroom-joyroom-20w-usb-c-charger-egypt-cairo-1-thumb.webp',
    price: 236,
    originalPrice: 290,
    brand: 'Joyroom',
    badge: { en: 'Everyday Value', ar: 'اختيار اقتصادي' },
    href: '/joyroom/wall-chargers/joyroom-20w-usb-c-charger',
    categorySlug: 'wall-chargers',
  },
];

// Extra picks shown ONLY by the homepage ProductFinder (not the showcase
// grid, so no ratings map is needed). Anker-first pool that widens each
// need/budget combination — cables and car get their own finder needs.
export const finderExtraProducts: ShowcaseProduct[] = [
  {
    slug: 'anker-zolo-30w-a2698-charger',
    name: { en: 'Anker Zolo 30W GaN', ar: 'شاحن انكر زولو 30 واط' },
    image: '/products/anker/anker-zolo-30w-a2698-charger/anker-zolo-30w-a2698-charger-hero-front-foldable-plug-thumb.webp',
    price: 599,
    originalPrice: 680,
    brand: 'Anker',
    href: '/anker/wall-chargers/anker-zolo-30w-a2698-charger',
    categorySlug: 'wall-chargers',
  },
  {
    slug: 'anker-nano-45w-smart-display-charger',
    name: { en: 'Anker Nano 45W Smart Display', ar: 'انكر نانو 45 واط بشاشة ذكية' },
    image: '/products/anker/anker-nano-45w-smart-display-charger/anker-nano-45w-smart-display-charger-front-180-foldable-white-cairovolt-thumb.webp',
    price: 1900,
    originalPrice: 2340,
    brand: 'Anker',
    href: '/anker/wall-chargers/anker-nano-45w-smart-display-charger',
    categorySlug: 'wall-chargers',
  },
  {
    slug: 'anker-prime-a2669-67w-gan-charger',
    name: { en: 'Anker Prime 67W GaN', ar: 'انكر برايم 67 واط — 3 منافذ' },
    image: '/products/anker/anker-prime-a2669-67w-gan-charger/anker-prime-a2669-67w-gan-charger-angled-hero-3-port-front-thumb.webp',
    price: 1970,
    originalPrice: 2330,
    brand: 'Anker',
    href: '/anker/wall-chargers/anker-prime-a2669-67w-gan-charger',
    categorySlug: 'wall-chargers',
  },
  {
    slug: 'anker-a8050-usb-c-cable',
    name: { en: 'Anker A8050 Braided USB-C', ar: 'كابل انكر A8050 مضفر' },
    image: '/products/anker/anker-a8050-usb-c-cable/anker-a8050-braided-nylon-cable-texture-close-up-durability-thumb.webp',
    price: 570,
    originalPrice: 680,
    brand: 'Anker',
    href: '/anker/cables/anker-a8050-usb-c-cable',
    categorySlug: 'cables',
  },
  {
    slug: 'anker-310-usb-c-lightning-cable',
    name: { en: 'Anker 310 USB-C to Lightning', ar: 'كابل انكر 310 لايتنينج' },
    image: '/products/anker/anker-310-usb-c-lightning-cable/anker-310-usb-c-lightning-cable-usb-c-lightning-connectors-hero-thumb.webp',
    price: 730,
    originalPrice: 839,
    brand: 'Anker',
    href: '/anker/cables/anker-310-usb-c-lightning-cable',
    categorySlug: 'cables',
  },
  {
    slug: 'anker-zolo-usb-c-braided-cable',
    name: { en: 'Anker Zolo 240W Braided', ar: 'كابل انكر زولو 240 واط' },
    image: '/products/anker/anker-zolo-usb-c-braided-cable/anker-zolo-usb-c-braided-cable-dual-usb-c-connectors-hero-thumb.webp',
    price: 790,
    originalPrice: 919,
    brand: 'Anker',
    href: '/anker/cables/anker-zolo-usb-c-braided-cable',
    categorySlug: 'cables',
  },
  {
    slug: 'anker-a2216-magnetic-wireless-car-charger',
    name: { en: 'Anker MagGo Car Mount Charger', ar: 'شاحن سيارة انكر مغناطيسي' },
    image: '/products/anker/anker-a2216-magnetic-wireless-car-charger/anker-a2216-magnetic-wireless-car-charger-full-kit-hero-white-thumb.webp',
    price: 1200,
    originalPrice: 1480,
    brand: 'Anker',
    href: '/anker/car-chargers/anker-a2216-magnetic-wireless-car-charger',
    categorySlug: 'car-chargers',
  },
  {
    slug: 'joyroom-60w-car-charger',
    name: { en: 'Joyroom 60W Car Charger', ar: 'شاحن سيارة جوي روم 60 واط' },
    image: '/products/joyroom/joyroom-60w-car-charger/joyroom-joyroom-60w-car-charger-egypt-cairo-6-thumb.webp',
    price: 513,
    originalPrice: 599,
    brand: 'Joyroom',
    href: '/joyroom/car-chargers/joyroom-60w-car-charger',
    categorySlug: 'car-chargers',
  },
  {
    slug: 'anker-prime-fusion-a1339-9600mah-65w',
    name: { en: 'Anker Prime Fusion 65W 2-in-1', ar: 'انكر برايم فيوجن — شاحن وباور بانك' },
    image: '/products/anker/anker-prime-fusion-a1339-9600mah-65w/anker-prime-fusion-a1339-9600mah-65w-main-front-hero-plug-inset-thumb.webp',
    price: 3200,
    originalPrice: 3609,
    brand: 'Anker',
    href: '/anker/power-banks/anker-prime-fusion-a1339-9600mah-65w',
    categorySlug: 'power-banks',
  },
  {
    slug: 'soundcore-a25i-earbuds',
    name: { en: 'Soundcore A25i Earbuds', ar: 'ساوندكور A25i' },
    image: '/products/anker/soundcore-a25i-earbuds/soundcore-a25i-earbuds-earbuds-case-lanyard-hero-thumb.webp',
    price: 1370,
    originalPrice: 1540,
    brand: 'Soundcore',
    href: '/soundcore/audio/soundcore-a25i-earbuds',
    categorySlug: 'audio',
  },
];
