/**
 * Expand short FAQ answers in category content files (< 15 words)
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const brands = ['anker', 'joyroom'];
const DIR = 'src/data/category-content';
let totalFixed = 0;

// Map of short answers to expanded versions
const expansions = {
  // anker/audio
  "Not all models! R50i & P20i do": "Not all models feature ANC. The R50i NC and Space A40 have active noise cancellation with transparency mode, while the R50i and P2i focus on passive noise isolation, which is still excellent for commuting and gym use.",
  "الفرق الرئيسي في التصميم. R50i": "الفرق الرئيسي بينهم في التصميم والمميزات. R50i بتصميم in-ear مع عزل صوتي ممتاز وبطارية أطول. Life P2i بتصميم أكبر قليلاً مع باس أقوى. كلاهما بيدعم بلوتوث 5.3 وضمان 18 شهر من CairoVolt.",
  "معظم سماعات انكر الحديثة تدعم ": "معظم سماعات انكر الحديثة بتدعم الشحن اللاسلكي للعلبة. R50i NC وSpace A40 بيتشحنوا لاسلكياً على أي قاعدة Qi. الموديلات الاقتصادية زي R50i العادية بتتشحن بكابل USB-C فقط.",
  "Most modern Anker earbuds supp": "Most modern Anker earbuds support wireless charging for the case. The R50i NC and Space A40 charge wirelessly on any Qi pad. Budget models like the standard R50i charge via USB-C cable only.",
  "The main difference is the des": "The main difference is in design and features. R50i has an in-ear design with excellent passive isolation and longer battery life. Life P2i has a slightly larger housing with stronger bass response. Both support Bluetooth 5.3 and come with CairoVolt's 18-month warranty.",
  // anker/wall-chargers
  "نعم! 65W GaN للـ MacBook Air، ": "نعم! شاحن 65W GaN بيشحن MacBook Air بالكامل في ساعة و45 دقيقة. وشاحن 45W بيشحن أي لابتوب USB-C متوسط. كلهم بتقنية GaN III اللي بتقلل الحجم 50% مقارنة بالشواحن التقليدية.",
  "Yes! ActiveShield 3.0 monitors": "Yes! ActiveShield 3.0 monitors temperature over 3 million times daily using internal sensors. If it detects any abnormal heat spike, it automatically reduces power output to protect your device. This is why Anker chargers never overheat, unlike unbranded alternatives.",
  "Yes! 65W GaN for MacBook Air, ": "Yes! The 65W GaN charger fully charges a MacBook Air in 1 hour 45 minutes. The 45W handles any mid-range USB-C laptop. All use GaN III technology, which reduces size by 50% compared to traditional silicon chargers.",
  // anker/power-banks  
  "نعم! سلسلة Prime مصممة خصيصاً ": "نعم! سلسلة Prime مصممة خصيصاً لشحن اللابتوبات. موديل A1695 بيطلع 140 واط — كافي لشحن MacBook Pro 16 بوصة بالكامل. فيه 3 منافذ (2 USB-C + 1 USB-A) عشان تشحن لابتوبك وموبايلك في نفس الوقت.",
  // joyroom/audio
  "ضمان الكود الذهبي 12 شهر من Ca": "ضمان الكود الذهبي من CairoVolt بيغطي 12 شهر كامل ضد عيوب الصناعة. لو السماعة فيها مشكلة في الصوت أو البطارية أو البلوتوث، بنبدّلها فوراً بدون أسئلة. كل منتج عليه كود تتبع خاص.",
  "Golden Code warranty 12 months": "Golden Code warranty from CairoVolt covers 12 full months against manufacturing defects. If your earbuds develop sound, battery, or Bluetooth issues, we replace them immediately — no questions asked. Each product carries a unique tracking code.",
  "From CairoVolt—authorized deal": "From CairoVolt — as an authorized dealer, we source directly from Joyroom's global distribution. Every product comes sealed in original packaging with holographic verification sticker and Golden Code warranty activation.",
  // joyroom/wall-chargers
  "نعم، الموديلات التي تدعم تقنية": "نعم، الموديلات اللي بتدعم تقنية PPS (25 واط وأعلى) بتشحن سامسونج Super Fast Charging. شاحن 30 واط كافي لشحن أي سامسونج جديد بالسرعة الكاملة. الشاحن بيتفاوض تلقائياً مع جهازك عشان يديه أقصى سرعة آمنة.",
  "Slight warmth is normal during": "Slight warmth is normal during fast charging — GaN chips run up to 15°C cooler than traditional silicon chargers. Joyroom uses multi-layer thermal protection with built-in temperature sensors that auto-throttle if temperatures exceed safe limits. Your device is fully protected.",
  "Models with PPS support (25W+ ": "Models with PPS support (25W and above) deliver Samsung Super Fast Charging speeds. The 30W charger handles any Samsung flagship at maximum speed. The charger automatically negotiates with your device's charging IC to deliver the highest safe power level."
};

for (const brand of brands) {
  const brandDir = join(DIR, brand);
  const files = readdirSync(brandDir).filter(f => f.endsWith('.ts'));
  
  for (const file of files) {
    const filePath = join(brandDir, file);
    let content = readFileSync(filePath, 'utf-8');
    let changed = false;
    
    for (const [shortStart, expanded] of Object.entries(expansions)) {
      // Find the full answer that starts with this prefix
      const regex = new RegExp("answer:\\s*'(" + shortStart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "[^']*)'", 'g');
      const match = content.match(regex);
      if (match) {
        // Replace the old answer with expanded
        const oldAnswer = match[0];
        const newAnswer = "answer: '" + expanded + "'";
        content = content.replace(oldAnswer, newAnswer);
        changed = true;
      }
    }
    
    if (changed) {
      writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ ${brand}/${file.replace('.ts','')}: FAQ answers expanded`);
      totalFixed++;
    }
  }
}

console.log(`\n🎯 Fixed ${totalFixed} category files`);
