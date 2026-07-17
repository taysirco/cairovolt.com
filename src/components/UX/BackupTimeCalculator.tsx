'use client';
import { useState } from 'react';

interface BackupTimeCalculatorProps {
    locale: string;
    /** Current product name (e.g. "انكر برايم 25,000") — shown in the result copy */
    productName: string;
    /** Pack nominal capacity in mAh (cell-level), parsed from the product's "Capacity" spec */
    batteryCapacityMah: number;
    /** Pack energy in Wh when the spec lists it (e.g. "86.4Wh") — preferred over the mAh estimate */
    batteryWh?: number;
}

// Transparent assumptions used only to produce an indicative range. Users
// should replace them with the consumption/capacity listed for their device.
const ROUTER_W = 10;
const PHONE_CHARGE_WH = 19;
const LAPTOP_CHARGE_WH = 70;
const OUTPUT_EFFICIENCY_LOW = 0.75;
const OUTPUT_EFFICIENCY_HIGH = 0.85;
const NOMINAL_CELL_V = 3.7; // mAh → Wh conversion when Wh isn't listed

/**
 * BackupTimeCalculator — Interactive calculator for how long THIS power bank
 * can run a router / laptop / phone during a power outage. All figures are
 * computed from the actual product's battery capacity (passed in as props),
 * so the numbers are correct per product instead of hardcoded to one model.
 */
