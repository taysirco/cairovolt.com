#!/usr/bin/env node
/**
 * CairoVolt blog-content validation.
 *
 * Checks each article for the publishing requirements used by the application:
 *   - AR content >= 1,300 words  (strip HTML)
 *   - EN content >= 1,300 words
 *   - locale-safe links: Arabic links omit /en/ and English links include it
 *   - FAQ === 4 per language
 *   - quickAnswer present per language
 *   - coverImage present
 *   - relatedArticles === 3
 *   - (warning) relatedProducts between 5 and 6
 *   - {{price:<slug>}} tokens (contract C1, src/lib/blog-answer-normalize.ts):
 *       ERROR  token whose product is unknown / not active / unpriced
 *       ERROR  token outside quickAnswer, faq[].question, faq[].answer, content
 *       ERROR  malformed token ("{{price:" that is not a valid token)
 *   - (warning) markup (<tag, **, ](…) in quickAnswer / FAQ answers
 *   - (warning) quickAnswer over 80 words
 *   - (warning) externalReferences pointing at CairoVolt-controlled hosts
 *   - (warning) a sentence pairing CairoVolt/"our store" with authorized /
 *     official / certified / وكيل / موزع … (CairoVolt is an independent retailer)
 *   - (warning) AR vs EN literal EGP amounts near the same product link differ
 *   - (warning) relatedArticles slug with no article file
 *   - --prices: (warning) literal EGP amount near a product link or model code
 *     that differs from the catalogue price
 *
 * Usage:
 *   node scripts/audit-blog.js {slug}            # audit one article
 *   node scripts/audit-blog.js                   # audit all published articles
 *   node scripts/audit-blog.js --prices [slug]   # + catalogue price-drift check
 *
 * Exits with status 1 when a required check fails. Warnings are informational.
 */
'use strict';
/* eslint-disable @typescript-eslint/no-require-imports -- plain CommonJS Node script */

const fs = require('fs');
const path = require('path');

const ts = require('typescript');

const BLOG_DIR = path.join(__dirname, '..', 'src', 'data', 'blog');
const WORD_FLOOR = 1300;
const FAQ_EXACT = 4;
const RELATED_ARTICLES_EXACT = 3;
const RELATED_PRODUCTS_MIN = 5;
const RELATED_PRODUCTS_MAX = 6;

function loadArticle(file) {
    const src = fs.readFileSync(file, 'utf8');
    const js = ts.transpileModule(src, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const moduleShim = { exports: {} };
    // eslint-disable-next-line no-new-func
    const fn = new Function('exports', 'module', 'require', js);
    fn(moduleShim.exports, moduleShim, require);
    return Object.values(moduleShim.exports).find((v) => v && typeof v === 'object' && v.slug);
}

function stripHtml(s) {
    return s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function wordCount(s) {
    return stripHtml(s).split(' ').filter((w) => w.length > 0).length;
}

// Internal links in EN content that are missing the /en/ prefix.
// Matches href="/something" but NOT href="/en/...", external (http), or anchors (#).
function enLeaks(html) {
    const out = [];
    const re = /href\s*=\s*"(\/[^"]*)"/g;
    let m;
    while ((m = re.exec(html)) !== null) {
        const href = m[1];
        if (href === '/en' || href.startsWith('/en/')) continue;
        out.push(href);
    }
    return out;
}

// Internal links in AR content that wrongly carry the /en/ prefix (leak).
function arLeaks(html) {
    const out = [];
    const re = /href\s*=\s*"(\/en\/[^"]*)"/g;
    let m;
    while ((m = re.exec(html)) !== null) out.push(m[1]);
    return out;
}

// ── Catalogue (parsed from source, no TS execution needed) ──────────────────
const PRODUCTS_DIR = path.join(__dirname, '..', 'src', 'data', 'products');

