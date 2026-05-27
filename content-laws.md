# ⚖️ قوانين المحتوى العابرة — CairoVolt Content Laws

> **المرجع الوحيد** للقوانين التي تنطبق على **كل** محتوى الموقع: مقالات المدونة، صفحات المنتجات، صفحات الفئات، والصفحات الثابتة.
> أي ملف تنفيذي (`cairovolt-blog.md`, `new_product_guide.md`, ...) يجب أن **يُحيل** لهذا الملف بدل تكرار القاعدة.

---

## 🗂️ الفهرس السريع

| # | القانون | الموقع الكنوني | إلزامية |
|---|---------|------------------|---------|
| 1 | ⚖️ i18n Quarantine Law (عزل اللغة) | **هنا §1** | 🔴 لا يُكسر |
| 2 | 🌐 Bilingual Parity (التكافؤ ثنائي اللغة) | **هنا §2** | 🔴 لا يُكسر |
| 3 | 🎭 Voice & Tone (الأسلوب والنبرة) | [`voice.md`](voice.md) | 🔴 إلزامي قبل أي كتابة |
| 4 | 🔬 Authority Signals (Specificity over vagueness) | [`cairovolt_content_blueprint.md`](cairovolt_content_blueprint.md) §1, §5 | 🟠 قوي |
| 5 | ⛔ Anti-AI Clichés (مكافحة كليشيهات الـ AI) | [`cairovolt_content_blueprint.md`](cairovolt_content_blueprint.md) §1 | 🟠 قوي |

---

## §1 — ⚖️ i18n Quarantine Law (قانون عزل اللغة)

### المبدأ

الخلط اللغوي بين رابط داخلي ومحتوى مستضيف = **جلطة دماغية لعناكب جوجل وتدمير لنظام Hreflang**.

> 💡 **القاعدة:** محتوى عربي ➜ رابط للنسخة العربية فقط · محتوى إنجليزي ➜ رابط للنسخة الإنجليزية فقط.

### صيغة بادئة الرابط الإلزامية

> `cairovolt.com` — العربية هي الـ **default** بدون بادئة، الإنجليزية بـ `/en/`.

| موقع الرابط | البادئة | مثال صحيح |
|------------|---------|-----------|
| **محتوى عربي** (`translations.ar.*` في blog/product) | **بدون** `/en/` — ابدأ بـ `/` مباشرة | `<a href="/anker/wall-chargers/anker-nano-45w">انكر نانو 45W</a>` |
| **محتوى إنجليزي** (`translations.en.*` في blog/product) | **يجب** أن تبدأ بـ `/en/` | `<a href="/en/anker/wall-chargers/anker-nano-45w">Anker Nano 45W</a>` |
| روابط خارجية (`https://`, `mailto:`, `tel:`, `#`) | لا تُلمس | `<a href="https://anker.com/verify" target="_blank" rel="noopener">...</a>` |

### كل أنواع الروابط الداخلية المُغطّاة

- روابط منتجات: `/{brand}/{category}/{slug}` → في EN: `/en/{brand}/{category}/{slug}`
- روابط فئات: `/{brand}/{category}` → في EN: `/en/{brand}/{category}`
- روابط براند: `/anker`, `/joyroom` → في EN: `/en/anker`, `/en/joyroom`
- روابط hubs فرعية: `/soundcore` (Anker audio sub-brand) → في EN: `/en/soundcore`
- روابط مقالات: `/blog/{slug}` → في EN: `/en/blog/{slug}`
- الصفحة الرئيسية: `/` → في EN: `/en`
- أي مسار داخلي آخر (`/about`, `/contact`, `/shipping`, ...) → يطبّق نفس النمط

### أمثلة قاطعة

