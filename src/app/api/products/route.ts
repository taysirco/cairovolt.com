import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { staticProducts } from '@/lib/static-products';
import { validateApiKey } from '@/lib/api-auth';
import { buildManifest, signManifest } from '@/lib/media-verification';
import { logger } from '@/lib/logger';

// ============================================
// GET - List all products with pagination & filtering
// Uses static TypeScript data as the authoritative source
// to ensure prices are always consistent across the site.
// ============================================

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const brand = url.searchParams.get('brand');
    const category = url.searchParams.get('category');
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    const slug = url.searchParams.get('slug');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const page = parseInt(url.searchParams.get('page') || '1');

    // Always use static data as the single source of truth for product listings.
    // The TypeScript files in src/data/products/ are the maintained price source.
    let products = [...staticProducts];

    // Apply filters
    if (brand) {
        products = products.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }
    if (category) {
        products = products.filter(p => p.categorySlug === category);
    }
    if (status) {
        products = products.filter(p => p.status === status);
    }
    if (slug) {
        products = products.filter(p => p.slug === slug);
    }
    if (search) {
        const searchLower = search.toLowerCase();
        products = products.filter(p =>
            p.translations.en.name.toLowerCase().includes(searchLower) ||
            p.translations.ar.name.includes(search) ||
            p.slug.toLowerCase().includes(searchLower)
        );
    }

    // Pagination
    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedProducts = products.slice(startIndex, startIndex + limit);

    // Add IDs for compatibility with client components
    const productsWithIds = paginatedProducts.map((p) => ({
        id: `static_${p.slug}`,
        ...p
    }));

    return NextResponse.json({
        items: productsWithIds,
        pagination: { page, limit, total, totalPages },
        source: 'static'
    });
}

// ============================================
// POST - Create new product
// ============================================

export async function POST(req: NextRequest) {
    const authError = validateApiKey(req);
    if (authError) return authError;

    const db = await getFirestore();

    try {
        const data = await req.json();

        // Validate data
        if (!data.slug || !data.price || !data.enName || !data.arName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check slug uniqueness via direct doc lookup (slug = doc ID)
        const existingDoc = await db.collection('products').doc(data.slug).get();

        if (existingDoc.exists) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
        }

        // Parse images if string
        let images = data.images || [];
        if (typeof images === 'string') {
            try {
                images = JSON.parse(images);
            } catch {
                images = [];
            }
        }

        // If single imageUrl provided, convert to images array
        if (data.imageUrl && !images.length) {
            images = [{
                id: `img_${Date.now()}`,
                url: data.imageUrl,
                alt: data.enName,
                altAr: data.arName,
                order: 0,
                isPrimary: true,
            }];
        }

        const productData = {
            slug: data.slug,
            sku: data.sku || null,
            price: Number(data.price),
            originalPrice: data.originalPrice ? Number(data.originalPrice) : null,
            discountPercentage: data.originalPrice
                ? Math.round((1 - data.price / data.originalPrice) * 100)
                : null,
            brand: data.brand,
            brandSlug: data.brand?.toLowerCase().replace(/\s+/g, '-'),
            categorySlug: data.categorySlug || 'general',
            subcategorySlug: data.subcategorySlug || null,
            images: images,
            featured: data.featured === true || data.featured === 'true',
            status: data.status || 'draft',
            stock: Number(data.stock) || 0,
            lowStockThreshold: Number(data.lowStockThreshold) || 5,
            translations: {
                en: {
                    name: data.enName,
                    description: data.enDesc || '',
                    shortDescription: data.enShortDesc || '',
                    metaTitle: data.enMetaTitle || data.enName,
                    metaDesc: data.enMetaDesc || '',
                    features: data.enFeatures
                        ? (typeof data.enFeatures === 'string'
                            ? data.enFeatures.split('\n').filter(Boolean)
                            : data.enFeatures)
                        : [],
                },
                ar: {
                    name: data.arName,
                    description: data.arDesc || '',
                    shortDescription: data.arShortDesc || '',
                    metaTitle: data.arMetaTitle || data.arName,
                    metaDesc: data.arMetaDesc || '',
                    features: data.arFeatures
                        ? (typeof data.arFeatures === 'string'
                            ? data.arFeatures.split('\n').filter(Boolean)
                            : data.arFeatures)
                        : [],
                },
            },
            meta: {
                keywords: data.keywords || '',
                mainTerm: data.mainTerm || '',
                canonical: data.canonical || null,
                schemaType: 'Product',
            },
            tags: data.tags
                ? (typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : data.tags)
                : [],
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        // Sign a Content Credential manifest for this product
        let contentCredentials = null;
        try {
            const manifest = buildManifest({
                title: data.enName,
                format: 'image/jpeg',
                captureMethod: 'c2pa.captured',
            });
            contentCredentials = await signManifest(manifest);
        } catch (signingErr) {
            logger.warn('Content credentials signing skipped (keys not configured):', signingErr);
        }

        // Use slug as doc ID for consistency with seeding script
        const docRef = db.collection('products').doc(data.slug);
        await docRef.set({
            ...productData,
            ...(contentCredentials ? { contentCredentials } : {}),
        });

        return NextResponse.json({
            success: true,
            id: data.slug,
            contentCredentialsSigned: contentCredentials !== null,
            ...productData,
        });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}

// ============================================
// DELETE - Bulk delete products
// ============================================

export async function DELETE(req: NextRequest) {
    const authError = validateApiKey(req);
    if (authError) return authError;

    const db = await getFirestore();

    try {
        const { ids } = await req.json();

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'No product IDs provided' }, { status: 400 });
        }

        const batch = db.batch();

        for (const id of ids) {
            const docRef = db.collection('products').doc(id);
            batch.delete(docRef);
        }

        await batch.commit();

        return NextResponse.json({
            success: true,
            deleted: ids.length
        });
    } catch (error) {
        console.error('Error deleting products:', error);
        return NextResponse.json({ error: 'Failed to delete products' }, { status: 500 });
    }
}
