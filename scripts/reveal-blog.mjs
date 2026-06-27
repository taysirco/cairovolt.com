#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// reveal-blog — run DAILY (cron). Finds article(s) whose publishDate fell in the
// last ~26h (i.e. just went live today) and:
//   1. Pings IndexNow + Google/Bing via the existing /api/indexing webhook
//      (which also revalidates the ISR cache for the article + listing + sitemap)
//   2. Logs what was revealed.
// The publishDate GATE already reveals the article on the site via hourly ISR;
// this just makes search engines pick it up the same day instead of waiting.
//
// Usage (cron, daily ~once):
//   INDEXING_WEBHOOK_SECRET=… node scripts/reveal-blog.mjs
//   node scripts/reveal-blog.mjs --dry         # show what would be pinged
//
// Cron example (cron-job.org / GitHub Action, daily 10:00 Cairo):
//   curl/run this on a box with the repo, or hit a thin API wrapper.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = path.join(ROOT, 'src/data/blog');
const ORIGIN = 'https://cairovolt.com';
const dry = process.argv.slice(2).includes('--dry');
const WINDOW_MS = 26 * 60 * 60 * 1000; // last 26h covers a daily run with slack

const now = Date.now();
const reveals = [];
for (const f of fs.readdirSync(BLOG_DIR)) {
    if (!f.endsWith('.ts') || f.startsWith('_') || f === 'index.ts') continue;
    const src = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
    const m = src.match(/publishDate:\s*['"`]([^'"`]+)['"`]/);
    if (!m) continue;
    const t = new Date(m[1]).getTime();
    if (!Number.isFinite(t)) continue;
    if (t <= now && t >= now - WINDOW_MS) reveals.push({ slug: f.slice(0, -3), publishDate: m[1] });
}

if (!reveals.length) { console.log('لا مقالات جديدة كُشفت اليوم.'); process.exit(0); }
console.log(`🔔 كُشف اليوم: ${reveals.map(r => r.slug).join(', ')}`);

// IndexNow — public key (served at /<key>.txt), NO secret needed. This is the
// whole job for the daily cron: notify Bing/Yandex/Seznam the same day. Google
// discovers via the sitemap, which ISR refreshes within ~1h of the publishDate.
const INDEXNOW_KEY = '09f1d32f07e4bd57775e7d023577797a';
const urlList = reveals.flatMap(r => [`${ORIGIN}/blog/${r.slug}`, `${ORIGIN}/en/blog/${r.slug}`]);

if (dry) { urlList.forEach(u => console.log(`  [dry] would ping IndexNow: ${u}`)); process.exit(0); }

try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: 'cairovolt.com', key: INDEXNOW_KEY, keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`, urlList }),
    });
    console.log(`  ✓ IndexNow ping: ${res.status} (${urlList.length} URL)`);
} catch (e) {
    console.warn(`  ✗ IndexNow: ${e.message}`);
}

// Optional: if the secret IS available (local run), also force ISR revalidation
// for instant on-site reveal (otherwise hourly ISR handles it).
const secret = process.env.INDEXING_WEBHOOK_SECRET;
if (secret) {
    for (const r of reveals) {
        try {
            await fetch(`${ORIGIN}/api/indexing`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${secret}` },
                body: JSON.stringify({ url: `${ORIGIN}/blog/${r.slug}`, type: 'URL_UPDATED', slug: r.slug }),
            });
            console.log(`  ✓ ISR revalidated: ${r.slug}`);
        } catch { /* non-fatal */ }
    }
}
