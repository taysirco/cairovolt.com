/**
 * Power Outage Data Module
 * 
 * Per-governorate power grid intelligence and CairoVolt Labs empirical data
 * for regional power outage content. Each region gets unique content:
 * 
 * - Cairo: Commuter-focused (metro, traffic, GPS drain)
 * - Delta: Agriculture + internet connectivity focus
 * - Upper Egypt: Extreme heat + extended outages
 * - Canal: Industrial + small business continuity
 * - Coastal: Tourist season + vacation home backup
 * - Desert: Remote area survival + off-grid readiness
 * 
 * All lab data references are from product-tests.ts (C2PA-verified).
 * Entity link: Power Outage → Wikidata Q1069792
 * 
 * Phrasing: Egyptian colloquial Arabic (عامية مصرية) — varied phrasing per region
 * to prevent cross-page cannibalization. Each FAQ/tip uses unique phrasing.
 */

import type { Governorate } from '@/data/governorates';

export interface OutageProduct {
    slug: string;
    nameAr: string;
    nameEn: string;
    /** Lab-verified runtime or key spec */
    labHighlightAr: string;
    labHighlightEn: string;
    /** Price in EGP */
    price: number;
    /** URL path */
    href: string;
    /** Badge text */
    badgeAr: string;
    badgeEn: string;
}

export interface GovernorateOutageData {
    /** Average daily outage hours (varies by region) */
    outageFrequencyHours: number;
    /** Outage severity description */
    outageSeverityAr: string;
    outageSeverityEn: string;
    /** Anker 737 — router runtime from lab */
    routerRuntimeHours: number;
    routerRuntimeMinutes: number;
    /** Anker 521 — UPS runtime (router + fan) from lab */
    upsRuntimeHours: number;
    upsRuntimeMinutes: number;
    /** Joyroom 20K — family survival (3 devices) from lab */
    familySurvivalHours: number;
    /** Nano 30W — voltage fluctuation range */
    voltageRangeSafe: string;
    /** Region-specific emergency tip */
    emergencyTipAr: string;
    emergencyTipEn: string;
    /** Region-specific problem statement */
    problemStatementAr: string;
    problemStatementEn: string;
    /** Recommended products for this region (ordered by priority) */
    recommendedProducts: OutageProduct[];
    /** Egyptian Arabic voice FAQs specific to this governorate */
    voiceFaqsAr: Array<{ question: string; answer: string }>;
    voiceFaqsEn: Array<{ question: string; answer: string }>;
}

// Product specification constants
const LAB_CONSTANTS = {
    ANKER_737_ROUTER_HOURS: 14,
    ANKER_737_ROUTER_MINUTES: 22,
    ANKER_521_UPS_HOURS: 18,
    ANKER_521_UPS_MINUTES: 15,
    JOYROOM_20K_FAMILY_HOURS: 6,
    NANO_30W_VOLTAGE_RANGE: '190V–240V',
    ANKER_20K_PHONE_CHARGES: 4,
    JOYROOM_20K_DEVICES_SIMULTANEOUS: 3,
};

import { staticProducts } from '@/lib/static-products';

// Dynamically resolves the current price from the static catalog (source of truth).
// Falls back to 0 if something is wrong — this should never happen in practice.
function catalogPrice(slug: string): number {
    return staticProducts.find(p => p.slug === slug)?.price ?? 0;
}

