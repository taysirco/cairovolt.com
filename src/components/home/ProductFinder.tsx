'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { showcaseProducts, finderExtraProducts, type ShowcaseProduct } from '@/data/showcase-products';
import { getBrandDisplayName, localizeArabicBrandNames } from '@/lib/arabic-brand-names';

interface ProductFinderProps {
  locale: string;
}

type Need = 'sound' | 'power' | 'charging' | 'cables' | 'car';
type Budget = 'any' | 'under-1000' | 'mid' | 'premium';

// Full finder pool: curated showcase + finder-only extras.
const finderPool: ShowcaseProduct[] = [...showcaseProducts, ...finderExtraProducts];

// Anker is the house flagship: Anker → Soundcore (Anker family) → Joyroom.
const brandRank: Record<string, number> = { Anker: 0, Soundcore: 1, Joyroom: 2 };

const matchesNeed = (product: ShowcaseProduct, need: Need) => {
  if (need === 'sound') return product.categorySlug === 'audio' || product.categorySlug === 'speakers';
  if (need === 'power') return product.categorySlug === 'power-banks';
  if (need === 'cables') return product.categorySlug === 'cables';
  if (need === 'car') return product.categorySlug === 'car-chargers';
  return product.categorySlug === 'wall-chargers';
};

const matchesBudget = (product: ShowcaseProduct, budget: Budget) => {
  if (budget === 'any') return true;
  if (budget === 'under-1000') return product.price < 1000;
  if (budget === 'mid') return product.price >= 1000 && product.price <= 2500;
  return product.price > 2500;
};

