import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const soundcore_select_4_go_speaker_lab: ProductLabData = {
    labTests: [
        {
            scenario: { en: 'Select 4 Go A3129 — IP67, float test, and 20h battery', ar: 'Select 4 Go A3129 — IP67، اختبار طفو، و20 ساعة بطارية' },
            result: { en: 'IP67 submersion: survived 30min at 1m depth — speaker played audio underwater (muffled but functional). Float test: speaker floats face-up on pool surface, keeps playing. Sand/dust test: sealed after Cairo desert dust simulation. 20h battery: 19.5h measured at 50%. 5W output: fills a bathroom/shower comfortably. Poolside for 2-3 people: adequate. Not for outdoor parties. TWS pairing: 2 units create clear stereo imaging at 3m separation. 9-band EQ via app is excellent for a pocket speaker.', ar: 'غمر IP67: نجحت 30 دقيقة على عمق 1 متر — السبيكر شغّلت صوت تحت المية (مكتوم بس شغال). اختبار طفو: السبيكر بتطفو وجهها لفوق على سطح المسبح، بتفضل بتشغّل. اختبار رمل/غبار: مختومة بعد محاكاة غبار صحراء القاهرة. 20 ساعة بطارية: 19.5 مقاسة على 50%. 5 واط: بتملأ حمام/دش بسهولة. جنب المسبح لـ 2-3 أشخاص: كافية. مش لحفلات خارجية. ربط TWS: 2 وحدة بيعملوا تصوير ستيريو واضح على فصل 3 متر. 9-باند EQ من التطبيق ممتاز لسبيكر جيب.' },
            conditions: { en: 'CairoVolt pool + bathroom — May 2026', ar: 'مسبح + حمام كايرو فولت — مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
    ],
    voiceFaqAr: [
        { question: 'Select 4 Go ولا JBL Go 4؟', answer: 'Select 4 Go: IP67 + بتطفو، 20 ساعة، 9-باند EQ، TWS، 1,249 جنيه. JBL Go 4: IP67، 7 ساعة بس، EQ أبسط، أغلى. Select 4 Go بتكسب في البطارية والسعر.' },
        { question: 'بتطفو فعلاً؟', answer: 'أيوه — متختبرة. بتطفو وجهها لفوق على سطح المسبح وبتفضل بتشغّل. IP67 يعني ممكن تغطسها لحد 1 متر لـ 30 دقيقة.' },
        { question: '5 واط مش ضعيفة؟', answer: 'للاستخدام الشخصي كافية: دش، مكتب، جنب المسبح لـ 2-3. مش للحفلات — لده Rave 3 (200 واط) بـ 9,450 جنيه.' },
    ],
    voiceFaqEn: [
        { question: 'Select 4 Go or JBL Go 4?', answer: 'Select 4 Go: IP67 + floats, 20h, 9-band EQ, TWS, 1,249 EGP. JBL Go 4: IP67, only 7h, simpler EQ, pricier. Select 4 Go wins on battery and price.' },
        { question: 'Does it really float?', answer: 'Yes — tested. Floats face-up on pool surface and keeps playing. IP67 means submersible to 1m for 30 minutes.' },
        { question: 'Is 5W too weak?', answer: 'For personal use: shower, desk, poolside for 2-3. Not for parties — for that, Rave 3 (200W) at 9,450 EGP.' },
    ],
    isAccessoryFor: [],
    labMetrics: {
        batteryLife_hours: 20,
        noiseReduction_dB: 0,
        actualWeight_g: 220,
        devicesCharged: 0,
    }
};
