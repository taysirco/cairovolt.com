/**
 * Fix CROSS-SELL bidirectionality
 * If product A links to B, then B should also link to A
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';

const PRODUCTS_DIR = 'src/data/products';
let fixed = 0;

const files = readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));
const allSlugs = files.map(f => f.replace('.ts', ''));

// Step 1: Build the full relatedProducts map
const relatedMap = {};
for (const file of files) {
  const slug = file.replace('.ts', '');
  const content = readFileSync(`${PRODUCTS_DIR}/${file}`, 'utf-8');
  const related = content.match(/relatedProducts:\s*\[([\s\S]*?)\]/);
  if (related) {
    const refs = related[1].match(/["']([^"']+)["']/g)?.map(s => s.replace(/["']/g, '')) || [];
    relatedMap[slug] = refs.filter(r => allSlugs.includes(r));
  } else {
    relatedMap[slug] = [];
  }
}

// Step 2: For each product, find what SHOULD link to it (bidirectional)
const additions = {};
for (const slug of allSlugs) {
  additions[slug] = [];
}

for (const [slug, related] of Object.entries(relatedMap)) {
  for (const ref of related) {
    if (!relatedMap[ref]?.includes(slug)) {
      // ref should link back to slug
      additions[ref].push(slug);
    }
  }
}

// Step 3: Apply additions (max 6 total related products)
for (const [slug, toAdd] of Object.entries(additions)) {
  if (toAdd.length === 0) continue;
  
  const file = `${slug}.ts`;
  let content = readFileSync(`${PRODUCTS_DIR}/${file}`, 'utf-8');
  
  const currentRelated = relatedMap[slug] || [];
  const newRelated = [...new Set([...currentRelated, ...toAdd])];
  
  // Cap at 6 to avoid bloated cross-sell
  const capped = newRelated.slice(0, 6);
  
  if (capped.length === currentRelated.length && capped.every((v, i) => v === currentRelated[i])) {
    continue; // No change needed
  }
  
  // Build new relatedProducts array string
  const newRelatedStr = capped.map(s => `"${s}"`).join(',\n        ');
  
  // Replace the relatedProducts array
  content = content.replace(
    /relatedProducts:\s*\[[\s\S]*?\]/,
    `relatedProducts: [\n        ${newRelatedStr}\n    ]`
  );
  
  writeFileSync(`${PRODUCTS_DIR}/${file}`, content);
  fixed++;
  const addedCount = capped.length - currentRelated.length;
  if (addedCount > 0) {
    console.log(`✅ ${slug}: +${addedCount} backlinks (${currentRelated.length}→${capped.length})`);
  }
}

console.log(`\n=== Fixed cross-sell in ${fixed} products ===`);
