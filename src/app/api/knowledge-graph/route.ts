import { staticProducts } from '@/lib/static-products';
import {
    getMerchantGtin,
    getMerchantProductUrl,
    isRecallAffectedSlug,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
    normalizeMpn,
} from '@/lib/merchant-product-data';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';
import { getAgentLabSummary } from '@/lib/agent-lab-export';
import { buildBrandSchemaNodes, getBrandEntity } from '@/lib/brand-entities';

// Structured-data endpoint for the store, listed brands, and active products.
export const revalidate = 86400;

const DESCRIPTION_MAX_CHARS = 300;

/**
 * Plain, citable text for a Product node.
 *
 * The old `.slice(0, 300)` cut 63 of 117 descriptions mid-value ("Honest phone
 * math ≈ 2.02 ") and passed through internal bench-protocol references and
 * emoji bullets. This keeps whole sentences only, drops the internal
 * references, and never returns a fragment.
 */
function cleanDescriptionText(value: string): string {
    return value
        .replace(/<[^>]*>/g, ' ')
        // Emoji bullets and their joiners/variation selectors.
        .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}]/gu, ' ')
        .replace(/[\u200D\uFE0E\uFE0F]/g, '')
        // Internal bench-protocol section references, e.g. "(protocol §7.3)",
        // "per Bench Test Protocol §4", or a bare "§7".
        .replace(/\s*\([^()]*§[^()]*\)/g, '')
        .replace(/\s*(?:per\s+)?(?:the\s+)?(?:CairoVolt\s+)?(?:Bench[- ]Test\s+)?protocol\s*§\s*[\d.]+[a-z]?/gi, '')
        .replace(/\s*§\s*[\d.]+[a-z]?/g, '')
        // Listing-style separators read as sentence breaks.
        .replace(/\s+\|\s+/g, '; ')
        .replace(/\s+/g, ' ')
        .replace(/\s+([.,;:])/g, '$1')
        .trim();
}

function toSentenceDescription(value: string): string {
    const text = cleanDescriptionText(value);
    if (!text) return '';
    // Split only where terminal punctuation is followed by whitespace and a
    // non-lowercase start, so decimals ("74.2Wh") and "e.g. x" stay intact.
    const sentences = text.split(/(?<=[.!?])\s+(?=[^a-z])/)
        .map(sentence => sentence.trim())
        .filter(Boolean)
        // Sentences that only describe the internal test protocol are not
        // product facts; drop them rather than publish the jargon.
        .filter(sentence => !/bench[- ]test protocol|protocol[- ]grade|\b(?:the|our) protocol\b/i.test(sentence));
    let out = '';
    for (const sentence of sentences) {
        const next = out ? `${out} ${sentence}` : sentence;
        if (next.length > DESCRIPTION_MAX_CHARS) break;
        out = next;
    }
    if (!out && sentences[0]) {
        // A single sentence longer than the cap: end on a word boundary with an
        // explicit ellipsis rather than mid-number.
        const cut = sentences[0].slice(0, DESCRIPTION_MAX_CHARS - 1);
        out = `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 1)).replace(/[\s,;:–—-]+$/, '')}…`;
    }
    if (out && !/[.!?…]$/.test(out)) out += '.';
    return out;
}

function titleCaseSlug(slug: string): string {
    return slug
        .split('-')
        .map(part => (part ? part[0].toUpperCase() + part.slice(1) : part))
        .join(' ');
}

