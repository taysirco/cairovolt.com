import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import crypto from 'crypto';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { safeAppendOrderToSheet } from '@/lib/google-sheets';
import { safeSendLeadToCRM } from '@/lib/crm';
import { validateApiKey } from '@/lib/api-auth';
import { sendTtqOrderEvent } from '@/lib/tiktokEventsApi';
import { getShippingFee } from '@/lib/shipping';
import { validateCoupon, computeDiscount } from '@/lib/coupons';
import {
    staticProducts,
    getProductBySlug,
    getSmartBundleProducts,
    resolveCatalogPricing,
} from '@/lib/static-products';
import { BUNDLE_DISCOUNT_PERCENT } from '@/lib/bundle-policy';
import { checkRateLimit } from '@/lib/rate-limit';
import { governorates } from '@/data/governorates';
import { normalizeEgyptianPhone, isValidEgyptianPhone } from '@/lib/egyptian-phone';
import { getClientIp } from '@/lib/request-ip';

const MAX_ORDER_BODY_BYTES = 128 * 1024;
const MAX_ORDER_ITEMS = 20;
const MAX_TOTAL_UNITS = 50;
const VALID_CITY_SLUGS = new Set(governorates.map(governorate => governorate.slug));

interface NormalizedOrderItem {
    productId: string;
    slug?: string;
    sku?: string;
    name: string;
    brand?: string;
    image?: string;
    bundleId?: string;
    quantity: number;
    price: number;
}

// Firestore rejects object properties whose value is undefined. Cart fields
// such as bundleId, image, or sku are optional, so omit those properties
// instead of persisting them as `undefined`.
function omitUndefinedFields<T extends object>(value: T): T {
    return Object.fromEntries(
        Object.entries(value).filter(([, fieldValue]) => fieldValue !== undefined),
    ) as T;
}

// Resolve a missing SKU from the server-side catalog for downstream systems.
function resolveItemSku(item: { sku?: unknown; productId?: unknown; slug?: unknown }): string {
    if (item?.sku) return String(item.sku);
    const pid = String(item?.productId || '');
    const slug = String(item?.slug || pid.replace(/^static_/, ''));
    const bySlug = slug ? getProductBySlug(slug) : undefined;
    if (bySlug?.sku) return bySlug.sku;
    const bySku = staticProducts.find(p => p.sku === slug || p.sku === pid);
    return bySku?.sku || '';
}

