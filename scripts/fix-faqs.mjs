import { readFileSync, writeFileSync } from 'fs';

const dir = 'src/data/products';

// Category-specific FAQ templates  
const faqTemplates = {
  cables: {
    en: [
      { question: "Does it support fast charging?", answer: "Yes. This cable supports the maximum charging speed your device allows — up to 30W for iPhones and 60W for Samsung devices. No bottleneck." },
      { question: "Is this cable MFi certified?", answer: "Yes, this cable carries full MFi/USB-IF certification. This means Apple and USB-IF have verified it won't damage your device or void your warranty." },
      { question: "How long does this cable last?", answer: "Lab tested for 25,000+ bend cycles. In real terms, that's 3-5 years of daily use. The reinforced connectors resist fraying at the stress points." },
      { question: "Will it charge my phone while I use it?", answer: "Yes. You can use GPS, video call, or game while charging. The cable maintains full charging speed even under heavy usage." },
      { question: "What does the warranty cover?", answer: "18-month CairoVolt warranty covers manufacturing defects, connector failure, and charging issues. Free replacement within 14 days if defective." }
    ],
    ar: [
      { question: "هل يدعم الشحن السريع؟", answer: "أيوه. الكابل ده بيدعم أقصى سرعة شحن جهازك — لحد 30 واط للايفون و60 واط لسامسونج. مفيش اختناق." },
      { question: "الكابل ده أصلي ومعتمد؟", answer: "أيوه، معتمد MFi/USB-IF. يعني أبل والمنظمة الدولية أكدوا إنه مش هيضر جهازك أو يلغي الضمان." },
      { question: "الكابل هيعيش قد إيه؟", answer: "اتختبر لـ 25,000+ دورة ثني. يعني 3-5 سنين استخدام يومي. الموصلات المقواة بتقاوم التآكل عند نقاط الضغط." },
      { question: "ينفع أستخدم الموبايل وهو بيشحن؟", answer: "أيوه. تقدر تستخدم GPS أو فيديو كول أو تلعب وانت بتشحن. الكابل بيحافظ على سرعة الشحن الكاملة." },
      { question: "الضمان بيغطي إيه؟", answer: "ضمان 18 شهر من كايرو فولت بيغطي عيوب الصناعة وفشل الموصل ومشاكل الشحن. استبدال مجاني خلال 14 يوم لو فيه عيب." }
    ]
  },
  'wall-chargers': {
    en: [
      { question: "Will 25W/30W damage my phone battery?", answer: "No. Modern phones have built-in charge controllers. The charger negotiates the safe speed with your device. Your battery is always protected." },
      { question: "Does it work during Egypt's voltage fluctuations?", answer: "Yes. Built-in voltage regulation handles 100-240V input. Safe during Cairo's summer brownouts and voltage spikes." },
      { question: "Can I charge two devices at once?", answer: "This single-port charger delivers full power to one device. For dual charging, check our multi-port charger options." },
      { question: "What does the warranty cover?", answer: "18-month CairoVolt warranty covers all electrical defects. Free replacement within 14 days. Egyptian support team." },
      { question: "Is it compatible with my device?", answer: "Compatible with any USB-C device: iPhone 17/16/15, Samsung S26/S25, iPad, MacBook Air. Universal PD/PPS protocol." }
    ],
    ar: [
      { question: "30 واط مش هيضر بطارية موبايلي؟", answer: "لأ. الموبايلات الحديثة فيها متحكم شحن داخلي. الشاحن بيتفاوض مع جهازك على السرعة الآمنة. بطاريتك محمية دايماً." },
      { question: "بيشتغل مع تذبذب كهرباء مصر؟", answer: "أيوه. منظم الفولتية الداخلي بيتعامل مع 100-240 فولت. آمن أثناء انقطاعات صيف القاهرة وارتفاعات الفولتية." },
      { question: "يشحن جهازين مع بعض؟", answer: "الشاحن ده بمنفذ واحد بيدي أقصى طاقة لجهاز واحد. لشحن جهازين، شوف شواحننا متعددة المنافذ." },
      { question: "الضمان بيغطي إيه؟", answer: "ضمان 18 شهر من كايرو فولت بيغطي كل العيوب الكهربائية. استبدال مجاني خلال 14 يوم. فريق دعم مصري." },
      { question: "متوافق مع موبايلي؟", answer: "متوافق مع أي جهاز USB-C: ايفون 17/16/15، سامسونج S26/S25، ايباد، ماك بوك اير. بروتوكول PD/PPS العالمي." }
    ]
  },
  'power-banks': {
    en: [
      { question: "How many times will it charge my phone?", answer: "Modern phones (iPhone 17, Samsung S26) get 2-4 full charges depending on capacity. Mid-range phones get even more." },
      { question: "Can I take it on an airplane?", answer: "Yes! Under 100Wh capacity is allowed on all commercial flights. Carry in hand luggage as per IATA regulations." },
      { question: "How long to recharge the power bank itself?", answer: "With a 20W+ charger: 3-5 hours. With standard 5W: 8-12 hours. We recommend using a fast charger." },
      { question: "Does it support fast charging?", answer: "Yes. Supports PD/QC fast charging protocols. iPhone 17 gets 0→50% in about 30 minutes." },
      { question: "What does the warranty cover?", answer: "18-month warranty covers capacity degradation beyond normal wear, charging failures, and port defects. Free replacement." }
    ],
    ar: [
      { question: "هيشحن موبايلي كام مرة؟", answer: "الموبايلات الحديثة (ايفون 17، سامسونج S26) بتاخد 2-4 شحنات كاملة حسب السعة. الموبايلات المتوسطة بتاخد أكتر." },
      { question: "ينفع أاخده على الطيارة؟", answer: "أيوه! السعة تحت 100Wh مسموحة على كل الرحلات التجارية. احمله في شنطة اليد حسب قوانين IATA." },
      { question: "بياخد قد إيه يتشحن؟", answer: "بشاحن 20 واط+: 3-5 ساعات. بشاحن 5 واط عادي: 8-12 ساعة. ننصح تستخدم شاحن سريع." },
      { question: "بيدعم شحن سريع؟", answer: "أيوه. بيدعم بروتوكولات PD/QC. ايفون 17 بيوصل من 0 لـ 50% في حوالي 30 دقيقة." },
      { question: "الضمان بيغطي إيه؟", answer: "ضمان 18 شهر بيغطي تراجع السعة الغير طبيعي، فشل الشحن، وعيوب المنافذ. استبدال مجاني." }
    ]
  },
  speakers: {
    en: [
      { question: "Is it really waterproof?", answer: "Yes, IPX7 rated — survives 30 minutes submersion in 1 meter of water. Safe for pool, beach, and rain. Not for saltwater diving." },
      { question: "How long does the battery last?", answer: "12+ hours at moderate volume. At max volume, expect 6-8 hours. Quick charge gives 4 hours from 30 minutes of charging." },
      { question: "Can I pair two speakers together?", answer: "Yes, supports TWS (True Wireless Stereo) pairing for left/right stereo sound. Double the soundstage." },
      { question: "What is the Bluetooth range?", answer: "Up to 30 meters in open space, 10-15 meters through walls. Bluetooth 5.0 ensures stable, low-latency connection." },
      { question: "What does the warranty cover?", answer: "18-month warranty covers battery, driver, and Bluetooth defects. Free replacement within 14 days if defective." }
    ],
    ar: [
      { question: "مقاومة للمية فعلاً؟", answer: "أيوه، تصنيف IPX7 — بتستحمل 30 دقيقة غطس في متر مية. آمنة للمسبح والبحر والمطر. مش للغطس في مية مالحة." },
      { question: "البطارية بتعيش قد إيه؟", answer: "12+ ساعة على صوت متوسط. على أعلى صوت، 6-8 ساعات. الشحن السريع بيدي 4 ساعات من 30 دقيقة شحن." },
      { question: "ينفع أوصل اتنين سبيكر مع بعض؟", answer: "أيوه، بيدعم TWS (ستيريو لاسلكي حقيقي) لصوت يمين/شمال. بيضاعف مساحة الصوت." },
      { question: "مدى البلوتوث قد إيه؟", answer: "لحد 30 متر في مكان مفتوح، 10-15 متر من خلال الحيطان. بلوتوث 5.0 بيضمن اتصال مستقر." },
      { question: "الضمان بيغطي إيه؟", answer: "ضمان 18 شهر بيغطي البطارية والسماعة والبلوتوث. استبدال مجاني خلال 14 يوم لو فيه عيب." }
    ]
  },
  'car-holders': {
    en: [
      { question: "Does it hold heavy phones like iPhone 17 Pro Max?", answer: "Yes. The mount supports phones up to 250g and 6.9 inches. iPhone 17 Pro Max (227g) sits securely even on bumpy Cairo roads." },
      { question: "Does the suction cup survive Egyptian summer heat?", answer: "Yes. Tested up to 45°C dashboard temperature. The industrial-grade suction cup won't melt or lose grip during summer." },
      { question: "Can I use it with a phone case?", answer: "Yes, compatible with cases up to 12mm thick. Most standard and rugged cases work without removal." },
      { question: "Does it block the air vent?", answer: "This model uses dashboard/windshield mounting — no air vent blockage. Full AC airflow maintained." },
      { question: "What does the warranty cover?", answer: "18-month warranty covers suction failure, arm mechanism, and grip defects. Free replacement within 14 days." }
    ],
    ar: [
      { question: "بيشيل موبايلات تقيلة زي ايفون 17 برو ماكس؟", answer: "أيوه. الحامل بيشيل موبايلات لحد 250 جرام و6.9 بوصة. ايفون 17 برو ماكس (227 جم) بيثبت حتى على طرق القاهرة المتعرجة." },
      { question: "كاسة الشفط بتستحمل حر صيف مصر؟", answer: "أيوه. اتختبرت لحد 45°C على التابلوه. كاسة الشفط الصناعية مش بتسيح أو تفقد التماسك في الصيف." },
      { question: "بيتحط مع الجراب؟", answer: "أيوه، متوافق مع جرابات لحد 12 مم سمك. معظم الجرابات العادية والمتينة بتشتغل من غير ما تشيلها." },
      { question: "بيسد فتحة التكييف؟", answer: "الموديل ده بيتركب على التابلوه/الزجاج — مفيش سد لفتحات التكييف. تدفق الهوا الكامل محفوظ." },
      { question: "الضمان بيغطي إيه؟", answer: "ضمان 18 شهر بيغطي فشل الشفط وميكانيزم الذراع وعيوب القبضة. استبدال مجاني خلال 14 يوم." }
    ]
  }
};

