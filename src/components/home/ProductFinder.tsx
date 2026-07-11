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

  const needs: Array<{ key: Need; icon: string; ar: string; en: string }> = [
    { key: 'sound', icon: 'headphones', ar: 'عايز صوت أفضل', en: 'Better sound' },
    { key: 'power', icon: 'battery', ar: 'بطاريتي ما تخلصش', en: 'All-day power' },
    { key: 'charging', icon: 'bolt', ar: 'عايز أشحن أسرع', en: 'Faster charging' },
  ];

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

            <div className="mt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.14em] text-slate-400">{isAr ? '2. الميزانية المريحة؟' : '2. Your comfortable budget?'}</p>
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
                <p className="text-xs font-bold uppercase tracking-[.14em] text-cyan-300">{isAr ? 'نقطة بداية مناسبة' : 'A useful starting point'}</p>
                <h3 className="mt-1 font-outfit text-2xl font-bold">{isAr ? 'اختياراتك الأقرب' : 'Your closest matches'}</h3>
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
                    <span className="text-[10px] font-bold uppercase tracking-[.14em] text-blue-700">{product.brand}</span>
                    <h4 className="mt-1 line-clamp-2 min-h-10 text-sm font-bold leading-5">{isAr ? product.name.ar : product.name.en}</h4>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <strong className="font-outfit text-xl">{product.price.toLocaleString()}</strong>
                      <span className="text-xs text-slate-500">{isAr ? 'ج.م' : 'EGP'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

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
