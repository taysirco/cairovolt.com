import { readFileSync, writeFileSync } from 'fs';

const products = [
  {
    slug: 'joyroom-usb-c-lightning-cable',
    qaEN: 'The <strong>Joyroom USB-C to Lightning cable</strong> at <strong>118 EGP</strong> is the budget entry point for real 20W PD fast charging. Nylon braided, 12-month warranty, 0→50% in ~30 min for iPhone 14/13/12. CairoVolt\'s best-selling cable by volume.',
    qaAR: 'كابل <strong>جوي روم USB-C لـ Lightning</strong> بـ <strong>118 جنيه</strong> هو أرخص نقطة دخول لشحن PD سريع حقيقي 20 واط. نايلون مجدول، ضمان 12 شهر، 0→50% في ~30 دقيقة لايفون 14/13/12. أكثر كابل مبيعاً في كايرو فولت.',
    bwEN: 'Lightning cable — does NOT work with iPhone 17/16/15 (USB-C). This cable does NOT support fast charging with old USB-A chargers; you need a USB-C PD charger (sold separately) for 20W speed.',
    bwAR: 'كابل Lightning — مش بيشتغل مع ايفون 17/16/15 (USB-C). الكابل ده مش بيدعم شحن سريع مع شواحن USB-A القديمة؛ محتاج شاحن USB-C PD (بيتباع لوحده) لسرعة 20 واط.'
  },
  {
    slug: 'joyroom-car-mount-zs290',
    qaEN: 'The <strong>Joyroom ZS290 MagSafe car mount</strong> uses <strong>N52 magnets</strong> — the strongest consumer-grade magnets available. Holds iPhone firmly at 120km/h on Cairo\'s Ring Road. <strong>360° rotation</strong> for landscape GPS. At 2,550 EGP, it\'s the premium car mount.',
    qaAR: 'حامل <strong>جوي روم ZS290 MagSafe للسيارة</strong> بيستخدم <strong>مغناطيس N52</strong> — أقوى مغناطيس متاح للمستهلك. بيمسك الايفون بثبات عند 120 كم/س على الدائري. <strong>دوران 360°</strong> لوضع GPS الأفقي. بـ 2,550 جنيه، الحامل الفاخر.',
    bwEN: 'MagSafe ONLY — does NOT work with non-MagSafe phones unless you add a MagSafe ring (sold separately). iPhone 12 and newer only. Not compatible with thick cases (>2mm). Dashboard adhesive may weaken in extreme Cairo summer heat (>50°C).',
    bwAR: 'MagSafe بس — مش بيشتغل مع موبايلات بدون MagSafe إلا لو ضفت حلقة MagSafe (بتتباع لوحدها). ايفون 12 والأحدث بس. مش متوافق مع الجرابات السميكة (أكتر من 2 مم). لاصق التابلوه ممكن يضعف في حرارة صيف القاهرة الشديدة (فوق 50°م).'
  },
  {
    slug: 'joyroom-car-phone-mount',
    qaEN: 'The <strong>Joyroom Universal Car Mount</strong> at <strong>169 EGP</strong> fits phones 4.7"-6.8" with a strong grip mechanism. Spring-loaded arms + anti-slip pads. Fits all Egyptian car air vents. Budget-friendly without sacrificing stability.',
    qaAR: 'حامل <strong>جوي روم العالمي للسيارة</strong> بـ <strong>169 جنيه</strong> بيناسب موبايلات من 4.7"-6.8" بآلية تثبيت قوية. أذرع زنبركية + وسائد مانعة للانزلاق. بيركّب على كل فتحات تكييف العربيات المصرية. اقتصادي بدون التضحية بالثبات.',
    bwEN: 'Air vent mount ONLY — no dashboard or windshield option. May block air vent in summer when you need AC most. Not suitable for very heavy phones with large cases. Spring mechanism may loosen after 12+ months of daily use.',
    bwAR: 'تركيب على فتحة التكييف بس — مفيش خيار تابلوه أو زجاج. ممكن يسد فتحة التكييف في الصيف لما تحتاج التكييف أكتر. مش مناسب للموبايلات التقيلة جداً بجرابات كبيرة. آلية الزنبرك ممكن ترتخي بعد 12+ شهر استخدام يومي.'
  },
  {
    slug: 'joyroom-ft3-smartwatch',
    qaEN: 'The <strong>Joyroom FT3 Smartwatch</strong> delivers <strong>IP68 waterproof + 20 sports modes + heart rate monitoring</strong> at 1,092 EGP. Works with iPhone AND Android. 7-day battery life. The budget alternative to Apple Watch for basic health tracking.',
    qaAR: 'ساعة <strong>جوي روم FT3 الذكية</strong> بتوفر <strong>مقاومة مياه IP68 + 20 وضع رياضي + مراقبة نبض القلب</strong> بـ 1,092 جنيه. بتشتغل مع ايفون وأندرويد. عمر بطارية 7 أيام. البديل الاقتصادي لساعة أبل لتتبع الصحة الأساسي.',
    bwEN: 'This is NOT an Apple Watch — no App Store, no Apple Pay, no iMessage. Health readings (heart rate, SpO2) are estimates only, not medical-grade. Companion app required for full features. Notifications may lag on some Android devices.',
    bwAR: 'دي مش ساعة أبل — مفيش App Store ولا Apple Pay ولا iMessage. قراءات الصحة (نبض القلب، SpO2) تقديرية فقط، مش درجة طبية. تطبيق مرافق مطلوب للميزات الكاملة. الإشعارات ممكن تتأخر على بعض أجهزة أندرويد.'
  },
  {
    slug: 'joyroom-jr-t03-wireless-earbuds',
    qaEN: 'The <strong>Joyroom JR-T03 earbuds</strong> pack <strong>20 hours total battery + Bluetooth 5.0 + touch controls</strong> at 774 EGP. IPX4 water-resistant for gym use. Deep bass with 13mm drivers. A solid daily driver that punches above its price.',
    qaAR: 'سماعات <strong>جوي روم JR-T03</strong> بتوفر <strong>20 ساعة بطارية إجمالية + بلوتوث 5.0 + تحكم باللمس</strong> بـ 774 جنيه. مقاومة مياه IPX4 للجيم. صوت bass عميق بسماعات 13 مم. سماعة يومية ممتازة بتتفوق على سعرها.',
    bwEN: 'NO active noise cancellation (ANC). Not suitable for very loud environments. IPX4 means splash-resistant, NOT swim-proof. Ear tips may need replacement after 6+ months. Touch controls have a learning curve.',
    bwAR: 'مفيش عزل ضوضاء نشط (ANC). مش مناسبة للبيئات الصاخبة جداً. IPX4 يعني مقاومة رذاذ، مش مقاومة غطس. أطراف الأذن ممكن تحتاج استبدال بعد 6+ شهور. التحكم باللمس محتاج تعوّد.'
  },
  {
    slug: 'joyroom-magnetic-power-bank-10000',
    qaEN: 'The <strong>Joyroom MagSafe Power Bank 10000mAh</strong> snaps magnetically to iPhone back and charges wirelessly at <strong>15W + 20W wired output</strong>. Built-in kickstand for FaceTime. At 850 EGP, it\'s the premium hands-free portable charging solution.',
    qaAR: 'باور بانك <strong>جوي روم MagSafe 10000mAh</strong> بيلزق مغناطيسياً ع ضهر الايفون وبيشحن لاسلكياً بـ <strong>15 واط + 20 واط سلكي</strong>. حامل مدمج لـ FaceTime. بـ 850 جنيه، الحل الفاخر للشحن المحمول بدون يدين.',
    bwEN: 'MagSafe wireless charging works with iPhone 12 and newer ONLY. Does NOT wirelessly charge Samsung or non-MagSafe phones. The 15W wireless is slower than wired; for fastest charge, use the USB-C port. Adds noticeable weight when attached to phone.',
    bwAR: 'شحن MagSafe اللاسلكي بيشتغل مع ايفون 12 والأحدث بس. مش بيشحن سامسونج أو موبايلات بدون MagSafe لاسلكياً. الـ 15 واط اللاسلكي أبطأ من السلكي؛ لأسرع شحن، استخدم منفذ USB-C. بيزوّد وزن ملحوظ لما يكون مركّب على الموبايل.'
  },
  {
    slug: 'joyroom-power-bank-10000',
    qaEN: 'The <strong>Joyroom 10000mAh Slim Power Bank</strong> features <strong>QC 3.0 fast output + LED display showing exact battery %</strong>. Ultra-slim design fits in shirt pockets. At 1,624 EGP, it\'s the premium compact power bank for professionals.',
    qaAR: 'باور بانك <strong>جوي روم 10000mAh نحيف</strong> بميزة <strong>QC 3.0 خرج سريع + شاشة LED بتوريك نسبة البطارية بالظبط</strong>. تصميم نحيف جداً بيدخل جيب القميص. بـ 1,624 جنيه، باور بانك المحترفين الفاخر.',
    bwEN: 'Does NOT support PD protocol — iPhone 17/16/15 charges at standard QC speed, not maximum PD. 10000mAh gives about 2 full charges for most phones, not 3+. No wireless charging. LED display drains a small amount of standby power.',
    bwAR: 'مش بيدعم بروتوكول PD — ايفون 17/16/15 بيشحن بسرعة QC العادية، مش أقصى PD. 10000mAh بيدّي حوالي 2 شحنة كاملة لمعظم الموبايلات، مش 3+. مفيش شحن لاسلكي. شاشة LED بتستهلك كمية صغيرة من طاقة الاستعداد.'
  },
  {
    slug: 'joyroom-power-bank-20000',
    qaEN: 'The <strong>Joyroom 20000mAh Power Bank</strong> delivers <strong>22.5W PD+QC with triple output</strong> — charge 3 devices simultaneously. 20000mAh = 4+ full phone charges. At 997 EGP, the best capacity-per-EGP power bank we sell.',
    qaAR: 'باور بانك <strong>جوي روم 20000mAh</strong> بيدّي <strong>22.5 واط PD+QC بثلاث مخارج</strong> — اشحن 3 أجهزة في نفس الوقت. 20000mAh = 4+ شحنات كاملة للموبايل. بـ 997 جنيه، أفضل سعة مقابل الجنيه في باور بانكاتنا.',
    bwEN: 'Heavier than 10000mAh options — not ideal for shirt pockets. Full recharge takes 6-8 hours. When charging 3 devices simultaneously, power splits and each device charges slower. Not airline carry-on approved in some regions (check before flying).',
    bwAR: 'أتقل من خيارات 10000mAh — مش مثالي لجيب القميص. الشحن الكامل بياخد 6-8 ساعات. لما تشحن 3 أجهزة في نفس الوقت، الطاقة بتتقسم وكل جهاز بيشحن أبطأ. مش معتمد للحمل في الطيارة في بعض المناطق (تأكد قبل السفر).'
  },
  {
    slug: 'joyroom-t03s-pro-earbuds',
    qaEN: 'The <strong>Joyroom T03S Pro ANC Earbuds</strong> feature <strong>active noise cancellation + 30 hours battery + Bluetooth 5.3</strong> at 664 EGP. ANC blocks up to 35dB of ambient noise. The best ANC-per-EGP earbuds in Egypt.',
    qaAR: 'سماعات <strong>جوي روم T03S Pro ANC</strong> بميزة <strong>عزل ضوضاء نشط + 30 ساعة بطارية + بلوتوث 5.3</strong> بـ 664 جنيه. ANC بيمنع لحد 35dB من الضوضاء المحيطة. أفضل سماعات ANC مقابل الجنيه في مصر.',
    bwEN: 'ANC reduces noise but does NOT eliminate it completely — don\'t expect Apple AirPods Pro level isolation. 30H battery is with ANC OFF; with ANC ON, expect ~20H. Not suitable for intense sports (IPX4 only). Ear tips are proprietary.',
    bwAR: 'ANC بيقلل الضوضاء لكن مش بيلغيها تماماً — متوقعش عزل على مستوى AirPods Pro. 30 ساعة بطارية مع إيقاف ANC؛ مع تشغيل ANC، توقع ~20 ساعة. مش مناسبة للرياضة المكثفة (IPX4 بس). أطراف الأذن خاصة بالمنتج.'
  },
  {
    slug: 'joyroom-3-in-1-wireless-charging-station',
    qaEN: 'The <strong>Joyroom 3-in-1 MagSafe Station</strong> charges <strong>iPhone 17 + Apple Watch + AirPods simultaneously</strong> at 15W. Premium aluminum build. Eliminates 3 cables from your nightstand. At 1,206 EGP, the premium Apple ecosystem dock.',
    qaAR: 'محطة <strong>جوي روم 3 في 1 MagSafe</strong> بتشحن <strong>ايفون 17 + ساعة أبل + AirPods في نفس الوقت</strong> بـ 15 واط. بناء ألومنيوم فاخر. بتلغي 3 كابلات من الكومودينو. بـ 1,206 جنيه، محطة شحن نظام أبل الفاخرة.',
    bwEN: 'Apple ecosystem ONLY — does NOT charge Samsung or Android wirelessly. Apple Watch charger module is Watch-specific. iPhone must be MagSafe compatible (iPhone 12+). AirPods must be wireless charging case model. Power adapter NOT included.',
    bwAR: 'نظام أبل بس — مش بتشحن سامسونج أو أندرويد لاسلكياً. وحدة شحن ساعة أبل خاصة بالساعة بس. الايفون لازم يكون متوافق MagSafe (ايفون 12+). AirPods لازم يكون موديل العلبة اللاسلكية. محول الطاقة مش في العلبة.'
  }
];

