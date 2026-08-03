import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import {
    extractSerialVariable,
    generateWarrantyCode,
    getProductName,
    isValidSerialFormat,
    reconstructSerial,
} from '@/lib/serial-generator';
import { FieldValue } from 'firebase-admin/firestore';
import { getClientIp } from '@/lib/request-ip';
import { isKnownProductId, resolveWarrantyMonths } from '@/lib/warranty-months';
import { addCalendarMonths } from '@/lib/warranty-policy';

// In-memory rate limiter for verify endpoint.
// 12/ساعة: مسار التفعيل صار خطوتين (استعلام ثم تفعيل بالمنتج المحدد) —
// الحد القديم 5 كان يحرق نصف حصة العميل في تفعيل واحد سليم.
const verifyRateStore = new Map<string, { count: number; resetAt: number }>();
const VERIFY_LIMIT = 12;
const VERIFY_WINDOW = 60 * 60 * 1000; // 1 hour

// 🩹 كشف تسميم «14 يوماً»: كود الإطلاق (أبريل→17 يوليو 2026) كتب مدة نافذة
// الإرجاع مكان مدة الضمان حرفياً، فحمل 106 سجلاً مفعّلاً «ضماناً» ينتهي بعد
// أسبوعين. الكشف بنيوي (فرق ≤ 16 يوماً بلا warrantyDurationMonths) فلا يلزم
// ترحيل بيانات — السجل يُشفى ذاتياً عند أول زيارة تالية لصاحبه.
const CORRUPTED_WINDOW_MS = 16 * 24 * 60 * 60 * 1000;

function checkVerifyRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = verifyRateStore.get(ip);
    if (!entry || now > entry.resetAt) {
        verifyRateStore.set(ip, { count: 1, resetAt: now + VERIFY_WINDOW });
        return true;
    }
    entry.count++;
    return entry.count <= VERIFY_LIMIT;
}

function toMillis(value: unknown): number | null {
    const v = value as { toMillis?: () => number; toDate?: () => Date } | string | null | undefined;
    if (!v) return null;
    if (typeof v === 'object' && typeof v.toMillis === 'function') return v.toMillis();
    if (typeof v === 'object' && typeof v.toDate === 'function') return v.toDate().getTime();
    const parsed = Date.parse(String(v));
    return Number.isFinite(parsed) ? parsed : null;
}

function toIso(value: unknown): string | null {
    const ms = toMillis(value);
    return ms === null ? null : new Date(ms).toISOString();
}

/**
 * Discovery document for the serial-verification endpoint.
 *
 * robots.txt Allows /api/verify to both the general and the AI-crawler group —
 * it is part of the machine-readable API surface alongside /api/products and
 * /api/openapi.json. Verification itself stays on POST; GET performs no lookup
 * and consumes no rate-limit budget.
 */
