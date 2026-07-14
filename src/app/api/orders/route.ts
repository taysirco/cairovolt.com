import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { safeAppendOrderToSheet } from '@/lib/google-sheets';
import { safeSendLeadToCRM } from '@/lib/crm';
import { validateApiKey } from '@/lib/api-auth';
import { sendTtqOrderEvent } from '@/lib/tiktokEventsApi';
import { getShippingFee } from '@/lib/shipping';
import { staticProducts, getProductBySlug, resolveCatalogPricing } from '@/lib/static-products';

// 🧬 بصمة SKU من الكتالوج — شبكة أمان خادمية: تعوّض أي قطعة سلة بلا sku
// (سلال قديمة في localStorage قبل حقل sku، أو مسار الإضافة السريعة بالصفحة الرئيسية
// الذي لا يحمل sku). تصل البصمة لكلا القناتين (ويبهوك + شيت) اللتين تستقبلان orderData.
function resolveItemSku(item: any): string {
    if (item?.sku) return String(item.sku);
    const pid = String(item?.productId || '');
    const slug = String(item?.slug || pid.replace(/^static_/, ''));
    const bySlug = slug ? getProductBySlug(slug) : undefined;
    if (bySlug?.sku) return bySlug.sku;
    const bySku = staticProducts.find(p => p.sku === slug || p.sku === pid);
    return bySku?.sku || '';
}

// ═══════════ Server-side Coupon Validation ═══════════
const SERVER_VALID_COUPONS: Record<string, number> = {
    'ORIGINAL10': 0.10, // 10% discount
    'SALARY10': 0.10,   // 🗓️ حملة يوم المرتب الشهرية (واتساب) — صالح من 29 حتى 5 فقط (انظر isCouponActive)
};

// كوبونات موسمية بنافذة زمنية: SALARY10 يعمل من يوم 29 حتى يوم 5 من الشهر التالي
// (بتوقيت القاهرة) — خارجها يُعامل ككود غير صالح فيُعاد الحساب بلا خصم.
function isCouponActive(code: string): boolean {
    if (code !== 'SALARY10') return true;
    const day = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', day: 'numeric' }).format(new Date()));
    return day >= 29 || day <= 5;
}

