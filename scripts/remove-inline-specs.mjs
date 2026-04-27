/**
 * Remove <div class="technical-specs">...</div> blocks from all product description HTML.
 * These specs are duplicated in the 📊 Specifications section (details/*.ts).
 * Keeping the structured data source only (details.specifications → JSON-LD).
 */
import fs from 'fs';
import path from 'path';

const PRODUCTS_DIR = path.resolve('src/data/products');
const files = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.ts'));

let totalRemoved = 0;
let filesModified = 0;

for (const file of files) {
  const filePath = path.join(PRODUCTS_DIR, file);
  const original = fs.readFileSync(filePath, 'utf-8');

  // Remove multiline and single-line technical-specs blocks
  // Pattern: <div class="technical-specs">...everything...</div> (greedy within the block)
  // The closing </div> for technical-specs is either </table></div> or just </div>
  const cleaned = original.replace(
    /\n?\s*<div class="technical-specs">[\s\S]*?<\/table>\s*<\/div>\s*\n?/g,
    '\n'
  );

  if (cleaned !== original) {
    const removedCount = (original.match(/<div class="technical-specs">/g) || []).length;
    totalRemoved += removedCount;
    filesModified++;
    fs.writeFileSync(filePath, cleaned, 'utf-8');
    console.log(`✅ ${file} — removed ${removedCount} technical-specs block(s)`);
  }
}

console.log(`\n🎯 Done: ${totalRemoved} blocks removed from ${filesModified} files`);
