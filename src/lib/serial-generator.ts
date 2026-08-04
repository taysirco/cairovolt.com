import { randomInt } from 'node:crypto';
import { localizeArabicBrandNames } from './arabic-brand-names';
export { PRODUCT_NAMES, getProductName } from './product-names';

/**
 * CairoVolt serial and warranty-code generator.
 * 
 * Generates unique serial codes and warranty numbers for CairoVolt warranty records.
 * Uses a restricted alphabet (no O/0/I/1/L) to eliminate human reading confusion.
 * 
 * ══════════════════════════════════════════════════
 * Serial Format:  CV-1xxxxxm313
 * ──────────────────────────────────────────────────
 *   CV-1  → Fixed CairoVolt prefix
 *   xxxxx → 5 random characters (unique per unit)
 *   m313  → Fixed suffix used by the CairoVolt serial format
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
const SERIAL_PREFIX = 'CV-1';         // Fixed CairoVolt prefix
const SERIAL_SUFFIX = 'm313';         // Fixed format suffix
const RANDOM_LENGTH = 5;              // Variable portion length
const FULL_SERIAL_LENGTH = SERIAL_PREFIX.length + RANDOM_LENGTH + SERIAL_SUFFIX.length; // 13

// Safe alphabet: 31 chars — no O/0/I/1/L to avoid visual confusion on printed cards
const SAFE_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

/**
 * Generate a random string of given length from the safe alphabet
 */
function randomChars(length: number): string {
    return Array.from(
        { length },
        () => SAFE_ALPHABET[randomInt(SAFE_ALPHABET.length)],
    ).join('');
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
 * Extract the 5-character variable portion from a full serial
 * e.g., "CV-1A7K2Mm313" → "A7K2M"
 */
export function extractSerialVariable(serial: string): string {
    return serial.substring(SERIAL_PREFIX.length, SERIAL_PREFIX.length + RANDOM_LENGTH);
}

/**
 * Reconstruct full serial from the 5-character variable portion
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
        utm_campaign: 'warranty-verification',
    });
    return `${base}?${params.toString()}`;
}

/** Export constants for reuse */
export { SERIAL_PREFIX, SERIAL_SUFFIX, RANDOM_LENGTH, FULL_SERIAL_LENGTH };

/** Document shape for Firestore */
export interface SerialDocument {
    code: string;
    productId: string | null;  // Product association (stored in DB, NOT in serial)
    batchId: string;
    status: 'unused' | 'activated';
    createdAt: Date;
    activatedAt: Date | null;
    warrantyCode: string | null;
    warrantyExpiresAt: Date | null;
    warrantyDurationMonths?: number | null;
    warrantyTermsUrl?: '/warranty';
}

