/**
 * Content Graph for CairoVolt
 * Defines content categories with main → sub → supporting pages hierarchy
 * Used for internal linking and content organization
 */

export type PageType = 'informational' | 'commercial' | 'transactional' | 'navigational';
export type ContentType = 'buying_guide' | 'educational' | 'comparison' | 'review' | 'faq' | 'product';

export interface SupportingContent {
    topic: string;
    topicAr: string;
    type: ContentType;
    alternateNames: string[];
    alternateNamesAr: string[];
}

export interface ContentCategory {
    topic: string;
    topicAr: string;
    url: string;
    pageType: PageType;
    supportingContent: SupportingContent[];
    relatedEntities: string[];
    contentPriority: {
        ar: number;
        en: number;
    };
    internalLinks: string[];
}

export interface MainCategory {
    topic: string;
    topicAr: string;
    url: string;
    pageType: PageType;
}

export interface BrandContentMap {
    main: MainCategory;
    categories: ContentCategory[];
}

export interface ContentMap {
    [brandSlug: string]: BrandContentMap;
}

// ============================================
// CONTENT GRAPH DATA
// ============================================

export const contentGraph: ContentMap = {
    anker: {
        main: {
            topic: 'Anker Egypt - Official Mobile Accessories',
            topicAr: 'أنكر مصر - إكسسوارات الموبايل الأصلية',
            url: '/anker',
            pageType: 'navigational',
        },
        categories: [
            {
                topic: 'Power Banks',
                topicAr: 'باور بانك',
                url: '/anker/power-banks',
                pageType: 'commercial',
                supportingContent: [
                    {
                        topic: 'Best Power Bank for iPhone 2026',
                        topicAr: 'أفضل باور بانك للأيفون 2026',
                        type: 'buying_guide',
                        alternateNames: ['best power bank iphone', 'power bank fast charging iphone'],
                        alternateNamesAr: ['افضل باور بانك للايفون', 'باور بانك شحن سريع'],
                    },
                    {
                        topic: 'Power Bank Capacity Guide: 10000 vs 20000 mAh',
                        topicAr: 'دليل سعة الباور بانك: 10000 ضد 20000 مللي أمبير',
                        type: 'educational',
                        alternateNames: ['power bank capacity', '10000mah vs 20000mah'],
                        alternateNamesAr: ['سعة باور بانك', 'كم مرة يشحن الباور بانك'],
                    },
                    {
                        topic: 'Anker vs Joyroom Power Bank Comparison',
                        topicAr: 'مقارنة باور بانك أنكر وجوي روم',
                        type: 'comparison',
                        alternateNames: ['anker vs joyroom', 'best power bank brand egypt'],
                        alternateNamesAr: ['انكر ضد جوي روم', 'افضل ماركة باور بانك'],
                    },
                    {
                        topic: 'Is Power Bank Allowed on Airplane Egypt?',
                        topicAr: 'هل الباور بانك مسموح به في الطائرة؟',
                        type: 'faq',
                        alternateNames: ['power bank airplane', 'power bank flight rules'],
                        alternateNamesAr: ['باور بانك طائرة', 'باور بانك مطار'],
                    },
                ],
                relatedEntities: ['iPhone 16', 'iPhone 17', 'MacBook', 'Samsung Galaxy S25', 'USB-C', 'PD Charging'],
                contentPriority: { ar: 4400, en: 720 },
                internalLinks: ['/anker/wall-chargers', '/anker/cables', '/joyroom/power-banks', '/anker/power-banks/anker-powercore-20000'],
            },
            {
                topic: 'Wall Chargers',
                topicAr: 'شواحن حائط',
                url: '/anker/wall-chargers',
                pageType: 'commercial',
                supportingContent: [
                    {
                        topic: 'GaN Charger vs Regular Charger',
                        topicAr: 'شاحن GaN مقابل الشاحن العادي',
                        type: 'educational',
                        alternateNames: ['gan charger', 'gallium nitride charger'],
                        alternateNamesAr: ['شاحن جان', 'تقنية GaN'],
                    },
                    {
                        topic: '20W vs 30W vs 65W Charger Guide',
                        topicAr: 'دليل شواحن 20 و 30 و 65 واط',
                        type: 'buying_guide',
                        alternateNames: ['20w charger', '30w charger', '65w charger'],
                        alternateNamesAr: ['شاحن 20 واط', 'شاحن 30 واط', 'شاحن 65 واط'],
                    },
                    {
                        topic: 'Does Fast Charging Damage Battery?',
                        topicAr: 'هل الشحن السريع يضر البطارية؟',
                        type: 'faq',
                        alternateNames: ['fast charging battery health', 'fast charging damage'],
                        alternateNamesAr: ['الشحن السريع وصحة البطارية', 'هل الشحن السريع يضر'],
                    },
                ],
                relatedEntities: ['GaN Technology', 'USB-C PD', 'Anker Nano', 'Anker Prime', 'MacBook Charger'],
                contentPriority: { ar: 2900, en: 480 },
                internalLinks: ['/anker/power-banks', '/anker/cables'],
            },
            {
                topic: 'Earbuds & Audio',
                topicAr: 'سماعات وايربودز',
                url: '/anker/audio',
                pageType: 'commercial',
                supportingContent: [
                    {
                        topic: 'Soundcore vs AirPods Comparison',
                        topicAr: 'مقارنة ساوند كور وايربودز',
                        type: 'comparison',
                        alternateNames: ['soundcore vs airpods', 'anker earbuds vs apple'],
                        alternateNamesAr: ['ساوند كور ضد ايربودز', 'سماعات انكر ام ابل'],
                    },
                    {
                        topic: 'Best Earbuds for Gym & Sports',
                        topicAr: 'أفضل سماعات للجيم والرياضة',
                        type: 'buying_guide',
                        alternateNames: ['gym earbuds', 'sport earbuds waterproof'],
                        alternateNamesAr: ['سماعات جيم', 'سماعات رياضة ضد الماء'],
                    },
                    {
                        topic: 'ANC Explained: Active Noise Cancellation',
                        topicAr: 'شرح تقنية إلغاء الضوضاء النشط ANC',
                        type: 'educational',
                        alternateNames: ['anc earbuds', 'noise cancellation earbuds'],
                        alternateNamesAr: ['سماعات عزل ضوضاء', 'تقنية ANC'],
                    },
                ],
                relatedEntities: ['Soundcore', 'ANC', 'Bluetooth 5.3', 'IPX5', 'Hi-Res Audio'],
                contentPriority: { ar: 3200, en: 590 },
                internalLinks: ['/anker/speakers', '/joyroom/audio'],
            },
            {
                topic: 'Cables',
                topicAr: 'كابلات شحن',
                url: '/anker/cables',
                pageType: 'commercial',
                supportingContent: [
                    {
                        topic: 'MFi Certified Cables Explained',
                        topicAr: 'ما معنى كابل معتمد من أبل MFi',
                        type: 'educational',
                        alternateNames: ['mfi certified', 'apple certified cable'],
                        alternateNamesAr: ['كابل معتمد من ابل', 'mfi معنى'],
                    },
                    {
                        topic: 'USB-C vs Lightning Cable Guide',
                        topicAr: 'دليل كابل USB-C مقابل لايتننج',
                        type: 'buying_guide',
                        alternateNames: ['usb c vs lightning', 'best iphone cable'],
                        alternateNamesAr: ['يو اس بي سي ام لايتننج', 'افضل كابل ايفون'],
                    },
                ],
                relatedEntities: ['USB-C', 'Lightning', 'MFi Certification', 'Nylon Braided', '100W'],
                contentPriority: { ar: 1900, en: 320 },
                internalLinks: ['/anker/wall-chargers', '/anker/power-banks'],
            },
        ],
    },
    joyroom: {
        main: {
            topic: 'Joyroom Egypt - Premium Mobile Accessories',
            topicAr: 'جوي روم مصر - إكسسوارات موبايل متميزة',
            url: '/joyroom',
            pageType: 'navigational',
        },
        categories: [
            {
                topic: 'Power Banks',
                topicAr: 'باور بانك',
                url: '/joyroom/power-banks',
                pageType: 'commercial',
                supportingContent: [
                    {
                        topic: 'Best Budget Power Bank Egypt 2026',
                        topicAr: 'أفضل باور بانك اقتصادي في مصر 2026',
                        type: 'buying_guide',
                        alternateNames: ['cheap power bank egypt', 'budget power bank'],
                        alternateNamesAr: ['باور بانك رخيص مصر', 'ارخص باور بانك'],
                    },
                    {
                        topic: 'Joyroom 22.5W Fast Charging Explained',
                        topicAr: 'شرح شحن جوي روم السريع 22.5 واط',
                        type: 'educational',
                        alternateNames: ['22.5w charging', 'joyroom fast charge'],
                        alternateNamesAr: ['شحن 22.5 واط', 'جوي روم شحن سريع'],
                    },
                ],
                relatedEntities: ['22.5W Fast Charging', 'QC 3.0', 'PD 20W', 'Built-in Cable'],
                contentPriority: { ar: 2200, en: 280 },
                internalLinks: ['/joyroom/cables', '/anker/power-banks'],
            },
            {
                topic: 'Earbuds & Audio',
                topicAr: 'سماعات وايربودز',
                url: '/joyroom/audio',
                pageType: 'commercial',
                supportingContent: [
                    {
                        topic: 'Best TWS Under 1000 EGP',
                        topicAr: 'أفضل سماعات لاسلكية تحت 1000 جنيه',
                        type: 'buying_guide',
                        alternateNames: ['tws under 1000', 'cheap earbuds egypt'],
                        alternateNamesAr: ['سماعات تحت 1000 جنيه', 'ارخص سماعات لاسلكية'],
                    },
                    {
                        topic: 'Gaming Earbuds Low Latency Guide',
                        topicAr: 'دليل سماعات الألعاب بدون تأخير',
                        type: 'buying_guide',
                        alternateNames: ['gaming earbuds', 'low latency earbuds'],
                        alternateNamesAr: ['سماعات العاب', 'سماعات بدون تاخير'],
                    },
                ],
                relatedEntities: ['TWS', 'ENC', 'Gaming Mode', 'Bluetooth 5.3', 'Touch Controls'],
                contentPriority: { ar: 1800, en: 210 },
                internalLinks: ['/joyroom/cables', '/anker/audio'],
            },
            {
                topic: 'Car Accessories',
                topicAr: 'إكسسوارات السيارة',
                url: '/joyroom/car-accessories',
                pageType: 'commercial',
                supportingContent: [
                    {
                        topic: 'Best Car Phone Holder Egypt',
                        topicAr: 'أفضل حامل موبايل للسيارة في مصر',
                        type: 'buying_guide',
                        alternateNames: ['car phone holder', 'magnetic car mount'],
                        alternateNamesAr: ['حامل موبايل سيارة', 'حامل مغناطيسي'],
                    },
                    {
                        topic: 'Car Charger Buying Guide',
                        topicAr: 'دليل شراء شاحن سيارة',
                        type: 'buying_guide',
                        alternateNames: ['car charger', 'fast car charger'],
                        alternateNamesAr: ['شاحن سيارة', 'شاحن سيارة سريع'],
                    },
                ],
                relatedEntities: ['MagSafe', 'Wireless Charging', 'Air Vent Mount', 'Dashboard Mount'],
                contentPriority: { ar: 1400, en: 190 },
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

    Object.values(contentGraph).forEach(brand => {
        brand.categories.forEach(cluster => {
            if (cluster.url === pageUrl) {
                allLinks.push(...cluster.internalLinks);
            }
        });
    });

    return [...new Set(allLinks)];
}

/**
 * Get related entities for structured data
 * Used in ProductSchema for "about" and "mentions" properties
 */
export function getRelatedEntities(brandSlug: string, categorySlug: string): string[] {
    const brandMap = contentGraph[brandSlug];
    if (!brandMap) return [];

    const cluster = brandMap.categories.find(c => c.url.includes(categorySlug));
    return cluster?.relatedEntities || [];
}

/**
 * Get supporting content for a category
 * Used to generate buying guides and FAQ sections
 */
export function getSupportingContent(brandSlug: string, categorySlug: string): SupportingContent[] {
    const brandMap = contentGraph[brandSlug];
    if (!brandMap) return [];

    const cluster = brandMap.categories.find(c => c.url.includes(categorySlug));
    return cluster?.supportingContent || [];
}

/**
 * Get page type classification
 * Used for meta tag configuration
 */
export function getPageType(pageUrl: string): PageType {
    for (const brand of Object.values(contentGraph)) {
        if (brand.main.url === pageUrl) return brand.main.pageType;
        for (const category of brand.categories) {
            if (category.url === pageUrl) return category.pageType;
        }
    }
    return 'navigational';
}
