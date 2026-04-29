// Lab test data for: anker-bio-based-cable
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_bio_based_cable_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Durability bending test — 10,000 bend cycles at 90° angle at connector junction',
                    ar: 'اختبار متانة الثني — 10,000 دورة ثني بزاوية 90 درجة عند نقطة التوصيل',
                },
                result: {
                    en: 'Passed 10,000 bend cycles with zero signal degradation or physical damage. Compared to cheap cables that fail at 500-800 cycles on average.',
                    ar: 'اجتاز 10,000 دورة ثني بدون أي تدهور في الإشارة أو ضرر مادي. مقارنة بالكابلات الرخيصة التي تتعطل عند 500-800 دورة في المتوسط.',
                },
                conditions: {
                    en: 'Automated bending machine, CairoVolt QA Lab, Damietta City, January',
                    ar: 'ماكينة ثني آلية، مختبر فحص كايرو فولت، دمياط الجديدة، يناير',
                },
                expertName: EXPERTS.CABLES.name,
                expertProfileUrl: EXPERTS.CABLES.profileUrl,
                expertTitle: { en: EXPERTS.CABLES.titleEn, ar: EXPERTS.CABLES.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'الكابل ده بيتقطع بسرعة زي الكابلات الرخيصة؟',
                answer: 'لا، اختبرناه في مختبر كايرو فولت بـ 10,000 ثنية بدون ما يتضرر. الكابلات الرخيصة بتتكسر عند 500-800 ثنية. الفرق ضخم جداً.',
            },
        {
            question: 'الشاحن ده أمان على موبايلي ولا ممكن يأذيه؟',
            answer: 'أمان تماماً — فيه حماية متعددة الطبقات من الشحن الزائد وارتفاع الحرارة ومعتمد من UL.',
        },
        ],
        voiceFaqEn: [
            {
                question: 'Does this Anker cable break quickly like cheap cables?',
                answer: 'No, we tested it at CairoVolt with 10,000 bends without damage. Cheap cables typically fail at 500-800 bends. The difference is massive.',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 15 Pro Max' },
            { name: 'iPad Pro' },
            { name: 'MacBook Pro' },
            { name: 'Samsung Galaxy S24' },
        ],
        labMetrics: {
            bendCycles: 10000,
        },
    };
