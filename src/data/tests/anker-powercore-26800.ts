// Lab test data for: anker-powercore-26800
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_powercore_26800_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Family trip endurance test — 5 devices (2 iPhones + 2 Samsung + 1 iPad) on Cairo-Hurghada highway round trip (10 hours total driving)',
                    ar: 'اختبار رحلة عائلية — 5 أجهزة (ايفونين + سامسونجين + ايباد) على طريق القاهرة-الغردقة ذهاباً وإياباً (10 ساعات قيادة إجمالي)',
                },
                result: {
                    en: 'Fully charged all 5 devices from 10-15% to 90%+ each, rotating across the 3 ports. Total delivery: 4.7 full charges. Zero thermal incidents at 41°C cabin temperature with windows up. The USB-C port held a steady 60W PD for the iPad while both USB-A ports kept phones charging throughout. Total drive time covered without running out.',
                    ar: 'شحن 5 أجهزة بالكامل من 10-15% لـ 90%+ كل واحد بالتبادل على الـ 3 منافذ. إجمالي: 4.7 شحنة كاملة. صفر حوادث حرارية عند 41 مئوية درجة حرارة المقصورة مع رفع الزجاج. منفذ USB-C ثبت على 60 واط PD للآيباد ومنفذي USB-A فضلوا شاحنين الموبايلات طول الوقت. كفت وزادت طوال رحلة القيادة.',
                },
                conditions: {
                    en: 'Cairo-Hurghada round trip, August 2025, 5 devices, cabin 41°C, 530km each way',
                    ar: 'القاهرة-الغردقة ذهاباً وإياباً، أغسطس 2025، 5 أجهزة، مقصورة 41 مئوية، 530 كم لكل اتجاه',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'باور بانك أنكر PowerCore III Elite 26K يشحن كام جهاز في رحلة الغردقة؟',
                answer: 'اختبرناه في رحلة القاهرة-الغردقة وإياباً. شحن 5 أجهزة (ايفونين + سامسونجين + ايباد) من 10% لـ 90%+ كل واحد. يكفي لرحلة طويلة للعيلة كلها.',
            },
            {
                question: 'أنكر PowerCore III Elite 26K مسموح في الطائرة؟',
                answer: 'أيوة! سعته 92.16Wh أقل من حد الطيران 100Wh، فمسموح بيه معاك في الطائرة من غير مشاكل.',
            },
            {
                question: 'PowerCore III Elite 26K يشحن لابتوب؟',
                answer: 'أيوة بجد! منفذ USB-C PD بتاعه بيطلع 60 واط — يشحن ماك بوك اير ومعظم لابتوبات USB-C بسرعة محترمة. ولو عايز أسرع، زولو A1695 بيطلع 165 واط.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'How many devices does the Anker PowerCore III Elite 26K charge on a Hurghada trip?',
                answer: 'We tested it on a Cairo-Hurghada round trip. Charged 5 devices (2 iPhones + 2 Samsungs + 1 iPad) from 10% to 90%+ each. Covers a whole family trip.',
            },
            {
                question: 'Is the Anker PowerCore III Elite 26K allowed on planes?',
                answer: 'Yes! At 92.16Wh it\'s under the 100Wh airline limit, so it\'s carry-on approved with no issues.',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 15 Pro Max' },
            { name: 'Samsung Galaxy S24 Ultra' },
            { name: 'iPad Pro' },
            { name: 'MacBook Air' },
        ],
        labMetrics: {
            actualCapacity_mAh: 24400,
            maxTemp_C: 41,
            chargingSpeed_W: 60,
            realEfficiency: 70,
            devicesCharged: 4.7,
            actualWeight_g: 500,
        },
    };
