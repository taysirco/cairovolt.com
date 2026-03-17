// Static products data for display when Firebase is not configured
// This can be used as fallback or for development

import { products, categories } from '@/data/seed-products';
import { contentGraph, getInternalLinksForPage, getRelatedEntities } from '@/data/content-graph';

export interface StaticProduct {
    slug: string;
    sku: string;
    brand: string;
    categorySlug: string;
    price: number;
    originalPrice: number;
    stock: number;
    featured: boolean;
    status: string;
    // GS1 Web Vocabulary fields for data interchange
    gtin?: string;      // Global Trade Item Number (EAN-13 barcode)
    mpn?: string;       // Manufacturer Part Number
    gtin13?: string;    // Alias for GTIN (EAN-13 format)
    // Video support
    videoUrl?: string;  // Product video URL for VideoObject schema
    images: Array<{
        id: string;
        url: string;
        alt: string;
        order: number;
        isPrimary: boolean;
    }>;
    translations: {
        en: {
            name: string;
            shortDescription: string;
            description: string;
            features: string[];
            metaTitle: string;
            metaDesc: string;
            faqs?: Array<{ question: string; answer: string }>;
        };
        ar: {
            name: string;
            shortDescription: string;
            description: string;
            features: string[];
            metaTitle: string;
            metaDesc: string;
            faqs?: Array<{ question: string; answer: string }>;
        };
    };
    meta: {
        keywords: string;
        mainTerm: string;
    };
    relatedProducts?: string[]; // Array of product slugs
}

export interface StaticCategory {
    slug: string;
    icon: string;
    order: number;
    status: string;
    productCount: number;
    translations: {
        en: { name: string; description: string };
        ar: { name: string; description: string };
    };
    meta: { keywords: string };
}

// Export typed products and categories
export const staticProducts = products as StaticProduct[];
export const staticCategories = categories as StaticCategory[];

/**
 * Get products based on content map relationships
 * Uses internal links and related entities from the content graph
 */
export function getRelatedProducts(
    product: StaticProduct,
    maxProducts: number = 4
): StaticProduct[] {
    const brandSlug = product.brand.toLowerCase();
    const categorySlug = product.categorySlug;
    const pageUrl = `/${brandSlug}/${categorySlug}`;

    // Get internal links from content graph (related categories)
    const internalLinks = getInternalLinksForPage(pageUrl);

    // Get related entities for entity matching
    const relatedEntities = getRelatedEntities(brandSlug, categorySlug);

    const scoredProducts: Array<{ product: StaticProduct; score: number }> = [];

    for (const p of staticProducts) {
        if (p.slug === product.slug || p.status !== 'active') continue;

        let score = 0;
        const pBrand = p.brand.toLowerCase();
        const pUrl = `/${pBrand}/${p.categorySlug}`;

        // High score if category is in content graph's internal links
        if (internalLinks.some(link => link.includes(p.categorySlug))) {
            score += 40;
        }

        // STRICT: Only allow products from the same brand
        if (pBrand !== brandSlug) continue;

        // Check if product matches related entities
        const productKeywords = p.translations.en.name.toLowerCase() + ' ' +
            p.translations.en.description.toLowerCase() +
            (p.translations.en.features?.join(' ') || '');

        for (const entity of relatedEntities) {
            if (productKeywords.includes(entity.toLowerCase())) {
                score += 15; // Entity match
            }
        }

        // Cross-brand related products from content graph
        if (internalLinks.includes(pUrl)) {
            score += 35;
        }

        // Featured products get a small bonus
        if (p.featured) {
            score += 8;
        }

        // Price range bonus (bundle-friendly)
        const priceDiff = Math.abs(p.price - product.price);
        if (priceDiff < product.price * 0.7) {
            score += 5;
        }

        if (score > 0) {
            scoredProducts.push({ product: p, score });
        }
    }

    // Sort by score descending
    scoredProducts.sort((a, b) => b.score - a.score);

    return scoredProducts.slice(0, maxProducts).map(sp => sp.product);
}

// Helper functions
export function getProductBySlug(slug: string): StaticProduct | undefined {
    return staticProducts.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): StaticProduct[] {
    return staticProducts.filter(p => p.categorySlug === categorySlug);
}

export function getProductsByBrand(brand: string): StaticProduct[] {
    return staticProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
}

export function getFeaturedProducts(): StaticProduct[] {
    return staticProducts.filter(p => p.featured);
}

export function getCategoryBySlug(slug: string): StaticCategory | undefined {
    return staticCategories.find(c => c.slug === slug);
}

export function getProductsByBrandAndCategory(brand: string, categorySlug: string): StaticProduct[] {
    return staticProducts.filter(
        p => p.brand.toLowerCase() === brand.toLowerCase() && p.categorySlug === categorySlug
    );
}

