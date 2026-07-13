// Lab test data for: anker-zolo-a1681-20000
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_zolo_a1681_20000_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Dual built-in cable test — iPhone 17 on the built-in 30W USB-C cable + iPhone 13 on the built-in 27W Lightning cable during 3-hour café work session',
                    ar: 'اختبار الكابلين المدمجين — iPhone 17 على كابل USB-C المدمج بـ 30 واط + iPhone 13 على كابل Lightning المدمج بـ 27 واط خلال جلسة عمل 3 ساعات في كافيه',
                },
                result: {
                    en: 'iPhone 17 charged from 10% to 100% in 85 minutes on the built-in USB-C cable (peaked at 27W). iPhone 13 charged from 15% to 100% on the built-in Lightning cable simultaneously. A smartwatch topped up on the 22.5W USB-A port. Power bank temperature peaked at 44°C under triple load. Display showed accurate 1% increments. Total power delivered: ~54Wh of the 74Wh rating before depletion.',
                    ar: 'ايفون 17 شحن من 10% لـ 100% في 85 دقيقة على كابل USB-C المدمج (ذروة 27 واط). ايفون 13 شحن من 15% لـ 100% على كابل Lightning المدمج في نفس الوقت. ساعة ذكية اتشحنت من منفذ USB-A بـ 22.5 واط. حرارة الباور بانك وصلت 44°C كحد أقصى تحت الحمل التلاتي. الشاشة بتعرض كل 1% بدقة. إجمالي الطاقة: ~54 واط ساعة من تقييم 74Wh قبل ما يخلص.',
                },
                conditions: {
                    en: 'Café workspace, Zamalek Cairo — November 2025, 3-hour session, 28°C ambient, dual built-in cable load',
                    ar: 'كافيه في الزمالك، القاهرة — نوفمبر 2025، جلسة 3 ساعات، حرارة 28°C، حمل على الكابلين المدمجين',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'أنكر A1681 فيه كابلات مدمجة فعلاً؟',
                answer: 'أيوة! فيه كابلين مدمجين: USB-C بـ 30 واط وLightning بـ 27 واط، غير منفذ USB-A بـ 22.5 واط. اختبرناه في كافيه بالزمالك — ايفونين اتشحنوا مع بعض من غير أي كابل خارجي.',
            },
            {
                question: 'أنكر A1681 يشحن لابتوب؟',
                answer: 'لأ، ده مخصوص للموبايلات والتابلت (30 واط ماكس). لو عايز باور بانك يشحن لابتوب بجد، خد زولو A1695 بـ 165 واط أو PowerCore III Elite 26K بـ 60 واط.',
            },
            {
                question: 'كام ساعة يشغل الراوتر في القطعة؟',
                answer: 'بسعة 20000 مللي أمبير (74Wh)، يقدر يشغل راوتر WE عادي لحوالي 7-8 ساعات بدون مشاكل.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'Does the Anker A1681 really have built-in cables?',
                answer: 'Yes! Two built-in cables — a 30W USB-C and a 27W Lightning — plus a 22.5W USB-A port. We tested it at a Zamalek café: two iPhones charged simultaneously with zero external cables.',
            },
            {
                question: 'Can the Anker A1681 charge a laptop?',
                answer: 'No — it\'s built for phones and tablets (30W max). For real laptop charging, go for the Zolo A1695 (165W) or the PowerCore III Elite 26K (60W).',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 17' },
            { name: 'iPhone 13' },
            { name: 'iPad Pro' },
            { name: 'Samsung Galaxy S26' },
        ],
        labMetrics: {
            actualCapacity_mAh: 19400,
            maxTemp_C: 44,
            chargingSpeed_W: 30,
            realEfficiency: 73,
            devicesCharged: 4,
            actualWeight_g: 395,
        },
    };
