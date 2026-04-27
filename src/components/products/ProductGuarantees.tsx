'use client';

import type { RegionalStats } from '@/lib/bosta';
// LabMetrics import removed — lab data is now exclusively in ProductTestResults

interface ProductGuaranteesProps {
    sku: string;
    userGovernorate: string;
    locale: string;
    deliveryStats: RegionalStats;
    // labMetrics removed — displayed exclusively in ProductTestResults to avoid duplication
}

export default function ProductGuarantees({
    sku,
    userGovernorate,
    locale,
    deliveryStats,

}: ProductGuaranteesProps) {
    const isRTL = locale === 'ar';

    // Dynamic heading rotation per product
    const hash = sku.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const arTitles = [
        'لماذا هذا المنتج موثوق',
        'شهادة الثقة من كايرو فولت',
        'تقرير الموثوقية',
        'بيان الثقة الفني',
    ];
    const enTitles = [
        'Why This Product Is Trusted',
        'CairoVolt Trust Certificate',
        'Reliability Report',
        'Technical Trust Statement',
    ];

    const title = isRTL
        ? `${arTitles[hash % arTitles.length]} (${sku})`
        : `${enTitles[hash % enTitles.length]} (${sku})`;

    const governorateDisplay = userGovernorate;

    return (
        <div
            className="relative overflow-hidden bg-white dark:bg-gradient-to-br dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 text-gray-900 dark:text-white p-6 md:p-8 rounded-2xl my-8 shadow-2xl border border-gray-200 dark:border-cyan-900/40 group"
            id="trust-matrix"
        >
            {/* Animated top glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-500 opacity-80" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-200/20 dark:bg-cyan-500/15 rounded-full blur-3xl group-hover:bg-cyan-300/30 dark:group-hover:bg-cyan-400/25 transition-colors duration-700 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-200/15 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl flex items-center justify-center border border-cyan-200 dark:border-cyan-500/30 shadow-lg shadow-cyan-100/50 dark:shadow-cyan-900/20 flex-shrink-0">
                        <span className="text-2xl">🛡️</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 dark:from-cyan-300 to-blue-600 dark:to-blue-300">
                            {title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-cyan-100 dark:bg-cyan-900/40 border border-cyan-300 dark:border-cyan-700/50 rounded-full text-xs text-cyan-700 dark:text-cyan-400 font-bold tracking-wide">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            {isRTL ? 'بيانات التوصيل المباشرة' : 'Live Delivery Data'}
                            </span>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-full border border-gray-200 dark:border-white/10">
                                {isRTL ? `مخصص لمنطقتك: ${governorateDisplay}` : `Customized for: ${governorateDisplay}`}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Two-Column Grid */}
                <div className="space-y-4">
                    {/* Column 1: Logistics Pulse */}
                    <div className="bg-gray-50 dark:bg-slate-800/40 rounded-xl p-5 border border-gray-200 dark:border-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-800/60 transition-colors">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-lg">⚡</span>
                            <h4 className="text-sm font-bold text-cyan-600 dark:text-cyan-300 uppercase tracking-widest">
                                {isRTL ? `النبض اللوجستي لـ ${governorateDisplay}` : `Logistics Pulse for ${governorateDisplay}`}
                            </h4>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="flex h-2 w-2 mt-1.5 relative flex-shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {isRTL ? 'زمن التوصيل الفعلي اليوم: ' : 'Actual delivery time today: '}
                                    <strong className="text-gray-900 dark:text-white">{deliveryStats.avg_delivery_hours} {isRTL ? 'ساعة' : 'hours'}</strong>
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {isRTL ? 'نسبة نجاح التوصيل مع الدفع عند الاستلام: ' : 'COD delivery success rate: '}
                                    <strong className="text-gray-900 dark:text-white">{deliveryStats.success_rate}%</strong>
                                </span>
                            </li>

                            <li className="flex items-start gap-2">
                                <svg className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {isRTL ? 'أسرع توصيل مسجل: ' : 'Fastest recorded delivery: '}
                                    <strong className="text-gray-900 dark:text-white">{deliveryStats.fastest_delivery_hours} {isRTL ? 'ساعة' : 'hours'}</strong>
                                </span>
                            </li>
                        </ul>

                        {/* Sorting Hub */}
                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-slate-700/50">
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {isRTL ? `عبر ${deliveryStats.region_hub}` : `Via ${deliveryStats.region_hub}`}
                            </p>
                        </div>
                    </div>

                    {/* Monthly shipping stats — unique logistics data */}
                    <div className="bg-gray-50 dark:bg-slate-800/40 rounded-xl p-5 border border-gray-200 dark:border-slate-700/50">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">📦</span>
                            <h4 className="text-sm font-bold text-blue-600 dark:text-blue-300 uppercase tracking-widest">
                                {isRTL ? 'إحصائيات الشحن الشهرية' : 'Monthly Shipping Statistics'}
                            </h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-3 bg-gray-100 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700/30">
                                <p className="text-2xl font-black text-gray-900 dark:text-white">{deliveryStats.monthly_orders}</p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400">{isRTL ? 'طلب هذا الشهر' : 'orders this month'}</p>
                            </div>
                            <div className="text-center p-3 bg-gray-100 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700/30">
                                <p className="text-2xl font-black text-gray-900 dark:text-white">{deliveryStats.active_shipments}</p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400">{isRTL ? 'شحنة نشطة الآن' : 'active shipments now'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Supplementary logistics details */}
                <div className="sr-only" itemProp="description">
                    {isRTL
                        ? `متوفر للشحن الفوري إلى ${governorateDisplay} عبر الدفع عند الاستلام. متوسط زمن التوصيل ${deliveryStats.avg_delivery_hours} ساعة. نسبة نجاح التوصيل ${deliveryStats.success_rate}%.`
                        : `Available for immediate shipping to ${governorateDisplay} via Cash on Delivery. Average delivery time: ${deliveryStats.avg_delivery_hours} hours. Delivery success rate: ${deliveryStats.success_rate}%.`
                    }
                </div>
            </div>
        </div>
    );
}
