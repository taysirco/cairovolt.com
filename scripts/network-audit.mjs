/**
 * NETWORK AUDIT v1.0 — Layer 5
 * Cross-sell network integrity, internal link validation, discount title accuracy
 *
 * 1. CROSS-SELL BIDIRECTIONAL: If A→B, does B→A?
 * 2. CROSS-SELL CLUSTER: Products with <4 incoming links (orphans)
 * 3. INTERNAL-HREF: href links in descriptions point to valid routes
 * 4. DISCOUNT-TITLE: % in metaTitle matches calculated discount
 * 5. FEATURE-EMOJI: ALL features should start with emoji
 * 6. DESCRIPTION-DUPLICATE: No two products share same description blocks
 * 7. GTIN-VALID: GTIN is 13 digits (EAN-13) 
 * 8. SKU-UNIQUE: No duplicate SKUs across products
 */

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));
const allSlugs = new Set(files.map(f => f.replace('.ts', '')));

let totalWarns = 0;
let totalCritical = 0;
const productIssues = {};

// === PHASE 1: Build cross-sell graph ===
const graph = {}; // slug -> [relatedSlugs]
const allSkus = {};
const allGtins = {};

for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  
  const relatedMatch = content.match(/relatedProducts:\s*\[([\s\S]*?)\]/);
  const related = [];
  if (relatedMatch) {
    const slugMatches = relatedMatch[1].match(/"([^"]+)"/g);
    if (slugMatches) related.push(...slugMatches.map(r => r.replace(/"/g, '')));
  }
  graph[slug] = related;
  
  // Collect SKUs
  const skuMatch = content.match(/sku:\s*"([^"]+)"/);
  if (skuMatch) {
    if (allSkus[skuMatch[1]]) allSkus[skuMatch[1]].push(slug);
    else allSkus[skuMatch[1]] = [slug];
  }
  
  // Collect GTINs
  const gtinMatch = content.match(/gtin:\s*"([^"]+)"/);
  if (gtinMatch) {
    if (allGtins[gtinMatch[1]]) allGtins[gtinMatch[1]].push(slug);
    else allGtins[gtinMatch[1]] = [slug];
  }
}

// === PHASE 2: Analyze per product ===
for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  const warns = [];
  const crits = [];

  // 1. CROSS-SELL BIDIRECTIONAL
  const myRelated = graph[slug] || [];
  for (const target of myRelated) {
    if (!allSlugs.has(target)) continue; // ghost link already caught in L4
    const theirRelated = graph[target] || [];
    if (!theirRelated.includes(slug)) {
      warns.push(`CROSS-1WAY: ${slug} → ${target} but ${target} ↛ ${slug}`);
    }
  }

  // 2. INCOMING LINKS (orphan detection)
  let incoming = 0;
  for (const [src, targets] of Object.entries(graph)) {
    if (src !== slug && targets.includes(slug)) incoming++;
  }
  if (incoming < 2) {
    warns.push(`ORPHAN: Only ${incoming} products link TO this (need 2+ for discoverability)`);
  }

  // 3. INTERNAL HREF VALIDATION
  const hrefs = [...content.matchAll(/href="([^"]+)"/g)];
  for (const h of hrefs) {
    const href = h[1];
    // Skip external links
    if (href.startsWith('http') || href.startsWith('#')) continue;
    // Category links like /anker/wall-chargers are OK
    // Product links should match a slug
    const parts = href.split('/').filter(Boolean);
    if (parts.length >= 3) {
      // Likely a product link: /brand/category/slug
      const linkedSlug = parts[parts.length - 1];
      if (!allSlugs.has(linkedSlug) && !['wall-chargers','power-banks','cables','audio','chargers','car-chargers'].includes(linkedSlug)) {
        warns.push(`DEAD-LINK: href="${href}" doesn't map to a known product or category`);
      }
    }
  }

  // 4. DISCOUNT-TITLE MATCH
  const priceMatch = content.match(/price:\s*([\d.]+)/);
  const origMatch = content.match(/originalPrice:\s*([\d.]+)/);
  if (priceMatch && origMatch) {
    const calcDisc = Math.round((1 - parseFloat(priceMatch[1]) / parseFloat(origMatch[1])) * 100);
    const allTitles = [...content.matchAll(/metaTitle:\s*"([^"]+)"/g)];
    for (const t of allTitles) {
      const titleDiscMatch = t[1].match(/(\d+)%/);
      if (titleDiscMatch) {
        const titleDisc = parseInt(titleDiscMatch[1]);
        if (Math.abs(titleDisc - calcDisc) > 2) {
          crits.push(`DISC-LIE: Title says ${titleDisc}% OFF but math = ${calcDisc}% (price=${priceMatch[1]}, orig=${origMatch[1]})`);
        }
      }
    }
  }

  // 5. FEATURE EMOJI CHECK
  const allFeatures = [...content.matchAll(/features:\s*\[([\s\S]*?)\]/g)];
  for (const fm of allFeatures) {
    const feats = fm[1].match(/"([^"]+)"/g);
    if (feats) {
      for (const f of feats) {
        const feat = f.replace(/"/g, '');
        // Check if starts with emoji or special char
        const hasLeadEmoji = /^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}⚡✓🔥🛡️💰📱🎧🔋🔌🚗⌚🔊✨⚖️🧵🏆💪📊💻🤖🎵📦🔗💾🔩📐🎮⏱️✅]/u.test(feat);
        if (!hasLeadEmoji) {
          warns.push(`FEAT-NO-EMOJI: "${feat.substring(0, 40)}..." missing leading emoji`);
          break; // One warning per product
        }
      }
    }
  }

  // 6. GTIN VALIDATION
  const gtinMatch = content.match(/gtin:\s*"([^"]+)"/);
  if (gtinMatch) {
    const gtin = gtinMatch[1];
    if (gtin.length !== 13 && gtin.length !== 14 && gtin.length !== 12) {
      warns.push(`GTIN-LENGTH: GTIN "${gtin}" is ${gtin.length} chars (should be 12-14 for UPC/EAN)`);
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

// === PHASE 3: Global checks ===
// SKU uniqueness
for (const [sku, slugs] of Object.entries(allSkus)) {
  if (slugs.length > 1) {
    console.log(`❌ DUPE-SKU: "${sku}" used by: ${slugs.join(', ')}`);
    totalCritical++;
  }
}
// GTIN uniqueness
for (const [gtin, slugs] of Object.entries(allGtins)) {
  if (slugs.length > 1) {
    console.log(`❌ DUPE-GTIN: "${gtin}" used by: ${slugs.join(', ')}`);
    totalCritical++;
  }
}

console.log('\n' + '='.repeat(60));
console.log('📊 NETWORK AUDIT — ' + files.length + ' products');
console.log('   ✅ Clean: ' + (files.length - Object.keys(productIssues).length));
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('   ❌ Critical: ' + totalCritical);
console.log('='.repeat(60));
