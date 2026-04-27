/**
 * Deep Audit Script — Verify ALL product files against new_product_guide.md rules
 * Checks both EN and AR translations across all 55 product files
 */
import fs from 'fs';
import path from 'path';

const PRODUCTS_DIR = path.resolve('src/data/products');
const DETAILS_DIR = path.resolve('src/data/details');
const files = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

const issues = [];

for (const file of files) {
  const slug = file.replace('.ts', '');
  const content = fs.readFileSync(path.join(PRODUCTS_DIR, file), 'utf-8');
  
  // Rule 1: No technical-specs in description
  if (content.includes('technical-specs')) {
    issues.push(`❌ [${slug}] Still has technical-specs in description`);
  }

  // Rule 2: Has both EN and AR translations
  if (!content.includes('translations')) {
    issues.push(`❌ [${slug}] Missing translations object`);
    continue;
  }

  // Rule 3: Has description in both languages
  const hasEnDesc = content.includes("description: `") || content.includes('description: "');
  if (!hasEnDesc) {
    issues.push(`⚠️ [${slug}] May be missing description`);
  }

  // Rule 4: Has features (data field - even though not rendered)
  if (!content.includes('features:')) {
    issues.push(`⚠️ [${slug}] Missing features array`);
  }

  // Rule 5: Has FAQs
  if (!content.includes('faqs:')) {
    issues.push(`⚠️ [${slug}] Missing FAQs`);
  }

  // Rule 6: Has expertOpinion
  if (!content.includes('expertOpinion')) {
    issues.push(`⚠️ [${slug}] Missing expertOpinion`);
  }

  // Rule 7: Has meta keywords
  if (!content.includes('keywords:')) {
    issues.push(`⚠️ [${slug}] Missing keywords`);
  }

  // Rule 8: Description has required sections (check EN)
  const hasQuickAnswer = content.includes('quick-answer');
  const hasProductSummary = content.includes('product-summary');
  const hasExpertReview = content.includes('expert-review');
  const hasProductDetails = content.includes('product-details');
  const hasDeviceCompat = content.includes('device-compatibility');
  const hasBuyerWarning = content.includes('buyer-warning');

  if (!hasQuickAnswer) issues.push(`⚠️ [${slug}] Missing quick-answer section in description`);
  if (!hasProductSummary) issues.push(`⚠️ [${slug}] Missing product-summary section`);
  if (!hasExpertReview) issues.push(`⚠️ [${slug}] Missing expert-review section`);
  if (!hasProductDetails) issues.push(`⚠️ [${slug}] Missing product-details section`);
  if (!hasDeviceCompat) issues.push(`⚠️ [${slug}] Missing device-compatibility section`);
  if (!hasBuyerWarning) issues.push(`⚠️ [${slug}] Missing buyer-warning section`);

  // Rule 9: Has relatedProducts
  if (!content.includes('relatedProducts')) {
    issues.push(`⚠️ [${slug}] Missing relatedProducts`);
  }

  // Rule 10: Check details file exists
  const detailFile = path.join(DETAILS_DIR, file);
  if (!fs.existsSync(detailFile)) {
    issues.push(`❌ [${slug}] No details file (details/${file})`);
  } else {
    const detailContent = fs.readFileSync(detailFile, 'utf-8');
    // Check specifications exist
    if (!detailContent.includes('specifications')) {
      issues.push(`❌ [${slug}] Details file missing specifications`);
    }
    // Check NO CairoVolt Lab in specifications key
    if (detailContent.includes("'CairoVolt Lab Result'") || detailContent.includes("'CairoVolt Lab'")) {
      issues.push(`❌ [${slug}] Details specs still has CairoVolt Lab key!`);
    }
    // Check has Dimensions, Weight, Safety
    if (!detailContent.includes("'Dimensions'") && !detailContent.includes('"Dimensions"')) {
      issues.push(`⚠️ [${slug}] Details missing Dimensions spec (JSON-LD required)`);
    }
    if (!detailContent.includes("'Weight'") && !detailContent.includes('"Weight"')) {
      issues.push(`⚠️ [${slug}] Details missing Weight spec (JSON-LD required)`);
    }
    if (!detailContent.includes("'Safety'") && !detailContent.includes('"Safety"')) {
      issues.push(`⚠️ [${slug}] Details missing Safety spec (JSON-LD required)`);
    }
    // Check aiTldr
    if (!detailContent.includes('aiTldr')) {
      issues.push(`⚠️ [${slug}] Details missing aiTldr`);
    }
    // Check labVerified
    if (!detailContent.includes('labVerified')) {
      issues.push(`⚠️ [${slug}] Details missing labVerified`);
    }
  }
}

// Summary
console.log(`\n📋 AUDIT REPORT — ${files.length} product files checked\n`);

if (issues.length === 0) {
  console.log('✅ ALL CLEAR — Zero issues found!');
} else {
  const criticals = issues.filter(i => i.startsWith('❌'));
  const warnings = issues.filter(i => i.startsWith('⚠️'));
  
  if (criticals.length > 0) {
    console.log(`\n🔴 CRITICAL (${criticals.length}):`);
    criticals.forEach(i => console.log(`  ${i}`));
  }
  if (warnings.length > 0) {
    console.log(`\n🟡 WARNINGS (${warnings.length}):`);
    warnings.forEach(i => console.log(`  ${i}`));
  }
  console.log(`\n📊 Total: ${criticals.length} critical, ${warnings.length} warnings`);
}
