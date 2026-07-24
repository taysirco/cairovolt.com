import { staticProducts } from '@/lib/static-products';
import {
    getMerchantGtin,
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
    normalizeMpn,
} from '@/lib/merchant-product-data';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';
import { getAgentLabSummary } from '@/lib/agent-lab-export';

// Structured-data endpoint for the store, listed brands, and active products.
export const revalidate = 86400;

const BRAND_AR: Record<string, string> = {
    anker: 'انكر',
    joyroom: 'جوي روم',
    soundcore: 'ساوندكور',
};

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
        "description": "CairoVolt is an independent online retailer of mobile accessories and Anker and Joyroom products, with published specifications, prices, policies, and delivery within Egypt.",
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
        },
    });

    const activeProducts = staticProducts.filter(product =>
        product.status === 'active'
        && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
    );
    const brandNames = [...new Set(activeProducts.map(product => product.brand))];
    for (const brand of brandNames) {
        const brandKey = brand.toLowerCase();
        const arName = BRAND_AR[brandKey];
        graph["@graph"].push({
            "@type": "Brand",
            "@id": `${baseUrl}/#brand-${brandKey}`,
            "name": brand,
            ...(arName ? { alternateName: arName } : {}),
        });
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
        const brandId = `${baseUrl}/#brand-${brandKey}`;
        const isSoundcoreProduct = brandKey === 'soundcore';
        const productUrl = getMerchantProductUrl(product);
        const lab = getAgentLabSummary(product.slug, 'en');
        const shortEn = (product.translations.en.shortDescription || product.translations.en.description || '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        const description = (lab?.aiTldr[0] || shortEn).slice(0, 300);
        const gtin = getMerchantGtin(product.gtin13, product.gtin);
        const mpn = normalizeMpn(product.mpn);

        graph["@graph"].push({
            "@type": "Product",
            "@id": `${productUrl}#product`,
            "name": product.translations.en.name,
            "alternateName": localizeArabicBrandNames(product.translations.ar.name),
            "url": productUrl,
            "brand": { "@id": brandId },
            "inLanguage": ["en-EG", "ar-EG"],
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
