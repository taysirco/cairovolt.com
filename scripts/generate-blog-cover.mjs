#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// General-purpose blog COVER generator — use when a new article has NO suitable
// cover in /public/images/blog/posts/. Generates a branded 1200×630 .webp and
// adds descriptive EXIF/XMP fields for authorship, rights, and accessibility.
//
// EVERGREEN: never bakes a year/date into the cover or its metadata.
//
// Usage (run from repo root):
//   node scripts/generate-blog-cover.mjs --slug=<slug> \
//        --title="EN title" --titleAr="عنوان عربي" \
//        --kicker="SHORT KICKER" --keywords="k1,k2,k3" --category=how-to
//
//   # Minimal — auto-reads title/titleAr/keywords/category from
//   # src/data/blog/<slug>.ts when the flags are omitted:
//   node scripts/generate-blog-cover.mjs --slug=<slug>
//
// Flags: --force (overwrite existing cover) · --dry (build SVG/webp, skip meta)
// ─────────────────────────────────────────────────────────────────────────────
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'public/images/blog/posts');
const BLOG_DIR = path.join(ROOT, 'src/data/blog');

const catColors = {
    'buying-guide': { from: '#3b82f6', to: '#8b5cf6', accent: '#60a5fa' },
    'comparison':   { from: '#f59e0b', to: '#ef4444', accent: '#fbbf24' },
    'how-to':       { from: '#10b981', to: '#0ea5e9', accent: '#34d399' },
    'review':       { from: '#6366f1', to: '#ec4899', accent: '#818cf8' },
    'tips':         { from: '#14b8a6', to: '#6366f1', accent: '#2dd4bf' },
};

// ── args ──
const argv = process.argv.slice(2);
const flag = (name) => {
    const hit = argv.find(a => a === `--${name}` || a.startsWith(`--${name}=`));
    if (!hit) return undefined;
    return hit.includes('=') ? hit.split('=').slice(1).join('=') : true;
};
const slug = flag('slug');
if (!slug || slug === true) {
    console.error('✗ مطلوب: --slug=<slug>');
    process.exit(1);
}
const force = !!flag('force');
const dry = !!flag('dry');

