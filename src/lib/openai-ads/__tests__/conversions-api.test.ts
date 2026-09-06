// Run: npm run test:ads   (node --test --experimental-strip-types)
// All HTTP is mocked — nothing here talks to OpenAI.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    buildCapiUser,
    buildOrderCreatedEvent,
    sendOpenAiConversionEvents,
    sendOrderCreatedEvent,
    sha256Hex,
} from '../conversions-api.ts';
import { normalizeAdsContext } from '../shared.ts';

const ORDER = {
    orderId: 'CV-TEST1-ABC123',
    items: [{ sku: 'AP13', slug: 'anker-a1637', name: 'Anker 3-in-1', price: 2999, quantity: 1 }],
    totalAmountEgp: 3069, // 2999 + 70 shipping
    conversionTimestampMs: 1_757_000_000_000,
    context: normalizeAdsContext({ pageUrl: 'https://cairovolt.com/ar/checkout?utm=x', oppref: 'opp_1', obref: 'ob_1' }),
    phone: '01012345678',
    ip: '203.0.113.9',
    userAgent: 'UA/1.0',
    regionLabel: 'Cairo',
};

type Call = { url: string; init: RequestInit };

function mockFetch(responses: Array<{ status: number; body?: string; throwName?: string }>) {
    const calls: Call[] = [];
    let i = 0;
    const impl = (async (url: string, init: RequestInit) => {
        calls.push({ url, init });
        const r = responses[Math.min(i, responses.length - 1)];
        i += 1;
        if (r.throwName) {
            const e = new Error('boom');
            e.name = r.throwName;
            throw e;
        }
        return new Response(r.body ?? '{}', { status: r.status });
    }) as unknown as typeof fetch;
    return { impl, calls };
}

test('event shape follows the Conversions API reference', () => {
    const ev = buildOrderCreatedEvent(ORDER);
    assert.equal(ev.id, 'order_CV-TEST1-ABC123');
    assert.equal(ev.type, 'order_created');
    assert.equal(ev.timestamp_ms, 1_757_000_000_000);
    assert.equal(ev.action_source, 'web');
    assert.equal(ev.source_url, 'https://cairovolt.com/ar/checkout');
    assert.equal(ev.oppref, 'opp_1');
    assert.deepEqual(ev.data, {
        type: 'contents',
        amount: 306900,
        currency: 'EGP',
        contents: [{ id: 'AP13', content_type: 'product', quantity: 1, name: 'Anker 3-in-1', amount: 299900, currency: 'EGP', group_id: 'anker-a1637' }],
    });
    // user: hashed phone (E.164 digits), obref raw, ip/ua, EG + region — no raw phone anywhere
    assert.equal(ev.user?.obref, 'ob_1');
    assert.deepEqual(ev.user?.phone_numbers_sha256, [sha256Hex('201012345678')]);
    assert.deepEqual(ev.user?.countries, ['EG']);
    assert.deepEqual(ev.user?.regions, ['Cairo']);
    assert.equal(ev.user?.ip_address, '203.0.113.9');
    assert.equal(ev.user?.user_agent, 'UA/1.0');
    assert.ok(!JSON.stringify(ev).includes('01012345678'));
    // documented field names only
    assert.deepEqual(Object.keys(ev).sort(), ['action_source', 'data', 'id', 'oppref', 'source_url', 'timestamp_ms', 'type', 'user'].sort());
});

test('consent denied → no user object; invalid phone → no hash, no guessing', () => {
    assert.equal(buildCapiUser({ phone: '01012345678', consent: false }), undefined);
    const u = buildCapiUser({ phone: '+14155552671', consent: true, obref: null });
    assert.equal(u?.phone_numbers_sha256, undefined);
    assert.deepEqual(u?.countries, ['EG']);
});

test('sends validate_only and Bearer auth; 2xx = sent, one attempt', async () => {
    const { impl, calls } = mockFetch([{ status: 200, body: '{"ok":true}' }]);
    const res = await sendOrderCreatedEvent(ORDER, { fetchImpl: impl, apiKey: 'test-key', validateOnly: true });
    assert.equal(res.status, 'validated');
    assert.equal(res.attempts, 1);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'https://bzr.openai.com/v1/events?pid=K8QGQ8ULRsFPeG892Pi4w9');
    const headers = calls[0].init.headers as Record<string, string>;
    assert.equal(headers.Authorization, 'Bearer test-key');
    const body = JSON.parse(String(calls[0].init.body));
    assert.equal(body.validate_only, true);
    assert.equal(body.events.length, 1);
    assert.equal(body.events[0].id, 'order_CV-TEST1-ABC123');
});

