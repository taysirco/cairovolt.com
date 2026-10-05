import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { ttqCompleteRegistration, ttqSubmitForm } from '../src/lib/tiktokPixel.ts';
import {
    ORDER_LEAD_PIXEL_ID, armConfirmedOrderLead, trackConfirmedOrderLead,
    resetOrderLeadMemoryForTests,
} from '../src/lib/tiktokOrderLead.ts';

const ORDER = 'CV-MGP123-ABC123';
const OTHER = 'CV-MGP456-DEF456';
function storage() {
    const data = new Map<string, string>();
    return {
        getItem: (key: string) => data.get(key) ?? null,
        setItem: (key: string, value: string) => { data.set(key, value); },
        removeItem: (key: string) => { data.delete(key); },
    };
}
function setup() {
    resetOrderLeadMemoryForTests();
    const calls: unknown[][] = [];
    const win = {
        location: { pathname: '/confirm', search: '', hash: '' },
        localStorage: storage(), sessionStorage: storage(),
        __cvOrderLeadPixelReady: true,
        __cvLoadOrderLeadPixel: undefined as (() => void) | undefined,
        ttq: { instance: (id: string) => ({ track: (...args: unknown[]) => calls.push([id, ...args]) }) },
    };
    Object.defineProperty(globalThis, 'window', { value: win, configurable: true });
    return { win, calls };
}

test('direct confirmation and arbitrary order data cannot create a lead', () => {
    const { calls } = setup();
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    armConfirmedOrderLead('not-an-order');
    assert.equal(trackConfirmedOrderLead('not-an-order'), false);
    assert.equal(calls.length, 0);
});

test('successful order must reach confirmation, then sends only anonymous SubmitForm', () => {
    const { win, calls } = setup();
    win.location.pathname = '/checkout';
    armConfirmedOrderLead(ORDER);
    assert.equal(calls.length, 0);
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    win.location.pathname = '/confirm';
    assert.equal(trackConfirmedOrderLead(OTHER), false);
    assert.equal(trackConfirmedOrderLead(ORDER), true);
    assert.deepEqual(calls, [[ORDER_LEAD_PIXEL_ID, 'SubmitForm',
        { description: 'confirmed_order_form' }, { event_id: `confirmed_order_${ORDER}` }]]);
});

test('refresh, repeated effect, back navigation and duplicate arming keep one lead', () => {
    const { calls } = setup();
    armConfirmedOrderLead(ORDER);
    assert.equal(trackConfirmedOrderLead(ORDER), true);
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    resetOrderLeadMemoryForTests();
    armConfirmedOrderLead(ORDER);
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    armConfirmedOrderLead(OTHER);
    assert.equal(trackConfirmedOrderLead(OTHER), true);
    assert.equal(calls.length, 2);
});

test('pending success survives a reload before SDK load, then queues once', () => {
    const { win, calls } = setup();
    win.__cvOrderLeadPixelReady = false;
    armConfirmedOrderLead(ORDER);
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    resetOrderLeadMemoryForTests();
    win.__cvOrderLeadPixelReady = true;
    assert.equal(trackConfirmedOrderLead(ORDER), true);
    assert.equal(calls.length, 1);
});

test('Arabic and English confirmations work; warranty and unrelated routes never convert', () => {
    for (const pathname of ['/verify', '/ar/verify', '/en/verify', '/warranty', '/confirm-other', '/']) {
        const { win, calls } = setup();
        win.location.pathname = pathname;
        armConfirmedOrderLead(ORDER);
        assert.equal(trackConfirmedOrderLead(ORDER), false, pathname);
        assert.equal(calls.length, 0);
    }
    for (const pathname of ['/ar/confirm', '/en/confirm', '/confirm/']) {
        const { win } = setup();
        win.location.pathname = pathname;
        armConfirmedOrderLead(ORDER);
        assert.equal(trackConfirmedOrderLead(ORDER), true, pathname);
    }
});

test('personal-data URL fallback, query strings and fragments are never measured', () => {
    const { win, calls } = setup();
    armConfirmedOrderLead(ORDER);
    win.location.search = '?order=private-data';
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    win.location.search = '';
    win.location.hash = '#private-data';
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    assert.equal(calls.length, 0);
});

test('consent denial blocks and discards pending conversion rather than replaying', () => {
    const { win, calls } = setup();
    armConfirmedOrderLead(ORDER);
    win.localStorage.setItem('cv_measurement_consent', 'denied');
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    win.localStorage.setItem('cv_measurement_consent', 'granted');
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    assert.equal(calls.length, 0);
});

test('expired or future order markers cannot generate a lead', () => {
    const { win, calls } = setup();
    win.sessionStorage.setItem(`cv_order_lead_pending:${ORDER}`, String(Date.now() - 86400001));
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    win.sessionStorage.setItem(`cv_order_lead_pending:${ORDER}`, String(Date.now() + 60000));
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    assert.equal(calls.length, 0);
});

test('SDK failures do not consume success marker or throw into checkout', () => {
    const { win, calls } = setup();
    const original = win.ttq.instance;
    armConfirmedOrderLead(ORDER);
    win.ttq.instance = () => { throw new Error('blocked'); };
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    win.ttq.instance = original;
    assert.equal(trackConfirmedOrderLead(ORDER), true);
    assert.equal(calls.length, 1);
});

