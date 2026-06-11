import Image from 'next/image';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';
import HeroCarousel from './HeroCarousel';
import type { HeroProduct } from './HeroCarousel';

/**
 * Hero product data — shared between server-rendered initial state
 * and client-side carousel interactivity.
 */
const heroProducts: HeroProduct[] = [
  {
    slug: 'anker-nano-45w-smart-display-charger',
    name: { en: 'Anker Nano 45W Smart Display', ar: 'انكر نانو 45W شاشة ذكية' },
    tagline: { en: '45W GaN · Smart TFT Display · 180° Foldable · Care Mode', ar: '45 واط GaN · شاشة TFT ذكية · قابس 180° · وضع العناية' },
    image: '/products/anker/anker-nano-45w-smart-display-charger/anker-nano-45w-smart-display-charger-front-180-foldable-white-cairovolt.webp',
    price: 1900,
    originalPrice: 2700,
    brand: 'Anker',
    badge: { en: 'New Arrival', ar: 'جديد' },
    href: '/anker/wall-chargers/anker-nano-45w-smart-display-charger',
    highlight: { en: 'Red Dot 2026 Winner', ar: 'جائزة Red Dot 2026' },
  },
  {
    slug: 'anker-zolo-a110e-20000',
    name: { en: 'Anker ZOLO 20,000mAh', ar: 'أنكر زولو 20,000' },
    tagline: { en: '30W Fast Charge · Built-in Cable · High Capacity', ar: '30 واط شحن سريع · كابل مدمج · سعة ضخمة' },
    image: '/products/anker/anker-zolo-a110e-20000/anker-zolo-a110e-20000mah-power-bank-builtin-cable-dual-output-cairovolt.webp',
    price: 1730,
    originalPrice: 1950,
    brand: 'Anker',
    badge: { en: 'Top Rated', ar: 'الأعلى تقييماً' },
    href: '/anker/power-banks/anker-zolo-a110e-20000',
    highlight: { en: '4x iPhone charges', ar: '4 شحنات ايفون' },
  },
  {
    slug: 'anker-soundcore-r50i-nc',
    name: { en: 'Soundcore R50i NC', ar: 'ساوندكور R50i NC' },
    tagline: { en: '42dB ANC · 45h Battery · 4-Mic AI Calls', ar: '42dB إلغاء ضوضاء · 45 ساعة · 4 مايك AI' },
    image: '/products/anker/anker-soundcore-r50i-nc/anker-soundcore-r50i-nc-active-noise-cancelling-earbuds-cairovolt.webp',
    price: 1199,
    originalPrice: 1550,
    brand: 'Anker',
    badge: { en: 'New Arrival', ar: 'جديد' },
    href: '/soundcore/audio/anker-soundcore-r50i-nc',
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

/**
 * HeroSection — Server Component
 *
 * Renders the FIRST hero product statically in the server HTML so the LCP image
 * is discoverable immediately by the browser (no waiting for JS hydration).
 *
 * The HeroCarousel client component hydrates on top and takes over for
 * auto-rotation and pill click interactivity.
 */
export default function HeroSection({ locale }: HeroSectionProps) {
  const isAr = locale === 'ar';
  const firstProduct = heroProducts[0];

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 50%), linear-gradient(135deg, #0a0f1c 0%, #111d35 50%, #0d1628 100%)',
      }}
    >

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* ════════════════════════════════════════════════════════════
           SSR Placeholder — Renders the first product statically.
           Hidden by HeroCarousel after hydration via data-hero-ssr.
           ════════════════════════════════════════════════════════════ */}
        <div data-hero-ssr>
          <div
            className={`flex flex-col ${isAr ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}
          >
            {/* Text Side */}
            <div className={`text-center ${isAr ? 'lg:text-right' : 'lg:text-left'} space-y-6 z-10 w-full lg:flex-1`}>
              {/* Badge */}
              {firstProduct.badge && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                  <SvgIcon name="fire" className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-300 tracking-wide uppercase">
                    {isAr ? firstProduct.badge.ar : firstProduct.badge.en}
                  </span>
                </div>
              )}

              {/* Heading — SSR placeholder only (instant LCP paint).
                  Rendered as a styled <p> with heading role, NOT <h1>: the live
                  <h1> lives in HeroCarousel (the post-hydration, user-visible
                  heading). Two <h1>s in the DOM is an SEO defect, and this node
                  is set aria-hidden once the carousel takes over anyway. */}
              <p
                role="heading"
                aria-level={1}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white leading-tight tracking-tight font-outfit"
              >
                {isAr ? (
                  <>
                    منتجات <span className="text-blue-400">Anker</span> الأصلية
                    <br />
                    <span className="text-slate-300 text-2xl sm:text-3xl lg:text-4xl font-medium">{firstProduct.name.ar}</span>
                  </>
                ) : (
                  <>
                    Original <span className="text-blue-400">Anker</span> Products
                    <br />
                    <span className="text-slate-300 text-2xl sm:text-3xl lg:text-4xl font-medium">{firstProduct.name.en}</span>
                  </>
                )}
              </p>

              {/* Tagline */}
              <p className="text-lg text-slate-400 font-medium">
                {isAr ? firstProduct.tagline.ar : firstProduct.tagline.en}
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
                  href={`${locale === 'ar' ? '' : '/en'}${firstProduct.href}`}
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

            {/* Image Side — LCP IMAGE: Server-rendered for immediate discovery */}
            <div className="relative flex justify-center items-center z-10 w-full lg:flex-1 lg:w-auto px-4 sm:px-0">
              <div className="relative w-full max-w-[360px] sm:max-w-[380px] lg:max-w-[420px] aspect-square">
                {/* Glow ring behind product */}
                <div
                  className="absolute inset-[-20%] rounded-full opacity-25 blur-[80px] pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, #3b82f6, transparent 70%)',
                    willChange: 'transform',
                    contain: 'strict',
                  }}
                />

                {/* Product Image — SSR with priority for LCP */}
                <div className="relative w-full h-full animate-hero-float rounded-2xl overflow-hidden">
                  <Image
                    src={firstProduct.image}
                    alt={isAr ? firstProduct.name.ar : firstProduct.name.en}
                    fill
                    className="object-cover"
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 380px, 420px"
                  />
                </div>

                {/* Price tag */}
                <div className={`absolute -bottom-5 ${isAr ? '-left-6' : '-right-6'} rounded-2xl px-5 py-3 shadow-xl z-20`}
                  style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(59, 130, 246, 0.4)' }}
                >
                  <div className="text-2xl font-bold text-white font-outfit">
                    {firstProduct.price.toLocaleString()} <span className="text-sm font-normal text-slate-300">{isAr ? 'ج.م' : 'EGP'}</span>
                  </div>
                  {firstProduct.originalPrice && (
                    <div className="text-sm text-slate-400 line-through">
                      {firstProduct.originalPrice.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                    </div>
                  )}
                </div>

                {/* Highlight tag */}
                <div className={`absolute -top-5 ${isAr ? '-right-6' : '-left-6'} rounded-xl px-4 py-2 shadow-lg z-20`}
                  style={{ background: 'rgba(29, 78, 216, 0.92)', border: '1px solid rgba(96, 165, 250, 0.55)' }}
                >
                  <span className="text-xs font-bold text-white">
                    {isAr ? firstProduct.highlight.ar : firstProduct.highlight.en}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA — Mobile only */}
          <div className="flex lg:hidden flex-col items-center gap-4 mt-8 z-10 relative">
            <Link
              href={`${locale === 'ar' ? '' : '/en'}${firstProduct.href}`}
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

        {/* ════════════════════════════════════════════════════════════
           Client Carousel — Hydrates and takes over from SSR placeholder.
           Adds auto-rotation, pill clicks, and dynamic image swapping.
           ════════════════════════════════════════════════════════════ */}
        <HeroCarousel products={heroProducts} locale={locale} />
      </div>
    </section>
  );
}
