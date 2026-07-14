/**
 * Product-Specific Reviews Database
 * Each product has 7-13 unique, realistic reviews
 * Reviews are specific to each product's features
 */

export interface ProductReview {
    author: string;
    rating: number;
    reviewBody: { en: string; ar: string };
    pros?: { en: string[]; ar: string[] };
    cons?: { en: string[]; ar: string[] };
    datePublished: string;
    location: string;
}

// Egyptian reviewer names pool (randomized per product)
export const reviewerNames = [
    'Ahmed Mohamed', 'Mohamed Ibrahim', 'Mahmoud Hassan', 'Ali Khaled', 'Omar Youssef',
    'Mostafa Ahmed', 'Hassan Ali', 'Karim Samir', 'Youssef Adel', 'Amr Sherif',
    'Tarek Nabil', 'Walid Fathy', 'Khaled Mahmoud', 'Samy Fawzy', 'Ashraf Gamal',
    'Sara Ahmed', 'Nour Mohamed', 'Mona Essam', 'Heba Khaled', 'Dina Samir',
    'Rana Mahmoud', 'Fatma Hassan', 'Yasmin Ali', 'Layla Ibrahim', 'Mariam Adel',
    'Ramy Saeed', 'Bassem Yousry', 'Hany Farouk', 'Sherif Nader', 'Wael Hossam',
    'Islam Mohamed', 'Ayman Salah', 'Essam Fouad', 'Magdy Hassan', 'Osama Kamel',
    'Ehab Refaat', 'Hatem Samy', 'Akram Helmy', 'Emad Samir', 'Nader Tawfik'
];

// Egyptian cities pool
export const egyptianCities = [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'المنصورة', 'طنطا', 'أسيوط', 'الإسماعيلية',
    'بورسعيد', 'السويس', 'الأقصر', 'أسوان', 'الزقازيق', 'دمياط', 'الفيوم',
    'بني سويف', 'المنيا', 'سوهاج', 'قنا', 'مدينة 6 أكتوبر', 'القاهرة الجديدة',
    'مدينة نصر', 'المعادي', 'مصر الجديدة', 'الشروق', 'العبور', 'المهندسين',
    'الدقي', 'الزمالك', 'العجوزة', 'شبرا'
];

// Seeded random for consistency
export function seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export function shuffleWithSeed<T>(array: T[], seed: number): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(seed + i) * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function generateDate(seed: number): string {
    const now = new Date('2026-02-01');
    const daysAgo = Math.floor(seededRandom(seed) * 150) + 14;
    now.setDate(now.getDate() - daysAgo);
    return now.toISOString().split('T')[0];
}

// Product-specific reviews database
