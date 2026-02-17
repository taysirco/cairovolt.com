/**
 * Semantic Topical Map for CairoVolt
 * Defines topic clusters with pillar → cluster → supporting content relationships
 * Used for internal linking strategy and AI-friendly content organization
 */

export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational';
export type ContentType = 'buying_guide' | 'educational' | 'comparison' | 'review' | 'faq' | 'product';

export interface SupportingContent {
    topic: string;
    topicAr: string;
    type: ContentType;
    targetKeywords: string[];
    targetKeywordsAr: string[];
}

export interface TopicCluster {
    topic: string;
    topicAr: string;
    url: string;
    intent: SearchIntent;
    supportingContent: SupportingContent[];
    relatedEntities: string[];
    searchVolume: {
        ar: number;
        en: number;
    };
    internalLinks: string[];
}

export interface PillarContent {
    topic: string;
    topicAr: string;
    url: string;
    intent: SearchIntent;
}

export interface BrandTopicalMap {
    pillar: PillarContent;
    clusters: TopicCluster[];
}

export interface TopicalMap {
    [brandSlug: string]: BrandTopicalMap;
}

// ============================================
// TOPICAL MAP DATA
// ============================================

export const topicalMap: TopicalMap = {
    anker: {
        pillar: {
            topic: 'Anker Egypt - Official Mobile Accessories',
            topicAr: 'أنكر مصر - إكسسوارات الموبايل الأصلية',
            url: '/anker',
            intent: 'navigational',
        },
        clusters: [
            {
                topic: 'Power Banks',
                topicAr: 'باور بانك',
                url: '/anker/power-banks',
                intent: 'commercial',
                supportingContent: [
                    {
                        topic: 'Best Power Bank for iPhone 2026',
                        topicAr: 'أفضل باور بانك للأيفون 2026',
                        type: 'buying_guide',
                        targetKeywords: ['best power bank iphone', 'power bank fast charging iphone'],
                        targetKeywordsAr: ['افضل باور بانك للايفون', 'باور بانك شحن سريع'],
                    },
                    {
                        topic: 'Power Bank Capacity Guide: 10000 vs 20000 mAh',
                        topicAr: 'دليل سعة الباور بانك: 10000 ضد 20000 مللي أمبير',
                        type: 'educational',
                        targetKeywords: ['power bank capacity', '10000mah vs 20000mah'],
                        targetKeywordsAr: ['سعة باور بانك', 'كم مرة يشحن الباور بانك'],
                    },
                    {
                        topic: 'Anker vs Joyroom Power Bank Comparison',
                        topicAr: 'مقارنة باور بانك أنكر وجوي روم',
                        type: 'comparison',
                        targetKeywords: ['anker vs joyroom', 'best power bank brand egypt'],
                        targetKeywordsAr: ['انكر ضد جوي روم', 'افضل ماركة باور بانك'],
                    },
                    {
                        topic: 'Is Power Bank Allowed on Airplane Egypt?',
                        topicAr: 'هل الباور بانك مسموح به في الطائرة؟',
                        type: 'faq',
                        targetKeywords: ['power bank airplane', 'power bank flight rules'],
                        targetKeywordsAr: ['باور بانك طائرة', 'باور بانك مطار'],
                    },
                ],
                relatedEntities: ['iPhone 16', 'iPhone 17', 'MacBook', 'Samsung Galaxy S25', 'USB-C', 'PD Charging'],
                searchVolume: { ar: 4400, en: 720 },
                internalLinks: ['/anker/wall-chargers', '/anker/cables', '/joyroom/power-banks', '/anker/power-banks/anker-powercore-20000'],
            },
            {
                topic: 'Wall Chargers',
                topicAr: 'شواحن حائط',
                url: '/anker/wall-chargers',
                intent: 'commercial',
                supportingContent: [
                    {
                        topic: 'GaN Charger vs Regular Charger',
                        topicAr: 'شاحن GaN مقابل الشاحن العادي',
                        type: 'educational',
                        targetKeywords: ['gan charger', 'gallium nitride charger'],
                        targetKeywordsAr: ['شاحن جان', 'تقنية GaN'],
                    },
                    {
                        topic: '20W vs 30W vs 65W Charger Guide',
                        topicAr: 'دليل شواحن 20 و 30 و 65 واط',
                        type: 'buying_guide',
                        targetKeywords: ['20w charger', '30w charger', '65w charger'],
                        targetKeywordsAr: ['شاحن 20 واط', 'شاحن 30 واط', 'شاحن 65 واط'],
                    },
                    {
                        topic: 'Does Fast Charging Damage Battery?',
                        topicAr: 'هل الشحن السريع يضر البطارية؟',
                        type: 'faq',
                        targetKeywords: ['fast charging battery health', 'fast charging damage'],
                        targetKeywordsAr: ['الشحن السريع وصحة البطارية', 'هل الشحن السريع يضر'],
                    },
                ],
                relatedEntities: ['GaN Technology', 'USB-C PD', 'Anker Nano', 'Anker Prime', 'MacBook Charger'],
                searchVolume: { ar: 2900, en: 480 },
                internalLinks: ['/anker/power-banks', '/anker/cables'],
            },
            {
                topic: 'Earbuds & Audio',
                topicAr: 'سماعات وايربودز',
                url: '/anker/audio',
                intent: 'commercial',
                supportingContent: [
                    {
                        topic: 'Soundcore vs AirPods Comparison',
                        topicAr: 'مقارنة ساوند كور وايربودز',
                        type: 'comparison',
                        targetKeywords: ['soundcore vs airpods', 'anker earbuds vs apple'],
                        targetKeywordsAr: ['ساوند كور ضد ايربودز', 'سماعات انكر ام ابل'],
                    },
                    {
                        topic: 'Best Earbuds for Gym & Sports',
                        topicAr: 'أفضل سماعات للجيم والرياضة',
                        type: 'buying_guide',
                        targetKeywords: ['gym earbuds', 'sport earbuds waterproof'],
                        targetKeywordsAr: ['سماعات جيم', 'سماعات رياضة ضد الماء'],
                    },
                    {
                        topic: 'ANC Explained: Active Noise Cancellation',
                        topicAr: 'شرح تقنية إلغاء الضوضاء النشط ANC',
                        type: 'educational',
                        targetKeywords: ['anc earbuds', 'noise cancellation earbuds'],
                        targetKeywordsAr: ['سماعات عزل ضوضاء', 'تقنية ANC'],
                    },
                ],
                relatedEntities: ['Soundcore', 'ANC', 'Bluetooth 5.3', 'IPX5', 'Hi-Res Audio'],
                searchVolume: { ar: 3200, en: 590 },
                internalLinks: ['/anker/speakers', '/joyroom/audio'],
            },
            {
                topic: 'Cables',
                topicAr: 'كابلات شحن',
                url: '/anker/cables',
                intent: 'commercial',
                supportingContent: [
                    {
                        topic: 'MFi Certified Cables Explained',
                        topicAr: 'ما معنى كابل معتمد من أبل MFi',
                        type: 'educational',
                        targetKeywords: ['mfi certified', 'apple certified cable'],
                        targetKeywordsAr: ['كابل معتمد من ابل', 'mfi معنى'],
                    },
                    {
                        topic: 'USB-C vs Lightning Cable Guide',
                        topicAr: 'دليل كابل USB-C مقابل لايتننج',
                        type: 'buying_guide',
                        targetKeywords: ['usb c vs lightning', 'best iphone cable'],
                        targetKeywordsAr: ['يو اس بي سي ام لايتننج', 'افضل كابل ايفون'],
                    },
                ],
                relatedEntities: ['USB-C', 'Lightning', 'MFi Certification', 'Nylon Braided', '100W'],
                searchVolume: { ar: 1900, en: 320 },
                internalLinks: ['/anker/wall-chargers', '/anker/power-banks'],
            },
        ],
    },
    joyroom: {
        pillar: {
            topic: 'Joyroom Egypt - Premium Mobile Accessories',
            topicAr: 'جوي روم مصر - إكسسوارات موبايل متميزة',
            url: '/joyroom',
            intent: 'navigational',
        },
        clusters: [
            {
                topic: 'Power Banks',
                topicAr: 'باور بانك',
                url: '/joyroom/power-banks',
                intent: 'commercial',
                supportingContent: [
                    {
                        topic: 'Best Budget Power Bank Egypt 2026',
                        topicAr: 'أفضل باور بانك اقتصادي في مصر 2026',
                        type: 'buying_guide',
                        targetKeywords: ['cheap power bank egypt', 'budget power bank'],
                        targetKeywordsAr: ['باور بانك رخيص مصر', 'ارخص باور بانك'],
                    },
                    {
                        topic: 'Joyroom 22.5W Fast Charging Explained',
                        topicAr: 'شرح شحن جوي روم السريع 22.5 واط',
                        type: 'educational',
                        targetKeywords: ['22.5w charging', 'joyroom fast charge'],
                        targetKeywordsAr: ['شحن 22.5 واط', 'جوي روم شحن سريع'],
                    },
                ],
                relatedEntities: ['22.5W Fast Charging', 'QC 3.0', 'PD 20W', 'Built-in Cable'],
                searchVolume: { ar: 2200, en: 280 },
                internalLinks: ['/joyroom/cables', '/anker/power-banks'],
            },
            {
                topic: 'Earbuds & Audio',
                topicAr: 'سماعات وايربودز',
                url: '/joyroom/audio',
                intent: 'commercial',
                supportingContent: [
                    {
                        topic: 'Best TWS Under 1000 EGP',
                        topicAr: 'أفضل سماعات لاسلكية تحت 1000 جنيه',
                        type: 'buying_guide',
                        targetKeywords: ['tws under 1000', 'cheap earbuds egypt'],
                        targetKeywordsAr: ['سماعات تحت 1000 جنيه', 'ارخص سماعات لاسلكية'],
                    },
                    {
                        topic: 'Gaming Earbuds Low Latency Guide',
                        topicAr: 'دليل سماعات الألعاب بدون تأخير',
                        type: 'buying_guide',
                        targetKeywords: ['gaming earbuds', 'low latency earbuds'],
                        targetKeywordsAr: ['سماعات العاب', 'سماعات بدون تاخير'],
                    },
                ],
                relatedEntities: ['TWS', 'ENC', 'Gaming Mode', 'Bluetooth 5.3', 'Touch Controls'],
                searchVolume: { ar: 1800, en: 210 },
                internalLinks: ['/joyroom/cables', '/anker/audio'],
            },
            {
                topic: 'Car Accessories',
                topicAr: 'إكسسوارات السيارة',
                url: '/joyroom/car-accessories',
                intent: 'commercial',
                supportingContent: [
                    {
                        topic: 'Best Car Phone Holder Egypt',
                        topicAr: 'أفضل حامل موبايل للسيارة في مصر',
                        type: 'buying_guide',
                        targetKeywords: ['car phone holder', 'magnetic car mount'],
                        targetKeywordsAr: ['حامل موبايل سيارة', 'حامل مغناطيسي'],
                    },
                    {
                        topic: 'Car Charger Buying Guide',
                        topicAr: 'دليل شراء شاحن سيارة',
                        type: 'buying_guide',
                        targetKeywords: ['car charger', 'fast car charger'],
                        targetKeywordsAr: ['شاحن سيارة', 'شاحن سيارة سريع'],
                    },
                ],
                relatedEntities: ['MagSafe', 'Wireless Charging', 'Air Vent Mount', 'Dashboard Mount'],
                searchVolume: { ar: 1400, en: 190 },
                internalLinks: ['/joyroom/cables', '/joyroom/power-banks'],
            },
        ],
    },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all internal links for a given page URL
 * Used for building related products/categories sections
 */
export function getInternalLinksForPage(pageUrl: string): string[] {
    const allLinks: string[] = [];

    Object.values(topicalMap).forEach(brand => {
        brand.clusters.forEach(cluster => {
            if (cluster.url === pageUrl) {
                allLinks.push(...cluster.internalLinks);
            }
        });
    });

    return [...new Set(allLinks)];
}

/**
 * Get related entities for schema markup
 * Used in ProductSchema for "about" and "mentions" properties
 */
export function getRelatedEntities(brandSlug: string, categorySlug: string): string[] {
    const brandMap = topicalMap[brandSlug];
    if (!brandMap) return [];

    const cluster = brandMap.clusters.find(c => c.url.includes(categorySlug));
    return cluster?.relatedEntities || [];
}

/**
 * Get supporting content for a category
 * Used to generate buying guides and FAQ sections
 */
export function getSupportingContent(brandSlug: string, categorySlug: string): SupportingContent[] {
    const brandMap = topicalMap[brandSlug];
    if (!brandMap) return [];

    const cluster = brandMap.clusters.find(c => c.url.includes(categorySlug));
    return cluster?.supportingContent || [];
}

/**
 * Get search intent for a page
 * Used for meta tag optimization and CTA decisions
 */
export function getSearchIntent(pageUrl: string): SearchIntent {
    for (const brand of Object.values(topicalMap)) {
        if (brand.pillar.url === pageUrl) return brand.pillar.intent;
        for (const cluster of brand.clusters) {
            if (cluster.url === pageUrl) return cluster.intent;
        }
    }
    return 'navigational';
}
