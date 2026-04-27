/**
 * Inject mainTerm keywords into meta descriptions where missing
 * Strategy: Append core keyword naturally to the meta description
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
  
  const mainTermM = content.match(/mainTerm:\s*"([^"]+)"/);
  if (!mainTermM) continue;
  
  const mainTerm = mainTermM[1];
  const coreKeywords = mainTerm.toLowerCase().split(' ').slice(0, 2).join(' ');
  
  // Check each metaDesc
  const metaDescs = [...content.matchAll(/metaDesc:\s*"([^"]+)"/g)];
  let changed = false;
  
  for (const md of metaDescs) {
    if (md[1].toLowerCase().includes(coreKeywords)) continue;
    
    const isArabic = /[\u0600-\u06FF]/.test(md[1]);
    
    // Only inject English mainTerm into English meta, Arabic into Arabic
    if (isArabic && !/[\u0600-\u06FF]/.test(mainTerm)) continue;
    if (!isArabic && /[\u0600-\u06FF]/.test(mainTerm)) continue;
    
    // Check if term fits (meta desc shouldn't exceed 160 chars)
    const newDesc = md[1].replace(/\.\s*$/, '') + '. ' + mainTerm + '.';
    if (newDesc.length > 165) {
      // Too long — try shorter form
      const shortTerm = mainTerm.split(' ').slice(0, 3).join(' ');
      const altDesc = md[1].replace(/\.\s*$/, '') + '. ' + shortTerm + '.';
      if (altDesc.length <= 165) {
        content = content.replace(`metaDesc: "${md[1]}"`, `metaDesc: "${altDesc}"`);
        console.log(`✅ ${slug} [${isArabic ? 'AR' : 'EN'}]: Added "${shortTerm}" to metaDesc`);
        changed = true;
        totalFixed++;
      }
    } else {
      content = content.replace(`metaDesc: "${md[1]}"`, `metaDesc: "${newDesc}"`);
      console.log(`✅ ${slug} [${isArabic ? 'AR' : 'EN'}]: Added "${mainTerm}" to metaDesc`);
      changed = true;
      totalFixed++;
    }
  }
  
  if (changed) writeFileSync(filePath, content, 'utf-8');
}

console.log(`\n🎯 Fixed ${totalFixed} metaDescs with mainTerm keyword`);
