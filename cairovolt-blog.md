# 📝 دليل كتابة تدوينات CairoVolt

> المرجع التنفيذي لكتابة أي مقال جديد. مبني على تحليل 5 مقالات حديثة (مايو–أبريل 2026).
> **مراجع مرتبطة:** [`content-laws.md`](content-laws.md) (القوانين العابرة — i18n + Bilingual + Voice + Authority + Anti-AI) · [`voice.md`](voice.md) (DNA الأسلوب — اقرأه أولاً) · [`cairovolt-blog-roadmap.md`](cairovolt-blog-roadmap.md) (قائمة الموضوعات الحية) · [`new_product_guide.md`](new_product_guide.md) (إضافة منتج) · [`cairovolt_content_blueprint.md`](cairovolt_content_blueprint.md) (Burstiness/AEO/E-E-A-T) · [`src/data/blog/_types.ts`](src/data/blog/_types.ts) (Schema) · [`src/data/blog-articles.ts`](src/data/blog-articles.ts) (Barrel)

---

## 📌 Cheat Sheet — القواعد التي لا تُكسر

> مرجع سريع لكل أرقام/قواعد المقال. التفاصيل في الأقسام المُشار إليها.

| الحقل / القاعدة | القيمة | المرجع |
|------------------|--------|--------|
| **Word count** (لكل لغة) | 🔴 **≥ 1,500 كلمة — لا يُكسر** (الهدف 1,500-2,000) | [`voice.md`](voice.md) |
| **H2 sections** | 4-6 | §6 |
| **FAQ** | 4 بالضبط | §11 |
| **relatedProducts** | 5-6 | §10 |
| **relatedArticles** | 3 بالضبط (من نفس العنقود) | §10 + [`roadmap`](cairovolt-blog-roadmap.md) |
| **readingTime** | 6-8 دقائق | §Schema |
| **metaTitle** | ≤ 60 حرف | §13 |
| **metaDescription** | 150-155 حرف | §13 |
| **quickAnswer** | 45-80 كلمة (يطابق Quick-Answer Box) | §4, §13 |
| **excerpt** | 20-30 كلمة | §Schema |
| **keywords** | 8-12 مصطلح | §13 |
| **coverImage** | إلزامي — `.webp` 1200×630 | §2 |
| **category** | من 5: `buying-guide`, `comparison`, `how-to`, `review`, `tips` | §0 |
| **Ammiyya ratio** | 85% عامية / 15% MSA | [`voice.md`](voice.md) |
| **أول 200 كلمة** | فكاهة إلزامية (نكتة/مفارقة/سخرية) | [`voice.md`](voice.md) |
| **⚖️ i18n href (AR)** | `<a href="/anker/...">` بدون `/en/` | [`content-laws.md`](content-laws.md) §1 |
| **⚖️ i18n href (EN)** | `<a href="/en/anker/...">` بـ `/en/` | [`content-laws.md`](content-laws.md) §1 |
| **Anchor text language** | يطابق لغة المحتوى (AR→عربي / EN→إنجليزي) | §10 |
| **🎧 Soundcore links** | استخدم `/soundcore` للهب · `/soundcore/audio` لايربودز · `/soundcore/speakers` للسبيكرات | §10 + [`SOUNDCORE-STRATEGY.md`](SOUNDCORE-STRATEGY.md) |
| **Quick-Answer Box** | إلزامي في أول 50px، ملوّن، مطابق `quickAnswer` | §4 |
| **Expert Callout** | إلزامي عند الادعاء بأي اختبار ميداني | §5 |
| **Specificity** | كل ادعاء برقم. لا "بيسخن"/"كبير"/"جيد" | [`content-laws.md`](content-laws.md) §4 |

> 🔴 **قبل أي commit:** (1) شغّل أمري `grep` في [`content-laws.md`](content-laws.md) §1 — يجب أن تكونا **0 سطر**. (2) شغّل أمر عدّ الكلمات (§16-A أدناه) — يجب أن يكون AR ≥ 1,500 و EN ≥ 1,500 أو **لا commit**.

---

## 🚨 AUTO-TRIGGER PROTOCOL (اقرأ أولاً — إلزامي)

> **القاعدة الذهبية:** أي رسالة تُرسل مسار هذا الملف **أو** مسار [`cairovolt-blog-roadmap.md`](cairovolt-blog-roadmap.md) — **بغض النظر عن نصها** — = **أمر ضمني وكامل ببدء كتابة الموضوع التالي تلقائياً**. لا تنتظر تأكيداً. لا تسأل. ابدأ التنفيذ مباشرةً.

| الحالة | السلوك |
|--------|--------|
| إرسال مسار `cairovolt-blog.md` أو `cairovolt-blog-roadmap.md` فقط | ✅ ابدأ Auto-Workflow فوراً |
| إرسال أيٍّ منهما + رسالة بدون أمر واضح | ✅ ابدأ Auto-Workflow فوراً |
| إرسال أيٍّ منهما + Trigger Phrase معروف | ✅ ابدأ Auto-Workflow فوراً |
| طلب رقم صراحةً ("اكتب #42") | ✅ ابدأ بالموضوع المحدد |
| طلب صريح لمراجعة/تعديل/سؤال | ⛔ نفّذ ما طُلب فقط — لا تكتب مقالاً |

**بروتوكول التنفيذ (بالترتيب):**

1. أعلن سطر واحد: `"بدء كتابة #N — [العنوان]"`
2. **اقرأ [`voice.md`](voice.md)** أولاً (إلزامي — DNA الأسلوب والفكاهة)
3. **اقرأ [`content-laws.md`](content-laws.md)** (إلزامي — i18n Quarantine + Bilingual Parity + Authority + Anti-AI)
4. **اقرأ [`cairovolt-blog-roadmap.md`](cairovolt-blog-roadmap.md)** واعثر على أول ⬜
5. نفّذ كامل الـ Workflow (الـ 17 خطوة أدناه) بدون توقف
6. **شغّل أمر عدّ الكلمات (§16-A) — يجب AR ≥ 1,500 و EN ≥ 1,500 قبل أي خطوة تالية**
7. شغّل `npm run build` للتحقق
8. اعمل `commit + push` على GitHub
9. **حدّث `cairovolt-blog-roadmap.md`** (⬜ → ✅) — لا تعدّل هذا الملف
10. قدّم تقرير 5 أسطر

**Trigger Phrases إضافية:** "اكتب موضوع جديد/تدوينة جديدة" · "اكمل المدونة" · "اكتب التدوينة التالية" · "ابدأ موضوع من القائمة" · "Write the next blog post" · "اكتب موضوع #N".

> ⚠️ **استثناء وحيد:** إذا الموضوع يحتاج بيانات اختبار ميداني لا تملكها → سؤال واحد مركّز ثم تابع.

---

## 🗺️ Workflow كامل في 17 خطوة

| # | الخطوة | المخرج |
|---|--------|--------|
| 0 | اختيار الزاوية + بحث ميداني (Information Gain) | زاوية فريدة + أرقام |
| 1 | Slug + Title + Category | 3 قرارات أساسية |
| 2 | Metadata (author/readingTime/coverImage/dates) | حقول الـ schema |
| 3 | معمارية المقال (Template الأساسي) | هيكل ثابت |
| 4 | Quick-Answer Box (إلزامي) | صندوق ملوّن أول 50px |
| 5 | Expert Callout (إن وُجد اختبار) | callout مع منهجية |
| 6 | Body Content (H2/H3 + tables + lists) — 🔴 **≥ 1,500 كلمة لكل لغة — ممنوع الانتهاء قبل الوصول** | 5-7 أقسام |
| 7 | Voice & Tone — **التزم بـ [`voice.md`](voice.md) بالكامل** (فكاهة + عمق أكاديمي + أول 200 كلمة فكاهية) | نبرة CairoVolt |
| 8 | Authority Signals (أرقام محددة) | كل ادعاء برقم |
| 9 | السياق المصري (OLX، حرارة، EGP) | 2-3 إشارات |
| 10 | Internal Linking (relatedProducts + relatedArticles) | 5-6 + 3 |
| 11 | FAQ (4 أسئلة فريدة) | لا تكرر body |
| 12 | Bilingual Parity (EN === AR) | عمق متساوٍ |
| 13 | SEO (metaTitle ≤60 / metaDesc 150-155 / keywords / quickAnswer 45-80) | حقول SEO |
| 14 | تسجيل في `blog-articles.ts` | import + array |
| 15 | Checklist نهائي + تحديث `cairovolt-blog-roadmap.md` | تحقق شامل |
| **16** | **`npm run build` للتحقق من نجاح البناء** | **build خالٍ من الأخطاء** |
| **17** | **`git add` + `git commit` + `git push origin main` → رفع على GitHub** | **Commit منشور على GitHub** |

