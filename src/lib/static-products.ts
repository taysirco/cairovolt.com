// Static products data for display when Firebase is not configured
// This can be used as fallback or for development

import { products, categories } from '@/data/seed-products';
import { contentGraph, getInternalLinksForPage, getRelatedEntities } from '@/data/content-graph';
import {
    BRAND_FAMILIES,
    resolveCatalogPricingFrom,
    getSmartBundleProductsFrom,
    type CatalogPricing,
    type BundleProductOf,
    type BundleResultOf,
} from '@/lib/catalog-core';
import { isStorefrontPromotableSlug } from '@/lib/merchant-product-data';

// 🚫 The FULL catalog (bilingual HTML descriptions — ~1.5MB of generated JS)
// must never ship to the browser. Client components import the slim generated
// catalog via '@/lib/client-catalog' instead. This guard makes any accidental
// client-bundle import fail loudly in the browser during development rather
// than silently re-bloating every route's First Load JS.
if (typeof window !== 'undefined') {
    throw new Error(
        "[static-products] Full product catalog imported into client-side code. "
        + "Use '@/lib/client-catalog' (slim, generated) in client components instead.",
    );
}

/** A single variant configuration (e.g. different capacity/wattage tiers) */
export interface ProductVariant {
    id: string;
    label: { en: string; ar: string };
    model: string;
    sku: string;
    mpn?: string;
    gtin?: string;
    price: number;
    originalPrice: number;
    stock: number;
    capacity: string;
    acOutput: string;
    weight: { en: string; ar: string };
    ports: { en: string; ar: string };
    cycles: string;
    surgeWatts?: string;
    isDefault?: boolean;
}

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
    // Product variants (Amazon-style: same page, different configs)
    variants?: ProductVariant[];
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
    expertOpinion?: {
        en: string;
        ar: string;
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

// ─── Catalog pricing — single source of pricing truth ───
// The full documented implementation lives in @/lib/catalog-core
// (resolveCatalogPricingFrom). It is bound here to the FULL catalog for the
// server, and in @/lib/client-catalog to the slim generated catalog for the
// browser — one shared rule set, so cart and checkout can never disagree.
export type { CatalogPricing };

export function resolveCatalogPricing(item: {
    productId?: string;
    sku?: string;
    slug?: string;
}): CatalogPricing {
    return resolveCatalogPricingFrom(staticProducts, item);
}

export function getProductsByCategory(categorySlug: string): StaticProduct[] {
    return staticProducts.filter(p => p.categorySlug === categorySlug && isStorefrontPromotableSlug(p.slug));
}

export function getProductsByBrand(brand: string): StaticProduct[] {
    return staticProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase() && isStorefrontPromotableSlug(p.slug));
}

export function getFeaturedProducts(): StaticProduct[] {
    return staticProducts.filter(p => p.featured && isStorefrontPromotableSlug(p.slug));
}

export function getCategoryBySlug(slug: string): StaticCategory | undefined {
    return staticCategories.find(c => c.slug === slug);
}

export function getProductsByBrandAndCategory(brand: string, categorySlug: string): StaticProduct[] {
    return staticProducts.filter(
        p => p.brand.toLowerCase() === brand.toLowerCase()
            && p.categorySlug === categorySlug
            && isStorefrontPromotableSlug(p.slug)
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

// ═══════════════════════════════════════════════════════════
// 🔗 BRAND FAMILIES — Cross-brand pairing (e.g. Anker ↔ Soundcore)
// ═══════════════════════════════════════════════════════════
// Defined in @/lib/catalog-core (shared with the client-safe slim catalog)
// and re-exported here for existing server-side importers.
export { BRAND_FAMILIES };

// ═══════════════════════════════════════════════════════════
// 🏆 GOLDEN COMBO — Smart Bundle Recommendation Engine
// ═══════════════════════════════════════════════════════════
// The complementary matrix + scoring live in @/lib/catalog-core so the
// browser (slim catalog) and the server (full catalog) share ONE engine.

/** Result types for smart bundle recommendations, bound to the full catalog. */
export type BundleProduct = BundleProductOf<StaticProduct>;
export type BundleResult = BundleResultOf<StaticProduct>;

export function getSmartBundleProducts(product: StaticProduct): BundleResult {
    return getSmartBundleProductsFrom(staticProducts, product);
}

/**
 * Legacy compatibility: still returns StaticProduct[] for other consumers
 * But now uses the smart algorithm that prevents same-category recommendations
 */
export function getSmartRelatedProducts(product: StaticProduct, maxProducts: number = 2): StaticProduct[] {
    const bundleResult = getSmartBundleProducts(product);
    const smartProducts = bundleResult.bundleProducts.map(bp => bp.product);

    // If smart algorithm found enough, return those
    if (smartProducts.length >= maxProducts) {
        return smartProducts.slice(0, maxProducts);
    }

    // Fallback: fill remaining slots from other categories, same brand
    const usedSlugs = new Set([product.slug, ...smartProducts.map(p => p.slug)]);
    const usedCategories = new Set([product.categorySlug, ...smartProducts.map(p => p.categorySlug)]);

    const fallbackProducts = staticProducts
        .filter(p =>
            p.status === 'active' &&
            isStorefrontPromotableSlug(p.slug) &&
            !usedSlugs.has(p.slug) &&
            (BRAND_FAMILIES[product.brand.toLowerCase()] || [product.brand.toLowerCase()]).includes(p.brand.toLowerCase()) &&
            !usedCategories.has(p.categorySlug) // NEVER same category
        )
        .sort((a, b) => {
            // Prefer featured, then cheaper
            if (a.featured !== b.featured) return b.featured ? 1 : -1;
            return a.price - b.price;
        })
        .slice(0, maxProducts - smartProducts.length);

    return [...smartProducts, ...fallbackProducts];
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
