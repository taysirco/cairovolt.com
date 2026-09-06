/**
 * OpenAI (ChatGPT) Ads Conversions API — server-side sender.
 *
 * Endpoint : POST https://bzr.openai.com/v1/events?pid=<PIXEL-ID>
 * Auth     : Authorization: Bearer <OPENAI_ADS_CAPI_KEY>   (server env only)
 * Docs     : https://developers.openai.com/ads/conversions-api  (read 2026-09-06)
 *
 * Design rules (mirrors src/lib/tiktokEventsApi.ts):
 *  - Called from `after()` in the order route: never on the response path.
 *  - Missing key → log once, skip. Never send unauthenticated.
 *  - Bounded timeout; one retry only for transient failures (network/429/5xx);
 *    4xx (auth, validation) is final and logged with the response body, which
 *    is where OpenAI puts the reason. Nothing here throws to the caller.
 *  - The event `id` is `order_<orderId>` — the same value the browser pixel
 *    uses as `event_id`, so OpenAI deduplicates the two channels.
 *  - Amounts are integers in piastres; contents come from the server-resolved
 *    order lines, never from the browser payload.
 *  - No raw phone/email/ids in logs. Hashes are computed here and not logged.
 */

import { createHash } from 'node:crypto';
import {
    OPENAI_ADS_PIXEL_ID,
    buildOrderCreatedData,
    egyptianPhoneToHashInput,
    orderCreatedEventId,
    type AdsContext,
    type OpenAiContentsData,
    type OrderLineForAds,
} from './shared.ts';

const CAPI_ENDPOINT = 'https://bzr.openai.com/v1/events';
const REQUEST_TIMEOUT_MS = 5000;
const RETRY_DELAY_MS = 400;
const MAX_ATTEMPTS = 2;

export interface OpenAiCapiUser {
    obref?: string;
    phone_numbers_sha256?: string[];
    emails_sha256?: string[];
    external_ids_sha256?: string[];
    first_names_sha256?: string[];
    last_names_sha256?: string[];
    regions?: string[];
    cities?: string[];
    countries?: string[];
    postal_codes?: string[];
    ip_address?: string;
    user_agent?: string;
}

export interface OpenAiCapiEvent {
    id: string;
    type: 'order_created' | 'checkout_started' | 'items_added' | 'contents_viewed' | 'page_viewed' | 'lead_created';
    timestamp_ms: number;
    action_source: 'web';
    source_url: string;
    oppref?: string;
    user?: OpenAiCapiUser;
    opt_out?: boolean;
    data: OpenAiContentsData | { type: 'customer_action'; amount?: number; currency?: string };
}

export interface CapiSendResult {
    status: 'sent' | 'validated' | 'skipped_no_key' | 'skipped_consent' | 'rejected' | 'failed';
    httpStatus?: number;
    attempts: number;
    /** Trimmed, PII-free response excerpt for diagnostics. */
    detail?: string;
}

export function sha256Hex(input: string): string {
    return createHash('sha256').update(input, 'utf8').digest('hex');
}

/** Build the `user` matching object from what the COD order reliably has. */
export function buildCapiUser(input: {
    phone?: string;
    obref?: string | null;
    ip?: string;
    userAgent?: string;
    regionLabel?: string | null;
    consent: boolean;
}): OpenAiCapiUser | undefined {
    if (!input.consent) return undefined;
    const user: OpenAiCapiUser = {};
    const digits = egyptianPhoneToHashInput(input.phone);
    if (digits) user.phone_numbers_sha256 = [sha256Hex(digits)];
    if (input.obref) user.obref = input.obref;
    if (input.ip) user.ip_address = input.ip;
    if (input.userAgent) user.user_agent = input.userAgent.slice(0, 512);
    user.countries = ['EG'];
    if (input.regionLabel) user.regions = [String(input.regionLabel).slice(0, 128)];
    return user;
}

export interface OrderCreatedEventInput {
    orderId: string;
    items: OrderLineForAds[];
    /** Server total after discounts, including shipping (EGP). */
    totalAmountEgp: number;
    /** When the order was committed (ms). Reused unchanged on retry. */
    conversionTimestampMs: number;
    context: AdsContext;
    phone?: string;
    ip?: string;
    userAgent?: string;
    regionLabel?: string | null;
}

