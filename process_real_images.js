#!/usr/bin/env node
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = '/Users/ahmedsalem/.gemini/antigravity/brain/a4a376bf-c378-410b-a994-567b08816298';
const OUTPUT_DIR = path.join(__dirname, 'public/images/blog/posts');

// Mapping original slug -> image prefix
const articles = [
  { slug: 'anker-vs-joyroom-comparison', prefix: 'anker_vs_joyroom_comparison', title: 'Anker vs Joyroom — Comprehensive Comparison', titleAr: 'انكر vs جوي روم مقارنة شاملة', keywords: 'anker,joyroom,comparison,chargers,power banks,egypt' },
  { slug: 'best-bluetooth-earbuds-egypt-2026', prefix: 'best_bluetooth_earbuds', title: 'Best Bluetooth Earbuds Egypt 2026', titleAr: 'أفضل سماعات بلوتوث في مصر 2026', keywords: 'bluetooth earbuds,wireless,egypt,2026,best' },
  { slug: 'best-car-charger-egypt-2026', prefix: 'best_car_charger', title: 'Best Car Charger Egypt 2026', titleAr: 'أفضل شاحن سيارة في مصر 2026', keywords: 'car charger,best,egypt,2026,usb-c' },
  { slug: 'best-fast-chargers-for-samsung-s26-yahya-radwan', prefix: 'best_fast_chargers_samsung', title: 'Best Fast Chargers for Samsung S26', titleAr: 'أفضل شواحن سريعة لسامسونج S26', keywords: 'samsung s26,fast charger,45w,super fast,egypt' },
  { slug: 'best-iphone-17-charger-egypt', prefix: 'best_iphone_17_charger', title: 'Best iPhone 17 Charger Egypt', titleAr: 'أفضل شاحن ايفون 17 في مصر', keywords: 'iphone 17,charger,usb-c,egypt,best' },
  { slug: 'best-power-bank-egypt-2026', prefix: 'best_power_bank_egypt', title: 'Best Power Bank Egypt 2026', titleAr: 'أفضل باور بانك في مصر 2026', keywords: 'power bank,best,egypt,2026,anker,joyroom' },
  { slug: 'best-power-bank-router-power-outage-egypt', prefix: 'best_power_bank_router', title: 'Best Power Bank for Router During Power Outage', titleAr: 'أفضل باور بانك للراوتر أثناء انقطاع الكهرباء', keywords: 'power bank,router,power outage,ups,egypt' },
  { slug: 'best-power-bank-under-1000-egp-egypt', prefix: 'best_power_bank_under_1000', title: 'Best Power Bank Under 1000 EGP', titleAr: 'أفضل باور بانك بسعر أقل من 1000 جنيه', keywords: 'power bank,budget,egypt,best,under 1000' },
  { slug: 'best-samsung-s26-charger', prefix: 'best_samsung_s26_charger', title: 'Best Samsung S26 Charger', titleAr: 'أفضل شاحن سامسونج S26', keywords: 'samsung s26,charger,45w,fast charging,egypt' },
  { slug: 'do-fake-chargers-damage-iphone-battery', prefix: 'do_fake_chargers_damage_iphone', title: 'Do Fake Chargers Damage iPhone Battery', titleAr: 'هل الشواحن المقلدة تدمر بطارية الايفون', keywords: 'fake charger,iphone,battery damage,safety,egypt' },
  { slug: 'does-fast-charging-damage-battery-truth', prefix: 'does_fast_charging_damage_battery', title: 'Does Fast Charging Damage Battery The Truth', titleAr: 'هل الشحن السريع يضر البطارية الحقيقة', keywords: 'fast charging,battery damage,truth,safety,egypt' },
  { slug: 'how-to-charge-power-bank-correctly', prefix: 'how_to_charge_power_bank', title: 'How to Charge Power Bank Correctly', titleAr: 'ازاي تشحن الباور بانك صح', keywords: 'power bank,charging,correct,tips,egypt' },
  { slug: 'how-to-identify-original-anker', prefix: 'how_to_identify_original_anker', title: 'How to Identify Original Anker Products', titleAr: 'ازاي تعرف منتج انكر الاصلي', keywords: 'anker,original,fake,identify,egypt' },
  { slug: 'original-vs-fake-apple-charger-egypt', prefix: 'original_vs_fake_apple_charger', title: 'Original vs Fake Apple Charger Egypt', titleAr: 'شاحن ابل الاصلي ضد التقليد في مصر', keywords: 'apple charger,original,fake,comparison,egypt' },
  { slug: 'power-bank-10000mah-real-capacity-myth', prefix: 'power_bank_10000mah_real_capacity', title: '10000mAh Power Bank Real Capacity Myth', titleAr: 'باور بانك 10000 مللي أمبير خرافة السعة', keywords: 'power bank,10000mah,real capacity,myth,egypt' },
  { slug: 'power-bank-airplane-rules-egypt-2026', prefix: 'power_bank_airplane_rules', title: 'Power Bank Airplane Rules Egypt 2026', titleAr: 'قواعد الباور بانك في الطيران مصر', keywords: 'power bank,airplane,rules,flight,egypt' },
  { slug: 'protect-phone-from-heat-summer-egypt', prefix: 'protect_phone_from_heat', title: 'Protect Phone from Heat Summer Egypt', titleAr: 'حماية الموبايل من الحرارة صيف مصر', keywords: 'phone heat,summer,protection,egypt,cairo' },
  { slug: 'soundcore-models-guide-egypt-2026', prefix: 'soundcore_models_guide', title: 'Soundcore Models Guide Egypt 2026', titleAr: 'دليل موديلات ساوند كور في مصر 2026', keywords: 'soundcore,models,guide,earbuds,egypt,2026' },
  { slug: 'the-hidden-truth-about-gan-chargers-ahmed-medhat', prefix: 'the_hidden_truth_about_gan', title: 'The Hidden Truth About GaN Chargers', titleAr: 'الحقيقة المخفية عن شواحن GaN', keywords: 'gan charger,truth,technology,egypt,efficiency' },
  { slug: 'usb-c-cable-guide-egypt-2026', prefix: 'usb_c_cable_guide', title: 'USB-C Cable Guide Egypt 2026', titleAr: 'دليل كابلات USB-C في مصر 2026', keywords: 'usb-c,cable,guide,egypt,2026,braided' },
  { slug: 'why-phone-charging-slowly-causes-solutions', prefix: 'why_phone_charging_slowly', title: 'Why Phone Charging Slowly Causes Solutions', titleAr: 'ليه الموبايل بيشحن ببطء الاسباب والحلول', keywords: 'slow charging,causes,solutions,phone,egypt' },
];

