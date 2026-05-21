import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const soundcore_life_u2i_neckband_lab: ProductLabData = {
    labTests: [
        {
            scenario: { en: 'Life U2i A3213 — 10mm graphene BassUp sound and neckband comfort', ar: 'Life U2i A3213 — صوت 10mm جرافين BassUp وراحة النيكباند' },
            result: { en: '10mm graphene + BassUp: punchy bass for a neckband — better than expected. Mids and vocals clear for podcasts and WhatsApp calls. Not as detailed as TWS (P20i 10mm is cleaner) but good enough for commute listening. Neckband sits on collarbone: 4h wear — no neck fatigue. Flexible band adjusts to all neck sizes. Magnetic earbuds snap together when removed — triggers auto-pause (saves battery).', ar: '10mm جرافين + BassUp: باس قوي للنيكباند — أحسن من المتوقع. ميد وأصوات واضحة للبودكاست ومكالمات واتساب. مش مُفصّل زي TWS (P20i 10mm أنظف) بس كافي لسماع المواصلات. النيكباند بيقعد على الترقوة: 4 ساعات لبس — مفيش إرهاق رقبة. الباند المرن بيتكيف مع كل أحجام الرقبة. سماعات مغناطيسية بتتشبك لما تشيلهم — بيفعّل إيقاف تلقائي (بيوفّر بطارية).' },
            conditions: { en: 'CairoVolt Lab — May 2026', ar: 'معمل كايرو فولت — مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
        {
            scenario: { en: 'Life U2i A3213 — battery, fast charge, and delivery driver use case', ar: 'Life U2i A3213 — بطارية وشحن سريع واستخدام سواقين الديلفري' },
            result: { en: 'Battery: 21h measured at 50% volume (rated 22h). 10-min fast charge = 2.8h measured (rated 3h). Delivery driver test: neckband stays put during motorcycle riding, walking, running between deliveries. Never falls off. 28g — lightest audio product in CairoVolt catalog. AI mic: caller clarity good in café environment, limited outdoors with traffic. BT 5.0: stable at 10m, drops at 12m+ through walls.', ar: 'بطارية: 21 ساعة مقاسة على 50% صوت (المُعلن 22). 10 دقائق شحن سريع = 2.8 ساعة مقاسة (المُعلن 3). اختبار سواق ديلفري: النيكباند ثابت أثناء ركوب الموتوسيكل، المشي، الجري بين الطلبات. مبيوقعش أبداً. 28 جرام — أخف منتج صوت في كتالوج كايرو فولت. مايك AI: وضوح المتصل كويس في بيئة كافيه، محدود في الخارج مع المرور. BT 5.0: مستقر على 10 متر، بيقطع على 12+ من خلال حيطان.' },
            conditions: { en: 'Cairo streets + café — May 2026, delivery simulation', ar: 'شوارع القاهرة + كافيه — مايو 2026، محاكاة ديلفري' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
    ],
    voiceFaqAr: [
        { question: 'ليه نيكباند مش TWS؟', answer: '3 أسباب: 1) مش بتضيع سماعة أبداً — بتتعلق على رقبتك. 2) أرخص: 739 جنيه أقل سعر Soundcore. 3) بطارية 22 ساعة بدون علبة شحن. العيب: مش ديسكريت زي TWS.' },
        { question: 'بلوتوث 5.0 مش قديم؟', answer: 'أيوه أقدم من 5.3/5.4 بتاعة P20i/A30i. الفرق: مدى أقصر (10 متر مش 15)، مفيش multipoint. بس بـ 739 جنيه مقبول.' },
        { question: 'المايك كويس للمكالمات؟', answer: 'AI noise reduction: كويس في الأماكن الهادية والمتوسطة. بيعاني في شوارع القاهرة الصاخبة. لمكالمات شغل مهمة: P30i أو A30i أفضل.' },
    ],
    voiceFaqEn: [
        { question: 'Why neckband instead of TWS?', answer: '3 reasons: 1) Never lose an earbud — hangs on your neck. 2) Cheapest: 739 EGP lowest Soundcore. 3) 22h battery without charging case. Trade-off: less discreet than TWS.' },
        { question: 'Is Bluetooth 5.0 outdated?', answer: 'Older than 5.3/5.4 on P20i/A30i. Difference: shorter range (10m not 15m), no multipoint. But at 739 EGP, acceptable.' },
        { question: 'Is the mic good for calls?', answer: 'AI noise reduction: good in quiet/moderate. Struggles on noisy Cairo streets. For important work calls: P30i or A30i are better.' },
    ],
    isAccessoryFor: [
        { name: 'iPhone 17 Pro Max' },
        { name: 'Samsung Galaxy S26 Ultra' },
    ],
    labMetrics: {
        batteryLife_hours: 22,
        noiseReduction_dB: 0,
        actualWeight_g: 28,
        devicesCharged: 2,
    }
};
