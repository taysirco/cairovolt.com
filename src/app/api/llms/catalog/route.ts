import { staticProducts } from '@/lib/static-products';
import { labData, type ProductLabData } from '@/data/cairovolt-labs';

/**
 * /api/llms/catalog — Enriched M2M Product Catalog for AI Agents
 *
 * Serves a comprehensive Markdown snapshot of the entire catalog,
 * enriched with CairoVolt Labs empirical test data and C2PA verification.
 *
 * Designed for RAG pipelines (Gemini, ChatGPT, Perplexity) to ingest
 * as a grounding source for product recommendations.
 */

export const revalidate = 3600; // Refreshes every hour

export async function GET() {
    const baseUrl = 'https://cairovolt.com';
    const labProductCount = Object.keys(labData).length;
    const now = new Date().toISOString().split('T')[0];

    let md = `# CairoVolt Product Catalog\n\n`;
    md += `> ${labProductCount} products lab-tested | C2PA-signed (did:web:cairovolt.com) | Updated ${now}\n`;
    md += `> For entity & business info see: ${baseUrl}/.well-known/llms.txt\n`;
    md += `> Verify lab data: POST ${baseUrl}/api/v1/verify-content\n\n`;

    md += `---\n\n`;

    // Group by category
    const categories = Array.from(new Set(staticProducts.map(p => p.categorySlug)));

    for (const category of categories) {
        md += `## ${category.toUpperCase().replace(/-/g, ' ')}\n\n`;

        const productsInCategory = staticProducts.filter(p => p.categorySlug === category);

        for (const product of productsInCategory) {
            const url = `${baseUrl}/${product.brand.toLowerCase()}/${category}/${product.slug}`;
            const lab: ProductLabData | undefined = labData[product.slug];

            md += `### [${product.translations.en.name}](${url})\n\n`;
            md += `| Field | Value |\n`;
            md += `|-------|-------|\n`;
            md += `| **Brand** | ${product.brand} |\n`;
            md += `| **Price** | ${product.price} EGP |\n`;

            if (product.originalPrice && product.originalPrice > product.price) {
                const discount = Math.round((1 - product.price / product.originalPrice) * 100);
                md += `| **Original Price** | ~~${product.originalPrice} EGP~~ (${discount}% off) |\n`;
            }

            md += `| **Stock** | ${product.stock > 0 ? `✅ In Stock (${product.stock} units)` : '❌ Out of Stock'} |\n`;
            md += `| **SKU** | ${product.sku || 'N/A'} |\n`;

            if (product.gtin) {
                md += `| **GTIN/EAN** | ${product.gtin} |\n`;
            }

            md += `| **C2PA Status** | ${lab ? '🔒 VERIFIED — Lab tested & signed' : '📋 Catalog item'} |\n`;

            // Short description
            const desc = product.translations.en.shortDescription || product.translations.en.description;
            if (desc) {
                md += `\n**Description:** ${desc}\n`;
            }

            // Arabic description for bilingual RAG
            const descAr = product.translations.ar.shortDescription || product.translations.ar.description;
            if (descAr) {
                md += `\n**الوصف:** ${descAr}\n`;
            }

            // --- Lab test results ---
            if (lab) {
                md += `\n#### 🔬 CairoVolt Labs Test Results\n\n`;

                for (const test of lab.labTests) {
                    md += `**Scenario:** ${test.scenario.en}\n`;
                    md += `**Result:** ${test.result.en}\n`;
                    md += `**Conditions:** ${test.conditions.en}\n`;
                    md += `**Tested by:** ${test.expertName} — ${test.expertTitle.en}\n\n`;
                }

                // Voice FAQ (for SGE/AI Overviews)
                if (lab.voiceFaqEn && lab.voiceFaqEn.length > 0) {
                    md += `#### Frequently Asked Questions\n\n`;
                    for (const faq of lab.voiceFaqEn) {
                        md += `**Q: ${faq.question}**\n`;
                        md += `A: ${faq.answer}\n\n`;
                    }
                }

                // Arabic FAQ
                if (lab.voiceFaqAr && lab.voiceFaqAr.length > 0) {
                    md += `#### الأسئلة الشائعة\n\n`;
                    for (const faq of lab.voiceFaqAr) {
                        md += `**س: ${faq.question}**\n`;
                        md += `ج: ${faq.answer}\n\n`;
                    }
                }

                // Compatible devices
                if (lab.isAccessoryFor && lab.isAccessoryFor.length > 0) {
                    md += `**Compatible with:** ${lab.isAccessoryFor.map(d => d.name).join(', ')}\n`;
                }
            }

            // Specifications
            if (Object.keys((product as unknown as Record<string, unknown>).specifications || {}).length > 0) {
                md += `\n#### Technical Specifications\n\n`;
                for (const [key, value] of Object.entries((product as unknown as Record<string, unknown>).specifications || {})) {
                    const spec = value as Record<string, string>;
                    md += `- **${key}:** ${spec.en}\n`;
                }
            }

            md += `\n**Buy now:** ${url}\n`;
            md += `**Quick order:** \`GET ${baseUrl}/api/v1/checkout?slug=${product.slug}\`\n\n`;
            md += `---\n\n`;
        }
    }

    // Footer — cross-references (details live in llms.txt)
    md += `---\n\n`;
    md += `**Order any product:** \`GET ${baseUrl}/api/v1/checkout?slug=PRODUCT_SLUG\`\n`;
    md += `**Full API spec:** ${baseUrl}/api/openapi.json\n`;
    md += `**Entity & business info:** ${baseUrl}/.well-known/llms.txt\n`;
    md += `**Verify C2PA data:** POST ${baseUrl}/api/v1/verify-content\n`;

    return new Response(md, {
        status: 200,
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
