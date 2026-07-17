export type CairoVoltWarrantyPolicy = {
    months: number | null;
    policyUrl: '/warranty';
};

const PRODUCT_WARRANTY_OVERRIDES: Record<string, number> = {
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
