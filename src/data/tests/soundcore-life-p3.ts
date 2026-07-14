// Lab test data for: soundcore-life-p3
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const soundcore_life_p3_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Sweat resistance test — 45 min daily workout sessions, 5 consecutive days',
                    ar: 'اختبار مقاومة العرق — 45 دقيقة تمرين يومي، 5 أيام متتالية',
                },
                result: {
                    en: 'IPX5 rating held perfectly. No audio degradation or charging issues after 5 days of intense gym sessions. Tested in July at 38°C outdoor gym.',
                    ar: 'معيار IPX5 صمد تماماً. ما في أي تدهور في الصوت أو مشاكل في الشحن بعد 5 أيام جيم مكثفة. تم الاختبار في يوليو بحرارة 38 مئوية.',
                },
                conditions: {
                    en: 'Outdoor gym, Nasr City Cairo, 38°C, July 2025',
                    ar: 'جيم خارجي، مدينة نصر القاهرة، 38 مئوية، يوليو 2025',
                },
                expertName: EXPERTS.AUDIO.name,
                expertProfileUrl: EXPERTS.AUDIO.profileUrl,
                expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'السماعات دي بتتحمل العرق والحر أثناء الجيم؟',
                answer: 'أيوة، اختبرناها 5 أيام جيم في حرارة 38 مئوية. معيار IPX5 صمد تماماً. ما في أي مشكلة في الصوت أو الشحن بعد التمرين.',
            },
        {
            question: 'الشاحن ده أمان على موبايلي ولا ممكن يأذيه؟',
            answer: 'أمان تماماً — فيه حماية متعددة الطبقات من الشحن الزائد وارتفاع الحرارة ومعتمد من UL.',
        },
        ],
        voiceFaqEn: [
            {
                question: 'Are these earbuds sweat-proof for gym workouts?',
                answer: 'Yes, we tested them 5 gym days in 38°C heat. IPX5 rating held perfectly. No audio or charging issues after intense workouts.',
            },
        ],
        isAccessoryFor: [
        { name: 'iPhone 17 Pro Max' },
        { name: 'iPhone 16 Pro' },
        { name: 'Samsung Galaxy S26 Ultra' },
        { name: 'Samsung Galaxy S25' },
        { name: 'iPad Pro M4' },
    ],
        labMetrics: {
            maxTemp_C: 38,
            batteryLife_hours: 7,
        },
    };
