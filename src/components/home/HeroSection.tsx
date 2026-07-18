import Image from 'next/image';
import Link from 'next/link';
import HeroVideo from '@/components/home/HeroVideo';
import { getProductBySlug } from '@/lib/static-products';
import { getDiscountInfo } from '@/lib/pricing-display';

interface HeroSectionProps {
  locale: string;
}

const localePath = (locale: string, path: string) =>
  locale === 'ar' ? path : `/en${path === '/' ? '' : path}`;

// The smart-display charger is the hero star (the product shown in the looping
// video), so the CTA and price callout point at its page.
const HERO_SLUG = 'anker-nano-45w-smart-display-charger';

// Frame the video so the product cluster sits in the LOWER half and the light
// gradient (where the copy goes) stays clear in the upper half — no scrim.
const VIDEO_POSITION = '50% 50%';

/**
 * Anker-style hero: the product video plays full-bleed with NO overlay/scrim —
 * its own light gradient is the backdrop. The copy is placed high-centre, in the
 * empty gradient above the product, in dark ink so it never sits on top of the
 * chargers. A static poster underlays the video for instant paint + reduced
 * motion. Server-rendered; the video itself is the small HeroVideo client child.
 */
export default function HeroSection({ locale }: HeroSectionProps) {
  const isAr = locale === 'ar';
  const hero = getProductBySlug(HERO_SLUG);
  const priceFmt = hero ? new Intl.NumberFormat('en-EG').format(hero.price) : '—';
  const discount = hero ? getDiscountInfo(hero.price, hero.originalPrice) : { hasDiscount: false, percent: 0, save: 0 };
  const originalFmt = hero ? new Intl.NumberFormat('en-EG').format(hero.originalPrice) : '';

  return (
    <section
      id="hero-section"
      className="relative isolate w-full overflow-hidden bg-[#dfe7f2] min-h-[92svh] lg:min-h-[90vh] lg:max-h-[920px]"
    >
      {/* Poster = instant LCP paint + reduced-motion / no-JS fallback */}
      <Image
        src="/videos/cairovolt-hero-poster.webp"
        alt={isAr ? 'شواحن انكر نانو الذكية بشاشات تفاعلية تعرض حالة الشحن' : 'Anker Nano smart chargers with interactive displays showing charging status'}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="-z-10 object-cover"
        style={{ objectPosition: VIDEO_POSITION }}
      />
      {/* Full-bleed background video — NO scrim/filter over it */}
      <HeroVideo
        className="absolute inset-0 -z-10 h-full w-full object-cover motion-reduce:hidden"
        style={{ objectPosition: VIDEO_POSITION }}
        poster="/videos/cairovolt-hero-poster.webp"
        webm="/videos/cairovolt-hero.webm"
        mp4="/videos/cairovolt-hero.mp4"
      />

      {/* Copy placed high-centre, over the clear part of the gradient */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pt-20 text-center sm:pt-24 lg:pt-28">
        <h1 className="font-outfit text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#0a1220] sm:text-5xl lg:text-[3.5rem]">
          {isAr ? (
            <>
              شحنٌ ذكي يعرف جهازك،
              <span className="mt-1 block text-blue-700">ويحميه كل لحظة.</span>
            </>
          ) : (
            <>
              Smart charging that knows
              <span className="mt-1 block text-blue-700">your device.</span>
            </>
          )}
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm font-medium text-slate-700 sm:text-base">
          {isAr
            ? 'انكر نانو 45 واط · شاشة ذكية تعرض حالة الشحن لحظيًا'
            : 'Anker Nano 45W · a live smart display that knows your device'}
        </p>

        {hero && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="font-outfit text-2xl font-bold text-[#0a1220]">
              {priceFmt} <span className="text-sm font-semibold text-slate-500">{isAr ? 'ج.م' : 'EGP'}</span>
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

        <div className="mt-5 flex items-center justify-center">
          <Link
            href={localePath(locale, `/anker/wall-chargers/${HERO_SLUG}`)}
            className="group inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[#0b1324] px-10 py-3.5 text-base font-bold text-white shadow-[0_16px_38px_rgba(11,19,36,.28)] transition hover:-translate-y-0.5 hover:bg-[#131f38]"
          >
            {isAr ? 'اشترِ الآن' : 'Shop Now'}
            <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">{isAr ? '←' : '→'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
