import Link from 'next/link';
import type { LabIndexRow } from '@/lib/lab-index';
import { groupLabIndexByBrand } from '@/lib/lab-index';
import { getBrandDisplayName } from '@/lib/arabic-brand-names';

/**
 * Live measured-lab index for /lab (AR + EN), grouped by brand for scanability.
 */
export default function LabMeasuredIndex({
    rows,
    isArabic,
}: {
    rows: LabIndexRow[];
    isArabic: boolean;
}) {
    if (!rows.length) {
        return (
            <p className="text-sm text-slate-600 dark:text-slate-300">
                {isArabic
                    ? 'لا توجد تقارير مختبر منشورة حاليًا في الكتالوج النشط.'
                    : 'No published bench reports are currently listed in the active catalog.'}
            </p>
        );
    }

    const groups = groupLabIndexByBrand(rows);
    const locale = isArabic ? 'ar' : 'en';

    return (
        <div className="space-y-8">
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                {isArabic
                    ? `${rows.length} منتجًا بتقرير قياس منشور عبر ${groups.length} علامات. كل صف من ورقة benchTest الفعلية — الخلاصة والتاريخ وSKU ورابط صفحة المنتج.`
                    : `${rows.length} products with a published measurement report across ${groups.length} brands. Each row comes from a real benchTest sheet — verdict, date, SKU, and product-page link.`}
            </p>

            {groups.map(group => {
                const brandLabel = getBrandDisplayName(group.brand, locale);
                return (
                    <section key={group.brand} aria-labelledby={`lab-brand-${group.brand}`}>
                        <h3
                            id={`lab-brand-${group.brand}`}
                            className="mb-3 text-lg font-bold text-slate-900 dark:text-white"
                        >
                            {brandLabel}
                            <span className="ms-2 text-sm font-normal text-slate-500">
                                ({group.rows.length})
                            </span>
                        </h3>

                        {/* Desktop table */}
                        <div className="mb-3 hidden overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 md:block">
                            <table className="w-full min-w-[720px] text-sm">
                                <thead className="bg-slate-100 text-start dark:bg-slate-900">
                                    <tr className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                        <th scope="col" className="px-4 py-3 font-semibold">SKU</th>
                                        <th scope="col" className="px-4 py-3 font-semibold">
                                            {isArabic ? 'المنتج' : 'Product'}
                                        </th>
                                        <th scope="col" className="px-4 py-3 font-semibold">
                                            {isArabic ? 'الخلاصة' : 'Verdict'}
                                        </th>
                                        <th scope="col" className="px-4 py-3 font-semibold">
                                            {isArabic ? 'التاريخ' : 'Date'}
                                        </th>
                                        <th scope="col" className="px-4 py-3 font-semibold">
                                            {isArabic ? 'الصفحة' : 'Page'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.rows.map(row => {
                                        const name = isArabic ? row.nameAr : row.nameEn;
                                        const verdict = isArabic ? row.verdictAr : row.verdictEn;
                                        const href = isArabic ? row.productUrlAr : row.productUrlEn;
                                        const path = href.replace('https://cairovolt.com', '') || '/';
                                        return (
                                            <tr
                                                key={row.slug}
                                                className="border-t border-slate-200 align-top dark:border-slate-800"
                                            >
                                                <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                                                    {row.benchSku || row.sku}
                                                    {row.sampleId ? (
                                                        <div className="mt-1 text-[10px] text-slate-400">
                                                            {row.sampleId}
                                                        </div>
                                                    ) : null}
                                                </td>
                                                <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                                                    <Link href={path} className="text-blue-700 hover:underline dark:text-blue-300">
                                                        {name}
                                                    </Link>
                                                    <div className="mt-1 text-xs font-normal text-slate-500">
                                                        {row.categorySlug}
                                                    </div>
                                                </td>
                                                <td
                                                    className="max-w-md px-4 py-3 leading-6 text-slate-700 dark:text-slate-300"
                                                    data-speakable="lab-index-verdict"
                                                >
                                                    {verdict || '—'}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3 text-slate-600 dark:text-slate-400">
                                                    {row.testDate || '—'}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Link
                                                        href={path}
                                                        className="font-semibold text-blue-700 hover:underline dark:text-blue-300"
                                                    >
                                                        {isArabic ? 'افتح' : 'Open'}
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="space-y-3 md:hidden">
                            {group.rows.map(row => {
                                const name = isArabic ? row.nameAr : row.nameEn;
                                const verdict = isArabic ? row.verdictAr : row.verdictEn;
                                const href = isArabic ? row.productUrlAr : row.productUrlEn;
                                const path = href.replace('https://cairovolt.com', '') || '/';
                                return (
                                    <article
                                        key={row.slug}
                                        className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
                                    >
                                        <div className="font-mono text-xs text-slate-500">
                                            {row.benchSku || row.sku} · {row.testDate || '—'}
                                        </div>
                                        <h4 className="mt-1 font-bold text-slate-900 dark:text-white">
                                            <Link href={path} className="hover:underline">
                                                {name}
                                            </Link>
                                        </h4>
                                        <p
                                            className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300"
                                            data-speakable="lab-index-verdict"
                                        >
                                            {verdict || '—'}
                                        </p>
                                        <Link
                                            href={path}
                                            className="mt-3 inline-flex text-sm font-semibold text-blue-700 dark:text-blue-300"
                                        >
                                            {isArabic ? 'افتح صفحة المنتج' : 'Open product page'}
                                        </Link>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                );
            })}

            <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
                {isArabic ? (
                    <>
                        تصدير آلي للوكلاء:{' '}
                        <a className="underline" href="https://cairovolt.com/api/lab-data/json">
                            /api/lab-data/json
                        </a>
                        {' · '}
                        <a className="underline" href="https://cairovolt.com/api/lab-data/csv">
                            CSV
                        </a>
                        {' · '}
                        <a className="underline" href="https://cairovolt.com/lab">
                            /lab
                        </a>
                    </>
                ) : (
                    <>
                        Machine export for agents:{' '}
                        <a className="underline" href="https://cairovolt.com/api/lab-data/json">
                            /api/lab-data/json
                        </a>
                        {' · '}
                        <a className="underline" href="https://cairovolt.com/api/lab-data/csv">
                            CSV
                        </a>
                        {' · '}
                        <a className="underline" href="https://cairovolt.com/en/lab">
                            /en/lab
                        </a>
                    </>
                )}
            </p>
        </div>
    );
}
