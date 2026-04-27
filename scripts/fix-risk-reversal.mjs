/**
 * Add risk-reversal language to products missing it
 * Injects "استبدال مجاني" / "Free replacement" into product-summary or features
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
  
  // Skip if already has risk-reversal language
  if (/replacement|استبدال|بدل مجاني|refund|استرجاع|return|ترجيع/i.test(content)) continue;
  
  let changed = false;
  
  // Strategy 1: Add to product-summary EN section
  const summaryEN = content.match(/<\/ul>\s*<\/div>\s*\n\s*<div class="expert-review"/);
  if (summaryEN) {
    content = content.replace(
      summaryEN[0],
      '<li>🔄 <strong>Free Replacement:</strong> Defective? We replace it — no questions asked.</li></ul></div>\n<div class="expert-review"'
    );
    changed = true;
  }
  
  // Strategy 2: Add to product-summary AR section
  const summaryAR = content.match(/<\/ul>\s*<\/div>\s*\n\s*<div class="expert-review">\s*<h2[^>]*>رأ/);
  if (summaryAR) {
    content = content.replace(
      summaryAR[0],
      '<li>🔄 <strong>استبدال مجاني:</strong> لو طلع فيه عيب، بنبدّله — بدون أسئلة.</li>' + summaryAR[0]
    );
    changed = true;
  }
  
  if (changed) {
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${slug}: Added risk-reversal language`);
    totalFixed++;
  }
}

console.log(`\n🎯 Fixed ${totalFixed} products with risk-reversal`);
