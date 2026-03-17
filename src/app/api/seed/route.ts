import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { products, categories } from '@/data/seed-products';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
    const db = await getFirestore();

    try {
        const url = new URL(req.url);
        const force = url.searchParams.get('force') === 'true';

        let categoriesAdded = 0;
        let productsAdded = 0;
        const errors: string[] = [];

        // Seed Categories first (using slug as doc ID for consistency)
        logger.info('Seeding categories...');
        for (const category of categories) {
            try {
                const docRef = db.collection('categories').doc(category.slug);
                const existing = await docRef.get();

                if (!existing.exists || force) {
                    await docRef.set({
                        ...category,
                        createdAt: existing.exists ? existing.data()?.createdAt : FieldValue.serverTimestamp(),
                        updatedAt: FieldValue.serverTimestamp(),
                    }, { merge: true });
                    categoriesAdded++;
                    logger.info(`[OK] ${existing.exists ? 'Updated' : 'Added'} category: ${category.translations?.ar?.name || category.slug}`);
                } else {
                    logger.info(`[SKIP] Skipped category: ${category.slug} (exists)`);
                }
            } catch (err) {
                const error = err as Error;
                errors.push(`Category ${category.slug}: ${error.message}`);
                console.error(`[ERR] Error adding category ${category.slug}:`, error.message);
            }
        }

        // Seed Products (using slug as doc ID for consistency)
        logger.info('Seeding products...');
        for (const product of products) {
            try {
                const docRef = db.collection('products').doc(product.slug);
                const existing = await docRef.get();

                if (!existing.exists || force) {
                    await docRef.set({
                        ...product,
                        createdAt: existing.exists ? existing.data()?.createdAt : FieldValue.serverTimestamp(),
                        updatedAt: FieldValue.serverTimestamp(),
                    }, { merge: true });
                    productsAdded++;
                    logger.info(`[OK] ${existing.exists ? 'Updated' : 'Added'} product: ${product.translations?.ar?.name || product.slug}`);
                } else {
                    logger.info(`[SKIP] Skipped product: ${product.slug} (exists)`);
                }
            } catch (err) {
                const error = err as Error;
                errors.push(`Product ${product.slug}: ${error.message}`);
                console.error(`[ERR] Error adding product ${product.slug}:`, error.message);
            }
        }

        // Update category product counts (direct doc reference, no query needed)
        logger.info('Updating category product counts...');
        const categorySlugs = [...new Set(products.map(p => p.categorySlug))];
        for (const slug of categorySlugs) {
            const count = products.filter(p => p.categorySlug === slug).length;
            const catRef = db.collection('categories').doc(slug);
            const catDoc = await catRef.get();
            if (catDoc.exists) {
                await catRef.update({ productCount: count });
            }
        }

        return NextResponse.json({
            success: true,
            message: `Seeded ${categoriesAdded} categories and ${productsAdded} products`,
            details: {
                categoriesAdded,
                productsAdded,
                totalCategories: categories.length,
                totalProducts: products.length,
                errors: errors.length > 0 ? errors : undefined
            }
        });
    } catch (error) {
        console.error('Error seeding data:', error);
        return NextResponse.json({
            error: 'Failed to seed data',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'POST to this endpoint to seed products and categories',
        info: {
            categoriesCount: categories.length,
            productsCount: products.length,
            categories: categories.map(c => ({ slug: c.slug, name: c.translations?.ar?.name })),
            products: products.map(p => ({ slug: p.slug, name: p.translations?.ar?.name, brand: p.brand }))
        },
        usage: {
            seed: 'POST /api/seed',
            forceSeed: 'POST /api/seed?force=true (replaces existing)'
        }
    });
}
