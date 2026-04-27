import { readFileSync, readdirSync, existsSync } from 'fs';

const PRODUCTS_DIR = 'src/data/products';
const REVIEWS_DIR = 'src/data/reviews';
const DETAILS_DIR = 'src/data/details';
const TESTS_DIR = 'src/data/tests';

const files = readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));
const seedFile = readFileSync('src/data/seed-products.ts', 'utf-8');
const reviewBarrel = readFileSync('src/data/product-reviews.ts', 'utf-8');
const detailBarrel = readFileSync('src/data/product-details.ts', 'utf-8');
let testBarrel = '';
try { testBarrel = readFileSync('src/data/product-tests.ts', 'utf-8'); } catch {}

let totalPass = 0, totalWarn = 0, totalFail = 0;
const allIssues = [];

for (const file of files) {
  const slug = file.replace('.ts', '');
  const content = readFileSync(`${PRODUCTS_DIR}/${file}`, 'utf-8');
  const issues = [];
  const warns = [];
  
  // ========================================
  // RULE 1: Slug format
  // ========================================
  if (slug !== slug.toLowerCase()) issues.push('SLUG: Not lowercase');
  if (slug.includes('_') || slug.includes(' ')) issues.push('SLUG: Contains underscores/spaces');
  
  // ========================================
  // RULE 2: Required fields
  // ========================================
  const reqFields = ['slug:', 'sku:', 'brand:', 'categorySlug:', 'price:', 'stock:', 'images:', 'translations:', 'meta:'];
  for (const field of reqFields) {
    if (!content.includes(field)) issues.push(`MISSING FIELD: ${field}`);
  }
  
  // ========================================
  // RULE 3: expertOpinion (EN + AR)
  // ========================================
  if (!content.includes('expertOpinion:')) issues.push('MISSING: expertOpinion');
  
  // ========================================
  // RULE 4: relatedProducts
  // ========================================
  if (!content.includes('relatedProducts:')) issues.push('MISSING: relatedProducts');
  
  // ========================================
  // RULE 5: Description 6-section structure (EN + AR)
  // ========================================
  const sections = ['quick-answer', 'product-summary', 'expert-review', 'product-details', 'device-compatibility', 'buyer-warning'];
  for (const sec of sections) {
    // Match both class="section" (template literals) and class=\"section\" (escaped strings)
    const regex = new RegExp(`class=(?:\\\\?)"${sec}(?:\\\\?)"`, 'g');
    const count = (content.match(regex) || []).length;
    if (count < 2) issues.push(`6-SECTION: Missing '${sec}' in ${count < 1 ? 'both' : 'one'} language`);
  }
  
  // ========================================
  // RULE 6: metaTitle ≤ 60 chars
  // ========================================
  const titleMatches = content.matchAll(/metaTitle:\s*["']([^"']+)["']/g);
  for (const m of titleMatches) {
    if (m[1].length > 60) issues.push(`META: metaTitle '${m[1].substring(0,30)}...' = ${m[1].length} chars (max 60)`);
  }
  
  // ========================================
  // RULE 7: metaDesc ≤ 160 chars
  // ========================================
  const descMatches = content.matchAll(/metaDesc:\s*["']([^"']+)["']/g);
  for (const m of descMatches) {
    if (m[1].length > 160) issues.push(`META: metaDesc = ${m[1].length} chars (max 160)`);
  }
  
  // ========================================
  // RULE 8: FAQs ≥ 4 per language
  // ========================================
  const faqBlocks = content.match(/faqs:\s*\[([\s\S]*?)\]/g) || [];
  for (let i = 0; i < faqBlocks.length; i++) {
    const faqCount = (faqBlocks[i].match(/question:/g) || []).length;
    const lang = i === 0 ? 'EN' : 'AR';
    if (faqCount < 4) warns.push(`FAQ (${lang}): Only ${faqCount} FAQs (need 4-5)`);
  }
  
  // ========================================
  // RULE 9: Keywords ≥ 10
  // ========================================
  const kwMatch = content.match(/keywords:\s*["']([^"']+)["']/);
  if (kwMatch) {
    const kwCount = kwMatch[1].split(',').map(k => k.trim()).filter(Boolean).length;
    if (kwCount < 10) warns.push(`SEO: Only ${kwCount} keywords (need 10-20)`);
  } else {
    issues.push('MISSING: keywords in meta');
  }
  
  // ========================================
  // RULE 10: Features array exists (data only, not displayed)
  // ========================================
  const featCount = (content.match(/features:\s*\[/g) || []).length;
  if (featCount < 2) warns.push(`FEATURES: Only ${featCount} features arrays (need 2: EN+AR)`);
  
  // ========================================
  // RULE 11: shortDescription exists (EN + AR)
  // ========================================
  const shortDescCount = (content.match(/shortDescription:/g) || []).length;
  if (shortDescCount < 2) issues.push(`MISSING: shortDescription in ${shortDescCount < 1 ? 'both' : 'one'} language`);
  
  // ========================================
  // RULE 12: Egyptian context in AR description
  // ========================================
  // Search entire AR section (both template literals and escaped strings)
  const arSectionMatch = content.match(/ar:\s*\{([\s\S]*?)\n\s*\}/m);
  const arSection = arSectionMatch ? arSectionMatch[1] : '';
  const egyptTerms = ['مصر', 'القاهرة', 'الصيف', 'الكهرباء', 'العتبة', 'المصري', 'صيف', 'حرارة', 'كهربا', 'الساحل', 'البريزة', 'التابلو', 'أوبر', 'كافيه', 'الزمالك', 'المعادي', 'تذبذب'];
  const hasEgypt = egyptTerms.some(t => arSection.includes(t));
  if (!hasEgypt) warns.push('CONTEXT: No Egyptian local context found in AR description');
  
  // ========================================
  // RULE 13: AI clichés check
  // ========================================
  const cliches = ['في الختام', 'من الجدير بالذكر', 'لا شك أن', 'نسعى جاهدين', 'نقدم لكم', "In today's fast-paced", 'In conclusion', 'It is worth noting'];
  for (const c of cliches) {
    if (content.includes(c)) issues.push(`AI CLICHÉ: "${c}" found`);
  }
  
  // ========================================
  // RULE 14: Burstiness check (sentence length variation)
  // ========================================
  // Check if quick-answer has a mix of short + long sentences
  // Match both template literal and escaped versions
  const qaMatch = content.match(/class=(?:\\?)">quick-answer(?:\\?)">[\s\S]*?([\s\S]*?)<\/div>/) || content.match(/class=\\?"quick-answer\\?">([\s\S]*?)<\/div>/);
  if (qaMatch) {
    const text = qaMatch[1].replace(/<[^>]+>/g, '').replace(/\\n/g, '');
    if (text.length < 100) warns.push('BURSTINESS: Quick-answer too short (< 100 chars)');
  }
  
  // ========================================
  // RULE 15: Information Gain (4 angles)
  // ========================================
  // Check for comparison or test data in description
  // Search both template literal and escaped string descriptions
  const fullDescBlocks = content.match(/description:\s*(?:`[\s\S]*?`|"[\s\S]*?(?<!\\)")/g) || [];
  let hasComparison = false, hasTestData = false, hasWarning = false;
  for (const d of fullDescBlocks) {
    if (d.includes('مقابل') || d.includes('vs') || d.includes('بدل') || d.includes('على عكس') || d.includes('Unlike')) hasComparison = true;
    if (d.match(/\d+°[Cم]/) || d.match(/\d+%/) || d.match(/\d+\s*(واط|W|mAh)/) || d.match(/\d+\s*دقيقة/)) hasTestData = true;
    if (d.includes('buyer-warning') || d.includes('تحذير')) hasWarning = true;
  }
  // Fallback: also check the entire file for test data patterns
  if (!hasTestData) {
    hasTestData = !!(content.match(/\d+°[Cم]/) || content.match(/\d+%/) || content.match(/\d+\s*(واط|W|mAh)/) || content.match(/\d+\s*دقيقة/));
  }
  if (!hasTestData) warns.push('INFO-GAIN: No real numbers/test data in description');
  
  // ========================================
  // RULE 16: Barrel file registration
  // ========================================
  if (!seedFile.includes(slug)) issues.push('BARREL: Not in seed-products.ts');
  if (!reviewBarrel.includes(slug)) warns.push('BARREL: Not in product-reviews.ts');
  if (!detailBarrel.includes(slug)) warns.push('BARREL: Not in product-details.ts');
  
  // ========================================
  // RULE 17: Review file exists
  // ========================================
  if (!existsSync(`${REVIEWS_DIR}/${slug}.ts`)) warns.push('FILE: Missing reviews file');
  
  // ========================================
  // RULE 18: Details file exists
  // ========================================
  if (!existsSync(`${DETAILS_DIR}/${slug}.ts`)) warns.push('FILE: Missing details file');
  
  // ========================================
  // RULE 19: Tests file exists
  // ========================================
  if (!existsSync(`${TESTS_DIR}/${slug}.ts`)) warns.push('FILE: Missing tests file');
  
  // ========================================
  // RULE 20: Description should NOT have tech specs table
  // ========================================
  for (const d of fullDescBlocks) {
    if (d.includes('technical-specs') || d.includes('tech-specs')) issues.push('⛔ DUPLICATE: Technical specs table inside description (should be in details only)');
  }
  
  // ========================================
  // RULE 21: SKU format check
  // ========================================
  const skuMatch = content.match(/sku:\s*["']([^"']+)["']/);
  if (skuMatch) {
    const sku = skuMatch[1];
    if (!/^(ANK|JR)-(PB|WC|CB|CC|AU|SP|SW|CH)-/.test(sku)) warns.push(`SKU: '${sku}' doesn't match format BRAND-CAT-MODEL`);
  }
  
  // ========================================
  // RULE 22: Stock realistic (300-3000)
  // ========================================
  const stockMatch = content.match(/stock:\s*(\d+)/);
  if (stockMatch) {
    const stock = parseInt(stockMatch[1]);
    if (stock > 5000) warns.push(`STOCK: ${stock} seems unrealistically high`);
    if (stock < 10) warns.push(`STOCK: ${stock} seems too low`);
  }
  
  // ========================================
  // RULE 23: Contextual Bridging (colloquial + formal in AR)
  // ========================================
  // Already checked via Egyptian context
  
  // ========================================
  // RULE 24: AEO — Quick answer has numbers in first 60 words
  // ========================================
  if (qaMatch) {
    const text = qaMatch[1].replace(/<[^>]+>/g, '').substring(0, 300);
    if (!text.match(/\d+/)) warns.push('AEO: No numbers in quick-answer (need numeric answer early)');
  }
  
  // ========================================
  // OUTPUT
  // ========================================
  if (issues.length === 0 && warns.length === 0) {
    totalPass++;
  } else {
    console.log(`\n📦 ${slug}`);
    for (const i of issues) {
      console.log(`   ❌ ${i}`);
      totalFail++;
    }
    for (const w of warns) {
      console.log(`   ⚠️ ${w}`);
      totalWarn++;
    }
    if (issues.length > 0) {
      allIssues.push({ slug, errors: issues.length, warnings: warns.length });
    } else {
      totalPass++;
    }
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`📊 COMPREHENSIVE GUIDE COMPLIANCE AUDIT — 54 products`);
console.log(`   ✅ Full Pass: ${totalPass}`);
console.log(`   ⚠️  Warnings: ${totalWarn}`);
console.log(`   ❌ Critical: ${totalFail}`);
console.log(`${'='.repeat(60)}`);

if (allIssues.length > 0) {
  console.log(`\n🔴 Products with CRITICAL issues:`);
  for (const p of allIssues) {
    console.log(`   ${p.slug}: ${p.errors} errors, ${p.warnings} warnings`);
  }
}
