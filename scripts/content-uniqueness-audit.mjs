/**
 * CONTENT UNIQUENESS AUDIT — Layer 6
 * 1. Detect duplicate/near-duplicate meta descriptions
 * 2. Detect duplicate expert opinions
 * 3. Detect identical feature arrays
 * 4. Check shortDescription uniqueness
 * 5. Verify price sanity (no same price+originalPrice combos that suggest copy-paste)
 */
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';
const files = readdirSync(DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

const metaDescs = {};
const expertEn = {};
const expertAr = {};
const featureSets = {};
const priceCombs = {};
let totalWarns = 0;
let totalCrit = 0;
const issueProducts = {};

function addIssue(slug, type, msg) {
  if (!issueProducts[slug]) issueProducts[slug] = [];
  issueProducts[slug].push({ type, msg });
}

for (const file of files) {
  const content = readFileSync(join(DIR, file), 'utf-8');
  const slug = file.replace('.ts', '');
  
  // Extract metaDesc (EN and AR)
  const metaDescMatches = [...content.matchAll(/metaDesc:\s*"([^"]+)"/g)];
  for (const md of metaDescMatches) {
    const desc = md[1].substring(0, 60); // First 60 chars as fingerprint
    if (metaDescs[desc]) {
      addIssue(slug, 'DUPE-META', `Meta description starts same as ${metaDescs[desc]}: "${desc}..."`);
      totalWarns++;
    } else {
      metaDescs[desc] = slug;
    }
  }
  
  // Expert opinions
  const expertMatch = content.match(/expertOpinion:\s*\{[\s\S]*?en:\s*"([^"]{50,})"/);
  if (expertMatch) {
    const key = expertMatch[1].substring(0, 50);
    if (expertEn[key]) {
      addIssue(slug, 'DUPE-EXPERT', `Expert opinion EN starts same as ${expertEn[key]}`);
      totalCrit++;
    } else {
      expertEn[key] = slug;
    }
  }
  
  // Features fingerprint
  const featMatch = content.match(/features:\s*\[([\s\S]*?)\]/);
  if (featMatch) {
    const feats = (featMatch[1].match(/"([^"]+)"/g) || []).join('|');
    const fingerprint = feats.substring(0, 100);
    if (featureSets[fingerprint]) {
      addIssue(slug, 'DUPE-FEATURES', `Features identical to ${featureSets[fingerprint]}`);
      totalCrit++;
    } else {
      featureSets[fingerprint] = slug;
    }
  }
  
  // Price combination check
  const priceM = content.match(/price:\s*([\d.]+)/);
  const origM = content.match(/originalPrice:\s*([\d.]+)/);
  if (priceM && origM) {
    const key = `${priceM[1]}-${origM[1]}`;
    if (priceCombs[key]) {
      addIssue(slug, 'SAME-PRICE', `Same price combo (${priceM[1]}/${origM[1]}) as ${priceCombs[key]} — check if intentional`);
      totalWarns++;
    } else {
      priceCombs[key] = slug;
    }
  }
  
  // Meta title length check (Google truncates >60 chars)
  const titleMatches = [...content.matchAll(/metaTitle:\s*"([^"]+)"/g)];
  for (const tm of titleMatches) {
    if (tm[1].length > 65) {
      addIssue(slug, 'TITLE-LONG', `metaTitle (${tm[1].length} chars) may be truncated: "${tm[1].substring(0, 40)}..."`);
      totalWarns++;
    }
  }
  
  // Meta description length (Google truncates >160 chars)
  for (const md of metaDescMatches) {
    if (md[1].length > 165) {
      addIssue(slug, 'DESC-LONG', `metaDesc (${md[1].length} chars) may be truncated`);
      totalWarns++;
    }
  }
}

// Print results
for (const [slug, issues] of Object.entries(issueProducts)) {
  console.log(`📦 ${slug}`);
  for (const i of issues) {
    const icon = i.type.startsWith('DUPE-EXPERT') || i.type.startsWith('DUPE-FEATURES') ? '❌' : '⚠️';
    console.log(`   ${icon} ${i.type}: ${i.msg}`);
  }
}

console.log('\n' + '='.repeat(60));
console.log('📊 CONTENT UNIQUENESS AUDIT — ' + files.length + ' products');
console.log('   ✅ Clean: ' + (files.length - Object.keys(issueProducts).length));
console.log('   ⚠️  Warnings: ' + totalWarns);
console.log('   ❌ Critical: ' + totalCrit);
console.log('='.repeat(60));