// Get all products for a brand grouped by category
export function getProductsGroupedByCategory(brand: string): Record<string, StaticProduct[]> {
    const brandProducts = getProductsByBrand(brand);
    const grouped: Record<string, StaticProduct[]> = {};

    for (const product of brandProducts) {
        if (!grouped[product.categorySlug]) {
            grouped[product.categorySlug] = [];
        }
        grouped[product.categorySlug].push(product);
    }

    return grouped;
}

// Smart complementary category mapping - products that go well together
const complementaryCategories: Record<string, string[]> = {
    'power-banks': ['wall-chargers', 'cables', 'car-chargers'],
    'wall-chargers': ['cables', 'power-banks'],
    'cables': ['wall-chargers', 'power-banks', 'car-chargers'],
    'car-chargers': ['cables', 'car-holders', 'power-banks'],
    'audio': ['power-banks', 'cables'],
    'smart-watches': ['power-banks', 'cables', 'wall-chargers'],
    'car-holders': ['car-chargers', 'cables'],
    'speakers': ['power-banks', 'cables'],
};

/**
 * Smart function to get related products for bundle section
 * Uses intelligent logic to find complementary products:
 * 1. First, use manually defined relatedProducts if available
 * 2. Then, find products from complementary categories (same brand preferred)
 * 3. Include products from the same category as alternatives
 * 4. Score and sort by relevance
 */
export function getSmartRelatedProducts(product: StaticProduct, maxProducts: number = 2): StaticProduct[] {
    // 1. If product has manually defined related products, use them
    if (product.relatedProducts && product.relatedProducts.length > 0) {
        const manualRelated = product.relatedProducts
            .map(slug => getProductBySlug(slug))
            .filter((p): p is StaticProduct => p !== undefined)
            .slice(0, maxProducts);

        if (manualRelated.length >= maxProducts) {
            return manualRelated;
        }

        // If we have some manual but not enough, we'll add auto-suggestions
        const existingSlugs = new Set(manualRelated.map(p => p.slug));
        existingSlugs.add(product.slug);

        const additionalProducts = findComplementaryProducts(product, maxProducts - manualRelated.length, existingSlugs);
        return [...manualRelated, ...additionalProducts];
    }

    // 2. No manual related products - use smart algorithm
    const excludeSlugs = new Set([product.slug]);
    return findComplementaryProducts(product, maxProducts, excludeSlugs);
}

function findComplementaryProducts(
    product: StaticProduct,
    count: number,
    excludeSlugs: Set<string>
): StaticProduct[] {
    const complementarySlugList = complementaryCategories[product.categorySlug] || [];
    const scoredProducts: Array<{ product: StaticProduct; score: number }> = [];

    for (const p of staticProducts) {
        // Skip excluded products and the product itself
        if (excludeSlugs.has(p.slug) || p.status !== 'active') continue;

        let score = 0;

        // STRICT: Only allow products from the same brand
        if (p.brand.toLowerCase() !== product.brand.toLowerCase()) continue;

        // Complementary category gets high score
        const categoryIndex = complementarySlugList.indexOf(p.categorySlug);
        if (categoryIndex !== -1) {
            // First complementary category gets highest score, decreasing order
            score += 50 - (categoryIndex * 10);
        }

        // Same category gets lower score (alternatives, not complements)
        if (p.categorySlug === product.categorySlug && p.slug !== product.slug) {
            score += 10;
        }

        // Featured products get a small bonus
        if (p.featured) {
            score += 5;
        }

        // Products in similar price range get a bonus (bundle-friendly)
        const priceDiff = Math.abs(p.price - product.price);
        if (priceDiff < product.price * 0.5) {
            score += 8;
        }

        // Only include products with some relevance
        if (score > 0) {
            scoredProducts.push({ product: p, score });
        }
    }

    // Sort by score descending, then by featured, then by price
    scoredProducts.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.product.featured !== a.product.featured) return b.product.featured ? 1 : -1;
        return a.product.price - b.product.price;
    });

    // Return top products
    return scoredProducts.slice(0, count).map(sp => sp.product);
}

/**
 * Get bundle suggestion with intelligent product combinations
 * Returns the main product + complementary products that make sense together
 */
export function getBundleSuggestion(productSlug: string): {
    mainProduct: StaticProduct | undefined;
    bundleProducts: StaticProduct[];
} {
    const mainProduct = getProductBySlug(productSlug);
    if (!mainProduct) {
        return { mainProduct: undefined, bundleProducts: [] };
    }

    const bundleProducts = getSmartRelatedProducts(mainProduct, 2);
    return { mainProduct, bundleProducts };
}

