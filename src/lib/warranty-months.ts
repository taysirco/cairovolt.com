/**
 * 🛡️ warranty-months — مدة الضمان الحقيقية لكل منتج، من النظام المحاسبي.
 *
 * كانت مدد الضمان ثلاث حقائق متضاربة: 14 يوماً مصلّدة في كود التحقق القديم
 * (نافذة الإرجاع حُشرت مكان الضمان)، وسياسة بادئات في المتجر (12/18 شهراً)،
 * وأرقام acc_products الفعلية في المحاسبة (12-60 شهراً لكل SKU). هذا الملف
 * يوحّدها: المحاسبة أولاً (نفس قناة أسعار الجملة القائمة، Bearer سرّي، كاش
 * 6 ساعات في الذاكرة)، ثم سياسة البادئات، ثم 12 شهراً حداً أدنى — فلا يُفعَّل
 * ضمان بلا مدة أبداً بعد اليوم.
 */
import { staticProducts } from '@/lib/static-products';
import { getCairoVoltWarrantyPolicy } from '@/lib/warranty-policy';

interface AccountingItem { sku?: string; warrantyMonths?: number }

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
let cachedAt = 0;
let skuMonths: Map<string, number> = new Map();

/** slug المنتج → SKU من الكتالوج المجمَّع (مصدر حقيقة المتجر) */
const slugToSku: Map<string, string> = new Map(
    staticProducts.map((p) => [String(p.slug || '').toLowerCase(), String(p.sku || '').toUpperCase()]),
);

async function accountingMap(): Promise<Map<string, number>> {
    const now = Date.now();
    if (now - cachedAt < CACHE_TTL_MS && skuMonths.size > 0) return skuMonths;

    const base = process.env.CRM_WEBHOOK_URL || '';
    const secret = process.env.CRM_WEBHOOK_SECRET || '';
    if (!base || !secret) return skuMonths;

    try {
        const origin = new URL(base).origin;
        const res = await fetch(`${origin}/api/public/wholesale-prices`, {
            headers: { Authorization: `Bearer ${secret}` },
            signal: AbortSignal.timeout(8000),
            cache: 'no-store',
        });
        if (!res.ok) return skuMonths;
        const data = await res.json() as { items?: AccountingItem[] };
        const fresh = new Map<string, number>();
        for (const it of data.items || []) {
            const sku = String(it.sku || '').trim().toUpperCase();
            const months = Math.round(Number(it.warrantyMonths) || 0);
            if (sku && months > 0 && months <= 120) fresh.set(sku, months);
        }
        if (fresh.size > 0) { skuMonths = fresh; cachedAt = now; }
    } catch {
        // فشل الشبكة لا يعطّل التفعيل — تعمل سياسة البادئات ثم الحد الأدنى
    }
    return skuMonths;
}

export interface ResolvedWarranty {
    months: number;
    source: 'accounting' | 'policy' | 'default';
    sku: string | null;
}

/**
 * مدة الضمان الفعلية لمنتج (بمعرّفه/سلاگه في المتجر).
 * لا تُرجع null أبداً — الحد الأدنى 12 شهراً سياسة المتجر المكتوبة.
 */
export async function resolveWarrantyMonths(productId: string): Promise<ResolvedWarranty> {
    const slug = String(productId || '').trim().toLowerCase().replace(/^static_/, '');
    const sku = slugToSku.get(slug) || null;

    if (sku) {
        const acc = await accountingMap();
        const months = acc.get(sku);
        if (months) return { months, source: 'accounting', sku };
    }

    const policy = getCairoVoltWarrantyPolicy(slug);
    if (policy.months) return { months: policy.months, source: 'policy', sku };

    return { months: 12, source: 'default', sku };
}

/** المنتج معروف في كتالوج المتجر؟ (حارس مدخلات مسار التفعيل) */
export function isKnownProductId(productId: string): boolean {
    const slug = String(productId || '').trim().toLowerCase().replace(/^static_/, '');
    return slugToSku.has(slug);
}
