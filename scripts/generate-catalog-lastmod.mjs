#!/usr/bin/env node
/**
 * Writes src/data/catalog-lastmod.generated.ts: a committed map of
 * slug -> { hash, lastmod } for every product, plus the few non-product
 * sources (category copy, brand hubs, solutions, FAQ, locations, home) whose
 * pages the sitemap and feeds date.
 *
 * WHY A COMMITTED MAP (and not git at build time)
 * App Hosting builds from a checkout that may carry no git history, so
 * `git log` there is unreliable. Like blog-schedule.generated.ts, the dates are
 * computed where history exists (a developer machine, or CI) and committed.
 *
 * RULES — the output must stay byte-identical when nothing changed:
 *   - hash    = sha1 over the source files' contents (products/<slug>.ts +
 *               details/<slug>.ts for a product).
 *   - same hash as the previous run  -> keep the previous lastmod.
 *   - new or changed hash            -> lastmod = now (one timestamp per run).
 *   - an entry seen for the first time on a machine with full git history and
 *     an unmodified working copy takes the last commit date of its files
 *     instead of "now" (the initial seed). Shallow clones (CI) always use now.
 *   - keys are sorted; there is no "generated at" line. price-sync.yml runs this
 *     every 15 minutes and commits whenever src/data changes, so any churn here
 *     would become a commit every 15 minutes.
 *
 * Usage: node scripts/generate-catalog-lastmod.mjs
 * Built-ins only (CI runs it without npm ci).
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_REL = 'src/data/catalog-lastmod.generated.ts';
const OUT = path.join(ROOT, OUT_REL);

// One timestamp per run, at second precision, so every entry changed in the
// same run carries the same value.
const NOW = new Date(Math.floor(Date.now() / 1000) * 1000).toISOString();

function readRel(rel) {
    const abs = path.join(ROOT, rel);
    return existsSync(abs) ? readFileSync(abs) : null;
}

function listTsBasenames(dirRel) {
    const abs = path.join(ROOT, dirRel);
    if (!existsSync(abs)) return [];
    return readdirSync(abs)
        .filter(name => name.endsWith('.ts') && !name.startsWith('_') && name !== 'index.ts')
        .map(name => name.slice(0, -3))
        .sort();
}

/** Stable content hash. File labels are included so a missing file hashes differently from an empty one. */
function hashParts(parts) {
    const hash = createHash('sha1');
    for (const [label, content] of parts) {
        hash.update(label);
        hash.update('\0');
        if (content !== null && content !== undefined) {
            hash.update('1');
            hash.update(content);
        } else {
            hash.update('0');
        }
        hash.update('\0');
    }
    return hash.digest('hex');
}

function fileParts(files) {
    return files.map(rel => [rel, readRel(rel)]);
}

/** One namespace of messages/{ar,en}.json, normalized so unrelated message edits do not move it. */
function messageNamespaceParts(namespace) {
    return ['ar', 'en'].map(locale => {
        const rel = `messages/${locale}.json`;
        const raw = readRel(rel);
        if (!raw) return [`${rel}#${namespace}`, null];
        try {
            const parsed = JSON.parse(raw.toString('utf8'));
            return [`${rel}#${namespace}`, JSON.stringify(parsed[namespace] ?? null)];
        } catch {
            return [`${rel}#${namespace}`, raw];
        }
    });
}

// ── git helpers (seed only; every failure falls back to NOW) ──
function git(args) {
    try {
        return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    } catch {
        return null;
    }
}

const GIT_HISTORY_USABLE = (() => {
    const inside = git(['rev-parse', '--is-inside-work-tree']);
    if (inside !== 'true') return false;
    // A shallow clone (actions/checkout default) reports the single fetched
    // commit's date for every file, which would be a fabricated history.
    return git(['rev-parse', '--is-shallow-repository']) === 'false';
})();