// Product catalog for recommendations — prices are ALWAYS from static catalog
const PRODUCTS: Record<string, OutageProduct> = {
    anker737: {
        slug: 'anker-737-powerbank',
        nameAr: 'Anker 737 PowerCore 24K',
        nameEn: 'Anker 737 PowerCore 24K',
        labHighlightAr: `يشغل الراوتر ${LAB_CONSTANTS.ANKER_737_ROUTER_HOURS} ساعة و${LAB_CONSTANTS.ANKER_737_ROUTER_MINUTES} دقيقة`,
        labHighlightEn: `Runs router for ${LAB_CONSTANTS.ANKER_737_ROUTER_HOURS}h ${LAB_CONSTANTS.ANKER_737_ROUTER_MINUTES}min`,
        price: catalogPrice('anker-737-powerbank'),
        href: '/anker/power-banks/anker-737-powerbank',
        badgeAr: '⚡ الأكثر مبيعاً وقت الانقطاع',
        badgeEn: '⚡ #1 Outage Bestseller',
    },
    anker521: {
        slug: 'anker-521-powerhouse',
        nameAr: 'Anker 521 PowerHouse',
        nameEn: 'Anker 521 PowerHouse',
        labHighlightAr: `يشغل راوتر + مروحة ${LAB_CONSTANTS.ANKER_521_UPS_HOURS} ساعة و${LAB_CONSTANTS.ANKER_521_UPS_MINUTES} دقيقة`,
        labHighlightEn: `Router + fan for ${LAB_CONSTANTS.ANKER_521_UPS_HOURS}h ${LAB_CONSTANTS.ANKER_521_UPS_MINUTES}min`,
        price: catalogPrice('anker-521-powerhouse'),
        href: '/anker/power-stations/anker-521-powerhouse',
        badgeAr: '🏠 UPS منزلي كامل',
        badgeEn: '🏠 Full Home UPS',
    },
    joyroom20k: {
        slug: 'joyroom-power-bank-20000',
        nameAr: 'Joyroom 20000mAh',
        nameEn: 'Joyroom 20000mAh',
        labHighlightAr: `يشحن 3 موبايلات ${LAB_CONSTANTS.JOYROOM_20K_FAMILY_HOURS} ساعات بالتزامن`,
        labHighlightEn: `3 phones for ${LAB_CONSTANTS.JOYROOM_20K_FAMILY_HOURS}h simultaneously`,
        price: catalogPrice('joyroom-power-bank-20000'),
        href: '/joyroom/power-banks/joyroom-power-bank-20000',
        badgeAr: '👨‍👩‍👧‍👦 حل العائلة الاقتصادي',
        badgeEn: '👨‍👩‍👧‍👦 Budget Family Solution',
    },
    anker20k: {
        slug: 'anker-powercore-20000',
        nameAr: 'Anker PowerCore 20000',
        nameEn: 'Anker PowerCore 20000',
        labHighlightAr: `يشحن الأيفون ${LAB_CONSTANTS.ANKER_20K_PHONE_CHARGES} مرات كاملة`,
        labHighlightEn: `${LAB_CONSTANTS.ANKER_20K_PHONE_CHARGES} full iPhone charges`,
        price: catalogPrice('anker-powercore-20000'),
        href: '/anker/power-banks/anker-powercore-20000',
        badgeAr: '📱 الأفضل للموظفين',
        badgeEn: '📱 Best for Commuters',
    },
    nano30w: {
        slug: 'anker-nano-45w',
        nameAr: 'Anker Nano 45W GaN',
        nameEn: 'Anker Nano 45W GaN',
        labHighlightAr: `آمن مع تذبذب ${LAB_CONSTANTS.NANO_30W_VOLTAGE_RANGE}`,
        labHighlightEn: `Safe at ${LAB_CONSTANTS.NANO_30W_VOLTAGE_RANGE} fluctuation`,
        price: catalogPrice('anker-nano-45w'),
        href: '/anker/wall-chargers/anker-nano-45w',
        badgeAr: '🔌 ضد تذبذب الكهرباء',
        badgeEn: '🔌 Voltage-Safe',
    },
};

