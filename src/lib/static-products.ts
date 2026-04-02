// Static products data for display when Firebase is not configured
// This can be used as fallback or for development

import { products, categories } from '@/data/seed-products';
import { contentGraph, getInternalLinksForPage, getRelatedEntities } from '@/data/content-graph';

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

// ═══════════════════════════════════════════════════════════
// 🏆 GOLDEN COMBO — Smart Bundle Recommendation Engine
// ═══════════════════════════════════════════════════════════
// Philosophy: "If a customer buys a power bank, they DON'T need
// another power bank — they need a charger to charge it and a
// cable to connect it to their phone."

/** Smart Complementary Matrix with bilingual reason texts */
const complementaryMatrix: Record<string, Array<{
    targetCategory: string;
    slot: 'essential' | 'accessory';
    reason: { ar: string; en: string };
}>> = {
    'power-banks': [
        { targetCategory: 'wall-chargers', slot: 'essential', reason: { ar: 'عشان تشحن الباور بانك بسرعة', en: 'To fast-charge your power bank' } },
        { targetCategory: 'cables', slot: 'accessory', reason: { ar: 'كابل أصلي يوصّله بموبايلك', en: 'A quality cable to connect to your phone' } },
    ],
    'wall-chargers': [
        { targetCategory: 'cables', slot: 'essential', reason: { ar: 'محتاج كابل عشان تشحن', en: 'You need a cable to charge' } },
        { targetCategory: 'power-banks', slot: 'accessory', reason: { ar: 'باور بانك لما تكون بره البيت', en: 'A power bank for when you\'re on the go' } },
    ],
    'cables': [
        { targetCategory: 'wall-chargers', slot: 'essential', reason: { ar: 'شاحن يشغّل الشحن السريع', en: 'A charger to unlock fast charging' } },
        { targetCategory: 'power-banks', slot: 'accessory', reason: { ar: 'باور بانك لما تكون بره', en: 'A power bank for outdoor use' } },
    ],
    'car-chargers': [
        { targetCategory: 'cables', slot: 'essential', reason: { ar: 'كابل يوصّل موبايلك بالشاحن', en: 'A cable to connect your phone' } },
        { targetCategory: 'car-holders', slot: 'accessory', reason: { ar: 'حامل يثبّت الموبايل وأنت سايق', en: 'A mount to hold your phone while driving' } },
        { targetCategory: 'power-banks', slot: 'accessory', reason: { ar: 'باور بانك للرحلات الطويلة', en: 'A power bank for long road trips' } },
    ],
    'car-holders': [
        { targetCategory: 'car-chargers', slot: 'essential', reason: { ar: 'شاحن عربية يشحن وأنت سايق', en: 'A car charger for on-the-road power' } },
        { targetCategory: 'cables', slot: 'accessory', reason: { ar: 'كابل يوصّل بالشاحن', en: 'A cable for charging' } },
        { targetCategory: 'power-banks', slot: 'accessory', reason: { ar: 'باور بانك للرحلات', en: 'A power bank for travel' } },
    ],
    'audio': [
        { targetCategory: 'cables', slot: 'essential', reason: { ar: 'كابل شحن للسماعة', en: 'A charging cable for your earbuds' } },
        { targetCategory: 'power-banks', slot: 'accessory', reason: { ar: 'باور بانك عشان بطاريتك متخلصش بره', en: 'A power bank so you never run out' } },
        { targetCategory: 'speakers', slot: 'accessory', reason: { ar: 'سبيكر للخروجات والتجمعات', en: 'A speaker for hangouts and gatherings' } },
    ],
    'speakers': [
        { targetCategory: 'power-banks', slot: 'essential', reason: { ar: 'باور بانك للبيتش والخروجات', en: 'A power bank for beach trips' } },
        { targetCategory: 'cables', slot: 'accessory', reason: { ar: 'كابل شحن للسبيكر', en: 'A charging cable for the speaker' } },
        { targetCategory: 'audio', slot: 'accessory', reason: { ar: 'سماعة للاستخدام الشخصي', en: 'Earbuds for personal listening' } },
    ],
    'smart-watches': [
        { targetCategory: 'wall-chargers', slot: 'essential', reason: { ar: 'شاحن سريع للساعة', en: 'A fast charger for the watch' } },
        { targetCategory: 'power-banks', slot: 'accessory', reason: { ar: 'باور بانك لشحن الساعة بره', en: 'A power bank to charge on the go' } },
        { targetCategory: 'cables', slot: 'accessory', reason: { ar: 'كابل شحن سريع', en: 'A fast charging cable' } },
    ],
};

/** Bundle discount percentage */
const BUNDLE_DISCOUNT_PERCENT = 5;

/** Result type for smart bundle recommendations */
export interface BundleProduct {
    product: StaticProduct;
    slot: 'essential' | 'accessory';
    reason: { ar: string; en: string };
}

