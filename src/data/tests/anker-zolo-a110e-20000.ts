// Lab test data for: anker-zolo-a110e-20000
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_zolo_a110e_20000_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Cairo power outage marathon test — load-shedding simulation: router + 2 phones over 6 hours with no grid power',
                    ar: 'اختبار ماراثون انقطاع كهربا القاهرة — محاكاة تخفيف أحمال: راوتر + 2 موبايل لمدة 6 ساعات بدون كهربا',
                },
                result: {
                    en: 'Powered a WE router via USB-A for 5 hours 40 minutes continuously. Simultaneously charged iPhone 17 from 0→100% and Samsung A54 from 0→70% via USB-C (30W). Power bank reached 42°C max under triple load in August. Still had 8% remaining after the entire test.',
                    ar: 'شغّل راوتر WE عبر USB-A لمدة 5 ساعات و40 دقيقة بدون انقطاع. في نفس الوقت شحن ايفون 17 من 0→100% وسامسونج A54 من 0→70% عبر USB-C (30 واط). الباور بانك وصل 42°C كحد أقصى تحت حمل ثلاثي في أغسطس. فضل فيه 8% بعد الاختبار كامل.',
                },
                conditions: {
                    en: 'Ain Shams apartment, Cairo — August 2025 load-shedding season, 6-hour no-grid simulation, 38°C room',
                    ar: 'شقة في عين شمس، القاهرة — موسم تخفيف أحمال أغسطس 2025، محاكاة 6 ساعات بدون كهربا، حرارة الغرفة 38°C',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'أنكر زولو 20000 يشغل الراوتر كام ساعة في القطعة؟',
                answer: 'في اختبارنا شغل راوتر WE لمدة 5 ساعات و40 دقيقة متواصلة وكمان شحن موبايلين في نفس الوقت! ده في حرارة أغسطس كمان.',
            },
            {
                question: 'بيشحن بـ 30 واط فعلاً؟',
                answer: 'أيوة! منفذ USB-C بيوفر 30 واط PD حقيقي. ايفون 17 من 0 لـ 50% في حوالي 25 دقيقة. اتأكدنا بالقياس في مختبرنا.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'How long does the Anker Zolo 20000 power a router during Egyptian blackouts?',
                answer: 'In our test: 5 hours 40 minutes for a WE router, while simultaneously charging 2 phones. Still had 8% left afterward. Tested in August heat.',
            },
        ],
        isAccessoryFor: [
            { name: 'WE Router' },
            { name: 'iPhone 17' },
            { name: 'Samsung Galaxy A54' },
            { name: 'iPad mini' },
        ],
        labMetrics: {
            actualCapacity_mAh: 19200,
            routerRuntimeHours: 5.67,
            maxTemp_C: 42,
            chargingSpeed_W: 30,
            realEfficiency: 71,
            devicesCharged: 3,
            actualWeight_g: 370,
        },
    };
