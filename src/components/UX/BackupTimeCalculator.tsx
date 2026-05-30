'use client';
import { useState } from 'react';

interface BackupTimeCalculatorProps {
    locale: string;
    /** Product display name (used in the subtitle text) */
    productName: string;
    /** Battery capacity in mAh (e.g. 24000, 10000) */
    batteryCapacityMah: number;
    /** Battery capacity in Wh (e.g. 86.4, 37). If not provided, estimated from mAh at 3.6V nominal. */
    batteryWh?: number;
}

/*
 * ═══════════════════════════════════════════════════════════════════
 * Device power-consumption assumptions (used for backup-time math)
 * ═══════════════════════════════════════════════════════════════════
 *
 * Router (WE / Vodafone VDSL):
 *   Typical draw ≈ 6 W (measured on WE HG630 and HG633).
 *   DC-DC conversion efficiency from power bank ≈ 85 %.
 *   → Effective draw from battery ≈ 6 / 0.85 ≈ 7.06 W.
 *   Max router hours = batteryWh / 7.06  (rounded down to nearest 0.5).
 *
 * Smartphone (iPhone 15–17 Pro Max / Samsung S24–S26 Ultra):
 *   Typical battery ≈ 4500 mAh (16.65 Wh @ 3.7 V).
 *   Charge efficiency ≈ 80 % (cable + phone overhead).
 *   → One full charge costs ≈ 4500 / 0.80 = 5625 mAh from power bank.
 *   Phone charges = floor(batteryCapacityMah / 5625).
 *
 * Laptop (MacBook Air M2/M3 / Dell XPS 13):
 *   Typical battery ≈ 52 Wh.
 *   Charge efficiency ≈ 90 % (USB-C PD).
 *   → One full charge costs ≈ 52 / 0.90 ≈ 57.8 Wh from power bank.
 *   Laptop charges = batteryWh / 57.8  (rounded to nearest 0.5).
 * ═══════════════════════════════════════════════════════════════════
 */

/** Nominal Li-ion voltage for mAh → Wh conversion (V) */
const NOMINAL_VOLTAGE = 3.6;

/** Router effective draw in Wh (6 W / 0.85 efficiency) */
const ROUTER_EFFECTIVE_WATTS = 7.06;

/** Smartphone mAh per full charge (4500 mAh / 0.80 efficiency) */
const PHONE_MAH_PER_CHARGE = 5625;

/** Laptop Wh per full charge (52 Wh / 0.90 efficiency) */
const LAPTOP_WH_PER_CHARGE = 57.8;

export default function BackupTimeCalculator({
    locale,
    productName,
    batteryCapacityMah,
    batteryWh,
}: BackupTimeCalculatorProps) {
    const [hours, setHours] = useState<number>(2);
    const [device, setDevice] = useState<string>('WE VDSL Router');

    const isArabic = locale === 'ar';

    // Derive Wh from mAh if not provided (mAh × 3.6 V / 1000)
    const effectiveWh = batteryWh ?? (batteryCapacityMah * NOMINAL_VOLTAGE) / 1000;

    // Pre-compute device-specific numbers
    const maxRouterHours = Math.floor((effectiveWh / ROUTER_EFFECTIVE_WATTS) * 2) / 2; // round to 0.5
    const phoneCharges = Math.floor(batteryCapacityMah / PHONE_MAH_PER_CHARGE);
    const laptopCharges = Math.round((effectiveWh / LAPTOP_WH_PER_CHARGE) * 2) / 2; // round to 0.5

    const devices = [
        { value: 'WE VDSL Router', labelAr: 'راوتر إنترنت منزلي (WE/Vodafone)', labelEn: 'Home Internet Router (WE/Vodafone)' },
        { value: 'MacBook Pro M2', labelAr: 'لابتوب ماك بوك أو ديل', labelEn: 'MacBook Pro or Dell Laptop' },
        { value: 'iPhone 15 Pro Max', labelAr: 'هاتف ذكي رئيسي', labelEn: 'Smartphone (iPhone/Samsung)' },
    ];

    const getResult = () => {
        if (device === 'WE VDSL Router' && hours <= maxRouterHours) {
            return {
                ok: true,
                text: isArabic
                    ? `✅ هذا الباور بانك سيشغل الراوتر الخاص بك لـ ${hours} ساعات بكل سهولة (أقصى قدرة ${maxRouterHours} ساعة).`
                    : `✅ This power bank will run your router for ${hours} hours easily (max capacity: ${maxRouterHours} hours).`,
            };
        }
        if (device === 'WE VDSL Router' && hours > maxRouterHours) {
            return {
                ok: false,
                text: isArabic
                    ? `⚠️ أقصى طاقة فعلية هي ${maxRouterHours} ساعة لراوتر VDSL. للمدد الأطول، ستحتاج باور بانك إضافي.`
                    : `⚠️ Max actual capacity is ${maxRouterHours} hours for a VDSL router. For longer durations, you'll need an additional power bank.`,
            };
        }
        if (device === 'iPhone 15 Pro Max') {
            return {
                ok: true,
                text: isArabic
                    ? `✅ سيقوم بشحن هاتفك بالكامل من 0 إلى 100% تقريباً ${phoneCharges} ${phoneCharges > 2 ? 'مرات' : 'مرة'}!`
                    : `✅ It will fully charge your phone from 0 to 100% approximately ${phoneCharges} ${phoneCharges === 1 ? 'time' : 'times'}!`,
            };
        }
        // Laptop
        return {
            ok: laptopCharges >= 1,
            text: isArabic
                ? laptopCharges >= 1
                    ? `${laptopCharges >= 1.5 ? '✅' : '⚠️'} اللابتوب يستهلك طاقة عالية. سيكفي لتشغيله أو شحنه بالكامل ${laptopCharges === 1 ? 'مرة واحدة' : `${laptopCharges} مرة`} تقريباً.`
                    : `⚠️ سعة هذا الباور بانك غير كافية لشحن لابتوب بالكامل. يمكنه شحنه جزئياً فقط.`
                : laptopCharges >= 1
                    ? `${laptopCharges >= 1.5 ? '✅' : '⚠️'} Laptops consume high power. It will run or fully charge it approximately ${laptopCharges} ${laptopCharges === 1 ? 'time' : 'times'}.`
                    : `⚠️ This power bank's capacity is not enough for a full laptop charge. It can only partially charge it.`,
        };
    };

    const result = getResult();

    // Dynamic slider max: at least 15, but extend if maxRouterHours > 15
    const sliderMax = Math.max(15, Math.ceil(maxRouterHours) + 2);

    return (
        <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-6 rounded-xl my-8 shadow-2xl border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                {isArabic ? '⚡ حاسبة مختبر كايرو فولت لأزمة الكهرباء' : '⚡ CairoVolt Power Outage Calculator'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {isArabic
                    ? `احسب بدقة كم ساعة سيصمد جهازك على هذا الباور بانك (${productName}) قبل الشراء.`
                    : `Calculate exactly how long your device will last on the ${productName} power bank before buying.`}
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
                        max={sliderMax}
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
