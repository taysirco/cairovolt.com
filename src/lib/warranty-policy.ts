import {
    STANDARD_RETURN_WINDOW_DAYS,
    STANDARD_SHIPPING_MAX_EGP,
    STANDARD_SHIPPING_MIN_EGP,
} from '@/lib/merchant-product-data';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';

export type CairoVoltWarrantyPolicy = {
    months: number | null;
    policyUrl: '/warranty';
};

/**
 * Product-level terms that differ from the brand default. Exported so every
 * surface that summarises the policy (llms.txt, the home and FAQ answers)
 * derives the exceptions from this one table instead of retyping them.
 * Both current entries are Joyroom Type-C to Lightning cables.
 */
export const PRODUCT_WARRANTY_OVERRIDES: Readonly<Record<string, number>> = {
    'joyroom-type-c-lightning-24mos': 24,
    'joyroom-type-c-lightning-36mos': 36,
};

/**
 * Returns the written CairoVolt store-warranty duration used on product pages.
 * Unknown or unassigned serials deliberately have no inferred duration.
 */
export function getCairoVoltWarrantyPolicy(
    productId?: string | null,
    brandSlug?: string | null,
): CairoVoltWarrantyPolicy {
    const normalizedProductId = (productId?.trim().toLowerCase() || '')
        .replace(/^static_/, '');
    const normalizedBrand = brandSlug?.trim().toLowerCase() || '';

    const override = PRODUCT_WARRANTY_OVERRIDES[normalizedProductId];
    if (override) {
        return { months: override, policyUrl: '/warranty' };
    }

    if (normalizedProductId.startsWith('joyroom-') || normalizedBrand === 'joyroom') {
        return { months: 12, policyUrl: '/warranty' };
    }

    if (normalizedProductId.startsWith('jbl-') || normalizedBrand === 'jbl') {
        return { months: 12, policyUrl: '/warranty' };
    }

    if (
        normalizedProductId.startsWith('anker-')
        || normalizedProductId.startsWith('soundcore-')
        || normalizedBrand === 'anker'
        || normalizedBrand === 'soundcore'
    ) {
        return { months: 18, policyUrl: '/warranty' };
    }

    return { months: null, policyUrl: '/warranty' };
}

export function addCalendarMonths(start: Date, months: number): Date {
    const result = new Date(start);
    const originalDay = result.getUTCDate();

    result.setUTCDate(1);
    result.setUTCMonth(result.getUTCMonth() + months);

    const lastDayOfTargetMonth = new Date(Date.UTC(
        result.getUTCFullYear(),
        result.getUTCMonth() + 1,
        0,
    )).getUTCDate();

    result.setUTCDate(Math.min(originalDay, lastDayOfTargetMonth));
    return result;
}

const SUMMARY_BRANDS = [
    { key: 'anker', en: 'Anker', ar: 'انكر' },
    { key: 'soundcore', en: 'Soundcore', ar: 'ساوندكور' },
    { key: 'joyroom', en: 'Joyroom', ar: 'جوي روم' },
    { key: 'jbl', en: 'JBL', ar: 'JBL' },
] as const;

/**
 * One-sentence summary of the CairoVolt store warranty, built from the same
 * resolver the product pages use, e.g. (en):
 * "CairoVolt store warranty: 18 months on eligible Anker and Soundcore,
 * 12 months on Joyroom and JBL; a few Joyroom cables carry 24 or 36 months.
 * The exact term is on each product page and your order confirmation."
 */
export function getStoreWarrantySummary(locale: 'ar' | 'en'): string {
    const isArabic = locale === 'ar';
    const groups: Array<{ months: number; brands: string[] }> = [];
    for (const brand of SUMMARY_BRANDS) {
        const months = getCairoVoltWarrantyPolicy(null, brand.key).months;
        if (!months) continue;
        const group = groups.find(item => item.months === months);
        const name = isArabic ? brand.ar : brand.en;
        if (group) group.brands.push(name);
        else groups.push({ months, brands: [name] });
    }

    const overrideMonths = Array.from(new Set(Object.values(PRODUCT_WARRANTY_OVERRIDES))).sort((a, b) => a - b);
    const overrideBrands = Array.from(new Set(
        Object.keys(PRODUCT_WARRANTY_OVERRIDES)
            .map(slug => SUMMARY_BRANDS.find(brand => slug.startsWith(`${brand.key}-`)))
            .filter((brand): brand is (typeof SUMMARY_BRANDS)[number] => Boolean(brand))
            .map(brand => (isArabic ? brand.ar : brand.en)),
    ));

    if (isArabic) {
        const parts = groups.map((group, index) =>
            `${index > 0 ? 'و' : ''}${group.months} شهرًا على منتجات ${group.brands.join(' و')}${index === 0 ? ' المؤهلة' : ''}`);
        const exceptions = overrideMonths.length
            ? `؛ وتحمل بعض كابلات ${overrideBrands.join(' و')} ضمانًا لمدة ${overrideMonths.join(' أو ')} شهرًا`
            : '';
        return `ضمان متجر كايرو فولت: ${parts.join('، ')}${exceptions}. المدة الدقيقة مذكورة في صفحة كل منتج وفي تأكيد طلبك.`;
    }

    const parts = groups.map((group, index) =>
        `${group.months} months on ${index === 0 ? 'eligible ' : ''}${group.brands.join(' and ')}`);
    const exceptions = overrideMonths.length
        ? `; a few ${overrideBrands.join(' and ')} cables carry ${overrideMonths.join(' or ')} months`
        : '';
    return `CairoVolt store warranty: ${parts.join(', ')}${exceptions}. The exact term is on each product page and your order confirmation.`;
}

