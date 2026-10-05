// Server Component — structured data
// DO NOT add 'use client' here!
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';
import { getBrandEntity } from '@/lib/brand-entities';
import { buildProductImageSchema } from '@/lib/image-licensing';
import { getCairoVoltWarrantyPolicy } from '@/lib/warranty-policy';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import { arSpecLabel } from '@/lib/spec-labels-ar';
import {
    getGtinSchemaProperty,
    getMerchantGtin,
    getMerchantProductUrl,
    normalizeMpn,
    SEO_NOINDEX_PRODUCT_SLUGS,
    STANDARD_DELIVERY_MAX_DAYS,
    STANDARD_DELIVERY_MIN_DAYS,
    STANDARD_RETURN_WINDOW_DAYS,
    STANDARD_SHIPPING_MAX_EGP,
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
    /**
     * Disclosure that must open the JSON-LD description — the recall notice for
     * a model in RECALL_AFFECTED_PRODUCT_SLUGS (the caller passes the details
     * aiTldr[0], the same sentence rendered under the H1). The editorial body
     * carries no recall text, so without this the string Merchant Center and AI
     * assistants quote as *the* description silently buried the recall.
     */
    leadNotice?: string;
}

/** Named entities the catalogue bodies use beyond the XML five. */
const NAMED_HTML_ENTITIES: Record<string, string> = {
    rsquo: '\u2019', lsquo: '\u2018', rdquo: '\u201D', ldquo: '\u201C',
    ndash: '\u2013', mdash: '\u2014', hellip: '\u2026', times: '\u00D7',
    deg: '\u00B0', middot: '\u00B7', rarr: '\u2192', larr: '\u2190',
    le: '\u2264', ge: '\u2265', asymp: '\u2248', plusmn: '\u00B1',
};

// Strip HTML tags and truncate for JSON-LD description (Google max: 5000 chars)
function getPlainTextDescription(html: string, maxLength: number = 4990): string {
    // Strip HTML tags
    let text = html.replace(/<[^>]*>/g, ' ');
    // Decode HTML entities. JSON-LD inside <script> is never HTML-decoded by
    // its readers, so an undecoded "&rsquo;" reached them literally
    // ("the cable&rsquo;s ceiling"). `&amp;` goes last so "&amp;rsquo;" stays
    // the literal text "&rsquo;".
    text = text
        .replace(/&#(\d+);/g, (m, dec: string) => {
            const cp = Number(dec);
            return cp > 0 && cp <= 0x10FFFF ? String.fromCodePoint(cp) : m;
        })
        .replace(/&#x([0-9a-f]+);/gi, (m, hex: string) => {
            const cp = parseInt(hex, 16);
            return cp > 0 && cp <= 0x10FFFF ? String.fromCodePoint(cp) : m;
        })
        .replace(/&([a-z]+);/gi, (m, name: string) => NAMED_HTML_ENTITIES[name] ?? m)
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
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

/** Plain-ASCII placeholder for a block boundary while the body is flattened. */
const SCHEMA_BLOCK_BREAK = '@@cv-block-break@@';

/** Same, for the end of a heading — a section label, not a sentence. */
const SCHEMA_HEADING_BREAK = '@@cv-heading-break@@';

/**
 * Inline tags are stripped to a space, which left "USB ." where the markup read
 * "USB</strong>.". Only whitespace before a punctuation mark that is itself
 * followed by a space (or the end) is removed; runs of spaces collapse.
 */
