// Run: npm run test:ads   (node --test --experimental-strip-types)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    buildOrderCreatedData,
    egpToMinorUnits,
    egyptianPhoneToHashInput,
    normalizeAdsContext,
    orderCreatedEventId,
    orderLinesToContents,
    readCookie,
    sanitizeOpaqueRef,
    sanitizeSourceUrl,
} from '../shared.ts';

test('order event id is stable, order-derived and non-sensitive', () => {
    assert.equal(orderCreatedEventId('CV-ABC123-9F0E'), 'order_CV-ABC123-9F0E');
    assert.equal(orderCreatedEventId('CV-ABC123-9F0E'), orderCreatedEventId('CV-ABC123-9F0E'));
    assert.notEqual(orderCreatedEventId('CV-A'), orderCreatedEventId('CV-B'));
});

test('EGP → piastres as integer minor units', () => {
    assert.equal(egpToMinorUnits(1730), 173000);
    assert.equal(egpToMinorUnits(1249.5), 124950);
    assert.equal(egpToMinorUnits(0.015), 2); // rounds, never floats
    assert.equal(egpToMinorUnits(-5), 0);
    assert.equal(egpToMinorUnits('abc'), 0);
    assert.equal(egpToMinorUnits(NaN), 0);
});

test('contents use catalog ids (sku > slug > productId), never names', () => {
    const contents = orderLinesToContents([
        { sku: 'AP13', slug: 'anker-a1637', name: 'Anker 3-in-1', price: 2999, quantity: 2 },
        { slug: 'soundcore-p20i', name: 'P20i', price: 699, quantity: 1 },
        { productId: 'static_x', name: 'X', price: 0, quantity: 0 },
        { name: 'no id at all', price: 100, quantity: 1 },
    ]);
    assert.deepEqual(contents, [
        { id: 'AP13', content_type: 'product', quantity: 2, name: 'Anker 3-in-1', amount: 299900, currency: 'EGP', group_id: 'anker-a1637' },
        { id: 'soundcore-p20i', content_type: 'product', quantity: 1, name: 'P20i', amount: 69900, currency: 'EGP' },
        { id: 'static_x', content_type: 'product', quantity: 1, name: 'X' },
    ]);
});

test('order_created data carries the server total, not the sum of lines', () => {
    const data = buildOrderCreatedData(
        [{ sku: 'AK03', price: 590, quantity: 2 }],
        1180 - 59 + 70, // subtotal − coupon + shipping = what the courier collects
    );
    assert.equal(data.type, 'contents');
    assert.equal(data.amount, 119100);
    assert.equal(data.currency, 'EGP');
    assert.equal(data.contents?.length, 1);
});

test('egyptian phone → E.164 digits for hashing; anything else → null', () => {
    assert.equal(egyptianPhoneToHashInput('01012345678'), '201012345678');
    assert.equal(egyptianPhoneToHashInput('+20 101 234 5678'), '201012345678');
    assert.equal(egyptianPhoneToHashInput('٠١٠١٢٣٤٥٦٧٨'), '201012345678');
    assert.equal(egyptianPhoneToHashInput('0020 1012345678'), '201012345678');
    assert.equal(egyptianPhoneToHashInput('1012345678'), '201012345678');
    assert.equal(egyptianPhoneToHashInput('0123'), null);            // too short
    assert.equal(egyptianPhoneToHashInput('+14155552671'), null);    // not Egyptian — no guessing
    assert.equal(egyptianPhoneToHashInput(''), null);
    assert.equal(egyptianPhoneToHashInput(undefined), null);
});

test('source_url keeps only scheme://host/path on our own hosts', () => {
    assert.equal(sanitizeSourceUrl('https://cairovolt.com/checkout?x=1#frag'), 'https://cairovolt.com/checkout');
    assert.equal(sanitizeSourceUrl('https://www.cairovolt.com/ar/checkout/'), 'https://www.cairovolt.com/ar/checkout');
    assert.equal(
        sanitizeSourceUrl('https://cairovolt.com/confirm?order=%7B%22phone%22%3A%2201012345678%22%7D'),
        'https://cairovolt.com/confirm',
    );
    assert.equal(sanitizeSourceUrl('https://example.com/checkout'), null);
    assert.equal(sanitizeSourceUrl('https://cairovolt.com.evil.com/x'), null);
    assert.equal(sanitizeSourceUrl('javascript:alert(1)'), null);
    assert.equal(sanitizeSourceUrl(''), null);
    assert.equal(sanitizeSourceUrl(42), null);
});

test('opaque attribution refs pass through unchanged or are dropped', () => {
    assert.equal(sanitizeOpaqueRef('oppref_abc.123-XYZ'), 'oppref_abc.123-XYZ');
    assert.equal(sanitizeOpaqueRef('  123e4567-e89b-42d3-a456-426614174000 '), '123e4567-e89b-42d3-a456-426614174000');
    assert.equal(sanitizeOpaqueRef('has space'), null);
    assert.equal(sanitizeOpaqueRef('x'.repeat(513)), null);
    assert.equal(sanitizeOpaqueRef('عربي'), null);
    assert.equal(sanitizeOpaqueRef(''), null);
});

test('cookie reader finds __oppref / __obref', () => {
    const jar = 'a=1; __oppref=opp_ABC; __obref=123e4567-e89b-42d3-a456-426614174000';
    assert.equal(readCookie(jar, '__oppref'), 'opp_ABC');
    assert.equal(readCookie(jar, '__obref'), '123e4567-e89b-42d3-a456-426614174000');
    assert.equal(readCookie(jar, 'missing'), null);
    assert.equal(readCookie('', '__oppref'), null);
});

test('ads context normalisation: defaults, consent and junk rejection', () => {
    const ok = normalizeAdsContext({ pageUrl: 'https://cairovolt.com/ar/checkout?x', oppref: 'opp1', obref: 'ob1' });
    assert.deepEqual(ok, { sourceUrl: 'https://cairovolt.com/ar/checkout', oppref: 'opp1', obref: 'ob1', consent: true });

    const denied = normalizeAdsContext({ consent: false });
    assert.equal(denied.consent, false);
    assert.equal(denied.sourceUrl, 'https://cairovolt.com/checkout');

    const junk = normalizeAdsContext({ pageUrl: 'https://evil.com/', oppref: 'bad ref', obref: 12 });
    assert.deepEqual(junk, { sourceUrl: 'https://cairovolt.com/checkout', oppref: null, obref: null, consent: true });

    assert.deepEqual(normalizeAdsContext(undefined), { sourceUrl: 'https://cairovolt.com/checkout', oppref: null, obref: null, consent: true });
});
