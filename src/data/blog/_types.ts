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
     * Optional VERIFIED quote from an independent reviewer we recommend.
     * HARD RULE: only ever use a REAL statement the creator actually made.
     * `sourceUrl` (link to the exact video/post) is REQUIRED — the component
     * renders nothing without it, so a quote can never appear unsourced.
     * Never fabricate or paraphrase-as-quote. `creatorId` must match an id in
     * src/data/team-members.ts (recommendedCreators). These creators are NOT
     * affiliated with CairoVolt — the quote is shown as an external citation.
     */
    expertQuote?: {
        creatorId: string;
        quote: { ar: string; en: string };
        sourceUrl: string;
        sourceLabel?: { ar: string; en: string };
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
            /**
             * HTML content. May contain `{{price:<product-slug>}}` (contract C1,
             * see src/lib/blog-answer-normalize.ts): resolved at render time to
             * the product's current catalogue `price` formatted with
             * toLocaleString('en-US') (e.g. "1,730"); keep the currency word
             * literal in the copy ("{{price:anker-nano-45w}} جنيه"). A missing or
             * non-active product renders 'السعر في صفحة المنتج' /
             * 'see product page for price'. Tokens are BANNED in title,
             * metaTitle, metaDescription, excerpt and keywords — the index
             * generator fails the build on them.
             */
            content: string;
            /**
             * Visible FAQ (also FAQPage JSON-LD). question/answer may use
             * `{{price:<product-slug>}}` (C1). Rendered as PLAIN TEXT: tags,
             * `**`, `__` and `[text](url)` are stripped on output, so write plain
             * sentences.
             */
            faq?: Array<{ question: string; answer: string }>;
            /**
             * ~45-word concise answer for AI search (QuickAnswerBox, Speakable,
             * BlogPosting.abstract). May use `{{price:<product-slug>}}` (C1).
             * Rendered as PLAIN TEXT — markup is stripped on output.
             */
            quickAnswer?: string;
        };
        en: {
            title: string;
            metaTitle: string;
            metaDescription: string;
            keywords: string;
            excerpt: string;
            /** HTML content; may contain `{{price:<product-slug>}}` (C1 — see `ar.content`). */
            content: string;
            /** Plain-text FAQ; may contain `{{price:<product-slug>}}` (C1 — see `ar.faq`). */
            faq?: Array<{ question: string; answer: string }>;
            /** Plain-text quick answer; may contain `{{price:<product-slug>}}` (C1 — see `ar.quickAnswer`). */
            quickAnswer?: string;
        };
    };
}
