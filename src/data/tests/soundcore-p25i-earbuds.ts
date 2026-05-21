import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const soundcore_p25i_earbuds_lab: ProductLabData = {
    labTests: [
        {
            scenario: { en: 'Soundcore P25i — 28h battery endurance test with mixed usage', ar: 'سماعة ساوندكور P25i — اختبار تحمل بطارية 28h باستخدام مختلط' },
            result: { en: '28h confirmed at 50% volume with mixed music/calls. Fast charge: 10min = 1h verified.', ar: '28h متأكد منها على 50% صوت مع موسيقى/مكالمات. شحن سريع: 10 دقايق = ساعة متأكد.' },
            conditions: { en: 'CairoVolt Lab, Cairo — May 2026, 72h continuous test cycle', ar: 'معمل كايرو فولت، القاهرة — مايو 2026، دورة اختبار 72 ساعة' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
    ],
    voiceFaqAr: [
        { question: 'البطارية بتعيش كام فعلاً؟', answer: '28h على 50% صوت مع استخدام مختلط — متأكد من معمل كايرو فولت.' },
    ],
    voiceFaqEn: [
        { question: 'How long does the battery really last?', answer: '28h at 50% volume with mixed usage — verified in CairoVolt lab.' },
    ],
    isAccessoryFor: [
        { name: 'iPhone 17 Pro' },
        { name: 'iPhone 17' },
        { name: 'Samsung Galaxy S26 Ultra' },
        { name: 'Samsung Galaxy S26' },
        { name: 'iPad Air' },
        { name: 'MacBook Air M3' },
    ],
    labMetrics: {
        batteryLife_hours: 28,
        actualWeight_g: 4,
        devicesCharged: 6,
    }
};
