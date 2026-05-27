'use client';

import React from 'react';
import { InstantLink as Link } from '@/components/ui/InstantLink';
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
      // Soundcore is Anker's audio sub-brand — route the pill to the dedicated hub
      { icon: 'headphones', name: { en: 'Soundcore Audio →', ar: 'ساوند كور →' }, href: '/soundcore' },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
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
                  <p className="text-sm text-slate-400 mt-0.5">
                    {isAr ? brand.desc.ar : brand.desc.en}
                  </p>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                  {brand.categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={`${locale === 'ar' ? '' : '/en'}${cat.href}`}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-200 text-sm text-slate-300 hover:text-white"
                    >
                      <SvgIcon name={cat.icon} className="w-4 h-4 opacity-60" />
                      <span>{isAr ? cat.name.ar : cat.name.en}</span>
                    </Link>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`${locale === 'ar' ? '' : '/en'}${brand.href}`}
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

        {/* Sub-brand spotlight — Soundcore (Anker's audio family) */}
        <Link
          href={`${locale === 'ar' ? '' : '/en'}/soundcore`}
          className="group relative block overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600/20 via-red-600/20 to-pink-700/20 border border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/20"
        >
          <div
            className={`absolute ${isAr ? '-left-8' : '-right-8'} -bottom-16 text-[180px] font-black leading-none opacity-[0.04] select-none pointer-events-none text-orange-400`}
          >
            S
          </div>
          <div className="relative p-6 lg:p-8 flex flex-col md:flex-row items-center md:items-stretch gap-5 md:gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 bg-orange-500/15 border border-orange-500/30 rounded-full text-orange-300 text-xs font-bold">
                {isAr ? '🎧 العلامة الفرعية للصوتيات من Anker' : '🎧 Anker\'s Audio Sub-Brand'}
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-orange-300 font-outfit">
                Soundcore
                <span className="text-base font-medium text-slate-400 ms-3">
                  {isAr ? 'ساوند كور' : 'by Anker'}
                </span>
              </h3>
              <p className="text-base md:text-lg font-medium text-slate-300 mt-2">
                {isAr
                  ? '100 مليون مستخدم — Hi-Res Audio معتمد — أكثر من 30 موديل في مصر'
                  : '100M+ users — Hi-Res Audio certified — 30+ models in Egypt'}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Link
                  href={`${locale === 'ar' ? '' : '/en'}/soundcore/audio`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-200 text-sm text-slate-300 hover:text-orange-200"
                >
                  <SvgIcon name="headphones" className="w-4 h-4 opacity-70" />
                  <span>{isAr ? 'ايربودز + هيدفون' : 'Earbuds & Headphones'}</span>
                </Link>
                <Link
                  href={`${locale === 'ar' ? '' : '/en'}/soundcore/speakers`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-200 text-sm text-slate-300 hover:text-orange-200"
                >
                  <SvgIcon name="speaker" className="w-4 h-4 opacity-70" />
                  <span>{isAr ? 'سبيكرات بلوتوث' : 'Bluetooth Speakers'}</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-orange-200 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 font-semibold text-sm transition-all duration-300">
                {isAr ? 'افتح مركز ساوند كور' : 'Open Soundcore Hub'}
                <span className={`transition-transform duration-300 ${isAr ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                  {isAr ? '←' : '→'}
                </span>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
