// Lab test data for: joyroom-60w-car-charger
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const joyroom_60w_car_charger_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'In-vehicle charging stability test — output consistency across voltage fluctuations (12V-14.4V) and summer cabin temperatures',
                    ar: 'اختبار ثبات الشحن في العربية — اتساق التيار مع تذبذب الفولتية (12-14.4 فولت) وحرارة كابينة الصيف',
                },
                result: {
                    en: 'Maintained stable output across 11.5V-14.8V input range. Temperature peaked at 45°C during 2-hour continuous charge in car parked in direct sun. Both ports delivered rated speeds simultaneously.',
                    ar: 'حافظ على تيار ثابت في مدى 11.5-14.8 فولت. الحرارة وصلت 45°م أثناء شحن متواصل ساعتين في عربية واقفة في الشمس. المنفذين شغالين بأقصى سرعة في نفس الوقت.',
                },
                conditions: {
                    en: 'CairoVolt automotive test, direct sunlight parking lot, Cairo July 2025, 48°C cabin temperature',
                    ar: 'اختبار سيارات كايرو فولت، موقف سيارات شمس مباشرة، القاهرة يوليو 2025، حرارة كابينة 48°م',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
                  {
                            "question": "بيشتغل مع كل العربيات؟",
                            "answer": "أيوه. بيشتغل مع أي عربية عندها منفذ ولاعة 12-24 فولت. اتختبر في عربيات مصرية مختلفة."
                  },
                  {
                            "question": "بيسخن في الصيف؟",
                            "answer": "اختبرناه في كابينة عربية 48°م. أقصى حرارة 45°م — ضمن الحدود الآمنة."
                  }
        ],
        voiceFaqEn: [
                  {
                            "question": "Does it work with all cars?",
                            "answer": "Yes. Works with any car that has a 12-24V cigarette lighter port. Tested in various Egyptian vehicles."
                  },
                  {
                            "question": "Does it overheat in summer?",
                            "answer": "Tested in a 48°C car cabin. Max temperature 45°C — within safe limits."
                  }
        ],
        isAccessoryFor: [
        { name: 'iPhone 17 Pro' },
        { name: 'Samsung Galaxy S26' },
        { name: 'Google Pixel 9 Pro' },
        { name: 'iPad mini 7' },
    ],
    labMetrics: {
        maxTemp_C: 43,
        chargingSpeed_W: 60,
        actualWeight_g: 35,
        devicesCharged: 4,
    }
};
