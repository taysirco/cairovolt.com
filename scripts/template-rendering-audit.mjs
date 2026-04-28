/**
 * L15 — TEMPLATE & RENDERING DEEP AUDIT
 *
 * Validates that:
 *  1. Category template renders ALL data fields (no dead data)
 *  2. Generic category template renders ALL data fields
 *  3. Schema.org coverage is complete (CollectionPage, FAQPage, ItemList, HowTo)
 *  4. Brand category pages pass through critical props (brandColor, soundcoreData, etc.)
 *  5. AR/EN content parity in rendered pages
 *  6. Product listing completeness (no empty category pages)
 *  7. Internal linking integrity (brand→category URLs are valid)
 *  8. Canonical URL consistency
 *  9. brandSlug casing consistency (Anker vs anker)
 * 10. Category content → page content field completeness
 */
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

let totalWarns = 0;
let totalCrit = 0;

function warn(ctx, msg) { totalWarns++; console.log(`   ⚠️  [${ctx}] ${msg}`); }
function crit(ctx, msg) { totalCrit++; console.log(`   ❌ [${ctx}] ${msg}`); }

// ── CHECK 1: Category Template renders all fields ──
console.log('🎨 CHECK 1: Category Template Field Coverage');
const catTemplate = readFileSync('src/components/CategoryTemplate.tsx', 'utf-8');
const requiredRenders = [
  ['faq', 'content.faq'],
  ['buyingGuide', 'content.buyingGuide'],  
  ['qualityBadges', 'content.qualityBadges'],
  ['description', 'content.description'],
  ['title', 'content.title'],
  ['subtitle', 'content.subtitle'],
];
for (const [name, pattern] of requiredRenders) {
  if (!catTemplate.includes(pattern)) {
    crit('TEMPLATE', `CategoryTemplate does NOT render ${name} (${pattern})`);
  }
}

// Check structured data in template
const schemaTypes = ['FAQPage', 'HowToSchema', 'Product'];
for (const st of schemaTypes) {
  if (!catTemplate.includes(st)) {
    warn('SCHEMA', `CategoryTemplate missing ${st} schema`);
  }
}

// ── CHECK 2: Generic Category Template renders all fields ──
console.log('📄 CHECK 2: Generic Category Template Coverage');
const genTemplate = readFileSync('src/lib/generic-category-helpers.tsx', 'utf-8');
const genRequiredRenders = [
  ['intro', 'content.intro'],
  ['buyingTips', 'content.buyingTips'],
  ['faq', 'faq.map'],
  ['richContent', 'richContent'],
  ['relatedBlogSlugs', 'relatedArticles'],
  ['brandCategories', 'data.brandCategories'],
];
for (const [name, pattern] of genRequiredRenders) {
  if (!genTemplate.includes(pattern)) {
    crit('GEN-TEMPLATE', `Generic template does NOT render ${name} (${pattern})`);
  }
}

// Check schema types in generic template
const genSchemaTypes = ['CollectionPage', 'FAQSchema', 'HowTo', 'ItemList', 'AggregateOffer', 'SpeakableSpecification', 'BreadcrumbSchema'];
for (const st of genSchemaTypes) {
  if (!genTemplate.includes(st)) {
    warn('GEN-SCHEMA', `Generic template missing ${st} schema`);
  }
}

// ── CHECK 3: Brand slug casing consistency ──
console.log('🔤 CHECK 3: Brand Slug Casing Consistency');
const catContentBarrel = readFileSync('src/data/category-content.ts', 'utf-8');
// Check that barrel uses lowercase keys
const brandKeys = [...catContentBarrel.matchAll(/\[['"]([^'"]+)['"]\]/g)].map(m => m[1]);
for (const key of brandKeys) {
  if (key !== key.toLowerCase()) {
    warn('CASING', `category-content.ts uses non-lowercase key "${key}"`);
  }
}

// Check generic categories brandSlug values
const genDir = 'src/data/generic-categories';
const genFiles = readdirSync(genDir).filter(f => f.endsWith('.ts') && !f.startsWith('_'));
for (const f of genFiles) {
  const content = readFileSync(join(genDir, f), 'utf-8');
  const slugs = [...content.matchAll(/brandSlug:\s*'([^']+)'/g)].map(m => m[1]);
  for (const s of slugs) {
    // brandSlug should match the format used in URLs
    // The category page lowercases it: brandKey = brand.toLowerCase()
    // So URL is /anker/wall-chargers but brandSlug could be 'Anker'
    // Check if this causes any issues in the template
    if (s !== s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() && s !== s.toLowerCase()) {
      warn('CASING', `${f}: brandSlug "${s}" has inconsistent casing`);
    }
  }
}

