// Lab test data for: anker-525-power-bank
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_525_power_bank_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Student backpack test — all-day university use, 10,000mAh, charging Samsung + earbuds',
                    ar: 'اختبار الطالب — استخدام يوم كامل في الجامعة، 10,000 مللي أمبير، شحن سامسونج + سماعات',
                },
                result: {
                    en: 'Charged Samsung A55 from 10% to 100% twice, plus 3 full earbuds charges. Slim profile fits any bag pocket. No thermal shutoff during 8-hour use.',
                    ar: 'شحن Samsung A55 من 10% لـ 100% مرتين، زائد 3 مرات شحن سماعات كاملة. رفيع جداً يدخل في جيب أي شنطة. ما وقفش من السخونة طول 8 ساعات.',
                },
                conditions: {
                    en: 'Cairo University campus, 34°C outdoor, summer 2025',
                    ar: 'حرم جامعة القاهرة، 34 مئوية خارج المبنى، صيف 2025',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'الباور بانك الصغير ده هيكفيني ليوم جامعة كامل؟',
                answer: 'أيوة، اختبرناه في كايرو فولت ويكفي ليوم جامعي كامل. بيشحن Samsung A55 مرتين كاملتين، وخفيف جداً على الشنطة.',
            },
        {
            question: 'الشاحن ده أمان على موبايلي ولا ممكن يأذيه؟',
            answer: 'أمان تماماً — فيه حماية متعددة الطبقات من الشحن الزائد وارتفاع الحرارة ومعتمد من UL.',
        },
        ],
        voiceFaqEn: [
            {
                question: 'Is this small power bank enough for a full day at university?',
                answer: 'Yes, we tested it at CairoVolt and it\'s enough for a full university day. Charges Samsung A55 twice fully and is very lightweight for backpacks.',
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
            actualCapacity_mAh: 9800,
            maxTemp_C: 34,
            devicesCharged: 2,
        },
    };