function loadCatalogue() {
    const bySlug = new Map();
    const byModel = new Map(); // model code (e.g. A1263, JR-T012) → Set<slug>
    for (const file of fs.readdirSync(PRODUCTS_DIR)) {
        if (!file.endsWith('.ts') || file.startsWith('_')) continue;
        const src = fs.readFileSync(path.join(PRODUCTS_DIR, file), 'utf8');
        const slugM = src.match(/\bslug:\s*["'`]([^"'`]+)["'`]/);
        if (!slugM) continue;
        const statusM = src.match(/\bstatus:\s*["'`]([^"'`]+)["'`]/);
        const prices = [];
        const priceRe = /(?:^|[\s,{])price:\s*(\d+)/gm;
        let pm;
        while ((pm = priceRe.exec(src)) !== null) prices.push(Number(pm[1]));
        const mpnM = src.match(/\bmpn:\s*["'`]([^"'`]+)["'`]/);
        const entry = {
            slug: slugM[1],
            status: statusM ? statusM[1] : '',
            price: prices.length ? prices[0] : 0,
            prices: new Set(prices),
        };
        bySlug.set(entry.slug, entry);
        if (mpnM) {
            const mpn = mpnM[1].trim();
            const code = (mpn.match(/^A[0-9A-Z]{4}/) || mpn.match(/^JR-[A-Z0-9-]+/) || [])[0];
            if (code) {
                if (!byModel.has(code)) byModel.set(code, new Set());
                byModel.get(code).add(entry.slug);
            }
        }
    }
    return { bySlug, byModel };
}

const CATALOGUE = loadCatalogue();
const PRICE_FLAG = process.argv.slice(2).includes('--prices');

// Aggregate counts for the new checks (printed in the summary).
const STATS = {
    tokenUnknownOrInactive: 0,
    tokenDisallowedField: 0,
    tokenMalformed: 0,
    markupInAnswers: 0,
    quickAnswerOver80: 0,
    selfControlledReferences: 0,
    retailerClaimSentences: 0,
    arEnPriceParity: 0,
    relatedArticleMissingFile: 0,
    catalogPriceDrift: 0,
    articlesWithTokens: 0,
};

const PRICE_TOKEN_RE = /\{\{price:([a-z0-9][a-z0-9.-]*)\}\}/g;
const TOKEN_ALLOWED_PATH = /^translations\.(ar|en)\.(quickAnswer|content|faq\[\d+\]\.(question|answer))$/;
const SELF_CONTROLLED_HOST = /cairovolt|cairovolteg|althaqelco|gamesuy|yumpu\.com|rubygems\.org/i;
const PRODUCT_HREF_RE = /href=\\?"(?:\/en)?\/(?:anker|soundcore|joyroom|jbl)\/[a-z0-9-]+\/([a-z0-9.-]+)\\?"/g;
const RETAILER_SUBJECT = /(CairoVolt|كايرو فولت|عندنا|متجرنا)/i;
const RETAILER_CLAIM = /(authori[sz]ed|official|certified|معتمد|رسمي|وكيل|موزع)/i;

/** Every string in the article with its dotted path (translations.ar.faq[0].answer …). */
function walkStrings(value, pathSoFar, out) {
    if (typeof value === 'string') out.push([pathSoFar, value]);
    else if (Array.isArray(value)) value.forEach((v, i) => walkStrings(v, `${pathSoFar}[${i}]`, out));
    else if (value && typeof value === 'object') {
        for (const [k, v] of Object.entries(value)) walkStrings(v, pathSoFar ? `${pathSoFar}.${k}` : k, out);
    }
    return out;
}

function toArabicWesternDigits(s) {
    return s.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

/**
 * Literal EGP amounts in an HTML string, with their offsets. Matches
 * "1,730 جنيه", "1730 ج.م", "EGP 1,730", "1,730 EGP". Skips the upper end of a
 * range ("1,200–1,500 جنيه"): market ranges legitimately stay literal.
 */
function findEgpAmounts(html) {
    const text = toArabicWesternDigits(html);
    const out = [];
    const NUM = '(\\d{1,3}(?:[,٬]\\d{3})+|\\d{2,6})';
    const patterns = [
        new RegExp(`${NUM}\\s*(?:جنيه|ج\\.\\s?م|EGP|LE\\b|E£)`, 'g'),
        new RegExp(`(?:EGP|E£)\\s*${NUM}`, 'g'),
    ];
    for (const re of patterns) {
        let m;
        while ((m = re.exec(text)) !== null) {
            const numStart = m.index + m[0].indexOf(m[1]);
            const before = text.slice(Math.max(0, numStart - 6), numStart);
            if (/[–\-~]\s*$|(?:to|إلى|الى)\s*$/.test(before)) continue;
            const value = Number(m[1].replace(/[,٬]/g, ''));
            if (Number.isFinite(value) && value > 0) out.push({ index: numStart, value });
        }
    }
    return out;
}

/** Product references (body links + model codes) with offsets. */
function findProductRefs(html) {
    const refs = [];
    let m;
    PRODUCT_HREF_RE.lastIndex = 0;
    while ((m = PRODUCT_HREF_RE.exec(html)) !== null) {
        refs.push({ start: m.index, end: m.index + m[0].length, slugs: [m[1]], kind: 'href' });
    }
    for (const [code, slugs] of CATALOGUE.byModel) {
        const re = new RegExp(`\\b${code.replace(/[-]/g, '\\-')}\\b`, 'g');
        while ((m = re.exec(html)) !== null) {
            refs.push({ start: m.index, end: m.index + m[0].length, slugs: [...slugs], kind: 'model' });
        }
    }
    return refs;
}

/** Attribute each EGP amount to the NEAREST product reference within 80 chars. */
function amountsByProduct(html, kinds) {
    const refs = findProductRefs(html).filter((r) => kinds.includes(r.kind));
    const result = new Map(); // slug → [{value, index}]
    for (const amount of findEgpAmounts(html)) {
        let best = null;
        let bestDistance = Infinity;
        for (const ref of refs) {
            const distance = amount.index < ref.start
                ? ref.start - amount.index
                : amount.index > ref.end ? amount.index - ref.end : 0;
            if (distance <= 80 && distance < bestDistance) {
                best = ref;
                bestDistance = distance;
            }
        }
        if (!best) continue;
        for (const slug of best.slugs) {
            if (!result.has(slug)) result.set(slug, []);
            result.get(slug).push(amount);
        }
    }
    return result;
}

/** Sentences of an HTML string: block tags and sentence punctuation both end a sentence. */
function sentencesOf(html) {
    return String(html || '')
        .replace(/<\/?(?:p|li|h[1-6]|tr|td|th|div|br|ul|ol|table|thead|tbody|section|blockquote)\b[^>]*>/gi, '\n')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .split(/(?<=[.!?؟؛])\s+|\n+/)
        .map((x) => x.replace(/\s+/g, ' ').trim())
        .filter(Boolean);
}

function plainText(s) {
    return String(s || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function newChecks(article, slug, errors, warnings) {
    const ar = article.translations.ar;
    const en = article.translations.en;

    // 1) Price tokens — allowed fields only, resolvable products only.
    let sawToken = false;
    for (const [p, value] of walkStrings(article, '', [])) {
        if (value.indexOf('{{price:') === -1) continue;
        sawToken = true;
        if (!TOKEN_ALLOWED_PATH.test(p)) {
            STATS.tokenDisallowedField++;
            errors.push(`price token in disallowed field ${p} (allowed: quickAnswer, faq question/answer, content)`);
            continue;
        }
        const total = (value.match(/\{\{price:/g) || []).length;
        const valid = [...value.matchAll(PRICE_TOKEN_RE)];
        if (valid.length !== total) {
            STATS.tokenMalformed++;
            errors.push(`malformed price token in ${p} (${total - valid.length} not matching {{price:<product-slug>}})`);
        }
        for (const m of valid) {
            const product = CATALOGUE.bySlug.get(m[1]);
            if (!product || product.status !== 'active' || !(product.price > 0)) {
                STATS.tokenUnknownOrInactive++;
                errors.push(`price token {{price:${m[1]}}} in ${p} → ${!product ? 'unknown product' : product.status !== 'active' ? `status "${product.status}"` : 'no price'}`);
            }
        }
    }
    if (sawToken) STATS.articlesWithTokens++;

    for (const [loc, t] of [['AR', ar], ['EN', en]]) {
        // 2) Markup residue in plain-text answer fields.
        const answerFields = [['quickAnswer', t.quickAnswer], ...(t.faq || []).map((q, i) => [`faq[${i}].answer`, q && q.answer])];
        for (const [field, value] of answerFields) {
            if (typeof value !== 'string') continue;
            const hits = [];
            if (/<\/?[a-zA-Z]/.test(value)) hits.push('<tag');
            if (value.includes('**')) hits.push('**');
            if (value.includes('](')) hits.push('](');
            if (hits.length) {
                STATS.markupInAnswers++;
                warnings.push(`${loc} ${field}: markup ${hits.join(' ')} (rendered as plain text — write plain sentences)`);
            }
        }

        // 3) quickAnswer length.
        if (typeof t.quickAnswer === 'string') {
            const words = plainText(t.quickAnswer.replace(/\*\*/g, '')).split(' ').filter(Boolean).length;
            if (words > 80) {
                STATS.quickAnswerOver80++;
                warnings.push(`${loc} quickAnswer = ${words} words (> 80)`);
            }
        }

        // 5) Retailer-status claims (CairoVolt is an independent retailer).
        const texts = [t.content, t.quickAnswer, ...(t.faq || []).flatMap((q) => [q && q.question, q && q.answer])];
        for (const text of texts) {
            if (typeof text !== 'string') continue;
            for (const sentence of sentencesOf(text)) {
                if (RETAILER_SUBJECT.test(sentence) && RETAILER_CLAIM.test(sentence)) {
                    STATS.retailerClaimSentences++;
                    warnings.push(`${loc} retailer-claim sentence: "${sentence.slice(0, 140)}${sentence.length > 140 ? '…' : ''}"`);
                }
            }
        }
    }

    // 4) externalReferences to self-controlled hosts.
    for (const ref of article.externalReferences || []) {
        let host = '';
        try { host = new URL(ref.url).hostname; } catch { host = String(ref.url || ''); }
        if (SELF_CONTROLLED_HOST.test(host)) {
            STATS.selfControlledReferences++;
            warnings.push(`externalReferences → self-controlled host ${host} (${ref.url})`);
        }
    }

    // 6) AR vs EN literal price parity next to the same product link.
    const arAmounts = amountsByProduct(ar.content || '', ['href']);
    const enAmounts = amountsByProduct(en.content || '', ['href']);
    for (const [productSlug, arList] of arAmounts) {
        const enList = enAmounts.get(productSlug);
        if (!enList) continue;
        const arSet = [...new Set(arList.map((a) => a.value))].sort((a, b) => a - b);
        const enSet = [...new Set(enList.map((a) => a.value))].sort((a, b) => a - b);
        if (arSet.join(',') !== enSet.join(',')) {
            STATS.arEnPriceParity++;
            warnings.push(`AR/EN price parity near ${productSlug}: AR [${arSet.join(', ')}] vs EN [${enSet.join(', ')}]`);
        }
    }

    // 7) relatedArticles that have no article file.
    for (const related of article.relatedArticles || []) {
        if (!fs.existsSync(path.join(BLOG_DIR, `${related}.ts`))) {
            STATS.relatedArticleMissingFile++;
            warnings.push(`relatedArticles → "${related}" has no file in src/data/blog`);
        }
    }

    // 8) --prices: literal amounts that disagree with the catalogue.
    if (PRICE_FLAG) {
        for (const [loc, t] of [['AR', ar], ['EN', en]]) {
            const fields = [['content', t.content], ['quickAnswer', t.quickAnswer], ...(t.faq || []).map((q, i) => [`faq[${i}]`, `${q.question} ${q.answer}`])];
            for (const [field, value] of fields) {
                if (typeof value !== 'string') continue;
                for (const [productSlug, amounts] of amountsByProduct(value, ['href', 'model'])) {
                    const product = CATALOGUE.bySlug.get(productSlug);
                    if (!product || !product.prices.size) continue;
                    for (const amount of amounts) {
                        if (!product.prices.has(amount.value)) {
                            STATS.catalogPriceDrift++;
                            warnings.push(`💰 ${loc} ${field}: ${amount.value.toLocaleString('en-US')} EGP near ${productSlug} ≠ catalogue ${product.price.toLocaleString('en-US')}`);
                        }
                    }
                }
            }
        }
    }
}

function auditArticle(file) {
    const slug = path.basename(file, '.ts');
    const errors = [];
    const warnings = [];

    let article;
    try {
        article = loadArticle(file);
    } catch (e) {
        return { slug, errors: [`فشل تحميل الملف: ${e.message}`], warnings: [] };
    }
    if (!article) return { slug, errors: ['لم يُعثر على كائن المقال (export const ...: BlogArticle)'], warnings: [] };

    const ar = article.translations && article.translations.ar;
    const en = article.translations && article.translations.en;
    if (!ar || !en) return { slug, errors: ['ينقص translations.ar أو translations.en'], warnings: [] };

    const arWords = wordCount(ar.content || '');
    const enWords = wordCount(en.content || '');
    if (arWords < WORD_FLOOR) errors.push(`AR ${arWords} كلمة — ناقص ${WORD_FLOOR - arWords} (الحد ${WORD_FLOOR})`);
    if (enWords < WORD_FLOOR) errors.push(`EN ${enWords} words — short by ${WORD_FLOOR - enWords} (floor ${WORD_FLOOR})`);

    const arLeak = arLeaks(ar.content || '');
    if (arLeak.length) errors.push(`AR i18n leak — روابط بـ /en/ في النسخة العربية: ${arLeak.join(', ')}`);
    const enLeak = enLeaks(en.content || '');
    if (enLeak.length) errors.push(`EN i18n leak — روابط داخلية بدون /en/: ${enLeak.join(', ')}`);

    const arFaq = (ar.faq || []).length;
    const enFaq = (en.faq || []).length;
    if (arFaq !== FAQ_EXACT) errors.push(`AR FAQ = ${arFaq} (يجب ${FAQ_EXACT})`);
    if (enFaq !== FAQ_EXACT) errors.push(`EN FAQ = ${enFaq} (must be ${FAQ_EXACT})`);

    if (!ar.quickAnswer || !ar.quickAnswer.trim()) errors.push('AR quickAnswer مفقود');
    if (!en.quickAnswer || !en.quickAnswer.trim()) errors.push('EN quickAnswer missing');

    if (!article.coverImage || !article.coverImage.trim()) errors.push('coverImage مفقود');

    // 🌲 Evergreen guard (warning, not error — existing dated slugs stay valid).
    // Flags a 20xx year in the slug or either metaTitle so new articles avoid it.
    const YEAR = /20\d{2}/;
    if (YEAR.test(slug)) warnings.push(`🌲 دائم الخضرة: تاريخ (${slug.match(YEAR)[0]}) في الـ slug — تجنّبه في الجديد (المنشور المؤرّخ مقبول)`);
    if (ar.metaTitle && YEAR.test(ar.metaTitle)) warnings.push(`🌲 دائم الخضرة: تاريخ في AR metaTitle — احذف السنة`);
    if (en.metaTitle && YEAR.test(en.metaTitle)) warnings.push(`🌲 Evergreen: year in EN metaTitle — remove it`);

    const relArticles = (article.relatedArticles || []).length;
    if (relArticles !== RELATED_ARTICLES_EXACT) errors.push(`relatedArticles = ${relArticles} (يجب ${RELATED_ARTICLES_EXACT})`);

    const relProducts = (article.relatedProducts || []).length;
    if (relProducts < RELATED_PRODUCTS_MIN || relProducts > RELATED_PRODUCTS_MAX) {
        warnings.push(`relatedProducts = ${relProducts} (المفضّل ${RELATED_PRODUCTS_MIN}-${RELATED_PRODUCTS_MAX})`);
    }

    // 🔴 NEW: Validate relatedProducts slugs actually exist as product files
    const missingProducts = (article.relatedProducts || []).filter((pSlug) => {
        return !fs.existsSync(path.join(PRODUCTS_DIR, `${pSlug}.ts`));
    });
    if (missingProducts.length) {
        errors.push(`relatedProducts وهمية (${missingProducts.length}/${relProducts}): ${missingProducts.join(', ')}`);
    }

    // 🔴 NEW: Validate metaDescription length (140-160 chars)
    const arMetaLen = (ar.metaDescription || '').length;
    const enMetaLen = (en.metaDescription || '').length;
    if (arMetaLen < 140) errors.push(`AR metaDescription = ${arMetaLen} حرف (الحد الأدنى 140)`);
    if (arMetaLen > 160) warnings.push(`AR metaDescription = ${arMetaLen} حرف (أكثر من 160 — قد يُقطع)`);
    if (enMetaLen < 140) errors.push(`EN metaDescription = ${enMetaLen} chars (minimum 140)`);
    if (enMetaLen > 160) warnings.push(`EN metaDescription = ${enMetaLen} chars (over 160 — may truncate)`);

    newChecks(article, slug, errors, warnings);

    return { slug, errors, warnings, arWords, enWords };
}

function main() {
    const arg = process.argv.slice(2).find((a) => !a.startsWith('--'));
    let files;
    if (arg) {
        const f = path.join(BLOG_DIR, `${arg.replace(/\.ts$/, '')}.ts`);
        if (!fs.existsSync(f)) {
            console.error(`❌ الملف غير موجود: ${f}`);
            process.exit(1);
        }
        files = [f];
    } else {
        files = fs
            .readdirSync(BLOG_DIR)
            .filter((n) => n.endsWith('.ts') && n !== '_types.ts')
            .map((n) => path.join(BLOG_DIR, n));
    }

    let failed = 0;
    let passed = 0;
    const failedSlugs = [];

    for (const file of files) {
        const r = auditArticle(file);
        if (r.errors.length) {
            failed++;
            failedSlugs.push(r.slug);
            console.log(`\n❌ ${r.slug}  (AR ${r.arWords ?? '?'} / EN ${r.enWords ?? '?'})`);
            for (const e of r.errors) console.log(`     • ${e}`);
            for (const w of r.warnings) console.log(`     ⚠️  ${w}`);
        } else {
            passed++;
            const warn = r.warnings.length ? `  ⚠️ ${r.warnings.join('; ')}` : '';
            if (arg) console.log(`✅ ${r.slug}  (AR ${r.arWords} / EN ${r.enWords})${warn}`);
            else if (r.warnings.length) console.log(`⚠️  ${r.slug}  (AR ${r.arWords} / EN ${r.enWords}) — ${r.warnings.join('; ')}`);
        }
    }

    console.log(`\n${'─'.repeat(48)}`);
    console.log('New-check counts (findings, not articles):');
    console.log(`  ERROR price token → unknown/inactive product : ${STATS.tokenUnknownOrInactive}`);
    console.log(`  ERROR price token in disallowed field        : ${STATS.tokenDisallowedField}`);
    console.log(`  ERROR malformed price token                  : ${STATS.tokenMalformed}`);
    console.log(`  WARN  markup in quickAnswer / FAQ answers    : ${STATS.markupInAnswers}`);
    console.log(`  WARN  quickAnswer > 80 words                 : ${STATS.quickAnswerOver80}`);
    console.log(`  WARN  externalReferences → self-controlled   : ${STATS.selfControlledReferences}`);
    console.log(`  WARN  retailer authorized/official sentences : ${STATS.retailerClaimSentences}`);
    console.log(`  WARN  AR/EN price parity near product link   : ${STATS.arEnPriceParity}`);
    console.log(`  WARN  relatedArticles slug without a file    : ${STATS.relatedArticleMissingFile}`);
    if (PRICE_FLAG) {
        console.log(`  WARN  literal price ≠ catalogue (--prices)   : ${STATS.catalogPriceDrift}  [catalogue parsed: ${CATALOGUE.bySlug.size} products, ${[...CATALOGUE.bySlug.values()].filter((p) => p.price > 0).length} with a price]`);
    }
    console.log(`  info  articles using {{price:…}} tokens      : ${STATS.articlesWithTokens}`);
    console.log(`\n${'─'.repeat(48)}`);
    console.log(`الإجمالي: ${files.length} | ✅ ناجح: ${passed} | ❌ فاشل: ${failed}`);
    if (failed) {
        console.log(`🚫 BLOCKED — أصلح المقالات الفاشلة قبل الـ build/commit:`);
        console.log(`   ${failedSlugs.join(', ')}`);
        process.exit(1);
    }
    console.log('✅ PASS — كل الفحوصات نجحت.');
}

main();
