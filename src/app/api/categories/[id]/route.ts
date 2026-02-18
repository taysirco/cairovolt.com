import { NextRequest, NextResponse } from 'next/server';
import { getFirestore } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { validateApiKey } from '@/lib/api-auth';

// ============================================
// GET - Get single category
// ============================================

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const db = await getFirestore();

    try {
        const { id } = await params;
        const doc = await db.collection('categories').doc(id).get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
    }
}

// ============================================
// PUT - Update category
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
        const docRef = db.collection('categories').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        // Check slug uniqueness if changed
        if (data.slug) {
            const existingSlug = await db.collection('categories')
                .where('slug', '==', data.slug)
                .get();

            const otherWithSlug = existingSlug.docs.find(d => d.id !== id);
            if (otherWithSlug) {
                return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
            }
        }

        const existingData = doc.data();

        const updateData: Record<string, unknown> = {
            updatedAt: FieldValue.serverTimestamp(),
        };

        if (data.slug !== undefined) updateData.slug = data.slug;
        if (data.icon !== undefined) updateData.icon = data.icon;
        if (data.image !== undefined) updateData.image = data.image;
        if (data.order !== undefined) updateData.order = data.order;
        if (data.status !== undefined) updateData.status = data.status;

        // Translations
        if (data.enName !== undefined || data.arName !== undefined) {
            updateData['translations'] = {
                en: {
                    name: data.enName ?? existingData?.translations?.en?.name ?? '',
                    description: data.enDesc ?? existingData?.translations?.en?.description ?? '',
                    metaTitle: data.enMetaTitle ?? existingData?.translations?.en?.metaTitle ?? '',
                    metaDesc: data.enMetaDesc ?? existingData?.translations?.en?.metaDesc ?? '',
                },
                ar: {
                    name: data.arName ?? existingData?.translations?.ar?.name ?? '',
                    description: data.arDesc ?? existingData?.translations?.ar?.description ?? '',
                    metaTitle: data.arMetaTitle ?? existingData?.translations?.ar?.metaTitle ?? '',
                    metaDesc: data.arMetaDesc ?? existingData?.translations?.ar?.metaDesc ?? '',
                },
            };
        }

        if (data.keywords !== undefined) {
            updateData['seo'] = {
                keywords: data.keywords,
                canonical: data.canonical ?? existingData?.seo?.canonical ?? null,
            };
        }

        await docRef.update(updateData);

        const updatedDoc = await docRef.get();
        return NextResponse.json({ success: true, id: updatedDoc.id, ...updatedDoc.data() });
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

// ============================================
// DELETE - Delete single category
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
        const docRef = db.collection('categories').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        await docRef.delete();
        return NextResponse.json({ success: true, deleted: id });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
