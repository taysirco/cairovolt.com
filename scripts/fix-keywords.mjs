import { readFileSync, writeFileSync, readdirSync } from 'fs';

const dir = 'src/data/products';
const files = readdirSync(dir).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

// Keyword expansion templates by category
const catKeywords = {
  'wall-chargers': {
    en: ['charger egypt', 'fast charger', 'wall charger egypt', 'usb c charger', 'gan charger', 'iphone charger egypt', 'samsung charger', 'best charger egypt 2026', 'cod egypt charger'],
    ar: ['شاحن مصر', 'شاحن سريع', 'شاحن حائط', 'شاحن ايفون', 'شاحن سامسونج', 'افضل شاحن', 'شاحن اصلي مصر', 'سعر شاحن', 'شاحن ادفع عند الاستلام']
  },
  'power-banks': {
    en: ['power bank egypt', 'portable charger', 'best power bank egypt 2026', 'power bank for iphone', 'power bank samsung', 'travel power bank', 'cod egypt power bank', 'power bank price egypt'],
    ar: ['باور بانك مصر', 'شاحن متنقل', 'باور بانك ايفون', 'باور بانك سامسونج', 'افضل باور بانك', 'سعر باور بانك', 'باور بانك اصلي', 'باور بانك ادفع عند الاستلام']
  },
  'cables': {
    en: ['cable egypt', 'charging cable', 'fast charge cable', 'usb c cable', 'iphone cable egypt', 'best cable egypt 2026', 'cod egypt cable', 'durable cable'],
    ar: ['كابل شحن مصر', 'كابل ايفون', 'كابل سريع', 'كابل اصلي', 'افضل كابل شحن', 'سعر كابل', 'كابل متين', 'كابل ادفع عند الاستلام']
  },
  'car-chargers': {
    en: ['car charger egypt', 'fast car charger', 'dual usb car charger', 'best car charger 2026', 'car charger iphone', 'cod egypt'],
    ar: ['شاحن سيارة مصر', 'شاحن سيارة سريع', 'شاحن سيارة ايفون', 'افضل شاحن سيارة', 'سعر شاحن سيارة']
  },
  'audio': {
    en: ['earbuds egypt', 'wireless earbuds', 'bluetooth earbuds egypt', 'best earbuds egypt 2026', 'noise cancelling', 'cod egypt'],
    ar: ['سماعة بلوتوث مصر', 'سماعة لاسلكية', 'افضل سماعة', 'سعر سماعة', 'سماعة ايربودز', 'سماعة اصلية مصر']
  },
  'speakers': {
    en: ['bluetooth speaker egypt', 'portable speaker', 'waterproof speaker', 'best speaker egypt 2026', 'cod egypt speaker'],
    ar: ['سبيكر بلوتوث مصر', 'مكبر صوت', 'سبيكر متنقل', 'افضل سبيكر', 'سعر سبيكر']
  },
  'smart-watches': {
    en: ['smartwatch egypt', 'fitness watch', 'waterproof smartwatch', 'best smartwatch egypt 2026', 'cod egypt'],
    ar: ['ساعة ذكية مصر', 'ساعة رياضية', 'افضل ساعة ذكية', 'سعر ساعة ذكية', 'ساعة ضد المياه']
  },
  'car-holders': {
    en: ['car phone mount egypt', 'phone holder car', 'best car mount 2026', 'dashboard mount', 'cod egypt'],
    ar: ['حامل موبايل سيارة', 'حامل جوال سيارة', 'افضل حامل سيارة', 'سعر حامل موبايل']
  }
};

let fixed = 0;
for (const file of files) {
  const slug = file.replace('.ts', '');
  let content = readFileSync(`${dir}/${file}`, 'utf-8');
  
  const kwMatch = content.match(/keywords:\s*["']([^"']+)["']/);
  if (!kwMatch) continue;
  
  const existing = kwMatch[1].split(',').map(k => k.trim());
  if (existing.length >= 10) continue;
  
  // Get category
  const catMatch = content.match(/categorySlug:\s*["']([^"']+)["']/);
  const cat = catMatch?.[1] || 'cables';
  
  // Get brand
  const brand = slug.startsWith('anker') ? 'anker' : 'joyroom';
  const brandAr = brand === 'anker' ? 'انكر' : 'جوي روم';
  
  // Get product name for specific keywords
  const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
  const name = nameMatch?.[1] || slug;
  
  // Build expanded keywords
  const templates = catKeywords[cat] || catKeywords['cables'];
  const newKws = [...existing];
  
  // Add brand-specific category keywords
  for (const kw of templates.en) {
    const branded = `${brand} ${kw}`;
    if (!newKws.some(k => k.toLowerCase().includes(kw.split(' ')[0]))) {
      newKws.push(branded);
    }
    if (newKws.length >= 18) break;
  }
  for (const kw of templates.ar) {
    const branded = `${kw} ${brandAr}`;
    if (!newKws.some(k => k.includes(kw.split(' ')[0]))) {
      newKws.push(branded);
    }
    if (newKws.length >= 18) break;
  }
  
  // Ensure we have 15+ but cap at 20
  const final = [...new Set(newKws)].slice(0, 20);
  
  if (final.length > existing.length) {
    const newKwStr = final.join(', ');
    content = content.replace(kwMatch[0], `keywords: "${newKwStr}"`);
    writeFileSync(`${dir}/${file}`, content);
    fixed++;
    console.log(`✅ ${slug}: ${existing.length} → ${final.length} keywords`);
  }
}

console.log(`\n=== Expanded keywords in ${fixed} products ===`);
