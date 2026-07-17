#!/usr/bin/env node

/**
 * Notify supported discovery services after a published article changes.
 *
 * Google discovers standard article pages through the XML sitemap and normal
 * crawling. The Google Indexing API is intentionally not used here because
 * ordinary ecommerce articles are outside that API's supported page types.
 *
 * Usage:
 *   npm run index:blog <slug>
 */

const ORIGIN = 'https://cairovolt.com';
const INDEXNOW_KEY = '09f1d32f07e4bd57775e7d023577797a';
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const slug = process.argv[2];
if (!slug || !SLUG_PATTERN.test(slug)) {
    console.error('Usage: npm run index:blog <lowercase-article-slug>');
    process.exit(1);
}

const urls = [
    `${ORIGIN}/blog/${slug}`,
    `${ORIGIN}/en/blog/${slug}`,
];

async function confirmPublishedPages() {
    let allAvailable = true;
    for (const url of urls) {
        try {
            const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
            const available = response.ok && response.url === url;
            console.log(`${available ? '✓' : '✗'} ${url} — HTTP ${response.status}`);
            allAvailable = allAvailable && available;
        } catch {
            console.log(`✗ ${url} — unavailable`);
            allAvailable = false;
        }
    }
    return allAvailable;
}

async function notifyIndexNow() {
    try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                host: 'cairovolt.com',
                key: INDEXNOW_KEY,
                keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`,
                urlList: urls,
            }),
        });
        console.log(`IndexNow: HTTP ${response.status}`);
        return response.ok;
    } catch {
        console.log('IndexNow: network request failed');
        return false;
    }
}

async function main() {
    console.log(`Published-article discovery check: ${slug}`);
    const pagesAvailable = await confirmPublishedPages();
    if (!pagesAvailable) {
        console.error('One or more landing pages are not available at their final URL; notification stopped.');
        process.exitCode = 1;
        return;
    }

    await notifyIndexNow();
    console.log(`Google discovery: ${ORIGIN}/sitemap.xml`);
    console.log('For a manual check, use URL Inspection in the verified Search Console property.');
}

main().catch(() => {
    console.error('Article discovery check failed.');
    process.exitCode = 1;
});
