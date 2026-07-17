import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';
import {
    categoryDiscovery,
    type DiscoveryCollectionKey,
    type DiscoveryTone,
    type DiscoveryVisual,
    type LocalizedCopy,
} from '@/data/category-discovery';

type SourceCategory = {
    href: string;
    icon: string;
    title: LocalizedCopy;
    description: LocalizedCopy;
    badge?: LocalizedCopy;
};

type Props = {
    collection: DiscoveryCollectionKey;
    categories: SourceCategory[];
    locale: string;
    pageName: string;
    pageDescription: string;
};

const toneClasses: Record<DiscoveryTone, {
    card: string;
    icon: string;
    label: string;
    glow: string;
    ring: string;
}> = {
    sky: {
        card: 'border-[#d6e6fb] bg-[#e8f2ff] hover:border-blue-300',
        icon: 'border-white bg-white/75 text-blue-700',
        label: 'text-blue-800',
        glow: 'bg-blue-300/30',
        ring: 'focus-visible:ring-blue-600',
    },
    indigo: {
        card: 'border-[#dcdffc] bg-[#eef0ff] hover:border-indigo-300',
        icon: 'border-white bg-white/75 text-indigo-700',
        label: 'text-indigo-800',
        glow: 'bg-indigo-300/30',
        ring: 'focus-visible:ring-indigo-600',
    },
    sand: {
        card: 'border-[#eaded5] bg-[#f6eee8] hover:border-amber-300',
        icon: 'border-white bg-white/75 text-amber-800',
        label: 'text-amber-900',
        glow: 'bg-amber-200/35',
        ring: 'focus-visible:ring-amber-700',
    },
    mint: {
        card: 'border-[#d4e9e2] bg-[#eaf7f1] hover:border-emerald-300',
        icon: 'border-white bg-white/75 text-emerald-800',
        label: 'text-emerald-900',
        glow: 'bg-emerald-200/35',
        ring: 'focus-visible:ring-emerald-700',
    },
    violet: {
        card: 'border-[#ded7f6] bg-[#f1edff] hover:border-violet-300',
        icon: 'border-white bg-white/75 text-violet-800',
        label: 'text-violet-900',
        glow: 'bg-violet-300/30',
        ring: 'focus-visible:ring-violet-700',
    },
    rose: {
        card: 'border-[#f1d9e3] bg-[#fff0f5] hover:border-rose-300',
        icon: 'border-white bg-white/75 text-rose-800',
        label: 'text-rose-900',
        glow: 'bg-rose-200/35',
        ring: 'focus-visible:ring-rose-700',
    },
    peach: {
        card: 'border-[#f0daca] bg-[#fff0e8] hover:border-orange-300',
        icon: 'border-white bg-white/75 text-orange-800',
        label: 'text-orange-900',
        glow: 'bg-orange-200/35',
        ring: 'focus-visible:ring-orange-700',
    },
    cyan: {
        card: 'border-[#cfebed] bg-[#eaf8f8] hover:border-cyan-300',
        icon: 'border-white bg-white/75 text-cyan-800',
        label: 'text-cyan-900',
        glow: 'bg-cyan-200/35',
        ring: 'focus-visible:ring-cyan-700',
    },
};

const visualClasses: Record<DiscoveryVisual, string> = {
    balanced: 'max-w-[132px]',
    wide: 'max-w-[145px]',
    tall: 'max-w-[116px]',
    white: 'max-w-[132px]',
};

const accentClasses = {
    blue: 'text-blue-700',
    red: 'text-red-700',
    orange: 'text-orange-700',
} as const;

const arrow = (isArabic: boolean) => (isArabic ? '←' : '→');

