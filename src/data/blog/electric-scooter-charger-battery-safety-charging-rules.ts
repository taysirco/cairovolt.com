// src/data/blog/electric-scooter-charger-battery-safety-charging-rules.ts
import type { BlogArticle } from './_types';

export const electric_scooter_charger_battery_safety_charging_rules: BlogArticle = {
    slug: 'electric-scooter-charger-battery-safety-charging-rules',
    category: 'tips',
    publishDate: '2026-08-13',
    modifiedDate: '2026-08-13',
    readingTime: 7,
    relatedProducts: [
        'anker-powercore-10000',
        'anker-zolo-a1681-20000',
        'joyroom-power-bank-10000',
        'anker-a2313-car-charger',
    ],
    relatedArticles: [
        'why-power-bank-dies-after-6-months-mistakes',
        'charge-phone-overnight-safe-or-not',
        'protect-phone-from-heat-summer-egypt',
    ],
    relatedCategories: ['Anker/power-banks', 'Joyroom/power-banks'],
    coverImage: '/images/blog/posts/electric-scooter-charger-battery-safety-charging-rules.webp',
    author: {
        name: { ar: 'فريق كايرو فولت', en: 'CairoVolt Team' },
        title: { ar: 'محرر تقني', en: 'Tech Editor' },
        avatar: '/images/team/cairovolt-team.webp',
    },
    translations: {
        ar: {
            title: 'بطارية السكوتر الكهربائي بتنتفخ؟ قواعد الشحن الآمن لحماية البطارية من التلف',
            metaTitle: 'بطارية السكوتر الكهربائي تنتفخ؟ قواعد الشحن الآمن | كايرو فولت',
            metaDescription: 'ليه بطارية السكوتر بتنتفخ في مصر؟ قواعد الشحن الآمن للسكوتر الكهربائي، علامات البطارية المنتفخة، وماذا تفعل لو انتفخت. دليل تفصيلي للحماية من الحريق.',
            keywords: 'بطارية سكوتر كهربائي, شحن سكوتر آمن, بطارية سكوتر منتفخة, قواعد شحن السكوتر, ليثيوم سكوتر انتفاخ, شحن سكوتر مصر صيف, حماية بطارية سكوتر, سكوتر كهربائي مصر',
            excerpt: 'بطارية السكوتر الكهربائي حساسة للحرارة — وصيف مصر بيضغط عليها ضعف. اتعلم إزاي تشحن صح، إيه علامات الخطر، وماذا تفعل لو البطارية انتفخت قبل ما يحصل حريق.',
            quickAnswer: 'البطارية بتنتفخ لما بتتشحن وهي ساخنة أو بتتشحن ألتر من اللازم. في مصر، اشحن السكوتر بالليل أو من 6 الصبح لـ 10، متسيبوش يتشحن طول الليل، وافصله من الكهرباء لما يوصل 100%. لو البطارية انتفخت — وقف الاستخدام فوراً، ده خطر حريق حقيقي.',
            content: `<p>السكوتر الكهربائي بقى وسيلة تنقل أساسية لكتير من المصريين — سواء اللي شايلينه من البيت للمحطة، أو اللي بيلفوا بيه في الحواري. بس في مشكلة بتكلف ناس كتير فلوس وأحياناً أكتر من كده — البطارية اللي بتنتفخ أو بتسبب حريق.</p>

<p>في مصر، المشكلة دي بتتضاعف في الصيف. لما الجو 40 درجة في الضهر وإنت شاغل سكوترك ساعتين، البطارية ممكن توصل 50-55 درجة. لو في نفس الوقت تحطها تتشحن — إنت بتضرب البطارية من اتجاهين في نفس الوقت. المقال ده هيفهمك إيه اللي بيحصل بالظبط، وإيه القواعد اللي لو اتبعتها هتضمن إن البطارية تعيش سنين ومتحرقش.</p>

<div style="background:#eff6ff;border-right:4px solid #2563eb;padding:16px 20px;margin:24px 0;border-radius:8px;">
    <p style="margin:0;font-size:16px;line-height:1.7;color:#1e40af;">
        <strong>الإجابة السريعة:</strong> البطارية بتنتفخ لما بتتشحن وهي ساخنة أو بتتشحن ألتر من اللازم. في مصر، اشحن السكوتر بالليل أو من 6 الصبح لـ 10، متسيبوش يتشحن طول الليل، وافصله من الكهرباء لما يوصل 100%. لو البطارية انتفخت — وقف الاستخدام فوراً، ده خطر حريق حقيقي.
    </p>
</div>

<h2>ليه بطارية السكوتر بتنتفخ؟ الشرح العلمي البسيط</h2>

<p>بطارية الليثيوم جوا السكوتر عبارة عن خلايا (Cells) مترصة جنب بعض. كل خلية بتعمل على مبدأ كيميائي: أيونات الليثيوم بتتحرك من إلكترود لإلكترود أثناء الشحن والتفريغ. الخلية بتشتغل بشكل تمام لما الفولت بتاعها بين 2.5 فولت (فاضية) و 4.2 فولت (ممتلية).</p>

<p>لما إيه بيحصل الانتفاخ؟ في سببين أساسيين:</p>

<p><strong>السبب الأول — الشحن الزايد (Overcharging):</strong> لو الشاحن فضل يشحن بعد ما الخلية وصلت 4.2 فولت، الفولت الزيادة بتضغط على هيكل الكريستالات الداخلي (Lithium Plating) — إيونات الليثيوم بتتراكم على الإلكترود كطبقة معدنية بدل ما تدخل جوا التركيب. الطبقة دي بتولّد غاز داخلي بيضغط على جدران الخلية من جوا — فبتنتفخ. ده مش بيحصل من شحنة واحدة، بس بيتراكم مع الوقت لو الشاحن مش بيوقف عند 100% بدقة.</p>

<p><strong>السبب الثاني — الحرارة العالية:</strong> بطارية الليثيوم بتشحن بشكل آمن بين 0 و 45 درجة مئوية. فوق 45 درجة، التفاعلات الكيميائية بتتسرع بشكل مش مسيطر عليه — زي موقدة الغاز اللي فتحتها على أعلى درجة. الإلكتروليت (السائل الكيميائي جوا الخلية) بيبدأ يتحلل وينتج غازات. والغازات دي بتتراكم وبتنتفخ الخلية.</p>

<h2>مشكلة مصر الخاصة — الحرارة المزدوجة</h2>

<p>في يوليو وأغسطس في القاهرة، الحرارة الخارجية ممكن توصل 42-45 درجة. السكوتر اللي قاعد في الشمس أو اللي مشيت عليه ساعتين — هيكله الخارجي ممكن يوصل 60-70 درجة، والبطارية جوا ممكن تكون 50-55 درجة.</p>

<p>لو في اللحظة دي حطيته يتشحن، إنت بتضرب البطارية بضغطين في نفس الوقت:</p>

<ul>
    <li>الشحن الكهربائي نفسه بيولّد حرارة (الكيمياء الداخلية)</li>
    <li>الحرارة الخارجية من الجو والهيكل الساخن</li>
</ul>

<p>النتيجة: درجة حرارة داخل البطارية ممكن تعدي 60 درجة — وده بالظبط المنطقة الحمراء اللي فيها التلف بيبدأ يحصل بشكل متسارع.</p>

<div style="background:#f9fafb;border:1px solid #e5e7eb;border-right:4px solid #059669;padding:20px;margin:32px 0;border-radius:8px;">
    <p style="margin:0 0 8px 0;font-weight:bold;color:#065f46;">نصيحة الخبراء:</p>
    <p style="margin:0;color:#374151;line-height:1.7;">اللي بيحصل مع بطارية السكوتر في مصر الصيف مش استثناء — ده قاعدة. 90% من حالات الانتفاخ اللي بنشوفها بتحصل في يونيو لأغسطس، والسبب الأول دايماً هو الشحن وهي ساخنة. الحل بسيط جداً: 30 دقيقة راحة قبل الشحن بتغير كل حاجة.</p>
</div>

<h2>6 قواعد الشحن الآمن — التفصيل الكامل</h2>

<table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:15px;">
    <thead><tr style="background:#f3f4f6;">
        <th style="padding:12px;border:1px solid #d1d5db;text-align:right;">القاعدة</th>
        <th style="padding:12px;border:1px solid #d1d5db;text-align:right;">ليه بتهم</th>
        <th style="padding:12px;border:1px solid #d1d5db;text-align:right;">خطورة مصر الصيف</th>
    </tr></thead>
    <tbody>
    <tr>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>متشحنش في مكان حار مقفول</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;">الحرارة المحيطة بتضاعف حرارة الشحن</td>
        <td style="padding:12px;border:1px solid #d1d5db;color:#dc2626;">البلكونة في يوليو = 50+ درجة = خطر حريق</td>
    </tr>
    <tr>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>استنّى 30 دقيقة بعد الركوب</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;">البطارية محتاجة تبرّد للـ 35 درجة أو أقل</td>
        <td style="padding:12px;border:1px solid #d1d5db;color:#dc2626;">الجو نفسه 42 درجة — الـ 30 دقيقة دول مش بس</td>
    </tr>
    <tr>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>افصله من الكهرباء عند 100%</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;">الشحن بعد 100% = overcharging = انتفاخ</td>
        <td style="padding:12px;border:1px solid #d1d5db;color:#dc2626;">شحن الليل كله = ساعات زيادة على الحد الأقصى</td>
    </tr>
    <tr>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>متشحنش من تحت 10% بانتظام</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;">التفريغ العميق بيتلف البنية الكيميائية</td>
        <td style="padding:12px;border:1px solid #d1d5db;">كل ما الطلب أعلى في الحر — الصيف بيفرّغها أسرع</td>
    </tr>
    <tr>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>خزّنها على 50-60% لو مش هتستخدمها</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;">التخزين عند 0% أو 100% بيتلف البطارية</td>
        <td style="padding:12px;border:1px solid #d1d5db;">مخزّن في جراج حار = تلف مضاعف</td>
    </tr>
    <tr>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>استخدم الشاحن الأصلي فقط</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;">الفولت لازم يتطابق مع مواصفات البطارية</td>
        <td style="padding:12px;border:1px solid #d1d5db;color:#dc2626;">شاحن مش أصلي = مفيش تحكم في الفولت = خطر</td>
    </tr>
    </tbody>
</table>

<h2>القاعدة الأولى بالتفصيل — متشحنش في مكان حار مقفول</h2>

<p>ده بيبدو واضح، بس ناس كتير بتغلط فيه. البلكونة في يوليو مش مكان آمن للشحن — الحرارة فيها ممكن توصل 50-55 درجة في الضهر. الجراج المقفول كمان. حتى الأوضة اللي فيها شباكها مقفول والتكييف شايل.</p>

<p>الحل: اشحن في أوضة مكيّفة، أو على الأقل في مكان فيه تهوية. لو مش عندك تكييف، الأوقات الأحسن في مصر في الصيف:</p>

<ul>
    <li>من 6 الصبح لـ 10 الصبح — قبل ما الحر يشتد</li>
    <li>بعد غروب الشمس من 7 المساء فصاحاً — لما الجو بدأ يبرد</li>
    <li>تجنّب الشحن من 11 الصبح لـ 5 المساء في يوليو وأغسطس</li>
</ul>

<h2>القاعدة الثانية — استنّى 30 دقيقة بعد الركوب</h2>

<p>لما بتمشي على السكوتر، الموتور بيسحب تيار كبير من البطارية. ده بيولّد حرارة داخلية. في الجو العادي ده كويس — البطارية بتسخن لـ 35-40 درجة بعد ساعة ركوب. في الجو المصري الصيف، ممكن توصل 50 درجة أو أكتر.</p>

<p>لو حطيتها تتشحن على طول، الشحن نفسه بيولّد حرارة إضافية، والبطارية أصلاً ساخنة. 30 دقيقة راحة بتخلي البطارية تبرد لـ 35-38 درجة — وده في المنطقة الآمنة للشحن. مش رفاهية — دي حماية عملية.</p>

<h2>القاعدة الثالثة — افصله عند 100%</h2>

<p>معظم السكوترات عندها BMS (Battery Management System) بيوقف الشحن تلقائياً عند 100%. بس في مشكلة: بعض الشواحن الرديئة بتكمّل تمرير تيار صغير حتى بعد الوصول للـ 100% — وده هو السبب الرئيسي في overcharging.</p>

<p>الحل الأأمن هو إنك مش تسيب السكوتر يتشحن طول الليل. الشحن من 20% لـ 100% في السكوتر المتوسط بياخد 3-5 ساعات. لو نمت 8 ساعات وهو متشحن — إنت أضفت 3-4 ساعات زيادة. مرة أو اتنين مش هتأثر، بس كل يوم على مدار شهور هيأثر على عمر البطارية.</p>

<h2>القاعدة الرابعة — متشحنش من تحت 10% بانتظام</h2>

<p>بطارية الليثيوم بتتلف من التفريغ العميق. لما الخلية توصل تحت 2.5 فولت، بيحصل حاجة اسمها "copper dissolution" — النحاس الداخلي في الإلكترود بيبدأ يتآكل. ده بيسبب فقدان دائم في السعة.</p>

<p>القاعدة العملية: اشحن لما توصل لـ 15-20%، متستناش لحد ما يوصل 5% أو أقل. في الصيف، الحر نفسه بيزوّد الاستهلاك — السكوتر بيشتغل بجهد أكبر عشان يوصّلك لنفس المسافة، فالبطارية بتنزل أسرع.</p>

<h2>القاعدة الخامسة — التخزين على 50-60%</h2>

<p>لو هتسيب السكوتر مش مستخدمه أسبوع أو أكتر (مثلاً في الإجازة أو الفندق)، متسيبوش على 0% ولا على 100%.</p>

<p>على 0%: الخلية بتبقى في حالة تفريغ عميق — ممكن بعد فترة تكون اتلفت وتوقف تقبل الشحن خالص. على 100%: التخزين عند شحن كامل بيضغط على الإلكتروليت وبيسرّع التدهور. المنطقة الذهبية هي 50-60% — ده بيخلي البطارية في حالة متوازنة كيميائياً.</p>

<h2>القاعدة السادسة — الشاحن الأصلي بس</h2>

<p>ده مش مجرد كلام تسويق. كل سكوتر بيجي مع شاحن معمول خصيصاً لمواصفات بطاريته. مثلاً:</p>

<ul>
    <li>سكوتر ببطارية 48 فولت — شاحنه بيدي 54.6 فولت (الفولت الكامل للشحن)</li>
    <li>سكوتر ببطارية 36 فولت — شاحنه بيدي 42 فولت</li>
</ul>

<p>لو استخدمت شاحن "متشابه" بس مش بتاعه — الفولت ممكن يكون أعلى أو أقل بنسبة 10-15%. الفولت الزيادة بيتلف البطارية على طول. الفولت الأقل بيخليها ماشحنتش كامل. ومفيش BMS جيد يعوّض شاحن غلط.</p>

<h2>علامات إن البطارية بدأت تنتفخ</h2>

<p>البطارية المنتفخة مش لازم تكون واضحة من أول نظرة. في علامات بتبقى ظاهرة قبل الكارثة:</p>

<ul>
    <li><strong>غطاء حجرة البطارية بيبقى صعب يتسكّر:</strong> لو حجرة البطارية كانت بتتقفّل بسهولة وفجأة بقت صعبة — ده علامة واضحة إن البطارية اتضخمت</li>
    <li><strong>البطارية بارزة من مكانها:</strong> ممكن تلاقي البطارية بتبرز من مكانها أو في "حدبة" ظاهرة على الجانب</li>
    <li><strong>السكوتر مش بيشتغل بانتظام:</strong> إتصال كهربائي متقطع ممكن يكون بسبب البطارية المنتفخة اللي بيتضغط على الوصلات</li>
    <li><strong>ريحة غريبة أثناء الشحن:</strong> الإلكتروليت المتحلل بيطلع ريحة حلوة أو حامضة خفيفة — مش نفس ريحة البلاستيك الساخن</li>
    <li><strong>البطارية فقدت سعة كتير وبسرعة:</strong> لو فجأة السكوتر اللي كان يعمل 20 كيلو بقى يعمل 10 من غير سبب واضح</li>
</ul>

<div style="background:#fef2f2;border-right:4px solid #dc2626;padding:16px 20px;margin:24px 0;border-radius:8px;">
    <p style="margin:0 0 8px 0;font-weight:bold;color:#991b1b;">تحذير خطير جداً — لو البطارية انتفخت:</p>
    <ul style="margin:0;padding-right:20px;color:#7f1d1d;line-height:1.8;">
        <li><strong>وقف الاستخدام فوراً</strong> — متركبش السكوتر ومتشغّلوش</li>
        <li><strong>متشحنهاش أبداً</strong> — الشحن على بطارية منتفخة ممكن يسبب Thermal Runaway (حريق لا يُطفأ بالمية)</li>
        <li><strong>طلّعها برّة البيت</strong> — حطها في مكان مفتوح بعيد عن المواد القابلة للاشتعال</li>
        <li><strong>متحطهاش في عربية مقفولة</strong> — الحرارة الزيادة ممكن تكون الشرارة اللي تحرق العربية</li>
        <li><strong>روح بيها لورشة متخصصة</strong> — البطارية المنتفخة محتاجة تتخلص منها بطريقة صح، ومحتاج تشتري بطارية بديلة أصلية</li>
    </ul>
</div>

<h2>الـ Power Bank والسكوتر — إيه اللي يشتغل وإيه اللي ملوش لازمة</h2>

<p>سؤال بيتسأل كتير: "أقدر أشحن السكوتر من باور بانك؟" الإجابة: <strong>يعتمد على السكوتر بالظبط</strong>.</p>

<p>السكوترات الصغيرة (العجلة المتكاملة — Hub Motor Scooters) زي بعض موديلات Xiaomi و Segway — عندها منفذ USB-C بيشحن البطارية الصغيرة اللي بتشغّل الأضواء والإلكترونيات. <strong>مش البطارية الرئيسية اللي بتحرّك السكوتر.</strong></p>

<p>السكوترات ذات البطاريات الكبيرة (36-48 فولت) — الشاحن بتاعها بيدي فولت 42-54.6 فولت. أي <a href="/anker/power-banks" style="color:#2563eb;font-weight:600;">باور بانك</a> — حتى الأقوى — بيدي 5-20 فولت بحد أقصى. الفولت مش بيتطابق خالص ومفيش طريقة تشحن البطارية الرئيسية منه.</p>

<p>الملخص: لو في المانيوال مكتوب "can charge via USB-C" أو في منفذ USB على السكوتر — جرّب. لو مكتبتش شيء، الـ power bank مش هيشحن البطارية الرئيسية وهيبقى مضيعة وقت.</p>

<h2>ضوء الشحن — إيه معناه؟</h2>

<p>معظم السكوترات بيستخدموا نظام LED بسيط:</p>

<ul>
    <li><strong>أحمر ثابت:</strong> جاري الشحن</li>
    <li><strong>أخضر ثابت:</strong> شحن مكتمل — افصله!</li>
    <li><strong>أحمر وامض:</strong> في مشكلة — ممكن يكون حرارة زيادة، خطأ في الشاحن، أو بطارية فيها عطل</li>
    <li><strong>مفيش ضوء خالص:</strong> مشكلة في الكابل أو الشاحن أو البطارية نفسها</li>
</ul>

<p>لو شوفت ضوء أحمر وامض — افصل الشاحن على طول واستنّى البطارية تبرد. لو المشكلة فضلت، خد السكوتر لورشة متخصصة.</p>

<h2>أفضل أوقات الشحن في مصر الصيف</h2>

<p>في مصر، مش بس المكان مهم — التوقيت كمان مهم جداً:</p>

<ul>
    <li><strong>6 الصبح — 10 الصبح:</strong> أحسن وقت. الجو لسه معقول (28-32 درجة)، والسكوتر برد من آخر استخدام بالأمس</li>
    <li><strong>10 الصبح — 5 المساء:</strong> تجنّب الشحن فيه لو ممكن — خصوصاً في يوليو وأغسطس</li>
    <li><strong>7 المساء — 12 الليل:</strong> كويس — الجو بيبرد، اشحن واتابع لحد ما يوصل 100% وافصله</li>
    <li><strong>بعد 12 الليل:</strong> لو هتنام وتسيبه يتشحن — ده الوقت الأأمن من ناحية الحرارة، بس لازم الشاحن الأصلي اللي بيوقف تلقائياً</li>
</ul>

<div style="background:#f9fafb;border:1px solid #e5e7eb;border-right:4px solid #059669;padding:20px;margin:32px 0;border-radius:8px;">
    <p style="margin:0 0 8px 0;font-weight:bold;color:#065f46;">نصيحة إضافية للمحترفين:</p>
    <p style="margin:0;color:#374151;line-height:1.7;">لو عندك سكوتر بشاشة بتعرض درجة حرارة البطارية — لازم تكون تحت 40 درجة قبل ما تبدأ الشحن. لو مش عارف تقيس الحرارة، لمّس الهيكل من تحت بجانب البطارية — لو حساسك للحرارة، استنّى. الخام أسوأ في الإحساس بالحرارة لو كان محمياً بغطاء بلاستيك.</p>
</div>

<h2>الخلاصة — 3 دقايق تحمي سنين</h2>

<p>البطارية في السكوتر الكهربائي مش بتحتاج عناية كتير — بس المشاكل اللي بتحصل دايماً بتكون بسبب غلطات بسيطة بتتراكم. إنت لو اتبعت 3 قواعد بس:</p>

<ol>
    <li>استنّى 30 دقيقة بعد الركوب قبل الشحن</li>
    <li>افصل من الكهرباء لما يوصل 100%</li>
    <li>اشحن في وقت الجو معقول — بكرة الصبح أو بعد الغروب</li>
</ol>

<p>هتضمن إن البطارية تعيش 2-3 سنين بدون مشاكل. أي <a href="/anker/power-banks" style="color:#2563eb;font-weight:600;">باور بانك</a> أو اكسسوار شحن تاني بتشتريه — اسأل دايماً: "هل ده موافق لمواصفات جهازي؟" مش بس السعر.</p>`,
            faq: [
                {
                    question: 'إيه علامات إن بطارية السكوتر بدأت تنتفخ؟',
                    answer: 'أوضح العلامات هي: غطاء حجرة البطارية بيبقى صعب يتسكّر (البطارية اتضخمت جوا)، أو في حدبة ظاهرة على جسم البطارية، أو ريحة غريبة حلوة/حامضة أثناء الشحن، أو السكوتر فقد سعة كبيرة فجأة. لو لاحظت أي حاجة من دول، افصل الشاحن فوراً ومتشحنش تاني لحد ما تاخده لأهل التخصص.'
                },
                {
                    question: 'هل ممكن أشحن السكوتر بـ power bank؟',
                    answer: 'يعتمد على السكوتر. لو عنده منفذ USB-C والمانيوال بيقول "charge via USB-C" — الباور بانك يشحن الإلكترونيات أو بطارية صغيرة فيه. لكن معظم السكوترات بطاريتها الرئيسية شغّالة على 36-48 فولت، والباور بانك بيدي 5-20 فولت بحد أقصى — الفولت مش مناسب خالص وملوش لازمة. الشاحن الأصلي هو الوحيد اللي يشحن البطارية الرئيسية.'
                },
                {
                    question: 'كام مرة في اليوم أقدر أشحن السكوتر؟',
                    answer: 'مرة واحدة في اليوم كافية ومناسبة لمعظم الاستخدام. الشحن المتكرر في نفس اليوم مش خطير في حد ذاته، بس كل دورة شحن بتستهلك جزء بسيط من عمر البطارية. المهم مش عدد المرات بقدر ما هو الحرارة والطريقة. اشحن لما تحتاج، استنّى يبرد، واستخدم الشاحن الأصلي.'
                },
                {
                    question: 'بطارية السكوتر بتشحن كتير — ده بيأثر على عمرها؟',
                    answer: 'أيوا، كل دورة شحن بتقلل من سعة البطارية الإجمالية بنسبة ضئيلة جداً (حوالي 0.05-0.1% للدورة). بعد 500 دورة، ممكن البطارية تفضل 85-90% من سعتها الأصلية. عشان تطوّل عمرها: متشحنش فوق 100%، ومتفرّغهاش تحت 10% بانتظام، والحرارة هي العدو الأكبر أكتر من عدد الشحنات.'
                },
            ],
        },
        en: {
            title: 'Electric Scooter Battery Swelling? Safe Charging Rules to Protect Your Battery from Damage',
            metaTitle: 'Electric Scooter Battery Swelling? Safe Charging Guide | CairoVolt',
            metaDescription: 'Why does your electric scooter battery swell in Egypt\'s heat? Learn the 6 safe charging rules, warning signs of a swollen battery, and what to do if it swells — fire risk explained.',
            keywords: 'electric scooter battery swelling, scooter battery safety Egypt, safe scooter charging rules, lithium battery swollen scooter, scooter charger Egypt, scooter battery fire risk, electric scooter Egypt summer, scooter charging tips',
            excerpt: 'Electric scooter batteries are heat-sensitive — and Egyptian summers double the stress. Learn how to charge safely, what danger signs to watch for, and what to do if the battery swells before it becomes a fire hazard.',
            quickAnswer: 'Scooter batteries swell when charged while hot or overcharged past 4.2V per cell. In Egypt, charge your scooter before 10am or after sunset, never leave it charging overnight unattended, and unplug at 100%. If the battery swells, stop use immediately — this is a real fire risk.',
            content: `<p>The electric scooter has become an essential mode of transport for many Egyptians — whether for the last mile to the metro station or navigating back alleys. But one problem keeps costing people money, and sometimes far worse: the battery that swells, or worse, catches fire.</p>

<p>In Egypt, this problem is amplified in summer. When it's 40°C outside and you've been riding for two hours, your battery can reach 50-55°C internally. If you plug it in to charge immediately — you're hitting the battery with a double stress. This article explains exactly what's happening physically, what the safe rules are, and how to recognize warning signs before something goes seriously wrong.</p>

<div style="background:#eff6ff;border-left:4px solid #2563eb;padding:16px 20px;margin:24px 0;border-radius:8px;">
    <p style="margin:0;font-size:16px;line-height:1.7;color:#1e40af;">
        <strong>Quick Answer:</strong> Scooter batteries swell when charged while hot or overcharged past 4.2V per cell. In Egypt, charge before 10am or after sunset, never leave it charging overnight unattended, and unplug at 100%. If the battery swells, stop use immediately — this is a real fire risk that requires immediate action.
    </p>
</div>

<h2>Why Do Scooter Batteries Swell? The Simple Science</h2>

<p>The lithium battery inside a scooter consists of stacked cells working together. Each cell operates on an electrochemical principle: lithium ions move between electrodes during charging and discharging. The cell works perfectly when its voltage stays between 2.5V (empty) and 4.2V (full).</p>

<p>Swelling happens for two main reasons:</p>

<p><strong>Reason 1 — Overcharging:</strong> When a charger continues pushing current after a cell reaches 4.2V, the excess voltage stresses the internal crystal structure through a process called lithium plating. Lithium ions accumulate on the electrode as a metallic layer instead of inserting into the structure. This layer generates internal gas that pushes against the cell walls — causing them to bulge outward. It doesn't happen from one session, but accumulates over time when the charger doesn't cut off precisely at 100%.</p>

<p><strong>Reason 2 — Excessive Heat:</strong> Lithium batteries charge safely between 0°C and 45°C. Above 45°C, chemical reactions accelerate in an uncontrolled way — like turning a gas burner to maximum. The electrolyte (the chemical liquid inside the cell) begins to decompose and produce gases. These gases accumulate and inflate the cell.</p>

<h2>Egypt's Specific Summer Problem — Double Heat Stress</h2>

<p>In July and August in Cairo, outdoor temperatures can reach 42-45°C. A scooter that's been sitting in direct sun or ridden for two hours — its external shell can reach 60-70°C, and the battery inside can be at 50-55°C.</p>

<p>If you plug it in to charge at that moment, you're hitting the battery with two simultaneous stresses:</p>

<ul>
    <li>The charging process itself generates heat (electrochemical reaction)</li>
    <li>The external heat from the ambient environment and the hot chassis</li>
</ul>

<p>Result: internal battery temperature can exceed 60°C — which is precisely the red zone where damage begins accelerating rapidly.</p>

<div style="background:#f9fafb;border:1px solid #e5e7eb;border-left:4px solid #059669;padding:20px;margin:32px 0;border-radius:8px;">
    <p style="margin:0 0 8px 0;font-weight:bold;color:#065f46;">Expert Note:</p>
    <p style="margin:0;color:#374151;line-height:1.7;">What happens to scooter batteries in Egyptian summers isn't an exception — it's the rule. The overwhelming majority of swelling cases occur between June and August, and the primary cause is almost always charging while hot. The solution is simple: 30 minutes of cool-down time before charging changes everything.</p>
</div>

<h2>The 6 Safe Charging Rules — Full Details</h2>

<table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:15px;">
    <thead><tr style="background:#f3f4f6;">
        <th style="padding:12px;border:1px solid #d1d5db;text-align:left;">Rule</th>
        <th style="padding:12px;border:1px solid #d1d5db;text-align:left;">Why It Matters</th>
        <th style="padding:12px;border:1px solid #d1d5db;text-align:left;">Egypt-Specific Risk</th>
    </tr></thead>
    <tbody>
    <tr>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>Never charge in a hot enclosed space</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;">Ambient heat compounds charging heat</td>
        <td style="padding:12px;border:1px solid #d1d5db;color:#dc2626;">July balcony = 50°C+ = fire hazard</td>
    </tr>
    <tr>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>Wait 30 minutes after riding</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;">Battery needs to cool below 35°C</td>
        <td style="padding:12px;border:1px solid #d1d5db;color:#dc2626;">Ambient 42°C means 30 min may not be enough</td>
    </tr>
    <tr>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>Unplug when it reaches 100%</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;">Charging past 100% = overcharging = swelling</td>
        <td style="padding:12px;border:1px solid #d1d5db;color:#dc2626;">Overnight charging = hours past the limit</td>
    </tr>
    <tr>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>Don't regularly drain below 10%</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;">Deep discharge damages chemical structure</td>
        <td style="padding:12px;border:1px solid #d1d5db;">Heat increases power draw — battery drains faster in summer</td>
    </tr>
    <tr>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>Store at 50-60% if unused for weeks</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;">Storage at 0% or 100% accelerates degradation</td>
        <td style="padding:12px;border:1px solid #d1d5db;">Hot garage storage = compounded damage</td>
    </tr>
    <tr>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>Use only the original charger</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;">Voltage must match battery specifications precisely</td>
        <td style="padding:12px;border:1px solid #d1d5db;color:#dc2626;">Third-party charger = unregulated voltage = danger</td>
    </tr>
    </tbody>
</table>

<h2>Rule 1 in Depth — Never Charge in a Hot Enclosed Space</h2>

<p>This seems obvious, but many people get it wrong. A balcony in July is not a safe charging location — temperatures there can reach 50-55°C in the afternoon. A closed garage is worse. Even a room with the windows shut and no air conditioning.</p>

<p>The solution: charge in an air-conditioned room, or at minimum in a ventilated space. If you don't have air conditioning, the best charging windows in Egyptian summers are:</p>

<ul>
    <li>6am to 10am — before the heat peaks</li>
    <li>7pm onwards after sunset — when ambient temperatures start dropping</li>
    <li>Avoid charging between 11am and 5pm in July and August</li>
</ul>

<h2>Rule 2 in Depth — Wait 30 Minutes After Riding</h2>

<p>When you ride the scooter, the motor draws heavy current from the battery. This generates internal heat. Under normal weather conditions, this is manageable — the battery reaches 35-40°C after an hour of riding. In Egyptian summer conditions, it can hit 50°C or higher.</p>

<p>If you plug it in immediately, the charging process adds its own heat on top of an already-hot battery. Thirty minutes of rest allows the battery to cool to 35-38°C — which is within the safe charging zone. This isn't a luxury — it's practical protection that extends battery life measurably.</p>

<h2>Rule 3 in Depth — Unplug at 100%</h2>

<p>Most scooters have a BMS (Battery Management System) that automatically stops charging at 100%. But there's a problem: some lower-quality chargers continue passing a small trickle current even after reaching 100% — and this is the primary driver of overcharging damage over time.</p>

<p>The safest approach is to not leave the scooter charging overnight unattended. Charging from 20% to 100% typically takes 3-5 hours for an average scooter. If you sleep 8 hours with it plugged in, you've added 3-4 hours of unnecessary stress. One or two instances won't cause noticeable damage — but doing it every night for months significantly shortens battery life.</p>

<h2>Rule 4 in Depth — Don't Regularly Drain Below 10%</h2>

<p>Lithium batteries degrade from deep discharge. When a cell drops below 2.5V, a process called copper dissolution begins — the copper inside the electrode starts to corrode. This causes permanent capacity loss that cannot be recovered.</p>

<p>The practical rule: start charging when you hit 15-20%, don't wait until it reaches 5% or lower. In summer, heat itself increases power consumption — the motor works harder in the heat, so the battery depletes faster than you might expect from your winter riding habits.</p>

<h2>Rule 5 in Depth — Store at 50-60% If Unused</h2>

<p>If you're leaving the scooter unused for a week or more (vacation, for example), don't leave it at 0% or 100%.</p>

<p>At 0%: the cell enters a deep discharge state — after some time, it may become unable to accept a charge at all, permanently damaged. At 100%: storage at full charge stresses the electrolyte and accelerates degradation through a process called lithium dendrite growth. The sweet spot is 50-60% — this leaves the battery in a chemically balanced state that minimizes degradation during storage.</p>

<h2>Rule 6 in Depth — Original Charger Only</h2>

<p>This isn't marketing talk. Every scooter comes with a charger specifically designed for its battery's specifications. For example:</p>

<ul>
    <li>A scooter with a 48V battery — its charger outputs 54.6V (the full charge voltage for 48V lithium packs)</li>
    <li>A scooter with a 36V battery — its charger outputs 42V</li>
</ul>

<p>If you use a "similar" charger that isn't the original, the voltage could be 10-15% higher or lower. Higher voltage damages the battery immediately. Lower voltage means it never fully charges. No BMS, however good, can compensate for a fundamentally wrong charger voltage.</p>

<h2>Signs That a Battery Is Starting to Swell</h2>

<p>A swollen battery isn't always obvious at first glance. There are early warning signs that appear before a catastrophic failure:</p>

<ul>
    <li><strong>Battery compartment cover becomes difficult to close:</strong> If it used to close easily and suddenly it's hard — the battery has expanded inside</li>
    <li><strong>Battery visibly bulging from its housing:</strong> You may notice a visible bulge or protrusion on the battery surface or sides</li>
    <li><strong>Inconsistent scooter operation:</strong> Intermittent electrical contact issues can be caused by a swollen battery pressing against connectors</li>
    <li><strong>Strange smell during charging:</strong> Decomposing electrolyte releases a faint sweet or acidic odor — distinct from normal hot plastic smell</li>
    <li><strong>Sudden significant range loss:</strong> If a scooter that used to do 20km now only manages 10km with no other explanation</li>
</ul>

<div style="background:#fef2f2;border-left:4px solid #dc2626;padding:16px 20px;margin:24px 0;border-radius:8px;">
    <p style="margin:0 0 8px 0;font-weight:bold;color:#991b1b;">Critical Warning — If the Battery Has Swollen:</p>
    <ul style="margin:0;padding-left:20px;color:#7f1d1d;line-height:1.8;">
        <li><strong>Stop using it immediately</strong> — do not ride the scooter or power it on</li>
        <li><strong>Do not charge it under any circumstances</strong> — charging a swollen battery can trigger Thermal Runaway, a self-sustaining fire that cannot be extinguished with water</li>
        <li><strong>Move it outdoors</strong> — place it in an open area away from flammable materials</li>
        <li><strong>Do not store it in a closed vehicle</strong> — trapped heat can be the trigger that starts a fire that destroys the entire car</li>
        <li><strong>Take it to a specialist repair shop</strong> — a swollen battery must be disposed of properly, and you need an authentic replacement battery</li>
    </ul>
</div>

<h2>Power Banks and Scooters — What Works and What Doesn't</h2>

<p>A frequently asked question: "Can I charge my scooter from a power bank?" The answer: <strong>it depends entirely on the specific scooter</strong>.</p>

<p>Small scooters (hub motor type, like some Xiaomi and Segway models) may have a USB-C port — but this charges a small auxiliary battery that powers the lights and display electronics. <strong>It does not charge the main propulsion battery.</strong></p>

<p>Scooters with large main batteries (36-48V systems) — their chargers output 42-54.6V. Any <a href="/en/anker/power-banks" style="color:#2563eb;font-weight:600;">power bank</a>, even the most powerful ones, outputs 5-20V maximum. The voltage is completely incompatible — there is no way to charge the main battery from a power bank.</p>

<p>Summary: if the manual specifically says "can charge via USB-C" or there's a labeled USB charging port — a power bank may work for accessories. If the manual says nothing about USB charging, a power bank cannot replace the main charger.</p>

<h2>Understanding Charging Indicator Lights</h2>

<p>Most scooters use a simple LED indicator system:</p>

<ul>
    <li><strong>Solid red:</strong> Charging in progress</li>
    <li><strong>Solid green:</strong> Charging complete — unplug now</li>
    <li><strong>Flashing red:</strong> Problem detected — could be overheating, charger fault, or battery error</li>
    <li><strong>No light at all:</strong> Issue with the cable, charger, or battery itself</li>
</ul>

<p>If you see flashing red: disconnect the charger immediately and let the battery cool for 30 minutes. If the problem persists after reconnecting, take the scooter to a specialist rather than guessing at the cause.</p>

<h2>Best Charging Times in Egyptian Summers</h2>

<p>In Egypt, not only the location matters — timing is equally critical:</p>

<ul>
    <li><strong>6am – 10am:</strong> Best window. Ambient temperature is still reasonable (28-32°C), and the scooter has cooled overnight from its last use</li>
    <li><strong>10am – 5pm:</strong> Avoid if possible — especially July and August at the peak of the heat</li>
    <li><strong>7pm – midnight:</strong> Good — ambient temperature is dropping. Charge and monitor until 100%, then unplug</li>
    <li><strong>After midnight:</strong> If you must charge while sleeping, this is the coolest window — but only if you're using the original charger that stops automatically at 100%</li>
</ul>

<h2>The Summary — 3 Rules That Protect Years of Battery Life</h2>

<p>The scooter battery doesn't require complicated maintenance — but the problems that occur almost always stem from simple habits that accumulate over time. If you follow just three rules consistently:</p>

<ol>
    <li>Wait 30 minutes after riding before charging</li>
    <li>Unplug when it reaches 100%</li>
    <li>Charge during cooler hours — early morning or after sunset</li>
</ol>

<p>You'll protect your battery for 2-3 years of reliable service. For any <a href="/en/anker/power-banks" style="color:#2563eb;font-weight:600;">power bank</a> or other charging accessory you buy, always ask: "Is this matched to my device's specifications?" — not just "What's the price?"</p>`,
            faq: [
                {
                    question: 'What are the signs that a scooter battery is starting to swell?',
                    answer: 'The clearest signs are: the battery compartment cover becomes difficult or impossible to close (the battery has expanded inside), a visible bulge or protrusion on the battery body, a strange sweet or acidic smell during charging (different from normal hot plastic), or a sudden significant drop in range with no other explanation. If you notice any of these signs, disconnect the charger immediately and don\'t charge it again until you\'ve had it inspected by a specialist.'
                },
                {
                    question: 'Can I charge a scooter with a power bank?',
                    answer: 'It depends on the scooter. If it has a USB-C port and the manual specifically says it can charge via USB-C, a power bank may charge the auxiliary electronics or a small secondary battery. However, most scooters\' main propulsion batteries operate at 36-48V, while any power bank outputs a maximum of 5-20V — the voltage is completely incompatible. Only the original charger can charge the main battery.'
                },
                {
                    question: 'How many times per day can I charge the scooter?',
                    answer: 'Once per day is sufficient for most usage patterns. Charging multiple times in the same day isn\'t inherently dangerous, but each charge cycle consumes a small amount of battery life. What matters more than frequency is temperature — charging while hot causes far more damage than charging frequently at normal temperatures. Charge when you need to, let it cool first, and use the original charger.'
                },
                {
                    question: 'My scooter battery charges frequently — does that affect its lifespan?',
                    answer: 'Yes, each charge cycle slightly reduces overall battery capacity (roughly 0.05-0.1% per cycle). After 500 cycles, the battery may retain 85-90% of its original capacity. To extend lifespan: don\'t charge past 100%, don\'t regularly drain below 10%, and treat heat as your main enemy — heat causes more damage than any number of charge cycles at safe temperatures.'
                },
            ],
        },
    },
};
