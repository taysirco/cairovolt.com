import type { BenchTest, LocalizedText } from '@/data/details/_types';
import CollapsibleSection from './CollapsibleSection';

/**
 * Renders a real, hands-on CairoVolt bench test on a product page.
 * Editorial evidence only — deliberately NO star rating and NO Review/
 * AggregateRating JSON-LD (Google disallows self-authored review markup for
 * products a merchant sells). Customer star ratings live in the reviews system.
 *
 * Section title stays visible; full body (verdict + methodology + results)
 * collapses via native <details> so content remains in the HTML for SEO/AEO.
 */

const AR_MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const EN_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function fmtDate(iso: string, isRTL: boolean): string {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    const month = (isRTL ? AR_MONTHS : EN_MONTHS)[m - 1] ?? String(m);
    return `${d} ${month} ${y}`;
}

export default function BenchTestSection({ data, isRTL }: { data: BenchTest; isRTL: boolean }) {
    const t = (v?: LocalizedText): string => (v == null ? '' : typeof v === 'string' ? v : isRTL ? v.ar : v.en);

    return (
        <section
            className="p-6 md:p-8 border-t border-gray-100 dark:border-gray-800"
            aria-label={isRTL ? 'اختبار كايرو فولت المعملي' : 'CairoVolt bench test'}
        >
            <CollapsibleSection
                summary={
                    <div className="text-start min-w-0">
                        <h2 className="text-2xl font-bold flex items-center gap-2" data-speakable="lab-heading">
                            <span aria-hidden>🔬</span>
                            {isRTL ? 'مُختبَر في كايرو فولت' : 'Bench-tested at CairoVolt'}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-normal">
                            {isRTL
                                ? 'قياس عملي حقيقي على الوحدة — اضغط لعرض الخلاصة والأرقام.'
                                : 'A real hands-on measurement — tap to show the verdict and numbers.'}
                        </p>
                    </div>
                }
            >
                <div className="rounded-xl border-s-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 md:p-5">
                    <h3 className="font-bold mb-1 text-blue-900 dark:text-blue-200">{isRTL ? 'الخلاصة' : 'The verdict'}</h3>
                    <p
                        className="text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-200"
                        data-speakable="lab-verdict"
                    >
                        {t(data.verdict)}
                    </p>
                </div>

                <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 p-4 md:p-5 my-6">
                    <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
                        {isRTL ? 'إزاي اختبرناه' : 'How we tested it'}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-4">{t(data.methodology)}</p>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">{isRTL ? 'المعدّات: ' : 'Equipment: '}</span>
                        {data.equipment.map((e, i) => (
                            <span key={e.name}>
                                {i > 0 ? ' · ' : ''}
                                <span className="font-mono">{e.name}</span> ({t(e.use)})
                            </span>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm md:text-base min-w-[520px]">
                        <thead>
                            <tr className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                <th className="py-3 text-start font-semibold">{isRTL ? 'المقياس' : 'Metric'}</th>
                                <th className="py-3 text-start font-semibold">{isRTL ? 'المصنّع' : 'Rated'}</th>
                                <th className="py-3 text-start font-semibold">{isRTL ? 'قِسناه' : 'Measured'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {data.results.map((r, i) => (
                                <tr key={i}>
                                    <td className="py-3 pe-3 text-gray-700 dark:text-gray-300 align-top">
                                        {t(r.param)}
                                        {r.note && (
                                            <span className="block text-xs text-gray-400 dark:text-gray-500 font-normal">{t(r.note)}</span>
                                        )}
                                    </td>
                                    <td className="py-3 pe-3 text-gray-500 dark:text-gray-400 align-top whitespace-nowrap">{t(r.rated) || '—'}</td>
                                    <td className="py-3 font-bold text-gray-900 dark:text-white align-top whitespace-nowrap">{t(r.measured)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div>
                        <h3 className="font-bold mb-2 text-green-700 dark:text-green-400">
                            {isRTL ? '✅ ميزات (قِسناها)' : '✅ Strengths (measured)'}
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            {data.pros.map((p, i) => (
                                <li key={i} className="flex gap-2"><span aria-hidden className="text-green-600">•</span><span>{t(p)}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2 text-amber-700 dark:text-amber-400">
                            {isRTL ? '⚠️ حدود (قِسناها)' : '⚠️ Limitations (measured)'}
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            {data.limits.map((p, i) => (
                                <li key={i} className="flex gap-2"><span aria-hidden className="text-amber-600">•</span><span>{t(p)}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <p>
                        <span className="font-semibold">{isRTL ? 'العيّنة: ' : 'Sample: '}</span>
                        <span className="font-mono">{data.sampleId}</span> · {t(data.conditions)}
                    </p>
                    <p>
                        <span className="font-semibold">{isRTL ? 'التاريخ: ' : 'Tested: '}</span>
                        {fmtDate(data.testDate, isRTL)} · <span className="font-semibold">{isRTL ? 'المسؤول: ' : 'By: '}</span>{t(data.engineer)}
                    </p>
                    <p className="italic">
                        {isRTL
                            ? 'قياس فعلي على وحدة واحدة — تقديري وليس مضمونًا لكل الوحدات؛ يُفضّل التحقق على الوحدة المستلمة.'
                            : 'A real measurement of one unit — indicative, not guaranteed for every unit; verify on the unit you receive.'}
                    </p>
                </div>
            </CollapsibleSection>
        </section>
    );
}
