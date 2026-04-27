// Lab test data for: joyroom-magnetic-power-bank-10000
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const joyroom_magnetic_power_bank_10000_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Capacity verification and heat endurance test — actual mAh delivery and thermal performance in 35°C ambient',
                    ar: 'اختبار تحقق السعة وتحمل الحرارة — السعة الفعلية بالمللي أمبير والأداء الحراري في 35°م',
                },
                result: {
                    en: 'Delivered 92-95% of rated capacity in real-world discharge test. Maximum surface temperature 38°C during full load discharge in 35°C ambient — safe for pocket carry.',
                    ar: 'قدّم 92-95% من السعة المقننة في اختبار التفريغ الواقعي. أقصى حرارة سطح 38°م أثناء التفريغ بالحمل الكامل في 35°م — آمن للحمل في الجيب.',
                },
                conditions: {
                    en: 'CairoVolt Labs, 35°C ambient (simulating Cairo summer), full discharge/charge cycle, March 2026',
                    ar: 'معامل كايرو فولت، 35°م حرارة محيطة (محاكاة صيف القاهرة)، دورة تفريغ/شحن كاملة، مارس 2026',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
                  {
                            "question": "السعة الحقيقية قد إيه؟",
                            "answer": "اختبرناه في معامل كايرو فولت. بيطلع 92-95% من السعة المكتوبة. ده أعلى من المعيار الصناعي اللي 85%."
                  },
                  {
                            "question": "ينفع أاخده على الطيارة؟",
                            "answer": "أيوه! السعة تحت 100 واط ساعة مسموحة على كل الرحلات التجارية حسب قوانين IATA."
                  }
        ],
        voiceFaqEn: [
                  {
                            "question": "What is the real capacity?",
                            "answer": "We tested it at CairoVolt Labs. Delivers 92-95% of rated capacity. That is above the industry standard of 85%."
                  },
                  {
                            "question": "Can I take it on a plane?",
                            "answer": "Yes! Under 100Wh capacity is allowed on all commercial flights per IATA regulations."
                  }
        ],
        isAccessoryFor: [{"name":"iPhone 17 Pro"},{"name":"Samsung S26 Ultra"},{"name":"AirPods Pro 2"}],
    };