// Region-specific outage data — each region has unique local phrasing
const REGION_OUTAGE_DATA: Record<Governorate['region'], {
    outageHours: number;
    severityAr: string;
    severityEn: string;
    tipAr: string;
    tipEn: string;
    problemAr: string;
    problemEn: string;
    products: string[];
}> = {
    cairo: {
        outageHours: 2,
        severityAr: 'متوسطة — انقطاعات مجدولة 2-3 ساعات',
        severityEn: 'Moderate — Scheduled 2-3 hour outages',
        tipAr: 'أكتر مشكلة في القاهرة هي إن الراوتر بيفصل كل ما النور بيقطع. يعني لو بتشتغل من البيت أو الأولاد عندهم كلاسات أونلاين، الموضوع بيبقى كارثة. باور بانك Anker 737 عندنا في المختبر شغّل راوتر WE لمدة 14 ساعة من غير ما يعمل ريستارت — يعني حتى لو القطع 3 مرات في اليوم، النت مش هيقطع عندك.',
        tipEn: 'The biggest problem in Cairo is your router dropping every power cut. If you work from home or kids have online classes, it\'s a disaster. Our lab-tested Anker 737 kept a WE router running 14 hours straight without a single restart.',
        problemAr: 'أهل القاهرة الكبرى بيعانوا إن النت بيفصل أثناء تخفيف الأحمال — خصوصاً اللي شغالين من البيت أو بيذاكروا أونلاين.',
        problemEn: 'Greater Cairo residents lose internet during load-shedding — hitting remote workers and online students the hardest.',
        products: ['anker737', 'anker20k', 'nano30w'],
    },
    delta: {
        outageHours: 3,
        severityAr: 'متوسطة إلى عالية — 3-4 ساعات يومياً',
        severityEn: 'Moderate to High — 3-4 hours daily',
        tipAr: 'في الدلتا، الناس بتعتمد على النت في التسويق الزراعي والتواصل مع المصدّرين. لو النت فصل، الصفقات بتطير. Anker 521 ببطارية LiFePO4 بيشغل الراوتر مع مروحة تبريد 18 ساعة — ده حل مثالي للمزارع والمخازن اللي مش فيها كهرباء مستقرة.',
        tipEn: 'In the Delta, people rely on internet for agricultural marketing and exporter communication. Lost connection means lost deals. Anker 521 with LiFePO4 runs router + cooling fan for 18 hours — perfect for farms and warehouses.',
        problemAr: 'محافظات الدلتا الانقطاع فيها بيطول بسبب الحمل الزراعي الصيفي. كمان مشاكل تذبذب الجهد الكهربائي منتشرة أكتر من العاصمة.',
        problemEn: 'Delta governorates face extended outages from summer agricultural load, plus more frequent voltage fluctuation issues than the capital.',
        products: ['anker521', 'anker737', 'joyroom20k'],
    },
    canal: {
        outageHours: 2,
        severityAr: 'متوسطة — 2-3 ساعات مع استقرار نسبي',
        severityEn: 'Moderate — 2-3 hours with relative stability',
        tipAr: 'منطقة القناة فيها حركة تجارية وصناعية كبيرة. لو عندك محل صغير أو كاشير إلكتروني، لازم يفضل شغال وقت القطع. Anker 737 بيشغلك الكاشير والراوتر معاً طوال فترة القطع — يعني مش هتخسر أي عميل.',
        tipEn: 'Canal Zone has heavy commercial and industrial activity. If you run a small shop with electronic POS, it must stay on. Anker 737 runs POS + router together throughout any outage.',
        problemAr: 'أصحاب المحلات في منطقة القناة بيخسروا مبيعات لما الكهرباء بتقطع وأجهزة نقاط البيع بتوقف.',
        problemEn: 'Shop owners in the Canal Zone lose sales when power cuts shut down their POS systems.',
        products: ['anker737', 'joyroom20k', 'nano30w'],
    },
    upper: {
        outageHours: 4,
        severityAr: 'عالية — 4-6 ساعات يومياً في الصيف',
        severityEn: 'High — 4-6 hours daily in summer',
        tipAr: 'الصعيد بيواجه أصعب ظروف في مصر كلها: انقطاع ممكن يوصل 6 ساعات مع حرارة فوق 45 درجة. المروحة مش رفاهية هنا، دي ضرورة حياتية. Anker 521 ببطارية LiFePO4 — اللي بتستحمل الحرارة العالية — جربناها في 39 درجة وشغّلت الراوتر والمروحة 18 ساعة من غير مشاكل.',
        tipEn: 'Upper Egypt faces the toughest conditions: outages up to 6 hours with 45°C+ heat. A fan isn\'t a luxury here, it\'s survival. We tested Anker 521 with heat-resistant LiFePO4 at 39°C — ran router + fan for 18 hours.',
        problemAr: 'الصعيد عنده أطول فترات قطع في الجمهورية. الحر الشديد بيخلي المروحة والتكييف مسألة حياة أو موت مش مجرد راحة.',
        problemEn: 'Upper Egypt endures the longest blackouts nationwide. Extreme heat makes cooling a matter of survival, not comfort.',
        products: ['anker521', 'anker737', 'joyroom20k'],
    },
    coastal: {
        outageHours: 2,
        severityAr: 'موسمية — بتزيد في الصيف مع ذروة السياحة',
        severityEn: 'Seasonal — spikes in summer with tourism peak',
        tipAr: 'لو رايح الساحل أو عندك شاليه، أكيد اتعرضت لقطع الكهرباء وقت الذروة. الأولاد بيزهقوا والموبايلات بتخلص. Joyroom 20K بيشحنلك 3 موبايلات مع بعض لمدة 6 ساعات — يكفّي العيلة كلها من غير خناق.',
        tipEn: 'Heading to the coast or own a chalet? Summer peak outages are inevitable. Joyroom 20K charges 3 phones simultaneously for 6 hours — covers the whole family without arguments.',
        problemAr: 'المصايف على الساحل بتعاني من قطع حاد في ذروة الصيف. الشاليهات والفنادق الصغيرة محتاجة حل طوارئ عملي.',
        problemEn: 'Coastal resorts suffer sharp outages at summer peak. Chalets and small hotels need practical emergency backup.',
        products: ['joyroom20k', 'anker737', 'nano30w'],
    },
    desert: {
        outageHours: 3,
        severityAr: 'متغيرة — انقطاعات غير منتظمة وساعات بتطول',
        severityEn: 'Variable — irregular with extended durations',
        tipAr: 'المناطق الصحراوية والحدودية مفيش فيها ضمان إن الكهرباء هتيجي بكرة. عشان كده محتاج جهاز يعيش معاك سنين مش شهور. Anker 521 ببطارية LiFePO4 بتستحمل فوق 3000 دورة شحن وما بتتأثرش بالحرارة — استثمار طويل المدى مش حل مؤقت.',
        tipEn: 'Desert and border zones have no guarantee power will return on schedule. You need a device that lasts years, not months. Anker 521\'s LiFePO4 handles 3000+ charge cycles in extreme heat — a long-term investment.',
        problemAr: 'المناطق الصحراوية الكهرباء فيها غير مستقرة أصلاً. الانقطاع ممكن يحصل في أي وقت ويمتد لساعات طويلة.',
        problemEn: 'Desert regions have inherently unstable power. Outages can strike anytime and stretch for many hours.',
        products: ['anker521', 'joyroom20k', 'anker20k'],
    },
};