export function GET() {
    return NextResponse.json({
        name: 'CairoVolt warranty serial check',
        method: 'POST',
        contentType: 'application/json',
        requestBody: {
            serial: 'string — the serial printed on the CairoVolt warranty card',
            productId: 'string (optional) — store product slug; required to activate a universal card',
        },
        rateLimit: `${VERIFY_LIMIT} requests per hour per IP`,
        verificationScope:
            'Confirms a CairoVolt-issued serial and warranty record; does not certify manufacturer authenticity.',
        responseFields: ['valid', 'recordFound', 'recordIssuer', 'verificationScope', 'alreadyActivated',
            'needsProduct', 'productId', 'productName', 'productNameEn', 'warrantyCode', 'activatedAt',
            'warrantyExpiresAt', 'warrantyDurationMonths', 'warrantyTermsUrl'],
        errorCodes: ['invalid_request', 'invalid_format', 'invalid_product', 'serial_not_found', 'rate_limited', 'server_error'],
        documentation: 'https://cairovolt.com/api/openapi.json',
    }, {
        headers: {
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIp(request.headers);
        if (!checkVerifyRateLimit(ip)) {
            return NextResponse.json(
                { valid: false, recordFound: false, error: 'rate_limited', message: 'محاولات كثيرة. حاول بعد ساعة.' },
                { status: 429 }
            );
        }

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { valid: false, recordFound: false, error: 'invalid_request', message: 'بيانات الطلب غير صحيحة.' },
                { status: 400 },
            );
        }
        const parsed = (body && typeof body === 'object' ? body : {}) as { serial?: unknown; productId?: unknown };
        const rawSerial = typeof parsed.serial === 'string' ? parsed.serial.trim() : '';
        const requestedProductId = typeof parsed.productId === 'string'
            ? parsed.productId.trim().toLowerCase().replace(/^static_/, '').slice(0, 80)
            : '';

        // Normalize valid case variants to the canonical stored form without
        // accepting a different prefix or suffix.
        const normalizeSerial = (s: string): string => {
            if (!isValidSerialFormat(s)) return s;
            return reconstructSerial(extractSerialVariable(s));
        };
        const serial = normalizeSerial(rawSerial);

        if (!serial || !isValidSerialFormat(serial)) {
            return NextResponse.json(
                { valid: false, recordFound: false, error: 'invalid_format', message: 'رقم السيريال غير صحيح.' },
                { status: 400 }
            );
        }

        // منتج مُرسَل من واجهة الاختيار: يجب أن يكون من كتالوج المتجر حصراً
        if (requestedProductId && !isKnownProductId(requestedProductId)) {
            return NextResponse.json(
                { valid: false, recordFound: false, error: 'invalid_product', message: 'المنتج المحدد غير معروف.' },
                { status: 400 }
            );
        }

        const db = await getFirestore();
        const serialsRef = db.collection('warranty_serials');
        const snapshot = await serialsRef.where('code', '==', serial).limit(1).get();

        if (snapshot.empty) {
            return NextResponse.json(
                { valid: false, recordFound: false, error: 'serial_not_found', message: 'رقم السيريال غير موجود في قاعدة البيانات.' },
                { status: 404 }
            );
        }

        const doc = snapshot.docs[0];
        const data = doc.data();
        const scope = 'Confirms a CairoVolt-issued serial and warranty record; does not certify manufacturer authenticity.';
        const baseResponse = { valid: true, recordFound: true, recordIssuer: 'CairoVolt', verificationScope: scope };

        const storedProductId = typeof data.productId === 'string' && data.productId ? data.productId : null;
        const effectiveProductId = storedProductId || requestedProductId || null;
        const productInfo = effectiveProductId
            ? getProductName(effectiveProductId)
            : { ar: 'منتج كايرو فولت', en: 'CairoVolt Product' };

        const activatedMs = toMillis(data.activatedAt);
        const expiresMs = toMillis(data.warrantyExpiresAt);
        const storedMonths = Number(data.warrantyDurationMonths) > 0 ? Number(data.warrantyDurationMonths) : null;

        // ═══ سجل مُفعَّل ═══
        if (data.status === 'activated') {
            const corrupted14d = !storedMonths && activatedMs !== null && expiresMs !== null
                && (expiresMs - activatedMs) <= CORRUPTED_WINDOW_MS;
            const missingDuration = !storedMonths && expiresMs === null;

            // سليم (مدة حقيقية مخزنة) → إرجاع المخزون كما هو
            if (!corrupted14d && !missingDuration) {
                return NextResponse.json({
                    ...baseResponse,
                    alreadyActivated: true,
                    productId: storedProductId || 'universal',
                    productName: productInfo.ar,
                    productNameEn: productInfo.en,
                    warrantyCode: data.warrantyCode,
                    activatedAt: toIso(data.activatedAt),
                    warrantyExpiresAt: toIso(data.warrantyExpiresAt),
                    warrantyDurationMonths: storedMonths,
                    warrantyTermsUrl: data.warrantyTermsUrl || '/warranty',
                });
            }

            // مكسور ولا منتج معروفاً بعد → نطلب تحديد المنتج (لا كتابة بعد)
            if (!effectiveProductId) {
                return NextResponse.json({
                    ...baseResponse,
                    alreadyActivated: true,
                    needsProduct: true,
                    productId: 'universal',
                    warrantyCode: data.warrantyCode || null,
                });
            }

            // 🩹 الشفاء الذاتي
            const resolved = await resolveWarrantyMonths(effectiveProductId);
            // كرت عصر الـ14 يوماً: التفعيل الأصلي غالباً مسحة فحص/عدسة جوجل قبل
            // وصول القطعة للعميل — البداية تُعاد من الآن (لصالح العميل حصراً).
            // كرت عصر «بلا نهاية»: تفعيله حقيقي، تبقى بدايته ويُحسب منها.
            const startMs = corrupted14d ? Date.now() : (activatedMs ?? Date.now());
            const newExpiry = addCalendarMonths(new Date(startMs), resolved.months);
            const warrantyCode = data.warrantyCode || generateWarrantyCode();

            await doc.ref.update({
                productId: effectiveProductId,
                sku: resolved.sku,
                warrantyCode,
                ...(corrupted14d ? {
                    activatedAt: FieldValue.serverTimestamp(),
                    legacyActivatedAt: data.activatedAt ?? null,
                    legacyExpiresAt: data.warrantyExpiresAt ?? null,
                } : {}),
                warrantyExpiresAt: newExpiry,
                warrantyDurationMonths: resolved.months,
                warrantyMonthsSource: resolved.source,
                warrantyTermsUrl: '/warranty',
                healedAt: FieldValue.serverTimestamp(),
                healedFrom: corrupted14d ? 'legacy-14day' : 'missing-duration',
                // عزو دقيق: من «شفى» السجل ليس بالضرورة من فعّله أصلاً — خلطهما
                // في حقول activated* كان يضلل أي نزاع لاحق (تفعيل قديم بهوية زائر اليوم)
                healedIP: ip,
                healedUA: request.headers.get('user-agent')?.slice(0, 200) || null,
                ...(corrupted14d ? {
                    // إعادة التفعيل الفعلية (البداية من الآن) — هنا الزائر هو المفعِّل حقاً
                    activatedIP: ip,
                    activatedUA: request.headers.get('user-agent')?.slice(0, 200) || null,
                } : {}),
            });

            await db.collection('warranty_scans').add({
                serialCode: serial,
                productId: effectiveProductId,
                batchId: data.batchId || null,
                warrantyCode,
                event: corrupted14d ? 'healed_legacy_14day' : 'healed_missing_duration',
                scannedAt: FieldValue.serverTimestamp(),
            });

            return NextResponse.json({
                ...baseResponse,
                // كرت الـ14 يوماً يظهر لصاحبه كتفعيل جديد ناجح — لا «مفعّل سابقاً»
                // بتواريخ مخجلة؛ هذا هو التصحيح الذي جاء لأجله.
                alreadyActivated: !corrupted14d,
                productId: effectiveProductId,
                productName: productInfo.ar,
                productNameEn: productInfo.en,
                warrantyCode,
                activatedAt: corrupted14d ? new Date(startMs).toISOString() : toIso(data.activatedAt),
                warrantyExpiresAt: newExpiry.toISOString(),
                warrantyDurationMonths: resolved.months,
                warrantyTermsUrl: '/warranty',
            });
        }

        // ═══ سجل غير مُفعَّل ═══
        // كل الكروت المطبوعة «عالمية» (بلا منتج) — التفعيل يتطلب تحديد المنتج
        // أولاً، وهو ما يمنح الضمان مدته الحقيقية من المحاسبة لا رقماً افتراضياً.
        if (!effectiveProductId) {
            return NextResponse.json({
                ...baseResponse,
                alreadyActivated: false,
                needsProduct: true,
                productId: 'universal',
            });
        }

        const resolved = await resolveWarrantyMonths(effectiveProductId);
        const warrantyCode = generateWarrantyCode();
        const now = new Date();
        const expiresAt = addCalendarMonths(now, resolved.months);

        await doc.ref.update({
            status: 'activated',
            productId: effectiveProductId,
            sku: resolved.sku,
            activatedAt: FieldValue.serverTimestamp(),
            warrantyCode,
            warrantyExpiresAt: expiresAt,
            warrantyDurationMonths: resolved.months,
            warrantyMonthsSource: resolved.source,
            warrantyTermsUrl: '/warranty',
            // أثر تدقيق استُعيد: النسخة القديمة سجّلته ثم ضاع في إعادة كتابة يوليو
            activatedIP: ip,
            activatedUA: request.headers.get('user-agent')?.slice(0, 200) || null,
        });

        await db.collection('warranty_scans').add({
            serialCode: serial,
            productId: effectiveProductId,
            batchId: data.batchId || null,
            warrantyCode,
            event: 'activated',
            scannedAt: FieldValue.serverTimestamp(),
        });

        return NextResponse.json({
            ...baseResponse,
            alreadyActivated: false,
            productId: effectiveProductId,
            productName: productInfo.ar,
            productNameEn: productInfo.en,
            warrantyCode,
            activatedAt: now.toISOString(),
            warrantyExpiresAt: expiresAt.toISOString(),
            warrantyDurationMonths: resolved.months,
            warrantyTermsUrl: '/warranty',
        });

    } catch (error) {
        console.error('[Verify API] Error:', error);
        return NextResponse.json(
            { valid: false, recordFound: false, error: 'server_error', message: 'حدث خطأ. حاول مرة أخرى.' },
            { status: 500 }
        );
    }
}