function tidySchemaText(text: string): string {
    return text
        .replace(/\s+([.,،;؛:!?؟])(?=\s|$)/gu, '$1')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

/** shortDescription segments that are instructions to the shopper, not facts. */
const SHORT_DESCRIPTION_INSTRUCTION_PREFIX = /^(?:Check|Verify|راجع|تحقق|تحقّق)/u;

/**
 * Pictographs used as bullet glyphs (🔋 ⚡ ⌚ …) plus the emoji variation
 * selector. ©, ® and ™ are Extended_Pictographic too, but they are part of
 * trademarked names ("BassUp™"), so they are kept.
 */
const SCHEMA_PICTOGRAPHS = /(?![\u00A9\u00AE\u2122])\p{Extended_Pictographic}|\uFE0F/gu;

/** Longest JSON-LD description we emit (Google allows up to 5,000). */
const SCHEMA_DESCRIPTION_MAX_CHARS = 1200;

/**
 * Cut plain text to `max` characters at the last sentence end, so the
 * description never stops mid-word ("…and the warranty ter..."). Falls back to
 * the last word boundary plus an ellipsis when no sentence ends in the second
 * half of the window.
 */
function cutAtSentenceBoundary(text: string, max: number): string {
    if (text.length <= max) return text;
    const head = text.slice(0, max);
    let cut = -1;
    const sentenceEnd = /[.!?؟…](?=\s)/gu;
    for (let m = sentenceEnd.exec(head); m; m = sentenceEnd.exec(head)) cut = m.index + 1;
    if (cut >= max / 2) return head.slice(0, cut).trim();
    const space = head.lastIndexOf(' ', max - 1);
    return `${head.slice(0, space > 0 ? space : max - 1).trim()}…`;
}

/**
 * Turn the card-style shortDescription ("🔋 20,000mAh | 🔌 Dual USB-A | 🧾 Check
 * current warranty terms") into plain sentences for machines: pictographs and
 * variation selectors removed, ' | ' separators turned into sentence breaks,
 * and the "Check…/Verify…" instruction segments dropped. Visible copy is never
 * built from this — it is the JSON-LD fallback only.
 */
function cleanShortDescriptionForSchema(shortDescription?: string): string {
    if (!shortDescription) return '';
    return shortDescription
        .replace(SCHEMA_PICTOGRAPHS, '')
        .split(/\s+\|\s+/u)
        .map(segment => segment.replace(/\s+/g, ' ').trim())
        .filter(segment => segment && !SHORT_DESCRIPTION_INSTRUCTION_PREFIX.test(segment))
        .join('. ')
        .trim();
}

/**
 * Build the JSON-LD description from the editorial body — up to 1,200
 * characters of plain text ending on a sentence, with the counterfeit warning
 * and external-reference blocks cut and bullet pictographs removed.
 *
 * The authored shortDescription used to be prepended. It is written as a
 * product-card strip (emoji + ' | ' fragments + "Check current warranty"
 * instructions), so the string Merchant Center and AI assistants quote as *the*
 * product description opened with a pictograph and a pipe list. Every active
 * product's body opens with a real sentence, so the body now leads on its own;
 * a cleaned shortDescription is used only when the body is too thin (< 50
 * characters, below Google's minimum description length).
 */
function buildSchemaDescription(html: string, shortDescription?: string): string {
    let body = html;
    for (const marker of SCHEMA_DESCRIPTION_CUT_MARKERS) {
        const at = body.indexOf(marker);
        if (at > 0) body = body.slice(0, at);
    }
    // Two markers are class names, so the cut can land inside an opening tag
    // and leave a dangling `<div class="` that the tag stripper cannot match —
    // it then surfaced verbatim at the end of the description.
    body = body.replace(/<[^>]*$/u, '');
    // Headings and list items end a sentence. Without a break, tag stripping ran
    // them into the next block ("…before ordering Key Features The Anker…").
    // Each block that does not already end in punctuation gets a full stop; the
    // body's own text (decimals, ellipses) is never rewritten.
    // A heading opens with a block break too, so a heading block holds the
    // heading text alone (never the paragraph before it).
    const flattened = getPlainTextDescription(
        body
            .replace(/<h[1-6](?:\s[^>]*)?>/gi, ` ${SCHEMA_BLOCK_BREAK} `)
            .replace(/<\/h[1-6]>/gi, ` ${SCHEMA_HEADING_BREAK} `)
            .replace(/<\/li>/gi, ` ${SCHEMA_BLOCK_BREAK} `),
        Number.MAX_SAFE_INTEGER,
    )
        // Bullet pictographs inside the body ("Key Features: ⚡ 45W class…")
        // are visual glyphs, not text a machine should quote.
        .replace(SCHEMA_PICTOGRAPHS, '');
    const parts = flattened.split(new RegExp(`(${SCHEMA_BLOCK_BREAK}|${SCHEMA_HEADING_BREAK})`, 'u'));
    const rawBlocks: Array<{ text: string; isHeading: boolean }> = [];
    for (let i = 0; i < parts.length; i += 2) {
        const text = parts[i].trim();
        if (text) rawBlocks.push({ text, isHeading: parts[i + 1] === SCHEMA_HEADING_BREAK });
    }
    const blocks = rawBlocks.map((block, index) => ({
        isHeading: block.isHeading,
        text: index < rawBlocks.length - 1 && !/[.?!؟:;؛…]$/u.test(block.text)
            ? `${block.text.replace(/[,،]$/u, '')}.`
            : block.text,
    }));
    const plain = tidySchemaText(blocks.map(block => block.text).join(' '));
    let rest = cutAtSentenceBoundary(plain, SCHEMA_DESCRIPTION_MAX_CHARS);
    // A cut that lands right after a heading ended the description on a bare
    // section label ("…before ordering. How to verify this model before
    // buying."). Drop trailing headings while the rest stays a valid length.
    const headingTexts = blocks
        .filter(block => block.isHeading)
        .map(block => tidySchemaText(block.text))
        // A section label is short; never strip a long run of text.
        .filter(heading => heading.length <= 160);
    for (let trimmed = true; trimmed;) {
        trimmed = false;
        for (const heading of headingTexts) {
            if (heading && rest.endsWith(` ${heading}`) && rest.length - heading.length > 50) {
                rest = rest.slice(0, -heading.length).trim();
                trimmed = true;
                break;
            }
        }
    }
    if (rest.length >= 50) return rest;
    const fallback = cleanShortDescriptionForSchema(shortDescription);
    return fallback.length > rest.length
        ? cutAtSentenceBoundary(fallback, SCHEMA_DESCRIPTION_MAX_CHARS)
        : rest;
}

/** True when the text contains at least one Arabic letter. */
function hasArabicLetters(text: string): boolean {
    return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/u.test(text);
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

export function ProductSchema({ product, locale, aggregateRating, reviews, specifications, isAccessoryOrSparePartFor, leadNotice }: ProductSchemaProps) {
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
    // Cut at the warning/reference blocks; the body's opening sentences lead
    // (see buildSchemaDescription for why the card-style shortDescription no
    // longer does).
    const bodyDescription = buildSchemaDescription(t.description, t.shortDescription);
    // A recall disclosure leads (same rule as /api/knowledge-graph): plain text,
    // warning pictograph removed, then the body, cut on a sentence boundary.
    const leadText = leadNotice
        ? tidySchemaText(getPlainTextDescription(leadNotice, Number.MAX_SAFE_INTEGER).replace(SCHEMA_PICTOGRAPHS, ''))
        : '';
    const combinedDescription = leadText
        ? cutAtSentenceBoundary(`${leadText} ${bodyDescription}`, SCHEMA_DESCRIPTION_MAX_CHARS)
        : bodyDescription;
    const plainDescription = isArabic
        ? localizeArabicBrandNames(combinedDescription)
        : combinedDescription;

    // Surface missing catalogue images during local development.
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
        if (product.images.length === 0) {
            console.warn(`[ProductSchema] Product "${product.slug}" has no images.`);
        }
    }

    // Keep manufacturer identity limited to relationships documented by the
    // brands themselves; do not infer an importer or local representative.
    //
    // JBL's manufacturer is the COMPANY Harman International — Wikidata
    // Q1585599 (label "Harman International Industries", official website
    // harman.com). That ID identifies the company only; it must never be put on
    // the JBL Brand node, which stays Product.brand. Anker Innovations has no
    // separate Wikidata item (the search resolves only to the Anker brand), so
    // it deliberately carries no Wikidata ID.
    const manufacturerMap: Record<string, { name: string; sameAs?: string | string[] }> = {
        'Anker': { name: 'Anker Innovations', sameAs: 'https://www.anker.com/about-us' },
        'Soundcore': { name: 'Anker Innovations', sameAs: 'https://www.anker.com/about-us' },
        'Joyroom': { name: 'JOYROOM', sameAs: 'https://www.joyroom.com/pages/about-joyroom' },
        'JBL': {
            name: 'Harman International',
            sameAs: ['https://www.harman.com', 'https://www.wikidata.org/wiki/Q1585599'],
        },
    };

    // Store-wide shipping, from the same constants as the checkout, the feed and
    // the store-level ShippingService: free at or above FREE_SHIPPING_THRESHOLD,
    // otherwise the conservative top of the published fee range within Egypt.
    const shippingRateValue = product.price >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_MAX_EGP;

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
        // No language property on the Product node: schema.org's domain for it
        // is CreativeWork/Event/etc., not Product. The page's WebPage node
        // (SpeakableSchema) carries the page language instead.
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
                // Arabic brand spellings only inside Arabic text: running the
                // localiser over a Latin-only alt produced hybrids such as
                // "انكر 737 premium aluminum body ..." in the caption.
                alt: isArabic && hasArabicLetters(img.alt || '')
                    ? localizeArabicBrandNames(img.alt || '')
                    : (img.alt || ''),
                width: img.width,
                height: img.height,
            })),
            locale,
            baseUrl,
        ),
        // Product specifications supplied by the catalogue. Arabic pages get the
        // Arabic label for the common keys (one-off keys keep their English text)
        // with the same brand spellings as the visible spec-table label — applied
        // only to Arabic labels, so an unmapped Latin key ("vs Anker Zolo A110D")
        // is not turned into a mixed-direction hybrid ("vs انكر Zolo A110D").
        ...(specifications && Object.keys(specifications).length > 0 && {
            additionalProperty: Object.entries(specifications).map(([key, val]) => {
                const arLabel = arSpecLabel(key);
                return {
                    '@type': 'PropertyValue',
                    name: isArabic
                        ? (hasArabicLetters(arLabel) ? localizeArabicBrandNames(arLabel) : arLabel)
                        : key,
                    value: isArabic ? val.ar : val.en,
                };
            }),
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
                    // Handling 0–1 + transit 1–5 = up to 6 days door to door,
                    // which already covers the 5–6 business-day estimate shown
                    // for the farthest governorates.
                    transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: STANDARD_DELIVERY_MIN_DAYS,
                        maxValue: STANDARD_DELIVERY_MAX_DAYS,
                        unitCode: 'DAY',
                    },
                },
            },
            // Same field set as the store-level #return-policy node
            // (GlobalBusinessSchema). Merchant listings read the Offer-level
            // policy first. `returnFees` is Google's DEFAULT fee type and must
            // stay (Search Console flags "Missing field returnFees" without
            // it); the itemDefect property overrides it, so together they say
            // what the visible policy says: the customer pays return shipping
            // unless the item is defective, which returns free.
            // Inlined rather than an @id reference: Google's merchant-listings
            // validator does not resolve cross-<script> references.
            hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                applicableCountry: 'EG',
                returnPolicyCountry: 'EG',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: STANDARD_RETURN_WINDOW_DAYS,
                itemCondition: 'https://schema.org/NewCondition',
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
                customerRemorseReturnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
                itemDefectReturnFees: 'https://schema.org/FreeReturn',
                merchantReturnLink: `${baseUrl}${isArabic ? '' : '/en'}/return-policy`,
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
