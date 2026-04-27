/**
 * Add CTA verbs to meta descriptions missing them
 * Strategy: Prepend "Buy " / "اشتري " to descriptions
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

let totalFixed = 0;

for (const file of files) {
  const filePath = join(DIR, file);
  let content = readFileSync(filePath, 'utf-8');
  const slug = file.replace('.ts', '');
  let changed = false;

  // Find all metaDesc entries
  const matches = [...content.matchAll(/metaDesc:\s*"([^"]+)"/g)];
  for (const m of matches) {
    const desc = m[1];
    
    // Skip if already has CTA
    if (/buy|shop|order|get your|اشتري|اطلب|احصل/i.test(desc)) continue;
    
    // Determine language
    const isArabic = /[\u0600-\u06FF]/.test(desc);
    
    let newDesc;
    if (isArabic) {
      // Arabic: prepend "اشتري"
      newDesc = 'اشتري ' + desc.charAt(0).toLowerCase() + desc.slice(1);
      // If too long, trim end
      if (newDesc.length > 160) newDesc = newDesc.substring(0, 157) + '...';
    } else {
      // English: prepend "Buy"
      newDesc = 'Buy ' + desc.charAt(0).toLowerCase() + desc.slice(1);
      if (newDesc.length > 160) newDesc = newDesc.substring(0, 157) + '...';
    }
    
    content = content.replace(`metaDesc: "${desc}"`, `metaDesc: "${newDesc}"`);
    console.log(`✅ ${slug} [${isArabic ? 'AR' : 'EN'}]: Added CTA`);
    changed = true;
    totalFixed++;
  }
  
  if (changed) writeFileSync(filePath, content, 'utf-8');
}

console.log(`\n🎯 Fixed ${totalFixed} meta descriptions with CTA`);
