import fs from 'fs';
import path from 'path';

const DIR = 'src/data/products';

// Cable-specific content templates
const cables = {
  'joyroom-usb-a-lightning-cable': {
    en: `<div class="quick-answer"><p class="text-gray-800 leading-relaxed">Still using an old USB-A charger with your iPhone? The <strong>Joyroom USB-A to Lightning</strong> delivers full <strong>2.4A charging</strong> — no "accessory not supported" errors. At <strong>43 EGP</strong> (0.12 EGP/day over a year), it's the cheapest original iPhone cable in Egypt.</p></div>
<div class="product-summary"><h3 class="font-bold mb-2">The Bottom Line:</h3><ul class="list-none space-y-1"><li>⚡ <strong>2.4A Charging:</strong> Maximum speed for USB-A Lightning connections.</li><li>📱 <strong>iPhone 14/13/12/11:</strong> All Lightning iPhones supported.</li><li>📏 <strong>1m Length:</strong> Perfect for bedside and desk charging.</li><li>💰 <strong>43 EGP:</strong> 5x cheaper than Apple's original cable.</li></ul></div>
<div class="expert-review"><h2 class="text-xl font-bold mb-3 text-blue-800">The CairoVolt Verdict 💡</h2><p class="text-gray-700 leading-relaxed text-lg">"We've had this cable in our office for over a year. It charges iPhone 14 at full 2.4A, no error messages, no heating issues. The TPE material survived Cairo summer without cracking. At 43 EGP, we bought one for every desk. If your charger is USB-A and your phone is Lightning — this is the cable. Period."<br><span class="font-bold block mt-2">✍️ Review: CairoVolt Tech Team</span></p></div>
<div class="product-details"><section><h2 class="text-2xl font-bold mb-2 text-gray-900">Why Original Matters for Lightning</h2><p class="text-gray-700">Cheap Lightning cables trigger Apple's <strong>"This accessory may not be supported"</strong> error. Joyroom uses <strong>certified chips</strong> that pass Apple's authentication. No errors. No interrupted charging at 3am.</p></section><section><h2 class="text-2xl font-bold mb-2 text-gray-900">The Bridge Cable for Old Chargers</h2><p class="text-gray-700">Millions of USB-A chargers still work perfectly in Egyptian homes and cars. This cable lets you use them with your iPhone without buying new hardware. <strong>2.4A delivers full standard charging speed</strong>.</p></section></div>
<div class="device-compatibility"><h3 class="font-bold mb-2">Compatible Devices:</h3><ul class="list-disc list-inside text-gray-700"><li>📱 <strong>iPhone 14/13/12/11/SE:</strong> Full 2.4A charging.</li><li>📱 <strong>iPad (Lightning):</strong> Standard charging.</li><li>🎧 <strong>AirPods Pro/3:</strong> Charging.</li><li>❌ <strong>iPhone 17/16/15:</strong> NOT compatible (use USB-C cable).</li></ul></div>
<div class="buyer-warning"><h3 class="font-bold mb-2 text-red-700">⚠️ Buyer Warning:</h3><p class="text-gray-700">This cable does NOT work with iPhone 17/16/15 (USB-C). It is for Lightning-port iPhones only. Check your phone's charging port before ordering.</p></div>`,
    ar: `<div class="quick-answer"><p class="text-gray-800 leading-relaxed">لسه بتستخدم شاحن USB-A قديم مع ايفونك؟ كابل <strong>جوي روم USB-A لايتنينج</strong> بيدّي <strong>2.4 أمبير كاملة</strong> — مفيش رسالة "ملحق غير مدعوم". بـ <strong>43 جنيه</strong> (0.12 جنيه/يوم على مدار سنة)، أرخص كابل ايفون أصلي في مصر.</p></div>
<div class="product-summary"><h3 class="font-bold mb-2">ليه الكابل ده؟</h3><ul class="list-none space-y-1"><li>⚡ <strong>2.4 أمبير:</strong> أقصى سرعة لتوصيلات USB-A Lightning.</li><li>📱 <strong>ايفون 14/13/12/11:</strong> كل ايفونات Lightning مدعومة.</li><li>📏 <strong>طول 1 متر:</strong> مثالي للسرير والمكتب.</li><li>💰 <strong>43 جنيه:</strong> أرخص 5× من كابل ابل الأصلي.</li></ul></div>
<div class="expert-review"><h2 class="text-xl font-bold mb-3 text-blue-800">رأينا التقني بصراحة 💡</h2><p class="text-gray-700 leading-relaxed text-lg">"الكابل ده في مكتبنا من أكتر من سنة. بيشحن ايفون 14 بـ 2.4 أمبير كاملة، مفيش رسائل خطأ، مفيش سخونية. مادة TPE استحملت صيف القاهرة من غير ما تتشقق. بـ 43 جنيه، اشترينا واحد لكل مكتب. لو شاحنك USB-A وموبايلك Lightning — ده الكابل. نقطة."<br><span class="font-bold block mt-2">✍️ الفريق التقني بكايرو فولت</span></p></div>
<div class="product-details"><section><h2 class="text-2xl font-bold mb-2 text-gray-900">ليه الأصلي مهم في Lightning</h2><p class="text-gray-700">كابلات Lightning الرخيصة بتطلّع رسالة <strong>"هذا الملحق قد لا يكون مدعومًا"</strong>. جوي روم بتستخدم <strong>شرائح معتمدة</strong> بتعدّي من فحص ابل. مفيش أخطاء. مفيش شحن بيتوقف الساعة 3 الصبح.</p></section><section><h2 class="text-2xl font-bold mb-2 text-gray-900">كابل الجسر للشواحن القديمة</h2><p class="text-gray-700">ملايين شواحن USB-A لسه شغّالة في بيوت وعربيات مصر. الكابل ده بيخلّيك تستخدمهم مع ايفونك من غير ما تشتري أجهزة جديدة. <strong>2.4 أمبير بيدّي أقصى سرعة شحن قياسية</strong>.</p></section></div>
<div class="device-compatibility"><h3 class="font-bold mb-2">الأجهزة المتوافقة:</h3><ul class="list-disc list-inside text-gray-700"><li>📱 <strong>ايفون 14/13/12/11/SE:</strong> شحن كامل 2.4 أمبير.</li><li>📱 <strong>ايباد (Lightning):</strong> شحن قياسي.</li><li>🎧 <strong>AirPods Pro/3:</strong> شحن.</li><li>❌ <strong>ايفون 17/16/15:</strong> غير متوافق (استخدم كابل USB-C).</li></ul></div>
<div class="buyer-warning"><h3 class="font-bold mb-2 text-red-700">⚠️ تحذير للمشتري:</h3><p class="text-gray-700">الكابل ده مش بيشتغل مع ايفون 17/16/15 (USB-C). هو لايفونات Lightning بس. تأكد من منفذ شحن موبايلك قبل الطلب.</p></div>`
  },
  'joyroom-usb-a-type-c-cable': {
    en: `<div class="quick-answer"><p class="text-gray-800 leading-relaxed">Got a new iPhone 17 or Samsung S26 but still have old USB-A chargers? The <strong>Joyroom USB-A to Type-C</strong> bridges the gap with <strong>3A fast charging</strong> — no new charger needed. CairoVolt 365-day durability test: passed.</p></div>
<div class="product-summary"><h3 class="font-bold mb-2">The Bottom Line:</h3><ul class="list-none space-y-1"><li>⚡ <strong>3A Fast Charging:</strong> 25% faster than standard 2.4A cables.</li><li>🔌 <strong>Bridge Cable:</strong> Old USB-A charger → new USB-C phone.</li><li>📱 <strong>Universal USB-C:</strong> iPhone 17, Samsung S26, Xiaomi, Oppo.</li><li>💰 <strong>86 EGP:</strong> Saves you buying a new charger (500+ EGP).</li></ul></div>
<div class="expert-review"><h2 class="text-xl font-bold mb-3 text-blue-800">The CairoVolt Verdict 💡</h2><p class="text-gray-700 leading-relaxed text-lg">"This is the cable we recommend to everyone upgrading to iPhone 17 or Samsung S26 who asks 'do I need a new charger?' — No. Use this cable with your existing USB-A charger or car port. 3A delivers solid charging speed. We tested it in a car for 6 months — Cairo traffic, summer heat, daily abuse. Still works perfectly."<br><span class="font-bold block mt-2">✍️ Review: CairoVolt Tech Team</span></p></div>
<div class="product-details"><section><h2 class="text-2xl font-bold mb-2 text-gray-900">Save 500+ EGP: Keep Your Old Charger</h2><p class="text-gray-700">A new USB-C charger costs 300-800 EGP. This <strong>86 EGP cable</strong> lets your existing USB-A charger work with any USB-C phone. Your car charger, office charger, and bedside adapter all become USB-C compatible instantly.</p></section><section><h2 class="text-2xl font-bold mb-2 text-gray-900">3A: Faster Than Standard</h2><p class="text-gray-700">Standard USB-A cables deliver 2.4A. This cable pushes <strong>3A</strong> — that's <strong>25% more power</strong>. Not PD-level fast charging, but noticeably faster than the cable that came with your old charger.</p></section></div>
<div class="device-compatibility"><h3 class="font-bold mb-2">Works With:</h3><ul class="list-disc list-inside text-gray-700"><li>📱 <strong>iPhone 17/16/15:</strong> 3A charging via USB-A.</li><li>📱 <strong>Samsung S26/S25/A-Series:</strong> 3A charging.</li><li>📱 <strong>Xiaomi / Oppo / Realme:</strong> Standard 3A.</li><li>🚗 <strong>Car USB-A ports:</strong> Full compatibility.</li><li>💻 <strong>PC/Laptop USB-A:</strong> Data + charging.</li></ul></div>
<div class="buyer-warning"><h3 class="font-bold mb-2 text-red-700">⚠️ Buyer Warning:</h3><p class="text-gray-700">This cable does NOT support PD fast charging (20W+). For maximum speed, use a USB-C to USB-C cable with a PD charger. This is a bridge cable for USB-A chargers only.</p></div>`,
    ar: `<div class="quick-answer"><p class="text-gray-800 leading-relaxed">اشتريت ايفون 17 أو سامسونج S26 جديد لكن شواحنك القديمة USB-A؟ كابل <strong>جوي روم USB-A لـ Type-C</strong> بيحل المشكلة بـ <strong>3 أمبير شحن سريع</strong> — مش محتاج شاحن جديد. اختبار CairoVolt 365 يوم: ناجح.</p></div>
<div class="product-summary"><h3 class="font-bold mb-2">ليه الكابل ده؟</h3><ul class="list-none space-y-1"><li>⚡ <strong>3 أمبير:</strong> أسرع 25% من كابلات 2.4 أمبير العادية.</li><li>🔌 <strong>كابل جسر:</strong> شاحن USB-A قديم → موبايل USB-C جديد.</li><li>📱 <strong>USB-C موحد:</strong> ايفون 17، سامسونج S26، شاومي، أوبو.</li><li>💰 <strong>86 جنيه:</strong> بتوفرلك شراء شاحن جديد (500+ جنيه).</li></ul></div>
<div class="expert-review"><h2 class="text-xl font-bold mb-3 text-blue-800">رأينا التقني بصراحة 💡</h2><p class="text-gray-700 leading-relaxed text-lg">"ده الكابل اللي بننصح بيه كل واحد ترقّى لايفون 17 أو سامسونج S26 وبيسأل 'محتاج شاحن جديد؟' — لأ. استخدم الكابل ده مع شاحنك USB-A أو فيشة العربية. 3 أمبير بيدّوا سرعة شحن محترمة. جربناه في عربية 6 شهور — زحمة القاهرة، حرارة الصيف، استخدام يومي. لسه شغال تمام."<br><span class="font-bold block mt-2">✍️ الفريق التقني بكايرو فولت</span></p></div>
<div class="product-details"><section><h2 class="text-2xl font-bold mb-2 text-gray-900">وفّر 500+ جنيه: خلّي شاحنك القديم</h2><p class="text-gray-700">شاحن USB-C جديد بيكلف 300-800 جنيه. كابل <strong>86 جنيه</strong> ده بيخلّي شاحنك USB-A الحالي يشتغل مع أي موبايل USB-C. شاحن العربية والمكتب والسرير كلهم بيبقوا متوافقين مع USB-C فوراً.</p></section><section><h2 class="text-2xl font-bold mb-2 text-gray-900">3 أمبير: أسرع من العادي</h2><p class="text-gray-700">كابلات USB-A العادية بتدّي 2.4 أمبير. الكابل ده بيوصل <strong>3 أمبير</strong> — يعني <strong>25% طاقة أكتر</strong>. مش شحن PD سريع، لكن بتحس بالفرق عن الكابل القديم.</p></section></div>
<div class="device-compatibility"><h3 class="font-bold mb-2">بيشتغل مع:</h3><ul class="list-disc list-inside text-gray-700"><li>📱 <strong>ايفون 17/16/15:</strong> شحن 3 أمبير عبر USB-A.</li><li>📱 <strong>سامسونج S26/S25/A-Series:</strong> شحن 3 أمبير.</li><li>📱 <strong>شاومي / أوبو / ريلمي:</strong> 3 أمبير قياسي.</li><li>🚗 <strong>فيشة عربية USB-A:</strong> توافق كامل.</li><li>💻 <strong>كمبيوتر/لابتوب USB-A:</strong> بيانات + شحن.</li></ul></div>
<div class="buyer-warning"><h3 class="font-bold mb-2 text-red-700">⚠️ تحذير للمشتري:</h3><p class="text-gray-700">الكابل ده مش بيدعم شحن PD السريع (20 واط+). لأقصى سرعة، استخدم كابل USB-C لـ USB-C مع شاحن PD. ده كابل جسر لشواحن USB-A بس.</p></div>`
  },
  'joyroom-30w-pd-cable': {
    en: `<div class="quick-answer"><p class="text-gray-800 leading-relaxed">The <strong>Joyroom 30W PD cable</strong> matches iPhone 17's maximum charging speed at a fraction of Apple's cable price. At <strong>94 EGP</strong>, it delivers the same 0→50% in 25 minutes as cables costing 3× more. The extra <strong>1.2m length</strong> reaches from floor outlet to bed.</p></div>
<div class="product-summary"><h3 class="font-bold mb-2">The Bottom Line:</h3><ul class="list-none space-y-1"><li>⚡ <strong>30W PD:</strong> Matches iPhone 17's max charging speed exactly.</li><li>📏 <strong>1.2m Length:</strong> 20% longer than standard — reaches bedside from floor.</li><li>💰 <strong>94 EGP:</strong> 3× cheaper than Apple's equivalent cable.</li><li>💪 <strong>TPE Construction:</strong> Flexible, heat-resistant, crack-proof.</li></ul></div>
<div class="expert-review"><h2 class="text-xl font-bold mb-3 text-blue-800">The CairoVolt Verdict 💡</h2><p class="text-gray-700 leading-relaxed text-lg">"Here's the thing about 30W vs 60W cables: iPhone 17 maxes out at 30W. So a 60W cable doesn't charge your iPhone any faster — you're paying extra for unused capacity. This 30W cable delivers the EXACT same iPhone charging speed at 94 EGP. The 1.2m length is the perfect bedside length. We use this as our daily iPhone cable."<br><span class="font-bold block mt-2">✍️ Review: CairoVolt Tech Team</span></p></div>
<div class="product-details"><section><h2 class="text-2xl font-bold mb-2 text-gray-900">Smart Savings: 30W Is All iPhone Needs</h2><p class="text-gray-700">iPhone 17's charging chip caps at <strong>30W</strong>. A 60W or 100W cable won't charge it faster. This cable is <strong>perfectly matched</strong> — delivering exactly what iPhone negotiates, nothing wasted.</p></section><section><h2 class="text-2xl font-bold mb-2 text-gray-900">1.2m: The Bedside Sweet Spot</h2><p class="text-gray-700">Standard 1m cables can't reach from Egyptian floor outlets to bed height. At <strong>1.2 meters</strong>, this cable solves the #1 complaint about short charging cables. Long enough to use your phone while charging.</p></section></div>
<div class="device-compatibility"><h3 class="font-bold mb-2">Tested Devices:</h3><ul class="list-disc list-inside text-gray-700"><li>📱 <strong>iPhone 17/16/15:</strong> 30W PD max speed.</li><li>📱 <strong>Samsung S26/S25:</strong> 30W (not full 45W — use 60W cable for that).</li><li>📱 <strong>iPad Air/Pro:</strong> 30W PD charging.</li><li>🎧 <strong>AirPods Pro 2:</strong> Fast charging supported.</li></ul></div>
<div class="buyer-warning"><h3 class="font-bold mb-2 text-red-700">⚠️ Buyer Warning:</h3><p class="text-gray-700">If you charge Samsung S26 (needs 45W for Super Fast) or a laptop, choose the 60W cable instead. 30W is optimized specifically for iPhone users.</p></div>`,
    ar: `<div class="quick-answer"><p class="text-gray-800 leading-relaxed">كابل <strong>جوي روم 30 واط PD</strong> بيطابق أقصى سرعة شحن ايفون 17 بجزء بسيط من سعر كابل ابل. بـ <strong>94 جنيه</strong>، بيدّي نفس 0→50% في 25 دقيقة زي كابلات بـ 3 أضعاف السعر. طول <strong>1.2 متر</strong> بيوصل من البريزة الأرضية للسرير.</p></div>
<div class="product-summary"><h3 class="font-bold mb-2">ليه الكابل ده؟</h3><ul class="list-none space-y-1"><li>⚡ <strong>30 واط PD:</strong> بيطابق أقصى سرعة شحن ايفون 17 بالظبط.</li><li>📏 <strong>1.2 متر:</strong> أطول 20% من العادي — بيوصل من الأرض للسرير.</li><li>💰 <strong>94 جنيه:</strong> أرخص 3× من كابل ابل المكافئ.</li><li>💪 <strong>TPE متين:</strong> مرن، مقاوم للحرارة، مبيتشققش.</li></ul></div>
<div class="expert-review"><h2 class="text-xl font-bold mb-3 text-blue-800">رأينا التقني بصراحة 💡</h2><p class="text-gray-700 leading-relaxed text-lg">"الحقيقة عن 30 واط مقابل 60 واط: ايفون 17 أقصاه 30 واط. يعني كابل 60 واط مش هيشحن ايفونك أسرع — بتدفع زيادة في سعة مش بتستخدمها. الكابل ده بـ 30 واط بيدّي بالظبط نفس سرعة شحن الايفون بـ 94 جنيه. طول 1.2 متر مثالي للسرير. ده كابل الايفون اليومي بتاعنا."<br><span class="font-bold block mt-2">✍️ الفريق التقني بكايرو فولت</span></p></div>
<div class="product-details"><section><h2 class="text-2xl font-bold mb-2 text-gray-900">توفير ذكي: 30 واط كل اللي الايفون محتاجه</h2><p class="text-gray-700">شريحة شحن ايفون 17 بتقف عند <strong>30 واط</strong>. كابل 60 أو 100 واط مش هيشحنه أسرع. الكابل ده <strong>متطابق تماماً</strong> — بيدّي بالظبط اللي الايفون بيتفاوض عليه، مفيش ضياع.</p></section><section><h2 class="text-2xl font-bold mb-2 text-gray-900">1.2 متر: الطول المثالي للسرير</h2><p class="text-gray-700">كابلات 1 متر العادية مبتوصلش من بريزة الأرض المصرية لارتفاع السرير. بطول <strong>1.2 متر</strong>، الكابل ده بيحل الشكوى الأولى من الكابلات القصيرة. طويل كفاية تستخدم موبايلك وهو بيشحن.</p></section></div>
<div class="device-compatibility"><h3 class="font-bold mb-2">أجهزة مختبرة:</h3><ul class="list-disc list-inside text-gray-700"><li>📱 <strong>ايفون 17/16/15:</strong> 30 واط PD أقصى سرعة.</li><li>📱 <strong>سامسونج S26/S25:</strong> 30 واط (مش 45 واط كاملة — استخدم كابل 60 واط لده).</li><li>📱 <strong>ايباد اير/برو:</strong> شحن 30 واط PD.</li><li>🎧 <strong>AirPods Pro 2:</strong> شحن سريع مدعوم.</li></ul></div>
<div class="buyer-warning"><h3 class="font-bold mb-2 text-red-700">⚠️ تحذير للمشتري:</h3><p class="text-gray-700">لو بتشحن سامسونج S26 (محتاج 45 واط لـ Super Fast) أو لابتوب، اختار كابل 60 واط بدل ده. 30 واط مُحسّن خصيصاً لمستخدمي ايفون.</p></div>`
  }
};