// Defense-in-depth: sanitize user-submitted text before storing
function sanitizeInput(input: unknown, maxLength = 500): string {
    if (typeof input !== 'string') return '';
    return input
        .replace(/<[^>]*>/g, '')          // Strip HTML tags
        .replace(/[<>"'&]/g, '')          // Remove dangerous chars
        .replace(/javascript\s*:/gi, '')  // Block JS injection
        .replace(/[\u0000-\u001F\u007F]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, maxLength);
}


export async function POST(req: NextRequest) {
    const ip = getClientIp(req.headers);
    const rateCheck = checkRateLimit(`orders:${ip}`, true);
    if (!rateCheck.allowed) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again shortly.' },
            { status: 429, headers: { 'Retry-After': '60' } },
        );
    }

    const declaredLength = Number(req.headers.get('content-length') || 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_ORDER_BODY_BYTES) {
        return NextResponse.json({ error: 'Request payload is too large' }, { status: 413 });
    }

    try {
        const rawBody = await req.text();
        if (Buffer.byteLength(rawBody, 'utf8') > MAX_ORDER_BODY_BYTES) {
            return NextResponse.json({ error: 'Request payload is too large' }, { status: 413 });
        }

        let parsedData: unknown;
        try {
            parsedData = JSON.parse(rawBody);
        } catch {
            return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
        }

        // Validate required fields
        if (!parsedData || typeof parsedData !== 'object' || Array.isArray(parsedData)) {
            return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
        }
        const data = parsedData as Record<string, unknown>;
        if (
            !data.customerName || !data.phone || !data.address || !data.city
            || !Array.isArray(data.items) || data.items.length === 0) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        if (data.items.length > MAX_ORDER_ITEMS) {
            return NextResponse.json({ error: `Orders are limited to ${MAX_ORDER_ITEMS} items` }, { status: 400 });
        }

        // Sanitize and validate phone
        const cleanPhone = normalizeEgyptianPhone(data.phone);
        if (!isValidEgyptianPhone(cleanPhone)) {
            return NextResponse.json({ error: 'Invalid Egyptian phone number. Must start with 01 and be 11 digits.' }, { status: 400 });
        }

        const rawItems = data.items as unknown[];
        const invalidQuantity = rawItems.some((item: unknown) => {
            if (!item || typeof item !== 'object') return true;
            const rawQuantity = (item as { quantity?: unknown }).quantity;
            if (rawQuantity !== undefined && typeof rawQuantity !== 'number') return true;
            const quantity = Number(rawQuantity ?? 1);
            return !Number.isInteger(quantity) || quantity < 1 || quantity > 10;
        });
        if (invalidQuantity) {
            return NextResponse.json({ error: 'Invalid item quantity.' }, { status: 400 });
        }
        const typedRawItems = rawItems as Array<Record<string, unknown> & { quantity?: number }>;
        const totalUnits = rawItems.reduce(
            (sum: number, item) => sum + Number((item as { quantity?: number }).quantity ?? 1),
            0,
        );
        if (totalUnits > MAX_TOTAL_UNITS) {
            return NextResponse.json({ error: `Orders are limited to ${MAX_TOTAL_UNITS} total units` }, { status: 400 });
        }

        const customerName = sanitizeInput(data.customerName, 100);
        const address = sanitizeInput(data.address, 300);
        const city = sanitizeInput(data.city, 50);
        const whatsapp = normalizeEgyptianPhone(data.whatsapp || data.phone);
        if (customerName.length < 2 || address.length < 5 || !VALID_CITY_SLUGS.has(city)) {
            return NextResponse.json({ error: 'Invalid order details' }, { status: 400 });
        }
        if (!isValidEgyptianPhone(whatsapp)) {
            return NextResponse.json({ error: 'Invalid WhatsApp number' }, { status: 400 });
        }

        // Keep order identifiers readable while preventing timestamp collisions.
        const orderId = `CV-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

        // Persist only the cart fields needed by the order workflow. Prices are
        // replaced from the server-side catalog below.
        const normalizedItems: NormalizedOrderItem[] = typedRawItems.map(raw => omitUndefinedFields({
            productId: sanitizeInput(raw.productId, 180),
            slug: sanitizeInput(raw.slug, 180) || undefined,
            sku: sanitizeInput(raw.sku, 80) || undefined,
            name: sanitizeInput(raw.name, 180),
            brand: sanitizeInput(raw.brand, 60) || undefined,
            image: sanitizeInput(raw.image, 300) || undefined,
            bundleId: sanitizeInput(raw.bundleId, 200) || undefined,
            quantity: Number(raw.quantity ?? 1),
            price: 0,
        }));
        if (normalizedItems.some(item =>
            !item.name || (!item.productId && !item.slug && !item.sku))) {
            return NextResponse.json({ error: 'Invalid item details' }, { status: 400 });
        }

        const orderData = {
            orderId,
            source: 'website',
            customerName,
            phone: cleanPhone,
            whatsapp,
            address,
            city,
            cityLabel: sanitizeInput(data.cityLabel, 50) || null,
            items: normalizedItems,
            totalAmount: typeof data.totalAmount === 'number' ? data.totalAmount : 0,
            couponCode: null as string | null,
            couponDiscount: 0,
            bundleDiscount: 0,
            subtotalBeforeDiscount: 0,
            shippingFee: 0,
            status: 'pending',
            paymentMethod: 'cod',
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        let db;
        try {
            db = await getFirestore();
        } catch {
            console.error('Orders database initialization failed');
            return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 });
        }

        // Replace client-provided prices with the authoritative server catalog.
        const pricedItems: NormalizedOrderItem[] = [];
        for (const it of orderData.items) {
            const res = resolveCatalogPricing(it);

            if (res.status === 'ok') {
                const catalogProduct = getProductBySlug(res.slug);
                if (!catalogProduct) {
                    return NextResponse.json({ error: 'منتج غير معروف في الطلب. حدّث الصفحة وأعد المحاولة.' }, { status: 400 });
                }
                const catalogVariant = res.variantId
                    ? catalogProduct.variants?.find(variant => variant.id === res.variantId)
                    : undefined;
                const primaryImage = catalogProduct.images.find(image => image.isPrimary)?.url
                    || catalogProduct.images[0]?.url;
                const baseName = catalogProduct.translations.ar.name
                    || catalogProduct.translations.en.name
                    || catalogProduct.slug;
                const authoritativeName = catalogVariant
                    ? `${baseName} — ${catalogVariant.model} (${catalogVariant.capacity})`
                    : baseName;
                const priced: NormalizedOrderItem = omitUndefinedFields({
                    productId: `static_${catalogProduct.slug}${catalogVariant ? `_${catalogVariant.id}` : ''}`,
                    slug: catalogProduct.slug,
                    sku: res.sku || resolveItemSku({ productId: `static_${catalogProduct.slug}` }),
                    name: authoritativeName,
                    brand: catalogProduct.brand,
                    image: primaryImage,
                    bundleId: it.bundleId,
                    quantity: it.quantity,
                    price: res.price,
                });
                pricedItems.push(priced);
                continue;
            }

            if (res.status === 'variant-unresolved') {
                console.warn('[Orders] A required product variant was not selected.');
                return NextResponse.json({ error: 'يجب اختيار خيار المنتج (السعة/الموديل) قبل الطلب.' }, { status: 400 });
            }

            if (res.status === 'ambiguous') {
                console.warn('[Orders] An ambiguous catalog SKU was rejected.');
                return NextResponse.json({
                    error: 'رمز المنتج يطابق أكثر من منتج. حدّث الصفحة أو أرسل رابط المنتج المحدد.',
                    matchingSlugs: res.slugs,
                }, { status: 400 });
            }

            // Products absent from the static catalog may still have a Firestore record.
            const slug = res.candidateSlug;
            let resolvedFromFirestore = false;
            if (slug) {
                try {
                    const doc = await db.collection('products').doc(slug).get();
                    if (doc.exists) {
                        const fp = (doc.data() || {}) as Record<string, unknown>;
                        const fPrice = Number(fp.price);
                        if (Number.isFinite(fPrice) && fPrice > 0) {
                            const translations = fp.translations && typeof fp.translations === 'object'
                                ? fp.translations as Record<string, Record<string, unknown>>
                                : {};
                            const images = Array.isArray(fp.images) ? fp.images : [];
                            const firstImage = images.find(image =>
                                image && typeof image === 'object' && (image as { isPrimary?: unknown }).isPrimary === true
                            ) || images[0];
                            const imageUrl = firstImage && typeof firstImage === 'object'
                                ? sanitizeInput((firstImage as { url?: unknown }).url, 300)
                                : '';
                            const firestoreName = sanitizeInput(
                                translations.ar?.name || translations.en?.name || slug,
                                180,
                            );
                            const priced: NormalizedOrderItem = omitUndefinedFields({
                                productId: slug,
                                slug,
                                price: fPrice,
                                sku: sanitizeInput(fp.sku, 80) || resolveItemSku(it),
                                name: firestoreName,
                                brand: sanitizeInput(fp.brand, 60) || undefined,
                                image: imageUrl || undefined,
                                bundleId: it.bundleId,
                                quantity: it.quantity,
                            });
                            pricedItems.push(priced);
                            resolvedFromFirestore = true;
                        }
                    }
                } catch {
                    console.error('Catalog price lookup failed');
                }
            }
            if (!resolvedFromFirestore) {
                console.warn('[Orders] An unrecognized catalog item was rejected.');
                return NextResponse.json({ error: 'منتج غير معروف في الطلب. حدّث الصفحة وأعد المحاولة.' }, { status: 400 });
            }
        }
        orderData.items = pricedItems;

        // Calculate the subtotal only from server-resolved prices.
        const serverSubtotal = orderData.items.reduce((sum: number, item) => {
            const price = typeof item.price === 'number' ? item.price : 0;
            const qty = typeof item.quantity === 'number' ? item.quantity : 1;
            return sum + (price * qty);
        }, 0);

        orderData.subtotalBeforeDiscount = serverSubtotal;

        // Apply a bundle discount only when the submitted group exactly matches
        // the server-generated recommendation for its main catalog product.
        let bundleDiscount = 0;
        {
            const groups = new Map<string, NormalizedOrderItem[]>();
            for (const it of pricedItems) {
                const bid = typeof it.bundleId === 'string' ? it.bundleId.slice(0, 200) : '';
                if (!bid) continue;
                const group = groups.get(bid) || [];
                group.push(it);
                groups.set(bid, group);
            }

            for (const [bundleId, items] of groups) {
                const bundleMatch = bundleId.match(/^combo-static_([a-z0-9-]+)$/);
                const mainProduct = bundleMatch ? getProductBySlug(bundleMatch[1]) : undefined;
                const expectedProducts = mainProduct
                    ? [mainProduct, ...getSmartBundleProducts(mainProduct).bundleProducts.map(entry => entry.product)]
                    : [];
                const expectedSlugs = new Set(expectedProducts.map(product => product.slug));
                const actualSlugs = new Set(items.map(item => item.slug).filter(Boolean));
                const validBundle = expectedSlugs.size >= 2
                    && items.length === expectedSlugs.size
                    && items.every(item => item.quantity >= 1 && !!item.slug && expectedSlugs.has(item.slug))
                    && actualSlugs.size === expectedSlugs.size;

                if (!validBundle) {
                    items.forEach(item => { delete item.bundleId; });
                    continue;
                }

                const groupTotal = items.reduce((sum, item) => sum + item.price, 0);
                bundleDiscount += Math.round(groupTotal * BUNDLE_DISCOUNT_PERCENT / 100);
            }
        }

        // Validate coupons server-side before accepting the order total. A
        // coupon problem must NEVER lose the order: for a COD store the customer
        // pays on delivery, so if the code doesn't validate (invalid, expired, OR
        // the coupon service is unreachable), we place the order at full price and
        // record the attempted code so the call center can honor it manually —
        // instead of hard-failing checkout. The confirm page shows the real
        // server total, so nobody is silently overcharged.
        let couponDiscount = 0;
        if (data.couponCode && typeof data.couponCode === 'string') {
            const code = data.couponCode.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '').slice(0, 24);
            let serverDiscount = 0;
            try {
                const verdict = await validateCoupon(code);
                serverDiscount = computeDiscount(verdict, serverSubtotal);
            } catch {
                console.warn('[Orders] Coupon validation errored; placing order without discount.');
            }
            // Always record the attempted code (the call center sees couponCode
            // and can honor it manually); apply the discount only when the server
            // itself confirmed it.
            orderData.couponCode = code;
            couponDiscount = serverDiscount > 0 ? serverDiscount : 0;
        }

        // Prevent discounts from making the subtotal negative.
        if (couponDiscount + bundleDiscount > serverSubtotal) {
            bundleDiscount = Math.max(0, serverSubtotal - couponDiscount);
        }
        const subtotalAfterDiscount = serverSubtotal - couponDiscount - bundleDiscount;
        const shipping = getShippingFee(orderData.city, subtotalAfterDiscount);
        orderData.couponDiscount = couponDiscount;
        orderData.bundleDiscount = bundleDiscount;
        orderData.shippingFee = shipping;
        orderData.totalAmount = subtotalAfterDiscount + shipping;

        // Report a missing primary SKU without logging customer or order data.
        const primaryItem = orderData.items.length
            ? [...orderData.items].sort((a, b) =>
                ((b.price || 0) * (b.quantity || 1)) - ((a.price || 0) * (a.quantity || 1)))[0]
            : null;
        if (primaryItem && !primaryItem.sku) {
            console.warn('[Orders] Primary catalog item is missing an SKU.');
        }

        const docRef = await db.collection('orders').add(orderData);

        // Complete the business-system synchronization before returning a response.
        await Promise.all([
            safeAppendOrderToSheet({ ...orderData, id: docRef.id }),
            safeSendLeadToCRM({ ...orderData, id: docRef.id }),
        ]);

        // TikTok S2S stays deferred — it's analytics, not business-critical
        const clientIp = ip === 'unknown' ? '' : ip;
        const clientUA = req.headers.get('user-agent') || '';

        after(async () => {
            try {
                await sendTtqOrderEvent(
                    orderId,
                    orderData.items,
                    orderData.totalAmount,
                    cleanPhone,
                    clientIp,
                    clientUA,
                );
            } catch {
                console.error('TikTok order event delivery failed');
            }
        });

        return NextResponse.json({
            id: docRef.id,
            orderId: orderId,
            message: 'Order placed successfully',
            items: orderData.items,
            pricing: {
                subtotalBeforeDiscount: orderData.subtotalBeforeDiscount,
                couponDiscount: orderData.couponDiscount,
                bundleDiscount: orderData.bundleDiscount,
                shippingFee: orderData.shippingFee,
                totalAmount: orderData.totalAmount,
            },
        });
    } catch {
        console.error('Order creation failed');
        return NextResponse.json({
            error: 'Failed to create order',
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const authError = validateApiKey(req);
    if (authError) return authError;

    try {
        const db = await getFirestore();
        const snapshot = await db.collection('orders').orderBy('createdAt', 'desc').get();
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return NextResponse.json(orders, { headers: { 'Cache-Control': 'no-store' } });
    } catch {
        console.error('Order retrieval failed');
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
