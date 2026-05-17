# 🛒 دليل إضافة منتج جديد — CairoVolt (النسخة الكاملة)

## نظرة عامة: الملفات المطلوبة لكل منتج

> ⚠️ **النسخة السادسة — مايو 2026 — Anti-Duplication Restructure (إعادة هيكلة لإلغاء التكرار).**
>
> **التحديثات الجوهرية في هذه النسخة:**
> - 🎯 **إضافة "خريطة المحتوى الحصري"** كقسم رئيسي في بداية الدليل — هي **مصدر الحقيقة الوحيد** لقاعدة "المعلومة الواحدة، المكان الواحد"
> - ⛔ **تقليص description من 6 أقسام إلى 3 أقسام حصرية** (product-details + buyer-warning + external-context)
> - ⛔ **حذف description > quick-answer** — يكرر `aiTldr`
> - ⛔ **حذف description > product-summary (bullets)** — يكرر `aiTldr` بصيغة أخرى
> - ⛔ **حذف description > expert-review (quote)** — يكرر `expertOpinion` field
> - ⛔ **حذف description > device-compatibility** — يكرر `isAccessoryFor[]` (JSON-LD)
> - ⚠️ **توضيح الحقول المهجورة:** `features`, `shortDescription`, `meta.keywords` — املأها بحد أدنى فقط
> - ✅ **إضافة مصفوفة التكرارات الممنوعة** + **شجرة قرار قبل الكتابة** + **Anti-Duplication Checklist**
>
> **التحديثات السابقة المحتفظ بها (من النسخ الـ 3-5):**
> - دمج Blueprint: التباين اللغوي (Burstiness) + الكسب المعلوماتي (Information Gain) + AEO/AI Overviews + الجسر السياقي (Contextual Bridging)
> - الخطوة 0 — البحث الميداني الإلزامي
> - إصلاحات Dataset Schema + Image Alt Text + Specs الإلزامية

لكل منتج جديد يجب إنشاء **6 ملفات** وتعديل **4+ ملفات** موجودة:

| # | الملف | النوع | الأولوية |
|---|-------|-------|----------|
| 1 | `src/data/products/{slug}.ts` | جديد | **إلزامي** |
| 2 | `src/data/reviews/{slug}.ts` | جديد | **إلزامي** |
| 3 | `src/data/details/{slug}.ts` | جديد | **إلزامي** |
| 4 | `src/data/tests/{slug}.ts` | جديد | **إلزامي** (Lab Data + SEO Priority) |
| 5 | `public/products/{brand}/{slug}/` | جديد | **إلزامي** (8 صور .webp) |
| 6 | `src/data/seed-products.ts` | **تعديل** | barrel — تسجيل المنتج |
| 7 | `src/data/product-reviews.ts` | **تعديل** | barrel — تسجيل التقييمات |
| 8 | `src/data/product-details.ts` | **تعديل** | barrel — تسجيل التفاصيل |
| 9 | `src/data/product-tests.ts` | **تعديل** | barrel — تسجيل الـ Lab Tests |
| 10 | `src/data/category-content/{brand}/{category}.ts` | **تعديل** | إضافة المنتج لقائمة الـ products |

---

## 🎯 خريطة المحتوى الحصري — المرجع الأساسي للاتكرار

> ⚠️ **اقرأ هذا القسم بالكامل قبل كتابة حرف واحد.** هذا هو **مصدر الحقيقة الوحيد** لقاعدة "المعلومة الواحدة، المكان الواحد". كل قسم آخر في هذا الدليل يخضع لهذه الخريطة.

### المبدأ الجوهري

كل معلومة في صفحة المنتج لها **مكان حصري واحد** هو مصدرها. **لا تتكرر في قسم آخر** ولو بصياغة مختلفة، حتى لو بدت "مفيدة" في كلا المكانين.

**لماذا؟**
- 🤖 **Google 2026** يكشف التكرار الدلالي (Semantic Redundancy) → عقوبة Content Cannibalization
- 🎯 **AI Overviews** تختار فقرة واحدة فقط → التكرار يُشتّت إشارة "أين الإجابة الأصلية"
- 👤 **المستخدم** يفقد الثقة عند رؤية نفس المعلومة 3 مرات بصياغات مختلفة
- ⚡ **سرعة الصفحة**: أقسام أقل = HTML أصغر = LCP أسرع

---

### الجزء الأول — حقول البيانات: نشط vs مهجور

> القاعدة: **املأ الحقول النشطة فقط بمحتوى استثماري.** املأ المهجورة بالحد الأدنى (للحفاظ على الـ type).

| الحقل | الحالة | المكان المعروض فيه | الإجراء المطلوب |
|-------|--------|---------------------|------------------|
| `translations.{lang}.description` | ✅ نشط | Description section + JSON-LD `description` | 3 أقسام فرعية حصرية فقط (راجع الجزء الثاني) |
| `translations.{lang}.faqs[]` | ✅ نشط | FAQs section + FAQPage JSON-LD | 5 أسئلة فريدة (راجع قواعد FAQs) |
| `translations.{lang}.metaTitle` | ✅ نشط | `<title>` + OG | ≤ 60 حرف |
| `translations.{lang}.metaDesc` | ✅ نشط | `<meta description>` + OG | ≤ 160 حرف |
| `translations.{lang}.shortDescription` | ❌ **مهجور** | لا يُعرض في أي مكان | املأ بسطر واحد فقط للحفاظ على النوع |
| `translations.{lang}.features[]` | ❌ **مهجور** | لا UI ولا JSON-LD | املأ 3 عناصر فقط — لا تستثمر فيه |
| `meta.keywords` | ⚠️ منخفض | `<meta keywords>` (تجاهلها Google) | 5 مصطلحات كافية — ليس 15-20 |
| `meta.mainTerm` | ⚠️ منخفض | بيانات داخلية | كلمة واحدة |
| `expertOpinion.{lang}` | ✅ نشط | ExpertOpinion + Review JSON-LD | **حصري** — جملتان فقط |
| `aiTldr.{lang}[]` | ✅ نشط | AI TL;DR section | **حصري** — 5 نقاط ≤ 15 كلمة لكل نقطة |
| `localContext.{lang}` | ✅ نشط | Local Pain Point section | **حصري** — فقرة سياق مصري |
| `specifications` | ✅ نشط | Specs table + additionalProperty JSON-LD | جدول تقني للأرقام فقط |
| `labVerified` | ✅ نشط | ProductTestResults (سرد) | لا يكرر `labTests` |
| `labTests[]` | ✅ نشط | ProductTestResults (metric cards) | سيناريو + نتيجة + شروط |
| `labMetrics` | ✅ نشط | ProductTestResults + Thermal Advice | أرقام حقيقية فقط |
| `isAccessoryFor[]` | ⚠️ JSON-LD فقط | `isAccessoryOrSparePartFor` (لا يظهر في UI) | املأ — مهم للـ SEO |
| `voiceFaqAr` / `voiceFaqEn` | ⚠️ غير ظاهر | اختياري — للأولوية فقط | املأ في المنتجات الـ Hero فقط |
| `reviews[]` (ملف منفصل) | ✅ نشط | VerifiedReviews + Review JSON-LD | 5-7 تقييمات فريدة |
| `relatedProducts[]` | ✅ نشط | RelatedProducts section | 4-6 من نفس البراند |
| `images[]` | ✅ نشط | Gallery + ImageObject JSON-LD | 8 على الأقل |

---

### الجزء الثاني — الـ 15 قسم المعروض والدور الحصري لكل قسم

> القاعدة: **اقرأ "الدور الحصري" و "ممنوع" قبل كتابة محتوى أي قسم.**

#### القسم 1: H1 + Brand Badge + Stock Badge
| | |
|--|--|
| **المصدر** | `product.translations.{lang}.name` + `product.brand` + `product.stock` |
| **الدور الحصري** | هوية المنتج فقط — الاسم + البراند + توفر المخزون |
| **✅ مسموح** | الاسم الكامل، البراند، رقم المخزون |
| **⛔ ممنوع** | أي مواصفة تقنية، أي ميزة، أي سعر |

#### القسم 2: AI TL;DR (5 نقاط)
| | |
|--|--|
| **المصدر** | `productDetail.aiTldr.{lang}[]` |
| **الدور الحصري** | **ملخص آلي ذكي قابل للاقتباس من AI Overviews** |
| **✅ مسموح** | 5 نقاط منفصلة، ≤ 15 كلمة، متنوّعة بين: قدرة، تقنية، نتيجة، توافق، ضمان |
| **⛔ ممنوع** | تكرار النقاط في `description > quick-answer` (محذوف)، نسخ سطر من `localContext` |
| **🎯 الزاوية الفريدة** | "نقاط متفرقة قابلة للاقتباس مباشرة" — ليست سرداً، ليست شرحاً |
| **مثال صحيح** | `["سعة 20,000mAh", "خرج 87W PD3.0", "MacBook Air M3 → 50% في 28 دقيقة", "وزن 505 جرام", "ضمان 24 شهر CairoVolt"]` |

#### القسم 3: Local Pain Point
| | |
|--|--|
| **المصدر** | `productDetail.localContext.{lang}` |
| **الدور الحصري** | **توصيف مشكلة مصرية محددة + ربطها بحل المنتج** — فقرة واحدة |
| **✅ مسموح** | تحدي مصري واضح (انقطاع كهرباء، حرارة، رطوبة الساحل، إلخ) + ربطه بالميزة |
| **⛔ ممنوع** | تكرار "صيف القاهرة" في description، تكرار في FAQ، تكرار في expertOpinion |
| **🎯 الزاوية الفريدة** | "نوع محدد واحد من الألم لا يظهر في أي قسم آخر بالصفحة" |

#### القسم 4: Price Block
| | |
|--|--|
| **المصدر** | `product.price` + `product.originalPrice` |
| **الدور الحصري** | **السعر + الخصم فقط** |
| **⛔ ممنوع** | ذكر السعر في description، FAQ، expertOpinion، أو aiTldr |

#### القسم 5: ProductTestResults (Lab Cards)
| | |
|--|--|
| **المصدر** | `labData.labTests[]` + `labData.labMetrics` |
| **الدور الحصري** | **أرقام الاختبار المعملي كـ metric cards + سرد قصير لكل سيناريو** |
| **✅ مسموح** | maxTemp_C, chargingSpeed_W, actualCapacity_mAh, scenario+result+conditions |
| **⛔ ممنوع** | تكرار نفس الأرقام كـ bullets في `aiTldr`، وضع "CairoVolt Lab Result" في `specifications`، تكرار نتائج في description |
| **🎯 الزاوية الفريدة** | "أرقام موثقة بسيناريو + اسم خبير + تاريخ" |

