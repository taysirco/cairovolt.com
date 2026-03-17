'use client';

import Link from 'next/link';
import { getInternalLinksForPage, getSupportingContent } from '@/data/content-graph';

interface RelatedLinksSectionProps {
    brandSlug: string;
    categorySlug: string;
    locale: string;
}

export function RelatedLinksSection({ brandSlug, categorySlug, locale }: RelatedLinksSectionProps) {
    const isArabic = locale === 'ar';
    const pageUrl = `/${brandSlug}/${categorySlug}`;

    // Get internal links from content graph
    const internalLinks = getInternalLinksForPage(pageUrl);

    // Get supporting content for additional context
    const supportingContent = getSupportingContent(brandSlug, categorySlug);

    if (internalLinks.length === 0) return null;

    // Parse links to get category names
    const linkData = internalLinks.map(link => {
        const parts = link.split('/').filter(Boolean);
        const brand = parts[0] || '';
        const category = parts[1] || '';

        // Convert slug to readable name
        const categoryName = category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);

        return {
            href: `/${locale}${link}`,
            categoryName,
            brandName,
            label: isArabic
                ? `${getCategoryNameAr(category)} ${brandName}`
                : `${brandName} ${categoryName}`,
        };
    });

    return (
        <section className="mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                {isArabic ? 'قد يعجبك أيضاً' : 'You May Also Like'}
            </h2>

            {/* Related Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {linkData.slice(0, 4).map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="group p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                    >
                        <span className="block text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {link.label}
                        </span>
                        <span className="block mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {isArabic ? 'تسوق الآن ←' : 'Shop Now →'}
                        </span>
                    </Link>
                ))}
            </div>

            {/* Supporting Content Links (if available) */}
            {supportingContent.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        {isArabic ? 'مقالات ودلائل مفيدة' : 'Helpful Guides'}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {supportingContent.slice(0, 4).map((content, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <span className="text-blue-500">📘</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    {isArabic ? content.topicAr : content.topic}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}

// Helper function to get Arabic category names
function getCategoryNameAr(slug: string): string {
    const categoryNamesAr: Record<string, string> = {
        'power-banks': 'باور بانك',
        'wall-chargers': 'شواحن حائط',
        'cables': 'كابلات شحن',
        'car-chargers': 'شواحن سيارة',
        'audio': 'سماعات',
        'earbuds': 'ايربودز',
        'speakers': 'مكبرات صوت',
        'smart-watches': 'ساعات ذكية',
        'car-holders': 'حوامل سيارة',
    };
    return categoryNamesAr[slug] || slug;
}

export default RelatedLinksSection;