```html
<!-- ✅ صحيح — داخل translations.ar.content أو ar.description -->
<p>تصفّح <a href="/anker/wall-chargers/anker-nano-45w" style="color:#2563eb;font-weight:600;">انكر نانو 45W</a>
ولو حابب تعرف أكتر اقرأ <a href="/blog/gan-charger-technology-guide-egypt" style="color:#2563eb;">دليل GaN الكامل</a>.</p>

<!-- ✅ صحيح — داخل translations.en.content أو en.description -->
<p>Shop <a href="/en/anker/wall-chargers/anker-nano-45w" style="color:#2563eb;font-weight:600;">Anker Nano 45W</a>
or read our <a href="/en/blog/gan-charger-technology-guide-egypt" style="color:#2563eb;">complete GaN guide</a>.</p>

<!-- ❌ خطأ قاتل — نسخة EN فيها روابط بدون /en تسرّب القارئ للنسخة العربية -->
<p>Shop <a href="/anker/wall-chargers/anker-nano-45w">Anker Nano 45W</a>
or read our <a href="/blog/gan-charger-technology-guide-egypt">complete GaN guide</a>.</p>
```

### لماذا قاتل؟

قارئ EN على `/en/blog/...` يضغط رابطاً بدون `/en/`، ينتقل **للنسخة العربية** — هذا يكسر:

1. **Hreflang clustering** — جوجل يرى ربطاً متبادلاً غير متناسق بين عناقيد اللغة
2. **User Experience** — قارئ إنجليزي يجد نفسه فجأة على صفحة عربية RTL
3. **Crawl budget** — العناكب تهدر طاقتها على روابط مشوّشة
4. **Authority flow** — قوة الـ EN cluster تتسرّب للـ AR cluster بشكل غير مقصود

### نمط التحقق السريع (قبل أي commit)

```bash
# يستبدل المتغير {file} بمسار الملف المعدّل
file="src/data/blog/{slug}.ts"   # أو src/data/products/{slug}.ts

# 1) أي href في النسخة الإنجليزية بدون بادئة /en/ — يجب أن يكون 0
awk '/[ \t]+en:[ \t]*{/{flag=1} flag{print} /^[ \t]+},[ \t]*$/ && flag{flag=0}' "$file" \
  | grep -E 'href="/(anker|joyroom|soundcore|blog|cart|search|categories|about|contact)' \
  | grep -v 'href="/en/' \
  | grep -v 'href="https'

# 2) أي href في النسخة العربية بدأ بـ /en/ بالغلط — يجب أن يكون 0
awk '/[ \t]+ar:[ \t]*{/{flag=1} flag{print} /^[ \t]+},[ \t]*$/ && flag{flag=0}' "$file" \
  | grep -E 'href="/en/'
```

**كلتا النتيجتين يجب أن تكونا فارغتين قبل الـ commit.** أي سطر يظهر = انتهاك يجب إصلاحه قبل النشر.

### أخطاء شائعة تكسر هذا القانون

| الخطأ | الضرر | الحل |
|------|------|------|
| نسخ كتلة HTML من `ar` إلى `en` دون تحديث كل `href` | نصف الروابط مسرّبة | راجع كل `<a href>` فرداً فرداً بعد أي نقل |
| تكرار قائمة منتجات في `ar` و `en` بنفس المحتوى | روابط `/anker/...` في EN تُسرّب للعربي | استخدم `/en/anker/...` في EN |
| استخدام relative path `href="anker/..."` بدون `/` | الراوتر يُلحقه بالمسار الحالي → 404 | ابدأ كل رابط داخلي بـ `/` |

---

## §2 — 🌐 Bilingual Parity (التكافؤ ثنائي اللغة)

### المبدأ

**EN ليست ترجمة ولا ملخّص للـ AR — هي نسخة موازية بنفس العمق لجمهور مختلف.**

كلا النسختين يستهدفان جمهوراً مصرياً (أحدهما يفكّر بالعربية، الآخر بالإنجليزية) — السياق المحلي موجود في الاثنين.

### جدول التكافؤ

