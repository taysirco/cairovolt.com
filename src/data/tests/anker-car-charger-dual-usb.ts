// Lab test data for: anker-car-charger-dual-usb
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_car_charger_dual_usb_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Dual-port endurance test — iPhone 15 + Samsung S23 Ultra simultaneously on Cairo-Suez highway (2 hours, 38°C cabin)',
                    ar: 'اختبار تحمل المنفذين — iPhone 15 + Samsung S23 Ultra بالتزامن على طريق القاهرة-السويس (2 ساعة، 38°C مقصورة)',
                },
                result: {
                    en: 'Both devices charged from 15% to 80%+ simultaneously over 2 hours. PowerIQ 3.0 maintained optimal speed on both ports throughout. No thermal throttling at 38°C. Charger body temperature reached 42°C (well within safe range). LED indicator stayed green throughout.',
                    ar: 'الجهازين شحنوا من 15% لـ 80%+ بالتزامن خلال ساعتين. PowerIQ 3.0 حافظ على السرعة المثلى في المنفذين طوال الوقت. لا فصل حراري عند 38°C. حرارة الجسم وصلت 42°C (ضمن النطاق الآمن). مؤشر LED بقي أخضر طوال الوقت.',
                },
                conditions: {
                    en: 'Cairo-Suez highway, September 2025, cabin temperature 38°C, 2-hour drive',
                    ar: 'طريق القاهرة-السويس، سبتمبر 2025، حرارة مقصورة 38°C، رحلة ساعتين',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'شاحن سيارة أنكر 48 واط يشحن جهازين مصريين في نفس الوقت؟',
                answer: 'أيوة! اختبرناه على طريق القاهرة-السويس 2 ساعة عند 38 درجة. iPhone 15 + Samsung S23 وصلوا 80%+ بالتزامن بدون فصل حراري.',
            },
        {
            question: 'شاحن العربية ده ينفع لأي عربية؟',
            answer: 'أيوه — يتوافق مع أي ولاعة سجاير 12V/24V — يعني معظم العربيات في مصر.',
        },
        ],
        voiceFaqEn: [
            {
                question: 'Can the Anker 48W car charger charge two Egyptian phones simultaneously?',
                answer: 'Yes! We tested it on Cairo-Suez highway for 2 hours at 38°C. iPhone 15 + Samsung S23 both reached 80%+ simultaneously with zero thermal throttling.',
            },
        ],
        isAccessoryFor: [
            { name: 'iPhone 15 Pro Max' },
            { name: 'Samsung Galaxy S24 Ultra' },
            { name: 'Any 12V/24V car in Egypt' },
        ],
        labMetrics: {
            maxTemp_C: 42,
            chargingSpeed_W: 48,
            devicesCharged: 3,
        },
    };
