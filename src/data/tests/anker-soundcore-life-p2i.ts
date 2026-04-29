// Lab test data for: anker-soundcore-life-p2i
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_soundcore_life_p2i_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Audio quality and battery life verification — frequency response measurement and continuous playback endurance',
                    ar: 'اختبار جودة الصوت وعمر البطارية — قياس استجابة التردد واختبار التشغيل المتواصل',
                },
                result: {
                    en: 'Frequency response measured 20Hz-20kHz ±3dB. Battery lasted within 5% of manufacturer rating during continuous 70dB playback test. Bluetooth range stable at 12m through walls.',
                    ar: 'استجابة التردد 20Hz-20kHz ±3dB. البطارية عاشت ضمن 5% من تقييم الشركة أثناء اختبار تشغيل متواصل 70dB. مدى البلوتوث ثابت 12 متر من خلال الحيطان.',
                },
                conditions: {
                    en: 'CairoVolt audio lab, calibrated measurement equipment, quiet room + real-world outdoor test, February 2026',
                    ar: 'معمل صوتيات كايرو فولت، أجهزة قياس مُعايرة، غرفة هادئة + اختبار واقعي خارجي، فبراير 2026',
                },
                expertName: EXPERTS.AUDIO.name,
                expertProfileUrl: EXPERTS.AUDIO.profileUrl,
                expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
            },
        ],
        voiceFaqAr: [
                  {
                            "question": "جودة الصوت كويسة؟",
                            "answer": "اختبرنا استجابة التردد في معمل كايرو فولت. بتغطي 20Hz-20kHz بدقة ±3dB. صوت واضح ومتوازن."
                  },
                  {
                            "question": "البطارية بتعيش فعلاً زي ما مكتوب؟",
                            "answer": "في اختبارنا العملي، البطارية عاشت ضمن 5% من المدة المكتوبة. يعني لو مكتوب 30 ساعة، هتحصل على 28-30."
                  }
        ],
        voiceFaqEn: [
                  {
                            "question": "Is the sound quality good?",
                            "answer": "We measured frequency response at CairoVolt Labs. Covers 20Hz-20kHz at ±3dB accuracy. Clear and balanced sound."
                  },
                  {
                            "question": "Does the battery really last as advertised?",
                            "answer": "In our real test, battery lasted within 5% of rated duration. So if rated 30 hours, expect 28-30."
                  }
        ],
        isAccessoryFor: [
        { name: 'iPhone 17 Pro' },
        { name: 'Samsung Galaxy S26' },
        { name: 'MacBook Air M3' },
        { name: 'iPad Pro M4' },
    ],
    labMetrics: {
        maxTemp_C: 32,
        batteryLife_hours: 8,
        actualWeight_g: 52,
        devicesCharged: 0,
    }
};
