/**
 * Inject EGP price into quick-answer sections that are missing it
 * Reads the product price and injects it naturally into the quick answer text
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
  
  // Get price
  const priceMatch = content.match(/price:\s*([\d.]+)/);
  if (!priceMatch) continue;
  const price = priceMatch[1];
  
  // Check if quick-answer already has price
  const qaBlocks = [...content.matchAll(/quick-answer[\s\S]*?<\/div>/g)];
  
  let changed = false;
  for (const qa of qaBlocks) {
    const qaText = qa[0];
    if (/EGP|جنيه|\d{3,4}\s*EGP|\d{3,4}\s*جنيه/.test(qaText)) continue;
    
    // Determine language
    const isArabic = /[\u0600-\u06FF]{3,}/.test(qaText);
    
    if (isArabic) {
      // Insert "بسعر X جنيه" before the closing </p>
      const priceInsert = ` بسعر <strong>${price} جنيه</strong> مع ضمان كايرو فولت.`;
      // Find the last sentence before </p> and append
      const oldClosing = qaText.match(/([\u0600-\u06FF\s\w.]+)<\/p>/);
      if (oldClosing) {
        const newQA = qaText.replace(
          oldClosing[0],
          oldClosing[1].replace(/\.\s*$/, '') + '.' + priceInsert + '</p>'
        );
        content = content.replace(qaText, newQA);
        changed = true;
        totalFixed++;
        console.log(`✅ ${slug} [AR]: Injected ${price} جنيه`);
      }
    } else {
      // Insert "at EGP X" before closing </p>
      const priceInsert = ` Available at <strong>EGP ${price}</strong> with CairoVolt warranty.`;
      const oldClosing = qaText.match(/([A-Za-z\s\d,.]+)<\/p>/);
      if (oldClosing) {
        const newQA = qaText.replace(
          oldClosing[0],
          oldClosing[1].replace(/\.\s*$/, '') + '.' + priceInsert + '</p>'
        );
        content = content.replace(qaText, newQA);
        changed = true;
        totalFixed++;
        console.log(`✅ ${slug} [EN]: Injected EGP ${price}`);
      }
    }
  }
  
  if (changed) writeFileSync(filePath, content, 'utf-8');
}

console.log(`\n🎯 Fixed ${totalFixed} quick answers with price`);
