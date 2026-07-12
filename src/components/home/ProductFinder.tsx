'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { showcaseProducts, type ShowcaseProduct } from '@/data/showcase-products';

interface ProductFinderProps {
  locale: string;
}

type Need = 'sound' | 'power' | 'charging';
type Budget = 'any' | 'under-1000' | 'mid' | 'premium';

const matchesNeed = (product: ShowcaseProduct, need: Need) => {
  if (need === 'sound') return product.categorySlug === 'audio' || product.categorySlug === 'speakers';
  if (need === 'power') return product.categorySlug === 'power-banks';
  return product.categorySlug === 'wall-chargers' || product.categorySlug === 'cables';
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
    () => showcaseProducts.filter((product) => matchesNeed(product, need)),
    [need],
  );

  const exactMatches = useMemo(
    () => needProducts.filter((product) => matchesBudget(product, budget)),
    [budget, needProducts],
  );

  const isClosestFallback = budget !== 'any' && exactMatches.length === 0;
  const recommendations = (isClosestFallback ? needProducts : exactMatches).slice(0, 3);

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
      resultAr: 'اختيارات بتقفل الدوشة وتفتح مزاجك',
      resultEn: 'Picks that mute the noise and lift your mood',
    },
    {
      key: 'power',
      icon: 'battery',
      ar: 'بطاريتي ما تخلصش',
      en: 'All-day power',
      feelAr: 'قلق الـ 1% في نص اليوم؟ خلّيه ذكرى — دي طاقة تمشي معاك لآخر مشوار.',
      feelEn: 'That 1% anxiety mid-day? Make it history — power that outlasts your day.',
      resultAr: 'طاقة تكفي يومك كله من غير ما تدوّر على فيشة',
      resultEn: 'Power for your whole day — no outlet hunting',
    },
    {
      key: 'charging',
      icon: 'bolt',
      ar: 'عايز أشحن أسرع',
      en: 'Faster charging',
      feelAr: 'ربع ساعة قبل ما تنزل تفرق — شحن أسرع وأأمن يلحق إيقاعك.',
      feelEn: 'Fifteen minutes before you leave should count — faster, safer charging that keeps up.',
      resultAr: 'شحن أسرع وأأمن يلحق إيقاع يومك',
      resultEn: 'Faster, safer charging that keeps your pace',
    },
  ];

  // Why-this-pick: one concrete, feelable benefit per curated product.
  const whyPick: Record<string, { ar: string; en: string }> = {
    'anker-soundcore-r50i-nc': { ar: 'عزل 42dB — سكوت فوري للزحمة', en: '42dB ANC — instant quiet' },
    'anker-soundcore-k20i': { ar: 'خفيفة ومريحة لليوم كله', en: 'Light and comfy all day' },
    'joyroom-t03s-pro-earbuds': { ar: 'أذكى بداية بأقل ميزانية', en: 'The smartest budget start' },
    'anker-soundcore-flare-2': { ar: 'صوت يملأ المكان وإضاءة حفلة', en: 'Room-filling sound, party light' },
    'anker-zolo-a110e-20000': { ar: 'بكابل مدمج — مش هتنسى الكابل تاني', en: 'Built-in cable — never forgotten' },
    'anker-prime-a1695-25000': { ar: 'قوة تشحن اللابتوب نفسه', en: 'Charges your laptop too' },
    'anker-nano-45w': { ar: 'صغير وبشاشة ذكية تطمّنك', en: 'Tiny, with a smart display' },
    'joyroom-20w-usb-c-charger': { ar: 'الأساسي اليومي بسعر مريح', en: 'The easy everyday pick' },
  };

  // The community favourite for each need — social proof at the decision moment.
  const popularPick: Record<Need, string> = {
    sound: 'anker-soundcore-r50i-nc',
    power: 'anker-zolo-a110e-20000',
    charging: 'anker-nano-45w',
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
                      alt={isAr ? product.name.ar : product.name.en}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.035]"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[.14em] text-blue-700">{product.brand}</span>
                      {popularPick[need] === product.slug && (
                        <span className="rounded-full bg-[#07111f] px-2 py-1 text-[10px] font-bold text-amber-300">
                          {isAr ? '⭐ الأكثر طلبًا' : '⭐ Most requested'}
                        </span>
                      )}
                    </div>
                    <h4 className="mt-1 line-clamp-2 min-h-10 text-sm font-bold leading-5">{isAr ? product.name.ar : product.name.en}</h4>
                    {whyPick[product.slug] && (
                      <p className="mt-1 line-clamp-1 text-[11px] leading-5 text-slate-500">
                        {isAr ? whyPick[product.slug].ar : whyPick[product.slug].en}
                      </p>
                    )}
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <strong className="font-outfit text-xl">{product.price.toLocaleString()}</strong>
                      <span className="text-xs text-slate-500">{isAr ? 'ج.م' : 'EGP'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Decision-moment reassurance: remove the last worries exactly
                where the customer commits. */}
            {recommendations.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-xs text-slate-300">
                {[
                  { icon: 'check-circle', ar: 'أصلي ويمكن التحقق منه', en: 'Verifiably original' },
                  { icon: 'shield', ar: 'ضمان حسب المنتج', en: 'Product-specific warranty' },
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