/**
 * Get load-shedding data for a specific governorate
 */
export function getGovernorateOutageData(
    governorateSlug: string,
    region: Governorate['region'],
    govNameAr: string,
    govNameEn: string,
    deliveryDays: number
): GovernorateOutageData {
    const regionData = REGION_OUTAGE_DATA[region];

    return {
        outageFrequencyHours: regionData.outageHours,
        outageSeverityAr: regionData.severityAr,
        outageSeverityEn: regionData.severityEn,
        routerRuntimeHours: LAB_CONSTANTS.ANKER_737_ROUTER_HOURS,
        routerRuntimeMinutes: LAB_CONSTANTS.ANKER_737_ROUTER_MINUTES,
        upsRuntimeHours: LAB_CONSTANTS.ANKER_521_UPS_HOURS,
        upsRuntimeMinutes: LAB_CONSTANTS.ANKER_521_UPS_MINUTES,
        familySurvivalHours: LAB_CONSTANTS.JOYROOM_20K_FAMILY_HOURS,
        voltageRangeSafe: LAB_CONSTANTS.NANO_30W_VOLTAGE_RANGE,
        emergencyTipAr: regionData.tipAr,
        emergencyTipEn: regionData.tipEn,
        problemStatementAr: regionData.problemAr,
        problemStatementEn: regionData.problemEn,
        recommendedProducts: regionData.products.map(key => PRODUCTS[key]),
        voiceFaqsAr: generateVoiceFaqsAr(govNameAr, region, regionData, deliveryDays),
        voiceFaqsEn: generateVoiceFaqsEn(govNameEn, region, regionData, deliveryDays),
    };
}