| العنصر | AR | EN |
|--------|----|----|
| النبرة | عامية مصرية ودودة | English احترافي ودود (You/Your) |
| المصطلحات | "موبايل/لابتوب/شاحن" | "phone/laptop/charger" |
| السياق المحلي | اذكر مصر بصراحة | اذكر مصر أيضاً |
| Examples | OLX/Facebook المصري | OLX/Facebook Marketplace (Egypt) |
| الأسعار | بالجنيه (`ج`/`ج.م`) | بالجنيه (EGP) — **ليس USD** |
| Callouts (RTL/LTR) | `border-right` | `border-left` |
| **بادئة الروابط الداخلية** ⚖️ | **بدون** `/en/` | **بـ** `/en/` (راجع §1) |
| Anchor text لاسم المنتج | بالعربي (`انكر نانو 45W`) | بالإنجليزي (`Anker Nano 45W`) |
| الأرقام/الإحصائيات | متطابقة | متطابقة (لا تبسيط) |
| عمق التحليل | كامل | كامل (نفس عدد الأقسام/التفاصيل) |

### مثال موازٍ (نفس الطول والعمق والنبرة)

```
AR: "تخيّل إنك قاعد في كافيه، اللابتوب على وشك يقفل، ومفيش بريزة فاضية —
    الباور بانك ممكن يكون المنقذ، بس لو فهمت العلم وراه."

EN: "Imagine you're sitting in a café, your laptop is about to die, and there's
    no available outlet — a power bank can be your lifesaver, but only if you
    understand the science behind it."
```

### تجنّب في EN

- ❌ تلخيص قسم موجود في AR
- ❌ حذف الأمثلة المصرية ("هذا للقارئ المصري فقط")
- ❌ تحويل العامية إلى MSA literal
- ❌ تبسيط الأرقام أو حذف الجداول
- ❌ ذكر USD بدل EGP

### قاعدة "اذكر مصر في الاثنين"

```
✅ AR: "شبكة كهرباء مصر مشهورة بتذبذب الفولتية..."
✅ EN: "Egypt's electricity grid is notorious for voltage fluctuations..."
```

EN موجّهة لمصريين يبحثون بالإنجليزية — السياق المحلي ضروري لا اختياري.

---

## §3 — 🎭 Voice & Tone

> **المرجع الكنوني الكامل:** [`voice.md`](voice.md) — اقرأه بالكامل قبل أي كتابة.

### الملخص الإلزامي (لا يغني عن قراءة voice.md)

1. **الهوية:** أستاذ دكتور إلكترونيات في جامعة القاهرة — بيتكلم زي ما بيتكلم مع طلابه في الكافيه: فكاهة + فيزياء + أرقام
2. **🎭 أول 200 كلمة = فكاهة إلزامية** — نكتة / مفارقة / موقف ساخر بالعامية المصرية. لو المقدمة بدون ابتسامة → أعد كتابتها
3. **📏 الحد الأدنى:** 1,200 كلمة لكل لغة (الهدف 1,200-1,800 عربي + نفس العمق EN)
4. **🇪🇬 عامية 85% في المقدمة → 70% في الشرح التقني** — المصطلحات التقنية بالإنجليزي دائماً (GaN, PD, PPS)
5. **4 أنماط فكاهة:** مفارقة يومية 60% / قياس أكاديمي 25% / سخرية مصرية 15% / موقف معمل (عند الاختبار)

> ⚠️ القواعد التفصيلية، الـ Templates، 9 أخطاء قاتلة، أمثلة المقدمات → كلها في [`voice.md`](voice.md).

---

## §4 — 🔬 Authority Signals (Specificity over Vagueness)

> **المرجع الكنوني:** [`cairovolt_content_blueprint.md`](cairovolt_content_blueprint.md) §1 (Zero-Tolerance Rules) و §5 (النبرة) و §II (E-E-A-T).

### الملخص الإلزامي

**كل ادعاء برقم. ممنوع الصفات المطلقة.**

| ❌ غامض | ✅ محدد |
|---------|---------|
| "بيسخن" | "يصل لـ 72°م تحت الحمل" |
| "كتير مقلّد" | "4 من 5 منتجات من OLX كانت مقلّدة" |
| "السعة كبيرة" | "24,000mAh — تكفي 2.5 شحنة لـ Samsung S26" |
| "الكابل بيبوظ" | "92% من التلف في أول 2cm من الوصلة" |
| "تقنية جديدة" | "GaN III — أحدث 3 أجيال، إنتاج 2024" |

