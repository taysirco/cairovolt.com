#!/usr/bin/env node
/**
 * detect-new-articles.mjs
 * يكتشف المقالات الجديدة المضافة في آخر commit ويُصدّر بياناتها كـ GitHub Actions outputs
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync, appendFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = resolve(__dirname, '..');

// ─── Helper: GitHub Actions output ───────────────────────────────────────────
function setOutput(name, value) {
  const safeValue = String(value)
    .replace(/\r/g, '%0D')
    .replace(/\n/g, '%0A');

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${safeValue}\n`);
  }
  // Fallback للـ logs
  console.log(`  OUTPUT >> ${name}=${safeValue.substring(0, 80)}${safeValue.length > 80 ? '...' : ''}`);
}

// ─── 1. هل في FORCE_SLUG من الـ workflow_dispatch؟ ───────────────────────────
const forceSlug = process.env.FORCE_SLUG?.trim();
let targetSlug = null;

if (forceSlug) {
  console.log(`🎯 Force slug محدد: ${forceSlug}`);
  targetSlug = forceSlug;
} else {
  // ─── 2. اكتشف الملفات المضافة في آخر commit ─────────────────────────────
  try {
    const diff = execSync(
      'git diff --name-status HEAD~1 HEAD -- "src/data/blog/"',
      { cwd: projectRoot, encoding: 'utf8' }
    ).trim();

    if (!diff) {
      console.log('ℹ️ لا توجد تغييرات في مجلد المدونة');
      setOutput('has_new_article', 'false');
      process.exit(0);
    }

    console.log('📂 تغييرات git مكتشفة:');
    console.log(diff);

    const lines = diff.split('\n').filter(Boolean);

    // Regex لاستخراج الـ slug من المسار
    const blogFileRegex = /src\/data\/blog\/([a-z0-9_-]+)\.ts$/;
    const excluded = ['_types', 'index'];

    const parseSlug = (line) => {
      const parts = line.split('\t');
      const filePath = parts[parts.length - 1]; // آخر عمود هو المسار
      const match = filePath.match(blogFileRegex);
      if (!match) return null;
      const slug = match[1];
      if (excluded.some(ex => slug.startsWith(ex))) return null;
      return slug;
    };

    // أولوية: مضافة (A) > معدّلة (M)
    const added    = lines.filter(l => l.startsWith('A')).map(parseSlug).filter(Boolean);
    const modified = lines.filter(l => l.startsWith('M')).map(parseSlug).filter(Boolean);
    const all      = [...added, ...modified];

    if (all.length === 0) {
      console.log('ℹ️ لا يوجد مقالات جديدة قابلة للنشر في هذا الـ push');
      setOutput('has_new_article', 'false');
      process.exit(0);
    }

    targetSlug = all[0];
    console.log(`\n✅ مقال سيُنشر: ${targetSlug}`);
    if (all.length > 1) {
      console.log(`   (مقالات أخرى لم تُنشر هذه المرة: ${all.slice(1).join(', ')})`);
    }

  } catch (err) {
    if (err.message.includes('HEAD~1') || err.message.includes('unknown revision')) {
      console.log('⚠️ لا يوجد commit سابق (ربما أول push) — لا شيء يُنشر');
    } else {
      console.warn('⚠️ خطأ في git diff:', err.message);
    }
    setOutput('has_new_article', 'false');
    process.exit(0);
  }
}

// ─── 3. اقرأ بيانات المقال من الملف ─────────────────────────────────────────
const articleFile = resolve(projectRoot, `src/data/blog/${targetSlug}.ts`);

if (!existsSync(articleFile)) {
  console.error(`❌ الملف غير موجود: ${articleFile}`);
  setOutput('has_new_article', 'false');
  process.exit(0);
}

const content = readFileSync(articleFile, 'utf8');

// ─── استخرج البيانات بـ Regex ────────────────────────────────────────────────
function extractField(fieldName) {
  // يدعم: fieldName: 'value' | "value" | `value`
  const patterns = [
    new RegExp(`\\b${fieldName}:\\s*['"\`]([^'"\`\\n]+)['"\`]`),
    new RegExp(`\\b${fieldName}:\\s*([0-9]+)`),
  ];
  for (const p of patterns) {
    const m = content.match(p);
    if (m?.[1]) return m[1].trim();
  }
  return '';
}

// استخرج العنوان العربي (داخل translations.ar.title)
function extractArTitle() {
  // ابحث عن قسم ar: { ... title: '...'
  const arSection = content.match(/\bar:\s*\{([\s\S]+?)(?:\ben:\s*\{|^\s*\})/m)?.[1] || '';
  const m = arSection.match(/\btitle:\s*['"`]([^'"`\n]+)['"`]/);
  return m?.[1]?.trim() || extractField('title');
}

function extractArExcerpt() {
  const arSection = content.match(/\bar:\s*\{([\s\S]+?)(?:\ben:\s*\{|^\s*\})/m)?.[1] || '';
  const m = arSection.match(/\bexcerpt:\s*['"`]([^'"`\n]+)['"`]/);
  return m?.[1]?.trim() || extractField('excerpt');
}

const slug        = targetSlug;
const titleAr     = extractArTitle();
const excerptAr   = extractArExcerpt();
const category    = extractField('category');
const readingTime = extractField('readingTime') || '5';
const coverRaw    = extractField('coverImage');
const coverImage  = coverRaw.split('?')[0]; // أزل query params
const articleUrl  = `https://cairovolt.com/blog/${slug}`;

console.log('\n📋 بيانات المقال:');
console.log(`  Slug:         ${slug}`);
console.log(`  Title AR:     ${titleAr}`);
console.log(`  Excerpt AR:   ${excerptAr.substring(0, 60)}...`);
console.log(`  Category:     ${category}`);
console.log(`  Reading Time: ${readingTime} دقائق`);
console.log(`  Cover:        ${coverImage || '(لا توجد صورة)'}`);
console.log(`  URL:          ${articleUrl}`);

// ─── 4. صدّر الـ outputs ──────────────────────────────────────────────────────
console.log('\n📤 تصدير الـ outputs...');
setOutput('has_new_article',      'true');
setOutput('article_slug',         slug);
setOutput('article_title_ar',     titleAr);
setOutput('article_excerpt_ar',   excerptAr);
setOutput('article_cover',        coverImage);
setOutput('article_category',     category);
setOutput('article_reading_time', readingTime);
setOutput('article_url',          articleUrl);

console.log('\n✅ اكتمل الكشف بنجاح!');
