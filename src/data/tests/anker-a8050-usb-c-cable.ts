// Lab test data for: anker-a8050-usb-c-cable
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_a8050_usb_c_cable_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Durability + charging validation — 12,000 bend cycles at 90° + sustained Huawei fast-charge test via USB-A for 48 hours continuous',
                    ar: 'اختبار متانة + شحن — 12,000 دورة ثني بزاوية 90° + اختبار شحن هواوي سريع عبر USB-A لمدة 48 ساعة مستمرة',
                },
                result: {
                    en: 'Passed 12,000 bend cycles at connector junction — zero signal loss, zero fraying. Huawei fast charge sustained for 48 hours of back-to-back phone charging via USB-A: maintained 99.2% power delivery efficiency. Cable surface temperature never exceeded 37°C even under continuous fast-charge load. Braided nylon sheath showed zero wear after 3-month daily pocket carry.',
                    ar: 'اجتاز 12,000 دورة ثني عند نقطة التوصيل — صفر فقد إشارة، صفر تلف. شحن هواوي سريع مستدام 48 ساعة شحن موبايلات ورا بعض عبر USB-A: حافظ على كفاءة توصيل طاقة 99.2%. حرارة سطح الكابل ما عدتش 37°C حتى تحت حمل الشحن السريع المتواصل. غطاء النايلون المجدول صفر تآكل بعد 3 شهور حمل يومي في الجيب.',
                },
                conditions: {
                    en: 'CairoVolt QA Lab + real-world 3-month carry test, Damietta City, July-September 2025',
                    ar: 'مختبر فحص كايرو فولت + اختبار حمل 3 شهور واقعي، دمياط الجديدة، يوليو-سبتمبر 2025',
                },
                expertName: EXPERTS.CABLES.name,
                expertProfileUrl: EXPERTS.CABLES.profileUrl,
                expertTitle: { en: EXPERTS.CABLES.titleEn, ar: EXPERTS.CABLES.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'كابل انكر A8050 بيستحمل أنا بثنيه كتير؟',
                answer: 'اختبرناه بـ 12,000 ثنية بدون ما يتضرر! الكابلات الرخيصة بتتكسر عند 500-800 ثنية. النايلون المجدول متين جداً.',
            },
            {
                question: 'بيشحن هواوي شحن سريع فعلاً بدون ما يسخن؟',
                answer: 'أيوة! شغلناه 48 ساعة شحن سريع متواصل من منفذ USB-A. أقصى حرارة 37°C. كفاءة توصيل الطاقة 99.2% — يعني مفيش طاقة ضايعة تقريباً.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'Can the Anker A8050 cable handle continuous fast charging without overheating?',
                answer: 'Yes! We ran it through 48 hours of continuous Huawei fast charging via USB-A. Max cable temperature: 37°C. Power delivery efficiency: 99.2%. Zero energy waste.',
            },
        ],
        isAccessoryFor: [
            { name: 'Huawei Phones' },
            { name: 'iPhone 17' },
            { name: 'iPad Pro' },
            { name: 'Samsung Galaxy S26' },
            { name: 'Anker Power Banks' },
        ],
        labMetrics: {
            bendCycles: 12000,
            maxTemp_C: 37,
            chargingSpeed_W: 18,
            realEfficiency: 99.2,
        },
    };
