'use client';

import React from 'react';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface BrandShowcaseProps {
  locale: string;
}

const brands = [
  {
    name: 'Anker',
    color: '#3b82f6',
    gradient: 'from-blue-600/20 to-blue-900/20',
    borderColor: 'border-blue-500/20 hover:border-blue-500/40',
    textColor: 'text-blue-400',
    tagline: { en: '#1 Charging Brand Worldwide', ar: 'العلامة #1 عالمياً في الشحن' },
    desc: { en: '200M+ users trust Anker for premium charging', ar: 'أكثر من 200 مليون مستخدم حول العالم' },
    categories: [
      { icon: 'battery', name: { en: 'Power Banks', ar: 'باور بانك' }, href: '/anker/power-banks' },
      { icon: 'plug', name: { en: 'Chargers', ar: 'شواحن' }, href: '/anker/chargers' },
      { icon: 'cable', name: { en: 'Cables', ar: 'كابلات' }, href: '/anker/cables' },
      { icon: 'headphones', name: { en: 'Soundcore', ar: 'سماعات' }, href: '/anker/audio' },
    ],
    href: '/anker',
    letter: 'A',
  },
  {
    name: 'Joyroom',
    color: '#ef4444',
    gradient: 'from-red-600/20 to-red-900/20',
    borderColor: 'border-red-500/20 hover:border-red-500/40',
    textColor: 'text-red-400',
    tagline: { en: 'Premium Quality, Smart Pricing', ar: 'جودة عالية بأسعار مناسبة' },
    desc: { en: 'HERO T03s best-selling earbuds in Egypt', ar: 'سماعة T03s الأكثر مبيعاً في مصر' },
    categories: [
      { icon: 'headphones', name: { en: 'Earbuds', ar: 'سماعات' }, href: '/joyroom/audio' },
      { icon: 'battery', name: { en: 'Power Banks', ar: 'باور بانك' }, href: '/joyroom/power-banks' },
      { icon: 'cable', name: { en: 'Cables', ar: 'كابلات' }, href: '/joyroom/cables' },
      { icon: 'plug', name: { en: 'Chargers', ar: 'شواحن' }, href: '/joyroom/chargers' },
    ],
    href: '/joyroom',
    letter: 'J',
  },
];

export default function BrandShowcase({ locale }: BrandShowcaseProps) {
  const isAr = locale === 'ar';

  return (
    <section id="brand-showcase" className="py-16 lg:py-20" style={{ background: '#0a0f1c' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white font-outfit">
            {isAr ? 'تسوق حسب العلامة التجارية' : 'Shop by Brand'}
          </h2>
          <p className="text-slate-400 mt-2 text-lg">
            {isAr ? 'الوكيل المعتمد الرسمي في مصر' : 'Official Authorized Distributor in Egypt'}
          </p>
        </div>

        {/* Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${brand.gradient} border ${brand.borderColor} transition-all duration-500 hover:shadow-2xl`}
              style={{ '--brand-color': brand.color } as React.CSSProperties}
            >
              {/* Large background letter */}
              <div
                className={`absolute ${isAr ? '-left-6' : '-right-6'} -bottom-10 text-[200px] font-black leading-none opacity-[0.03] select-none pointer-events-none`}
                style={{ color: brand.color }}
              >
                {brand.letter}
              </div>

              <div className="relative p-6 lg:p-8 space-y-5">
                {/* Brand Title */}
                <div>
                  <h3 className={`text-3xl font-black ${brand.textColor} font-outfit`}>
                    {brand.name}
                  </h3>
                  <p className="text-lg font-medium text-slate-300 mt-1">
                    {isAr ? brand.tagline.ar : brand.tagline.en}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {isAr ? brand.desc.ar : brand.desc.en}
                  </p>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                  {brand.categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={`/${locale}${cat.href}`}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-200 text-sm text-slate-300 hover:text-white"
                    >
                      <SvgIcon name={cat.icon} className="w-4 h-4 opacity-60" />
                      <span>{isAr ? cat.name.ar : cat.name.en}</span>
                    </Link>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/${locale}${brand.href}`}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl ${brand.textColor} bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] font-semibold text-sm transition-all duration-300 group/btn`}
                >
                  {isAr ? `تصفح كل ${brand.name}` : `Browse All ${brand.name}`}
                  <span className={`transition-transform duration-300 ${isAr ? 'group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`}>
                    {isAr ? '←' : '→'}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
