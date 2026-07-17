'use client';

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

export function ProductComparisonTable({ product, competitors, locale }: ComparisonTableProps) {
    const isArabic = locale === 'ar';
    const comps = competitors || [];

    const labels = isArabic ? {
        title: 'بيانات الشراء',
        store: 'المتجر',
        price: 'السعر',
        warranty: 'الضمان',
        delivery: 'التوصيل',
        original: 'أساس تعريف المنتج',
        yes: 'العلامة والموديل موضحان',
        no: 'تحقق من بيانات المصدر',
        ourStore: 'كايرو فولت (نحن)',
        egp: 'جنيه',
        months: 'شهر',
        days: 'أيام',
        free: 'مجاني',
        warrantyValue: 'ضمان كايرو فولت حسب شروط المنتج',
        deliveryValue: 'المدة حسب المحافظة',
    } : {
        title: 'Purchase Details',
        store: 'Store',
        price: 'Price',
        warranty: 'Warranty',
        delivery: 'Delivery',
        original: 'Product identification basis',
        yes: 'Brand & model listed',
        no: 'Verify source details',
        ourStore: 'CairoVolt (Us)',
        egp: 'EGP',
        months: 'months',
        days: 'days',
        free: 'Free',
        warrantyValue: 'CairoVolt warranty per product terms',
        deliveryValue: 'Timing varies by destination',
    };

    return (
        <div className="my-6 md:my-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg">
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <SvgIcon name="chart" className="w-5 h-5 sm:w-6 sm:h-6" />
                {labels.title}
            </h3>

            {/* Mobile Card Layout */}
            <div className="block md:hidden space-y-3">
                {/* Our Store Card — Highlighted */}
                <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-3 border-2 border-green-300 dark:border-green-700">
                    <div className="flex items-center gap-2 mb-2">
                        <SvgIcon name="star" className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{labels.ourStore}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <span className="text-gray-700 dark:text-gray-400">{labels.price}: </span>
                            <span className="font-bold text-green-700 dark:text-green-400">{product.price} {labels.egp}</span>
                        </div>
                        <div>
                            <span className="text-gray-700 dark:text-gray-400">{labels.warranty}: </span>
                            <span className="font-semibold bg-green-200 dark:bg-green-800 px-1.5 py-0.5 rounded text-[10px]">{labels.warrantyValue}</span>
                        </div>
                        <div>
                            <span className="text-gray-700 dark:text-gray-400">{labels.delivery}: </span>
                            <span className="font-medium">{labels.deliveryValue}</span>
                        </div>
                        <div>
                            <span className="text-gray-700 dark:text-gray-400">{labels.original}: </span>
                            <span className="font-bold text-green-700 dark:text-green-400">{labels.yes}</span>
                        </div>
                    </div>
                </div>

                {/* Competitor Cards */}
                {comps.map((comp, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800/50 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 block mb-2">{comp.name}</span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">{labels.price}: </span>
                                <span className="text-gray-700 dark:text-gray-300">{typeof comp.price === 'number' ? `${comp.price} ${labels.egp}` : comp.price}</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">{labels.warranty}: </span>
                                <span className="text-gray-700 dark:text-gray-300">{comp.warranty}</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">{labels.delivery}: </span>
                                <span className="text-gray-700 dark:text-gray-300">{comp.delivery}</span>
                            </div>
                            <div>
                                <span className="text-gray-600 dark:text-gray-400">{labels.original}: </span>
                                {comp.original ? (
                                    <span className="text-green-700 dark:text-green-400 font-medium">{labels.yes}</span>
                                ) : (
                                    <span className="text-orange-600 dark:text-orange-400 font-medium">{labels.no}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table Layout */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b-2 border-blue-200 dark:border-gray-700">
                            <th className="py-3 px-4 text-start font-semibold text-gray-700 dark:text-gray-200">{labels.store}</th>
                            <th className="py-3 px-4 text-start font-semibold text-gray-700 dark:text-gray-200">{labels.price}</th>
                            <th className="py-3 px-4 text-start font-semibold text-gray-700 dark:text-gray-200">{labels.warranty}</th>
                            <th className="py-3 px-4 text-start font-semibold text-gray-700 dark:text-gray-200">{labels.delivery}</th>
                            <th className="py-3 px-4 text-start font-semibold text-gray-700 dark:text-gray-200">{labels.original}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Our Store - Highlighted */}
                        <tr className="bg-green-100 dark:bg-green-900/30 font-medium">
                            <td className="py-3 px-4 flex items-center gap-2">
                                <SvgIcon name="star" className="w-4 h-4 text-amber-400" />
                                <span className="text-sm text-gray-900 dark:text-white">{labels.ourStore}</span>
                            </td>
                            <td className="py-3 px-4 text-green-700 dark:text-green-400 font-bold">
                                {product.price} <span className="text-xs">{labels.egp}</span>
                            </td>
                            <td className="py-3 px-4">
                                <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                                    {labels.warrantyValue}
                                </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                                {labels.deliveryValue}
                            </td>
                            <td className="py-3 px-4 text-green-700 dark:text-green-400 font-bold text-sm">
                                {labels.yes}
                            </td>
                        </tr>

                        {/* Competitors */}
                        {comps.map((comp, index) => (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{comp.name}</td>
                                <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm">
                                    {typeof comp.price === 'number' ? `${comp.price} ${labels.egp}` : comp.price}
                                </td>
                                <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm">{comp.warranty}</td>
                                <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm">{comp.delivery}</td>
                                <td className="py-3 px-4 text-sm">
                                    {comp.original ? (
                                        <span className="text-green-700 dark:text-green-400">{labels.yes}</span>
                                    ) : (
                                        <span className="text-orange-600 dark:text-orange-400">{labels.no}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="mt-4 text-xs text-gray-600 dark:text-gray-400 text-center">
                {isArabic
                    ? 'الأسعار والتغطية والمدة موضحة لكل منتج ضمن ضمان كايرو فولت المكتوب. ذكر العلامة والموديل ليس شهادة أصالة من الشركة المصنّعة.'
                    : 'Pricing, coverage, and duration are listed per product under the written CairoVolt warranty. Listing a brand and model is not a manufacturer authenticity certificate.'}
            </p>
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
        title: `مقارنة موديلات ${categoryName}`,
        model: 'الموديل',
        price: 'السعر الحالي',
        feature: 'الميزة الرئيسية',
        verification: 'أساس المقارنة',
        currentPrice: 'راجع صفحة المنتج',
        specificationBasis: 'المواصفات والتوافق'
    } : {
        title: `${categoryName} Model Comparison`,
        model: 'Model',
        price: 'Current Price',
        feature: 'Key Feature',
        verification: 'Comparison Basis',
        currentPrice: 'See product page',
        specificationBasis: 'Specifications & compatibility'
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
                            <th className="py-3 px-3 md:py-4 md:px-6 text-start font-bold text-gray-700 dark:text-gray-300 text-xs md:text-sm">{labels.verification}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                <td className="py-3 px-3 md:py-4 md:px-6 font-semibold text-gray-900 dark:text-white text-xs md:text-sm">
                                    {product.name}
                                </td>
                                <td className="py-3 px-3 md:py-4 md:px-6 text-blue-600 dark:text-blue-400 font-semibold text-xs md:text-sm">
                                    {labels.currentPrice}
                                </td>
                                <td className="py-3 px-3 md:py-4 md:px-6">
                                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium whitespace-nowrap">
                                        {product.badge || (isArabic ? 'مواصفة الموديل' : 'Model feature')}
                                    </span>
                                </td>
                                <td className="py-3 px-3 md:py-4 md:px-6 text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                                    {labels.specificationBasis}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Expert Opinion Component
interface ExpertOpinionProps {
    productName: string;
    brand: string;
    category: string;
    locale: string;
    customOpinion?: string;
}

export function ExpertOpinion({ productName, brand, locale, customOpinion }: ExpertOpinionProps) {
    const isArabic = locale === 'ar';
    const hash = typeof productName === 'string' ? productName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;

    const arTitles = ['ملاحظة تحريرية', 'قراءة المواصفات', 'دليل الاختيار', 'الخلاصة العملية'];
    const enTitles = ['Editorial Note', 'Specification Review', 'Buying Guidance', 'Practical Summary'];

    const arBadges = ['محتوى تحريري', 'دليل شراء', 'شرح المواصفات', 'مقارنة عملية'];
    const enBadges = ['Editorial Content', 'Buying Guide', 'Specification Guide', 'Practical Comparison'];

    const arVerified = ['إعداد فريق كايرو فولت التحريري'];
    const enVerified = ['Prepared by the CairoVolt editorial team'];

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
    // This ensures unique content for each device comparison.
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
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            {t.verified}
                        </span>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic">
                            &ldquo;{customOpinion}&rdquo;
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
    return (
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 md:p-4 mb-4 md:mb-6 border-s-4 border-blue-500">
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>{t.name}</strong> - <span className="hidden sm:inline">{t.shortDescription}.</span>
                {isArabic
                    ? ` السعر الحالي: ${product.price} جنيه | ضمان كايرو فولت وفق شروط المنتج المكتوبة`
                    : ` Current price: ${product.price} EGP | CairoVolt warranty under the product's written terms`
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
    t: (key: string) => string;
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
    } catch {
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