// ── auto-read article meta from src/data/blog/<slug>.ts (best-effort regex) ──
function autoRead(slug) {
    const f = path.join(BLOG_DIR, `${slug}.ts`);
    if (!fs.existsSync(f)) return {};
    const src = fs.readFileSync(f, 'utf8');
    const pick = (re) => { const m = src.match(re); return m ? m[1].trim() : undefined; };
    // Pull the EN/AR metaTitle and a keywords string if present
    const titleEn = pick(/en\s*:\s*{[^}]*?metaTitle\s*:\s*['"`](.+?)['"`]/s)
                 || pick(/metaTitle\s*:\s*['"`](.+?)['"`]/);
    const titleAr = pick(/ar\s*:\s*{[^}]*?metaTitle\s*:\s*['"`](.+?)['"`]/s);
    const keywords = pick(/keywords\s*:\s*['"`](.+?)['"`]/);
    const category = pick(/category\s*:\s*['"`](.+?)['"`]/);
    return { titleEn, titleAr, keywords, category };
}
const auto = autoRead(slug);

const title    = (flag('title')    && flag('title')    !== true) ? flag('title')    : (auto.titleEn || slug.replace(/-/g, ' '));
const titleAr  = (flag('titleAr')  && flag('titleAr')  !== true) ? flag('titleAr')  : (auto.titleAr || '');
const keywords = (flag('keywords') && flag('keywords') !== true) ? flag('keywords') : (auto.keywords || `${slug.replace(/-/g, ',')},cairovolt,egypt`);
const category = (flag('category') && flag('category') !== true) ? flag('category') : (auto.category || 'tips');
// Kicker: evergreen by default (NO year). Falls back to a category label.
const kicker = (flag('kicker') && flag('kicker') !== true)
    ? flag('kicker')
    : ({ 'buying-guide': 'CAIROVOLT BUYING GUIDE', 'comparison': 'CAIROVOLT COMPARISON',
         'how-to': 'CAIROVOLT HOW-TO', 'review': 'CAIROVOLT REVIEW', 'tips': 'CAIROVOLT TIPS' }[category] || 'CAIROVOLT');

// ── SVG (identical branded template; evergreen) ──
function escapeXml(s) {
    return String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);
}
function wrapTitle(text, maxCharsPerLine, maxLines) {
    const words = String(text).split(/\s+/);
    const lines = []; let current = '';
    for (const w of words) {
        const cand = current ? `${current} ${w}` : w;
        if (cand.length > maxCharsPerLine && current) { lines.push(current); current = w; }
        else current = cand;
        if (lines.length === maxLines) break;
    }
    if (current && lines.length < maxLines) lines.push(current);
    return lines.slice(0, maxLines);
}
function makeSVG() {
    const c = catColors[category] || catColors['tips'];
    const titleLines = wrapTitle(title, 26, 3);
    const fs_ = titleLines.length === 1 ? 72 : titleLines.length === 2 ? 64 : 54;
    const startY = 320 - ((titleLines.length - 1) * (fs_ * 0.55));
    const tspans = titleLines.map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : fs_ * 1.15}">${escapeXml(l)}</tspan>`).join('');
    return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${c.from}"/><stop offset="100%" style="stop-color:${c.to}"/></linearGradient>
    <radialGradient id="glow1" cx="80%" cy="20%" r="60%"><stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.18"/><stop offset="100%" style="stop-color:#ffffff;stop-opacity:0"/></radialGradient>
    <radialGradient id="glow2" cx="15%" cy="85%" r="55%"><stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.12"/><stop offset="100%" style="stop-color:#ffffff;stop-opacity:0"/></radialGradient>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-width="0.6" opacity="0.06"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="1000" cy="120" r="320" fill="url(#glow1)"/>
  <circle cx="180" cy="540" r="280" fill="url(#glow2)"/>
  <g>
    <text x="80" y="90" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="800" fill="#ffffff" letter-spacing="1.5">CAIROVOLT</text>
    <rect x="80" y="100" width="120" height="3" rx="1.5" fill="${c.accent}"/>
    <text x="216" y="93" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="600" fill="#ffffff" opacity="0.7" letter-spacing="2.5">EDITORIAL · EGYPT</text>
  </g>
  <text x="80" y="${startY - 60}" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="700" fill="${c.accent}" opacity="0.95" letter-spacing="3">${escapeXml(kicker)}</text>
  <text x="80" y="${startY}" font-family="Inter, Arial, sans-serif" font-size="${fs_}" font-weight="800" fill="#ffffff" style="text-shadow: 0 2px 8px rgba(0,0,0,0.25);">${tspans}</text>
  <text x="80" y="${startY + (titleLines.length * fs_ * 1.15) + 40}" font-family="Tahoma, Arial, sans-serif" font-size="28" font-weight="600" fill="#ffffff" opacity="0.85" direction="rtl">${escapeXml(titleAr)}</text>
  <rect x="0" y="565" width="1200" height="65" fill="#000000" opacity="0.28"/>
  <text x="80" y="606" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="600" fill="#ffffff" opacity="0.9" letter-spacing="2">cairovolt.com</text>
  <g transform="translate(1010,580)"><rect x="0" y="0" width="120" height="32" rx="16" fill="#ffffff" opacity="0.12"/><text x="60" y="21" font-family="Inter, Arial, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="2">EDITORIAL</text></g>
</svg>`;
}

async function main() {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const out = path.join(OUTPUT_DIR, `${slug}.webp`);
    if (fs.existsSync(out) && !force) {
        console.error(`✗ الغلاف موجود بالفعل: ${slug}.webp (استخدم --force للاستبدال)`);
        process.exit(1);
    }

    await sharp(Buffer.from(makeSVG())).resize(1200, 630).webp({ quality: 88 }).toFile(out);
    console.log(`+ ${slug}.webp (1200×630)`);
    if (dry) return;

    // Descriptive metadata only. Do not add camera or GPS capture data to a
    // generated editorial graphic.
    try {
        execFileSync('exiftool', [
            '-overwrite_original',
            // Authorship & rights (NO year — evergreen)
            '-Artist=CairoVolt Editorial Team',
            '-Copyright=© CairoVolt. All rights reserved.',
            '-XMP-dc:Creator=CairoVolt Editorial Team',
            '-XMP-dc:Rights=© CairoVolt',
            '-XMP-photoshop:Credit=CairoVolt',
            '-XMP-photoshop:Source=cairovolt.com',
            // SEO / discovery
            `-ImageDescription=${title}`,
            `-XMP-dc:Title=${title}`,
            `-XMP-dc:Description=${titleAr || title}`,
            `-XMP-dc:Subject=${keywords}`,
            `-IPTC:Keywords=${keywords}`,
            `-XMP-photoshop:Headline=${title}`,
            out,
        ], { stdio: 'pipe' });
        console.log('  ✓ descriptive EXIF + XMP');
    } catch (e) {
        console.warn(`  EXIF failed: ${e.message?.split('\n')[0] || e}`);
    }

    console.log(`\nDone → public/images/blog/posts/${slug}.webp`);
}

main().catch((e) => { console.error(e); process.exit(1); });
