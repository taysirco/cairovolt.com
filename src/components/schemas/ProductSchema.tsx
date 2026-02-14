// Server Component - Schemas must be SSR for Google to crawl them
// DO NOT add 'use client' here!
import { entityRegistry } from '@/data/entity-registry';

interface ProductSchemaProps {
    product: {
        slug: string;
        sku: string;
        brand: string;
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
    // Product specifications for additionalProperty schema markup
    specifications?: Record<string, { en: string; ar: string }>;
}

// Stable price validity date - 3 months ahead, computed once at module level
const PRICE_VALID_UNTIL = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().split('T')[0];
})();

export function ProductSchema({ product, locale, baseUrl = 'https://cairovolt.com', aggregateRating, reviews, specifications }: ProductSchemaProps) {
    const t = product.translations[locale as 'en' | 'ar'] || product.translations.en;
    const isArabic = locale === 'ar';

    // Generate Video Schema if videoUrl exists - Enhanced for AI Answer Engines
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
        name: t.name,
        description: t.description,
        sku: product.sku,
        // GS1 Web Vocabulary - Global Product Identification
        ...(product.gtin && { gtin13: product.gtin }),
        ...(product.gtin13 && { gtin13: product.gtin13 }),
        ...(product.mpn && { mpn: product.mpn }),
        brand: {
            '@type': 'Brand',
            name: product.brand,
        },
        image: product.images.map(img => `${baseUrl}${img.url}`),
        // Add subjectOf property for VideoObject
        ...(videoSchema && { "subjectOf": videoSchema }),
        // Entity linking: about (what this product IS)
        about: (() => {
            const brandKey = product.brand.toLowerCase();
            const brandEntity = entityRegistry[brandKey as keyof typeof entityRegistry];
            const aboutEntities: Array<{ '@type': string; name: string; sameAs: string }> = [];
            if (brandEntity) {
                aboutEntities.push({
                    '@type': brandEntity.type,
                    name: isArabic ? brandEntity.nameAr : brandEntity.name,
                    sameAs: brandEntity.sameAs,
                });
            }
            // Add Egypt as area
            const egypt = entityRegistry['egypt' as keyof typeof entityRegistry];
            if (egypt) {
                aboutEntities.push({
                    '@type': egypt.type,
                    name: isArabic ? egypt.nameAr : egypt.name,
                    sameAs: egypt.sameAs,
                });
            }
            return aboutEntities.length > 0 ? aboutEntities : undefined;
        })(),
        // Entity linking: mentions (related tech/concepts)
        mentions: (() => {
            const mentionEntities: Array<{ '@type': string; name: string; sameAs: string }> = [];
            // USB-C is relevant for all modern products
            const usbC = entityRegistry['usbC' as keyof typeof entityRegistry];
            if (usbC) {
                mentionEntities.push({
                    '@type': usbC.type,
                    name: isArabic ? usbC.nameAr : usbC.name,
                    sameAs: usbC.sameAs,
                });
            }
            const cairo = entityRegistry['cairo' as keyof typeof entityRegistry];
            if (cairo) {
                mentionEntities.push({
                    '@type': cairo.type,
                    name: isArabic ? cairo.nameAr : cairo.name,
                    sameAs: cairo.sameAs,
                });
            }
            return mentionEntities.length > 0 ? mentionEntities : undefined;
        })(),
        // Product specifications as additionalProperty for rich results
        ...(specifications && Object.keys(specifications).length > 0 && {
            additionalProperty: Object.entries(specifications).map(([key, val]) => ({
                '@type': 'PropertyValue',
                name: key,
                value: isArabic ? val.ar : val.en,
            })),
        }),
        // Geo SEO: Area Served
        areaServed: {
            '@type': 'Country',
            name: 'Egypt',
            alternateName: 'مصر',
        },
        // Geo SEO: Available At
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
            // Arabic is default (/), English uses /en/. Use proper brand casing.
            url: `${baseUrl}${locale === 'ar' ? '' : '/en'}/${product.brand.charAt(0).toUpperCase() + product.brand.slice(1).toLowerCase()}/${product.slug}`,
            priceCurrency: 'EGP',
            price: product.price,
            priceValidUntil: PRICE_VALID_UNTIL,
            availability: product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
            // Geo SEO: Eligible Region
            eligibleRegion: {
                '@type': 'Country',
                name: 'Egypt',
                sameAs: 'https://en.wikipedia.org/wiki/Egypt',
            },
            seller: {
                '@type': 'Organization',
                name: isArabic ? 'كايرو فولت' : 'Cairo Volt',
            },
            // Shipping Details - Shows "Free Shipping" badge in Google
            shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                    '@type': 'MonetaryAmount',
                    value: product.price >= 500 ? 0 : 40,
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
                        maxValue: 5,
                        unitCode: 'd',
                    },
                },
            },
            // Return Policy - Shows "14-day returns" badge in Google
            hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'EG',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 14,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/FreeReturn',
            },
        },
        // Dynamic Aggregate Rating - ONLY included if real reviews exist
        // This prevents Schema Spam penalties from Google
        ...(aggregateRating && {
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: aggregateRating.ratingValue,
                reviewCount: aggregateRating.reviewCount,
                bestRating: aggregateRating.bestRating,
                worstRating: aggregateRating.worstRating,
            },
        }),
        // Individual reviews with pros/cons for rich snippets
        ...(reviews && reviews.length > 0 && {
            review: reviews.map(r => ({
                '@type': 'Review',
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

// Organization Schema for the whole site
export function OrganizationSchema({ locale }: { locale: string }) {
    const isArabic = locale === 'ar';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: isArabic ? 'كايرو فولت' : 'Cairo Volt',
        alternateName: isArabic ? 'Cairo Volt' : 'كايرو فولت',
        url: 'https://cairovolt.com',
        logo: 'https://cairovolt.com/logo.png',
        description: isArabic
            ? 'الموزع المعتمد لمنتجات أنكر وجوي روم في مصر'
            : 'Authorized dealer for Anker and Joyroom products in Egypt',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'EG',
            addressLocality: isArabic ? 'القاهرة' : 'Cairo',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: ['ar', 'en'],
        },
        sameAs: [
            'https://facebook.com/cairovolt',
            'https://instagram.com/cairovolt',
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQ Schema for FAQ page
export function FAQSchema({ faqs, locale }: { faqs: Array<{ question: string; answer: string }>; locale: string }) {
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
export function BreadcrumbSchema({ items, locale }: {
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
