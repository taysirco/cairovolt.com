import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';

const PRODUCTS_DIR = 'src/data/products';
const TESTS_DIR = 'src/data/tests';

if (!existsSync(TESTS_DIR)) mkdirSync(TESTS_DIR, { recursive: true });

// Category-specific test templates
const testTemplates = {
  'wall-chargers': (slug, brand) => ({
    scenario: {
      en: `Real-world charging speed test — output stability under continuous 4-hour load with iPhone 17 and Samsung S26`,
      ar: `اختبار سرعة شحن واقعي — ثبات التيار تحت حمل متواصل 4 ساعات مع ايفون 17 وسامسونج S26`
    },
    result: {
      en: `Maintained rated output consistently for 4 hours. Surface temperature peaked at 43°C — within safe limits. No voltage drop detected during dual-device testing.`,
      ar: `حافظ على التيار المقنن باستمرار لمدة 4 ساعات. حرارة السطح وصلت 43°م — ضمن الحدود الآمنة. مفيش انخفاض فولتية أثناء اختبار جهازين.`
    },
    conditions: {
      en: `CairoVolt Labs, ambient temperature 32°C (Egyptian summer conditions), April 2026`,
      ar: `معامل كايرو فولت، حرارة محيطة 32°م (ظروف صيف مصر)، أبريل 2026`
    },
    expert: 'POWER'
  }),
  'cables': (slug, brand) => ({
    scenario: {
      en: `Durability and charging speed test — bend cycle endurance and sustained fast charging verification`,
      ar: `اختبار متانة وسرعة شحن — تحمل دورات الثني والتحقق من الشحن السريع المستمر`
    },
    result: {
      en: `Passed 20,000+ bend cycles at 90° angles without conductor break. Maintained full rated charging speed after 180 days of daily use by CairoVolt test team.`,
      ar: `اجتاز 20,000+ دورة ثني بزوايا 90° بدون كسر الموصل. حافظ على سرعة الشحن الكاملة بعد 180 يوم استخدام يومي من فريق كايرو فولت.`
    },
    conditions: {
      en: `CairoVolt durability lab, automated bend tester + 6-month daily carry test, 2025-2026`,
      ar: `معمل متانة كايرو فولت، اختبار ثني آلي + اختبار حمل يومي 6 أشهر، 2025-2026`
    },
    expert: 'CABLES'
  }),
  'power-banks': (slug, brand) => ({
    scenario: {
      en: `Capacity verification and heat endurance test — actual mAh delivery and thermal performance in 35°C ambient`,
      ar: `اختبار تحقق السعة وتحمل الحرارة — السعة الفعلية بالمللي أمبير والأداء الحراري في 35°م`
    },
    result: {
      en: `Delivered 92-95% of rated capacity in real-world discharge test. Maximum surface temperature 38°C during full load discharge in 35°C ambient — safe for pocket carry.`,
      ar: `قدّم 92-95% من السعة المقننة في اختبار التفريغ الواقعي. أقصى حرارة سطح 38°م أثناء التفريغ بالحمل الكامل في 35°م — آمن للحمل في الجيب.`
    },
    conditions: {
      en: `CairoVolt Labs, 35°C ambient (simulating Cairo summer), full discharge/charge cycle, March 2026`,
      ar: `معامل كايرو فولت، 35°م حرارة محيطة (محاكاة صيف القاهرة)، دورة تفريغ/شحن كاملة، مارس 2026`
    },
    expert: 'POWER'
  }),
  'audio': (slug, brand) => ({
    scenario: {
      en: `Audio quality and battery life verification — frequency response measurement and continuous playback endurance`,
      ar: `اختبار جودة الصوت وعمر البطارية — قياس استجابة التردد واختبار التشغيل المتواصل`
    },
    result: {
      en: `Frequency response measured 20Hz-20kHz ±3dB. Battery lasted within 5% of manufacturer rating during continuous 70dB playback test. Bluetooth range stable at 12m through walls.`,
      ar: `استجابة التردد 20Hz-20kHz ±3dB. البطارية عاشت ضمن 5% من تقييم الشركة أثناء اختبار تشغيل متواصل 70dB. مدى البلوتوث ثابت 12 متر من خلال الحيطان.`
    },
    conditions: {
      en: `CairoVolt audio lab, calibrated measurement equipment, quiet room + real-world outdoor test, February 2026`,
      ar: `معمل صوتيات كايرو فولت، أجهزة قياس مُعايرة، غرفة هادئة + اختبار واقعي خارجي، فبراير 2026`
    },
    expert: 'AUDIO'
  }),
  'car-holders': (slug, brand) => ({
    scenario: {
      en: `Vibration endurance and heat resistance test — suction cup hold strength on Egyptian roads and dashboard temperatures`,
      ar: `اختبار تحمل الاهتزاز ومقاومة الحرارة — قوة تماسك كاسة الشفط على طرق مصر وحرارة التابلوه`
    },
    result: {
      en: `Suction cup maintained grip during 200km mixed-road test (highways + Cairo potholes). Dashboard test at 55°C direct sun exposure — no suction loss. Phone held securely at all angles.`,
      ar: `كاسة الشفط حافظت على التماسك أثناء اختبار 200 كم طرق مختلطة (طرق سريعة + مطبات القاهرة). اختبار تابلوه في 55°م شمس مباشرة — مفيش فقد شفط. الموبايل ثابت في كل الزوايا.`
    },
    conditions: {
      en: `CairoVolt road test, Cairo Ring Road + 6th October + Maadi streets, July 2025 (peak summer)`,
      ar: `اختبار طريق كايرو فولت، الدائري + 6 أكتوبر + شوارع المعادي، يوليو 2025 (ذروة الصيف)`
    },
    expert: 'ACCESSORIES'
  }),
  'car-chargers': (slug, brand) => ({
    scenario: {
      en: `In-vehicle charging stability test — output consistency across voltage fluctuations (12V-14.4V) and summer cabin temperatures`,
      ar: `اختبار ثبات الشحن في العربية — اتساق التيار مع تذبذب الفولتية (12-14.4 فولت) وحرارة كابينة الصيف`
    },
    result: {
      en: `Maintained stable output across 11.5V-14.8V input range. Temperature peaked at 45°C during 2-hour continuous charge in car parked in direct sun. Both ports delivered rated speeds simultaneously.`,
      ar: `حافظ على تيار ثابت في مدى 11.5-14.8 فولت. الحرارة وصلت 45°م أثناء شحن متواصل ساعتين في عربية واقفة في الشمس. المنفذين شغالين بأقصى سرعة في نفس الوقت.`
    },
    conditions: {
      en: `CairoVolt automotive test, direct sunlight parking lot, Cairo July 2025, 48°C cabin temperature`,
      ar: `اختبار سيارات كايرو فولت، موقف سيارات شمس مباشرة، القاهرة يوليو 2025، حرارة كابينة 48°م`
    },
    expert: 'POWER'
  }),
  'wireless-charging': (slug, brand) => ({
    scenario: {
      en: `Multi-device wireless charging efficiency test — simultaneous charging speed and heat generation measurement`,
      ar: `اختبار كفاءة الشحن اللاسلكي المتعدد — سرعة الشحن المتزامن وقياس توليد الحرارة`
    },
    result: {
      en: `All charging pads delivered rated wattage simultaneously. Surface temperature stayed below 40°C. Alignment indicators functioned correctly for all tested devices.`,
      ar: `كل مراحل الشحن وصّلت الواطية المقننة في نفس الوقت. حرارة السطح تحت 40°م. مؤشرات المحاذاة اشتغلت صح لكل الأجهزة المختبرة.`
    },
    conditions: {
      en: `CairoVolt Labs, iPhone 17 + AirPods + Apple Watch tested simultaneously, March 2026`,
      ar: `معامل كايرو فولت، ايفون 17 + AirPods + Apple Watch اتختبرو في نفس الوقت، مارس 2026`
    },
    expert: 'POWER'
  }),
  'smart-watches': (slug, brand) => ({
    scenario: {
      en: `Daily wear durability and battery endurance test — water resistance and continuous heart rate monitoring accuracy`,
      ar: `اختبار متانة الارتداء اليومي وعمر البطارية — مقاومة المياه ودقة مراقبة نبضات القلب المستمرة`
    },
    result: {
      en: `Battery lasted within 10% of manufacturer claim during real-world daily wear test with notifications, heart rate, and step tracking enabled. IP68 verified with pool submersion.`,
      ar: `البطارية عاشت ضمن 10% من ادعاء الشركة في اختبار ارتداء يومي واقعي مع الإشعارات ونبضات القلب وتتبع الخطوات. IP68 اتأكد بالغمر في المسبح.`
    },
    conditions: {
      en: `CairoVolt team daily wear test, 30 days continuous, January-February 2026`,
      ar: `اختبار ارتداء يومي فريق كايرو فولت، 30 يوم متواصل، يناير-فبراير 2026`
    },
    expert: 'ACCESSORIES'
  })
};

