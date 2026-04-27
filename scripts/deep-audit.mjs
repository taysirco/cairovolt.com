import { readFileSync, readdirSync } from 'fs';

const dir = 'src/data/products';
const files = readdirSync(dir).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

const issues = [];

for (const file of files) {
  const slug = file.replace('.ts', '');
  const content = readFileSync(`${dir}/${file}`, 'utf-8');
  
  // 1. Check 6 required sections (EN+AR = 2 each)
  const sections = ['quick-answer', 'product-summary', 'expert-review', 'product-details', 'device-compatibility', 'buyer-warning'];
  for (const s of sections) {
    const count = (content.match(new RegExp(s, 'g')) || []).length;
    if (count < 2) {
      issues.push(`❌ ${slug}: Missing ${s} (found ${count}/2)`);
    }
  }
  
  // 2. Check for empty descriptions
  if (content.includes("description: ''") || content.includes('description: ""') || content.includes('description: ``')) {
    issues.push(`❌ ${slug}: Empty description found`);
  }
  
  // 3. Check metaTitle exists
  if (!content.includes('metaTitle:')) {
    issues.push(`⚠️ ${slug}: Missing metaTitle`);
  }
  
  // 4. Check metaDesc exists
  if (!content.includes('metaDesc:')) {
    issues.push(`⚠️ ${slug}: Missing metaDesc`);
  }
  
  // 5. Check FAQs exist
  if (!content.includes('faqs:')) {
    issues.push(`⚠️ ${slug}: Missing FAQs`);
  }
  
  // 6. Check features array
  if (!content.includes('features:')) {
    issues.push(`⚠️ ${slug}: Missing features array`);
  }
  
  // 7. Check for shortDescription
  const sdCount = (content.match(/shortDescription:/g) || []).length;
  if (sdCount < 2) {
    issues.push(`⚠️ ${slug}: Missing shortDescription (found ${sdCount}/2)`);
  }
  
  // 8. Check price exists
  if (!content.includes('price:')) {
    issues.push(`❌ ${slug}: Missing price`);
  }
  
  // 9. Check gtin/sku
  if (!content.includes('sku:')) {
    issues.push(`⚠️ ${slug}: Missing SKU`);
  }
  
  // 10. Check expert opinion
  if (!content.includes('expertOpinion:')) {
    issues.push(`⚠️ ${slug}: Missing expertOpinion`);
  }
}

// Cross-product duplicate check: Extract quick-answer EN text and compare
console.log('=== CROSS-PRODUCT DUPLICATE CHECK ===');
const qaTexts = {};
for (const file of files) {
  const slug = file.replace('.ts', '');
  const content = readFileSync(`${dir}/${file}`, 'utf-8');
  const qaMatch = content.match(/quick-answer.*?<p[^>]*>(.*?)<\/p>/);
  if (qaMatch) {
    const text = qaMatch[1].replace(/<[^>]+>/g, '').substring(0, 80);
    qaTexts[slug] = text;
  }
}

// Check for very similar quick-answers
const slugs = Object.keys(qaTexts);
for (let i = 0; i < slugs.length; i++) {
  for (let j = i + 1; j < slugs.length; j++) {
    if (qaTexts[slugs[i]] === qaTexts[slugs[j]]) {
      issues.push(`🔴 DUPLICATE QA: ${slugs[i]} === ${slugs[j]}`);
    }
  }
}

if (issues.length === 0) {
  console.log('\n✅ ALL PRODUCTS PASS DEEP AUDIT — No issues found!');
} else {
  console.log(`\n⚠️ Found ${issues.length} issues:\n`);
  issues.forEach(i => console.log(i));
}

console.log(`\nTotal products audited: ${files.length}`);