**الملفات المطلوبة لكل مقال:** (1) `src/data/blog/{slug}.ts` جديد · (2) `public/images/blog/posts/{slug}.webp` (موجود مسبقاً في المستودع لجميع المقالات، لا تقم بإنشائه أو استبداله) · (3) `src/data/blog-articles.ts` تعديل.

**بعد الانتهاء:** حدّث القائمة أدناه — استبدل ⬜ بـ `✅ → slug: {final-slug}` باستخدام Edit tool (سطر واحد فقط).

---

## 🚀 الخطوة 16-A — بوابة التدقيق (إلزامي قبل Build)

> 🔴 **هذه الخطوة غير قابلة للتخطّي.** لا يُقبل التخمين أو التقدير — شغّل الأمر وتحقق من الرقم الفعلي.

**البوابة الرسمية (استخدم هذه):**

```bash
# تدقيق شامل لمقال واحد: عدّ الكلمات + i18n leaks + FAQ=4 + quickAnswer + coverImage + relatedArticles
npm run audit:blog {slug}

# أو تدقيق كل المقالات المنشورة دفعة واحدة:
npm run audit:blog
```

> السكربت (`scripts/audit-blog.js`) يفشل بـ `exit 1` لو أي شرط لم يتحقق: AR < 1,500 · EN < 1,500 · تسريب `/en/` في AR أو غيابه في EN · FAQ ≠ 4 لكل لغة · غياب `quickAnswer` أو `coverImage` · `relatedArticles` ≠ 3. **فشل = توقّف وأصلح، لا تكمل للـ build.**

<details><summary>أمر عدّ الكلمات اليدوي (احتياطي — لو السكربت غير متاح)</summary>

```bash
# شغّل هذا الأمر بعد كتابة المقال مباشرةً — قبل npm run build
node -e "
const fs = require('fs');
const content = fs.readFileSync('src/data/blog/{SLUG}.ts', 'utf8');
const strip = s => s.replace(/<[^>]*>/g, ' ').replace(/\\s+/g, ' ').trim();
const wc = s => s.split(' ').filter(w => w.length > 0).length;
const arMatch = content.match(/ar:\\s*\\{[\\s\\S]*?content:\\s*\\\`([\\s\\S]*?)\\\`/);
const enMatch = content.match(/en:\\s*\\{[\\s\\S]*?content:\\s*\\\`([\\s\\S]*?)\\\`[\\s\\S]*?\\}\\s*,?\\s*\\}\\s*,?\\s*\\}/);
const ar = arMatch ? wc(strip(arMatch[1])) : 0;
const en = enMatch ? wc(strip(enMatch[1])) : 0;
console.log('AR:', ar, ar >= 1500 ? '✅' : '❌ ناقص ' + (1500-ar) + ' كلمة');
console.log('EN:', en, en >= 1500 ? '✅' : '❌ short by ' + (1500-en));
if (ar < 1500 || en < 1500) { console.log('\\n🚫 BLOCKED — أضف محتوى قبل المتابعة'); process.exit(1); }
else console.log('\\n✅ PASS — متابعة للـ build');
"
```

</details>

**القاعدة الصارمة:**
- 🚫 AR < 1,500 كلمة → **أضف أقساماً جديدة — لا تتابع**
- 🚫 EN < 1,500 كلمة → **أضف أقساماً جديدة — لا تتابع**
- ✅ كلاهما ≥ 1,500 → تابع للـ build

> [!IMPORTANT]
> **سبب مشكلة نقص الكلمات وطريقة تفاديها:**
> كتابة النسخة العربية والإنجليزية بمجموع ≥ 3,000 كلمة في رسالة واحدة تفوق الحد الأقصى للمخرجات (Output Token Limit) في النماذج الذكية، مما يؤدي إلى قطع النص أو تلخيصه تلقائياً.
> **الحل الإلزامي والصارم:**
> 1. لا تحاول كتابة المقال بالكامل في خطوة واحدة.
> 2. اكتب الهيكل العام والمقدمات والـ metadata أولاً.
> 3. اكتب الأقسام بالتفصيل واحداً تلو الآخر (Incremental Expansion) لضمان عمق المحتوى.
> 4. شغّل أمر عدّ الكلمات (§16-A) وتأكد من تخطي 1,500 كلمة لكل لغة قبل البدء بالـ build والـ commit.

**الأقسام الشائعة لإكمال العدد:**
- قسم "الأسئلة الأكثر شيوعاً" بتفصيل إضافي
- قسم مقارنة جدولية موسّعة (3+ معايير)
- قسم "الأخطاء الشائعة" بأمثلة مصرية
- قسم "نصائح الشراء" + روابط منتجات
- قسم "الخلاصة العملية" بـ bullet points مفصّلة

---

## 🚀 الخطوة 16-B — البناء (`npm run build`) بعد التحقق من الكلمات

> **إلزامي بعد نجاح §16-A.** البناء يكشف أخطاء TypeScript/Next.js.

```bash
cd /Users/ahmedsalem/Desktop/all\ my\ projects/mobile_accessories
npm run build
```

**معايير النجاح:**

- ✅ `Compiled successfully` بدون أخطاء حمراء
- ✅ صفحة المقال الجديدة تظهر في قائمة الـ static pages (`/blog/{slug}` بالعربي + `/en/blog/{slug}`)
- ✅ لا تحذيرات critical (warnings فقط مقبولة)

**عند فشل البناء:**

1. اقرأ الخطأ بعناية — غالباً: حقل ناقص في الـ schema، أو import غلط، أو HTML غير صالح في الـ content
2. أصلح المشكلة في الملف المتأثر
3. أعد `npm run build` حتى ينجح
4. ❌ لا تعمل push قبل نجاح البناء

---

## 🌐 الخطوة 17 — الرفع على GitHub عبر `git push`

> الـ remote = `origin` → `https://github.com/taysirco/cairovolt.com.git`. كل push على `main` يرفع التغييرات لمستودع GitHub فقط.

**أوامر الرفع (نفّذها بالترتيب):**

```bash
# 1. تحقق من الملفات المعدّلة
git status

# 2. أضف ملفات المقال الجديدة فقط (لا تستخدم git add -A)
git add src/data/blog/{slug}.ts \
        src/data/blog-articles.ts \
        cairovolt-blog.md \
        public/images/blog/posts/{slug}.webp

# 3. commit برسالة وصفية (heredoc لضمان الفورمات)
git commit -m "$(cat <<'EOF'
feat(blog): add article #N — {short-title-en}

{1-sentence summary: unique angle / information gain}

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"

# 4. push على main → يرفع التغييرات على GitHub
git push origin main
```

**صيغة رسالة الـ commit:**

| نوع التغيير | البادئة | مثال |
| ------------ | --------- | ------ |
| مقال جديد | `feat(blog):` | `feat(blog): add article #2 — 100W power banks for iPhone 17 & S26` |
| تعديل مقال موجود | `fix(blog):` أو `refactor(blog):` | `fix(blog): correct iPhone 17 charging cap from 27W to 30W` |
| تحديث صور غلاف | `perf(blog):` أو `chore(blog):` | `chore(blog): optimize cover image for #3` |

**معايير القبول قبل الـ push:**

- ✅ **§16-A عدّ الكلمات:** AR ≥ 1,500 و EN ≥ 1,500 — **شرط أول وأصعب**
- ✅ `npm run build` نجح في الخطوة 16-B
- ✅ المقال مسجّل في `blog-articles.ts` (import + array)
- ✅ القائمة في `cairovolt-blog-roadmap.md` محدّثة (⬜ → ✅)
- ✅ صورة الغلاف موجودة فعلاً في `public/images/blog/posts/`
- ✅ لا secrets أو ملفات .env في الـ staged changes

**بعد الـ push:**

- تأكد من ظهور رسالة `To https://github.com/taysirco/cairovolt.com.git` ورقم الـ commit الجديد
- شغّل `git status` للتأكد من رسالة `Your branch is up to date with 'origin/main'`
- لو الـ push فشل (rejected/auth error)، شوف رسالة الخطأ وأصلح قبل المقال التالي

