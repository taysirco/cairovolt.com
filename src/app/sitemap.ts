
import { MetadataRoute } from 'next';
import { brandData } from '@/data/brand-data';
import { governorates } from '@/data/governorates';
import { categoryContent } from '@/data/category-content';
import { staticProducts } from '@/lib/static-products';
import { logger } from '@/lib/logger';
import { blogArticles } from '@/data/blog-articles';
import { genericCategories } from '@/data/generic-categories';
import { getFirestore } from '@/lib/firebase-admin';
import { labData } from '@/data/product-tests';
import { getProductDetail } from '@/data/product-details';

const baseUrl = 'https://cairovolt.com';

// Helper to ensure lowercase brands/categories for URLs (Strict URL best practice)
const toLower = (str: string) => str.toLowerCase();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = [
        // Home
        { url: baseUrl, priority: 1.0, changeFrequency: 'weekly', lastModified: new Date('2026-03-15') },
        { url: `${baseUrl}/en`, priority: 1.0, changeFrequency: 'weekly', lastModified: new Date('2026-03-15') },

        // Checkout - REMOVED (noindexed transactional page)

        // Static Pages - About & Contact
        { url: `${baseUrl}/about`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date('2025-12-01') },
        { url: `${baseUrl}/en/about`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date('2025-12-01') },
        { url: `${baseUrl}/contact`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date('2025-12-01') },
        { url: `${baseUrl}/en/contact`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date('2025-12-01') },

        // FAQ Pages
        { url: `${baseUrl}/faq`, priority: 0.7, changeFrequency: 'weekly', lastModified: new Date('2026-03-15') },
        { url: `${baseUrl}/en/faq`, priority: 0.7, changeFrequency: 'weekly', lastModified: new Date('2026-03-15') },

        // Legal & Policy Pages
        { url: `${baseUrl}/return-policy`, priority: 0.4, changeFrequency: 'yearly', lastModified: new Date('2025-10-01') },
        { url: `${baseUrl}/en/return-policy`, priority: 0.4, changeFrequency: 'yearly', lastModified: new Date('2025-10-01') },
        { url: `${baseUrl}/warranty`, priority: 0.4, changeFrequency: 'yearly', lastModified: new Date('2025-10-01') },
        { url: `${baseUrl}/en/warranty`, priority: 0.4, changeFrequency: 'yearly', lastModified: new Date('2025-10-01') },
        { url: `${baseUrl}/shipping`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date('2025-12-15') },
        { url: `${baseUrl}/en/shipping`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date('2025-12-15') },
        { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date('2025-08-01') },
        { url: `${baseUrl}/en/terms`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date('2025-08-01') },
        { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date('2025-08-01') },
        { url: `${baseUrl}/en/privacy`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date('2025-08-01') },

    ];

    // Dynamic Brand Pages - Strict Lowercase
    Object.keys(brandData).forEach(brandId => {
        const brandSlug = toLower(brandId);
        routes.push({
            url: `${baseUrl}/${brandSlug}`,
            priority: 0.9,
            changeFrequency: 'weekly',
            lastModified: new Date('2026-03-15'),
        });
        routes.push({
            url: `${baseUrl}/en/${brandSlug}`,
            priority: 0.9,
            changeFrequency: 'weekly',
            lastModified: new Date('2026-03-15'),
        });
    });

    // Dynamic Category Pages - Strict Lowercase
    Object.keys(categoryContent).forEach(brandId => {
        const brandSlug = toLower(brandId);
        const brandCategories = categoryContent[brandId];
        Object.keys(brandCategories).forEach(catSlug => {
            const categorySlug = toLower(catSlug);
            routes.push({
                url: `${baseUrl}/${brandSlug}/${categorySlug}`,
                priority: 0.8,
                changeFrequency: 'weekly',
                lastModified: new Date('2026-03-15'),
            });
            routes.push({
                url: `${baseUrl}/en/${brandSlug}/${categorySlug}`,
                priority: 0.8,
                changeFrequency: 'weekly',
                lastModified: new Date('2026-03-15'),
            });
        });
    });

    // Dynamic Product Pages - Strict Lowercase (static + Firebase)
    const staticSlugs = new Set(staticProducts.map(p => p.slug));

    staticProducts.forEach(product => {
        const brandSlug = toLower(product.brand);
        const categorySlug = toLower(product.categorySlug);
        const hasLabData = !!(labData[product.slug] || getProductDetail(product.slug)?.labVerified);
        const productPriority = hasLabData ? 1.0 : 0.9;
        routes.push({
            url: `${baseUrl}/${brandSlug}/${categorySlug}/${product.slug}`,
            priority: productPriority,
            changeFrequency: 'daily',
            lastModified: new Date('2026-03-15'),
        });
        routes.push({
            url: `${baseUrl}/en/${brandSlug}/${categorySlug}/${product.slug}`,
            priority: productPriority,
            changeFrequency: 'daily',
            lastModified: new Date('2026-03-15'),
        });
    });

    // Firebase-only products (not in static data)
    try {
        const db = await getFirestore();
        if (db) {
            const snapshot = await db.collection('products').get();
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                if (data.slug && data.brand && data.categorySlug && !staticSlugs.has(data.slug)) {
                    const brandSlug = toLower(data.brand);
                    const categorySlug = toLower(data.categorySlug);
                    routes.push({
                        url: `${baseUrl}/${brandSlug}/${categorySlug}/${data.slug}`,
                        priority: 0.9,
                        changeFrequency: 'daily',
                        lastModified: new Date('2026-03-15'),
                    });
                    routes.push({
                        url: `${baseUrl}/en/${brandSlug}/${categorySlug}/${data.slug}`,
                        priority: 0.9,
                        changeFrequency: 'daily',
                        lastModified: new Date('2026-03-15'),
                    });
                }
            });
        }
    } catch (error) {
        logger.warn('Firebase not available for sitemap, using static products only:', error);
    }

    // Generic Category Pages (brand-agnostic landing pages)
    genericCategories.forEach(cat => {
        routes.push({
            url: `${baseUrl}/${cat.slug}`,
            priority: 0.8,
            changeFrequency: 'weekly',
            lastModified: new Date('2026-03-15'),
        });
        routes.push({
            url: `${baseUrl}/en/${cat.slug}`,
            priority: 0.8,
            changeFrequency: 'weekly',
            lastModified: new Date('2026-03-15'),
        });
    });

    // Blog Pages
    routes.push(
        { url: `${baseUrl}/blog`, priority: 0.7, changeFrequency: 'weekly' as const, lastModified: new Date('2026-03-15') },
        { url: `${baseUrl}/en/blog`, priority: 0.7, changeFrequency: 'weekly' as const, lastModified: new Date('2026-03-15') },
    );
    blogArticles.forEach(article => {
        routes.push({
            url: `${baseUrl}/blog/${article.slug}`,
            priority: 0.8,
            changeFrequency: 'monthly',
            lastModified: new Date(article.modifiedDate),
        });
        routes.push({
            url: `${baseUrl}/en/blog/${article.slug}`,
            priority: 0.8,
            changeFrequency: 'monthly',
            lastModified: new Date(article.modifiedDate),
        });
    });

    // Governorate Location Pages
    governorates.forEach(gov => {
        routes.push({
            url: `${baseUrl}/locations/${gov.slug}`,
            priority: 0.8,
            changeFrequency: 'weekly',
            lastModified: new Date('2026-03-15'),
        });
        routes.push({
            url: `${baseUrl}/en/locations/${gov.slug}`,
            priority: 0.8,
            changeFrequency: 'weekly',
            lastModified: new Date('2026-03-15'),
        });
    });

    // Solution Pages (Solution pages)
    try {
        const { solutionsDB } = await import('@/data/solutions-data');
        solutionsDB.forEach(solution => {
            routes.push({
                url: `${baseUrl}/solutions/${solution.slug}`,
                priority: 0.7,
                changeFrequency: 'monthly',
                lastModified: new Date('2026-03-15'),
            });
            routes.push({
                url: `${baseUrl}/en/solutions/${solution.slug}`,
                priority: 0.7,
                changeFrequency: 'monthly',
                lastModified: new Date('2026-03-15'),
            });
        });
    } catch {
        // Pain points data not available
    }

    return routes;
}