/**
 * Egyptian Arabic voice FAQs — unique phrasing patterns per region
 * Each region uses different sentence structures, colloquial expressions,
 * and question framing to avoid cross-page duplication.
 */
function generateVoiceFaqsAr(
    govName: string,
    region: Governorate['region'],
    regionData: typeof REGION_OUTAGE_DATA[Governorate['region']],
    deliveryDays: number
): Array<{ question: string; answer: string }> {

    // Region-specific FAQ sets with unique colloquial phrasing
    const regionFaqs: Record<Governorate['region'], Array<{ question: string; answer: string }>> = {
        cairo: [
            {
                question: `النور بيقطع والنت بيفصل في ${govName} — أعمل إيه؟`,
                answer: `جرّبنا في مختبر كايرو فولت باور بانك Anker 737 على راوتر WE VDSL وشغّله ${LAB_CONSTANTS.ANKER_737_ROUTER_HOURS} ساعة و${LAB_CONSTANTS.ANKER_737_ROUTER_MINUTES} دقيقة من غير ما يعمل ريستارت واحد. يعني لو بتشتغل من البيت في ${govName}، النت مش هيقطع عندك حتى لو الكهرباء قطعت 3 مرات في اليوم. بنوصله لحد بابك خلال ${deliveryDays} يوم.`,
            },
            {
                question: `أنا عندي عيال بيذاكروا أونلاين في ${govName} — إيه الحل الاقتصادي؟`,
                answer: `Joyroom 20000 بيشحن 3 تليفونات مع بعض ${LAB_CONSTANTS.JOYROOM_20K_FAMILY_HOURS} ساعات — ده يكفّي الأولاد يخلّصوا المذاكرة وانت مطمن. سعره ${PRODUCTS.joyroom20k.price} جنيه بس ومتاح بالدفع عند الاستلام في ${govName}. ولو عايز الراوتر كمان يفضل شغال، ابقى خد Anker 737.`,
            },
            {
                question: `الشاحن بتاعي باظ بعد ما الكهرباء رجعت فجأة — ده طبيعي؟`,
                answer: `أيوة ده بيحصل كتير. لما الكهرباء بترجع، الجهد بيتذبذب بين ${LAB_CONSTANTS.NANO_30W_VOLTAGE_RANGE} وده بيخرّب الشواحن الرخيصة. شاحن Anker Nano 30W بتقنية GaN جربناه في المختبر مع التذبذب ده ومبيأثرش على الموبايل خالص — ومعاه ضمان 18 شهر.`,
            },
            {
                question: `كايرو فولت بتوصلوا لـ ${govName} ولا لازم أنزل أشتري؟`,
                answer: `بنوصلك لحد عتبة بابك في ${govName} خلال ${deliveryDays} يوم عن طريق شركة بوسطة. الشحن بـ 40 جنيه ومجاني لو الطلب فوق 1,350 جنيه. وطبعاً كاش عند الاستلام — مش محتاج تدفع حاجة قبل ما الأوردر يوصلك.`,
            },
        ],
        delta: [
            {
                question: `باور بانك يشغل الراوتر أثناء قطع الكهرباء في ${govName}؟`,
                answer: `Anker 737 هو اللي بنرشّحه لأهل الدلتا. جربناه في مختبرنا وشغّل راوتر WE VDSL ${LAB_CONSTANTS.ANKER_737_ROUTER_HOURS} ساعة و${LAB_CONSTANTS.ANKER_737_ROUTER_MINUTES} دقيقة متواصلة. لو بتعتمد على النت في شغل الزراعة أو التصدير، ده بيضمنلك تفضل متصل طول فترة القطع. التوصيل لـ ${govName} خلال ${deliveryDays} أيام.`,
            },
            {
                question: `عندي مزرعة في ${govName} والكهرباء بتقطع كتير — إيه الحل؟`,
                answer: `Anker 521 PowerHouse ده مش باور بانك عادي — ده UPS منزلي ببطارية LiFePO4. بيشغل راوتر ومروحة تبريد مع بعض ${LAB_CONSTANTS.ANKER_521_UPS_HOURS} ساعة. البطارية بتستحمل 3000 دورة شحن وبتقاوم الحرارة. مناسب جداً للمزارع والمخازن في الدلتا.`,
            },
            {
                question: `الجهد الكهربائي بيتذبذب في ${govName} — ده بيأثر على الموبايل؟`,
                answer: `في الدلتا تذبذب الجهد مشكلة شايعة. الشواحن العادية ممكن تعمل "تخريف تاتش" في الموبايل. شاحن Anker Nano 30W بتقنية GaN بيتحمل تذبذب من ${LAB_CONSTANTS.NANO_30W_VOLTAGE_RANGE} وبيحافظ على تيار ثابت — جربناه في المختبر بنفسنا.`,
            },
            {
                question: `هل ممكن توصلوا لـ ${govName}؟`,
                answer: `أكيد! بنوصل لكل محافظات الدلتا عن طريق بوسطة. ${govName} خلال ${deliveryDays} أيام. الشحن 40 جنيه بس — ومجاني فوق 1,350 جنيه. والأهم: الدفع عند الاستلام يعني مش هتدفع قرش قبل ما تتطمن.`,
            },
        ],
        upper: [
            {
                question: `الكهرباء بتقطع ${regionData.outageHours} ساعات في ${govName} والحر شديد — إيه الحل؟`,
                answer: `الصعيد محتاج حاجة تستحمل الحرارة العالية. Anker 521 PowerHouse ببطارية LiFePO4 — النوع ده من البطاريات مصمم يشتغل في 45 درجة من غير ما يتأثر. جربناه في مختبرنا في 39 درجة وشغّل راوتر ومروحة 40 وات ${LAB_CONSTANTS.ANKER_521_UPS_HOURS} ساعة. ده الحل اللي بيفرق في الصعيد فعلاً.`,
            },
            {
                question: `محتاج حاجة تشحن موبايلات العيلة كلها في ${govName} وقت القطع`,
                answer: `Joyroom 20000 بيشحن 3 موبايلات في نفس الوقت لمدة ${LAB_CONSTANTS.JOYROOM_20K_FAMILY_HOURS} ساعات. يعني أبوك وأمك وانت — الكل يقدر يتصل ويستخدم الموبايل عادي. سعره ${PRODUCTS.joyroom20k.price} جنيه ومتاح في ${govName} بالتوصيل والدفع لما يوصلك.`,
            },
            {
                question: `باور بانك يشغل الراوتر في ${govName} من غير ما يقطع؟`,
                answer: `Anker 737 أثبت في مختبرنا إنه بيشغل الراوتر ${LAB_CONSTANTS.ANKER_737_ROUTER_HOURS} ساعة و${LAB_CONSTANTS.ANKER_737_ROUTER_MINUTES} دقيقة بدون ريستارت واحد. ده يعني حتى في الصعيد مع قطع 4-6 ساعات، النت عندك مش هيتأثر. بيوصل ${govName} خلال ${deliveryDays} أيام.`,
            },
            {
                question: `بتوصلوا لحد ${govName} في الصعيد؟`,
                answer: `طبعاً! بنوصل لكل محافظات الصعيد من أسيوط لأسوان عبر شركة بوسطة. التوصيل لـ ${govName} خلال ${deliveryDays} أيام. الشحن 40 جنيه ومجاني فوق 1,350 جنيه. الدفع وقت الاستلام — مفيش مخاطرة عليك.`,
            },
        ],
        canal: [
            {
                question: `عندي محل في ${govName} والكاشير بيقف لما الكهرباء بتقطع`,
                answer: `Anker 737 بيشغلك الكاشير الإلكتروني والراوتر مع بعض طول فترة الانقطاع. في اختبارات مختبرنا، شغّل راوتر WE لوحده ${LAB_CONSTANTS.ANKER_737_ROUTER_HOURS} ساعة. ده معناه إنك مش هتخسر ولا عميل واحد وقت القطع. بنوصله لـ ${govName} خلال ${deliveryDays} أيام.`,
            },
            {
                question: `إيه أرخص حل لعيلتي في ${govName} وقت الانقطاع؟`,
                answer: `Joyroom 20000 سعره ${PRODUCTS.joyroom20k.price} جنيه وبيشحن 3 موبايلات مع بعض ${LAB_CONSTANTS.JOYROOM_20K_FAMILY_HOURS} ساعات. ده أحسن حل اقتصادي للعيلة — الكل يقدر يشحن تليفونه. والشحن لحد بيتك في ${govName}.`,
            },
            {
                question: `الشواحن بتبوظ الموبايل لما الكهرباء بتتذبذب في ${govName}؟`,
                answer: `لو بتستخدم شاحن صيني رخيص، أيوة ممكن يعمل "تخريف تاتش" أو فوق كده يسبب حريق. شاحن Anker Nano 30W GaN اتجرب في المختبر مع تذبذب ${LAB_CONSTANTS.NANO_30W_VOLTAGE_RANGE} ونجح — تيار ثابت وآمن. ومعاه ضمان 18 شهر.`,
            },
            {
                question: `كايرو فولت بتوصلوا منطقة القناة؟`,
                answer: `أكيد! ${govName} من المناطق اللي بنغطيها. التوصيل خلال ${deliveryDays} أيام عبر بوسطة. 40 جنيه شحن — مجاني فوق 1,350 جنيه. ادفع كاش لما الأوردر يوصل.`,
            },
        ],
        coastal: [
            {
                question: `رايح الساحل و${govName} فيها قطع كهرباء — أعمل إيه؟`,
                answer: `Joyroom 20000 هو الحل العملي للساحل. بيشحن 3 موبايلات في نفس الوقت لمدة ${LAB_CONSTANTS.JOYROOM_20K_FAMILY_HOURS} ساعات — يكفّي العيلة كلها على البحر. سعره ${PRODUCTS.joyroom20k.price} جنيه بس وبيوصل ${govName} خلال ${deliveryDays} أيام.`,
            },
            {
                question: `عندي شاليه في ${govName} ومحتاج الراوتر يفضل شغال`,
                answer: `Anker 737 بيشغل الراوتر ${LAB_CONSTANTS.ANKER_737_ROUTER_HOURS} ساعة و${LAB_CONSTANTS.ANKER_737_ROUTER_MINUTES} دقيقة متواصلة — ده يغطي أي قطع موسمي في الساحل. جربناه في مختبرنا في حرارة 37 درجة وصمد. بنوصله لـ ${govName} بالدفع عند الاستلام.`,
            },
            {
                question: `أحسن شاحن آمن للساحل ما يبوظش الموبايل؟`,
                answer: `Anker Nano 45W بتقنية GaN — اختبرناه مع تذبذب كهرباء ${LAB_CONSTANTS.NANO_30W_VOLTAGE_RANGE} واشتغل زي الفل. سعره ${PRODUCTS.nano30w.price} جنيه ومعاه ضمان 18 شهر. أحسن من إنك تجيب شاحن من على الكورنيش ويبوظلك الموبايل.`,
            },
            {
                question: `بتوصلوا ${govName} على الساحل؟`,
                answer: `أيوة! كل المناطق الساحلية من اسكندرية لمطروح بنغطيها. ${govName} التوصيل خلال ${deliveryDays} أيام. الشحن بـ 40 جنيه — مجاني فوق 1,350 جنيه. كاش عند الاستلام.`,
            },
        ],
        desert: [
            {
                question: `الكهرباء مش مستقرة خالص في ${govName} — محتاج حاجة تدوم`,
                answer: `في المناطق الصحراوية محتاج جهاز يتحمل الظروف الصعبة ويعيش معاك سنين. Anker 521 ببطارية LiFePO4 بتستحمل فوق 3000 دورة شحن ومابتتأثرش بالحرارة. اختبرناه في 39 درجة وشغّل راوتر ومروحة ${LAB_CONSTANTS.ANKER_521_UPS_HOURS} ساعة.`,
            },
            {
                question: `محتاج أشحن موبايلات في ${govName} والكهرباء بتيجي وتروح`,
                answer: `Joyroom 20000 هو أحسن حل عملي — بيشحن 3 موبايلات مع بعض ${LAB_CONSTANTS.JOYROOM_20K_FAMILY_HOURS} ساعات. سعره ${PRODUCTS.joyroom20k.price} جنيه وبيكفّي أي عيلة. ولو محتاج حاجة أقوى، Anker PowerCore 20000 بيشحن الأيفون ${LAB_CONSTANTS.ANKER_20K_PHONE_CHARGES} مرات كاملة.`,
            },
            {
                question: `باور بانك يشغل الراوتر في ${govName}؟`,
                answer: `Anker 737 شغّل راوتر WE في مختبرنا ${LAB_CONSTANTS.ANKER_737_ROUTER_HOURS} ساعة و${LAB_CONSTANTS.ANKER_737_ROUTER_MINUTES} دقيقة. ده أطول وقت تشغيل في فئته. بيوصل ${govName} خلال ${deliveryDays} أيام بالدفع عند الاستلام.`,
            },
            {
                question: `بتوصلوا ${govName}؟`,
                answer: `أيوة بنوصل حتى المناطق الحدودية والصحراوية. ${govName} خلال ${deliveryDays} أيام عبر بوسطة. الشحن 40 جنيه — مجاني فوق 1,350 جنيه. ادفع كاش وقت الاستلام.`,
            },
        ],
    };

    return regionFaqs[region];
}