test('storage failure still supports one SPA confirmation in memory', () => {
    const { win, calls } = setup();
    win.sessionStorage.setItem = () => { throw new Error('private mode'); };
    win.localStorage.setItem = () => { throw new Error('private mode'); };
    armConfirmedOrderLead(ORDER);
    assert.equal(trackConfirmedOrderLead(ORDER), true);
    assert.equal(trackConfirmedOrderLead(ORDER), false);
    assert.equal(calls.length, 1);
});

test('legacy warranty and checkout events remain confined to the old pixel', async () => {
    const { calls } = setup();
    ttqCompleteRegistration({ method: 'warranty' });
    ttqSubmitForm({ form: 'order' });
    await new Promise(resolve => setTimeout(resolve, 10));
    assert.equal(calls.length, 2);
    assert.ok(calls.every(call => call[0] === 'DAA0JC3C77U98E0UIGAG'));
    assert.ok(calls.every(call => call[0] !== ORDER_LEAD_PIXEL_ID));
});

test('actual inline bootstrap separates pixel queues and signals readiness once', () => {
    const source = readFileSync(new URL('../src/app/[locale]/layout.tsx', import.meta.url), 'utf8');
    const start = source.indexOf('!function (w, d, t)', source.indexOf('// ── TikTok Pixel'));
    const end = source.indexOf("}(window, document, 'ttq');", start) + "}(window, document, 'ttq');".length;
    assert.ok(start > 0 && end > start);
    // Evaluate the template literal exactly as JSX does, including regex escapes.
    const bootstrap = runInNewContext('`' + source.slice(start, end) + '`') as string;
    const scripts: string[] = [];
    const events: string[] = [];
    const win: {
        location: { pathname: string; search: string; hash: string };
        localStorage: ReturnType<typeof storage>;
        dispatchEvent: (event: { type: string }) => number;
        ttq?: { _i: Record<string, unknown[][]> };
        __cvOrderLeadPixelReady?: boolean;
        __cvLoadOrderLeadPixel?: () => void;
    } = {
        location: { pathname: '/confirm', search: '', hash: '' }, localStorage: storage(),
        dispatchEvent: (event: { type: string }) => events.push(event.type),
    };
    const document = {
        createElement: () => ({ src: '' }),
        getElementsByTagName: () => [{ parentNode: { insertBefore: (script: { src: string }) => scripts.push(script.src) } }],
    };
    runInNewContext(bootstrap, { window: win, document, Event });
    assert.equal(scripts.length, 2);
    assert.deepEqual(events, ['cv:tiktok-order-leads-ready']);
    assert.equal(win.ttq!._i[ORDER_LEAD_PIXEL_ID].length, 0);
    assert.equal(win.ttq!._i.DAA0JC3C77U98E0UIGAG[0][0], 'page');
    win.__cvLoadOrderLeadPixel!();
    assert.equal(scripts.length, 2);

    // A query-bearing landing page delays the new pixel until a clean URL.
    const queried = { ...win, ttq: undefined, __cvOrderLeadPixelReady: false,
        location: { pathname: '/confirm', search: '?order=private-data', hash: '' } };
    scripts.length = 0;
    runInNewContext(bootstrap, { window: queried, document, Event });
    assert.equal(scripts.length, 1);
    queried.location.search = '';
    queried.__cvLoadOrderLeadPixel!();
    assert.equal(scripts.length, 2);

    for (const pathname of ['/anker/power-banks', '/ar/anker/power-banks/', '/en/anker/power-banks', '/verify', '/checkout', '/confirm', '/warranty']) {
        for (const search of ['', '?tt_test_id=DB1O8PBC77U5DCODCAM0_1791200049', '?order=private-data', '?tt_test_id=DB1O8PBC77U5DCODCAM0_1791200049&email=private', '?tt_test_id=another_pixel_123']) {
            const catalog: typeof win = { ...win, ttq: undefined, __cvOrderLeadPixelReady: false,
                location: { pathname, search, hash: '' } };
            scripts.length = 0;
            runInNewContext(bootstrap, { window: catalog, document, Event });
            const allowedQuery = search === '' || search === '?tt_test_id=DB1O8PBC77U5DCODCAM0_1791200049';
            assert.equal(scripts.length, allowedQuery ? 2 : 1, pathname + search);
            const queue = catalog.ttq!._i[ORDER_LEAD_PIXEL_ID];
            assert.equal(queue?.length ?? 0, allowedQuery && pathname.includes('/anker/power-banks') ? 1 : 0, pathname + search);
            if (queue?.length) assert.equal(queue[0][0], 'page');
        }
    }
    const denied: typeof win = { ...win, ttq: undefined, __cvOrderLeadPixelReady: false,
        location: { pathname: '/anker/power-banks', search: '', hash: '' }, localStorage: storage() };
    denied.localStorage.setItem('cv_measurement_consent', 'denied');
    scripts.length = 0;
    runInNewContext(bootstrap, { window: denied, document, Event });
    assert.equal(scripts.length, 1);
    assert.equal(denied.ttq!._i[ORDER_LEAD_PIXEL_ID], undefined);
});