let updated = 0;
for (const p of products) {
  const path = `src/data/products/${p.slug}.ts`;
  let content = readFileSync(path, 'utf-8');
  
  if (content.includes('quick-answer')) {
    console.log(`⏭ ${p.slug} — already has quick-answer, skipping`);
    continue;
  }

  // Count occurrences of `<div class="product-summary">` 
  const psSplit = content.split('<div class="product-summary">');
  if (psSplit.length < 3) {
    console.log(`⚠️ ${p.slug} — doesn't have 2 product-summary divs, skipping`);
    continue;
  }

  // Insert EN quick-answer before first product-summary
  const enQA = `<div class="quick-answer"><p class="text-gray-800 leading-relaxed">${p.qaEN}</p></div>\n<div class="product-summary">`;
  content = content.replace('<div class="product-summary">', enQA); // replaces first occurrence

  // Insert AR quick-answer before second product-summary (now it's the second remaining)
  const arQA = `<div class="quick-answer"><p class="text-gray-800 leading-relaxed">${p.qaAR}</p></div>\n<div class="product-summary">`;
  // Find second occurrence
  const firstIdx = content.indexOf('<div class="product-summary">');
  const secondIdx = content.indexOf('<div class="product-summary">', firstIdx + 1);
  if (secondIdx > -1) {
    content = content.slice(0, secondIdx) + arQA + content.slice(secondIdx + '<div class="product-summary">'.length);
  }

  // Add buyer-warning before each `,` that closes a description template
  // Find the pattern: closing </div> + newline + `, (end of template literal)
  // EN buyer-warning
  const enBW = `<div class="buyer-warning"><h3 class="font-bold mb-2 text-red-700">⚠️ Buyer Warning:</h3><p class="text-gray-700">${p.bwEN}</p></div>`;
  const arBW = `<div class="buyer-warning"><h3 class="font-bold mb-2 text-red-700">⚠️ تحذير للمشتري:</h3><p class="text-gray-700">${p.bwAR}</p></div>`;
  
  // Find first `, that ends the EN description
  const backtickCommaPattern = /\u003c\/div>\s*\n`/g;
  // Actually let's be more precise — find </div>\n`,  patterns
  // Split by the backtick-comma that ends the description 
  const descEndMatches = [...content.matchAll(/(<\/div>\s*>?\s*`),/g)];
  
  // Simpler approach: insert before the closing backtick+comma
  // Find all positions of `\n`, in the content
  const lines = content.split('\n');
  let enDone = false, arDone = false;
  const newLines = [];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '`,' || trimmed === '</div>`,') {
      if (!enDone) {
        // Insert EN buyer warning before this line
        newLines.push(enBW);
        enDone = true;
      } else if (!arDone) {
        // Insert AR buyer warning before this line
        newLines.push(arBW);
        arDone = true;
      }
    }
    newLines.push(lines[i]);
  }
  
  content = newLines.join('\n');
  writeFileSync(path, content);
  updated++;
  console.log(`✅ ${p.slug} — added quick-answer + buyer-warning (EN+AR)`);
}

console.log(`\nDone: ${updated} files updated`);
