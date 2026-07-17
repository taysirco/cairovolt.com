// Server Component — a small "further reading" list of external resources.
//
// Purpose & honesty guardrails (do not weaken):
//  1. Renders NOTHING unless at least one reference with a non-empty url is
//     supplied — an empty block never appears.
//  2. Every link is rel="nofollow noopener noreferrer": these are references
//     for the reader, NOT endorsements and NOT equity-passing links. nofollow
//     keeps this from reading as a reciprocal-link scheme.
//  3. No JSON-LD / schema is emitted here — we do not assert any relationship
//     between CairoVolt and these third-party pages beyond "further reading".
//  4. Intended to hold 1–2 topically-relevant links, well below the article's
//     own internal links, so the page never looks like a link farm.

import type { BlogArticle } from '@/data/blog/_types';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';

type Props = {
    refs: NonNullable<BlogArticle['externalReferences']>;
    locale: string;
};

export function ExternalReferences({ refs, locale }: Props) {
    const isArabic = locale === 'ar';
    const lang = isArabic ? 'ar' : 'en';

    // Guard: drop anything without a real URL; render nothing if none remain.
    const items = (refs || []).filter((r) => r?.url && r.url.trim() && r.title?.[lang]?.trim());
    if (items.length === 0) return null;

    return (
        <aside className="my-10 not-prose rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/40 p-6">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 m-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {isArabic ? 'مصادر خارجية للقراءة' : 'Further reading'}
            </h2>
            <ul className="mt-4 mb-0 space-y-3 list-none p-0">
                {items.map((r) => (
                    <li key={r.url} className="m-0">
                        <a
                            href={r.url}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="font-medium text-blue-600 dark:text-blue-400 hover:underline break-words"
                        >
                            {isArabic
                                ? localizeArabicBrandNames(r.title[lang])
                                : r.title[lang]}
                        </a>
                        {r.note?.[lang] ? (
                            <span className="block text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                {isArabic
                                    ? localizeArabicBrandNames(r.note[lang])
                                    : r.note[lang]}
                            </span>
                        ) : null}
                    </li>
                ))}
            </ul>
            <p className="mt-4 mb-0 text-[11px] text-gray-400 dark:text-gray-500">
                {isArabic
                    ? 'روابط لمصادر خارجية مستقلة لأغراض القراءة الإضافية. كايرو فولت غير مسؤولة عن محتوى المواقع الخارجية.'
                    : 'Links to independent external resources for additional reading. CairoVolt is not responsible for third-party content.'}
            </p>
        </aside>
    );
}
