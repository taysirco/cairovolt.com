import { readFileSync, readdirSync } from 'fs';

const dir = 'src/data/products';
const files = readdirSync(dir).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

const AI_CLICHES = [
  'في الختام', 'من الجدير بالذكر', 'لا شك أن', 'نقدم لكم',
  'نسعى جاهدين', 'في عالم التكنولوجيا', 'In conclusion',
  "today's fast-paced", 'It is worth noting', 'without a doubt',
  'We offer you the best', 'We strive to provide'
];

const issues = [];
const stats = { total: 0, pass: 0, warn: 0, fail: 0 };

for (const file of files) {
  const slug = file.replace('.ts', '');
  const content = readFileSync(`${dir}/${file}`, 'utf-8');
  const productIssues = [];
  stats.total++;

  // === STRUCTURAL: 6 sections (EN+AR = 2 each) ===
  const sections = ['quick-answer', 'product-summary', 'expert-review', 'product-details', 'device-compatibility', 'buyer-warning'];
  for (const s of sections) {
    const count = (content.match(new RegExp(s, 'g')) || []).length;
    if (count < 2) productIssues.push(`❌ STRUCTURE: Missing "${s}" (${count}/2)`);
  }

  // === AI CLICHÉS ===
  for (const cliche of AI_CLICHES) {
    if (content.toLowerCase().includes(cliche.toLowerCase())) {
      productIssues.push(`🤖 AI CLICHÉ: Found "${cliche}"`);
    }
  }

  // === METADATA ===
  if (!content.includes('metaTitle:')) productIssues.push('⚠️ META: Missing metaTitle');
  if (!content.includes('metaDesc:')) productIssues.push('⚠️ META: Missing metaDesc');
  
  // Check metaTitle length (rough)
  const metaTitleMatch = content.match(/metaTitle:\s*["'`]([^"'`]+)["'`]/);
  if (metaTitleMatch && metaTitleMatch[1].length > 65) {
    productIssues.push(`⚠️ META: metaTitle too long (${metaTitleMatch[1].length} chars, max 60)`);
  }

  // === FAQs ===
  const faqCount = (content.match(/question:/g) || []).length;
  if (faqCount < 4) productIssues.push(`⚠️ FAQ: Only ${faqCount} FAQs (need 4-5 per language)`);

  // === FEATURES ===
  if (!content.includes('features:')) productIssues.push('⚠️ DATA: Missing features array');

  // === shortDescription ===
  const sdCount = (content.match(/shortDescription:/g) || []).length;
  if (sdCount < 2) productIssues.push(`⚠️ DATA: Missing shortDescription (${sdCount}/2)`);

  // === expertOpinion ===
  if (!content.includes('expertOpinion:')) productIssues.push('⚠️ DATA: Missing expertOpinion');

  // === SKU ===
  if (!content.includes('sku:')) productIssues.push('⚠️ DATA: Missing SKU');

  // === relatedProducts ===
  if (!content.includes('relatedProducts:')) productIssues.push('⚠️ CROSS-SELL: Missing relatedProducts');

  // === Keywords ===
  const kwMatch = content.match(/keywords:\s*["'`]([^"'`]+)["'`]/);
  if (kwMatch) {
    const kwCount = kwMatch[1].split(',').length;
    if (kwCount < 10) productIssues.push(`⚠️ SEO: Only ${kwCount} keywords (need 15-20)`);
  } else {
    productIssues.push('⚠️ SEO: Missing keywords');
  }

  // === Egyptian context check (AR description) ===
  const egyptTerms = ['مصر', 'القاهرة', 'الجيزة', 'كهرباء', 'الصيف', 'المقلد', 'المضروب', 'السوق'];
  const hasEgyptContext = egyptTerms.some(t => content.includes(t));
  if (!hasEgyptContext) productIssues.push('⚠️ NLP: No Egyptian local context found');

  // === Numbers in quick-answer (Information Gain check) ===
  const qaMatch = content.match(/quick-answer.*?<p[^>]*>(.*?)<\/p>/s);
  if (qaMatch) {
    const qaText = qaMatch[1].replace(/<[^>]+>/g, '');
    const hasNumbers = /\d+/.test(qaText);
    if (!hasNumbers) productIssues.push('⚠️ INFO-GAIN: Quick Answer has no numbers');
  }

  // Log results
  if (productIssues.length === 0) {
    stats.pass++;
  } else {
    const hasErrors = productIssues.some(i => i.startsWith('❌'));
    if (hasErrors) stats.fail++; else stats.warn++;
    console.log(`\n📦 ${slug}`);
    productIssues.forEach(i => console.log(`   ${i}`));
  }
}

console.log('\n' + '='.repeat(60));
console.log(`📊 AUDIT SUMMARY: ${stats.total} products`);
console.log(`   ✅ Pass: ${stats.pass}`);
console.log(`   ⚠️  Warnings: ${stats.warn}`);
console.log(`   ❌ Failures: ${stats.fail}`);
console.log('='.repeat(60));
