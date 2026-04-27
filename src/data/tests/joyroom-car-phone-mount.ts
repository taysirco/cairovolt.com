// Lab test data for: joyroom-car-phone-mount
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const joyroom_car_phone_mount_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Vibration endurance and heat resistance test — suction cup hold strength on Egyptian roads and dashboard temperatures',
                    ar: 'اختبار تحمل الاهتزاز ومقاومة الحرارة — قوة تماسك كاسة الشفط على طرق مصر وحرارة التابلوه',
                },
                result: {
                    en: 'Suction cup maintained grip during 200km mixed-road test (highways + Cairo potholes). Dashboard test at 55°C direct sun exposure — no suction loss. Phone held securely at all angles.',
                    ar: 'كاسة الشفط حافظت على التماسك أثناء اختبار 200 كم طرق مختلطة (طرق سريعة + مطبات القاهرة). اختبار تابلوه في 55°م شمس مباشرة — مفيش فقد شفط. الموبايل ثابت في كل الزوايا.',
                },
                conditions: {
                    en: 'CairoVolt road test, Cairo Ring Road + 6th October + Maadi streets, July 2025 (peak summer)',
                    ar: 'اختبار طريق كايرو فولت، الدائري + 6 أكتوبر + شوارع المعادي، يوليو 2025 (ذروة الصيف)',
                },
                expertName: EXPERTS.ACCESSORIES.name,
                expertProfileUrl: EXPERTS.ACCESSORIES.profileUrl,
                expertTitle: { en: EXPERTS.ACCESSORIES.titleEn, ar: EXPERTS.ACCESSORIES.titleAr },
            },
        ],
        voiceFaqAr: [
                  {
                            "question": "بيستحمل مطبات شوارع القاهرة؟",
                            "answer": "اختبرناه 200 كم على الدائري والمعادي و6 أكتوبر. الموبايل فضل ثابت طول الطريق حتى على المطبات."
                  },
                  {
                            "question": "كاسة الشفط بتسيح في الصيف؟",
                            "answer": "اختبرناها في 55°م شمس مباشرة. مفيش فقد تماسك. المادة صناعية متحملة حرارة صيف مصر."
                  }
        ],
        voiceFaqEn: [
                  {
                            "question": "Can it handle bumpy roads?",
                            "answer": "Tested 200km on Cairo Ring Road, Maadi, and 6th October. Phone stayed secure throughout, even on potholes."
                  },
                  {
                            "question": "Does the suction cup melt in summer?",
                            "answer": "Tested at 55°C direct sun. No suction loss. Industrial-grade material handles Egyptian summer heat."
                  }
        ],
        isAccessoryFor: [{"name":"iPhone 17 Pro Max"},{"name":"Samsung S26 Ultra"}],
    };
