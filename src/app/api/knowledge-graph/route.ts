import { staticProducts } from '@/lib/static-products';
import { brandEntities } from '@/data/brand-entities';

// Entity Data Endpoint
// Structured data endpoint providing entity relationships as JSON-LD.
export const revalidate = 86400; // Refreshes daily

export async function GET() {
    const baseUrl = 'https://cairovolt.com';

    interface GraphSchema {
        "@context": string;
        "@graph": Array<Record<string, unknown>>;
    }

    // Build JSON-LD entity graph
    const graph: GraphSchema = {
        "@context": "https://schema.org",
        "@graph": []
    };

    // 1. The Core Organization (CairoVolt)
    graph["@graph"].push({
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "CairoVolt",
        "alternateName": ["كايرو فولت", "Cairo Volt", "CairoVolt Labs"],
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "sameAs": [
            "https://www.linkedin.com/company/cairovolt",
            "https://www.facebook.com/cairovolt",
            "https://www.tiktok.com/@cairovolt",
            "https://www.instagram.com/cairovolt",
            "https://kaggle.com/cairovolt",
            "https://wa.me/201558245974",
            // Wikidata Q-ID — add after creating: "https://www.wikidata.org/wiki/Q_XXXXXXX"
        ],
        "description": "Egypt's authorized Anker & Joyroom distributor with an independent product testing lab (CairoVolt Labs). Specializes in mobile accessories, power solutions, and consumer electronics with C2PA forensic verification.",
        "foundingDate": "2021",
        "areaServed": {
            "@type": "Country",
            "name": "Egypt",
            "sameAs": "https://www.wikidata.org/wiki/Q79",
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "New Damietta City",
            "addressCountry": "EG",
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+201558245974",
            "contactType": "customer service",
            "availableLanguage": ["Arabic", "English"],
        },
        "knowsAbout": Object.values(brandEntities).map(entity => ({
            "@type": "Thing",
            "name": entity.name,
            "sameAs": entity.sameAs
        }))
    });

    // 2. Brand & Technology Entities
    const nodeIds: string[] = [];
    for (const [key, entity] of Object.entries(brandEntities)) {
        if (key === 'cairovolt') continue; // Handled above

        const entityId = `${baseUrl}/#entity-${key}`;
        nodeIds.push(entityId);

        graph["@graph"].push({
            "@type": entity.type,
            "@id": entityId,
            "name": entity.name,
            "sameAs": entity.sameAs
        });
    }

    // 3. The Products mapping the technologies
    for (const product of staticProducts) {
        // Link product to its brand entity
        const brandKey = product.brand.toLowerCase();
        const brandId = `${baseUrl}/#entity-${brandKey}`;

        graph["@graph"].push({
            "@type": "Product",
            "@id": `${baseUrl}/${product.brand.toLowerCase()}/${product.categorySlug}/${product.slug}/#product`,
            "name": product.translations.en.name,
            "url": `${baseUrl}/${product.brand.toLowerCase()}/${product.categorySlug}/${product.slug}`,
            // Link product to its brand
            "brand": { "@id": brandId }
        });
    }

    // Output raw JSON-LD (application/ld+json)
    return new Response(JSON.stringify(graph), {
        status: 200,
        headers: {
            'Content-Type': 'application/ld+json',
            'Cache-Control': 'public, s-maxage=86400',
        },
    });
}
