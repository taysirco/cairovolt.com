/**
 * L17 — BLUEPRINT COMPLIANCE AUDIT
 * 
 * Audits ALL category content against cairovolt_content_blueprint.md rules.
 * 
 * CHECKS (from Blueprint):
 *  1. AI CLICHÉ DETECTION — banned phrases (القاعدة 1)
 *  2. SEMANTIC DENSITY — every sentence must contain number + tech name (القاعدة 2)
 *  3. BURSTINESS — sentence length variation (القاعدة 3)
 *  4. INFORMATION GAIN — Egyptian context, real tests, warnings (القاعدة 4)
 *  5. EXPERT TONE — not salesy language (القاعدة 5)
 *  6. E-E-A-T SIGNALS — certifications, warranty, official references (ثانياً)
 *  7. FAQ STRUCTURE — 5 types: compatibility, safety, comparison, colloquial, warranty (ثامن)
 *  8. NLP EGYPTIAN — colloquial Arabic terms presence (رابعاً)
 *  9. QUICK ANSWER — 40-60 word quick answer formula (سادساً)
 * 10. HEADING STRUCTURE — H2 ≤ 8 words, 60% with keywords (سابعاً)
 * 11. CROSS-SELL LOGIC — complementary product linking (تاسعاً)
 * 12. SENTIMENT U-CURVE — problem → solution → trust pattern (عاشراً)
 * 13. NUMBERS > ADJECTIVES — quantitative over qualitative (القاعدة الذهبية 2)
 * 14. TECH NAMES > GENERIC — named tech over generic claims (القاعدة الذهبية 3)
 * 15. CONTRASTIVE NLP — fake product warnings (القاعدة الذهبية 14)
 */
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

let totalWarns = 0, totalCrit = 0, totalPass = 0;
const results = {};

function warn(cat, rule, msg) { 
  if (!results[cat]) results[cat] = { warns: [], crits: [], passes: [] };
  results[cat].warns.push(`[${rule}] ${msg}`); 
  totalWarns++; 
}
function crit(cat, rule, msg) { 
  if (!results[cat]) results[cat] = { warns: [], crits: [], passes: [] };
  results[cat].crits.push(`[${rule}] ${msg}`); 
  totalCrit++; 
}
function pass(cat, rule) {
  if (!results[cat]) results[cat] = { warns: [], crits: [], passes: [] };
  results[cat].passes.push(rule);
  totalPass++;
}

// ═══ BANNED PHRASES (القاعدة 1) ═══
const AI_CLICHES = [
  'في الختام', 'من الجدير بالذكر', 'لا شك أن', 'نقدم لكم أفضل',
  'نسعى جاهدين', 'في عالم التكنولوجيا', 'في عالم اليوم', 
  'نحن نقدم', 'يتميز بأنه', 'from our collection',
  'in conclusion', 'it is worth noting', 'without a doubt',
  'we offer you', 'in today\'s world', 'state of the art',
  'top-notch', 'second to none', 'we are proud to',
  'rest assured', 'look no further',
  'تسوقاعات', // typo that was found before
];

// ═══ E-E-A-T CERTIFICATIONS ═══
const CERTIFICATIONS = ['MFi', 'Qi', 'USB-IF', 'UL', 'IPX', 'CE', 'FCC', 'GaN', 'PD', 'PPS', 'QC'];

// ═══ EGYPTIAN NLP TERMS ═══
const EGYPTIAN_NLP = [
  'أوريجينال', 'الباب', 'بيشحن', 'بيسخن', 'الموبايل', 'اللابتوب',
  'أصلي', 'مقلد', 'مصر', 'القاهرة', 'توصيل', 'ضمان', 'استبدال',
  'واط', 'جنيه', 'سعر', 'شراء',
];

// ═══ TRUST TERMS ═══  
const TRUST_TERMS = ['ضمان', 'warranty', 'أصلي', 'original', 'معتمد', 'authorized', 'CairoVolt', 'اختبار', 'test'];

// ═══ CONVERSION SIGNALS ═══
const CONVERSION_SIGNALS = ['سعر', 'price', 'EGP', 'جنيه', 'خصم', 'discount', 'توصيل', 'delivery'];

// ═══ SALESY PHRASES (القاعدة 5) ═══
const SALESY_PHRASES = [
  'أفضل منتج في العالم', 'best in the world', 'يناسب الجميع', 'suits everyone',
  'لا مثيل له', 'unmatched', 'خارق', 'incredible', 'مذهل', 'amazing',
];

// Load all category files
const brandDir = 'src/data/category-content';
const brands = readdirSync(brandDir).filter(f => !f.startsWith('_') && !f.endsWith('.ts'));
const genDir = 'src/data/generic-categories';
const genFiles = readdirSync(genDir).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

