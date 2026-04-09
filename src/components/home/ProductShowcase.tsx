'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { useCart } from '@/context/CartContext';
import { productReviewsDb, calculateAggregateRating } from '@/data/product-reviews';

interface ShowcaseProduct {
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
const showcaseProducts: ShowcaseProduct[] = [
  {
    slug: 'anker-zolo-a110e-20000',
    name: { en: 'Anker ZOLO 20,000mAh', ar: 'أنكر زولو 20,000' },
    image: '/products/anker/anker-zolo-a110e-20000/anker-zolo-a110e-20000mah-power-bank-builtin-cable-dual-output-cairovolt.webp',
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
    image: '/products/anker/anker-soundcore-r50i-nc/anker-soundcore-r50i-nc-active-noise-cancelling-earbuds-cairovolt.webp',
    price: 1299,
    originalPrice: 1550,
    brand: 'Anker',
    badge: { en: 'New', ar: 'جديد' },
    href: '/anker/audio/anker-soundcore-r50i-nc',
    categorySlug: 'audio',
  },
  {
    slug: 'anker-nano-45w',
    name: { en: 'Anker Nano 45W Charger', ar: 'شاحن أنكر نانو 45 واط' },
    image: '/products/anker/anker-nano-45w/anker-nano-45w-package-box-contents-specifications.webp',
    price: 790,
    originalPrice: 1100,
    brand: 'Anker',
    badge: { en: 'Hot Deal', ar: 'عرض مميز' },
    href: '/anker/chargers/anker-nano-45w',
    categorySlug: 'chargers',
  },
  {
    slug: 'anker-prime-a1695-25000',
    name: { en: 'Anker Prime 165W', ar: 'أنكر برايم 165 واط' },
    image: '/products/anker/anker-prime-a1695-25000/anker-prime-a1695-25000mah-165w-power-bank-premium-cairovolt.webp',
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
    image: '/products/anker/anker-soundcore-k20i/anker-soundcore-k20i-wireless-earbuds-charging-case-cairovolt.webp',
    price: 750,
    originalPrice: 830,
    brand: 'Anker',
    href: '/anker/audio/anker-soundcore-k20i',
    categorySlug: 'audio',
  },
  {
    slug: 'anker-zolo-a110d-10000',
    name: { en: 'Anker ZOLO 10,000mAh', ar: 'أنكر زولو 10,000' },
    image: '/products/anker/anker-zolo-a110d-10000/anker-zolo-a110d-10000mah-power-bank-builtin-usb-c-cable-led-display-cairovolt.webp',
    price: 1270,
    brand: 'Anker',
    badge: { en: 'Pocket Size', ar: 'حجم الجيب' },
    href: '/anker/power-banks/anker-zolo-a110d-10000',
    categorySlug: 'power-banks',
  },
  {
    slug: 'anker-soundcore-flare-2',
    name: { en: 'Soundcore Flare 2 Speaker', ar: 'سماعة فلير 2' },
    image: '/products/anker/anker-soundcore-flare-2/anker-soundcore-flare-2-ipx7-waterproof-pool-outdoor.webp',
    price: 2999,
    originalPrice: 3400,
    brand: 'Anker',
    href: '/anker/speakers/anker-soundcore-flare-2',
    categorySlug: 'speakers',
  },
  {
    slug: 'anker-a8050-usb-c-cable',
    name: { en: 'Anker USB-C Cable 100W', ar: 'كابل أنكر USB-C' },
    image: '/products/anker/anker-a8050-usb-c-cable/anker-a8050-braided-nylon-cable-texture-close-up-durability.webp',
    price: 240,
    originalPrice: 270,
    brand: 'Anker',
    badge: { en: 'Essential', ar: 'أساسي' },
    href: '/anker/cables/anker-a8050-usb-c-cable',
    categorySlug: 'cables',
  },
];

interface ProductShowcaseProps {
  locale: string;
}

export default function ProductShowcase({ locale }: ProductShowcaseProps) {
  const isAr = locale === 'ar';
  const { addToCart } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const handleQuickAdd = useCallback((product: ShowcaseProduct) => {
    addToCart({
      productId: product.slug,
      name: isAr ? product.name.ar : product.name.en,
      price: product.price,
      quantity: 1,
      image: product.image,
      brand: product.brand,
    });
    setAddedSlug(product.slug);
    setTimeout(() => setAddedSlug(null), 2000);
  }, [addToCart, isAr]);

  return (
    <section id="product-showcase" className="py-16 lg:py-20" style={{ background: '#0a0f1c' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <SvgIcon name="fire" className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-blue-300 tracking-wide uppercase">
              {isAr ? 'منتجات Anker الأكثر طلباً' : 'Most Requested Anker Products'}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white font-outfit">
            {isAr ? 'الأكثر مبيعاً هذا الأسبوع' : 'Best Sellers This Week'}
          </h2>
          <p className="text-slate-400 mt-2 text-lg">
            {isAr ? 'باور بانك · سماعات · شواحن · كابلات · سبيكرات' : 'Power Banks · Earbuds · Chargers · Cables · Speakers'}
          </p>
        </div>

        {/* Products Grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {showcaseProducts.map((product) => {
            const reviews = productReviewsDb[product.slug];
            const rating = reviews ? calculateAggregateRating(reviews) : null;
            const isAdded = addedSlug === product.slug;

            return (
              <div
                key={product.slug}
                className="group relative bg-white/[0.03] rounded-2xl border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} z-10`}>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {isAr ? product.badge.ar : product.badge.en}
                    </span>
                  </div>
                )}

                {/* Image — 1:1 aspect ratio, object-cover to fill frame */}
                <Link href={`/${locale}${product.href}`} className="block relative aspect-square overflow-hidden rounded-t-2xl">
                  <Image
                    src={product.image}
                    alt={isAr ? product.name.ar : product.name.en}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col p-4 gap-2">
                  {/* Brand */}
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                    {product.brand}
                  </span>

                  {/* Name */}
                  <Link
                    href={`/${locale}${product.href}`}
                    className="text-sm font-medium text-slate-200 hover:text-white line-clamp-2 leading-snug transition-colors"
                  >
                    {isAr ? product.name.ar : product.name.en}
                  </Link>

                  {/* Rating */}
                  {rating && (
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <SvgIcon
                            key={s}
                            name="star"
                            className={`w-3 h-3 ${
                              s <= Math.round(parseFloat(rating.ratingValue))
                                ? 'text-amber-400'
                                : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-500">
                        ({rating.reviewCount})
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-auto pt-1">
                    <span className="text-lg font-bold text-green-400 font-outfit">
                      {product.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500">{isAr ? 'ج.م' : 'EGP'}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-600 line-through">
                        {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Quick Add Button */}
                  <button
                    onClick={() => handleQuickAdd(product)}
                    disabled={isAdded}
                    className={`mt-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isAdded
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/30 active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <span className="flex items-center justify-center gap-1.5">
                        <SvgIcon name="check-circle" className="w-4 h-4" />
                        {isAr ? 'تمت الإضافة' : 'Added!'}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5">
                        <SvgIcon name="cart" className="w-4 h-4" />
                        {isAr ? 'أضف للسلة' : 'Add to Cart'}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
