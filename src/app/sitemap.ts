
import { MetadataRoute } from 'next';
import { brandData } from '@/data/brand-data';
import { categoryData } from '@/data/category-seo';
import { staticProducts } from '@/lib/static-products';
import { governorates } from '@/data/governorates';
import { blogArticles } from '@/data/blog-articles';
import { genericCategories } from '@/data/generic-categories';
import { getFirestore } from '@/lib/firebase-admin';

const baseUrl = 'https://cairovolt.com';

// Helper to capitalize brand (anker → Anker, joyroom → Joyroom)
const capitalizeBrand = (brand: string) => brand.charAt(0).toUpperCase() + brand.slice(1);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = [
        // Home
        { url: baseUrl, priority: 1.0, changeFrequency: 'weekly', lastModified: new Date() },
        { url: `${baseUrl}/en`, priority: 1.0, changeFrequency: 'weekly', lastModified: new Date() },

        // Checkout - REMOVED (noindexed transactional page)

        // Static Pages - About & Contact
        { url: `${baseUrl}/about`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/en/about`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/contact`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/en/contact`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },

        // FAQ Pages - High priority for AEO/Voice Search
        { url: `${baseUrl}/faq`, priority: 0.7, changeFrequency: 'weekly', lastModified: new Date() },
        { url: `${baseUrl}/en/faq`, priority: 0.7, changeFrequency: 'weekly', lastModified: new Date() },

        // Policy Pages - Important for E-E-A-T
        { url: `${baseUrl}/shipping`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/en/shipping`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/warranty`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/en/warranty`, priority: 0.5, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date() },
        { url: `${baseUrl}/en/privacy`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date() },
        { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date() },
        { url: `${baseUrl}/en/terms`, priority: 0.3, changeFrequency: 'yearly', lastModified: new Date() },
        { url: `${baseUrl}/return-policy`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
        { url: `${baseUrl}/en/return-policy`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
    ];

    // Dynamic Brand Pages - Use proper casing (Anker, Joyroom)
    Object.keys(brandData).forEach(brandId => {
        const properBrand = capitalizeBrand(brandId);
        routes.push({
            url: `${baseUrl}/${properBrand}`,
            priority: 0.9,
            changeFrequency: 'weekly',
            lastModified: new Date(),
        });
        routes.push({
            url: `${baseUrl}/en/${properBrand}`,
            priority: 0.9,
            changeFrequency: 'weekly',
            lastModified: new Date(),
        });
    });

    // Dynamic Category Pages - Use proper casing
    Object.keys(categoryData).forEach(brandId => {
        const properBrand = capitalizeBrand(brandId);
        const brandCategories = categoryData[brandId];
        Object.keys(brandCategories).forEach(catSlug => {
            routes.push({
                url: `${baseUrl}/${properBrand}/${catSlug}`,
                priority: 0.8,
                changeFrequency: 'weekly',
                lastModified: new Date(),
            });
            routes.push({
                url: `${baseUrl}/en/${properBrand}/${catSlug}`,
                priority: 0.8,
                changeFrequency: 'weekly',
                lastModified: new Date(),
            });
        });
    });

    // Dynamic Product Pages - Use proper casing (static + Firebase)
    const staticSlugs = new Set(staticProducts.map(p => p.slug));

    staticProducts.forEach(product => {
        const properBrand = capitalizeBrand(product.brand.toLowerCase());
        routes.push({
            url: `${baseUrl}/${properBrand}/${product.categorySlug}/${product.slug}`,
            priority: 0.9,
            changeFrequency: 'daily',
            lastModified: new Date(),
        });
        routes.push({
            url: `${baseUrl}/en/${properBrand}/${product.categorySlug}/${product.slug}`,
            priority: 0.9,
            changeFrequency: 'daily',
            lastModified: new Date(),
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
                    const properBrand = capitalizeBrand(data.brand.toLowerCase());
                    routes.push({
                        url: `${baseUrl}/${properBrand}/${data.categorySlug}/${data.slug}`,
                        priority: 0.9,
                        changeFrequency: 'daily',
                        lastModified: new Date(),
                    });
                    routes.push({
                        url: `${baseUrl}/en/${properBrand}/${data.categorySlug}/${data.slug}`,
                        priority: 0.9,
                        changeFrequency: 'daily',
                        lastModified: new Date(),
                    });
                }
            });
        }
    } catch (error) {
        console.warn('Firebase not available for sitemap, using static products only:', error);
    }

    // Generic Category Pages (brand-agnostic landing pages)
    genericCategories.forEach(cat => {
        routes.push({
            url: `${baseUrl}/${cat.slug}`,
            priority: 0.8,
            changeFrequency: 'weekly',
            lastModified: new Date(),
        });
        routes.push({
            url: `${baseUrl}/en/${cat.slug}`,
            priority: 0.8,
            changeFrequency: 'weekly',
            lastModified: new Date(),
        });
    });

    // Blog Pages
    routes.push(
        { url: `${baseUrl}/blog`, priority: 0.7, changeFrequency: 'weekly' as const, lastModified: new Date() },
        { url: `${baseUrl}/en/blog`, priority: 0.7, changeFrequency: 'weekly' as const, lastModified: new Date() },
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

    // Governorate Location Pages - REMOVED from sitemap (noindexed - duplicate content)
    // These pages don't generate traffic and cause content duplication

    return routes;
}