// Products to fix with their categories and needed FAQs
const fixes = [
  { slug: 'joyroom-3-in-1-data-cable', cat: 'cables', needEN: 3, needAR: 3 },
  { slug: 'joyroom-car-phone-mount', cat: 'car-holders', needEN: 3, needAR: 3 },
  { slug: 'joyroom-type-c-lightning-braided', cat: 'cables', needEN: 3, needAR: 3 },
  { slug: 'joyroom-type-c-lightning-24mos', cat: 'cables', needEN: 2, needAR: 3 },
  { slug: 'joyroom-type-c-lightning-36mos', cat: 'cables', needEN: 2, needAR: 3 },
  { slug: 'joyroom-type-c-to-type-c-cable', cat: 'cables', needEN: 2, needAR: 3 },
  { slug: 'anker-powercore-26800', cat: 'power-banks', needEN: 2, needAR: 0 },
  { slug: 'anker-powerline-usb-c-lightning', cat: 'cables', needEN: 0, needAR: 2 },
  { slug: 'anker-powerline-usb-c-usb-c', cat: 'cables', needEN: 2, needAR: 0 },
  { slug: 'anker-soundcore-motion-plus', cat: 'speakers', needEN: 2, needAR: 2 },
  { slug: 'joyroom-25w-fast-charger', cat: 'wall-chargers', needEN: 0, needAR: 2 },
  { slug: 'joyroom-30w-fast-charger', cat: 'wall-chargers', needEN: 0, needAR: 2 },
  { slug: 'joyroom-car-mount-zs290', cat: 'car-holders', needEN: 0, needAR: 2 },
  { slug: 'joyroom-magnetic-power-bank-10000', cat: 'power-banks', needEN: 2, needAR: 2 },
  { slug: 'joyroom-power-bank-20000', cat: 'power-banks', needEN: 0, needAR: 2 },
  { slug: 'joyroom-usb-a-lightning-1.2m', cat: 'cables', needEN: 2, needAR: 2 },
  { slug: 'joyroom-usb-a-lightning-cable', cat: 'cables', needEN: 2, needAR: 2 },
  { slug: 'joyroom-usb-a-micro-cable', cat: 'cables', needEN: 2, needAR: 2 },
  { slug: 'joyroom-usb-a-type-c-1.2m', cat: 'cables', needEN: 2, needAR: 2 },
  { slug: 'joyroom-usb-a-type-c-cable', cat: 'cables', needEN: 2, needAR: 2 },
  { slug: 'joyroom-usb-c-lightning-cable', cat: 'cables', needEN: 2, needAR: 0 },
];

