/**
 * Add leading emoji to features that are missing one
 * Smart mapping based on feature content
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

const emojiMap = [
  [/charging|charge|شحن|واط|PD|USB|أمبير/i, '⚡'],
  [/connectors?|موصل/i, '🔌'],
  [/phone|موبايل|هاتف/i, '📱'],
  [/fits|يناسب|حجم|بوصة|inches/i, '📐'],
  [/fast|سريع|speed/i, '⚡'],
  [/power|طاقة/i, '🔋'],
  [/warranty|ضمان/i, '🏆'],
  [/cable|كابل/i, '🔗'],
  [/support|يدعم/i, '✅'],
];

function getEmoji(feat) {
  for (const [pattern, emoji] of emojiMap) {
    if (pattern.test(feat)) return emoji;
  }
  return '✨';
}

let totalFixed = 0;
const hasLeadEmoji = (feat) => /^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F1E0}-\u{1F1FF}⚡✓🔥🛡️💰📱🎧🔋🔌🚗⌚🔊✨⚖️🧵🏆💪📊💻🤖🎵📦🔗💾🔩📐🎮✅]/u.test(feat);

for (const file of files) {
  const filePath = join(DIR, file);
  let content = readFileSync(filePath, 'utf-8');
  const slug = file.replace('.ts', '');
  let changed = false;
  
  // Find all features arrays
  const featureArrays = [...content.matchAll(/features:\s*\[([\s\S]*?)\]/g)];
  for (const fm of featureArrays) {
    const block = fm[1];
    const feats = [...block.matchAll(/"([^"]+)"/g)];
    
    for (const f of feats) {
      const feat = f[1];
      if (!hasLeadEmoji(feat)) {
        const emoji = getEmoji(feat);
        const newFeat = emoji + ' ' + feat;
        content = content.replace(`"${feat}"`, `"${newFeat}"`);
        console.log(`✅ ${slug}: "${feat.substring(0,35)}..." → "${newFeat.substring(0,38)}..."`);
        changed = true;
        totalFixed++;
      }
    }
  }
  
  if (changed) writeFileSync(filePath, content, 'utf-8');
}

console.log(`\n🎯 Fixed ${totalFixed} features`);
