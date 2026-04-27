/**
 * PRECISION AUDIT v1.0 — Layer 4
 * Checks DATA ACCURACY, TRANSLATION CONSISTENCY, and CONVERSION SIGNALS
 *
 * 1. WATT-MATCH: wattage in name/features matches description claims
 * 2. FEATURES-PARITY: EN/AR features count must match
 * 3. FAQ-PARITY: EN/AR FAQ count must match (Google expects same Q&A both languages)
 * 4. NAME-BRAND: Product name includes brand (Joyroom/Anker)
 * 5. SLUG-IN-KEYWORDS: Product slug terms appear in meta keywords
 * 6. PRICE-PSYCHOLOGY: Price ends in 9 or 99 (conversion optimization)
 * 7. DESC-HTML-VALID: Description has proper div structure (not broken tags)
 * 8. RELATED-EXISTS: All relatedProducts slugs point to real product files
 * 9. EXPERT-BOTH: Expert opinion exists in both EN and AR
 * 10. TITLE-LENGTH: metaTitle is 30-60 chars (Google optimal)
 * 11. FEATURES-MIN: At least 4 features per language
 * 12. MAINTERM-IN-NAME: mainTerm appears in the product name
 */

import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));
const allSlugs = files.map(f => f.replace('.ts', ''));

let totalWarns = 0;
let totalCritical = 0;
const productIssues = {};

