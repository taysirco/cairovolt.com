'use client';

import { useTranslations } from 'next-intl';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface ComparisonTableProps {
    product: {
        slug: string;
        brand: string;
        price: number;
        translations: {
            en: { name: string };
            ar: { name: string };
        };
    };
    competitors?: Array<{
        name: string;
        price: number | string;
        warranty: string;
        delivery: string;
        original: boolean;
    }>;
    locale: string;
}

// Default competitors for Anker products
const defaultAnkerCompetitors = {
    en: [
        { name: 'Amazon Egypt', price: 'Higher', warranty: '12 months (international)', delivery: '5-7 days', original: true },
        { name: 'Noon', price: 'Similar', warranty: 'Varies', delivery: '2-5 days', original: true },
        { name: 'Local Shops', price: 'Higher', warranty: 'None', delivery: 'Immediate', original: false },
    ],
    ar: [
        { name: 'أمازون مصر', price: 'أعلى', warranty: '12 شهر (دولي)', delivery: '5-7 أيام', original: true },
        { name: 'نون', price: 'مماثل', warranty: 'متغير', delivery: '2-5 أيام', original: true },
        { name: 'المحلات المحلية', price: 'أعلى', warranty: 'لا يوجد', delivery: 'فوري', original: false },
    ],
};

