#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// next-publish-date — returns the next available publish slot for a new article.
// Scans all blog articles, finds the latest occupied Cairo calendar day, then
// returns the following day at a random wall-clock time (09:00–21:59 Africa/Cairo).
// Always emits a full ISO timestamp with the correct Egypt offset (+02:00 or
// +03:00). Never emit a date-only string — that parses as 00:00 UTC and looks
// like a fixed 03:00 Cairo publish time.
//
// Usage:
//   node scripts/next-publish-date.mjs              # human summary
//   node scripts/next-publish-date.mjs --json       # { publishDate, dateOnly, … }
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = path.join(ROOT, 'src/data/blog');
const pad = (n) => String(n).padStart(2, '0');

function cairoYmd(ms) {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Africa/Cairo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(ms));
}

function addCairoDays(ymd, days) {
    const [y, m, d] = ymd.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    dt.setUTCDate(dt.getUTCDate() + days);
    return dt.toISOString().slice(0, 10);
}

function cairoOffsetForYmd(ymd) {
    const probe = new Date(`${ymd}T12:00:00.000Z`);
    const name = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Cairo',
        timeZoneName: 'longOffset',
        hour: 'numeric',
    })
        .formatToParts(probe)
        .find((p) => p.type === 'timeZoneName')?.value || 'GMT+02:00';
    const m = name.match(/GMT([+-]\d{2}):?(\d{2})/);
    if (!m) return '+02:00';
    return `${m[1]}:${m[2]}`;
}

function randomCairoTimeIso(ymd) {
    const hh = 9 + Math.floor(Math.random() * 13); // 9–21 Cairo wall clock
    const mm = Math.floor(Math.random() * 60);
    return `${ymd}T${pad(hh)}:${pad(mm)}:00${cairoOffsetForYmd(ymd)}`;
}

const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.ts') && !f.startsWith('_') && f !== 'index.ts');

const occupiedDays = new Set();
let latestDay = cairoYmd(Date.now());
let dateOnlyCount = 0;

for (const f of files) {
    const src = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
    const m = src.match(/publishDate:\s*['"`](\d{4}-\d{2}-\d{2}[^'"`]*)['"`]/);
    if (!m) continue;
    const raw = m[1];
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        const ms = new Date(raw).getTime();
        if (Number.isFinite(ms) && ms > Date.now()) dateOnlyCount += 1;
    }
    const ms = new Date(raw).getTime();
    if (!Number.isFinite(ms)) continue;
    const day = cairoYmd(ms);
    occupiedDays.add(day);
    if (day > latestDay) latestDay = day;
}

let nextDay = addCairoDays(latestDay, 1);
while (occupiedDays.has(nextDay)) {
    nextDay = addCairoDays(nextDay, 1);
}

const iso = randomCairoTimeIso(nextDay);

if (process.argv.includes('--json')) {
    console.log(
        JSON.stringify({
            publishDate: iso,
            dateOnly: nextDay,
            latestOccupiedDay: latestDay,
            dateOnlyArticles: dateOnlyCount,
            policy: 'one-per-cairo-day + random 09:00–21:59 Africa/Cairo',
        }),
    );
} else {
    console.log(`📅 آخر يوم نشر مشغول (القاهرة): ${latestDay}`);
    console.log(`📅 التاريخ التالي المتاح: ${iso}`);
    console.log(`🎲 وقت عشوائي بين 09:00 و 21:59 بتوقيت القاهرة (مع DST)`);
    if (dateOnlyCount > 0) {
        console.log(
            `⚠️  ${dateOnlyCount} مقالاً ما زال publishDate بتاريخ فقط — شغّل: node scripts/repair-blog-publish-schedule.mjs`,
        );
    }
    console.log(`\n💡 استخدم في المقال الجديد:`);
    console.log(`   publishDate: '${iso}'`);
    console.log(`   modifiedDate: '${iso}'`);
}