#### القسم 6: ProductGuarantees (Delivery)
| | |
|--|--|
| **المصدر** | ثابت من Component (Cairo same-day, governorate 48h, COD, warranty) |
| **الدور الحصري** | **لوجستيات التوصيل + آلية الضمان فقط** |
| **⛔ ممنوع** | ذكر الـ stock، تفاصيل المنتج، مواصفات تقنية |

#### القسم 7: Thermal Performance Advice
| | |
|--|--|
| **المصدر** | مولّد تلقائياً من `labMetrics.maxTemp_C` |
| **الدور الحصري** | **نصيحة ديناميكية حول الأداء الحراري في حر القاهرة** |
| **⛔ ممنوع** | تكرار `maxTemp_C` كرقم منفصل في description (الرقم يُحقن تلقائياً هنا) |

#### القسم 8: ExpertOpinion (الرأي الرسمي)
| | |
|--|--|
| **المصدر** | `product.expertOpinion.{lang}` |
| **الدور الحصري** | **حكم Editorial نهائي مُختصر — جملتان كحد أقصى** |
| **✅ مسموح** | جملتان قاطعتان: لمن المنتج؟ وما الميزة الفريدة الواحدة؟ |
| **⛔ ممنوع** | تكرار في `description > expert-review` (محذوف!)، اقتباس بعلامات تنصيص، سرد طويل |
| **🎯 الزاوية الفريدة** | "Verdict رسمي بصيغة Editorial — لا اقتباس، لا قصة، لا أرقام" |

#### القسم 9: ProductFAQ (5 أسئلة)
| | |
|--|--|
| **المصدر** | `product.translations.{lang}.faqs[]` |
| **الدور الحصري** | **5 أسئلة لا تظهر إجاباتها في أي قسم آخر** |
| **⛔ ممنوع كأسئلة** | "ما المواصفات؟" (يكرر Specs)، "كم السعر؟" (يكرر Price)، "هل عليه ضمان؟" (يكرر Guarantees)، "هل سريع؟" (يكرر labMetrics) |
| **✅ مسموح كأسئلة** | حالات استخدام محددة، مقارنات بين موديلات، أخطاء شائعة، أسئلة سلامة، أسئلة توافق دقيقة |
| **🎯 الزاوية الفريدة** | "إجابات على أسئلة لا يجيب عنها أي قسم آخر في الصفحة" |

#### القسم 10: ProductComparisonTable
| | |
|--|--|
| **المصدر** | يحضرها Component تلقائياً من نفس الفئة |
| **الدور الحصري** | **مقارنة سعر-إلى-قدرة مع منافسين** |
| **⛔ ممنوع** | تكرار مواصفات المنتج الحالي (تنتمي لـ Specifications) |

#### القسم 11: Description (سرد HTML)
| | |
|--|--|
| **المصدر** | `product.translations.{lang}.description` |
| **الدور الحصري** | **سرد قصصي معمّق للتقنية + تحذير المقلدات** |
| **✅ مسموح فقط 3 أقسام فرعية** | `product-details` (سرد قصصي بـ H2)، `buyer-warning` (تحذير المقلدات)، `external-context` (اختياري — مرجع خارجي) |
| **⛔ ممنوع** | quick-answer (محذوف)، product-summary (محذوف)، expert-review (محذوف)، device-compatibility (محذوف)، أي جدول مواصفات |
| **🎯 الزاوية الفريدة** | "سرد قصصي — لا أرقام مكررة، لا قوائم نقطية، لا اقتباسات خبراء" |

#### القسم 12: Specifications (Table)
| | |
|--|--|
| **المصدر** | `productDetail.specifications` |
| **الدور الحصري** | **جدول تقني للقراءة السريعة + JSON-LD additionalProperty** |
| **✅ مسموح** | Total Output, Technology, Dimensions, Weight, Safety، إلخ |
| **⛔ ممنوع** | "CairoVolt Lab Result"، تكرار labMetrics كأرقام منفصلة، أي وصف سردي |

#### القسم 13: VerifiedReviews
| | |
|--|--|
| **المصدر** | `src/data/reviews/{slug}.ts` |
| **الدور الحصري** | **شهادات عملاء حقيقيين + Review JSON-LD** |
| **⛔ ممنوع** | تكرار نفس الفائدة في 3 تقييمات (نوّع الزوايا) |

#### القسم 14: RelatedProducts
| | |
|--|--|
| **المصدر** | `product.relatedProducts[]` |
| **الدور الحصري** | **منتجات مكمّلة من نفس البراند** |

#### القسم 15: RelatedLinks
| | |
|--|--|
| **المصدر** | Component (pills لفئات أخرى) |
| **الدور الحصري** | **تنقّل بين الفئات** |

---

### الجزء الثالث — مصفوفة التكرارات الممنوعة

> القاعدة: **كل صف في هذا الجدول = معلومة واحدة لها مكان واحد فقط. لا تكتبها في أي مكان آخر.**

| المعلومة | المكان الحصري الوحيد | ❌ ممنوع كتابتها أيضاً في |
|----------|---------------------|---------------------------|
| نقاط ملخصة قصيرة | `aiTldr` | description > quick-answer، product-summary، metaDesc |
| سياق مصري (تحدي محلي) | `localContext` | description (أي قسم)، expertOpinion، FAQ |
| رأي خبير مُختصر | `expertOpinion` | description > expert-review، FAQ |
| أرقام Lab معملية | `labMetrics` + `labTests` | description، specifications (كأرقام)، aiTldr (نفس الرقم) |
| نتيجة اختبار سردية | `labVerified.result` | description، expertOpinion |
| مواصفات تقنية (Output/Weight) | `specifications` | description (كجدول)، aiTldr (إلا حقيقة واحدة) |
| قائمة الأجهزة المتوافقة | `isAccessoryFor[]` | description > device-compatibility (محذوف) |
| السعر والخصم | Price Block | description، FAQ، expertOpinion |
| الضمان والتوصيل | ProductGuarantees | description (إلا تحذير المقلدات فقط) |
| شرح تقني سردي | description > product-details | aiTldr (إلا حقيقة)، specifications |
| تحذير من المقلدات | description > buyer-warning | FAQ، expertOpinion |

---

### الجزء الرابع — شجرة القرار قبل كتابة أي محتوى

```
س1: هل المعلومة موجودة بالفعل في قسم آخر بأي صيغة (bullet, paragraph, table, number)?
    → نعم: ❌ احذفها — اعتمد على القسم الأصلي
    → لا : انتقل إلى س2

س2: هل هذه المعلومة تجيب على سؤال محدد لا يجيب عنه قسم آخر؟
    → نعم: ✅ اكتبها — لكن في القسم المختص فقط (راجع الجزء الثاني)
    → لا : ❌ احذفها — معلومة بلا قيمة دلالية

س3: لو قرأ المستخدم قسمين متتاليين بترتيب، هل سيشعر بأنه "قرأها قبل كده"?
    → نعم: ❌ غيّر الزاوية كلياً أو احذف
    → لا : ✅ المحتوى فريد
```

---

### الجزء الخامس — Anti-Duplication Checklist (قبل الرفع)

- [ ] **aiTldr**: 5 نقاط، كل نقطة تتكلم عن جانب مختلف (لا تكرار لنفس الرقم في نقطتين)
- [ ] **description** يحتوي 3 أقسام فرعية فقط (`product-details` + `buyer-warning` + اختياري `external-context`)
- [ ] **description** لا يحتوي: ❌ quick-answer، ❌ product-summary، ❌ expert-review، ❌ device-compatibility، ❌ جدول مواصفات
- [ ] **expertOpinion** جملتان فقط — لا اقتباس، لا تكرار `aiTldr`
- [ ] **specifications** لا يحتوي "CairoVolt Lab Result"
- [ ] **FAQs** كل سؤال لا يجيب عنه قسم آخر (راجع جدول الممنوعات)
- [ ] **localContext** ذكر تحدٍ مصري لا يتكرر في description
- [ ] **labMetrics** الأرقام تظهر مرة واحدة فقط (في ProductTestResults) — ليس في aiTldr ولا specifications
- [ ] **isAccessoryFor** ممتلئ (لـ JSON-LD) لكن نفس القائمة ليست في description
- [ ] **features** + **shortDescription** ممتلئان بحد أدنى فقط (مهجوران)

---

## الخطوة 1 — الـ Slug والمسار

### قواعد تسمية الـ Slug
```
{brand}-{model-name-or-description}
```
**أمثلة:**
- `anker-a2147-gan-charger-30w`
- `joyroom-t03s-pro-earbuds`
- `anker-powercore-20000`

**قواعد صارمة:**
- ✅ lowercase فقط
- ✅ فاصل `-` بين الكلمات
- ❌ لا مسافات، لا شرطة سفلية، لا أحرف عربية
- ❌ لا `.` في الاسم (إلا في الـ barrel key)

### مسار URL الناتج

الموقع يستخدم locale prefix — العربي هو الـ default (بدون prefix)، الإنجليزي بـ `/en/`:

```
AR (default): /{brand}/{categorySlug}/{slug}
EN:           /en/{brand}/{categorySlug}/{slug}

مثال:
AR: /anker/wall-chargers/anker-a2147-gan-charger-30w
EN: /en/anker/wall-chargers/anker-a2147-gan-charger-30w
```

> الـ route الفعلي: `src/app/[locale]/[brand]/[category]/[slug]/page.tsx`

---

## الخطوة 2 — الـ categorySlug المتاحة

```typescript
"power-banks"      // باور بانك
"wall-chargers"    // شواحن حائط
"cables"           // كابلات شحن
"car-chargers"     // شواحن سيارة
"audio"            // سماعات وايربودز
"smart-watches"    // ساعات ذكية (Joyroom فقط)
"car-holders"      // حوامل سيارة (Joyroom فقط)
"speakers"         // مكبرات صوت بلوتوث (Anker فقط)
"car-accessories"  // ملحقات سيارة متنوعة (Joyroom فقط)
```

> **ملاحظة:** ليست كل الفئات متاحة لكل البراندات. تحقّق من وجود ملف `src/data/category-content/{brand}/{category}.ts` قبل استخدام الـ slug.

---

## الخطوة 3 — الملف الرئيسي: `src/data/products/{slug}.ts`

### الهيكل الكامل (Template)

