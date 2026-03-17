/**
 * Helper to notify the Indexing API when pages update.
 * Use this from any backend code (admin panels, API routes, etc.)
 * when you need to notify Google of a URL update or deletion.
 */
import { logger } from '@/lib/logger';
export async function notifyIndexing(
    productSlug: string,
    options: {
        isDeleted?: boolean;
        brand?: string;
        category?: string;
    } = {}
): Promise<{ success: boolean; error?: string }> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cairovolt.com';
    const secret = process.env.INDEXING_WEBHOOK_SECRET;

    if (!secret) {
        logger.warn('[indexing] webhook secret not set');
        return { success: false, error: 'INDEXING_WEBHOOK_SECRET not configured' };
    }

    const brand = options.brand?.toLowerCase() || '';
    const category = options.category || '';
    const path = brand && category
        ? `/${brand}/${category}/${productSlug}`
        : `/products/${productSlug}`;

    const targetUrl = `${baseUrl}/ar${path}`;
    const actionType = options.isDeleted ? 'URL_DELETED' : 'URL_UPDATED';

    try {
        const response = await fetch(`${baseUrl}/api/indexing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${secret}`,
            },
            body: JSON.stringify({
                url: targetUrl,
                type: actionType,
                slug: productSlug,
            }),
        });

        const result = await response.json();

        if (result.success) {
            logger.info(`[Indexing] ✅ Google Index pinged: ${targetUrl}`);
            return { success: true };
        } else {
            console.error(`[Indexing] ❌ Ping failed:`, result.error);
            return { success: false, error: result.error };
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error(`[Indexing] ❌ Network error:`, message);
        return { success: false, error: message };
    }
}
