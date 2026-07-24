#!/usr/bin/env node
/**
 * repair-blog-publish-schedule.mjs
 *
 * Ensures FUTURE blog articles publish:
 *   - one article per Cairo calendar day
 *   - at a random wall-clock time between 09:00 and 21:59 Africa/Cairo
 *     (offset +02:00 or +03:00 according to Egypt DST on that day)
 *
 * Does not touch already-live articles. Rewrites publishDate (and matching
 * modifiedDate) in src/data/blog/*.ts, then regenerate the index/schedule.
 *
 * Usage:
 *   node scripts/repair-blog-publish-schedule.mjs
 *   node scripts/repair-blog-publish-schedule.mjs --dry-run
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = join(ROOT, 'src/data/blog');
const DRY = process.argv.includes('--dry-run');

const pad = (n) => String(n).padStart(2, '0');

function cairoYmd(ms) {
    const fmt = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Africa/Cairo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    return fmt.format(new Date(ms));
}

function addCairoDays(ymd, days) {
    const [y, m, d] = ymd.split('-').map(Number);
    // Noon UTC avoids DST edge ambiguity when stepping calendar days.
    const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    dt.setUTCDate(dt.getUTCDate() + days);
    return dt.toISOString().slice(0, 10);
}

/** Egypt wall-clock offset for a Cairo calendar day (+02:00 or +03:00). */
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

function randomCairoTimeIso(ymd, rng) {
    const hh = 9 + Math.floor(rng() * 13); // 9–21 Cairo wall clock
    const mm = Math.floor(rng() * 60);
    const offset = cairoOffsetForYmd(ymd);
    return `${ymd}T${pad(hh)}:${pad(mm)}:00${offset}`;
}

/** Mulberry32 — stable per-run shuffle seed from slug+day for auditability. */
function mulberry32(seed) {
    let t = seed >>> 0;
    return () => {
        t += 0x6d2b79f5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}

function hashSeed(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function parsePublishMs(raw) {
    const t = new Date(raw).getTime();
    return Number.isFinite(t) ? t : NaN;
}

const files = readdirSync(BLOG_DIR).filter(
    (f) => f.endsWith('.ts') && !f.startsWith('_') && f !== 'index.ts',
);

const now = Date.now();
const future = [];

for (const file of files) {
    const path = join(BLOG_DIR, file);
    const src = readFileSync(path, 'utf8');
    const m = src.match(/publishDate:\s*(['"`])([^'"`]+)\1/);
    if (!m) continue;
    const raw = m[2];
    const ms = parsePublishMs(raw);
    if (!Number.isFinite(ms) || ms <= now) continue;
    const slug =
        src.match(/slug:\s*['"`]([^'"`]+)['"`]/)?.[1] || file.replace(/\.ts$/, '');
    future.push({ file, path, src, raw, ms, slug });
}

future.sort((a, b) => a.ms - b.ms || a.slug.localeCompare(b.slug));

if (!future.length) {
    console.log('No future articles to repair.');
    process.exit(0);
}

const startDay = cairoYmd(future[0].ms);
let changed = 0;
const plan = [];

for (let i = 0; i < future.length; i++) {
    const article = future[i];
    const day = addCairoDays(startDay, i);
    const rng = mulberry32(hashSeed(`${article.slug}|${day}|cairo-schedule-v2`));
    const nextIso = randomCairoTimeIso(day, rng);
    const needsChange = article.raw !== nextIso;
    plan.push({
        slug: article.slug,
        from: article.raw,
        to: nextIso,
        needsChange,
    });

    if (!needsChange) continue;
    changed += 1;

    if (DRY) continue;

    let next = article.src.replace(
        /publishDate:\s*(['"`])([^'"`]+)\1/,
        `publishDate: '${nextIso}'`,
    );
    // Keep modifiedDate in sync when it still mirrors the old publish stamp.
    const mod = article.src.match(/modifiedDate:\s*(['"`])([^'"`]+)\1/);
    if (mod && (mod[2] === article.raw || mod[2] === article.raw.slice(0, 10))) {
        next = next.replace(
            /modifiedDate:\s*(['"`])([^'"`]+)\1/,
            `modifiedDate: '${nextIso}'`,
        );
    }
    writeFileSync(article.path, next, 'utf8');
}

console.log(`Future articles: ${future.length}`);
console.log(`Start day (Cairo): ${startDay}`);
console.log(`End day (Cairo):   ${addCairoDays(startDay, future.length - 1)}`);
console.log(`${DRY ? '[dry-run] would update' : 'Updated'}: ${changed} files`);

const sample = plan.filter((p) => p.needsChange).slice(0, 8);
for (const row of sample) {
    console.log(`  ${row.slug}\n    ${row.from}  →  ${row.to}`);
}
if (plan.filter((p) => p.needsChange).length > sample.length) {
    console.log(`  … ${plan.filter((p) => p.needsChange).length - sample.length} more`);
}

// Verify one-per-day + hour window
const days = new Set(plan.map((p) => p.to.slice(0, 10)));
const badHour = plan.filter((p) => {
    const ms = Date.parse(p.to);
    const hh = Number(
        new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Africa/Cairo',
            hour: '2-digit',
            hour12: false,
        }).format(new Date(ms)),
    );
    return hh < 9 || hh > 21;
});
if (days.size !== plan.length) {
    console.error(`FAIL: expected ${plan.length} unique days, got ${days.size}`);
    process.exit(1);
}
if (badHour.length) {
    console.error(`FAIL: ${badHour.length} Cairo wall times outside 09:00–21:59`);
    process.exit(1);
}
console.log('✓ One article per day, Cairo wall times in 09:00–21:59');

if (!DRY) {
    console.log('\nRegenerating blog index + schedule…');
    const r = spawnSync(process.execPath, ['scripts/generate-blog-index.mjs'], {
        cwd: ROOT,
        stdio: 'inherit',
    });
    if (r.status !== 0) process.exit(r.status || 1);
}