export interface BundleResult {
    bundleProducts: BundleProduct[];
    bundleDiscount: number;        // absolute discount amount in EGP
    totalBeforeDiscount: number;    // sum of all bundle products prices (without main)
    totalAfterDiscount: number;     // total after 5% bundle discount
    fullBundlePrice: number;        // main + bundle products after discount
    dailyCost: number;              // full bundle price / 365
    totalSavings: number;           // originalPrice savings + bundle discount
}

/**
 * 🏆 Smart Bundle Recommendation Engine
 * 
 * Rules:
 * 1. NEVER recommend from the same category (no PowerBank → PowerBank)
 * 2. Slot 1 = Essential complement (charger for power bank, cable for charger)
 * 3. Slot 2 = Useful accessory (lower price, nice-to-have)
 * 4. Same brand ONLY (Anker → Anker, Joyroom → Joyroom)
 * 5. Essential product should be 15-60% of main price ideally
 * 6. Accessory should be 5-40% of main price ideally
 * 7. Products sorted: essential first, accessory second
 */
export function getSmartBundleProducts(product: StaticProduct): BundleResult {
    const matrix = complementaryMatrix[product.categorySlug] || [];
    const brandLower = product.brand.toLowerCase();
    const bundleProducts: BundleProduct[] = [];
    const usedCategories = new Set<string>([product.categorySlug]);

    // For each slot in the matrix (essential first, then accessory)
    for (const entry of matrix) {
        if (bundleProducts.length >= 2) break;
        if (usedCategories.has(entry.targetCategory)) continue;

        // Find best product from targetCategory, same brand
        const candidates = staticProducts
            .filter(p =>
                p.status === 'active' &&
                p.slug !== product.slug &&
                p.brand.toLowerCase() === brandLower &&
                p.categorySlug === entry.targetCategory
            );

        if (candidates.length === 0) continue;

        // Score candidates by relevance to bundle role
        const scored = candidates.map(p => {
            let score = 0;
            const priceRatio = p.price / product.price;

            // Essential: prefer 15-60% of main price
            // Accessory: prefer 5-40% of main price
            if (entry.slot === 'essential') {
                if (priceRatio >= 0.15 && priceRatio <= 0.60) score += 30;
                else if (priceRatio >= 0.05 && priceRatio <= 0.80) score += 15;
                else score += 5;
            } else {
                if (priceRatio >= 0.05 && priceRatio <= 0.40) score += 30;
                else if (priceRatio >= 0.03 && priceRatio <= 0.60) score += 15;
                else score += 5;
            }

            // Featured products get bonus
            if (p.featured) score += 10;

            // Products with bigger discount get bonus (shows more savings)
            if (p.originalPrice && p.originalPrice > p.price) {
                score += 8;
            }

            // Prefer lower-priced options for accessory slot
            if (entry.slot === 'accessory') {
                score += Math.max(0, 10 - Math.floor(priceRatio * 10));
            }

            return { product: p, score };
        });

        // Sort by score descending, then by price ascending
        scored.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.product.price - b.product.price;
        });

        if (scored.length > 0) {
            bundleProducts.push({
                product: scored[0].product,
                slot: entry.slot,
                reason: entry.reason,
            });
            usedCategories.add(entry.targetCategory);
        }
    }

    // Sort: essential first, then accessory
    bundleProducts.sort((a, b) => {
        if (a.slot === 'essential' && b.slot !== 'essential') return -1;
        if (a.slot !== 'essential' && b.slot === 'essential') return 1;
        return b.product.price - a.product.price; // higher price first within same slot
    });

    // Calculate bundle pricing
    const bundleItemsTotal = bundleProducts.reduce((sum, bp) => sum + bp.product.price, 0);
    const fullPriceBeforeDiscount = product.price + bundleItemsTotal;
    const bundleDiscount = bundleProducts.length > 0
        ? Math.round(fullPriceBeforeDiscount * BUNDLE_DISCOUNT_PERCENT / 100)
        : 0;
    const fullBundlePrice = fullPriceBeforeDiscount - bundleDiscount;

    // Total savings = original price discounts + bundle discount
    const originalPriceSavings = [product, ...bundleProducts.map(bp => bp.product)]
        .reduce((sum, p) => sum + ((p.originalPrice || p.price) - p.price), 0);
    const totalSavings = originalPriceSavings + bundleDiscount;

    // Daily cost (psychological pricing: spread over 1 year)
    const dailyCost = Math.round((fullBundlePrice / 365) * 10) / 10;

    return {
        bundleProducts,
        bundleDiscount,
        totalBeforeDiscount: bundleItemsTotal,
        totalAfterDiscount: bundleItemsTotal - bundleDiscount,
        fullBundlePrice,
        dailyCost,
        totalSavings,
    };
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
            !usedSlugs.has(p.slug) &&
            p.brand.toLowerCase() === product.brand.toLowerCase() &&
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

