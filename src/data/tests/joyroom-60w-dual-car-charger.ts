// Lab test data for: joyroom-60w-dual-car-charger
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const joyroom_60w_dual_car_charger_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Summer highway driving — iPhone 15 Pro Max + Samsung S23 Ultra with GPS at max brightness',
                    ar: 'سيناريو السفر في الصيف — iPhone 15 Pro Max + Samsung S23 Ultra مع تشغيل GPS بأقصى إضاءة',
                },
                result: {
                    en: 'Charged both phones from 15% to 70% in 40 minutes with no thermal throttling during North Coast highway driving in August.',
                    ar: 'شحن الهاتفين من 15% لـ 70% في 40 دقيقة بدون فصل حراري أثناء القيادة على طريق الساحل في أغسطس.',
                },
                conditions: {
                    en: 'North Coast highway, August noon, car AC running, ambient ~42°C',
                    ar: 'طريق الساحل الشمالي، ظهراً في أغسطس، تكييف السيارة شغال، حرارة ~42 مئوية',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'الشاحن ده بيفصل في الصيف لو الحرارة عالية؟',
                answer: 'لا، اختبرناه في مختبر كايرو فولت في أسوأ ظروف: زحمة طريق الساحل ظهراً في أغسطس. شحن تليفونين في نفس الوقت من 15% لـ 70% في 40 دقيقة بدون ما يفصل من السخونة.',
            },
        {
            question: 'الشاحن ده أمان على موبايلي ولا ممكن يأذيه؟',
            answer: 'أمان تماماً — فيه حماية متعددة الطبقات من الشحن الزائد وارتفاع الحرارة ومعتمد من UL.',
        },
        ],
        voiceFaqEn: [
            {
                question: 'Does this car charger overheat in summer?',
                answer: 'No, we tested it at CairoVolt Labs in worst conditions: North Coast highway driving in August noon. Charged two phones simultaneously from 15% to 70% in 40 minutes with no thermal throttling.',
            },
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
            chargingSpeed_W: 60,
            devicesCharged: 5,
        },
    };
