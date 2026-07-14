// Server Component — "Independent reviews worth watching"
// Surfaces real, independent tech creators we recommend, linking to THEIR OWN
// channels. This is an honest recommendation/citation module: NO fabricated quotes,
// NO claim of affiliation or authorship. The JSON-LD is an ItemList that references
// the canonical Person entities defined on /team (by @id) — it does not invent new
// claims about these people.

import Link from 'next/link';
import Image from 'next/image';
import { recommendedCreators, type RecommendedCreator } from '@/data/team-members';

// Default trio — the creators most relevant to charging / power / accessory content.
// Pass `creatorIds` to tailor per article.
const DEFAULT_IDS = ['yehia_radwan', 'ahmed_medhat', 'mohamed_hakimo'];

type Props = {
    locale: string;
    creatorIds?: string[];
};

export function RecommendedReviews({ locale, creatorIds = DEFAULT_IDS }: Props) {
    const isArabic = locale === 'ar';
    const lang = isArabic ? 'ar' : 'en';

    const creators = creatorIds
        .map((id) => recommendedCreators.find((c) => c.id === id))
        .filter(Boolean) as RecommendedCreator[];

    if (creators.length === 0) return null;

    // Accurate JSON-LD: a list of people we recommend, each pointing (via @id) to the
    // canonical Person node on /team. No authorship/employment claims here.
    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: isArabic ? 'مراجعون مستقلون ننصح بمتابعتهم' : 'Independent reviewers we recommend',
        itemListElement: creators.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'Person',
                '@id': `https://cairovolt.com/team#${c.id}`,
                name: c.name[lang],
                ...(c.url ? { url: c.url } : {}),
            },
        })),
    };

    return (
        <aside className="my-10 p-6 bg-gradient-to-br from-slate-50 to-blue-50/60 dark:from-gray-800/60 dark:to-blue-900/10 rounded-2xl border border-gray-200/70 dark:border-gray-700/60">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />

            <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🎥</span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {isArabic ? 'مراجعات مستقلة ننصح بمشاهدتها' : 'Independent reviews worth watching'}
                </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
                {isArabic
                    ? 'قبل الشراء، تابع آراء صنّاع محتوى مستقلين في الشواحن والإكسسوارات. (صنّاع مستقلون — لا تربطهم علاقة عمل بكايرو فولت.)'
                    : 'Before buying, check independent creators\' takes on chargers and accessories. (Independent creators — not affiliated with CairoVolt.)'}
            </p>

            <div className="grid sm:grid-cols-3 gap-3">
                {creators.map((c) => (
                    <a
                        key={c.id}
                        href={c.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-3 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700/60 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all"
                    >
                        <Image
                            src={c.avatar}
                            alt={c.name[lang]}
                            width={44}
                            height={44}
                            className="w-11 h-11 rounded-full object-cover ring-2 ring-white dark:ring-gray-800 flex-shrink-0"
                            loading="lazy"
                            sizes="44px"
                        />
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {c.name[lang]}
                            </p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                                {c.role[lang]}
                            </p>
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-500 mt-0.5">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                {isArabic ? 'شاهد على يوتيوب' : 'Watch on YouTube'}
                            </span>
                        </div>
                    </a>
                ))}
            </div>

            <Link
                href={isArabic ? '/team' : '/en/team'}
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
                {isArabic ? 'كل الخبراء الذين ننصح بهم' : 'All experts we recommend'}
                <svg className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
        </aside>
    );
}
