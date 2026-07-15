import Image from 'next/image';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface BrandShowcaseProps {
  locale: string;
}

const hrefFor = (locale: string, path: string) => (locale === 'ar' ? path : `/en${path}`);

export default function BrandShowcase({ locale }: BrandShowcaseProps) {
  const isAr = locale === 'ar';

  return (
    <section id="brand-showcase" className="bg-[#f5f6f8] py-16 text-[#07111f] lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-violet-700">
            <SvgIcon name="sparkles" className="h-5 w-5" />
            {isAr ? 'اختار الشخصية اللي شبه يومك' : 'Choose the personality that fits your day'}
          </span>
          <h2 className="mt-3 font-outfit text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            {isAr ? 'ثلاث عائلات. كل واحدة بتحل حاجة مختلفة.' : 'Three families. Each solves a different need.'}
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="group relative isolate overflow-hidden rounded-[2rem] bg-[#090713] text-white shadow-[0_24px_70px_rgba(15,23,42,.16)] lg:col-span-2 lg:min-h-[510px]">
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_45%,rgba(124,58,237,.38),transparent_32%),radial-gradient(circle_at_40%_100%,rgba(6,182,212,.2),transparent_38%)]" />
            <div className="relative z-10 flex max-w-xl flex-col p-7 sm:p-10 lg:min-h-[510px] lg:justify-center lg:p-14">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs font-bold text-violet-100">
                <SvgIcon name="headphones" className="h-4 w-4" />
                {isAr ? 'ساوندكور من انكر' : 'Soundcore by Anker'}
              </span>
              <h3 className="mt-5 font-outfit text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                {isAr ? 'اسمع كل تفصيلة.' : 'Feel every detail.'}
              </h3>
              <p className="mt-4 max-w-md text-base leading-8 text-slate-300">
                {isAr
                  ? 'من سماعة للمواصلات، لهيدفون يساعدك تركز، لسبيكر يغيّر جو المكان — اختار الصوت على حسب اللحظة.'
                  : 'From commute earbuds to focus headphones and room-filling speakers — choose sound around the moment.'}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-200">
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2">{isAr ? 'عزل ضوضاء' : 'ANC'}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2">Hi-Res Audio</span>
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2">{isAr ? 'بطارية طويلة' : 'Long battery'}</span>
              </div>
              <Link
                href={hrefFor(locale, '/soundcore')}
                className="mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#090713] transition hover:-translate-y-0.5 hover:bg-violet-50"
              >
                {isAr ? 'استكشف عالم ساوندكور' : 'Explore Soundcore'}
                <span>{isAr ? '←' : '→'}</span>
              </Link>
            </div>

            {/* Media panel flows UNDER the copy on mobile (no text-over-product
                overlap) and pins to the side column from lg up. */}
            <div className="relative mx-5 mb-5 h-72 overflow-hidden rounded-[1.6rem] bg-[#ece9ff] sm:mx-7 sm:mb-7 sm:h-80 lg:absolute lg:inset-y-7 lg:right-7 lg:mx-0 lg:mb-0 lg:h-auto lg:w-[47%] rtl:lg:left-7 rtl:lg:right-auto">
              <Image
                src="/images/home/cutouts/soundcore-liberty-5-tws-earbuds-cutout-cairovolt.png"
                alt={isAr ? 'سماعات ساوندكور Liberty 5' : 'Soundcore Liberty 5 earbuds'}
                fill
                sizes="(max-width: 1024px) 100vw, 47vw"
                className="object-contain p-7 drop-shadow-[0_25px_35px_rgba(15,23,42,.25)] transition duration-700 group-hover:scale-[1.035] sm:p-10"
              />
            </div>
          </article>

          <article className="group relative isolate min-h-[440px] overflow-hidden rounded-[2rem] border border-blue-100 bg-[#e8f3ff] p-7 sm:p-9">
            <div className="relative z-10 max-w-[60%] sm:max-w-[55%]">
              <span className="text-xs font-black uppercase tracking-[.18em] text-blue-700">{isAr ? 'انكر' : 'Anker'}</span>
              <h3 className="mt-3 font-outfit text-3xl font-bold tracking-tight sm:text-4xl">
                {isAr ? 'طاقة تثق فيها.' : 'Power you can trust.'}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {isAr ? 'باور بانك، شواحن وكابلات لقدرة واضحة من غير حيرة.' : 'Power banks, chargers, and cables with power that is easy to understand.'}
              </p>
              <Link href={hrefFor(locale, '/anker')} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-800">
                {isAr ? 'تسوق انكر' : 'Shop Anker'}
                <span>{isAr ? '←' : '→'}</span>
              </Link>
            </div>
            {/* Core-utility fractions only: this project's Tailwind v4 dev
                pipeline drops freshly-introduced arbitrary values. Shorter on
                mobile so the product never crosses the copy column. */}
            <div className="absolute bottom-4 right-0 h-1/2 w-3/5 sm:h-2/3 rtl:left-0 rtl:right-auto">
              <Image
                src="/images/home/cutouts/anker-nano-45w-smart-display-charger-cutout-cairovolt.png"
                alt={isAr ? 'انكر Nano 45W' : 'Anker Nano 45W'}
                fill
                sizes="(max-width: 1024px) 65vw, 32vw"
                className="object-contain object-bottom p-2 drop-shadow-[0_18px_28px_rgba(15,23,42,.22)] transition duration-700 group-hover:scale-105"
              />
            </div>
          </article>

          <article className="group relative isolate min-h-[440px] overflow-hidden rounded-[2rem] border border-emerald-100 bg-[#eaf7f1] p-7 sm:p-9">
            <div className="relative z-10 max-w-[60%] sm:max-w-[55%]">
              <span className="text-xs font-black uppercase tracking-[.18em] text-emerald-700">Joyroom</span>
              <h3 className="mt-3 font-outfit text-3xl font-bold tracking-tight sm:text-4xl">
                {isAr ? 'ذكاء في كل جنيه.' : 'More sense per pound.'}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {isAr ? 'مواصفات مفيدة وسعر عملي للاستخدام اليومي.' : 'Useful features and practical prices for everyday use.'}
              </p>
              <Link href={hrefFor(locale, '/joyroom')} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
                {isAr ? 'تسوق Joyroom' : 'Shop Joyroom'}
                <span>{isAr ? '←' : '→'}</span>
              </Link>
            </div>
            <div className="absolute bottom-4 right-0 h-1/2 w-3/5 sm:h-2/3 rtl:left-0 rtl:right-auto">
              <Image
                src="/images/home/cutouts/joyroom-3-in-1-wireless-charging-station-cutout-cairovolt.png"
                alt={isAr ? 'محطة شحن Joyroom 3 في 1' : 'Joyroom 3-in-1 charging station'}
                fill
                sizes="(max-width: 1024px) 65vw, 32vw"
                className="object-contain object-bottom p-2 drop-shadow-[0_18px_28px_rgba(15,23,42,.22)] transition duration-700 group-hover:scale-105"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
