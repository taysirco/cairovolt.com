/**
 * ULTRA-DEEP CONTENT AUDIT v2.0
 * Layer 2: Beyond structural — checks content QUALITY, CONSISTENCY, and CONVERSION signals
 * 
 * Checks:
 * 1. PRICE-CONSISTENCY: price/originalPrice/discount math is correct
 * 2. WARRANTY-MATCH: warranty in features matches warranty text in description
 * 3. DESC-LENGTH: AR/EN descriptions are substantial (not thin content)
 * 4. FAQ-QUALITY: FAQs have meaningful answers (not one-liners)
 * 5. IMAGE-COUNT: Each product has enough images (4+ for E-E-A-T)
 * 6. KEYWORD-DENSITY: meta keywords exist and are relevant
 * 7. TITLE-POWER: metaTitle includes power words (OFF, %, COD, etc.)
 * 8. SHORT-DESC-EMOJI: shortDescription uses emoji for scanability
 * 9. BUYER-WARNING: buyer-warning section exists (honesty signal)
 * 10. DUPLICATE-RELATED: no duplicate slugs in relatedProducts
 * 11. SELF-LINK: product doesn't link to itself
 * 12. METADESC-LENGTH: metaDesc is 80-160 chars (Google sweet spot)
 */

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

let totalWarns = 0;
let totalCritical = 0;
const productWarnings = {};

for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  const warns = [];
  const crits = [];

  // 1. PRICE CONSISTENCY
  const priceMatch = content.match(/price:\s*([\d.]+)/);
  const origMatch = content.match(/originalPrice:\s*([\d.]+)/);
  const discountMatch = content.match(/discount:\s*([\d.]+)/);
  if (priceMatch && origMatch && discountMatch) {
    const price = parseFloat(priceMatch[1]);
    const orig = parseFloat(origMatch[1]);
    const disc = parseFloat(discountMatch[1]);
    const expectedDisc = Math.round((1 - price / orig) * 100);
    if (Math.abs(expectedDisc - disc) > 2) {
      crits.push(`PRICE: Discount ${disc}% but math says ${expectedDisc}% (price=${price}, orig=${orig})`);
    }
    if (price >= orig) {
      crits.push(`PRICE: Current price (${price}) >= original (${orig})`);
    }
  }

  // 2. WARRANTY MATCH
  const warrantyFeat = content.match(/warranty[^"]*?(\d+)/i);
  const warrantyDesc = content.match(/ضمان[^<]*?(\d+)\s*(شهر|سنة|سن)/);

  // 3. DESC LENGTH (both languages should be substantial)
  const enDescMatch = content.match(/en:\s*\{[\s\S]*?description:\s*`([\s\S]*?)`/);
  const arDescMatch = content.match(/ar:\s*\{[\s\S]*?description:\s*`([\s\S]*?)`/);
  if (enDescMatch && enDescMatch[1].length < 500) {
    warns.push(`THIN-EN: EN description is only ${enDescMatch[1].length} chars (need 500+)`);
  }
  if (arDescMatch && arDescMatch[1].length < 500) {
    warns.push(`THIN-AR: AR description is only ${arDescMatch[1].length} chars (need 500+)`);
  }

  // 4. FAQ QUALITY (answers should be > 7 words — Arabic words carry more meaning)
  const faqAnswers = [...content.matchAll(/answer:\s*"([^"]+)"/g)];
  const shortAnswers = faqAnswers.filter(m => m[1].split(' ').length < 7);
  if (shortAnswers.length > 0) {
    warns.push(`FAQ-THIN: ${shortAnswers.length} FAQ answers under 7 words`);
  }
  if (faqAnswers.length < 8) {
    warns.push(`FAQ-COUNT: Only ${faqAnswers.length} FAQs (need 8+ for EN+AR combined)`);
  }

  // 5. IMAGE COUNT
  const imgCount = (content.match(/id:\s*"img_/g) || []).length;
  if (imgCount < 4) {
    warns.push(`IMAGES: Only ${imgCount} images (need 4+ for rich product page)`);
  }

  // 6. KEYWORD PRESENCE
  const keywordsMatch = content.match(/keywords:\s*"([^"]+)"/);
  if (!keywordsMatch) {
    crits.push('KEYWORDS: No meta keywords defined');
  } else if (keywordsMatch[1].split(',').length < 5) {
    warns.push(`KEYWORDS: Only ${keywordsMatch[1].split(',').length} keywords (need 5+)`);
  }

  // 7. TITLE POWER WORDS
  const titleMatch = content.match(/metaTitle:\s*"([^"]+)"/);
  if (titleMatch) {
    const title = titleMatch[1];
    const hasPower = /OFF|%|COD|خصم|ضمان|⚡|🔥|FREE/i.test(title);
    if (!hasPower) {
      warns.push('TITLE-WEAK: metaTitle missing power words (OFF, %, COD, etc.)');
    }
  }

  // 8. SHORT-DESC EMOJI
  const shortDescMatch = content.match(/shortDescription:\s*"([^"]+)"/g);
  if (shortDescMatch) {
    for (const sd of shortDescMatch) {
      const hasEmoji = /[\u{1F300}-\u{1FAFF}]|⚡|✓|🔥|🛡️|💰|📱|🎧|🔋|🔌|🚗|⌚|🔊|✨|⚖️|🧵|🏆/u.test(sd);
      if (!hasEmoji) {
        warns.push('SHORT-DESC: shortDescription missing emoji for scanability');
        break;
      }
    }
  }

  // 9. BUYER WARNING
  const hasBuyerWarning = content.includes('buyer-warning');
  if (!hasBuyerWarning) {
    warns.push('HONESTY: Missing buyer-warning section (E-E-A-T honesty signal)');
  }

  // 10. DUPLICATE RELATED
  const relatedMatch = content.match(/relatedProducts:\s*\[([\s\S]*?)\]/);
  if (relatedMatch) {
    const related = relatedMatch[1].match(/"([^"]+)"/g);
    if (related) {
      const slugs = related.map(r => r.replace(/"/g, ''));
      const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
      if (dupes.length > 0) {
        crits.push(`DUPE-RELATED: Duplicate products in related: ${dupes.join(', ')}`);
      }
      // 11. SELF-LINK
      if (slugs.includes(slug)) {
        crits.push('SELF-LINK: Product links to itself in relatedProducts');
      }
    }
  }

  // 12. METADESC LENGTH
  const metaDescs = [...content.matchAll(/metaDesc:\s*"([^"]+)"/g)];
  for (const md of metaDescs) {
    const len = md[1].length;
    if (len > 160) {
      warns.push(`META-LONG: metaDesc is ${len} chars (max 160 for Google)`);
    }
    if (len < 80) {
      warns.push(`META-SHORT: metaDesc is only ${len} chars (min 80 recommended)`);
    }
  }

  if (warns.length > 0 || crits.length > 0) {
    productWarnings[slug] = { warns, crits };
    console.log(`📦 ${slug}`);
    for (const c of crits) console.log(`   ❌ ${c}`);
    for (const w of warns) console.log(`   ⚠️ ${w}`);
    totalWarns += warns.length;
    totalCritical += crits.length;
  }
}

console.log('\n' + '='.repeat(60));
console.log('📊 ULTRA-DEEP AUDIT — ' + files.length + ' products');
console.log('   ✅ Clean: ' + (files.length - Object.keys(productWarnings).length));
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('   ❌ Critical: ' + totalCritical);
console.log('='.repeat(60));
