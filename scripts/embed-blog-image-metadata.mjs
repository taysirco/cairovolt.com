#!/usr/bin/env node
// Idempotent CairoVolt blog-cover metadata pipeline.
//
// Companion to embed-product-image-metadata.mjs, but blog covers need a
// different provenance answer: unlike the product shots (all Canva composites
// of licensed brand assets), the covers come from at least four distinct
// pipelines — Gemini 2.5 Flash Image, Gemini 3.1 Pro, Imagen 4, and an in-house
// sharp+SVG generator. Labelling them all the same way would be a fabrication.
//
// PROVENANCE IS RECOVERED, NOT GUESSED. Earlier revisions of these files carried
// either an XMP DigitalSourceType or a C2PA actions assertion naming the
// generating model. A gitignore purge plus a pass-through optimiser stripped
// them from the working tree, but git still has them. scripts recovered the
// class for 198 of 327 covers from that history plus two commits that document
// their own generator in the message. The remaining 129 get the attribution
// layer and NO DigitalSourceType: absence is not a claim, a wrong label is.
//
// The provenance map lives in blog-image-provenance.json next to this script.
//
// Usage:
//   node scripts/embed-blog-image-metadata.mjs            # all covers
//   node scripts/embed-blog-image-metadata.mjs --dry      # plan only
//   node scripts/embed-blog-image-metadata.mjs --slug=x   # one cover

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = join(ROOT, 'public/images/blog/posts');
const OG_DIR = join(ROOT, 'public/images/blog/og');
const BLOG_INDEX = join(ROOT, 'src/data/blog-index.generated.ts');
const PROVENANCE = join(ROOT, 'scripts/blog-image-provenance.json');
const ICC_PROFILE = '/System/Library/ColorSync/Profiles/sRGB Profile.icc';

const args = new Map(process.argv.slice(2).map(a => {
    const [k, v = 'true'] = a.replace(/^-+/, '').split('=');
    return [k, v];
}));
const DRY_RUN = args.get('dry') === 'true';
const ONLY_SLUG = args.get('slug') || null;

// Mirrors src/lib/image-licensing.ts. Blog covers are editorial rather than
// catalogue imagery, so they carry the same rights block as the product images
// — CairoVolt commissioned and published them — but their DigitalSourceType is
// per-image rather than a single constant.
const COPYRIGHT = '© 2026 CairoVolt.com';
const RIGHTS_STATEMENT = '© 2026 CairoVolt.com. All rights reserved.';
const WEB_STATEMENT = 'https://cairovolt.com/terms#image-license';
const LICENSOR_NAME = 'CairoVolt';
const LICENSOR_URL = 'https://cairovolt.com';
const CONTACT_URL = 'https://cairovolt.com';
const SOFTWARE = 'CairoVolt Media Pipeline';

function trimLen(s, max) {
    if (!s) return '';
    s = String(s).replace(/\s+/g, ' ').trim();
    return s.length <= max ? s : s.slice(0, max - 1) + '…';
}

