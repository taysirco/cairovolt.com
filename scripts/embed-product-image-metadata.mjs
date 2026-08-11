#!/usr/bin/env node
// Idempotent CairoVolt product-image metadata pipeline.
//
// One tool controls the metadata layer on every product WebP so the state is
// reproducible and audit-friendly. For each file it:
//   1. Removes any embedded C2PA manifest (the previously-shipped ones are
//      signed by a self-issued cert that a validator marks
//      signingCredential.untrusted, which is worse than no manifest.)
//   2. Nukes ALL existing metadata (EXIF/IPTC/XMP) — this clears Canva
//      renderer fingerprints, fabricated Cairo/Egypt capture locations, and
//      the three mutually-inconsistent metadata generations that coexist in
//      the tree today.
//   3. Writes ONE canonical, honest metadata block that names CairoVolt as
//      the composition creator/publisher/credit source, tags provenance as
//      IPTC DigitalSourceType=composite (accurate for our Canva
//      compositions of licensed product assets), embeds per-image bilingual
//      description sourced from the product data file, and embeds an sRGB
//      ICC profile.
//
// Never claims to be a camera capture. Never geotags. Never re-adds C2PA.
//
// Usage:
//   node scripts/embed-product-image-metadata.mjs                 # all products
//   node scripts/embed-product-image-metadata.mjs --slug=<slug>   # one product
//   node scripts/embed-product-image-metadata.mjs --dry           # inspect plan only

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, basename, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PRODUCTS_DIR = join(ROOT, 'public/products');
const PRODUCT_DATA_DIR = join(ROOT, 'src/data/products');
const ICC_PROFILE = '/System/Library/ColorSync/Profiles/sRGB Profile.icc';

const args = new Map(process.argv.slice(2).map(a => {
    const [k, v = 'true'] = a.replace(/^-+/, '').split('=');
    return [k, v];
}));
const ONLY_SLUG = args.get('slug') || null;
const DRY_RUN = args.get('dry') === 'true';

// Constants mirror src/lib/image-licensing.ts (the JSON-LD side reads from
// there). Google prefers structured data when the two disagree, so the strings
// MUST stay byte-identical between the file and the schema.
const COPYRIGHT = '© 2026 CairoVolt.com';
const RIGHTS_STATEMENT = '© 2026 CairoVolt.com. All rights reserved.';
const WEB_STATEMENT = 'https://cairovolt.com/terms#image-license';
const LICENSOR_NAME = 'CairoVolt';
const LICENSOR_URL = 'https://cairovolt.com';
const CONTACT_URL = 'https://cairovolt.com';
const DIGITAL_SOURCE_TYPE = 'http://cv.iptc.org/newscodes/digitalsourcetype/composite';
const SOFTWARE = 'CairoVolt Media Pipeline';

// -------------- product data loader --------------
// The source of truth is src/data/products/<slug>.ts. Regex-extract per-image
// alt text and product name from the TS file text. Avoids running a TS
// compiler for a one-shot data read.