```typescript
// Product: {slug}
export const {slug_with_underscores} = {
    slug: "{slug}",
    sku: "{BRAND}-{CATEGORY_CODE}-{MODEL}",  // مثال: ANK-WC-A2147
    brand: "Anker",  // أو "Joyroom"
    categorySlug: "wall-chargers",
    gtin: "",        // EAN-13 barcode — اتركه فاضي لو مش موجود
    gtin13: "",      // نفس الـ gtin
    mpn: "A2147",    // رقم موديل الصانع
    price: 430,      // السعر الحالي بالجنيه
    originalPrice: 470,  // السعر قبل الخصم (لو مفيش خصم = نفس price)
    stock: 450,      // ⚠️ رقم واقعي — 300-500 لمنتج جديد، 1000-3000 لمنتج مُثبت
    featured: false, // true فقط للمنتجات المميزة
    status: "active",

    images: [
        {
            id: "img_1",                    // ⚠️ إلزامي — معرّف فريد داخل المنتج
            url: "/products/{brand}/{slug}/{image-filename}.webp",
            alt: "Anker A121D Nano 45W Smart Display charger front view 180° foldable plug - CairoVolt",
            // ⚠️ قواعد Alt Text الإلزامية — راجع القسم المخصص أدناه
            order: 0,                       // ⚠️ إلزامي — ترتيب العرض (يبدأ من 0)
            isPrimary: true,                // ⚠️ إلزامي — صورة واحدة فقط في المنتج تكون true (الأولى عادة)
            width: 1080,                    // ⚠️ إلزامي — يجب أن يطابق الأبعاد الفعلية للملف
            height: 1080                    // ⚠️ إلزامي — يجب أن يطابق الأبعاد الفعلية للملف
        },
        // img_2 ... img_8+ بنفس الهيكل، isPrimary: false دائماً للباقي
    ],
    // ⚠️ ملاحظات مهمة على حقول images:
    //   - isPrimary: true لصورة واحدة فقط (الـ thumbnail / og:image)
    //   - width/height تُستخدم في next/image لمنع layout shift — يجب أن تطابق الملف الفعلي
    //   - لا تكتب 1080×1080 إذا كانت الصورة 1000×1000 — اقرأ الأبعاد من الملف

    relatedProducts: [
        "slug-of-related-1",
        "slug-of-related-2",
        // 4-6 منتجات من نفس الـ brand
        // ⚠️ Cross-sell ثنائي الاتجاه — راجع القسم المخصص أدناه
    ],

    translations: {
        en: {
            name: "Brand Model — Feature1 | Feature2 | Warranty",  // ✅ نشط — H1
            // ❌ مهجور — لا يُعرض في أي مكان. املأ بسطر واحد فقط للحفاظ على النوع:
            shortDescription: "Short marketing line",
            description: `{HTML_CONTENT}`,  // ✅ نشط — 3 أقسام حصرية فقط
            // ❌ مهجور — لا UI ولا JSON-LD. املأ 3 عناصر فقط:
            features: ["Feature 1", "Feature 2", "Feature 3"],
            metaTitle: "Product Name ⚡ X% OFF | Key Benefit | COD Egypt",  // ✅ نشط
            metaDesc: "Buy Product in Egypt. Benefit1, Benefit2. ✓ Warranty ✓ Fast Delivery.",  // ✅ نشط
            faqs: [  // ✅ نشط — 5 أسئلة لا يجيب عنها أي قسم آخر
                { question: "Question?", answer: "Answer." },
            ]
        },
        ar: {
            name: "اسم المنتج بالعربي — المميزة1 | المميزة2 | ضمان",  // ✅ نشط
            // ❌ مهجور — لا يُعرض:
            shortDescription: "سطر تسويقي قصير",
            description: `{HTML_CONTENT_AR}`,  // ✅ نشط
            // ❌ مهجور:
            features: ["مميزة 1", "مميزة 2", "مميزة 3"],
            metaTitle: "اسم المنتج ⚡ خصم X% | فائدة رئيسية | ادفع عند الاستلام",  // ✅ نشط
            metaDesc: "اشتري المنتج في مصر. فائدة1، فائدة2. ✓ ضمان ✓ توصيل سريع.",  // ✅ نشط
            faqs: [  // ✅ نشط — راجع قواعد FAQs الفريدة
                { question: "سؤال؟", answer: "إجابة." },
            ]
        }
    },

    meta: {
        // ⚠️ منخفض الأهمية — Google يتجاهل <meta keywords>. 5 مصطلحات كافية:
        keywords: "كلمة1, كلمة2, كلمة3, keyword1, keyword2",
        mainTerm: "المصطلح الرئيسي"  // ⚠️ بيانات داخلية فقط
    },

    expertOpinion: {  // ✅ نشط — حصري! جملتان فقط، بلا اقتباس ولا تكرار aiTldr
        en: "Short expert verdict in English — max 2 sentences.",
        ar: "رأي الخبير بالعربي — جملتين كحد أقصى."
    }
};
```

> 🔑 **ملاحظة مهمة على الحقول المهجورة:**
> `shortDescription` و `features` و `meta.keywords` **محتفظ بها في النوع** (TypeScript type) لكنها لا تُعرض في أي قسم.
> لا تستثمر فيها وقتاً — املأها بأسطر دلالية بسيطة فقط. لا تكرر فيها محتوى من `aiTldr` أو `description`.

---

## قواعد كتابة الـ Description (HTML) — الهيكل الجديد المُختصر

> ⚠️ **تحديث جوهري (مايو 2026): تقليص من 6 أقسام فرعية إلى 3 فقط** — بعد فحص شامل ثبت أن 3 أقسام منها كانت تكرّر معلومات معروضة بالفعل في أقسام مستقلة على الصفحة.

### ⛔ الأقسام الـ 4 المحذوفة نهائياً من Description (لا تُعاد)

| القسم المحذوف | كان يكرر | المكان الحصري الآن |
|---------------|----------|---------------------|
| `quick-answer` | نقاط مختصرة | **AI TL;DR** (من `aiTldr` في details) |
| `product-summary` (bullets) | قائمة مميزات | **AI TL;DR** (نفس المصدر) |
| `expert-review` (quote) | رأي خبير | **ExpertOpinion section** (من `expertOpinion` في products) |
| `device-compatibility` (list) | أجهزة متوافقة | **`isAccessoryFor[]`** في tests (يُحقن في JSON-LD) |

### ✅ الهيكل الجديد — 3 أقسام حصرية فقط

> ⛔ **ممنوع تماماً:** أي جدول مواصفات تقنية، أي bullets ملخصة، أي اقتباس خبير، أي قائمة أجهزة متوافقة — تنتمي كلها لأقسام أخرى مستقلة.

```html
<!-- ============================================ -->
<!-- 1. PRODUCT DETAILS — السرد القصصي المعمّق   -->
<!-- ============================================ -->
<!-- 🎯 الدور الحصري: شرح تقني سردي بـ H2 sections — لا أرقام مكررة، لا bullets، لا اقتباسات -->
<!-- 📏 الطول: 3-5 أقسام H2، كل قسم 2-4 فقرات -->
<!-- ⛔ ممنوع: تكرار أرقام labMetrics، تكرار نقاط aiTldr، أي جدول، أي قائمة أجهزة -->

<div class="product-details">

    <section>
        <h2 class="text-2xl font-bold mb-3">عنوان التقنية الأهم (سرد قصصي)</h2>
        <p class="text-gray-700 leading-relaxed">
            افتح بمشهد قصصي — موقف يومي مصري حقيقي. 
            ثم اشرح <strong>لماذا</strong> هذه التقنية تحلّ مشكلة المستخدم.
            ركّز على الـ <em>"كيف يعمل"</em> وليس الـ <em>"ما هي المواصفات"</em>.
        </p>
        <p class="text-gray-700 leading-relaxed">
            فقرة ثانية تُعمّق الشرح بمنطق هندسي مبسّط. 
            لو احتجت رقماً، استخدمه كحقيقة سياقية وليس كمواصفة منفصلة.
            (مثلاً: "هذه التقنية تخفض الفقد إلى 13% فقط" — لكن لا تضع جدول مواصفات).
        </p>
    </section>

    <section>
        <h2 class="text-2xl font-bold mb-3">عنوان التقنية الثانية (زاوية مختلفة)</h2>
        <p class="text-gray-700 leading-relaxed">
            زاوية مختلفة كلياً عن القسم الأول — مثلاً: المتانة، السلامة، 
            الذكاء البرمجي. لا تكرر نفس النقطة بصياغة مختلفة.
        </p>
        <p class="text-gray-700 leading-relaxed">
            عمّق بشرح صناعي (مواد، تصميم، اختبار). 
            استشهد بمعيار صناعي (UL, MFi, USB-IF) إن وُجد.
        </p>
    </section>

    <section>
        <h2 class="text-2xl font-bold mb-3">السياق المصري التقني (اختياري — مرة واحدة)</h2>
        <p class="text-gray-700 leading-relaxed">
            ⚠️ <strong>تنبيه:</strong> لا تكرر السياق المصري المذكور في 
            <code>localContext</code> (Local Pain Point). 
            استخدم هنا زاوية تقنية مختلفة (مثلاً: لماذا تقنية GaN 
            مناسبة لتذبذب الفولتية بدلاً من تقنية السيليكون).
        </p>
    </section>

</div>


<!-- ============================================ -->
<!-- 2. BUYER WARNING — تحذير المقلدات          -->
<!-- ============================================ -->
<!-- 🎯 الدور الحصري: تحذير من المنتجات المقلدة + 3-5 علامات تكشف الأصلي -->
<!-- ⛔ ممنوع: تكرار معلومات الضمان (تنتمي لـ ProductGuarantees) -->

<div class="buyer-warning">
    <h3 class="font-bold mb-3 text-red-700 text-lg">
        ⚠️ Buyer Warning / تحذير للمشتري:
    </h3>
    <p class="text-gray-700 leading-relaxed mb-3">
        السوق المصري مليء بنسخ مُقلدة من <strong>[اسم المنتج]</strong> — 
        تبدو مطابقة لكنها تفتقد التقنيات الأساسية وقد تُلحق ضرراً بأجهزتك.
    </p>
    <p class="font-bold mb-2">إزاي تتأكد إنه أصلي؟</p>
    <ul class="list-decimal list-inside text-gray-700 space-y-1">
        <li><strong>الموديل:</strong> [رقم الموديل الصحيح] محفور على البودي</li>
        <li><strong>اللوجو:</strong> [وصف اللوجو الأصلي]</li>
        <li><strong>الوزن:</strong> [الوزن الفعلي] جرام — المقلد عادة أخف</li>
        <li><strong>التغليف:</strong> [وصف التغليف الأصلي]</li>
        <li><strong>سعر السوق الحقيقي:</strong> أقل من [أقل سعر معقول] = مشكوك فيه</li>
    </ul>
</div>


<!-- ============================================ -->
<!-- 3. EXTERNAL CONTEXT — اختياري             -->
<!-- ============================================ -->
<!-- 🎯 الدور الحصري: ربط بمعلومة طرف ثالث (مرجع، شهادة، اختبار) -->
<!-- ⛔ ممنوع: ادعاءات بدون مصدر، تكرار labVerified -->

<div class="external-context">
    <p class="text-gray-700 leading-relaxed">
        <strong>المرجع الصناعي:</strong> هذا المنتج يحمل شهادة 
        <a href="..." rel="nofollow">[اسم الشهادة]</a> الصادرة عن 
        [الجهة المُصدِّرة] — وهي تضمن [ما الذي تضمنه الشهادة].
    </p>
</div>
```

