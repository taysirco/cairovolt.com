export interface BlogArticle {
    slug: string;
    category: 'buying-guide' | 'comparison' | 'how-to' | 'review' | 'tips';
    publishDate: string;
    modifiedDate: string;
    readingTime: number; // minutes
    relatedProducts: string[]; // product slugs
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