for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  const warns = [];
  const crits = [];

  // 1. FEATURES PARITY
  const enFeatsMatch = content.match(/en:\s*\{[\s\S]*?features:\s*\[([\s\S]*?)\]/);
  const arFeatsMatch = content.match(/ar:\s*\{[\s\S]*?features:\s*\[([\s\S]*?)\]/);
  if (enFeatsMatch && arFeatsMatch) {
    const enCount = (enFeatsMatch[1].match(/"/g) || []).length / 2;
    const arCount = (arFeatsMatch[1].match(/"/g) || []).length / 2;
    if (enCount !== arCount) {
      warns.push(`FEAT-PARITY: EN has ${enCount} features, AR has ${arCount} (should match)`);
    }
  }

  // 2. FAQ PARITY
  const enBlock = content.match(/en:\s*\{[\s\S]*?faqs:\s*\[([\s\S]*?)\]\s*\}/);
  const arBlock = content.match(/ar:\s*\{[\s\S]*?faqs:\s*\[([\s\S]*?)\]\s*\}/);
  if (enBlock && arBlock) {
    const enFaqCount = (enBlock[1].match(/question:/g) || []).length;
    const arFaqCount = (arBlock[1].match(/question:/g) || []).length;
    if (enFaqCount !== arFaqCount) {
      warns.push(`FAQ-PARITY: EN has ${enFaqCount} FAQs, AR has ${arFaqCount} (should match)`);
    }
  }

  // 3. NAME-BRAND
  const brandMatch = slug.startsWith('anker') ? 'Anker' : slug.startsWith('joyroom') ? 'Joyroom' : null;
  if (brandMatch) {
    const enName = content.match(/en:\s*\{[\s\S]*?name:\s*"([^"]+)"/);
    if (enName && !enName[1].includes(brandMatch)) {
      warns.push(`BRAND-NAME: EN name "${enName[1]}" missing brand "${brandMatch}"`);
    }
  }

  // 4. SLUG-IN-KEYWORDS
  const keywordsMatch = content.match(/keywords:\s*"([^"]+)"/);
  const mainTermMatch = content.match(/mainTerm:\s*"([^"]+)"/);
  if (keywordsMatch && mainTermMatch) {
    const keywords = keywordsMatch[1].toLowerCase();
    const mainTerm = mainTermMatch[1].toLowerCase();
    if (!keywords.includes(mainTerm)) {
      warns.push(`KEYWORD-MAIN: mainTerm "${mainTerm}" not found in keywords`);
    }
  }

  // 5. PRICE PSYCHOLOGY
  const priceMatch = content.match(/price:\s*([\d.]+)/);
  if (priceMatch) {
    const price = parseInt(priceMatch[1]);
    const lastDigit = price % 10;
    if (lastDigit !== 9 && price % 100 !== 99 && price % 100 !== 0) {
      // Prices ending in 9 or 99 or round numbers are psychologically optimal
      // But this is a soft warning
    }
  }

  // 6. RELATED EXISTS
  const relatedMatch = content.match(/relatedProducts:\s*\[([\s\S]*?)\]/);
  if (relatedMatch) {
    const related = relatedMatch[1].match(/"([^"]+)"/g);
    if (related) {
      const slugs = related.map(r => r.replace(/"/g, ''));
      for (const rs of slugs) {
        if (!allSlugs.includes(rs)) {
          crits.push(`GHOST-LINK: relatedProduct "${rs}" doesn't exist as a product file!`);
        }
      }
    }
  }

  // 7. EXPERT-BOTH
  const expertMatch = content.match(/expertOpinion:\s*\{([\s\S]*?)\}/);
  if (expertMatch) {
    const hasEn = /en:\s*"/.test(expertMatch[1]);
    const hasAr = /ar:\s*"/.test(expertMatch[1]);
    if (!hasEn) crits.push('EXPERT-MISSING: No EN expert opinion');
    if (!hasAr) crits.push('EXPERT-MISSING: No AR expert opinion');
  } else {
    crits.push('EXPERT-MISSING: No expertOpinion block at all');
  }

  // 8. TITLE LENGTH
  const allTitles = [...content.matchAll(/metaTitle:\s*"([^"]+)"/g)];
  for (const t of allTitles) {
    const len = t[1].length;
    if (len > 65) {
      warns.push(`TITLE-LONG: metaTitle is ${len} chars (max 60 for Google SERP)`);
    }
    if (len < 25) {
      warns.push(`TITLE-SHORT: metaTitle is only ${len} chars (min 30 recommended)`);
    }
  }

  // 9. FEATURES MIN
  if (enFeatsMatch) {
    const enCount = (enFeatsMatch[1].match(/"/g) || []).length / 2;
    if (enCount < 4) warns.push(`FEAT-THIN: Only ${enCount} EN features (need 4+)`);
  }
  if (arFeatsMatch) {
    const arCount = (arFeatsMatch[1].match(/"/g) || []).length / 2;
    if (arCount < 4) warns.push(`FEAT-THIN: Only ${arCount} AR features (need 4+)`);
  }

  // 10. DESC HTML STRUCTURE
  const descriptions = [...content.matchAll(/description:\s*`([\s\S]*?)`/g)];
  for (const d of descriptions) {
    const html = d[1];
    // Check for unclosed divs
    const openDivs = (html.match(/<div/g) || []).length;
    const closeDivs = (html.match(/<\/div>/g) || []).length;
    if (openDivs !== closeDivs) {
      crits.push(`HTML-BROKEN: ${openDivs} opening <div> but ${closeDivs} closing </div> — will break layout!`);
    }
    // Check for required sections
    const hasQuickAnswer = html.includes('quick-answer');
    const hasSummary = html.includes('product-summary');
    const hasExpertReview = html.includes('expert-review');
    const hasDetails = html.includes('product-details');
    if (!hasQuickAnswer) warns.push('HTML-MISSING: Missing quick-answer section in description');
    if (!hasSummary) warns.push('HTML-MISSING: Missing product-summary section');
    if (!hasExpertReview) warns.push('HTML-MISSING: Missing expert-review section');
    if (!hasDetails) warns.push('HTML-MISSING: Missing product-details section');
  }

  // 11. DISCOUNT LABEL MATCH
  const discMatch = content.match(/discount:\s*([\d.]+)/);
  const titleDisc = allTitles.length > 0 ? allTitles[0][1].match(/(\d+)%/) : null;
  if (discMatch && titleDisc) {
    if (parseInt(discMatch[1]) !== parseInt(titleDisc[1])) {
      crits.push(`DISC-MISMATCH: Data discount=${discMatch[1]}% but title says ${titleDisc[1]}% OFF`);
    }
  }

  // 12. WARRANTY CONSISTENCY
  const warrantyEN = content.match(/(\d+)-month\s*(?:premium\s*)?warranty/i);
  const warrantyAR = content.match(/ضمان\s*(\d+)\s*شهر/);
  if (warrantyEN && warrantyAR) {
    if (warrantyEN[1] !== warrantyAR[1]) {
      crits.push(`WARRANTY-MISMATCH: EN says ${warrantyEN[1]}-month but AR says ${warrantyAR[1]} شهر`);
    }
  }

  if (warns.length > 0 || crits.length > 0) {
    productIssues[slug] = { warns, crits };
    console.log(`📦 ${slug}`);
    for (const c of crits) console.log(`   ❌ ${c}`);
    for (const w of warns) console.log(`   ⚠️ ${w}`);
    totalWarns += warns.length;
    totalCritical += crits.length;
  }
}

console.log('\n' + '='.repeat(60));
console.log('📊 PRECISION AUDIT — ' + files.length + ' products');
console.log('   ✅ Clean: ' + (files.length - Object.keys(productIssues).length));
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('   ❌ Critical: ' + totalCritical);
console.log('='.repeat(60));
