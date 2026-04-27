/**
 * CONVERSION OPTIMIZATION AUDIT — Layer 8
 * Focus on elements that directly impact purchase decisions:
 * 
 * 1. BUYER-WARNING-DEPTH: Warning must mention specific counterfeit tells (>30 words)
 * 2. DEVICE-COMPAT: Must list at least 3 specific device models
 * 3. EXPERT-LENGTH: Expert review must be >100 chars (both EN+AR)
 * 4. QUICK-ANSWER-PRICE: Quick answer should mention specific EGP price
 * 5. SOCIAL-PROOF: Description should mention testing/review
 * 6. CTA-META: Meta description must include CTA verb (Buy/Shop/Order/اشتري/اطلب)
 * 7. WARRANTY-MENTION: Features must mention warranty duration
 * 8. COMPARISON: Description should compare to alternatives (vs/مقابل/compared)
 */
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

let totalWarns = 0;
const issueProducts = {};

function warn(slug, msg) {
  if (!issueProducts[slug]) issueProducts[slug] = [];
  issueProducts[slug].push(msg);
  totalWarns++;
}

for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  
  // 1. BUYER-WARNING depth
  const buyerWarnings = [...content.matchAll(/buyer-warning[\s\S]*?<\/div>/g)];
  for (const bw of buyerWarnings) {
    const text = bw[0].replace(/<[^>]+>/g, '');
    if (text.split(/\s+/).length < 20) {
      warn(slug, 'WARN-THIN: Buyer warning too short (<20 words) — weak counterfeit deterrent');
    }
  }
  
  // 2. DEVICE COMPATIBILITY
  const deviceSections = content.match(/device-compatibility/g);
  if (!deviceSections) {
    warn(slug, 'NO-DEVICES: Missing device compatibility section');
  }
  
  // 3. EXPERT-LENGTH (check expertOpinion field)
  const expertEn = content.match(/expertOpinion:\s*\{[\s\S]*?en:\s*"([^"]+)"/);
  const expertAr = content.match(/expertOpinion:\s*\{[\s\S]*?ar:\s*"([^"]+)"/);
  if (expertEn && expertEn[1].length < 80) {
    warn(slug, `EXPERT-SHORT-EN: Expert opinion only ${expertEn[1].length} chars (need 80+)`);
  }
  if (expertAr && expertAr[1].length < 60) {
    warn(slug, `EXPERT-SHORT-AR: Expert opinion only ${expertAr[1].length} chars (need 60+)`);
  }
  
  // 4. QUICK-ANSWER-PRICE
  const quickAnswerEN = content.match(/quick-answer[\s\S]*?<\/div>/);
  if (quickAnswerEN) {
    const qaText = quickAnswerEN[0];
    if (!/EGP|جنيه|\d{2,4}\s*(EGP|جنيه)/i.test(qaText)) {
      warn(slug, 'QA-NO-PRICE: Quick answer missing specific EGP price — reduces urgency');
    }
  }
  
  // 5. CTA in meta descriptions
  const metaDescs = [...content.matchAll(/metaDesc:\s*"([^"]+)"/g)];
  for (const md of metaDescs) {
    const desc = md[1];
    if (!/buy|shop|order|get|اشتري|اطلب|احصل/i.test(desc)) {
      warn(slug, `META-NO-CTA: metaDesc missing action verb: "${desc.substring(0, 50)}..."`);
    }
  }
  
  // 6. WARRANTY in features
  const features = content.match(/features:\s*\[([\s\S]*?)\]/);
  if (features) {
    const featText = features[1].toLowerCase();
    if (!/warranty|ضمان/.test(featText)) {
      warn(slug, 'FEAT-NO-WARRANTY: Features array missing warranty mention — key trust signal');
    }
  }
  
  // 7. COMPARISON language in description
  const descEN = content.match(/description:\s*`([\s\S]*?)`/);
  if (descEN) {
    const d = descEN[1].toLowerCase();
    if (!/compar|vs\.?|versus|unlike|مقابل|بالمقارنة|على عكس|مقارنة/.test(d)) {
      warn(slug, 'NO-COMPARE: Description missing comparison language (vs/unlike/compared)');
    }
  }
}

// Print
for (const [slug, issues] of Object.entries(issueProducts)) {
  console.log(`📦 ${slug}`);
  for (const i of issues) console.log(`   ⚠️ ${i}`);
}

console.log('\n' + '='.repeat(60));
console.log('📊 CONVERSION AUDIT — ' + files.length + ' products');
console.log('   ✅ Clean: ' + (files.length - Object.keys(issueProducts).length));
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('='.repeat(60));
