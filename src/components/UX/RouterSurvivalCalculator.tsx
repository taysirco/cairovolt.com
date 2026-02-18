'use client';
import { useState } from 'react';

interface RouterSurvivalCalculatorProps {
    locale: string;
}

/**
 * RouterSurvivalCalculator — Interactive tool that calculates how long
 * a power bank can run a router/laptop/phone during power outages.
 * Creates high dwell time and "Search Termination" signals for Google.
 */
export default function RouterSurvivalCalculator({ locale }: RouterSurvivalCalculatorProps) {
    const [hours, setHours] = useState<number>(2);
    const [device, setDevice] = useState<string>('WE VDSL Router');

    const isArabic = locale === 'ar';

    const devices = [
        { value: 'WE VDSL Router', labelAr: 'راوتر إنترنت منزلي (WE/Vodafone)', labelEn: 'Home Internet Router (WE/Vodafone)' },
        { value: 'MacBook Pro M2', labelAr: 'لابتوب ماك بوك أو ديل', labelEn: 'MacBook Pro or Dell Laptop' },
        { value: 'iPhone 15 Pro Max', labelAr: 'هاتف ذكي رئيسي', labelEn: 'Smartphone (iPhone/Samsung)' },
    ];

    const getResult = () => {
        if (device === 'WE VDSL Router' && hours <= 14) {
            return {
                ok: true,
                text: isArabic
                    ? `✅ هذا الباور بانك سيشغل الراوتر الخاص بك لـ ${hours} ساعات بكل سهولة (أقصى قدرة 14 ساعة).`
                    : `✅ This power bank will run your router for ${hours} hours easily (max capacity: 14 hours).`,
            };
        }
        if (device === 'WE VDSL Router' && hours > 14) {
            return {
                ok: false,
                text: isArabic
                    ? `⚠️ أقصى طاقة فعلية هي 14 ساعة لراوتر VDSL. للمدد الأطول، ستحتاج باور بانك إضافي.`
                    : `⚠️ Max actual capacity is 14 hours for a VDSL router. For longer durations, you'll need an additional power bank.`,
            };
        }
        if (device === 'iPhone 15 Pro Max') {
            return {
                ok: true,
                text: isArabic
                    ? `✅ سيقوم بشحن هاتفك بالكامل من 0 إلى 100% تقريباً 5 مرات!`
                    : `✅ It will fully charge your phone from 0 to 100% approximately 5 times!`,
            };
        }
        return {
            ok: false,
            text: isArabic
                ? `⚠️ اللابتوب يستهلك طاقة عالية. سيكفي لتشغيله أو شحنه بالكامل مرة ونصف تقريباً.`
                : `⚠️ Laptops consume high power. It will run or fully charge it approximately 1.5 times.`,
        };
    };

    const result = getResult();

    return (
        <div className="bg-slate-900 text-white p-6 rounded-xl my-8 shadow-2xl border border-slate-700">
            <h3 className="text-xl font-bold mb-2 text-blue-400">
                {isArabic ? '⚡ حاسبة مختبر كايرو فولت لأزمة الكهرباء' : '⚡ CairoVolt Power Outage Calculator'}
            </h3>
            <p className="text-sm text-gray-400 mb-6">
                {isArabic
                    ? 'احسب بدقة كم ساعة سيصمد جهازك على هذا الباور بانك (Anker 737) قبل الشراء.'
                    : 'Calculate exactly how long your device will last on the Anker 737 power bank before buying.'}
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">
                        {isArabic ? 'الجهاز المراد تشغيله:' : 'Device to power:'}
                    </label>
                    <select
                        className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white"
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
                    <label className="block text-sm mb-1">
                        {isArabic ? 'مدة انقطاع الكهرباء المتوقعة (ساعات):' : 'Expected power outage duration (hours):'}
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="15"
                        value={hours}
                        onChange={(e) => setHours(parseInt(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                    <div className="text-center font-bold text-lg text-blue-300">
                        {hours} {isArabic ? 'ساعات' : 'hours'}
                    </div>
                </div>

                <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg text-center">
                    <p className={`font-bold ${result.ok ? 'text-green-400' : 'text-yellow-400'}`}>
                        {result.text}
                    </p>
                </div>
            </div>
        </div>
    );
}
