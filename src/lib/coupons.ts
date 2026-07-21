/** Server-side coupon validation backed by the accounting CRM. */

interface CouponVerdict { valid: boolean; type: 'percent' | 'fixed'; value: number }

const cache = new Map<string, { at: number; v: CouponVerdict }>();
const TTL = 60_000;

/** Local fallback for established codes when the CRM is unavailable. */
function fallbackVerdict(code: string): CouponVerdict {
  if (code === 'WARRANTY5') return { valid: true, type: 'percent', value: 5 };
  if (code === 'ORIGINAL10') return { valid: true, type: 'percent', value: 10 };
  if (code === 'SALARY10') {
    const day = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', day: 'numeric' }).format(new Date()));
    return { valid: day >= 29 || day <= 5, type: 'percent', value: 10 };
  }
  return { valid: false, type: 'percent', value: 0 };
}

export async function validateCoupon(rawCode: string): Promise<CouponVerdict> {
  const submittedCode = String(rawCode || '').trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '').slice(0, 24);
  if (submittedCode.length < 3) return { valid: false, type: 'percent', value: 0 };

  // WARRANTY5 is the customer-facing warranty thank-you code (5%). Keep the old
  // WARRANTY10 name working as a compatibility alias → WARRANTY5, so any code
  // already copied/sent still validates (now at 5%). ORIGINAL10 (general 10%)
  // stays a separate coupon.
  const code = submittedCode === 'WARRANTY10' ? 'WARRANTY5' : submittedCode;

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
        const type: CouponVerdict['type'] = d.type === 'fixed' ? 'fixed' : 'percent';
        const rawValue = Number(d.value);
        const maximum = type === 'fixed' ? 1_000_000 : 100;
        const value = Number.isFinite(rawValue)
          ? Math.min(maximum, Math.max(0, rawValue))
          : 0;
        verdict = {
          valid: d.valid === true && value > 0,
          type,
          value,
        };
      }
    } catch {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Coupons] CRM validation unavailable; using the local fallback.');
      }
    }
  }
  if (!verdict) verdict = fallbackVerdict(code);
  cache.set(code, { at: Date.now(), v: verdict });
  if (cache.size > 100) cache.clear();
  return verdict;
}

/** Calculate a non-negative discount that never exceeds the subtotal. */
export function computeDiscount(v: CouponVerdict, subtotal: number): number {
  if (!v.valid || !Number.isFinite(subtotal) || subtotal <= 0) return 0;
  const value = Number.isFinite(v.value) ? Math.max(0, v.value) : 0;
  const computed = v.type === 'fixed'
    ? Math.round(value)
    : Math.round(subtotal * (Math.min(value, 100) / 100));
  return Math.min(subtotal, Math.max(0, computed));
}
