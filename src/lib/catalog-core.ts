/**
 * catalog-core.ts — Pure catalog logic shared by the server (full catalog in
 * `@/lib/static-products`) and the browser (slim generated catalog in
 * `@/lib/client-catalog`).
 *
 * ⚠️ This module must stay DATA-FREE: it never imports the product catalog.
 * All functions take the catalog as a parameter so the client bundle can bind
 * them to the slim, description-free catalog while the server binds them to
 * the full `staticProducts` array. Keeping ONE implementation guarantees the
 * price a customer sees in the cart is computed by exactly the same rules the
 * server enforces at order time.
 */

import { BUNDLE_DISCOUNT_PERCENT } from '@/lib/bundle-policy';
import { isStorefrontPromotableSlug } from '@/lib/merchant-product-data';

/** Minimal variant shape the pricing logic needs (structural subset of ProductVariant). */
export interface CatalogVariantCore {
    id: string;
    sku: string;
    price: number;
}

/** Minimal product shape the pricing/bundle logic needs (structural subset of StaticProduct). */
export interface CatalogProductCore {
    slug: string;
    sku: string;
    brand: string;
    categorySlug: string;
    price: number;
    status: string;
    featured: boolean;
    variants?: CatalogVariantCore[];
    translations?: { en?: { name?: string } };
}

/**
 * السعر الموثوق من الكتالوج لعنصر سلة/طلب — المصدر الوحيد للحقيقة السعرية.
 *
 * يتجاهل أي سعر أرسله العميل: السلة محفوظة في localStorage بسعرها لحظة
 * الإضافة، وصفحة المنتج قد تُخدَّم مكاشة على الحافة — فيتسرّب سعر قديم إن وثقنا
 * بالعميل. نطابق بالترتيب (من الأثبت إلى الأضعف):
 *   1. productId بصيغة "static_<slug>[_<variantId>]" — الـslug لا يتغيّر أبداً،
 *      فهو المفتاح الأضمن (بعكس الـsku الذي تغيّر في هجرة الأكواد 4-أحرف).
 *   2. حقل slug صريح على العنصر إن وُجد.
 *   3. sku (على مستوى المنتج أو المتغيّر) — للتوافق فقط.
 *
 * المنتجات ذات المتغيّرات: نُصحّح السعر فقط عند تحديد المتغيّر بدقة (id أو sku)؛
 * وإلا نُعيد null كي لا نخمّن شريحة سعر خاطئة. المنتجات غير الموجودة في الكتالوج
 * الثابت (Firestore فقط) تُعيد null فيُبقي المستدعي سعر العميل.
 */
export type CatalogPricing =
    | { status: 'ok'; price: number; sku: string; slug: string; variantId?: string }
    | { status: 'ambiguous'; slugs: string[] }
    // منتج بمتغيّرات لكن العنصر لم يحدّد المتغيّر — طلب مُلفَّق/معطوب (السلال الحقيقية
    // تحمل دائماً المتغيّر). المستدعي يرفض بدل الوثوق بسعر العميل.
    | { status: 'variant-unresolved'; slug: string }
    // غير موجود في الكتالوج الثابت — قد يكون منتج Firestore (يبحث عنه المستدعي هناك)
    // أو مُلفَّقاً (يُرفض). candidateSlug = أفضل تخمين لمعرّف مستند Firestore.
    | { status: 'unknown'; candidateSlug: string };

export function resolveCatalogPricingFrom<T extends CatalogProductCore>(
    catalog: readonly T[],
    item: {
        productId?: string;
        sku?: string;
        slug?: string;
    },
): CatalogPricing {
    const rawId = String(item?.productId || '');
    let idSlug = '';
    let variantId = '';
    if (rawId.startsWith('static_')) {
        const rest = rawId.slice('static_'.length);
        const us = rest.indexOf('_'); // الـslug يستخدم '-'، والفاصل مع الـvariant هو '_'
        if (us === -1) idSlug = rest;
        else { idSlug = rest.slice(0, us); variantId = rest.slice(us + 1); }
    }

    // إيجاد المنتج: slug من productId → حقل slug → sku (منتج/متغيّر)
    let product: T | undefined =
        (idSlug && catalog.find(p => p.slug === idSlug)) || undefined;
    if (!product && item?.slug) product = catalog.find(p => p.slug === item.slug);
    if (!product && item?.sku) {
        const skuMatches = catalog.filter(p =>
            p.sku === item.sku || (p.variants || []).some(v => v.sku === item.sku));
        if (skuMatches.length > 1) {
            return { status: 'ambiguous', slugs: skuMatches.map(match => match.slug) };
        }
        product = skuMatches[0];
    }

    if (!product) {
        // أفضل مرشّح لمعرّف مستند Firestore: productId غير المسبوق بـstatic_ = الـslug
        // مباشرة (منتجات Firestore id=slug)، وإلا الـslug المستخرج، وإلا حقل slug.
        const candidateSlug = (!rawId.startsWith('static_') && rawId) || idSlug || String(item?.slug || '');
        return { status: 'unknown', candidateSlug };
    }

    // منتج بمتغيّرات — يجب تحديد المتغيّر بدقة، وإلا نرفض (لا تخمين شريحة سعر)
    if (product.variants && product.variants.length > 0) {
        const variant =
            (variantId && product.variants.find(v => v.id === variantId)) ||
            (item?.sku && product.variants.find(v => v.sku === item.sku)) ||
            undefined;
        if (!variant) return { status: 'variant-unresolved', slug: product.slug };
        return {
            status: 'ok',
            price: variant.price,
            sku: variant.sku,
            slug: product.slug,
            variantId: variant.id,
        };
    }

    return { status: 'ok', price: product.price, sku: product.sku, slug: product.slug };
}

