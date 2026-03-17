/**
 * Helper function to ping Google Indexing API via the Next.js webhook.
 * Use this from any backend code (admin panels, API routes, etc.)
 * when you need to notify Google of a URL update or deletion.
 */
import { logger } from '@/lib/logger';
export async function pingGoogleIndexing(
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
        logger.warn('[pingGoogleIndexing] INDEXING_WEBHOOK_SECRET not set');
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
        const response = await fetch(`${baseUrl}/api/google-index`, {
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
            logger.info(`[SEO] ✅ Google Index pinged: ${targetUrl}`);
            return { success: true };
        } else {
            console.error(`[SEO] ❌ Ping failed:`, result.error);
            return { success: false, error: result.error };
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error(`[SEO] ❌ Network error:`, message);
        return { success: false, error: message };
    }
}
