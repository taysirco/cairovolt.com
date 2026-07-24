import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { staticProducts } from '@/lib/static-products';
import { safeAppendOrderToSheet } from '@/lib/google-sheets';
import { safeSendLeadToCRM } from '@/lib/crm';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';
import { getShippingFee, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import { getGovernorateBySlug } from '@/data/governorates';
import {
    SEO_NOINDEX_PRODUCT_SLUGS,
    STANDARD_SHIPPING_MAX_EGP,
    STANDARD_SHIPPING_MIN_EGP,
} from '@/lib/merchant-product-data';

/**
 * Quick Cash-on-Delivery endpoint for a single catalog product.
 * Requests are rate-limited, validated against the catalog, and deduplicated
 * by phone and SKU before an order is created for manual confirmation.
 */

// ═══════════ Zod Validation Schema ═══════════

const QuickCODSchema = z.object({
    sku: z.string()
        .min(2, 'SKU must be at least 2 characters')
        .max(50, 'SKU too long'),
    phone: z.string()
        .regex(
            /^01[0125][0-9]{8}$/,
            'رقم هاتف مصري غير صالح — يجب أن يبدأ بـ 01 ويكون 11 رقم'
        ),
    // Optional enrichment fields
    name: z.string().max(100).optional(),
    source: z.enum(['search', 'ai_agent', 'shortcut', 'direct']).default('search'),
    locale: z.enum(['ar', 'en']).default('ar'),
    city: z.string()
        .trim()
        .max(50)
        .refine((value) => Boolean(getGovernorateBySlug(value)), 'Unknown governorate code')
        .optional(),
});

type QuickCODInput = z.infer<typeof QuickCODSchema>;

// ═══════════ Product Lookup ═══════════

type ProductLookupResult = {
    product: Record<string, unknown> | null;
    ambiguousSlugs?: string[];
};

async function findProductBySKU(
    reference: string,
    db: FirebaseFirestore.Firestore
): Promise<ProductLookupResult> {
    // 1. Static catalog first — source of truth for pricing
    const staticSlugMatch = staticProducts.find(
        p => p.slug === reference && p.status === 'active'
    );
    if (staticSlugMatch) {
        return { product: {
            id: `static_${staticSlugMatch.slug}`,
            ...staticSlugMatch,
        } as unknown as Record<string, unknown> };
    }

    const staticSkuMatches = staticProducts.filter(
        p => p.sku === reference && p.status === 'active'
    );
    if (staticSkuMatches.length > 1) {
        return {
            product: null,
            ambiguousSlugs: staticSkuMatches.map(product => product.slug),
        };
    }
    if (staticSkuMatches.length === 1) {
        const staticMatch = staticSkuMatches[0];
        return { product: {
            id: `static_${staticMatch.slug}`,
            ...staticMatch,
        } as unknown as Record<string, unknown> };
    }

    // 2. Firestore fallback — for products not in static catalog
    try {
        const slugDoc = await db.collection('products').doc(reference).get();
        if (slugDoc.exists) {
            const data = slugDoc.data()!;
            if (data.status === 'active') {
                return { product: { id: slugDoc.id, ...data } };
            }
        }

        const snapshot = await db.collection('products')
            .where('sku', '==', reference)
            .where('status', '==', 'active')
            .limit(3)
            .get();

        if (snapshot.size > 1) {
            return {
                product: null,
                ambiguousSlugs: snapshot.docs.map(doc => String(doc.data().slug || doc.id)),
            };
        }
        if (!snapshot.empty) {
            return { product: { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } };
        }
    } catch {
        // Firestore unavailable — continue with null
    }

    return { product: null };
}

// ═══════════ Duplicate Detection ═══════════

async function isDuplicateOrder(
    phone: string,
    sku: string,
    db: FirebaseFirestore.Firestore
): Promise<boolean> {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const existing = await db.collection('orders')
        .where('phone', '==', phone)
        .where('source', '==', 'quick_cod')
        .where('createdAt', '>=', twentyFourHoursAgo)
        .limit(5)
        .get();

    if (existing.empty) return false;

    // Check if same SKU exists in any of the recent orders
    for (const doc of existing.docs) {
        const orderItems = doc.data().items as Array<{ sku: string }> | undefined;
        if (orderItems?.some(item => item.sku === sku)) {
            return true;
        }
    }

    return false;
}

// ═══════════ CORS + Response Helper ═══════════
// Every response must include CORS headers for cross-origin API access

const CORS_HEADERS: Record<string, string> = {
    'Access-Control-Allow-Origin': 'https://cairovolt.com',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
};

/** Wraps NextResponse.json with CORS headers injected automatically */
function jsonResponse(
    body: Record<string, unknown>,
    options: { status?: number; headers?: Record<string, string> } = {}
) {
    return NextResponse.json(body, {
        status: options.status || 200,
        headers: { ...CORS_HEADERS, ...options.headers },
    });
}

// Handle CORS preflight
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: CORS_HEADERS,
    });
}

