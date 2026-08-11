// Server Component — structured data
// DO NOT add 'use client' here!
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';
import { getBrandEntity } from '@/lib/brand-entities';
import { buildProductImageSchema } from '@/lib/image-licensing';
import { getCairoVoltWarrantyPolicy } from '@/lib/warranty-policy';
import {
    getGtinSchemaProperty,
    getMerchantGtin,
    getMerchantProductUrl,
    normalizeMpn,
    SEO_NOINDEX_PRODUCT_SLUGS,
    STANDARD_RETURN_WINDOW_DAYS,
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
            en: { name: string; description: string; shortDescription?: string };
            ar: { name: string; description: string; shortDescription?: string };
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

/** Markers that open the non-descriptive tail of a product body. */
const SCHEMA_DESCRIPTION_CUT_MARKERS = [
    '⚠️',
    'buyer-warning',
    'external-context',
    'Full manufacturer specifications',
    'المواصفات الكاملة من المصنّع',
];

/**
 * Build the JSON-LD description: authored shortDescription first (a clean,
 * spec-dense, manufacturer-attributed sentence), then as much of the editorial
 * body as fits — with the counterfeit warning and external-reference blocks cut.
 */
function buildSchemaDescription(html: string, shortDescription?: string): string {
    let body = html;
    for (const marker of SCHEMA_DESCRIPTION_CUT_MARKERS) {
        const at = body.indexOf(marker);
        if (at > 0) body = body.slice(0, at);
    }
    const lead = shortDescription?.trim();
    const rest = getPlainTextDescription(body, 1200);
    if (!lead) return rest;
    if (rest.startsWith(lead)) return rest;
    return `${lead} ${rest}`.slice(0, 1200).trim();
}

/**
 * Google merchant listings want an offer price-validity date, a year out so it
 * never reads as expired. Evaluated once at module load rather than per render:
 * `Date.now()` inside a component body is impure, which the React Compiler
 * rejects, and a value that shifts between renders of the same prerendered page
 * is exactly the instability that rule exists to prevent.
 */
const PRICE_VALID_UNTIL = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

export function ProductSchema({ product, locale, aggregateRating, reviews, specifications, isAccessoryOrSparePartFor }: ProductSchemaProps) {
    const t = product.translations[locale as 'en' | 'ar'] || product.translations.en;
    const isArabic = locale === 'ar';
    const baseUrl = 'https://cairovolt.com';
    const productUrl = getMerchantProductUrl(product, locale);
    const gtin = getMerchantGtin(product.gtin13, product.gtin);
    const mpn = normalizeMpn(product.mpn);
    const brandEntity = getBrandEntity(product.brand);
    // Use plain text description for JSON-LD (Google requires 50-5000 chars for Product description)
    const productDisplayName = isArabic
        ? localizeArabicBrandNames(t.name)
        : t.name;
    // Structured-data description is NOT the page body. The body ends with the
    // counterfeit-warning block, whose "40% below our price" threshold is derived
    // from the CURRENT price (so it silently goes stale on every reprice) and
    // reads as a claim about other sellers — neither belongs in the string that
    // Merchant Center and AI assistants quote as *the* product description.
    // Cut at the warning/reference blocks and lead with the authored
    // shortDescription, which is already spec-dense and manufacturer-attributed.
    const plainDescription = isArabic
        ? localizeArabicBrandNames(buildSchemaDescription(t.description, t.shortDescription))
        : buildSchemaDescription(t.description, t.shortDescription);

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
        'JBL': { name: 'Harman International Industries', sameAs: 'https://www.harman.com' },
    };

    // Store-wide shipping (mirrors the feed + the site policy): free from 3700 EGP,
    // otherwise a conservative flat 130 EGP within Egypt, 1-5 day transit.
    const FREE_SHIPPING_THRESHOLD_EGP = 3700;
    const shippingRateValue = product.price >= FREE_SHIPPING_THRESHOLD_EGP ? 0 : 130;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        // Canonical page for this product — the Offer carries the same URL, but
        // Product.url is what entity resolvers follow when they read the node
        // outside an offer context.
        url: productUrl,
        name: productDisplayName,
        description: plainDescription,
        inLanguage: isArabic ? 'ar-EG' : 'en-EG',
        sku: product.sku,
        // Only expose identifiers with a supported length and valid GS1 check digit.
        ...getGtinSchemaProperty(gtin),
        ...(mpn && { mpn }),
        // Keep the inline name (Google's merchant-listings validator reads
        // brand.name directly) AND carry the shared @id, so this brand resolves
        // to the same Wikidata-linked entity the site-wide graph defines.
        brand: {
            '@type': 'Brand',
            ...(brandEntity && { '@id': brandEntity.id }),
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
        // Rights-bearing ImageObject for the primary image, plain URLs for the
        // rest — see buildProductImageSchema for why the gallery does not each
        // carry a duplicate copy of the same licensing block.
        image: buildProductImageSchema(
            product.images.map(img => ({
                url: img.url,
                alt: isArabic ? localizeArabicBrandNames(img.alt || '') : (img.alt || ''),
                width: img.width,
                height: img.height,
            })),
            locale,
            baseUrl,
        ),
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
            priceValidUntil: PRICE_VALID_UNTIL,
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
                merchantReturnDays: STANDARD_RETURN_WINDOW_DAYS,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
            },
            acceptedPaymentMethod: 'http://purl.org/goodrelations/v1#COD',
            // CairoVolt's OWN written store warranty, from the same policy source
            // the page copy renders — explicitly not a manufacturer warranty.
            // It is the strongest differentiator we have and was invisible to
            // machines while being stated in prose on every product page.
            ...(() => {
                const months = getCairoVoltWarrantyPolicy(product.slug, product.brand).months;
                return months
                    ? {
                        warranty: {
                            '@type': 'WarrantyPromise',
                            durationOfWarranty: {
                                '@type': 'QuantitativeValue',
                                value: months,
                                unitCode: 'MON',
                            },
                            warrantyScope: isArabic
                                ? `ضمان كايرو فولت المكتوب لمدة ${months} شهر — ليس ضمان الشركة المصنّعة`
                                : `CairoVolt written store warranty, ${months} months — not a manufacturer warranty`,
                        },
                    }
                    : {};
            })(),
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
        // Individual reviews are included only when supplied by the verified-review
        // source AND an aggregateRating exists to accompany them.
        //
        // Google: "If you include multiple individual reviews, also include an
        // aggregate rating of the individual reviews." calculateVerifiedAggregateRating
        // deliberately withholds an aggregate below 3 reviews (2 ratings is not a
        // meaningful average), so a product with 1-2 reviews used to emit review[]
        // with no aggregateRating — the Rich Results Test failed those as
        // "Review snippets: N invalid items detected".
        //
        // Gating both on the same condition keeps the markup internally consistent:
        // either the product has enough verified reviews to carry a rating, or it
        // publishes neither. The reviews still render on the page for shoppers;
        // only the structured data waits until the aggregate is honest.
        ...(aggregateRating && reviews && reviews.length > 0 && {
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