/** Last commit date of the files, or null when unknown or the working copy differs from HEAD. */
function seedDate(files) {
    if (!GIT_HISTORY_USABLE) return null;
    const existing = files.filter(rel => existsSync(path.join(ROOT, rel)));
    if (existing.length === 0) return null;
    const dirty = git(['status', '--porcelain', '--', ...existing]);
    if (dirty === null || dirty !== '') return null; // uncommitted edits ship later than their last commit
    const date = git(['log', '-1', '--format=%cI', '--', ...existing]);
    if (!date) return null;
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

// ── previous output ──
function parsePrevious(name, text) {
    const match = text.match(new RegExp(`export const ${name}[^=]*=\\s*(\\{[\\s\\S]*?\\n\\});`));
    if (!match) return {};
    try {
        return JSON.parse(match[1]);
    } catch {
        return {};
    }
}

const previousText = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
const previousProducts = parsePrevious('CATALOG_LASTMOD', previousText);
const previousSources = parsePrevious('CATALOG_SOURCE_LASTMOD', previousText);

const stats = { kept: 0, changed: 0, seeded: 0, added: 0 };

function resolveEntry(previous, key, hash, seedFiles) {
    const prior = previous[key];
    if (prior && prior.hash === hash && typeof prior.lastmod === 'string') {
        stats.kept += 1;
        return { hash, lastmod: prior.lastmod };
    }
    if (prior) {
        stats.changed += 1;
        return { hash, lastmod: NOW };
    }
    const seeded = seedFiles ? seedDate(seedFiles) : null;
    if (seeded) {
        stats.seeded += 1;
        return { hash, lastmod: seeded };
    }
    stats.added += 1;
    return { hash, lastmod: NOW };
}

// ── products: src/data/products/<slug>.ts + src/data/details/<slug>.ts ──
const products = {};
for (const slug of listTsBasenames('src/data/products')) {
    const files = [`src/data/products/${slug}.ts`, `src/data/details/${slug}.ts`];
    products[slug] = resolveEntry(previousProducts, slug, hashParts(fileParts(files)), files);
}

// ── non-product sources ──
const sourceDefs = [];
for (const brand of readdirSync(path.join(ROOT, 'src/data/category-content'), { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()) {
    for (const category of listTsBasenames(`src/data/category-content/${brand}`)) {
        const file = `src/data/category-content/${brand}/${category}.ts`;
        sourceDefs.push({ key: `category:${brand}/${category}`, parts: fileParts([file]), seedFiles: [file] });
    }
}
for (const slug of listTsBasenames('src/data/generic-categories')) {
    const file = `src/data/generic-categories/${slug}.ts`;
    sourceDefs.push({ key: `generic:${slug}`, parts: fileParts([file]), seedFiles: [file] });
}
const singleSources = [
    ['source:brand-data', ['src/data/brand-data.ts']],
    ['source:soundcore-hub', ['src/data/soundcore-hub.ts']],
    ['source:solutions', ['src/data/solutions-data.ts']],
    ['source:locations', ['src/data/governorates.ts', 'src/lib/shipping.ts']],
    ['source:home', ['src/app/[locale]/page.tsx']],
];
for (const [key, files] of singleSources) {
    sourceDefs.push({ key, parts: fileParts(files), seedFiles: files });
}
// /faq renders the FAQ message namespace plus the voice FAQs and links in its page file.
sourceDefs.push({
    key: 'source:faq',
    parts: [...messageNamespaceParts('FAQ'), ...fileParts(['src/app/[locale]/faq/page.tsx'])],
    seedFiles: ['messages/ar.json', 'messages/en.json', 'src/app/[locale]/faq/page.tsx'],
});

const sources = {};
for (const def of [...sourceDefs].sort((a, b) => a.key.localeCompare(b.key))) {
    sources[def.key] = resolveEntry(previousSources, def.key, hashParts(def.parts), def.seedFiles);
}

function sortedObject(input) {
    return Object.fromEntries(Object.keys(input).sort().map(key => [key, input[key]]));
}

const output = `// AUTO-GENERATED by scripts/generate-catalog-lastmod.mjs — do not edit by hand.
//
// Per-product (and per-source) last-modified dates for the sitemap, feed.xml
// and llms.txt. \`hash\` is a sha1 of the source files; \`lastmod\` moves only
// when that hash changes, so re-running the generator on unchanged sources is
// a no-op. Run it after editing src/data/products or src/data/details (the
// price-sync workflow runs it automatically before committing).

export interface CatalogLastmodEntry {
    hash: string;
    lastmod: string;
}

export const CATALOG_LASTMOD: Record<string, CatalogLastmodEntry> = ${JSON.stringify(sortedObject(products), null, 4)};

export const CATALOG_SOURCE_LASTMOD: Record<string, CatalogLastmodEntry> = ${JSON.stringify(sortedObject(sources), null, 4)};
`;

if (output === previousText) {
    console.log(`catalog-lastmod: unchanged (${Object.keys(products).length} products, ${Object.keys(sources).length} sources)`);
} else {
    writeFileSync(OUT, output);
    console.log(
        `catalog-lastmod: wrote ${OUT_REL} — ${Object.keys(products).length} products, ${Object.keys(sources).length} sources `
        + `(kept ${stats.kept}, changed ${stats.changed}, seeded from git ${stats.seeded}, new ${stats.added})`,
    );
}