export function buildOrderCreatedEvent(input: OrderCreatedEventInput): OpenAiCapiEvent {
    const event: OpenAiCapiEvent = {
        id: orderCreatedEventId(input.orderId),
        type: 'order_created',
        timestamp_ms: Math.floor(input.conversionTimestampMs),
        action_source: 'web',
        source_url: input.context.sourceUrl,
        data: buildOrderCreatedData(input.items, input.totalAmountEgp),
    };
    if (input.context.oppref) event.oppref = input.context.oppref;
    const user = buildCapiUser({
        phone: input.phone,
        obref: input.context.obref,
        ip: input.ip,
        userAgent: input.userAgent,
        regionLabel: input.regionLabel,
        consent: input.context.consent,
    });
    if (user && Object.keys(user).length > 0) event.user = user;
    return event;
}

function isTransient(status: number | undefined): boolean {
    return status === undefined || status === 429 || status >= 500;
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let warnedMissingKey = false;

export interface SendOptions {
    /** `true` asks OpenAI to validate without recording. Production = false. */
    validateOnly?: boolean;
    /** Injectable for tests; defaults to global fetch. */
    fetchImpl?: typeof fetch;
    /** Injectable for tests; defaults to process.env.OPENAI_ADS_CAPI_KEY. */
    apiKey?: string;
    pixelId?: string;
}

/**
 * Send one or more events. Resolves with a diagnostic result; never throws.
 */
export async function sendOpenAiConversionEvents(
    events: OpenAiCapiEvent[],
    options: SendOptions = {},
): Promise<CapiSendResult> {
    const apiKey = options.apiKey ?? process.env.OPENAI_ADS_CAPI_KEY;
    if (!apiKey) {
        if (!warnedMissingKey) {
            warnedMissingKey = true;
            console.warn('[OpenAI CAPI] OPENAI_ADS_CAPI_KEY is not set — server events are skipped (pixel still runs).');
        }
        return { status: 'skipped_no_key', attempts: 0 };
    }
    if (events.length === 0) return { status: 'sent', attempts: 0 };

    const fetchImpl = options.fetchImpl ?? fetch;
    const pixelId = options.pixelId ?? OPENAI_ADS_PIXEL_ID;
    const validateOnly = options.validateOnly === true;
    const url = `${CAPI_ENDPOINT}?pid=${encodeURIComponent(pixelId)}`;
    const body = JSON.stringify({ validate_only: validateOnly, events });

    let attempts = 0;
    let lastStatus: number | undefined;
    let lastDetail = '';

    while (attempts < MAX_ATTEMPTS) {
        attempts += 1;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
        try {
            const response = await fetchImpl(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body,
                signal: controller.signal,
            });
            lastStatus = response.status;
            // Read the body in every branch: the rejection reason lives there.
            const text = await response.text().catch(() => '');
            lastDetail = text.slice(0, 300);
            if (response.ok) {
                return {
                    status: validateOnly ? 'validated' : 'sent',
                    httpStatus: response.status,
                    attempts,
                    detail: lastDetail,
                };
            }
            if (!isTransient(response.status)) {
                console.error(`[OpenAI CAPI] rejected — HTTP ${response.status}: ${lastDetail}`);
                return { status: 'rejected', httpStatus: response.status, attempts, detail: lastDetail };
            }
        } catch (err) {
            lastStatus = undefined;
            lastDetail = err instanceof Error ? err.name : 'network_error';
        } finally {
            clearTimeout(timer);
        }
        if (attempts < MAX_ATTEMPTS) await sleep(RETRY_DELAY_MS);
    }

    console.error(`[OpenAI CAPI] failed after ${attempts} attempts — HTTP ${lastStatus ?? 'n/a'}: ${lastDetail}`);
    return { status: 'failed', httpStatus: lastStatus, attempts, detail: lastDetail };
}

/**
 * Convenience used by the order route: build + send `order_created`.
 * Honours a browser-reported consent denial by not sending at all.
 */
export async function sendOrderCreatedEvent(
    input: OrderCreatedEventInput,
    options: SendOptions = {},
): Promise<CapiSendResult> {
    if (!input.context.consent) return { status: 'skipped_consent', attempts: 0 };
    const event = buildOrderCreatedEvent(input);
    return sendOpenAiConversionEvents([event], options);
}
