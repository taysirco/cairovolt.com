import { NextResponse } from 'next/server';

/**
 * Security contact policy — /.well-known/security.txt
 *
 * RFC 9116. Completes the /.well-known discovery surface alongside
 * llms.txt, llms-full.txt, and api-catalog, and gives crawlers, scanners,
 * and researchers one published place to report an issue instead of
 * guessing at an address.
 *
 * `Expires` is regenerated on each revalidation (RFC 9116 §2.5.5 requires a
 * future date, recommended under one year) so the document never goes stale.
 *
 * Spec: https://www.rfc-editor.org/rfc/rfc9116
 */

export const revalidate = 86400; // 24h ISR — keeps Expires rolling forward

const BASE_URL = 'https://cairovolt.com';

export function GET() {
    // ~6 months out: comfortably inside the RFC's one-year ceiling and
    // refreshed daily by ISR, so the file is never served expired.
    const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString();

    const content = `# Security contact for CairoVolt (${BASE_URL})
# جهة التواصل الأمني لكايرو فولت
# Please report suspected vulnerabilities privately to the address below.

Contact: mailto:info@cairovolt.com
Expires: ${expires}
Preferred-Languages: ar, en
Canonical: ${BASE_URL}/.well-known/security.txt
Policy: ${BASE_URL}/terms
`;

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            // Discovery document, not a search result.
            'X-Robots-Tag': 'noindex',
        },
    });
}
