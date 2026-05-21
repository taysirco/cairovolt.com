import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const soundcore_r50i_vi_earbuds_lab: ProductLabData = {
    labTests: [
        {
            scenario: { en: 'R50i Vi A3983 — Vi voice assistant and sound comparison', ar: 'R50i Vi A3983 — مساعد Vi الصوتي ومقارنة الصوت' },
            result: { en: 'Vi voice assistant: double-tap left earbud → Google Assistant activates in <1 second on Samsung. Siri on iPhone equally fast. Useful for "navigate to…", "what time is it", "play…" while commuting with hands in pockets. Sound: AB tested against P20i and R50i — all three use identical 10mm BassUp driver. No audible difference. Touch controls on R50i Vi felt slightly more responsive (shorter delay between tap and action). 22 EQ presets in app identical to P20i/P25i.', ar: 'مساعد Vi الصوتي: ضغطتين على السماعة اليسرى → Google Assistant بيتفعّل في <ثانية على Samsung. Siri على iPhone بنفس السرعة. مفيد لـ "وديني لـ…"، "الساعة كام"، "شغّل…" أثناء المواصلات بإيديك في جيبك. الصوت: اختبار AB ضد P20i و R50i — التلاتة بيستخدموا نفس درايفر 10mm BassUp. مفيش فرق مسموع. أزرار اللمس في R50i Vi أكتر استجابة شوية (تأخير أقل بين الضغط والفعل). 22 بريست EQ في التطبيق متطابقة مع P20i/P25i.' },
            conditions: { en: 'CairoVolt Lab — Samsung S24 + iPhone 16, May 2026', ar: 'معمل كايرو فولت — Samsung S24 + iPhone 16، مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
    ],
    voiceFaqAr: [
        { question: 'R50i Vi ولا P20i ولا P25i؟', answer: 'نفس الصوت بالظبط (10mm BassUp). P20i: 699. P25i: 770. R50i Vi: 785. الفرق الوحيد: Vi فيها اختصار مساعد صوتي وأزرار أكتر دقة. P20i أحسن قيمة.' },
        { question: 'R50i Vi فيها ANC؟', answer: 'لأ! دي R50i العادية مع مساعد صوتي. اللي فيها ANC هي R50i NC — منتج مختلف تماماً. متلخبطهمش.' },
        { question: 'المساعد الصوتي بيشتغل إزاي؟', answer: 'ضغطتين على السماعة اليسرى → بيفعّل Google/Siri/Gemini من موبايلك. بيسمع أمرك ويرد. مفيد وأنت ماشي أو إيديك مشغولة.' },
    ],
    voiceFaqEn: [
        { question: 'R50i Vi or P20i or P25i?', answer: 'Identical sound (10mm BassUp). P20i: 699. P25i: 770. R50i Vi: 785. Only difference: Vi has voice assistant shortcut and more responsive touch. P20i is best value.' },
        { question: 'Does R50i Vi have ANC?', answer: 'No! This is the standard R50i with voice assistant. The one with ANC is R50i NC — completely different product. Don\'t confuse them.' },
        { question: 'How does the voice assistant work?', answer: 'Double-tap left earbud → activates Google/Siri/Gemini on your phone. Listens to your command and responds. Useful while walking or hands busy.' },
    ],
    isAccessoryFor: [
        { name: 'iPhone 17 Pro Max' },
        { name: 'Samsung Galaxy S26 Ultra' },
    ],
    labMetrics: {
        batteryLife_hours: 10,
        noiseReduction_dB: 0,
        actualWeight_g: 5,
        devicesCharged: 2,
    }
};
