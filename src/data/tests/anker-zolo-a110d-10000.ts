// Lab test data for: anker-zolo-a110d-10000
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_zolo_a110d_10000_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'University student all-day test — Ain Shams University campus, pocket carry 8 AM to 6 PM, iPhone 17 + AirPods charged',
                    ar: 'اختبار طالب جامعة يوم كامل — حرم جامعة عين شمس، حمل في الجيب من 8 ص لـ 6 م، شحن iPhone 17 + AirPods',
                },
                result: {
                    en: 'iPhone 17 charged from 0% to 100% once and from 0% to 55% a second time (155% total). AirPods Pro 2 charged once. Power bank stayed cool (max 36°C in 35°C ambient). 220g comfortable in jeans pocket all day. USB-C 22.5W delivered consistent fast charging between lectures.',
                    ar: 'شحن iPhone 17 من 0% لـ 100% مرة ومن 0% لـ 55% مرة تانية (155% إجمالي). ايربودز برو 2 شحنت مرة. الباور بانك فضل بارد (أقصى 36°C في حرارة 35°C حواليه). 220 جرام مريح في جيب الچينز يوم كامل. USB-C بـ 22.5 واط شحن سريع ثابت بين المحاضرات.',
                },
                conditions: {
                    en: 'Ain Shams University campus, Cairo — October 2025, 10-hour student day, 35°C ambient',
                    ar: 'حرم جامعة عين شمس، القاهرة — أكتوبر 2025، يوم دراسي 10 ساعات، حرارة 35°C',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'أنكر زولو 10000 يكفي طالب جامعة يوم كامل؟',
                answer: 'أيوة! اختبرناه في جامعة عين شمس 10 ساعات. شحن ايفون 17 مرة ونص + ايربودز. 220 جرام مريح في الجيب ومسخنش.',
            },
            {
                question: 'الشحن السريع 22.5 واط بيفرق فعلاً؟',
                answer: 'جداً! ايفون 17 من 0 لـ 50% في حوالي 30 دقيقة — يعني استراحة بين محاضرتين كافية تملاه نص.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'Does the Anker Zolo 10000 last a full university day?',
                answer: 'Yes! We tested it at Ain Shams University for 10 hours. Charged iPhone 17 1.5 times + AirPods. 220g fits comfortably in jeans pocket and stayed cool.',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 17' },
            { name: 'Samsung Galaxy S26' },
            { name: 'AirPods Pro 2' },
        ],
        labMetrics: {
            actualCapacity_mAh: 9600,
            maxTemp_C: 36,
            chargingSpeed_W: 22.5,
            realEfficiency: 72,
            devicesCharged: 2,
            actualWeight_g: 220,
        },
    };
