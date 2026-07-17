/**
 * Revalidate changed product surfaces and notify IndexNow-compatible engines.
 * Google discovery continues through the sitemap and normal crawling.
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

    // Arabic is the default locale and is served UNPREFIXED — /ar/... URLs
    // don't exist on this site (pinging them was indexing noise).
    const targetUrl = `${baseUrl}${path}`;
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
            logger.info(`[Discovery] Product surfaces refreshed: ${targetUrl}`);
            return { success: true };
        } else {
            console.error('[Discovery] Refresh request failed:', result.error);
            return { success: false, error: result.error };
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('[Discovery] Network error:', message);
        return { success: false, error: message };
    }
}
