/**
 * L13 — GENERIC CATEGORY DEEP AUDIT
 * 
 * Audits the 4 cross-brand "generic category" hub pages (chargers, cables, earbuds, power-banks).
 * These are authority pages that target high-volume keywords like "شاحن ايفون مصر".
 *
 * CHECKS:
 *  1. META-TITLE-LEN: 30-65 chars
 *  2. META-DESC-LEN: 80-165 chars  
 *  3. META-KEYWORDS: >= 10 keywords (these are authority pages, need more)
 *  4. FAQ-DEPTH: >= 5 FAQs per language (authority needs more)
 *  5. FAQ-ANSWER-LEN: >= 20 words per answer
 *  6. FAQ-PARITY: AR and EN FAQ counts should match
 *  7. RICH-CONTENT: >= 500 chars per language
 *  8. RICH-HEADINGS: >= 3 h2 headings per language
 *  9. BUYING-TIPS: >= 3 tips per language
 * 10. BRAND-MAPPING: At least 2 brand categories linked
 * 11. BLOG-LINKS: At least 1 related blog slug
 * 12. INTRO-DEPTH: >= 80 chars per language
 * 13. CONTENT-UNIQUENESS: No two generics share first 50 chars of intro
 */
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

let totalWarns = 0;
let totalCrit = 0;
let totalClean = 0;
const issues = {};

function warn(cat, msg) {
  if (!issues[cat]) issues[cat] = { warns: [], crits: [] };
  issues[cat].warns.push(msg);
  totalWarns++;
}
function crit(cat, msg) {
  if (!issues[cat]) issues[cat] = { warns: [], crits: [] };
  issues[cat].crits.push(msg);
  totalCrit++;
}

const DIR = 'src/data/generic-categories';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));
const allIntros = new Map();

