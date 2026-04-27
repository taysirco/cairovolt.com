/**
 * Ensures mainTerm appears in the keywords string for every product
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

let fixed = 0;

for (const file of files) {
  const filePath = join(DIR, file);
  let content = readFileSync(filePath, 'utf-8');
  const slug = file.replace('.ts', '');
  
  const keywordsMatch = content.match(/keywords:\s*"([^"]+)"/);
  const mainTermMatch = content.match(/mainTerm:\s*"([^"]+)"/);
  
  if (!keywordsMatch || !mainTermMatch) continue;
  
  const keywords = keywordsMatch[1];
  const mainTerm = mainTermMatch[1];
  
  if (keywords.toLowerCase().includes(mainTerm.toLowerCase())) continue;
  
  // Append mainTerm to keywords
  const newKeywords = keywords + ', ' + mainTerm;
  content = content.replace(
    `keywords: "${keywords}"`,
    `keywords: "${newKeywords}"`
  );
  
  writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${slug}: Added "${mainTerm}" to keywords`);
  fixed++;
}

console.log(`\n🎯 Fixed ${fixed} products`);