// ═══════════════════════════════════════════════════════════
// 🔗 BRAND FAMILIES — Cross-brand pairing (e.g. Anker ↔ Soundcore)
// ═══════════════════════════════════════════════════════════
export const BRAND_FAMILIES: Record<string, string[]> = {
    'anker': ['anker', 'soundcore'],
    'soundcore': ['anker', 'soundcore'],
    'joyroom': ['joyroom'],
};

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

/** Result type for smart bundle recommendations */
export interface BundleProductOf<T extends CatalogProductCore> {
    product: T;
    slot: 'essential' | 'accessory';
    reason: { ar: string; en: string };
}

export interface BundleResultOf<T extends CatalogProductCore> {
    bundleProducts: BundleProductOf<T>[];
    bundleDiscount: number;        // absolute discount amount in EGP
    totalBeforeDiscount: number;    // sum of all bundle products prices (without main)
    totalAfterDiscount: number;     // total after 5% bundle discount
    fullBundlePrice: number;        // main + bundle products after discount
    dailyCost: number;              // full bundle price / 365
    totalSavings: number;           // server-applied bundle discount
}

/**
 * 🏆 Smart Bundle Recommendation Engine
 *
 * Rules:
 * 1. NEVER recommend from the same category (no PowerBank → PowerBank)
 * 2. Slot 1 = Essential complement (charger for power bank, cable for charger)
 * 3. Slot 2 = Useful accessory (lower price, nice-to-have)
 * 4. Same brand ONLY (Anker → Anker, Joyroom → Joyroom)
 * 5. Essential: 15-60% of main price ideally, HARD CAP 90% (never exceeds main)
 * 6. Accessory: 5-40% ideally, HARD CAP 60%; all add-ons together <= 100% of main
 * 6b. Cables must match the main product charging port (Lightning vs USB-C)
 * 7. Products sorted: essential first, accessory second
 */
export function getSmartBundleProductsFrom<T extends CatalogProductCore>(
    catalog: readonly T[],
    product: T,
): BundleResultOf<T> {
    const matrix = complementaryMatrix[product.categorySlug] || [];
    const brandLower = product.brand.toLowerCase();
    const bundleProducts: BundleProductOf<T>[] = [];
    const usedCategories = new Set<string>([product.categorySlug]);

    // Charging-port signal of the main product (for cable compatibility).
    // Derived from slug + English name — no extra data fields needed.
    const portSignalOf = (p: T): 'lightning' | 'usb-c' | null => {
        const hay = `${p.slug} ${p.translations?.en?.name || ''}`.toLowerCase();
        if (/lightning/.test(hay)) return 'lightning';
        if (/usb-c|type-c|usb c|typec/.test(hay)) return 'usb-c';
        return null;
    };
    const mainPort = portSignalOf(product);

    // For each slot in the matrix (essential first, then accessory)
    for (const entry of matrix) {
        if (bundleProducts.length >= 2) break;
        if (usedCategories.has(entry.targetCategory)) continue;

        // Running total of already-picked complements — the whole combo of
        // add-ons must never exceed the main product's own price.
        const spentOnAddons = bundleProducts.reduce((s, bp) => s + bp.product.price, 0);
        const remainingBudget = product.price - spentOnAddons;

        // HARD price caps (anti-exaggeration): an essential complement may
        // never exceed 90% of the main price, an accessory never 60% — and
        // never more than the remaining add-on budget. If nothing fits, we
        // show fewer items rather than an overpriced add-on.
        const capRatio = entry.slot === 'essential' ? 0.9 : 0.6;
        const maxPrice = Math.min(product.price * capRatio, remainingBudget);

        // Find best product from targetCategory, same brand family, under cap
        const candidates = catalog
            .filter(p =>
                p.status === 'active' &&
                isStorefrontPromotableSlug(p.slug) &&
                p.slug !== product.slug &&
                (BRAND_FAMILIES[brandLower] || [brandLower]).includes(p.brand.toLowerCase()) &&
                p.categorySlug === entry.targetCategory &&
                p.price <= maxPrice
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

            // Prefer lower-priced options for accessory slot
            if (entry.slot === 'accessory') {
                score += Math.max(0, 10 - Math.floor(priceRatio * 10));
            }

            // Port compatibility (cables only): a Lightning cable belongs
            // with a Lightning device, USB-C with USB-C. Mismatched cables
            // are penalized so an iPhone cable never rides along with a
            // USB-C-only speaker just because it scored well on price.
            if (p.categorySlug === 'cables') {
                const cablePort = portSignalOf(p);
                if (mainPort && cablePort === mainPort) score += 15;
                else if (mainPort && cablePort && cablePort !== mainPort) score -= 12;
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

    // Only report the discount that checkout applies to the complete bundle.
    const totalSavings = bundleDiscount;

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
