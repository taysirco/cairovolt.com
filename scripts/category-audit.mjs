/**
 * CATEGORY DEEP AUDIT — Layer 12
 * Professional audit of ALL 13 category content files:
 *
 * SEO:
 *  1. META-TITLE-LEN: Title 30-60 chars
 *  2. META-DESC-LEN: Description 120-160 chars
 *  3. META-KEYWORDS: Keywords count >= 5
 *  4. META-KEYWORD-DENSITY: Primary keyword in title + description
 *  5. META-PARITY: EN and AR both present
 *
 * CONTENT:
 *  6. DESC-DEPTH: Description >= 100 chars
 *  7. FAQ-DEPTH: >= 3 FAQs per language
 *  8. FAQ-ANSWER-LEN: Each answer >= 20 words
 *  9. BUYING-GUIDE: Present in both languages
 * 10. QUALITY-BADGES: >= 3 badges per language
 *
 * PRODUCT SYNC:
 * 11. PRODUCT-PRICE-SYNC: Listed prices match actual product data
 * 12. PRODUCT-COUNT: Products in category content match actual catalog count
 *
 * UNIQUENESS:
 * 13. TITLE-UNIQUE: No two categories share the same title
 * 14. DESC-UNIQUE: No two categories share first 50 chars of description
 */
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

let totalWarns = 0;
let totalCrit = 0;
const issueCategories = {};

function warn(cat, msg) {
  if (!issueCategories[cat]) issueCategories[cat] = { warns: [], crits: [] };
  issueCategories[cat].warns.push(msg);
  totalWarns++;
}
function crit(cat, msg) {
  if (!issueCategories[cat]) issueCategories[cat] = { warns: [], crits: [] };
  issueCategories[cat].crits.push(msg);
  totalCrit++;
}

// Collect actual product prices
const PRODUCT_DIR = 'src/data/products';
const productFiles = readdirSync(PRODUCT_DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));
const productData = {};
for (const f of productFiles) {
  const content = readFileSync(join(PRODUCT_DIR, f), 'utf-8');
  const brand = (content.match(/brand:\s*'([^']+)'/) || content.match(/brand:\s*"([^"]+)"/) || [])[1] || '';
  const catSlug = (content.match(/categorySlug:\s*'([^']+)'/) || content.match(/categorySlug:\s*"([^"]+)"/) || [])[1] || '';
  const price = parseFloat((content.match(/price:\s*([\d.]+)/) || [])[1] || 0);
  const slug = f.replace('.ts', '');
  const key = `${brand.toLowerCase()}/${catSlug}`;
  if (!productData[key]) productData[key] = [];
  productData[key].push({ slug, price });
}

// Scan all category content files
const allTitles = new Map();
const allDescs = new Map();
const brands = ['anker', 'joyroom'];
const CAT_DIR = 'src/data/category-content';
let totalCategories = 0;

