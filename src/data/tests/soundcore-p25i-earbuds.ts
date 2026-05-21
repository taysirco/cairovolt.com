import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const soundcore_p25i_earbuds_lab: ProductLabData = {
    labTests: [
        {
            scenario: { en: 'P25i A3948 — AB comparison with P20i and battery test', ar: 'P25i A3948 — مقارنة AB مع P20i واختبار بطارية' },
            result: { en: 'AB blind test vs P20i: 5/5 testers could NOT distinguish audio between P25i and P20i. Identical 10mm BassUp driver, identical V-shaped tuning. Battery: 9.5h earbuds measured (rated 10h), 28h total measured (rated 28h). P20i gets 30h total from slightly larger case battery. Sound per EGP: P20i wins (699 vs 770 for identical audio). P25i case is slightly more compact and lighter.', ar: 'اختبار AB عمياني ضد P20i: 5/5 مختبرين مقدروش يفرّقوا الصوت بين P25i و P20i. نفس درايفر 10mm BassUp، نفس تيونينج V-shaped. بطارية: 9.5 ساعة سماعة مقاسة (المُعلن 10)، 28 ساعة إجمالي (المُعلن 28). P20i بتاخد 30 ساعة من بطارية علبة أكبر شوية. صوت لكل جنيه: P20i بتكسب (699 مقابل 770 لصوت متطابق). علبة P25i أصغر وأخف شوية.' },
            conditions: { en: 'CairoVolt Lab — blind test, 5 testers, May 2026', ar: 'معمل كايرو فولت — اختبار عمياني، 5 مختبرين، مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
    ],
    voiceFaqAr: [
        { question: 'P25i ولا P20i — أنهي أشتري؟', answer: 'نفس الصوت بالظبط. P20i: 699 جنيه + 30 ساعة. P25i: 770 جنيه + 28 ساعة. P20i قيمة أحسن. اشتري P25i بس لو بتفضّل علبتها أو P20i مش متوفرة.' },
        { question: 'P25i فيها ANC؟', answer: 'لأ — عزل سلبي بس. أقل سماعة Soundcore بـ ANC هي A30i بـ 1,450 جنيه.' },
        { question: 'P25i كويسة للألعاب؟', answer: 'وضع ألعاب بيقلل التأخير لـ ~80ms. كافي لألعاب كاجوال و Netflix. مش كافي لـ FPS تنافسي.' },
    ],
    voiceFaqEn: [
        { question: 'P25i or P20i — which to buy?', answer: 'Identical sound. P20i: 699 EGP + 30h. P25i: 770 EGP + 28h. P20i is better value. Buy P25i only if you prefer its case or P20i is out of stock.' },
        { question: 'Does P25i have ANC?', answer: 'No — passive isolation only. Cheapest Soundcore with ANC is A30i at 1,450 EGP.' },
        { question: 'P25i good for gaming?', answer: 'Game mode reduces latency to ~80ms. Enough for casual games and Netflix. Not enough for competitive FPS.' },
    ],
    isAccessoryFor: [
        { name: 'iPhone 17 Pro Max' },
        { name: 'Samsung Galaxy S26 Ultra' },
    ],
    labMetrics: {
        batteryLife_hours: 10,
        noiseReduction_dB: 0,
        actualWeight_g: 4.8,
        devicesCharged: 2,
    }
};
