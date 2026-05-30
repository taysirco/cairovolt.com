'use client';
import { useState } from 'react';

interface BackupTimeCalculatorProps {
    locale: string;
    /** Real product name (e.g. "أنكر برايم 25,000") — shown in the result copy */
    productName: string;
    /** Pack nominal capacity in mAh (cell-level), parsed from the product's "Capacity" spec */
    batteryCapacityMah: number;
    /** Pack energy in Wh when the spec lists it (e.g. "86.4Wh") — preferred over the mAh estimate */
    batteryWh?: number;
}

// ── Device power assumptions (typical, real-world — kept honest on purpose) ──
//  • Home VDSL router (WE/Vodafone): ~10 W continuous draw.
//  • Flagship phone full 0→100% charge: ~19 Wh delivered (incl. charging losses).
//  • Ultrabook / MacBook full charge: ~70 Wh delivered (incl. losses).
//  • Output efficiency: a power bank delivers ~85% of its rated energy after
//    DC-DC conversion + cable losses, so usable Wh = packWh × 0.85.
const ROUTER_W = 10;
const PHONE_CHARGE_WH = 19;
const LAPTOP_CHARGE_WH = 70;
const OUTPUT_EFFICIENCY = 0.85;
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
    const usableWh = packWh * OUTPUT_EFFICIENCY;

    const routerMaxHours = Math.max(1, Math.round(usableWh / ROUTER_W));
    const phoneCharges = Math.max(1, Math.round(usableWh / PHONE_CHARGE_WH));
    const laptopCharges = usableWh / LAPTOP_CHARGE_WH; // can be < 1 for small packs

    const devices = [
        { value: 'WE VDSL Router', labelAr: 'راوتر إنترنت منزلي (WE/Vodafone)', labelEn: 'Home Internet Router (WE/Vodafone)' },
        { value: 'MacBook Pro M2', labelAr: 'لابتوب ماك بوك أو ديل', labelEn: 'MacBook Pro or Dell Laptop' },
        { value: 'iPhone 15 Pro Max', labelAr: 'هاتف ذكي رئيسي', labelEn: 'Smartphone (iPhone/Samsung)' },
    ];

    const getResult = () => {
        if (device === 'WE VDSL Router') {
            if (hours <= routerMaxHours) {
                return {
                    ok: true,
                    text: isArabic
                        ? `✅ ${productName} هيشغّل راوتر الإنترنت لـ ${hours} ساعة بسهولة (أقصى ~${routerMaxHours} ساعة متواصلة).`
                        : `✅ ${productName} will run your internet router for ${hours} hours easily (max ~${routerMaxHours} continuous hours).`,
                };
            }
            return {
                ok: false,
                text: isArabic
                    ? `⚠️ أقصى تشغيل فعلي ~${routerMaxHours} ساعة لراوتر VDSL على ${productName}. للمدد الأطول ستحتاج باور بانك إضافي.`
                    : `⚠️ Max realistic runtime is ~${routerMaxHours} hours for a VDSL router on ${productName}. For longer outages you'd need an extra power bank.`,
            };
        }
        if (device === 'iPhone 15 Pro Max') {
            return {
                ok: true,
                text: isArabic
                    ? `✅ هيشحن هاتفك بالكامل من 0% إلى 100% حوالي ${phoneCharges} مرات.`
                    : `✅ It will fully charge your phone from 0% to 100% about ${phoneCharges} times.`,
            };
        }
        // Laptop
        if (laptopCharges >= 1) {
            return {
                ok: true,
                text: isArabic
                    ? `✅ هيشحن لابتوبك بالكامل حوالي ${laptopCharges.toFixed(1)} مرة.`
                    : `✅ It will fully charge your laptop about ${laptopCharges.toFixed(1)} times.`,
            };
        }
        return {
            ok: false,
            text: isArabic
                ? `⚠️ اللابتوب يستهلك طاقة عالية — هيشحنه بنسبة ~${Math.round(laptopCharges * 100)}% من شحنة كاملة تقريبًا.`
                : `⚠️ Laptops draw high power — this will charge it to about ~${Math.round(laptopCharges * 100)}% of a full charge.`,
        };
    };

    const result = getResult();

    return (
        <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-6 rounded-xl my-8 shadow-2xl border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                {isArabic ? '⚡ حاسبة مختبر كايرو فولت لأزمة الكهرباء' : '⚡ CairoVolt Power Outage Calculator'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {isArabic
                    ? `احسب بدقة كم ساعة سيصمد جهازك على ${productName} قبل الشراء.`
                    : `Calculate exactly how long your device will last on ${productName} before buying.`}
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
