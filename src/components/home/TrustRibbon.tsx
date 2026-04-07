'use client';

import React from 'react';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface TrustRibbonProps {
  locale: string;
}

const trustItems = [
  { icon: 'check-circle', en: '100% Authentic Barcode', ar: 'باركود أصلي 100%', color: 'text-green-400' },
  { icon: 'truck', en: 'All Egypt Delivery · 1-5 Days', ar: 'نوصل كل مصر · 1-5 أيام', color: 'text-blue-400' },
  { icon: 'money', en: 'Cash on Delivery', ar: 'ادفع كاش عند الاستلام', color: 'text-amber-400' },
  { icon: 'shield', en: '18-Month Warranty', ar: 'كفالة 18 شهر — استبدال فوري', color: 'text-purple-400' },
];

export default function TrustRibbon({ locale }: TrustRibbonProps) {
  const isAr = locale === 'ar';

  return (
    <section
      id="trust-ribbon"
      className="relative overflow-hidden border-y border-white/5"
      style={{
        background: 'linear-gradient(90deg, rgba(59,130,246,0.05) 0%, rgba(16,185,129,0.05) 50%, rgba(139,92,246,0.05) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 gap-2 overflow-x-auto scrollbar-hide">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 flex-shrink-0 px-3 py-1.5"
            >
              <div className={`${item.color} animate-trust-pulse`} style={{ animationDelay: `${idx * 0.2}s` }}>
                <SvgIcon name={item.icon} className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-300 whitespace-nowrap">
                {isAr ? item.ar : item.en}
              </span>
              {idx < trustItems.length - 1 && (
                <div className="hidden lg:block h-4 w-px bg-white/10 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
