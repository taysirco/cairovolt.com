// Lab test data for: anker-prime-a1695-25000
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_prime_a1695_25000_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Extreme power station test — MacBook Pro 14" (M3 Pro) full charge + iPhone 17 Pro Max + iPad Air via 165W output during 5-hour Alexandria trip',
                    ar: 'اختبار محطة طاقة قصوى — ماك بوك برو 14" (M3 Pro) شحن كامل + iPhone 17 Pro Max + iPad Air عبر خروج 165 واط أثناء رحلة إسكندرية 5 ساعات',
                },
                result: {
                    en: 'MacBook Pro 14" M3 Pro charged from 15% to 95% via 140W USB-C in 1 hour 20 minutes (confirmed PD 3.1). iPhone 17 Pro Max charged 0→100% via second USB-C. iPad Air charged 0→80% via USB-A. Smart display showed real-time wattage per port. Max temp: 46°C under 165W sustained load. Recharge from 0→80% took 35 minutes via 100W input.',
                    ar: 'ماك بوك برو 14" M3 Pro شحن من 15% لـ 95% عبر USB-C بـ 140 واط في ساعة و20 دقيقة (PD 3.1 متأكد). ايفون 17 برو ماكس شحن 0→100% من منفذ USB-C التاني. ايباد اير شحن 0→80% عبر USB-A. الشاشة الذكية عرضت واطات كل منفذ لحظياً. أقصى حرارة: 46°C تحت حمل 165 واط مستمر. إعادة الشحن من 0→80% أخد 35 دقيقة عبر دخل 100 واط.',
                },
                conditions: {
                    en: 'Cairo-to-Alexandria desert road trip, November 2025, 5-hour test, 3 devices simultaneously, car + café',
                    ar: 'رحلة طريق صحراوي القاهرة-إسكندرية، نوفمبر 2025، اختبار 5 ساعات، 3 أجهزة بالتزامن، عربية + كافيه',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'أنكر برايم 25000 يشحن ماك بوك برو بالقوة الكاملة؟',
                answer: 'أيوة! اختبرناه في رحلة لاسكندرية. ماك بوك برو 14" M3 Pro شحن من 15% لـ 95% في ساعة و20 دقيقة عبر 140 واط PD 3.1. وكمان ايفون وايباد في نفس الوقت!',
            },
            {
                question: 'بيتشحن بسرعة قد إيه؟',
                answer: 'من 0 لـ 80% في 35 دقيقة بس عبر شاحن 100 واط! ده أسرع إعادة شحن في باور بانك بالحجم ده في مصر.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'Can the Anker Prime 25000 charge a MacBook Pro at full speed?',
                answer: 'Yes! We tested it on a Cairo-to-Alexandria trip. MacBook Pro 14" M3 Pro went from 15% to 95% in 1 hour 20 minutes via 140W PD 3.1. iPhone and iPad charged simultaneously on other ports.',
            },
        ],
        isAccessoryFor: [
            { name: 'MacBook Pro 14" M3 Pro' },
            { name: 'iPhone 17 Pro Max' },
            { name: 'iPad Air' },
            { name: 'Dell XPS 13' },
            { name: 'Samsung Galaxy S26 Ultra' },
        ],
        labMetrics: {
            actualCapacity_mAh: 24500,
            maxTemp_C: 46,
            chargingSpeed_W: 165,
            realEfficiency: 76,
            devicesCharged: 3,
            actualWeight_g: 535,
        },
    };
