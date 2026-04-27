# 🛒 دليل إضافة منتج جديد — CairoVolt (النسخة الكاملة)

## نظرة عامة: الملفات المطلوبة لكل منتج

> ⚠️ **النسخة الثالثة — مُحدّثة بعد تجربة A121D.** تشمل إصلاحات حرجة للـ Dataset Schema + Image Alt Text + Specs الإلزامية.

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
```
/{brand}/{categorySlug}/{slug}
مثال: /anker/wall-chargers/anker-a2147-gan-charger-30w
```

---

## الخطوة 2 — الـ categorySlug المتاحة

```typescript
"power-banks"     // باور بانك
"wall-chargers"   // شواحن حائط
"cables"          // كابلات شحن
"car-chargers"    // شواحن سيارة
"audio"           // سماعات وايربودز
"smart-watches"   // ساعات ذكية
"car-holders"     // حوامل سيارة
"speakers"        // مكبرات صوت بلوتوث
```

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
            id: "img_1",
            url: "/products/{brand}/{slug}/{image-filename}.webp",
            alt: "Anker A121D Nano 45W Smart Display charger front view 180° foldable plug - CairoVolt",
            // ⚠️ قواعد Alt Text الإلزامية — راجع القسم المخصص أدناه
            order: 0,
            isPrimary: true,
            width: 1080,
            height: 1080
        },
        // img_2 ... img_8+ بنفس الهيكل، isPrimary: false
    ],

    relatedProducts: [
        "slug-of-related-1",
        "slug-of-related-2",
        // 4-6 منتجات من نفس الـ brand
        // ⚠️ Cross-sell ثنائي الاتجاه — راجع القسم المخصص أدناه
    ],

    translations: {
        en: {
            name: "Brand Model — Feature1 | Feature2 | Warranty",
            shortDescription: "⚡ Feature1 | 🔬 Feature2 | 📱 Result | 🛡️ Warranty",
            description: `{HTML_CONTENT}`,
            features: ["⚡ Feature 1", "🔬 Feature 2", "📱 Feature 3"],
            metaTitle: "Product Name ⚡ X% OFF | Key Benefit | COD Egypt",
            metaDesc: "Buy Product in Egypt. Benefit1, Benefit2. ✓ Warranty ✓ Fast Delivery.",
            faqs: [
                { question: "Question?", answer: "Answer." },
                // 4-5 أسئلة
            ]
        },
        ar: {
            name: "اسم المنتج بالعربي — المميزة1 | المميزة2 | ضمان",
            shortDescription: "⚡ مميزة1 | 🔬 مميزة2 | 📱 نتيجة | 🛡️ ضمان",
            description: `{HTML_CONTENT_AR}`,
            features: ["⚡ مميزة 1", "🔬 مميزة 2", "📱 مميزة 3"],
            metaTitle: "اسم المنتج ⚡ خصم X% | فائدة رئيسية | ادفع عند الاستلام",
            metaDesc: "اشتري المنتج في مصر. فائدة1، فائدة2. ✓ ضمان ✓ توصيل سريع.",
            faqs: [
                { question: "سؤال؟", answer: "إجابة." },
            ]
        }
    },

    meta: {
        keywords: "keyword1, keyword2, keyword3, كلمة1, كلمة2, كلمة3",
        // ⚠️ 15-20 مصطلح — راجع قسم "استراتيجية الكلمات المفتاحية" أدناه
        mainTerm: "المصطلح الرئيسي للبحث"
    },

    expertOpinion: {
        en: "Short expert verdict in English — max 2 sentences.",
        ar: "رأي الخبير بالعربي — جملتين كحد أقصى."
    }
};
```

---

## قواعد كتابة الـ Description (HTML)

### هيكل الـ description الإلزامي — 6 أقسام بالترتيب:

```html
<!-- 1. Quick Answer — ملخص سريع -->
<div class="quick-answer">
    <p class="text-gray-800 leading-relaxed">
        جملة تفسيرية قوية تبدأ بـ "على عكس..." أو "بدلاً من..." 
        مع <strong>رقم محدد</strong> و<strong>فائدة واضحة</strong>.
    </p>
