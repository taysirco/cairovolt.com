// Lab test data for: anker-nano-30w-charger
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_nano_30w_charger_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Voltage fluctuation test — Egyptian power grid returning after outage (190V-240V)',
                    ar: 'سيناريو تذبذب الكهرباء — شبكة الكهرباء المصرية عند عودة التيار (190V-240V)',
                },
                result: {
                    en: 'GaN technology maintained stable current output. No ghost touch on iPhone 15 Pro during charging under voltage fluctuation. Safe for sensitive electronics.',
                    ar: 'تقنية GaN حافظت على تيار مستقر وآمن. لا يوجد "تخريف تاتش" على iPhone 15 Pro أثناء الشحن مع تذبذب الجهد الكهربائي. آمن للإلكترونيات الحساسة.',
                },
                conditions: {
                    en: 'Tested with voltage regulator simulating 190V-240V fluctuation, New Damietta QA Lab',
                    ar: 'تم الاختبار مع منظم جهد يحاكي تذبذب 190V-240V، مختبر الفحص دمياط الجديدة',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'الشاحن ده آمن لو الكهربا بتيجي وتروح؟',
                answer: 'أيوة، اختبرناه في مختبر كايرو فولت مع تذبذب شديد في الجهد (190 لـ 240 فولت). بفضل تقنية GaN، الشاحن حافظ على تيار مستمر وآمن لهاتف آيفون بدون أي تسريب شحنات أو تخريف التاتش.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'Is this charger safe during voltage fluctuations?',
                answer: 'Yes, we tested it at CairoVolt Labs with severe voltage fluctuation (190V-240V). GaN technology maintained stable, safe current for iPhone 15 Pro with no ghost touch issues during charging.',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 15 Pro Max' },
            { name: 'iPhone 16 Pro Max' },
            { name: 'iPad Pro' },
        ],
        labMetrics: {
            maxTemp_C: 38,
            chargingSpeed_W: 30,
        },
    };