test('production default is validate_only:false', async () => {
    const { impl, calls } = mockFetch([{ status: 200 }]);
    const res = await sendOrderCreatedEvent(ORDER, { fetchImpl: impl, apiKey: 'k' });
    assert.equal(res.status, 'sent');
    assert.equal(JSON.parse(String(calls[0].init.body)).validate_only, false);
});

test('missing key → skipped, no request, no throw', async () => {
    const { impl, calls } = mockFetch([{ status: 200 }]);
    const res = await sendOrderCreatedEvent(ORDER, { fetchImpl: impl, apiKey: '' });
    assert.equal(res.status, 'skipped_no_key');
    assert.equal(calls.length, 0);
});

test('consent denied → skipped before any request', async () => {
    const { impl, calls } = mockFetch([{ status: 200 }]);
    const denied = { ...ORDER, context: normalizeAdsContext({ consent: false }) };
    const res = await sendOrderCreatedEvent(denied, { fetchImpl: impl, apiKey: 'k' });
    assert.equal(res.status, 'skipped_consent');
    assert.equal(calls.length, 0);
});

test('4xx (auth/validation) is final: one attempt, rejected, body kept for diagnostics', async () => {
    const { impl, calls } = mockFetch([{ status: 401, body: '{"error":"invalid key"}' }]);
    const res = await sendOrderCreatedEvent(ORDER, { fetchImpl: impl, apiKey: 'bad' });
    assert.equal(res.status, 'rejected');
    assert.equal(res.httpStatus, 401);
    assert.equal(res.attempts, 1);
    assert.equal(calls.length, 1);
});

test('429 / 5xx / network retry exactly once with the SAME id and timestamp, then fail quietly', async () => {
    for (const first of [{ status: 429 }, { status: 503 }, { status: 0, throwName: 'TypeError' }]) {
        const { impl, calls } = mockFetch([first, { status: 200 }]);
        const res = await sendOrderCreatedEvent(ORDER, { fetchImpl: impl, apiKey: 'k' });
        assert.equal(res.status, 'sent');
        assert.equal(res.attempts, 2);
        const a = JSON.parse(String(calls[0].init.body)).events[0];
        const b = JSON.parse(String(calls[1].init.body)).events[0];
        assert.equal(a.id, b.id);
        assert.equal(a.timestamp_ms, b.timestamp_ms);
    }
    const { impl, calls } = mockFetch([{ status: 500 }, { status: 500 }, { status: 500 }]);
    const res = await sendOrderCreatedEvent(ORDER, { fetchImpl: impl, apiKey: 'k' });
    assert.equal(res.status, 'failed');
    assert.equal(res.attempts, 2);   // bounded — never loops
    assert.equal(calls.length, 2);
});

test('timeout aborts the request and is treated as transient', async () => {
    let n = 0;
    const impl = (async (_url: string, init: RequestInit) => {
        n += 1;
        if (n === 1) {
            await new Promise<void>((_resolve, reject) => {
                init.signal?.addEventListener('abort', () => {
                    const e = new Error('aborted');
                    e.name = 'AbortError';
                    reject(e);
                });
            });
        }
        return new Response('{}', { status: 200 });
    }) as unknown as typeof fetch;
    const started = Date.now();
    const res = await sendOpenAiConversionEvents([buildOrderCreatedEvent(ORDER)], { fetchImpl: impl, apiKey: 'k' });
    assert.equal(res.status, 'sent');
    assert.equal(res.attempts, 2);
    assert.ok(Date.now() - started >= 5000, 'first attempt waited for the 5 s timeout');
});

test('empty batch is a no-op', async () => {
    const { impl, calls } = mockFetch([{ status: 200 }]);
    const res = await sendOpenAiConversionEvents([], { fetchImpl: impl, apiKey: 'k' });
    assert.equal(res.status, 'sent');
    assert.equal(calls.length, 0);
});
