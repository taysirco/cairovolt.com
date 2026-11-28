import Link from 'next/link';
import type { SiblingComparisonData } from '@/lib/sibling-comparisons';

interface SiblingQuickCompareProps {
    data: SiblingComparisonData;
    locale: string;
}

/**
 * Compact, always-visible SSR comparison card between adjacent Soundcore tiers.
 * Helps shoppers choose between sibling models directly on the page instead of
 * bouncing back to search, using live server-resolved catalogue prices.
 */
export default function SiblingQuickCompare({ data, locale }: SiblingQuickCompareProps) {
    const isAr = locale === 'ar';
    const currency = isAr ? 'ج.م' : 'EGP';

    return (
        <aside
            aria-label={data.heading}
            className="mt-6 rounded-2xl border border-orange-200/80 dark:border-orange-900/50 bg-gradient-to-br from-orange-50/70 via-white to-amber-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-orange-950/20 p-4 shadow-sm"
        >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                    <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                        {data.heading}
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                        {data.subheading}
                    </p>
                </div>
                <Link
                    href={data.siblingHref}
                    className="inline-flex items-center gap-1 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-3 py-1.5 transition-colors shrink-0"
                >
                    {data.siblingCta}
                    <span aria-hidden="true">{isAr ? '←' : '→'}</span>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-orange-200/70 dark:border-gray-800 text-gray-600 dark:text-gray-400">
                            <th className="py-2 pe-2 text-start font-semibold w-[28%]">
                                {isAr ? 'المعيار' : 'Spec'}
                            </th>
                            <th className="py-2 px-2 text-start font-bold text-gray-900 dark:text-white w-[36%]">
                                {data.currentLabel}
                                <span className="block text-[11px] font-semibold text-orange-700 dark:text-orange-400">
                                    {data.currentPrice.toLocaleString('en-US')} {currency}
                                </span>
                            </th>
                            <th className="py-2 ps-2 text-start font-bold text-blue-700 dark:text-blue-400 w-[36%]">
                                <Link href={data.siblingHref} className="hover:underline">
                                    {data.siblingLabel}
                                </Link>
                                <span className="block text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                                    {data.siblingPrice.toLocaleString('en-US')} {currency}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-100/80 dark:divide-gray-800/80">
                        {data.rows.map((row) => (
                            <tr key={row.label}>
                                <td className="py-2 pe-2 text-gray-600 dark:text-gray-400 font-medium align-top">
                                    {row.label}
                                </td>
                                <td className="py-2 px-2 text-gray-900 dark:text-gray-100 font-semibold align-top">
                                    {row.currentValue}
                                </td>
                                <td className="py-2 ps-2 text-gray-700 dark:text-gray-300 align-top">
                                    {row.siblingValue}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {data.comparisonGuide && (
                <div className="mt-3 pt-2.5 border-t border-orange-100 dark:border-gray-800">
                    <Link
                        href={data.comparisonGuide.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline"
                    >
                        <span>{data.comparisonGuide.label}</span>
                        <span aria-hidden="true">{isAr ? '←' : '→'}</span>
                    </Link>
                </div>
            )}

            {data.disambiguationNote && (
                <p className="mt-3 pt-2.5 border-t border-orange-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400">
                    {data.disambiguationNote.prefix}
                    <Link
                        href={data.disambiguationNote.href}
                        className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
                    >
                        {data.disambiguationNote.linkText}
                    </Link>
                    {data.disambiguationNote.suffix}
                </p>
            )}
        </aside>
    );
}
