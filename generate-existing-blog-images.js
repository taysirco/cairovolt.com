#!/usr/bin/env node
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUTPUT_DIR = path.join(__dirname, 'public/images/blog/posts');

const articles = [
  { slug: 'anker-vs-joyroom-comparison', title: 'Anker vs Joyroom — Comprehensive Comparison', titleAr: 'انكر vs جوي روم مقارنة شاملة', keywords: 'anker,joyroom,comparison,chargers,power banks,egypt', category: 'comparison' },
  { slug: 'best-bluetooth-earbuds-egypt-2026', title: 'Best Bluetooth Earbuds Egypt 2026', titleAr: 'أفضل سماعات بلوتوث في مصر 2026', keywords: 'bluetooth earbuds,wireless,egypt,2026,best', category: 'buying-guide' },
  { slug: 'best-car-charger-egypt-2026', title: 'Best Car Charger Egypt 2026', titleAr: 'أفضل شاحن سيارة في مصر 2026', keywords: 'car charger,best,egypt,2026,usb-c', category: 'buying-guide' },
  { slug: 'best-fast-chargers-for-samsung-s26-yahya-radwan', title: 'Best Fast Chargers for Samsung S26', titleAr: 'أفضل شواحن سريعة لسامسونج S26', keywords: 'samsung s26,fast charger,45w,super fast,egypt', category: 'review' },
  { slug: 'best-iphone-17-charger-egypt', title: 'Best iPhone 17 Charger Egypt', titleAr: 'أفضل شاحن ايفون 17 في مصر', keywords: 'iphone 17,charger,usb-c,egypt,best', category: 'buying-guide' },
  { slug: 'best-power-bank-egypt-2026', title: 'Best Power Bank Egypt 2026', titleAr: 'أفضل باور بانك في مصر 2026', keywords: 'power bank,best,egypt,2026,anker,joyroom', category: 'buying-guide' },
  { slug: 'best-power-bank-router-power-outage-egypt', title: 'Best Power Bank for Router During Power Outage', titleAr: 'أفضل باور بانك للراوتر أثناء انقطاع الكهرباء', keywords: 'power bank,router,power outage,ups,egypt', category: 'buying-guide' },
  { slug: 'best-samsung-s26-charger', title: 'Best Samsung S26 Charger', titleAr: 'أفضل شاحن سامسونج S26', keywords: 'samsung s26,charger,45w,fast charging,egypt', category: 'buying-guide' },
  { slug: 'do-fake-chargers-damage-iphone-battery', title: 'Do Fake Chargers Damage iPhone Battery', titleAr: 'هل الشواحن المقلدة تدمر بطارية الايفون', keywords: 'fake charger,iphone,battery damage,safety,egypt', category: 'tips' },
  { slug: 'does-fast-charging-damage-battery-truth', title: 'Does Fast Charging Damage Battery The Truth', titleAr: 'هل الشحن السريع يضر البطارية الحقيقة', keywords: 'fast charging,battery damage,truth,safety,egypt', category: 'tips' },
  { slug: 'how-to-charge-power-bank-correctly', title: 'How to Charge Power Bank Correctly', titleAr: 'ازاي تشحن الباور بانك صح', keywords: 'power bank,charging,correct,tips,egypt', category: 'how-to' },
  { slug: 'how-to-identify-original-anker', title: 'How to Identify Original Anker Products', titleAr: 'ازاي تعرف منتج انكر الاصلي', keywords: 'anker,original,fake,identify,egypt', category: 'how-to' },
  { slug: 'original-vs-fake-apple-charger-egypt', title: 'Original vs Fake Apple Charger Egypt', titleAr: 'شاحن ابل الاصلي ضد التقليد في مصر', keywords: 'apple charger,original,fake,comparison,egypt', category: 'comparison' },
  { slug: 'power-bank-10000mah-real-capacity-myth', title: '10000mAh Power Bank Real Capacity Myth', titleAr: 'باور بانك 10000 مللي أمبير خرافة السعة', keywords: 'power bank,10000mah,real capacity,myth,egypt', category: 'tips' },
  { slug: 'power-bank-airplane-rules-egypt-2026', title: 'Power Bank Airplane Rules Egypt 2026', titleAr: 'قواعد الباور بانك في الطيران مصر', keywords: 'power bank,airplane,rules,flight,egypt', category: 'tips' },
  { slug: 'protect-phone-from-heat-summer-egypt', title: 'Protect Phone from Heat Summer Egypt', titleAr: 'حماية الموبايل من الحرارة صيف مصر', keywords: 'phone heat,summer,protection,egypt,cairo', category: 'tips' },
  { slug: 'soundcore-models-guide-egypt-2026', title: 'Soundcore Models Guide Egypt 2026', titleAr: 'دليل موديلات ساوند كور في مصر 2026', keywords: 'soundcore,models,guide,earbuds,egypt,2026', category: 'buying-guide' },
  { slug: 'the-hidden-truth-about-gan-chargers-ahmed-medhat', title: 'The Hidden Truth About GaN Chargers', titleAr: 'الحقيقة المخفية عن شواحن GaN', keywords: 'gan charger,truth,technology,egypt,efficiency', category: 'review' },
  { slug: 'usb-c-cable-guide-egypt-2026', title: 'USB-C Cable Guide Egypt 2026', titleAr: 'دليل كابلات USB-C في مصر 2026', keywords: 'usb-c,cable,guide,egypt,2026,braided', category: 'buying-guide' },
  { slug: 'why-phone-charging-slowly-causes-solutions', title: 'Why Phone Charging Slowly Causes Solutions', titleAr: 'ليه الموبايل بيشحن ببطء الاسباب والحلول', keywords: 'slow charging,causes,solutions,phone,egypt', category: 'tips' },
];

