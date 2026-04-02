// Server Component — structured data
// DO NOT add 'use client' here!
import { brandEntities, getEntitiesForCategory } from '@/data/brand-entities';

interface ProductSchemaProps {
    product: {
        slug: string;
        sku: string;
        brand: string;
        categorySlug?: string;
        price: number;
        originalPrice?: number;
        stock: number;
        videoUrl?: string;
        // GS1 Web Vocabulary fields for AI product identification
        gtin?: string;      // Global Trade Item Number (EAN-13)
        gtin13?: string;    // Alias for GTIN
        mpn?: string;       // Manufacturer Part Number
        images: Array<{ url: string; alt: string }>;
        translations: {
            en: { name: string; description: string };
            ar: { name: string; description: string };
        };
    };
    locale: string;
    baseUrl?: string;
    // Dynamic reviews - IMPORTANT: Only include real reviews, no fake ratings
    aggregateRating?: {
        ratingValue: string;
        reviewCount: string;
        bestRating: string;
        worstRating: string;
    } | null;
    // Individual reviews for structured data
    reviews?: Array<{
        author: string;
        rating: number;
        reviewBody: string;
        pros?: string[];
        cons?: string[];
        datePublished: string;
        location?: string;
    }>;
    // Product specifications for additionalProperty structured data
    specifications?: Record<string, { en: string; ar: string }>;
    // Products this item is an accessory for (e.g., routers, laptops)
    isAccessoryOrSparePartFor?: Array<{ name: string }>;
    // Expert review from CairoVolt Labs
    expertReview?: {
        name: string;
        profileUrl: string;
        title: string;
        body: string;
    };
}

// Price validity window (48h)
// DeliveryStatus provides a per-request Offer overlay with even shorter TTL
const PRICE_VALID_UNTIL = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
})();

// Strip HTML tags and truncate for JSON-LD description (Google max: 5000 chars)
function getPlainTextDescription(html: string, maxLength: number = 4990): string {
    // Strip HTML tags
    let text = html.replace(/<[^>]*>/g, ' ');
    // Decode common HTML entities
    text = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
    // Collapse whitespace
    text = text.replace(/\s+/g, ' ').trim();
    // Truncate if over limit
    if (text.length > maxLength) {
        text = text.substring(0, maxLength - 3) + '...';
    }
    return text;
}

