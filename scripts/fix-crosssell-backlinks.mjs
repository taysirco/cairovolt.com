/**
 * Fix bidirectional cross-sell links
 * If A→B exists but B→A doesn't, add A to B's relatedProducts
 * Respects max 6 related products per product
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));
const MAX_RELATED = 6;

// Phase 1: Build graph
const graph = {};
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
}

// Phase 2: Find missing backlinks
const toAdd = {}; // slug -> [slugs to add]
let totalMissing = 0;

for (const [slug, related] of Object.entries(graph)) {
  for (const target of related) {
    if (!graph[target]) continue;
    if (!graph[target].includes(slug)) {
      if (!toAdd[target]) toAdd[target] = [];
      if (!toAdd[target].includes(slug)) {
        toAdd[target].push(slug);
        totalMissing++;
      }
    }
  }
}

console.log(`Found ${totalMissing} missing backlinks across ${Object.keys(toAdd).length} products\n`);

// Phase 3: Add backlinks (respecting max)
let totalFixed = 0;
let skipped = 0;

for (const [slug, newLinks] of Object.entries(toAdd)) {
  const filePath = join(DIR, slug + '.ts');
  let content = readFileSync(filePath, 'utf-8');
  const currentRelated = graph[slug];
  const currentCount = currentRelated.length;
  
  // How many slots available
  const available = MAX_RELATED - currentCount;
  
  if (available <= 0) {
    // Replace least-connected links with more important ones
    // For now, skip
    console.log(`⏭️ ${slug}: Full (${currentCount}/${MAX_RELATED}), needs ${newLinks.length} backlinks — skipped ${newLinks.join(', ')}`);
    skipped += newLinks.length;
    continue;
  }
  
  const linksToAdd = newLinks.slice(0, available);
  
  // Find the relatedProducts array and add
  const relatedMatch = content.match(/relatedProducts:\s*\[([\s\S]*?)\]/);
  if (!relatedMatch) continue;
  
  const existingBlock = relatedMatch[1].trim();
  const newBlock = linksToAdd.map(s => `        "${s}"`).join(',\n');
  
  content = content.replace(
    relatedMatch[0],
    relatedMatch[0].replace(
      existingBlock,
      existingBlock + ',\n' + newBlock
    )
  );
  
  writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${slug}: Added ${linksToAdd.length} backlinks (${currentCount}→${currentCount + linksToAdd.length}): ${linksToAdd.join(', ')}`);
  totalFixed += linksToAdd.length;
}

console.log(`\n🎯 Fixed: ${totalFixed} backlinks added`);
if (skipped > 0) console.log(`⏭️ Skipped: ${skipped} (products at max capacity)`);