// ---------- blog index (bilingual titles / excerpts / keywords per slug) ----------
function loadBlogIndex() {
    const src = readFileSync(BLOG_INDEX, 'utf8');
    const map = new Map();
    // The generated index is single-quoted TS object literals. Split on the
    // slug key so each chunk holds exactly one article's ar/en sub-objects.
    const chunks = src.split(/\n\s*slug:\s*'/).slice(1);
    for (const chunk of chunks) {
        const slug = chunk.slice(0, chunk.indexOf("'"));
        if (!slug) continue;
        // Scope to the locale block first, then pull the field from inside it,
        // so `ar.title` cannot accidentally match `en.title`.
        const localeBlock = (locale) => {
            const m = chunk.match(new RegExp(`\\n\\s*${locale}\\s*:\\s*\\{([\\s\\S]*?)\\n\\s*\\},`));
            return m ? m[1] : '';
        };
        const grab = (block, field) => {
            const m = block.match(new RegExp(`${field}\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'`));
            return m ? m[1].replace(/\\'/g, "'").replace(/\\\\/g, '\\') : null;
        };
        const ar = localeBlock('ar');
        const en = localeBlock('en');
        map.set(slug, {
            titleAr: grab(ar, 'title'),
            titleEn: grab(en, 'title'),
            excerptAr: grab(ar, 'excerpt'),
            excerptEn: grab(en, 'excerpt'),
            keywordsEn: grab(en, 'keywords'),
            keywordsAr: grab(ar, 'keywords'),
        });
    }
    return map;
}

// ---------- provenance ----------
function loadProvenance() {
    if (!existsSync(PROVENANCE)) {
        console.error(`FATAL: provenance map missing at ${PROVENANCE}`);
        console.error('It is produced by recovering DigitalSourceType from git history.');
        process.exit(1);
    }
    return JSON.parse(readFileSync(PROVENANCE, 'utf8'));
}

function buildKeywords(meta, slug) {
    const words = new Set();
    for (const src of [meta?.keywordsEn, meta?.keywordsAr]) {
        if (!src) continue;
        for (const w of src.split(/[,،]/).map(s => s.trim()).filter(Boolean)) words.add(w);
    }
    slug.split('-').forEach(w => { if (w.length > 2 && !/^\d+$/.test(w)) words.add(w); });
    words.add('CairoVolt');
    words.add('cairovolt.com');
    return [...words].slice(0, 24);
}

function baseArgs(digitalSourceType) {
    const a = [
        '-overwrite_original',
        '-charset', 'FileName=UTF8',
        '-codedcharacterset=UTF8',
        // Strip first: clears the stale generator fingerprints, the fabricated
        // xmp:CreateDate that used to be identical across hundreds of files, and
        // any half-surviving prior generation.
        '-all=',
        `-IFD0:Software=${SOFTWARE}`,
        `-IFD0:Artist=CairoVolt`,
        `-IFD0:Copyright=${COPYRIGHT}`,
        `-XMP-dc:Creator=CairoVolt`,
        `-XMP-dc:Publisher=CairoVolt`,
        `-XMP-dc:Rights=${COPYRIGHT}`,
        `-XMP-photoshop:Credit=CairoVolt`,
        `-XMP-photoshop:Source=cairovolt.com`,
        `-XMP-photoshop:CaptionWriter=CairoVolt`,
        `-XMP-xmpRights:Marked=True`,
        `-XMP-xmpRights:UsageTerms=${RIGHTS_STATEMENT}`,
        `-XMP-xmpRights:WebStatement=${WEB_STATEMENT}`,
        `-XMP-iptcCore:CreatorContactInfoCiUrlWork=${CONTACT_URL}`,
        `-XMP-plus:LicensorName=${LICENSOR_NAME}`,
        `-XMP-plus:LicensorURL=${LICENSOR_URL}`,
        `-icc_profile<=${ICC_PROFILE}`,
    ];
    // Only asserted when the class was recovered from git history or a commit
    // that names its own generator. Undetermined covers carry no claim.
    if (digitalSourceType) {
        a.push(`-XMP-iptcExt:DigitalSourceType=http://cv.iptc.org/newscodes/digitalsourcetype/${digitalSourceType}`);
    }
    return a;
}

function perImageArgs({ description, titleEn, titleAr, keywords }) {
    const out = [];
    if (description) {
        out.push(`-IFD0:ImageDescription=${trimLen(description, 500)}`);
        out.push(`-XMP-dc:Description=${trimLen(description, 500)}`);
        out.push(`-IPTC:Caption-Abstract=${trimLen(description, 400)}`);
    }
    if (titleEn) {
        out.push(`-XMP-dc:Title-en=${trimLen(titleEn, 200)}`);
        out.push(`-IPTC:ObjectName=${trimLen(titleEn, 64)}`);
        out.push(`-XMP-photoshop:Headline=${trimLen(titleEn, 200)}`);
    }
    if (titleAr && titleAr !== titleEn) {
        out.push(`-XMP-dc:Title-ar=${trimLen(titleAr, 200)}`);
    }
    for (const k of keywords || []) {
        out.push(`-XMP-dc:Subject+=${k}`);
        out.push(`-IPTC:Keywords+=${trimLen(k, 64)}`);
    }
    return out;
}

// ---------- main ----------
console.log('CairoVolt blog-cover metadata pipeline');
if (DRY_RUN) console.log('  mode: DRY RUN');
if (ONLY_SLUG) console.log(`  filter: ${ONLY_SLUG}`);

if (!existsSync(ICC_PROFILE)) {
    console.error(`FATAL: sRGB profile not found at ${ICC_PROFILE}`);
    process.exit(1);
}

const blogIndex = loadBlogIndex();
const provenance = loadProvenance();
console.log(`  blog index entries: ${blogIndex.size}`);
console.log(`  provenance entries: ${Object.keys(provenance).length}`);

const targets = [];
for (const dir of [POSTS_DIR, OG_DIR]) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
        if (!/\.(webp|jpe?g|png)$/i.test(f)) continue;
        const slug = f.replace(/\.(webp|jpe?g|png)$/i, '').replace(/-og$/, '');
        if (ONLY_SLUG && slug !== ONLY_SLUG) continue;
        targets.push({ path: join(dir, f), slug, isOg: dir === OG_DIR });
    }
}
console.log(`  files to process: ${targets.length}\n`);