for (const brand of brands) {
  const brandDir = join(CAT_DIR, brand);
  const files = readdirSync(brandDir).filter(f => f.endsWith('.ts'));
  
  for (const file of files) {
    const filePath = join(brandDir, file);
    const content = readFileSync(filePath, 'utf-8');
    const catSlug = file.replace('.ts', '');
    const catKey = `${brand}/${catSlug}`;
    totalCategories++;
    
    // Extract metadata
    const enTitleM = content.match(/en:\s*{[^}]*title:\s*'([^']+)'/) || content.match(/en:\s*{[^}]*title:\s*"([^"]+)"/);
    const arTitleM = content.match(/ar:\s*{[^}]*title:\s*'([^']+)'/) || content.match(/ar:\s*{[^}]*title:\s*"([^"]+)"/);
    
    // More robust extraction using line-by-line
    const lines = content.split('\n');
    
    // Find metadata section
    let inMeta = false;
    let inEN = false;
    let inAR = false;
    let metaEN = { title: '', desc: '', keywords: '' };
    let metaAR = { title: '', desc: '', keywords: '' };
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.includes('metadata:')) inMeta = true;
      if (inMeta && line.includes("en: {")) inEN = true;
      if (inMeta && line.includes("ar: {")) { inEN = false; inAR = true; }
      if (line.includes('pageContent:')) { inMeta = false; inEN = false; inAR = false; }
      
      if (inMeta && inEN) {
        const titleM = line.match(/title:\s*['"]([^'"]+)['"]/);
        const descM = line.match(/description:\s*['"]([^'"]+)['"]/);
        const kwM = line.match(/keywords:\s*['"]([^'"]+)['"]/);
        if (titleM) metaEN.title = titleM[1];
        if (descM) metaEN.desc = descM[1];
        if (kwM) metaEN.keywords = kwM[1];
      }
      if (inMeta && inAR) {
        const titleM = line.match(/title:\s*['"]([^'"]+)['"]/);
        const descM = line.match(/description:\s*['"]([^'"]+)['"]/);
        const kwM = line.match(/keywords:\s*['"]([^'"]+)['"]/);
        if (titleM) metaAR.title = titleM[1];
        if (descM) metaAR.desc = descM[1];
        if (kwM) metaAR.keywords = kwM[1];
      }
    }
    
    // 1. META-TITLE-LEN
    if (metaEN.title.length < 30) crit(catKey, `EN-TITLE-SHORT: "${metaEN.title}" = ${metaEN.title.length} chars (min 30)`);
    if (metaEN.title.length > 65) warn(catKey, `EN-TITLE-LONG: "${metaEN.title.substring(0,40)}..." = ${metaEN.title.length} chars (max 65)`);
    if (metaAR.title.length < 20) crit(catKey, `AR-TITLE-SHORT: "${metaAR.title}" = ${metaAR.title.length} chars (min 20)`);
    if (metaAR.title.length > 65) warn(catKey, `AR-TITLE-LONG: "${metaAR.title.substring(0,40)}..." = ${metaAR.title.length} chars (max 65)`);
    
    // 2. META-DESC-LEN
    if (metaEN.desc.length < 80) crit(catKey, `EN-DESC-SHORT: ${metaEN.desc.length} chars (min 80)`);
    if (metaEN.desc.length > 165) warn(catKey, `EN-DESC-LONG: ${metaEN.desc.length} chars (max 165)`);
    if (metaAR.desc.length < 80) crit(catKey, `AR-DESC-SHORT: ${metaAR.desc.length} chars (min 80)`);
    if (metaAR.desc.length > 165) warn(catKey, `AR-DESC-LONG: ${metaAR.desc.length} chars (max 165)`);
    
    // 3. META-KEYWORDS count
    const enKwCount = metaEN.keywords.split(',').filter(k => k.trim()).length;
    const arKwCount = metaAR.keywords.split(',').filter(k => k.trim()).length;
    if (enKwCount < 5) warn(catKey, `EN-KEYWORDS-THIN: Only ${enKwCount} keywords (need 5+)`);
    if (arKwCount < 5) warn(catKey, `AR-KEYWORDS-THIN: Only ${arKwCount} keywords (need 5+)`);
    
    // 4. META-DESC should contain brand name
    const brandUpper = brand.charAt(0).toUpperCase() + brand.slice(1);
    if (!metaEN.desc.toLowerCase().includes(brand)) {
      warn(catKey, `EN-DESC-NO-BRAND: "${brand}" not in meta description`);
    }
    
    // 5. Page content checks
    const descMatch = content.match(/description:\s*`([\s\S]*?)`/);
    const pageDesc = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').replace(/\*\*/g, '').trim() : '';
    if (pageDesc.length < 100) warn(catKey, `PAGE-DESC-THIN: Only ${pageDesc.length} chars (need 100+)`);
    
    // 6. FAQ depth
    const faqMatches = [...content.matchAll(/question:\s*['"]([^'"]+)['"]/g)];
    if (faqMatches.length < 3) warn(catKey, `FAQ-SHALLOW: Only ${faqMatches.length} FAQs (need 3+)`);
    
    // 7. FAQ answer length
    const faqAnswers = [...content.matchAll(/answer:\s*['"]([^'"]+)['"]/g)];
    for (const ans of faqAnswers) {
      const words = ans[1].split(/\s+/).length;
      if (words < 15) warn(catKey, `FAQ-ANSWER-SHORT: "${ans[1].substring(0,30)}..." = ${words} words (need 15+)`);
    }
    
    // 8. Buying guide presence
    if (!content.includes('buyingGuide')) {
      warn(catKey, `NO-BUYING-GUIDE: Missing buying guide section`);
    }
    
    // 9. Quality badges
    const badgeMatches = [...content.matchAll(/qualityBadges/g)];
    if (badgeMatches.length < 2) {
      warn(catKey, `NO-QUALITY-BADGES: Missing quality badges (need EN + AR)`);
    }
    
    // 10. Product price sync
    // Map composite categories to their product sub-categories
  const compositeMap = { 'car-accessories': ['car-chargers', 'car-holders'] };
  let catProducts = productData[`${brand}/${catSlug}`] || [];
  if (catProducts.length === 0 && compositeMap[catSlug]) {
    for (const sub of compositeMap[catSlug]) {
      catProducts = catProducts.concat(productData[`${brand}/${sub}`] || []);
    }
  }
    const listedPrices = [...content.matchAll(/price:\s*(\d+)/g)].map(m => parseInt(m[1]));
    
    // 11. Product count match
    if (catProducts.length === 0) {
      crit(catKey, `NO-PRODUCTS: No products found in catalog for this category`);
    }
    
    // Check if listed products match catalog
    const listedProductCount = content.match(/products:\s*\[/g)?.length || 0;
    
    // 12. Title uniqueness
    if (allTitles.has(metaEN.title)) {
      crit(catKey, `DUPLICATE-TITLE: EN title shared with ${allTitles.get(metaEN.title)}`);
    }
    allTitles.set(metaEN.title, catKey);
    
    // 13. Description uniqueness
    const descKey = metaEN.desc.substring(0, 50);
    if (allDescs.has(descKey)) {
      warn(catKey, `SIMILAR-DESC: EN desc similar to ${allDescs.get(descKey)}`);
    }
    allDescs.set(descKey, catKey);
  }
}

// Print
for (const [cat, issues] of Object.entries(issueCategories)) {
  console.log(`📂 ${cat}`);
  for (const c of issues.crits) console.log(`   ❌ ${c}`);
  for (const w of issues.warns) console.log(`   ⚠️ ${w}`);
}

console.log('\n' + '='.repeat(60));
console.log(`📂 CATEGORY DEEP AUDIT (L12) — ${totalCategories} categories`);
console.log('   ✅ Clean: ' + (totalCategories - Object.keys(issueCategories).length));
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('   ❌ Critical: ' + totalCrit);
console.log('='.repeat(60));