async function main() {
  const inputFiles = fs.readdirSync(INPUT_DIR).filter(f => f.endsWith('.png'));

  console.log(`\n PROCESSING ${articles.length} AI-GENERATED IMAGES FOR EXISTING ARTICLES...\n`);
  let successCount = 0;

  for (const a of articles) {
    const outPath = path.join(OUTPUT_DIR, `${a.slug}.webp`);
    
    // Find matching PNG in the artifacts
    const match = inputFiles.find(f => f.startsWith(a.prefix) && f.includes('_17'));
    if (!match) {
      console.log(`⚠️ MISSING source PNG for ${a.slug} (expected prefix: ${a.prefix})`);
      continue;
    }

    const inPath = path.join(INPUT_DIR, match);
    
    // Crop & Convert
    try {
      await sharp(inPath)
        .resize({ width: 1200, height: 630, fit: 'cover', position: 'center' })
        .webp({ quality: 85 })
        .toFile(outPath);
      console.log(`✅ Processed: ${a.slug}.webp`);
      successCount++;
    } catch(err) {
      console.error(`❌ Failed sharp processing for ${a.slug}:`, err.message);
      continue;
    }

    // Inject EXIF
    try {
      execFileSync('exiftool', [
        '-overwrite_original',
        `-Artist=CairoVolt Editorial Team`,
        `-Copyright=2026 CairoVolt. All rights reserved.`,
        `-ImageDescription=${a.title}`,
        `-XMP-dc:Title=${a.title}`,
        `-XMP-dc:Description=${a.titleAr}`,
        `-XMP-dc:Creator=CairoVolt Editorial Team`,
        `-XMP-dc:Rights=2026 CairoVolt`,
        `-XMP-dc:Subject=${a.keywords}`,
        `-XMP-photoshop:Credit=CairoVolt`,
        `-XMP-photoshop:Source=cairovolt.com`,
        outPath
      ]);
    } catch(err) {
      console.warn(`  ⚠️ EXIF fail: ${a.slug}`);
    }

    // Inject C2PA Manifest
    try {
      const manifest = {
        claim_generator: 'CairoVolt-CMS/1.0 (Editorial AI Pipeline)',
        title: a.title,
        assertions: [
          { label: 'c2pa.actions', data: { actions: [
            { action: 'c2pa.created', softwareAgent: 'Gemini 3.1 Pro + CairoVolt Pipeline', digitalSourceType: 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia' },
            { action: 'c2pa.color_adjustments', softwareAgent: 'sharp resize 1200x630 webp' },
            { action: 'c2pa.edited', softwareAgent: 'exiftool v13.x' },
            { action: 'c2pa.published', softwareAgent: 'CairoVolt Next.js CMS' }
          ]}},
          { label: 'stds.schema-org.CreativeWork', data: {
            '@context': 'https://schema.org', '@type': 'ImageObject',
            name: a.title, url: `https://cairovolt.com/images/blog/posts/${a.slug}.webp`,
            publisher: { '@type': 'Organization', name: 'CairoVolt', url: 'https://cairovolt.com' },
            license: 'https://cairovolt.com/license/editorial', copyrightHolder: 'CairoVolt'
          }}
        ]
      };
      const mfPath = path.join(OUTPUT_DIR, `_m_${a.slug}.json`);
      fs.writeFileSync(mfPath, JSON.stringify(manifest));
      execFileSync('c2patool', [outPath, '--manifest', mfPath, '--output', outPath, '--force']);
      fs.unlinkSync(mfPath);
      console.log(`  🔏 Signed C2PA/EXIF`);
    } catch(err) {
      const mfPath = path.join(OUTPUT_DIR, `_m_${a.slug}.json`);
      if (fs.existsSync(mfPath)) fs.unlinkSync(mfPath);
      console.warn(`  ⚠️ C2PA fail: ${a.slug}`);
    }
    console.log('---');
  }

  console.log(`\n🎉 DONE! Replaced ${successCount} placeholder images with real high-quality editorial AI images.`);
}

main().catch(console.error);
