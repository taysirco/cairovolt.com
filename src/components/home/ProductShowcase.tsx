'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { InstantLink as Link } from '@/components/ui/InstantLink';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { useCart } from '@/context/CartContext';
import { showcaseProducts, type ShowcaseProduct } from '@/data/showcase-products';
import { getBrandDisplayName, localizeArabicBrandNames } from '@/lib/arabic-brand-names';

interface ProductShowcaseProps {
  locale: string;
}

type ProductFilter = 'all' | 'sound' | 'power' | 'charging';

const filterMatches: Record<ProductFilter, (product: ShowcaseProduct) => boolean> = {
  all: () => true,
  sound: (product) => product.categorySlug === 'audio' || product.categorySlug === 'speakers',
  power: (product) => product.categorySlug === 'power-banks',
  charging: (product) => product.categorySlug === 'wall-chargers' || product.categorySlug === 'cables',
};

export default function ProductShowcase({ locale }: ProductShowcaseProps) {
  const isAr = locale === 'ar';
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState<ProductFilter>('all');
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const visibleProducts = useMemo(
    () => showcaseProducts.filter(filterMatches[activeFilter]),
    [activeFilter],
  );

  const handleQuickAdd = useCallback((product: ShowcaseProduct) => {
    addToCart({
      productId: product.slug,
      name: isAr ? localizeArabicBrandNames(product.name.ar) : product.name.en,
      price: product.price,
      quantity: 1,
      image: product.image,
      brand: product.brand,
    });
    setAddedSlug(product.slug);
    window.setTimeout(() => setAddedSlug(null), 2000);
  }, [addToCart, isAr]);

  const filters: Array<{ key: ProductFilter; ar: string; en: string }> = [
    { key: 'all', ar: 'كل الاختيارات', en: 'All picks' },
    { key: 'sound', ar: 'صوتيات', en: 'Audio' },
    { key: 'power', ar: 'باور بانك', en: 'Power banks' },
    { key: 'charging', ar: 'شحن', en: 'Charging' },
  ];

  return (
    <section id="product-showcase" className="bg-white py-16 text-[#07111f] lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-700">
              <SvgIcon name="fire" className="h-5 w-5" />
              {isAr ? 'اختيارات مميزة من الكتالوج' : 'Featured catalog picks'}
            </span>
            <h2 className="mt-3 font-outfit text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              {isAr ? 'ابدأ من اختيارات واضحة ومتنوعة.' : 'Start with a clear, varied shortlist.'}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {isAr
                ? 'مزيج مختار من انكر وساوندكور وجوي روم — بأسعار مطابقة للكتالوج وإضافة سريعة للسلة.'
                : 'A curated mix of Anker, Soundcore, and Joyroom — with catalog-matched prices and quick add.'}
            </p>
          </div>

          <div className="flex max-w-full gap-2 overflow-x-auto pb-1 scrollbar-hide" role="group" aria-label={isAr ? 'تصفية المنتجات' : 'Filter products'}>
            {filters.map((filter) => {
              const isActive = activeFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  aria-pressed={isActive}
                  className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#07111f] text-white shadow-lg'
                      : 'border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-[#07111f]'
                  }`}
                >
                  {isAr ? filter.ar : filter.en}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product) => {
            const isAdded = addedSlug === product.slug;
            const productHref = `${locale === 'ar' ? '' : '/en'}${product.href}`;
            const brandColor = product.brand === 'Joyroom'
              ? 'text-emerald-700'
              : product.brand === 'Soundcore'
                ? 'text-violet-700'
                : 'text-blue-700';

            return (
              <article
                key={product.slug}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,.045)] transition duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_22px_50px_rgba(15,23,42,.11)] sm:rounded-[1.75rem]"
              >
                <Link href={productHref} className="relative block aspect-square overflow-hidden bg-[#f4f5f7]">
                  <Image
                    src={product.image.replace('-thumb.webp', '-480.webp')}
                    alt={isAr ? localizeArabicBrandNames(product.name.ar) : product.name.en}
                    fill
                    unoptimized
                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                  {product.badge && (
                    <span className={`absolute top-3 z-10 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[9px] font-bold text-[#07111f] shadow-sm backdrop-blur-sm sm:top-4 sm:px-3 sm:text-[10px] ${isAr ? 'right-3 sm:right-4' : 'left-3 sm:left-4'}`}>
                      {isAr ? product.badge.ar : product.badge.en}
                    </span>
                  )}
                </Link>

                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-[.14em] sm:text-[11px] ${brandColor}`}>
                      {getBrandDisplayName(product.brand, locale)}
                    </span>
                  </div>

                  <Link
                    href={productHref}
                    className="mt-2 line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-[#111827] transition hover:text-blue-700 sm:text-sm"
                  >
                    {isAr ? localizeArabicBrandNames(product.name.ar) : product.name.en}
                  </Link>

                  <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 sm:text-[11px]">
                    {isAr ? 'افتح الصفحة للمواصفات والضمان' : 'Open for specs and warranty'}
                    <span>{isAr ? '←' : '→'}</span>
                  </span>

                  <div className="mt-auto flex flex-wrap items-baseline gap-x-1.5 pt-4">
                    <strong className="font-outfit text-lg text-[#07111f] sm:text-xl">{product.price.toLocaleString('en-US')}</strong>
                    <span className="text-[10px] text-slate-500 sm:text-xs">{isAr ? 'ج.م' : 'EGP'}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    disabled={isAdded}
                    className={`mt-3 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full px-3 text-xs font-bold transition active:scale-[.98] sm:text-sm ${
                      isAdded
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#07111f] text-white hover:bg-blue-700'
                    }`}
                  >
                    <SvgIcon name={isAdded ? 'check-circle' : 'cart'} className="h-4 w-4" />
                    {isAdded ? (isAr ? 'اتضافت للسلة' : 'Added to cart') : (isAr ? 'إضافة سريعة' : 'Quick add')}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
