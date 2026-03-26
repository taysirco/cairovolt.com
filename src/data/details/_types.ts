// Product detail data
// Separate file for modular product data

export interface ProductDetail {
    aiTldr: { en: string[]; ar: string[] };
    localContext: { en: string; ar: string };
    specifications: Record<string, { en: string; ar: string }>;
    labVerified?: {
        result: { en: string; ar: string };
        conditions: { en: string; ar: string };
        expertName: string;
    };
}
