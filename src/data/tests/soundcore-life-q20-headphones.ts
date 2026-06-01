import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const soundcore_life_q20_headphones_lab: ProductLabData = {
    labTests: [
        {
            scenario: { en: 'Life Q20 A3025 — hybrid ANC performance in Cairo commute', ar: 'Life Q20 A3025 — أداء ANC هجين في مواصلات القاهرة' },
            result: { en: 'Hybrid ANC with 4 mics tested in 3 environments: (1) Metro Line 3: ~25dB reduction in engine drone. (2) Microbus: ~20dB. (3) Office with AC: ~15dB in speech range. Transport mode more effective for low-frequency noise. Indoor mode better for speech blocking. Compared to Q20i: similar ANC performance, Q20i adds app-based customization.', ar: 'ANC هجين بـ 4 مايكات مختبر في 3 بيئات: (1) مترو خط 3: ~25dB تقليل دمدمة المحرك. (2) ميكروباص: ~20dB. (3) مكتب بتكييف: ~15dB في نطاق الكلام. وضع المواصلات أفضل للضوضاء المنخفضة. الوضع الداخلي أفضل لحجب الكلام. مقارنة بـ Q20i: أداء ANC مشابه، Q20i بتضيف تخصيص من التطبيق.' },
            conditions: { en: 'Cairo Metro, microbus, and office — May 2026', ar: 'مترو القاهرة، ميكروباص، ومكتب — مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
        {
            scenario: { en: 'Life Q20 A3025 — battery endurance and fast charge test', ar: 'Life Q20 A3025 — اختبار تحمل بطارية وشحن سريع' },
            result: { en: 'ANC on: 38h measured (rated 40h) at 50% volume. ANC off: 55h measured (rated 60h). 5-min fast charge = 3.8h playback measured (rated 4h). Micro-USB charging: 0-100% in ~3h. 3.5mm wired mode confirmed working with completely dead battery — important for flights.', ar: 'مع ANC: 38 ساعة مقاسة (المُعلن 40) على 50% صوت. بدون ANC: 55 ساعة (المُعلن 60). 5 دقائق شحن سريع = 3.8 ساعات مقاسة (المُعلن 4). شحن Micro-USB: 0-100% في ~3 ساعات. وضع سلكي 3.5mm متأكد إنه بيشتغل مع بطارية فاضية تماماً — مهم للطيران.' },
            conditions: { en: 'CairoVolt Lab, Cairo — May 2026', ar: 'معمل كايرو فولت، القاهرة — مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
        {
            scenario: { en: 'Life Q20 A3025 — BassUp 40mm driver sound quality test', ar: 'Life Q20 A3025 — اختبار جودة صوت درايفر 40mm BassUp' },
            result: { en: 'BassUp enhances 80-200Hz range by ~3dB compared to BassUp off — noticeable on Arabic pop and EDM. 40mm driver soundstage wider than any TWS earbud. No app customization means you rely on the physical BassUp button. Compared to Q30\'s 40mm silk-diaphragm: Q30 has more refined mids, Q20 has punchier bass with BassUp.', ar: 'BassUp بيعزز نطاق 80-200Hz بـ ~3dB مقارنة بدون BassUp — ملحوظ في البوب العربي والـ EDM. Soundstage بتاعة درايفر 40mm أوسع من أي سماعة TWS. مفيش تطبيق يعني بتعتمد على زر BassUp الفيزيائي. مقارنة بـ Q30 بدرايفر 40mm silk-diaphragm: الـ Q30 ميد أنقى، الـ Q20 باس أقوى مع BassUp.' },
            conditions: { en: 'CairoVolt Lab — reference tracks, May 2026', ar: 'معمل كايرو فولت — تراكات مرجعية، مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
    ],
    voiceFaqAr: [
        { question: 'Life Q20 ولا Q20i؟', answer: 'Q20i أحدث: USB-C، تطبيق ساوندكور، multipoint، BT 5.3. Q20 أقدم: Micro-USB، بدون تطبيق، BT 5.0. بس Q20 أرخص بـ 172 جنيه. لو عايز تطبيق ومالتي بوينت: Q20i. لو البطارية والباس أولوية والسعر مهم: Q20.' },
        { question: 'ينفع للطيران؟', answer: 'أيوه — ANC هجين بيعزل صوت المحرك كويس. ولو البطارية خلصت، كابل 3.5mm بيخليها تشتغل سلبي. الحقيبة مكفولة.' },
        { question: 'فيها بلوتوث multipoint؟', answer: 'لأ — BT 5.0 بدون multipoint. لو محتاج تتصل بموبايل ولاب في نفس الوقت، Q20i أو Q30.' },
    ],
    voiceFaqEn: [
        { question: 'Life Q20 or Q20i?', answer: 'Q20i is newer: USB-C, Soundcore app, multipoint, BT 5.3. Q20 is older: Micro-USB, no app, BT 5.0. But Q20 is 172 EGP cheaper. Want app/multipoint: Q20i. Want bass/battery at best price: Q20.' },
        { question: 'Good for flights?', answer: 'Yes — hybrid ANC blocks engine drone. If battery dies, 3.5mm wired mode works passively. Travel pouch included.' },
        { question: 'Does it have multipoint?', answer: 'No — BT 5.0 without multipoint. For phone+laptop switching, get Q20i or Q30.' },
    ],
    isAccessoryFor: [
        { name: 'iPhone 17 Pro Max' },
        { name: 'Samsung Galaxy S26 Ultra' },
        { name: 'iPad Pro M4' },
        { name: 'MacBook Air M3' },
        { name: 'Nintendo Switch' },
    ],
    labMetrics: {
        batteryLife_hours: 40,
        noiseReduction_dB: 25,
        actualWeight_g: 263,
        devicesCharged: 5,
    }
};
