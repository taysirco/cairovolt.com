import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { staticProducts } from '@/lib/static-products';

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
            const snapshot = await db.collection('products')
                .where('slug', '==', slug)
                .limit(1)
                .get();
            if (!snapshot.empty) {
                product = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
            }
        } else if (search) {
            // Search across all products — client-side filter (Firestore has no full-text search)
            const snapshot = await db.collection('products').get();
            const searchLower = search.toLowerCase();
            for (const doc of snapshot.docs) {
                const data = doc.data();
                const translations = data.translations as Record<string, Record<string, string>> | undefined;
                const enName = translations?.en?.name?.toLowerCase() || '';
                const arName = translations?.ar?.name || '';
                const productSlug = (data.slug as string)?.toLowerCase() || '';

                if (enName.includes(searchLower) || arName.includes(search) || productSlug.includes(searchLower)) {
                    product = { id: doc.id, ...data };
                    break;
                }
            }
        }

        // Fallback to static data
        if (!product) {
            const staticMatch = staticProducts.find(p => {
                if (sku) return p.sku === sku;
                if (slug) return p.slug === slug;
                if (search) {
                    const s = search.toLowerCase();
                    return p.translations.en.name.toLowerCase().includes(s) ||
                        p.translations.ar.name.includes(search) ||
                        p.slug.toLowerCase().includes(s);
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
        let snapshot = await db.collection('products')
            .where('sku', '==', identifier)
            .limit(1)
            .get();

        if (snapshot.empty) {
            // Try by slug
            snapshot = await db.collection('products')
                .where('slug', '==', identifier)
                .limit(1)
                .get();
        }

        if (!snapshot.empty) {
            product = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        } else {
            // Fallback: static data
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
            customerName: data.customerName,
            phone: data.phone,
            whatsapp: data.whatsapp || data.phone,
            address: data.address,
            city: data.city,
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
                whatsapp: 'https://wa.me/201063374834',
                phone: '+201063374834',
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