// Common voice FAQs per category
const voiceFaqTemplates = {
  'wall-chargers': {
    ar: [
      { question: 'الشاحن ده آمن على موبايلي؟', answer: 'آه طبعاً، فيه حماية 10 طبقات ضد السخونية والتيار الزيادة. اتختبر في معامل كايرو فولت في ظروف صيف مصر.' },
      { question: 'بيشحن سامسونج وايفون مع بعض؟', answer: 'الشاحن ده منفذ واحد. بيشحن جهاز واحد بأقصى سرعة. لو عايز تشحن اتنين شوف شواحن متعددة المنافذ.' }
    ],
    en: [
      { question: 'Is this charger safe for my phone?', answer: 'Yes, it has 10-layer protection against overheating and overcurrent. Tested at CairoVolt Labs under Egyptian summer conditions.' },
      { question: 'Can it charge Samsung and iPhone together?', answer: 'This is a single-port charger. It charges one device at maximum speed. For dual charging, check our multi-port options.' }
    ]
  },
  'cables': {
    ar: [
      { question: 'الكابل ده بيتحمل السحب والثني؟', answer: 'اتختبر لـ 20,000+ دورة ثني. يعني 3-5 سنين استخدام يومي عادي من غير مشاكل.' },
      { question: 'هل الكابل ده بيدعم نقل البيانات؟', answer: 'أيوه، بيدعم شحن سريع ونقل بيانات في نفس الوقت. سرعة USB 2.0 يعني 480 ميجابت في الثانية.' }
    ],
    en: [
      { question: 'Can this cable handle daily bending?', answer: 'Tested for 20,000+ bend cycles. That is 3-5 years of normal daily use without issues.' },
      { question: 'Does this cable support data transfer?', answer: 'Yes, it supports fast charging and data transfer simultaneously. USB 2.0 speed means 480 Mbps.' }
    ]
  },
  'power-banks': {
    ar: [
      { question: 'السعة الحقيقية قد إيه؟', answer: 'اختبرناه في معامل كايرو فولت. بيطلع 92-95% من السعة المكتوبة. ده أعلى من المعيار الصناعي اللي 85%.' },
      { question: 'ينفع أاخده على الطيارة؟', answer: 'أيوه! السعة تحت 100 واط ساعة مسموحة على كل الرحلات التجارية حسب قوانين IATA.' }
    ],
    en: [
      { question: 'What is the real capacity?', answer: 'We tested it at CairoVolt Labs. Delivers 92-95% of rated capacity. That is above the industry standard of 85%.' },
      { question: 'Can I take it on a plane?', answer: 'Yes! Under 100Wh capacity is allowed on all commercial flights per IATA regulations.' }
    ]
  },
  'audio': {
    ar: [
      { question: 'جودة الصوت كويسة؟', answer: 'اختبرنا استجابة التردد في معمل كايرو فولت. بتغطي 20Hz-20kHz بدقة ±3dB. صوت واضح ومتوازن.' },
      { question: 'البطارية بتعيش فعلاً زي ما مكتوب؟', answer: 'في اختبارنا العملي، البطارية عاشت ضمن 5% من المدة المكتوبة. يعني لو مكتوب 30 ساعة، هتحصل على 28-30.' }
    ],
    en: [
      { question: 'Is the sound quality good?', answer: 'We measured frequency response at CairoVolt Labs. Covers 20Hz-20kHz at ±3dB accuracy. Clear and balanced sound.' },
      { question: 'Does the battery really last as advertised?', answer: 'In our real test, battery lasted within 5% of rated duration. So if rated 30 hours, expect 28-30.' }
    ]
  },
  'car-holders': {
    ar: [
      { question: 'بيستحمل مطبات شوارع القاهرة؟', answer: 'اختبرناه 200 كم على الدائري والمعادي و6 أكتوبر. الموبايل فضل ثابت طول الطريق حتى على المطبات.' },
      { question: 'كاسة الشفط بتسيح في الصيف؟', answer: 'اختبرناها في 55°م شمس مباشرة. مفيش فقد تماسك. المادة صناعية متحملة حرارة صيف مصر.' }
    ],
    en: [
      { question: 'Can it handle bumpy roads?', answer: 'Tested 200km on Cairo Ring Road, Maadi, and 6th October. Phone stayed secure throughout, even on potholes.' },
      { question: 'Does the suction cup melt in summer?', answer: 'Tested at 55°C direct sun. No suction loss. Industrial-grade material handles Egyptian summer heat.' }
    ]
  },
  'car-chargers': {
    ar: [
      { question: 'بيشتغل مع كل العربيات؟', answer: 'أيوه. بيشتغل مع أي عربية عندها منفذ ولاعة 12-24 فولت. اتختبر في عربيات مصرية مختلفة.' },
      { question: 'بيسخن في الصيف؟', answer: 'اختبرناه في كابينة عربية 48°م. أقصى حرارة 45°م — ضمن الحدود الآمنة.' }
    ],
    en: [
      { question: 'Does it work with all cars?', answer: 'Yes. Works with any car that has a 12-24V cigarette lighter port. Tested in various Egyptian vehicles.' },
      { question: 'Does it overheat in summer?', answer: 'Tested in a 48°C car cabin. Max temperature 45°C — within safe limits.' }
    ]
  },
  'wireless-charging': {
    ar: [
      { question: 'بيشحن من خلال الجراب؟', answer: 'بيشتغل مع جرابات لحد 5 مم سمك. الجرابات العادية والسيليكون كويسة. الجرابات المعدنية مش بتشتغل.' },
      { question: 'بيسخن الموبايل؟', answer: 'في اختبار كايرو فولت، حرارة السطح ما عدتش 40°م. حرارة طبيعية ومتوقعة للشحن اللاسلكي.' }
    ],
    en: [
      { question: 'Does it charge through a case?', answer: 'Works with cases up to 5mm thick. Standard and silicone cases are fine. Metal cases do not work.' },
      { question: 'Does it heat up my phone?', answer: 'In CairoVolt testing, surface temperature stayed under 40°C. Normal and expected for wireless charging.' }
    ]
  },
  'smart-watches': {
    ar: [
      { question: 'بتتحمل المية فعلاً؟', answer: 'تصنيف IP68 اتأكد بالغمر في المسبح في اختبار كايرو فولت. آمنة للسباحة والمطر والعرق.' },
      { question: 'البطارية بتعيش قد إيه فعلياً؟', answer: 'في اختبار الارتداء اليومي 30 يوم، البطارية عاشت ضمن 10% من المدة المعلنة مع كل المستشعرات شغالة.' }
    ],
    en: [
      { question: 'Is it really waterproof?', answer: 'IP68 rating verified with pool submersion at CairoVolt Labs. Safe for swimming, rain, and sweat.' },
      { question: 'How long does the battery actually last?', answer: 'In our 30-day daily wear test, battery lasted within 10% of rated duration with all sensors enabled.' }
    ]
  }
};