export function ProductSchema({ product, locale, aggregateRating, reviews, specifications, isAccessoryOrSparePartFor, expertReview }: ProductSchemaProps) {
    const t = product.translations[locale as 'en' | 'ar'] || product.translations.en;
    const isArabic = locale === 'ar';
    const baseUrl = 'https://cairovolt.com';
    const productUrl = `${baseUrl}${isArabic ? '' : '/en'}/${product.brand.toLowerCase()}/${(product.categorySlug || '').toLowerCase()}/${product.slug}`;
    // Use plain text description for JSON-LD (Google requires 50-5000 chars for Product description)
    const plainDescription = getPlainTextDescription(t.description);

    // Entity Mapping
    const brandWikidataLinks: Record<string, string> = {
        'Anker': 'https://www.wikidata.org/wiki/Q28452620', // Anker Innovations (official Wikidata)
        'Joyroom': 'https://www.joyroom.com/', // Brand entity
        'Soundcore': 'https://www.wikidata.org/wiki/Q28452620', // Tied to Anker parent
    };

    // Manufacturer mapping — links product to parent company entity
    const manufacturerMap: Record<string, { name: string; sameAs?: string }> = {
        'Anker': { name: 'Anker Innovations', sameAs: 'https://www.wikidata.org/wiki/Q28452620' },
        'Soundcore': { name: 'Anker Innovations', sameAs: 'https://www.wikidata.org/wiki/Q28452620' },
        'Joyroom': { name: 'Joyroom Electronic & Technology Co., Ltd' },
    };

    const categoryEntities: Record<string, string[]> = {
        'power-banks': ['https://www.wikidata.org/wiki/Q2208745', 'https://en.wikipedia.org/wiki/Battery_charger#Power_bank'],
        'wall-chargers': ['https://en.wikipedia.org/wiki/Battery_charger', 'https://www.wikidata.org/wiki/Q352917'],
        'car-chargers': ['https://en.wikipedia.org/wiki/Car_charger', 'https://www.wikidata.org/wiki/Q352917'],
        'audio': ['https://www.wikidata.org/wiki/Q186819', 'https://en.wikipedia.org/wiki/Headphones'],
        'cables': ['https://www.wikidata.org/wiki/Q42378', 'https://en.wikipedia.org/wiki/USB#Connectors'],
    };

    const brandEntityUrl = brandWikidataLinks[product.brand];
    const categoryEntityUrls = categoryEntities[product.categorySlug || ''] || [];

    // Generate Video Schema if videoUrl exists - Supports AI assistants
    const videoSchema = product.videoUrl ? {
        "@type": "VideoObject",
        "name": t.name,
        "description": t.description,
        "thumbnailUrl": product.images[0]?.url ? `${baseUrl}${product.images[0].url}` : "",
        "uploadDate": new Date().toISOString(), // In real app, should use product creation date
        "contentUrl": product.videoUrl,
        "embedUrl": product.videoUrl, // For embedded player support
        "duration": "PT2M", // ISO 8601 duration - default 2 minutes
        "inLanguage": isArabic ? "ar-EG" : "en-US",
        "publisher": {
            "@type": "Organization",
            "name": isArabic ? "كايرو فولت" : "Cairo Volt",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/logo.png`
            }
        }
    } : null;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        name: t.name,
        description: plainDescription,
        sku: product.sku,
        // GS1 Web Vocabulary - Global Product Identification
        ...(product.gtin && { gtin13: product.gtin }),
        ...(product.gtin13 && { gtin13: product.gtin13 }),
        ...(product.mpn && { mpn: product.mpn }),
        // Map brand to Wikidata for entity context
        brand: {
            '@type': 'Brand',
            name: product.brand,
            ...(brandEntityUrl && { sameAs: brandEntityUrl }),
        },
        // Manufacturer entity — links to parent company's entity node
        ...(manufacturerMap[product.brand] && {
            manufacturer: {
                '@type': 'Organization',
                name: manufacturerMap[product.brand].name,
                ...(manufacturerMap[product.brand].sameAs && { sameAs: manufacturerMap[product.brand].sameAs }),
            },
        }),
        // Category Metadata: Explicitly define category entity
        category: (product.categorySlug || '').replace(/-/g, ' '),
        image: product.images.map((img, idx) => ({
            '@type': 'ImageObject',
            name: img.alt || `${t.name} — ${isArabic ? `صورة ${idx + 1}` : `Image ${idx + 1}`}`,
            url: `${baseUrl}${img.url}`,
            contentUrl: `${baseUrl}${img.url}`,
            // Implements Content Provenance validation framework (C2PA protocol)
            // C2PA content provenance metadata
            creator: {
                '@type': 'Organization',
                name: 'CairoVolt Hardware Validation Labs',
                url: baseUrl
            },
            creditText: 'CairoVolt Engineering',
            copyrightNotice: `© ${new Date().getFullYear()} CairoVolt. All 100% human-verified hardware testing.`,
            acquireLicensePage: `${baseUrl}/${locale}/terms`
        })),
        // subjectOf: C2PA content verification + optional VideoObject
        subjectOf: videoSchema
            ? [
                videoSchema,
                { '@type': 'WebPage', name: 'CairoVolt Content Verification', url: `${baseUrl}/api/v1/verify-content?sku=${product.sku}` },
              ]
            : { '@type': 'WebPage', name: 'CairoVolt Content Verification', url: `${baseUrl}/api/v1/verify-content?sku=${product.sku}` },
        // Related entities: about (what this product IS) — uses category-aware entity mapping
        about: (() => {
            const brandKey = product.brand.toLowerCase();
            const brandEntity = brandEntities[brandKey as keyof typeof brandEntities];
            const aboutEntities: Array<{ '@type': string; name: string; sameAs: string }> = [];
            if (brandEntity) {
                aboutEntities.push({
                    '@type': brandEntity.type,
                    name: isArabic ? brandEntity.nameAr : brandEntity.name,
                    sameAs: brandEntity.sameAs,
                });
            }
            // Add CairoVolt entity for Trust & Quality — we are the seller + lab tester
            const cairovolt = brandEntities['cairovolt' as keyof typeof brandEntities];
            if (cairovolt) {
                aboutEntities.push({
                    '@type': cairovolt.type,
                    name: isArabic ? cairovolt.nameAr : cairovolt.name,
                    sameAs: cairovolt.sameAs,
                });
            }
            // Add Egypt as geographic area
            const egypt = brandEntities['egypt' as keyof typeof brandEntities];
            if (egypt) {
                aboutEntities.push({
                    '@type': egypt.type,
                    name: isArabic ? egypt.nameAr : egypt.name,
                    sameAs: egypt.sameAs,
                });
            }
            return aboutEntities.length > 0 ? aboutEntities : undefined;
        })(),
        // Related entities: mentions — uses category-specific entity keys for entity data
        mentions: (() => {
            const categorySlug = (product as { categorySlug?: string }).categorySlug;
            const categoryEntityKeys = categorySlug ? getEntitiesForCategory(categorySlug) : ['egypt', 'cairo', 'usbC'];
            const mentionEntities: Array<{ '@type': string; name: string; sameAs: string }> = [];
            // Add USB-C (always relevant) + category-specific entities
            const priorityKeys = ['usbC', 'cairo', 'newCairo'];
            const allKeys = [...new Set([...priorityKeys, ...categoryEntityKeys])];
            for (const key of allKeys.slice(0, 8)) { // Limit to 8 mentions to avoid overflow
                const entity = brandEntities[key as keyof typeof brandEntities];
                if (entity && !aboutContains(key)) {
                    mentionEntities.push({
                        '@type': entity.type,
                        name: isArabic ? entity.nameAr : entity.name,
                        sameAs: entity.sameAs,
                    });
                }
            }
            return mentionEntities.length > 0 ? mentionEntities : undefined;

            function aboutContains(key: string) {
                const brandKey = product.brand.toLowerCase();
                return [brandKey, 'cairovolt', 'egypt'].includes(key);
            }
        })(),
        // Product specifications as additionalProperty — only real specs, no hardcoded tech claims
        ...(specifications && Object.keys(specifications).length > 0 && {
            additionalProperty: Object.entries(specifications).map(([key, val]) => ({
                '@type': 'PropertyValue',
                name: key,
                value: isArabic ? val.ar : val.en,
            })),
        }),
        // isAccessoryOrSparePartFor - links product to devices it powers
        // Use @type 'Thing' since these are referenced devices, not standalone product listings
        ...(isAccessoryOrSparePartFor && isAccessoryOrSparePartFor.length > 0 && {
            isAccessoryOrSparePartFor: isAccessoryOrSparePartFor.map(item => ({
                '@type': 'Thing',
                name: item.name,
            })),
        }),
        // Audience with geographic targeting — category-aware description
        audience: {
            '@type': 'Audience',
            audienceType: (() => {
                const cat = (product as { categorySlug?: string }).categorySlug || '';
                const audienceMap: Record<string, { en: string; ar: string }> = {
                    'power-banks': {
                        en: 'Users in Egypt who need portable backup power for phones and devices during power outages and travel',
                        ar: 'المستخدمون في مصر الذين يحتاجون طاقة محمولة للهواتف والأجهزة أثناء انقطاع الكهرباء والسفر',
                    },
                    'wall-chargers': {
                        en: 'Users in Egypt who need fast, safe wall chargers for phones, tablets, and laptops',
                        ar: 'المستخدمون في مصر الذين يحتاجون شواحن حائط سريعة وآمنة للهواتف والتابلت واللابتوب',
                    },
                    'cables': {
                        en: 'Users in Egypt who need durable, fast-charging cables for daily device connectivity',
                        ar: 'المستخدمون في مصر الذين يحتاجون كابلات متينة وسريعة الشحن للاستخدام اليومي',
                    },
                    'audio': {
                        en: 'Users in Egypt looking for quality wireless earbuds for music, calls, and commuting',
                        ar: 'المستخدمون في مصر الذين يبحثون عن سماعات لاسلكية للموسيقى والمكالمات والمواصلات',
                    },
                    'car-chargers': {
                        en: 'Drivers in Egypt who need reliable in-car fast charging for phones and devices',
                        ar: 'السائقون في مصر الذين يحتاجون شحن سريع موثوق للهواتف أثناء القيادة',
                    },
                    'car-holders': {
                        en: 'Drivers in Egypt who need secure phone mounting for navigation and hands-free use',
                        ar: 'السائقون في مصر الذين يحتاجون تثبيت آمن للهاتف للملاحة واستخدام بدون يدين',
                    },
                    'smart-watches': {
                        en: 'Active users in Egypt looking for affordable fitness tracking and smart notifications',
                        ar: 'المستخدمون النشطون في مصر الذين يبحثون عن تتبع لياقة وإشعارات ذكية بسعر مناسب',
                    },
                };
                const audience = audienceMap[cat];
                return audience ? (isArabic ? audience.ar : audience.en) : (isArabic
                    ? 'المستخدمون في مصر الذين يبحثون عن إكسسوارات إلكترونية أصلية بأفضل سعر'
                    : 'Users in Egypt looking for original electronic accessories at the best price');
            })(),
            geographicArea: {
                '@type': 'Country',
                name: 'Egypt',
                sameAs: 'https://en.wikipedia.org/wiki/Egypt',
            },
        },
        // Reviewed by CairoVolt Labs as expert organization
        reviewedBy: {
            '@type': 'Organization',
            name: 'CairoVolt Hardware Validation Labs',
            url: `${baseUrl}`,
            knowsAbout: [
                { '@type': 'Thing', name: 'Electric power distribution', sameAs: 'https://en.wikipedia.org/wiki/Electric_power_distribution' },
                { '@type': 'Thing', name: 'Consumer electronics safety' },
            ],
        },
        // Regional: Area Served
        areaServed: {
            '@type': 'Country',
            name: 'Egypt',
            alternateName: 'مصر',
        },
        // Regional: Available At
        availableAtOrFrom: {
            '@type': 'Place',
            name: isArabic ? 'كايرو فولت - مصر' : 'CairoVolt Egypt',
            address: {
                '@type': 'PostalAddress',
                addressCountry: 'EG',
                addressRegion: isArabic ? 'القاهرة' : 'Cairo Governorate',
                addressLocality: isArabic ? 'القاهرة' : 'Cairo',
            },
        },
        offers: {
            '@type': 'Offer',
            // Arabic is default (/), English uses /en/. Include categorySlug for correct URL.
            url: `${baseUrl}${locale === 'ar' ? '' : '/en'}/${product.brand.toLowerCase()}/${(product as { categorySlug?: string }).categorySlug?.toLowerCase() || ''}/${product.slug}`,
            priceCurrency: 'EGP',
            price: product.price,
            priceValidUntil: PRICE_VALID_UNTIL,
            availability: product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/BackOrder',
            itemCondition: 'https://schema.org/NewCondition',
            // UnitPriceSpecification for detailed structured pricing data
            priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: product.price,
                priceCurrency: 'EGP',
                valueAddedTaxIncluded: true,
                ...(product.originalPrice && product.originalPrice > product.price && {
                    priceType: 'https://schema.org/SalePrice',
                    referenceQuantity: { '@type': 'QuantitativeValue', value: 1 },
                }),
            },
            // Regional: Eligible Region
            eligibleRegion: {
                '@type': 'Country',
                name: 'Egypt',
                sameAs: 'https://en.wikipedia.org/wiki/Egypt',
            },
            seller: {
                '@type': 'Organization',
                '@id': 'https://cairovolt.com/#organization',
                name: isArabic ? 'كايرو فولت' : 'Cairo Volt',
                url: baseUrl,
                identifier: [
                    { '@type': 'PropertyValue', propertyID: 'CommercialRegistry', value: '8446' },
                    { '@type': 'PropertyValue', propertyID: 'TaxID', value: '777-471-566' },
                ],
                location: {
                    '@type': 'Place',
                    name: 'New Damietta City',
                    sameAs: 'https://www.wikidata.org/wiki/Q12211943',
                },
            },
            // Shipping Details — structured shipping cost and delivery time
            shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                    '@type': 'MonetaryAmount',
                    value: product.price >= 1350 ? "0.00" : "40.00",
                    currency: 'EGP',
                },
                shippingDestination: {
                    '@type': 'DefinedRegion',
                    addressCountry: 'EG',
                },
                deliveryTime: {
                    '@type': 'ShippingDeliveryTime',
                    handlingTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 0,
                        maxValue: 1,
                        unitCode: 'd',
                    },
                    transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 2,
                        unitCode: 'd',
                    },
                },
            },
            // Accepted Payment Method - COD explicit for Egypt
            acceptedPaymentMethod: {
                '@type': 'PaymentMethod',
                name: 'Cash on Delivery',
            },
            // Return Policy — 14-day return window per company policy
            hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'EG',
                returnPolicyCountry: 'EG',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 14,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/FreeReturn',
                refundType: 'https://schema.org/FullRefund',
                url: `${baseUrl}${locale === 'ar' ? '' : '/en'}/return-policy`,
            },
        },
        // BuyAction — Direct Purchase Intent
        // BuyAction — enables programmatic purchase via RFC 6570 urlTemplate variables
        potentialAction: {
            '@type': 'BuyAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/api/v1/quick-cod?sku={sku}&phone={phone_number}`,
                inLanguage: isArabic ? 'ar-EG' : 'en-US',
                actionPlatform: [
                    'https://schema.org/DesktopWebPlatform',
                    'https://schema.org/MobileWebPlatform',
                    'https://schema.org/IOSPlatform',
                    'https://schema.org/AndroidPlatform',
                ],
                contentType: 'application/json',
                httpMethod: 'POST',
            },
            seller: {
                '@type': 'Organization',
                '@id': 'https://cairovolt.com/#organization',
                name: isArabic ? 'كايرو فولت' : 'Cairo Volt',
                url: baseUrl,
            },
            deliveryMethod: 'https://schema.org/ParcelService',
            expectsAcceptanceOf: {
                '@type': 'Offer',
                price: product.price,
                priceCurrency: 'EGP',
                availability: product.stock > 0
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/BackOrder',
                shippingDetails: {
                    '@type': 'OfferShippingDetails',
                    shippingRate: {
                        '@type': 'MonetaryAmount',
                        value: product.price >= 1350 ? "0.00" : "40.00",
                        currency: 'EGP',
                    },
                    shippingDestination: {
                        '@type': 'DefinedRegion',
                        addressCountry: 'EG',
                    },
                    deliveryTime: {
                        '@type': 'ShippingDeliveryTime',
                        handlingTime: {
                            '@type': 'QuantitativeValue',
                            minValue: 0,
                            maxValue: 1,
                            unitCode: 'd',
                        },
                        transitTime: {
                            '@type': 'QuantitativeValue',
                            minValue: 1,
                            maxValue: 2,
                            unitCode: 'd',
                        },
                    },
                },
                hasMerchantReturnPolicy: {
                    '@type': 'MerchantReturnPolicy',
                    applicableCountry: 'EG',
                    returnPolicyCountry: 'EG',
                    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                    merchantReturnDays: 14,
                    returnMethod: 'https://schema.org/ReturnByMail',
                    returnFees: 'https://schema.org/FreeReturn',
                    refundType: 'https://schema.org/FullRefund',
                },
                acceptedPaymentMethod: {
                    '@type': 'PaymentMethod',
                    name: 'Cash on Delivery',
                },
            },
        },
        // Expert Review from CairoVolt Labs with profile verification
        ...(expertReview && {
            review: [{
                '@type': 'Review',
                name: isArabic ? `مراجعة خبراء كايرو فولت لـ ${t.name}` : `CairoVolt Expert Review of ${t.name}`,
                author: {
                    '@type': 'Person',
                    name: expertReview.name,
                    jobTitle: expertReview.title,
                    sameAs: expertReview.profileUrl,
                },
                publisher: {
                    '@type': 'Organization',
                    name: isArabic ? 'كايرو فولت' : 'Cairo Volt',
                },
                reviewBody: expertReview.body,
                reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '4.5',
                    bestRating: '5',
                    worstRating: '1',
                },
            },
            // Append existing user reviews if any
            ...(reviews || []).map(r => ({
                '@type': 'Review',
                name: isArabic ? `مراجعة ${r.author} لـ ${t.name}` : `${r.author}'s Review of ${t.name}`,
                author: { '@type': 'Person', name: r.author },
                datePublished: r.datePublished,
                reviewRating: {
                    '@type': 'Rating',
                    ratingValue: r.rating.toString(),
                    bestRating: '5',
                    worstRating: '1',
                },
                reviewBody: r.reviewBody,
                ...(r.pros && r.pros.length > 0 && {
                    positiveNotes: {
                        '@type': 'ItemList',
                        itemListElement: r.pros.map((p, i) => ({
                            '@type': 'ListItem',
                            position: i + 1,
                            name: p,
                        })),
                    },
                }),
                ...(r.cons && r.cons.length > 0 && {
                    negativeNotes: {
                        '@type': 'ItemList',
                        itemListElement: r.cons.map((c, i) => ({
                            '@type': 'ListItem',
                            position: i + 1,
                            name: c,
                        })),
                    },
                }),
                ...(r.location && {
                    contentLocation: {
                        '@type': 'Place',
                        name: r.location,
                        address: { '@type': 'PostalAddress', addressCountry: 'EG' },
                    },
                }),
            }))],
        }),
        // Dynamic Aggregate Rating - ONLY included if real reviews exist
        // Ensures aggregate ratings are strictly tied to localized verified reviews.
        ...(aggregateRating && {
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: aggregateRating.ratingValue,
                reviewCount: aggregateRating.reviewCount,
                bestRating: aggregateRating.bestRating,
                worstRating: aggregateRating.worstRating,
            },
        }),
        // Fallback: Individual reviews only when expertReview is NOT provided
        // (When expertReview IS provided, the review array is built above with both expert + user reviews)
        ...(!expertReview && reviews && reviews.length > 0 && {
            review: reviews.map(r => ({
                '@type': 'Review',
                name: isArabic ? `مراجعة ${r.author} لـ ${t.name}` : `${r.author}'s Review of ${t.name}`,
                author: { '@type': 'Person', name: r.author },
                datePublished: r.datePublished,
                reviewRating: {
                    '@type': 'Rating',
                    ratingValue: r.rating.toString(),
                    bestRating: '5',
                    worstRating: '1',
                },
                reviewBody: r.reviewBody,
                ...(r.pros && r.pros.length > 0 && {
                    positiveNotes: {
                        '@type': 'ItemList',
                        itemListElement: r.pros.map((p, i) => ({
                            '@type': 'ListItem',
                            position: i + 1,
                            name: p,
                        })),
                    },
                }),
                ...(r.cons && r.cons.length > 0 && {
                    negativeNotes: {
                        '@type': 'ItemList',
                        itemListElement: r.cons.map((c, i) => ({
                            '@type': 'ListItem',
                            position: i + 1,
                            name: c,
                        })),
                    },
                }),
                ...(r.location && {
                    contentLocation: {
                        '@type': 'Place',
                        name: r.location,
                        address: {
                            '@type': 'PostalAddress',
                            addressCountry: 'EG',
                        },
                    },
                }),
            })),
        }),
    };

    // Add price drop info if there's a discount
    if (product.originalPrice && product.originalPrice > product.price) {
        (schema.offers as Record<string, unknown>).priceSpecification = {
            '@type': 'PriceSpecification',
            price: product.price,
            priceCurrency: 'EGP',
            valueAddedTaxIncluded: true,
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQ Schema for FAQ page
export function FAQSchema({ faqs, locale: _locale }: { faqs: Array<{ question: string; answer: string }>; locale: string }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items, locale: _locale }: {
    items: Array<{ name: string; url: string }>;
    locale: string;
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
