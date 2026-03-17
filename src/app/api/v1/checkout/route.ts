import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { staticProducts } from '@/lib/static-products';
import { appendOrderToSheet } from '@/lib/google-sheets';

/**
 * M2M Checkout API — Simplified endpoint for AI agents & programmatic commerce
 * 
 * Flow:
 *   1. GET  /api/v1/checkout?sku=XXX          → Price + availability check
 *   2. POST /api/v1/checkout { sku, qty, ... } → Place order atomically
 * 
 * This endpoint is designed for:
 *   - Smart assistants (Siri, Google Assistant, Alexa)
 *   - AI agents (ChatGPT, Gemini, Claude)
 *   - IoT devices (smartwatches, smart speakers)
 *   - Third-party integrations
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
        .replace(/سوندكور/gi, 'soundcore');
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
        // Try Firestore first
        const db = await getFirestore();
        let product: Record<string, unknown> | null = null;

        if (sku) {
            const snapshot = await db.collection('products')
                .where('sku', '==', sku)
                .limit(1)
                .get();
            if (!snapshot.empty) {
                product = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
            }
        } else if (slug) {
            // Direct doc lookup — O(1) since slug = doc ID
            const doc = await db.collection('products').doc(slug).get();
            if (doc.exists) {
                product = { id: doc.id, ...doc.data() };
            }
        } else if (search) {
            product = await smartSearch(search, db);
        }

        // Fallback to static data
        if (!product) {
            const staticMatch = staticProducts.find(p => {
                if (sku) return p.sku === sku;
                if (slug) return p.slug === slug;
                if (search) {
                    return scoreProduct({
                        enName: p.translations.en.name,
                        arName: p.translations.ar.name,
                        slug: p.slug,
                        sku: p.sku || '',
                        features: p.translations.en.features?.join(' ') || '',
                    }, search) > 0;
                }
                return false;
            });

            if (staticMatch) {
                product = { id: `static_${staticMatch.slug}`, ...staticMatch } as unknown as Record<string, unknown>;
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
        const originalPrice = product.originalPrice ? Number(product.originalPrice) : null;

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
                    originalPrice: originalPrice,
                    discount: originalPrice && originalPrice > price
                        ? Math.round((1 - price / originalPrice) * 100)
                        : null,
                },
                stock: stock,
                image: primaryImage ? `https://cairovolt.com${primaryImage}` : null,
                url: `https://cairovolt.com/${(product.brand as string || '').toLowerCase()}/${product.categorySlug}/${product.slug}`,
            },
            shipping: {
                fee: price >= 500 ? 0 : 40,
                currency: 'EGP',
                freeAbove: 500,
                estimatedDays: { min: 1, max: 5 },
            },
            payment: {
                methods: ['cash_on_delivery'],
                note: 'Pay after inspection — no prepayment required',
            },
            actions: {
                buy: {
                    method: 'POST',
                    url: 'https://cairovolt.com/api/v1/checkout',
                    body: {
                        sku: product.sku || product.slug,
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

        // Find product
        let product: Record<string, unknown> | null = null;
        const identifier = data.sku || data.slug;

        // Try by SKU first
        const snapshot = await db.collection('products')
            .where('sku', '==', identifier)
            .limit(1)
            .get();

        if (!snapshot.empty) {
            product = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        }

        // Try by slug — direct doc lookup (O(1))
        if (!product) {
            const doc = await db.collection('products').doc(identifier).get();
            if (doc.exists) {
                product = { id: doc.id, ...doc.data() };
            }
        }

        // Fallback: static data
        if (!product) {
            const staticMatch = staticProducts.find(p => p.sku === identifier || p.slug === identifier);
            if (staticMatch) {
                product = { id: `static_${staticMatch.slug}`, ...staticMatch } as unknown as Record<string, unknown>;
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

        const quantity = Math.max(1, Number(data.quantity) || 1);
        const price = Number(product.price) || 0;
        const totalProducts = price * quantity;
        const shippingFee = totalProducts >= 500 ? 0 : 40;
        const totalAmount = totalProducts + shippingFee;

        const translations = product.translations as Record<string, Record<string, string>> | undefined;

        // Generate order ID
        const orderId = `CV-${Math.floor(Date.now() / 1000).toString().slice(-6)}`;

        const orderData = {
            orderId,
            source: 'm2m_checkout',
            customerName: sanitizeInput(data.customerName, 100),
            phone: String(data.phone).replace(/[^0-9+]/g, '').slice(0, 20),
            whatsapp: String(data.whatsapp || data.phone).replace(/[^0-9+]/g, '').slice(0, 20),
            address: sanitizeInput(data.address, 300),
            city: sanitizeInput(data.city, 50),
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

        // Defer Google Sheets sync to AFTER the response is sent
        after(async () => {
            try {
                await appendOrderToSheet({
                    ...orderData,
                    id: docRef.id,
                });
            } catch (sheetError) {
                console.error('M2M Checkout: Failed to sync with Google Sheet:', sheetError);
            }
        });

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
                    note: 'Pay after inspection',
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
