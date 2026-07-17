import React from 'react';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface TrustRibbonProps {
  locale: string;
}

const trustItems = [
  {
    icon: 'check-circle',
    en: 'CairoVolt warranty records',
    ar: 'سجل ضمان كايرو فولت',
    detailEn: 'Check an issued warranty-card serial',
    detailAr: 'راجع سيريال كرت الضمان الصادر من كايرو فولت',
  },
  {
    icon: 'truck',
    en: 'Delivery within Egypt',
    ar: 'توصيل داخل مصر',
    detailEn: 'Address eligibility confirmed with the order',
    detailAr: 'تُؤكد أهلية العنوان مع الطلب',
  },
  {
    icon: 'money',
    en: 'Cash on delivery',
    ar: 'ادفع عند الاستلام',
    detailEn: 'Available on eligible orders',
    detailAr: 'متاح للطلبات المؤهلة',
  },
  {
    icon: 'shield',
    en: 'Clear CairoVolt warranty per product',
    ar: 'ضمان كايرو فولت واضح حسب المنتج',
    detailEn: 'No one-size-fits-all claims',
    detailAr: 'من غير وعود عامة مبهمة',
  },
];

export default function TrustRibbon({ locale }: TrustRibbonProps) {
  const isAr = locale === 'ar';

  return (
    <section id="trust-ribbon" className="border-b border-slate-200 bg-white text-[#07111f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 rtl:divide-x-reverse md:grid-cols-4 md:divide-y-0">
          {trustItems.map((item) => (
            <div key={item.icon} className="flex min-h-28 items-start gap-3 px-3 py-6 sm:px-5 lg:px-7">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <SvgIcon name={item.icon} className="h-[18px] w-[18px]" />
              </span>
              <span>
                <strong className="block text-sm leading-5">{isAr ? item.ar : item.en}</strong>
                <span className="mt-1 block text-[11px] leading-5 text-slate-500 sm:text-xs">
                  {isAr ? item.detailAr : item.detailEn}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