### 📋 قواعد جودة Description الجديدة

| القاعدة | السبب |
|---------|-------|
| لا تتجاوز 800 كلمة إجمالاً | بعد إزالة التكرار، الطول الأمثل ينخفض |
| لا تستخدم `<table>` ولا `<ul>` لقوائم مواصفات | المواصفات حصرية للـ Specifications table |
| لا تستخدم `<blockquote>` لاقتباس خبير | الخبير في ExpertOpinion section |
| لا تذكر السعر، الضمان كآلية، التوصيل | كلها أقسام مستقلة |
| كل H2 يحمل زاوية مختلفة كلياً | لا تكرّر نفس الفكرة بـ H2 مختلف |
| الفقرات ≤ 4 أسطر | قابلية القراءة |
| نوّع طول الجمل (Burstiness) | تجنّب نمط آلي |

---

## قواعد الـ metaTitle و metaDesc

### metaTitle (≤ 60 حرف)
```
EN: "Product Name ⚡ X% OFF | Key Benefit | COD Egypt"
AR: "اسم المنتج ⚡ خصم X% | فائدة | ادفع عند الاستلام"
```

### metaDesc (≤ 160 حرف)
```
EN: "Buy [Product] in Egypt. [Benefit]. ✓ [Warranty] ✓ [Delivery]."
AR: "اشتري [المنتج] في مصر. [فائدة]. ✓ [ضمان] ✓ توصيل سريع."
```

---

## الخطوة 4 — ملف التقييمات: `src/data/reviews/{slug}.ts`

```typescript
import type { ProductReview } from './_shared';

export const {slug_underscores}_reviews: ProductReview[] = [
    {
        author: 'Mohamed Hany',           // اسم مصري واقعي
        rating: 5,                         // 3-5 (معظمها 4-5)
        location: 'مدينة نصر',            // مدينة مصرية
        datePublished: '2026-02-15',       // تاريخ بين 2025-09 و 2026-04
        reviewBody: {
            en: 'English review text — specific to THIS product features.',
            ar: 'نص المراجعة بالعربي — محدد لمميزات المنتج ده بالذات.'
        },
        pros: {
            en: ['Specific pro 1', 'Specific pro 2', 'Specific pro 3'],
            ar: ['ميزة محددة 1', 'ميزة محددة 2', 'ميزة محددة 3']
        },
        // cons اختيارية — للتقييمات 3-4 نجوم فقط
        cons: {
            en: ['Minor con'],
            ar: ['عيب بسيط']
        }
    },
    // 5-6 تقييمات إضافية بنفس الهيكل
];
```

**قواعد التقييمات:**
- 5-7 تقييمات لكل منتج
- 70% تقييمات 5 نجوم، 20% أربعة، 10% ثلاثة
- كل تقييم مختلف ومرتبط بمميزة محددة في المنتج
- مدن مصرية متنوعة (القاهرة، الجيزة، الإسكندرية، طنطا...)
- التواريخ بين Sep 2025 و Apr 2026

---

## الخطوة 5 — ملف التفاصيل: `src/data/details/{slug}.ts`

```typescript
import type { ProductDetail } from './_types';

export const {slug_underscores}_detail: ProductDetail = {
    aiTldr: {
        en: [
            'Main spec — concise technical fact',
            'Second key spec',
            'Third key spec',
            'Fourth key spec',
            '✅ CairoVolt: Lab test result summary'
        ],
        ar: [
            'المواصفة الرئيسية — حقيقة تقنية موجزة',
            'المواصفة الثانية',
            'المواصفة الثالثة',
            'المواصفة الرابعة',
            '✅ كايرو فولت: ملخص نتيجة الاختبار'
        ]
    },

    localContext: {
        en: 'CairoVolt test description — include: duration, conditions (voltage/temp), results.',
        ar: 'وصف اختبار كايرو فولت — اذكر: المدة، الظروف (فولتية/حرارة)، النتائج.'
    },

    specifications: {
        'Product Type': { en: 'English value', ar: 'القيمة بالعربي' },
        'Total Output':  { en: '30W', ar: '30 واط' },
        'Technology':    { en: 'GaN + IQ3', ar: 'GaN + IQ3' },
        // ⚠️ الحقول التالية إلزامية — تُغذّي JSON-LD additionalProperty:
        'Dimensions':    { en: '28.5 × 28.5 × 35.6 mm', ar: '28.5 × 28.5 × 35.6 ملم' },
        'Weight':        { en: '~38g', ar: '~38 جرام' },
        'Safety':        { en: 'ActiveShield 2.0 + MultiProtect', ar: 'ActiveShield 2.0 + MultiProtect' },
        // أضف باقي مواصفات المنتج
        // ⛔ لا تضف 'CairoVolt Lab Result' هنا — بيانات المختبر حصرية لـ ProductTestResults
    },

    labVerified: {
        result: {
            en: 'Specific lab result — real numbers (e.g. 0→50% in 21 min, 42°C max).',
            ar: 'نتيجة الاختبار بأرقام حقيقية.'
        },
        conditions: {
            en: 'Cairo home/office — Month Year, duration',
            ar: 'منزل/مكتب القاهرة — الشهر/السنة، المدة'
        },
        expertName: 'Eng. Ahmed Medhat'  // أو 'Eng. Yahia Radwan'
    }
};
```

---

## الخطوة 6 — الصور

### هيكل المجلد
```
public/products/{brand}/{slug}/
├── {slug}-main-view-cairovolt.webp          (img_1 — isPrimary)
├── {slug}-with-devices-in-use.webp          (img_2)
├── {slug}-box-specifications.webp           (img_3)
├── {slug}-retail-box-authentic.webp         (img_4)
├── {slug}-charging-demo-time.webp           (img_5)
├── {slug}-size-comparison.webp              (img_6)
├── {slug}-connector-detail.webp             (img_7)
└── {slug}-data-specs-overview.webp          (img_8)
```

### قواعد الصور
| الخاصية | القيمة |
|---------|--------|
| الصيغة | `.webp` فقط |
| العدد | **8 صور كحد أدنى**، يُفضّل **10–16** لتغطية كل الزوايا |
| الأبعاد | **مربعة أو قريبة من المربع** (1000×1000 أو 1080×1080 أو 1200×1200) — ليس بالضرورة موحّدة بين الصور |
| الأبعاد في الكود | `width` و `height` **يجب أن تطابق الأبعاد الفعلية للملف** — لا تخمّن! |
| الاسم | بالإنجليزي، lowercase، `-` كفاصل، ينتهي بـ `-cairovolt` |
| Alt text | ⚠️ راجع القواعد الإلزامية أدناه |

> **⚠️ خطأ شائع:** كتابة `width: 1080, height: 1080` لكل الصور بدون التأكد من أبعاد الملف الفعلية. هذا يسبب layout shift في `next/image`. استخدم `sips -g pixelWidth -g pixelHeight {file}.webp` على macOS لقراءة الأبعاد الحقيقية.

### ⚠️ قواعد Alt Text الإلزامية (تم تحديثها بعد تجربة A121D)

كل صورة يجب أن يتضمن الـ `alt` الخاص بها:

| العنصر | إلزامي | مثال |
|--------|--------|------|
| **اسم المنتج** | ✅ | `Anker Nano 45W Smart Display` |
| **رقم الموديل** | ✅ | `A121D` |
| **وصف محتوى الصورة** | ✅ | `front view 180° foldable plug` |
| **سمة `- CairoVolt`** في النهاية | ✅ | `- CairoVolt` |
| **تناوب AR/EN** | ✅ | صورة فردية = EN، زوجية = AR |

**أمثلة صحيحة:**
```
✅ EN: "Anker A121D Nano 45W Smart Display charger front view 180° foldable plug - CairoVolt"
✅ AR: "شاحن انكر نانو 45 واط A121D بشاشة ذكية مع ايفون 17 برو - كايرو فولت"
```

**أمثلة خاطئة:**
```
❌ "Anker charger front view" — ناقص الموديل + ناقص CairoVolt
❌ "شاحن انكر" — عام جداً، ناقص الموديل والوصف
```

### قاعدة مسار الصور في الكود
```typescript
url: "/products/{brand}/{folder-name}/{image-filename}.webp"
// مثال:
url: "/products/anker/anker-nano-45w-smart-display-charger/anker-nano-45w-smart-display-charger-front-180-foldable-white-cairovolt.webp"
```

> **⚠️ ملاحظة:** بعض المجلدات القديمة تستخدم uppercase مثل `30W` — المجلدات الجديدة يجب أن تكون lowercase كاملة.

---

## الخطوة 7 — تسجيل المنتج في الـ Barrel Files

### 7.1 — `src/data/seed-products.ts`

أضف في **2 مكانين**:

```typescript
// 1. في قسم الـ imports (بعد آخر import):
import { your_product_slug } from './products/your-product-slug';

// 2. في مصفوفة products (آخر عنصر):
export const products = [
    // ... المنتجات الموجودة ...
    your_product_slug,  // ← أضف هنا
];
```

### 7.2 — `src/data/product-reviews.ts`

أضف في **2 مكانين**:

```typescript
// 1. Import
import { your_product_slug_reviews } from './reviews/your-product-slug';

// 2. في productReviewsDb object:
export const productReviewsDb = {
    // ... التقييمات الموجودة ...
    'your-product-slug': your_product_slug_reviews,  // ← أضف هنا
};
```

### 7.3 — `src/data/product-details.ts`

أضف في **2 مكانين**:

```typescript
// 1. Import
import { your_product_slug_detail } from './details/your-product-slug';

// 2. في enhancements object:
export const enhancements = {
    // ... التفاصيل الموجودة ...
    'your-product-slug': your_product_slug_detail,  // ← أضف هنا
};
```

---

## قاعدة تسمية الـ Export Variable

```
{brand}_{slug_with_underscores}
```

| الملف | الـ slug | اسم الـ Export |
|-------|---------|----------------|
| products | `anker-a2147-gan-charger-30w` | `anker_a2147_gan_charger_30w` |
| reviews | `anker-a2147-gan-charger-30w` | `anker_a2147_gan_charger_30w_reviews` |
| details | `anker-a2147-gan-charger-30w` | `anker_a2147_gan_charger_30w_detail` |

