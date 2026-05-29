// Server Component — a VERIFIED, sourced quote from an independent reviewer.
//
// Honesty guardrails (do not weaken):
//  1. Renders NOTHING unless `expertQuote.sourceUrl` is a non-empty link — an
//     unsourced quote can never appear.
//  2. Renders NOTHING if `creatorId` doesn't match a known recommended creator.
//  3. Shows a visible "source" link to the exact video/post, and labels the
//     creator as independent (not affiliated with CairoVolt).
//  4. JSON-LD uses schema.org `Quotation` with `spokenByCharacter` (→ the Person
//     @id on /team) and `citation` (→ the source URL). This is accurate markup:
//     it states "this person said this, here", not that they authored our content.
//
// The quote text itself must be REAL — supplied verbatim with its source. The
// code cannot enforce truthfulness, only that nothing shows without a source.

import { recommendedCreators } from '@/data/team-members';
import type { BlogArticle } from '@/data/blog/_types';

type Props = {
    quote: NonNullable<BlogArticle['expertQuote']>;
    locale: string;
};

export function ExpertQuote({ quote, locale }: Props) {
    const isArabic = locale === 'ar';
    const lang = isArabic ? 'ar' : 'en';

    // Guard 1: no source → render nothing (prevents unsourced quotes).
    if (!quote?.sourceUrl || !quote.sourceUrl.trim()) return null;

    // Guard 2: unknown creator → render nothing.
    const creator = recommendedCreators.find((c) => c.id === quote.creatorId);
    if (!creator) return null;

    const text = quote.quote?.[lang]?.trim();
    if (!text) return null;

    const sourceLabel =
        quote.sourceLabel?.[lang] ||
        (isArabic ? 'من مراجعته المستقلة' : 'From their independent review');

    const quotationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Quotation',
        text,
        spokenByCharacter: {
            '@type': 'Person',
            '@id': `https://cairovolt.com/team#${creator.id}`,
            name: creator.name[lang],
            ...(creator.url ? { url: creator.url } : {}),
        },
        citation: quote.sourceUrl,
    };

    return (
        <figure className="my-10 not-prose">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(quotationSchema) }}
            />
            <blockquote className="relative p-6 pt-8 bg-gradient-to-br from-blue-50 to-purple-50/50 dark:from-blue-900/15 dark:to-purple-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/40">
                <span aria-hidden className="absolute top-2 start-4 text-5xl leading-none text-blue-300/70 dark:text-blue-500/40 font-serif">“</span>
                <p className="relative text-lg leading-relaxed text-gray-800 dark:text-gray-100 font-medium">
                    {text}
                </p>
                <figcaption className="mt-5 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={creator.avatar}
                        alt={creator.name[lang]}
                        width={44}
                        height={44}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-white dark:ring-gray-800 flex-shrink-0"
                        loading="lazy"
                    />
                    <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <cite className="not-italic font-bold text-sm text-gray-900 dark:text-white">
                                {creator.url ? (
                                    <a href={creator.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                                        {creator.name[lang]}
                                    </a>
                                ) : (
                                    creator.name[lang]
                                )}
                            </cite>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                                {isArabic ? 'مراجع مستقل' : 'Independent reviewer'}
                            </span>
                        </div>
                        <a
                            href={quote.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline mt-0.5"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            {sourceLabel} — {isArabic ? 'شاهد المصدر' : 'view source'}
                        </a>
                    </div>
                </figcaption>
            </blockquote>
            <figcaption className="mt-2 text-[11px] text-gray-400 dark:text-gray-500 px-2">
                {isArabic
                    ? 'اقتباس من محتوى مستقل منشور علناً، لأغراض المرجعية. صاحبه لا تربطه علاقة عمل بكايرو فولت.'
                    : 'Quoted from publicly published independent content for reference. The author is not affiliated with CairoVolt.'}
            </figcaption>
        </figure>
    );
}