function parseProductFile(filePath) {
    const src = readFileSync(filePath, 'utf8');

    const enNameMatch = src.match(/en\s*:\s*\{[^}]*?name\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/s);
    const arNameMatch = src.match(/ar\s*:\s*\{[^}]*?name\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/s);
    const brandMatch  = src.match(/brand\s*:\s*"([^"]+)"/);
    const mpnMatch    = src.match(/mpn\s*:\s*"([^"]*)"/);
    const skuMatch    = src.match(/sku\s*:\s*"([^"]*)"/);
    const catMatch    = src.match(/categorySlug\s*:\s*"([^"]+)"/);
    const shortEnMatch = src.match(/en\s*:\s*\{[^}]*?shortDescription\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/s);

    const images = new Map();
    // capture: url, alt
    const imgRe = /\{\s*id\s*:\s*"[^"]+"\s*,\s*url\s*:\s*"([^"]+)"\s*,\s*alt\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/g;
    let m;
    while ((m = imgRe.exec(src)) !== null) {
        images.set(m[1], m[2]);
    }

    return {
        nameEn: enNameMatch?.[1] || null,
        nameAr: arNameMatch?.[1] || null,
        shortEn: shortEnMatch?.[1] || null,
        brand: brandMatch?.[1] || null,
        mpn: mpnMatch?.[1] || '',
        sku: skuMatch?.[1] || '',
        categorySlug: catMatch?.[1] || null,
        images,
    };
}

function loadProductMap() {
    const map = new Map();
    for (const f of readdirSync(PRODUCT_DATA_DIR)) {
        if (!f.endsWith('.ts') || f.startsWith('_')) continue;
        const slug = f.replace(/\.ts$/, '');
        try {
            map.set(slug, parseProductFile(join(PRODUCT_DATA_DIR, f)));
        } catch (e) {
            console.warn(`  ! failed to parse ${f}: ${e.message}`);
        }
    }
    return map;
}

// -------------- helpers --------------

function trimLen(s, max) {
    if (!s) return '';
    s = String(s).replace(/\s+/g, ' ').trim();
    return s.length <= max ? s : s.slice(0, max - 1) + '…';
}

function buildKeywords(product, slug) {
    const words = new Set();
    if (product?.brand) words.add(product.brand);
    if (product?.mpn) words.add(product.mpn);
    if (product?.sku) words.add(product.sku);
    if (product?.categorySlug) words.add(product.categorySlug.replace(/-/g, ' '));
    // extract meaningful tokens from slug
    slug.split('-').forEach(w => { if (w.length > 2 && !/^\d+$/.test(w)) words.add(w); });
    words.add('CairoVolt');
    words.add('cairovolt.com');
    words.add('Egypt');
    return [...words].slice(0, 20);
}

function baseArgs() {
    return [
        '-overwrite_original',
        '-charset', 'FileName=UTF8',
        '-codedcharacterset=UTF8',
        // strip everything first — clears Canva, C2PA-adjacent XMP, city fabrications, all prior generations
        '-all=',
        // now write our canonical layer
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
        `-XMP-iptcExt:DigitalSourceType=${DIGITAL_SOURCE_TYPE}`,
        `-XMP-iptcCore:CreatorContactInfoCiUrlWork=${CONTACT_URL}`,
        // XMP-plus:Licensor is the PLUS Coalition licensor block Google reads
        // for the Licensable image feature (in addition to schema.org
        // creator/license). Written as an ordered array of {LicensorName,
        // LicensorURL} — exiftool's shorthand keeps the schema.
        `-XMP-plus:LicensorName=${LICENSOR_NAME}`,
        `-XMP-plus:LicensorURL=${LICENSOR_URL}`,
        `-icc_profile<=${ICC_PROFILE}`,
    ];
}

function perImageArgs({ description, headline, titleEn, titleAr, keywords }) {
    const out = [];
    if (description) {
        // dc:Description is long-form; IPTC Caption-Abstract capped at 2000; ImageDescription is EXIF ASCII
        out.push(`-IFD0:ImageDescription=${trimLen(description, 500)}`);
        out.push(`-XMP-dc:Description=${trimLen(description, 500)}`);
        out.push(`-IPTC:Caption-Abstract=${trimLen(description, 400)}`);
    }
    if (headline) {
        out.push(`-XMP-photoshop:Headline=${trimLen(headline, 200)}`);
    }
    // dc:Title is a language-alternative structure. exiftool's `-lang=xx`
    // syntax writes into a specific alt entry. Emit en and ar side by side so
    // the file carries both product names, matching the site's bilingual UI.
    if (titleEn) {
        out.push(`-XMP-dc:Title-en=${trimLen(titleEn, 200)}`);
        out.push(`-IPTC:ObjectName=${trimLen(titleEn, 64)}`);
    }
    if (titleAr && titleAr !== titleEn) {
        out.push(`-XMP-dc:Title-ar=${trimLen(titleAr, 200)}`);
    }
    if (keywords && keywords.length > 0) {
        for (const k of keywords) {
            out.push(`-XMP-dc:Subject+=${k}`);
            out.push(`-IPTC:Keywords+=${trimLen(k, 64)}`);
        }
    }
    return out;
}

function hasC2PA(filePath) {
    // fast heuristic: JUMBF box magic near start
    try {
        const buf = readFileSync(filePath);
        return buf.includes(Buffer.from('jumb')) || buf.includes(Buffer.from('c2pa'));
    } catch { return false; }
}

function stripC2PA(filePath) {
    try {
        execFileSync('c2patool', [filePath, '--remove-manifest'], { stdio: ['ignore', 'ignore', 'ignore'] });
        return true;
    } catch { return false; }
}

// map file path → { slug, url-in-product-data }
function urlKeyForFile(absPath) {
    const rel = relative(join(ROOT, 'public'), absPath).replace(/^\/+/, '');
    return '/' + rel;
}

function slugForFile(absPath) {
    // .../public/products/<brand>/<slug>/<file>
    return basename(dirname(absPath));
}

function baseNameForImage(absPath) {
    // strip rendition suffix to match the product data URL (which uses the master)
    // e.g. foo-800.webp / foo-480.webp / foo-thumb.webp → foo.webp
    const b = basename(absPath);
    return b.replace(/-(?:800|480|thumb)\.webp$/i, '.webp');
}

// -------------- main --------------

console.log(`CairoVolt product-image metadata pipeline`);
console.log(`  root:      ${ROOT}`);
console.log(`  target:    public/products/**/*.webp`);
if (ONLY_SLUG) console.log(`  filter:    slug = ${ONLY_SLUG}`);
if (DRY_RUN)   console.log(`  mode:      DRY RUN (no files modified)`);
console.log(`  ICC:       ${ICC_PROFILE}`);
console.log(`  copyright: ${COPYRIGHT}`);
console.log(`  source:    ${DIGITAL_SOURCE_TYPE}`);
console.log('');

if (!existsSync(ICC_PROFILE)) {
    console.error(`FATAL: sRGB profile not found at ${ICC_PROFILE}`);
    process.exit(1);
}

console.log(`Loading product data …`);
const productMap = loadProductMap();
console.log(`  loaded ${productMap.size} product data files`);

console.log(`Enumerating product images …`);
const files = [];
for (const brand of readdirSync(PRODUCTS_DIR)) {
    const brandDir = join(PRODUCTS_DIR, brand);
    if (!statSync(brandDir).isDirectory()) continue;
    for (const slug of readdirSync(brandDir)) {
        if (ONLY_SLUG && slug !== ONLY_SLUG) continue;
        const slugDir = join(brandDir, slug);
        if (!statSync(slugDir).isDirectory()) continue;
        for (const f of readdirSync(slugDir)) {
            if (!/\.webp$/i.test(f)) continue;
            files.push(join(slugDir, f));
        }
    }
}
console.log(`  ${files.length} WebP files to process`);
console.log('');

let n = 0, ok = 0, err = 0, c2paStripped = 0, missingProduct = 0;
const errors = [];
const missingSlugs = new Set();
const t0 = Date.now();

for (const absPath of files) {
    n++;
    const slug = slugForFile(absPath);
    const product = productMap.get(slug);
    if (!product) { missingProduct++; missingSlugs.add(slug); }

    const masterUrl = urlKeyForFile(absPath).replace(/-(?:800|480|thumb)\.webp$/i, '.webp');
    const alt = product?.images?.get(masterUrl) || product?.images?.get(urlKeyForFile(absPath)) || null;

    const description = alt
        || (product?.nameEn ? `${product.nameEn} — CairoVolt` : `${slug.replace(/-/g, ' ')} — CairoVolt`);
    const headline = product?.nameEn || slug;
    const titleEn = alt || product?.nameEn || slug;
    const titleAr = product?.nameAr || null;
    const keywords = buildKeywords(product, slug);

    if (DRY_RUN) {
        console.log(`  [${n}/${files.length}] ${relative(ROOT, absPath)}`);
        console.log(`      titleEn: ${trimLen(titleEn, 100)}`);
        if (titleAr) console.log(`      titleAr: ${trimLen(titleAr, 100)}`);
        console.log(`      alt:     ${trimLen(description, 100)}`);
        console.log(`      keywords: ${keywords.slice(0, 8).join(', ')}${keywords.length > 8 ? '…' : ''}`);
        continue;
    }

    // 1. strip C2PA if present
    if (hasC2PA(absPath)) {
        if (stripC2PA(absPath)) c2paStripped++;
    }

    // 2. one-shot exiftool: strip all + write ours + embed ICC
    const argv = [...baseArgs(), ...perImageArgs({ description, headline, titleEn, titleAr, keywords }), absPath];
    try {
        execFileSync('exiftool', argv, { stdio: ['ignore', 'ignore', 'pipe'] });
        ok++;
    } catch (e) {
        err++;
        errors.push({ path: absPath, msg: (e.stderr || e.message || '').toString().slice(0, 200) });
    }

    if (n % 100 === 0) {
        const elapsed = (Date.now() - t0) / 1000;
        const eta = ((files.length - n) * (elapsed / n)).toFixed(0);
        console.log(`  … ${n}/${files.length}  (ok=${ok} err=${err} c2pa=${c2paStripped})  eta ${eta}s`);
    }
}

const seconds = ((Date.now() - t0) / 1000).toFixed(1);
console.log('');
console.log(`Done in ${seconds}s`);
console.log(`  processed:       ${n}`);
console.log(`  ok:              ${ok}`);
console.log(`  errors:          ${err}`);
console.log(`  C2PA stripped:   ${c2paStripped}`);
console.log(`  missing product: ${missingProduct}  (${missingSlugs.size} distinct slugs)`);
if (missingSlugs.size > 0 && missingSlugs.size <= 20) {
    console.log(`    ${[...missingSlugs].join(', ')}`);
}
if (errors.length > 0) {
    console.log('');
    console.log(`First ${Math.min(errors.length, 5)} errors:`);
    for (const e of errors.slice(0, 5)) {
        console.log(`  ! ${relative(ROOT, e.path)}: ${e.msg}`);
    }
}
process.exit(err > 0 ? 1 : 0);
