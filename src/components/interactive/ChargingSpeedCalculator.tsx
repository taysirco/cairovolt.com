'use client';

import { useState } from 'react';

interface ChargingSpeedCalculatorProps {
    locale?: string;
}

const CHARGERS = [
    { name: '5W (القديم)', nameEn: '5W (Old)', watt: 5, to50: 90, to100: 210 },
    { name: '10W', nameEn: '10W', watt: 10, to50: 55, to100: 150 },
    { name: '20W (Anker)', nameEn: '20W (Anker)', watt: 20, to50: 30, to100: 90, price: 400 },
    { name: '25W PPS (Anker)', nameEn: '25W PPS (Anker)', watt: 25, to50: 27, to100: 80, price: 550 },
    { name: '30W GaN (Anker Nano)', nameEn: '30W GaN (Anker Nano)', watt: 30, to50: 22, to100: 72, price: 549 },
    { name: '65W GaN (Anker)', nameEn: '65W GaN (Anker)', watt: 65, to50: 22, to100: 70, price: 999 },
];

export function ChargingSpeedCalculator({ locale = 'ar' }: ChargingSpeedCalculatorProps) {
    const [selected, setSelected] = useState(4); // 30W default
    const isArabic = locale === 'ar';
    const charger = CHARGERS[selected];

    // Calculate how much time saved vs 5W
    const baseline = CHARGERS[0];
    const timeSaved = baseline.to100 - charger.to100;
    const percentFaster = Math.round((timeSaved / baseline.to100) * 100);

    return (
        <div className="my-8 rounded-2xl border-2 border-amber-100 dark:border-amber-900/50 bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden shadow-lg" dir={isArabic ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    ⚡ {isArabic ? 'حاسبة سرعة الشحن' : 'Charging Speed Calculator'}
                </h3>
                <p className="text-sm text-white/80 mt-1">
                    {isArabic
                        ? 'اختار الشاحن وشوف الفرق في الوقت'
                        : 'Select a charger and see the time difference'}
                </p>
            </div>

            <div className="p-5 space-y-5">
                {/* Charger selector */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-3">
                        {isArabic ? '🔌 اختار الشاحن:' : '🔌 Select charger:'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {CHARGERS.map((c, i) => (
                            <button
                                key={i}
                                onClick={() => setSelected(i)}
                                className={`px-3 py-3 rounded-xl text-sm font-medium transition-all border ${selected === i
                                        ? 'bg-amber-500 text-white border-amber-500 shadow-md scale-[1.02]'
                                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-amber-300'
                                    }`}
                            >
                                <div className="font-bold">{c.watt}W</div>
                                {c.price && (
                                    <div className="text-[10px] mt-0.5 opacity-75">
                                        {c.price.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">0% → 50%</div>
                            <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
                                {charger.to50}<span className="text-sm text-gray-400"> {isArabic ? 'دقيقة' : 'min'}</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">0% → 100%</div>
                            <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
                                {charger.to100}<span className="text-sm text-gray-400"> {isArabic ? 'دقيقة' : 'min'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress bar visualization */}
                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                        </div>
                        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative">
                            <div
                                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${Math.min(100, (100 - (charger.to100 / baseline.to100) * 100) + 50)}%` }}
                            />
                        </div>
                    </div>

                    {/* Comparison info */}
                    {timeSaved > 0 && (
                        <div className="flex items-center gap-2 text-sm bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg p-3">
                            <span className="text-lg">🚀</span>
                            <span>
                                {isArabic
                                    ? `أسرع ${percentFaster}% من شاحن 5W — يوفر ${timeSaved} دقيقة!`
                                    : `${percentFaster}% faster than 5W — saves ${timeSaved} minutes!`}
                            </span>
                        </div>
                    )}
                </div>

                <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
                    {isArabic
                        ? '* الأوقات تقريبية بناءً على اختبارات iPhone 17 Pro. النتائج تختلف حسب الجهاز.'
                        : '* Times are approximate based on iPhone 17 Pro tests. Results vary by device.'}
                </div>
            </div>
        </div>
    );
}

export default ChargingSpeedCalculator;