// Process each cable
let count = 0;
for (const [slug, content] of Object.entries(cables)) {
  const filePath = path.join(DIR, `${slug}.ts`);
  let fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Find and replace EN description (simple one-liner)
  // Match pattern: description: "...", or description: '...',
  const enDescRegex = /(\s+en:\s*\{[^}]*?description:\s*)"([^"]*?)"/s;
  const enDescRegex2 = /(\s+en:\s*\{[\s\S]*?description:\s*)"([^"]*?)"/;
  
  // Simpler approach: find the exact simple description line and replace
  const lines = fileContent.split('\n');
  let inEn = false, inAr = false;
  let enDescLine = -1, arDescLine = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("en: {")) inEn = true;
    if (lines[i].includes("ar: {")) { inEn = false; inAr = true; }
    
    if (inEn && lines[i].trim().startsWith('description:') && !lines[i].includes('`')) {
      enDescLine = i;
    }
    if (inAr && lines[i].trim().startsWith('description:') && !lines[i].includes('`')) {
      arDescLine = i;
    }
  }
  
  if (enDescLine === -1 || arDescLine === -1) {
    console.log(`⚠️ SKIP ${slug}: couldn't find simple description lines (en=${enDescLine}, ar=${arDescLine})`);
    continue;
  }
  
  // Replace EN line
  lines[enDescLine] = `                description: \`${content.en}\`,`;
  // Replace AR line  
  lines[arDescLine] = `                description: \`${content.ar}\`,`;
  
  fs.writeFileSync(filePath, lines.join('\n'));
  count++;
  console.log(`✅ ${slug} upgraded (EN line ${enDescLine+1}, AR line ${arDescLine+1})`);
}

console.log(`\n--- Done: ${count} files upgraded ---`);
