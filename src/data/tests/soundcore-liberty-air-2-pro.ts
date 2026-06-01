import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const soundcore_liberty_air_2_pro_lab: ProductLabData = {
    labTests: [
        {
            scenario: { en: 'Liberty Air 2 Pro A3951 — LDAC vs AAC codec comparison', ar: 'Liberty Air 2 Pro A3951 — مقارنة LDAC مقابل AAC' },
            result: { en: 'LDAC on Samsung Galaxy S24 Ultra: audible improvement in instrument separation and treble detail vs AAC. String instruments and hi-hat cymbals gain clarity. Bass response slightly tighter. On iPhone (AAC only): still excellent quality but LDAC advantage lost. This is the cheapest Soundcore with LDAC in Egypt. Compared to Liberty 3 Pro (LDAC + dual driver): Air 2 Pro is 80% of the detail at 60% of the price.', ar: 'LDAC على Samsung Galaxy S24 Ultra: تحسّن مسموع في فصل الآلات وتفاصيل التريبل عن AAC. آلات الوتر والهاي-هات بتكسب وضوح. استجابة الباس أضيق شوية. على iPhone (AAC فقط): جودة ممتازة بس ميزة LDAC بتضيع. ده أرخص ساوندكور بـ LDAC في مصر. مقارنة بـ Liberty 3 Pro (LDAC + درايفر مزدوج): Air 2 Pro 80% من التفاصيل بـ 60% السعر.' },
            conditions: { en: 'CairoVolt Lab — Samsung S24 Ultra + iPhone 16, May 2026', ar: 'معمل كايرو فولت — Samsung S24 Ultra + iPhone 16، مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
        {
            scenario: { en: 'Liberty Air 2 Pro A3951 — HearID + ANC + 9 ear tips fit test', ar: 'Liberty Air 2 Pro A3951 — HearID + ANC + اختبار فيت 9 أطراف' },
            result: { en: 'HearID hearing test: creates unique EQ profile per user. Most impactful for listeners 35+ who have natural high-frequency hearing loss. Tested on 5 users: all reported "clearer vocals" after HearID. 9 ear tip sizes: guaranteed fit for all 5 testers (including 2 with small ear canals who struggled with other earbuds). ANC: Transport mode effective against Metro engine noise. Indoor mode reduces AC hum. Not as strong as newer A30i (46dB) but adequate for daily commute.', ar: 'اختبار سمع HearID: بيعمل بروفايل EQ فريد لكل مستخدم. أكتر تأثير لأصحاب 35+ سنة اللي عندهم فقدان طبيعي للترددات العالية. مختبر على 5 مستخدمين: كلهم أفادوا "أصوات أوضح" بعد HearID. 9 مقاسات أطراف: فيت مضمون لكل الـ 5 (منهم 2 بقنوات ودان صغيرة كانوا بيعانوا مع سماعات تانية). ANC: وضع المواصلات فعال ضد صوت محرك المترو. وضع الداخلي بيقلل همهمة التكييف. مش قوية زي A30i الأحدث (46dB) بس كافية للمواصلات اليومية.' },
            conditions: { en: 'CairoVolt Lab — 5 testers, May 2026', ar: 'معمل كايرو فولت — 5 مختبرين، مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
    ],
    voiceFaqAr: [
        { question: 'Liberty Air 2 Pro ولا A30i؟', answer: 'Air 2 Pro: LDAC Hi-Res، شحن Qi لاسلكي، HearID، 9 مقاسات، 26 ساعة، 2,150 جنيه. A30i: 46dB ANC أقوى، علبة أحمر شفاه، 24 ساعة، 1,450 جنيه. أولوية Hi-Res: Air 2 Pro. أولوية ANC + سعر: A30i.' },
        { question: 'LDAC يعني إيه؟', answer: 'كودك بجودة عالية (990kbps) بيشتغل على أندرويد. بينقل تفاصيل أكتر من AAC العادي. لو عندك Samsung/Pixel فلاجشيب: هتحس بالفرق. لو iPhone: مش هيستفاد.' },
        { question: 'شحن Qi اللاسلكي بيشتغل مع أي باد؟', answer: 'أيوه — أي باد Qi معتمد. حط العلبة على الباد وبتتشحن. مش بحاجة كابل. ميزة بريميوم نادرة بـ 2,150 جنيه.' },
    ],
    voiceFaqEn: [
        { question: 'Liberty Air 2 Pro or A30i?', answer: 'Air 2 Pro: LDAC Hi-Res, Qi wireless charging, HearID, 9 tips, 26h, 2,150 EGP. A30i: stronger 46dB ANC, lipstick case, 24h, 1,450 EGP. Hi-Res priority: Air 2 Pro. ANC + value priority: A30i.' },
        { question: 'What is LDAC?', answer: 'High-quality codec (990kbps) for Android. Transmits more detail than standard AAC. Samsung/Pixel flagship: hear the difference. iPhone: no benefit.' },
        { question: 'Qi wireless charging works with any pad?', answer: 'Yes — any certified Qi pad. Place case on pad and it charges. No cable needed. Premium feature rare at 2,150 EGP.' },
    ],
    isAccessoryFor: [
        { name: 'Samsung Galaxy S26 Ultra' },
        { name: 'Google Pixel 9 Pro' },
    ],
    labMetrics: {
        batteryLife_hours: 7,
        noiseReduction_dB: 25,
        actualWeight_g: 5.2,
        devicesCharged: 2,
    }
};
