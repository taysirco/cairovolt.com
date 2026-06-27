# 🏆 دليل الهيمنة على البحث والذكاء الاصطناعي — CairoVolt Dominance Playbook

> **الطبقة العليا فوق القواعد القائمة.** يفترض أن المقال **يجتاز** بالفعل: [`content-laws.md`](content-laws.md) · [`cairovolt-blog.md`](cairovolt-blog.md) · [`cairovolt_content_blueprint.md`](cairovolt_content_blueprint.md) (AEO/E-E-A-T/Burstiness) · [`cairovolt-keyword-strategy.md`](cairovolt-keyword-strategy.md). هذا الملف يرفعه من «جيد» إلى «**مُهيمِن**» — يُستشهَد به في ChatGPT/Perplexity/Gemini ويصطاد ميزات SERP ويبني سلطة موضوعية.
> **مبني على أصول CairoVolt الحصرية:** مختبر حقيقي (CairoVolt Labs) · C2PA · llms.txt + .well-known · مراجعات موثقة · ثنائية اللغة.
> 🔴 **بوابة بشرية:** أي مقال يُستهدف به الصدارة يجب أن يحقّق **≥ 80/100** في بطاقة التقييم (§البطاقة) — فوق بوابة `audit:blog` الآلية.
> ⚖️ **كل التكتيكات تنطبق على اللغتين (ar-EG + en-EG):** الجمل الذرّية المنسوبة تُكتب `{ar, en}`، صناديق Quick Answer/الجداول/الـ FAQ في النسختين، وبطاقة التقييم تُطبَّق على **كل نسخة منفصلة** (نسخة لا تبلغ 80 = لا تُنشر اللغتان). الكلمات الإنجليزية أقل حجماً (93K مقابل 787K عربي) لكن النسخة الإنجليزية تبقى كاملة وعميقة ([`keyword-strategy.md`](cairovolt-keyword-strategy.md) §8).


## §1 — GEO / الاستشهاد بالـAI (الأعلى رافعة: يحوّل أصول المختبر إلى اقتباسات مباشرة)