</div>

<!-- 2. Product Summary — أهم المميزات -->
<div class="product-summary">
    <h3 class="font-bold mb-2">The Bottom Line: / أهم المميزات:</h3>
    <ul class="list-none space-y-1">
        <li>⚡ <strong>Feature Name:</strong> Description.</li>
        <!-- 4-6 مميزات -->
    </ul>
</div>

<!-- 3. Expert Review — رأي الخبير -->
<div class="expert-review">
    <h2 class="text-xl font-bold mb-3 text-blue-800">
        The CairoVolt Verdict 💡 / خبراء كايرو فولت بيقولوا إيه؟ 🛠️
    </h2>
    <p class="text-gray-700 leading-relaxed text-lg">
        "نص المراجعة بين علامات اقتباس — مكتوب بلغة عامية مصرية"
        <br><span class="font-bold block mt-2">✍️ Review: CairoVolt Tech Team</span>
    </p>
</div>

<!-- 4. Product Details — تفاصيل تقنية (2-3 أقسام) -->
<div class="product-details">
    <section>
        <h2 class="text-2xl font-bold mb-2">عنوان المزية الأهم</h2>
        <p class="text-gray-700">شرح مفصل مع <strong>bold</strong> للأرقام.</p>
    </section>
    <section>
        <h2 class="text-2xl font-bold mb-2">عنوان المزية الثانية</h2>
        <p class="text-gray-700">شرح مع تطبيقات مصرية (كهرباء مصر، صيف القاهرة...).</p>
    </section>
</div>

<!-- 5. Technical Specs — جدول المواصفات -->
<div class="technical-specs">
    <h3 class="text-xl font-bold mb-4">Specifications: / المواصفات:</h3>
    <table class="w-full text-sm border-collapse border border-gray-300">
        <tr class="bg-gray-100">
            <td class="p-2 border">Spec Name</td>
            <td class="p-2 border font-bold">Value</td>
        </tr>
        <!-- سطر عادي، سطر رمادي — بالتناوب -->
        <tr>
            <td class="p-2 border">Spec Name</td>
            <td class="p-2 border">Value</td>
        </tr>
    </table>
</div>

<!-- 6. Device Compatibility — قائمة التوافق -->
<div class="device-compatibility">
    <h3 class="font-bold mb-2">Tested Device Compatibility: / توافق مختبر:</h3>
    <ul class="list-disc list-inside text-gray-700">
        <li>📱 <strong>iPhone 17/16/15:</strong> وصف الشحن.</li>
        <li>📱 <strong>Samsung Galaxy S26/S25:</strong> وصف الشحن.</li>
        <li>💻 <strong>MacBook Air M3:</strong> وصف.</li>
    </ul>
</div>

<!-- 7. Buyer Warning — تحذير المشتري (اختياري لكن مُستحسن) -->
<div class="buyer-warning">
    <h3 class="font-bold mb-2 text-red-700">⚠️ Buyer Warning: / تحذير للمشتري:</h3>
    <p class="text-gray-700">تحذير من المنتجات المقلدة أو سوء الاستخدام.</p>