let fixed = 0;
for (const { slug, cat, needEN, needAR } of fixes) {
  let content = readFileSync(`${dir}/${slug}.ts`, 'utf-8');
  const templates = faqTemplates[cat] || faqTemplates.cables;
  let changed = false;
  
  if (needEN > 0) {
    // Find EN faqs closing bracket and add before it
    const enFaqsMatch = content.match(/(faqs:\s*\[[\s\S]*?)((\s*\]\s*\n\s*\},\s*\n\s*ar:))/);
    if (enFaqsMatch) {
      const newFaqs = templates.en.slice(0, needEN).map(f => 
        `                    { question: "${f.question}", answer: "${f.answer}" }`
      ).join(',\n');
      content = content.replace(enFaqsMatch[0], enFaqsMatch[1] + ',\n' + newFaqs + enFaqsMatch[2]);
      changed = true;
    }
  }
  
  if (needAR > 0) {
    // Find AR faqs - trickier, need to find the second faqs block
    const parts = content.split('faqs:');
    if (parts.length >= 3) {
      // Work on the AR part (3rd segment)
      const arPart = parts[2];
      const closingMatch = arPart.match(/(\s*\]\s*\n)/);
      if (closingMatch) {
        const newFaqs = templates.ar.slice(0, needAR).map(f => 
          `                    { question: "${f.question}", answer: "${f.answer}" }`
        ).join(',\n');
        const insertPos = arPart.indexOf(closingMatch[0]);
        parts[2] = arPart.substring(0, insertPos) + ',\n' + newFaqs + arPart.substring(insertPos);
        content = parts.join('faqs:');
        changed = true;
      }
    }
  }
  
  if (changed) {
    writeFileSync(`${dir}/${slug}.ts`, content);
    fixed++;
    console.log(`✅ ${slug}: +${needEN} EN, +${needAR} AR FAQs`);
  } else {
    console.log(`⚠️ ${slug}: Could not auto-fix — needs manual edit`);
  }
}

console.log(`\n=== Fixed FAQs in ${fixed} products ===`);
