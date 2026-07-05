export const FREE_SHIPPING_THRESHOLD = 3700;

// Shipping fee tiers by governorate (EGP), applied only below the
// free-shipping threshold. Slugs match the checkout form + governorates.ts.
// MAINTENANCE: keep the ranges quoted in copy (messages, llms.txt,
// homepage FAQ, load-shedding templates) in sync: currently 70–130.
const GREATER_CAIRO_ALEX = ['cairo', 'giza', 'qalyubia', 'alexandria'];
const BAHARY = ['dakahlia', 'sharqia', 'gharbia', 'monufia', 'beheira', 'kafr-el-sheikh', 'damietta', 'port-said', 'ismailia', 'suez'];
const SAEED = ['fayoum', 'beni-suef', 'minya', 'asyut', 'sohag', 'qena', 'luxor', 'matrouh', 'north-sinai', 'red-sea', 'new-valley'];

export function getShippingFee(citySlug: string, subtotal: number): number {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        return 0;
    }

    if (!citySlug) return 70; // Default (lowest tier) before selection in the frontend UI

    if (GREATER_CAIRO_ALEX.includes(citySlug)) {
        return 70;
    }
    if (BAHARY.includes(citySlug)) {
        return 85;
    }
    if (citySlug === 'south-sinai') {
        return 130; // Sharm El-Sheikh & South Sinai
    }
    if (citySlug === 'aswan') {
        return 120;
    }
    if (SAEED.includes(citySlug)) {
        return 100;
    }

    // Unknown slug — default to the lowest tier
    return 70;
}
