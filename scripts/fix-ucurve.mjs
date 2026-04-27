/**
 * Fix U-CURVE: Inject contrast/problem opener in quick-answer sections
 * Blueprint requires "على عكس" / "Unlike" / "بدلاً من" pattern
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';

const PRODUCTS_DIR = 'src/data/products';
let fixed = 0;

const contrastPhrases = {
  'cables': {
    en: 'Unlike cheap cables that throttle at 5W and die within weeks, ',
    ar: 'على عكس الكابلات الرخيصة اللي بتختنق عند 5 واط وبتموت في أسابيع، '
  },
  'wall-chargers': {
    en: 'Unlike unbranded chargers that overheat and damage your battery, ',
    ar: 'على عكس الشواحن مجهولة المصدر اللي بتسخن وبتتلف البطارية، '
  },
  'power-banks': {
    en: 'Unlike budget power banks with inflated capacity claims, ',
    ar: 'على عكس الباور بانك الرخيص بسعات مكتوبة مبالغ فيها، '
  },
  'audio': {
    en: 'Unlike cheap earbuds with tinny sound and 1-hour battery, ',
    ar: 'على عكس السماعات الرخيصة بصوت مشوش وبطارية ساعة، '
  },
  'car-chargers': {
    en: 'Unlike unbranded car chargers that flicker during voltage drops, ',
    ar: 'على عكس شواحن السيارة المقلدة اللي بتفصل مع تذبذب الفولتية، '
  },
  'car-holders': {
    en: 'Unlike cheap phone mounts that lose grip in Egyptian summer heat, ',
    ar: 'على عكس الحوامل الرخيصة اللي بتسيب الموبايل في حرارة صيف مصر، '
  },
  'smart-watches': {
    en: 'Unlike knockoff watches with fake water resistance ratings, ',
    ar: 'على عكس الساعات المقلدة بتصنيفات مقاومة مية وهمية، '
  },
  'speakers': {
    en: 'Unlike cheap speakers with distorted bass and short battery, ',
    ar: 'على عكس السبيكرات الرخيصة بباص مشوش وبطارية قصيرة، '
  },
  'wireless-charging': {
    en: 'Unlike generic wireless chargers with dangerous heat buildup, ',
    ar: 'على عكس الشواحن اللاسلكية العامة بسخونة خطيرة، '
  }
};

const files = readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));

for (const file of files) {
  const slug = file.replace('.ts', '');
  let content = readFileSync(`${PRODUCTS_DIR}/${file}`, 'utf-8');
  
  // Check if already has contrast
  const hasContrast = content.includes('على عكس') || content.includes('Unlike') || 
                      content.includes('بدلاً من') || content.includes('Instead of') || 
                      content.includes('المشكلة') || content.includes('problem');
  if (hasContrast) continue;
  
  const catMatch = content.match(/categorySlug:\s*["']([^"']+)["']/);
  const cat = catMatch ? catMatch[1] : 'cables';
  const phrases = contrastPhrases[cat] || contrastPhrases['cables'];
  
  let changed = false;
  
  // Find quick-answer paragraph and prepend contrast phrase
  // Handle template literal format: <p class="text-gray-800 leading-relaxed">TEXT</p>
  const qaRegex = /(class=(?:\\?)"quick-answer(?:\\?)"[\s\S]*?<p[\s\S]*?>)/g;
  let matchCount = 0;
  content = content.replace(qaRegex, (match) => {
    matchCount++;
    // First match = EN, second = AR
    const phrase = matchCount === 1 ? phrases.en : phrases.ar;
    return match + phrase;
  });
  
  if (matchCount >= 2) {
    changed = true;
  }
  
  if (changed) {
    writeFileSync(`${PRODUCTS_DIR}/${file}`, content);
    fixed++;
    console.log(`✅ ${slug}`);
  }
}

console.log(`\n=== Fixed ${fixed} U-CURVE contrast openers ===`);
