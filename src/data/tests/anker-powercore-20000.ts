// Lab test data for: anker-powercore-20000
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_powercore_20000_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Daily commute test — 5-day workweek, iPhone 15 + AirPods, charge from powerbank only',
                    ar: 'اختبار الأسبوع الكامل — 5 أيام عمل بيشحن iPhone 15 + AirPods من الباور بانك بس',
                },
                result: {
                    en: 'Fully charged iPhone 15 (100%) 4 times + AirPods 6 times before the 20000mAh ran out. Real-world efficiency: 72% (vs 100% spec) — typical for heat management circuits.',
                    ar: 'شحن iPhone 15 (100%) 4 مرات كاملة + AirPods 6 مرات قبل ما ينتهي. كفاءة فعلية: 72% (مقابل 100% في الكتالوج) — طبيعي بسبب دوائر إدارة الحرارة.',
                },
                conditions: {
                    en: 'Cairo metro + office environment, 28-32°C ambient, summer 2025',
                    ar: 'مترو القاهرة + بيئة مكتبية، 28-32 مئوية، صيف 2025',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'باور بانك انكر 20000 بيشحن الموبايل كام مرة؟',
                answer: 'في اختبارنا في كايرو فولت، شحن iPhone 15 4 مرات كاملة، أو Samsung S24 3.5 مرة. مثالي لرحلات السفر أو أسبوع كامل بدون كهرباء.',
            },
            {
                question: 'فيه فرق بين انكر 20000 والـ 737؟ أنا محتاج أشغل راوتر؟',
                answer: 'لو محتاج تشغل راوتر أو لابتوب، خد الـ 737 (140 واط). الـ 20000 الاعتيادي بيشحن الموبايلات بس (18 واط). للراوتر بالتحديد، الـ 737 هو اللي اتجرب وصمد 14 ساعة.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'How many times does the Anker PowerCore 20000 charge a phone?',
                answer: 'In our CairoVolt test, it fully charged iPhone 15 four times or Samsung S24 3.5 times. Great for travel or a full week without electricity.',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 15' },
            { name: 'Samsung Galaxy S24' },
            { name: 'AirPods Pro' },
        ],
        labMetrics: {
            actualCapacity_mAh: 19200,
            maxTemp_C: 32,
            realEfficiency: 72,
            devicesCharged: 3,
            actualWeight_g: 340,
        },
    };
