#!/usr/bin/env node

/**
 * index-blog.js — Submit a new blog article to search engines for indexing.
 *
 * Usage:
 *   npm run index:blog <slug>
 *   node scripts/index-blog.js black-friday-egypt-real-deals-vs-fake-discounts
 *
 * What it does:
 *   1. IndexNow ping → Bing, Yandex, Seznam, Naver (instant)
 *   2. Opens Google Search Console URL Inspection in your browser
 *      (Google Indexing API doesn't support blog pages)
 */

const { execSync } = require('child_process');

// ─── Config ──────────────────────────────────────────────
const ORIGIN = 'https://cairovolt.com';
const INDEXNOW_KEY = '09f1d32f07e4bd57775e7d023577797a';
const GSC_PROPERTY = 'sc-domain:cairovolt.com';

// ─── Parse args ──────────────────────────────────────────
const slug = process.argv[2];

if (!slug) {
    console.error('❌ Usage: npm run index:blog <slug>');
    console.error('   Example: npm run index:blog chargers-hajj-umrah-saudi-arabia-essentials');
    process.exit(1);
}

// ─── Build URLs ──────────────────────────────────────────
const urls = [
    `${ORIGIN}/blog/${slug}`,          // AR (default locale, no prefix)
    `${ORIGIN}/en/blog/${slug}`,       // EN
];

console.log('');
console.log('🔍 Blog Indexing — ' + slug);
console.log('─'.repeat(60));
console.log('');
console.log('📄 URLs to index:');
urls.forEach(u => console.log('   ' + u));
console.log('');

// ─── 1. IndexNow Ping ───────────────────────────────────
async function pingIndexNow() {
    const body = JSON.stringify({
        host: 'cairovolt.com',
        key: INDEXNOW_KEY,
        keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
    });

    try {
        const res = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body,
        });

        if (res.ok || res.status === 200 || res.status === 202) {
            console.log(`✅ IndexNow → HTTP ${res.status} — Bing, Yandex, Seznam, Naver notified`);
            return true;
        } else {
            const text = await res.text().catch(() => '');
            console.log(`⚠️  IndexNow → HTTP ${res.status} — ${text || 'Unexpected response'}`);
            return false;
        }
    } catch (err) {
        console.log(`❌ IndexNow → Network error: ${err.message}`);
        return false;
    }
}

// ─── 2. Google Search Console — open in browser ──────────
function openGoogleSearchConsole() {
    // URL Inspection deep-link for the AR version
    const inspectUrl = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(GSC_PROPERTY)}&id=${encodeURIComponent(urls[0])}`;
    
    console.log('');
    console.log('🌐 Google Search Console:');
    console.log('   Opening URL Inspection in browser...');
    console.log('   → Press "Request Indexing" for the AR page');
    console.log('   → Then do the same for the EN page');
    console.log('');

    try {
        // macOS
        execSync(`open "${inspectUrl}"`, { stdio: 'ignore' });
        console.log('   ✅ Browser opened — AR URL');
    } catch {
        // Fallback: just print the URL
        console.log('   📋 Open manually:');
        console.log('   ' + inspectUrl);
    }

    // Also print EN URL for manual inspection
    const inspectUrlEn = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(GSC_PROPERTY)}&id=${encodeURIComponent(urls[1])}`;
    console.log('');
    console.log('   📋 EN page (open manually or after AR):');
    console.log('   ' + inspectUrlEn);
}

// ─── Main ────────────────────────────────────────────────
async function main() {
    // Step 1: IndexNow (Bing, Yandex, Seznam, Naver)
    await pingIndexNow();
    console.log('');

    // Step 2: Google Search Console (manual — API doesn't support blog pages)
    openGoogleSearchConsole();

    console.log('');
    console.log('─'.repeat(60));
    console.log('✅ Blog indexing complete for: ' + slug);
    console.log('   IndexNow: Bing/Yandex/Seznam/Naver → automatic');
    console.log('   Google: Manual "Request Indexing" in Search Console');
    console.log('');
}

main().catch(err => {
    console.error('❌ Fatal error:', err.message);
    process.exit(1);
});
