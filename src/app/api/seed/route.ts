import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { products, categories } from '@/data/seed-products';

export async function POST(req: NextRequest) {
    const db = await getFirestore();

    try {
        const url = new URL(req.url);
        const force = url.searchParams.get('force') === 'true';

        let categoriesAdded = 0;
        let productsAdded = 0;
        const errors: string[] = [];

        // Seed Categories first
        console.log('Seeding categories...');
        for (const category of categories) {
            try {
                // Check if category already exists
                const existing = await db.collection('categories')
                    .where('slug', '==', category.slug)
                    .limit(1)
                    .get();

                if (existing.empty || force) {
                    if (!existing.empty && force) {
                        // Delete existing
                        const docId = existing.docs[0].id;
                        await db.collection('categories').doc(docId).delete();
                    }

                    await db.collection('categories').add({
                        ...category,
                        createdAt: FieldValue.serverTimestamp(),
                        updatedAt: FieldValue.serverTimestamp(),
                    });
                    categoriesAdded++;
                    console.log(`[OK] Added category: ${category.translations?.ar?.name || category.slug}`);
                } else {
                    console.log(`[SKIP] Skipped category: ${category.slug} (exists)`);
                }
            } catch (err) {
                const error = err as Error;
                errors.push(`Category ${category.slug}: ${error.message}`);
                console.error(`[ERR] Error adding category ${category.slug}:`, error.message);
            }
        }

        // Seed Products
        console.log('Seeding products...');
        for (const product of products) {
            try {
                // Check if product already exists
                const existing = await db.collection('products')
                    .where('slug', '==', product.slug)
                    .limit(1)
                    .get();

                if (existing.empty || force) {
                    if (!existing.empty && force) {
                        // Delete existing
                        const docId = existing.docs[0].id;
                        await db.collection('products').doc(docId).delete();
                    }

                    await db.collection('products').add({
                        ...product,
                        createdAt: FieldValue.serverTimestamp(),
                        updatedAt: FieldValue.serverTimestamp(),
                    });
                    productsAdded++;
                    console.log(`[OK] Added product: ${product.translations?.ar?.name || product.slug}`);
                } else {
                    console.log(`[SKIP] Skipped product: ${product.slug} (exists)`);
                }
            } catch (err) {
                const error = err as Error;
                errors.push(`Product ${product.slug}: ${error.message}`);
                console.error(`[ERR] Error adding product ${product.slug}:`, error.message);
            }
        }

        // Update category product counts
        console.log('Updating category product counts...');
        const categorySlugs = [...new Set(products.map(p => p.categorySlug))];
        for (const slug of categorySlugs) {
            const count = products.filter(p => p.categorySlug === slug).length;
            const catQuery = await db.collection('categories')
                .where('slug', '==', slug)
                .limit(1)
                .get();

            if (!catQuery.empty) {
                await catQuery.docs[0].ref.update({ productCount: count });
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
