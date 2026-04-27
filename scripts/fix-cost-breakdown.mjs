/**
 * Add daily cost breakdown for products > 500 EGP
 * Injects "X جنيه في اليوم" / "X EGP/day" into product-summary
 * Calculates over warranty period or 12 months default
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
  
  const priceM = content.match(/price:\s*([\d.]+)/);
  if (!priceM) continue;
  const price = parseFloat(priceM[1]);
  if (price <= 500) continue;
  
  // Check if already has cost breakdown
  if (/per day|في اليوم|EGP\/day|جنيه\/يوم|جنيه في اليوم|EGP per day/i.test(content)) continue;
  
  // Determine warranty period for calculation
  let months = 18; // Default warranty
  const warrantyMatch = content.match(/(\d+)[\s-]*(month|شهر)/i);
  if (warrantyMatch) months = parseInt(warrantyMatch[1]);
  if (months < 12) months = 12;
  
  const days = months * 30;
  const dailyCost = (price / days).toFixed(2);
  const dailyCostAR = dailyCost;
  
  let changed = false;
  
  // Add to EN product-summary
  const enSummary = content.match(/The Bottom Line:<\/h3>/);
  if (enSummary) {
    const costLine = `<li>💰 <strong>${dailyCost} EGP/day:</strong> Over ${months} months, less than a cup of tea.</li>`;
    // Find first </ul> after "The Bottom Line"
    const afterSummary = content.indexOf('</ul>', content.indexOf('The Bottom Line'));
    if (afterSummary > 0) {
      content = content.substring(0, afterSummary) + costLine + content.substring(afterSummary);
      changed = true;
    }
  }
  
  // Add to AR product-summary
  const arSummary = content.match(/ليه (الـ?\s*)?[\u0600-\u06FF\s]+\?|ليه [\u0600-\u06FF\s]+ده\?/);
  if (arSummary) {
    const costLine = `<li>💰 <strong>${dailyCostAR} جنيه/يوم:</strong> على ${months} شهر، أرخص من كوباية شاي.</li>`;
    const arSummaryIdx = content.indexOf(arSummary[0]);
    const afterARSummary = content.indexOf('</ul>', arSummaryIdx);
    if (afterARSummary > 0) {
      content = content.substring(0, afterARSummary) + costLine + content.substring(afterARSummary);
      changed = true;
    }
  }
  
  if (changed) {
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${slug}: ${price} EGP → ${dailyCost} EGP/day (${months} months)`);
    totalFixed++;
  }
}

console.log(`\n🎯 Fixed ${totalFixed} products with cost breakdown`);
