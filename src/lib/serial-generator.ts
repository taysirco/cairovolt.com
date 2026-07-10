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
const FULL_SERIAL_LENGTH = SERIAL_PREFIX.length + RANDOM_LENGTH + SERIAL_SUFFIX.length; // 13

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

    // ── Auto-completed from catalog (2026-07-10): Soundcore/Joyroom back-catalog + July batch ──
    'anker-310-usb-c-lightning-cable': { ar: 'كابل انكر 310 من USB-C إلى لايتننج (A81A1621)', en: 'Anker 310 USB-C to Lightning (A81A1621)' },
    'anker-a1637-wukong-3-in-1-power-bank': { ar: 'أنكر × بلاك ميث ووكونج باور بانك 3 في 1 (A1637)', en: 'Anker x Black Myth: Wukong 3-in-1 Power Bank (A1' },
    'anker-a2216-magnetic-wireless-car-charger': { ar: 'شاحن أنكر نانو المغناطيسي اللاسلكي للسيارة (A221', en: 'Anker Nano Magnetic Wireless Car Charger (A2216)' },
    'anker-nano-45w-1c-pd': { ar: 'شاحن أنكر نانو 45 واط 1C (A2039)', en: 'Anker Nano 45W 1C (A2039)' },
    'anker-nano-45w-smart-display-charger': { ar: 'شاحن أنكر نانو 45 واط بشاشة ذكية (A121D)', en: 'Anker Nano 45W Smart Display GaN Charger (A121D)' },
    'anker-nano-pro-45w-a2692': { ar: 'شاحن حائط أنكر نانو برو 45 واط USB-C موديل A2692', en: 'Anker Nano Pro 45W USB-C Charger (A2692)' },
    'anker-pencil-stylus': { ar: 'قلم أنكر Pencil', en: 'Anker Pencil' },
    'anker-powerport-iii-20w-a2639': { ar: 'شاحن انكر باور بورت III 20 واط كيوب', en: 'Anker PowerPort III 20W Cube' },
    'anker-prime-a1336-20000mah-power-bank': { ar: 'أنكر برايم باور بانك 20000mAh (A1336)', en: 'Anker Prime 20,000mAh Power Bank (A1336)' },
    'anker-prime-a2669-67w-gan-charger': { ar: 'شاحن حائط أنكر برايم 67 واط جان (A2669)', en: 'Anker Prime 67W GaN Wall Charger (A2669)' },
    'anker-prime-a2688-100w-charger': { ar: 'شاحن أنكر برايم 100 واط GaN بـ3 منافذ', en: 'Anker Prime 100W 3-Port GaN Charger' },
    'anker-prime-fusion-a1339-9600mah-65w': { ar: 'أنكر برايم باور بانك فيوجن 9,600 مللي أمبير 65 و', en: 'Anker Prime Power Bank 9,600mAh 65W Fusion (A133' },
    'anker-usb-c-lightning-sureistrong': { ar: 'كابل انكر SureIStrong USB-C إلى Lightning', en: 'Anker SureIStrong USB-C to Lightning Cable' },
    'anker-zolo-30w-a2698-charger': { ar: 'شاحن حائط أنكر زولو 30 واط USB-C (A2698)', en: 'Anker Zolo 30W USB-C Wall Charger (A2698)' },
    'anker-zolo-a110d-10000': { ar: 'باور بانك أنكر زولو 10,000 مللي أمبير (22.5 واط)', en: 'Anker ZOLO Power Bank 10,000mAh (22.5W)' },
    'anker-zolo-a110e-20000': { ar: 'باور بانك أنكر زولو 20,000 مللي أمبير (22.5 واط)', en: 'Anker ZOLO Power Bank 20,000mAh (22.5W)' },
    'anker-zolo-a1681-20000': { ar: 'باور بانك أنكر زولو 20,000 مللي أمبير 45 واط PD', en: 'Anker ZOLO Power Bank 20,000mAh 45W PD' },
    'anker-zolo-usb-c-braided-cable': { ar: 'كابل أنكر زولو USB-C إلى USB-C مضفر (A81D6)', en: 'Anker Zolo USB-C to USB-C Braided Cable (A81D6)' },
    'joyroom-25w-fast-charger': { ar: 'شاحن جوي روم 25 واط PD', en: 'Joyroom 25W PD Charger' },
    'joyroom-3-in-1-data-cable': { ar: 'كابل جوي روم 3 في 1', en: 'Joyroom 3-in-1 Multi Charging Cable' },
    'joyroom-30w-pd-cable': { ar: 'كابل جوي روم 30 واط PD 1.2 متر', en: 'Joyroom 30W PD Fast Charging Cable 1.2m' },
    'joyroom-car-mount-zs290': { ar: 'حامل جوال مغناطيسي جوي روم ZS290', en: 'Joyroom Magnetic Car Mount ZS290' },
    'joyroom-car-phone-mount': { ar: 'حامل موبايل للسيارة جوي روم', en: 'Joyroom Universal Car Phone Mount' },
    'joyroom-ft3-smartwatch': { ar: 'ساعة جوي روم FT3 الذكية', en: 'Joyroom FT3 Smart Watch' },
    'joyroom-magnetic-power-bank-10000': { ar: 'باور بانك جوي روم MagSafe 10000', en: 'Joyroom MagSafe Power Bank 10000mAh' },
    'joyroom-type-c-lightning-24mos': { ar: 'كابل جوي روم USB-C إلى Lightning (ضمان 24 شهر)', en: 'Joyroom USB-C to Lightning Cable (24-Month Warra' },
    'joyroom-type-c-lightning-36mos': { ar: 'كابل جوي روم USB-C إلى Lightning (ضمان 36 شهر)', en: 'Joyroom USB-C to Lightning Cable (36-Month Warra' },
    'joyroom-type-c-lightning-braided': { ar: 'كابل جوي روم USB-C إلى Lightning', en: 'Joyroom USB-C to Lightning Braided Cable' },
    'joyroom-type-c-to-type-c-cable': { ar: 'كابل جوي روم USB-C إلى USB-C', en: 'Joyroom USB-C to USB-C Cable' },
    'joyroom-usb-a-lightning-1.2m': { ar: 'كابل جوي روم USB-A إلى Lightning 1.2 متر', en: 'Joyroom USB-A to Lightning Cable 1.2m (4ft)' },
    'joyroom-usb-a-lightning-cable': { ar: 'كابل جوي روم USB-A إلى Lightning 1 متر', en: 'Joyroom USB-A to Lightning Cable 1m' },
    'joyroom-usb-a-micro-cable': { ar: 'كابل جوي روم USB-A إلى Micro USB 1.2 متر', en: 'Joyroom USB-A to Micro USB Cable 1.2m' },
    'joyroom-usb-a-type-c-1.2m': { ar: 'كابل جوي روم USB-A إلى Type-C 1.2 متر', en: 'Joyroom USB-A to Type-C Cable 1.2m (4ft)' },
    'joyroom-usb-a-type-c-cable': { ar: 'كابل جوي روم USB-A إلى Type-C 1 متر', en: 'Joyroom USB-A to Type-C Cable 1m' },
    'joyroom-usb-c-cable-60w': { ar: 'كابل جوي روم 60 واط USB-C', en: 'Joyroom 60W USB-C to USB-C Fast Charging Cable' },
    'soundcore-a25i-earbuds': { ar: 'سماعة أنكر ساوندكور A25i', en: 'Anker Soundcore A25i' },
    'soundcore-a30i-earbuds': { ar: 'سماعة ساوندكور A30i', en: 'Soundcore A30i' },
    'soundcore-c30i-earbuds': { ar: 'سماعة ساوندكور C30i', en: 'Soundcore C30i' },
    'soundcore-c40i-earbuds': { ar: 'سماعة ساوندكور C40i', en: 'Soundcore C40i' },
    'soundcore-liberty-3-pro': { ar: 'سماعة ساوندكور Liberty 3 Pro', en: 'Soundcore Liberty 3 Pro' },
    'soundcore-liberty-4-nc': { ar: '\u0633\u0645\u0627\u0639\u0629 \u0633\u0627\u0648\u0646\u062f\u0643\u0648\u0631 \u0644\u064a\u0628\u0631\u062a\u064a 4 NC', en: 'Soundcore Liberty 4 NC' },
    'soundcore-liberty-4-pro': { ar: 'سماعة ساوندكور ليبرتي 4 برو', en: 'Soundcore Liberty 4 Pro' },
    'soundcore-liberty-5': { ar: 'سماعة ساوندكور ليبرتي 5', en: 'Soundcore Liberty 5' },
    'soundcore-liberty-air-2-pro': { ar: 'سماعة ساوندكور Liberty Air 2 Pro', en: 'Soundcore Liberty Air 2 Pro' },
    'soundcore-liberty-buds': { ar: 'سماعة ساوندكور Liberty Buds', en: 'Soundcore Liberty Buds' },
    'soundcore-life-q20-headphones': { ar: 'سماعة ساوندكور Life Q20', en: 'Soundcore Life Q20' },
    'soundcore-life-u2i-neckband': { ar: 'سماعة ساوندكور Life U2i', en: 'Soundcore Life U2i' },
    'soundcore-p20i-earbuds': { ar: 'سماعة ساوندكور P20i', en: 'Soundcore P20i' },
    'soundcore-p25i-earbuds': { ar: 'سماعة ساوندكور P25i', en: 'Soundcore P25i' },
    'soundcore-p30i-earbuds': { ar: 'سماعة ساوندكور P30i', en: 'Soundcore P30i' },
    'soundcore-p40i-earbuds': { ar: 'سماعة ساوندكور P40i', en: 'Soundcore P40i' },
    'soundcore-p41i-earbuds': { ar: 'سماعة ساوندكور P41i', en: 'Soundcore P41i' },
    'soundcore-q11i-headphones': { ar: 'سماعة ساوندكور Q11i', en: 'Soundcore Q11i' },
    'soundcore-q20i-headphones': { ar: 'سماعة ساوندكور Q20i', en: 'Soundcore Q20i' },
    'soundcore-q30-headphones': { ar: 'سماعة ساوندكور Q30', en: 'Soundcore Life Q30' },
    'soundcore-q45-headphones': { ar: 'سماعة ساوندكور سبيس Q45', en: 'Soundcore Space Q45' },
    'soundcore-r50i-vi-earbuds': { ar: 'سماعة ساوندكور R50i Vi', en: 'Soundcore R50i Vi' },
    'soundcore-rave-3-speaker': { ar: 'مكبر صوت ساوندكور Rave 3', en: 'Soundcore Rave 3' },
    'soundcore-select-4-go-speaker': { ar: 'مكبر صوت ساوندكور Select 4 Go', en: 'Soundcore Select 4 Go' },
    'soundcore-space-one-headphones': { ar: 'سماعة ساوندكور سبيس ون', en: 'Soundcore Space One' },
    'soundcore-v20i-earbuds': { ar: 'سماعة ساوندكور V20i', en: 'Soundcore V20i' },
};

/**
 * Get the Arabic product name for display
 */
export function getProductName(productId: string): { ar: string; en: string } {
    return PRODUCT_NAMES[productId] || { ar: 'منتج CairoVolt', en: 'CairoVolt Product' };
}
