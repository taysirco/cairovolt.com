import { readFileSync, writeFileSync, readdirSync } from 'fs';

const dir = 'src/data/products';
const files = readdirSync(dir).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

let fixed = 0;
for (const file of files) {
  let content = readFileSync(`${dir}/${file}`, 'utf-8');
  let changed = false;
  
  // Find all metaTitle values and check length
  const regex = /metaTitle:\s*["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const title = match[1];
    if (title.length > 60) {
      console.log(`\n📦 ${file}`);
      console.log(`   BEFORE (${title.length}): ${title}`);
      
      // Smart shortening strategies
      let shortened = title;
      
      // Strategy 1: Remove "ادفع عند الاستلام" → "COD"
      shortened = shortened.replace('ادفع عند الاستلام', 'COD مصر');
      shortened = shortened.replace('| ادفع عند الاستلام', '| COD');
      
      // Strategy 2: Remove duplicate separators
      shortened = shortened.replace(/\s*\|\s*\|\s*/g, ' | ');
      
      // Strategy 3: Shorten "خصم XX%" to just the emoji + discount  
      // Strategy 4: Remove redundant "COD Egypt" if already short enough
      if (shortened.length > 60) {
        shortened = shortened.replace('| COD Egypt', '| COD');
      }
      if (shortened.length > 60) {
        shortened = shortened.replace(' | COD Egypt', '');
      }
      if (shortened.length > 60) {
        shortened = shortened.replace(' | COD مصر', '');
      }
      
      // Strategy 5: Shorten "CairoVolt Warranty" → "Warranty"
      if (shortened.length > 60) {
        shortened = shortened.replace('CairoVolt Warranty', 'Warranty');
      }
      
      // Strategy 6: trim trailing whitespace and pipes
      shortened = shortened.replace(/\s*\|\s*$/, '').trim();
      
      if (shortened.length <= 60 && shortened !== title) {
        content = content.replace(match[0], `metaTitle: "${shortened}"`);
        changed = true;
        console.log(`   AFTER  (${shortened.length}): ${shortened}`);
      } else {
        console.log(`   ⚠️ MANUAL FIX NEEDED (${shortened.length}): ${shortened}`);
      }
    }
  }
  
  if (changed) {
    writeFileSync(`${dir}/${file}`, content);
    fixed++;
  }
}

console.log(`\n=== Fixed ${fixed} files ===`);
