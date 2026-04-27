import { readFileSync, writeFileSync, readdirSync } from 'fs';

const dir = 'src/data/products';

// SKU category mapping based on actual categorySlug
const catMap = {
  'power-banks': 'PB',
  'wall-chargers': 'WC', 
  'cables': 'CB',
  'car-chargers': 'CC',
  'earphones': 'AU',
  'speakers': 'AU',
  'car-holders': 'CH',
  'screen-protectors': 'SP',
  'wireless-charging': 'WC',
  'smart-watches': 'SW'
};

const brandMap = {
  'Anker': 'ANK',
  'Joyroom': 'JR'
};

let fixed = 0;
const files = readdirSync(dir).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

for (const file of files) {
  const content = readFileSync(`${dir}/${file}`, 'utf-8');
  const skuMatch = content.match(/sku:\s*["']([^"']+)["']/);
  const catMatch = content.match(/categorySlug:\s*["']([^"']+)["']/);
  const brandMatch = content.match(/brand:\s*["']([^"']+)["']/);
  
  if (!skuMatch || !catMatch || !brandMatch) continue;
  
  const currentSku = skuMatch[1];
  const category = catMatch[1];
  const brand = brandMatch[1];
  
  const prefix = brandMap[brand] || brand.substring(0, 3).toUpperCase();
  const catCode = catMap[category];
  
  if (!catCode) continue;
  
  // Check if SKU already matches the expected format
  const expectedPrefix = `${prefix}-${catCode}-`;
  if (currentSku.startsWith(expectedPrefix)) continue;
  
  // Generate new SKU: keep the model part from the old SKU
  // Extract the model identifier from old SKU
  let modelPart = currentSku;
  // Remove brand prefix
  modelPart = modelPart.replace(/^(ANK|JR)-/, '');
  // Remove old category codes
  modelPart = modelPart.replace(/^(PH|EP|TC|WC|PB|CB|CC|AU|SP|CH|SW|S|T|FT|W|ZS)-?/, '');
  // Clean up
  modelPart = modelPart.replace(/^-/, '');
  
  if (!modelPart) {
    // Fallback: use slug parts
    const slug = file.replace('.ts', '');
    modelPart = slug.split('-').slice(-2).join('').toUpperCase().substring(0, 8);
  }
  
  const newSku = `${prefix}-${catCode}-${modelPart}`;
  
  const newContent = content.replace(`"${currentSku}"`, `"${newSku}"`).replace(`'${currentSku}'`, `'${newSku}'`);
  
  if (newContent !== content) {
    writeFileSync(`${dir}/${file}`, newContent);
    fixed++;
    console.log(`✅ ${currentSku} → ${newSku}`);
  }
}

console.log(`\n=== Fixed ${fixed} SKU formats ===`);
