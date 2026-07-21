import Image from 'next/image';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface ShopByNeedProps {
  locale: string;
}

const localized = (locale: string, path: string) => (locale === 'ar' ? path : `/en${path}`);

const categories = [
  {
    key: 'audio',
    icon: 'headphones',
    titleAr: 'صوت على مزاجك',
    titleEn: 'Sound for your world',
    copyAr: 'ايربودز، هيدفون وسبيكرات لكل لحظة.',
    copyEn: 'Earbuds, headphones, and speakers for every moment.',
    href: '/soundcore',
    image: '/images/home/cutouts/soundcore-liberty-5-tws-earbuds-cutout-cairovolt.png',
    className: 'md:col-span-6 md:row-span-2 bg-[#07111f] text-white',
    imageClass: 'object-contain object-bottom p-6 pt-24 sm:p-12 sm:pt-28 drop-shadow-[0_30px_40px_rgba(0,0,0,.55)]',
    accent: 'text-cyan-300 bg-cyan-300/10 border-cyan-300/20',
    copyClass: 'text-slate-300',
    dark: true,
  },
  {
    key: 'power',
    icon: 'battery',
    titleAr: 'طاقة تكمّل اليوم',
    titleEn: 'Power that lasts',
    copyAr: 'باور بانك للسفر واليوم الطويل.',
    copyEn: 'Power banks for travel and long days.',
    href: '/power-banks',
    image: '/images/home/cutouts/anker-zolo-a110d-power-bank-cutout-cairovolt.png',
    className: 'md:col-span-3 bg-[#e8f2ff] text-[#07111f]',
    imageClass: 'object-contain object-bottom p-2 drop-shadow-[0_18px_28px_rgba(15,23,42,.22)]',
    accent: 'text-blue-700 bg-white/70 border-white',
    copyClass: 'text-slate-600',
    dark: false,
  },
  {
    key: 'chargers',
    icon: 'plug',
    titleAr: 'شحن أسرع وأأمن',
    titleEn: 'Faster, safer charging',
    copyAr: 'GaN وPD لقدرة تناسب جهازك.',
    copyEn: 'GaN and PD power matched to your device.',
    href: '/chargers',
    image: '/images/home/cutouts/anker-nano-45w-smart-display-charger-cutout-cairovolt.png',
    className: 'md:col-span-3 bg-[#eef0ff] text-[#07111f]',
    imageClass: 'object-contain object-bottom p-2 drop-shadow-[0_18px_28px_rgba(15,23,42,.22)]',
    accent: 'text-indigo-700 bg-white/70 border-white',
    copyClass: 'text-slate-600',
    dark: false,
  },
  {
    key: 'cables',
    icon: 'cable',
    titleAr: 'الكابل الصح لجهازك',
    titleEn: 'The right cable, first time',
    copyAr: 'USB-C وLightning بقدرات واضحة.',
    copyEn: 'USB-C and Lightning, clearly labelled.',
    href: '/cables',
    image: '/images/home/cutouts/anker-a8050-usb-c-cable-cutout-cairovolt.png',
    className: 'md:col-span-3 bg-[#f5eee9] text-[#07111f]',
    imageClass: 'object-contain object-bottom p-2 drop-shadow-[0_18px_28px_rgba(15,23,42,.22)]',
    accent: 'text-amber-800 bg-white/70 border-white',
    copyClass: 'text-slate-600',
    dark: false,
  },
  {
    key: 'car',
    icon: 'car',
    titleAr: 'عربيتك أذكى',
    titleEn: 'A smarter drive',
    copyAr: 'حوامل وشواحن ثابتة على الطريق.',
    copyEn: 'Mounts and chargers for the road.',
    href: '/anker/car-chargers',
    image: '/images/home/cutouts/anker-a2216-magnetic-car-charger-cutout-cairovolt.png',
    className: 'md:col-span-3 bg-[#e9f6f2] text-[#07111f]',
    imageClass: 'object-contain object-bottom p-2 drop-shadow-[0_18px_28px_rgba(15,23,42,.22)]',
    accent: 'text-emerald-800 bg-white/70 border-white',
    copyClass: 'text-slate-600',
    dark: false,
  },
];

export default function ShopByNeed({ locale }: ShopByNeedProps) {
  const isAr = locale === 'ar';

  return (
    <section id="shop-by-need" className="bg-[#f5f6f8] py-16 text-[#07111f] lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-700">
              <SvgIcon name="compass" className="h-5 w-5" />
              {isAr ? 'ابدأ من احتياجك' : 'Start with what you need'}
            </span>
            <h2 className="mt-3 max-w-2xl font-outfit text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              {isAr ? 'مش لازم تحفظ أرقام الموديلات.' : 'You should not need to memorize model numbers.'}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-600 sm:text-base">
            {isAr
              ? 'قسمنا المتجر حسب المشكلة اللي عايز تحلها، عشان توصل للاختيار المناسب بأقل مجهود.'
              : 'We organized the store around the problem you want to solve, so the right choice takes less effort.'}
          </p>
        </div>

        <div className="grid auto-rows-[285px] grid-cols-1 gap-4 md:grid-cols-12">
          {categories.map((category) => (
            <Link
              key={category.key}
              href={localized(locale, category.href)}
              className={`group relative isolate overflow-hidden rounded-[1.75rem] border border-black/[0.05] shadow-[0_12px_40px_rgba(15,23,42,.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,.12)] ${category.className}`}
            >
              {/* Legibility glow stays BEHIND the product cutout — product
                  images must never sit under a darkening veil. */}
              {category.dark && (
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_75%,rgba(30,190,255,.18),transparent_35%),linear-gradient(180deg,rgba(7,17,31,.92)_0%,rgba(7,17,31,.62)_52%,rgba(7,17,31,.34)_100%)]" />
              )}
              {category.dark ? (
                <Image
                  src={category.image}
                  alt={isAr ? category.titleAr : category.titleEn}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`${category.imageClass} z-[1] transition duration-700 group-hover:scale-[1.04]`}
                />
              ) : (
                /* Physically-positioned wrapper (same pattern as BrandShowcase):
                   product pins to the inline-END corner in BOTH directions —
                   object-position percentages are physical and do NOT mirror. */
                <div className="absolute bottom-4 right-0 z-[1] h-1/2 w-3/5 rtl:left-0 rtl:right-auto">
                  <Image
                    src={category.image}
                    alt={isAr ? category.titleAr : category.titleEn}
                    fill
                    sizes="(max-width: 768px) 60vw, 15vw"
                    className={`${category.imageClass} transition duration-700 group-hover:scale-[1.04]`}
                  />
                </div>
              )}
              <div className="relative z-10 flex h-full flex-col items-start p-6 sm:p-7">
                {/* Icon + title share one row — pairs the glyph with its label
                    and reclaims the vertical gap that used to sit between them. */}
                <div className="flex items-center gap-3">
                  <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm ${category.accent}`}>
                    <SvgIcon name={category.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-outfit text-xl font-bold leading-tight tracking-tight sm:text-2xl">{isAr ? category.titleAr : category.titleEn}</h3>
                </div>
                <p className={`mt-3 max-w-[250px] text-sm leading-6 ${category.copyClass}`}>{isAr ? category.copyAr : category.copyEn}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold">
                  {isAr ? 'اكتشف الخيارات' : 'Explore options'}
                  <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">{isAr ? '←' : '→'}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
