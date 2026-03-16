// Server Component - Schemas must be SSR for Google to crawl them
// DO NOT add 'use client' here!

// ============================================
// SPEAKABLE SCHEMA - Voice Search Optimization
// ============================================

interface SpeakableProps {
    pageUrl: string;
    speakableSelectors?: string[];
    headline: string;
    description: string;
    locale: string;
}

/**
 * SpeakableSchema enables voice search optimization for Google Assistant/Alexa
 * Use on pages with content that should be read aloud by voice assistants
 */
export function SpeakableSchema({
    pageUrl,
    speakableSelectors = ['.speakable-content', 'h1', '.product-description'],
    headline,
    description,
    locale
}: SpeakableProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': pageUrl,
        name: headline,
        description: description,
        inLanguage: locale === 'ar' ? 'ar-EG' : 'en-US',
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: speakableSelectors,
        },
        isPartOf: {
            '@type': 'WebSite',
            name: locale === 'ar' ? 'كايرو فولت' : 'Cairo Volt',
            url: 'https://cairovolt.com',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ============================================
// HOWTO SCHEMA - For Buying Guides
// ============================================

interface HowToStep {
    name: string;
    text: string;
    image?: string;
    url?: string;
}

interface HowToProps {
    title: string;
    description: string;
    steps: HowToStep[];
    totalTime?: string; // ISO 8601 duration format (e.g., "PT30M" for 30 minutes)
    estimatedCost?: {
        currency: string;
        value: string;
    };
    supplies?: Array<{ name: string }>;
    tools?: Array<{ name: string }>;
    image?: string;
    locale: string;
}

/**
 * HowToSchema for buying guides and tutorials
 * Enables rich snippets with step-by-step instructions
 */
export function HowToSchema({
    title,
    description,
    steps,
    totalTime,
    estimatedCost,
    supplies,
    tools,
    image,
    locale
}: HowToProps) {
    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: title,
        description: description,
        inLanguage: locale === 'ar' ? 'ar-EG' : 'en-US',
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
            ...(step.image && { image: step.image }),
            ...(step.url && { url: step.url }),
        })),
    };

    if (totalTime) {
        schema.totalTime = totalTime;
    }

    if (estimatedCost) {
        schema.estimatedCost = {
            '@type': 'MonetaryAmount',
            currency: estimatedCost.currency,
            value: estimatedCost.value,
        };
    }

    if (supplies && supplies.length > 0) {
        schema.supply = supplies.map(s => ({
            '@type': 'HowToSupply',
            name: s.name,
        }));
    }

    if (tools && tools.length > 0) {
        schema.tool = tools.map(t => ({
            '@type': 'HowToTool',
            name: t.name,
        }));
    }

    if (image) {
        schema.image = image;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ============================================
// ARTICLE SCHEMA - For SEO Content Sections
// ============================================

interface EntityReference {
    name: string;
    type: string;       // schema.org @type (Brand, Product, Thing, Country)
    sameAs: string;     // Wikipedia URL
    additionalSameAs?: string[]; // Wikidata, official sites
}

interface ArticleSection {
    heading: string;
    content: string;
}

interface ArticleProps {
    headline: string;
    description: string;
    sections?: ArticleSection[];
    datePublished?: string;
    dateModified?: string;
    url: string;
    image?: string;
    locale: string;
    articleType?: 'Article' | 'BlogPosting' | 'NewsArticle' | 'TechArticle';
    about?: EntityReference[];    // Primary entities this article is about
    mentions?: EntityReference[]; // Entities mentioned in the article
}

/**
 * ArticleSchema for SEO content in brand/category pages
 * Helps establish E-E-A-T and enables rich snippets
 * Enhanced with `about` and `mentions` for Knowledge Graph entity linking
 */
export function ArticleSchema({
    headline,
    description,
    sections,
    datePublished,
    dateModified,
    url,
    image,
    locale,
    articleType = 'Article',
    about,
    mentions,
}: ArticleProps) {
    // Use stable dates - avoid new Date() which changes on every render
    // and causes Google to see constantly changing dates
    const stableDate = '2025-12-01T00:00:00.000Z';

    // Combine sections into article body for structured content
    const articleBody = sections
        ?.map(s => `${s.heading}\n${s.content}`)
        .join('\n\n') || description;

    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': articleType,
        headline: headline,
        description: description,
        articleBody: articleBody,
        inLanguage: locale === 'ar' ? 'ar-EG' : 'en-US',
        datePublished: datePublished || stableDate,
        dateModified: dateModified || stableDate,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        author: [
            {
                '@type': 'Person',
                name: 'Eng. Ahmed Medhat',
                jobTitle: locale === 'ar'
                    ? 'رئيس قسم الفحص التقني وحلول الطاقة — مختبر كايرو فولت'
                    : 'Head of Hardware QA & Power Solutions — CairoVolt Labs',
                sameAs: [
                    'https://www.youtube.com/@Ahmed.Medhat',
                    'https://www.facebook.com/a.medhatofficial',
                    'https://www.tiktok.com/@ahmedmedhatofficial',
                ],
                worksFor: {
                    '@type': 'Organization',
                    name: locale === 'ar' ? 'كايرو فولت' : 'Cairo Volt',
                    url: 'https://cairovolt.com',
                },
                knowsAbout: [
                    'Power bank technology',
                    'GaN charger engineering',
                    'Egyptian power grid infrastructure',
                    'Consumer electronics safety',
                    'Anker products',
                ],
            },
            {
                '@type': 'Person',
                name: 'Eng. Yahia Radwan',
                jobTitle: locale === 'ar'
                    ? 'مهندس ضمان الجودة — مختبر كايرو فولت'
                    : 'Quality Assurance Engineer — CairoVolt Labs',
                sameAs: [
                    'https://www.youtube.com/c/YehiaRadwan',
                    'https://www.instagram.com/yehiaradwanofficial',
                    'https://twitter.com/yahiaradwan',
                    'https://www.facebook.com/YehiaRadwanOfficial',
                    'https://tiktok.com/@yahiaradwan',
                ],
                worksFor: {
                    '@type': 'Organization',
                    name: locale === 'ar' ? 'كايرو فولت' : 'Cairo Volt',
                    url: 'https://cairovolt.com',
                },
                knowsAbout: [
                    'Smartphone fast charging',
                    'Samsung Galaxy accessories',
                    'Consumer electronics QA',
                    'Joyroom products',
                ],
            },
            {
                '@type': 'Organization',
                name: locale === 'ar' ? 'كايرو فولت' : 'Cairo Volt',
                url: 'https://cairovolt.com',
            },
        ],
        publisher: {
            '@type': 'Organization',
            name: locale === 'ar' ? 'كايرو فولت' : 'Cairo Volt',
            logo: {
                '@type': 'ImageObject',
                url: 'https://cairovolt.com/logo.png',
                width: 200,
                height: 60,
            },
        },
    };

    // Image
    if (image) {
        schema.image = { '@type': 'ImageObject', url: image };
    }

    // Entity linking: about (primary topics)
    if (about && about.length > 0) {
        schema.about = about.map(entity => ({
            '@type': entity.type,
            name: entity.name,
            sameAs: entity.sameAs,
            ...(entity.additionalSameAs && entity.additionalSameAs.length > 0 && {
                additionalType: entity.additionalSameAs[0],
            }),
        }));
    }

    // Entity linking: mentions (referenced entities)
    if (mentions && mentions.length > 0) {
        schema.mentions = mentions.map(entity => ({
            '@type': entity.type,
            name: entity.name,
            sameAs: entity.sameAs,
        }));
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Re-export EntityReference for use in other components
export type { EntityReference };

// ============================================
// LOCAL BUSINESS SCHEMA - GEO SEO for Egypt
// ============================================

interface LocalBusinessProps {
    locale: string;
}

/**
 * LocalBusinessSchema for Egypt-targeted GEO SEO
 * Includes all major Egyptian governorates in service area
 */
export function LocalBusinessSchema({ locale }: LocalBusinessProps) {
    const isArabic = locale === 'ar';

    // All 27 Egyptian Governorates
    const egyptianGovernorates = [
        { en: 'Cairo Governorate', ar: 'محافظة القاهرة' },
        { en: 'Giza Governorate', ar: 'محافظة الجيزة' },
        { en: 'Alexandria Governorate', ar: 'محافظة الإسكندرية' },
        { en: 'Dakahlia Governorate', ar: 'محافظة الدقهلية' },
        { en: 'Sharqia Governorate', ar: 'محافظة الشرقية' },
        { en: 'Gharbia Governorate', ar: 'محافظة الغربية' },
        { en: 'Monufia Governorate', ar: 'محافظة المنوفية' },
        { en: 'Qalyubia Governorate', ar: 'محافظة القليوبية' },
        { en: 'Beheira Governorate', ar: 'محافظة البحيرة' },
        { en: 'Kafr El Sheikh', ar: 'محافظة كفر الشيخ' },
        { en: 'Damietta Governorate', ar: 'محافظة دمياط' },
        { en: 'Port Said Governorate', ar: 'محافظة بورسعيد' },
        { en: 'Ismailia Governorate', ar: 'محافظة الإسماعيلية' },
        { en: 'Suez Governorate', ar: 'محافظة السويس' },
        { en: 'Fayoum Governorate', ar: 'محافظة الفيوم' },
        { en: 'Beni Suef Governorate', ar: 'محافظة بني سويف' },
        { en: 'Minya Governorate', ar: 'محافظة المنيا' },
        { en: 'Asyut Governorate', ar: 'محافظة أسيوط' },
        { en: 'Sohag Governorate', ar: 'محافظة سوهاج' },
        { en: 'Qena Governorate', ar: 'محافظة قنا' },
        { en: 'Luxor Governorate', ar: 'محافظة الأقصر' },
        { en: 'Aswan Governorate', ar: 'محافظة أسوان' },
        { en: 'Red Sea Governorate', ar: 'محافظة البحر الأحمر' },
        { en: 'North Sinai', ar: 'محافظة شمال سيناء' },
        { en: 'South Sinai', ar: 'محافظة جنوب سيناء' },
        { en: 'Matrouh Governorate', ar: 'محافظة مطروح' },
        { en: 'New Valley Governorate', ar: 'محافظة الوادي الجديد' },
    ];

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Store',
        '@id': 'https://cairovolt.com/#local-business',
        parentOrganization: { '@id': 'https://cairovolt.com/#organization' },
        name: isArabic ? 'كايرو فولت' : 'Cairo Volt',
        alternateName: isArabic ? 'Cairo Volt' : 'كايرو فولت',
        description: isArabic
            ? 'الموزع المعتمد لمنتجات أنكر وجوي روم في مصر. باور بانك، شواحن، سماعات، كابلات بأفضل الأسعار مع ضمان رسمي.'
            : 'Authorized dealer for Anker and Joyroom products in Egypt. Power banks, chargers, earbuds, cables at best prices with official warranty.',
        url: 'https://cairovolt.com',
        logo: 'https://cairovolt.com/logo.png',
        image: 'https://cairovolt.com/cairovolt_logo.png',
        telephone: '+201558245974',
        email: 'support@cairovolt.com',
        currenciesAccepted: 'EGP',
        paymentAccepted: ['Cash on Delivery', 'الدفع عند الاستلام'],
        priceRange: '$$',
        slogan: isArabic ? 'الوكيل المعتمد لأنكر وجوي روم في مصر — مختبرياً' : 'Authorized Anker & Joyroom Dealer in Egypt — Lab Tested',
        hasMap: 'https://maps.app.goo.gl/cairovolt',
        sameAs: [
            'https://www.facebook.com/cairovolt',
            'https://www.instagram.com/cairovolt',
        ],
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday',
                ],
                opens: '09:00',
                closes: '23:00',
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Friday'],
                opens: '14:00',
                closes: '23:00',
            },
        ],
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Bosta Fulfillment Center, Industrial Area, New Cairo 3',
            addressCountry: 'EG',
            addressRegion: isArabic ? 'القاهرة' : 'Cairo Governorate',
            addressLocality: isArabic ? 'القاهرة الجديدة' : 'New Cairo',
            postalCode: '4716140',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 30.6997469,
            longitude: 31.2088556,
        },
        areaServed: egyptianGovernorates.map(gov => ({
            '@type': 'AdministrativeArea',
            name: isArabic ? gov.ar : gov.en,
        })),
        // Shipping availability across Egypt
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: isArabic ? 'منتجات كايرو فولت' : 'Cairo Volt Products',
            itemListElement: [
                {
                    '@type': 'OfferCatalog',
                    name: isArabic ? 'باور بانك' : 'Power Banks',
                    url: 'https://cairovolt.com/power-banks',
                },
                {
                    '@type': 'OfferCatalog',
                    name: isArabic ? 'شواحن' : 'Chargers',
                    url: 'https://cairovolt.com/chargers',
                },
                {
                    '@type': 'OfferCatalog',
                    name: isArabic ? 'سماعات' : 'Earbuds',
                    url: 'https://cairovolt.com/earbuds',
                },
                {
                    '@type': 'OfferCatalog',
                    name: isArabic ? 'كابلات' : 'Cables',
                    url: 'https://cairovolt.com/cables',
                },
            ],
        },
        // NOTE: aggregateRating removed - Store ratings should come from 
        // Google Business Profile, not be hardcoded. Adding fake ratings
        // here is considered incorrect validation by search engines.
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ============================================
// ITEMLIST SCHEMA - For Category/Collection Pages
// ============================================