### مصادر الأرقام المقبولة

1. **Datasheets الرسمية** من الشركة المصنّعة
2. **اختبارات CairoVolt الميدانية** — مع تاريخ + عدد عينات + منهجية
3. **مراجعات معتمدة** (Tom's Guide / TechRadar / RTINGS / Wirecutter)
4. **شهادات صناعية** (UL / MFi / USB-IF / FCC / CE / Qi2 / IPX / C2PA)

> 📚 التفاصيل الكاملة لـ E-E-A-T للإلكترونيات + شهادات إضافية → blueprint §II + §V.

---

## §5 — ⛔ Anti-AI Clichés (كليشيهات الذكاء الاصطناعي الممنوعة)

> **المرجع الكنوني:** [`cairovolt_content_blueprint.md`](cairovolt_content_blueprint.md) §1 (القواعد الصفرية).

### الجدول السريع

| ✗ ممنوع | ✓ البديل |
|---------|----------|
| "في عالم اليوم..." / "In today's world..." | احذفها — ابدأ بالمعلومة |
| "لا شك أن..." | اذكر الرقم/الحقيقة مباشرة |
| "من الجدير بالذكر..." | ابدأ بالمعلومة |
| "نقدم لكم..." | "بنوصّي بـ..." أو احذفها |
| "في الختام..." | احذف كلياً |
| "نسعى جاهدين..." | "نختبر كل منتج 30 يوم" |
| "It is important to note that..." | Start with the fact directly |
| "أفضل المنتجات تناسب الجميع" | "أفضل اختيار لو بتشتغل من البيت" |
| "تقنية متطورة" | "تقنية GaN III" |
| "جودة عالية" | "اختبار 25,000 دورة ثني" |

> 📚 القائمة الموسّعة + شرح كل كليشيه + Burstiness (التباين اللغوي) + Information Gain → blueprint §1-§4.

---

## ✅ Checklist تطبيق القوانين (قبل أي commit)

| القانون | السؤال | المرجع |
|---------|--------|--------|
| §1 i18n | شغّلت أمري `grep` والنتيجتان 0 سطر؟ | §1 |
| §2 Bilingual | EN بنفس عمق AR، اذكر مصر في الاثنين، EGP لا USD؟ | §2 |
| §3 Voice | أول 200 كلمة فيها فكاهة، عامية 85% → 70%، 1,200+ كلمة/لغة؟ | [`voice.md`](voice.md) |
| §4 Authority | كل ادعاء برقم، كل رقم له مصدر؟ | §4 |
| §5 Anti-AI | لا "في عالم اليوم/لا شك/في الختام/تقنية متطورة"؟ | §5 |

---

## 🔗 الملفات المرتبطة

| الملف | الدور |
|------|------|
| [`voice.md`](voice.md) | المرجع الكنوني لـ Voice & Tone (DNA الأسلوب + الفكاهة) |
| [`cairovolt_content_blueprint.md`](cairovolt_content_blueprint.md) | المرجع الكنوني لـ E-E-A-T + Burstiness + AEO + Anti-AI + NLP المصري |
| [`cairovolt-blog.md`](cairovolt-blog.md) | الدليل التنفيذي لكتابة مقالات المدونة |
| [`new_product_guide.md`](new_product_guide.md) | الدليل التنفيذي لإضافة المنتجات |
| [`cairovolt-blog-roadmap.md`](cairovolt-blog-roadmap.md) | قائمة الـ 101 موضوع + المنشور (محتوى حي) |

---

## 🎯 الخلاصة

5 قوانين عابرة لكل أنواع المحتوى. اثنان منها (i18n Quarantine + Bilingual Parity) موثّقان كنونياً هنا. ثلاثة (Voice, Authority, Anti-AI) موثّقون كنونياً في ملفات أخرى، وهذا الملف فهرس تنقّل لهم.

**قبل أي كتابة — اقرأ هذا الملف أولاً. قبل أي commit — راجع Checklist أعلاه.**
