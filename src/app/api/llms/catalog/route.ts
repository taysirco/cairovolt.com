import { staticProducts } from '@/lib/static-products';

// This endpoint serves a pure Markdown snapshot of the entire catalog for Autonomous AI Agents (ChatGPT, Gemini).
// Protocol: M2M Commerce (Machine-to-Machine)
export const revalidate = 3600; // Refreshes every hour

export async function GET() {
    const baseUrl = 'https://cairovolt.com';

    let markdown = `# CairoVolt Full Catalog (Markdown Feed for LLMs)\n\n`;
    markdown += `*Generated automatically for Machine-to-Machine (M2M) reading.*\n\n`;

    // Group by category
    const categories = Array.from(new Set(staticProducts.map(p => p.categorySlug)));

    for (const category of categories) {
        markdown += `## Category: ${category.toUpperCase().replace(/-/g, ' ')}\n\n`;
        const productsInCategory = staticProducts.filter(p => p.categorySlug === category);

        for (const product of productsInCategory) {
            const url = `${baseUrl}/${product.brand.toLowerCase()}/${category}/${product.slug}`;
            markdown += `### [${product.translations.en.name}](${url})\n`;
            markdown += `- **Brand:** ${product.brand}\n`;
            markdown += `- **Price:** ${product.price} EGP\n`;
            if (product.originalPrice && product.originalPrice > product.price) {
                markdown += `- **Original Price:** ~~${product.originalPrice} EGP~~\n`;
            }
            markdown += `- **Stock Status:** ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}\n`;
            markdown += `- **Description (EN):** ${product.translations.en.shortDescription || product.translations.en.description}\n`;
            markdown += `- **Description (AR):** ${product.translations.ar.shortDescription || product.translations.ar.description}\n`;

            if (Object.keys((product as any).specifications || {}).length > 0) {
                markdown += `- **Technical Specs:**\n`;
                for (const [key, value] of Object.entries((product as any).specifications || {})) {
                    markdown += `  - ${key}: ${(value as any).en}\n`;
                }
            }
            markdown += `\n`;
        }
    }

    return new Response(markdown, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