export default function CategoryDiscoveryGrid({
    collection,
    categories,
    locale,
    pageName,
    pageDescription,
}: Props) {
    const isArabic = locale === 'ar';
    const language = isArabic ? 'ar' : 'en';
    const content = categoryDiscovery[collection];
    const localizedPrefix = isArabic ? '' : '/en';
    const pageUrl = `https://cairovolt.com${localizedPrefix}/${collection}`;

    const visibleCategories = categories.flatMap((category) => {
        const presentation = content.items[category.href];
        return presentation ? [{ category, presentation }] : [];
    });
    const imageObjectId = (index: number) => `${pageUrl}#category-image-${index + 1}`;

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${pageUrl}#collectionpage`,
                url: pageUrl,
                name: pageName,
                description: pageDescription,
                inLanguage: isArabic ? 'ar-EG' : 'en-EG',
                isPartOf: { '@id': 'https://cairovolt.com/#website' },
                about: {
                    '@type': 'Brand',
                    name: content.sourceBrand,
                },
                spatialCoverage: {
                    '@type': 'Country',
                    name: isArabic ? 'مصر' : 'Egypt',
                    sameAs: 'https://www.wikidata.org/wiki/Q79',
                },
                primaryImageOfPage: visibleCategories[0]
                    ? { '@id': imageObjectId(0) }
                    : undefined,
                hasPart: visibleCategories.map(({ category }) => ({
                    '@type': 'CollectionPage',
                    '@id': `https://cairovolt.com${localizedPrefix}${category.href}#collectionpage`,
                    url: `https://cairovolt.com${localizedPrefix}${category.href}`,
                    name: category.title[language],
                    description: category.description[language],
                })),
                mainEntity: {
                    '@type': 'ItemList',
                    '@id': `${pageUrl}#category-list`,
                    name: content.title[language],
                    numberOfItems: visibleCategories.length,
                    itemListElement: visibleCategories.map(({ category, presentation }, index) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        name: category.title[language],
                        description: presentation.description[language],
                        url: `https://cairovolt.com${localizedPrefix}${category.href}`,
                        image: `https://cairovolt.com${presentation.imageBase}-800.webp`,
                    })),
                },
            },
            ...visibleCategories.map(({ presentation }, index) => ({
                '@type': 'ImageObject',
                '@id': imageObjectId(index),
                contentUrl: `https://cairovolt.com${presentation.imageBase}-800.webp`,
                thumbnailUrl: `https://cairovolt.com${presentation.imageBase}-480.webp`,
                name: presentation.alt[language],
                caption: presentation.alt[language],
                description: presentation.description[language],
                encodingFormat: 'image/webp',
                width: 800,
                height: 800,
                inLanguage: isArabic ? 'ar-EG' : 'en-EG',
                isPartOf: { '@id': `${pageUrl}#collectionpage` },
                position: index + 1,
            })),
        ],
    };

    return (
        <section
            id="shop-by-category"
            aria-labelledby={`${collection}-category-heading`}
            className="scroll-mt-32 bg-[#f5f6f8] py-4 text-[#07111f] sm:py-5"
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="mb-3 grid gap-2 lg:grid-cols-2 lg:items-end lg:gap-8">
                    <div>
                        <h2
                            id={`${collection}-category-heading`}
                            className="flex items-start gap-2 text-xl font-black leading-tight tracking-[-0.025em] sm:text-2xl lg:text-3xl"
                        >
                            <SvgIcon name="compass" className={`mt-0.5 h-5 w-5 shrink-0 sm:h-6 sm:w-6 ${accentClasses[content.accent]}`} />
                            <span>{content.title[language]}</span>
                        </h2>
                    </div>
                    <div>
                        <p className="text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                            {content.intro[language]}
                        </p>
                        {visibleCategories.length > 2 && (
                            <p className="mt-1 text-xs font-semibold text-slate-500">
                                {isArabic ? 'مرّر أفقيًا لرؤية بقية الأقسام ←' : 'Scroll horizontally to explore every category →'}
                            </p>
                        )}
                    </div>
                </header>

                <nav
                    aria-label={isArabic ? `أقسام ${pageName}` : `${pageName} categories`}
                    className={`-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scroll-px-4 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent sm:-mx-6 sm:px-6 sm:scroll-px-6 lg:mx-0 lg:px-0 lg:scroll-px-0 ${
                        visibleCategories.length <= 2 ? 'md:justify-center md:overflow-visible' : ''
                    }`}
                >
                    {visibleCategories.map(({ category, presentation }, index) => {
                        const tone = toneClasses[presentation.tone];
                        const href = `${localizedPrefix}${category.href}`;
                        const label = category.title[language];

                        return (
                            <Link
                                key={category.href}
                                href={href}
                                aria-label={`${presentation.action[language]} — ${presentation.description[language]}`}
                                className={`group relative isolate flex min-h-[286px] w-[82vw] max-w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-[1.6rem] border shadow-[0_10px_32px_rgba(15,23,42,.07)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(15,23,42,.13)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 sm:w-[320px] sm:max-w-[320px] ${tone.card} ${tone.ring}`}
                            >
                                {/* Text stays first in the DOM so crawlers and screen
                                    readers meet the category meaning before the image. */}
                                <div className="relative z-10 flex h-full min-h-[286px] flex-col items-start p-[18px] sm:p-5">
                                    <div className="flex w-full items-start justify-between gap-2">
                                        <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm ${tone.icon}`}>
                                            <SvgIcon name={category.icon} className="h-4 w-4" />
                                        </span>
                                        <span
                                            dir="auto"
                                            className="inline-flex max-w-[68%] rounded-full border border-white/70 bg-white/55 px-2.5 py-1 text-center text-[10px] font-bold leading-tight text-slate-700 backdrop-blur-sm"
                                        >
                                            {presentation.signal[language]}
                                        </span>
                                    </div>

                                    <span className={`mt-2 text-[11px] font-black sm:text-xs ${tone.label}`}>
                                        {label}
                                    </span>
                                    <h3 className="mt-0.5 max-w-[96%] text-lg font-black leading-tight tracking-[-0.02em] sm:text-xl">
                                        {presentation.headline[language]}
                                    </h3>
                                    <p className="mt-1 max-w-[96%] text-xs leading-[1.15rem] text-slate-600">
                                        {presentation.description[language]}
                                    </p>

                                    <div
                                        className="mt-auto grid w-full items-end gap-2 pt-2"
                                        style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(96px, 40%)' }}
                                    >
                                        <span className="inline-flex min-h-10 min-w-0 max-w-full items-center gap-1.5 self-end rounded-full bg-white/70 px-2.5 py-2 text-xs font-black leading-snug shadow-sm backdrop-blur-sm transition group-hover:bg-white">
                                            {presentation.action[language]}
                                            <span
                                                aria-hidden="true"
                                                className="shrink-0 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                                            >
                                                {arrow(isArabic)}
                                            </span>
                                        </span>

                                        <picture
                                            className={`pointer-events-none aspect-square w-full justify-self-end self-end ${visualClasses[presentation.visual]}`}
                                        >
                                            <source
                                                type="image/webp"
                                                srcSet={`${presentation.imageBase}-480.webp 480w, ${presentation.imageBase}-800.webp 800w`}
                                                sizes="(max-width: 639px) 43vw, 132px"
                                            />
                                            <img
                                                src={`${presentation.imageBase}-480.webp`}
                                                width="800"
                                                height="800"
                                                loading={index === 0 ? 'eager' : 'lazy'}
                                                fetchPriority={index === 0 ? 'high' : 'auto'}
                                                decoding="async"
                                                alt={presentation.alt[language]}
                                                className="h-full w-full object-contain object-bottom drop-shadow-[0_18px_28px_rgba(15,23,42,.22)] transition duration-700 group-hover:scale-[1.045]"
                                            />
                                        </picture>
                                    </div>
                                </div>

                                <span
                                    aria-hidden="true"
                                    className={`absolute bottom-3 right-3 z-0 h-40 w-40 rounded-full blur-3xl rtl:left-3 rtl:right-auto ${tone.glow}`}
                                />

                            </Link>
                        );
                    })}
                </nav>
            </div>
        </section>
    );
}
