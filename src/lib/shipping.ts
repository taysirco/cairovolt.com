export const FREE_SHIPPING_THRESHOLD = 1499;

export function getShippingFee(citySlug: string, subtotal: number): number {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        return 0;
    }

    if (!citySlug) return 60; // Default before selection in the frontend UI

    const bahary = ['alexandria', 'qalyubia', 'dakahlia', 'sharqia', 'gharbia', 'monufia', 'beheira', 'kafr-el-sheikh', 'damietta', 'port-said', 'ismailia', 'suez'];
    const saeed = ['fayoum', 'beni-suef', 'minya', 'asyut', 'sohag', 'qena', 'luxor', 'aswan', 'matrouh', 'south-sinai', 'north-sinai', 'red-sea', 'new-valley'];

    if (bahary.includes(citySlug)) {
        return 70;
    } else if (saeed.includes(citySlug)) {
        return 100;
    }

    // Default to Cairo & Giza
    return 60;
}
