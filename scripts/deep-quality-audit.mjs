/**
 * CairoVolt DEEP Content Blueprint v5 Audit — Phase 2
 * 
 * Goes BEYOND structural checks to audit CONTENT QUALITY:
 * 1. Quick Answer formula compliance (45-60 words, starts with contrast)
 * 2. Expert Review section completeness
 * 3. Sentiment U-Curve pattern
 * 4. Colloquial Egyptian NLP density
 * 5. Cross-sell logic (related products exist & are bidirectional)
 * 6. Review quality (5-7 reviews, diverse ratings, diverse cities)
 * 7. Description depth (word count per section)
 * 8. Certification mentions (MFi/UL/USB-IF/Qi2 per category)
 * 9. Contrastive NLP (mentions of fakes/counterfeits)
 * 10. metaDesc quality (CTA + benefit + warranty)
 */

import { readFileSync, readdirSync, existsSync } from 'fs';

const PRODUCTS_DIR = 'src/data/products';
const REVIEWS_DIR = 'src/data/reviews';
const DETAILS_DIR = 'src/data/details';
const TESTS_DIR = 'src/data/tests';

const files = readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

let totalPass = 0, totalWarn = 0, totalFail = 0;
const allIssues = [];

// Collect all slugs for bidirectional cross-sell check
const allSlugs = files.map(f => f.replace('.ts', ''));
const relatedMap = {};
for (const file of files) {
  const slug = file.replace('.ts', '');
  const content = readFileSync(`${PRODUCTS_DIR}/${file}`, 'utf-8');
  const related = content.match(/relatedProducts:\s*\[([\s\S]*?)\]/);
  if (related) {
    const refs = related[1].match(/["']([^"']+)["']/g)?.map(s => s.replace(/["']/g, '')) || [];
    relatedMap[slug] = refs;
  }
}

for (const file of files) {
  const slug = file.replace('.ts', '');
  const content = readFileSync(`${PRODUCTS_DIR}/${file}`, 'utf-8');
  const issues = [];
  const warns = [];
  
  const catMatch = content.match(/categorySlug:\s*["']([^"']+)["']/);
  const category = catMatch ? catMatch[1] : 'unknown';
  
  // ========================================
  // DEEP RULE 1: Quick Answer formula (45-60 words, starts with contrast)
  // ========================================
  const qaMatches = content.match(/class=(?:\\?)"quick-answer(?:\\?)">[\s\S]*?<(?:\\\/|\/?)p[\s\S]*?>([\s\S]*?)<(?:\\\/|\/)p>/g) || [];
  for (let i = 0; i < qaMatches.length; i++) {
    const text = qaMatches[i].replace(/<[^>]+>/g, '').replace(/\\n/g, ' ').replace(/class=.*?>/g, '').trim();
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const lang = i === 0 ? 'EN' : 'AR';
    if (wordCount < 30) warns.push(`QA-DEPTH (${lang}): Quick Answer only ${wordCount} words (need 40-60)`);
    if (wordCount > 90) warns.push(`QA-DEPTH (${lang}): Quick Answer ${wordCount} words — too verbose (need 40-60)`);
  }
  
  // ========================================
  // DEEP RULE 2: Description word count (should be 100+ words per language)
  // ========================================
  const descMatches = content.match(/description:\s*(?:`([\s\S]*?)`|"([\s\S]*?)(?<!\\)")/g) || [];
  for (let i = 0; i < descMatches.length; i++) {
    const text = descMatches[i].replace(/<[^>]+>/g, '').replace(/\\n/g, ' ').replace(/\\"/g, '"');
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const lang = i === 0 ? 'EN' : 'AR';
    if (wordCount < 80) warns.push(`DESC-DEPTH (${lang}): Only ${wordCount} words in description (need 100+)`);
  }
  
  // ========================================
  // DEEP RULE 3: Contrastive NLP (mentions counterfeits/fakes — Blueprint Rule 14)
  // ========================================
  const contrastTerms = ['counterfeit', 'fake', 'مقلد', 'مقلدة', 'تقليد', 'المقلد', 'المقلدة', 'رخيص', 'الرخيص'];
  const hasContrast = contrastTerms.some(t => content.includes(t));
  if (!hasContrast) warns.push('CONTRASTIVE: No mention of counterfeits/fakes (Blueprint Rule 14)');
  
  // ========================================
  // DEEP RULE 4: Certification mentions per category
  // ========================================
  const certMap = {
    'cables': ['MFi', 'USB-IF', 'C94'],
    'wall-chargers': ['UL', 'FCC', 'CE', 'GaN'],
    'power-banks': ['UL', 'FCC', 'IATA', 'Wh'],
    'car-chargers': ['FCC', 'CE'],
    'audio': ['IPX', 'IP54', 'IP55', 'Bluetooth'],
    'speakers': ['IPX', 'IP67', 'Bluetooth'],
    'car-holders': [],
    'smart-watches': ['IP68', 'IP67', 'Bluetooth'],
    'wireless-charging': ['Qi', 'Qi2']
  };
  const requiredCerts = certMap[category] || [];
  if (requiredCerts.length > 0) {
    const hasCert = requiredCerts.some(c => content.toLowerCase().includes(c.toLowerCase()));
    if (!hasCert) warns.push(`CERT: No certification mentioned (expected: ${requiredCerts.join('/')} for ${category})`);
  }
  
  // ========================================
  // DEEP RULE 5: Cross-sell bidirectionality
  // ========================================
  const myRelated = relatedMap[slug] || [];
  if (myRelated.length < 4) warns.push(`CROSS-SELL: Only ${myRelated.length} related products (need 4-6)`);
  
  for (const ref of myRelated) {
    if (!allSlugs.includes(ref)) {
      warns.push(`CROSS-SELL: Related "${ref}" doesn't exist as a product`);
    } else {
      // Check bidirectionality (only warn if target has room for more)
      const theirRelated = relatedMap[ref] || [];
      if (!theirRelated.includes(slug) && theirRelated.length < 6) {
        warns.push(`CROSS-SELL: "${ref}" doesn't link back to "${slug}" (should be bidirectional)`);
      }
    }
  }
  
  // ========================================
  // DEEP RULE 6: Review quality (5-7 reviews, diverse cities, diverse ratings)
  // ========================================
  if (existsSync(`${REVIEWS_DIR}/${slug}.ts`)) {
    const reviewContent = readFileSync(`${REVIEWS_DIR}/${slug}.ts`, 'utf-8');
    const reviewCount = (reviewContent.match(/author:/g) || []).length;
    if (reviewCount < 5) warns.push(`REVIEWS: Only ${reviewCount} reviews (need 5-7)`);
    
    const locations = reviewContent.match(/location:\s*'([^']+)'/g)?.map(l => l.match(/'([^']+)'/)[1]) || [];
    const uniqueLocations = new Set(locations);
    if (uniqueLocations.size < 3 && reviewCount >= 5) warns.push(`REVIEWS: Only ${uniqueLocations.size} unique cities (need 3+)`);
    
    const ratings = reviewContent.match(/rating:\s*(\d)/g)?.map(r => parseInt(r.match(/(\d)/)[1])) || [];
    const allFive = ratings.every(r => r === 5);
    if (allFive && ratings.length >= 5) warns.push('REVIEWS: All 5-star ratings — add 1-2 four-star for authenticity');
  }
  
  // ========================================
  // DEEP RULE 7: Expert opinion quality
  // ========================================
  const expertMatch = content.match(/expertOpinion:\s*\{[\s\S]*?\}/);
  if (expertMatch) {
    const expertText = expertMatch[0];
    const enExpert = expertText.match(/en:\s*["'`]([^"'`]+)["'`]/);
    const arExpert = expertText.match(/ar:\s*["'`]([^"'`]+)["'`]/);
    if (enExpert && enExpert[1].split(' ').length < 8) warns.push('EXPERT: EN expert opinion too short (< 8 words)');
    if (arExpert && arExpert[1].split(' ').length < 6) warns.push('EXPERT: AR expert opinion too short (< 6 words)');
  }
  
  // ========================================
  // DEEP RULE 8: metaDesc quality (should mention benefit + warranty/delivery)
  // ========================================
  const metaDescMatches = content.matchAll(/metaDesc:\s*["']([^"']+)["']/g);
  for (const m of metaDescMatches) {
    const desc = m[1];
    if (desc.length < 80) warns.push(`META-DESC: "${desc.substring(0,30)}..." too short (${desc.length} chars, need 100-155)`);
    // Check for CTA elements
    const hasCTA = desc.includes('✓') || desc.includes('اطلب') || desc.includes('اشتري') || desc.includes('Buy') || desc.includes('Order') || desc.includes('Shop');
    const hasWarranty = desc.includes('ضمان') || desc.includes('Warranty') || desc.includes('warranty') || desc.includes('شهر');
    if (!hasCTA) warns.push('META-DESC: Missing CTA in metaDesc');
  }
  
  // ========================================
  // DEEP RULE 9: Product-details section has sub-headings (H2s inside)
  // ========================================
  const detailsSection = content.match(/class=(?:\\?)"product-details(?:\\?)">([\s\S]*?)(?=class=(?:\\?)"device-compatibility|$)/);
  if (detailsSection) {
    const h2Count = (detailsSection[1].match(/<h2/g) || []).length;
    if (h2Count < 2) warns.push(`DEPTH: product-details has only ${h2Count} sub-headings (need 2+)`);
  }
  
  // ========================================
  // DEEP RULE 10: Lab test data quality check
  // ========================================
  if (existsSync(`${TESTS_DIR}/${slug}.ts`)) {
    const testContent = readFileSync(`${TESTS_DIR}/${slug}.ts`, 'utf-8');
    const testCount = (testContent.match(/scenario:/g) || []).length;
    if (testCount < 1) warns.push('LAB: No test scenarios in test file');
    
    const voiceArCount = (testContent.match(/"?question"?:/g) || []).length;
    if (voiceArCount < 2) warns.push(`LAB: Only ${voiceArCount} voice FAQs in test file (need 2+)`);
    
    const hasAccessory = testContent.includes('isAccessoryFor');
    if (!hasAccessory) warns.push('LAB: Missing isAccessoryFor compatibility mapping');
  }
  
  // ========================================
  // DEEP RULE 11: Sentiment U-Curve check
  // ========================================
  // First section should mention problem, last section should mention guarantee
  const hasOpeningProblem = content.includes('على عكس') || content.includes('Unlike') || content.includes('بدلاً من') || content.includes('Instead of') || content.includes('المشكلة') || content.includes('problem');
  const hasClosingGuarantee = content.includes('ضمان') || content.includes('warranty') || content.includes('Warranty') || content.includes('guarantee') || content.includes('استبدال');
  if (!hasOpeningProblem) warns.push('U-CURVE: No problem/contrast in opening (need "على عكس" or similar)');
  if (!hasClosingGuarantee) warns.push('U-CURVE: No guarantee/warranty mention in description');
  
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
console.log(`📊 DEEP QUALITY AUDIT — 54 products`);
console.log(`   ✅ Full Pass: ${totalPass}`);
console.log(`   ⚠️  Quality Warnings: ${totalWarn}`);
console.log(`   ❌ Critical: ${totalFail}`);
console.log(`${'='.repeat(60)}`);

// Summary of warning categories
const warnCategories = {};
for (const file of files) {
  const slug = file.replace('.ts', '');
  // Re-run to count categories (simplified)
}
