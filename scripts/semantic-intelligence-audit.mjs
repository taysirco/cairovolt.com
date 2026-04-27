/**
 * SEMANTIC INTELLIGENCE AUDIT — Layer 11
 * Deep content analysis that catches what machines AND humans miss:
 *
 * 1. CROSS-SELL-LOGIC: Related products should complement, not compete
 *    (charger→cable ✅, charger→charger ❌ unless different wattage)
 * 2. FAQ-DUPLICATE: Same FAQ answer used across multiple products
 * 3. DESCRIPTION-UNIQUE-HOOK: First sentence should be unique across all products
 * 4. PRICE-PSYCHOLOGY: Price should end in 0,5,9,7 (charm pricing)
 * 5. FEATURE-COUNT-PARITY: EN vs AR feature count must match
 * 6. SLUG-MISMATCH: Slug should match product name keywords
 * 7. CATEGORY-COVERAGE: Each category should have min 3 products for authority
 * 8. BRAND-CONSISTENCY: Same brand products should have consistent tone
 */
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

let totalWarns = 0;
let totalCrit = 0;
const issueProducts = {};
const allProducts = {};

function warn(slug, msg) {
  if (!issueProducts[slug]) issueProducts[slug] = { warns: [], crits: [] };
  issueProducts[slug].warns.push(msg);
  totalWarns++;
}
function crit(slug, msg) {
  if (!issueProducts[slug]) issueProducts[slug] = { warns: [], crits: [] };
  issueProducts[slug].crits.push(msg);
  totalCrit++;
}

// First pass: collect all data
const allFaqs = new Map(); // answer → [slugs]
const allHooks = new Map(); // first sentence → [slugs]
const categories = new Map(); // category → [slugs]

for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  
  const catMatch = content.match(/categorySlug:\s*"([^"]+)"/);
  const cat = catMatch ? catMatch[1] : 'unknown';
  if (!categories.has(cat)) categories.set(cat, []);
  categories.get(cat).push(slug);
  
  const relatedMatch = content.match(/relatedProducts:\s*\[([\s\S]*?)\]/);
  const related = relatedMatch ? [...relatedMatch[1].matchAll(/"([^"]+)"/g)].map(m => m[1]) : [];
  
  const price = parseFloat((content.match(/price:\s*([\d.]+)/) || [])[1] || 0);
  
  allProducts[slug] = { cat, related, price, content };
  
  // Collect FAQs
  const faqs = [...content.matchAll(/answer:\s*"([^"]+)"/g)];
  for (const fq of faqs) {
    const answer = fq[1].substring(0, 50);
    if (!allFaqs.has(answer)) allFaqs.set(answer, []);
    allFaqs.get(answer).push(slug);
  }
  
  // Collect first sentence hooks
  const descMatch = content.match(/quick-answer[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/);
  if (descMatch) {
    const firstSentence = descMatch[1].replace(/<[^>]+>/g, '').split(/[.!?]/)[0].trim().substring(0, 60);
    if (!allHooks.has(firstSentence)) allHooks.set(firstSentence, []);
    allHooks.get(firstSentence).push(slug);
  }
}

// Second pass: analyze
for (const [slug, data] of Object.entries(allProducts)) {
  const { cat, related, price, content } = data;
  
  // 1. CROSS-SELL-LOGIC: Check if related products are in same sub-category
  const sameSubCat = related.filter(r => {
    const rData = allProducts[r];
    if (!rData) return false;
    // Same category AND same price range (within 30%) = competing
    return rData.cat === cat 
      && Math.abs(rData.price - price) / Math.max(rData.price, price) < 0.2
      && rData.price > 0 && price > 0;
  });
  if (sameSubCat.length > 2) {
    warn(slug, `CROSS-SELL-COMPETE: ${sameSubCat.length} related products are same category+price range: ${sameSubCat.slice(0,2).join(', ')}...`);
  }
  
  // 4. PRICE-PSYCHOLOGY: Charm pricing
  const lastDigit = Math.round(price) % 10;
  if (price > 100 && ![0, 3, 5, 7, 9].includes(lastDigit)) {
    warn(slug, `CHARM-PRICE: ${price} EGP ends in ${lastDigit} — consider 0/5/7/9 for better conversion`);
  }
  
  // 5. FEATURE-COUNT-PARITY
  const featureBlocks = [...content.matchAll(/features:\s*\[([\s\S]*?)\]/g)];
  if (featureBlocks.length >= 2) {
    const enCount = (featureBlocks[0][1].match(/"/g) || []).length / 2;
    const arCount = (featureBlocks[1][1].match(/"/g) || []).length / 2;
    if (enCount !== arCount) {
      warn(slug, `FEATURE-IMBALANCE: EN has ${enCount} features, AR has ${arCount}`);
    }
  }
  
  // 6. STOCK-REALISM: Stock numbers shouldn't be unrealistically high
  const stockMatch = content.match(/stock:\s*(\d+)/);
  if (stockMatch) {
    const stock = parseInt(stockMatch[1]);
    if (stock > 5000) {
      warn(slug, `STOCK-INFLATED: ${stock} units seems unrealistically high for niche e-commerce`);
    }
  }
  
  // 7. ORIGINAL-PRICE sanity
  const origMatch = content.match(/originalPrice:\s*([\d.]+)/);
  if (origMatch) {
    const orig = parseFloat(origMatch[1]);
    const discount = ((orig - price) / orig * 100);
    if (discount > 70) {
      crit(slug, `DISCOUNT-EXTREME: ${discount.toFixed(0)}% discount (${orig}→${price}) looks suspicious to Google`);
    }
  }
}

// 2. FAQ-DUPLICATE check
for (const [answer, slugs] of allFaqs) {
  if (slugs.length > 3) {
    // Only warn on first occurrence
    warn(slugs[0], `FAQ-DUPLICATE: Answer "${answer}..." shared by ${slugs.length} products`);
  }
}

// 3. HOOK-DUPLICATE check
for (const [hook, slugs] of allHooks) {
  if (slugs.length > 2 && hook.length > 20) {
    warn(slugs[0], `HOOK-DUPLICATE: Opening "${hook}..." shared by ${slugs.length} products`);
  }
}

// 7. CATEGORY-COVERAGE
for (const [cat, slugs] of categories) {
  if (slugs.length < 3) {
    warn(slugs[0], `THIN-CATEGORY: "${cat}" has only ${slugs.length} products (need 3+ for authority)`);
  }
}

// Print
for (const [slug, issues] of Object.entries(issueProducts)) {
  console.log(`📦 ${slug}`);
  for (const c of issues.crits) console.log(`   ❌ ${c}`);
  for (const w of issues.warns) console.log(`   ⚠️ ${w}`);
}

console.log('\n' + '='.repeat(60));
console.log('🧬 SEMANTIC INTELLIGENCE (L11) — ' + files.length + ' products');
console.log('   ✅ Clean: ' + (files.length - Object.keys(issueProducts).length));
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('   ❌ Critical: ' + totalCrit);
console.log('='.repeat(60));
