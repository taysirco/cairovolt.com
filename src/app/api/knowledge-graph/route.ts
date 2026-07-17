import { staticProducts } from '@/lib/static-products';
import {
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';

// Structured-data endpoint for the store, listed brands, and active products.
export const revalidate = 86400;

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

    graph["@graph"].push({
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "CairoVolt",
        "alternateName": ["كايرو فولت", "Cairo Volt"],
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "sameAs": [
            "https://www.facebook.com/cairovolt",
            "https://www.tiktok.com/@cairovolt",
            "https://www.instagram.com/cairovolt",
            "https://x.com/cairovolt",
            "https://www.youtube.com/@cairovolt",
        ],
        "description": "Egyptian online store for mobile accessories, power solutions, consumer electronics, and CairoVolt warranty support.",
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
        graph["@graph"].push({
            "@type": "Brand",
            "@id": `${baseUrl}/#brand-${brandKey}`,
            "name": brand,
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

        graph["@graph"].push({
            "@type": "Product",
            "@id": `${productUrl}#product`,
            "name": product.translations.en.name,
            "url": productUrl,
            "brand": { "@id": brandId },
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
        },
    });
}
