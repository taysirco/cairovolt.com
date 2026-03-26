export interface GenericCategory {
    slug: string;
    brandCategories: Array<{
        brand: 'Anker' | 'Joyroom';
        brandSlug: string;
        categorySlug: string;
    }>;
    metadata: {
        ar: { title: string; description: string; keywords: string };
        en: { title: string; description: string; keywords: string };
    };
    pageContent: {
        ar: {
            title: string;
            subtitle: string;
            intro: string;
            buyingTips: string[];
        };
        en: {
            title: string;
            subtitle: string;
            intro: string;
            buyingTips: string[];
        };
    };
    faq: {
        ar: Array<{ question: string; answer: string }>;
        en: Array<{ question: string; answer: string }>;
    };
    richContent: {
        ar: string;
        en: string;
    };
    relatedBlogSlugs: string[];
}
