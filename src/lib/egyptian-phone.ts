// Shared Egyptian mobile-number normalization + validation, used by both the
// checkout UI (so pasted numbers are accepted) and the order API (defense in
// depth). Egyptian mobiles are national format 01X‑XXXXXXXX (11 digits) with a
// carrier prefix of 010 / 011 / 012 / 015. Customers frequently paste the
// international forms their phone stores (+20 1X…, 0020 1X…), or a bare 1X…
// with the leading zero dropped — all of which must resolve to the national
// number the CRM and couriers expect.

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/** Fold Arabic-Indic digits to ASCII so ٠١٠… normalizes like 010…. */
export function convertArabicToEnglish(str: string): string {
    let result = str;
    ARABIC_DIGITS.forEach((arabic, index) => {
        result = result.replace(new RegExp(arabic, 'g'), String(index));
    });
    return result;
}

/**
 * Normalize any Egyptian mobile the customer might enter or paste down to the
 * national 01X… form (max 11 digits). Manually-typed national numbers pass
 * through unchanged. Non-Egyptian / malformed input is returned digit-stripped
 * so the caller's validation can reject it cleanly.
 */
export function normalizeEgyptianPhone(raw: unknown): string {
    let d = convertArabicToEnglish(String(raw ?? '')).replace(/[^0-9]/g, '');
    if (d.startsWith('0020')) d = d.slice(4);                       // 0020 1X… → 1X…
    else if (d.startsWith('20') && d.length > 10) d = d.slice(2);   // +20 1X… → 1X…
    if (/^1[0125]\d{8}$/.test(d)) d = '0' + d;                      // restore national leading 0
    return d.slice(0, 11);
}

/** True only for a well-formed national Egyptian mobile (01[0125] + 8 digits). */
export function isValidEgyptianPhone(phone: string): boolean {
    return /^01[0125][0-9]{8}$/.test(phone);
}
