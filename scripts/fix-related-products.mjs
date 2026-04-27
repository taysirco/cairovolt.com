import { readFileSync, writeFileSync, readdirSync } from 'fs';

const dir = 'src/data/products';
const files = readdirSync(dir).filter(f => f.startsWith('joyroom-') && f.endsWith('.ts'));

// Build category map
const products = {};
for (const file of files) {
  const slug = file.replace('.ts', '');
  const content = readFileSync(`${dir}/${file}`, 'utf-8');
  const catMatch = content.match(/categorySlug:\s*["']([^"']+)["']/);
  const hasRelated = content.includes('relatedProducts:');
  products[slug] = { cat: catMatch?.[1] || 'unknown', hasRelated, file };
}

// Group by category
const cats = {};
for (const [slug, info] of Object.entries(products)) {
  if (!cats[info.cat]) cats[info.cat] = [];
  cats[info.cat].push(slug);
}

console.log('=== Joyroom categories ===');
for (const [cat, slugs] of Object.entries(cats)) {
  console.log(`${cat}: ${slugs.length} products`);
  slugs.forEach(s => console.log(`  ${products[s].hasRelated ? '✅' : '❌'} ${s}`));
}

// Generate smart relatedProducts for each missing product
let fixed = 0;
for (const [slug, info] of Object.entries(products)) {
  if (info.hasRelated) continue;
  
  const sameCat = cats[info.cat].filter(s => s !== slug);
  const otherCats = Object.entries(cats)
    .filter(([c]) => c !== info.cat)
    .flatMap(([, slugs]) => slugs);
  
  // Pick 2-3 from same category + 2-3 from complementary categories
  const related = [];
  related.push(...sameCat.slice(0, 2));
  
  // Smart cross-category logic
  const cat = info.cat;
  if (cat === 'cables') {
    // cables → chargers + power banks
    related.push(...(cats['wall-chargers'] || []).slice(0, 1));
    related.push(...(cats['power-banks'] || []).slice(0, 1));
    related.push(...(cats['car-chargers'] || []).slice(0, 1));
  } else if (cat === 'wall-chargers') {
    related.push(...(cats['cables'] || []).slice(0, 2));
    related.push(...(cats['power-banks'] || []).slice(0, 1));
  } else if (cat === 'power-banks') {
    related.push(...(cats['cables'] || []).slice(0, 1));
    related.push(...(cats['wall-chargers'] || []).slice(0, 1));
    related.push(...(cats['car-chargers'] || []).slice(0, 1));
  } else if (cat === 'car-chargers') {
    related.push(...(cats['cables'] || []).slice(0, 1));
    related.push(...(cats['car-holders'] || []).slice(0, 1));
    related.push(...(cats['power-banks'] || []).slice(0, 1));
  } else if (cat === 'car-holders') {
    related.push(...(cats['car-chargers'] || []).slice(0, 1));
    related.push(...(cats['cables'] || []).slice(0, 1));
  } else if (cat === 'audio') {
    related.push(...(cats['cables'] || []).slice(0, 1));
    related.push(...(cats['power-banks'] || []).slice(0, 1));
  } else if (cat === 'smart-watches') {
    related.push(...(cats['cables'] || []).slice(0, 1));
    related.push(...(cats['power-banks'] || []).slice(0, 1));
    related.push(...(cats['wall-chargers'] || []).slice(0, 1));
  } else {
    // wireless charging etc → chargers + cables
    related.push(...(cats['wall-chargers'] || []).slice(0, 1));
    related.push(...(cats['cables'] || []).slice(0, 1));
  }
  
  // Deduplicate and limit to 5
  const unique = [...new Set(related)].slice(0, 5);
  
  // Inject into file
  const filePath = `${dir}/${info.file}`;
  let content = readFileSync(filePath, 'utf-8');
  
  // Insert before the closing };
  const relatedStr = `        relatedProducts: [${unique.map(s => `"${s}"`).join(', ')}],\n`;
  content = content.replace(/(\n\s*};?\s*$)/, `\n${relatedStr}$1`);
  
  writeFileSync(filePath, content);
  console.log(`\n✅ Fixed ${slug} → [${unique.join(', ')}]`);
  fixed++;
}

console.log(`\n=== Fixed ${fixed} products ===`);