---

## قواعد الـ relatedProducts

- 4-6 منتجات من **نفس الـ brand فقط** (Anker → Anker، Joyroom → Joyroom)
- اختر منتجات تكمّل بعضها (charger + cable + power bank)
- ❌ لا تضع منتج من brand مختلف أبداً

### ⚠️ Cross-sell ثنائي الاتجاه (إلزامي)

عند إضافة `relatedProducts` للمنتج الجديد، **يجب أيضاً فتح ملفات المنتجات المذكورة وإضافة المنتج الجديد فيها:**

```
مثال: إضافة anker-nano-45w-smart-display-charger

1. ✅ أضف في المنتج الجديد:
   relatedProducts: ['anker-a2147-gan-charger-30w', 'anker-nano-45w', 'anker-a2732-charger-35w']

2. ✅ افتح كل منتج مذكور وأضف slug المنتج الجديد:
   - anker-a2147-gan-charger-30w.ts → relatedProducts: [..., 'anker-nano-45w-smart-display-charger']
   - anker-nano-45w.ts → relatedProducts: [..., 'anker-nano-45w-smart-display-charger']
   - anker-a2732-charger-35w.ts → relatedProducts: [..., 'anker-nano-45w-smart-display-charger']
```

> ❌ **خطأ شائع:** إضافة cross-sell في اتجاه واحد فقط — يقلل من ظهور المنتج الجديد في صفحات المنتجات الأخرى.

---

## قواعد الـ SKU

```
{BRAND_CODE}-{CATEGORY_CODE}-{MODEL}

Anker Codes:
ANK-PB-xxx   = Power Bank
ANK-WC-xxx   = Wall Charger
ANK-CB-xxx   = Cable
ANK-CC-xxx   = Car Charger
ANK-AU-xxx   = Audio
ANK-SP-xxx   = Speaker

Joyroom Codes:
JR-PB-xxx    = Power Bank
JR-WC-xxx    = Wall Charger
JR-CB-xxx    = Cable
JR-CC-xxx    = Car Charger
JR-AU-xxx    = Audio
JR-SW-xxx    = Smart Watch
JR-CH-xxx    = Car Holder
```

---

## قواعد الـ FAQs — الإصدار الجديد (مع Anti-Duplication)

### القواعد الأساسية

- **5 أسئلة لكل لغة** (لا أكثر، لا أقل)
- محددة للمنتج بالذات — مش عامة
- تبدأ بـ "Does it...", "Can this...", "How long..." / "هيشحن...؟", "ينفع...؟"
- الإجابة تبدأ بـ "Yes" أو "No" أو رقم محدد
- العربية بعامية مصرية (أيوه/لا، بيعمل، بيشحن...)
- يُعرض المحتوى في FAQ section + FAQPage JSON-LD (نفس المصدر — لا يوجد تكرار)

### ⛔ أسئلة ممنوعة (إجاباتها موجودة في أقسام أخرى)

| السؤال الممنوع | السبب | المكان البديل |
|----------------|-------|----------------|
| "ما هي مواصفات المنتج؟" | يكرر Specifications | جدول Specifications |
| "كم سعر المنتج؟" | يكرر Price Block | Price Block |
| "هل عليه ضمان؟" | يكرر Guarantees | ProductGuarantees |
| "كم سرعة الشحن؟" (إذا الرقم موجود في labMetrics) | يكرر ProductTestResults | metric card |
| "ما رأي الخبراء؟" | يكرر ExpertOpinion | ExpertOpinion section |
| "هل يصلح في صيف القاهرة؟" (لو ذُكر في localContext) | يكرر Local Pain Point | Local Pain Point |

### ✅ أسئلة فريدة مسموحة (لا يجيب عنها أي قسم آخر)

| نوع السؤال | مثال |
|-----------|------|
| توافق دقيق مع موديل بعينه | "هل يشحن iPhone 17 Pro Max بسرعة كاملة؟" |
| مقارنة بين موديلات نفس البراند | "إيه الفرق بين هذا الشاحن وموديل 65W؟" |
| تحذير من خطأ شائع | "هل أقدر استخدمه مع كابل USB-A عادي؟" |
| سؤال سلامة محدد | "هل يتأثر بانقطاع الكهرباء المفاجئ؟" |
| سؤال عملي ميداني | "هل ينفع للسفر — هل معتمد للطيران؟" |

---

## الخطوة 8 — ملف Lab Tests: `src/data/tests/{slug}.ts`

هذا الملف **حاسم لـ SEO** — المنتجات التي لها Lab Data تحصل على `priority: 1.0` في الـ sitemap.

```typescript
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const {slug_underscores}_lab: ProductLabData = {
    labTests: [
        {
            scenario: {
                en: 'Describe the test scenario — what was tested and under what conditions.',
                ar: 'صف سيناريو الاختبار — إيه اللي اتختبر وفي إيه ظروف.',
            },
            result: {
                en: 'Exact results with real numbers — e.g. 0→50% in 21min, 42°C max, 500 bend cycles.',
                ar: 'النتائج الدقيقة بأرقام حقيقية — مثلاً: 0→50% في 21 دقيقة، 42°C كحد أقصى.',
            },
            conditions: {
                en: 'Cairo home/office — Month Year, test duration',
                ar: 'منزل/مكتب القاهرة — الشهر/السنة، مدة الاختبار',
            },
            // ⚠️ الحقول الثلاثة التالية إلزامية معاً — استخدم EXPERTS الثابت دائماً:
            expertName: EXPERTS.POWER.name,                                       // إلزامي
            expertProfileUrl: EXPERTS.POWER.profileUrl,                           // إلزامي — للـ Schema/JSON-LD
            expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },// إلزامي — يُعرض بجانب اسم الخبير
        },
    ],
    voiceFaqAr: [
        {
            question: 'سؤال صوتي عامي مصري عن المنتج؟',
            answer: 'إجابة بعامية مصرية مع رقم من الاختبار.',
        },
        // سؤالين على الأقل
    ],
    voiceFaqEn: [
        {
            question: 'English voice FAQ question?',
            answer: 'Answer with real number from test.',
        },
    ],
    isAccessoryFor: [
        { name: 'iPhone 17 Pro' },
        { name: 'iPhone 17' },
        { name: 'Samsung Galaxy S26' },
        { name: 'iPad Air' },
        // أضف الأجهزة المتوافقة
    ],
    labMetrics: {
        // اختر المقاييس المناسبة للمنتج:
        maxTemp_C: 42,           // للشواحن والكابلات
        chargingSpeed_W: 30,     // للشواحن
        actualCapacity_mAh: 9800, // للباور بانك
        realEfficiency: 87,       // نسبة كفاءة الباور بانك
        bendCycles: 25000,        // للكابلات
        batteryLife_hours: 10,    // للسماعات
        noiseReduction_dB: 35,    // لسماعات ANC
        actualWeight_g: 75,       // ⚠️ الوزن الفعلي من مواصفات الشركة — تأكد من المصدر الرسمي!
        devicesCharged: 6,        // ⚠️ عدد الأجهزة المختبرة فعلياً في isAccessoryFor
    }
};
```

### اختيار الـ EXPERT الصحيح:
| نوع المنتج | الخبير |
|------------|--------|
| شواحن / باور بانك | `EXPERTS.POWER` (Eng. Ahmed Medhat) |
| كابلات / ضمان جودة | `EXPERTS.QA` (Eng. Yahia Radwan) أو `EXPERTS.CABLES` |
| سماعات / مكبرات | `EXPERTS.AUDIO` (Dr. Sherif Hassan) |
| ملحقات أخرى | `EXPERTS.ACCESSORIES` (Eng. Kareem Tarek) |

### تسجيله في `src/data/product-tests.ts`:
```typescript
// 1. Import
import { {slug_underscores}_lab } from './tests/{slug}';

// 2. في labData object:
export const labData = {
    // ...
    '{slug}': {slug_underscores}_lab,
};
```

---

## الخطوة 9 — تحديث Category Content

**الملف:** `src/data/category-content/{brand}/{category}.ts`

لا تعيد كتابة الملف كله — فقط أضف المنتج الجديد في مصفوفة `products` الموجودة:

```typescript
// داخل pageContent.ar.products و pageContent.en.products
products: [
    // ... المنتجات الموجودة ...
    { name: 'اسم المنتج الجديد بالعربي', price: 430, badge: 'جديد' },  // ar
    { name: 'New Product Name', price: 430, badge: 'New' },              // en
]
```

**مسارات الملفات:**
```
Anker:
  src/data/category-content/anker/wall-chargers.ts
  src/data/category-content/anker/power-banks.ts
  src/data/category-content/anker/cables.ts
  src/data/category-content/anker/car-chargers.ts
  src/data/category-content/anker/audio.ts
  src/data/category-content/anker/speakers.ts

Joyroom:
  src/data/category-content/joyroom/wall-chargers.ts
  src/data/category-content/joyroom/power-banks.ts
  src/data/category-content/joyroom/cables.ts
  src/data/category-content/joyroom/car-chargers.ts
  src/data/category-content/joyroom/audio.ts
  src/data/category-content/joyroom/smart-watches.ts
  src/data/category-content/joyroom/car-holders.ts
```

---

## الترتيب الصحيح للتنفيذ

```
1. ضع الصور في public/products/{brand}/{slug}/
2. أنشئ src/data/products/{slug}.ts
3. أنشئ src/data/reviews/{slug}.ts
4. أنشئ src/data/details/{slug}.ts
5. أنشئ src/data/tests/{slug}.ts
6. أضف إلى src/data/seed-products.ts
7. أضف إلى src/data/product-reviews.ts
8. أضف إلى src/data/product-details.ts
9. أضف إلى src/data/product-tests.ts
10. أضف المنتج في category-content/{brand}/{category}.ts
```

---

## الفرق بين النسختين العربية والإنجليزية

> الموقع يعمل بنسختين كاملتين. كل بيانات في `translations.en` تُعرض على `/en/...` وكل بيانات في `translations.ar` تُعرض على `/ar/...`. **ليسا ترجمة — بل محتوى مختلف لجمهورين مختلفين.**

### قواعد الفرق بين EN و AR (الإصدار المنقّح بعد حذف الأقسام المكررة):