</div>
```

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
| الأبعاد | `1080 × 1080` pixels |
| الأبعاد في الكود | `width: 1080, height: 1080` |
| الاسم | بالإنجليزي، lowercase، `-` كفاصل، ينتهي بـ `-cairovolt` |
| Alt text | ⚠️ راجع القواعد الإلزامية أدناه |

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

أضف في **3 أماكن**:

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

أضف في **3 أماكن**:

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

أضف في **3 أماكن**:

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

## قواعد الـ FAQs

- 4-5 أسئلة لكل لغة
- الأسئلة تكون محددة للمنتج ده — مش عامة
- تبدأ بـ "Does it...", "Can this...", "How long..." إلخ
- الإجابة تبدأ بـ "Yes" أو "No" أو رقم محدد
- الإجابة العربية عامية مصرية (أيوه/لا، بيعمل، بيشحن...)

---

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
            expertName: EXPERTS.POWER.name,       // أو EXPERTS.QA / EXPERTS.AUDIO / EXPERTS.CABLES
            expertProfileUrl: EXPERTS.POWER.profileUrl,
            expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
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

### قواعد الفرق بين EN و AR:

| العنصر | النسخة العربية `ar` | النسخة الإنجليزية `en` |
|--------|---------------------|------------------------|
| **اللغة** | عامية مصرية + فصيح | English احترافي |
| **Quick Answer** | تبدأ بتحدي مصري: "على عكس الشواحن المقلدة في السوق..." | تبدأ بوصف تقني: "The Anker X is a 30W GaN charger..." |
| **Expert Review** | عنوانه: "خبراء كايرو فولت بيقولوا إيه؟ 🛠️" | عنوانه: "The CairoVolt Verdict 💡" |
| **Expert Quote** | عامية مصرية كاملة — "الشاحن ده مش هيسخن عليك..." | إنجليزي احترافي — "The A2147 delivers full 30W..." |
| **Section Headers** | بالعربي: "تقنية GaN: العلم وراء الحجم" | بالإنجليزي: "GaN Technology: Science Behind the Size" |
| **Device Compatibility** | "توافق مختبر:" | "Tested Device Compatibility:" |
| **Buyer Warning** | "تحذير للمشتري:" | "Buyer Warning:" |
| **metaTitle** | "شاحن انكر GaN ⚡ خصم 9% \| أصغر شاحن \| ادفع عند الاستلام" | "Anker Nano 3 GaN 30W ⚡ 9% OFF \| Ultra Compact \| COD Egypt" |
| **metaDesc** | "اشتري شاحن انكر... ✓ ضمان ✓ توصيل سريع" | "Buy Anker... ✓ Warranty ✓ Fast Delivery" |
| **FAQs** | بالعامية: "يعني إيه GaN وليه أحسن؟" | بالإنجليزي: "What does GaN mean and why is it better?" |
| **FAQ Answer** | عامية: "أيوه، بس ببطء. الـ 30 واط ينفع..." | احترافي: "Yes, but slowly. The 30W output can..." |
| **Specs Table** | headers بالعربي: "نوع المنتج / التقنية..." | headers بالإنجليزي: "Product Type / Technology..." |
| **Keywords** | مزيج: "شاحن انكر GaN, anker gan charger, شاحن 30 واط" | مزيج: "anker 30w charger, anker nano 3, gan charger egypt" |
| **mainTerm** | الكلمة الرئيسية التي يبحث بها المصري | الكلمة الرئيسية الإنجليزية |

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

### الـ shortDescription — الصيغة المحددة:

```
EN: "⚡ [Spec] | 🔬 [Unique Feature] | 📱 [Result] | 🧠 [Tech] | 🔌 [Physical] | 🛡️ [Safety] | 🏆 [Warranty]"
AR: "⚡ [المواصفة] | 🔬 [الميزة الفريدة] | 📱 [النتيجة] | 🧠 [التقنية] | 🔌 [الفيزيائي] | 🛡️ [الأمان] | 🏆 [الضمان]"
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

### 2. الكثافة الدلالية — كل جملة = معلومة جديدة

```
✓ صح: "بطارية 20,000mAh بتقنية PowerIQ 3.0 — تشحن Samsung S24 Ultra مرتين ونص كاملين"
✗ غلط: "بطارية ذات سعة كبيرة تكفي لشحن هاتفك عدة مرات"
```

### 3. معادلة Quick Answer (45-60 كلمة إلزامية)

```
"على عكس [المشكلة الشائعة في السوق المصري] التي تسبب [الضرر المحدد]،
يتميز [اسم المنتج] بتقنية [اسم التقنية + رقم].
في ظل [تحدي محلي مصري]، يوفر لك [الميزة الرئيسية + رقم],
مع [الضمان/الشهادة] — مما يجعله [القيمة النهائية للعميل]."
```

### 4. قواعد FAQs — هيكل محدد للـ 5 أسئلة

