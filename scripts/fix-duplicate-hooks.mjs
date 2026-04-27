/**
 * Fix duplicate opening hooks in product descriptions
 * Each product gets a unique hook based on its specific value proposition
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DIR = 'src/data/products';

// Map: generic hook → product-specific unique hooks
const hookFixes = {
  // Cable group: "Unlike cheap cables that throttle at 5W and die within weeks"
  'joyroom-type-c-lightning-braided': {
    old: 'Unlike cheap cables that throttle at 5W and die within weeks, ',
    new: 'Unlike PVC cables that crack after 2 months of Egyptian summer heat, '
  },
  'joyroom-usb-c-lightning-cable': {
    old: 'Unlike cheap cables that throttle at 5W and die within weeks, ',
    new: 'Unlike marketplace cables with fake PD labels that max out at 10W, '
  },
  'joyroom-usb-a-lightning-cable': {
    old: 'Unlike cheap cables that throttle at 5W and die within weeks, ',
    new: 'Unlike Lightning cables that stop working after an iOS update, '
  },
  'joyroom-usb-a-lightning-1.2m': {
    old: 'Unlike cheap cables that throttle at 5W and die within weeks, ',
    new: 'Unlike short 0.5m cables that barely reach from outlet to your bed, '
  },
  'joyroom-usb-a-type-c-cable': {
    old: 'Unlike buying an expensive new charger, got',
    new: 'Unlike the hassle of buying a brand-new charger brick, got'
  },
  'joyroom-usb-a-type-c-1.2m': {
    old: 'Unlike cheap cables that throttle at 5W and die within weeks, ',
    new: 'Unlike 1-meter cables that leave you tethered to the wall, '
  },
  'joyroom-usb-a-micro-cable': {
    old: 'Unlike cheap cables that throttle at 5W and die within weeks, ',
    new: 'Unlike fragile Micro-USB cables that bend and snap at the connector, '
  },
  'joyroom-type-c-to-type-c-cable': {
    old: 'Unlike cheap cables that throttle at 5W and die within weeks, ',
    new: 'Unlike generic USB-C cables that claim 60W but deliver 15W under load, '
  },
  'joyroom-usb-c-cable-60w': {
    old: 'Unlike cheap cables that throttle at 5W and die within weeks, ',
    new: 'Unlike thin cables that overheat at 30W and throttle your device, '
  },
  'joyroom-30w-pd-cable': {
    old: 'Unlike cheap cables that throttle at 5W and die within weeks, ',
    new: "Unlike non-PD cables that ignore your phone's fast-charge protocol, "
  },
  'anker-a8050-usb-c-cable': {
    old: 'Unlike cheap cables that throttle at 5W and die within weeks, ',
    new: 'Unlike cables that max out at 60W, the '
  },
  'anker-powerline-usb-c-lightning': {
    old: 'Unlike cheap cables that throttle at 5W and die within weeks, ',
    new: 'Unlike generic Lightning cables that lack Apple MFi chip protection, '
  },
  
  // Power bank group: "Unlike budget power banks with inflated capacity claims"
  'anker-powercore-20000': {
    old: 'Unlike budget power banks with inflated capacity claims, ',
    new: 'Unlike no-name power banks that claim 20000mAh but deliver half, '
  },
  'anker-zolo-a110d-10000': {
    old: 'Unlike budget power banks with inflated capacity claims, ',
    new: 'Unlike bulky 10000mAh banks that weigh 400g+, '
  },
  'anker-zolo-a110e-20000': {
    old: 'Unlike budget power banks with inflated capacity claims, ',
    new: 'Unlike power banks that take 12 hours to recharge themselves, '
  },
  'anker-zolo-a1681-20000': {
    old: 'Unlike budget power banks with inflated capacity claims, ',
    new: 'Unlike entry-level power banks with single USB-A output, '
  },
  'anker-powercore-10000': {
    old: 'Unlike budget power banks with inflated capacity claims, ',
    new: 'Unlike pocket power banks that overheat during summer use, '
  },
  
  // Charger group: "Unlike unbranded chargers that overheat"
  'anker-a2732-charger-35w': {
    old: 'Unlike unbranded chargers that overheat and damage your battery, ',
    new: 'Unlike single-port chargers that force you to choose which device to charge first, '
  },
  'anker-a2741-charger-30w': {
    old: 'Unlike unbranded car chargers that flicker during voltage drops, ',
    new: "Unlike car chargers that lose connection on Cairo's speed bumps, "
  },
  'anker-powerport-20w': {
    old: 'Unlike unbranded chargers that overheat and damage your battery, ',
    new: 'Unlike cheap USB-C chargers that claim 20W but deliver 12W in testing, '
  },
  'anker-powerport-25w': {
    old: 'Unlike unbranded chargers that overheat and damage your battery, ',
    new: "Unlike Samsung's bundled 15W charger, "
  },
  'joyroom-20w-usb-c-charger': {
    old: 'Unlike unbranded chargers that overheat and damage your battery, ',
    new: 'Unlike bulky old 5W Apple chargers that take 3 hours for a full charge, '
  },
  'joyroom-30w-fast-charger': {
    old: 'Unlike unbranded chargers that overheat and damage your battery, ',
    new: 'Unlike adapters that downgrade to 5V/1A after 10 minutes of charging, '
  },
  'joyroom-25w-fast-charger': {
    old: 'Unlike unbranded chargers that overheat and damage your battery, ',
    new: 'Unlike the charger your phone came without in the box, '
  },
  
  // Earbuds group: "Unlike cheap earbuds with tinny sound"
  'anker-soundcore-r50i': {
    old: 'Unlike cheap earbuds with tinny sound and 1-hour battery, ',
    new: 'Unlike earbuds that die during your gym session, '
  },
  'anker-soundcore-life-p2i': {
    old: 'Unlike cheap earbuds with tinny sound and 1-hour battery, ',
    new: "Unlike earbuds with bass so weak you cannot hear music on the metro, "
  }
};

let totalFixed = 0;

for (const [slug, fix] of Object.entries(hookFixes)) {
  const filePath = join(DIR, slug + '.ts');
  let content;
  try { content = readFileSync(filePath, 'utf-8'); } catch(e) { continue; }
  
  if (content.includes(fix.old)) {
    content = content.replace(fix.old, fix.new);
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${slug}: Unique hook applied`);
    totalFixed++;
  }
}

console.log(`\n🎯 Uniquified ${totalFixed} hooks`);
