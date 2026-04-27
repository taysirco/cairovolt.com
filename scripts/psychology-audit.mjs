/**
 * PSYCHOLOGY AUDIT — Layer 10
 * Advanced persuasion signals that drive conversions:
 * 
 * 1. SCARCITY: Description should mention limited availability/stock
 * 2. SOCIAL-PROOF: Should reference return rate, units sold, or test data
 * 3. COST-PER-DAY: High-price products (>500 EGP) should break down daily cost
 * 4. GUARANTEE-BOLD: Warranty should be in <strong> tags for visual impact
 * 5. URGENCY-CTA: At least 1 urgency phrase in description ("now"/"today"/"اطلب الآن")
 * 6. RISK-REVERSAL: Should mention free replacement/money back/return policy
 * 7. SPECIFICITY: Description should have at least 3 specific numbers (%, mAh, W, hours)
 * 8. ANCHOR-PRICE: Should mention original price or savings amount
 */
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

let totalWarns = 0;
let totalCrit = 0;
const issueProducts = {};

function warn(slug, msg) {
  if (!issueProducts[slug]) issueProducts[slug] = { warns: [], crits: [] };
  issueProducts[slug].warns.push(msg);
  totalWarns++;
}

for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  
  // Get description text (stripped of HTML)
  const descMatch = content.match(/description:\s*`([\s\S]*?)`/);
  if (!descMatch) continue;
  const descText = descMatch[1].replace(/<[^>]+>/g, '');
  const fullContent = content;
  
  const price = parseFloat((content.match(/price:\s*([\d.]+)/) || [])[1] || 0);
  
  // 1. SOCIAL-PROOF: return rate, units sold, or test data
  if (!/return rate|نسبة إرجاع|units sold|وحدة|tested|مختبر|اختبار/i.test(descText)) {
    warn(slug, 'NO-SOCIAL-PROOF: Description lacks return rate, units sold, or test data');
  }
  
  // 2. COST-PER-DAY for expensive products
  if (price > 500 && !/per day|في اليوم|يوم|EGP\/day|جنيه\/يوم/i.test(descText)) {
    warn(slug, `NO-COST-BREAKDOWN: ${price} EGP product missing daily cost breakdown`);
  }
  
  // 3. SPECIFICITY — at least 3 numbers in description
  const numbers = descText.match(/\d+[\d,.]*\s*(mAh|W|واط|%|hours|ساعة|mm|مم|dB|ديسيبل|Mbps|ميجابت)/gi) || [];
  if (numbers.length < 3) {
    warn(slug, `LOW-SPECIFICITY: Only ${numbers.length} technical specs in description (need 3+)`);
  }
  
  // 4. RISK-REVERSAL
  if (!/replacement|استبدال|بدل مجاني|refund|استرجاع|return|ترجيع/i.test(fullContent)) {
    warn(slug, 'NO-RISK-REVERSAL: Missing free replacement/return language');
  }
  
  // 5. ANCHOR-PRICE — mention savings or original price
  if (!/save|توفير|كنت هتدفع|original|الأصلي|بدل ما/i.test(fullContent)) {
    // Check if there's a clear price comparison in the desc
    const origPrice = parseFloat((content.match(/originalPrice:\s*([\d.]+)/) || [])[1] || 0);
    if (origPrice > 0 && origPrice !== price) {
      const savings = origPrice - price;
      if (!/\b\d+\s*(EGP|جنيه)\s*(off|توفير|أقل)/i.test(fullContent)) {
        warn(slug, `NO-ANCHOR: Could mention "Save ${savings} EGP" but doesn't`);
      }
    }
  }
}

// Print
for (const [slug, issues] of Object.entries(issueProducts)) {
  console.log(`📦 ${slug}`);
  for (const c of issues.crits) console.log(`   ❌ ${c}`);
  for (const w of issues.warns) console.log(`   ⚠️ ${w}`);
}

console.log('\n' + '='.repeat(60));
console.log('🧠 PSYCHOLOGY AUDIT (L10) — ' + files.length + ' products');
console.log('   ✅ Clean: ' + (files.length - Object.keys(issueProducts).length));
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('   ❌ Critical: ' + totalCrit);
console.log('='.repeat(60));
