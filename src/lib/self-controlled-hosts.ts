// CairoVolt's own properties — its site, and the accounts it controls on
// third-party platforms (tumblr.com/cairovolteg, gamesuy.wordpress.com,
// github.com/althaqelco, a yumpu upload, a rubygems gem) — are not independent
// sources. Linking them from articles as "references" reads as a link scheme,
// and they were removed from every article on 2026-10-05. This is the single
// list every reference surface filters through (visible "further reading",
// Article.citation JSON-LD, markdown twins), so a re-added one never renders.
//
// Matched against host AND path: a self-owned account usually lives in the
// path (tumblr.com/cairovolteg, github.com/althaqelco/...), so a host-only
// check lets it through.
const SELF_CONTROLLED_MARKERS = ['cairovolt', 'cairovolteg', 'althaqelco', 'gamesuy', 'yumpu.com', 'rubygems.org'];

/** True for a URL on a CairoVolt-controlled property (or an unparseable URL). */
export function isSelfControlledReference(url: string): boolean {
    try {
        const parsed = new URL(url);
        const target = `${parsed.hostname}${parsed.pathname}`.toLowerCase();
        return SELF_CONTROLLED_MARKERS.some(marker => target.includes(marker));
    } catch {
        return true;
    }
}