function generateVoiceFaqsEn(
    govName: string,
    region: Governorate['region'],
    regionData: typeof REGION_OUTAGE_DATA[Governorate['region']],
    deliveryDays: number
): Array<{ question: string; answer: string }> {
    return [
        {
            question: `What's the best power bank to run a router during power outages in ${govName}?`,
            answer: `In CairoVolt Labs testing, the Anker 737 ran a WE VDSL router for ${LAB_CONSTANTS.ANKER_737_ROUTER_HOURS} hours ${LAB_CONSTANTS.ANKER_737_ROUTER_MINUTES} minutes continuously without restart. Delivered to ${govName} in ${deliveryDays} days.`,
        },
        {
            question: `Power cuts last ${regionData.outageHours} hours in ${govName} — what's the solution?`,
            answer: `For ${regionData.outageHours}-hour outages, Joyroom 20000 charges 3 phones for ${LAB_CONSTANTS.JOYROOM_20K_FAMILY_HOURS} hours simultaneously. For router + fan, Anker 521 runs them for ${LAB_CONSTANTS.ANKER_521_UPS_HOURS} hours. Both available with COD delivery.`,
        },
        {
            question: `Does CairoVolt deliver to ${govName}?`,
            answer: `Yes! Door-to-door delivery to ${govName} in ${deliveryDays} days via Bosta. Shipping is 40 EGP or free above 1,350 EGP. Cash on delivery available.`,
        },
    ];
}

/**
 * Get all load-shedding product slugs (for sitemap generation)
 */
export function getOutageProductSlugs(): string[] {
    return Object.values(PRODUCTS).map(p => p.slug);
}
