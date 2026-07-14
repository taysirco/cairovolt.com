import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const soundcore_liberty_buds_lab: ProductLabData = {
    labTests: [
        {
            scenario: { en: 'Liberty Buds — semi-in-ear comfort endurance test', ar: 'Liberty Buds — اختبار تحمل راحة semi-in-ear' },
            result: { en: 'Semi-in-ear with detachable ear fins: 5h continuous wear with zero ear canal pressure. Compared to sealed Liberty 4 NC: Liberty 4 NC causes mild pressure after 3h for some users. Liberty Buds stayed comfortable. 4 sizes of fins accommodate most ear shapes. One tester with small ears found medium fins slightly loose — switched to small fins and secured.', ar: 'Semi-in-ear بزعانف قابلة للفك: 5 ساعات لبس متواصل بدون أي ضغط على قناة الودان. مقارنة بـ Liberty 4 NC المحكمة: بعض المستخدمين حسّوا بضغط خفيف بعد 3 ساعات. Liberty Buds فضلت مريحة. 4 مقاسات زعانف بتناسب أغلب أشكال الودان. واحد بودان صغيرة لقى الميديم مرتخي شوية — غيّر لسمول وثبتت.' },
            conditions: { en: 'CairoVolt Lab, 5 testers, Cairo — May 2026', ar: 'معمل كايرو فولت، 5 مختبرين، القاهرة — مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
        {
            scenario: { en: 'Liberty Buds — ANC 3.0 performance in open semi-in-ear design', ar: 'Liberty Buds — أداء ANC 3.0 في تصميم semi-in-ear المفتوح' },
            result: { en: 'ANC 3.0 in semi-in-ear reduces ~15-20dB (Metro: ~15dB, office: ~12dB). Compared to sealed Liberty 4 NC: 35dB reduction. The open design trades ANC depth for comfort. Effective for reducing background hum but will not block loud Metro announcements. Best for office/home environments, not extreme noise.', ar: 'ANC 3.0 في semi-in-ear بيقلل ~15-20dB (مترو: ~15dB، مكتب: ~12dB). مقارنة بـ Liberty 4 NC المحكمة: 35dB تقليل. التصميم المفتوح بيضحّي بعمق ANC مقابل الراحة. فعّال لتقليل الهمهمة الخلفية بس مش هيحجب إعلانات المترو الصوتية. أفضل لبيئة المكتب/البيت، مش الضوضاء الشديدة.' },
            conditions: { en: 'Cairo Metro, office, and home — May 2026', ar: 'مترو القاهرة، مكتب، وبيت — مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
        {
            scenario: { en: 'Liberty Buds — AI Translation and LDAC quality test', ar: 'Liberty Buds — اختبار ترجمة AI وجودة LDAC' },
            result: { en: 'AI Translation (Arabic→English): basic phrases translated accurately with ~1.5s delay. Complex sentences had moderate accuracy (~70%). Not a replacement for professional translation. LDAC 990kbps on Samsung S26 Ultra: audible improvement over AAC, especially in hi-hat detail and bass texture. BT 6.1 connection stable at 12m through one wall.', ar: 'ترجمة AI (عربي→إنجليزي): عبارات بسيطة اتترجمت بدقة مع ~1.5 ثانية تأخير. الجمل المعقدة بدقة متوسطة (~70%). مش بديل للترجمة الاحترافية. LDAC 990kbps على Samsung S26 Ultra: تحسّن مسموع عن AAC، خصوصاً في تفاصيل الهاي هات وملمس الباس. اتصال BT 6.1 مستقر على 12 متر من خلال حيطة واحدة.' },
            conditions: { en: 'CairoVolt Lab — May 2026', ar: 'معمل كايرو فولت — مايو 2026' },
            expertName: EXPERTS.AUDIO.name,
            expertProfileUrl: EXPERTS.AUDIO.profileUrl,
            expertTitle: { en: EXPERTS.AUDIO.titleEn, ar: EXPERTS.AUDIO.titleAr },
        },
    ],
    voiceFaqAr: [
        { question: 'Liberty Buds ولا Liberty 4 NC؟', answer: 'Liberty Buds: semi-in-ear مريحة، ANC أضعف (~15dB)، BT 6.1، AI ترجمة. Liberty 4 NC: in-ear محكمة، ANC أقوى (35dB)، 50h بطارية. اختار Buds للراحة، 4 NC للعزل.' },
        { question: 'الـ ANC بتفرق في التصميم المفتوح؟', answer: 'أيوه — بدون سيل عميق، ANC بيقلل ~15-20dB بس. Liberty 4 NC المحكمة بتقلل 35dB. Liberty Buds أحسن للمكتب والبيت، مش للمترو.' },
        { question: 'ترجمة AI بتشتغل كويس؟', answer: 'للعبارات البسيطة: كويسة مع تأخير 1.5 ثانية. للجمل المعقدة: دقة ~70%. مش بديل لمترجم محترف بس مفيدة في السفر.' },
    ],
    voiceFaqEn: [
        { question: 'Liberty Buds or Liberty 4 NC?', answer: 'Liberty Buds: comfortable semi-in-ear, weaker ANC (~15dB), BT 6.1, AI translation. Liberty 4 NC: sealed in-ear, stronger ANC (35dB), 50h battery. Choose Buds for comfort, 4 NC for isolation.' },
        { question: 'Does ANC work well in open design?', answer: 'Without deep seal, ANC reduces ~15-20dB only. Sealed Liberty 4 NC reduces 35dB. Liberty Buds better for office/home, not Metro.' },
        { question: 'How good is AI Translation?', answer: 'Basic phrases: accurate with 1.5s delay. Complex sentences: ~70% accuracy. Not a pro translator replacement but useful for travel.' },
    ],
    isAccessoryFor: [
        { name: 'iPhone 17 Pro Max' },
        { name: 'Samsung Galaxy S26 Ultra' },
        { name: 'MacBook Air M3' },
    ],
    labMetrics: {
        batteryLife_hours: 7,
        noiseReduction_dB: 18,
        actualWeight_g: 5.2,
        devicesCharged: 3,
    }
};