| # | نوع السؤال | مثال عربي | مثال إنجليزي |
|---|-----------|-----------|--------------|
| 1 | توافق الجهاز | "هيشحن ايفون 15 Pro Max؟" | "Does it charge iPhone 15 Pro Max?" |
| 2 | سلامة البطارية | "30 واط مش هيضر البطارية؟" | "Is 30W safe for my phone battery?" |
| 3 | فرق بين الموديلات | "إيه الفرق بينه وبين 20 واط؟" | "How is this different from the 20W?" |
| 4 | سؤال عامي/عملي | "الشاحن ده بيسخن؟" | "Does it get hot during charging?" |
| 5 | الضمان | "الضمان بيغطي إيه؟" | "What does the warranty cover?" |

### 5. النبرة: خبير صادق — مش بائع

| ✓ صح | ✗ غلط |
|------|-------|
| "الشاحن مش هيفيدك لو لابتوبك بياخد 140W" | "أفضل شاحن يناسب الجميع!" |
| "بعد 6 شهور استخدام، البطارية بتحتفظ بـ 95%" | "بطارية عمرها طويل جداً" |
| "مناسب للشحن الليلي، مش للشحن السريع اليومي" | "يناسب كل احتياجاتك!" |

### 6. شهادات تُذكر في كل صفحة (حسب المنتج)

| الشهادة | المنتجات | الأهمية |
|---------|----------|---------|
| `MFi` | كابلات Lightning، شواحن | Apple تضمن التوافق والأمان |
| `USB-IF Certified` | كابلات USB-C | ضمان نقل 240W حقيقي |
| `UL Listed` | شواحن حائط | معيار السلامة الكهربائية |
| `IPX Rating` | سماعات، سبيكرات | مقاومة الماء الحقيقية |
| `FCC / CE` | معظم المنتجات | اعتماد عالمي |

### 7. قاعدة Internal Linking — Cross-sell ذكي

في `relatedProducts` ضع المنتجات بهذا المنطق السببي:

| إذا اشترى | يحتاج أيضاً |
|-----------|-------------|
| شاحن حائط | كابل USB-C + باور بانك (للخروج) |
| باور بانك | شاحن حائط (لشحن الباور بانك) + كابل |
| كابل | شاحن سريع يدعم fast charging |
| شاحن سيارة | كابل + حامل سيارة |
| سماعات | كابل شحن + باور بانك |

### 8. الـ Sentiment U-Curve — هيكل الوصف العاطفي

```
المقدمة (Quick Answer): مشكلة ← يثير القلق والاهتمام
الوسط (Product Details): حل تقني ← يبني الثقة بالأرقام والتقنيات
النهاية (Buyer Warning + Warranty): ضمان وأمان ← يُزيل الخوف من الشراء
```

### 9. قواعد التنسيق الإلزامية

| النوع | الاستخدام |
|-------|----------|
| `<ul>` قوائم نقطية | المقارنات + المميزات |
| `<ol>` ترقيم | خطوات الإعداد + "إزاي تعرف الأصلي" |
| `<table>` جداول | المواصفات + المقارنات |
| الفقرات | لا تتجاوز **4 أسطر** أبداً |
| الجمل | نوّع الطول — قصيرة وطويلة بالتناوب |

---

## استراتيجية الكلمات المفتاحية (Keywords)

> ⚠️ **15-20 مصطلح إلزامي** — تم اكتشاف أن 8 مصطلحات غير كافية للمنافسة في SERP المصري.

### تقسيم الكلمات المفتاحية:

| النوع | العدد | أمثلة |
|-------|-------|-------|
| **Brand + Model (EN)** | 3-4 | `anker nano 45w smart display`, `anker a121d` |
| **Long-tail (EN)** | 3-4 | `anker released a 45w nano charger featuring a smart display` |
| **Local Egypt (EN)** | 1-2 | `anker nano smart display egypt price` |
| **Brand + Model (AR)** | 2-3 | `شاحن انكر 45 واط شاشة ذكية`, `شاحن انكر نانو شاشة` |
| **عامي/عملي (AR)** | 3-4 | `شاحن انكر بشاشة مصر`, `افضل شاحن 45 واط` |
| **Cross-category (AR)** | 2-3 | `شاحن لابتوب وموبايل انكر`, `شاحن GaN بشاشة ذكية مصر` |

