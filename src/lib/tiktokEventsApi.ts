/**
 * TikTok Events API — Server-Side Tracking
 * 
 * Sends conversion events directly from the server to TikTok's API.
 * This provides reliable tracking that bypasses ad blockers and
 * improves match rates for better ad optimization.
 * 
 * Endpoint: https://business-api.tiktok.com/open_api/v1.3/event/track/
 * Docs: https://business-api.tiktok.com/portal/docs?id=1741601162187777
 */

const TIKTOK_PIXEL_ID = 'D75T3KBC77U4939GIH30';
const TIKTOK_API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

interface TtqEventProperties {
    content_id?: string;
    content_name?: string;
    content_type?: string;
    value?: number;
    currency?: string;
    quantity?: number;
}

interface TtqUserData {
    phone?: string;   // SHA256 hashed, E.164 format
    ip?: string;
    user_agent?: string;
}

/**
 * Send a server-side event to TikTok Events API.
 * Non-blocking: designed to be called with `after()` in Next.js.
 */
export async function sendTiktokServerEvent(
    eventName: string,
    properties: TtqEventProperties,
    userData: TtqUserData = {},
    pageUrl?: string,
): Promise<void> {
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
    if (!accessToken) {
        console.warn('[TikTok S2S] No TIKTOK_ACCESS_TOKEN — skipping server event');
        return;
    }

    try {
        // Hash phone to SHA256 if provided (TikTok requires hashed PII)
        let hashedPhone: string | undefined;
        if (userData.phone) {
            const { createHash } = await import('crypto');
            // Normalize Egyptian phone: ensure +20 prefix for E.164
            const normalized = userData.phone.startsWith('+')
                ? userData.phone
                : `+2${userData.phone}`; // Egyptian: 01xxxxxxxxx → +201xxxxxxxxx
            hashedPhone = createHash('sha256').update(normalized).digest('hex');
        }

        const payload = {
            pixel_code: TIKTOK_PIXEL_ID,
            event: eventName,
            event_id: `${eventName}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            timestamp: new Date().toISOString(),
            context: {
                page: {
                    url: pageUrl || 'https://cairovolt.com',
                },
                user_agent: userData.user_agent || '',
                ip: userData.ip || '',
                user: {
                    ...(hashedPhone ? { phone_number: hashedPhone } : {}),
                },
            },
            properties: {
                contents: [{
                    content_id: properties.content_id || '',
                    content_name: properties.content_name || '',
                    content_type: properties.content_type || 'product',
                    quantity: properties.quantity || 1,
                    price: properties.value || 0,
                }],
                value: properties.value || 0,
                currency: properties.currency || 'EGP',
            },
        };

        const response = await fetch(TIKTOK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': accessToken,
            },
            body: JSON.stringify({
                event_source: 'web',
                event_source_id: TIKTOK_PIXEL_ID,
                data: [payload],
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`[TikTok S2S] API error ${response.status}:`, errorBody);
        } else {
            const result = await response.json();
            if (result.code !== 0) {
                console.error('[TikTok S2S] API returned error:', result.message);
            }
        }
    } catch (err) {
        console.error('[TikTok S2S] Failed to send event:', err);
    }
}

/**
 * Convenience: Send PlaceAnOrder event from the server
 */
export function sendTtqOrderEvent(
    orderId: string,
    items: Array<{ name: string; price: number; quantity: number }>,
    totalAmount: number,
    phone: string,
    ip?: string,
    userAgent?: string,
) {
    const contentNames = items.map(i => i.name).join(', ');
    const totalQty = items.reduce((s, i) => s + i.quantity, 0);

    return sendTiktokServerEvent(
        'PlaceAnOrder',
        {
            content_id: orderId,
            content_name: contentNames,
            content_type: 'product',
            value: totalAmount,
            quantity: totalQty,
        },
        { phone, ip, user_agent: userAgent },
        'https://cairovolt.com/confirm',
    );
}