// Defense-in-depth: sanitize user-submitted text before storing
function sanitizeInput(input: unknown, maxLength = 500): string {
    if (typeof input !== 'string') return '';
    return input
        .replace(/<[^>]*>/g, '')          // Strip HTML tags
        .replace(/[<>"'&]/g, '')          // Remove dangerous chars
        .replace(/javascript\s*:/gi, '')  // Block JS injection
        .trim()
        .slice(0, maxLength);
}

// Validate Egyptian phone number format server-side
function isValidEgyptianPhone(phone: string): boolean {
    return /^01[0125][0-9]{8}$/.test(phone);
}

export async function POST(req: NextRequest) {
    let db;
    try {
        db = await getFirestore();
    } catch (initError: unknown) {
        console.error('Firestore init failed in orders route:', initError);
        return NextResponse.json({
            error: 'Service Unavailable: Database initialization failed',
        }, { status: 503 });
    }

    try {
        const data = await req.json();

        // Validate required fields
        if (!data.customerName || !data.phone || !data.address || !data.city || !data.items?.length) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Sanitize and validate phone
        const cleanPhone = String(data.phone).replace(/[^0-9]/g, '');
        if (!isValidEgyptianPhone(cleanPhone)) {
            return NextResponse.json({ error: 'Invalid Egyptian phone number. Must start with 01 and be 11 digits.' }, { status: 400 });
        }

        // Generate readable Order ID (e.g., CV-1706543)
        const orderId = `CV-${Math.floor(Date.now() / 1000).toString().slice(-6)}`;

        const orderData = {
            orderId,
            source: 'website',
            customerName: sanitizeInput(data.customerName, 100),
            phone: cleanPhone,
            whatsapp: sanitizeInput(data.whatsapp || data.phone, 20).replace(/[^0-9]/g, '') || cleanPhone,
            address: sanitizeInput(data.address, 300),
            city: sanitizeInput(data.city, 50),
            cityLabel: sanitizeInput(data.cityLabel, 50) || null,
            items: Array.isArray(data.items) ? data.items.slice(0, 20) : [], // Cap at 20 items
            totalAmount: typeof data.totalAmount === 'number' ? data.totalAmount : 0,
            couponCode: null as string | null,
            couponDiscount: 0,
            subtotalBeforeDiscount: 0,
            shippingFee: 0,
            status: 'pending',
            paymentMethod: 'cod',
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        // ═══ فرض سعر الكتالوج — المصدر الوحيد للحقيقة (NEVER trust client) ═══
        // العميل يرسل السعر من سلة localStorage/صفحة مكاشة قد تكون قديمة (مثال
        // مؤكَّد: قلم أنكر 1049 القديم بدل 1199)، أو قد يكون طلباً مُلفَّقاً (المنفذ
        // غير محمي). نستبدل سعر كل قطعة بسعر موثوق ولا نثق بسعر العميل إطلاقاً:
        //   ok               → سعر الكتالوج الثابت (بالـslug الثابت، لا الـsku المتغيّر).
        //   variant-unresolved → رفض 400 (متغيّر غير محدَّد — لا يحدث في سلة حقيقية).
        //   unknown          → منتج Firestore: نأخذ سعره من Firestore؛ وإلا رفض 400.
        const pricedItems: any[] = [];
        for (const it of orderData.items) {
            const res = resolveCatalogPricing(it);
            const clientPrice = typeof it.price === 'number' ? it.price : null;

            if (res.status === 'ok') {
                if (clientPrice !== null && clientPrice !== res.price) {
                    console.warn(`[Orders] 💲 سعر قديم صُحِّح من الكتالوج: "${it.name || ''}" ${clientPrice} → ${res.price} | ${orderId}`);
                }
                const priced: any = { ...it, price: res.price, sku: res.sku || resolveItemSku(it) };
                delete priced.originalPrice; // لا نثق بـoriginalPrice العميل
                if (res.originalPrice !== undefined) priced.originalPrice = res.originalPrice;
                pricedItems.push(priced);
                continue;
            }

            if (res.status === 'variant-unresolved') {
                console.warn(`[Orders] 🚫 متغيّر غير محدَّد للمنتج ${res.slug} — رفض | pid=${it.productId || 'N/A'}`);
                return NextResponse.json({ error: 'يجب اختيار خيار المنتج (السعة/الموديل) قبل الطلب.' }, { status: 400 });
            }

            // unknown — منتج ليس في الكتالوج الثابت: نبحث عنه في Firestore بسعره الموثوق
            const slug = res.candidateSlug;
            let resolvedFromFirestore = false;
            if (slug) {
                try {
                    const doc = await db.collection('products').doc(slug).get();
                    if (doc.exists) {
                        const fp: any = doc.data() || {};
                        const fPrice = Number(fp.price);
                        if (Number.isFinite(fPrice) && fPrice > 0) {
                            if (clientPrice !== null && clientPrice !== fPrice) {
                                console.warn(`[Orders] 💲 سعر Firestore فُرض: "${it.name || ''}" ${clientPrice} → ${fPrice} | ${orderId}`);
                            }
                            const priced: any = { ...it, price: fPrice, sku: fp.sku || resolveItemSku(it) };
                            delete priced.originalPrice;
                            const fOrig = Number(fp.originalPrice);
                            if (Number.isFinite(fOrig) && fOrig > 0) priced.originalPrice = fOrig;
                            pricedItems.push(priced);
                            resolvedFromFirestore = true;
                        }
                    }
                } catch (e) {
                    console.error(`[Orders] Firestore price lookup failed for "${slug}":`, e);
                }
            }
            if (!resolvedFromFirestore) {
                console.warn(`[Orders] 🚫 منتج غير معروف — رفض الطلب: "${it.name || ''}" pid=${it.productId || 'N/A'} slug=${slug || 'N/A'} | ${orderId}`);
                return NextResponse.json({ error: 'منتج غير معروف في الطلب. حدّث الصفحة وأعد المحاولة.' }, { status: 400 });
            }
        }
        orderData.items = pricedItems;

        // المجموع من الأسعار المصحّحة (لا من قيم العميل)
        const serverSubtotal = orderData.items.reduce((sum: number, item: any) => {
            const price = typeof item.price === 'number' ? item.price : 0;
            const qty = typeof item.quantity === 'number' ? item.quantity : 1;
            return sum + (price * qty);
        }, 0);

        orderData.subtotalBeforeDiscount = serverSubtotal;

        // Server-side coupon verification — never trust client-side calculations
        if (data.couponCode && typeof data.couponCode === 'string') {
            const code = data.couponCode.trim().toUpperCase();
            const serverRate = SERVER_VALID_COUPONS[code];
            if (serverRate && isCouponActive(code)) {
                const serverDiscount = Math.round(serverSubtotal * serverRate);
                const subtotalAfterDiscount = serverSubtotal - serverDiscount;
                const shipping = getShippingFee(data.city, subtotalAfterDiscount);

                orderData.couponCode = code;
                orderData.couponDiscount = serverDiscount;
                orderData.shippingFee = shipping;
                orderData.totalAmount = subtotalAfterDiscount + shipping;
            } else {
                // Invalid coupon code — recalculate total without discount
                const shipping = getShippingFee(data.city, serverSubtotal);
                orderData.shippingFee = shipping;
                orderData.totalAmount = serverSubtotal + shipping;
            }
        } else {
            // No coupon — recalculate total from server subtotal
            const shipping = getShippingFee(data.city, serverSubtotal);
            orderData.shippingFee = shipping;
            orderData.totalAmount = serverSubtotal + shipping;
        }

        // 🧬 حارس بصمة SKU للقطعة الرئيسية (الأعلى قيمة) — الأسعار والـsku
        // ضُبطت بالفعل أعلاه من الكتالوج؛ هنا تحذير فقط لو بقيت بلا sku.
        const primaryItem = orderData.items.length
            ? [...orderData.items].sort((a: any, b: any) =>
                ((b.price || 0) * (b.quantity || 1)) - ((a.price || 0) * (a.quantity || 1)))[0]
            : null;
        if (primaryItem && !primaryItem.sku) {
            console.warn(`[Orders] ⚠️ بصمة SKU مفقودة للقطعة الرئيسية — orderId=${orderId} | "${primaryItem.name || ''}" | productId=${primaryItem.productId || 'N/A'}`);
        }

        const docRef = await db.collection('orders').add(orderData);

        // ═══ Google Sheets sync — BEFORE response (critical business data) ═══
        // Moved from after() because Firebase App Hosting (Cloud Run) may kill
        // the container before deferred callbacks complete, causing silent data loss.
        // Sheets + CRM بالتوازي — كلاهما fail-open ولا يؤخر أحدهما الآخر
        await Promise.all([
            safeAppendOrderToSheet({ ...orderData, id: docRef.id }),
            safeSendLeadToCRM({ ...orderData, id: docRef.id }),
        ]);

        // TikTok S2S stays deferred — it's analytics, not business-critical
        const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
        const clientUA = req.headers.get('user-agent') || '';

        after(async () => {
            try {
                await sendTtqOrderEvent(
                    orderId,
                    Array.isArray(data.items) ? data.items.slice(0, 20) : [],
                    orderData.totalAmount,
                    cleanPhone,
                    clientIp,
                    clientUA,
                );
            } catch (ttqError) {
                console.error('TikTok S2S event failed (deferred):', ttqError);
            }
        });

        return NextResponse.json({
            id: docRef.id,
            orderId: orderId,
            message: 'Order placed successfully'
        });
    } catch (error: unknown) {
        console.error('Error creating order:', error);
        return NextResponse.json({
            error: 'Failed to create order',
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const authError = validateApiKey(req);
    if (authError) return authError;

    const db = await getFirestore();

    try {
        const snapshot = await db.collection('orders').orderBy('createdAt', 'desc').get();
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return NextResponse.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
