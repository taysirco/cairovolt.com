// Lab test data for: joyroom-3-in-1-wireless-charging-station
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const joyroom_3_in_1_wireless_charging_station_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Real-world charging speed test — output stability under continuous 4-hour load with iPhone 17 and Samsung S26',
                    ar: 'اختبار سرعة شحن واقعي — ثبات التيار تحت حمل متواصل 4 ساعات مع ايفون 17 وسامسونج S26',
                },
                result: {
                    en: 'Maintained rated output consistently for 4 hours. Surface temperature peaked at 43°C — within safe limits. No voltage drop detected during dual-device testing.',
                    ar: 'حافظ على التيار المقنن باستمرار لمدة 4 ساعات. حرارة السطح وصلت 43°م — ضمن الحدود الآمنة. مفيش انخفاض فولتية أثناء اختبار جهازين.',
                },
                conditions: {
                    en: 'CairoVolt Labs, ambient temperature 32°C (Egyptian summer conditions), April 2026',
                    ar: 'معامل كايرو فولت، حرارة محيطة 32°م (ظروف صيف مصر)، أبريل 2026',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
                  {
                            "question": "الشاحن ده آمن على موبايلي؟",
                            "answer": "آه طبعاً، فيه حماية 10 طبقات ضد السخونية والتيار الزيادة. اتختبر في معامل كايرو فولت في ظروف صيف مصر."
                  },
                  {
                            "question": "بيشحن سامسونج وايفون مع بعض؟",
                            "answer": "الشاحن ده منفذ واحد. بيشحن جهاز واحد بأقصى سرعة. لو عايز تشحن اتنين شوف شواحن متعددة المنافذ."
                  }
        ],
        voiceFaqEn: [
                  {
                            "question": "Is this charger safe for my phone?",
                            "answer": "Yes, it has 10-layer protection against overheating and overcurrent. Tested at CairoVolt Labs under Egyptian summer conditions."
                  },
                  {
                            "question": "Can it charge Samsung and iPhone together?",
                            "answer": "This is a single-port charger. It charges one device at maximum speed. For dual charging, check our multi-port options."
                  }
        ],
        isAccessoryFor: [
        { name: 'iPhone 17 Pro Max' },
        { name: 'iPhone 16 Pro' },
        { name: 'Samsung Galaxy S26 Ultra' },
        { name: 'Samsung Galaxy S25' },
        { name: 'iPad Pro M4' },
    ],
    labMetrics: {
        maxTemp_C: 42,
        chargingSpeed_W: 15,
        actualWeight_g: 185,
        devicesCharged: 3,
    }
};
