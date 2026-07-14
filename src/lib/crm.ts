/**
 * ═══════════════════════════════════════════════════════════
 *  CRM Lead Sync — ربط مباشر مع Leads CRM (my-crm-bfac7)
 * ═══════════════════════════════════════════════════════════
 *
 * يرسل كل طلب فور تسجيله إلى webhook الـ CRM الرسمي:
 *   POST {CRM_WEBHOOK_URL}  (pages/api/webhook/new-lead في مشروع leads-CRM)
 *
 * الـ CRM نفسه يتكفل بـ: كشف التكرار (هاتف+منتج)، التوزيع التلقائي على
 * موظفي الشفت الحالي، التصحيح الآلي للعنوان، ومزامنة شيت الـ CRM.
 *
 * التصميم fail-open مثل safeAppendOrderToSheet:
 *  - CRM_WEBHOOK_URL غير مضبوط → تخطٍّ صامت (الميزة معطلة).
 *  - timeout قصير + لا يرمي أبداً → الطلب لا يتأخر ولا يفشل بسبب الـ CRM.
 *  - يرسل Authorization: Bearer عند ضبط CRM_WEBHOOK_SECRET (يطابق
 *    WEBHOOK_SECRET في بيئة الـ CRM).
 */

// الويبهوك ينشئ الليد خلال ~1-2ث لكنه قد يؤخر الرد حتى 14ث (تصحيح العنوان
// الداخلي قبل الرد) — لذا مهلة 8ث توازن: لا نعلّق رد الطلب على العميل،
// وانقطاع المهلة بعد وصول الطلب لا يعني فشل الإنشاء (مُثبت عملياً:
// إعادة الإرسال بعد timeout ترد isDuplicate=true).
const CRM_TIMEOUT_MS = 8000;

/** الجزء الأول فقط من اسم المنتج (قبل أول "|") — الأسماء التسويقية الكاملة
 *  طويلة جداً لواجهة الـCRM والشيت: "شاحن جوي روم 20 واط PD | أرخص شاحن…" → "شاحن جوي روم 20 واط PD" */
function shortName(name: any): string {
    return String(name || '').split('|')[0].trim();
}

function buildLeadPayload(orderData: any) {
    const items: any[] = orderData.items || [];
    const productName = items
        .map((it: any) => (it.quantity || 1) > 1 ? `${shortName(it.name)} x${it.quantity}` : shortName(it.name))
        .join(' + ');
    const totalQuantity = items.reduce((sum: number, it: any) => sum + (it.quantity || 1), 0);
    const orderDetails = items
        .map((it: any) => `${shortName(it.name)} (x${it.quantity || 1}) = ${(it.price || 0) * (it.quantity || 1)} ج`)
        .join(' | ');

    const notesParts: string[] = [];
    if (orderData.orderId || orderData.id) notesParts.push(`طلب موقع كايرو فولت #${orderData.orderId || orderData.id}`);
    notesParts.push(`الشحن: ${orderData.shippingFee === 0 ? 'مجاني' : `${orderData.shippingFee ?? '?'} ج`}`);
    if (orderData.couponCode) notesParts.push(`كوبون ${orderData.couponCode} (خصم ${orderData.couponDiscount} ج)`);
    if (orderData.customerNotes || orderData.notes) notesParts.push(String(orderData.customerNotes || orderData.notes));

    // 🧬 بصمة المنتج الموحدة (SKU): كتالوج الموقع وكتالوج الحسابات في الـCRM
    // يتشاركان نفس الأكواد (ANK-*/JR-*) — إرسالها يجعل مطابقة الـCRM قطعية
    // (skuResolvedBy: 'store') بلا أي تخمين بالأسماء. للطلب متعدد القطع نرسل
    // sku القطعة الأعلى قيمة كبصمة رئيسية + القائمة كاملة في items.
    const primary = items.length
        ? [...items].sort((a, b) => ((b.price || 0) * (b.quantity || 1)) - ((a.price || 0) * (a.quantity || 1)))[0]
        : null;

    return {
        // بصمة الربط: نفس القيمة تُكتب في العمود P بصف الشيت — بها يربط
        // smart-engine في الـCRM صف الشيت بمستند هذا الويبهوك فلا يستورده مكرراً.
        fingerprint: String(orderData.orderId || orderData.id || ''),
        name: orderData.customerName,
        phone: orderData.phone,
        whatsapp: orderData.whatsapp || orderData.phone,
        governorate: orderData.cityLabel || orderData.city || '',
        address: orderData.address || '',
        productName,
        sku: primary?.sku || '',
        items: items.map((it: any) => ({ sku: it.sku || '', name: shortName(it.name), quantity: it.quantity || 1, price: it.price || 0 })),
        quantity: String(totalQuantity),
        totalPrice: String(orderData.totalAmount ?? ''),
        // 🧾 الأرقام المالية منفصلة (كانت نصاً داخل notes فقط) — ليخزّنها الـCRM حقولاً قابلة للحساب
        shippingFee: Number(orderData.shippingFee ?? 0),
        couponCode: String(orderData.couponCode || ''),
        couponDiscount: Number(orderData.couponDiscount ?? 0),
        subtotal: Number(orderData.subtotalBeforeDiscount ?? 0),
        orderDetails,
        notes: notesParts.join(' | '),
        source: 'CairoVolt.com',
    };
}