> ⚠️ **ممنوع تماماً:** `git push --force` على main · `--no-verify` · push بدون build ناجح · push secrets/credentials. لو الـ pre-commit hook فشل، أصلح السبب الجذري وأعمل commit جديد (لا تستخدم `--amend` على commits منشورة).

---

## 🗺️ المحتوى الحي — قائمة المنشور والخطة

> القائمة الكاملة (55 مقال منشور + 228 موضوع مخطط + العناقيد + Auto-Workflow) **انتقلت إلى ملف منفصل** ليبقى هذا الملف خفيفاً ومستقراً:
>
> 🗺️ **[`cairovolt-blog-roadmap.md`](cairovolt-blog-roadmap.md)** — اقرأه لاختيار الموضوع التالي.
>
> **بعد كل مقال:** حدّث `cairovolt-blog-roadmap.md` (⬜ → ✅) — لا تعدّل هذا الملف.
> **مصدر الحقيقة للمنشور:** `src/data/blog/*.ts` + `src/data/blog-articles.ts`.

---

## 🧬 CairoVolt Blog DNA — 10 ركائز للهوية

1. **Question-First Authority** — العنوان يطرح مشكلة ("ليه؟"/"إزاي؟"/"هل؟") + حلول مرقّمة
2. **Egyptian Market Lens** — OLX، عامية، EGP، توصيل محلي
3. **Quick-Answer-Before-Analysis** — TL;DR ملوّن في أول 50px
4. **Specificity Over Vagueness** — "72°م" بدل "بيسخن"، "4 من 5 مقلّد"، "750ج"
5. **Testing as Trust Signal** — اختبارات ميدانية بمنهجية معلنة (لا اقتباسات خارجية)
6. **Formula + Flexibility** — هيكل ثابت (TL;DR → Callout → H2 → Tables → FAQ) + عمق 6-8 د
7. **Conversational Ammiyya with Technical Depth** — "إنت" بجانب فيزياء أشباه الموصلات **(المرجع الكامل: [`voice.md`](voice.md) — فكاهة أكاديمية + قاعدة الـ 200 كلمة + 🔴 ≥ 1,500 كلمة/مقال — تحقق بـ §16-A)**
8. **Internal Linking Web** — كل مقال يربط بـ 3 ذات صلة (عناقيد موضوعية)
9. **Bilingual Parity** — EN ليس ملخصاً؛ نسخة موازية بنفس العمق
10. **CairoVolt as Trusted Partner** — موزع/مختبر/مُعلِّم — لا بيع صارخ

---

## 🗂️ الـ Schema (`BlogArticle`) + المعايير الموحدة

```typescript
// src/data/blog/_types.ts
export interface BlogArticle {
    slug: string;                                       // lowercase + dashes
    category: 'buying-guide' | 'comparison' | 'how-to' | 'review' | 'tips';
    publishDate: string;                                // ISO 'YYYY-MM-DD'
    modifiedDate: string;                               // حدّثه عند كل تعديل
    readingTime: number;                                // 6-8 دقائق
    relatedProducts: string[];                          // 5-6 product slugs
    relatedArticles?: string[];                         // 3 بالضبط (إلزامي عملياً)
    relatedCategories: string[];                        // مثلاً ["Anker/power-banks"]
    coverImage?: string;                                // إلزامي — .webp في /images/blog/posts/
    author?: {
        name: { ar: string; en: string };
        title: { ar: string; en: string };
        avatar: string;
        url?: string;
        socials?: { youtube?, instagram?, twitter?, facebook?, tiktok? };
    };
    translations: {
        ar: {
            title: string;                              // ≤ 70 حرف
            metaTitle: string;                          // ≤ 60 حرف
            metaDescription: string;                    // 150-155 حرف
            keywords: string;                           // 8-12 مصطلح (AR+EN+long-tail)
            excerpt: string;                            // 20-30 كلمة
            content: string;                            // HTML
            faq?: Array<{ question; answer }>;          // 4 بالضبط
            quickAnswer?: string;                       // 45-80 كلمة
        };
        en: { /* نفس الهيكل */ }
    };
}
```

| المعيار | القيمة |
|---------|--------|
| `readingTime` | **6-8 دقائق** |
| H2 sections | **4-6 أقسام** |
| `faq` count | **4 بالضبط** |
| `relatedProducts` | **5-6** |
| `relatedArticles` | **3 بالضبط** |
| `metaDescription` | **150-155 حرف** |
| `metaTitle` | **≤ 60 حرف** |
| `quickAnswer` | **45-80 كلمة** |
| `coverImage` | **إلزامي دائماً** |
| Ammiyya ratio | **85% عامية / 15% MSA** |

> ⚠️ **حقول `optional` لكن إلزامية عملياً:** `relatedArticles`, `coverImage`, `faq`, `quickAnswer`.

---

## 🚀 تفاصيل الـ Workflow

### الخطوة 0 — اختيار الزاوية + البحث الميداني

> ⚠️ **لا تكتب حرفاً قبل تنفيذ هذا.**

**اسأل قبل البحث:** ما السؤال الذي لا يجيب عنه أحد؟ · ما خطأ المنافسين (أرقام قديمة، نصائح عامة، لا اختبار)؟ · هل لدي زاوية فريدة (اختبار، فك منتج، تجربة طويلة)؟

**البحث الميداني:**
```
□ Google: "[الموضوع] في مصر 2026"
□ Google: "هل [الموضوع]" / "ليه [الموضوع]" (PAA)
□ تحليل أول 3 منافسين في SERP — سجّل الفجوات والأخطاء
□ مراجع عالمية (Tom's Guide, RTINGS, datasheets) — استخرج الأرقام
□ اشترِ/اختبر (5+ عينات بمنهجية معلنة) إن استحق
```

**اختيار الـ category:**

| الفئة | متى | أمثلة |
|-------|-----|-------|
| `how-to` | تعليمي إجرائي | "كيف تعرف انكر الأصلي؟" |
| `buying-guide` | اختيار/شراء | "أفضل باور بانك للابتوب 2026" |
| `tips` | حل مشكلة يومية | "ليه كابل الشحن بيبوظ؟" |
| `comparison` | مقارنة بين خيارين+ | "Anker vs Joyroom" |
| `review` | مراجعة منتج واحد | (نادر) |

---

### الخطوة 1 — Slug + Title

**Slug:** `{question-or-keyword}-{specifier}-{action-or-result}` · lowercase + `-` · 3-7 كلمات · لا أحرف عربية · لا أرقام إلا للسنة.

**صيغ Title ناجحة:**

| الصيغة | AR | EN |
|--------|----|----|
| سؤال + رقم + فائدة | "كيف تعرف انكر الأصلي؟ 5 طرق مضمونة" | "How to Identify Original Anker: 5 Guaranteed Methods" |
| سؤال + سنة | "هل الباور بانك يشحن لابتوب؟ الدليل الشامل 2026" | "Can a Power Bank Charge a Laptop? Complete 2026 Guide" |
| مشكلة + رقم + حل | "ليه كابل الشحن بيبوظ بسرعة؟ 6 أخطاء + الحل" | "Why Your Cable Keeps Breaking: 6 Mistakes & Fixes" |
| براند + دليل + سنة | "دليل سماعات Soundcore الشامل في مصر 2026" | "Complete Soundcore Earbuds Guide Egypt 2026" |
| حقيقة مخفية + خبير | "الحقيقة المخفية عن شواحن GaN — أحمد مدحت" | "The Hidden Truth About GaN Chargers — Ahmed Medhat" |

**قواعد:** السنة (2026) للمواضيع المتغيرة · رقم في العنوان · trigger عاطفي ("الحقيقة المخفية"/"مضمونة"/"في مصر") · ❌ كليشيهات: "أفضل" بدون رقم، "كل ما تحتاج"، "دليل شامل" بدون qualifier.

---

### الخطوة 2 — Metadata

```typescript
{
    slug: '{slug}',
    category: 'how-to',
    publishDate: '2026-05-17',                          // لا تُغيّره
    modifiedDate: '2026-05-17',                         // حدّثه عند كل تعديل
    readingTime: 8,                                     // 7-9 — احسبها: 200 كلمة/د عربي، 250 إنجليزي (1,500 AR = ~7.5 د، 1,500 EN = ~6 د)
    relatedProducts: ['slug-1', /* ... */ 'slug-6'],    // 5-6
    relatedArticles: ['slug-a', 'slug-b', 'slug-c'],    // 3 بالضبط
    relatedCategories: ['Anker/power-banks'],    // أو ['Soundcore/audio'] لمنتجات الصوتيات
    coverImage: '/images/blog/posts/{slug}.webp',       // 1200×630، .webp
    author: {
        name: { ar: 'فريق كايرو فولت', en: 'CairoVolt Team' },
        title: { ar: 'محرر تقني', en: 'Tech Editor' },
        avatar: '/images/team/cairovolt-team.webp',
    },
}
```

