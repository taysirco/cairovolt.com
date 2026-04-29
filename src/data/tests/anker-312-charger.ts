// Lab test data for: anker-312-charger
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_312_charger_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Budget charger safety test — 5V/2.4A output stability under continuous 8-hour charging',
                    ar: 'اختبار أمان الشاحن الاقتصادي — ثبات التيار 5V/2.4A تحت الشحن المتواصل 8 ساعات',
                },
                result: {
                    en: 'Stable 5V/2.4A output maintained for 8 hours continuous. Max temperature 42°C (vs 65°C+ for counterfeit chargers). Safe for overnight charging.',
                    ar: 'تيار ثابت 5V/2.4A لمدة 8 ساعات متواصلة. أقصى حرارة 42 مئوية (مقابل 65+ مئوية للشواحن المقلدة). آمن للشحن طوال الليل.',
                },
                conditions: {
                    en: 'Compared against 5 counterfeit chargers from local Cairo markets, summer 2025',
                    ar: 'مقارنة بـ 5 شواحن مقلدة من أسواق القاهرة، صيف 2025',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'الشاحن ده آمن أشحن بيه طول الليل؟',
                answer: 'أيوة، اختبرناه في كايرو فولت 8 ساعات متواصلة. حرارته وصلت 42 مئوية بس، في حين الشواحن المقلدة وصلت 65+ مئوية وممكن تبدأ نيران. آمن للشحن الليلي.',
            },
        {
            question: 'الشاحن ده أمان على موبايلي ولا ممكن يأذيه؟',
            answer: 'أمان تماماً — فيه حماية متعددة الطبقات من الشحن الزائد وارتفاع الحرارة ومعتمد من UL.',
        },
        ],
        voiceFaqEn: [
            {
                question: 'Is this Anker charger safe for overnight charging?',
                answer: 'Yes, tested at CairoVolt for 8 continuous hours. Max temperature was 42°C, while counterfeit chargers reached 65°C+ and pose fire risks. Safe for overnight charging.',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 15' },
            { name: 'Samsung Galaxy A55' },
            { name: 'Android Smartphones' },
        ],
        labMetrics: {
            maxTemp_C: 42,
            chargingSpeed_W: 12,
        },
    };
