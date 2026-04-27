/**
 * Add comparison language to descriptions missing it.
 * Injects "Unlike" / "على عكس" into the quick-answer opening
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';

// Products needing comparison language, with tailored comparison text
const fixes = {
  'anker-powercore-26800': {
    en: { find: 'The <strong>Anker PowerCore 26800', replace: 'Unlike generic power banks that die after 2 charges, The <strong>Anker PowerCore 26800' },
    ar: null // Check if AR already has it
  },
  'anker-soundcore-flare-2': {
    en: { find: 'The <strong>Anker Soundcore Flare 2', replace: 'Unlike cheap Bluetooth speakers that distort at high volume, The <strong>Anker Soundcore Flare 2' },
    ar: null
  },
  'joyroom-3-in-1-data-cable': {
    en: { find: 'Instead of carrying 3 cables', replace: 'Unlike buying 3 separate cables that tangle and cost more, instead of carrying 3 cables' },
    ar: null
  },
  'joyroom-usb-a-type-c-cable': {
    en: { find: 'Got a new iPhone 17', replace: 'Unlike buying an expensive new charger, got a new iPhone 17' },
    ar: null
  }
};

let totalFixed = 0;

for (const [slug, fix] of Object.entries(fixes)) {
  const filePath = join(DIR, slug + '.ts');
  let content = readFileSync(filePath, 'utf-8');
  let changed = false;
  
  // EN fix
  if (fix.en && content.includes(fix.en.find)) {
    content = content.replace(fix.en.find, fix.en.replace);
    console.log(`✅ ${slug} [EN]: Added comparison language`);
    changed = true;
    totalFixed++;
  }
  
  // Check AR — does it already have comparison?
  const arDesc = content.match(/ar:[\s\S]*?description:\s*`([\s\S]*?)`/);
  if (arDesc) {
    const arText = arDesc[1];
    if (!/على عكس|مقابل|بالمقارنة|مقارنة/.test(arText)) {
      // Find AR quick-answer and inject
      const arQA = arText.match(/quick-answer[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/);
      if (arQA) {
        const originalSentence = arQA[1].trim();
        let compPrefix = '';
        
        if (slug === 'anker-powercore-26800') compPrefix = 'على عكس الباوربنكات العادية اللي بتخلص بعد شحنتين، ';
        else if (slug === 'anker-soundcore-flare-2') compPrefix = 'على عكس السماعات الرخيصة اللي صوتها بيتشوه على الصوت العالي، ';
        else if (slug === 'joyroom-3-in-1-data-cable') compPrefix = 'على عكس شراء 3 كابلات منفصلة بتتلخبط وبتكلف أكتر، ';
        else if (slug === 'joyroom-usb-a-type-c-cable') compPrefix = 'على عكس شراء شاحن جديد غالي، ';
        
        if (compPrefix) {
          const newStart = compPrefix + originalSentence.charAt(0).toLowerCase() + originalSentence.slice(1);
          content = content.replace(originalSentence, newStart);
          console.log(`✅ ${slug} [AR]: Added comparison language`);
          changed = true;
          totalFixed++;
        }
      }
    }
  }
  
  if (changed) writeFileSync(filePath, content, 'utf-8');
}

console.log(`\n🎯 Fixed ${totalFixed} descriptions with comparison language`);