**قاعدة Author:**

| الحالة | استخدم |
|--------|--------|
| مقال تقني فيزيائي/هندسي عميق | خبير مُسمّى + socials (مثل Ahmed Medhat لـ GaN) |
| how-to عام / buying-guide | `CairoVolt Team` افتراضياً |
| يحتوي اختبار ميداني | "فريق كايرو فولت اختبر..." |

---

### الخطوة 3 — معمارية المقال (ثابتة)

```
1. <p> فقرة افتتاحية (1-2 جمل تُؤطّر المشكلة)
2. <div class="quick-answer-inline"> Quick-Answer Box                ← إلزامي (أول 50px)
3. <div class="expert-callout"> Expert Callout                       ← لو في اختبار
4. <h2> القسم 1 (مشكلة/تشخيص)
   <h2> القسم 2 (تحليل/علم) + <table> أو <ul> لو مقارنات
   <h2> القسم 3 (حل/توصية)
   <h2> القسم 4 (تطبيق عملي)
   <h2> القسم 5 (تحذيرات/مزالق)
5. <div class="cta-box"> CTA متكامل                                  ← اختياري
6. <h2> الأسئلة الشائعة (تظهر تلقائياً من faq[])
7. <div class="sources-box"> المراجع                                 ← لو في external refs
```

**ملاحظات:** الـ `content` يحتوي 1-5 (FAQ من حقل منفصل) · H2 = 4-6 (لا أقل من 3) · لا H1 داخل content.

---

### الخطوة 4 — Quick-Answer Box (إلزامي)

**يظهر في أول 50px · 45-80 كلمة · يطابق `quickAnswer` field · مُلوّن حسب السياق.**

```html
<!-- 🔵 معلوماتي/إيجابي — أزرق -->
<div class="quick-answer-inline" style="background:#eff6ff;border-right:4px solid #2563eb;padding:16px 20px;margin:24px 0;border-radius:8px;">
    <p style="margin:0;font-size:16px;line-height:1.7;color:#1e40af;">
        <strong>💡 الإجابة السريعة:</strong> [إجابة 45-80 كلمة — أرقام/شروط مرقّمة]
    </p>
</div>

<!-- 🔴 تحذير — أحمر: background:#fef2f2 / border:#dc2626 / color:#991b1b / <strong>⚠️ تحذير سريع:</strong> -->
<!-- 🟡 خلاصة — أصفر: background:#fefce8 / border:#ca8a04 / color:#854d0e / <strong>🎯 الخلاصة:</strong> -->
```

> ⚠️ **في النسخة EN:** بدّل `border-right` → `border-left` (RTL → LTR).

**مثال حقيقي:** "أيوا، الباور بانك يقدر يشحن لابتوب — بشرط 3 حاجات: (1) منفذ USB-C PD، (2) خرج 30W على الأقل (المثالي 65W+)، (3) سعة 20,000mAh+ لشحنة كاملة. أفضل خيار: **Anker 737 (140W / 24,000mAh)**."

> 🎯 محتوى الـ Box = `quickAnswer` field (يُستخدم في AI Overviews + Featured Snippets + Voice Search).

---

### الخطوة 5 — Expert Callout (للاختبارات)

**متى:** اختبار ميداني (اشترينا/فكّكنا/قِسنا) · بيانات معملية حصرية · تجربة شهر+. ❌ ليس للمقالات النظرية.

```html
<div class="expert-callout" style="background:#f9fafb;border:1px solid #e5e7eb;border-right:4px solid #059669;padding:20px;margin:32px 0;border-radius:8px;">
    <p style="margin:0 0 8px 0;font-size:15px;color:#059669;font-weight:bold;">🔬 اختبار كايرو فولت</p>
    <p style="margin:0;font-size:15px;line-height:1.8;color:#374151;">
        [المنهجية — N عينات، من أين، متى، إزاي]
        <strong>النتيجة:</strong> [رقم محدد + مقارنة مع المعيار].
    </p>
</div>
```

**مثال:** "اشترينا 5 منتجات Anker من OLX خلال شهر مارس 2026 — وفكّكناها تحت المكبر بمساعدة فني صيانة. **النتيجة: 4 من 5 كانت مقلّدة.** الفروق: لحام بدائي، أسلاك ألومنيوم بدل النحاس، حرارة 72°م تحت الحمل مقابل 45°م للأصلي."

**قواعد المنهجية:** عدد عينات بدقة (5/8/16) · مصدر بصراحة (OLX/Facebook/Amazon) · تاريخ (شهر/سنة) · قارن مع المعيار.

> ⚠️ **ملاحظة: CairoVolt Labs Box الثابت.** صفحة المقال (`blog/[slug]/page.tsx`) تعرض صندوق **"مختبر كايرو فولت — بيانات طرف أول"** بشكل ثابت (hardcoded) لكل المقالات — يذكر م. يحيى رضوان واختبار Anker 737. هذا الصندوق **لا يُشتق من بيانات المقال** — مبرمج مباشرة في الصفحة. لذلك: اكتب Expert Callout في الـ `content` للاختبارات الخاصة بموضوع المقال — الصندوق الثابت يُكمله ولا يُكرره.

---

### الخطوة 6 — Body Content

**H2:** سؤالي أو إجرائي · ≤ 8 كلمات · مرقّم لو سلسلة ("الخطأ #1: ...") · يتضمن كلمة مفتاحية فرعية أو PAA.

**Tables:** استخدمها لـ 3+ مقارنات / مواصفات تقنية / before-after.
```html
<table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:15px;">
    <thead><tr style="background:#f3f4f6;">
        <th style="padding:12px;border:1px solid #d1d5db;text-align:right;">العنصر</th>
        <th style="padding:12px;border:1px solid #d1d5db;text-align:right;">القيمة</th>
    </tr></thead>
    <tbody><tr>
        <td style="padding:12px;border:1px solid #d1d5db;">...</td>
        <td style="padding:12px;border:1px solid #d1d5db;"><strong>...</strong></td>
    </tr></tbody>
</table>
```

**Lists (نمط CairoVolt):** emoji + `<strong>` للمفتاح + شرح قصير · 4-6 عناصر كحد أقصى · لا تداخل عميق.
```html
<ul style="list-style:none;padding:0;">
    <li style="margin-bottom:12px;">⚡ <strong>السعة:</strong> 24,000mAh — كافية لشحنتين كاملتين</li>
    <li style="margin-bottom:12px;">🔥 <strong>الخرج:</strong> 140W — يشحن MacBook Pro 16</li>
    <li style="margin-bottom:12px;">🛡️ <strong>الأمان:</strong> ActiveShield 2.0 + 9 طبقات</li>
</ul>
```
**Emojis متاحة:** ⚡🔋🎯❌✅🔥🛡️💡⚠️🔬📱💻🔌

---

### الخطوة 7 — Voice & Tone

> 📚 **المرجع الكنوني الكامل:** [`voice.md`](voice.md) (DNA الأسلوب + 4 أنماط فكاهة + Templates + 9 أخطاء قاتلة).
> **ملخص للقوانين العابرة:** [`content-laws.md`](content-laws.md) §3.
>
> ⚠️ **إلزامي قبل أي مقال:** اقرأ `voice.md` بالكامل. هذا القسم لا يغني عنه — مجرد تذكير سريع.

**القواعد الأربع الأساسية:**

1. **🎭 أول 200 كلمة = فكاهة إلزامية** — نكتة / مفارقة / موقف ساخر بالعامية المصرية. لو المقدمة بدون ابتسامة → أعد الكتابة.
2. **🎓 صوت أكاديمي ودود** — أستاذ جامعي بيتكلم مع طلابه في الكافيه: فكاهة + فيزياء + أرقام.
3. **📏 الحد الأدنى: 🔴 1,500 كلمة لكل لغة — لا يُكسر ولا يُتجاوز بالتخمين** — أقل = محتوى ضحل يُرفض. الهدف 1,500-2,000. التحقق بأمر shell (§16-A) — لا تقدير.
4. **🇪🇬 عامية 85%** في المقدمة → **70%** في الشرح التقني — المصطلحات التقنية بالإنجليزي (GaN, PD, PPS).

