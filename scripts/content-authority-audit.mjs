/**
 * L16 — CONTENT AUTHORITY & SEMANTIC DEPTH AUDIT
 *
 * Advanced content quality checks:
 *  1. E-E-A-T signals (Experience, Expertise, Authority, Trust)
 *  2. Rich snippet qualification (FAQ, HowTo, Product)
 *  3. Content depth score (word count per category page)
 *  4. Internal link density (links between categories)
 *  5. Trust signals (warranty, guarantee, official mentions)
 *  6. Localization completeness (AR word count vs EN word count ratio)
 *  7. Conversion keyword density (buy, price, best, cheap, offer)
 *  8. Semantic keyword clustering (related terms coverage)
 */
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

let totalWarns = 0;
let totalCrit = 0;
let totalInfo = 0;

function warn(ctx, msg) { totalWarns++; console.log(`   ⚠️  [${ctx}] ${msg}`); }
function crit(ctx, msg) { totalCrit++; console.log(`   ❌ [${ctx}] ${msg}`); }
function info(ctx, msg) { totalInfo++; console.log(`   ℹ️  [${ctx}] ${msg}`); }

// ── CHECK 1: E-E-A-T Signals in Brand Categories ──
console.log('🏅 CHECK 1: E-E-A-T Trust Signals');
const brandDir = 'src/data/category-content';
const brands = readdirSync(brandDir).filter(f => !f.startsWith('_') && !f.endsWith('.ts'));

const trustSignals = ['warranty', 'ضمان', 'official', 'رسم', 'authorized', 'معتمد', 'test', 'اختبار', 'CairoVolt'];
let trustTotal = 0;
let trustMissing = 0;

for (const brand of brands) {
  const catFiles = readdirSync(join(brandDir, brand)).filter(f => f.endsWith('.ts'));
  for (const file of catFiles) {
    const slug = `${brand}/${file.replace('.ts', '')}`;
    const content = readFileSync(join(brandDir, brand, file), 'utf-8');
    trustTotal++;
    
    let trustCount = 0;
    for (const signal of trustSignals) {
      if (content.toLowerCase().includes(signal.toLowerCase())) trustCount++;
    }
    if (trustCount < 3) {
      warn('EEAT', `${slug}: Only ${trustCount}/${trustSignals.length} trust signals (need 3+)`);
      trustMissing++;
    }
  }
}
console.log(`   📊 Trust signal coverage: ${trustTotal - trustMissing}/${trustTotal} categories pass`);

// ── CHECK 2: Rich Snippet Qualification ──
console.log('⭐ CHECK 2: Rich Snippet Qualification');
for (const brand of brands) {
  const catFiles = readdirSync(join(brandDir, brand)).filter(f => f.endsWith('.ts'));
  for (const file of catFiles) {
    const slug = `${brand}/${file.replace('.ts', '')}`;
    const content = readFileSync(join(brandDir, brand, file), 'utf-8');
    
    const hasFaq = content.includes('faq:');
    const hasBuyingGuide = content.includes('buyingGuide:');
    const hasBadges = content.includes('qualityBadges:');
    
    if (!hasFaq) warn('SNIPPET', `${slug}: Missing FAQ (loses FAQ rich snippet)`);
    if (!hasBuyingGuide) warn('SNIPPET', `${slug}: Missing BuyingGuide (loses HowTo rich snippet)`);
  }
}

// ── CHECK 3: Content Depth Score ──
console.log('📏 CHECK 3: Content Depth Score (word count)');
const genDir = 'src/data/generic-categories';
const genFiles = readdirSync(genDir).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

