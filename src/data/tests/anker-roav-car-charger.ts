// Lab test data for: anker-roav-car-charger
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_roav_car_charger_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Cairo-Alexandria highway trip — 3 hours continuous charging, 2 phones + USB-A device simultaneously',
                    ar: 'رحلة طريق القاهرة-الإسكندرية الصحراوي — 3 ساعات شحن متواصل، تليفونين + جهاز USB-A في نفس الوقت',
                },
                result: {
                    en: 'Charged iPhone 15 Pro from 20% to 100% and Samsung S24 from 15% to 87% during 3-hour highway trip. No voltage fluctuations detected on highway power. Cigarette lighter port temperature: 39°C (safe).',
                    ar: 'شحن iPhone 15 Pro من 20% لـ 100% وSamsung S24 من 15% لـ 87% خلال رحلة 3 ساعات. ما في تذبذبات جهد على الطريق الصحراوي. حرارة مقبس السيارة: 39 مئوية (آمن).',
                },
                conditions: {
                    en: 'Cairo-Alexandria Desert Road, July noon, car AC running, 2025',
                    ar: 'طريق القاهرة-الإسكندرية الصحراوي، ظهر يوليو، تكييف السيارة شغال، 2025',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'شاحن السيارة ده بيشحن تليفونين في نفس الوقت وإيه بيوصل؟',
                answer: 'أيوة، في رحلة كايرو-اسكندرية (3 ساعات) شحن iPhone 15 Pro كامل وSamsung S24 لـ 87%، ومنفذ USB-A ثالث شغال في نفس الوقت.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'Can this car charger charge two phones simultaneously on a long trip?',
                answer: 'Yes, on a Cairo-Alexandria trip (3 hours) it charged iPhone 15 Pro to 100% and Samsung S24 to 87%, with a third USB-A device running simultaneously.',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 15 Pro Max' },
            { name: 'Samsung Galaxy S24 Ultra' },
        ],
        labMetrics: {
            maxTemp_C: 39,
            chargingSpeed_W: 48,
            devicesCharged: 3,
        },
    };
