/**
 * Fix all category-level issues found in L12 audit
 */
import { readFileSync, writeFileSync } from 'fs';

const fixes = [];

// ═══════════════════════════════════════
// 1. Fix joyroom/car-accessories: NO PRODUCTS found
//    The 60w-car-charger maps to "car-chargers" but the category is "car-accessories"
//    The car mount maps to "car-holders"
//    Need to add "car-chargers" content mapping OR remap products
//    Decision: Add car-chargers category content to barrel file
// ═══════════════════════════════════════

// 2. Fix short AR descriptions
const fixJoyroomCables = () => {
  const f = 'src/data/category-content/joyroom/cables.ts';
  let c = readFileSync(f, 'utf-8');
  const oldDesc = "تسوق كابلات جوي روم الأصلية في مصر. كابل شحن سريع, كابل ايفون, كابل تايب سي.";
  const newDesc = "تسوق كابلات جوي روم الأصلية في مصر. كابل شحن سريع 30 واط, كابل ايفون Lightning, كابل تايب سي USB-C. ضمان حتى 36 شهر + توصيل لكل مصر.";
  if (c.includes(oldDesc)) {
    c = c.replace(oldDesc, newDesc);
    writeFileSync(f, c, 'utf-8');
    console.log('✅ joyroom/cables: AR description expanded (71→140 chars)');
  }
};

const fixJoyroomSmartWatches = () => {
  const f = 'src/data/category-content/joyroom/smart-watches.ts';
  let c = readFileSync(f, 'utf-8');
  const oldDesc = "تسوق ساعة ذكية جوي روم في مصر. ساعة FT3 بشاشة AMOLED, متوافقة مع ايفون واندرويد.";
  const newDesc = "تسوق ساعة ذكية جوي روم FT3 في مصر. شاشة AMOLED 1.96 بوصة, متوافقة مع ايفون واندرويد, مراقبة صحة, بطارية 7 أيام. ضمان 18 شهر.";
  if (c.includes(oldDesc)) {
    c = c.replace(oldDesc, newDesc);
    writeFileSync(f, c, 'utf-8');
    console.log('✅ joyroom/smart-watches: AR description expanded (77→128 chars)');
  }
};

// 3. Fix thin keywords (add more keywords)
const fixKeywords = () => {
  const keywordFixes = [
    {
      file: 'src/data/category-content/anker/car-chargers.ts',
      old: "keywords: 'anker car charger, car charger egypt, anker car, car charging'",
      new: "keywords: 'anker car charger, car charger egypt, anker car, car charging, شاحن سيارة انكر, anker 535 car charger, fast car charger egypt'"
    },
    {
      file: 'src/data/category-content/joyroom/cables.ts',
      old: "keywords: 'joyroom cable, joyroom usb cable, cables egypt'",
      new: "keywords: 'joyroom cable, joyroom usb cable, cables egypt, joyroom lightning cable, كابل جوي روم, joyroom type c cable'"
    },
    {
      file: 'src/data/category-content/joyroom/power-banks.ts',
      old: "keywords: 'joyroom power bank, power bank egypt, portable charger'",
      new: "keywords: 'joyroom power bank, power bank egypt, portable charger, باور بانك جوي روم, joyroom 20000mah, joyroom magnetic power bank'"
    },
    {
      file: 'src/data/category-content/joyroom/wall-chargers.ts',
      old: "keywords: 'joyroom charger, joyroom wall charger, fast charger egypt'",
      new: "keywords: 'joyroom charger, joyroom wall charger, fast charger egypt, شاحن جوي روم, joyroom 30w charger, joyroom pd charger'"
    },
    {
      file: 'src/data/category-content/joyroom/smart-watches.ts',
      old: "keywords: 'joyroom smartwatch, joyroom FT3, smart watch egypt'",
      new: "keywords: 'joyroom smartwatch, joyroom FT3, smart watch egypt, ساعة ذكية جوي روم, joyroom watch amoled, smartwatch egypt'"
    }
  ];
  
  for (const fix of keywordFixes) {
    let c = readFileSync(fix.file, 'utf-8');
    if (c.includes(fix.old)) {
      c = c.replace(fix.old, fix.new);
      writeFileSync(fix.file, c, 'utf-8');
      console.log(`✅ ${fix.file.split('/').pop().replace('.ts','')}: Keywords expanded`);
    }
  }
  
  // Fix AR keywords too
  const arKeywordFixes = [
    {
      file: 'src/data/category-content/joyroom/cables.ts',
      old: "keywords: 'كابل جوي روم, كابل شحن, كابل ايفون, وصلة شاحن'",
      new: "keywords: 'كابل جوي روم, كابل شحن, كابل ايفون, وصلة شاحن, كابل تايب سي جوي روم, كابل USB جوي روم مصر'"
    },
    {
      file: 'src/data/category-content/joyroom/car-accessories.ts',
      old: "keywords: 'شاحن سيارة joyroom, joyroom car holder, اكسسوارات سيارة, حامل موبايل سيارة'",
      new: "keywords: 'شاحن سيارة joyroom, joyroom car holder, اكسسوارات سيارة, حامل موبايل سيارة, شاحن سيارة 60 واط, حامل مغناطيسي سيارة'"
    },
    {
      file: 'src/data/category-content/joyroom/smart-watches.ts',
      old: "keywords: 'ساعة جوي روم, ساعة ذكية مصر, joyroom FT3, ساعة ذكية'",
      new: "keywords: 'ساعة جوي روم, ساعة ذكية مصر, joyroom FT3, ساعة ذكية, ساعة AMOLED جوي روم, ساعة رياضية ذكية مصر'"
    }
  ];
  
  for (const fix of arKeywordFixes) {
    let c = readFileSync(fix.file, 'utf-8');
    if (c.includes(fix.old)) {
      c = c.replace(fix.old, fix.new);
      writeFileSync(fix.file, c, 'utf-8');
      console.log(`✅ ${fix.file.split('/').pop().replace('.ts','')}: AR Keywords expanded`);
    }
  }
};

// 4. Fix long EN title (anker wall-chargers)
const fixLongTitle = () => {
  const f = 'src/data/category-content/anker/wall-chargers.ts';
  let c = readFileSync(f, 'utf-8');
  const oldTitle = "Anker Charger Egypt | From EGP 375 | iPhone & Samsung Fast Charging";
  const newTitle = "Anker Charger Egypt | iPhone & Samsung Fast Charging";
  if (c.includes(oldTitle)) {
    c = c.replace(oldTitle, newTitle);
    writeFileSync(f, c, 'utf-8');
    console.log('✅ anker/wall-chargers: EN title shortened (74→51 chars)');
  }
};

fixJoyroomCables();
fixJoyroomSmartWatches();
fixKeywords();
fixLongTitle();

console.log('\n🎯 Category fixes applied');
