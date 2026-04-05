/**
 * CairoVolt Smart Serial Generator v2.0
 * 
 * Generates unique serial codes and warranty numbers for the C2PA verification system.
 * Uses a restricted alphabet (no O/0/I/1/L) to eliminate human reading confusion.
 * 
 * ══════════════════════════════════════════════════
 * Serial Format:  CV-1xxxxxm313
 * ──────────────────────────────────────────────────
 *   CV-1  → Fixed prefix fingerprint (brand identity)
 *   xxxxx → 5 random characters (unique per unit)
 *   m313  → Fixed suffix fingerprint (authenticity seal)
 * ══════════════════════════════════════════════════
 * 
 * Example:  CV-1A7K2Mm313
 * 
 * The serial is UNIVERSAL — not tied to any product or category.
 * Product association is stored in Firestore, not encoded in the serial.
 * 
 * Warranty Format: WR-XXXX-XXXX (e.g., WR-4F8K-9N2P)
 */

// ── Constants ──
const SERIAL_PREFIX = 'CV-1';         // Fixed start fingerprint
const SERIAL_SUFFIX = 'm313';         // Fixed end fingerprint  
const RANDOM_LENGTH = 5;              // Variable portion length
const FULL_SERIAL_LENGTH = SERIAL_PREFIX.length + RANDOM_LENGTH + SERIAL_SUFFIX.length; // 14

// Safe alphabet: 29 chars — no O/0/I/1/L to avoid visual confusion on printed cards
const SAFE_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

/**
 * Generate a random string of given length from the safe alphabet
 */
function randomChars(length: number): string {
    const chars: string[] = [];
    const crypto = globalThis.crypto || require('crypto');
    const values = new Uint8Array(length);
    crypto.getRandomValues(values);
    for (let i = 0; i < length; i++) {
        chars.push(SAFE_ALPHABET[values[i] % SAFE_ALPHABET.length]);
    }
    return chars.join('');
}

/**
 * Generate a unique CairoVolt serial code
 * Format: CV-1xxxxxm313 (e.g., CV-1A7K2Mm313)
 */
export function generateSerial(): string {
    return `${SERIAL_PREFIX}${randomChars(RANDOM_LENGTH)}${SERIAL_SUFFIX}`;
}

/**
 * Generate a warranty activation code
 * Format: WR-XXXX-XXXX (e.g., WR-4F8K-9N2P)
 */
export function generateWarrantyCode(): string {
    return `WR-${randomChars(4)}-${randomChars(4)}`;
}

/**
 * Generate a batch ID based on current date
 * Format: BATCH-YYYY-MM-{sequence} (e.g., BATCH-2026-04-A)
 */
export function generateBatchId(sequence: string = 'A'): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `BATCH-${year}-${month}-${sequence}`;
}

/**
 * Validate a serial code format
 * Must match: CV-1[5 safe chars]m313 (case-insensitive)
 */
export function isValidSerialFormat(serial: string): boolean {
    const pattern = new RegExp(
        `^CV-1[${SAFE_ALPHABET}]{${RANDOM_LENGTH}}m313$`,
        'i'
    );
    return pattern.test(serial);
}

/**
 * Extract the 5-digit variable portion from a full serial
 * e.g., "CV-1A7K2Mm313" → "A7K2M"
 */
export function extractSerialVariable(serial: string): string {
    return serial.substring(SERIAL_PREFIX.length, SERIAL_PREFIX.length + RANDOM_LENGTH);
}

/**
 * Reconstruct full serial from the 5-digit variable portion
 * e.g., "A7K2M" → "CV-1A7K2Mm313"  
 */
export function reconstructSerial(variable: string): string {
    return `${SERIAL_PREFIX}${variable.toUpperCase()}${SERIAL_SUFFIX}`;
}

/**
 * Build the full QR Code URL for a serial
 * Note: productId is NO LONGER embedded in QR URL.
 * The serial is universal — Firestore resolves the product.
 */
export function buildVerifyUrl(serial: string): string {
    const base = 'https://cairovolt.com/verify';
    const params = new URLSearchParams({
        s: serial,
        utm_source: 'package',
        utm_medium: 'qr',
        utm_campaign: 'c2pa',
    });
    return `${base}?${params.toString()}`;
}

/** Export constants for reuse */
export { SERIAL_PREFIX, SERIAL_SUFFIX, RANDOM_LENGTH, FULL_SERIAL_LENGTH };

/** Document shape for Firestore */
export interface SerialDocument {
    code: string;
    productId: string;         // Product association (stored in DB, NOT in serial)
    batchId: string;
    status: 'unused' | 'activated';
    createdAt: Date;
    activatedAt: Date | null;
    warrantyCode: string | null;
    warrantyExpiresAt: Date | null;
    activatedUA: string | null;
    activatedIP: string | null;
}

