/**
 * Auto-add relevant emoji prefix to EN shortDescription
 * Maps product category to appropriate emoji
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

const emojiMap = {
  'power-bank': '🔋',
  'powercore': '🔋',
  'charger': '⚡',
  'cable': '🔌',
  'lightning': '🔌',
  'type-c': '🔌',
  'usb': '🔌',
  'earbuds': '🎧',
  'speaker': '🔊',
  'soundcore': '🔊',
  'watch': '⌚',
  'mount': '🚗',
  'car-mount': '🚗',
  'screen-protector': '🛡️',
  'case': '📱',
  'hub': '🔗',
  'holder': '🚗',
};

function getEmoji(slug) {
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (slug.includes(key)) return emoji;
  }
  return '✨';
}

// Regex to detect emoji
const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]|⚡|✓|🔥|🛡️|💰|📱|🎧|🔋|🔌|🔊|⌚|🚗|🔗|✨|⚖️|🧵|🏆/u;

let fixed = 0;

for (const file of files) {
  const filePath = join(DIR, file);
  let content = readFileSync(filePath, 'utf-8');
  const slug = file.replace('.ts', '');
  
  // Find EN shortDescription (first occurrence in en: block)
  const enBlockMatch = content.match(/en:\s*\{[\s\S]*?shortDescription:\s*"([^"]+)"/);
  if (!enBlockMatch) continue;
  
  const enShort = enBlockMatch[1];
  if (emojiRegex.test(enShort)) continue; // Already has emoji
  
  const emoji = getEmoji(slug);
  // Prepend emoji + space to the description, and add | separator after first phrase
  const newShort = enShort.replace(/^/, `${emoji} `);
  
  content = content.replace(
    `shortDescription: "${enShort}"`,
    `shortDescription: "${newShort}"`
  );
  
  writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${slug}: Added ${emoji}`);
  fixed++;
}

console.log(`\n🎯 Fixed ${fixed} EN shortDescriptions with emoji`);