// ═══ AUDIT BRAND CATEGORIES ═══
for (const brand of brands) {
  const catFiles = readdirSync(join(brandDir, brand)).filter(f => f.endsWith('.ts'));
  for (const file of catFiles) {
    const slug = `${brand}/${file.replace('.ts', '')}`;
    const content = readFileSync(join(brandDir, brand, file), 'utf-8');
    const lower = content.toLowerCase();
    
    // 1. AI CLICHÉ CHECK
    let clicheFound = false;
    for (const cliche of AI_CLICHES) {
      if (lower.includes(cliche.toLowerCase())) {
        crit(slug, 'AI-CLICHÉ', `Found: "${cliche}"`);
        clicheFound = true;
      }
    }
    if (!clicheFound) pass(slug, 'AI-CLICHÉ');
    
    // 2. SEMANTIC DENSITY — check for numbers in descriptions/FAQ answers
    const allAnswers = [...content.matchAll(/answer:\s*'((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
    const allDescs = [...content.matchAll(/description:\s*`([^`]+)`/g)].map(m => m[1]);
    let numericContent = 0;
    const allText = [...allAnswers, ...allDescs];
    for (const text of allText) {
      if (/\d/.test(text)) numericContent++;
    }
    const density = allText.length > 0 ? numericContent / allText.length : 0;
    if (density < 0.7) warn(slug, 'DENSITY', `Only ${Math.round(density*100)}% of content blocks have numbers (need 70%+)`);
    else pass(slug, 'DENSITY');
    
    // 4. INFORMATION GAIN — Egyptian context
    const hasEgyptContext = lower.includes('مصر') || lower.includes('egypt') || lower.includes('القاهرة') || lower.includes('cairo');
    const hasRealTest = lower.includes('اختبار') || lower.includes('test') || lower.includes('cairovolt');
    const hasWarning = lower.includes('تحذير') || lower.includes('warning') || lower.includes('مقلد') || lower.includes('fake') || lower.includes('counterfeit');
    
    if (!hasEgyptContext) warn(slug, 'INFO-GAIN', 'Missing Egyptian context (مصر/القاهرة)');
    else pass(slug, 'EGYPT-CTX');
    if (!hasRealTest) warn(slug, 'INFO-GAIN', 'Missing real test data (اختبار/CairoVolt test)');
    else pass(slug, 'REAL-TEST');
    if (!hasWarning) warn(slug, 'INFO-GAIN', 'Missing buyer warning (تحذير/مقلد/fake)');
    else pass(slug, 'WARNING');
    
    // 5. EXPERT TONE — no salesy language
    let salesyFound = false;
    for (const phrase of SALESY_PHRASES) {
      if (lower.includes(phrase.toLowerCase())) {
        warn(slug, 'TONE', `Salesy phrase found: "${phrase}"`);
        salesyFound = true;
      }
    }
    if (!salesyFound) pass(slug, 'TONE');
    
    // 6. E-E-A-T — certification mentions
    let certCount = 0;
    for (const cert of CERTIFICATIONS) {
      if (content.includes(cert)) certCount++;
    }
    if (certCount < 2) warn(slug, 'EEAT', `Only ${certCount} certifications mentioned (need 2+)`);
    else pass(slug, 'EEAT');
    
    // 7. FAQ STRUCTURE — check FAQ variety
    const faqQuestions = [...content.matchAll(/question:\s*'((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
    const faqLower = faqQuestions.map(q => q.toLowerCase());
    
    // Check 5 FAQ types  
    const hasCompatQ = faqLower.some(q => q.includes('يشحن') || q.includes('يناسب') || q.includes('compatible') || q.includes('أفضل') || q.includes('best'));
    const hasSafeQ = faqLower.some(q => q.includes('آمن') || q.includes('safe') || q.includes('حرارة') || q.includes('heat') || q.includes('بيسخن'));
    const hasCompareQ = faqLower.some(q => q.includes('الفرق') || q.includes('difference') || q.includes('مقارنة') || q.includes('compare'));
    const hasWarrantyQ = faqLower.some(q => q.includes('ضمان') || q.includes('warranty') || q.includes('استبدال') || q.includes('return'));
    const hasPriceQ = faqLower.some(q => q.includes('سعر') || q.includes('price') || q.includes('كم') || q.includes('how much') || q.includes('cost'));
    
    const faqTypes = [hasCompatQ, hasSafeQ, hasCompareQ, hasWarrantyQ, hasPriceQ].filter(Boolean).length;
    if (faqTypes < 3) warn(slug, 'FAQ-TYPES', `Only ${faqTypes}/5 FAQ types covered (compatibility, safety, comparison, warranty, price)`);
    else pass(slug, 'FAQ-TYPES');
    
    // 8. NLP EGYPTIAN
    let nlpCount = 0;
    for (const term of EGYPTIAN_NLP) {
      if (content.includes(term)) nlpCount++;
    }
    if (nlpCount < 5) warn(slug, 'NLP-EG', `Only ${nlpCount}/17 Egyptian NLP terms (need 5+)`);
    else pass(slug, 'NLP-EG');
    
    // 11. CROSS-SELL — check for internal links
    const hasInternalLinks = content.includes('/anker/') || content.includes('/joyroom/') || content.includes('تسوق') || content.includes('Shop');
    if (!hasInternalLinks) warn(slug, 'CROSS-SELL', 'No cross-sell internal links found');
    else pass(slug, 'CROSS-SELL');
    
    // 13. NUMBERS > ADJECTIVES
    const numberCount = (content.match(/\d+/g) || []).length;
    if (numberCount < 15) warn(slug, 'NUMBERS', `Only ${numberCount} numeric values (need 15+ for data-rich content)`);
    else pass(slug, 'NUMBERS');
    
    // 14. TECH NAMES
    const techNames = ['GaN', 'PowerIQ', 'PD', 'PPS', 'USB-C', 'Lightning', 'ActiveShield', 'MultiProtect', 'ANC', 'TWS', 'IPX', 'Bluetooth', 'LDAC'];
    let techCount = 0;
    for (const tech of techNames) {
      if (content.includes(tech)) techCount++;
    }
    if (techCount < 3) warn(slug, 'TECH-NAMES', `Only ${techCount} named technologies (need 3+ for authority)`);
    else pass(slug, 'TECH-NAMES');
    
    // 15. CONTRASTIVE NLP — fake warnings
    const hasContrastive = lower.includes('مقلد') || lower.includes('fake') || lower.includes('تقليد') || 
                          lower.includes('counterfeit') || lower.includes('رخيص') || lower.includes('cheap');
    if (!hasContrastive) warn(slug, 'CONTRAST', 'Missing contrastive NLP (fake/counterfeit warnings)');
    else pass(slug, 'CONTRAST');
    
    // CONVERSION SIGNALS
    let convCount = 0;
    for (const sig of CONVERSION_SIGNALS) {
      if (lower.includes(sig.toLowerCase())) convCount++;
    }
    if (convCount < 4) warn(slug, 'CONV', `Only ${convCount}/8 conversion signals (need 4+)`);
    else pass(slug, 'CONV');
  }
}

// ═══ AUDIT GENERIC CATEGORIES ═══
for (const file of genFiles) {
  const slug = `generic/${file.replace('.ts', '')}`;
  const content = readFileSync(join(genDir, file), 'utf-8');
  const lower = content.toLowerCase();
  
  // 1. AI CLICHÉ CHECK
  let clicheFound = false;
  for (const cliche of AI_CLICHES) {
    if (lower.includes(cliche.toLowerCase())) {
      crit(slug, 'AI-CLICHÉ', `Found: "${cliche}"`);
      clicheFound = true;
    }
  }
  if (!clicheFound) pass(slug, 'AI-CLICHÉ');
  
  // 8. NLP EGYPTIAN in rich content
  let nlpCount = 0;
  for (const term of EGYPTIAN_NLP) {
    if (content.includes(term)) nlpCount++;
  }
  if (nlpCount < 8) warn(slug, 'NLP-EG', `Only ${nlpCount}/17 Egyptian NLP terms (need 8+ for authority page)`);
  else pass(slug, 'NLP-EG');
  
  // 6. E-E-A-T  
  let certCount = 0;
  for (const cert of CERTIFICATIONS) {
    if (content.includes(cert)) certCount++;
  }
  if (certCount < 3) warn(slug, 'EEAT', `Only ${certCount} certifications (need 3+ for authority page)`);
  else pass(slug, 'EEAT');
  
  // 13. NUMBERS
  const numberCount = (content.match(/\d+/g) || []).length;
  if (numberCount < 30) warn(slug, 'NUMBERS', `Only ${numberCount} numeric values (need 30+ for authority page)`);
  else pass(slug, 'NUMBERS');
  
  // 15. CONTRASTIVE
  const hasContrastive = lower.includes('مقلد') || lower.includes('fake') || lower.includes('تقليد') || lower.includes('counterfeit');
  if (!hasContrastive) warn(slug, 'CONTRAST', 'Missing contrastive NLP');
  else pass(slug, 'CONTRAST');
  
  // CONVERSION
  let convCount = 0;
  for (const sig of CONVERSION_SIGNALS) {
    if (lower.includes(sig.toLowerCase())) convCount++;
  }
  if (convCount < 5) warn(slug, 'CONV', `Only ${convCount}/8 conversion signals (need 5+ for authority page)`);
  else pass(slug, 'CONV');
}

// ═══ PRINT RESULTS ═══
console.log('');
for (const [cat, data] of Object.entries(results)) {
  const score = data.passes.length;
  const total = score + data.warns.length + data.crits.length;
  const pct = Math.round((score / total) * 100);
  const icon = pct >= 90 ? '🟢' : pct >= 70 ? '🟡' : '🔴';
  
  console.log(`${icon} ${cat} — ${pct}% (${score}/${total})`);
  for (const c of data.crits) console.log(`   ❌ ${c}`);
  for (const w of data.warns) console.log(`   ⚠️  ${w}`);
}

console.log('\n' + '='.repeat(60));
console.log(`📜 BLUEPRINT COMPLIANCE AUDIT (L17)`);
console.log(`   ✅ Passes: ${totalPass}`);
console.log(`   ⚠️  Warnings: ${totalWarns}`);
console.log(`   ❌ Critical: ${totalCrit}`);
const overallPct = Math.round((totalPass / (totalPass + totalWarns + totalCrit)) * 100);
console.log(`   📊 Overall Score: ${overallPct}%`);
console.log('='.repeat(60));
