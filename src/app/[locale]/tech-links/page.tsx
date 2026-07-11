// Disposable discovery scaffold (Tier-2, Rule 22 — index-acceleration).
//
// PURPOSE: give Googlebot a one-time crawl path to a set of low-authority
// third-party pages so it DISCOVERS them, then tear this page down. This is the
// riskier half of the plan, so it is deliberately constrained:
//
//  • DORMANT by default — returns 404 unless env ENABLE_DISCOVERY_HUB === '1'.
//    Deploying the branch does NOT expose it; the owner switches it on
//    consciously, and only for the short discovery window.
//  • noindex, follow — the thin page itself is never indexed; Googlebot still
//    follows the links (discovery).
//  • Every outbound link is rel="nofollow noopener" — no equity, no reciprocal
//    signal. NOT in the sitemap, NOT linked from the site nav.
//  • TEARDOWN: once the targets are indexed, run
//    `node scripts/discovery-teardown.mjs` to add a 301 redirect for this path
//    and empty the list. See DEPLOY_GUIDE in the backlink-engineering repo.
//
// Nothing here is endorsed by CairoVolt.

import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { discoveryLinks } from '@/data/discovery-hub';

export const metadata: Metadata = {
    robots: { index: false, follow: true },
};

type Props = { params: Promise<{ locale: string }> };

export default async function TechLinksPage({ params }: Props) {
    const { locale } = await params;

    // Hard gate: dormant unless explicitly enabled by the site owner.
    if (process.env.ENABLE_DISCOVERY_HUB !== '1') notFound();

    setRequestLocale(locale);
    const isArabic = locale === 'ar';
    const links = discoveryLinks.filter((l) => !l.indexed);

    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-2xl font-bold mb-4">
                {isArabic ? 'مراجع تقنية خارجية' : 'External tech references'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                {isArabic
                    ? 'قائمة مراجع خارجية مستقلة. كايرو فولت غير مسؤولة عن محتوى هذه المواقع.'
                    : 'A list of independent external references. CairoVolt is not responsible for their content.'}
            </p>
            <ul className="space-y-2">
                {links.map((l) => (
                    <li key={l.url}>
                        <a href={l.url} rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline break-words">
                            {l.url}
                        </a>
                    </li>
                ))}
            </ul>
        </main>
    );
}
