import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { validateApiKey } from '@/lib/api-auth';

// ============================================
// GET - Get single product by ID
// ============================================

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const db = await getFirestore();

    try {
        const { id } = await params;
        const docRef = db.collection('products').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}

// ============================================
// PUT - Update product
// ============================================

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = validateApiKey(req);
    if (authError) return authError;

    const db = await getFirestore();

    try {
        const { id } = await params;
        const data = await req.json();

        const docRef = db.collection('products').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Check slug uniqueness if changed (slug = doc ID, so check if target doc exists)
        if (data.slug && data.slug !== id) {
            const existingDoc = await db.collection('products').doc(data.slug).get();
            if (existingDoc.exists) {
                return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
            }
        }

        // Parse images if string
        let images = data.images;
        if (typeof images === 'string') {
            try {
                images = JSON.parse(images);
            } catch {
                images = undefined;
            }
        }

        // Build update object
        const updateData: Record<string, unknown> = {
            updatedAt: FieldValue.serverTimestamp(),
        };

        // Basic fields
        if (data.slug !== undefined) updateData.slug = data.slug;
        if (data.sku !== undefined) updateData.sku = data.sku || null;
        if (data.price !== undefined) updateData.price = Number(data.price);
        if (data.originalPrice !== undefined) {
            updateData.originalPrice = data.originalPrice ? Number(data.originalPrice) : null;
            if (data.originalPrice && data.price) {
                updateData.discountPercentage = Math.round((1 - data.price / data.originalPrice) * 100);
            }
        }
        if (data.brand !== undefined) {
            updateData.brand = data.brand;
            updateData.brandSlug = data.brand?.toLowerCase().replace(/\s+/g, '-');
        }
        if (data.categorySlug !== undefined) updateData.categorySlug = data.categorySlug;
        if (data.subcategorySlug !== undefined) updateData.subcategorySlug = data.subcategorySlug || null;
        if (images !== undefined) updateData.images = images;
        if (data.featured !== undefined) updateData.featured = data.featured === true || data.featured === 'true';
        if (data.status !== undefined) updateData.status = data.status;
        if (data.stock !== undefined) updateData.stock = Number(data.stock);
        if (data.lowStockThreshold !== undefined) updateData.lowStockThreshold = Number(data.lowStockThreshold);

        // Translations
        if (data.enName !== undefined || data.enDesc !== undefined || data.enMetaTitle !== undefined) {
            const existingData = doc.data();
            updateData['translations.en'] = {
                name: data.enName ?? existingData?.translations?.en?.name ?? '',
                description: data.enDesc ?? existingData?.translations?.en?.description ?? '',
                shortDescription: data.enShortDesc ?? existingData?.translations?.en?.shortDescription ?? '',
                metaTitle: data.enMetaTitle ?? existingData?.translations?.en?.metaTitle ?? data.enName ?? '',
                metaDesc: data.enMetaDesc ?? existingData?.translations?.en?.metaDesc ?? '',
                features: data.enFeatures
                    ? (typeof data.enFeatures === 'string'
                        ? data.enFeatures.split('\n').filter(Boolean)
                        : data.enFeatures)
                    : existingData?.translations?.en?.features ?? [],
            };
        }

        if (data.arName !== undefined || data.arDesc !== undefined || data.arMetaTitle !== undefined) {
            const existingData = doc.data();
            updateData['translations.ar'] = {
                name: data.arName ?? existingData?.translations?.ar?.name ?? '',
                description: data.arDesc ?? existingData?.translations?.ar?.description ?? '',
                shortDescription: data.arShortDesc ?? existingData?.translations?.ar?.shortDescription ?? '',
                metaTitle: data.arMetaTitle ?? existingData?.translations?.ar?.metaTitle ?? data.arName ?? '',
                metaDesc: data.arMetaDesc ?? existingData?.translations?.ar?.metaDesc ?? '',
                features: data.arFeatures
                    ? (typeof data.arFeatures === 'string'
                        ? data.arFeatures.split('\n').filter(Boolean)
                        : data.arFeatures)
                    : existingData?.translations?.ar?.features ?? [],
            };
        }

        // SEO
        if (data.keywords !== undefined || data.focusKeyword !== undefined || data.canonical !== undefined) {
            const existingData = doc.data();
            updateData.seo = {
                keywords: data.keywords ?? existingData?.seo?.keywords ?? '',
                focusKeyword: data.focusKeyword ?? existingData?.seo?.focusKeyword ?? '',
                canonical: data.canonical ?? existingData?.seo?.canonical ?? null,
                schemaType: 'Product',
            };
        }

        // Tags
        if (data.tags !== undefined) {
            updateData.tags = typeof data.tags === 'string'
                ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
                : data.tags;
        }

        await docRef.update(updateData);

        // Fetch updated document
        const updatedDoc = await docRef.get();

        return NextResponse.json({
            success: true,
            id: updatedDoc.id,
            ...updatedDoc.data()
        });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

// ============================================
// DELETE - Delete single product
// ============================================

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = validateApiKey(req);
    if (authError) return authError;

    const db = await getFirestore();

    try {
        const { id } = await params;
        const docRef = db.collection('products').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        await docRef.delete();

        return NextResponse.json({
            success: true,
            deleted: id
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