/**
 * The published return policy (/return-policy) in one sentence, e.g. (en):
 * "Return or exchange within 14 days of delivery under the return policy;
 * items must be unused, complete and in original packaging; opened or used
 * earbuds and audio products are not returnable for hygiene reasons; CairoVolt
 * covers return shipping when a defect or our order error is confirmed."
 * Every clause restates a line of messages/*.json ReturnPolicy.
 */
export function getStoreReturnsSummary(locale: 'ar' | 'en'): string {
    const days = STANDARD_RETURN_WINDOW_DAYS;
    return locale === 'ar'
        ? `الإرجاع أو الاستبدال خلال ${days} يومًا من الاستلام وفق سياسة الإرجاع؛ ويجب أن يكون المنتج غير مستخدم وكاملًا بملحقاته وفي تغليفه الأصلي؛ ولا تُقبل إعادة السماعات والمنتجات الصوتية بعد فتحها أو استخدامها لأسباب صحية؛ وتتحمل كايرو فولت شحن الإرجاع عند تأكيد عيب المنتج أو خطأ في الطلب من جانبنا.`
        : `Return or exchange within ${days} days of delivery under the return policy; items must be unused, complete and in original packaging; opened or used earbuds and audio products are not returnable for hygiene reasons; CairoVolt covers return shipping when a defect or our order error is confirmed.`;
}

/** The governorate fields the shipping summary needs (pass src/data/governorates). */
export type DeliveryEstimateSource = ReadonlyArray<{ deliveryDays: number; nameEn: string; nameAr: string }>;

function joinNames(names: string[], locale: 'ar' | 'en'): string {
    if (locale === 'ar') return names.join(' و');
    if (names.length <= 1) return names.join('');
    return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

/**
 * Fee and delivery-time summary, e.g. (en): "70–130 EGP by governorate, free
 * from 3,700 EGP; delivery commonly 1–6 business days depending on governorate
 * (Cairo/Giza 1–2; Aswan, North Sinai and New Valley 5–6)."
 *
 * Day ranges follow the governorate pages exactly (deliveryDays to
 * deliveryDays + 1, see src/lib/bosta.ts). The governorate list is a parameter
 * so this module — which product pages also load in the browser — does not
 * pull the governorate dataset into the client bundle.
 */
export function getStoreShippingSummary(locale: 'ar' | 'en', governorateList: DeliveryEstimateSource): string {
    const isArabic = locale === 'ar';
    const threshold = FREE_SHIPPING_THRESHOLD.toLocaleString('en-US');
    const days = governorateList.map(item => item.deliveryDays);
    const fees = isArabic
        ? `من ${STANDARD_SHIPPING_MIN_EGP} إلى ${STANDARD_SHIPPING_MAX_EGP} جنيهًا حسب المحافظة، ومجاني للطلبات من ${threshold} جنيه`
        : `${STANDARD_SHIPPING_MIN_EGP}–${STANDARD_SHIPPING_MAX_EGP} EGP by governorate, free from ${threshold} EGP`;
    if (days.length === 0) return `${fees}.`;

    const fastestDays = Math.min(...days);
    const slowestDays = Math.max(...days);
    const name = (item: DeliveryEstimateSource[number]) => (isArabic ? item.nameAr : item.nameEn);
    const fastest = governorateList.filter(item => item.deliveryDays === fastestDays).map(name).join('/');
    const slowest = joinNames(governorateList.filter(item => item.deliveryDays === slowestDays).map(name), locale);

    return isArabic
        ? `${fees}؛ ومدة التوصيل غالبًا من ${fastestDays} إلى ${slowestDays + 1} أيام عمل حسب المحافظة (${fastest} ${fastestDays}–${fastestDays + 1}؛ ${slowest} ${slowestDays}–${slowestDays + 1}).`
        : `${fees}; delivery commonly ${fastestDays}–${slowestDays + 1} business days depending on governorate (${fastest} ${fastestDays}–${fastestDays + 1}; ${slowest} ${slowestDays}–${slowestDays + 1}).`;
}
