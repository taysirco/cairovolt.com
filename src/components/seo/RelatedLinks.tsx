/**
 * RelatedLinks Component
 * Uses the topical map to display semantically related internal links
 * for SEO internal linking strategy
 */

import Link from 'next/link';
import { topicalMap } from '@/data/topical-map';

interface RelatedLinksProps {
    currentUrl: string; // e.g., '/anker/power-banks'
    locale: string;
    maxLinks?: number;
    variant?: 'card' | 'pill' | 'list';
}

interface RelatedLink {
    url: string;
    topic: string;
    topicAr: string;
    brand: 'anker' | 'joyroom';
}

/**
 * Get related links from the topical map based on current page URL
 */
function getRelatedLinksFromTopicalMap(currentUrl: string): RelatedLink[] {
    const relatedLinks: RelatedLink[] = [];
    const normalizedUrl = currentUrl.replace(/^\/[a-z]{2}\//, '/'); // Remove locale prefix

    // Search through all brands and clusters
    for (const [brandSlug, brandMap] of Object.entries(topicalMap)) {
        for (const cluster of brandMap.clusters) {
            // If this is the current page, get its internal links
            if (normalizedUrl.includes(cluster.url)) {
                for (const link of cluster.internalLinks || []) {
                    // Find the cluster info for this link
                    for (const [linkBrand, linkBrandMap] of Object.entries(topicalMap)) {
                        const linkedCluster = linkBrandMap.clusters.find(c => c.url === link);
                        if (linkedCluster) {
                            relatedLinks.push({
                                url: link,
                                topic: linkedCluster.topic,
                                topicAr: linkedCluster.topicAr,
                                brand: linkBrand as 'anker' | 'joyroom',
                            });
                        }
                    }
                }
            }

            // Also check if current page is in someone else's internal links
            if (cluster.internalLinks?.some(link => normalizedUrl.includes(link.split('/').pop() || ''))) {
                // Add this cluster as a related link
                if (!relatedLinks.find(l => l.url === cluster.url)) {
                    relatedLinks.push({
                        url: cluster.url,
                        topic: cluster.topic,
                        topicAr: cluster.topicAr,
                        brand: brandSlug as 'anker' | 'joyroom',
                    });
                }
            }
        }
    }

    // Remove duplicates and current page
    // STRICT: Filter by brand if we can determine the current brand context
    const currentBrand = normalizedUrl.includes('/anker') ? 'anker' :
        normalizedUrl.includes('/joyroom') ? 'joyroom' : undefined;

    return relatedLinks.filter((link, index, self) =>
        !normalizedUrl.includes(link.url) &&
        index === self.findIndex(l => l.url === link.url) &&
        (!currentBrand || link.brand === currentBrand) // Strict Brand Filter
    );
}

export default function RelatedLinks({
    currentUrl,
    locale,
    maxLinks = 4,
    variant = 'card'
}: RelatedLinksProps) {
    const isArabic = locale === 'ar';
    const relatedLinks = getRelatedLinksFromTopicalMap(currentUrl).slice(0, maxLinks);

    if (relatedLinks.length === 0) return null;

    const getLocalizedHref = (url: string) => {
        return locale === 'ar' ? url : `/${locale}${url}`;
    };

    // Card variant - for category pages
    if (variant === 'card') {
        return (
            <section className="py-8">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                    {isArabic ? 'استكشف المزيد' : 'Explore More'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedLinks.map((link) => (
                        <Link
                            key={link.url}
                            href={getLocalizedHref(link.url)}
                            className={`group p-6 rounded-xl border transition-all hover:shadow-lg text-center ${link.brand === 'anker'
                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 hover:border-blue-300'
                                : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 hover:border-red-300'
                                }`}
                        >
                            <span className={`text-sm font-medium ${link.brand === 'anker' ? 'text-blue-600' : 'text-red-600'
                                }`}>
                                {link.brand.charAt(0).toUpperCase() + link.brand.slice(1)}
                            </span>
                            <h3 className="font-bold mt-2 text-gray-900 dark:text-white group-hover:underline">
                                {isArabic ? link.topicAr : link.topic}
                            </h3>
                        </Link>
                    ))}
                </div>
            </section>
        );
    }

    // Pill variant - for product pages
    if (variant === 'pill') {
        return (
            <div className="py-6">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                    {isArabic ? 'تصفح أيضاً' : 'Browse Also'}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {relatedLinks.map((link) => (
                        <Link
                            key={link.url}
                            href={getLocalizedHref(link.url)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${link.brand === 'anker'
                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300'
                                }`}
                        >
                            {isArabic ? link.topicAr : link.topic}
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    // List variant - for footer or sidebar
    return (
        <nav className="py-4">
            <h3 className="font-bold mb-3 text-gray-900 dark:text-white">
                {isArabic ? 'روابط ذات صلة' : 'Related Links'}
            </h3>
            <ul className="space-y-2">
                {relatedLinks.map((link) => (
                    <li key={link.url}>
                        <Link
                            href={getLocalizedHref(link.url)}
                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {isArabic ? link.topicAr : link.topic}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// Export helper for use in other components
export { getRelatedLinksFromTopicalMap };
