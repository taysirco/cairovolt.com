// Lab test data for: joyroom-30w-fast-charger
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const joyroom_30w_fast_charger_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Overnight safety test — 8 hours continuous charging iPhone 15 + Egyptian power grid voltage instability (210-230V)',
                    ar: 'اختبار الأمان الليلي — 8 ساعات شحن iPhone 15 مع تذبذب الشبكة المصرية (210-230V)',
                },
                result: {
                    en: 'Stable 30W PD output maintained for 8 hours. Max temperature: 44°C (vs 65-70°C for counterfeit chargers in same test). Phone reached 100% in 62 minutes and switched to trickle charge without overheating.',
                    ar: 'تيار PD 30 واط ثابت لمدة 8 ساعات. أقصى حرارة: 44 مئوية (مقابل 65-70 مئوية للشواحن المقلدة في نفس الاختبار). الهاتف وصل 100% في 62 دقيقة وانتقل لشحن خفيف بدون سخونة.',
                },
                conditions: {
                    en: 'CairoVolt QA Lab, New Damietta City, Egyptian 210-230V grid, overnight test, December 2025',
                    ar: 'مختبر كايرو فولت، دمياط الجديدة، شبكة مصرية 210-230 فولت، اختبار ليلي، ديسمبر 2025',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'شاحن جوي روم 30 واط آمن للشحن طوال الليل؟',
                answer: 'أيوة، اختبرناه في مختبر كايرو فولت 8 ساعات متواصلة. وصلت درجة حرارته 44 مئوية فقط مقابل 65-70 مئوية للشواحن المقلدة. آمن جداً للشحن الليلي.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'Is the Joyroom 30W charger safe for overnight charging?',
                answer: 'Yes, we tested it at CairoVolt for 8 continuous hours. Max temperature was 44°C vs 65-70°C for counterfeit chargers. Very safe for overnight charging.',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 15 Pro Max' },
            { name: 'Samsung Galaxy S24' },
            { name: 'iPad' },
        ],
        labMetrics: {
            maxTemp_C: 44,
            chargingSpeed_W: 30,
        },
    };
