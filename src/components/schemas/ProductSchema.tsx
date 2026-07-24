// Server Component — structured data
// DO NOT add 'use client' here!
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';
import {
    getGtinSchemaProperty,
    getMerchantGtin,
    getMerchantProductUrl,
    normalizeMpn,
    SEO_NOINDEX_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';

interface ProductSchemaProps {
    product: {
        slug: string;
        sku: string;
        brand: string;
        categorySlug?: string;
        price: number;
        stock: number;
        videoUrl?: string;
        gtin?: string;
        gtin13?: string;
        mpn?: string;
        images: Array<{ url: string; alt: string; width?: number; height?: number }>;
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
}

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

function getAbsoluteUrl(url: string, baseUrl: string): string {
    return /^https?:\/\//i.test(url) ? url : `${baseUrl}${url}`;
}

export function ProductSchema({ product, locale, aggregateRating, reviews, specifications, isAccessoryOrSparePartFor }: ProductSchemaProps) {
    const t = product.translations[locale as 'en' | 'ar'] || product.translations.en;
    const isArabic = locale === 'ar';
    const baseUrl = 'https://cairovolt.com';
    const productUrl = getMerchantProductUrl(product, locale);
    const gtin = getMerchantGtin(product.gtin13, product.gtin);
    const mpn = normalizeMpn(product.mpn);
    // Use plain text description for JSON-LD (Google requires 50-5000 chars for Product description)
    const productDisplayName = isArabic
        ? localizeArabicBrandNames(t.name)
        : t.name;
    const plainDescription = isArabic
        ? localizeArabicBrandNames(getPlainTextDescription(t.description))
        : getPlainTextDescription(t.description);

    // Surface missing catalogue images during local development.
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
        if (product.images.length === 0) {
            console.warn(`[ProductSchema] Product "${product.slug}" has no images.`);
        }
    }

    // Keep manufacturer identity limited to relationships documented by the
    // brands themselves; do not infer an importer or local representative.
    const manufacturerMap: Record<string, { name: string; sameAs?: string }> = {
        'Anker': { name: 'Anker Innovations', sameAs: 'https://www.anker.com/about-us' },
        'Soundcore': { name: 'Anker Innovations', sameAs: 'https://www.anker.com/about-us' },
        'Joyroom': { name: 'JOYROOM', sameAs: 'https://www.joyroom.com/pages/about-joyroom' },
    };

    // Google merchant listings want an offer price-validity date; refresh it a
    // year out from each build so it never reads as expired.
    const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
    // Store-wide shipping (mirrors the feed + the site policy): free from 3700 EGP,
    // otherwise a conservative flat 130 EGP within Egypt, 1-5 day transit.
    const FREE_SHIPPING_THRESHOLD_EGP = 3700;
    const shippingRateValue = product.price >= FREE_SHIPPING_THRESHOLD_EGP ? 0 : 130;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        name: productDisplayName,
        description: plainDescription,
        sku: product.sku,
        // Only expose identifiers with a supported length and valid GS1 check digit.
        ...getGtinSchemaProperty(gtin),
        ...(mpn && { mpn }),
        brand: {
            '@type': 'Brand',
            name: product.brand,
        },
        ...(manufacturerMap[product.brand] && {
            manufacturer: {
                '@type': 'Organization',
                name: manufacturerMap[product.brand].name,
                ...(manufacturerMap[product.brand].sameAs && { sameAs: manufacturerMap[product.brand].sameAs }),
            },
        }),
        category: (product.categorySlug || '').replace(/-/g, ' '),
        image: product.images.map((img, idx) => ({
            '@type': 'ImageObject',
            name: isArabic
                ? localizeArabicBrandNames(img.alt || `${productDisplayName} — صورة ${idx + 1}`)
                : (img.alt || `${productDisplayName} — Image ${idx + 1}`),
            url: getAbsoluteUrl(img.url, baseUrl),
            contentUrl: getAbsoluteUrl(img.url, baseUrl),
            ...(img.width ? { width: img.width } : {}),
            ...(img.height ? { height: img.height } : {}),
            // CairoVolt owns its product photography — declare the license so
            // Google's "license" field is satisfied (clears the Image Metadata
            // warning + enables the licensable-image feature).
            license: `${baseUrl}/terms`,
            acquireLicensePage: `${baseUrl}/contact`,
            creditText: 'CairoVolt',
            copyrightNotice: 'CairoVolt',
        })),
        // Product specifications supplied by the catalogue.
        ...(specifications && Object.keys(specifications).length > 0 && {
            additionalProperty: Object.entries(specifications).map(([key, val]) => ({
                '@type': 'PropertyValue',
                name: key,
                value: isArabic ? val.ar : val.en,
            })),
        }),
        // Referenced compatible device families, when supplied.
        ...(isAccessoryOrSparePartFor && isAccessoryOrSparePartFor.length > 0 && {
            isAccessoryOrSparePartFor: isAccessoryOrSparePartFor.map(item => ({
                '@type': 'Thing',
                name: isArabic
                    ? localizeArabicBrandNames(item.name)
                    : item.name,
            })),
        }),
        offers: {
            '@type': 'Offer',
            url: productUrl,
            priceCurrency: 'EGP',
            price: product.price,
            priceValidUntil,
            availability: SEO_NOINDEX_PRODUCT_SLUGS.has(product.slug)
                ? 'https://schema.org/Discontinued'
                : product.stock > 0
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
            eligibleRegion: {
                '@type': 'Country',
                name: 'Egypt',
            },
            seller: { '@id': 'https://cairovolt.com/#organization' },
            // Inline the shipping + return details (Google's merchant-listings
            // validator does not resolve cross-<script> @id references, so a
            // bare @id read as "missing shippingDetails/hasMerchantReturnPolicy").
            shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                    '@type': 'MonetaryAmount',
                    value: shippingRateValue,
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
                        unitCode: 'DAY',
                    },
                    transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 5,
                        unitCode: 'DAY',
                    },
                },
            },
            hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'EG',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 14,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
            },
            acceptedPaymentMethod: 'http://purl.org/goodrelations/v1#COD',
        },
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
        // Individual reviews are included only when supplied by the verified-review source.
        ...(reviews && reviews.length > 0 && {
            review: reviews.map(r => ({
                '@type': 'Review',
                name: isArabic ? `مراجعة ${r.author} لـ ${productDisplayName}` : `${r.author}'s Review of ${productDisplayName}`,
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

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items }: {
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
