// Lab test data for: joyroom-30w-pd-cable
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const joyroom_30w_pd_cable_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Durability and charging speed test — bend cycle endurance and sustained fast charging verification',
                    ar: 'اختبار متانة وسرعة شحن — تحمل دورات الثني والتحقق من الشحن السريع المستمر',
                },
                result: {
                    en: 'Passed 20,000+ bend cycles at 90° angles without conductor break. Maintained full rated charging speed after 180 days of daily use by CairoVolt test team.',
                    ar: 'اجتاز 20,000+ دورة ثني بزوايا 90° بدون كسر الموصل. حافظ على سرعة الشحن الكاملة بعد 180 يوم استخدام يومي من فريق كايرو فولت.',
                },
                conditions: {
                    en: 'CairoVolt durability lab, automated bend tester + 6-month daily carry test, 2025-2026',
                    ar: 'معمل متانة كايرو فولت، اختبار ثني آلي + اختبار حمل يومي 6 أشهر، 2025-2026',
                },
                expertName: EXPERTS.CABLES.name,
                expertProfileUrl: EXPERTS.CABLES.profileUrl,
                expertTitle: { en: EXPERTS.CABLES.titleEn, ar: EXPERTS.CABLES.titleAr },
            },
        ],
        voiceFaqAr: [
                  {
                            "question": "الكابل ده بيتحمل السحب والثني؟",
                            "answer": "اتختبر لـ 20,000+ دورة ثني. يعني 3-5 سنين استخدام يومي عادي من غير مشاكل."
                  },
                  {
                            "question": "هل الكابل ده بيدعم نقل البيانات؟",
                            "answer": "أيوه، بيدعم شحن سريع ونقل بيانات في نفس الوقت. سرعة USB 2.0 يعني 480 ميجابت في الثانية."
                  }
        ],
        voiceFaqEn: [
                  {
                            "question": "Can this cable handle daily bending?",
                            "answer": "Tested for 20,000+ bend cycles. That is 3-5 years of normal daily use without issues."
                  },
                  {
                            "question": "Does this cable support data transfer?",
                            "answer": "Yes, it supports fast charging and data transfer simultaneously. USB 2.0 speed means 480 Mbps."
                  }
        ],
        isAccessoryFor: [
        { name: 'iPhone 17 Pro Max' },
        { name: 'Samsung Galaxy S26 Ultra' },
        { name: 'MacBook Air M3' },
        { name: 'iPad Pro M4' },
    ],
    labMetrics: {
        maxTemp_C: 36,
        bendCycles: 20000,
        actualWeight_g: 32,
        devicesCharged: 4,
    }
};
