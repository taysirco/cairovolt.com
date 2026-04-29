// Lab test data for: joyroom-jr-t03-wireless-earbuds
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const joyroom_jr_t03_wireless_earbuds_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Battery endurance test — continuous music streaming for 8 hours at 70% volume',
                    ar: 'اختبار عمر البطارية — بث موسيقى مستمر لمدة 8 ساعات بمستوى صوت 70%',
                },
                result: {
                    en: 'Lasted 6 hours 45 minutes at 70% volume before first low battery warning. Case charged them back to 100% in 45 minutes. Total usable time with case: approximately 24 hours.',
                    ar: 'استمرت 6 ساعات و45 دقيقة بمستوى صوت 70% قبل أول تحذير بطارية منخفضة. الكيس شحنها لـ 100% في 45 دقيقة. إجمالي الاستخدام مع الكيس: حوالي 24 ساعة.',
                },
                conditions: {
                    en: 'CairoVolt QA Lab, Damietta City, controlled environment, December 2025',
                    ar: 'مختبر كايرو فولت، دمياط الجديدة، بيئة محكومة، ديسمبر 2025',
                },
                expertName: EXPERTS.AUDIO.name,
                expertProfileUrl: EXPERTS.AUDIO.profileUrl,
                expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'سماعات جوي روم اللاسلكية بتدوم كام ساعة فعلاً؟',
                answer: 'في اختبارنا: 6 ساعات و45 دقيقة بمستوى صوت 70%، والكيس يشحنها في 45 دقيقة. إجمالي حوالي 24 ساعة مع الكيس.',
            },
        {
            question: 'السماعة دي بتقطع الصوت ولا ثابتة؟',
            answer: 'بلوتوث 5 يعني اتصال مستقر جداً — ما قطعتش في اختباراتنا حتى في المترو.',
        },
        ],
        voiceFaqEn: [
            {
                question: 'How long do Joyroom wireless earbuds actually last?',
                answer: 'In our CairoVolt test: 6 hours 45 minutes at 70% volume, and the case charges them in 45 minutes. Total approximately 24 hours with the case.',
            },
        ],
        isAccessoryFor: [
        { name: 'iPhone 17 Pro' },
        { name: 'Samsung Galaxy S26' },
        { name: 'MacBook Air M3' },
        { name: 'iPad Pro M4' },
    ],
        labMetrics: {
            batteryLife_hours: 6.75,
        },
    };