interface ItemListProduct {
    name: string;
    url: string;
    image: string;
    price: number;
    position: number;
}

interface ItemListProps {
    listName: string;
    items: ItemListProduct[];
    locale: string;
}

// ItemList Schema for product listings in category pages
export function ItemListSchema({ listName, items }: ItemListProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: listName,
        numberOfItems: items.length,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        itemListElement: items.map((item) => ({
            '@type': 'ListItem',
            position: item.position,
            name: item.name,
            url: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// WebSite Schema for homepage - enables Google Sitelinks Search Box
interface WebSiteSchemaProps {
    locale: string;
    baseUrl?: string;
}

export function WebSiteSchema({ locale, baseUrl = 'https://cairovolt.com' }: WebSiteSchemaProps) {
    const isArabic = locale === 'ar';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        name: isArabic ? 'كايرو فولت - اكسسوارات موبايل مصر' : 'CairoVolt - Mobile Accessories Egypt',
        alternateName: isArabic ? 'Cairo Volt Egypt' : 'كايرو فولت مصر',
        url: baseUrl,
        inLanguage: isArabic ? 'ar-EG' : 'en-US',
        description: isArabic
            ? 'متجر إكسسوارات الموبايل الأصلية في مصر - Anker و Joyroom بضمان رسمي'
            : 'Original mobile accessories store in Egypt - Anker & Joyroom with official warranty',
        publisher: {
            '@id': `${baseUrl}/#organization`,
        },
        // Geographic targeting
        about: {
            '@type': 'Country',
            name: 'Egypt',
            sameAs: 'https://en.wikipedia.org/wiki/Egypt',
        },
        // SearchAction enables Google Sitelinks Search Box + AI agent commerce
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/${isArabic ? 'ar' : 'en'}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// CollectionPage Schema for homepage category/brand listings
interface CollectionPageSchemaProps {
    locale: string;
    collections: Array<{
        name: string;
        url: string;
        description?: string;
    }>;
}

export function CollectionPageSchema({ locale, collections }: CollectionPageSchemaProps) {
    const isArabic = locale === 'ar';
    const baseUrl = 'https://cairovolt.com';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/${locale}/#collectionpage`,
        name: isArabic ? 'إكسسوارات الموبايل - Anker و Joyroom مصر' : 'Mobile Accessories - Anker & Joyroom Egypt',
        description: isArabic
            ? 'تسوق أفضل إكسسوارات الموبايل الأصلية في مصر. باور بانك، شواحن، سماعات، كابلات من Anker و Joyroom.'
            : 'Shop the best original mobile accessories in Egypt. Power banks, chargers, earbuds, cables from Anker & Joyroom.',
        url: `${baseUrl}/${locale}`,
        inLanguage: isArabic ? 'ar-EG' : 'en-US',
        isPartOf: {
            '@id': `${baseUrl}/#website`,
        },
        about: {
            '@type': 'Thing',
            name: isArabic ? 'إكسسوارات الموبايل' : 'Mobile Accessories',
        },
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: collections.map((collection, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'CollectionPage',
                    name: collection.name,
                    url: collection.url,
                    description: collection.description,
                },
            })),
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