for (const file of genFiles) {
  const slug = file.replace('.ts', '');
  const content = readFileSync(join(genDir, file), 'utf-8');
  
  // Count total text content (excluding code)
  const textOnly = content.replace(/[{}\[\]()=>;:,`<>\/]/g, ' ');
  const wordCount = textOnly.split(/\s+/).filter(w => w.length > 2).length;
  
  if (wordCount < 300) warn('DEPTH', `${slug}: Only ~${wordCount} content words (thin authority page)`);
  else info('DEPTH', `${slug}: ~${wordCount} content words ✅`);
}

// ── CHECK 4: Conversion Keyword Density ──
console.log('💎 CHECK 4: Conversion Keyword Density');
const conversionKeywords = {
  ar: ['شراء', 'سعر', 'أفضل', 'رخيص', 'عرض', 'خصم', 'توصيل', 'ضمان', 'أصلي', 'مصر'],
  en: ['buy', 'price', 'best', 'cheap', 'offer', 'discount', 'delivery', 'warranty', 'original', 'egypt']
};

for (const brand of brands) {
  const catFiles = readdirSync(join(brandDir, brand)).filter(f => f.endsWith('.ts'));
  for (const file of catFiles) {
    const slug = `${brand}/${file.replace('.ts', '')}`;
    const content = readFileSync(join(brandDir, brand, file), 'utf-8').toLowerCase();
    
    let arHits = 0, enHits = 0;
    for (const kw of conversionKeywords.ar) {
      if (content.includes(kw)) arHits++;
    }
    for (const kw of conversionKeywords.en) {
      if (content.includes(kw)) enHits++;
    }
    
    if (arHits < 4) warn('CONV', `${slug}: AR has only ${arHits}/10 conversion keywords`);
    if (enHits < 4) warn('CONV', `${slug}: EN has only ${enHits}/10 conversion keywords`);
  }
}

// ── CHECK 5: AR/EN Content Balance ──
console.log('⚖️  CHECK 5: AR/EN Content Balance');
for (const file of genFiles) {
  const slug = file.replace('.ts', '');
  const content = readFileSync(join(genDir, file), 'utf-8');
  
  // Use richContent as the most reliable indicator of content balance
  const richMatch = content.match(/richContent:\s*\{([\s\S]*)\}/);
  if (richMatch) {
    const richBlock = richMatch[1];
    const arRich = richBlock.split("en: `")[0] || '';
    const enRich = richBlock.split("en: `")[1] || '';
    
    if (arRich.length > 0 && enRich.length > 0) {
      const ratio = enRich.length / arRich.length;
      if (ratio < 0.3 || ratio > 3.0) {
        warn('BALANCE', `${slug}: Rich content AR/EN ratio ${ratio.toFixed(2)} (should be 0.3-3.0)`);
      }
    }
  }
}

// ── CHECK 6: Internal Linking Between Categories ──
console.log('🔗 CHECK 6: Cross-Category Linking');
for (const file of genFiles) {
  const slug = file.replace('.ts', '');
  const content = readFileSync(join(genDir, file), 'utf-8');
  
  // Check if rich content links to other categories
  const otherCategories = genFiles.map(f => f.replace('.ts', '')).filter(f => f !== slug);
  let crossLinks = 0;
  for (const other of otherCategories) {
    if (content.includes(`/${other}`) || content.includes(`href="${other}"`)) crossLinks++;
  }
  
  if (crossLinks === 0) info('LINKS', `${slug}: No cross-links to other generic categories`);
}

// ── CHECK 7: Meta Description Keyword Optimization ──
console.log('🎯 CHECK 7: Meta Description Keyword Optimization');
for (const brand of brands) {
  const catFiles = readdirSync(join(brandDir, brand)).filter(f => f.endsWith('.ts'));
  for (const file of catFiles) {
    const slug = `${brand}/${file.replace('.ts', '')}`;
    const content = readFileSync(join(brandDir, brand, file), 'utf-8');
    
    // Check if meta description contains primary keyword (brand + category)
    const descs = [...content.matchAll(/description:\s*'((?:[^'\\]|\\.)*)'/g)];
    const catName = file.replace('.ts', '').replace(/-/g, ' ');
    
    for (const [i, desc] of descs.entries()) {
      const lang = i === 0 ? 'AR' : 'EN';
      if (lang === 'EN') {
        if (!desc[1].toLowerCase().includes(brand.toLowerCase())) {
          info('META', `${slug}: EN desc doesn't mention brand "${brand}"`);
        }
      }
    }
  }
}

console.log('\n' + '='.repeat(60));
console.log(`🏅 CONTENT AUTHORITY AUDIT (L16)`);
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('   ❌ Critical: ' + totalCrit);
console.log('   ℹ️  Info: ' + totalInfo);
if (totalWarns === 0 && totalCrit === 0) console.log('   ✅ ALL CHECKS PASSED');
console.log('='.repeat(60));
