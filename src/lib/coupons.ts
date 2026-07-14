/**
 * 🎟️ تحقق الكوبونات الديناميكي — مصدر الحقيقة: سيستم الحسابات (acc_coupons)
 *
 * يستعلم عن الكود من CRM `/api/public/coupons` (server-to-server بنفس سر الويبهوك
 * CRM_WEBHOOK_SECRET) مع كاش داخلي 60 ثانية لكل كود. لو الـCRM غير متاح لأي سبب،
 * fallback محلي للكودين التاريخيين حتى لا يتعطل checkout أبداً.
 *
 * الرد الموحّد: { valid, type: 'percent'|'fixed', value } — احتساب الخصم عند المستدعي.
 */

interface CouponVerdict { valid: boolean; type: 'percent' | 'fixed'; value: number }

const cache = new Map<string, { at: number; v: CouponVerdict }>();
const TTL = 60_000;

/** fallback الطوارئ (الكودان التاريخيان قبل النظام الديناميكي) — يعمل فقط عند تعذّر الـCRM */
function fallbackVerdict(code: string): CouponVerdict {
  if (code === 'ORIGINAL10') return { valid: true, type: 'percent', value: 10 };
  if (code === 'SALARY10') {
    const day = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', day: 'numeric' }).format(new Date()));
    return { valid: day >= 29 || day <= 5, type: 'percent', value: 10 };
  }
  return { valid: false, type: 'percent', value: 0 };
}

export async function validateCoupon(rawCode: string): Promise<CouponVerdict> {
  const code = String(rawCode || '').trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '').slice(0, 24);
  if (code.length < 3) return { valid: false, type: 'percent', value: 0 };

  const hit = cache.get(code);
  if (hit && Date.now() - hit.at < TTL) return hit.v;

  const webhookUrl = process.env.CRM_WEBHOOK_URL || '';
  const secret = process.env.CRM_WEBHOOK_SECRET || '';
  let verdict: CouponVerdict | null = null;
  if (webhookUrl && secret) {
    try {
      const origin = new URL(webhookUrl).origin;
      const res = await fetch(`${origin}/api/public/coupons?code=${encodeURIComponent(code)}`, {
        headers: { Authorization: `Bearer ${secret}` },
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        const d = await res.json();
        verdict = {
          valid: d.valid === true,
          type: d.type === 'fixed' ? 'fixed' : 'percent',
          value: Number(d.value) || 0,
        };
      }
    } catch (e) {
      console.warn(`[Coupons] ⚠️ تعذّر تحقق الـCRM للكود ${code} — fallback محلي:`, (e as Error).message);
    }
  }
  if (!verdict) verdict = fallbackVerdict(code);
  cache.set(code, { at: Date.now(), v: verdict });
  if (cache.size > 100) cache.clear();
  return verdict;
}

/** حساب قيمة الخصم من الحكم — نسبة تُقرَّب، ومبلغ ثابت لا يتجاوز المجموع الفرعي */
export function computeDiscount(v: CouponVerdict, subtotal: number): number {
  if (!v.valid || subtotal <= 0) return 0;
  if (v.type === 'fixed') return Math.min(Math.round(v.value), subtotal);
  return Math.round(subtotal * (v.value / 100));
}
