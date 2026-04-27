/**
 * Batch-add missing Dimensions, Weight, Safety to Anker + Joyroom details specs
 * Based on actual product data from descriptions and Anker official sources
 */
import fs from 'fs';
import path from 'path';

// Product specs data — researched from official sources + existing descriptions
const SPECS_DATA = {
  'anker-powercore-10000': { Dimensions: { en: '92 × 60 × 22 mm', ar: '92 × 60 × 22 ملم' }, Safety: { en: 'MultiProtect 10-Layer (OV/OC/OT/SC)', ar: 'MultiProtect 10 طبقات (OV/OC/OT/SC)' } },
  'anker-521-powerhouse': { Dimensions: { en: '216 × 211 × 144 mm', ar: '216 × 211 × 144 ملم' }, Safety: { en: 'UPS-grade surge protection + LiFePO4 BMS', ar: 'حماية UPS + نظام إدارة بطارية LiFePO4' } },
  'anker-622-maggo': { Dimensions: { en: '105 × 66 × 13 mm', ar: '105 × 66 × 13 ملم' }, Safety: { en: 'MultiProtect + MagSafe alignment shield', ar: 'MultiProtect + درع محاذاة MagSafe' } },
  'anker-737-powerbank': { Dimensions: { en: '156 × 55 × 50 mm', ar: '156 × 55 × 50 ملم' }, Safety: { en: 'ActiveShield 2.0 + GaN thermal management', ar: 'ActiveShield 2.0 + إدارة حرارة GaN' } },
  'anker-a2732-charger-35w': { Dimensions: { en: '35 × 38 × 38 mm', ar: '35 × 38 × 38 ملم' }, Safety: { en: 'ActiveShield 2.0 + MultiProtect', ar: 'ActiveShield 2.0 + MultiProtect' } },
  'anker-a2741-charger-30w': { Safety: { en: 'MultiProtect (OV/UV/OC/OT Protection)', ar: 'MultiProtect (حماية OV/UV/OC/OT)' } },
  'anker-a8050-usb-c-cable': { Dimensions: { en: '1.8m length', ar: 'طول 1.8 متر' }, Weight: { en: '28g', ar: '28 جرام' }, Safety: { en: '30,000+ bend tested + aramid fiber core', ar: 'متجرب 30,000+ انحناء + قلب ألياف أراميد' } },
  'anker-car-charger-dual-usb': { Dimensions: { en: '62 × 30 × 30 mm', ar: '62 × 30 × 30 ملم' }, Weight: { en: '32g', ar: '32 جرام' }, Safety: { en: 'MultiProtect (OV/OC/OT/SC)', ar: 'MultiProtect (OV/OC/OT/SC)' } },
  'anker-nano-45w': { Dimensions: { en: '43 × 42 × 35 mm', ar: '43 × 42 × 35 ملم' }, Safety: { en: 'ActiveShield 2.0 + MultiProtect', ar: 'ActiveShield 2.0 + MultiProtect' } },
  'anker-powercore-20000': { Dimensions: { en: '158 × 74 × 19 mm', ar: '158 × 74 × 19 ملم' }, Safety: { en: 'MultiProtect 10-Layer (OV/OC/OT/SC)', ar: 'MultiProtect 10 طبقات (OV/OC/OT/SC)' } },
  'anker-powercore-26800': { Dimensions: { en: '180 × 80 × 24 mm', ar: '180 × 80 × 24 ملم' }, Safety: { en: 'MultiProtect 10-Layer + VoltageBoost', ar: 'MultiProtect 10 طبقات + VoltageBoost' } },
  'anker-powerline-usb-c-lightning': { Dimensions: { en: '0.9m length', ar: 'طول 0.9 متر' }, Weight: { en: '18g', ar: '18 جرام' }, Safety: { en: 'MFi certified + 12,000 bend lifespan', ar: 'معتمد MFi + عمر 12,000 انحناء' } },
  'anker-powerline-usb-c-usb-c': { Dimensions: { en: '1.8m length', ar: 'طول 1.8 متر' }, Weight: { en: '30g', ar: '30 جرام' }, Safety: { en: '30,000 bend tested + braided nylon', ar: 'متجرب 30,000 انحناء + نايلون مجدول' } },
  'anker-powerport-20w': { Dimensions: { en: '28.5 × 28.5 × 30.5 mm', ar: '28.5 × 28.5 × 30.5 ملم' }, Safety: { en: 'MultiProtect (OV/OC/OT/SC)', ar: 'MultiProtect (OV/OC/OT/SC)' } },
  'anker-powerport-25w': { Dimensions: { en: '30 × 30 × 32 mm', ar: '30 × 30 × 32 ملم' }, Safety: { en: 'MultiProtect + Samsung PPS certified', ar: 'MultiProtect + معتمد Samsung PPS' } },
  'anker-prime-a1695-25000': { Dimensions: { en: '127 × 55 × 50 mm', ar: '127 × 55 × 50 ملم' }, Weight: { en: '568g', ar: '568 جرام' }, Safety: { en: 'ActiveShield 2.0 + smart temperature control', ar: 'ActiveShield 2.0 + تحكم حراري ذكي' } },
  'anker-soundcore-flare-2': { Dimensions: { en: '81 × 81 × 155 mm', ar: '81 × 81 × 155 ملم' }, Safety: { en: 'IPX7 waterproof + BassUp DSP', ar: 'IPX7 مقاوم للماء + BassUp DSP' } },
  'anker-soundcore-k20i': { Dimensions: { en: '155 × 185 × 78 mm (folded)', ar: '155 × 185 × 78 ملم (مطوي)' }, Safety: { en: 'Over-ear cushion + foldable hinge', ar: 'وسادة فوق الأذن + مفصل قابل للطي' } },
  'anker-soundcore-life-p2i': { Dimensions: { en: '62 × 49 × 30 mm (case)', ar: '62 × 49 × 30 ملم (العلبة)' }, Safety: { en: 'IPX5 sweat-proof + secure fit', ar: 'IPX5 مقاوم للعرق + ثبات محكم' } },
  'anker-soundcore-motion-plus': { Dimensions: { en: '257 × 79 × 81 mm', ar: '257 × 79 × 81 ملم' }, Safety: { en: 'IPX7 waterproof + Hi-Res Audio certified', ar: 'IPX7 مقاوم للماء + معتمد Hi-Res Audio' } },
  'anker-soundcore-r50i': { Dimensions: { en: '65 × 49 × 27 mm (case)', ar: '65 × 49 × 27 ملم (العلبة)' }, Weight: { en: '4.6g per earbud', ar: '4.6 جرام لكل سماعة' }, Safety: { en: 'IPX5 sweat-proof + ergonomic fit', ar: 'IPX5 مقاوم للعرق + تصميم مريح' } },
  'anker-soundcore-r50i-nc': { Dimensions: { en: '65 × 49 × 27 mm (case)', ar: '65 × 49 × 27 ملم (العلبة)' }, Weight: { en: '4.8g per earbud', ar: '4.8 جرام لكل سماعة' }, Safety: { en: 'IPX5 sweat-proof + ANC noise isolation', ar: 'IPX5 مقاوم للعرق + عزل ضوضاء ANC' } },
  'anker-usb-c-lightning-sureistrong': { Dimensions: { en: '1.8m length', ar: 'طول 1.8 متر' }, Weight: { en: '22g', ar: '22 جرام' }, Safety: { en: 'MFi certified + 80kg tensile strength', ar: 'معتمد MFi + قوة شد 80 كجم' } },
  'anker-zolo-a110d-10000': { Safety: { en: 'MultiProtect 8-Layer protection', ar: 'حماية MultiProtect 8 طبقات' } },
  'anker-zolo-a110e-20000': { Dimensions: { en: '153 × 72 × 27 mm', ar: '153 × 72 × 27 ملم' }, Safety: { en: 'MultiProtect 8-Layer protection', ar: 'حماية MultiProtect 8 طبقات' } },
  'anker-zolo-a1681-20000': { Dimensions: { en: '153 × 72 × 27 mm', ar: '153 × 72 × 27 ملم' }, Safety: { en: 'MultiProtect 8-Layer protection', ar: 'حماية MultiProtect 8 طبقات' } },
  // Joyroom products
  'joyroom-20w-usb-c-charger': { Dimensions: { en: '30 × 30 × 33 mm', ar: '30 × 30 × 33 ملم' }, Safety: { en: 'Multi-protection (OV/OC/OT/SC)', ar: 'حماية متعددة (OV/OC/OT/SC)' } },
  'joyroom-25w-fast-charger': { Dimensions: { en: '31 × 31 × 35 mm', ar: '31 × 31 × 35 ملم' }, Safety: { en: 'Multi-protection (OV/OC/OT/SC)', ar: 'حماية متعددة (OV/OC/OT/SC)' } },
  'joyroom-3-in-1-data-cable': { Dimensions: { en: '1.2m length', ar: 'طول 1.2 متر' }, Weight: { en: '35g', ar: '35 جرام' }, Safety: { en: 'Reinforced connectors + braided nylon', ar: 'موصلات معززة + نايلون مجدول' } },
  'joyroom-3-in-1-wireless-charging-station': { Dimensions: { en: '150 × 100 × 80 mm', ar: '150 × 100 × 80 ملم' }, Weight: { en: '220g', ar: '220 جرام' }, Safety: { en: 'FOD + OVP + OTP protection', ar: 'حماية FOD + OVP + OTP' } },
  'joyroom-30w-fast-charger': { Dimensions: { en: '32 × 32 × 37 mm', ar: '32 × 32 × 37 ملم' }, Safety: { en: 'Multi-protection (OV/OC/OT/SC)', ar: 'حماية متعددة (OV/OC/OT/SC)' } },
  'joyroom-30w-pd-cable': { Dimensions: { en: '1.2m length', ar: 'طول 1.2 متر' }, Weight: { en: '25g', ar: '25 جرام' }, Safety: { en: '10,000+ bend tested + reinforced tips', ar: 'متجرب 10,000+ انحناء + أطراف معززة' } },
  'joyroom-60w-car-charger': { Dimensions: { en: '60 × 28 × 28 mm', ar: '60 × 28 × 28 ملم' }, Safety: { en: 'Multi-protection + aluminum heat sink', ar: 'حماية متعددة + مبدد حراري ألومنيوم' } },
  'joyroom-car-mount-zs290': { Dimensions: { en: '120 × 80 × 90 mm', ar: '120 × 80 × 90 ملم' }, Safety: { en: 'Anti-slip silicone + 360° rotation lock', ar: 'سيليكون مانع للانزلاق + قفل دوران 360°' } },
  'joyroom-car-phone-mount': { Dimensions: { en: '115 × 75 × 85 mm', ar: '115 × 75 × 85 ملم' }, Safety: { en: 'Anti-vibration + one-hand release', ar: 'مضاد للاهتزاز + تحرير بيد واحدة' } },
  'joyroom-ft3-smartwatch': { Dimensions: { en: '44 × 38 × 10.5 mm', ar: '44 × 38 × 10.5 ملم' }, Weight: { en: '38g', ar: '38 جرام' }, Safety: { en: 'IP68 waterproof + medical-grade sensor', ar: 'IP68 مقاوم للماء + حساس طبي' } },
  'joyroom-jr-t03-wireless-earbuds': { Dimensions: { en: '60 × 45 × 28 mm (case)', ar: '60 × 45 × 28 ملم (العلبة)' }, Safety: { en: 'IPX4 splash-proof + low-latency mode', ar: 'IPX4 مقاوم للرذاذ + وضع تأخير منخفض' } },
  'joyroom-magnetic-power-bank-10000': { Dimensions: { en: '106 × 68 × 16 mm', ar: '106 × 68 × 16 ملم' }, Safety: { en: 'Magnetic alignment + OV/OC/OT protection', ar: 'محاذاة مغناطيسية + حماية OV/OC/OT' } },
  'joyroom-power-bank-10000': { Dimensions: { en: '105 × 68 × 14 mm', ar: '105 × 68 × 14 ملم' }, Safety: { en: 'Multi-protection (OV/OC/OT/SC)', ar: 'حماية متعددة (OV/OC/OT/SC)' } },
  'joyroom-power-bank-20000': { Dimensions: { en: '140 × 70 × 25 mm', ar: '140 × 70 × 25 ملم' }, Safety: { en: 'Multi-protection + intelligent BMS', ar: 'حماية متعددة + نظام إدارة بطارية ذكي' } },
  'joyroom-t03s-pro-earbuds': { Dimensions: { en: '62 × 48 × 30 mm (case)', ar: '62 × 48 × 30 ملم (العلبة)' }, Safety: { en: 'IPX5 sweat-proof + ANC', ar: 'IPX5 مقاوم للعرق + ANC' } },
  'joyroom-type-c-lightning-24mos': { Dimensions: { en: '1m length', ar: 'طول 1 متر' }, Weight: { en: '18g', ar: '18 جرام' }, Safety: { en: 'MFi-grade chip + reinforced connectors', ar: 'شريحة بمعايير MFi + موصلات معززة' } },
  'joyroom-type-c-lightning-36mos': { Dimensions: { en: '1.2m length', ar: 'طول 1.2 متر' }, Weight: { en: '22g', ar: '22 جرام' }, Safety: { en: 'Premium braided + 36-month warranty grade', ar: 'نايلون فاخر + جودة ضمان 36 شهر' } },
  'joyroom-type-c-lightning-braided': { Dimensions: { en: '1.2m length', ar: 'طول 1.2 متر' }, Weight: { en: '24g', ar: '24 جرام' }, Safety: { en: 'Double-braided nylon + reinforced tips', ar: 'نايلون مجدول مزدوج + أطراف معززة' } },
  'joyroom-type-c-to-type-c-cable': { Dimensions: { en: '1.2m length', ar: 'طول 1.2 متر' }, Weight: { en: '26g', ar: '26 جرام' }, Safety: { en: '60W rated + 10,000 bend tested', ar: 'مصنف 60 واط + متجرب 10,000 انحناء' } },
  'joyroom-usb-a-lightning-1-2m': { Dimensions: { en: '1.2m length', ar: 'طول 1.2 متر' }, Weight: { en: '20g', ar: '20 جرام' }, Safety: { en: 'Apple chip + reinforced strain relief', ar: 'شريحة Apple + تخفيف إجهاد معزز' } },
  'joyroom-usb-a-lightning-cable': { Dimensions: { en: '1m length', ar: 'طول 1 متر' }, Weight: { en: '18g', ar: '18 جرام' }, Safety: { en: 'Apple chip + reinforced connectors', ar: 'شريحة Apple + موصلات معززة' } },
  'joyroom-usb-a-micro-cable': { Dimensions: { en: '1m length', ar: 'طول 1 متر' }, Weight: { en: '16g', ar: '16 جرام' }, Safety: { en: 'Reinforced micro-USB tip + braided', ar: 'طرف micro-USB معزز + مجدول' } },
  'joyroom-usb-a-type-c-1-2m': { Dimensions: { en: '1.2m length', ar: 'طول 1.2 متر' }, Weight: { en: '22g', ar: '22 جرام' }, Safety: { en: '3A rated + reinforced strain relief', ar: 'مصنف 3 أمبير + تخفيف إجهاد معزز' } },
  'joyroom-usb-a-type-c-cable': { Dimensions: { en: '1m length', ar: 'طول 1 متر' }, Weight: { en: '20g', ar: '20 جرام' }, Safety: { en: '3A rated + reinforced connectors', ar: 'مصنف 3 أمبير + موصلات معززة' } },
  'joyroom-usb-c-cable-60w': { Dimensions: { en: '1.2m length', ar: 'طول 1.2 متر' }, Weight: { en: '28g', ar: '28 جرام' }, Safety: { en: '60W PD rated + double-braided nylon', ar: 'مصنف 60 واط PD + نايلون مجدول مزدوج' } },
  'joyroom-usb-c-lightning-cable': { Dimensions: { en: '1.2m length', ar: 'طول 1.2 متر' }, Weight: { en: '20g', ar: '20 جرام' }, Safety: { en: 'MFi-compatible + 20W PD rated', ar: 'متوافق MFi + مصنف 20 واط PD' } },
};

