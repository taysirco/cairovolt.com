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
    balanced: 'max-w-[180px]',
    wide: 'max-w-[200px]',
    tall: 'max-w-[160px]',
    white: 'max-w-[180px]',
};

const accentClasses = {
    blue: 'text-blue-700',
    red: 'text-red-700',
    orange: 'text-orange-700',
} as const;

const arrow = (isArabic: boolean) => (isArabic ? '←' : '→');

const catalogueCutoutSource = 'http://cv.iptc.org/newscodes/digitalsourcetype/composite';
const aiAssistedSource = 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia';

function cardPositionClasses(index: number, total: number) {
    const classes = ['xl:col-span-2'];
    const xlRemainder = total % 3;

    if (xlRemainder === 1 && index === total - 1) classes.push('xl:col-start-3');
    if (xlRemainder === 2 && index === total - 2) classes.push('xl:col-start-2');
    if (xlRemainder === 2 && index === total - 1) classes.push('xl:col-start-4');

    if (total % 2 === 1 && index === total - 1) {
        classes.push('md:col-span-2 md:mx-auto md:w-[calc(50%-0.5rem)] xl:mx-0 xl:w-auto');
    }

    return classes.join(' ');
}

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
                creditText: isArabic
                    ? presentation.provenance === 'ai-assisted'
                        ? `قصّ منتج بمساعدة الذكاء الاصطناعي اعتمادًا على أصل كتالوج مرتبط بعلامة ${content.sourceBrand}؛ أُعِدّ مشتق القسم لكايرو فولت، ومالك الحقوق غير محسوم بهذه البيانات`
                        : `أصل كتالوج مرتبط بعلامة ${content.sourceBrand}؛ أُعِدّ مشتق القسم لكايرو فولت، ومالك الحقوق غير محسوم بهذه البيانات`
                    : presentation.provenance === 'ai-assisted'
                        ? `AI-assisted cutout based on catalogue imagery associated with ${content.sourceBrand}; category derivative prepared for CairoVolt; rights holder not asserted`
                        : `Catalogue source associated with ${content.sourceBrand}; category derivative prepared for CairoVolt; rights holder not asserted`,
                contributor: { '@id': 'https://cairovolt.com/#organization' },
                digitalSourceType: presentation.provenance === 'ai-assisted'
                    ? aiAssistedSource
                    : catalogueCutoutSource,
                isPartOf: { '@id': `${pageUrl}#collectionpage` },
                position: index + 1,
            })),
        ],
    };

    return (
        <section
            id="shop-by-category"
            aria-labelledby={`${collection}-category-heading`}
            className="bg-[#f5f6f8] py-12 text-[#07111f] sm:py-16 lg:py-20"
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="mb-8 max-w-3xl sm:mb-10">
                    <span className={`inline-flex items-center gap-2 text-sm font-bold ${accentClasses[content.accent]}`}>
                        <SvgIcon name="compass" className="h-5 w-5" />
                        {content.eyebrow[language]}
                    </span>
                    <h2
                        id={`${collection}-category-heading`}
                        className="mt-3 text-3xl font-black leading-tight tracking-[-0.025em] sm:text-4xl lg:text-5xl"
                    >
                        {content.title[language]}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                        {content.intro[language]}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-slate-500 md:hidden">
                        {isArabic ? 'مرّر لرؤية بقية الأقسام ←' : 'Scroll to explore every category →'}
                    </p>
                </header>

                <div className="-mx-4 flex snap-x snap-proximity gap-4 overflow-x-auto px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-6">
                    {visibleCategories.map(({ category, presentation }, index) => {
                        const tone = toneClasses[presentation.tone];
                        const href = `${localizedPrefix}${category.href}`;
                        const label = category.title[language];

                        return (
                            <Link
                                key={category.href}
                                href={href}
                                aria-label={`${presentation.action[language]} — ${presentation.description[language]}`}
                                className={`group relative isolate flex h-full min-h-[390px] w-[84vw] max-w-[350px] shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] border shadow-[0_12px_40px_rgba(15,23,42,.07)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,.13)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 md:w-auto md:max-w-none ${cardPositionClasses(index, visibleCategories.length)} ${tone.card} ${tone.ring}`}
                            >
                                {/* Text stays first in the DOM so crawlers and screen
                                    readers meet the category meaning before the image. */}
                                <div className="relative z-10 flex h-full min-h-[390px] flex-col items-start p-6 sm:p-7">
                                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-sm ${tone.icon}`}>
                                        <SvgIcon name={category.icon} className="h-5 w-5" />
                                    </span>

                                    <span className={`mt-4 text-xs font-black ${tone.label}`}>
                                        {label}
                                    </span>
                                    <h3 className="mt-1 max-w-[92%] text-2xl font-black leading-tight tracking-[-0.02em] sm:text-[1.7rem]">
                                        {presentation.headline[language]}
                                    </h3>
                                    <p className="mt-2 max-w-[92%] text-sm leading-6 text-slate-600">
                                        {presentation.description[language]}
                                    </p>

                                    <span
                                        dir="auto"
                                        className="mt-3 inline-flex max-w-full rounded-full border border-white/70 bg-white/55 px-3 py-1.5 text-center text-[11px] font-bold leading-tight text-slate-700 backdrop-blur-sm"
                                    >
                                        {presentation.signal[language]}
                                    </span>

                                    <div className="mt-auto grid w-full grid-cols-[minmax(0,1fr)_minmax(128px,44%)] items-end gap-3 pt-5">
                                        <span className="inline-flex min-h-11 min-w-0 max-w-full items-center gap-2 self-end rounded-full bg-white/70 px-3 py-2 text-sm font-black leading-snug shadow-sm backdrop-blur-sm transition group-hover:bg-white">
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
                                                sizes="(max-width: 767px) 160px, (max-width: 1279px) 22vw, 190px"
                                            />
                                            <img
                                                src={`${presentation.imageBase}-480.webp`}
                                                width="800"
                                                height="800"
                                                loading="lazy"
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
                </div>
            </div>
        </section>
    );
}
