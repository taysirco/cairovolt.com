#!/usr/bin/env npx tsx
/**
 * Firestore Seeding Script v2.0
 * 
 * Seeds all static data from src/data/*.ts into Firestore collections.
 * Uses slug as document ID for direct lookups (no queries needed).
 * 
 * Usage:
 *   npx tsx scripts/seed-to-firestore.ts              # Seed all collections
 *   npx tsx scripts/seed-to-firestore.ts --dry-run     # Preview what would be seeded
 *   npx tsx scripts/seed-to-firestore.ts --collection products  # Seed specific collection
 *   npx tsx scripts/seed-to-firestore.ts --verify      # Verify Firestore matches source data
 * 
 * Auth methods (in priority order):
 *   1. FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY env vars
 *   2. GOOGLE_APPLICATION_CREDENTIALS env var (service account JSON)
 *   3. Application Default Credentials (gcloud auth application-default login)
 * 
 * Optional ENV vars:
 *   FIREBASE_PROJECT_ID       (default: gadgets-b0bdb)
 *   FIREBASE_DATABASE_ID      (default: (default))
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Firestore, WriteBatch } from 'firebase-admin/firestore';

// ── Static data imports ──
import { categories, products } from '../src/data/seed-products';
import { blogArticles } from '../src/data/blog-articles';
import { productReviewsDb } from '../src/data/product-reviews';
import { categoryData } from '../src/data/category-seo';
import { genericCategories } from '../src/data/generic-categories';
import { brandData } from '../src/data/brand-data';
import { enhancements as seoEnhancements } from '../src/data/product-seo-enhancements';
import { labData as cairovoltLabData } from '../src/data/cairovolt-labs';
import { governorates } from '../src/data/governorates';
import { painPointsDB } from '../src/data/pain-points';

// ── CLI Args ──
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const VERIFY = args.includes('--verify');
const collectionFilter = args.find((_, i, a) => a[i - 1] === '--collection') || null;

// ── Seeding metadata ──
const SEED_VERSION = '2.0';
const SEED_TIMESTAMP = new Date().toISOString();

// ── Colors for terminal output ──
const c = {
    green: (s: string) => `\x1b[32m${s}\x1b[0m`,
    red: (s: string) => `\x1b[31m${s}\x1b[0m`,
    yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
    cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
    dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
    bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

// ── Initialize Firestore ──
function initFirestore(): Firestore {
    const projectId = process.env.FIREBASE_PROJECT_ID || 'gadgets-b0bdb';
    const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

    if (!getApps().length) {
        if (clientEmail && privateKeyRaw) {
            // Method 1: Explicit env vars
            const privateKey = privateKeyRaw.replace(/\\n/g, '\n');
            initializeApp({
                credential: cert({ projectId, clientEmail, privateKey }),
            });
            console.log(c.dim('  🔑 Auth: explicit env vars (FIREBASE_CLIENT_EMAIL)'));
        } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            // Method 2: Service account JSON file
            initializeApp({
                credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
            });
            console.log(c.dim(`  🔑 Auth: service account (${process.env.GOOGLE_APPLICATION_CREDENTIALS})`));
        } else {
            // Method 3: Application Default Credentials (gcloud auth)
            initializeApp({ projectId });
            console.log(c.dim('  🔑 Auth: Application Default Credentials'));
        }
    }

    return getFirestore(getApps()[0], databaseId);
}

// ── Batch writer (handles Firestore 500-doc batch limit) ──
async function batchWrite(
    db: Firestore,
    collectionName: string,
    docs: Array<{ id: string; data: Record<string, any> }>,
): Promise<number> {
    if (DRY_RUN) {
        console.log(c.yellow(`  [DRY RUN] Would write ${docs.length} docs to "${collectionName}"`));
        docs.slice(0, 3).forEach(d => console.log(c.dim(`    → ${d.id}`)));
        if (docs.length > 3) console.log(c.dim(`    ... and ${docs.length - 3} more`));
        return docs.length;
    }

    const BATCH_SIZE = 450; // Stay under 500 limit with safety margin
    let written = 0;

    for (let i = 0; i < docs.length; i += BATCH_SIZE) {
        const chunk = docs.slice(i, i + BATCH_SIZE);
        const batch: WriteBatch = db.batch();

        for (const doc of chunk) {
            const ref = db.collection(collectionName).doc(doc.id);
            batch.set(ref, doc.data, { merge: true }); // merge: true for idempotent upserts
        }

        await batch.commit();
        written += chunk.length;
    }

    return written;
}

// ── Serializer: strip functions, handle Dates, ensure Firestore-safe values ──
function sanitize(obj: any): any {
    if (obj === null || obj === undefined) return null;
    if (typeof obj === 'function') return undefined;
    if (obj instanceof Date) return obj.toISOString();
    if (Array.isArray(obj)) return obj.map(sanitize).filter(v => v !== undefined);
    if (typeof obj === 'object') {
        const result: Record<string, any> = {};
        for (const [key, val] of Object.entries(obj)) {
            const clean = sanitize(val);
            if (clean !== undefined) {
                result[key] = clean;
            }
        }
        return result;
    }
    return obj;
}

// ── Validation: check doc ID for Firestore compliance ──
function validateDocId(id: string, collectionName: string): boolean {
    if (!id || typeof id !== 'string') {
        console.log(c.red(`    ⚠️ ${collectionName}: empty or invalid doc ID`));
        return false;
    }
    if (id.includes('/')) {
        console.log(c.red(`    ⚠️ ${collectionName}: doc ID contains "/" → "${id}"`));
        return false;
    }
    if (id.length > 1500) {
        console.log(c.red(`    ⚠️ ${collectionName}: doc ID exceeds 1500 bytes → "${id.slice(0, 50)}..."`));
        return false;
    }
    return true;
}

// ── Add seeding metadata to each document ──
function withMeta(data: Record<string, any>): Record<string, any> {
    return {
        ...data,
        _meta: {
            seedVersion: SEED_VERSION,
            seededAt: SEED_TIMESTAMP,
            source: 'seed-to-firestore.ts',
        },
    };
}

// ═══════════════════════════════════════════
// SEEDERS — one per collection
// ═══════════════════════════════════════════

interface SeederResult {
    collection: string;
    count: number;
    status: 'ok' | 'skipped' | 'error';
    error?: string;
}

// 1. Categories
async function seedCategories(db: Firestore): Promise<SeederResult> {
    const collName = 'categories';
    try {
        const docs = categories.map(cat => ({
            id: cat.slug,
            data: withMeta(sanitize(cat)),
        })).filter(d => validateDocId(d.id, collName));
        const count = await batchWrite(db, collName, docs);
        return { collection: collName, count, status: 'ok' };
    } catch (e: any) {
        return { collection: collName, count: 0, status: 'error', error: e.message };
    }
}

// 2. Products
async function seedProducts(db: Firestore): Promise<SeederResult> {
    const collName = 'products';
    try {
        const docs = products.map(prod => ({
            id: prod.slug,
            data: withMeta(sanitize(prod)),
        })).filter(d => validateDocId(d.id, collName));
        const count = await batchWrite(db, collName, docs);
        return { collection: collName, count, status: 'ok' };
    } catch (e: any) {
        return { collection: collName, count: 0, status: 'error', error: e.message };
    }
}

// 3. Blog Articles
async function seedBlogArticles(db: Firestore): Promise<SeederResult> {
    const collName = 'blog_articles';
    try {
        const docs = blogArticles.map(article => ({
            id: article.slug,
            data: withMeta(sanitize(article)),
        })).filter(d => validateDocId(d.id, collName));
        const count = await batchWrite(db, collName, docs);
        return { collection: collName, count, status: 'ok' };
    } catch (e: any) {
        return { collection: collName, count: 0, status: 'error', error: e.message };
    }
}

// 4. Product Reviews
async function seedProductReviews(db: Firestore): Promise<SeederResult> {
    const collName = 'product_reviews';
    try {
        // productReviewsDb is Record<slug, ProductReview[]>
        // Store as one doc per product slug containing its reviews array
        const docs = Object.entries(productReviewsDb).map(([slug, reviews]) => ({
            id: slug,
            data: withMeta(sanitize({ productSlug: slug, reviews, reviewCount: (reviews as any[]).length })),
        })).filter(d => validateDocId(d.id, collName));
        const count = await batchWrite(db, collName, docs);
        return { collection: collName, count, status: 'ok' };
    } catch (e: any) {
        return { collection: collName, count: 0, status: 'error', error: e.message };
    }
}

// 5. Category SEO
async function seedCategorySeo(db: Firestore): Promise<SeederResult> {
    const collName = 'category_seo';
    try {
        // categoryData is Record<brand, Record<categoryName, CategorySeoData>>
        // Flatten to docs with id = "brand--categorySlug"
        const docs: Array<{ id: string; data: Record<string, any> }> = [];
        for (const [brand, cats] of Object.entries(categoryData)) {
            for (const [catName, seoData] of Object.entries(cats)) {
                const id = `${brand.toLowerCase()}--${catName}`;
                if (validateDocId(id, collName)) {
                    docs.push({
                        id,
                        data: withMeta(sanitize({ ...seoData, _brand: brand, _categorySlug: catName })),
                    });
                }
            }
        }
        const count = await batchWrite(db, collName, docs);
        return { collection: collName, count, status: 'ok' };
    } catch (e: any) {
        return { collection: collName, count: 0, status: 'error', error: e.message };
    }
}

// 6. SEO Enhancements
async function seedSeoEnhancements(db: Firestore): Promise<SeederResult> {
    const collName = 'seo_enhancements';
    try {
        // seoEnhancements is Record<slug, ProductSEOEnhancement>
        const docs = Object.entries(seoEnhancements)
            .map(([slug, enhancement]) => ({
                id: slug,
                data: withMeta(sanitize({ productSlug: slug, ...(enhancement as any) })),
            })).filter(d => validateDocId(d.id, collName));
        const count = await batchWrite(db, collName, docs);
        return { collection: collName, count, status: 'ok' };
    } catch (e: any) {
        return { collection: collName, count: 0, status: 'error', error: e.message };
    }
}

// 7. Generic Categories
async function seedGenericCategories(db: Firestore): Promise<SeederResult> {
    const collName = 'generic_categories';
    try {
        const docs = genericCategories.map(gc => ({
            id: gc.slug,
            data: withMeta(sanitize(gc)),
        })).filter(d => validateDocId(d.id, collName));
        const count = await batchWrite(db, collName, docs);
        return { collection: collName, count, status: 'ok' };
    } catch (e: any) {
        return { collection: collName, count: 0, status: 'error', error: e.message };
    }
}

// 8. Brand Data
async function seedBrandData(db: Firestore): Promise<SeederResult> {
    const collName = 'brand_data';
    try {
        // brandData is Record<string, BrandData>
        const docs = Object.entries(brandData).map(([slug, data]) => ({
            id: slug,
            data: withMeta(sanitize(data)),
        })).filter(d => validateDocId(d.id, collName));
        const count = await batchWrite(db, collName, docs);
        return { collection: collName, count, status: 'ok' };
    } catch (e: any) {
        return { collection: collName, count: 0, status: 'error', error: e.message };
    }
}

// 9. CairoVolt Lab Data (NEW)
async function seedCairovoltLabs(db: Firestore): Promise<SeederResult> {
    const collName = 'cairovolt_labs';
    try {
        // labData is Record<string, ProductLabData>
        const docs = Object.entries(cairovoltLabData).map(([slug, data]) => ({
            id: slug,
            data: withMeta(sanitize({ productSlug: slug, ...data })),
        })).filter(d => validateDocId(d.id, collName));
        const count = await batchWrite(db, collName, docs);
        return { collection: collName, count, status: 'ok' };
    } catch (e: any) {
        return { collection: collName, count: 0, status: 'error', error: e.message };
    }
}

// 10. Governorates (NEW)
async function seedGovernorates(db: Firestore): Promise<SeederResult> {
    const collName = 'governorates';
    try {
        const docs = governorates.map(gov => ({
            id: gov.slug,
            data: withMeta(sanitize(gov)),
        })).filter(d => validateDocId(d.id, collName));
        const count = await batchWrite(db, collName, docs);
        return { collection: collName, count, status: 'ok' };
    } catch (e: any) {
        return { collection: collName, count: 0, status: 'error', error: e.message };
    }
}

// 11. Pain Points (NEW)
async function seedPainPoints(db: Firestore): Promise<SeederResult> {
    const collName = 'pain_points';
    try {
        const docs = painPointsDB.map(pp => ({
            id: pp.slug,
            data: withMeta(sanitize(pp)),
        })).filter(d => validateDocId(d.id, collName));
        const count = await batchWrite(db, collName, docs);
        return { collection: collName, count, status: 'ok' };
    } catch (e: any) {
        return { collection: collName, count: 0, status: 'error', error: e.message };
    }
}

// ═══════════════════════════════════════════
// VERIFY MODE
// ═══════════════════════════════════════════

async function verifyCollection(db: Firestore, collectionName: string, expectedCount: number): Promise<{ ok: boolean; actual: number }> {
    const snapshot = await db.collection(collectionName).count().get();
    const actual = snapshot.data().count;
    return { ok: actual === expectedCount, actual };
}

// ═══════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════

const ALL_SEEDERS: Record<string, (db: Firestore) => Promise<SeederResult>> = {
    categories: seedCategories,
    products: seedProducts,
    blog_articles: seedBlogArticles,
    product_reviews: seedProductReviews,
    category_seo: seedCategorySeo,
    seo_enhancements: seedSeoEnhancements,
    generic_categories: seedGenericCategories,
    brand_data: seedBrandData,
    cairovolt_labs: seedCairovoltLabs,
    governorates: seedGovernorates,
    pain_points: seedPainPoints,
};

// Expected counts for verification
const EXPECTED_COUNTS: Record<string, number> = {
    categories: categories.length,
    products: products.length,
    blog_articles: blogArticles.length,
    product_reviews: Object.keys(productReviewsDb).length,
    category_seo: Object.values(categoryData).reduce((sum, cats) => sum + Object.keys(cats).length, 0),
    seo_enhancements: Object.keys(seoEnhancements).length,
    generic_categories: genericCategories.length,
    brand_data: Object.keys(brandData).length,
    cairovolt_labs: Object.keys(cairovoltLabData).length,
    governorates: governorates.length,
    pain_points: painPointsDB.length,
};

async function main() {
    console.log(c.bold(`\n🔥 Firestore Seeding Script v${SEED_VERSION}`));
    console.log(c.dim('──────────────────────────────────────'));

    if (DRY_RUN) {
        console.log(c.yellow('⚠️  DRY RUN MODE — no data will be written\n'));
    }

    if (VERIFY) {
        console.log(c.cyan('🔍 VERIFY MODE — checking Firestore doc counts\n'));
    }

    // Validate collection filter
    if (collectionFilter && !ALL_SEEDERS[collectionFilter]) {
        console.error(c.red(`❌ Unknown collection: "${collectionFilter}"`));
        console.error(c.dim(`   Available: ${Object.keys(ALL_SEEDERS).join(', ')}`));
        process.exit(1);
    }

    // Initialize Firestore (skip for dry-run if no creds)
    let db: Firestore;
    if (DRY_RUN) {
        try {
            db = initFirestore();
        } catch {
            console.log(c.yellow('⚠️  No Firebase credentials — showing document counts only\n'));
            db = null as any;
        }
    } else {
        db = initFirestore();
    }

    // ── VERIFY MODE ──
    if (VERIFY) {
        const collections = collectionFilter ? [collectionFilter] : Object.keys(EXPECTED_COUNTS);
        let allOk = true;

        for (const name of collections) {
            const expected = EXPECTED_COUNTS[name];
            process.stdout.write(`  🔍 ${name}... `);
            try {
                const { ok, actual } = await verifyCollection(db, name, expected);
                if (ok) {
                    console.log(c.green(`✅ ${actual} docs (matches source)`));
                } else {
                    console.log(c.red(`❌ ${actual} docs (expected ${expected})`));
                    allOk = false;
                }
            } catch (e: any) {
                console.log(c.red(`❌ ${e.message}`));
                allOk = false;
            }
        }

        console.log(c.dim('\n──────────────────────────────────────'));
        console.log(allOk ? c.green(c.bold('✅ All collections verified')) : c.red('❌ Some collections have mismatches'));
        process.exit(allOk ? 0 : 1);
    }

    // ── SEED MODE ──
    const seedersToRun = collectionFilter
        ? { [collectionFilter]: ALL_SEEDERS[collectionFilter] }
        : ALL_SEEDERS;

    // Pre-seed validation
    console.log(c.dim(`  📊 Source data: ${Object.values(EXPECTED_COUNTS).reduce((a, b) => a + b, 0)} total docs across ${Object.keys(EXPECTED_COUNTS).length} collections\n`));

    // Run seeders
    const results: SeederResult[] = [];
    for (const [name, seeder] of Object.entries(seedersToRun)) {
        process.stdout.write(`  📦 ${name}... `);
        const result = await seeder(db);
        results.push(result);

        if (result.status === 'ok') {
            console.log(c.green(`✅ ${result.count} docs`));
        } else if (result.status === 'skipped') {
            console.log(c.yellow(`⏭️  skipped`));
        } else {
            console.log(c.red(`❌ ${result.error}`));
        }
    }

    // Summary
    console.log(c.dim('\n──────────────────────────────────────'));
    const totalDocs = results.reduce((sum, r) => sum + r.count, 0);
    const errors = results.filter(r => r.status === 'error');

    if (errors.length === 0) {
        console.log(c.green(c.bold(`✅ Successfully seeded ${totalDocs} documents across ${results.length} collections`)));
    } else {
        console.log(c.red(`❌ ${errors.length} collection(s) failed:`));
        errors.forEach(e => console.log(c.red(`   → ${e.collection}: ${e.error}`)));
    }

    if (DRY_RUN) {
        console.log(c.yellow('\n⚠️  This was a dry run. Run without --dry-run to persist data.'));
    }

    console.log('');
    process.exit(errors.length > 0 ? 1 : 0);
}

main().catch(err => {
    console.error(c.red(`\n💥 Fatal error: ${err.message}`));
    console.error(err.stack);
    process.exit(1);
});
