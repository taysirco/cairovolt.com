/**
 * Order-sheet → catalog product matcher.
 *
 * The operations Google Sheet stores the product as free Arabic/English text
 * ("اسم المنتج"). Review tokens MUST carry a real catalog slug — otherwise the
 * submitted review attaches to a product page that doesn't exist and never
 * surfaces in the UI or JSON-LD. (The previous sync derived the slug with a
 * Latin-only regex over Arabic text, which produced broken slugs.)
 */
import { staticProducts } from '@/lib/static-products';

export interface MatchedProduct {
    slug: string;
    /** Canonical Arabic display name — used on the review page + WhatsApp message */
    nameAr: string;
    nameEn: string;
}

/** Normalize Arabic + Latin text for fuzzy comparison */
function normalize(input: string): string {
    return (input || '')
        .toLowerCase()
        // Strip Arabic diacritics + tatweel
        .replace(/[ً-ٰٟـ]/g, '')
        // Normalize alef variants → ا
        .replace(/[أإآٱ]/g, 'ا')
        // ة → ه , ى → ي , ؤ → و , ئ → ي
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/ؤ/g, 'و')
        .replace(/ئ/g, 'ي')
        // Drop everything that is not Arabic letter / Latin letter / digit / space
        .replace(/[^ء-يa-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function tokenize(s: string): string[] {
    // Ignore 1-char tokens and generic filler words that inflate overlap
    const STOP = new Set(['من', 'مع', 'و', 'في', 'the', 'for', 'and', 'with', 'of']);
    return normalize(s).split(' ').filter(t => t.length > 1 && !STOP.has(t));
}

interface Candidate {
    slug: string;
    nameAr: string;
    nameEn: string;
    normAr: string;
    normEn: string;
    normSlug: string;
}

let candidatesCache: Candidate[] | null = null;

function getCandidates(): Candidate[] {
    if (candidatesCache) return candidatesCache;
    candidatesCache = staticProducts.map(p => {
        const nameAr = p.translations?.ar?.name || p.slug;
        const nameEn = p.translations?.en?.name || p.slug;
        return {
            slug: p.slug,
            nameAr,
            nameEn,
            normAr: normalize(nameAr),
            normEn: normalize(nameEn),
            normSlug: normalize(p.slug.replace(/-/g, ' ')),
        };
    });
    return candidatesCache;
}

/**
 * Match a free-text product name from the order sheet to a catalog product.
 * Returns null when no candidate clears the confidence threshold — callers
 * must route those to manual handling instead of guessing.
 */
export function matchOrderProduct(sheetProductName: string): MatchedProduct | null {
    const query = normalize(sheetProductName);
    if (!query) return null;

    const candidates = getCandidates();

    // 1. Exact normalized match on any name form
    for (const c of candidates) {
        if (query === c.normAr || query === c.normEn || query === c.normSlug) {
            return { slug: c.slug, nameAr: c.nameAr, nameEn: c.nameEn };
        }
    }

    // 2. Containment (sheet text contains the full product name or vice versa)
    let containment: Candidate | null = null;
    for (const c of candidates) {
        const forms = [c.normAr, c.normEn, c.normSlug].filter(f => f.length >= 6);
        if (forms.some(f => query.includes(f) || f.includes(query))) {
            // Ambiguous containment (two different products both contain the
            // query, e.g. "باور بانك انكر") → fall through to token scoring.
            if (containment && containment.slug !== c.slug) {
                containment = null;
                break;
            }
            containment = c;
        }
    }
    if (containment) {
        return { slug: containment.slug, nameAr: containment.nameAr, nameEn: containment.nameEn };
    }

    // 3. Token-overlap scoring (Jaccard against the best of ar/en/slug forms)
    const qTokens = new Set(tokenize(sheetProductName));
    if (qTokens.size === 0) return null;

    let best: { c: Candidate; score: number } | null = null;
    let runnerUp = 0;
    for (const c of candidates) {
        let scoreForC = 0;
        for (const form of [c.normAr, c.normEn, c.normSlug]) {
            const fTokens = new Set(form.split(' ').filter(t => t.length > 1));
            if (fTokens.size === 0) continue;
            let inter = 0;
            qTokens.forEach(t => { if (fTokens.has(t)) inter++; });
            const union = qTokens.size + fTokens.size - inter;
            scoreForC = Math.max(scoreForC, union > 0 ? inter / union : 0);
        }
        if (!best || scoreForC > best.score) {
            runnerUp = best?.score ?? 0;
            best = { c, score: scoreForC };
        } else if (scoreForC > runnerUp) {
            runnerUp = scoreForC;
        }
    }

    // Require solid confidence AND clear separation from the runner-up —
    // a wrong product match would put a real customer review on the wrong page.
    if (best && best.score >= 0.6 && best.score - runnerUp >= 0.15) {
        return { slug: best.c.slug, nameAr: best.c.nameAr, nameEn: best.c.nameEn };
    }

    return null;
}
