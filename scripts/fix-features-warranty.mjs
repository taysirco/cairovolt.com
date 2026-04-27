/**
 * Add warranty mention to features arrays that are missing it
 * Reads warranty info from description or expertOpinion
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
  
  // Check all feature arrays
  const featureArrays = [...content.matchAll(/features:\s*\[([\s\S]*?)\]/g)];
  let hasWarrantyFeature = false;
  
  for (const fa of featureArrays) {
    if (/warranty|ضمان/i.test(fa[1])) {
      hasWarrantyFeature = true;
      break;
    }
  }
  
  if (hasWarrantyFeature) continue;
  
  // Find warranty duration from description
  let warrantyMonths = null;
  const warrantyMatch = content.match(/(\d+)[\s-]*(month|شهر)/i);
  if (warrantyMatch) {
    warrantyMonths = parseInt(warrantyMatch[1]);
  }
  
  if (!warrantyMonths) {
    // Try year
    const yearMatch = content.match(/(\d+)[\s-]*(year|سنة|سنوات)/i);
    if (yearMatch) warrantyMonths = parseInt(yearMatch[1]) * 12;
  }
  
  if (!warrantyMonths) warrantyMonths = 18; // Default Anker warranty
  
  // Find EN features array and add warranty
  const enFeatMatch = content.match(/(features:\s*\[[\s\S]*?)(])/);
  if (enFeatMatch) {
    const idx = content.indexOf(enFeatMatch[0]);
    const isFirstEN = idx < content.length / 2; // Rough: first half is EN
    
    if (isFirstEN) {
      const enWarranty = `"🏆 ${warrantyMonths}-Month Warranty"`;
      content = content.replace(enFeatMatch[0], enFeatMatch[1] + ', ' + enWarranty + ']');
    }
  }
  
  // Find AR features and add
  // Find the SECOND features array (AR)
  const allFeats = [...content.matchAll(/features:\s*\[([\s\S]*?)\]/g)];
  if (allFeats.length >= 2) {
    const arFeat = allFeats[1];
    const arWarranty = `"🏆 ضمان ${warrantyMonths} شهر"`;
    const arOld = arFeat[0];
    const arNew = arOld.replace(/\]$/, ', ' + arWarranty + ']');
    content = content.replace(arOld, arNew);
  }
  
  writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${slug}: Added ${warrantyMonths}-month warranty to features`);
  totalFixed++;
}

console.log(`\n🎯 Fixed ${totalFixed} products`);