| العنصر | النسخة العربية `ar` | النسخة الإنجليزية `en` |
|--------|---------------------|------------------------|
| **اللغة** | عامية مصرية + فصيح | English احترافي |
| **aiTldr** (5 نقاط) | كل نقطة بالعامية: "بيشحن iPhone 17 في 28 دقيقة" | كل نقطة احترافية: "Charges iPhone 17 in 28 min" |
| **localContext** (فقرة) | تبدأ بتحدي مصري: "في صيف القاهرة لما الحرارة تتعدى 40°م..." | تبدأ بسياق: "Cairo's summer heat exceeding 40°C..." |
| **expertOpinion** (جملتان) | عامية: "أحسن شاحن لو بتشتغل من القهوة بلابتوبك. مش هتلاقي أصغر منه يدّي 30 واط." | احترافي: "Best choice for mobile professionals. No smaller 30W charger exists." |
| **description > product-details** (H2 سرد) | عناوين بالعربي: "تقنية GaN: العلم وراء الحجم" | عناوين بالإنجليزي: "GaN Technology: Science Behind the Size" |
| **description > buyer-warning** | "تحذير للمشتري:" + علامات الأصلي بالعربي | "Buyer Warning:" + authenticity signs in English |
| **metaTitle** (≤ 60) | "شاحن انكر GaN ⚡ خصم 9% \| أصغر شاحن \| ادفع عند الاستلام" | "Anker Nano 3 GaN 30W ⚡ 9% OFF \| Ultra Compact \| COD Egypt" |
| **metaDesc** (≤ 160) | "اشتري شاحن انكر... ✓ ضمان ✓ توصيل سريع" | "Buy Anker... ✓ Warranty ✓ Fast Delivery" |
| **FAQs** (5 أسئلة فريدة) | بالعامية: "يعني إيه GaN وليه أحسن؟" | بالإنجليزي: "What does GaN mean and why is it better?" |
| **FAQ Answer** | عامية: "أيوه، بس ببطء. الـ 30 واط ينفع..." | احترافي: "Yes, but slowly. The 30W output can..." |
| **Specs Table** | headers بالعربي: "نوع المنتج / التقنية..." | headers بالإنجليزي: "Product Type / Technology..." |

> ⛔ **محذوف من جدول الفروق** (لم تعد موجودة في الـ description بعد إعادة الهيكلة):
> ~~Quick Answer~~ → استبدلتها `aiTldr`
> ~~Expert Review~~ → استبدلتها `expertOpinion`
> ~~Expert Quote~~ → استبدلتها `expertOpinion`
> ~~Device Compatibility~~ → استبدلتها `isAccessoryFor[]` (في tests، JSON-LD فقط)

### قاعدة السياق المصري — إلزامية في العربي:

كل section من الـ description العربي يجب أن يذكر **تحدياً مصرياً** واحداً على الأقل:
- تذبذب الكهرباء / فصل الكهرباء
- حرارة الصيف (38°C - 45°C)
- السوق المصري والمنتجات المقلدة
- حياة المصري (الشنطة اليومية، الكافيه، السفر للساحل...)

**مثال من المنتج الحقيقي:**
```
AR: "شبكة كهرباء مصر مشهورة بتذبذب الفولتية، خصوصاً في ذروة الصيف..."
EN: "Egypt's electricity grid is notorious for voltage fluctuations..."
```
> الإنجليزي يذكر مصر أيضاً — لأن الجمهور الإنجليزي هو مصريين مقيمين يبحثون بالإنجليزية.

### الـ shortDescription — ❌ حقل مهجور

> ⚠️ **هذا الحقل لم يعد يُعرض في أي مكان** على صفحة المنتج ولا في JSON-LD ولا في `<meta description>`.
> الـ `metaDesc` هو الذي يُستخدم في الميتا، و `aiTldr` هو الذي يُعرض كنقاط ملخصة.
>
> **التعليمة:** املأه بسطر واحد بسيط فقط للحفاظ على الـ TypeScript type:
>
> ```ts
> shortDescription: "Brief marketing line about the product"  // EN
> shortDescription: "سطر تسويقي قصير عن المنتج"              // AR
> ```
>
> ⛔ **لا تستثمر فيه وقتاً** — لا تكتب صيغة `⚡|🔬|📱|🧠|🔌|🛡️|🏆` المعقدة، فهي لا تُعرض لأحد.

---

## الخطوة 0 — البحث الميداني قبل كل منتج (إلزامي)

> ⚠️ **لا تكتب حرفاً واحداً قبل تنفيذ هذا البحث.**

```
0.1 — بحث Google:
    - "سعر [المنتج] في مصر 2026"
    - "مراجعة [المنتج] عربي"
    - "[المنتج] أصلي ولا تقليد"
    - سجّل: أول 5 نتائج + People Also Ask

0.2 — تحليل المنافسين (أول 3 نتائج):
    - اقرأ صفحات أمازون مصر / نون / جوميا
    - سجّل: ما يغطيه المنافس (مواصفات، أسئلة)
    - سجّل: ما يفتقده (مقارنات، تجارب حقيقية، تحذيرات)

0.3 — بناء ملف "Information Gain":
    - ما المعلومة التي لا يملكها أي منافس مصري؟
    - ما الأسئلة التي يطرحها المصريون ولا يجيب عنها أحد؟
    - ما الأخطاء في أوصاف المنافسين؟
```

---

## قواعد جودة المحتوى (من الـ Blueprint الرسمي)

> ⚠️ **هذه القواعد إلزامية لكلا اللغتين.** خرق أي منها = محتوى ضعيف خوارزمياً.

### 1. ممنوع كليشيهات الذكاء الاصطناعي

| ✗ ممنوع | ✓ البديل |
|---------|----------|
| "في الختام" | احذف الجملة كلياً |
| "من الجدير بالذكر" | ابدأ بالمعلومة مباشرة |
| "لا شك أن" | اذكر الرقم أو الحقيقة |
| "نقدم لكم أفضل المنتجات" | "يشحن iPhone 15 Pro من 0 لـ 50% في 21 دقيقة" |
| "نسعى جاهدين لتقديم" | "ضمان 18 شهر + استبدال خلال 14 يوم" |
| "In today's fast-paced world" | احذف التمهيد — ابدأ بالفائدة |

### 2. التباين اللغوي (Burstiness) — إلزامي

> **جوجل 2026 تكشف النمط الرتيب = محتوى آلي = عقوبة.**

- نوّع بحدة بين أطوال الجمل:
  - جملة قصيرة: `"65 واط. شحن كامل في 45 دقيقة."`
  - جملة طويلة: `"تقنية GaN III تُقلّص حجم الشاحن 58% مقارنةً بشواحن السيليكون التقليدية، مما يعني شاحن أصغر من علبة الكبريت يُخرج طاقة كانت تحتاج شاحن بحجم قبضة اليد"`
- ❌ ممنوع: كل الجمل بنفس الطول أو النمط

### 3. الكسب المعلوماتي (Information Gain) — 4 زوايا إلزامية

> **لا تكرر وصف الشركة المصنعة. أضف قيمة جديدة.**

أضف في كل صفحة منتج:
1. **زاوية استخدام مصرية**: "مثالي لرحلات الساحل الشمالي — يتحمل حرارة 45°م"
2. **مقارنة تقنية صادقة**: فرق حقيقي بالأرقام بين الموديلات
3. **تحذير من خطأ شائع**: "استخدام كابل رخيص مع شاحن 100W = الكابل يختنق عند 15W"
4. **رقم أو اختبار حقيقي**: "اختبرناه 30 يوم — فقد 2% فقط من السعة"

### 4. الجسر السياقي (Contextual Bridging) — لـ NLP

> **جوجل تفرّق بين محتوى "مترجم/عام" ومحتوى "محلي حقيقي" عبر NLP.**

استخدم المصطلح **العامي أولاً** (لأنه ما يبحث به المصري) + **الرسمي بين قوسين** (لـ NLP):

```
"الشاحن ده بيطلع 65 واط — يعني بيشحن الموبايل (هاتفك الذكي) 
من صفر لـ 50% في 20 دقيقة. لو بتشتغل من كافيه وعايز تشحن 
اللابتوب (الحاسب المحمول) والموبايل مع بعض — المنفذين USB-C 
بيشتغلوا في نفس الوقت بتقنية PowerIQ 3.0"
```

### 5. AEO — تحسين محركات الإجابة (AI Overviews)

> **في 2026: 40%+ من نتائج جوجل تحتوي AI Overviews. المحتوى المُقتبس = زيارات ×3.**

| # | القاعدة | مثال ✓ |
|---|---------|--------|
| 1 | **إجابة قاطعة في أول 60 كلمة** | "أفضل باور بانك للابتوب في 2026 هو Anker 737 — سعة 24,000mAh بقوة 140W" |
| 2 | **أسئلة FAQ بـ "إيه/كام/ليه/إمتى"** | "كام واط محتاج عشان أشحن iPhone 17 بسرعة؟" |
| 3 | **أرقام في أول 20 كلمة من الإجابة** | "20 واط كحد أدنى — لكن 30W هتشحنه من 0 لـ 50% في 18 دقيقة" |
| 4 | **اقتباسات منسوبة** | "حسب اختبار Tom's Guide: 'Anker 737 حقق 96% كفاءة'" |
| 5 | **Schema كامل** | Product + FAQ + Review + BreadcrumbList |

### 6. الكثافة الدلالية — كل جملة = معلومة جديدة

```
✓ صح: "بطارية 20,000mAh بتقنية PowerIQ 3.0 — تشحن Samsung S24 Ultra مرتين ونص كاملين"
✗ غلط: "بطارية ذات سعة كبيرة تكفي لشحن هاتفك عدة مرات"
```

### 7. معادلات الصياغة للحقول النشطة (بديل Quick Answer المحذوف)

> ⚠️ معادلة "Quick Answer" القديمة (الفقرة الافتتاحية بـ 45-60 كلمة) كانت تنتمي لقسم `description > quick-answer` المحذوف. محتواها مُوزّع الآن على حقلين حصريين:

#### معادلة `aiTldr` (5 نقاط، كل نقطة ≤ 15 كلمة)

```
نقطة 1: [القدرة الرئيسية + الرقم]          → "خرج 87W PD3.0"
نقطة 2: [التقنية + اسمها]                   → "تقنية GaN III + PowerIQ 4.0"
نقطة 3: [نتيجة اختبار محددة]                → "iPhone 17 من 0 إلى 50% في 21 دقيقة"
نقطة 4: [توافق محدد]                        → "يشحن MacBook Air M3 بكامل سرعته"
نقطة 5: [ضمان + شهادة]                      → "ضمان 24 شهر CairoVolt + شهادة UL"
```

#### معادلة `localContext` (فقرة سياق مصري، 40-60 كلمة)

```
"[وصف تحدٍ مصري محدد بأرقام واقعية]
+ [كيف يخلق هذا التحدي ضرراً للمستخدم العادي]
+ [كيف يحلّ هذا المنتج تحديداً المشكلة بتقنية بعينها]"
```

