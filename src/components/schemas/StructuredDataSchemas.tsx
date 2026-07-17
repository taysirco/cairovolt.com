// Server Component — structured data
// DO NOT add 'use client' here!

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
 * Enables enhanced results with step-by-step instructions
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
        inLanguage: locale === 'ar' ? 'ar-EG' : 'en-EG',
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
// ARTICLE SCHEMA - For Content Sections
// ============================================

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
}

/**
 * Article schema for site-owned editorial content.
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
}: ArticleProps) {
    // Combine sections into article body for structured content
    const articleBody = sections
        ?.map(s => `${s.heading}\n${s.content}`)
        .join('\n\n');

    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': articleType,
        headline: headline,
        description: description,
        ...(articleBody && { articleBody }),
        inLanguage: locale === 'ar' ? 'ar-EG' : 'en-EG',
        ...(datePublished && { datePublished }),
        ...(dateModified && { dateModified }),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        // Attribute site-owned articles to the same store organization node.
        author: {
            '@type': 'Organization',
            '@id': 'https://cairovolt.com/#organization',
            name: locale === 'ar' ? 'كايرو فولت' : 'CairoVolt',
            url: 'https://cairovolt.com',
        },
        publisher: {
            '@type': 'Organization',
            '@id': 'https://cairovolt.com/#organization',
            name: locale === 'ar' ? 'كايرو فولت' : 'CairoVolt',
            logo: {
                '@type': 'ImageObject',
                url: 'https://cairovolt.com/logo.png',
                width: 1024,
                height: 1024,
            },
        },
    };

    // Optional article-cover URL. Do not assert rights without a separate
    // record documenting ownership or a licence for the exact asset.
    if (image) {
        schema.image = {
            '@type': 'ImageObject',
            url: image,
        };
    }

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
        itemListOrder: 'https://schema.org/ItemListUnordered',
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

// NOTE: WebSiteSchema was removed — the canonical #website node is defined
// once in GlobalBusinessSchema (layout). Its SearchAction pointed to a
// non-existent /search route and the sitelinks searchbox is retired anyway.

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
        '@id': `${baseUrl}${isArabic ? '' : '/en'}/#collectionpage`,
        name: isArabic ? 'إكسسوارات الموبايل - انكر وساوندكور وجوي روم في مصر' : 'Mobile Accessories - Anker, Soundcore & Joyroom Egypt',
        description: isArabic
            ? 'تسوق إكسسوارات الموبايل في مصر، بما يشمل باور بانك وشواحن وسماعات وكابلات من انكر وساوندكور وجوي روم.'
            : 'Shop mobile accessories in Egypt, including power banks, chargers, earbuds, and cables from Anker, Soundcore, and Joyroom.',
        url: `${baseUrl}${isArabic ? '' : '/en'}`,
        inLanguage: isArabic ? 'ar-EG' : 'en-EG',
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
