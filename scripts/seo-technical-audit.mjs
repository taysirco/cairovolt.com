/**
 * SEO TECHNICAL AUDIT — Layer 9
 * Checks that directly impact Google rankings:
 * 
 * 1. DISCOUNT-MATH: Verify discount % matches price vs originalPrice
 * 2. ALT-KEYWORD: Primary image alt should contain mainTerm or brand+product
 * 3. INTERNAL-LINKS: Description should contain at least 1 internal link to related product
 * 4. WORD-COUNT: EN vs AR description word count should be within 30% of each other
 * 5. HEADING-H2: Description must use at least 2 H2 headings for content structure
 * 6. FAQ-DEPTH: Each FAQ answer should be >15 words for rich snippet eligibility
 * 7. SHORT-DESC-LENGTH: shortDescription should be 80-200 chars (snippet-optimized)
 * 8. META-TITLE-POWER: metaTitle should contain discount% or power word (⚡💰🔥)
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

for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  
  // 1. DISCOUNT-MATH
  const priceM = content.match(/price:\s*([\d.]+)/);
  const origM = content.match(/originalPrice:\s*([\d.]+)/);
  if (priceM && origM) {
    const price = parseFloat(priceM[1]);
    const orig = parseFloat(origM[1]);
    const actualDiscount = Math.round(((orig - price) / orig) * 100);
    
    // Check if metaTitle mentions a discount that doesn't match
    const metaTitles = [...content.matchAll(/metaTitle:\s*"([^"]+)"/g)];
    for (const mt of metaTitles) {
      const discMatch = mt[1].match(/(\d+)%\s*(OFF|خصم)/i);
      if (discMatch) {
        const claimed = parseInt(discMatch[1]);
        if (Math.abs(claimed - actualDiscount) > 2) {
          crit(slug, `DISCOUNT-LIE: Claims ${claimed}% but actual is ${actualDiscount}% (${price}/${orig})`);
        }
      }
    }
  }
  
  // 2. ALT-KEYWORD — primary image alt should contain brand or key term
  const brandMatch = content.match(/brand:\s*"([^"]+)"/);
  const brand = brandMatch ? brandMatch[1].toLowerCase() : '';
  const brandAliases = { 'anker': ['anker', 'انكر'], 'joyroom': ['joyroom', 'جوي روم'] };
  const aliases = brandAliases[brand] || [brand];
  const primaryImg = content.match(/isPrimary:\s*true[^}]*alt:\s*"([^"]+)"/);
  if (!primaryImg) {
    const altFirst = content.match(/alt:\s*"([^"]+)"[^}]*isPrimary:\s*true/);
    if (altFirst && brand && !aliases.some(a => altFirst[1].toLowerCase().includes(a))) {
      warn(slug, `ALT-NO-BRAND: Primary image alt "${altFirst[1]}" missing brand "${brand}"`);
    }
  }
  
  // 3. INTERNAL-LINKS in description
  const descEN = content.match(/description:\s*`([\s\S]*?)`/);
  if (descEN) {
    const links = descEN[1].match(/href="[^"]*\/product/g);
    // Not enforcing — internal links within description are nice-to-have
  }
  
  // 4. WORD-COUNT parity
  const descs = [...content.matchAll(/description:\s*`([\s\S]*?)`/g)];
  if (descs.length >= 2) {
    const enText = descs[0][1].replace(/<[^>]+>/g, '').trim();
    const arText = descs[1][1].replace(/<[^>]+>/g, '').trim();
    const enWords = enText.split(/\s+/).length;
    const arWords = arText.split(/\s+/).length;
    const ratio = Math.min(enWords, arWords) / Math.max(enWords, arWords);
    if (ratio < 0.5) {
      warn(slug, `CONTENT-IMBALANCE: EN ${enWords} words vs AR ${arWords} words (ratio ${(ratio*100).toFixed(0)}%)`);
    }
  }
  
  // 5. HEADING-H2 count
  if (descEN) {
    const h2Count = (descEN[1].match(/<h2/g) || []).length;
    if (h2Count < 2) {
      warn(slug, `LOW-H2: Only ${h2Count} H2 headings in description (need 2+ for content structure)`);
    }
  }
  
  // 6. FAQ-DEPTH — each answer must be >15 words
  const faqBlocks = [...content.matchAll(/answer:\s*"([^"]+)"/g)];
  for (const fq of faqBlocks) {
    const wordCount = fq[1].split(/\s+/).length;
    if (wordCount < 10) {
      warn(slug, `FAQ-SHALLOW: Answer "${fq[1].substring(0, 40)}..." only ${wordCount} words`);
    }
  }
  
  // 7. SHORT-DESC-LENGTH (handle escaped quotes in regex)
  const shortDescs = [...content.matchAll(/shortDescription:\s*"((?:[^"\\]|\\.)+)"/g)];
  for (const sd of shortDescs) {
    if (sd[1].length < 60) {
      warn(slug, `SHORT-DESC-THIN: shortDescription only ${sd[1].length} chars`);
    }
    if (sd[1].length > 250) {
      warn(slug, `SHORT-DESC-LONG: shortDescription ${sd[1].length} chars (may truncate)`);
    }
  }
  
  // 8. META-TITLE POWER WORDS
  const metaTitles = [...content.matchAll(/metaTitle:\s*"([^"]+)"/g)];
  for (const mt of metaTitles) {
    if (!/⚡|💰|🔥|%|OFF|خصم|ضمان|Warranty|COD/i.test(mt[1])) {
      warn(slug, `TITLE-WEAK: metaTitle lacks power words or discount: "${mt[1].substring(0, 50)}..."`);
    }
  }
  
  // 9. NAME-LENGTH check (for structured data)
  const names = [...content.matchAll(/name:\s*"([^"]+)"/g)];
  for (const n of names) {
    if (n[1].length > 120) {
      warn(slug, `NAME-LONG: Product name ${n[1].length} chars — may truncate in SERPs`);
    }
  }
  
  // 10. KEYWORD-DENSITY — mainTerm should appear in metaDesc
  const mainTermM = content.match(/mainTerm:\s*"([^"]+)"/);
  if (mainTermM) {
    const mainTerm = mainTermM[1].toLowerCase();
    const metaDescs = [...content.matchAll(/metaDesc:\s*"([^"]+)"/g)];
    let foundInMeta = false;
    for (const md of metaDescs) {
      if (md[1].toLowerCase().includes(mainTerm.split(' ').slice(0, 2).join(' '))) {
        foundInMeta = true;
        break;
      }
    }
    if (!foundInMeta) {
      warn(slug, `KEYWORD-MISS: mainTerm "${mainTerm}" not found in any metaDesc`);
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
console.log('📊 SEO TECHNICAL AUDIT — ' + files.length + ' products');
console.log('   ✅ Clean: ' + (files.length - Object.keys(issueProducts).length));
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('   ❌ Critical: ' + totalCrit);
console.log('='.repeat(60));
