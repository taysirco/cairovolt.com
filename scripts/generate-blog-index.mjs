#!/usr/bin/env node

/**
 * generate-blog-index.mjs — Generates a standalone lightweight blog index.
 *
 * Reads each blog/*.ts file with regex to extract ONLY metadata fields
 * (no content, FAQ answers, or quick-answer body text). Writes a self-contained
 * src/data/blog-index.generated.ts that has ZERO imports from the blog barrel.
 *
 * Run:  node scripts/generate-blog-index.mjs
 *       npm run index:generate
 *
 * This should be run:
 *  - After adding/editing a blog article
 *  - Before `npm run build`
 *  - The blog-articles.ts barrel regeneration should trigger this
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const BLOG_DIR = join(import.meta.dirname, '..', 'src', 'data', 'blog');
const OUTPUT = join(import.meta.dirname, '..', 'src', 'data', 'blog-index.generated.ts');

// ── Regex helpers ──
function extractString(text, fieldName) {
    // Match: fieldName: 'value' or fieldName: "value"
    const re = new RegExp(`${fieldName}:\\s*['"]([^'"]+)['"]`);
    const m = text.match(re);
    return m ? m[1] : null;
}

function extractNumber(text, fieldName) {
    const re = new RegExp(`${fieldName}:\\s*(\\d+)`);
    const m = text.match(re);
    return m ? parseInt(m[1], 10) : null;
}

function extractStringArray(text, fieldName) {
    // Match: fieldName: [ 'a', 'b', ... ]
    const re = new RegExp(`${fieldName}:\\s*\\[([^\\]]*?)\\]`, 's');
    const m = text.match(re);
    if (!m) return [];
    const items = [];
    const itemRe = /['"]([^'"]+)['"]/g;
    let match;
    while ((match = itemRe.exec(m[1])) !== null) {
        items.push(match[1]);
    }
    return items;
}

function extractTranslation(text, locale) {
    // Find the locale block: ar: { ... } or en: { ... }
    // Strategy: find `ar: {` then match balanced braces
    const startRe = new RegExp(`${locale}:\\s*\\{`);
    const startMatch = startRe.exec(text);
    if (!startMatch) return null;

    let depth = 1;
    let i = startMatch.index + startMatch[0].length;
    while (i < text.length && depth > 0) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') depth--;
        i++;
    }

    const block = text.slice(startMatch.index + startMatch[0].length, i - 1);

    return {
        title: extractString(block, 'title') || '',
        metaTitle: extractString(block, 'metaTitle') || '',
        metaDescription: extractString(block, 'metaDescription') || '',
        keywords: extractString(block, 'keywords') || '',
        excerpt: extractString(block, 'excerpt') || '',
    };
}

function extractAuthor(text) {
    // Find author: { ... }
    const startRe = /author:\s*\{/;
    const startMatch = startRe.exec(text);
    if (!startMatch) return null;

    let depth = 1;
    let i = startMatch.index + startMatch[0].length;
    while (i < text.length && depth > 0) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') depth--;
        i++;
    }

    const block = text.slice(startMatch.index + startMatch[0].length, i - 1);

    // Extract nested name: { ar: '...', en: '...' }
    function extractI18n(fieldBlock, field) {
        const re = new RegExp(`${field}:\\s*\\{\\s*ar:\\s*['"]([^'"]+)['"]\\s*,\\s*en:\\s*['"]([^'"]+)['"]\\s*\\}`);
        const m = re.exec(fieldBlock);
        return m ? { ar: m[1], en: m[2] } : { ar: '', en: '' };
    }

    return {
        name: extractI18n(block, 'name'),
        title: extractI18n(block, 'title'),
        avatar: extractString(block, 'avatar') || '',
    };
}

// ── Process files ──
const files = readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.ts') && f !== '_types.ts')
    .sort();

console.log(`📖 Processing ${files.length} blog articles...`);

const entries = [];
let errors = 0;

for (const file of files) {
    const slug = basename(file, '.ts');
    const raw = readFileSync(join(BLOG_DIR, file), 'utf8');

    try {
        const entry = {
            slug,
            category: extractString(raw, 'category') || 'tips',
            publishDate: extractString(raw, 'publishDate') || '',
            modifiedDate: extractString(raw, 'modifiedDate') || '',
            readingTime: extractNumber(raw, 'readingTime') || 5,
            coverImage: extractString(raw, 'coverImage') || undefined,
            relatedProducts: extractStringArray(raw, 'relatedProducts'),
            relatedCategories: extractStringArray(raw, 'relatedCategories'),
            relatedArticles: extractStringArray(raw, 'relatedArticles'),
            author: extractAuthor(raw),
            translations: {
                ar: extractTranslation(raw, 'ar'),
                en: extractTranslation(raw, 'en'),
            },
        };

        // Validate minimum fields
        if (!entry.translations.ar?.title || !entry.translations.en?.title) {
            console.warn(`  ⚠️  ${slug}: missing title in ar or en`);
        }

        entries.push(entry);
    } catch (err) {
        console.error(`  ❌ ${slug}: ${err.message}`);
        errors++;
    }
}

// ── Generate output ──
function escapeStr(s) {
    if (!s) return "''";
    return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function indent(str, level) {
    return str.split('\n').map(l => '    '.repeat(level) + l).join('\n');
}

let output = `// AUTO-GENERATED — DO NOT EDIT MANUALLY
// Generated by: node scripts/generate-blog-index.mjs
// Articles: ${entries.length} | Generated: ${new Date().toISOString()}
//
// Standalone lightweight blog index — NO imports from blog barrel.
// Contains only metadata fields (slug, category, title, excerpt, etc.)
// Excludes: content HTML, FAQ answers, and quick-answer body text

export interface BlogIndexEntry {
    slug: string;
    category: 'buying-guide' | 'comparison' | 'how-to' | 'review' | 'tips';
    publishDate: string;
    modifiedDate: string;
    readingTime: number;
    coverImage?: string;
    relatedProducts: string[];
    relatedCategories: string[];
    relatedArticles?: string[];
    author?: {
        name: { ar: string; en: string };
        title: { ar: string; en: string };
        avatar: string;
    };
    translations: {
        ar: {
            title: string;
            metaTitle: string;
            metaDescription: string;
            keywords: string;
            excerpt: string;
        };
        en: {
            title: string;
            metaTitle: string;
            metaDescription: string;
            keywords: string;
            excerpt: string;
        };
    };
}

export const blogIndex: BlogIndexEntry[] = [\n`;

for (const e of entries) {
    output += `    {\n`;
    output += `        slug: ${escapeStr(e.slug)},\n`;
    output += `        category: ${escapeStr(e.category)},\n`;
    output += `        publishDate: ${escapeStr(e.publishDate)},\n`;
    output += `        modifiedDate: ${escapeStr(e.modifiedDate)},\n`;
    output += `        readingTime: ${e.readingTime},\n`;
    if (e.coverImage) {
        output += `        coverImage: ${escapeStr(e.coverImage)},\n`;
    }
    output += `        relatedProducts: [${e.relatedProducts.map(escapeStr).join(', ')}],\n`;
    output += `        relatedCategories: [${e.relatedCategories.map(escapeStr).join(', ')}],\n`;
    if (e.relatedArticles?.length > 0) {
        output += `        relatedArticles: [${e.relatedArticles.map(escapeStr).join(', ')}],\n`;
    }
    if (e.author) {
        output += `        author: {\n`;
        output += `            name: { ar: ${escapeStr(e.author.name.ar)}, en: ${escapeStr(e.author.name.en)} },\n`;
        output += `            title: { ar: ${escapeStr(e.author.title.ar)}, en: ${escapeStr(e.author.title.en)} },\n`;
        output += `            avatar: ${escapeStr(e.author.avatar)},\n`;
        output += `        },\n`;
    }
    output += `        translations: {\n`;
    output += `            ar: {\n`;
    output += `                title: ${escapeStr(e.translations.ar?.title)},\n`;
    output += `                metaTitle: ${escapeStr(e.translations.ar?.metaTitle)},\n`;
    output += `                metaDescription: ${escapeStr(e.translations.ar?.metaDescription)},\n`;
    output += `                keywords: ${escapeStr(e.translations.ar?.keywords)},\n`;
    output += `                excerpt: ${escapeStr(e.translations.ar?.excerpt)},\n`;
    output += `            },\n`;
    output += `            en: {\n`;
    output += `                title: ${escapeStr(e.translations.en?.title)},\n`;
    output += `                metaTitle: ${escapeStr(e.translations.en?.metaTitle)},\n`;
    output += `                metaDescription: ${escapeStr(e.translations.en?.metaDescription)},\n`;
    output += `                keywords: ${escapeStr(e.translations.en?.keywords)},\n`;
    output += `                excerpt: ${escapeStr(e.translations.en?.excerpt)},\n`;
    output += `            },\n`;
    output += `        },\n`;
    output += `    },\n`;
}

output += `];\n\n`;

// Helper functions
output += `// ── Helper functions ──

export function isIndexEntryLive(a: BlogIndexEntry, now: number = Date.now()): boolean {
    const t = new Date(a.publishDate).getTime();
    return Number.isFinite(t) ? t <= now : true;
}

export function getLiveIndex(now: number = Date.now()): BlogIndexEntry[] {
    return blogIndex.filter(a => isIndexEntryLive(a, now));
}

export function getAllIndexSlugs(): string[] {
    return blogIndex.map(a => a.slug);
}

export function getLiveIndexSlugs(now: number = Date.now()): string[] {
    return getLiveIndex(now).map(a => a.slug);
}

export function getIndexEntry(slug: string): BlogIndexEntry | undefined {
    return blogIndex.find(a => a.slug === slug);
}
`;

writeFileSync(OUTPUT, output, 'utf8');

// ── Lightweight scheduling map for edge middleware ──
// { slug -> publishDate epoch ms }. Imported by src/middleware.ts to emit a
// REAL 404 (per-request, no ISR/CDN cache freezing the time gate) for a
// not-yet-published or unknown article slug — a scheduled post then 404s until
// its publishDate and serves automatically once it passes. 0 = always-live
// (unparseable date), mirroring isIndexEntryLive()'s fallback.
let schedule = `// AUTO-GENERATED — DO NOT EDIT MANUALLY
// Generated by: node scripts/generate-blog-index.mjs
// { slug -> publishDate epoch ms } — edge-lightweight blog scheduling gate.
export const BLOG_SCHEDULE: Record<string, number> = {\n`;
for (const e of entries) {
    const t = new Date(e.publishDate).getTime();
    schedule += `    ${escapeStr(e.slug)}: ${Number.isFinite(t) ? t : 0},\n`;
}
schedule += `};\n`;
const SCHEDULE_OUTPUT = join(import.meta.dirname, '..', 'src', 'data', 'blog-schedule.generated.ts');
writeFileSync(SCHEDULE_OUTPUT, schedule, 'utf8');
console.log(`✅ Generated ${SCHEDULE_OUTPUT} (${entries.length} slugs)`);

console.log(`\n✅ Generated ${OUTPUT}`);
console.log(`   ${entries.length} articles indexed`);
if (errors > 0) {
    console.log(`   ⚠️  ${errors} errors`);
}

const sizeKB = (Buffer.byteLength(output, 'utf8') / 1024).toFixed(1);
console.log(`   Size: ${sizeKB} KB (vs ~5.9 MB full barrel)`);
