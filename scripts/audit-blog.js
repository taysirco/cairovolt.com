#!/usr/bin/env node
/**
 * CairoVolt Blog Audit Gate — the REAL enforcement behind §16-A.
 *
 * Validates each blog article against the unbreakable content laws:
 *   - AR content >= 1,300 words  (strip HTML)
 *   - EN content >= 1,300 words
 *   - i18n quarantine: AR internal links have NO /en/ prefix; EN internal links MUST have /en/
 *   - FAQ === 4 per language
 *   - quickAnswer present per language
 *   - coverImage present
 *   - relatedArticles === 3
 *   - (warning) relatedProducts between 5 and 6
 *
 * Usage:
 *   node scripts/audit-blog.js {slug}   # audit one article
 *   node scripts/audit-blog.js          # audit all published articles
 *
 * Exits 1 if any HARD rule fails. Warnings never fail the build.
 */
'use strict';

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

    return { slug, errors, warnings, arWords, enWords };
}

function main() {
    const arg = process.argv[2];
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
    console.log(`الإجمالي: ${files.length} | ✅ ناجح: ${passed} | ❌ فاشل: ${failed}`);
    if (failed) {
        console.log(`🚫 BLOCKED — أصلح المقالات الفاشلة قبل الـ build/commit:`);
        console.log(`   ${failedSlugs.join(', ')}`);
        process.exit(1);
    }
    console.log('✅ PASS — كل الفحوصات نجحت.');
}

main();
