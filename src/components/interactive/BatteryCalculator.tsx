'use client';

import { useState } from 'react';

interface BatteryCalculatorProps {
    locale?: string;
}

const PHONES = [
    { name: 'iPhone 17 Pro', battery: 4685, icon: '📱' },
    { name: 'iPhone 17', battery: 4050, icon: '📱' },
    { name: 'Samsung S26 Ultra', battery: 5000, icon: '📱' },
    { name: 'Samsung S26', battery: 4000, icon: '📱' },
    { name: 'Samsung A55', battery: 5000, icon: '📱' },
    { name: 'Xiaomi 14', battery: 4610, icon: '📱' },
    { name: 'OPPO Reno 12', battery: 5000, icon: '📱' },
];

const POWER_BANKS = [
    { name: 'Anker Nano 10000mAh', capacity: 10000, price: 1300, brand: 'Anker' },
    { name: 'Anker PowerCore 20000mAh', capacity: 20000, price: 1550, brand: 'Anker' },
    { name: 'Anker Prime 27650mAh', capacity: 27650, price: 3799, brand: 'Anker' },
    { name: 'Joyroom 10000mAh', capacity: 10000, price: 450, brand: 'Joyroom' },
    { name: 'Joyroom 20000mAh', capacity: 20000, price: 650, brand: 'Joyroom' },
];

const EFFICIENCY = 0.85; // ~15% conversion loss

export function BatteryCalculator({ locale = 'ar' }: BatteryCalculatorProps) {
    const [selectedPhone, setSelectedPhone] = useState(0);
    const [selectedPB, setSelectedPB] = useState(1);
    const isArabic = locale === 'ar';

    const phone = PHONES[selectedPhone];
    const pb = POWER_BANKS[selectedPB];
    const charges = (pb.capacity * EFFICIENCY) / phone.battery;
    const fullCharges = Math.floor(charges);
    const partialPercent = Math.round((charges - fullCharges) * 100);

    return (
        <div className="my-8 rounded-2xl border-2 border-blue-100 dark:border-blue-900/50 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden shadow-lg" dir={isArabic ? 'rtl' : 'ltr'}>
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    🔋 {isArabic ? 'حاسبة شحنات الباور بانك' : 'Power Bank Charge Calculator'}
                </h3>
                <p className="text-sm text-white/80 mt-1">
                    {isArabic
                        ? 'اختار موبايلك والباور بانك وشوف كام مرة هيشحنه'
                        : 'Select your phone and power bank to see how many charges you get'}
                </p>
            </div>

            <div className="p-5 space-y-5">
                {/* Phone selector */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                        {isArabic ? '📱 اختار موبايلك:' : '📱 Select your phone:'}
                    </label>
                    <select
                        value={selectedPhone}
                        onChange={(e) => setSelectedPhone(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                    >
                        {PHONES.map((p, i) => (
                            <option key={i} value={i}>
                                {p.icon} {p.name} ({p.battery.toLocaleString()}mAh)
                            </option>
                        ))}
                    </select>
                </div>

                {/* Power Bank selector */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">
                        {isArabic ? '🔋 اختار الباور بانك:' : '🔋 Select power bank:'}
                    </label>
                    <select
                        value={selectedPB}
                        onChange={(e) => setSelectedPB(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                    >
                        {POWER_BANKS.map((p, i) => (
                            <option key={i} value={i}>
                                {p.name} — {p.price.toLocaleString()} {isArabic ? 'ج.م' : 'EGP'}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Results */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-inner">
                    <div className="text-center">
                        <div className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-1">
                            {fullCharges}
                            {partialPercent > 0 && (
                                <span className="text-2xl text-gray-400">.{Math.round(partialPercent / 10)}</span>
                            )}
                        </div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                            {isArabic ? 'مرة شحن كاملة' : 'full charges'}
                        </div>

                        {/* Visual battery indicators */}
                        <div className="flex justify-center gap-2 flex-wrap mb-4">
                            {Array.from({ length: fullCharges }).map((_, i) => (
                                <div key={i} className="w-8 h-12 rounded-md bg-green-500 flex items-center justify-center text-white text-xs font-bold shadow-sm" title="100%">
                                    🔋
                                </div>
                            ))}
                            {partialPercent > 0 && (
                                <div className="w-8 h-12 rounded-md bg-gray-200 dark:bg-gray-600 relative overflow-hidden" title={`${partialPercent}%`}>
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-yellow-500 transition-all"
                                        style={{ height: `${partialPercent}%` }}
                                    />
                                    <span className="relative text-[10px] flex items-center justify-center h-full font-bold text-gray-600 dark:text-gray-300">
                                        {partialPercent}%
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="text-xs text-gray-400 dark:text-gray-500">
                            {isArabic
                                ? `* محسوب بكفاءة تحويل 85% (فقدان ~15% طبيعي أثناء الشحن)`
                                : `* Calculated at 85% efficiency (~15% conversion loss is normal)`}
                        </div>
                    </div>
                </div>

                {/* Quick comparison */}
                <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {isArabic ? 'سعة الباور بانك' : 'Power Bank'}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {pb.capacity.toLocaleString()}<span className="text-xs text-gray-400">mAh</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {isArabic ? 'بطارية الموبايل' : 'Phone Battery'}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {phone.battery.toLocaleString()}<span className="text-xs text-gray-400">mAh</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BatteryCalculator;
