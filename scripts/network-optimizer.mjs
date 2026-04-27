/**
 * SMART CROSS-SELL OPTIMIZER
 * 1. Find orphan products (0-1 incoming links)
 * 2. For each orphan, find the best product to swap a link in
 * 3. Replace the least relevant link with the orphan
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

// Build graph
const graph = {};
const categories = {};
const brands = {};

for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  
  const relatedMatch = content.match(/relatedProducts:\s*\[([\s\S]*?)\]/);
  const related = [];
  if (relatedMatch) {
    const slugs = relatedMatch[1].match(/"([^"]+)"/g);
    if (slugs) related.push(...slugs.map(s => s.replace(/"/g, '')));
  }
  graph[slug] = related;
  
  const catMatch = content.match(/categorySlug:\s*"([^"]+)"/);
  categories[slug] = catMatch ? catMatch[1] : 'unknown';
  brands[slug] = slug.startsWith('anker') ? 'anker' : 'joyroom';
}

// Count incoming links
const incoming = {};
for (const slug of Object.keys(graph)) incoming[slug] = 0;
for (const [src, targets] of Object.entries(graph)) {
  for (const t of targets) {
    if (incoming[t] !== undefined) incoming[t]++;
  }
}

// Find orphans
const orphans = Object.entries(incoming)
  .filter(([slug, count]) => count < 2)
  .sort((a, b) => a[1] - b[1]);

console.log('🔍 ORPHAN ANALYSIS (products with <2 incoming links):\n');
for (const [slug, count] of orphans) {
  console.log(`   ${count === 0 ? '🚨' : '⚠️'} ${slug}: ${count} incoming | category: ${categories[slug]} | brand: ${brands[slug]}`);
  console.log(`      Links TO: ${graph[slug].join(', ')}`);
  
  // Find same-brand, same-category products that could link back
  const sameBrand = Object.keys(graph).filter(s => 
    s !== slug && brands[s] === brands[slug] && graph[s].length <= 6
  );
  const candidates = sameBrand
    .filter(s => !graph[s].includes(slug)) // doesn't already link
    .filter(s => graph[s].length < 6 || graph[slug].includes(s)) // has room OR is already linked FROM orphan
    .slice(0, 3);
  
  if (candidates.length > 0) {
    console.log(`      🔗 Can add to: ${candidates.join(', ')}`);
  }
  console.log('');
}

// Summary
console.log('='.repeat(60));
console.log(`📊 NETWORK MAP — ${Object.keys(graph).length} products`);
console.log(`   🚨 0 incoming: ${orphans.filter(([,c]) => c === 0).length}`);
console.log(`   ⚠️ 1 incoming: ${orphans.filter(([,c]) => c === 1).length}`);
console.log(`   ✅ 2+ incoming: ${Object.keys(incoming).length - orphans.length}`);

// Top linked (most incoming)
const topLinked = Object.entries(incoming).sort((a, b) => b[1] - a[1]).slice(0, 5);
console.log('\n   🏆 Most linked TO:');
for (const [slug, count] of topLinked) {
  console.log(`      ${count} incoming: ${slug}`);
}
console.log('='.repeat(60));
