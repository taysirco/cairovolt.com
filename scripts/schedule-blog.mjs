#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// schedule-blog — drip-publish staggering. Assigns each UNSCHEDULED article a
// publishDate: one per day starting from --start, each at a RANDOM time of day
// (looks natural, not bot-like). Writes publishDate + modifiedDate back into
// every src/data/blog/<slug>.ts. The publishDate GATE (blog-articles.ts
// isArticleLive) then hides each article until its day arrives.
//
// Write all your articles first (any publishDate), then run ONCE:
//   node scripts/schedule-blog.mjs --start=2026-07-01            # all future-dated
//   node scripts/schedule-blog.mjs --start=2026-07-01 --shuffle  # randomize order too
//   node scripts/schedule-blog.mjs --start=2026-07-01 --slugs=a,b,c   # only these
//   node scripts/schedule-blog.mjs --dry                          # preview, write nothing
//
// Flags:
//   --start=YYYY-MM-DD  first publish day (default: tomorrow)
//   --per-day=N         articles per day (default 1)
//   --window=9-21       random hour window, 24h (default 9-21)
//   --slugs=a,b,c       only schedule these slugs (else: every article whose
//                       publishDate is today-or-future = "unpublished")
//   --shuffle           randomize which article lands on which day
//   --dry               preview only
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = path.join(ROOT, 'src/data/blog');

const arg = (n, d) => { const h = process.argv.slice(2).find(a => a.startsWith(`--${n}=`)); return h ? h.split('=').slice(1).join('=') : d; };
const has = (n) => process.argv.slice(2).includes(`--${n}`);

const startStr = arg('start', null);
const perDay = parseInt(arg('per-day', '1'), 10);
const [winLo, winHi] = arg('window', '9-21').split('-').map(Number);
const onlySlugs = arg('slugs', null)?.split(',').map(s => s.trim()).filter(Boolean) || null;
const shuffle = has('shuffle');
const dry = has('dry');

const startDate = startStr ? new Date(`${startStr}T00:00:00`) : (() => { const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(0, 0, 0, 0); return d; })();
if (isNaN(startDate.getTime())) { console.error('✗ --start غير صالح (استخدم YYYY-MM-DD)'); process.exit(1); }

// Seeded RNG so re-runs with same inputs are stable (no Date.now/Math.random drift on resume)
let seed = startDate.getTime() % 2147483647;
const rng = () => (seed = (seed * 48271) % 2147483647) / 2147483647;

const todayMid = new Date(); todayMid.setHours(0, 0, 0, 0);

// Collect candidate files: publishDate today-or-future (= unpublished), or --slugs
const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_') && f !== 'index.ts');
const candidates = [];
for (const f of files) {
    const slug = f.slice(0, -3);
    if (onlySlugs && !onlySlugs.includes(slug)) continue;
    const src = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
    const m = src.match(/publishDate:\s*['"`](\d{4}-\d{2}-\d{2}[^'"`]*)['"`]/);
    const pub = m ? new Date(m[1]) : null;
    if (!onlySlugs && pub && pub < todayMid) continue; // already live/past → leave it
    candidates.push({ slug, file: f });
}
if (!candidates.length) { console.error('✗ لا مقالات للجدولة (كلها منشورة أو لا تطابق --slugs).'); process.exit(1); }

if (shuffle) for (let i = candidates.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [candidates[i], candidates[j]] = [candidates[j], candidates[i]]; }

const pad = (n) => String(n).padStart(2, '0');
const schedule = candidates.map((c, i) => {
    const dayOffset = Math.floor(i / perDay);
    const d = new Date(startDate); d.setDate(d.getDate() + dayOffset);
    const hh = winLo + Math.floor(rng() * (winHi - winLo + 1));
    const mm = Math.floor(rng() * 60);
    const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(hh)}:${pad(mm)}:00+02:00`; // Cairo offset
    return { ...c, publishDate: iso };
});

console.log(`📅 جدولة ${schedule.length} مقالاً — ${perDay}/يوم من ${startStr || startDate.toISOString().slice(0, 10)}، وقت عشوائي ${winLo}:00–${winHi}:59 (توقيت القاهرة)${dry ? ' [معاينة]' : ''}\n`);
let written = 0;
for (const s of schedule) {
    const p = path.join(BLOG_DIR, s.file);
    let src = fs.readFileSync(p, 'utf8');
    const before = src;
    src = src.replace(/publishDate:\s*['"`][^'"`]*['"`]/, `publishDate: '${s.publishDate}'`);
    src = src.replace(/modifiedDate:\s*['"`][^'"`]*['"`]/, `modifiedDate: '${s.publishDate}'`);
    console.log(`  ${s.publishDate}  →  ${s.slug}`);
    if (!dry && src !== before) { fs.writeFileSync(p, src); written++; }
}
console.log(`\n${dry ? 'معاينة فقط — لم يُكتب شيء.' : `✓ حُدّث ${written} ملفاً.`}`);
console.log(`بعدها: راجع، ثم commit + push مرة واحدة. البوابة تُخفي المستقبلي، والكشف اليومي (reveal-blog) ينشر واحداً/يوم.`);
