import Image from 'next/image';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';
import HeroVideo from '@/components/home/HeroVideo';
import { getProductBySlug } from '@/lib/static-products';
import { getDiscountInfo } from '@/lib/pricing-display';

interface HeroSectionProps {
  locale: string;
}

const localePath = (locale: string, path: string) =>
  locale === 'ar' ? path : `/en${path === '/' ? '' : path}`;

// The smart-display charger is the hero star (the product shown in the looping
// video), so the primary CTA and price callout point at its page.
const HERO_SLUG = 'anker-nano-45w-smart-display-charger';

// Show the lower-centre of the portrait video (where the product cluster sits)
// when it is cropped by object-cover on wide screens.
const VIDEO_POSITION = '50% 38%';

/**
 * Cinematic full-bleed hero — Anker-style. A muted, autoplaying, looping product
 * video fills the whole hero as its background on every screen; the headline,
 * price and CTAs sit on top over a legibility scrim. A static poster is layered
 * underneath so first paint is instant and reduced-motion / no-JS visitors still
 * get the product still. Server-rendered — readable before hydration.
 */
export default function HeroSection({ locale }: HeroSectionProps) {
  const isAr = locale === 'ar';
  const hero = getProductBySlug(HERO_SLUG);
  const priceFmt = hero ? new Intl.NumberFormat('en-EG').format(hero.price) : '—';
  const discount = hero ? getDiscountInfo(hero.price, hero.originalPrice) : { hasDiscount: false, percent: 0, save: 0 };
  const originalFmt = hero ? new Intl.NumberFormat('en-EG').format(hero.originalPrice) : '';

  const trust = [
    { icon: 'money', ar: 'دفع عند الاستلام', en: 'Cash on delivery' },
    { icon: 'shield', ar: 'ضمان كايرو فولت', en: 'CairoVolt warranty' },
    { icon: 'arrows-rotate', ar: 'إرجاع خلال 14 يوم', en: '14-day returns' },
    { icon: 'truck', ar: 'توصيل لكل مصر', en: 'Delivery across Egypt' },
  ];

  return (
    <section
      id="hero-section"
      className="relative isolate flex min-h-[88svh] w-full items-end overflow-hidden bg-[#050814] text-white lg:min-h-[88vh] lg:max-h-[900px]"
    >
      {/* Poster layer = instant LCP paint + reduced-motion / no-JS fallback */}
      <Image
        src="/videos/cairovolt-hero-poster.webp"
        alt={isAr ? 'شواحن انكر نانو الذكية بشاشات تفاعلية تعرض حالة الشحن' : 'Anker Nano smart chargers with interactive displays showing charging status'}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: VIDEO_POSITION }}
      />
      {/* Full-bleed background video */}
      <HeroVideo
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
        style={{ objectPosition: VIDEO_POSITION }}
        poster="/videos/cairovolt-hero-poster.webp"
        webm="/videos/cairovolt-hero.webm"
        mp4="/videos/cairovolt-hero.mp4"
      />

      {/* Legibility scrims — dark from the bottom (behind the copy) + a soft side
          wash on the text side; kept as inline gradients so they never depend on
          the CSS build. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to top, rgba(5,8,20,0.96) 0%, rgba(5,8,20,0.78) 26%, rgba(5,8,20,0.32) 55%, rgba(5,8,20,0.12) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: isAr
            ? 'linear-gradient(to left, rgba(5,8,20,0.72) 0%, rgba(5,8,20,0.12) 42%, transparent 70%)'
            : 'linear-gradient(to right, rgba(5,8,20,0.72) 0%, rgba(5,8,20,0.12) 42%, transparent 70%)',
        }}
      />

      {/* ── Overlaid content (bottom-anchored) ─────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-11 pt-28 sm:px-6 lg:px-8 lg:pb-16">
        <div className={`mx-auto max-w-xl text-center lg:mx-0 lg:max-w-2xl ${isAr ? 'lg:text-right' : 'lg:text-left'}`}>
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/[0.08] px-4 py-2 text-xs font-semibold text-cyan-100 backdrop-blur-md sm:text-sm`}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            <span>{isAr ? 'جديد · شاحن بشاشة ذكية يتعرّف على جهازك' : 'New · A smart-display charger that knows your device'}</span>
          </div>

          <h1 className="font-outfit text-[2.1rem] font-bold leading-[1.06] tracking-[-0.035em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,.5)] sm:text-5xl lg:text-[4.15rem]">
            {isAr ? (
              <>
                شحنٌ ذكي يعرف جهازك،
                <span className="mt-2 block bg-gradient-to-l from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                  ويحميه في كل لحظة.
                </span>
              </>
            ) : (
              <>
                Smart charging that knows your device,
                <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                  and protects it — every moment.
                </span>
              </>
            )}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-200 drop-shadow-[0_1px_10px_rgba(0,0,0,.6)] sm:text-lg lg:mx-0">
            {isAr
              ? 'انكر وساوندكور وجوي روم الأصلية — بضمان كايرو فولت المكتوب، ودفع عند الاستلام، وتوصيل لكل محافظات مصر.'
              : 'Genuine Anker, Soundcore & Joyroom — with written CairoVolt warranty, cash on delivery, and delivery across Egypt.'}
          </p>

          {/* Hero-product price anchor */}
          {hero && (
            <div className={`mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 ${isAr ? 'lg:justify-start' : 'lg:justify-start'}`}>
              <span className="text-sm text-slate-300">{isAr ? 'انكر نانو 45 واط الذكي' : 'Anker Nano 45W Smart'}</span>
              <span className="font-outfit text-2xl font-bold text-white">
                {priceFmt} <span className="text-sm font-semibold text-slate-300">{isAr ? 'ج.م' : 'EGP'}</span>
              </span>
              {discount.hasDiscount && (
                <>
                  <span className="text-sm text-slate-400 line-through">{originalFmt}</span>
                  <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-extrabold text-white">
                    {isAr ? `خصم ${discount.percent}%` : `-${discount.percent}%`}
                  </span>
                </>
              )}
            </div>
          )}

          <div className={`mt-6 flex flex-col gap-3 sm:flex-row ${isAr ? 'justify-center lg:justify-start' : 'justify-center lg:justify-start'}`}>
            <Link
              href={localePath(locale, `/anker/wall-chargers/${HERO_SLUG}`)}
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-[#07101f] shadow-[0_18px_45px_rgba(0,0,0,.4)] transition hover:-translate-y-0.5 hover:bg-cyan-50"
            >
              {isAr ? 'اشترِ الآن' : 'Shop Now'}
              <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">{isAr ? '←' : '→'}</span>
            </Link>
            <Link
              href="#product-showcase"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.08] px-7 py-3.5 text-base font-semibold text-white backdrop-blur-md transition hover:border-white/45 hover:bg-white/[0.16]"
            >
              <SvgIcon name="compass" className="h-5 w-5 text-cyan-300" />
              {isAr ? 'تصفّح كل المنتجات' : 'Explore all products'}
            </Link>
          </div>

          <div className={`mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2.5 text-xs text-slate-200 sm:text-sm ${isAr ? 'lg:justify-start' : 'lg:justify-start'}`}>
            {trust.map((item) => (
              <span key={item.icon} className="flex items-center gap-1.5 drop-shadow-[0_1px_8px_rgba(0,0,0,.6)]">
                <SvgIcon name={item.icon} className="h-4 w-4 text-emerald-300" />
                {isAr ? item.ar : item.en}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
