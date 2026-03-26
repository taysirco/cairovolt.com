export interface FAQItem {
    question: string;
    answer: string;
}
export interface BuyingGuideSection {
    title: string;
    content: string; // Markdown supported
}
export interface QualityBadge {
    type: 'originality' | 'warranty' | 'expert_verified';
    text: string;
    icon?: string;
}
// NEW: Soundcore-specific data for audio category targeting "ankersoundcore" keyword
export interface SoundcoreData {
    title: { en: string; ar: string };
    tagline: { en: string; ar: string };
    history: { en: string; ar: string };
    achievements: Array<{ icon: string; stat: { en: string; ar: string }; label: { en: string; ar: string } }>;
    technologies: Array<{ name: string; icon: string; description: { en: string; ar: string } }>;
    useCases: Array<{ icon: string; title: { en: string; ar: string }; description: { en: string; ar: string } }>;
    trustBadges: Array<{ icon: string; title: { en: string; ar: string }; description: { en: string; ar: string } }>;
    faq: {
        en: Array<{ question: string; answer: string }>;
        ar: Array<{ question: string; answer: string }>;
    };
}
// NEW: PowerBank-specific data for power-banks category targeting "باور بانك انكر" keyword
export type PowerBankData = SoundcoreData; // Same structure, different content
export interface CategoryContent {
    brand: 'Anker' | 'Joyroom';
    brandColor: 'blue' | 'red';
    categoryName: string;
    // NEW: Optional Soundcore data for audio category
    soundcoreData?: SoundcoreData;
    // NEW: Optional PowerBank data for power-banks category
    powerBankData?: PowerBankData;
    metadata: {
        en: { title: string; description: string; keywords: string; openGraph?: any };
        ar: { title: string; description: string; keywords: string; openGraph?: any };
    };
    pageContent: {
        ar: {
            title: string;
            subtitle: string;
            description: string;
            buyingGuide?: BuyingGuideSection[];
            faq?: FAQItem[];
            qualityBadges?: QualityBadge[];
            products: Array<{ name: string; price: number; badge?: string }>;
        };
        en: {
            title: string;
            subtitle: string;
            description: string;
            buyingGuide?: BuyingGuideSection[];
            faq?: FAQItem[];
            qualityBadges?: QualityBadge[];
            products: Array<{ name: string; price: number; badge?: string }>;
        };
    };
}
