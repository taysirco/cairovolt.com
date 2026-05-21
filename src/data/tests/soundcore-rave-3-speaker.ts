import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const soundcore_rave_3_speaker_lab: ProductLabData = {
    labTests: [
        {
            scenario: { en: 'Rave 3 A3399 — 200W output, karaoke, and outdoor party test', ar: 'Rave 3 A3399 — 200 واط، كاريوكي، واختبار حفلة خارجية' },
            result: { en: '200W fills rooftop party for 40+ people without distortion at 70%. 6.5" woofer: bass physically felt at 3m — chest-thumping at 1m. AI vocal removal tested on 20 tracks: studio recordings 90% clean, live recordings 70%. 2 wireless mics: 10m range, no feedback when held 1m from speaker. Karaoke echo/reverb effects via app: fun party feature. HexaGlow RGB: 6 LED panels sync to beat — visually impressive in dark. BT 5.3 stable. AUX input for DJ mixer.', ar: '200 واط بتملأ حفلة سطح لـ 40+ شخص بدون تشويه على 70%. ووفر 6.5": باس بتحسّه فيزيائياً على 3 متر — بيخبط في الصدر على 1 متر. إزالة صوت AI متختبرة على 20 تراك: تسجيلات استوديو 90% نضيفة، لايف 70%. 2 مايك لاسلكي: مدى 10 متر، بدون فيدباك لما ماسك المايك على 1 متر من السبيكر. إفكتات كاريوكي صدى/ريفرب من التطبيق: ميزة حفلة ممتعة. HexaGlow RGB: 6 بانل LED متزامنين مع الإيقاع — بصرياً مبهر في الضلمة. BT 5.3 مستقر. مدخل AUX لـ DJ mixer.' },
            conditions: { en: 'CairoVolt rooftop party — 40 guests, May 2026', ar: 'حفلة سطح كايرو فولت — 40 ضيف، مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
    ],
    voiceFaqAr: [
        { question: 'IPX4 ولا IPX7 — بتتحمل المية؟', answer: 'IPX4 = رذاذ فقط. متوقعهاش في المسبح! بتستحمل مطر خفيف ورذاذ. لو محتاج سبيكر للمية: Select 4 Go (IP67 وبتطفو).' },
        { question: '2 مايك لاسلكي متضمنين فعلاً؟', answer: 'أيوه — في العلبة. مش محتاج تشتري مايكات منفصلة. 10 متر مدى. إفكتات ريفرب/صدى من التطبيق. ماكينة كاريوكي جاهزة.' },
        { question: '10 كجم ثقيلة؟', answer: 'أيوه — مفيش عجلات. محتاج شخصين لنقلها أو كارت. ده الثمن بتاعة 200 واط و6.5" ووفر. الصوت يستاهل الوزن.' },
    ],
    voiceFaqEn: [
        { question: 'IPX4 or IPX7 — can it handle water?', answer: 'IPX4 = splash only. Do NOT drop it in the pool! Handles light rain and splashes. For water: Select 4 Go (IP67 and floats).' },
        { question: '2 wireless mics really included?', answer: 'Yes — in the box. No need for separate mic purchase. 10m range. Reverb/echo effects via app. Karaoke machine ready.' },
        { question: '10kg heavy?', answer: 'Yes — no wheels. Need two people to carry or a cart. That\'s the price of 200W and 6.5" woofer. The sound is worth the weight.' },
    ],
    isAccessoryFor: [],
    labMetrics: {
        batteryLife_hours: 12,
        noiseReduction_dB: 0,
        actualWeight_g: 10000,
        devicesCharged: 0,
    }
};
