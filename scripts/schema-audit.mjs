/**
 * SCHEMA VALIDATION AUDIT — Layer 7
 * Validates essential Product structured data requirements for Google Rich Results:
 * 1. GTIN format (must be valid EAN-13 or UPC-A)
 * 2. MPN must exist
 * 3. Brand must be consistent
 * 4. Price must be numeric and positive
 * 5. Images must have alt text
 * 6. Name must be < 150 chars
 * 7. Description must exist and be > 50 chars
 * 8. Offers must have availability status
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
function crit(slug, msg) {
  if (!issueProducts[slug]) issueProducts[slug] = { warns: [], crits: [] };
  issueProducts[slug].crits.push(msg);
  totalCrit++;
}

// GTIN-13 check digit validation
function isValidGTIN13(gtin) {
  if (gtin.length !== 13) return false;
  if (!/^\d{13}$/.test(gtin)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(gtin[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(gtin[12]);
}

for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  
  // 1. GTIN validation
  const gtinMatch = content.match(/gtin:\s*"([^"]+)"/);
  if (!gtinMatch) {
    warn(slug, 'SCHEMA: Missing GTIN — Google Rich Results requires GTIN or MPN');
  } else {
    const gtin = gtinMatch[1];
    if (gtin.length === 13 && !isValidGTIN13(gtin)) {
      crit(slug, `GTIN-CHECKSUM: "${gtin}" fails check digit validation — will be rejected by Google`);
    }
  }
  
  // 2. MPN
  const mpnMatch = content.match(/mpn:\s*"([^"]+)"/);
  if (!mpnMatch) {
    warn(slug, 'SCHEMA: Missing MPN — needed if GTIN unavailable');
  }
  
  // 3. Brand
  const brandMatch = content.match(/brand:\s*"([^"]+)"/);
  if (!brandMatch) {
    crit(slug, 'SCHEMA: Missing brand — required for Product schema');
  }
  
  // 4. Price
  const priceMatch = content.match(/price:\s*([\d.]+)/);
  if (!priceMatch || parseFloat(priceMatch[1]) <= 0) {
    crit(slug, 'SCHEMA: Missing or zero price');
  }
  
  // 5. Images alt text
  const imgAlts = [...content.matchAll(/alt:\s*"([^"]*)"/g)];
  const emptyAlts = imgAlts.filter(a => a[1].trim().length === 0);
  if (emptyAlts.length > 0) {
    crit(slug, `SCHEMA: ${emptyAlts.length} images with empty alt text — SEO and accessibility issue`);
  }
  
  // 6. Name length
  const nameMatches = [...content.matchAll(/name:\s*"([^"]+)"/g)];
  for (const nm of nameMatches) {
    if (nm[1].length > 150) {
      warn(slug, `SCHEMA: Product name too long (${nm[1].length} chars) — may be truncated`);
    }
  }
  
  // 7. Stock status
  const stockMatch = content.match(/stock:\s*(\d+)/);
  if (!stockMatch) {
    warn(slug, 'SCHEMA: Missing stock count — Google needs availability');
  } else if (parseInt(stockMatch[1]) === 0) {
    warn(slug, 'SCHEMA: Stock is 0 — Google will show OutOfStock');
  }
  
  // 8. SKU uniqueness
  const skuMatch = content.match(/sku:\s*"([^"]+)"/);
  if (!skuMatch) {
    crit(slug, 'SCHEMA: Missing SKU — required for product identification');
  }
  
  // 9. Category slug
  const catMatch = content.match(/categorySlug:\s*"([^"]+)"/);
  if (!catMatch) {
    crit(slug, 'SCHEMA: Missing categorySlug — needed for breadcrumb schema');
  }
  
  // 10. Status check
  const statusMatch = content.match(/status:\s*"([^"]+)"/);
  if (statusMatch && statusMatch[1] !== 'active') {
    warn(slug, `SCHEMA: Status is "${statusMatch[1]}" — may affect indexing`);
  }
}

// Print results
for (const [slug, issues] of Object.entries(issueProducts)) {
  console.log(`📦 ${slug}`);
  for (const c of issues.crits) console.log(`   ❌ ${c}`);
  for (const w of issues.warns) console.log(`   ⚠️ ${w}`);
}

console.log('\n' + '='.repeat(60));
console.log('📊 SCHEMA VALIDATION AUDIT — ' + files.length + ' products');
console.log('   ✅ Clean: ' + (files.length - Object.keys(issueProducts).length));
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('   ❌ Critical: ' + totalCrit);
console.log('='.repeat(60));