export default function BackupTimeCalculator({
    locale,
    productName,
    batteryCapacityMah,
    batteryWh,
}: BackupTimeCalculatorProps) {
    const [hours, setHours] = useState<number>(2);
    const [device, setDevice] = useState<string>('WE VDSL Router');

    const isArabic = locale === 'ar';

    // Prefer the listed Wh; otherwise estimate from mAh at nominal cell voltage.
    const packWh = batteryWh && batteryWh > 0
        ? batteryWh
        : (batteryCapacityMah * NOMINAL_CELL_V) / 1000;
    const usableWhLow = packWh * OUTPUT_EFFICIENCY_LOW;
    const usableWhHigh = packWh * OUTPUT_EFFICIENCY_HIGH;

    const routerHoursLow = usableWhLow / ROUTER_W;
    const routerHoursHigh = usableWhHigh / ROUTER_W;
    const phoneChargesLow = usableWhLow / PHONE_CHARGE_WH;
    const phoneChargesHigh = usableWhHigh / PHONE_CHARGE_WH;
    const laptopChargesLow = usableWhLow / LAPTOP_CHARGE_WH;
    const laptopChargesHigh = usableWhHigh / LAPTOP_CHARGE_WH;

    const range = (low: number, high: number, digits = 1) =>
        `${low.toFixed(digits)}–${high.toFixed(digits)}`;

    const devices = [
        { value: 'WE VDSL Router', labelAr: 'راوتر إنترنت منزلي (WE/Vodafone)', labelEn: 'Home Internet Router (WE/Vodafone)' },
        { value: 'MacBook Pro M2', labelAr: 'لابتوب ماك بوك أو ديل', labelEn: 'MacBook Pro or Dell Laptop' },
        { value: 'iPhone 15 Pro Max', labelAr: 'هاتف ذكي رئيسي', labelEn: 'Smartphone (iPhone/Samsung)' },
    ];

    const getResult = () => {
        if (device === 'WE VDSL Router') {
            if (hours <= routerHoursLow) {
                return {
                    ok: true,
                    text: isArabic
                        ? `التقدير الحسابي لـ ${productName} مع راوتر يستهلك 10 واط هو نحو ${range(routerHoursLow, routerHoursHigh)} ساعة؛ مدة ${hours} ساعة تقع داخل هذا النطاق التقديري.`
                        : `Using a 10W router assumption, the calculated range for ${productName} is about ${range(routerHoursLow, routerHoursHigh)} hours; ${hours} hours falls within that estimate.`,
                };
            }
            if (hours <= routerHoursHigh) {
                return {
                    ok: false,
                    text: isArabic
                        ? `مدة ${hours} ساعة قريبة من الحد الأعلى للتقدير (${range(routerHoursLow, routerHoursHigh)} ساعة). قِس استهلاك الراوتر الفعلي واترك هامشاً قبل الاعتماد عليها.`
                        : `${hours} hours is near the upper end of the ${range(routerHoursLow, routerHoursHigh)}-hour estimate. Check the router's actual draw and leave a margin.`,
                };
            }
            return {
                ok: false,
                text: isArabic
                    ? `مدة ${hours} ساعة أعلى من النطاق الحسابي التقريبي (${range(routerHoursLow, routerHoursHigh)} ساعة) وفق افتراض استهلاك 10 واط.`
                    : `${hours} hours exceeds the approximate ${range(routerHoursLow, routerHoursHigh)}-hour range using a 10W consumption assumption.`,
            };
        }
        if (device === 'iPhone 15 Pro Max') {
            return {
                ok: true,
                text: isArabic
                    ? `التقدير نحو ${range(phoneChargesLow, phoneChargesHigh)} شحنة لهاتف طاقته 19Wh. النتيجة تتغير حسب الهاتف والاستخدام والحرارة.`
                    : `The estimate is about ${range(phoneChargesLow, phoneChargesHigh)} charges for a 19Wh phone battery. Device use and temperature change the result.`,
            };
        }
        return {
            ok: laptopChargesLow >= 1,
            text: isArabic
                ? `التقدير نحو ${range(laptopChargesLow, laptopChargesHigh)} شحنة لبطارية لابتوب 70Wh، بشرط أن يدعم الباور بانك قدرة الخرج المطلوبة.`
                : `The estimate is about ${range(laptopChargesLow, laptopChargesHigh)} charges for a 70Wh laptop battery, provided the power bank supports the required output wattage.`,
        };
    };

    const result = getResult();

    return (
        <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-6 rounded-xl my-8 shadow-2xl border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                {isArabic ? '⚡ حاسبة كايرو فولت التقديرية للطاقة' : '⚡ CairoVolt Estimated Runtime Calculator'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {isArabic
                    ? `احسب نطاقاً تقديرياً للطاقة على ${productName}. نفترض فاقد تحويل بين 15% و25%؛ النتيجة ليست اختباراً أو وعد أداء.`
                    : `Calculate an indicative energy range for ${productName}. This assumes 15–25% conversion loss and is not a test result or performance promise.`}
            </p>

            <div className="space-y-4">
                <div>
                    <label htmlFor="bt-device" className="block text-sm mb-1">
                        {isArabic ? 'الجهاز المراد تشغيله:' : 'Device to power:'}
                    </label>
                    <select
                        id="bt-device"
                        className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded p-2 text-gray-900 dark:text-white"
                        value={device}
                        onChange={(e) => setDevice(e.target.value)}
                    >
                        {devices.map(d => (
                            <option key={d.value} value={d.value}>
                                {isArabic ? d.labelAr : d.labelEn}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="bt-hours" className="block text-sm mb-1">
                        {isArabic ? 'مدة انقطاع الكهرباء المتوقعة (ساعات):' : 'Expected power outage duration (hours):'}
                    </label>
                    <input
                        id="bt-hours"
                        type="range"
                        min="1"
                        max="15"
                        value={hours}
                        onChange={(e) => setHours(parseInt(e.target.value))}
                        className="w-full accent-blue-500"
                        aria-valuetext={`${hours} ${isArabic ? 'ساعات' : 'hours'}`}
                    />
                    <div className="text-center font-bold text-lg text-blue-600 dark:text-blue-300">
                        {hours} {isArabic ? 'ساعات' : 'hours'}
                    </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500/50 rounded-lg text-center">
                    <p className={`font-bold ${result.ok ? 'text-green-700 dark:text-green-400' : 'text-yellow-800 dark:text-yellow-400'}`}>
                        {result.text}
                    </p>
                </div>
            </div>
        </div>
    );
}
