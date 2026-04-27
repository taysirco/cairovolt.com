/**
 * v2: Add daily cost to products that don't have "The Bottom Line" pattern
 * Strategy: Inject into quick-answer section instead
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const targets = [
  'anker-521-powerhouse', 'anker-622-maggo', 'anker-powercore-20000', 
  'anker-powercore-26800', 'anker-powerline-usb-c-usb-c', 'anker-powerport-25w',
  'anker-soundcore-flare-2', 'anker-soundcore-life-p2i', 'anker-soundcore-motion-plus',
  'anker-usb-c-lightning-sureistrong', 'anker-car-charger-dual-usb',
  'joyroom-3-in-1-wireless-charging-station', 'joyroom-60w-car-charger',
  'joyroom-car-mount-zs290', 'joyroom-jr-t03-wireless-earbuds',
  'joyroom-magnetic-power-bank-10000', 'joyroom-power-bank-20000',
  'joyroom-t03s-pro-earbuds'
];

let totalFixed = 0;

for (const slug of targets) {
  const filePath = join(DIR, slug + '.ts');
  let content;
  try { content = readFileSync(filePath, 'utf-8'); } catch(e) { continue; }
  
  // Skip if already has cost breakdown
  if (/per day|في اليوم|EGP\/day|جنيه\/يوم|جنيه في اليوم/i.test(content)) continue;
  
  const priceM = content.match(/price:\s*([\d.]+)/);
  if (!priceM) continue;
  const price = parseFloat(priceM[1]);
  if (price <= 500) continue;
  
  // Determine warranty for calculation
  let months = 18;
  const warrantyMatch = content.match(/(\d+)[\s-]*(month|شهر)/i);
  if (warrantyMatch) months = parseInt(warrantyMatch[1]);
  if (months < 12) months = 12;
  
  const days = months * 30;
  const dailyCost = (price / days).toFixed(2);
  
  let changed = false;
  
  // Strategy: Find product-summary <ul> and add cost line before </ul>
  // Match any product-summary section
  const summaryPattern = /(<div class="product-summary">[\s\S]*?)(<\/ul>\s*<\/div>)/g;
  let match;
  let replaceCount = 0;
  
  while ((match = summaryPattern.exec(content)) !== null) {
    if (replaceCount >= 2) break; // Max 2 (EN + AR)
    
    const isArabic = /[\u0600-\u06FF]{5,}/.test(match[1]);
    const costLine = isArabic 
      ? `<li>💰 <strong>${dailyCost} جنيه/يوم:</strong> على ${months} شهر، أرخص من كوباية شاي.</li>`
      : `<li>💰 <strong>${dailyCost} EGP/day:</strong> Over ${months} months, less than a cup of tea.</li>`;
    
    content = content.replace(match[0], match[1] + costLine + match[2]);
    summaryPattern.lastIndex = 0; // Reset after content change
    changed = true;
    replaceCount++;
  }
  
  if (changed) {
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${slug}: ${price} EGP → ${dailyCost}/day (${months}mo)`);
    totalFixed++;
  }
}

console.log(`\n🎯 Fixed ${totalFixed}`);