/**
 * إرسال آمن للـ CRM — لا يرمي أبداً، ويحترم مهلة قصيرة كي لا يؤخر رد الطلب.
 */
export async function safeSendLeadToCRM(orderData: any): Promise<void> {
    const url = process.env.CRM_WEBHOOK_URL;
    if (!url) return; // الربط معطل حتى يُضبط المتغير

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    const secret = process.env.CRM_WEBHOOK_SECRET;
    if (secret) headers['Authorization'] = `Bearer ${secret}`;
    const body = JSON.stringify(buildLeadPayload(orderData));
    const oid = orderData.orderId || orderData.id || 'N/A';

    // 🔁 محاولات متعددة: الـCRM يعمل بـ minInstances:0 فقد يكون بارداً (أو وسط نشر)
    //    وقت الطلب — المحاولة الأولى توقظه (قد تنقضي مهلتها) والتالية تصيبه دافئاً.
    //    غياب هذا كان يُسقط طلبات المتجر بصمت (الطلب في الشيت بلا مستند في الـCRM).
    //    شبكة أمان الـCRM (smart-engine) تلتقط أي فشل متبقٍّ من الشيت، فلا يضيع الطلب.
    const MAX_ATTEMPTS = 3;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), CRM_TIMEOUT_MS);
            const res = await fetch(url, { method: 'POST', headers, body, signal: controller.signal });
            clearTimeout(timer);

            if (res.ok) {
                const b = await res.json().catch(() => ({}));
                console.log(`[CRM] ✅ Lead synced (attempt ${attempt}): ${oid} | ${orderData.phone}${b?.isDuplicate ? ' (مكرر لدى الـCRM)' : ''}`);
                return; // ✅ نجاح مؤكَّد
            }
            const txt = (await res.text().catch(() => '')).slice(0, 200);
            console.error(`[CRM] ❌ Webhook responded ${res.status} (attempt ${attempt}/${MAX_ATTEMPTS}): ${txt}`);
            // أخطاء العميل (عدا 408 مهلة / 429 ضغط) لن تُصلحها إعادة المحاولة — توقّف
            if (res.status >= 400 && res.status < 500 && res.status !== 408 && res.status !== 429) break;
        } catch (error: any) {
            const kind = error?.name === 'AbortError' ? `timeout ${CRM_TIMEOUT_MS}ms` : (error?.message || String(error));
            console.warn(`[CRM] ⚠️ attempt ${attempt}/${MAX_ATTEMPTS} failed: ${kind}`);
        }
        if (attempt < MAX_ATTEMPTS) await new Promise((r) => setTimeout(r, 800 * attempt)); // backoff 0.8s ثم 1.6s
    }
    // fail-open: كل المحاولات فشلت — لا نُفشل طلب العميل. شبكة أمان الـCRM من الشيت
    // ستستورده لاحقاً (لم يعد يُفترض «على الأرجح تسجّل» — الافتراض الخاطئ كان يُخفي الضياع).
    console.error(`[CRM] ❌ Lead sync FAILED after ${MAX_ATTEMPTS} attempts — CRM safety-net (sheet import) will recover: ${oid}`);
}
