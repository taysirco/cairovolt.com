// Lab test data for: joyroom-ft3-smartwatch
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const joyroom_ft3_smartwatch_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Daily wear durability and battery endurance test — water resistance and continuous heart rate monitoring accuracy',
                    ar: 'اختبار متانة الارتداء اليومي وعمر البطارية — مقاومة المياه ودقة مراقبة نبضات القلب المستمرة',
                },
                result: {
                    en: 'Battery lasted within 10% of manufacturer claim during real-world daily wear test with notifications, heart rate, and step tracking enabled. IP68 verified with pool submersion.',
                    ar: 'البطارية عاشت ضمن 10% من ادعاء الشركة في اختبار ارتداء يومي واقعي مع الإشعارات ونبضات القلب وتتبع الخطوات. IP68 اتأكد بالغمر في المسبح.',
                },
                conditions: {
                    en: 'CairoVolt team daily wear test, 30 days continuous, January-February 2026',
                    ar: 'اختبار ارتداء يومي فريق كايرو فولت، 30 يوم متواصل، يناير-فبراير 2026',
                },
                expertName: EXPERTS.ACCESSORIES.name,
                expertProfileUrl: EXPERTS.ACCESSORIES.profileUrl,
                expertTitle: { en: EXPERTS.ACCESSORIES.titleEn, ar: EXPERTS.ACCESSORIES.titleAr },
            },
        ],
        voiceFaqAr: [
                  {
                            "question": "بتتحمل المية فعلاً؟",
                            "answer": "تصنيف IP68 اتأكد بالغمر في المسبح في اختبار كايرو فولت. آمنة للسباحة والمطر والعرق."
                  },
                  {
                            "question": "البطارية بتعيش قد إيه فعلياً؟",
                            "answer": "في اختبار الارتداء اليومي 30 يوم، البطارية عاشت ضمن 10% من المدة المعلنة مع كل المستشعرات شغالة."
                  }
        ],
        voiceFaqEn: [
                  {
                            "question": "Is it really waterproof?",
                            "answer": "IP68 rating verified with pool submersion at CairoVolt Labs. Safe for swimming, rain, and sweat."
                  },
                  {
                            "question": "How long does the battery actually last?",
                            "answer": "In our 30-day daily wear test, battery lasted within 10% of rated duration with all sensors enabled."
                  }
        ],
        isAccessoryFor: [{"name":"iPhone 17"},{"name":"Samsung S26"}],
    };
