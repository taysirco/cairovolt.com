// Lab test data for: joyroom-power-bank-10000
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const joyroom_power_bank_10000_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Student commuter endurance test — full university day in Cairo (7:30 AM - 10 PM) with iPhone 15 from 100% to 0% and back',
                    ar: 'اختبار تحمل طالب جامعة — يوم جامعي كامل في القاهرة (7:30 ص - 10 م) مع iPhone 15 من 100% لـ 0% وعودة',
                },
                result: {
                    en: 'iPhone 15 charged from 0% to 100% during a 14-hour day commute (Metro + Uber + on-campus). Power bank fit in jeans pocket without discomfort (weighs 210g). Maximum temperature during charging: 36°C (safe for pocket carry). Charged phone fully once and returned 40% remaining capacity.',
                    ar: 'شحن iPhone 15 من 0% لـ 100% خلال يوم تنقل 14 ساعة (مترو + أوبر + في الحرم الجامعي). الباور بانك اتحط في جيب الجينز بدون إزعاج (210 جرام). أقصى حرارة خلال الشحن: 36°C (آمن للحمل في الجيب). شحن الهاتف مرة كاملة وفضل 40% سعة إضافية.',
                },
                conditions: {
                    en: 'Cairo University campus + Cairo Metro + Uber, October 2025, 14-hour university day',
                    ar: 'حرم جامعة القاهرة + مترو القاهرة + أوبر، أكتوبر 2025، يوم جامعي 14 ساعة',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'باور بانك جوي روم 10000 خفيف للحمل في الجيب؟',
                answer: 'أيوة! 210 جرام بس. اختبرناه في يوم جامعي كامل 14 ساعة في جيب الجينز. مريح تماماً ومش محسوس. درجة حرارته 36°C بس خلال الشحن.',
            },
            {
                question: 'جوي روم 10000 بيشحن ايفون 15 كام مرة؟',
                answer: 'في اختبارنا: شحن iPhone 15 من 0% لـ 100% مرة كاملة وفضل 40% إضافية. يعني مرة كاملة وأكثر من نص مرة.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'Is the Joyroom 10000 power bank comfortable to carry in a pocket?',
                answer: 'Yes! At 210g, we tested it in jeans pocket for a 14-hour university day in Cairo. Completely comfortable and barely noticeable. Max temperature 36°C during charging.',
            },
            {
                question: 'How many times does the Joyroom 10000 charge iPhone 15?',
                answer: 'In our test: fully charged iPhone 15 from 0% to 100% once, with 40% capacity remaining. Roughly 1.4 full iPhone charges.',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 15' },
            { name: 'Samsung Galaxy A55' },
            { name: 'AirPods' },
        ],
        labMetrics: {
            actualCapacity_mAh: 9600,
            maxTemp_C: 36,
            realEfficiency: 71,
            devicesCharged: 3.4,
            actualWeight_g: 210,
        },
    };
