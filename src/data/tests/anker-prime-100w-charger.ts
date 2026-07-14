// Lab test data for: anker-prime-100w-charger
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_prime_100w_charger_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Multi-device charging test — MacBook Pro M3 + iPhone 15 Pro + AirPods simultaneously',
                    ar: 'اختبار شحن متعدد — MacBook Pro M3 + iPhone 15 Pro + AirPods في نفس الوقت',
                },
                result: {
                    en: 'Charged all 3 devices simultaneously with smart power distribution. MacBook got 67W, iPhone got 27W, AirPods got 5W. No overheating. 0-80% MacBook in 55 minutes.',
                    ar: 'شحن الأجهزة الثلاثة في نفس الوقت مع توزيع ذكي للطاقة. الماك بوك أخد 67 واط، الأيفون 27 واط، الأيربودز 5 واط. ما سخنش. 0-80% للماك بوك في 55 دقيقة.',
                },
                conditions: {
                    en: 'Home office, Cairo, Egyptian 220V grid, summer 2025',
                    ar: 'مكتب منزلي، القاهرة، شبكة 220 فولت المصرية، صيف 2025',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'شاحن انكر 100 واط بيشحن المنافذ الاتنين في نفس الوقت؟',
                answer: 'أيوة، اختبرناه في مختبر كايرو فولت. شحن ماك بوك + أيفون + أيربودز في نفس الوقت بتوزيع ذكي للطاقة. الماك وصل 80% في 55 دقيقة بس.',
            },
            {
                question: 'ينفع أستخدم شاحن انكر 100 واط للماك بوك؟',
                answer: 'أيوة وزيادة. كابل USB-C بس، وبيشحن الماك بوك برو أسرع من الشاحن الأصلي بتاع ابل في بعض الأحيان.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'Does the Anker 100W charger charge multiple devices at once?',
                answer: 'Yes, tested at CairoVolt Labs. Charged MacBook + iPhone + AirPods simultaneously with smart power distribution. MacBook reached 80% in just 55 minutes.',
            },
        ],
        isAccessoryFor: [
            { name: 'Apple MacBook Pro M3' },
            { name: 'iPhone 15 Pro Max' },
            { name: 'iPad Pro' },
            { name: 'Dell XPS Laptop' },
        ],
        labMetrics: {
            maxTemp_C: 40,
            chargingSpeed_W: 100,
            devicesCharged: 4,
        },
    };
