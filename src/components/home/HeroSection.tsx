import Image from 'next/image';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface HeroSectionProps {
  locale: string;
}

const localePath = (locale: string, path: string) =>
  locale === 'ar' ? path : `/en${path === '/' ? '' : path}`;

/**
 * Conversion-focused, server-rendered hero.
 *
 * The previous carousel swapped an SSR placeholder after hydration. Keeping the
 * first decision static makes the value proposition easier to scan, keeps the
 * hero useful without JavaScript, and removes a source of LCP/CLS instability.
 */
export default function HeroSection({ locale }: HeroSectionProps) {
  const isAr = locale === 'ar';

  return (
    <section id="hero-section" className="relative isolate overflow-hidden bg-[#050814] text-white">
      <Image
        src="/images/home/cairovolt-hero-city-electric-v1.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="-z-20 object-cover object-center opacity-80"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,7,18,0.98)_0%,rgba(4,7,18,0.86)_42%,rgba(4,7,18,0.28)_72%,rgba(4,7,18,0.78)_100%)] rtl:bg-[linear-gradient(270deg,rgba(4,7,18,0.98)_0%,rgba(4,7,18,0.86)_42%,rgba(4,7,18,0.28)_72%,rgba(4,7,18,0.78)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#050814] to-transparent" />

      <div className="mx-auto grid min-h-[720px] w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-20">
        <div className={`${isAr ? 'lg:text-right' : 'lg:text-left'} min-w-0 w-full max-w-2xl text-center`}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/[0.07] px-4 py-2 text-xs font-semibold text-cyan-100 backdrop-blur-md">
            <SvgIcon name="sparkles" className="h-4 w-4 text-cyan-300" />
            <span>{isAr ? 'اختيارات أذكى ليومك في مصر' : 'Smarter picks for everyday life in Egypt'}</span>
          </div>

          <h1 className="break-words font-outfit text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl lg:text-[4.35rem]">
            {isAr ? (
              <>
                طاقة تكمل يومك.
                <span className="mt-2 block bg-gradient-to-l from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                  صوت يفصلك عن الزحمة.
                </span>
              </>
            ) : (
              <>
                Power that keeps up.
                <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                  Sound that pulls you in.
                </span>
              </>
            )}
          </h1>

          <p className="hero-description mx-auto mt-6 max-w-xl break-words text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
            {isAr
              ? 'منتجات Anker وSoundcore وJoyroom الأصلية، مرتبة حسب احتياجك الحقيقي — عشان تختار صح من أول مرة وتدفع عند الاستلام.'
              : 'Original Anker, Soundcore, and Joyroom products arranged around what you actually need — so you choose right the first time and pay on delivery.'}
          </p>

          <div className={`mt-8 flex flex-col gap-3 sm:flex-row ${isAr ? 'lg:justify-start' : 'lg:justify-start'} justify-center`}>
            <Link
              href="#product-showcase"
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-[#07101f] shadow-[0_18px_45px_rgba(0,0,0,.28)] transition hover:-translate-y-0.5 hover:bg-cyan-50"
            >
              {isAr ? 'تسوّق الأكثر طلبًا' : 'Shop popular picks'}
              <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">{isAr ? '←' : '→'}</span>
            </Link>
            <Link
              href="#shop-by-need"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.07] px-7 py-3.5 text-base font-semibold text-white backdrop-blur-md transition hover:border-white/35 hover:bg-white/[0.12]"
            >
              <SvgIcon name="compass" className="h-5 w-5 text-cyan-300" />
              {isAr ? 'اختار حسب استخدامك' : 'Shop by your need'}
            </Link>
          </div>

          <div className="quality-badges mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs text-slate-300 lg:justify-start sm:text-sm">
            {[
              { icon: 'check-circle', ar: 'أصلي ويمكن التحقق منه', en: 'Authenticity you can verify' },
              { icon: 'shield', ar: 'ضمان حسب المنتج', en: 'Product-specific warranty' },
              { icon: 'money', ar: 'دفع عند الاستلام', en: 'Cash on delivery' },
            ].map((item) => (
              <span key={item.icon} className="flex items-center gap-1.5">
                <SvgIcon name={item.icon} className="h-4 w-4 text-emerald-300" />
                {isAr ? item.ar : item.en}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto min-w-0 w-full max-w-[610px] lg:mx-0">
          <div className="absolute -inset-8 rounded-full bg-blue-400/15 blur-3xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.09] p-3 shadow-[0_35px_100px_rgba(0,0,0,.42)] backdrop-blur-xl sm:p-4">
            <Link
              href={localePath(locale, '/anker/wall-chargers/anker-nano-45w-smart-display-charger')}
              className="group relative block overflow-hidden rounded-[1.55rem]"
              style={{ backgroundImage: 'radial-gradient(130% 105% at 50% 0%, #ffffff 0%, #f7f9fc 58%, #eef2f8 100%)' }}
            >
              <div className="relative aspect-[1.13/1] min-h-[360px] sm:min-h-[430px]">
                {/* Studio floor shadow grounds the product like a lit set —
                    inline-styled so it never depends on the CSS build. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0"
                  style={{
                    bottom: '20%',
                    height: '8%',
                    margin: '0 24%',
                    background: 'radial-gradient(50% 100% at 50% 50%, rgba(15,23,42,.18), transparent 72%)',
                    filter: 'blur(7px)',
                  }}
                />
                <Image
                  src="/images/home/cutouts/anker-nano-45w-smart-display-charger-cutout-cairovolt.png"
                  alt={isAr ? 'شاحن أنكر نانو 45 واط الذكي بشاشة تفاعلية' : 'Anker Nano 45W smart charger with interactive display'}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-contain p-8 pb-24 drop-shadow-[0_24px_30px_rgba(15,23,42,.18)] transition duration-700 group-hover:scale-[1.035] sm:p-12 sm:pb-28"
                />
                {/* Calm, light info bar: dark-on-light reads softer than the
                    old black gradient and keeps the whole stage serene. */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent px-5 pb-5 pt-16 text-[#0b1324] sm:px-7 sm:pb-6">
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[.16em] text-blue-700">
                      Anker
                    </span>
                    <span className="text-sm text-slate-500">{isAr ? 'شاشة ذكية تفاعلية' : 'Smart interactive display'}</span>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h2 className="font-outfit text-2xl font-bold sm:text-3xl">{isAr ? 'نانو 45 واط الذكي' : 'Nano 45W Smart'}</h2>
                      <p className="mt-1 text-sm text-slate-500">{isAr ? 'GaN · يعرض قوة الشحن لحظة بلحظة' : 'GaN · live charging readout'}</p>
                    </div>
                    <div className="whitespace-nowrap text-end">
                      <span className="me-2 text-sm text-slate-400 line-through">2,700</span>
                      <span className="font-outfit text-2xl font-bold">1,900</span>
                      <span className="ms-1 text-xs text-slate-500">{isAr ? 'ج.م' : 'EGP'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <Link
            href={localePath(locale, '/soundcore/audio/anker-soundcore-r50i-nc')}
            className={`absolute -top-7 hidden w-[190px] items-center gap-3 rounded-2xl border border-white/15 bg-[#0b1324]/90 p-3 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 sm:flex ${isAr ? '-left-5' : '-right-5'}`}
          >
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-300">
              <Image
                src="/images/home/cutouts/soundcore-r50i-nc-anc-earbuds-cutout-cairovolt.png"
                alt="Soundcore R50i NC"
                fill
                sizes="56px"
                className="object-contain p-1 drop-shadow-sm"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-cyan-300">Soundcore</span>
              <span className="block truncate text-xs font-semibold text-white">R50i NC</span>
              <span className="block text-[11px] text-slate-400">1,199 {isAr ? 'ج.م' : 'EGP'}</span>
            </span>
          </Link>

          <Link
            href={localePath(locale, '/joyroom/wall-chargers/joyroom-3-in-1-wireless-charging-station')}
            className={`absolute -bottom-12 hidden w-[215px] items-center gap-3 rounded-2xl border border-white/15 bg-[#0b1324]/90 p-3 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 sm:flex ${isAr ? '-right-6' : '-left-6'}`}
          >
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-300">
              <Image
                src="/images/home/cutouts/joyroom-3-in-1-wireless-charging-station-cutout-cairovolt.png"
                alt="Joyroom 3-in-1 Wireless Station"
                fill
                sizes="56px"
                className="object-contain p-1 drop-shadow-sm"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-emerald-300">Joyroom</span>
              <span className="block truncate text-xs font-semibold text-white">{isAr ? 'محطة شحن 3 في 1' : '3-in-1 Station'}</span>
              <span className="block text-[11px] text-slate-400">1,206 {isAr ? 'ج.م' : 'EGP'}</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
