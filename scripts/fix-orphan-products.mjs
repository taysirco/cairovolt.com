/**
 * SMART ORPHAN RESCUE
 * Strategy: For each orphan, find same-brand products that link to
 * over-linked products and swap the least important link with the orphan.
 * 
 * Rule: Same brand, same or complementary category gets priority
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));
const MAX = 6;

// Build complete picture
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

// Count incoming 
function countIncoming(slug) {
  let count = 0;
  for (const [src, targets] of Object.entries(graph)) {
    if (src !== slug && targets.includes(slug)) count++;
  }
  return count;
}

// Category affinity scoring
const catAffinity = {
  'cables': ['chargers', 'power-banks', 'car-chargers', 'smart-watches'],
  'chargers': ['cables', 'power-banks'],
  'power-banks': ['cables', 'chargers'],
  'audio': ['smart-watches', 'power-banks'],
  'car-chargers': ['cables', 'car-accessories'],
  'car-accessories': ['car-chargers', 'cables'],
  'smart-watches': ['audio', 'cables', 'chargers'],
  'wireless-chargers': ['cables', 'power-banks', 'chargers'],
};

function relevanceScore(slug1, slug2) {
  let score = 0;
  if (brands[slug1] === brands[slug2]) score += 3;
  if (categories[slug1] === categories[slug2]) score += 2;
  const affine = catAffinity[categories[slug1]] || [];
  if (affine.includes(categories[slug2])) score += 1;
  return score;
}

let totalSwaps = 0;

// Process orphans
const orphans = Object.keys(graph).filter(s => countIncoming(s) < 2);

for (const orphan of orphans) {
  const needed = 2 - countIncoming(orphan);
  if (needed <= 0) continue;
  
  // Find same-brand products that could swap a link
  const sameBrand = Object.keys(graph).filter(s => 
    s !== orphan && 
    brands[s] === brands[orphan] && 
    !graph[s].includes(orphan) // doesn't already link to orphan
  );
  
  // Sort by relevance to orphan
  sameBrand.sort((a, b) => relevanceScore(orphan, b) - relevanceScore(orphan, a));
  
  let swapsNeeded = needed;
  
  for (const candidate of sameBrand) {
    if (swapsNeeded <= 0) break;
    
    // If candidate has room, just add
    if (graph[candidate].length < MAX) {
      graph[candidate].push(orphan);
      // Write to file
      const filePath = join(DIR, candidate + '.ts');
      let content = readFileSync(filePath, 'utf-8');
      const match = content.match(/relatedProducts:\s*\[([\s\S]*?)\]/);
      if (match) {
        const existing = match[1].trim();
        content = content.replace(match[0], match[0].replace(existing, existing + `,\n        "${orphan}"`));
        writeFileSync(filePath, content, 'utf-8');
        console.log(`✅ ADD: ${candidate} → ${orphan} (had room: ${graph[candidate].length-1}→${graph[candidate].length})`);
        totalSwaps++;
        swapsNeeded--;
      }
    } else {
      // Find the least relevant link in candidate to swap
      const links = [...graph[candidate]];
      let worstLink = null;
      let worstScore = Infinity;
      
      for (const link of links) {
        const linkIncoming = countIncoming(link);
        // Don't remove links to products that also have few incoming
        if (linkIncoming <= 3) continue;
        
        const score = relevanceScore(candidate, link) * 10 + (1 / (linkIncoming + 1));
        if (score < worstScore) {
          worstScore = score;
          worstLink = link;
        }
      }
      
      if (worstLink && relevanceScore(candidate, orphan) >= relevanceScore(candidate, worstLink)) {
        // Swap
        const idx = graph[candidate].indexOf(worstLink);
        graph[candidate][idx] = orphan;
        
        const filePath = join(DIR, candidate + '.ts');
        let content = readFileSync(filePath, 'utf-8');
        content = content.replace(`"${worstLink}"`, `"${orphan}"`);
        writeFileSync(filePath, content, 'utf-8');
        console.log(`🔄 SWAP in ${candidate}: ${worstLink} (${countIncoming(worstLink)} incoming) → ${orphan}`);
        totalSwaps++;
        swapsNeeded--;
      }
    }
  }
  
  if (swapsNeeded > 0) {
    console.log(`⚠️ ${orphan}: Still needs ${swapsNeeded} more incoming links`);
  }
}

console.log(`\n🎯 Total operations: ${totalSwaps}`);

// Verify orphans after
const remainingOrphans = Object.keys(graph).filter(s => countIncoming(s) < 2);
console.log(`📊 Orphans remaining: ${remainingOrphans.length}`);
if (remainingOrphans.length > 0) {
  for (const o of remainingOrphans) {
    console.log(`   ${countIncoming(o)} incoming: ${o}`);
  }
}