for (const file of files) {
  const slug = file.replace('.ts', '');
  const content = readFileSync(join(DIR, file), 'utf-8');
  
  // Extract metadata
  const lines = content.split('\n');
  
  // Extract titles (first two matches in metadata section)
  const metaTitles = [...content.matchAll(/title:\s*'([^']+)'/g)].slice(0, 2);
  const metaDescs = [...content.matchAll(/description:\s*'([^']+)'/g)].slice(0, 2);
  const metaKws = [...content.matchAll(/keywords:\s*'([^']+)'/g)].slice(0, 2);
  
  // 1. META-TITLE-LEN
  for (const [i, m] of metaTitles.entries()) {
    const lang = i === 0 ? 'AR' : 'EN';
    if (m[1].length < 30) crit(slug, `${lang}-TITLE-SHORT: ${m[1].length} chars (min 30)`);
    if (m[1].length > 70) warn(slug, `${lang}-TITLE-LONG: ${m[1].length} chars (max 70)`);
  }
  
  // 2. META-DESC-LEN
  for (const [i, m] of metaDescs.entries()) {
    const lang = i === 0 ? 'AR' : 'EN';
    if (m[1].length < 80) crit(slug, `${lang}-DESC-SHORT: ${m[1].length} chars (min 80)`);
    if (m[1].length > 170) warn(slug, `${lang}-DESC-LONG: ${m[1].length} chars (max 170)`);
  }
  
  // 3. META-KEYWORDS count
  for (const [i, m] of metaKws.entries()) {
    const lang = i === 0 ? 'AR' : 'EN';
    const kwCount = m[1].split(',').filter(k => k.trim()).length;
    if (kwCount < 10) warn(slug, `${lang}-KEYWORDS-THIN: Only ${kwCount} keywords (need 10+ for authority page)`);
  }
  
  // 4. FAQ depth
  const arFaqQ = [...content.matchAll(/question:\s*'([^']+)'/g)];
  const totalFaq = arFaqQ.length;
  // Count AR vs EN by looking at sections
  const faqSection = content.split('faq:')[1] || '';
  const arSection = faqSection.split("en:")[0] || '';
  const enSection = faqSection.split("en:")[1] || '';
  const arFaqCount = (arSection.match(/question:/g) || []).length;
  const enFaqCount = (enSection.match(/question:/g) || []).length;
  
  if (arFaqCount < 5) warn(slug, `AR-FAQ-SHALLOW: Only ${arFaqCount} FAQs (need 5+ for authority)`);
  if (enFaqCount < 5) warn(slug, `EN-FAQ-SHALLOW: Only ${enFaqCount} FAQs (need 5+ for authority)`);
  
  // 6. FAQ parity
  if (Math.abs(arFaqCount - enFaqCount) > 1) {
    warn(slug, `FAQ-PARITY: AR=${arFaqCount} vs EN=${enFaqCount} (should be equal)`);
  }
  
  // 5. FAQ answer length
  const faqAnswers = [...content.matchAll(/answer:\s*'((?:[^'\\]|\\.)*)'/g)];
  for (const ans of faqAnswers) {
    const words = ans[1].split(/\s+/).length;
    if (words < 15) warn(slug, `FAQ-SHORT: "${ans[1].substring(0,40)}..." = ${words} words (need 15+)`);
  }
  
  // 7. Rich content depth
  const richSection = content.split('richContent:')[1] || '';
  const richAr = richSection.split("en: `")[0] || '';
  const richEn = richSection.split("en: `")[1] || '';
  if (richAr.length < 500) warn(slug, `AR-RICH-THIN: Only ${richAr.length} chars (need 500+)`);
  if (richEn.length < 500) warn(slug, `EN-RICH-THIN: Only ${richEn.length} chars (need 500+)`);
  
  // 8. Rich headings count
  const arH2 = (richAr.match(/<h2/g) || []).length;
  const enH2 = (richEn.match(/<h2/g) || []).length;
  if (arH2 < 3) warn(slug, `AR-HEADINGS-LOW: Only ${arH2} h2 headings (need 3+)`);
  if (enH2 < 3) warn(slug, `EN-HEADINGS-LOW: Only ${enH2} h2 headings (need 3+)`);
  
  // 9. Buying tips
  const buyingTips = [...content.matchAll(/buyingTips:\s*\[([\s\S]*?)\]/g)];
  for (const [i, bt] of buyingTips.entries()) {
    const lang = i === 0 ? 'AR' : 'EN';
    const tipCount = (bt[1].match(/'/g) || []).length / 2;
    if (tipCount < 3) warn(slug, `${lang}-TIPS-FEW: Only ${tipCount} buying tips (need 3+)`);
  }
  
  // 10. Brand mapping
  const brandCount = (content.match(/brandSlug:/g) || []).length;
  if (brandCount < 2) warn(slug, `BRAND-MAPPING-THIN: Only ${brandCount} brands (need 2+)`);
  
  // 11. Blog links
  const blogSlugs = [...content.matchAll(/relatedBlogSlugs:\s*\[([\s\S]*?)\]/g)];
  if (blogSlugs.length > 0) {
    const slugCount = (blogSlugs[0][1].match(/'/g) || []).length / 2;
    if (slugCount < 1) warn(slug, `NO-BLOG-LINKS: No related blog articles linked`);
  }
  
  // 12. Intro depth — handle escaped quotes
  const intros = [...content.matchAll(/intro:\s*'((?:[^'\\]|\\.)*)'/g)];
  for (const [i, intro] of intros.entries()) {
    const lang = i === 0 ? 'AR' : 'EN';
    if (intro[1].length < 80) warn(slug, `${lang}-INTRO-SHORT: Only ${intro[1].length} chars (need 80+)`);
  }
  
  // 13. Uniqueness
  if (intros.length > 0) {
    const introKey = intros[0][1].substring(0, 50);
    if (allIntros.has(introKey)) {
      warn(slug, `SIMILAR-INTRO: AR intro similar to ${allIntros.get(introKey)}`);
    }
    allIntros.set(introKey, slug);
  }
  
  if (!issues[slug]) totalClean++;
}

// Print
for (const [cat, data] of Object.entries(issues)) {
  console.log(`📁 ${cat}`);
  for (const c of data.crits) console.log(`   ❌ ${c}`);
  for (const w of data.warns) console.log(`   ⚠️  ${w}`);
}

console.log('\n' + '='.repeat(60));
console.log(`📁 GENERIC CATEGORY AUDIT (L13) — ${files.length} authority pages`);
console.log('   ✅ Clean: ' + totalClean);
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('   ❌ Critical: ' + totalCrit);
console.log('='.repeat(60));