**مثال مكتمل:**
> "في صيف القاهرة لما الحرارة تتعدى 40°م، الشواحن العادية بتخفض الخرج للنص أو بتفصل تماماً عشان تحمي نفسها — وأنت بتفضل من غير شحن سريع وقت ما محتاجه. شاحن [اسم المنتج] بتقنية GaN III يحافظ على خرج 30W الكامل حتى 45°م، لإنه بيستخدم مكثفات مقاومة للحرارة بدل السيليكون التقليدي."

> ⛔ **مهم:** بعد كتابة `localContext` بهذه المعادلة، **لا تكرر "صيف القاهرة"** في `description > product-details`.

### 8. قواعد FAQs — هيكل محدد للـ 5 أسئلة

| # | نوع السؤال | مثال عربي | مثال إنجليزي |
|---|-----------|-----------|--------------|
| 1 | توافق الجهاز | "هيشحن ايفون 15 Pro Max؟" | "Does it charge iPhone 15 Pro Max?" |
| 2 | سلامة البطارية | "30 واط مش هيضر البطارية؟" | "Is 30W safe for my phone battery?" |
| 3 | فرق بين الموديلات | "إيه الفرق بينه وبين 20 واط؟" | "How is this different from the 20W?" |
| 4 | سؤال عامي/عملي | "الشاحن ده بيسخن؟" | "Does it get hot during charging?" |
| 5 | الضمان | "الضمان بيغطي إيه؟" | "What does the warranty cover?" |

### 9. النبرة: خبير صادق — مش بائع

| ✓ صح | ✗ غلط |
|------|-------|
| "الشاحن مش هيفيدك لو لابتوبك بياخد 140W" | "أفضل شاحن يناسب الجميع!" |
| "بعد 6 شهور استخدام، البطارية بتحتفظ بـ 95%" | "بطارية عمرها طويل جداً" |
| "مناسب للشحن الليلي، مش للشحن السريع اليومي" | "يناسب كل احتياجاتك!" |

### 10. شهادات تُذكر في كل صفحة (حسب المنتج)

| الشهادة | المنتجات | الأهمية |
|---------|----------|---------|
| `MFi` | كابلات Lightning، شواحن | Apple تضمن التوافق والأمان |
| `USB-IF Certified` | كابلات USB-C | ضمان نقل 240W حقيقي |
| `UL Listed` | شواحن حائط | معيار السلامة الكهربائية |
| `IPX Rating` | سماعات، سبيكرات | مقاومة الماء الحقيقية |
| `FCC / CE` | معظم المنتجات | اعتماد عالمي |

### 11. قاعدة Internal Linking — Cross-sell ذكي

في `relatedProducts` ضع المنتجات بهذا المنطق السببي:

| إذا اشترى | يحتاج أيضاً |
|-----------|-------------|
| شاحن حائط | كابل USB-C + باور بانك (للخروج) |
| باور بانك | شاحن حائط (لشحن الباور بانك) + كابل |
| كابل | شاحن سريع يدعم fast charging |
| شاحن سيارة | كابل + حامل سيارة |
| سماعات | كابل شحن + باور بانك |

### 12. الـ Sentiment U-Curve — هيكل عاطفي عبر الصفحة كاملة (ليس داخل description فقط)

> ⚠️ بعد إعادة الهيكلة، الـ U-Curve يمتد عبر **أقسام الصفحة المستقلة** وليس داخل description.

```
المقدمة العاطفية:
  AI TL;DR + Local Pain Point → يثير القلق والاهتمام بتوصيف مشكلة + لمحة عن الحل

الوسط التقني:
  ProductTestResults + description > product-details → يبني الثقة بأرقام مختبر + سرد تقني

النهاية المُطمئنة:
  description > buyer-warning + ProductGuarantees + ExpertOpinion + VerifiedReviews
  → يُزيل الخوف من الشراء بثقة الخبير + شهادات + ضمان + تحذير من المقلدات
```

### 13. قواعد التنسيق الإلزامية داخل description

> ⚠️ **مهم:** هذه القواعد تخص محتوى `description` HTML فقط. القوائم/الجداول الموجودة في أقسام أخرى (Specs, AI TL;DR, Comparison) تأتي تلقائياً من البيانات.

| النوع | داخل description؟ | البديل (إن وُجد) |
|-------|-------------------|------------------|
| `<ul>` قوائم مميزات | ❌ **ممنوع** | `aiTldr` |
| `<ol>` ترقيم خطوات | ✅ مسموح **فقط** في `buyer-warning` ("إزاي تعرف الأصلي") | — |
| `<table>` مواصفات | ❌ **ممنوع** | `specifications` table |
| `<table>` مقارنات | ❌ **ممنوع** | ComparisonTable (تلقائي) |
| `<blockquote>` اقتباس خبير | ❌ **ممنوع** | `expertOpinion` field |
| `<h2>` عناوين فرعية | ✅ مسموح **داخل `product-details` فقط** | — |
| `<h3>` عناوين ثانوية | ✅ مسموح في `buyer-warning` و `external-context` | — |
| `<p>` فقرات سردية | ✅ **هي الأساس** | — |
| `<strong>` للأرقام والمفاتيح | ✅ مسموح بحذر | — |
| الفقرات | لا تتجاوز **4 أسطر** أبداً | — |
| الجمل | نوّع الطول (Burstiness) — قصيرة وطويلة بالتناوب | — |

---

## استراتيجية الكلمات المفتاحية — التوزيع الطبيعي (لا meta.keywords)

> ⚠️ **تحديث جوهري:** Google يتجاهل `<meta keywords>` منذ 2009. كل التركيز السابق على "حشو 15-20 مصطلح في meta.keywords" **هدر للجهد**. الكلمات المفتاحية الحقيقية تعمل من خلال **التوزيع الطبيعي** عبر الحقول النشطة.

### ✅ التوزيع الصحيح — الحقل المناسب لكل نوع كلمة

| نوع الكلمة | المكان الحصري | الحد الأقصى | مثال |
|------------|--------------|--------------|------|
| **Brand + Model (الأهم)** | `name` (H1) + `metaTitle` | يظهر مرتين فقط | `Anker Nano 45W Smart Display` |
| **Primary keyword للبحث** | `metaTitle` + `metaDesc` + أول `aiTldr` | 3 مرات بحد أقصى | "شاحن انكر 45 واط" |
| **Long-tail searches** | `faqs[].question` | 5 أسئلة فريدة | "هل ينفع لـ iPhone 17 Pro Max؟" |
| **Egypt-specific** | `localContext` + `metaTitle/Desc` | في كل قسم منهما مرة | "صيف القاهرة" |
| **Technical terms** | `specifications` keys + `description > product-details` | حسب الحاجة | "GaN III", "PowerIQ 3.0" |
| **Compatibility terms** | `isAccessoryFor[]` (JSON-LD) | كل جهاز مرة | "iPhone 17", "Samsung Galaxy S26" |
| **Comparison terms** | `relatedProducts` + ComparisonTable (auto) | لا تكتبها يدوياً | — |

### ⛔ ما لا تفعله

- ❌ **لا تحشو 15-20 كلمة في `meta.keywords`** — تكفي 5 مصطلحات
- ❌ **لا تكرر نفس الكلمة المفتاحية في 5 أقسام** — اختر 3 أقسام مختلفة لكل مصطلح أساسي
- ❌ **لا تستخدم Keyword Stuffing في description** — التكرار يعاقبه Google
- ❌ **لا تكرر الـ Brand Name أكثر من 4 مرات إجمالاً** عبر كل الصفحة

### مصادر البحث عن الكلمات (للتوزيع الطبيعي)

1. **Google Autocomplete** (بالعربي والإنجليزي) → استخدم في `faqs` و `metaTitle`
2. **People Also Ask** → ترجمها مباشرة لـ `faqs`
3. **Amazon/Noon Egypt search suggestions** → استخدم في `name` و `metaTitle`
4. **SERP top 3 competitors** → اكتشف الفجوات (Information Gain) → استخدمها في `description > product-details`

---

## Checklist نهائي قبل الإضافة

### 🎯 Anti-Duplication (الأولوية القصوى — راجع الخريطة في بداية الدليل)

- [ ] **description يحتوي 3 أقسام فرعية فقط:** `product-details` + `buyer-warning` + (اختياري) `external-context`
- [ ] **description لا يحتوي أياً من:** ❌ `quick-answer` ❌ `product-summary` ❌ `expert-review` (quote) ❌ `device-compatibility` ❌ جدول مواصفات
- [ ] **`aiTldr`** = 5 نقاط، كل نقطة عن جانب مختلف، **لا تكرار** في description
- [ ] **`expertOpinion`** = جملتان فقط، بدون اقتباس، **لا تكرار** في description
- [ ] **`localContext`** يذكر تحدياً مصرياً واحداً **لا يُذكر** في description ولا FAQ ولا expertOpinion
- [ ] **`labMetrics` أرقام** لا تتكرر كـ bullets في `aiTldr` ولا كحقول في `specifications`
- [ ] **`specifications`** لا تتضمن `CairoVolt Lab Result` (محذوف نهائياً)
- [ ] **`isAccessoryFor[]`** ممتلئ في tests، **لا قائمة أجهزة** في description
- [ ] **FAQs** كل سؤال **لا يجيب عنه** قسم آخر (راجع جدول الممنوعات في الخريطة)
- [ ] **السعر والضمان والتوصيل** يُذكرون مرة واحدة فقط (Price Block + Guarantees) — **ليس في description ولا expertOpinion**

### 🔻 الحقول المهجورة (املأ بحد أدنى فقط)

- [ ] **`shortDescription`** = سطر واحد فقط (مهجور — لا يُعرض)
- [ ] **`features[]`** = 3 عناصر فقط (مهجور — لا UI ولا JSON-LD)
- [ ] **`meta.keywords`** = 5 مصطلحات فقط (Google يتجاهلها — ليس 15-20)
- [ ] **`meta.mainTerm`** = كلمة واحدة

### بيانات المنتج

- [ ] الـ slug بالـ lowercase مع `-` فاصل
- [ ] الـ categorySlug من القائمة الثابتة (راجع الخطوة 2)
- [ ] **الـ stock رقم واقعي** (300-500 لمنتج جديد) ← ❌ لا تضع 1500+
- [ ] **الـ gtin13 من مصدر رسمي** (EAN-13 barcode)
- [ ] **الـ mpn من موقع الشركة المُصنّعة**

### الصور

