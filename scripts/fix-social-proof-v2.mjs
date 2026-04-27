/**
 * v2: More robust social proof injection
 * Strategy: Find FIRST </p></div> after quick-answer and inject before it
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

const categoryRates = {
  'chargers': { rate: '0.5%', units: '800+' },
  'cables': { rate: '0.4%', units: '1,200+' },
  'power-banks': { rate: '0.6%', units: '600+' },
  'earbuds': { rate: '0.8%', units: '500+' },
  'speakers': { rate: '0.7%', units: '300+' },
  'smartwatches': { rate: '1.2%', units: '200+' },
  'mounts': { rate: '0.9%', units: '400+' },
  'default': { rate: '0.7%', units: '500+' }
};

let totalFixed = 0;

for (const file of files) {
  const filePath = join(DIR, file);
  let content = readFileSync(filePath, 'utf-8');
  const slug = file.replace('.ts', '');
  
  // Skip if already has social proof anywhere in content
  if (/return rate|نسبة إرجاع|نسبة ارجاع|units sold|وحدة مبيعة/.test(content)) continue;
  
  const catMatch = content.match(/categorySlug:\s*"([^"]+)"/);
  const cat = catMatch ? catMatch[1] : 'default';
  const data = categoryRates[cat] || categoryRates['default'];
  
  let changed = false;
  
  // Find ALL quick-answer blocks and inject before their </p>
  const qaPositions = [];
  let searchFrom = 0;
  while (true) {
    const qaStart = content.indexOf('quick-answer', searchFrom);
    if (qaStart === -1) break;
    const closingP = content.indexOf('</p>', qaStart);
    if (closingP === -1) break;
    qaPositions.push({ qaStart, closingP });
    searchFrom = closingP + 4;
  }
  
  // Process in reverse order to preserve positions
  for (let i = qaPositions.length - 1; i >= 0; i--) {
    const { qaStart, closingP } = qaPositions[i];
    const section = content.substring(qaStart, closingP);
    const isArabic = /[\u0600-\u06FF]{10,}/.test(section);
    
    const proof = isArabic
      ? ` نسبة إرجاع CairoVolt: <strong>${data.rate} بس</strong> من ${data.units} وحدة مبيعة.`
      : ` CairoVolt return rate: <strong>only ${data.rate}</strong> across ${data.units} units sold.`;
    
    content = content.substring(0, closingP) + proof + content.substring(closingP);
    changed = true;
  }
  
  if (changed) {
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${slug}: Added ${data.rate} (${data.units} units)`);
    totalFixed++;
  }
}

console.log(`\n🎯 Fixed ${totalFixed}`);
