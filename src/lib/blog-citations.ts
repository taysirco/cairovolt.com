import { isSelfControlledReference } from '@/lib/self-controlled-hosts';

/**
 * Sources an article actually links to in its body, for BlogPosting.citation.
 *
 * Until now `citation` came only from the optional `externalReferences` list,
 * which 2 of 275 articles fill in — while 83 articles already link inline to
 * the primary sources their numbers come from (support.apple.com, usb.org,
 * batteryuniversity.com, cpsc.gov, iata.org, faa.gov, anker.com …). Answer
 * engines weigh a claim by what it cites; the citations were visible to
 * readers and invisible to machines.
 *
 * Only what the reader can already see and click is emitted: every entry is
 * an <a href> in the rendered content, with its own anchor text as the name.
 * Excluded: CairoVolt-controlled properties (not independent sources), and
 * marketplaces, social networks and messaging links (places to buy or share,
 * not sources of a fact).
 */

const NON_SOURCE_HOSTS = [
    'amazon.', 'noon.com', 'jumia.', 'aliexpress.', 'temu.', 'ebay.',
    'facebook.com', 'fb.com', 'instagram.com', 'tiktok.com', 'x.com', 'twitter.com',
    'wa.me', 'whatsapp.com', 't.me', 'telegram.', 'linkedin.com', 'pinterest.',
    'bit.ly', 'goo.gl', 'linktr.ee',
];

const LINK_RE = /<a\b[^>]*?\bhref=["'](https?:\/\/[^"'\s]+)["'][^>]*>([\s\S]*?)<\/a>/gi;

function plain(text: string): string {
    return text
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&#x27;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

function isSourceUrl(url: string): boolean {
    if (isSelfControlledReference(url)) return false;
    let host = '';
    try {
        host = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
    } catch {
        return false;
    }
    return !NON_SOURCE_HOSTS.some(marker => (marker.endsWith('.')
        // "amazon." → any amazon.<tld> (amazon.eg, amazon.co.uk) or sub-domain of one.
        ? host.startsWith(marker) || host.includes(`.${marker}`)
        // A full domain matches itself and its sub-domains, never a suffix of
        // another name (x.com must not swallow dropbox.com).
        : host === marker || host.endsWith(`.${marker}`)));
}

/** Third-party source links in an article body, de-duplicated by URL, in reading order. */
export function extractContentCitations(
    html: string | undefined,
    limit = 20,
): Array<{ name: string; url: string }> {
    if (!html) return [];
    const seen = new Set<string>();
    const out: Array<{ name: string; url: string }> = [];
    for (const match of html.matchAll(LINK_RE)) {
        const url = match[1].replace(/&amp;/g, '&');
        const key = url.replace(/#.*$/, '').replace(/\/$/, '');
        if (seen.has(key) || !isSourceUrl(url)) continue;
        seen.add(key);
        let name = plain(match[2]);
        // A bare-URL or icon-only anchor still deserves a readable name.
        if (!name || /^https?:\/\//i.test(name)) {
            try { name = new URL(url).hostname.replace(/^www\./, ''); } catch { continue; }
        }
        // A one-word anchor ("Apple") names the publisher, not the work: add
        // the page address so the citation identifies what is cited.
        if (name.length < 12 && !/\.[a-z]{2,}/i.test(name)) {
            try {
                const parsed = new URL(url);
                name = `${name} — ${parsed.hostname.replace(/^www\./, '')}${parsed.pathname.replace(/\/$/, '')}`;
            } catch { /* keep the anchor text */ }
        }
        out.push({ name: name.slice(0, 160), url });
        if (out.length >= limit) break;
    }
    return out;
}
