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

function buildLeadPayload(orderData: any) {
    const items: any[] = orderData.items || [];
    const productName = items
        .map((it: any) => (it.quantity || 1) > 1 ? `${it.name} x${it.quantity}` : it.name)
        .join(' + ');
    const totalQuantity = items.reduce((sum: number, it: any) => sum + (it.quantity || 1), 0);
    const orderDetails = items
        .map((it: any) => `${it.name} (x${it.quantity || 1}) = ${(it.price || 0) * (it.quantity || 1)} ج`)
        .join(' | ');

    const notesParts: string[] = [];
    if (orderData.orderId || orderData.id) notesParts.push(`طلب موقع كايرو فولت #${orderData.orderId || orderData.id}`);
    notesParts.push(`الشحن: ${orderData.shippingFee === 0 ? 'مجاني' : `${orderData.shippingFee ?? '?'} ج`}`);
    if (orderData.couponCode) notesParts.push(`كوبون ${orderData.couponCode} (خصم ${orderData.couponDiscount} ج)`);
    if (orderData.customerNotes || orderData.notes) notesParts.push(String(orderData.customerNotes || orderData.notes));

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
        quantity: String(totalQuantity),
        totalPrice: String(orderData.totalAmount ?? ''),
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

    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), CRM_TIMEOUT_MS);

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        const secret = process.env.CRM_WEBHOOK_SECRET;
        if (secret) headers['Authorization'] = `Bearer ${secret}`;

        const res = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(buildLeadPayload(orderData)),
            signal: controller.signal,
        });
        clearTimeout(timer);

        if (res.ok) {
            const body = await res.json().catch(() => ({}));
            console.log(`[CRM] ✅ Lead synced: ${orderData.orderId || orderData.id || 'N/A'} | ${orderData.phone}${body?.isDuplicate ? ' (مكرر لدى الـCRM)' : ''}`);
        } else {
            console.error(`[CRM] ❌ Webhook responded ${res.status}: ${(await res.text().catch(() => '')).slice(0, 200)}`);
        }
    } catch (error: any) {
        // fail-open: خطأ الـ CRM لا يُفشل الطلب أبداً
        if (error?.name === 'AbortError') {
            // المهلة انقضت بعد إرسال الطلب — الـ CRM ينشئ الليد قبل أن يكمل
            // تصحيحه الداخلي، فالليد مسجّل على الأرجح رغم غياب الرد.
            console.warn(`[CRM] ⚠️ Response timeout ${CRM_TIMEOUT_MS}ms — request was delivered; lead most likely created (CRM auto-correct delays the response).`);
        } else {
            console.error('[CRM] ❌ Lead sync failed:', error?.message || error);
        }
    }
}
