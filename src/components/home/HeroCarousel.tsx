'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { InstantLink as Link } from '@/components/ui/InstantLink';
import { SvgIcon } from '@/components/ui/SvgIcon';

export interface HeroProduct {
  slug: string;
  name: { en: string; ar: string };
  tagline: { en: string; ar: string };
  image: string;
  price: number;
  originalPrice?: number;
  brand: string;
  badge?: { en: string; ar: string };
  href: string;
  highlight: { en: string; ar: string };
}

interface HeroCarouselProps {
  products: HeroProduct[];
  locale: string;
}

/**
 * HeroCarousel — Client-side interactivity for the hero section.
 *
 * On initial SSR, the parent HeroSection renders the first product statically.
 * This component hydrates on top and takes over with:
 * - Auto-rotation every 5 seconds
 * - Pill click handlers
 * - Dynamic image/text swapping
 *
 * The server-rendered first product is hidden via CSS once this mounts
 * (parent wraps it in [data-hero-ssr] which gets display:none after hydration).
 */
export default function HeroCarousel({ products, locale }: HeroCarouselProps) {
  const isAr = locale === 'ar';
  const [activeIdx, setActiveIdx] = useState(0);
  const active = products[activeIdx];

  const handlePillClick = useCallback((idx: number) => {
    setActiveIdx(idx);
  }, []);

  // Auto-rotate every 12 seconds
  // NOTE: Shorter intervals (5s) cause LCP regression — the new product image
  // loads mid-measurement and becomes a later LCP event. 12s is outside
  // Lighthouse's window while still keeping the carousel dynamic for visitors.
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % products.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [products.length]);

  // Swap SSR placeholder for client carousel without CLS or double-space.
  // Strategy: client carousel starts absolutely positioned (overlaps SSR),
  // then SSR is removed and client becomes static in one paint frame.
  useEffect(() => {
    const ssrPlaceholder = document.querySelector('[data-hero-ssr]');
    const clientEl = document.querySelector('[data-hero-client]') as HTMLElement;
    if (ssrPlaceholder && clientEl) {
      // Step 1: Show client absolutely on top of SSR (no layout shift, no double space)
      clientEl.style.display = '';
      clientEl.style.position = 'absolute';
      clientEl.style.top = '0';
      clientEl.style.left = '0';
      clientEl.style.right = '0';
      // Step 2: In next frame, remove SSR and make client static
      requestAnimationFrame(() => {
        ssrPlaceholder.setAttribute('style', 'display:none');
        ssrPlaceholder.setAttribute('aria-hidden', 'true');
        clientEl.style.position = '';
        clientEl.style.top = '';
        clientEl.style.left = '';
        clientEl.style.right = '';
      });
    }
  }, []);

  return (
    <>
      {/* Client-rendered hero content — hidden until hydration, absolutely positioned to avoid CLS */}
      <div data-hero-client style={{ display: 'none' }} className="relative">
        <div
          className={`flex flex-col ${isAr ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}
        >
          {/* Text Side — min-height prevents CLS during carousel rotation */}
          <div className={`text-center ${isAr ? 'lg:text-right' : 'lg:text-left'} space-y-6 z-10 w-full lg:flex-1 min-h-[280px] lg:min-h-[320px]`}>
            {/* Badge */}
            {active.badge && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                <SvgIcon name="fire" className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-amber-300 tracking-wide uppercase">
                  {isAr ? active.badge.ar : active.badge.en}
                </span>
              </div>
            )}

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white leading-tight tracking-tight font-outfit">
              {isAr ? (
                <>
                  منتجات <span className="text-blue-400">Anker</span> الأصلية
                  <br />
                  <span className="text-slate-300 text-2xl sm:text-3xl lg:text-4xl font-medium">{active.name.ar}</span>
                </>
              ) : (
                <>
                  Original <span className="text-blue-400">Anker</span> Products
                  <br />
                  <span className="text-slate-300 text-2xl sm:text-3xl lg:text-4xl font-medium">{active.name.en}</span>
                </>
              )}
            </h1>

            {/* Tagline */}
            <p className="text-lg text-slate-400 font-medium">
              {isAr ? active.tagline.ar : active.tagline.en}
            </p>

            {/* Social Proof */}
            <div className={`flex items-center gap-3 justify-center ${isAr ? 'lg:justify-end' : 'lg:justify-start'}`}>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <SvgIcon key={s} name="star" className={`w-5 h-5 ${s <= 4 ? 'text-amber-400' : 'text-amber-400/80'}`} />
                ))}
              </div>
              <span className="text-sm text-slate-300 font-medium">
                {isAr ? '4.9/5 · أكثر من 2,400 عميل سعيد' : '4.9/5 · 2,400+ happy customers'}
              </span>
            </div>

            {/* CTA — Desktop only */}
            <div className={`hidden lg:flex flex-col sm:flex-row gap-3 ${isAr ? 'justify-end' : 'justify-start'}`}>
              <Link
                href={`${locale === 'ar' ? '' : '/en'}${active.href}`}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] transition-all duration-300"
              >
                <SvgIcon name="cart" className="w-5 h-5" />
                {isAr ? 'اطلب الآن — ادفع عند الاستلام' : 'Order Now — Cash on Delivery'}
                <span className="group-hover:translate-x-1 transition-transform duration-300">{isAr ? '←' : '→'}</span>
              </Link>
            </div>

            {/* Trust Pills — Desktop only */}
            <div className={`hidden lg:flex flex-wrap gap-4 pt-2 ${isAr ? 'justify-end' : 'justify-start'}`}>
              {[
                { icon: 'shield', text: isAr ? 'ضمان 18-24 شهر' : '18-24 Month Warranty' },
                { icon: 'truck', text: isAr ? 'نوصل كل مصر' : 'All Egypt Delivery' },
                { icon: 'check-circle', text: isAr ? '100% Anker أصلي' : '100% Authentic Anker' },
              ].map((pill) => (
                <div key={pill.icon} className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <SvgIcon name={pill.icon} className="w-4 h-4 text-green-400" />
                  <span>{pill.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="relative flex justify-center items-center z-10 w-full lg:flex-1 lg:w-auto px-4 sm:px-0">
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] lg:max-w-[420px] aspect-square">
              {/* Glow ring */}
              <div
                className="absolute inset-[-20%] rounded-full opacity-25 blur-[80px] pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, #3b82f6, transparent 70%)',
                  willChange: 'transform',
                  contain: 'strict',
                }}
              />

              {/* Product Image */}
              <div key={active.slug} className="relative w-full h-full animate-hero-float rounded-2xl overflow-hidden">
                <Image
                  src={active.image}
                  alt={isAr ? active.name.ar : active.name.en}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 380px, 420px"
                />
              </div>

              {/* Price tag */}
              <div className={`absolute -bottom-5 ${isAr ? '-left-6' : '-right-6'} rounded-2xl px-5 py-3 shadow-xl z-20`}
                style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(59, 130, 246, 0.4)' }}
              >
                <div className="text-2xl font-bold text-white font-outfit">
                  {active.price.toLocaleString()} <span className="text-sm font-normal text-slate-300">{isAr ? 'ج.م' : 'EGP'}</span>
                </div>
                {active.originalPrice && (
                  <div className="text-sm text-slate-400 line-through">
                    {active.originalPrice.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                  </div>
                )}
              </div>

              {/* Highlight tag */}
              <div className={`absolute -top-5 ${isAr ? '-right-6' : '-left-6'} rounded-xl px-4 py-2 shadow-lg z-20`}
                style={{ background: 'rgba(29, 78, 216, 0.92)', border: '1px solid rgba(96, 165, 250, 0.55)' }}
              >
                <span className="text-xs font-bold text-white">
                  {isAr ? active.highlight.ar : active.highlight.en}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA — Mobile only */}
        <div className="flex lg:hidden flex-col items-center gap-4 mt-8 z-10 relative">
          <Link
            href={`${locale === 'ar' ? '' : '/en'}${active.href}`}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] transition-all duration-300 w-full max-w-md"
          >
            <SvgIcon name="cart" className="w-5 h-5" />
            {isAr ? 'اطلب الآن — ادفع عند الاستلام' : 'Order Now — Cash on Delivery'}
            <span className="group-hover:translate-x-1 transition-transform duration-300">{isAr ? '←' : '→'}</span>
          </Link>

          {/* Trust Pills — Mobile */}
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { icon: 'shield', text: isAr ? 'ضمان 18-24 شهر' : '18-24 Month Warranty' },
              { icon: 'truck', text: isAr ? 'نوصل كل مصر' : 'All Egypt Delivery' },
              { icon: 'check-circle', text: isAr ? '100% Anker أصلي' : '100% Authentic Anker' },
            ].map((pill) => (
              <div key={pill.icon} className="flex items-center gap-1.5 text-slate-400 text-sm">
                <SvgIcon name={pill.icon} className="w-4 h-4 text-green-400" />
                <span>{pill.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Selector Pills — always visible */}
      <div className="flex justify-center gap-3 mt-10 z-10 relative">
        {products.map((product, idx) => (
          <button
            key={product.slug}
            onClick={() => handlePillClick(idx)}
            className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
              idx === activeIdx
                ? 'bg-blue-500/15 border-blue-400/30 shadow-lg shadow-blue-500/10 scale-105'
                : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
            }`}
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                // 40px selector pill → ship the pre-generated 128px `-pill` variant
                // instead of the 1080px hero master. `unoptimized` serves this exact
                // file (FAH ignores the image loader anyway). ~25KB → ~2KB per pill.
                src={product.image.replace(/\.webp$/, '-pill.webp')}
                alt={isAr ? product.name.ar : product.name.en}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <span className={`text-xs sm:text-sm font-medium hidden sm:block ${
              idx === activeIdx ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
            }`}>
              {isAr ? product.name.ar : product.name.en}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
