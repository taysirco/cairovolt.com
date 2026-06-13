#!/usr/bin/env node

/**
 * index-blog.js — Submit a new blog article to search engines for indexing.
 *
 * Usage:
 *   npm run index:blog <slug>
 *   node scripts/index-blog.js black-friday-egypt-real-deals-vs-fake-discounts
 *
 * What it does:
 *   1. IndexNow ping → Bing, Yandex, Seznam, Naver (instant, automatic)
 *   2. Google Indexing API → automatic if GOOGLE_INDEXING_KEY is set in .env.local
 *      Falls back to opening Search Console in browser if key is not available.
 *
 * Setup for Google Indexing API:
 *   1. Go to https://console.cloud.google.com/ → APIs & Services → Enable "Indexing API"
 *   2. Go to IAM & Admin → Service Accounts → use existing or create new
 *   3. Create a JSON key for the service account
 *   4. Add the service account email as Owner in Google Search Console
 *   5. Set GOOGLE_INDEXING_KEY in .env.local with the full JSON (single line)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ─── Load .env.local ─────────────────────────────────────
function loadEnv() {
    const envFiles = ['.env.local', '.env'];
    for (const file of envFiles) {
        const filePath = path.join(__dirname, '..', file);
        if (fs.existsSync(filePath)) {
            const lines = fs.readFileSync(filePath, 'utf8').split('\n');
            for (const line of lines) {
                const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
                if (match && !process.env[match[1]]) {
                    process.env[match[1]] = match[2];
                }
            }
        }
    }
}
loadEnv();

// ─── Config ──────────────────────────────────────────────
const ORIGIN = 'https://cairovolt.com';
const INDEXNOW_KEY = '09f1d32f07e4bd57775e7d023577797a';

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

// ─── 2. Google Indexing API ──────────────────────────────
async function pingGoogleIndexingAPI() {
    const keyJson = process.env.GOOGLE_INDEXING_KEY;

    if (!keyJson) {
        console.log('⚠️  Google Indexing API → GOOGLE_INDEXING_KEY not set in .env.local');
        console.log('   Falling back to browser...');
        return false;
    }

    try {
        const { google } = require('googleapis');
        const credentials = JSON.parse(keyJson);

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/indexing'],
        });

        const client = await auth.getClient();
        const indexing = google.indexing({ version: 'v3', auth: client });

        let allOk = true;
        for (const url of urls) {
            try {
                const res = await indexing.urlNotifications.publish({
                    requestBody: {
                        url,
                        type: 'URL_UPDATED',
                    },
                });
                const locale = url.includes('/en/') ? 'EN' : 'AR';
                console.log(`✅ Google Indexing API → ${locale} submitted (${res.data.urlNotificationMetadata?.latestUpdate?.type || 'OK'})`);
            } catch (err) {
                const locale = url.includes('/en/') ? 'EN' : 'AR';
                const msg = err.response?.data?.error?.message || err.message;
                console.log(`❌ Google Indexing API → ${locale} failed: ${msg}`);
                allOk = false;
            }
        }

        return allOk;
    } catch (err) {
        console.log(`❌ Google Indexing API → Error: ${err.message}`);
        return false;
    }
}

// ─── 3. Fallback: Open Google Search Console ─────────────
function openGoogleSearchConsole() {
    const GSC_PROPERTY = 'sc-domain:cairovolt.com';
    const inspectUrl = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(GSC_PROPERTY)}&id=${encodeURIComponent(urls[0])}`;
    const inspectUrlEn = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(GSC_PROPERTY)}&id=${encodeURIComponent(urls[1])}`;

    console.log('');
    console.log('🌐 Google Search Console (manual fallback):');

    try {
        execSync(`open "${inspectUrl}"`, { stdio: 'ignore' });
        console.log('   ✅ Browser opened — AR URL');
    } catch {
        console.log('   📋 AR: ' + inspectUrl);
    }

    console.log('   📋 EN: ' + inspectUrlEn);
}

// ─── Main ────────────────────────────────────────────────
async function main() {
    // Step 1: IndexNow (Bing, Yandex, Seznam, Naver)
    await pingIndexNow();
    console.log('');

    // Step 2: Google Indexing API (automatic) or Search Console (manual fallback)
    const googleOk = await pingGoogleIndexingAPI();

    if (!googleOk) {
        openGoogleSearchConsole();
    }

    console.log('');
    console.log('─'.repeat(60));
    console.log('✅ Blog indexing complete for: ' + slug);
    console.log('   IndexNow: Bing/Yandex/Seznam/Naver → automatic');
    console.log('   Google: ' + (googleOk ? 'Indexing API → automatic ✅' : 'Search Console → manual (set GOOGLE_INDEXING_KEY for auto)'));
    console.log('');
}

main().catch(err => {
    console.error('❌ Fatal error:', err.message);
    process.exit(1);
});