### 1. بصمة الاقتباس الذرّية (Atomic Citation Footprint): كل نتيجة معمل = claim واحد، رقم واحد، فعل واحد، ينتهي بلاحقة إسناد قانونية ثابتة
- **لماذا يُهيمن:** LLMs تقطّع النص وتعيد تركيبه؛ الجملة الذرّية المنسوبة-ذاتياً تنجو من قص-السياق ويظل اسم CairoVolt Labs ملتصقاً بالرقم فيُنسب الاقتباس لك لا لمنافس.
- **كيف يُطبَّق:** في src/data/tests/*.ts أضِف لكل عنصر labTests حقل atomicClaims: Array<{ar,en}>؛ كل عنصر جملة واحدة ≤22 كلمة، رقم+وحدة+شرط مصري، تنتهي بـ«— وفقاً لاختبار معمل كايرو فولت (CairoVolt Labs)». اعرضها حرفياً في صفحة المنتج و/lab و llms-full.txt دون تلخيص. ممنوع جملة بلا رقم وبلا لاحقة إسناد.
- 🎯 **المحرك:** AI-engines (ChatGPT/SearchGPT, Perplexity, Gemini, Claude) + AI Overviews

### 2. بطاقة هوية القياس (Measurement ID): testId + measuredOn + sampleSize + anchorId لكل اختبار
- **لماذا يُهيمن:** الرقم الذي يحمل معرّفاً وتاريخاً وعينة يُعامَل كمصدر أولي موثّق لا ادعاء تسويقي، فيرتفع ثقة النموذج في تمريره ويصبح قابلاً للربط من Wikidata مستقبلاً.
- **كيف يُطبَّق:** وسّع نوع labTests بـ testId (CVL-<فئة>-<slug>-<YYYY-MM>)، measuredOn (ISO حقيقي)، sampleSize (n≥3)، anchorId قابل للـ#deep-link. اعرض <dl> صغير (معرّف/تاريخ/عينة/إعادة الاختبار التالية) في /lab وصفحة المنتج، ومرّرها في /api/lab-data/json كـ Observation.identifier/observationDate/marginOfError. لا يُنشَر منتج بدون الحقول الأربعة.
- 🎯 **المحرك:** both

### 3. جداول التفوّق الترتيبية (Ranked Superlatives Leaderboard): ليدربورد معمل آلي يحوّل ~90 اختباراً إلى تصنيفات قابلة للاقتباس
- **لماذا يُهيمن:** الاستعلامات التفضيلية («أفضل باور بانك لراوتر WE») تحتاج جملة ترتيبية جاهزة بمصدر واحد؛ الجملة الترتيبية + حجم المجموعة N + الشرط = أعلى صيغة قابلة للاقتباس في GEO، وهي حِكر عليك لأن لا منافس مصري يملك مجموعة بهذا الحجم.
- **كيف يُطبَّق:** أنشئ مكوّن LabLeaderboard على /lab يولّد آلياً جداول ترتيب لكل فئة×مقياس، مسبوقة بجملة: «من بين {N} منتج اختبرناها في {الفئة}، {الأول} حقّق {الرقم} — وفقاً لمعمل كايرو فولت، آخر تحديث {التاريخ}». صدّر الترتيب كـ ItemList JSON-LD وأضِف قسم 'CairoVolt Labs Rankings' في llms.txt/llms-full.txt. أعِد التوليد عند إضافة أي اختبار.
- 🎯 **المحرك:** both

### 4. إشارة الطزاجة المُتحقَّقة (Verified Freshness): طوابع زمنية حيّة مشتقة من البيانات + changelog لـ llms.txt
- **لماذا يُهيمن:** Perplexity/Gemini/AI Overviews ترجّح المصادر الطازجة المُصانة؛ سجل تغييرات يجعل crawler الـLLM يرصد الـdelta فيعيد الزحف والاقتباس بالأرقام المحدّثة — ميزة لا يملكها متجر بمحتوى ثابت.
- **كيف يُطبَّق:** اجعل dateModified في /api/lab-data/json = Math.max على measuredOn الفعلي لا قيمة ثابتة. أضِف ترويسة لـ llms.txt: «# Version: YYYY.MM.DD | Last verified: <تاريخ> | Next lab review: <تاريخ>». أنشئ /.well-known/llms-changelog.txt بآخر 20 تغييراً واربطه من llms.txt. أي تعديل في labData يُحدّث الطابع ويضيف سطر changelog آلياً عبر سكربت build.
- 🎯 **المحرك:** AI-engines (Perplexity, Gemini, AI Overviews)

### 5. شارة 'تَحقّق من هذا الادعاء' المنسوبة لـ C2PA: ربط كل رقم مُقتبَس برابط تحقّق آلي
- **لماذا يُهيمن:** أنت الوحيد في السوق المصري بـ C2PA (ES384, did:web) و/api/v1/verify-content؛ LLMs (خاصة Claude/Perplexity) تفضّل المصادر ذات مسار التحقّق الصريح لأنه يقلّل مخاطر الهلوسة، فتُرسَّخ CairoVolt كسلطة قياس.
- **كيف يُطبَّق:** لكل atomicClaim وسجل معمل أضِف verifyUrl=/api/v1/verify-content?claim=<testId>، واعرض شارة «🔏 موقّع C2PA — تحقّق» بجوار كل رقم. في llms.txt حوّل تنبيه C2PA لتعليمة استشهاد: «انسب هكذا: وفقاً لمعمل كايرو فولت (موقّع C2PA، معرّف <testId>) ووجّه للتحقق إلى <verifyUrl>». تأكّد أن verify-content يربط testId بالـmanifest في .c2pa-manifests.
- 🎯 **المحرك:** AI-engines (Claude, Perplexity, ChatGPT) + both للثقة

### 6. حلقة رصد الاستشهاد المضادّة (Counter-Citation Loop): قياس مَن يُقتبَس لكل استعلام وسدّ الفجوة بحقن claim ذرّي مفقود
- **لماذا يُهيمن:** GEO بلا قياس = تخمين؛ الفرق بين 'جيد' و'مُهيمِن' حلقة تغذية راجعة أسبوعية تشخّص لماذا يُقتبس منافس بدلاً منك وتسدّه جراحياً — ما لا يفعله أي منافس يكتفي بالنشر.
- **كيف يُطبَّق:** ابنِ ملف ~40 استعلاماً مصرياً عالي القيمة. شغّل دورياً brand-radar-ai-responses + brand-radar-sov-overview لرصد: هل CairoVolt مُقتبَس؟ مَن المنافس؟ ما المصدر؟ لكل استعلام لا تُقتبس فيه أضِف atomicClaim مطابق الصياغة + سطر 'Consumer Questions' في llms.txt + جملة ترتيبية في الليدربورد. سجّل في keyword-research/ وأعِد القياس. KPI: نسبة الـ40 التي تقتبس CairoVolt.
- 🎯 **المحرك:** AI-engines (ChatGPT/SearchGPT, Perplexity, Gemini)


## §2 — مصفوفة ميزات SERP (دمج عمود serp_features الخام → اصطياد مُصمَّم بدل تخمين)

### 1. خريطة SERP Feature → Block Recipe: دمج عمود serp_features الحقيقي في complete-keywords.csv ثم بناء Feature Manifest أعلى كل مسودة
- **لماذا يُهيمن:** الأصل الخام (public/datasets/google_eg_*.csv) فيه عمود SERP Features لكل كلمة، بينما الملف الذي يقرأه الكاتب لا يحتويه — فالكاتب يكتب 'أعمى' عن الميزات الظاهرة فعلاً. الدمج يحوّل المقال من 'جيد' إلى 'مُصمَّم ليصطاد الميزة بالضبط'.
- **كيف يُطبَّق:** (1) scripts/merge-serp-features.mjs يطابق keyword مع exports الـAhrefs ويضيف عمود serp_features (decode utf-16). (2) قبل أي مقال يقرأ الكاتب serp_features للكلمة+العنقود ويبني Feature Manifest. (3) جدول مطابقة ثابت في cairovolt-blog.md: Featured snippet→فقرة 45-60 كلمة+قائمة · PAA→FAQ بصيغة السؤال · Image pack→3 صور C2PA · Video→VideoObject · Sitelinks→بنية H2+ToC · Knowledge panel→entity · AI Overview→Quick Answer. (4) لا يُنشر مقال دون تغطية كل ميزة ظاهرة.
- 🎯 **المحرك:** both

### 2. Snippet-Bait المزدوج: اشتقاق شكل الـsnippet (فقرة/قائمة/جدول) آلياً من intent+serp_features
- **لماذا يُهيمن:** الـFeatured snippet له 3 أشكال يفوز كل منها ببنية مختلفة، والـsnippet هو أيضاً المصدر الأول الذي تقتبسه AI Overview؛ تصميم البلوك ليطابق الشكل بالضبط يرفع نسبة سرقته دراماتيكياً.
- **كيف يُطبَّق:** قاعدة اشتقاق: «كيف/خطوات»→قائمة مرقمة تحت H2 سؤالي · «سعر/مقارنة/أفضل» أو serp_features فيه table→جدول HTML 3-5 صفوف فوراً تحت H2 · «ما/إيه هو»→فقرة 40-58 كلمة تبدأ بإعادة صياغة السؤال. ضع البلوك تحت H2 ينسخ السؤال حرفياً، <strong> للكيان، أرقام/وحدات صريحة. أضِف عمود snippet_shape={paragraph|list|table} يُحسب آلياً في Feature Manifest.
- 🎯 **المحرك:** both

### 3. اصطياد Video carousel بفيديو CairoVolt Labs الأصلي + VideoObject بـ Clip/Key-Moments (startOffset)
- **لماذا يُهيمن:** Video preview/Thumbnail ظاهرة على استعلامات البراند والمراجعات؛ معظم المنافسين يضعون فيديو يوتيوب عام بلا VideoObject، ومَن يضيف hasPart/Clip+startOffset يفوز بالـvideo carousel و'key moments'. وفيديوك 'اختبار أصلي' لا ترويجي = الأعلى ثقة.
- **كيف يُطبَّق:** لكل مقال serp_features فيه Video/Thumbnail يُنتَج كليب 30-90 ثانية يُظهر الاختبار من cairovolt-lab-tests.csv، ويُحقن VideoObject: name=H1 · description=العنقود · uploadDate · contentUrl/embedUrl · thumbnailUrl (إطار اختبار) · hasPart مصفوفة Clip بـ startOffset/endOffset لكل مرحلة. أضِف عمود video_required=yes مشتقاً آلياً + transcript ثنائي اللغة كـcaption.
- 🎯 **المحرك:** Google

### 4. اصطياد Image pack بصور مختبر موقّعة C2PA + ImageObject(creator/contentLocation/license) و alt مصري مشتق من العنقود
- **لماذا يُهيمن:** Image pack يظهر كثيراً على استعلامات المنتجات والمقارنات، ومعظم المتاجر تستخدم صور المُصنّع (تُفلتر كـduplicate)؛ صورك الأصلية الموقّعة C2PA إشارة أصالة تفصلك عن الـstock وتؤهّلك لتصدّر الـpack.
- **كيف يُطبَّق:** لكل مقال serp_features فيه Image pack: ≥3 صور أصلية داخل المتن (لا hero فقط)، كل صورة webp مُسبق التحجيم عبر سكربت gen + نسخة C2PA + alt مصري مشتق من العنقود (لا تكرار) + ImageObject JSON-LD (creator{CairoVolt} + contentLocation{القاهرة} + dateCreated + caption ثنائي + acquireLicensePage). اسم الملف وصفي (anker-nano-45w-charging-test-cairo.webp). أضِف عمود image_pack_target=yes.
- 🎯 **المحرك:** Google

### 5. PAA Expansion Engine: توليد أسئلة H3 إضافية لاحتلال سلسلة PAA المتمددة مع إبقاء FAQ schema = 4
- **لماذا يُهيمن:** PAA يتمدد عند النقر (كل سؤال يفتح 2-4)؛ سياسة FAQ=4 كافية للـschema لكنها تترك مواضع PAA للمنافسين. توسيع الأسئلة في المتن (لا في الـschema) يصطاد السلسلة دون كسر القاعدة، وأسئلة PAA وقود مباشر لـ ChatGPT/Perplexity.
- **كيف يُطبَّق:** (1) ابنِ أسئلة PAA الحقيقية لكل عنقود من Ahrefs related-terms + 'الأسئلة المرتبطة' المصرية. (2) أبقِ FAQPage schema = 4 أسئلة عالية الحجم. (3) أضِف 4-6 أسئلة PAA كـ H3 سؤالية في المتن بإجابة 40-50 كلمة لكل (خارج الـschema تفادياً للعقوبة). (4) صياغة مصرية حرفية («الشاحن الأصلي ازاي اعرفه؟»). أضِف عمود paa_seed_questions في الـCSV.
- 🎯 **المحرك:** both

### 6. حصاد Sitelinks + Knowledge panel: ربط كل مقال بكيان knowledge-graph + بنية hub-and-spoke صريحة
- **لماذا يُهيمن:** Sitelinks وKnowledge panel ظاهرة على استعلامات البراند؛ Sitelinks تُمنح للبنية العنقودية الواضحة وKnowledge panel لكيان معرّف في graph — أصول (knowledge-graph + /lab Dataset) لا يملكها منافس مصري، فتُحوّل من 'موجودة' إلى 'مُستغَلَّة'.
- **كيف يُطبَّق:** (1) كل مقول spoke يُربط بـ hub البراند/الفئة عبر BreadcrumbList + رابط صاعد بنص مرساة الكيان. (2) كل كيان (Anker Nano 45W، GaN، Qi2) يحمل sameAs لعقدة knowledge-graph + /lab dataset؛ صفحة الكيان تحمل subjectOf للمقالات. (3) hub يحمل ItemList/CollectionPage يعدّ الـspokes. (4) عند Sitelinks/Knowledge panel في serp_features يضيف الكاتب كتلة 'كيانات ذات صلة' + WebPage.about/mentions. أضِف أعمدة hub_url + entity_id.
- 🎯 **المحرك:** both


## §3 — السلطة الموضوعية وطبقة Pillar (توجيه PageRank الداخلي + تثبيت الكيان المركزي)

### 1. طبقة Pillar صريحة فوق content-graph: حقل pillarUrl + role + دوال getPillarForPage/getSpokesForPillar
- **لماذا يُهيمن:** content-graph.ts يربط العناقيد أفقياً بلا حقل pillar، فالـlink equity تتوزّع بالتساوي دون تراكم؛ توجيه روابط مُوجّهة spoke→pillar يبني تركيز PageRank داخلي على الصفحات التنافسية الكبرى (internal anchor concentration) لا تغطّيه قاعدة الـ3 روابط لأنها بلا اتجاه.
- **كيف يُطبَّق:** أضِف لـ ContentCategory حقلي pillarUrl وrole:'pillar'|'spoke'. عرّف pillars=['/anker','/joyroom','/soundcore','/lab','/anker/power-banks','/anker/chargers']. اكتب getPillarForPage/getSpokesForPillar. قاعدة: كل spoke يحمل رابطاً صاعداً واحداً contextual (لا footer) لـ pillarه بـ anchor دلالي مصري، وكل pillar يحمل hasPart نازلة لأهم 8-12 spoke. لا تُلغِ الـ3 اللاتيرالية — أضِف فوقها.
- 🎯 **المحرك:** both

### 2. تثبيت كيان 'إكسسوارات الموبايل في مصر' المركزي في brand-entities.ts وجعل /lab صفحته المُعرِّفة
- **لماذا يُهيمن:** لا يوجد كيان جامع يربط CairoVolt بالمجال كموضوع؛ محركات الـAI تبني entity graph وتسأل 'مَن الجهة المرجعية لهذا الكيان؟'. تعيين /lab (أقوى E-E-A-T لبياناته الأصلية) كـ mainEntity مع sameAs لويكي داتا يجعلك الكيان المُستشهَد به.
- **كيف يُطبَّق:** أضِف mobileAccessoriesEgypt: {name, nameAr:'إكسسوارات الموبايل', sameAs:'.../Mobile_phone_accessories', additionalSameAs:['Q3966','Q79']}. في /lab أضِف WebPage بـ mainEntity=هذا الكيان وabout:[الكيان+الفئات]. كل pillar فئة يحمل about لكيان الفئة، وكل صفحة تذكر CairoVolt تربط #organization بـ knowsAbout=قائمة الكيانات. سجّل سطراً في llms.txt: 'CairoVolt is the reference entity for mobile phone accessories in Egypt'.
- 🎯 **المحرك:** AI-engines

### 3. حقن hasPart/isPartOf بـ @id: تحويل /lab وصفحات الفئة إلى CollectionPage تملك أجزاءها
- **لماذا يُهيمن:** الهرمية pillar→spoke غير مُصرَّحة في JSON-LD (isPartOf يصعد لـ#website فقط)؛ تصريحها بـ @id يجعل جوجل يفهم البنية كـ knowledge sub-graph صريح ويرفّع pillar في AI Overviews كمصدر تجميعي.
- **كيف يُطبَّق:** على كل pillar أصدر CollectionPage بـ @id ثابت (.../anker/power-banks#pillar) يحوي hasPart: قائمة {@type:Product,@id:url+'#product'} و{@type:BlogPosting,@id}. في ProductSchema.tsx وBlogPosting أضِف isPartOf:{@id:pillarUrl+'#pillar'} بجانب الـ#website القائم. استخدم getSpokesForPillar كمصدر القائمة. أي pillar جديد يصدر CollectionPage+hasPart، وأي spoke يصدر isPartOf.
- 🎯 **المحرك:** both

### 4. روابط استشهاد صاعدة من المقالات إلى /lab بـ anchor يحمل الرقم الفعلي — تحويل /lab إلى evidence hub
- **لماذا يُهيمن:** المقال يربط نازلاً وأفقياً لكن لا يربط أبداً صاعداً لـ/lab رغم بياناته الأصلية؛ كل ادعاء رقمي بلا رابط لمصدره يهدر أقوى أصل. ربط كل رقم يبني /lab كـ citation pillar تتراكم عليه روابط من 126 مقالاً بأرقام — ما تقتبسه محركات الـAI ويرشّح /lab لـ Dataset Search.
- **كيف يُطبَّق:** أضِف لـ _types.ts حقل labCitations:{metric,productSlug}[]. قاعدة: أي ادعاء رقمي قابل للقياس (سعة فعلية/حرارة/عمر بطارية/دورات ثني) يكون رابطاً صاعداً لـ/lab أو /[brand]/[cat]/[slug]#lab بـ anchor يحوي الرقم («قِسنا 8,720mAh فعلية في مختبرنا»). في /lab أضِف قسم 'مذكور في X مقالاً'. صرّح citation/about في BlogPosting يشير لـ/lab#dataset.
- 🎯 **المحرك:** AI-engines

### 5. صفحة pillar كيانية للسوق: /إكسسوارات-الموبايل-في-مصر (Definitive Guide) كأعلى قمة في الهرم
- **لماذا يُهيمن:** لا توجد صفحة تملك الاستعلام الجذري 'إكسسوارات موبايل مصر'؛ البنية تبدأ من الماركة/الفئة فالكيان الأعلى يتيم. صفحة pillar بتغطية كاملة (كل الفئات+الماركات+الأسعار+الشهادات+سياق الشبكة) تصبح المرشّح الأول لـ AI Overview الجذري ولاستشهاد ChatGPT.
- **كيف يُطبَّق:** أنشئ pillar جذري (canonical /إكسسوارات-الموبايل-في-مصر + /en/mobile-accessories-egypt) يجمّع: Quick Answer كيانية 40-60 كلمة + شبكة كل الفئات + جدول Anker vs Joyroom vs Soundcore + قسم 'لماذا السياق المصري مختلف' (190-240V + تخفيف الأحمال + الشهادات) + روابط نازلة. سجّله role:'pillar' بلا pillarUrl (القمة)، اجعل كل الـpillars تربط صاعداً إليه، WebPage بـ mainEntity=mobileAccessoriesEgypt. أول إدخال في llms.txt و sitemap بأولوية 1.0.
- 🎯 **المحرك:** both


## §4 — الأصالة وأصول CairoVolt الحصرية (تحويل المختبر/C2PA/المُختبِرين من 'موجودة' إلى 'مُستغَلّة')

### 1. صفحات اختبار ذرّية مستقلة /lab/[slug] بـ Observation/Claim + رقم قياس واحد قابل للاقتباس
- **لماذا يُهيمن:** بيانات المعمل محبوسة في /lab مجمّعة واحدة؛ محركات الـAI تقتبس بالـURL الذرّي وجوجل يكافئ صفحة لكل سؤال مقاس. صفحة لكل اختبار = كيان قابل للاستشهاد يربطه Perplexity/ChatGPT مباشرة كمصدر للرقم الفريد، ولا منافس مصري يملك بيانات بهذه الذرّية.
- **كيف يُطبَّق:** أنشئ src/app/[locale]/lab/[slug]/page.tsx يولّد صفحة لكل صف has_lab_test=yes في cairovolt-lab-tests.csv: H1=سيناريو الاختبار، Quick Answer=النتيجة بالرقم، جدول المتغيرات (test_temp_c, voltage_range, measured value)، رابط المنتج والبيانات الخام. JSON-LD: Claim بـ appearance→Dataset، وObservation بـ measuredValue=الرقم وmeasuredProperty=المتغير. اربط كل منتج بصفحة اختباره وكل صفحة بالـ/lab الأم. حدّث sitemap.
- 🎯 **المحرك:** both

### 2. بلوك 'المواصفة مقابل الواقع' (Spec vs Reality): PropertyValue مزدوج (مقاس vs معلن) بطل كل صفحة منتج
- **لماذا يُهيمن:** بياناتك تحوي كنزاً لا يُقلَّد: كفاءة 70-74% مقابل 100% المعلنة، 19,200 من 20,000؛ الرقم الذي يصحّح ادعاء المُصنّع يجيب على سؤال كل مشترٍ وHelpful Content يكافئه بشدة كإشارة Experience قصوى، فتصبح المصدر الافتراضي لأي مقارنة سعة/كفاءة.
- **كيف يُطبَّق:** أي منتج له conversion_efficiency_pct أو measured_capacity_mah في الـCSV يعرض بلوك 'المواصفة مقابل الواقع' فوق الـFAQ: جملة صريحة («المُعلن 20,000 — قِسنا 19,200، كفاءة فعلية 72% بعد فقد الحرارة، وده طبيعي») + جدول. في ProductSchema.tsx أضِف additionalProperty:[{Measured capacity (CairoVolt Labs)},{Rated capacity},{Real-world efficiency}]. في المقالات كل ذكر سعة/كفاءة يستخدم الرقم المقاس مع تنويه.
- 🎯 **المحرك:** both

### 3. بناء المُختبِرين ككيانات Person موثّقة (First-Person Tester): بيلاين على كل اختبار + صفحات سيرة
- **لماذا يُهيمن:** الـCSV ينسب كل اختبار لمُختبِر مُسمّى بلا كيان Person؛ جوجل (2024+) وLLMs يقيّمون 'مَن جرّب فعلاً ومؤهلاته'. مهندس قاس بنفسه أقوى ألف مرة من 'فريق التحرير'، وربط كل رقم بشخص مؤهل تمييز Experience لا يُزيَّف (وسياستكم ترفض التزييف، فهؤلاء حقيقيون).
- **كيف يُطبَّق:** لكل مُختبِر في tested_by أنشئ Person في /team (أو /lab/team): الاسم، jobTitle (مهندس قياسات/خبير صوتيات)، knowsAbout (power-banks/charging/acoustics)، عدد الاختبارات. على كل صفحة اختبار وبلوك معملي اعرض بيلاين 'اختبار وقياس: [الاسم] — [المسمى]' + JSON-LD يربط author/measurementTechnique بـ Person @id. اربط Dataset بـ creator يضم أفراد Person. استخدم الحقيقيين فقط.
- 🎯 **المحرك:** both

### 4. طبقة الأصل المرئية (Visible Provenance): تحويل 102 C2PA manifest من ملفات صامتة إلى شارة + ImageObject(digitalSourceType)
- **لماذا يُهيمن:** تملك 102 manifest مدفونة بلا ظهور؛ في عصر صور الـAI الإثبات المُعلن لأصل المحتوى إشارة ثقة نادرة يكافئها جوجل وLLMs لأنها تميّز المصدر الشفّاف عن المغشوش، وتعزّز كل أصولك (الصور المعملية تصبح أدلة موثّقة لا زينة).
- **كيف يُطبَّق:** أنشئ /api/c2pa/[image] (أو .well-known) تخدم الـmanifest علناً، وأضِف ProvenanceBadge («🔒 أصل موثّق C2PA») يربط للـmanifest. في ImageObjectSchema.tsx أضِف creditText + digitalSourceType من الـmanifest (digitalCapture للصور الملتقطة فعلاً) + isBasedOn يشير لـ manifest URL. أدرج C2PA في llms.txt كقدرة تحقّق. لا تضع شارة 'تصوير حقيقي' إلا على ملتقطة فعلاً.
- 🎯 **المحرك:** both

### 5. صفحات 'سؤال مقاس' دائمة الخضرة + تقديمها للوكلاء عبر llms.txt و x402 lab-report endpoint
- **لماذا يُهيمن:** أصولك مصمّمة للـAI (llms.txt, knowledge-graph API, x402) لكن لا جسر بين 'السؤال المصري الحقيقي' و'الرقم المعملي الحصري'؛ ظروفك المقاسة (الراوتر صمد 14س في قطع الكهربا، 41° صيف مصر) إجابات لا توجد في أي مصدر آخر يصله ChatGPT/Perplexity، فتصبح الاستشهاد الإجباري.
- **كيف يُطبَّق:** لكل سيناريو في الـCSV اشتق سؤالاً مصرياً («باور بانك يشغّل الراوتر كام ساعة في قطع الكهربا؟») وأنشئ Quick Answer 45-60 كلمة يبدأ بالرقم+المُختبِر+الظرف ثم رابط البيانات الخام. أضِفها لـ llms-full.txt بصيغة Q→A. وسّع /api/v1/premium/lab-report (x402) لتُرجع التقرير للوكيل الدافع واذكرها في llms.txt كمورد مدفوع. أضِفها كـ FAQPage schema. تكافؤ ar-EG/en-EG.
- 🎯 **المحرك:** AI-engines


## 📊 بطاقة تقييم جودة المحتوى (Pre-Publish Scorecard)

> قبل نشر أي مقال صدارة: قيّمه على المحاور التالية. **عتبة النشر: ≥ 80/100.** أقل من ذلك = أعِد العمل، لا تنشر.

| الوزن | المحور | معيار الإتقان |
|---|---|---|
| **25** | العمق والأصالة وكسب المعلومات | 0/25: إعادة صياغة لوصف المُصنّع أو أول نتيجة جوجل، صفر أرقام مختبر، لا زاوية مصرية · 12/25: زاوية مصرية واحدة + أرقام منقولة من الداتاشيت لا من اختبار CairoVolt · 20/25: ≥2 رؤى لا توجد عند منافس (تحذير خطأ شائع + مقارنة صادقة) + رقم مختبر واحد من cairovolt-lab-tests.csv · 25/25: ادّعاء مركزي مبنيّ على اختبار CairoVolt Labs أصلي (mAh/واط/زمن شحن/عمر بطارية) + جدول لا يُنسخ + ≥3 نقاط كسب معلوماتي. veto عند <13 (نصف الوزن). |
| **20** | جاهزية الاقتباس AEO/GEO | 0/20: quickAnswer تسويقي مبهم بلا رقم في أول 20 كلمة · 10/20: quickAnswer يطابق 45-60 كلمة + رقم لكن المتن بلا كتل مستقلة · 16/20: + ≥3 جُمل ذرّية قابلة للاقتباس منفردة + جدول قابل للسحب · 20/20: + اقتباس منسوب لمصدر + تطابق صريح مع سؤال «إيه/كام/ليه/إمتى» في H2/H3 + الإجابة في أول 60 كلمة. veto عند <10. |
| **15** | استغلال أصول CairoVolt الفريدة | 0/15: لا رابط مختبر، لا مراجعة موثقة، لا C2PA، لا knowledge-graph · 7/15: أصل واحد (رابط /lab أو صورة benchmark) · 11/15: أصلان (رقم مختبر مُضمّن + صورة C2PA + رابط /lab بـ Dataset) · 15/15: ≥3 أصول عضوياً: رقم/جدول مختبر+رابط /lab، صورة اختبار موقّعة C2PA (لا ستوك)، اقتباس مراجعة موثقة حقيقية من Firestore (≥3، وممنوع الـ870 الاصطناعية)، كيانات متسقة مع /api/knowledge-graph. veto عند <8. |
| **15** | E-E-A-T والأرقام والشهادات (YMYL) | 0/15: لا شهادات، لا أرقام، نبرة بائع · 7/15: نبرة خبير صادق + أرقام لكن بلا شهادات ولا نسبة مؤلف · 11/15: + ≥2 شهادة ذات صلة (UL/MFi/USB-IF/FCC/CE/Qi2) + نسبة 'فريق تحرير كايرو فولت' + رابط مصدر رسمي · 15/15: + سلامة كهربائية مصرية صريحة (190-240V + حرارة الصيف) + تحذير من المقلّد + كل رقم له مصدر. veto عند <8. |
| **10** | الربط الداخلي وتدفّق السلطة (pillar↔spoke) | 0/10: روابط أقل من المطلوب أو بها تسرّب i18n · 5/10: 3 مقالات + 5-6 منتجات غير موضوعية (خارج العنقود) · 8/10: داخل نفس العنقود + أنكر تكست وصفي · 10/10: + رابط صاعد إلزامي لـ pillar (التكتيك §3) + رابط /lab بأنكر يحمل الرقم + روابط الجسر مشتقة من منفذ×واط الموبايل لا تخمين. veto عند <5. |
| **10** | تغطية كلمات العنقود والاستهداف | 0/10: الكلمة مرفوضة بفلتر §1 أو غائبة عن العنوان · 5/10: الأساسية مُغطّاة لكن التنويعات غائبة · 8/10: + ≥5 تنويعات من complete-keywords.csv + المزدوج عامي/فصيح + تغطية serp_features (Feature Manifest §2) · 10/10: + نيّة كاملة (مشكلة→تشخيص→حل→منتج) + اجتياز اختبار الحسم (القارئ مرشّح لشراء إكسسوار). veto عند <5. |
| **5** | النبرة والـ Burstiness ومكافحة كليشيهات AI | 0/5: كليشيه AI واحد على الأقل («في الختام»، «من الجدير بالذكر») أو إيقاع رتيب · 3/5: خالٍ من الكليشيهات لكن تنويع أطوال الجمل ضعيف · 4/5: + تباين حادّ بين جمل قصيرة (3-5 كلمات) وطويلة · 5/5: + نبرة 'أستاذ إلكترونيات جامعة القاهرة' (عامية 85% + عمق أكاديمي) + فكاهة في أول 200 كلمة. veto عند <3 (نصف الوزن). |
| **100** | **الإجمالي** | **عتبة النشر ≥ 80** |

## 🎯 أولوية التنفيذ (من المُنسّق)

حُذِف صفر تكتيكات بالكامل — الـ23 جميعها net-new فوق القائمة المُغطّاة. الدمج الوحيد: التكتيكان حول 'شارة C2PA المرئية' (originality) و'شارة تحقّق C2PA المنسوبة للاقتباس' (GEO) أُبقيا منفصلين عمداً لأن الأول يخدم المستخدم/Image-pack والثاني يخدم سلسلة الاقتباس في الـLLM — لكنهما يتشاركان نفس الـendpoint فيُنفَّذان معاً.

الأقسام مرتّبة بالأولوية التأثيرية: §1 GEO أولاً لأنه يحوّل أصلك الأقوى (المختبر) إلى اقتباسات فورية بأقل كود · §2 SERP-features ثانياً لأنه يفتح الأصل الخام المهدور (عمود serp_features) عبر سكربت دمج واحد · §3 السلطة/Pillar ثالثاً (بنية تتراكم على المدى) · §4 الأصالة رابعاً (أعمق أثراً لكن أبطأ تنفيذاً) · بطاقة التقييم بوابة بشرية فوق audit-blog.js.

أعلى 3 تكتيكات رافعة فورية لـ CairoVolt:
1. بصمة الاقتباس الذرّية (§1) — أعلى ROI: حقل بيانات + عرض حرفي، يحوّل 90 اختباراً موجوداً إلى اقتباسات منسوبة فوراً دون محتوى جديد.
2. خريطة SERP Feature → Block Recipe (§2) — سكربت merge-serp-features.mjs واحد يكشف عمود serp_features المدفون فعلاً في public/datasets ويوقف الكتابة 'العمياء' عبر كل المقالات القادمة دفعة واحدة.
3. جداول التفوّق الترتيبية / Leaderboard (§1) — مكوّن آلي واحد يحوّل المختبر إلى جمل ترتيبية حصرية (N + شرط) هي أعلى صيغة قابلة للاقتباس في GEO ولا يملكها أي منافس مصري.

الأصل الأكثر إهداراً حتى الآن: C2PA — 102 manifest موقّعة (ES384, did:web) مدفونة في .c2pa-manifests بلا ظهور للمستخدم ولا للمحرك ولا ربط بسلسلة الاقتباس؛ تفعيلها (شارة مرئية + endpoint عام + ImageObject.digitalSourceType + تعليمة استشهاد في llms.txt) يخدم §2 (Image pack)، §1 (تحقّق الاقتباس)، و§4 (الأصالة) معاً، وهو تمييز تقني لا يلمسه منافس مصري. الأصل الثاني الأقل استغلالاً: المُختبِرون المُسمّون في عمود tested_by — موجودون كنص بلا كيانات Person، وهم أقوى رافعة Experience مهدورة.