**Burstiness (تذكير):** بدل 4 جمل قصيرة متشابهة → اكتب جملة طويلة سببية + ثلاث قصيرة منوّعة.

> 📚 المفردات، الجسر السياقي، المخاطب المباشر، المؤشرات الحوارية، الـ Templates → كلها في [`voice.md`](voice.md).

---

### الخطوة 8 — Authority Signals

> 📚 الجدول الكامل + مصادر الأرقام + شهادات E-E-A-T → [`content-laws.md`](content-laws.md) §4.

**القاعدة:** "Specificity = Trust" — كل ادعاء برقم. ممنوع الصفات المطلقة.

**أمثلة قاطعة:** "بيسخن" → "72°م تحت الحمل" · "كتير مقلّد" → "4 من 5 من OLX مقلّدة" · "السعة كبيرة" → "24,000mAh، 2.5 شحنة Samsung S26".

**مصادر الأرقام:** Datasheets الرسمية · اختبارات CairoVolt الميدانية · Tom's Guide / TechRadar / RTINGS / Wirecutter · شهادات UL / MFi / USB-IF / FCC / CE / Qi2 / IPX / C2PA.

---

### الخطوة 9 — السياق المصري (اختر 2-3 على الأقل)

| العنصر | استخدام | مثال |
|--------|---------|------|
| OLX/Facebook | تحذير من المقلّد | "اللي بتلاقيه على OLX بسعر نص السعر = غالباً مقلّد" |
| حرارة الصيف | اربط بأداء المنتج | "العربية في القاهرة بتوصل 60-70°م جوّاها" |
| تذبذب الكهرباء | حماية المنتج | "شبكة الكهرباء المصرية فيها تذبذب فولتية" |
| التوصيل + COD | CairoVolt كحل | "بضمان 18 شهر + توصيل لكل المحافظات" |
| أسعار EGP | استخدم الجنيه دائماً | "750ج للأساسي، 950ج للأحدث" |
| المناطق المصرية | في pricing/delivery | "القاهرة الكبرى توصيل 24 ساعة" |

**تجنّب:** ❌ ذكر USD/EUR كأساس · ❌ افتراض المنتج متاح عالمياً · ❌ تلميح بشراء من Amazon US.

**مثال متكامل:** "في صيف القاهرة، لما الحرارة تتعدى 40°م، الشاحن العادي بيخفض الخرج للنص علشان يحمي نفسه. شاحن GaN زي Anker Nano 65W بيحافظ على الخرج الكامل حتى 45°م. متاح على كايرو فولت بـ 890ج بضمان 18 شهر + توصيل لكل المحافظات."

---

### الخطوة 10 — Internal Linking

**`relatedProducts`:** 5-6 منتجات · نفس البراند للـ brand focus · مزيج للمقارنات.

---

#### 🎧 قاعدة Soundcore (إلزامية) — حدد الـ URL حسب نية القارئ

> Soundcore هي علامة الصوتيات الفرعية من Anker. بعد **v3 Migration (مايو 2026)**: المنتجات أصبحت `brand: "Soundcore"` (31 منتج) والـ URLs انتقلت لـ `/soundcore/audio` و `/soundcore/speakers` مع 301 redirects من المسارات القديمة `/anker/audio` و `/anker/speakers`. الموقع عنده **3 URLs مختلفة** لأي رابط صوتي. اختيار الـ URL الغلط = إهدار authority + entity dilution.

| نية القارئ (في النص) | استخدم هذا الـ URL | مثال |
|---|---|---|
| تعريف بالبراند / "ساوند كور إيه؟" / مقارنة عامة | **`/soundcore`** (الهب) | `<a href="/soundcore">ساوند كور</a>` |
| ايربودز/هيدفون/سماعة محددة | **`/soundcore/audio`** أو `/soundcore/audio/{slug}` | `<a href="/soundcore/audio">ايربودز ساوند كور</a>` |
| سبيكر/مكبر صوت بلوتوث | **`/soundcore/speakers`** أو `/soundcore/speakers/{slug}` | `<a href="/soundcore/speakers">سبيكر ساوند كور</a>` |
| Anker (للشحن — باور بانك/شاحن/كابل) | **`/anker`** (مش `/soundcore`!) | `<a href="/anker">انكر للشحن</a>` |

**قاعدة سريعة في اتخاذ القرار:**
- ❓ هل النص بيتكلم عن **منتج صوتي محدد**؟ → product slug
- ❓ هل النص بيتكلم عن **فئة صوتية محددة** (ايربودز أو سبيكرات)؟ → `/soundcore/audio` أو `/soundcore/speakers`
- ❓ هل النص بيتكلم عن **علامة Soundcore عموماً** (دون تخصيص فئة)؟ → `/soundcore`
- ❓ هل النص بيتكلم عن **Anker للشحن**؟ → `/anker` (✋ مش soundcore)

**أمثلة من السياق:**

```html
<!-- ✅ AR — تعريف بالبراند → الهب -->
<p>منتجات <a href="/soundcore">ساوند كور</a> معتمدة Hi-Res Audio…</p>

<!-- ✅ AR — منتج محدد -->
<p>اشترِ <a href="/soundcore/audio/anker-soundcore-r50i">ايربودز R50i</a> بسعر 950 جنيه.</p>

<!-- ✅ AR — فئة سبيكرات -->
<p>تصفّح <a href="/soundcore/speakers">سبيكرات ساوند كور</a> بمقاومة IPX7.</p>

<!-- ❌ غلط — Anker للشحن مش Soundcore -->
<p>اشترِ <a href="/soundcore">باور بانك انكر</a>…</p>  ← المفروض /anker/power-banks

<!-- ❌ غلط — توجيه عام لساوند كور إلى /anker -->
<p>منتجات <a href="/anker">ساوند كور</a> ممتازة…</p>  ← المفروض /soundcore
```

📚 **المرجع الكامل:** [`SOUNDCORE-STRATEGY.md`](SOUNDCORE-STRATEGY.md) — لماذا الفصل، هيكل الـ entity graph، توزيع الكلمات المفتاحية.

---

---

#### ⚖️ القاعدة 1 — قانون عزل اللغة (i18n Quarantine Law) — إلزامي وأعلى أولوية

> 📚 **المرجع الكنوني الكامل:** [`content-laws.md`](content-laws.md) §1 — اقرأه مرة واحدة، طبّقه دائماً.

**الملخص الإلزامي:**

- **محتوى عربي** (`translations.ar.content` + `ar.faq`) ➜ `<a href="/...">` **بدون** `/en/`
- **محتوى إنجليزي** (`translations.en.content` + `en.faq`) ➜ `<a href="/en/...">` **بـ** `/en/`
- **روابط خارجية** (`https://`, `mailto:`, `tel:`, `#`) ➜ لا تتأثر

**مثال سريع:**

```html
<!-- ✅ ar.content --> <a href="/blog/gan-charger-technology-guide-egypt">دليل GaN</a>
<!-- ✅ en.content --> <a href="/en/blog/gan-charger-technology-guide-egypt">GaN Guide</a>
<!-- ❌ en.content --> <a href="/blog/gan-charger-technology-guide-egypt">GaN Guide</a>  ← يُسرّب EN→AR
```

**قبل أي commit:** شغّل أمري `grep` في [`content-laws.md`](content-laws.md) §1. **النتيجتان يجب أن تكونا 0 سطر.**


#### قاعدة 2 — لغة نص الرابط (Anchor Text Language)

> ⚠️ **قاعدة أسماء المنتجات في الروابط (إلزامي):**
> - **النسخة العربية (AR):** نص الرابط = اسم المنتج **بالعربي** (من `translations.ar.title` أو الاسم المتعارف عليه عربياً).
> - **النسخة الإنجليزية (EN):** نص الرابط = اسم المنتج **بالإنجليزي** (من `translations.en.title` أو الاسم الرسمي).
> - اسم البراند (Anker/Joyroom) يبقى إنجليزي في النسختين (لا يُترجم).
> - رقم الموديل (A1681/A110E) يبقى كما هو في النسختين.
>
> | اللغة | ✅ صحيح | ❌ خطأ |
> |-------|---------|--------|
> | AR | `انكر باور بانك 20,000` / `انكر زولو A1681` | `Anker ZOLO A1681 20K` |
> | EN | `Anker ZOLO A1681 20K` / `Anker PowerCore 20K` | `انكر زولو A1681` |
> | AR | `جوي روم باور بانك 20,000` | `Joyroom 20K Power Bank` |
> | EN | `Joyroom 20K Power Bank` | `جوي روم باور بانك` |
> | AR | `انكر شاحن GaN 30W` | `Anker GaN 30W Charger` |
> | EN | `Anker GaN 30W Charger` | `انكر شاحن GaN 30W` |
> | AR | `ساوند كور` (للهب) / `ايربودز ساوند كور R50i` (لمنتج) | `Soundcore` بمفرده في نص عربي |
> | EN | `Soundcore` (for hub) / `Soundcore R50i Earbuds` (for product) | `ساوند كور` في نص إنجليزي |

