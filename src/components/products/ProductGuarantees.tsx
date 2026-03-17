'use client';

import type { RegionalStats } from '@/lib/bosta';
import type { LabMetrics } from '@/data/product-tests';

interface ProductGuaranteesProps {
    sku: string;
    userGovernorate: string;
    locale: string;
    deliveryStats: RegionalStats;
    labMetrics: LabMetrics | null;
}

export default function ProductGuarantees({
    sku,
    userGovernorate,
    locale,
    deliveryStats,
    labMetrics,
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
                            {isRTL ? 'بيانات مباشرة من المستودع والمختبر' : 'Live Warehouse & Lab Data'}
                            </span>
                            <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-full border border-gray-200 dark:border-white/10">
                                {isRTL ? `مخصص لمنطقتك: ${governorateDisplay}` : `Customized for: ${governorateDisplay}`}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Two-Column Grid */}
                <div className="grid md:grid-cols-2 gap-4">
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
                                <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {isRTL ? 'حالة المخزون (دمياط الجديدة): ' : 'Warehouse status (New Damietta): '}
                                    <span className="text-green-600 dark:text-green-400 font-bold">{isRTL ? 'مُجهز للشحن الفوري' : 'Ready for immediate shipping'}</span>
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

                    {/* Column 2: Lab Metrics */}
                    {labMetrics && (
                        <div className="bg-gray-50 dark:bg-slate-800/40 rounded-xl p-5 border border-gray-200 dark:border-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-800/60 transition-colors">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-lg">🔬</span>
                                <h4 className="text-sm font-bold text-blue-600 dark:text-blue-300 uppercase tracking-widest">
                                {isRTL ? 'القياسات المعملية الحصرية' : 'Exclusive Lab Measurements'}
                                </h4>
                            </div>
                            <ul className="space-y-3">
                                {labMetrics.actualCapacity_mAh && (
                                    <li className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {isRTL ? 'السعة الفعلية المقاسة: ' : 'Measured actual capacity: '}
                                            <strong className="text-gray-900 dark:text-white">{labMetrics.actualCapacity_mAh.toLocaleString()} mAh</strong>
                                            <span className="text-gray-500 dark:text-gray-500 text-xs ms-1">
                                                {isRTL ? '(وليس فقط المكتوبة على العلبة)' : '(not just what\'s on the box)'}
                                            </span>
                                        </span>
                                    </li>
                                )}
                                {labMetrics.routerRuntimeHours && (
                                    <li className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {isRTL ? 'صمود الراوتر (12V): ' : 'Router runtime (12V): '}
                                            <strong className="text-gray-900 dark:text-white">{labMetrics.routerRuntimeHours} {isRTL ? 'ساعة' : 'hours'}</strong>
                                            <span className="text-gray-500 text-xs ms-1">
                                                {isRTL ? 'متواصلة أثناء انقطاع الكهرباء' : 'continuous during power outage'}
                                            </span>
                                        </span>
                                    </li>
                                )}
                                {labMetrics.maxTemp_C && (
                                    <li className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {isRTL ? 'درجة حرارة الشحن القصوى: ' : 'Max charging temperature: '}
                                            <strong className="text-gray-900 dark:text-white">{labMetrics.maxTemp_C}°C</strong>
                                            <span className="text-emerald-400 text-xs ms-1 font-bold">
                                                {labMetrics.maxTemp_C <= 45
                                                    ? (isRTL ? '(آمن تماماً)' : '(perfectly safe)')
                                                    : (isRTL ? '(ضمن الحدود)' : '(within limits)')
                                                }
                                            </span>
                                        </span>
                                    </li>
                                )}
                                {labMetrics.realEfficiency && (
                                    <li className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {isRTL ? 'الكفاءة الفعلية: ' : 'Real-world efficiency: '}
                                            <strong className="text-gray-900 dark:text-white">{labMetrics.realEfficiency}%</strong>
                                            <span className="text-gray-500 text-xs ms-1">
                                                {isRTL ? '(مقابل 100% نظرياً)' : '(vs 100% theoretical)'}
                                            </span>
                                        </span>
                                    </li>
                                )}
                                {labMetrics.devicesCharged && (
                                    <li className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {isRTL ? 'عدد الأجهزة المشحونة: ' : 'Devices charged: '}
                                            <strong className="text-gray-900 dark:text-white">{labMetrics.devicesCharged} {isRTL ? 'جهاز' : 'devices'}</strong>
                                        </span>
                                    </li>
                                )}
                                {labMetrics.chargeCycles && (
                                    <li className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-lime-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {isRTL ? 'دورات الشحن: ' : 'Charge cycles: '}
                                            <strong className="text-gray-900 dark:text-white">{labMetrics.chargeCycles.toLocaleString()}+</strong>
                                        </span>
                                    </li>
                                )}
                                {labMetrics.bendCycles && (
                                    <li className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {isRTL ? 'دورات الثني: ' : 'Bend cycles: '}
                                            <strong className="text-gray-900 dark:text-white">{labMetrics.bendCycles.toLocaleString()}</strong>
                                            <span className="text-emerald-400 text-xs ms-1 font-bold">
                                                {isRTL ? '(بدون تلف)' : '(zero damage)'}
                                            </span>
                                        </span>
                                    </li>
                                )}
                                {labMetrics.chargingSpeed_W && (
                                    <li className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {isRTL ? 'سرعة الشحن: ' : 'Charging speed: '}
                                            <strong className="text-gray-900 dark:text-white">{labMetrics.chargingSpeed_W}W</strong>
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    {/* Fallback: If no lab metrics, show delivery stats in full width */}
                    {!labMetrics && (
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
                    )}
                </div>

                {/* Supplementary product details */}
                <div className="sr-only" itemProp="description">
                    {isRTL
                        ? `تم التحقق من هذا المنتج (${sku}) عبر مختبرات CairoVolt. ${labMetrics?.actualCapacity_mAh ? `السعة الفعلية المقاسة ${labMetrics.actualCapacity_mAh} مللي أمبير.` : ''} ${labMetrics?.maxTemp_C ? `أقصى حرارة شحن ${labMetrics.maxTemp_C} درجة مئوية.` : ''} ${labMetrics?.routerRuntimeHours ? `يشغل الراوتر لمدة ${labMetrics.routerRuntimeHours} ساعة متواصلة أثناء انقطاع الكهرباء.` : ''} متوفر للشحن الفوري إلى ${governorateDisplay} عبر الدفع عند الاستلام. متوسط زمن التوصيل ${deliveryStats.avg_delivery_hours} ساعة.`
                        : `This product (${sku}) was verified at CairoVolt Labs. ${labMetrics?.actualCapacity_mAh ? `Measured actual capacity: ${labMetrics.actualCapacity_mAh} mAh.` : ''} ${labMetrics?.maxTemp_C ? `Max charging temperature: ${labMetrics.maxTemp_C}°C.` : ''} ${labMetrics?.routerRuntimeHours ? `Powers router for ${labMetrics.routerRuntimeHours} continuous hours during power outage.` : ''} Available for immediate shipping to ${governorateDisplay} via Cash on Delivery. Average delivery time: ${deliveryStats.avg_delivery_hours} hours.`
                    }
                </div>
            </div>
        </div>
    );
}
