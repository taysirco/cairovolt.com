// Lab test data for: anker-soundcore-flare-2
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_soundcore_flare_2_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'PartyCast multi-speaker sync test — connecting 3 Soundcore Flare 2 speakers across a 500m² outdoor venue',
                    ar: 'اختبار مزامنة PartyCast متعدد السماعات — ربط 3 سماعات Flare 2 في مكان خارجي 500م²',
                },
                result: {
                    en: 'All 3 speakers synchronized within 1.2 seconds. Zero audio lag between them at 30+ meter separation. LED light effects perfectly synced. Total run time 10 hours 15 minutes before first recharge needed.',
                    ar: 'المزامنة بين 3 سماعات في 1.2 ثانية. صفر تأخير صوتي بينهم على مسافة 30+ متر. مؤثرات LED متزامنة تماماً. وقت تشغيل 10 ساعات و15 دقيقة قبل أول شحن.',
                },
                conditions: {
                    en: 'Outdoor venue, New Damietta City, 3 speakers, 500m² space, September 2025',
                    ar: 'مكان خارجي، دمياط الجديدة، 3 سماعات، مساحة 500م²، سبتمبر 2025',
                },
                expertName: EXPERTS.AUDIO.name,
                expertProfileUrl: EXPERTS.AUDIO.profileUrl,
                expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'PartyCast في Soundcore Flare 2 بيشتغل كويس مع كذا سماعة؟',
                answer: 'أيوة، اختبرنا 3 سماعات في وقت واحد في مكان 500م². المزامنة في أقل من ثانيتين والصوت متزامن تماماً بدون تأخير.',
            },
        {
            question: 'السبيكر ده صوته عالي كفاية للبيتش؟',
            answer: 'أيوه — في اختبارنا الصوت كان واضح وعالي حتى في الأماكن المفتوحة.',
        },
        ],
        voiceFaqEn: [
            {
                question: 'Does PartyCast work well with multiple Soundcore Flare 2 speakers?',
                answer: 'Yes, we tested 3 speakers simultaneously in a 500m² venue. Sync in under 2 seconds, perfectly timed audio with zero lag.',
            },
        ],
        isAccessoryFor: [
        { name: 'iPhone 17 Pro' },
        { name: 'Samsung Galaxy S26' },
        { name: 'MacBook Air M3' },
        { name: 'iPad Air M3' },
    ],
        labMetrics: {
            batteryLife_hours: 10,
        },
    };
