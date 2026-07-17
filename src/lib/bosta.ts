/**
 * Shipping estimate derived from the published governorate configuration.
 *
 * The legacy export names are retained so existing statically generated pages
 * keep their current integration. This module does not simulate operational or
 * real-time carrier data.
 */

import { getGovernorateBySlug } from '@/data/governorates';

export interface RegionalStats {
    /** Upper bound of the published estimate. */
    estimated_delivery_days: number | null;
    /** Localized delivery estimate for display. */
    delivery_estimate: string;
    /** Published nationwide coverage statement. */
    coverage: string;
    /** Cash on delivery availability from the shipping policy. */
    cash_on_delivery: boolean;
    /** Clarifies that the estimate is not a confirmed appointment. */
    confirmation_note: string;
}

function formatEstimate(minDays: number | null, maxDays: number | null, locale: string): string {
    const isArabic = locale === 'ar';

    if (minDays === null || maxDays === null) {
        return isArabic
            ? 'يُحدد بعد مراجعة عنوان الطلب'
            : 'Confirmed after the order address is reviewed';
    }

    return isArabic
        ? `${minDays}–${maxDays} أيام عمل تقديرية`
        : `Estimated ${minDays}–${maxDays} business days`;
}

export class BostaTracker {
    static getRegionalStats(governorateSlug: string, locale: string = 'ar'): RegionalStats {
        const governorate = getGovernorateBySlug(governorateSlug);
        // Per-governorate published estimate: deliveryDays is the lower bound
        // (1-5 by governorate in src/data/governorates.ts); the displayed range
        // adds one business day and is always framed as an estimate.
        const minDays = governorate ? governorate.deliveryDays : null;
        const maxDays = governorate ? governorate.deliveryDays + 1 : null;
        const isArabic = locale === 'ar';

        return {
            estimated_delivery_days: maxDays,
            delivery_estimate: formatEstimate(minDays, maxDays, locale),
            coverage: isArabic
                ? 'التوصيل متاح للعناوين المؤهلة داخل مصر'
                : 'Delivery is available to eligible addresses within Egypt',
            cash_on_delivery: true,
            confirmation_note: isArabic
                ? 'المدة تقديرية وفق سياسة الشحن، ويُؤكد الموعد بعد مراجعة الطلب والعنوان.'
                : 'Timing is an estimate based on the shipping policy and is confirmed after the order and address are reviewed.',
        };
    }
}