/**
 * Product ID → Arabic display name mapping
 */
export const PRODUCT_NAMES: Record<string, { ar: string; en: string }> = {
    'anker-nano-45w': { ar: 'شاحن أنكر نانو 45W', en: 'Anker Nano 45W Charger' },
    'anker-powercore-10000': { ar: 'باور بانك أنكر 10000mAh', en: 'Anker PowerCore 10000' },
    'anker-powercore-20000': { ar: 'باور بانك أنكر 20000mAh', en: 'Anker PowerCore 20000' },
    'anker-powercore-26800': { ar: 'باور بانك أنكر 26800mAh', en: 'Anker PowerCore 26800' },
    'anker-737-powerbank': { ar: 'باور بانك أنكر 737', en: 'Anker 737 Power Bank' },
    'anker-521-powerhouse': { ar: 'محطة طاقة أنكر 521', en: 'Anker 521 PowerHouse' },
    'anker-powerport-20w': { ar: 'شاحن أنكر 20W', en: 'Anker PowerPort 20W' },
    'anker-powerport-25w': { ar: 'شاحن أنكر 25W', en: 'Anker PowerPort 25W' },
    'anker-a2147-gan-charger-30w': { ar: 'شاحن أنكر GaN 30W', en: 'Anker GaN 30W' },
    'anker-a2732-charger-35w': { ar: 'شاحن أنكر 35W', en: 'Anker 35W Charger' },
    'anker-a2741-charger-30w': { ar: 'شاحن أنكر 30W', en: 'Anker 30W Charger' },
    'anker-powerline-usb-c-lightning': { ar: 'كابل أنكر USB-C إلى Lightning', en: 'Anker PowerLine USB-C Lightning' },
    'anker-powerline-usb-c-usb-c': { ar: 'كابل أنكر USB-C إلى USB-C', en: 'Anker PowerLine USB-C' },
    'anker-a8050-usb-c-cable': { ar: 'كابل أنكر USB-C', en: 'Anker USB-C Cable' },
    'anker-car-charger-dual-usb': { ar: 'شاحن سيارة أنكر', en: 'Anker Car Charger' },
    'anker-622-maggo': { ar: 'باور بانك أنكر MagGo', en: 'Anker 622 MagGo' },
    'anker-prime-a1695-25000': { ar: 'باور بانك أنكر برايم 25000', en: 'Anker Prime 25000' },
    'anker-soundcore-r50i': { ar: 'سماعة أنكر R50i', en: 'Soundcore R50i' },
    'anker-soundcore-r50i-nc': { ar: 'سماعة أنكر R50i NC', en: 'Soundcore R50i NC' },
    'anker-soundcore-life-p2i': { ar: 'سماعة أنكر Life P2i', en: 'Soundcore Life P2i' },
    'anker-soundcore-k20i': { ar: 'هيدسيت أنكر K20i', en: 'Soundcore K20i' },
    'anker-soundcore-flare-2': { ar: 'سبيكر أنكر Flare 2', en: 'Soundcore Flare 2' },
    'anker-soundcore-motion-plus': { ar: 'سبيكر أنكر Motion+', en: 'Soundcore Motion+' },
    'joyroom-t03s-pro-earbuds': { ar: 'سماعة جوي روم T03s Pro', en: 'Joyroom T03s Pro' },
    'joyroom-jr-t03-wireless-earbuds': { ar: 'سماعة جوي روم T03', en: 'Joyroom T03 Earbuds' },
    'joyroom-power-bank-10000': { ar: 'باور بانك جوي روم 10000', en: 'Joyroom 10000mAh' },
    'joyroom-power-bank-20000': { ar: 'باور بانك جوي روم 20000', en: 'Joyroom 20000mAh' },
    'joyroom-20w-usb-c-charger': { ar: 'شاحن جوي روم 20W', en: 'Joyroom 20W Charger' },
    'joyroom-30w-fast-charger': { ar: 'شاحن جوي روم 30W', en: 'Joyroom 30W Charger' },
    'joyroom-usb-c-lightning-cable': { ar: 'كابل جوي روم Lightning', en: 'Joyroom Lightning Cable' },
    'joyroom-60w-car-charger': { ar: 'شاحن سيارة جوي روم 60W', en: 'Joyroom 60W Car Charger' },
    'joyroom-3-in-1-wireless-charging-station': { ar: 'محطة شحن جوي روم 3 في 1', en: 'Joyroom 3-in-1 Charger' },
};

/**
 * Get the Arabic product name for display
 */
export function getProductName(productId: string): { ar: string; en: string } {
    return PRODUCT_NAMES[productId] || { ar: 'منتج CairoVolt', en: 'CairoVolt Product' };
}