// ═══════════ POST — Quick Purchase ═══════════

export async function POST(req: NextRequest) {
    // ── 1. Rate Limiting ──
    const ip = getClientIp(req.headers);

    const rateCheck = checkRateLimit(ip, true);
    if (!rateCheck.allowed) {
        return jsonResponse({
            success: false,
            error: 'Too many requests. Please try again later.',
            error_ar: 'طلبات كثيرة جداً. حاول بعد دقيقة.',
        }, {
            status: 429,
            headers: {
                'Retry-After': '60',
                'X-RateLimit-Limit': rateCheck.limit.toString(),
                'X-RateLimit-Remaining': rateCheck.remaining.toString(),
            },
        });
    }

    // ── 2. Parse & Validate Input ──
    let input: QuickCODInput;
    try {
        const body = await req.json();
        input = QuickCODSchema.parse(body);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const issues = z.prettifyError(error);
            return jsonResponse({
                success: false,
                error: 'Invalid input',
                error_ar: 'بيانات غير صالحة',
                details: issues,
            }, { status: 400 });
        }
        return jsonResponse({
            success: false,
            error: 'Invalid JSON body',
            error_ar: 'محتوى الطلب غير صالح',
        }, { status: 400 });
    }

    // ── 3. Initialize Firestore ──
    let db: FirebaseFirestore.Firestore;
    try {
        db = await getFirestore();
    } catch (initError) {
        console.error('[Quick-COD] Firestore init failed:', initError);
        return jsonResponse({
            success: false,
            error: 'Service temporarily unavailable',
            error_ar: 'الخدمة غير متاحة مؤقتاً',
        }, { status: 503 });
    }

    // ── 4. Find Product (with error boundary) ──
    let lookup: ProductLookupResult;
    try {
        lookup = await findProductBySKU(input.sku, db);
    } catch (lookupError) {
        console.error('[Quick-COD] Product lookup failed:', lookupError);
        return jsonResponse({
            success: false,
            error: 'Failed to look up product',
            error_ar: 'فشل في البحث عن المنتج',
        }, { status: 503 });
    }

    if (lookup.ambiguousSlugs?.length) {
        return jsonResponse({
            success: false,
            error: 'SKU matches more than one catalog product; submit the product slug',
            error_ar: 'رمز SKU يطابق أكثر من منتج؛ أرسل slug الخاص بالمنتج',
            matchingSlugs: lookup.ambiguousSlugs,
        }, { status: 409 });
    }

    const product = lookup.product;

    if (!product) {
        return jsonResponse({
            success: false,
            error: `Product not found: ${input.sku}`,
            error_ar: `المنتج غير موجود: ${input.sku}`,
        }, { status: 404 });
    }

    if (SEO_NOINDEX_PRODUCT_SLUGS.has(String(product.slug || ''))) {
        return jsonResponse({
            success: false,
            error: 'Product unavailable due to manufacturer safety recall',
            error_ar: 'هذا المنتج غير متاح للبيع بسبب استدعاء سلامة من الشركة المصنّعة',
            support: {
                whatsapp: 'https://wa.me/201558245974',
                recall_info: 'https://www.anker.com/product-recalls',
            },
        }, { status: 410 });
    }

    // ── 5. Stock Check ──
    const stock = Number(product.stock) || 0;
    if (stock <= 0) {
        const translations = product.translations as
            Record<string, Record<string, string>> | undefined;
        const productName = translations?.ar?.name || translations?.en?.name || input.sku;
        return jsonResponse({
            success: false,
            error: 'Product is out of stock',
            error_ar: 'المنتج غير متوفر حالياً',
            product: {
                name: productName,
                sku: product.sku,
            },
            notify_url: `https://wa.me/201558245974?text=${encodeURIComponent(
                `أريد أن أعرف متى يتوفر: ${productName}`
            )}`,
        }, { status: 409 });
    }

    // ── 6. Duplicate Order Detection ──
    let isDuplicate = false;
    try {
        isDuplicate = await isDuplicateOrder(input.phone, input.sku, db);
    } catch (dupError) {
        // Non-fatal: if duplicate check fails, allow the order through
        console.error('[Quick-COD] Duplicate check failed (allowing order):', dupError);
    }
    if (isDuplicate) {
        return jsonResponse({
            success: false,
            error: 'Duplicate order detected within 24 hours',
            error_ar: 'يوجد طلب مسبق لنفس المنتج بنفس الرقم خلال آخر 24 ساعة',
            support: {
                whatsapp: 'https://wa.me/201558245974',
                message_ar: 'تواصل معنا لمتابعة طلبك السابق',
            },
        }, { status: 409 });
    }

    // ── 7. Create Order in Firestore ──
    const price = Number(product.price) || 0;
    const shippingIsExact = price >= FREE_SHIPPING_THRESHOLD || Boolean(input.city);
    const shippingFee = price >= FREE_SHIPPING_THRESHOLD
        ? 0
        : input.city
            ? getShippingFee(input.city, price)
            : STANDARD_SHIPPING_MAX_EGP;
    const shippingMin = shippingIsExact ? shippingFee : STANDARD_SHIPPING_MIN_EGP;
    const shippingMax = shippingFee;
    const totalAmount = price + shippingFee;
    const translations = product.translations as
        Record<string, Record<string, string>> | undefined;

    // QC- prefix distinguishes Quick-COD from regular CV- orders
    // UUID suffix prevents collisions at any volume
    const orderId = `QC-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const orderData = {
        orderId,
        source: 'quick_cod',
        sourceDetail: input.source,
        customerName: input.name || `Quick COD — ${input.phone}`,
        phone: input.phone,
        whatsapp: input.phone,
        address: 'يتم التأكيد عبر الهاتف',
        city: input.city || 'pending_confirmation',
        items: [{
            productId: product.id,
            sku: String(product.sku || product.slug),
            slug: product.slug,
            name: translations?.ar?.name || translations?.en?.name || product.slug,
            price: price,
            quantity: 1,
        }],
        shippingFee,
        shippingFeeMin: shippingMin,
        shippingFeeMax: shippingMax,
        pricingStatus: shippingIsExact ? 'confirmed' : 'pending_address_confirmation',
        totalAmount,
        status: 'pending_cod',
        paymentMethod: 'cod',
        sourceLabel: 'طلب سريع - الدفع عند الاستلام',
        ...(!shippingIsExact && {
            notes: `رسوم الشحن تقديرية بين ${shippingMin} و${shippingMax} ج.م وتُحدد نهائياً بعد تأكيد المحافظة والعنوان.`,
        }),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
    };

    let docRef: FirebaseFirestore.DocumentReference;
    try {
        docRef = await db.collection('orders').add(orderData);
    } catch (writeError) {
        console.error('[Quick-COD] Firestore write failed:', writeError);
        return jsonResponse({
            success: false,
            error: 'Failed to create order',
            error_ar: 'فشل في تسجيل الطلب',
        }, { status: 500 });
    }

    // ═══ 8. Google Sheets sync — BEFORE response (critical business data) ═══
    // Moved from after() because Firebase App Hosting (Cloud Run) may kill
    // the container before deferred callbacks complete, causing silent data loss.
    // Sheets + CRM بالتوازي — كلاهما fail-open ولا يؤخر أحدهما الآخر
    await Promise.all([
        safeAppendOrderToSheet({ ...orderData, id: docRef.id }),
        safeSendLeadToCRM({ ...orderData, id: docRef.id }),
    ]);

    // ── 9. Success Response ──
    const productName = input.locale === 'ar'
        ? (translations?.ar?.name || '')
        : (translations?.en?.name || '');

    return jsonResponse({
        success: true,
        message: input.locale === 'ar'
            ? 'تم تسجيل طلبك بنجاح. سيتواصل معك فريق كايرو فولت لتأكيد العنوان وموعد التوصيل.'
            : 'Order registered. CairoVolt will contact you to confirm the address and delivery estimate.',
        order: {
            id: docRef.id,
            orderId,
            status: 'pending_cod',
            product: {
                name: productName,
                sku: product.sku,
                price,
            },
            pricing: {
                subtotal: price,
                shipping: shippingFee,
                total: totalAmount,
                currency: 'EGP',
                isEstimate: !shippingIsExact,
                status: shippingIsExact ? 'confirmed' : 'pending_address_confirmation',
                shippingRange: { min: shippingMin, max: shippingMax },
                totalRange: { min: price + shippingMin, max: price + shippingMax },
                ...(price >= FREE_SHIPPING_THRESHOLD && {
                    freeShippingNote: input.locale === 'ar'
                        ? 'شحن مجاني ✅'
                        : 'Free shipping ✅',
                }),
            },
            delivery: {
                method: 'Bosta COD',
                estimatedDays: { min: 1, max: 5 },
                note: input.locale === 'ar'
                    ? (shippingIsExact
                        ? 'الدفع عند الاستلام'
                        : 'الدفع عند الاستلام؛ تُحدد الرسوم النهائية بعد تأكيد المحافظة والعنوان')
                    : (shippingIsExact
                        ? 'Cash on delivery'
                        : 'Cash on delivery; the final fee is confirmed after the governorate and address'),
            },
        },
        tracking: {
            whatsapp: 'https://wa.me/201558245974',
            phone: '+201558245974',
        },
    });
}

// ═══════════ GET — Product Quick-Lookup ═══════════
// Allows AI agents to verify price & availability before purchasing

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const sku = url.searchParams.get('sku');

    if (!sku) {
        return jsonResponse({
            error: 'Missing sku parameter',
            error_ar: 'مطلوب رمز المنتج',
            usage: {
                by_sku: '/api/v1/quick-cod?sku=A1289',
                by_slug: '/api/v1/quick-cod?sku=anker-737-powerbank',
            },
            docs: 'https://cairovolt.com/api/openapi.json',
        }, { status: 400 });
    }

    // Rate limit reads too
    const ip = getClientIp(req.headers);

    const rateCheck = checkRateLimit(ip, false);
    if (!rateCheck.allowed) {
        return jsonResponse({
            error: 'Too many requests',
        }, { status: 429 });
    }

    try {
        const db = await getFirestore();
        const lookup = await findProductBySKU(sku, db);

        if (lookup.ambiguousSlugs?.length) {
            return jsonResponse({
                available: false,
                error: 'SKU matches more than one catalog product; use a product slug',
                error_ar: 'رمز SKU يطابق أكثر من منتج؛ استخدم رابط المنتج المختصر slug',
                matchingSlugs: lookup.ambiguousSlugs,
            }, { status: 409 });
        }

        const product = lookup.product;

        if (!product) {
            return jsonResponse({
                available: false,
                error: 'Product not found',
                error_ar: 'المنتج غير موجود',
            }, { status: 404 });
        }

        if (SEO_NOINDEX_PRODUCT_SLUGS.has(String(product.slug || ''))) {
            return jsonResponse({
                available: false,
                error: 'Product unavailable due to manufacturer safety recall',
                error_ar: 'هذا المنتج غير متاح للبيع بسبب استدعاء سلامة من الشركة المصنّعة',
                recall_info: 'https://www.anker.com/product-recalls',
            }, { status: 410 });
        }

        const translations = product.translations as
            Record<string, Record<string, string>> | undefined;
        const price = Number(product.price) || 0;
        const stock = Number(product.stock) || 0;
        const images = product.images as Array<{ url: string; isPrimary?: boolean }> | undefined;
        const primaryImage = images?.find(img => img.isPrimary)?.url || images?.[0]?.url || null;

        return jsonResponse({
            available: stock > 0,
            product: {
                sku: product.sku,
                slug: product.slug,
                brand: product.brand,
                name: {
                    ar: translations?.ar?.name || '',
                    en: translations?.en?.name || '',
                },
                price: {
                    amount: price,
                    currency: 'EGP',
                },
                stock,
                image: primaryImage ? `https://cairovolt.com${primaryImage}` : null,
            },
            shipping: {
                fee: price >= FREE_SHIPPING_THRESHOLD ? 0 : null,
                currency: 'EGP',
                freeAbove: FREE_SHIPPING_THRESHOLD,
                feeRange: price >= FREE_SHIPPING_THRESHOLD
                    ? { min: 0, max: 0 }
                    : { min: STANDARD_SHIPPING_MIN_EGP, max: STANDARD_SHIPPING_MAX_EGP },
                note: price >= FREE_SHIPPING_THRESHOLD
                    ? 'Free shipping threshold met'
                    : 'Final fee depends on the governorate supplied with the order',
                estimatedDays: { min: 1, max: 5 },
            },
            quick_buy: {
                method: 'POST',
                url: 'https://cairovolt.com/api/v1/quick-cod',
                body: {
                    sku,
                    phone: '01XXXXXXXXX (Egyptian mobile — 11 digits)',
                    city: '(optional valid governorate slug; required for an exact shipping fee)',
                },
                note: 'Phone must match: 01[0125]XXXXXXXX',
            },
        });
    } catch (error) {
        console.error('[Quick-COD] GET error:', error);
        return jsonResponse({
            error: 'Service temporarily unavailable',
        }, { status: 503 });
    }
}