**صيغة الرابط الكاملة (دائماً):**

```html
<!-- AR --> <a href="/{brand}/{category}/{slug}" style="color:#2563eb;font-weight:600;">{اسم المنتج بالعربي}</a>
<!-- EN --> <a href="/en/{brand}/{category}/{slug}" style="color:#2563eb;font-weight:600;">{Product Name in English}</a>
```

**`relatedArticles`:** 3 بالضبط · بمنطق العنقود الموضوعي · نوّع لتغطي الموقع.

> 🕸️ **العناقيد الموضوعية = مصدر واحد للحقيقة:** الجدول الكامل والمحدّث في [`cairovolt-blog-roadmap.md` → قسم «العناقيد الموضوعية (Topic Clusters)»](cairovolt-blog-roadmap.md#-العناقيد-الموضوعية-topic-clusters). **لا تكرّر الجدول هنا** (كان يسبب drift). القاعدة الثابتة: المقال الجديد يربط بـ 3 مقالات من نفس عنقوده.

---

### الخطوة 11 — FAQ (4 أسئلة بالضبط)

> ⚠️ **تحديث مايو 2026:** Google أوقف FAQPage rich results (مايو 7, 2026). الأسئلة الشائعة **لا تولّد نتائج غنية بعد الآن** — لكن المحتوى المرئي (accordion) لا يزال يُعرض على الصفحة وله قيمة SEO غير مباشرة (engagement + featured snippets + AI Overviews). واصل كتابة 4 FAQs لكل لغة.

**كل سؤال يجيب على ما لم يُذكر صراحةً في الـ body · صياغة "هل/إيه/كام/ليه" أو "Does/Can/How/What" · إجابة 2-3 جمل (40-80 كلمة) · تتضمن أرقام/أسماء منتجات.**

```typescript
faq: [
    { question: 'هل ينفع أشحن iPhone 17 Pro Max بشاحن 20 واط؟',
      answer: 'أيوا، لكن الشحن السريع يحتاج 30 واط على الأقل. مع 20W هتاخد ساعة كاملة من 0 لـ 100%، بينما الـ 30W يخلصها في 35 دقيقة.' },
    // 3 أسئلة إضافية
]
```

**أنواع فعّالة:** توافق دقيق · رقم محدد · مقارنة بين موديلات · تحذير محدد · سؤال عملي.

**❌ ممنوعة (تكرار):** "ما مواصفات المنتج؟" · "كم السعر؟" · "ما المنتج المُوصى به؟"

---

### الخطوة 12 — Bilingual Parity (EN === AR)

> 📚 **المرجع الكنوني الكامل** (جدول التكافؤ + أمثلة موازية + تجنّبات في EN) → [`content-laws.md`](content-laws.md) §2.

**المبدأ:** EN ليست ترجمة ولا ملخّصاً — نسخة موازية بنفس العمق لجمهور مصري يفكّر بالإنجليزية.

**أهم 3 قواعد للمدونة تحديداً:**

1. **بادئة الروابط ⚖️:** AR → `<a href="/...">` بدون `/en/` · EN → `<a href="/en/...">` بـ `/en/`
2. **Callouts:** AR → `border-right` · EN → `border-left` (RTL → LTR)
3. **اذكر مصر في الاثنين:** EN موجّهة لمصريين يبحثون بالإنجليزية — السياق المحلي ضروري لا اختياري.

**❌ تجنّب في EN:** تلخيص قسم · حذف أمثلة مصرية · تحويل العامية إلى MSA literal · تبسيط الأرقام · ذكر USD بدل EGP.

---

### الخطوة 13 — SEO

**`metaTitle` (≤ 60 حرف):**
```
AR: "هل الباور بانك يشحن لابتوب؟ الشروط + أفضل اختيار | كايرو فولت" (52 حرف)
EN: "Can a Power Bank Charge a Laptop? Complete 2026 Guide" (54 حرف)
```

**`metaDescription` (150-155 حرف):** صيغة = `[فائدة محددة] + [طريقة/منهجية] + [إشارة سلطة/CTA]`
```
AR: "اعرف هل الباور بانك بتاعك يقدر يشحن اللابتوب — بالشروط العلمية الدقيقة.
     جدول توافق + أفضل باور بانك للابتوب في مصر." (148 حرف)
EN: "Can your power bank charge your laptop? Learn the 3 scientific conditions,
     compatibility chart, and best laptop power banks in Egypt." (152 حرف)
```

**`keywords` (8-12 مصطلح):** 2-3 long-tail questions · 2-3 core · 1-2 brand · 1-2 spec · 1-2 geo · 1-2 EN.
```typescript
keywords: 'هل الباور بانك يشحن لابتوب, باور بانك للابتوب, شحن لابتوب من باور بانك, ' +
         'افضل باور بانك للابتوب 2026, Anker 737 لابتوب, باور بانك 65 وات, ' +
         'power bank laptop egypt, باور بانك USB-C PD'
```

**`quickAnswer` (45-80 كلمة):** يطابق Quick-Answer Box · إجابة قاطعة + شروط مرقّمة + توصية محددة.
```typescript
quickAnswer: 'أيوا، الباور بانك يقدر يشحن لابتوب بشرط 3 حاجات: (1) منفذ USB-C PD، ' +
            '(2) خرج 30W على الأقل (المثالي 65W+)، (3) سعة 20,000mAh+ لشحنة كاملة. ' +
            'أفضل خيار: Anker 737 بسعة 24,000mAh وخرج 140W.'
```

> 🎯 `quickAnswer` حصرياً لـ AI Overviews + Google Featured Snippets.

---

### الخطوة 14 — تسجيل المقال

```typescript
// 1. Import (أعلى blog-articles.ts):
import { your_new_article_slug } from './blog/your-new-article-slug';

// 2. في blogArticles array (آخر عنصر):
export const blogArticles: BlogArticle[] = [
    // ...
    your_new_article_slug,
];
```

**قاعدة التسمية:** `slug: 'how-to-identify-original-anker'` → `export: how_to_identify_original_anker` (underscores بدل dashes، نفس الكلمات).

---

## ⛔ كليشيهات ممنوعة (Anti-AI)

> 📚 الجدول الكامل + شرح كل كليشيه → [`content-laws.md`](content-laws.md) §5 → [`cairovolt_content_blueprint.md`](cairovolt_content_blueprint.md) §1.

**التذكير السريع:** "في عالم اليوم" · "لا شك أن" · "في الختام" · "نسعى جاهدين" · "تقنية متطورة" · "جودة عالية" · "It is important to note that" → **احذفها جميعها** واستبدلها بحقيقة محددة برقم.

---

## ⛔ أخطاء شائعة (من تحليل المقالات السابقة)

| # | الخطأ | الحل |
|---|-------|------|
| 1 | لا `coverImage` | إلزامي 1200×630 لكل مقال |
| 2 | لا `quickAnswer` | إلزامي — يُغذّي AI Overviews |
| 3 | `readingTime` = 4 د | المقال قصير — أضف عمق (6-8) |
| 4 | `readingTime` = 12 د | طويل — قسّمه أو اختصره |
| 5 | FAQ = 2 أسئلة | إلزامي 4 بالضبط |
| 6 | `relatedArticles` فاضي | إلزامي 3 من العنقود |
| 7 | `border-right` في EN | استخدم `border-left` للـ LTR |
| 8 | تكرار نصائح في 3 مقالات | زاوية فريدة لكل مقال (Information Gain) |
| 9 | لا Expert Callout مع ادعاء اختبار | أضف callout بالمنهجية |
| 10 | EN ملخّص للعربية | عمق كامل لكل لغة (parity) |
| **11** ⚖️ | **رابط داخلي في `en.content` بدون `/en/`** — يُسرّب القارئ الإنجليزي للنسخة العربية | استخدم `/en/{brand}/...` و `/en/blog/...` دائماً في `en.content` — راجع قانون عزل اللغة (الخطوة 10) |
| **12** ⚖️ | **رابط داخلي في `ar.content` يحتوي `/en/` بالغلط** — يكسر الـ AR cluster | احذف `/en/` من كل روابط `ar.content` — يجب أن تبدأ بـ `/` مباشرة |
| **13** ⚖️ | نسيان تحديث الرابط عند نقل نص بين `en` و `ar` (copy-paste متبادل) | راجع كل `href` بعد نقل الكتل بين النسختين |
| **14** 🎧 | توجيه كلمة "Soundcore" / "ساوند كور" إلى `/anker` بدل `/soundcore` | اقرأ [`SOUNDCORE-STRATEGY.md`](SOUNDCORE-STRATEGY.md) — راجع §10 قاعدة Soundcore |
| **15** 🎧 | توجيه كلمات الشحن (شاحن/باور بانك/كابل) إلى `/soundcore` بالغلط | الشحن = `/anker/{category}` · `/soundcore` للصوتيات فقط |

---

## ✅ Checklist نهائي قبل commit

**🧬 الهوية:** العنوان سؤال/رقم · Quick-Answer Box أول 50px ملوّن · سياق مصري (2-3 إشارات) · عامية 85%/فصحى 15% · أرقام محددة لكل ادعاء · Expert Callout لو في اختبار.

**🗂️ Schema:** slug صحيح · category من الـ 5 · publishDate ISO · modifiedDate = publishDate · readingTime 6-8 · coverImage `.webp` موجودة · author معبّأ.

**🔗 Linking:** relatedProducts = 5-6 (slugs موجودة) · relatedArticles = 3 من العنقود · relatedCategories معبّأ · روابط منتجات داخل النص بـ `<a style="color:#2563eb">`.

**⚖️ i18n Quarantine (إلزامي — أعلى أولوية):** كل `href` داخل `ar.content` يبدأ بـ `/` بدون `/en/` · كل `href` داخل `en.content` يبدأ بـ `/en/` · الروابط الخارجية `https://` لا تتأثر · لا تنسخ كتلة من نسخة لأخرى دون مراجعة كل الروابط · شغّل أمر التحقق `grep` (الخطوة 10) قبل commit — يجب أن تكون النتيجة 0 سطر.

**📝 المحتوى:** 5-7 H2 · 🔴 **≥ 1,500 كلمة لكل لغة (AR + EN) — تحقق بأمر §16-A قبل commit** · فقرات ≤ 4 أسطر · Burstiness حاد · Tables عند 3+ مقارنات · Lists بـ emoji + `<strong>` (4-6 عناصر) · لا كليشيهات AI.

**🎭 الأسلوب ([`voice.md`](voice.md)):** أول 200 كلمة فيها فكاهة مصرية إلزامية · صوت أستاذ جامعي ودود · 4 أنماط فكاهة (مفارقة يومية 60% / قياس أكاديمي 25% / سخرية مصرية 15%) · عمق أكاديمي بأرقام حقيقية.

**🔬 المصداقية:** كل رقم له مصدر · Expert Callout يذكر منهجية + تاريخ + عينات · شهادات صناعية مذكورة.

**❓ FAQ:** 4 بالضبط لكل لغة · لا تكرار للـ body · "هل/إيه/كام/ليه" أو "Does/Can/How/What" · أرقام/أسماء منتجات في الإجابات.

**📊 SEO:** metaTitle ≤ 60 حرف · metaDescription 150-155 · keywords 8-12 · quickAnswer 45-80 يطابق Box.

**🌐 Bilingual:** EN بنفس عمق العربية · أمثلة مصرية في EN · `border-left` في EN callouts · أسعار بالجنيه في EN.

**📚 التسجيل:** مُضاف في `blog-articles.ts` (import + array) · cover image موجودة فعلاً · صور داخلية `.webp`.

---

## 🧩 المكونات المستخدمة في صفحة المقال

> هذه المكونات مبرمجة في [`blog/[slug]/page.tsx`](src/app/[locale]/blog/[slug]/page.tsx) — لا تحتاج إدخال يدوي عند كتابة المقال، لكن يجب معرفتها لتجنّب التكرار.

| المكوّن | المسار | ما يفعله | إدخال من المقال؟ |
|---------|--------|----------|------------------|
| `QuickAnswerBox` | `src/components/ui/QuickAnswerBox.tsx` | يعرض `quickAnswer` field كـ component مستقل فوق المقال بألقاب عشوائية ("باختصار:"/"TL;DR:") | ✅ يقرأ `quickAnswer` |
| `BlogContentRenderer` | `src/components/ui/BlogContentRenderer.tsx` | يعرض الـ HTML `content` مع sanitization + إعادة كتابة الروابط الداخلية تلقائياً حسب الـ locale (شبكة أمان i18n) | ✅ يقرأ `content` |
| `BlogInteractiveWidgets` | `src/components/interactive/BlogInteractiveWidgets.tsx` | ويدجتات تفاعلية (حاسبة بطارية / رسوم Mermaid) — مُعيّنة لمقالات محددة بالـ slug | ⬜ slug فقط |
| `ShareAnalytics` | `src/components/content/ShareAnalytics.tsx` | تتبع مشاركات WhatsApp كـ trackable direct traffic | ❌ لا إدخال |
| `ArticleSchema` | `src/components/schemas/StructuredDataSchemas.tsx` | structured data (`BlogPosting`) مع entity graph من `brand-entities.ts` | ✅ تلقائي |
| `SpeakableSchema` | `src/components/schemas/StructuredDataSchemas.tsx` | Google Speakable structured data | ✅ تلقائي |
| `ClaimReview` | inline في page.tsx | schema لمقالات كشف التقليد فقط (hardcoded لـ 2 مقال) | ❌ hardcoded |
| `HowToSchema` | `src/components/schemas/StructuredDataSchemas.tsx` | schema لمقال `original-vs-fake-apple-charger-egypt` فقط | ❌ hardcoded |
| CairoVolt Labs Box | inline في page.tsx (سطر 364-382) | صندوق ثابت "مختبر كايرو فولت — بيانات طرف أول" يظهر في **كل** مقال | ❌ hardcoded |

> 💡 **الخلاصة العملية:** عند كتابة مقال جديد، اهتم بـ: `content` (HTML) + `quickAnswer` + `faq` + `relatedProducts` + `relatedArticles`. باقي المكونات تعمل تلقائياً. الـ `BlogContentRenderer` يُعيد كتابة الروابط الداخلية حسب الـ locale — لكن **لا تعتمد عليه كبديل** عن قانون i18n Quarantine؛ اكتب الروابط صح من البداية.

---

## 📐 Templates جاهزة (نسخ مباشر)

### Template 1: ملف مقال جديد (skeleton)

```typescript
// src/data/blog/your-new-article-slug.ts
import type { BlogArticle } from './_types';

export const your_new_article_slug: BlogArticle = {
    slug: 'your-new-article-slug',
    category: 'how-to',
    publishDate: '2026-05-18',
    modifiedDate: '2026-05-18',
    readingTime: 7,
    relatedProducts: ['p-1', 'p-2', 'p-3', 'p-4', 'p-5'],
    relatedArticles: ['a-1', 'a-2', 'a-3'],
    relatedCategories: ['Anker/power-banks'],            // أو ['Soundcore/audio'] أو ['Soundcore/speakers']
    coverImage: '/images/blog/posts/your-cover-image.webp',
    author: {
        name: { ar: 'فريق كايرو فولت', en: 'CairoVolt Team' },
        title: { ar: 'محرر تقني', en: 'Tech Editor' },
        avatar: '/images/team/cairovolt-team.webp',
    },
    translations: {
        ar: {
            title: 'العنوان بالعربي — رقم أو سؤال',
            metaTitle: 'metaTitle ≤ 60 حرف | كايرو فولت',
            metaDescription: 'metaDesc 150-155 حرف: فائدة + منهجية + سلطة.',
            keywords: 'مفتاح1, مفتاح2, long-tail, brand, geo, EN-equivalent',
            excerpt: 'مقتطف 20-30 كلمة يلخّص قيمة المقال.',
            quickAnswer: 'الإجابة السريعة 45-80 كلمة — تطابق Quick-Answer Box.',
            content: `<!-- HTML — انظر Template 2 -->`,
            faq: [
                { question: 'سؤال 1؟', answer: 'إجابة بأرقام.' },
                { question: 'سؤال 2؟', answer: '...' },
                { question: 'سؤال 3؟', answer: '...' },
                { question: 'سؤال 4؟', answer: '...' },
            ],
        },
        en: {
            title: 'English Title — Number or Question',
            metaTitle: 'metaTitle ≤ 60 chars | CairoVolt',
            metaDescription: 'metaDesc 150-155 chars: benefit + method + authority.',
            keywords: 'keyword1, keyword2, long-tail, brand, egypt',
            excerpt: 'Excerpt 20-30 words.',
            quickAnswer: 'Quick answer 45-80 words — matches Quick-Answer Box.',
            content: `<!-- HTML — same depth as Arabic -->`,
            faq: [
                { question: 'Question 1?', answer: 'Answer with specific numbers.' },
                { question: 'Question 2?', answer: '...' },
                { question: 'Question 3?', answer: '...' },
                { question: 'Question 4?', answer: '...' },
            ],
        }
    }
};
```

### Template 2: محتوى الـ HTML (skeleton)

```html
<!-- 1. فقرة افتتاحية -->
<p>[موقف حقيقي أو إحصائية مدهشة]</p>

<!-- 2. Quick-Answer Box (إلزامي) -->
<div class="quick-answer-inline" style="background:#eff6ff;border-right:4px solid #2563eb;padding:16px 20px;margin:24px 0;border-radius:8px;">
    <p style="margin:0;font-size:16px;line-height:1.7;color:#1e40af;">
        <strong>💡 الإجابة السريعة:</strong> [45-80 كلمة]
    </p>
</div>

<!-- 3. Expert Callout (لو في اختبار) -->
<div class="expert-callout" style="background:#f9fafb;border:1px solid #e5e7eb;border-right:4px solid #059669;padding:20px;margin:32px 0;border-radius:8px;">
    <p style="margin:0 0 8px 0;font-size:15px;color:#059669;font-weight:bold;">🔬 اختبار كايرو فولت</p>
    <p style="margin:0;font-size:15px;line-height:1.8;color:#374151;">
        [المنهجية: N عينات، من أين، متى] <strong>النتيجة:</strong> [رقم + مقارنة].
    </p>
</div>

<!-- 4-8. أقسام H2 (4-6 أقسام) -->
<h2>[سؤال/عنوان إجرائي ≤ 8 كلمات]</h2>
<p>[فقرة 2-4 أسطر — ابدأ بمشهد قصصي أو حقيقة صادمة].</p>
<p>[فقرة ثانية تعمّق بأرقام].</p>

<h2>[سؤال "ليه؟"]</h2>
<p>[شرح تقني بالجسر السياقي: عامي + فصيح بين قوسين].</p>

<!-- جدول مقارنة -->
<table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:15px;">
    <thead><tr style="background:#f3f4f6;">
        <th style="padding:12px;border:1px solid #d1d5db;text-align:right;">العنصر</th>
        <th style="padding:12px;border:1px solid #d1d5db;text-align:right;">الأصلي</th>
        <th style="padding:12px;border:1px solid #d1d5db;text-align:right;">المقلّد</th>
    </tr></thead>
    <tbody><tr>
        <td style="padding:12px;border:1px solid #d1d5db;">الحرارة تحت الحمل</td>
        <td style="padding:12px;border:1px solid #d1d5db;color:#059669;"><strong>45°م</strong></td>
        <td style="padding:12px;border:1px solid #d1d5db;color:#dc2626;"><strong>72°م</strong></td>
    </tr></tbody>
</table>

<h2>[الحل العملي]</h2>
<p>[توصية محددة].</p>
<ul style="list-style:none;padding:0;">
    <li style="margin-bottom:12px;">⚡ <strong>المعيار الأول:</strong> الشرح.</li>
    <li style="margin-bottom:12px;">🔋 <strong>المعيار الثاني:</strong> الشرح.</li>
    <li style="margin-bottom:12px;">🛡️ <strong>المعيار الثالث:</strong> الشرح.</li>
</ul>

<h2>[تطبيق عملي + منتجات]</h2>
<!-- ⚖️ i18n Quarantine — داخل ar.content بدون /en/ -->
<p>توصيتنا: <a href="/anker/power-banks/anker-737-powerbank" style="color:#2563eb;font-weight:600;">انكر 737 باور بانك</a> — 24,000mAh، 140W، يشحن MacBook Pro بكامل سرعته.</p>

<!-- داخل en.content يجب أن يكون: -->
<!-- <p>Our pick: <a href="/en/anker/power-banks/anker-737-powerbank" style="color:#2563eb;font-weight:600;">Anker 737 PowerBank</a> — 24,000mAh, 140W, charges MacBook Pro at full speed.</p> -->
<!-- ⛔ لو حطيت href="/anker/..." في en.content بدون /en/ → القارئ الإنجليزي يُسرَّب للنسخة العربية -->
<!-- راجع: الخطوة 10 — قانون عزل اللغة (i18n Quarantine Law) -->


<h2>تحذيرات قبل الشراء</h2>
<div class="quick-answer-inline" style="background:#fef2f2;border-right:4px solid #dc2626;padding:16px 20px;margin:24px 0;border-radius:8px;">
    <p style="margin:0;color:#991b1b;"><strong>⚠️ تحذير:</strong> [بأرقام].</p>
</div>

<!-- 9. CTA متكامل (اختياري) -->
<div class="cta-box" style="background:#f0fdf4;border:1px solid #86efac;padding:20px;margin:32px 0;border-radius:8px;">
    <p style="margin:0 0 8px 0;font-weight:bold;color:#166534;">✅ متاح على كايرو فولت</p>
    <p style="margin:0;color:#15803d;font-size:15px;line-height:1.8;">
        كل المنتجات <strong>أصلية بضمان 18 شهر</strong> + توصيل لكل المحافظات 24-72 ساعة + دعم واتساب 24/7.
    </p>
</div>

<!-- 10. Sources Box (لو في مراجع خارجية) -->
<div class="sources-box" style="background:#f9fafb;border:1px solid #e5e7eb;padding:16px 20px;margin:32px 0;border-radius:8px;font-size:14px;">
    <p style="margin:0 0 8px 0;font-weight:bold;color:#374151;">📚 المراجع:</p>
    <ul style="margin:0;padding-right:20px;color:#6b7280;">
        <li><a href="https://www.anker.com/verify" rel="nofollow">Anker Verification</a></li>
        <li><a href="..." rel="nofollow">Tom's Guide Test</a></li>
    </ul>
</div>
```

---

## 📚 المراجع

| المرجع | الدور |
|--------|------|
| [`content-laws.md`](content-laws.md) | القوانين العابرة (i18n + Bilingual + Voice + Authority + Anti-AI) — **اقرأه قبل أي كتابة** |
| [`voice.md`](voice.md) | المرجع الكنوني لـ Voice & Tone (DNA الأسلوب + الفكاهة) — **إلزامي** |
| [`cairovolt_content_blueprint.md`](cairovolt_content_blueprint.md) | Burstiness + Information Gain + AEO + NLP المصري + E-E-A-T |
| [`cairovolt-blog-roadmap.md`](cairovolt-blog-roadmap.md) | قائمة الـ 228 موضوع + المنشور + العناقيد + Auto-Workflow |
| [`new_product_guide.md`](new_product_guide.md) | إضافة منتج جديد |
| [`src/data/blog/_types.ts`](src/data/blog/_types.ts) | TypeScript Schema |
| [`src/data/blog-articles.ts`](src/data/blog-articles.ts) | Barrel file |
| نماذج مرجعية حديثة | `usb-c-lightning-vs-usb-c-usb-c-faster.ts` · `3-meter-charging-cable-bed-living-room.ts` · `magnetic-cable-car-charging-pros-cons.ts` · `soundcore-models-guide-egypt-2026.ts` · `the-hidden-truth-about-gan-chargers-ahmed-medhat.ts` · `can-power-bank-charge-laptop-guide.ts` |

---

## 🎯 الخلاصة

كل مقال جديد يجب أن: (1) يبدأ بسؤال/رقم · (2) Quick-Answer Box في أول 50px · (3) سياق مصري طبيعي · (4) كل ادعاء برقم · (5) عامية 85% بجسر سياقي · (6) 4 FAQs + 3 related + 5-6 products · (7) Bilingual Parity · (8) لا كليشيهات AI · 🔴 (9) **≥ 1,500 كلمة لكل لغة — مُتحقَّق بأمر §16-A قبل أي commit**.

**النتيجة:** محتوى يربح خوارزمياً (AI Overviews + Featured Snippets) + يبني ثقة محلية + يحفظ هوية CairoVolt كموزع موثوق ومُختبر مُعلِّم.