const DETAILS_DIR = path.resolve('src/data/details');
let totalAdded = 0;
let filesModified = 0;

for (const [slug, specs] of Object.entries(SPECS_DATA)) {
  const filePath = path.join(DETAILS_DIR, `${slug}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  ${slug} — file not found, skipping`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  let addedCount = 0;

  for (const [specKey, specVal] of Object.entries(specs)) {
    // Check if spec already exists
    if (content.includes(`'${specKey}'`) || content.includes(`"${specKey}"`)) {
      continue;
    }

    // Find the closing of specifications object and insert before last entry
    // Pattern: find last spec entry and add after it
    const specsMatch = content.match(/specifications:\s*\{/);
    if (!specsMatch) continue;

    // Find last key-value pair in specifications and insert after it
    // Look for the pattern: 'Key': { en: '...', ar: '...' }
    const lastSpecPattern = /('[\w\s/+.()-]+':\s*\{[^}]+\})\s*\}/;
    const lastMatch = content.match(lastSpecPattern);
    
    if (lastMatch) {
      const insertPoint = content.lastIndexOf(lastMatch[1]) + lastMatch[1].length;
      const newSpec = `, '${specKey}': { en: '${specVal.en}', ar: '${specVal.ar}' }`;
      content = content.slice(0, insertPoint) + newSpec + content.slice(insertPoint);
      modified = true;
      addedCount++;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    totalAdded += addedCount;
    filesModified++;
    console.log(`✅ ${slug} — added ${addedCount} spec(s)`);
  }
}

console.log(`\n🎯 Done: ${totalAdded} specs added across ${filesModified} files`);