export function ProductComparisonTable({ product, competitors, locale }: ComparisonTableProps) {
    const isArabic = locale === 'ar';

    const defaultComps = isArabic ? defaultAnkerCompetitors.ar : defaultAnkerCompetitors.en;
    const comps = competitors || defaultComps;

    const labels = isArabic ? {
        title: 'مقارنة الأسعار',
        store: 'المتجر',
        price: 'السعر',
        warranty: 'الضمان',
        delivery: 'التوصيل',
        original: 'منتج أصلي؟',
        yes: 'نعم ✓',
        no: 'غير مؤكد',
        ourStore: 'كايرو فولت (نحن)',
        egp: 'جنيه',
        months: 'شهر',
        days: 'أيام',
        free: 'مجاني',
    } : {
        title: 'Price Comparison',
        store: 'Store',
        price: 'Price',
        warranty: 'Warranty',
        delivery: 'Delivery',
        original: 'Original?',
        yes: 'Yes ✓',
        no: 'Uncertain',
        ourStore: 'Cairo Volt (Us)',
        egp: 'EGP',
        months: 'months',
        days: 'days',
        free: 'Free',
    };

    const productName = isArabic ? product.translations.ar.name : product.translations.en.name;
    const warrantyMonths = product.brand === 'Anker' ? 18 : 12;

    return (
        <div className="my-6 md:my-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 md:p-6 shadow-lg">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                <SvgIcon name="chart" className="w-6 h-6" />
                {labels.title}
            </h3>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b-2 border-blue-200 dark:border-gray-700">
                            <th className="py-2 px-2 md:py-3 md:px-4 text-start font-semibold">{labels.store}</th>
                            <th className="py-2 px-2 md:py-3 md:px-4 text-start font-semibold">{labels.price}</th>
                            <th className="py-2 px-2 md:py-3 md:px-4 text-start font-semibold">{labels.warranty}</th>
                            <th className="py-2 px-2 md:py-3 md:px-4 text-start font-semibold">{labels.delivery}</th>
                            <th className="py-2 px-2 md:py-3 md:px-4 text-start font-semibold">{labels.original}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Our Store - Highlighted */}
                        <tr className="bg-green-100 dark:bg-green-900/30 font-medium">
                            <td className="py-2 px-2 md:py-3 md:px-4 flex items-center gap-1 md:gap-2">
                                <SvgIcon name="star" className="w-4 h-4 text-amber-400" />
                                <span className="text-xs md:text-sm">{labels.ourStore}</span>
                            </td>
                            <td className="py-2 px-2 md:py-3 md:px-4 text-green-700 dark:text-green-400 font-bold">
                                {product.price} <span className="text-xs">{labels.egp}</span>
                            </td>
                            <td className="py-2 px-2 md:py-3 md:px-4">
                                <span className="bg-green-200 dark:bg-green-800 px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[10px] md:text-xs font-semibold whitespace-nowrap">
                                    {warrantyMonths} {labels.months} ✓
                                </span>
                            </td>
                            <td className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm">
                                1-3 {labels.days}
                                {product.price >= 500 && (
                                    <span className="ms-1 text-green-600 text-[10px] md:text-xs block md:inline">({labels.free})</span>
                                )}
                            </td>
                            <td className="py-2 px-2 md:py-3 md:px-4 text-green-600 dark:text-green-400 font-bold text-xs md:text-sm">
                                {labels.yes}
                            </td>
                        </tr>

                        {/* Competitors */}
                        {comps.map((comp, index) => (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm">{comp.name}</td>
                                <td className="py-2 px-2 md:py-3 md:px-4 text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                                    {typeof comp.price === 'number' ? `${comp.price} ${labels.egp}` : comp.price}
                                </td>
                                <td className="py-2 px-2 md:py-3 md:px-4 text-gray-600 dark:text-gray-400 text-xs md:text-sm">{comp.warranty}</td>
                                <td className="py-2 px-2 md:py-3 md:px-4 text-gray-600 dark:text-gray-400 text-xs md:text-sm">{comp.delivery}</td>
                                <td className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm">
                                    {comp.original ? (
                                        <span className="text-green-600">{labels.yes}</span>
                                    ) : (
                                        <span className="text-orange-500">{labels.no}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Trust Signal */}
            {(() => {
                const seedStr = product.slug || '';
                const catHash = seedStr.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
                const arTrustLines = [
                    '* نحن الموزع المعتمد لأنكر وجوي روم في مصر - ضمان رسمي 100%',
                    '* كل منتج مختوم بباركود الشركة الأصلي وعليه كفالة استبدال فوري',
                    '* معتمدون رسمياً من Anker و Joyroom — سجل تجاري 8446',
                ];
                const enTrustLines = [
                    '* We are the authorized dealer for Anker & Joyroom in Egypt - 100% Official Warranty',
                    '* Every product sealed with company barcode and backed by instant replacement coverage',
                    '* Officially authorized by Anker & Joyroom — Commercial Registry 8446',
                ];
                return (
                    <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                        {isArabic ? arTrustLines[catHash % arTrustLines.length] : enTrustLines[catHash % enTrustLines.length]}
                    </p>
                );
            })()}
        </div>
    );
}

// Category Comparison Table
interface CategoryComparisonProps {
    products: Array<{
        name: string;
        price: number;
        badge?: string;
    }>;
    categoryName: string;
    locale: string;
}

export function CategoryComparisonTable({ products, categoryName, locale }: CategoryComparisonProps) {
    const isArabic = locale === 'ar';
    const labels = isArabic ? {
        title: `مقارنة أفضل ${categoryName}`,
        model: 'الموديل',
        price: 'السعر',
        feature: 'الميزة الرئيسية',
        rating: 'التقييم',
        egp: 'جنيه',
        stars: '★★★★★'
    } : {
        title: `Best ${categoryName} Comparison`,
        model: 'Model',
        price: 'Price',
        feature: 'Key Feature',
        rating: 'Rating',
        egp: 'EGP',
        stars: '★★★★★'
    };

    return (
        <div className="my-8 md:my-12 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 px-4 py-3 md:px-6 md:py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                    <SvgIcon name="trophy" className="w-6 h-6" />
                    {labels.title}
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/50">
                            <th className="py-3 px-3 md:py-4 md:px-6 text-start font-bold text-gray-700 dark:text-gray-300 text-xs md:text-sm">{labels.model}</th>
                            <th className="py-3 px-3 md:py-4 md:px-6 text-start font-bold text-gray-700 dark:text-gray-300 text-xs md:text-sm">{labels.price}</th>
                            <th className="py-3 px-3 md:py-4 md:px-6 text-start font-bold text-gray-700 dark:text-gray-300 text-xs md:text-sm">{labels.feature}</th>
                            <th className="py-3 px-3 md:py-4 md:px-6 text-start font-bold text-gray-700 dark:text-gray-300 text-xs md:text-sm">{labels.rating}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                <td className="py-3 px-3 md:py-4 md:px-6 font-semibold text-gray-900 dark:text-white text-xs md:text-sm">
                                    {product.name}
                                    {index === 0 && (
                                        <span className="mx-1 px-1.5 py-0.5 md:mx-2 md:px-2 md:bg-yellow-100 text-yellow-800 text-[10px] md:text-xs rounded-full block md:inline w-fit mt-1 md:mt-0">
                                            {isArabic ? 'الأفضل' : 'Top Pick'}
                                        </span>
                                    )}
                                </td>
                                <td className="py-3 px-3 md:py-4 md:px-6 text-blue-600 dark:text-blue-400 font-bold text-xs md:text-sm">
                                    {product.price} <span className="text-[10px] md:text-xs">{labels.egp}</span>
                                </td>
                                <td className="py-3 px-3 md:py-4 md:px-6">
                                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium whitespace-nowrap">
                                        {product.badge || (isArabic ? 'قيمة ممتازة' : 'Best Value')}
                                    </span>
                                </td>
                                <td className="py-3 px-3 md:py-4 md:px-6 text-amber-400 text-xs">
                                    <span className="hidden md:inline">{labels.stars}</span>
                                    <span className="md:hidden"><SvgIcon name="star" className="w-4 h-4 text-amber-400" /></span>
                                    <span className="text-gray-400 ms-1">(4.{9 - index})</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Expert Opinion Component (E-E-A-T Signal)
interface ExpertOpinionProps {
    productName: string;
    brand: string;
    category: string;
    locale: string;
    customOpinion?: string;
}

export function ExpertOpinion({ productName, brand, category, locale, customOpinion }: ExpertOpinionProps) {
    const isArabic = locale === 'ar';
    const hash = typeof productName === 'string' ? productName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;

    const arTitles = ['رأي الخبراء', 'التقييم الفني', 'نظرة خبرائنا', 'الخلاصة الهندسية', 'من داخل المعمل'];
    const enTitles = ['Expert Opinion', 'Technical Audit', 'Experts View', 'Engineering Review', 'Lab Verdict'];

    const arBadges = ['مراجعة تقنية', 'فحص معتمد', 'اختبار الأداء', 'شهادة جودة', 'تقييم شامل'];
    const enBadges = ['Tech Review', 'Verified Audit', 'Performance Test', 'Quality Cert', 'In-depth Rating'];

    const arVerified = ['تمت مراجعته بواسطة كايرو فولت', 'تم الفحص في معمل كايرو فولت', 'معتمد من مهندسي كايرو فولت', 'بيانات حصرية - مختبرات كايرو فولت'];
    const enVerified = ['Reviewed by Cairo Volt', 'Tested in CairoVolt Labs', 'Certified by CairoVolt Engineers', 'Exclusive Data - CairoVolt Labs'];

    const t = isArabic ? {
        title: arTitles[hash % arTitles.length],
        badge: arBadges[hash % arBadges.length],
        verified: arVerified[hash % arVerified.length]
    } : {
        title: enTitles[hash % enTitles.length],
        badge: enBadges[hash % enBadges.length],
        verified: enVerified[hash % enVerified.length]
    };

    // STRICT CHECK: If no custom opinion is provided, DO NOT render anything.
    // This eliminates "programmatic duplicate content" penalties.
    if (!customOpinion) {
        return null;
    }

    // Determine brand colors
    const isAnker = brand.toLowerCase() === 'anker';
    const brandColor = isAnker ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
    const borderColor = isAnker ? 'border-blue-100 dark:border-blue-900/30' : 'border-orange-100 dark:border-orange-900/30';

    return (
        <div className={`mt-8 rounded-2xl border ${borderColor} overflow-hidden bg-white dark:bg-gray-800 shadow-sm`}>
            <div className="flex flex-col md:flex-row">
                <div className={`p-6 md:w-1/3 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r ${isArabic ? 'md:border-l md:border-r-0' : ''} border-gray-100 dark:border-gray-700 ${isAnker ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'bg-orange-50/50 dark:bg-orange-900/10'}`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${isAnker ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{t.title}</h3>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${brandColor}`}>
                        {t.badge}
                    </span>
                </div>

                <div className="p-6 md:w-2/3">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                            <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {t.verified}
                        </span>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic">
                            "{customOpinion}"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Quick Product Summary
interface QuickSummaryProps {
    product: {
        brand: string;
        price: number;
        translations: {
            en: { name: string; shortDescription: string };
            ar: { name: string; shortDescription: string };
        };
    };
    locale: string;
}

export function QuickSummary({ product, locale }: QuickSummaryProps) {
    const isArabic = locale === 'ar';
    const t = isArabic ? product.translations.ar : product.translations.en;
    const warrantyMonths = product.brand === 'Anker' ? 18 : 12;

    return (
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 md:p-4 mb-4 md:mb-6 border-s-4 border-blue-500">
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>{t.name}</strong> - <span className="hidden sm:inline">{t.shortDescription}.</span>
                {isArabic
                    ? ` السعر: ${product.price} جنيه | ضمان ${warrantyMonths} شهر`
                    : ` Price: ${product.price} EGP | ${warrantyMonths}-month warranty`
                }
            </p>
        </div>
    );
}
// Product FAQ Component
interface FAQItem {
    q: string;
    a: string;
}

interface ProductFAQProps {
    categorySlug: string;
    locale: string;
    t: any; // Using any to avoid complex type drilling from next-intl
}

export function ProductFAQ({ categorySlug, locale, t }: ProductFAQProps) {
    const isArabic = locale === 'ar';
    const categoryKey =
        categorySlug.includes('power-bank') ? 'powerBanks' :
            categorySlug.includes('audio') || categorySlug.includes('earbuds') ? 'audio' :
                categorySlug.includes('charger') ? 'wallChargers' :
                    categorySlug.includes('cable') ? 'cables' : null;

    if (!categoryKey) return null;

    // We can't easily iterate over translated arrays in next-intl inside a client component
    // So we manually construct the array based on inspection of the JSON structure
    // This is a pragmatic workaround for client-side translation arrays
    const faqs: FAQItem[] = [];

    // Attempt to get 3 FAQs
    try {
        const q1 = t(`smartCategoryFAQs.${categoryKey}.0.q`);
        const a1 = t(`smartCategoryFAQs.${categoryKey}.0.a`);
        if (q1 && a1 && q1 !== `smartCategoryFAQs.${categoryKey}.0.q`) faqs.push({ q: q1, a: a1 });

        const q2 = t(`smartCategoryFAQs.${categoryKey}.1.q`);
        const a2 = t(`smartCategoryFAQs.${categoryKey}.1.a`);
        if (q2 && a2 && q2 !== `smartCategoryFAQs.${categoryKey}.1.q`) faqs.push({ q: q2, a: a2 });

        const q3 = t(`smartCategoryFAQs.${categoryKey}.2.q`);
        const a3 = t(`smartCategoryFAQs.${categoryKey}.2.a`);
        if (q3 && a3 && q3 !== `smartCategoryFAQs.${categoryKey}.2.q`) faqs.push({ q: q3, a: a3 });
    } catch (e) {
        // Translations might not load immediately
    }

    if (faqs.length === 0) return null;

    return (
        <div className="my-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <SvgIcon name="question" className="w-6 h-6" />
                {isArabic ? 'أسئلة شائعة عن المنتج' : 'Product FAQs'}
            </h3>
            <div className="space-y-3">
                {faqs.map((faq, idx) => (
                    <details key={idx} className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800/50 open:bg-blue-50/50 dark:open:bg-blue-900/10">
                        <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-800 dark:text-gray-200">
                            <span>{faq.q}</span>
                            <span className="text-xl group-open:rotate-180 transition-transform text-blue-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </span>
                        </summary>
                        <p className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {faq.a}
                        </p>
                    </details>
                ))}
            </div>
        </div>
    );
}