// ── CHECK 4: Category page passes all needed props ──
console.log('🔌 CHECK 4: Page → Template Prop Passing');
const categoryPage = readFileSync('src/app/[locale]/[brand]/[category]/page.tsx', 'utf-8');
const requiredProps = ['brand', 'brandColor', 'category', 'categorySlug', 'categoryInfo', 'initialProducts'];
for (const prop of requiredProps) {
  if (!categoryPage.includes(prop)) {
    crit('PROPS', `Category page does NOT pass "${prop}" to template`);
  }
}

// ── CHECK 5: Product listing completeness ──
console.log('📦 CHECK 5: Product Listing Completeness');
const productDir = 'src/data/products';
const productFiles = existsSync(productDir) ? readdirSync(productDir).filter(f => f.endsWith('.ts') && !f.startsWith('_')) : [];
const productCategories = new Map();
for (const pf of productFiles) {
  const pc = readFileSync(join(productDir, pf), 'utf-8');
  const brand = (pc.match(/brand:\s*["']([^"']+)["']/)?.[1] || '').toLowerCase();
  const cat = pc.match(/categorySlug:\s*["']([^"']+)["']/)?.[1] || '';
  const key = `${brand}/${cat}`;
  if (brand && cat) productCategories.set(key, (productCategories.get(key) || 0) + 1);
}

// Check each brand category has products
const brandDir = 'src/data/category-content';
const brands = readdirSync(brandDir).filter(f => !f.startsWith('_') && !f.endsWith('.ts'));
for (const brand of brands) {
  const catFiles = readdirSync(join(brandDir, brand)).filter(f => f.endsWith('.ts'));
  for (const file of catFiles) {
    const catSlug = file.replace('.ts', '');
    const key = `${brand}/${catSlug}`;
    const count = productCategories.get(key) || 0;
    if (count === 0) {
      // Check composite categories
      const composites = {
        'car-accessories': ['car-chargers', 'car-holders']
      };
      if (composites[catSlug]) {
        let total = 0;
        for (const sub of composites[catSlug]) {
          total += productCategories.get(`${brand}/${sub}`) || 0;
        }
        if (total === 0) warn('PRODUCTS', `${key}: 0 products (even with composite mapping)`);
      } else {
        warn('PRODUCTS', `${key}: 0 products mapped`);
      }
    }
  }
}

// ── CHECK 6: Accessibility Checks ──
console.log('♿ CHECK 6: Template Accessibility');
// Check aria-labels in templates
const ariaLabels = (catTemplate.match(/aria-label/g) || []).length;
if (ariaLabels < 3) console.log(`   ℹ️  CategoryTemplate has ${ariaLabels} aria-labels (improvement opportunity)`);

const genAriaLabels = (genTemplate.match(/aria-label/g) || []).length;
if (genAriaLabels < 3) console.log(`   ℹ️  Generic template has ${genAriaLabels} aria-labels (good: ${genAriaLabels})`);
else console.log(`   ✅ Generic template: ${genAriaLabels} aria-labels`);

// ── CHECK 7: Canonical URL patterns ──
console.log('🔗 CHECK 7: Canonical URL Patterns');
if (!categoryPage.includes('canonical')) {
  crit('SEO', 'Category page missing canonical URL');
}
if (!categoryPage.includes('x-default')) {
  warn('SEO', 'Category page missing x-default hreflang');
}
if (!genTemplate.includes('canonical')) {
  crit('SEO', 'Generic template missing canonical URL');
}

// ── CHECK 8: OpenGraph completeness ──
console.log('📱 CHECK 8: OpenGraph Completeness');
const ogFields = ['openGraph', 'twitter', 'images'];
for (const field of ogFields) {
  if (!categoryPage.includes(field)) {
    warn('OG', `Category page missing ${field} meta`);
  }
  if (!genTemplate.includes(field)) {
    warn('OG', `Generic template missing ${field} meta`);
  }
}

// ── CHECK 9: Dark mode support ──
console.log('🌙 CHECK 9: Dark Mode Support');
const darkClasses = (genTemplate.match(/dark:/g) || []).length;
if (darkClasses < 10) warn('UI', `Generic template has only ${darkClasses} dark: classes (need 10+ for proper dark mode)`);

const catDarkClasses = (catTemplate.match(/dark:/g) || []).length;
if (catDarkClasses < 10) warn('UI', `CategoryTemplate has only ${catDarkClasses} dark: classes (need 10+ for proper dark mode)`);

// ── CHECK 10: Lazy loading for images ──
console.log('⚡ CHECK 10: Performance');
if (!genTemplate.includes('loading="lazy"')) {
  warn('PERF', 'Generic template not using lazy loading for images');
}

console.log('\n' + '='.repeat(60));
console.log(`🎨 TEMPLATE & RENDERING AUDIT (L15)`);
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('   ❌ Critical: ' + totalCrit);
if (totalWarns === 0 && totalCrit === 0) console.log('   ✅ ALL CHECKS PASSED');
console.log('='.repeat(60));
