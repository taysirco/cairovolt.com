'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface HeroProduct {
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

const heroProducts: HeroProduct[] = [
  {
    slug: 'anker-zolo-a110d-10000',
    name: { en: 'Anker ZOLO 10,000mAh', ar: 'أنكر زولو 10,000' },
    tagline: { en: '22.5W Fast Charge · Built-in Cable · Ultra-Slim 229g', ar: '22.5 واط شحن سريع · كابل مدمج · خفيف 229 جرام' },
    image: '/products/anker/anker-zolo-a110d-10000/anker-zolo-a110d-10000mah-power-bank-builtin-usb-c-cable-led-display-cairovolt.webp',
    price: 1270,
    originalPrice: 1390,
    brand: 'Anker',
    badge: { en: 'Best Seller', ar: 'الأكثر مبيعاً' },
    href: '/anker/power-banks/anker-zolo-a110d-10000',
    highlight: { en: '2x iPhone charges', ar: 'شحنتين ايفون' },
  },
  {
    slug: 'anker-soundcore-r50i-nc',
    name: { en: 'Soundcore R50i NC', ar: 'ساوندكور R50i NC' },
    tagline: { en: '42dB ANC · 45h Battery · 4-Mic AI Calls', ar: '42dB إلغاء ضوضاء · 45 ساعة · 4 مايك AI' },
    image: '/products/anker/anker-soundcore-r50i-nc/anker-soundcore-r50i-nc-active-noise-cancelling-earbuds-cairovolt.webp',
    price: 1299,
    originalPrice: 1550,
    brand: 'Anker',
    badge: { en: 'New Arrival', ar: 'جديد' },
    href: '/anker/audio/anker-soundcore-r50i-nc',
    highlight: { en: 'Rivals AirPods Pro 2', ar: 'منافس ايربودز برو 2' },
  },
  {
    slug: 'anker-prime-a1695-25000',
    name: { en: 'Anker Prime 25,000mAh', ar: 'أنكر برايم 25,000' },
    tagline: { en: '165W Beast · Charges MacBook Pro 16"', ar: '165 واط وحش · يشحن ماك بوك برو 16"' },
    image: '/products/anker/anker-prime-a1695-25000/anker-prime-a1695-25000mah-165w-power-bank-premium-cairovolt.webp',
    price: 3950,
    originalPrice: 4200,
    brand: 'Anker',
    badge: { en: 'Flagship', ar: 'الفلاجشيب' },
    href: '/anker/power-banks/anker-prime-a1695-25000',
    highlight: { en: '165W MacBook Pro', ar: '165 واط ماك بوك' },
  },
];

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const isAr = locale === 'ar';
  const [activeIdx, setActiveIdx] = useState(0);
  const active = heroProducts[activeIdx];
  const layoutRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const handlePillClick = useCallback((idx: number) => {
    setActiveIdx(idx);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Responsive detection
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0f1c 0%, #111d35 50%, #0d1628 100%)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #3b82f6, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Main hero layout */}
        <div
          ref={layoutRef}
          style={{
            display: 'flex',
            flexDirection: isDesktop ? (isAr ? 'row-reverse' : 'row') : 'column',
            alignItems: 'center',
            gap: isDesktop ? '4rem' : '2rem',
          }}
        >
          
          {/* Text Side — on mobile: only heading/tagline/stars, CTA moves below image */}
          <div className={`flex-1 text-center ${isDesktop ? (isAr ? 'text-right' : 'text-left') : ''} space-y-6 z-10 w-full`}>
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
            <div className={`flex items-center gap-3 ${isDesktop ? (isAr ? 'justify-end' : 'justify-start') : 'justify-center'}`}>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <SvgIcon key={s} name="star" className={`w-5 h-5 ${s <= 4 ? 'text-amber-400' : 'text-amber-400/80'}`} />
                ))}
              </div>
              <span className="text-sm text-slate-300 font-medium">
                {isAr ? '4.9/5 · أكثر من 2,400 عميل سعيد' : '4.9/5 · 2,400+ happy customers'}
              </span>
            </div>

            {/* CTA — Desktop only (on mobile it appears after image) */}
            {isDesktop && (
              <div className={`flex flex-col sm:flex-row gap-3 ${isAr ? 'justify-end' : 'justify-start'}`}>
                <Link
                  href={`/${locale}${active.href}`}
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] transition-all duration-300"
                >
                  <SvgIcon name="cart" className="w-5 h-5" />
                  {isAr ? 'اطلب الآن — ادفع عند الاستلام' : 'Order Now — Cash on Delivery'}
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{isAr ? '←' : '→'}</span>
                </Link>
              </div>
            )}

            {/* Trust Pills — Desktop only */}
            {isDesktop && (
              <div className={`flex flex-wrap gap-4 pt-2 ${isAr ? 'justify-end' : 'justify-start'}`}>
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
            )}
          </div>

          {/* Image Side — 1:1 aspect ratio, responsive, full-bleed */}
          <div className="flex-1 relative flex justify-center items-center z-10 w-full lg:w-auto px-4 sm:px-0">
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] lg:max-w-[420px] aspect-square">
              {/* Glow ring behind product */}
              <div
                className="absolute inset-[-20%] rounded-full opacity-25 blur-[80px]"
                style={{
                  background: 'radial-gradient(circle, #3b82f6, transparent 70%)',
                }}
              />
              
              {/* Product Image — 1:1, fills frame edge-to-edge */}
              <div key={active.slug} className="relative w-full h-full animate-hero-float rounded-2xl overflow-hidden">
                <Image
                  src={active.image}
                  alt={isAr ? active.name.ar : active.name.en}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 380px, 420px"
                />
              </div>

              {/* Price tag — solid dark background, pushed outside image edge */}
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

              {/* Highlight tag — solid background, pushed outside image edge */}
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

        {/* CTA — Mobile only (below image) */}
        {!isDesktop && (
          <div className="flex flex-col items-center gap-4 mt-8 z-10 relative">
            <Link
              href={`/${locale}${active.href}`}
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
        )}

        {/* Product Selector Pills */}
        <div className="flex justify-center gap-3 mt-10 z-10 relative">
          {heroProducts.map((product, idx) => (
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
                  src={product.image}
                  alt={isAr ? product.name.ar : product.name.en}
                  fill
                  className="object-cover"
                  sizes="40px"
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
      </div>
    </section>
  );
}