### مصادر البحث عن الكلمات:
1. Google Autocomplete (بالعربي والإنجليزي)
2. People Also Ask
3. Amazon/Noon Egypt search suggestions
4. المنافسين في SERP

---

## Checklist نهائي قبل الإضافة

### بيانات المنتج:
- [ ] الـ slug بالـ lowercase مع `-` فاصل
- [ ] الـ categorySlug من القائمة الثابتة
- [ ] **الـ stock رقم واقعي** (300-500 لمنتج جديد) ← ❌ لا تضع 1500+
- [ ] **الـ gtin13 من مصدر رسمي** (EAN-13 barcode)
- [ ] **الـ mpn من موقع الشركة المُصنّعة**

### الصور:
- [ ] 8-11 صور `.webp` بحجم 1080×1080
- [ ] مسارات الصور صحيحة في الكود
- [ ] **كل alt يتضمن: اسم المنتج + رقم الموديل + وصف الصورة + CairoVolt/كايرو فولت**
- [ ] **تناوب EN/AR في الـ alt text**

### المحتوى:
- [ ] الـ description يحتوي كل الأقسام الـ 7 (بما فيها buyer-warning)
- [ ] metaTitle ≤ 60 حرف
- [ ] metaDesc ≤ 160 حرف
- [ ] 4-5 FAQs لكل لغة
- [ ] 5-7 تقييمات واقعية
- [ ] aiTldr يحتوي 5 نقاط
- [ ] **الـ keywords تحتوي 15-20 مصطلح** (EN + AR + عامي مصري)

### المواصفات التقنية:
- [ ] specifications مكتملة
- [ ] **specifications تتضمن Dimensions + Weight + Safety** ← إلزامي للـ JSON-LD
- [ ] **الوزن `actualWeight_g` يطابق مواصفات الشركة الرسمية** ← ❌ لا تخمّن!
- [ ] **`devicesCharged` يطابق عدد الأجهزة في `isAccessoryFor`**

### التسجيل (Barrel Files):
- [ ] مُضاف في seed-products.ts
- [ ] مُضاف في product-reviews.ts
- [ ] مُضاف في product-details.ts
- [ ] مُضاف في product-tests.ts
- [ ] تحديث category-content/{brand}/{category}.ts (AR + EN)

### Cross-sell:
- [ ] relatedProducts من نفس الـ brand
- [ ] **⚠️ Cross-sell ثنائي الاتجاه — المنتجات المذكورة أُضيف فيها المنتج الجديد**

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

## أخطاء شائعة تم اكتشافها (دروس تجربة A121D)

> ⚠️ **هذا القسم يمنعك من تكرار نفس الأخطاء.**

| # | الخطأ | العواقب | الحل |
|---|-------|---------|------|
| 1 | **وزن خاطئ في `actualWeight_g`** | بيانات غير صحيحة في JSON-LD | تأكد من مواصفات الشركة الرسمية |
| 2 | **عدم إضافة Dimensions/Weight/Safety للـ specs** | حقول `additionalProperty` فاضية في JSON-LD | أضفهم دائماً — إلزامي |
| 3 | **Cross-sell في اتجاه واحد** | المنتج الجديد لا يظهر في صفحات المنتجات الأخرى | افتح كل منتج مذكور وأضف slug الجديد |
| 4 | **Alt text بدون رقم الموديل** | صور لا تُصنّف بدقة في Google Image Search | أضف الموديل (A121D) + CairoVolt لكل alt |
| 5 | **Stock = 1500+ لمنتج جديد** | غير واقعي — يؤثر على مصداقية البيانات | 300-500 لمنتج بريميوم جديد |
| 6 | **Keywords أقل من 10** | تفقد ترافيك من long-tail searches | 15-20 مصطلح مع عبارات عامية مصرية |
| 7 | **Dataset `isPartOf` بدون `description`** | ❌ Google Rich Results critical error | تم إصلاحه في `page.tsx` — لا يتطلب إجراء |
