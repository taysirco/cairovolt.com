import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { staticProducts } from '@/lib/static-products';
import { safeAppendOrderToSheet } from '@/lib/google-sheets';
import { safeSendLeadToCRM } from '@/lib/crm';
import { getShippingFee, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-ip';
import {
    getMerchantProductUrl,
    STANDARD_SHIPPING_MAX_EGP,
    STANDARD_SHIPPING_MIN_EGP,
} from '@/lib/merchant-product-data';
import { randomUUID } from 'node:crypto';
import { governorates } from '@/data/governorates';

/**
 * Documented product lookup and cash-on-delivery order endpoint.
 * GET checks current catalogue price and availability; POST validates the
 * same catalogue data again before recording a customer-authorized order.
 */

// ============================================
// Input Sanitization
// ============================================

function sanitizeInput(input: unknown, maxLength = 500): string {
    if (typeof input !== 'string') return '';
    return input
        .replace(/<[^>]*>/g, '')
        .replace(/[<>"'&]/g, '')
        .replace(/javascript\s*:/gi, '')
        .trim()
        .slice(0, maxLength);
}

const VALID_GOVERNORATE_SLUGS = new Set(governorates.map(({ slug }) => slug));

function findStaticProductReference(input: { slug?: string | null; sku?: string | null }) {
    const slug = input.slug?.trim();
    if (slug) {
        return {
            product: staticProducts.find(product => product.slug === slug && product.status === 'active'),
            ambiguousSlugs: [] as string[],
        };
    }

    const reference = input.sku?.trim();
    if (!reference) return { product: undefined, ambiguousSlugs: [] as string[] };

    // Existing integrations sometimes submit a slug in the `sku` field.
    const slugMatch = staticProducts.find(
        product => product.slug === reference && product.status === 'active'
    );
    if (slugMatch) return { product: slugMatch, ambiguousSlugs: [] as string[] };

    const skuMatches = staticProducts.filter(
        product => product.sku === reference && product.status === 'active'
    );
    return {
        product: skuMatches.length === 1 ? skuMatches[0] : undefined,
        ambiguousSlugs: skuMatches.length > 1 ? skuMatches.map(product => product.slug) : [],
    };
}

// ============================================
// Smart Search Helpers
// ============================================

/**
 * Normalise a query: lowercase, strip diacritics, map Arabic synonyms,
 * normalise Arabic numerals, expand common abbreviations.
 */
function normaliseQuery(raw: string): string {
    return raw
        .toLowerCase()
        .trim()
        // Arabic-Indic digits → Western
        .replace(/[٠١٢٣٤٥٦٧٨٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
        // Arabic synonyms
        .replace(/مل\s*امبير|مللي\s*امبير|mah/gi, 'mah')
        .replace(/باور\s*بانك|بطارية\s*متنقلة/gi, 'power bank')
        .replace(/شاحن\s*حائط|شاحن\s*مسافر/gi, 'wall charger')
        .replace(/شاحن\s*سيارة/gi, 'car charger')
        .replace(/سماعات|سماعة/gi, 'earbuds')
        .replace(/كابل|وصلة/gi, 'cable')
        .replace(/انكر/gi, 'anker')
        .replace(/جوي\s*روم/gi, 'joyroom')
        .replace(/ساوند\s*كور|سوندكور/gi, 'soundcore');
}

/**
 * Score a product against a search query.
 * Returns a number — higher = better match. 0 = no match.
 */
function scoreProduct(
    fields: { enName: string; arName: string; slug: string; sku: string; features: string },
    rawQuery: string
): number {
    const query = normaliseQuery(rawQuery);
    const tokens = query.split(/\s+/).filter(t => t.length > 0);

    const corpus = [
        fields.enName.toLowerCase(),
        normaliseQuery(fields.arName),
        fields.slug.toLowerCase().replace(/-/g, ' '),
        fields.sku.toLowerCase(),
        fields.features.toLowerCase(),
    ].join(' ');

    let score = 0;

    // Full phrase match (highest priority)
    if (corpus.includes(query)) score += 100;

    // Every token must appear somewhere (AND logic)
    const allMatch = tokens.every(t => corpus.includes(t));
    if (allMatch) score += 60;

    // Partial: count how many tokens match
    const matchCount = tokens.filter(t => corpus.includes(t)).length;
    score += matchCount * 20;

    // Bonus: token in product name (not just corpus)
    const nameCorpus = fields.enName.toLowerCase() + ' ' + normaliseQuery(fields.arName);
    tokens.forEach(t => {
        if (nameCorpus.includes(t)) score += 15;
    });

    return score;
}

/**
 * Fetch all active products from Firestore and return the best match.
 */
async function smartSearch(
    query: string,
    db: FirebaseFirestore.Firestore
): Promise<Record<string, unknown> | null> {
    const snapshot = await db.collection('products')
        .where('status', '==', 'active')
        .get();

    let best: Record<string, unknown> | null = null;
    let bestScore = 0;

    for (const doc of snapshot.docs) {
        const data = doc.data();
        const translations = data.translations as Record<string, Record<string, string>> | undefined;
        const features = (translations?.en?.features as string[] | undefined)?.join(' ') || '';

        const s = scoreProduct({
            enName: translations?.en?.name || '',
            arName: translations?.ar?.name || '',
            slug: (data.slug as string) || '',
            sku: (data.sku as string) || '',
            features,
        }, query);

        if (s > bestScore) {
            bestScore = s;
            best = { id: doc.id, ...data };
        }
    }

    return bestScore > 0 ? best : null;
}

// ============================================
// GET — Price & Availability Check (Public)
// ============================================

export async function GET(req: NextRequest) {
    const ip = getClientIp(req.headers);
    const rateCheck = checkRateLimit(ip, false);
    if (!rateCheck.allowed) {
        return NextResponse.json(
            { error: 'Too many requests' },
            { status: 429, headers: { 'Retry-After': '60' } },
        );
    }

    const url = new URL(req.url);
    const sku = url.searchParams.get('sku');
    const slug = url.searchParams.get('slug');
    const search = url.searchParams.get('q');

    if (!sku && !slug && !search) {
        return NextResponse.json({
            error: 'Missing parameter: provide sku, slug, or q (search query)',
            usage: {
                by_sku: '/api/v1/checkout?sku=A1289',
                by_slug: '/api/v1/checkout?slug=anker-737-powerbank',
                by_search: '/api/v1/checkout?q=anker charger',
            },
        }, { status: 400 });
    }

    try {
        // Use static data first for accurate pricing (source of truth)
        let product: Record<string, unknown> | null = null;

        const staticLookup = findStaticProductReference({ slug, sku });

        if (staticLookup.ambiguousSlugs.length) {
            return NextResponse.json({
                available: false,
                error: 'SKU matches more than one catalog product; use the product slug',
                matchingSlugs: staticLookup.ambiguousSlugs,
            }, { status: 409 });
        }

        const staticMatch = staticLookup.product;
        if (staticMatch) {
            product = { id: `static_${staticMatch.slug}`, ...staticMatch } as unknown as Record<string, unknown>;
        }

        // For search queries or if not found in static data, try Firestore
        if (!product) {
            try {
                const db = await getFirestore();
                if (search) {
                    product = await smartSearch(search, db);
                } else if (sku) {
                    const snapshot = await db.collection('products')
                        .where('sku', '==', sku)
                        .limit(3)
                        .get();
                    if (snapshot.size > 1) {
                        return NextResponse.json({
                            available: false,
                            error: 'SKU matches more than one catalog product; use the product slug',
                            matchingSlugs: snapshot.docs.map(doc => String(doc.data().slug || doc.id)),
                        }, { status: 409 });
                    }
                    if (!snapshot.empty) {
                        product = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
                    }
                } else if (slug) {
                    const doc = await db.collection('products').doc(slug).get();
                    if (doc.exists) {
                        product = { id: doc.id, ...doc.data() };
                    }
                }
            } catch {
                // Firestore unavailable — continue with what we have
            }
        }

        if (!product) {
            return NextResponse.json({
                available: false,
                error: 'Product not found',
            }, { status: 404 });
        }

        const translations = product.translations as Record<string, Record<string, string>> | undefined;
        const images = product.images as Array<{ url: string; isPrimary?: boolean }> | undefined;
        const primaryImage = images?.find(img => img.isPrimary)?.url || images?.[0]?.url || null;
        const stock = Number(product.stock) || 0;
        const price = Number(product.price) || 0;
        const productUrl = getMerchantProductUrl({
            brand: String(product.brand || ''),
            categorySlug: String(product.categorySlug || ''),
            slug: String(product.slug || ''),
        });

        return NextResponse.json({
            available: stock > 0,
            product: {
                id: product.id,
                sku: product.sku || null,
                slug: product.slug,
                brand: product.brand,
                category: product.categorySlug,
                name: {
                    en: translations?.en?.name || '',
                    ar: translations?.ar?.name || '',
                },
                description: {
                    en: translations?.en?.shortDescription || translations?.en?.description || '',
                    ar: translations?.ar?.shortDescription || translations?.ar?.description || '',
                },
                price: {
                    amount: price,
                    currency: 'EGP',
                },
                stock: stock,
                image: primaryImage
                    ? (primaryImage.startsWith('http') ? primaryImage : `https://cairovolt.com${primaryImage}`)
                    : null,
                url: productUrl,
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
                    : 'Final fee depends on the governorate submitted with the order',
                estimatedDays: { min: 1, max: 5 },
            },
            payment: {
                methods: ['cash_on_delivery'],
                note: 'Pay on delivery — no online prepayment required',
            },
            actions: {
                buy: {
                    method: 'POST',
                    url: 'https://cairovolt.com/api/v1/checkout',
                    body: {
                        slug: product.slug,
                        quantity: 1,
                        customerName: '(required)',
                        phone: '(required)',
                        address: '(required)',
                        city: '(required)',
                    },
                },
            },
        });

    } catch (error) {
        console.error('M2M Checkout GET error:', error);
        return NextResponse.json({
            error: 'Service temporarily unavailable',
        }, { status: 503 });
    }
}

// ============================================
// POST — Place Order (Requires valid data)
// ============================================

export async function POST(req: NextRequest) {
    const ip = getClientIp(req.headers);
    const rateCheck = checkRateLimit(ip, true);
    if (!rateCheck.allowed) {
        return NextResponse.json(
            { success: false, error: 'Too many requests. Please try again later.' },
            { status: 429, headers: { 'Retry-After': '60' } },
        );
    }

    let db;
    try {
        db = await getFirestore();
    } catch (initError: unknown) {
        const message = initError instanceof Error ? initError.message : 'Unknown error';
        console.error('Firestore init failed in M2M checkout:', message);
        return NextResponse.json({
            success: false,
            error: 'Service Unavailable: Database initialization failed',
        }, { status: 503 });
    }

    try {
        const data = await req.json();

        // Validate required fields
        const missing: string[] = [];
        if (!data.sku && !data.slug) missing.push('sku or slug');
        if (!data.customerName) missing.push('customerName');
        if (!data.phone) missing.push('phone');
        if (!data.address) missing.push('address');
        if (!data.city) missing.push('city');

        if (missing.length > 0) {
            return NextResponse.json({
                success: false,
                error: `Missing required fields: ${missing.join(', ')}`,
                required: {
                    sku: 'Product SKU or slug (string)',
                    customerName: 'Full name (string)',
                    phone: 'Phone number with country code (string)',
                    address: 'Delivery address (string)',
                    city: 'City/Governorate code (string)',
                },
            }, { status: 400 });
        }

        const city = sanitizeInput(data.city, 50);
        if (!VALID_GOVERNORATE_SLUGS.has(city)) {
            return NextResponse.json({
                success: false,
                error: 'Unknown city/governorate code',
                validCityCodes: [...VALID_GOVERNORATE_SLUGS],
            }, { status: 400 });
        }

        const quantity = data.quantity === undefined ? 1 : Number(data.quantity);
        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
            return NextResponse.json({
                success: false,
                error: 'Quantity must be a whole number from 1 to 10',
            }, { status: 400 });
        }

        // Find product — static data first for accurate pricing
        let product: Record<string, unknown> | null = null;
        const requestedSlug = sanitizeInput(data.slug, 150) || undefined;
        const requestedSku = sanitizeInput(data.sku, 70) || undefined;
        const identifier = requestedSlug || requestedSku || '';

        // Static catalog is the price source of truth
        const staticLookup = findStaticProductReference({ slug: requestedSlug, sku: requestedSku });
        if (staticLookup.ambiguousSlugs.length) {
            return NextResponse.json({
                success: false,
                error: 'SKU matches more than one catalog product; submit the product slug',
                matchingSlugs: staticLookup.ambiguousSlugs,
            }, { status: 409 });
        }

        const staticMatch = staticLookup.product;
        if (staticMatch) {
            product = { id: `static_${staticMatch.slug}`, ...staticMatch } as unknown as Record<string, unknown>;
        }

        // Fallback: try Firestore if not found in static data
        if (!product) {
            try {
                const doc = await db.collection('products').doc(identifier).get();
                if (doc.exists && doc.data()?.status === 'active') {
                    product = { id: doc.id, ...doc.data() };
                }

                if (!product && requestedSku) {
                    const snapshot = await db.collection('products')
                        .where('sku', '==', requestedSku)
                        .where('status', '==', 'active')
                        .limit(3)
                        .get();
                    if (snapshot.size > 1) {
                        return NextResponse.json({
                            success: false,
                            error: 'SKU matches more than one catalog product; submit the product slug',
                            matchingSlugs: snapshot.docs.map(doc => String(doc.data().slug || doc.id)),
                        }, { status: 409 });
                    }
                    if (!snapshot.empty) {
                        product = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
                    }
                }
            } catch {
                // Firestore unavailable — continue with what we have
            }
        }

        if (!product) {
            return NextResponse.json({
                success: false,
                error: `Product not found: ${identifier}`,
            }, { status: 404 });
        }

        const stock = Number(product.stock) || 0;
        if (stock <= 0) {
            return NextResponse.json({
                success: false,
                error: 'Product is out of stock',
                product: {
                    slug: product.slug,
                    stock: 0,
                },
            }, { status: 409 });
        }

        const normalizedPhone = String(data.phone).replace(/[^0-9+]/g, '').slice(0, 20);
        if (!/^(?:\+?20|0)?1[0125]\d{8}$/.test(normalizedPhone)) {
            return NextResponse.json({
                success: false,
                error: 'A valid Egyptian mobile number is required',
            }, { status: 400 });
        }

        const price = Number(product.price) || 0;
        const totalProducts = price * quantity;
        const shippingFee = getShippingFee(city, totalProducts);
        const totalAmount = totalProducts + shippingFee;

        const translations = product.translations as Record<string, Record<string, string>> | undefined;

        // Generate order ID
        const orderId = `CV-${randomUUID().slice(0, 8).toUpperCase()}`;

        const orderData = {
            orderId,
            source: 'm2m_checkout',
            customerName: sanitizeInput(data.customerName, 100),
            phone: normalizedPhone,
            whatsapp: String(data.whatsapp || data.phone).replace(/[^0-9+]/g, '').slice(0, 20),
            address: sanitizeInput(data.address, 300),
            city,
            items: [{
                productId: product.id,
                sku: product.sku || product.slug,
                slug: product.slug,
                name: translations?.ar?.name || translations?.en?.name || product.slug,
                price: price,
                quantity: quantity,
            }],
            shippingFee: shippingFee,
            totalAmount: totalAmount,
            status: 'pending',
            paymentMethod: 'cod',
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        const docRef = await db.collection('orders').add(orderData);

        // ═══ Google Sheets sync — BEFORE response (critical business data) ═══
        // Moved from after() because Firebase App Hosting (Cloud Run) may kill
        // the container before deferred callbacks complete, causing silent data loss.
        // Sheets + CRM بالتوازي — كلاهما fail-open ولا يؤخر أحدهما الآخر
        await Promise.all([
            safeAppendOrderToSheet({ ...orderData, id: docRef.id }),
            safeSendLeadToCRM({ ...orderData, id: docRef.id }),
        ]);

        return NextResponse.json({
            success: true,
            order: {
                id: docRef.id,
                orderId: orderId,
                status: 'pending',
                items: [{
                    name: translations?.en?.name || product.slug,
                    nameAr: translations?.ar?.name || '',
                    sku: product.sku || product.slug,
                    price: price,
                    quantity: quantity,
                }],
                pricing: {
                    subtotal: totalProducts,
                    shipping: shippingFee,
                    total: totalAmount,
                    currency: 'EGP',
                },
                delivery: {
                    estimatedDays: { min: 1, max: 5 },
                    address: data.address,
                    city: data.city,
                },
                payment: {
                    method: 'cash_on_delivery',
                    note: 'Pay on delivery',
                },
            },
            tracking: {
                whatsapp: 'https://wa.me/201558245974',
                phone: '+201558245974',
            },
        });

    } catch (error) {
        console.error('M2M Checkout POST error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to place order',
        }, { status: 500 });
    }
}
