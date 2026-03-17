/**
 * Bosta Fulfillment Integration — Real API Client
 *
 * Creates actual shipments via Bosta's REST API for Quick-COD orders.
 * This is separate from `bosta.ts` which only generates display statistics.
 *
 * Prerequisites:
 *   - `bosta_api_key` in Google Secret Manager
 *   - `bosta_base_url` in Google Secret Manager
 *     - Sandbox: https://stg-app.bosta.co/api/v2
 *     - Production: https://app.bosta.co/api/v2
 *
 * Phase 2: Currently exported but called from Quick-COD route
 * only when uncommented (after Bosta sandbox testing is done).
 */

import { getSecret } from './get-secrets';
import { logger } from './logger';

// ═══════════ Types ═══════════

export interface BostaShipmentInput {
    orderId: string;
    phone: string;
    sku: string;
    productName: string;
    totalAmount: number;
    customerName?: string;
    address?: string;
    city?: string;
}

export interface BostaShipmentResult {
    success: boolean;
    trackingNumber?: string;
    deliveryId?: string;
    error?: string;
}

// ═══════════ Bosta Governorate Codes ═══════════
// Mapped to Bosta's internal city ID system

const BOSTA_CITY_MAP: Record<string, { id: string; name: string }> = {
    'cairo':        { id: 'EG-C',   name: 'Cairo' },
    'giza':         { id: 'EG-GZ',  name: 'Giza' },
    'alexandria':   { id: 'EG-ALX', name: 'Alexandria' },
    'qalyubia':     { id: 'EG-KB',  name: 'Qalyubia' },
    'sharqia':      { id: 'EG-SHR', name: 'Sharqia' },
    'dakahlia':     { id: 'EG-DK',  name: 'Dakahlia' },
    'gharbia':      { id: 'EG-GH',  name: 'Gharbia' },
    'monufia':      { id: 'EG-MNF', name: 'Monufia' },
    'beheira':      { id: 'EG-BH',  name: 'Beheira' },
    'kafr-el-sheikh': { id: 'EG-KFS', name: 'Kafr El Sheikh' },
    'damietta':     { id: 'EG-DT',  name: 'Damietta' },
    'port-said':    { id: 'EG-PTS', name: 'Port Said' },
    'ismailia':     { id: 'EG-IS',  name: 'Ismailia' },
    'suez':         { id: 'EG-SUZ', name: 'Suez' },
    'fayoum':       { id: 'EG-FYM', name: 'Fayoum' },
    'beni-suef':    { id: 'EG-BNS', name: 'Beni Suef' },
    'minya':        { id: 'EG-MN',  name: 'Minya' },
    'asyut':        { id: 'EG-AST', name: 'Asyut' },
    'sohag':        { id: 'EG-SHG', name: 'Sohag' },
    'qena':         { id: 'EG-KN',  name: 'Qena' },
    'luxor':        { id: 'EG-LX',  name: 'Luxor' },
    'aswan':        { id: 'EG-ASN', name: 'Aswan' },
    'red-sea':      { id: 'EG-BA',  name: 'Red Sea' },
    'matrouh':      { id: 'EG-MT',  name: 'Matrouh' },
    'north-sinai':  { id: 'EG-SIN', name: 'North Sinai' },
    'south-sinai':  { id: 'EG-JS',  name: 'South Sinai' },
    'new-valley':   { id: 'EG-WAD', name: 'New Valley' },
};

// Cached credentials to avoid Secret Manager calls on every request
let cachedApiKey: string | null = null;
let cachedBaseUrl: string | null = null;

async function getBostaCredentials(): Promise<{ apiKey: string; baseUrl: string } | null> {
    if (cachedApiKey && cachedBaseUrl) {
        return { apiKey: cachedApiKey, baseUrl: cachedBaseUrl };
    }

    const [apiKey, baseUrl] = await Promise.all([
        getSecret('bosta_api_key'),
        getSecret('bosta_base_url'),
    ]);

    if (!apiKey || !baseUrl) {
        console.error('[Bosta Fulfillment] Missing API credentials in Secret Manager');
        return null;
    }

    cachedApiKey = apiKey;
    cachedBaseUrl = baseUrl;
    return { apiKey, baseUrl };
}

// ═══════════ Create Shipment ═══════════

export async function createBostaShipment(
    input: BostaShipmentInput
): Promise<BostaShipmentResult> {
    const creds = await getBostaCredentials();

    if (!creds) {
        return {
            success: false,
            error: 'Bosta credentials not configured — add bosta_api_key and bosta_base_url to Secret Manager',
        };
    }

    // Resolve city code
    const cityKey = (input.city || 'cairo').toLowerCase().replace(/\s+/g, '-');
    const bostaCity = BOSTA_CITY_MAP[cityKey] || BOSTA_CITY_MAP['cairo'];

    try {
        const response = await fetch(`${creds.baseUrl}/deliveries`, {
            method: 'POST',
            headers: {
                'Authorization': creds.apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 10,                                    // Delivery type
                specs: {
                    packageType: 'Parcel',
                    size: 'SMALL',
                    weight: 0.5,                             // Default weight in kg
                },
                notes: `Quick-COD Order: ${input.orderId} | SKU: ${input.sku} | ${input.productName}`,
                cod: input.totalAmount,                      // Cash on delivery amount
                dropOffAddress: {
                    city: bostaCity.name,
                    firstLine: input.address || 'TBD — Courier will confirm via phone call',
                },
                receiver: {
                    firstName: input.customerName || 'CairoVolt Customer',
                    phone: input.phone.startsWith('+2') ? input.phone : `+2${input.phone}`,
                },
                businessReference: input.orderId,
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`[Bosta Fulfillment] API Error ${response.status}:`, errorBody);

            // Reset cached credentials on auth failure
            if (response.status === 401 || response.status === 403) {
                cachedApiKey = null;
                cachedBaseUrl = null;
            }

            return {
                success: false,
                error: `Bosta API error: ${response.status}`,
            };
        }

        const result = await response.json();

        logger.info(
            `[Bosta Fulfillment] Shipment created — Order: ${input.orderId}, Tracking: ${result.trackingNumber || result._id}`
        );

        return {
            success: true,
            trackingNumber: result.trackingNumber || result._id,
            deliveryId: result._id,
        };
    } catch (error) {
        console.error('[Bosta Fulfillment] Network error:', error);
        return {
            success: false,
            error: 'Network error connecting to Bosta API',
        };
    }
}

// ═══════════ Track Shipment ═══════════

export async function trackBostaShipment(
    trackingNumber: string
): Promise<{ status: string; lastUpdate: string } | null> {
    const creds = await getBostaCredentials();
    if (!creds) return null;

    try {
        const response = await fetch(
            `${creds.baseUrl}/deliveries/tracking/${trackingNumber}`,
            {
                headers: { 'Authorization': creds.apiKey },
            }
        );

        if (!response.ok) return null;

        const data = await response.json();
        return {
            status: data.CurrentStatus?.state || 'unknown',
            lastUpdate: data.CurrentStatus?.timestamp || new Date().toISOString(),
        };
    } catch {
        return null;
    }
}
