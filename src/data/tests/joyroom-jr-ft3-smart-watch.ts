// Lab test data for: joyroom-jr-ft3-smart-watch
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const joyroom_jr_ft3_smart_watch_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Battery life test — always-on display, heart rate monitoring enabled, 14-day continuous use',
                    ar: 'اختبار عمر البطارية — شاشة دائمة التشغيل، مراقبة معدل ضربات القلب مفعلة، 14 يوم استخدام متواصل',
                },
                result: {
                    en: 'Battery lasted 11 days with always-on display and heart rate monitoring (vs 14-day spec). With standard display: 14 days confirmed. Waterproof: tested in pool and shower without issues.',
                    ar: 'البطارية صمدت 11 يوم مع الشاشة الدائمة ومراقبة القلب (مقابل 14 يوم في المواصفات). مع الشاشة العادية: 14 يوم مؤكدة. مقاومة للماء: تم الاختبار في حوض سباحة وحمام بدون مشاكل.',
                },
                conditions: {
                    en: 'Daily wear test, New Damietta City, February',
                    ar: 'اختبار ارتداء يومي، مدينة دمياط الجديدة، فبراير',
                },
                expertName: EXPERTS.ACCESSORIES.name,
                expertProfileUrl: EXPERTS.ACCESSORIES.profileUrl,
                expertTitle: { en: EXPERTS.ACCESSORIES.titleEn, ar: EXPERTS.ACCESSORIES.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'ساعة جوي روم بطاريتها بتدوم كام يوم فعلاً؟',
                answer: 'في اختبارنا في كايرو فولت: 11 يوم مع شاشة دائمة + مراقبة القلب، و 14 يوم مع الإعدادات الاعتيادية. مقاومة للماء اتأكدت في حوض سباحة.',
            },
        {
            question: 'الشاحن ده أمان على موبايلي ولا ممكن يأذيه؟',
            answer: 'أمان تماماً — فيه حماية متعددة الطبقات من الشحن الزائد وارتفاع الحرارة ومعتمد من UL.',
        },
        ],
        voiceFaqEn: [
            {
                question: 'How long does the Joyroom smart watch battery actually last?',
                answer: 'In our CairoVolt test: 11 days with always-on display + heart rate monitoring, and 14 days with standard settings. Water resistance confirmed in pool testing.',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 15' },
            { name: 'Samsung Galaxy A55' },
            { name: 'Android Smartphones' },
        ],
        labMetrics: {
            batteryLife_hours: 264,
        },
    };