let ok = 0, err = 0, withDst = 0, withoutDst = 0, noMeta = 0;
const errors = [];
const t0 = Date.now();
let n = 0;

for (const t of targets) {
    n++;
    const meta = blogIndex.get(t.slug);
    if (!meta) noMeta++;

    const relKey = `public/images/blog/posts/${t.slug}.webp`;
    const dst = provenance[relKey] || null;
    if (dst) withDst++; else withoutDst++;

    const titleEn = meta?.titleEn || t.slug.replace(/-/g, ' ');
    const titleAr = meta?.titleAr || null;
    const description = meta?.excerptEn || meta?.excerptAr || `${titleEn} — CairoVolt`;
    const keywords = buildKeywords(meta, t.slug);

    if (DRY_RUN) {
        if (n <= 6) {
            console.log(`  ${basename(t.path)}`);
            console.log(`      dst:     ${dst || '(none — undetermined)'}`);
            console.log(`      titleEn: ${trimLen(titleEn, 80)}`);
            if (titleAr) console.log(`      titleAr: ${trimLen(titleAr, 80)}`);
            console.log(`      desc:    ${trimLen(description, 90)}`);
        }
        continue;
    }

    try {
        execFileSync('exiftool',
            [...baseArgs(dst), ...perImageArgs({ description, titleEn, titleAr, keywords }), t.path],
            { stdio: ['ignore', 'ignore', 'pipe'] });
        ok++;
    } catch (e) {
        err++;
        errors.push({ path: t.path, msg: (e.stderr || e.message || '').toString().slice(0, 160) });
    }

    if (n % 100 === 0) {
        const el = (Date.now() - t0) / 1000;
        console.log(`  … ${n}/${targets.length}  (ok=${ok} err=${err})  eta ${(((targets.length - n) * el) / n).toFixed(0)}s`);
    }
}

if (DRY_RUN) {
    console.log(`\nDRY RUN — ${targets.length} files planned`);
    console.log(`  with DigitalSourceType:    ${withDst}`);
    console.log(`  without (undetermined):    ${withoutDst}`);
    console.log(`  no blog-index match:       ${noMeta}`);
    process.exit(0);
}

console.log(`\nDone in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
console.log(`  processed:              ${n}`);
console.log(`  ok:                     ${ok}`);
console.log(`  errors:                 ${err}`);
console.log(`  with DigitalSourceType: ${withDst}`);
console.log(`  undetermined (no claim):${withoutDst}`);
console.log(`  no blog-index match:    ${noMeta}`);
for (const e of errors.slice(0, 5)) console.log(`  ! ${basename(e.path)}: ${e.msg}`);
process.exit(err > 0 ? 1 : 0);