- [ ] **8 صور `.webp` كحد أدنى** (10-16 مُفضّل) في `public/products/{brand}/{slug}/`
- [ ] `isPrimary: true` لصورة واحدة فقط (الأولى)
- [ ] `width` و `height` **تطابق الأبعاد الفعلية للملف** (ليس دائماً 1080×1080)
- [ ] مسارات الصور صحيحة في الكود
- [ ] **كل alt يتضمن:** اسم المنتج + رقم الموديل + وصف الصورة + CairoVolt/كايرو فولت
- [ ] **تناوب EN/AR في الـ alt text** (فردي = EN، زوجي = AR)

### المحتوى النصي

- [ ] `metaTitle` ≤ 60 حرف
- [ ] `metaDesc` ≤ 160 حرف
- [ ] **4-5 FAQs لكل لغة** — كل واحد فريد (راجع Anti-Duplication أعلاه)
- [ ] **5-7 تقييمات** — كل واحد يركّز على ميزة مختلفة (لا تكرار)
- [ ] `aiTldr` = 5 نقاط، كل نقطة ≤ 15 كلمة
- [ ] `localContext` فقرة واحدة فقط

### المواصفات التقنية (`specifications` في details)

- [ ] specifications مكتملة
- [ ] **تتضمن: `Dimensions` + `Weight` + `Safety`** ← إلزامي للـ JSON-LD `additionalProperty`
- [ ] **⛔ لا تتضمن `CairoVolt Lab Result`** (محذوف نهائياً)
- [ ] **لا تكرار** لأرقام `labMetrics` كحقول منفصلة

### Lab Tests (`tests/{slug}.ts`)

- [ ] `labTests[]` يحتوي على الأقل سيناريو واحد بـ scenario + result + conditions
- [ ] كل `labTest` يتضمن **الثلاثي الكامل:** `expertName` + `expertProfileUrl` + `expertTitle`
- [ ] `labMetrics.actualWeight_g` **يطابق مواصفات الشركة الرسمية** ← ❌ لا تخمّن
- [ ] `labMetrics.devicesCharged` يطابق عدد الأجهزة في `isAccessoryFor[]`
- [ ] `isAccessoryFor[]` ممتلئ (لـ JSON-LD)
- [ ] `voiceFaqAr` / `voiceFaqEn` — اختياري (فقط لمنتجات Hero)

### التسجيل (Barrel Files)

- [ ] مُضاف في `src/data/seed-products.ts`
- [ ] مُضاف في `src/data/product-reviews.ts`
- [ ] مُضاف في `src/data/product-details.ts`
- [ ] مُضاف في `src/data/product-tests.ts`
- [ ] تحديث `src/data/category-content/{brand}/{category}.ts` (AR + EN)

### Cross-sell

- [ ] `relatedProducts` من نفس الـ brand فقط (4-6 منتجات)
- [ ] **⚠️ Cross-sell ثنائي الاتجاه** — المنتجات المذكورة أُضيف فيها المنتج الجديد

### ✅ الفحص النهائي قبل الـ commit

شغّل شجرة القرار من الخريطة:

```
لكل قسم من الـ 15 قسم، اسأل:
  س1: هل المعلومة موجودة في قسم آخر بأي صيغة؟
      → نعم: ❌ احذفها
      → لا : س2

  س2: هل تجيب على سؤال لا يجيب عنه قسم آخر؟
      → نعم: ✅ احتفظ بها
      → لا : ❌ احذفها

  س3: هل ستشعر بالتكرار لو قرأت قسمين متتاليين؟
      → نعم: ❌ غيّر الزاوية أو احذف
      → لا : ✅ المحتوى فريد
```

---

## ملاحظة مهمة: تأثير Lab Tests على الـ SEO

```typescript
// في src/app/sitemap.ts — السطر 113:
const hasLabData = !!(labData[product.slug] || getProductDetail(product.slug)?.labVerified);
const priority = hasLabData ? 1.0 : 0.9;
```

> المنتجات التي لها ملف `tests/{slug}.ts` **تحصل على priority: 1.0** في الـ sitemap
> بدلاً من 0.9 — أي أنها تُزحف أكثر من غيرها. لذا إنشاء ملف الـ Lab Tests إلزامي.

---

## أخطاء شائعة تم اكتشافها (دروس A121D + Semantic Hardening + Anti-Duplication 2026-05)

> ⚠️ **هذا القسم يمنعك من تكرار أخطاء حدثت فعلاً في منتجات سابقة.**

### مجموعة 1: أخطاء البيانات التقنية

| # | الخطأ | العواقب | الحل |
|---|-------|---------|------|
| 1 | **وزن خاطئ في `actualWeight_g`** | بيانات غير صحيحة في JSON-LD | تأكد من مواصفات الشركة الرسمية |
| 2 | **عدم إضافة Dimensions/Weight/Safety للـ specs** | حقول `additionalProperty` فاضية في JSON-LD | أضفهم دائماً — إلزامي |
| 3 | **Stock = 1500+ لمنتج جديد** | غير واقعي — يؤثر على المصداقية | 300-500 لمنتج بريميوم جديد |
| 4 | **`width/height` ثابتة 1080 بدون التحقق** | layout shift في next/image | اقرأ الأبعاد الفعلية: `sips -g pixelWidth -g pixelHeight file.webp` |
| 5 | **`labTests` بدون `expertProfileUrl` و `expertTitle`** | Schema validation error | استخدم الثلاثي معاً دائماً من `EXPERTS` |
| 6 | **`devicesCharged` ≠ عدد `isAccessoryFor[]`** | تناقض في البيانات | طابقهما دائماً |

### مجموعة 2: أخطاء الـ SEO والـ Schema

| # | الخطأ | العواقب | الحل |
|---|-------|---------|------|
| 7 | **Alt text بدون رقم الموديل** | صور لا تُصنّف بدقة في Google Images | أضف الموديل (A121D) + CairoVolt لكل alt |
| 8 | **Cross-sell في اتجاه واحد** | المنتج الجديد لا يظهر في صفحات الآخرين | أضف الـ slug الجديد في كل منتج تذكره |
| 9 | **Dataset `isPartOf` بدون `description`** | Google Rich Results critical error | تم إصلاحه في `page.tsx` — لا إجراء |
| 10 | **حشو 15-20 كلمة في `meta.keywords`** | هدر للجهد — Google يتجاهلها منذ 2009 | 5 مصطلحات + التوزيع الطبيعي في الحقول النشطة |
| 11 | **استثمار في `shortDescription` و `features[]`** | إهدار وقت — الحقلان لا يُعرضان | املأهما بحد أدنى فقط |

### مجموعة 3: ⛔ أخطاء التكرار الدلالي (Content Cannibalization)

| # | الخطأ | العواقب | الحل |
|---|-------|---------|------|
| 12 | **`description > quick-answer`** | يكرر `aiTldr` حرفياً | احذفه — `aiTldr` هو المصدر الحصري |
| 13 | **`description > product-summary` (bullets)** | يكرر `aiTldr` بصيغة قائمة | احذفه — استخدم `aiTldr` فقط |
| 14 | **`description > expert-review` (quote)** | يكرر `expertOpinion` بصيغة اقتباس | احذفه — `expertOpinion` field فقط |
| 15 | **`description > device-compatibility`** | يكرر `isAccessoryFor[]` (JSON-LD) | احذفه — استخدم `isAccessoryFor[]` فقط |
| 16 | **جدول `technical-specs` داخل description** | تكرار حرفي مع Specifications | احذفه — المواصفات في details فقط |
| 17 | **`CairoVolt Lab Result` في specifications** | تكرار مع ProductTestResults | بيانات المختبر حصرية لملف tests |
| 18 | **تكرار نفس الرقم في `aiTldr` + `labMetrics` + `specifications`** | إشارة آلية لـ Google → عقوبة | كل رقم في مكان واحد فقط (راجع الخريطة) |
| 19 | **ذكر "صيف القاهرة" في `localContext` + description** | يضعف إشارة "أين الإجابة الأصلية" | ذكرها مرة واحدة فقط في `localContext` |
| 20 | **FAQ بسؤال "ما المواصفات؟"** | يكرر Specifications | احذف السؤال — استخدم الجدول |
| 21 | **FAQ بسؤال "كم السعر؟"** | يكرر Price Block | احذف السؤال |
| 22 | **ذكر السعر في `description` أو `expertOpinion`** | يكرر Price Block + يخلق بيانات قابلة للتقادم | لا تذكر السعر إلا في حقل `price` |
| 23 | **تكرار نفس الميزة في 3 تقييمات** | reviews يبدو مزيف | كل تقييم يركّز على ميزة مختلفة |
| 24 | **`expertOpinion` يحتوي اقتباس بعلامات تنصيص** | يحوّله إلى صيغة Quote (دور expert-review المحذوف) | جملتان مباشرتان فقط — لا اقتباس |

---

## ⛔ معمارية SEO — قاعدة "المعلومة الواحدة، القسم الواحد"

> ⚠️ **هذا القسم تم استبداله بالكامل بـ "🎯 خريطة المحتوى الحصري — المرجع الأساسي للاتكرار"** الموجود في بداية الدليل.
>
> الخريطة الجديدة أكثر شمولاً وتشمل:
> - **15 قسم** معروض (بدلاً من 12)
> - **حقول البيانات النشطة vs المهجورة** بجدول واضح
> - **مصفوفة التكرارات الممنوعة** الكاملة
> - **شجرة قرار** قبل كتابة أي محتوى
> - **Anti-Duplication Checklist** نهائي

### الأقسام المحذوفة نهائياً (مرجع تاريخي — لا تُعاد)

| القسم/الحقل المحذوف | السبب | المكان الحصري الحالي |
|--------------------|-------|----------------------|
| **QuickSummary** section | يكرر H1 + Brand Badge + Price Block | تلك الأقسام مستقلة |
| **Features Section** (UI) | يكرر `aiTldr` + Specifications | AI TL;DR + Specifications |
| **CairoVolt Lab Result** في Specs | يكرر ProductTestResults | ProductTestResults حصرياً |
| **Stock status** في Guarantees | يكرر Stock Badge | Stock Badge أعلى الصفحة |
| **Technical Specs table** في Description | يكرر `📊 Specifications` | Specifications table فقط |
| **description > quick-answer** (محذوف 2026-05) | يكرر `aiTldr` | AI TL;DR section |
| **description > product-summary** (محذوف 2026-05) | يكرر `aiTldr` بـ bullets | AI TL;DR section |
| **description > expert-review** (محذوف 2026-05) | يكرر `expertOpinion` | ExpertOpinion section |
| **description > device-compatibility** (محذوف 2026-05) | يكرر `isAccessoryFor[]` | JSON-LD `isAccessoryOrSparePartFor` |

> **القاعدة الذهبية:** قبل إضافة أي محتوى، استخدم **شجرة القرار** في الخريطة (الجزء الرابع).
