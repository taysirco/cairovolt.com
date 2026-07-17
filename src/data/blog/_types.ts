export interface BlogArticle {
    slug: string;
    category: 'buying-guide' | 'comparison' | 'how-to' | 'review' | 'tips';
    publishDate: string;
    modifiedDate: string;
    readingTime: number; // minutes
    relatedProducts: string[]; // product slugs
    relatedArticles?: string[]; // article slugs for internal linking
    relatedCategories: string[]; // e.g. "Anker/power-banks"
    coverImage?: string;
    author?: {
        name: { ar: string; en: string };
        title: { ar: string; en: string };
        avatar: string;
        url?: string;
        socials?: {
            youtube?: string;
            instagram?: string;
            twitter?: string;
            facebook?: string;
            tiktok?: string;
        };
    };
    /**
     * Optional "further reading" — links to genuinely useful third-party
     * resources on the SAME topic as the article. Rendered by
     * <ExternalReferences> with rel="nofollow" (these are references for the
     * reader, NOT endorsements and NOT equity-passing links). Keep it to 1–2
     * per article and topically relevant; never the dominant links on the page.
     * Used sparingly so the article never reads as a link farm.
     */
    externalReferences?: Array<{
        url: string;
        title: { ar: string; en: string };
        note?: { ar: string; en: string };
    }>;
    translations: {
        ar: {
            title: string;
            metaTitle: string;
            metaDescription: string;
            keywords: string;
            excerpt: string;
            content: string; // HTML content
            faq?: Array<{ question: string; answer: string }>;
            quickAnswer?: string; // ~45 word concise answer for AI search
        };
        en: {
            title: string;
            metaTitle: string;
            metaDescription: string;
            keywords: string;
            excerpt: string;
            content: string;
            faq?: Array<{ question: string; answer: string }>;
            quickAnswer?: string;
        };
    };
}