export async function GET() {
    const baseUrl = 'https://cairovolt.com';

    interface GraphSchema {
        "@context": string;
        "@graph": Array<Record<string, unknown>>;
    }

    const graph: GraphSchema = {
        "@context": "https://schema.org",
        "@graph": []
    };

    // Mirrors the on-page OnlineStore node (GlobalBusinessSchema.tsx) that
    // shares this @id — entity resolvers merging the two surfaces must see
    // ONE consistent type and legal identity.
    graph["@graph"].push({
        "@type": "OnlineStore",
        "@id": `${baseUrl}/#organization`,
        "name": "CairoVolt",
        "alternateName": ["كايرو فولت", "Cairo Volt"],
        "legalName": "شركة تيسير للاستثمار الذكي (ش.ذ.م.م)",
        "taxID": "777471566",
        "identifier": {
            "@type": "PropertyValue",
            "propertyID": "Commercial Register (Egypt)",
            "value": "8446",
        },
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "email": "info@cairovolt.com",
        // Locality-level HQ address — same published detail as the on-page
        // node and /contact ('based in New Damietta'); no street invention.
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "New Damietta",
            "addressRegion": "Damietta",
            "addressCountry": "EG",
        },
        "sameAs": [
            "https://www.facebook.com/cairovolt",
            "https://www.instagram.com/cairovolt",
            "https://www.tiktok.com/@cairovolt",
            "https://x.com/cairovolt",
            "https://www.youtube.com/@cairovolt",
        ],
        "description": "CairoVolt is an independent online retailer of mobile accessories, audio gear, and Anker, Joyroom, Soundcore, and JBL products, with published specifications, prices, policies, and delivery within Egypt.",
        // Mirrors the on-page node's topical scope — see GlobalBusinessSchema
        // (same three verified Wikidata-linked Things, same plain strings).
        "knowsAbout": [
            { "@type": "Thing", "name": "Power banks", "sameAs": "https://www.wikidata.org/wiki/Q2208745" },
            { "@type": "Thing", "name": "USB-C chargers", "sameAs": "https://www.wikidata.org/wiki/Q20026619" },
            { "@type": "Thing", "name": "USB Power Delivery fast charging", "sameAs": "https://www.wikidata.org/wiki/Q56120131" },
            "Charging cables",
            "Wireless earbuds",
            "Bluetooth speakers",
            "Headphones",
            "Mobile accessories in Egypt",
        ],
        // No currenciesAccepted/paymentAccepted: LocalBusiness-only properties,
        // and this is an OnlineStore (Organization branch). Same reasoning as
        // the on-page node in GlobalBusinessSchema.
        "areaServed": {
            "@type": "Country",
            "name": "Egypt",
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+201558245974",
            "url": "https://wa.me/201558245974",
            "contactType": "customer service",
            "availableLanguage": ["Arabic", "English"],
            // Published support hours (/about, /contact) — mirrors the on-page node.
            "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "https://schema.org/Monday",
                    "https://schema.org/Tuesday",
                    "https://schema.org/Wednesday",
                    "https://schema.org/Thursday",
                    "https://schema.org/Friday",
                    "https://schema.org/Saturday",
                    "https://schema.org/Sunday",
                ],
                "opens": "10:00",
                "closes": "22:00",
            },
        },
    });

    const activeProducts = staticProducts.filter(product =>
        product.status === 'active'
        && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
    );
    // Same Wikidata-linked Brand nodes, same @ids, as the on-page @graph
    // (GlobalBusinessSchema) — one shared source, so an entity resolver merging
    // the two surfaces never sees two different definitions of "Anker".
    const stockedBrandKeys = new Set(activeProducts.map(product => product.brand.toLowerCase()));
    for (const brandNode of buildBrandSchemaNodes('en')) {
        if (stockedBrandKeys.has(String(brandNode.name).toLowerCase())) {
            graph["@graph"].push(brandNode);
        }
    }

    graph["@graph"].push({
        "@type": "CollectionPage",
        "@id": `${baseUrl}/soundcore#collectionpage`,
        "name": "Soundcore by Anker — Audio Sub-Brand Hub",
        "url": `${baseUrl}/soundcore`,
        "inLanguage": ["ar-EG", "en-EG"],
        "about": { "@id": `${baseUrl}/#brand-soundcore` },
        "isPartOf": { "@id": `${baseUrl}/#website` },
        "hasPart": [
            { "@id": `${baseUrl}/soundcore/audio#collectionpage` },
            { "@id": `${baseUrl}/soundcore/speakers#collectionpage` },
        ],
    });

    for (const product of activeProducts) {
        const brandKey = product.brand.toLowerCase();
        const brandId = getBrandEntity(product.brand)?.id ?? `${baseUrl}/#brand-${brandKey}`;
        const isSoundcoreProduct = brandKey === 'soundcore';
        const productUrl = getMerchantProductUrl(product);
        const lab = getAgentLabSummary(product.slug, 'en');
        // Prefer the lab verdict, then the short description. A model in a
        // recall programme leads with its aiTldr instead, whose first line is
        // the recall disclosure — a description must never bury a recall.
        const candidates = isRecallAffectedSlug(product.slug)
            ? [lab?.aiTldr[0], lab?.verdict, product.translations.en.shortDescription]
            : [lab?.verdict, product.translations.en.shortDescription, lab?.aiTldr[0]];
        candidates.push(product.translations.en.description);
        const description = candidates
            .map(candidate => toSentenceDescription(candidate || ''))
            .find(Boolean) || '';
        const primaryImage = [...(product.images || [])]
            .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary) || a.order - b.order)[0];
        const image = primaryImage?.url
            ? (primaryImage.url.startsWith('http') ? primaryImage.url : `${baseUrl}${primaryImage.url}`)
            : undefined;
        const gtin = getMerchantGtin(product.gtin13, product.gtin);
        const mpn = normalizeMpn(product.mpn);

        // No inLanguage here: schema.org does not list Product in its domain
        // (CreativeWork, Event, … only), so the property was invalid noise.
        graph["@graph"].push({
            "@type": "Product",
            "@id": `${productUrl}#product`,
            "name": product.translations.en.name,
            "alternateName": localizeArabicBrandNames(product.translations.ar.name),
            "url": productUrl,
            "brand": { "@id": brandId },
            "category": titleCaseSlug(product.categorySlug),
            ...(image ? { image } : {}),
            ...(description ? { description } : {}),
            ...(product.sku ? { sku: product.sku } : {}),
            ...(mpn ? { mpn } : {}),
            ...(gtin ? { gtin } : {}),
            ...(isSoundcoreProduct && {
                "isPartOf": { "@id": `${baseUrl}/soundcore#collectionpage` },
            }),
        });
    }

    return new Response(JSON.stringify(graph), {
        status: 200,
        headers: {
            'Content-Type': 'application/ld+json',
            'Cache-Control': 'public, s-maxage=86400',
            // This is a machine/AI entity graph, not a Search rich-result source.
            // Its Product nodes are intentionally identity-only (name/url/brand,
            // no offers), which Google's Product-snippets validator flags as
            // "Either offers, review, or aggregateRating should be specified".
            // noindex keeps it crawlable for AI surfaces (robots.txt still Allows
            // it) while removing it from Google Search indexing/validation.
            'X-Robots-Tag': 'noindex',
        },
    });
}