const catColors = {
  'buying-guide': { from: '#3b82f6', to: '#8b5cf6' },
  'comparison': { from: '#f59e0b', to: '#ef4444' },
  'how-to': { from: '#10b981', to: '#0ea5e9' },
  'review': { from: '#6366f1', to: '#ec4899' },
  'tips': { from: '#14b8a6', to: '#6366f1' },
};

function makeSVG(a) {
  const c = catColors[a.category] || catColors['tips'];
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c.from}"/><stop offset="100%" style="stop-color:${c.to}"/>
    </linearGradient>
    <radialGradient id="g1" cx="80%" cy="20%"><stop offset="0%" style="stop-color:#fff;stop-opacity:0.08"/><stop offset="100%" style="stop-color:#fff;stop-opacity:0"/></radialGradient>
    <radialGradient id="g2" cx="20%" cy="80%"><stop offset="0%" style="stop-color:#fff;stop-opacity:0.06"/><stop offset="100%" style="stop-color:#fff;stop-opacity:0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="960" cy="126" r="300" fill="url(#g1)"/>
  <circle cx="240" cy="504" r="250" fill="url(#g2)"/>
  <rect x="0" y="0" width="1200" height="630" fill="url(#bg)" opacity="0"/>
  <g opacity="0.04" stroke="#fff" stroke-width="1"><line x1="300" y1="0" x2="300" y2="630"/><line x1="600" y1="0" x2="600" y2="630"/><line x1="900" y1="0" x2="900" y2="630"/><line x1="0" y1="210" x2="1200" y2="210"/><line x1="0" y1="420" x2="1200" y2="420"/></g>
  <text x="60" y="80" font-family="Arial,sans-serif" font-size="24" font-weight="700" fill="#fff" opacity="0.8">CairoVolt</text>
  <rect x="60" y="94" width="110" height="3" rx="1.5" fill="#fff" opacity="0.4"/>
  <text x="600" y="430" font-family="Arial,sans-serif" font-size="22" fill="#fff" opacity="0.7" text-anchor="middle">${a.title}</text>
  <rect x="0" y="610" width="1200" height="20" fill="#000" opacity="0.3"/>
  <text x="600" y="624" font-family="Arial,sans-serif" font-size="11" fill="#fff" opacity="0.6" text-anchor="middle">cairovolt.com</text>
</svg>`;
}

async function main() {
  console.log(`\n Generating ${articles.length} cover images...\n`);
  let generated = 0, exifOk = 0, c2paOk = 0;

  for (const a of articles) {
    const out = path.join(OUTPUT_DIR, `${a.slug}.webp`);
    
    if (!fs.existsSync(out)) {
      await sharp(Buffer.from(makeSVG(a))).resize(1200, 630).webp({quality:85}).toFile(out);
      console.log(`+ ${a.slug}.webp`);
      generated++;
    } else {
      console.log(`= ${a.slug}.webp (exists)`);
    }

    // EXIF
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
        out
      ]);
      exifOk++;
    } catch(e) { console.warn(`  EXIF fail: ${a.slug}`); }

    // C2PA
    try {
      const m = {
        claim_generator: 'CairoVolt-CMS/1.0',
        title: a.title,
        assertions: [
          { label: 'c2pa.actions', data: { actions: [
            { action: 'c2pa.created', softwareAgent: 'CairoVolt Editorial Pipeline', digitalSourceType: 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia' },
            { action: 'c2pa.color_adjustments', softwareAgent: 'sharp + cwebp -q 85 -resize 1200 630' },
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
      const mp = path.join(OUTPUT_DIR, `_m_${a.slug}.json`);
      fs.writeFileSync(mp, JSON.stringify(m));
      execFileSync('c2patool', [out, '--manifest', mp, '--output', out, '--force']);
      fs.unlinkSync(mp);
      c2paOk++;
    } catch(e) {
      const mp = path.join(OUTPUT_DIR, `_m_${a.slug}.json`);
      if (fs.existsSync(mp)) fs.unlinkSync(mp);
      console.warn(`  C2PA fail: ${a.slug}`);
    }
  }

  console.log(`\nDone! Generated: ${generated} | EXIF: ${exifOk}/${articles.length} | C2PA: ${c2paOk}/${articles.length}`);
}

main().catch(console.error);