export default function ProductFinder({ locale }: ProductFinderProps) {
  const isAr = locale === 'ar';
  const [need, setNeed] = useState<Need>('sound');
  const [budget, setBudget] = useState<Budget>('any');

  const needProducts = useMemo(
    () =>
      finderPool
        .filter((product) => matchesNeed(product, need))
        .sort((a, b) => (brandRank[a.brand] ?? 3) - (brandRank[b.brand] ?? 3)),
    [need],
  );

  const exactMatches = useMemo(
    () => needProducts.filter((product) => matchesBudget(product, budget)),
    [budget, needProducts],
  );

  const isClosestFallback = budget !== 'any' && exactMatches.length === 0;
  const recommendations = (isClosestFallback ? needProducts : exactMatches).slice(0, 6);

  const needs: Array<{
    key: Need;
    icon: string;
    ar: string;
    en: string;
    feelAr: string;
    feelEn: string;
    resultAr: string;
    resultEn: string;
  }> = [
    {
      key: 'sound',
      icon: 'headphones',
      ar: 'عايز صوت أفضل',
      en: 'Better sound',
      feelAr: 'فاهمينك — دوشة المواصلات والشغل مش المفروض تبقى خلفية يومك.',
      feelEn: 'We get it — commutes and offices should not be the soundtrack of your day.',
      resultAr: 'اختيارات بعزل ضوضاء في الموديلات الداعمة',
      resultEn: 'Noise-cancelling options where the model supports it',
    },
    {
      key: 'power',
      icon: 'battery',
      ar: 'بطاريتي ما تخلصش',
      en: 'All-day power',
      feelAr: 'قلق الـ 1% في نص اليوم؟ اختار السعة والمخارج المناسبة لاستخدامك.',
      feelEn: 'Worried about reaching 1% mid-day? Choose the capacity and ports that fit your use.',
      resultAr: 'سعات ومخارج مختلفة حسب أجهزتك',
      resultEn: 'Different capacities and ports for different devices',
    },
    {
      key: 'charging',
      icon: 'bolt',
      ar: 'عايز أشحن أسرع',
      en: 'Faster charging',
      feelAr: 'اختار قدرة الشاحن والبروتوكول المناسبين لجهازك قبل الطلب.',
      feelEn: 'Match the charger wattage and protocol to your device before ordering.',
      resultAr: 'شواحن انكر بقدرات ومنافذ متعددة',
      resultEn: 'Anker chargers with multiple power and port options',
    },
    {
      key: 'cables',
      icon: 'cable',
      ar: 'كابل يستحمل',
      en: 'A cable that lasts',
      feelAr: 'اختار الطول والموصل والقدرة المناسبة، مع خيارات مضفرة للاستخدام اليومي.',
      feelEn: 'Choose the right length, connector, and power rating, with braided options for daily use.',
      resultAr: 'كابلات انكر بخيارات توصيل وقدرات مختلفة',
      resultEn: 'Anker cables with different connectors and power ratings',
    },
    {
      key: 'car',
      icon: 'car',
      ar: 'شحن في العربية',
      en: 'Charging in the car',
      feelAr: 'مشاوير طويلة والبطارية بتنزل؟ خلّي العربية محطة شحن — تركيب مرة واحدة وخلاص.',
      feelEn: 'Long drives draining the battery? Turn the car into a charging station — set it up once.',
      resultAr: 'عِدّة العربية: تثبيت وشحن من غير لخبطة وايرات',
      resultEn: 'Your car kit: mount and charge, no cable mess',
    },
  ];

  // Short catalogue-based reason for each suggestion.
  const whyPick: Record<string, { ar: string; en: string }> = {
    'anker-soundcore-r50i-nc': { ar: 'عزل ضوضاء نشط حسب مواصفات الموديل', en: 'Active noise cancellation in the model specification' },
    'anker-soundcore-k20i': { ar: 'تصميم خفيف للاستخدام اليومي', en: 'Lightweight design for daily use' },
    'joyroom-t03s-pro-earbuds': { ar: 'خيار بسعر اقتصادي', en: 'A lower-price option' },
    'anker-soundcore-flare-2': { ar: 'سبيكر محمول بإضاءة مدمجة', en: 'Portable speaker with integrated lighting' },
    'anker-zolo-a110e-20000': { ar: 'باور بانك بكابل مدمج', en: 'Power bank with a built-in cable' },
    'anker-prime-a1695-25000': { ar: 'قدرة تدعم لابتوبات متوافقة', en: 'Power output for compatible laptops' },
    'anker-nano-45w': { ar: 'قدرة 45 واط وتصميم مدمج', en: '45W output in a compact design' },
    'joyroom-20w-usb-c-charger': { ar: 'شاحن USB-C بقدرة 20 واط', en: '20W USB-C charger' },
    'anker-zolo-30w-a2698-charger': { ar: 'شاحن GaN مدمج بقدرة 30 واط', en: 'Compact 30W GaN charger' },
    'anker-nano-45w-smart-display-charger': { ar: 'شاشة مدمجة لمعلومات الشحن', en: 'Integrated charging-information display' },
    'anker-prime-a2669-67w-gan-charger': { ar: '3 منافذ — لابتوب وموبايلين مرة واحدة', en: '3 ports — laptop + two phones' },
    'anker-a8050-usb-c-cable': { ar: 'كابل USB-C بتشطيب مضفر', en: 'USB-C cable with a braided finish' },
    'anker-310-usb-c-lightning-cable': { ar: 'USB-C إلى Lightning؛ راجع توافق جهازك', en: 'USB-C to Lightning; check device compatibility' },
    'anker-zolo-usb-c-braided-cable': { ar: 'قدرة معلنة حتى 240 واط للأجهزة المتوافقة', en: 'Rated up to 240W for compatible devices' },
    'anker-a2216-magnetic-wireless-car-charger': { ar: 'مغناطيس — تثبيت وشحن بحركة واحدة', en: 'Magnetic — snap in, charge on' },
    'joyroom-60w-car-charger': { ar: 'كابلين سحّاب مدمجين — مفيش وايرات', en: 'Two built-in retractable cables' },
    'anker-prime-fusion-a1339-9600mah-65w': { ar: 'شاحن حائط وباور بانك في واحد', en: 'Wall charger + power bank in one' },
    'soundcore-a25i-earbuds': { ar: 'بطارية معلنة حتى 28 ساعة', en: 'Claimed battery life of up to 28 hours' },
  };

  const suggestedPick: Record<Need, string> = {
    sound: 'anker-soundcore-r50i-nc',
    power: 'anker-zolo-a110e-20000',
    charging: 'anker-nano-45w',
    cables: 'anker-a8050-usb-c-cable',
    car: 'anker-a2216-magnetic-wireless-car-charger',
  };

  const activeNeed = needs.find((option) => option.key === need) ?? needs[0];

  const budgets: Array<{ key: Budget; ar: string; en: string }> = [
    { key: 'any', ar: 'الأفضل لاحتياجي', en: 'Best match' },
    { key: 'under-1000', ar: 'أقل من 1,000', en: 'Under 1,000' },
    { key: 'mid', ar: '1,000–2,500', en: '1,000–2,500' },
    { key: 'premium', ar: 'أكثر من 2,500', en: 'Above 2,500' },
  ];

  return (
    <section id="smart-finder" className="bg-[#07111f] py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300">
              <SvgIcon name="brain" className="h-5 w-5" />
              {isAr ? 'مساعد الاختيار السريع' : 'Quick choice assistant'}
            </span>
            <h2 className="mt-4 font-outfit text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              {isAr ? 'قول لنا يومك محتاج إيه.' : 'Tell us what your day needs.'}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
              {isAr
                ? 'اختيارين بسيطين يضيقوا الاحتمالات ويوصلوك لأقرب نقطة بداية. النتيجة إرشادية وتقدر تفتح التفاصيل قبل الطلب.'
                : 'Two simple choices narrow the options to a useful starting point. The result is guidance, and you can review every detail before ordering.'}
            </p>

            <div className="mt-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-slate-400">{isAr ? '1. إيه اللي عايز تحسّنه؟' : '1. What do you want to improve?'}</p>
              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {needs.map((option) => {
                  const selected = need === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setNeed(option.key)}
                      aria-pressed={selected}
                      className={`flex min-h-13 items-center gap-3 rounded-2xl border px-4 py-3 text-start text-sm font-semibold transition ${selected ? 'border-cyan-300/50 bg-cyan-300/12 text-white' : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/[0.07]'}`}
                    >
                      <SvgIcon name={option.icon} className={`h-5 w-5 ${selected ? 'text-cyan-300' : 'text-slate-400'}`} />
                      {isAr ? option.ar : option.en}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Empathy echo: the section answers the choice in the customer's
                own words before showing products — feel understood first. */}
            <p key={activeNeed.key} className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] px-4 py-3 text-sm leading-7 text-cyan-50">
              {isAr ? activeNeed.feelAr : activeNeed.feelEn}
            </p>

            <div className="mt-6">
              <p className="mb-1 text-xs font-bold uppercase tracking-[.14em] text-slate-400">{isAr ? '2. الميزانية المريحة؟' : '2. Your comfortable budget?'}</p>
              <p className="mb-3 text-xs leading-5 text-slate-500">
                {isAr ? 'مفيش إجابة صح وغلط — بنرشّح على قد ميزانيتك.' : 'No wrong answer — we match what fits you.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {budgets.map((option) => {
                  const selected = budget === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setBudget(option.key)}
                      aria-pressed={selected}
                      className={`min-h-10 rounded-full border px-4 py-2 text-xs font-semibold transition ${selected ? 'border-white bg-white text-[#07111f]' : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25'}`}
                    >
                      {isAr ? option.ar : option.en} {option.key !== 'any' && (isAr ? 'ج.م' : 'EGP')}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.14em] text-cyan-300">{isAr ? 'مرشّحة مخصوص ليك' : 'Picked for your day'}</p>
                <h3 className="mt-1 font-outfit text-2xl font-bold">{isAr ? activeNeed.resultAr : activeNeed.resultEn}</h3>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-slate-300">{recommendations.length} {isAr ? 'نتائج' : 'matches'}</span>
            </div>

            {isClosestFallback && (
              <p className="mb-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-xs leading-6 text-amber-100">
                {isAr
                  ? 'مفيش تطابق دقيق في الاختيارات المختصرة ضمن الميزانية دي؛ بنعرض أقرب بدائل لنفس الاحتياج.'
                  : 'There is no exact match in this short list at that budget, so these are the closest options for the same need.'}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
              {recommendations.map((product) => (
                <Link
                  key={product.slug}
                  href={`${locale === 'ar' ? '' : '/en'}${product.href}`}
                  className="group overflow-hidden rounded-[1.5rem] bg-white text-[#07111f] transition duration-500 hover:-translate-y-1"
                >
                  <div className="relative aspect-square bg-[#f4f5f7]">
                    <Image
                      src={product.image.replace('-thumb.webp', '-480.webp')}
                      alt={isAr ? localizeArabicBrandNames(product.name.ar) : product.name.en}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.035]"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[.14em] text-blue-700">{getBrandDisplayName(product.brand, locale)}</span>
                      {suggestedPick[need] === product.slug && (
                        <span className="rounded-full bg-[#07111f] px-2 py-1 text-[10px] font-bold text-amber-300">
                          {isAr ? '⭐ اختيار مقترح' : '⭐ Suggested pick'}
                        </span>
                      )}
                    </div>
                    <h4 className="mt-1 line-clamp-2 min-h-10 text-sm font-bold leading-5">{isAr ? localizeArabicBrandNames(product.name.ar) : product.name.en}</h4>
                    {whyPick[product.slug] && (
                      <p className="mt-1 line-clamp-1 text-[11px] leading-5 text-slate-500">
                        {isAr ? whyPick[product.slug].ar : whyPick[product.slug].en}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                      <strong className="font-outfit text-xl">{product.price.toLocaleString('en-US')}</strong>
                      <span className="text-xs text-slate-500">{isAr ? 'ج.م' : 'EGP'}</span>
                      {product.originalPrice > product.price && (
                        <>
                          <span className="text-xs text-slate-400 line-through">{product.originalPrice.toLocaleString('en-US')}</span>
                          <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-extrabold text-white">
                            {isAr ? `خصم ${Math.round((1 - product.price / product.originalPrice) * 100)}%` : `-${Math.round((1 - product.price / product.originalPrice) * 100)}%`}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Purchase details shown alongside the recommendations. */}
            {recommendations.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-xs text-slate-300">
                {[
                  { icon: 'check-circle', ar: 'بيانات المنتج موضحة', en: 'Product details provided' },
                  { icon: 'shield', ar: 'ضمان كايرو فولت حسب المنتج', en: 'Product-specific CairoVolt warranty' },
                  { icon: 'money', ar: 'ادفع لما يوصلك', en: 'Pay when it arrives' },
                ].map((item) => (
                  <span key={item.icon} className="flex items-center gap-1.5">
                    <SvgIcon name={item.icon} className="h-4 w-4 text-emerald-300" />
                    {isAr ? item.ar : item.en}
                  </span>
                ))}
              </div>
            )}

            {recommendations.length === 0 && (
              <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-300">
                {isAr ? 'جرّب ميزانية مختلفة لعرض اقتراحات أقرب.' : 'Try a different budget to see closer suggestions.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