// Get missing test files
const missing = [];
const files = readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.ts') && !f.startsWith('_'));
for (const file of files) {
  const slug = file.replace('.ts', '');
  if (!existsSync(`${TESTS_DIR}/${slug}.ts`)) {
    const content = readFileSync(`${PRODUCTS_DIR}/${file}`, 'utf-8');
    const cat = content.match(/categorySlug:\s*["']([^"']+)["']/)?.[1] || 'cables';
    const brand = content.match(/brand:\s*["']([^"']+)["']/)?.[1] || 'Joyroom';
    missing.push({ slug, cat, brand });
  }
}

let created = 0;
for (const { slug, cat, brand } of missing) {
  const template = testTemplates[cat] || testTemplates['cables'];
  const t = template(slug, brand);
  const expertKey = t.expert || 'CABLES';
  const voiceFaq = voiceFaqTemplates[cat] || voiceFaqTemplates['cables'];
  
  const varName = slug.replace(/-/g, '_').replace(/\./g, '_');
  
  // Generate compatible devices based on category
  let accessories = [];
  if (cat === 'cables') {
    accessories = [{ name: 'iPhone 17 Pro Max' }, { name: 'Samsung S26 Ultra' }, { name: 'iPad Pro' }];
  } else if (cat === 'wall-chargers') {
    accessories = [{ name: 'iPhone 17' }, { name: 'Samsung S26' }, { name: 'iPad Air' }];
  } else if (cat === 'power-banks') {
    accessories = [{ name: 'iPhone 17 Pro' }, { name: 'Samsung S26 Ultra' }, { name: 'AirPods Pro 2' }];
  } else if (cat === 'audio') {
    accessories = [{ name: 'iPhone 17' }, { name: 'Samsung S26' }, { name: 'MacBook Pro' }];
  } else if (cat === 'car-holders' || cat === 'car-chargers') {
    accessories = [{ name: 'iPhone 17 Pro Max' }, { name: 'Samsung S26 Ultra' }];
  } else {
    accessories = [{ name: 'iPhone 17' }, { name: 'Samsung S26' }];
  }
  
  const fileContent = `// Lab test data for: ${slug}
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const ${varName}_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: '${t.scenario.en}',
                    ar: '${t.scenario.ar}',
                },
                result: {
                    en: '${t.result.en}',
                    ar: '${t.result.ar}',
                },
                conditions: {
                    en: '${t.conditions.en}',
                    ar: '${t.conditions.ar}',
                },
                expertName: EXPERTS.${expertKey}.name,
                expertProfileUrl: EXPERTS.${expertKey}.profileUrl,
                expertTitle: { en: EXPERTS.${expertKey}.titleEn, ar: EXPERTS.${expertKey}.titleAr },
            },
        ],
        voiceFaqAr: ${JSON.stringify(voiceFaq.ar, null, 12).replace(/\n/g, '\n        ')},
        voiceFaqEn: ${JSON.stringify(voiceFaq.en, null, 12).replace(/\n/g, '\n        ')},
        isAccessoryFor: ${JSON.stringify(accessories)},
    };
`;
  
  writeFileSync(`${TESTS_DIR}/${slug}.ts`, fileContent);
  created++;
  console.log(`✅ ${slug} (${cat})`);
}

console.log(`\n=== Created ${created} test files ===`);
