# 🗺️ خطة محتوى المدونة — Roadmap & Status

> **هذا الملف يحوي المحتوى الحي:** قائمة الموضوعات المخططة + المنشور + العناقيد.
> **القواعد الثابتة** (Workflow, Schema, Templates, ...) في [`cairovolt-blog.md`](cairovolt-blog.md).
> **القوانين العابرة** (i18n, Voice, ...) في [`content-laws.md`](content-laws.md).

---

## 🤖 Auto-Workflow التشغيلي

> **القاعدة الذهبية:** أي رسالة تُرسل مسار **هذا الملف** أو مسار [`cairovolt-blog.md`](cairovolt-blog.md) — بغض النظر عن نصها — = **أمر ضمني وكامل ببدء كتابة الموضوع التالي تلقائياً**. لا تنتظر تأكيداً. لا تسأل. ابدأ التنفيذ مباشرةً.

**بروتوكول التنفيذ:**

1. أعلن سطر واحد: `"بدء كتابة #N — [العنوان]"`
2. **اقرأ [`voice.md`](voice.md) أولاً** (إلزامي — DNA الأسلوب والفكاهة)
3. **اقرأ [`content-laws.md`](content-laws.md)** للقوانين العابرة (i18n + Bilingual Parity)
4. **اقرأ [`cairovolt-blog.md`](cairovolt-blog.md)** للـ 17 خطوة Workflow + Schema + Templates
5. اعثر على أول ⬜ في القائمة أدناه
6. نفّذ كامل الـ Workflow بدون توقف
7. **تأكد أن المحتوى ≥ 1,200 كلمة لكل لغة**
8. شغّل `npm run build` للتحقق
9. اعمل commit + push على GitHub
10. **حدّث هذا الملف:** استبدل ⬜ بـ `✅ → slug: {final-slug}` (سطر واحد فقط بـ Edit tool)
11. قدّم تقرير 5 أسطر

**Trigger Phrases:** "اكتب موضوع جديد/تدوينة جديدة" · "اكمل المدونة" · "اكتب التدوينة التالية" · "ابدأ موضوع من القائمة" · "Write the next blog post" · "اكتب موضوع #N".

> ⚠️ **استثناء وحيد:** إذا الموضوع يحتاج بيانات اختبار ميداني لا تملكها → سؤال واحد مركّز ثم تابع.

---

## ✅ منشور بالفعل — للمرجعية واستخدامه كـ `relatedArticles`

> **لا تُعد كتابتها.** مصدر الحقيقة: `src/data/blog/*.ts` + `src/data/blog-articles.ts`. عند التضارب → اعتمد الكود وحدّث هذه القائمة.

`anker-vs-joyroom-comparison` · `best-bluetooth-earbuds-egypt-2026` · `best-car-charger-egypt-2026` · `best-fast-chargers-for-samsung-s26-yahya-radwan` · `best-iphone-17-charger-egypt` · `best-power-bank-egypt-2026` · `best-power-bank-router-power-outage-egypt` · `best-samsung-s26-charger` · `can-power-bank-charge-laptop-guide` · `do-fake-chargers-damage-iphone-battery` · `does-fast-charging-damage-battery-truth` · `gan-charger-technology-guide-egypt` · `how-to-charge-power-bank-correctly` · `how-to-identify-original-anker` · `how-to-spot-fake-chargers-7-tests` · `original-vs-fake-apple-charger-egypt` · `power-bank-10000mah-real-capacity-myth` · `power-bank-airplane-rules-egypt-2026` · `protect-phone-from-heat-summer-egypt` · `soundcore-models-guide-egypt-2026` · `the-hidden-truth-about-gan-chargers-ahmed-medhat` · `usb-c-cable-guide-egypt-2026` · `why-charging-cable-breaks-fast-causes-fixes` · `why-phone-charging-slowly-causes-solutions`

---

## 📝 خطة المحتوى — 101 موضوع (بالترتيب الإلزامي)

> **للـ Auto-Workflow:** ابدأ بأول ⬜ من #1. عند الانتهاء استبدل ⬜ بـ `✅ → slug: {final-slug}`.
> **اسم الـ coverImage = الـ slug + `.webp`** في `/public/images/blog/posts/` (جميع صور الغلاف الـ 101 تم توليدها وتجهيزها مسبقاً في هذا المسار، فقط استخدم الاسم المناسب للملف ولا تقم بتوليد صور جديدة أو استبدالها).

1. ✅ أفضل باور بانك تحت 1000 جنيه في مصر 2026 — الخيارات الأصلية وتحذير من التقليد → `best-power-bank-under-1000-egp-egypt`
2. ✅ → slug: `best-100w-fast-charge-power-bank-iphone-samsung`
3. ✅ → slug: `galaxy-s26-ultra-vs-iphone-17-pro-max-power-bank-needs`
4. ✅ → slug: `magsafe-magnetic-power-bank-worth-extra-cost`
5. ✅ → slug: `power-bank-for-photographers-dslr-cameras`
6. ✅ → slug: `power-bank-gaming-pubg-freefire-cooling`
7. ✅ → slug: `5000-vs-10000-vs-20000-mah-which-capacity`
8. ✅ → slug: `20000mah-power-bank-iphone-17-pro-max-charges`
9. ✅ → slug: `power-bank-with-digital-display-worth-it`
10. ✅ → slug: `power-bank-charge-4-devices-simultaneously`
11. ✅ → slug: `why-power-bank-dies-after-6-months-mistakes`
12. ✅ → slug: `anker-vs-joyroom-power-banks-12-models-tested`
13. ✅ → slug: `iphone-17-pro-max-charger-20w-30w-45w-which`
14. ✅ → slug: `best-gan-multi-port-chargers-office-home-egypt`
15. ✅ → slug: `travel-charger-usb-c-usb-a-sahel-trip`
16. ✅ → slug: `20w-30w-45w-65w-100w-charger-which-you-need`
17. ✅ → slug: `2-in-1-wireless-charger-phone-watch-bedside`
18. ✅ → slug: `charge-phone-overnight-safe-or-not`
19. ✅ → slug: `samsung-s26-ultra-45w-super-fast-charging-real`
20. ✅ → slug: `slimmest-100w-laptop-gan-chargers-egypt`
21. ✅ → slug: `why-anker-chargers-disappear-egyptian-markets`
22. ⬜ أفضل شاحن لـ Xiaomi Redmi Note 13 Pro و Poco في مصر 2026 → `xiaomi-redmi-note-13-pro-best-charger-egypt`
23. ⬜ شواحن HyperJuice احترافي — متى يحتاجه المصور والمصمم والمونتير؟ → `hyperjuice-professional-charger-when-need-it`
24. ⬜ كيف تحمي شاحن المنزل من تذبذب الكهرباء في صيف مصر؟ دليل المهندس → `protect-charger-egypt-voltage-fluctuation-summer`
25. ⬜ كابل USB-C 240W لشحن لابتوبات الجيمنج — متى تحتاجه فعلاً؟ → `usb-c-240w-cable-gaming-laptop-when-need`
26. ⬜ كابل بطول 3 متر للسرير والصالة — أفضل اختيارات متينة في مصر 2026 → `3-meter-charging-cable-bed-living-room`
27. ⬜ كابل مغناطيسي للسيارة — راحة الاستخدام مقابل بطء الشحن، أيهما يفوز؟ → `magnetic-cable-car-charging-pros-cons`
28. ⬜ كابل USB-C to Lightning ضد USB-C to USB-C — أيهما أسرع لـ iPhone؟ → `usb-c-lightning-vs-usb-c-usb-c-faster`
29. ⬜ كيف تحمي كابلات الشحن من حرارة العربية 70°م في صيف القاهرة؟ → `protect-cables-car-summer-heat-cairo`
30. ⬜ كابل قصير 30cm للباور بانك — لماذا يطيل عمر بطارية الباور بانك؟ → `short-30cm-cable-power-bank-extends-life`
31. ⬜ ليس كل منفذ USB-C يدعم 240W أو Thunderbolt — كيف تعرف الفرق؟ → `usb-c-240w-thunderbolt-port-difference`
32. ⬜ مراجعة كابل Joyroom Speedy Series — بعد 3 شهور استخدام يومي في مصر → `joyroom-speedy-cable-3-months-review`
33. ⬜ شاحن سيارة 100W للابتوب — أفضل اختيارات لرحلات الساحل والصعيد الطويلة → `car-charger-100w-laptop-sahel-trip`
34. ⬜ حامل سيارة مغناطيسي مع شحن لاسلكي — مراجعة 5 موديلات في مصر 2026 → `magnetic-car-phone-holder-wireless-charging`
35. ⬜ شاحن سيارة لشحن 3 أجهزة معاً — كيف توزع 60W بذكاء بين الأجهزة؟ → `car-charger-3-devices-power-distribution`
36. ⬜ لماذا يتوقف شاحن السيارة فجأة عن الشحن؟ 5 أسباب وحلولها العملية → `car-charger-stops-working-5-causes-fixes`
37. ⬜ حامل موبايل للسيارة بمروحة تبريد — هل يحمي الموبايل من سخونة الصيف؟ → `car-phone-holder-cooling-fan-summer-protection`
38. ⬜ شاحن سيارة USB-C PD — ضرورة لمستخدمي iPhone 15 و iPad في 2026 → `car-charger-usb-c-pd-iphone-15-ipad`
39. ⬜ أفضل ملحقات السيارة الذكية لسائقي Uber و Careem في مصر 2026 → `car-accessories-uber-careem-drivers-egypt`
40. ⬜ أنسب شاحن سيارة لكل من Toyota Corolla و Hyundai Tucson و Kia Cerato → `car-charger-toyota-corolla-hyundai-tucson-kia-cerato`
41. ⬜ سماعات وايرلس لـ PUBG Mobile و Free Fire — أقل تأخير صوتي تحت 1500 جنيه → `gaming-earbuds-pubg-freefire-low-latency`
42. ⬜ AirPods Pro 3 ضد Soundcore Liberty 4 NC — مقارنة كاملة بالأرقام والاختبارات → `airpods-pro-3-vs-soundcore-liberty-4-nc`
43. ⬜ سماعات للأذكار والقرآن الكريم — أفضل اختيارات الصوت الواضح في مصر → `earbuds-for-quran-recitation-clear-sound`
44. ⬜ كيف تختار سماعة Bluetooth حسب موبايلك (iPhone / Samsung / Xiaomi / Oppo)؟ → `bluetooth-earbuds-by-phone-brand-iphone-samsung-xiaomi-oppo`
45. ⬜ سبيكر بلوتوث للساحل وحمام السباحة — IPX67 الحقيقي مقابل المُدّعى → `bluetooth-speaker-beach-pool-ipx67-rating`
46. ⬜ سماعات للجيم والجري — أيهم لا يقع من الأذن مع العرق والحركة؟ → `earbuds-gym-running-no-drop-sweat-resistant`
47. ⬜ لماذا تنقطع سماعة Bluetooth فجأة في مصر؟ 6 أسباب و7 حلول مجربة → `bluetooth-earbuds-disconnect-6-causes-7-fixes`
48. ⬜ الفرق بين ANC و ENC و Transparency Mode — أيهم تحتاج فعلاً في 2026؟ → `anc-vs-enc-vs-transparency-mode-difference`
49. ⬜ سبيكر بلوتوث للمكتب والمنزل — أفضل صوت تحت 2000 جنيه في مصر 2026 → `bluetooth-speaker-office-home-2000-egp`
50. ⬜ سماعات On-Ear ضد Over-Ear ضد In-Ear — أيهم الأنسب لساعات عمل طويلة؟ → `on-ear-vs-over-ear-vs-in-ear-headphones`
51. ⬜ أفضل سماعات Soundcore تحت 1000 جنيه في مصر 2026 — للطلاب والميزانية → `soundcore-earbuds-under-1000-egp-students`
52. ⬜ لماذا تشتغل سماعة Bluetooth في أذن واحدة فقط؟ الحل قبل ترميها → `bluetooth-earbud-one-side-only-working`
53. ⬜ ساعة Joyroom الذكية ضد Apple Watch SE — هل الفرق يستحق 5 أضعاف السعر؟ → `joyroom-vs-apple-watch-se-5x-price`
54. ⬜ ساعات ذكية للرياضة فقط — أفضل اختيارات تحت 1500 جنيه في مصر 2026 → `sports-smart-watch-under-1500-egp-egypt`
55. ⬜ كيف تختار ساعة ذكية متوافقة مع iPhone و Samsung Galaxy معاً؟ → `smartwatch-iphone-samsung-cross-compatibility`
56. ⬜ ساعة ذكية لكبار السن — مميزات كشف السقطة وقياس الضغط الأهم لها → `smart-watch-elderly-fall-detection-health`
57. ⬜ بطارية الساعة الذكية بتخلص في يوم؟ 5 حلول مجربة لإطالة عمر البطارية → `smartwatch-battery-quick-drain-5-solutions`
58. ⬜ Anker ضد Joyroom ضد Baseus — أيهم الأفضل قيمة للجنيه المصري في 2026؟ → `anker-vs-joyroom-vs-baseus-value-egypt`
59. ⬜ لماذا لا تجد ملحقات Apple الأصلية في الأسواق المصرية بأسعار معقولة؟ → `apple-accessories-egypt-availability-pricing`
60. ⬜ PowerIQ 4.0 و VOOC و SuperFast Charge و TurboPower — شرح كامل لتقنيات الشحن → `poweriq-vooc-superfast-turbopower-explained`
61. ⬜ شواحن GaN III مقابل GaN II — هل الترقية تستحق فعلاً في 2026؟ → `gan-iii-vs-gan-ii-chargers-upgrade-worth-it`
62. ⬜ Qi2 و MagSafe — مستقبل الشحن اللاسلكي للهواتف في مصر 2026 → `qi2-magsafe-wireless-charging-future-egypt`
63. ⬜ USB-PD 3.1 بقدرة 240W — متى ستحتاجه فعلاً ومن يدعمه في 2026؟ → `usb-pd-3-1-240w-when-need-it-supports`
64. ⬜ Bluetooth 5.4 ضد 5.3 ضد 5.0 — هل الفرق ملحوظ في الاستخدام اليومي؟ → `bluetooth-5-4-vs-5-3-vs-5-0-real-difference`
65. ⬜ تقنية ActiveShield 2.0 من Anker — كيف تحمي بطاريتك وأجهزتك فعلاً؟ → `anker-activeshield-2-0-battery-protection-real`
66. ⬜ الموبايل بيسخن أثناء الشحن — متى تخاف ومتى الحرارة طبيعية؟ → `phone-heating-during-charging-normal-or-danger`
67. ⬜ البطارية بتنزل بسرعة بعد آخر تحديث iOS أو Android — هل الشاحن السبب؟ → `battery-drain-after-ios-android-update-charger`
68. ⬜ شواحن وملحقات للعمرة والحج 2026 — ما يحتاجه المسافر للسعودية فعلاً → `chargers-hajj-umrah-saudi-arabia-essentials`
69. ⬜ الجمعة البيضاء 2026 — كيف تكتشف العروض الحقيقية للملحقات من المزيفة؟ → `black-friday-egypt-real-deals-vs-fake-discounts`
70. ⬜ العودة للمدارس والجامعات 2026 — حقيبة الملحقات المثالية للطالب المصري → `back-to-school-university-accessories-bag-egypt`
71. ⬜ ايفون 16 Pro Max ضد ايفون 17 Pro Max — أيهما يستحق ترقية الشاحن والباور بانك؟ → `iphone-16-pro-max-vs-iphone-17-pro-max-charger-upgrade`
72. ⬜ شواحن Samsung Galaxy A55 و A75 — أرخص الأصلي وأذكى البدائل في مصر → `samsung-galaxy-a55-a75-charger-affordable-alternatives`
73. ⬜ أفضل ملحقات Xiaomi Redmi Note 14 — شاحن وكابل وباور بانك بأسعار الطلاب → `xiaomi-redmi-note-14-accessories-students-budget`
74. ⬜ ملحقات Oppo Reno 12 — هل تحتاج شاحن SuperVOOC الأصلي حقاً أم البديل يكفي؟ → `oppo-reno-12-supervooc-charger-original-vs-alternative`
75. ⬜ ملحقات Realme C series الميزانية — أفضل شاحن وكابل تحت 300 جنيه → `realme-c-series-budget-charger-cable-300-egp`
76. ⬜ شواحن Honor X series — التحدي الحقيقي لـ Samsung و Xiaomi في السوق المصري → `honor-x-series-chargers-vs-samsung-xiaomi`
77. ⬜ iPad Pro M4 ضد iPad Air — أيهما يحتاج شاحن أقوى للاستخدام الاحترافي؟ → `ipad-pro-m4-vs-ipad-air-charger-requirements`
78. ⬜ شواحن MacBook Air M3 و MacBook Pro M4 — بدائل GaN أرخص بنصف السعر الأصلي → `macbook-air-m3-pro-m4-gan-chargers-alternatives`
79. ⬜ ملحقات السائق الجديد — أساسيات حامل الموبايل والشاحن للمبتدئين في القيادة → `new-driver-car-accessories-essentials-beginners`
80. ⬜ شواحن لشهر رمضان — كيف تختار شاحن يتحمل ساعات شحن طويلة كل ليلة؟ → `chargers-ramadan-night-long-charging-sessions`
81. ⬜ شحن الموبايل وقت الصلاة والصيام — هل التيار المستمر يضر البطارية فعلاً؟ → `phone-charging-during-prayer-fasting-battery-safe`
82. ⬜ ملحقات أطباء المستشفيات والصيدليات — باور بانك يدوم وردية 12 ساعة كاملة → `doctor-hospital-power-bank-12-hour-shift`
83. ⬜ ملحقات صناع المحتوى المصريين — كاميرا + موبايل + لاب توب على باور بانك واحد → `content-creator-camera-laptop-phone-one-power-bank`
84. ⬜ ملحقات سائقي التوكتوك وموتوسيكلات الديليفري — حلول حقيقية للشحن السريع → `tuktuk-motorcycle-delivery-driver-fast-charging`
85. ⬜ ملحقات Talabat و Mrsool — أفضل حامل وشاحن لسائقي الديليفري في مصر → `talabat-mrsool-delivery-driver-phone-holder-charger`
86. ⬜ الباور بانك الشمسي Anker Solix — هل يستحق السعر في رحلات السفاري والكامبينج؟ → `anker-solix-solar-power-bank-safari-camping-egypt`
87. ⬜ شواحن لكاميرات المراقبة المنزلية — اختيار يمنع انقطاع التسجيل وقت الكهرباء → `home-security-cameras-power-backup-outage`
88. ⬜ شاحن السكوتر الكهربائي وملحقاته — دليل المستخدم المصري الجديد → `electric-scooter-charging-accessories-egypt`
89. ⬜ باور بانك للطائرات بدون طيار (Drones) — أعلى السعات المسموح بها للمصورين → `drone-power-bank-cinematography-photographers`
90. ⬜ شواحن لأجهزة الـ CPAP الطبية — السلامة قبل السعر للمرضى المصريين → `cpap-medical-power-bank-egypt-safety-first`
91. ⬜ الفرق بين Lithium-Ion و Lithium-Polymer في الباور بانك — أيهما أكثر أماناً؟ → `lithium-ion-vs-lithium-polymer-power-bank-safety`
92. ⬜ شحن Pass-Through (شحن الباور بانك وشحن أجهزتك معاً) — حقيقة أم خرافة؟ → `pass-through-charging-power-bank-myth-truth`
93. ⬜ كيف تنظف منفذ USB-C في الموبايل بأمان دون كسر الموصلات الداخلية؟ → `clean-usb-c-port-safely-phone-no-damage`
94. ⬜ لماذا لا يعمل الشحن السريع رغم استخدامك للشاحن الأصلي؟ 7 أسباب خفية → `fast-charging-not-working-original-charger-7-causes`
95. ⬜ شرارة الشاحن في البريزة — متى تكون طبيعية ومتى يجب استبداله فوراً؟ → `charger-spark-outlet-when-dangerous-replace`
96. ⬜ كيف تعرف أن بطارية موبايلك تحتاج التغيير؟ 5 علامات قبل الانهيار التام → `phone-battery-needs-replacement-5-signs`
97. ⬜ شحن الموبايل في درجات الحرارة المنخفضة شتاء الإسكندرية — قواعد الأمان → `phone-charging-cold-winter-alexandria-safety`
98. ⬜ حماية الأجهزة من تذبذب الفولتية المفاجئ في مصر — Surge Protection للشواحن → `surge-protector-voltage-spike-egypt-electrical`
99. ⬜ شواحن 2-منافذ ضد 4-منافذ ضد 6-منافذ — أيهم أوفر وأنسب لعائلتك المصرية؟ → `2-port-vs-4-port-vs-6-port-charger-family`
100. ⬜ Anker Soundcore ضد JBL ضد Bose — حرب السماعات الثلاثية في السوق المصري → `anker-soundcore-vs-jbl-vs-bose-speakers-egypt`
101. ⬜ حساب رياضي: متى يصبح شراء الشاحن الأصلي أوفر من شراء 3 شواحن مقلدة؟ → `authentic-charger-vs-3-fake-chargers-roi-math`

---

## 🕸️ العناقيد الموضوعية (Topic Clusters)

> استخدمها لاختيار `relatedArticles` (3 بالضبط) — قاعدة: مقال جديد يربط بـ 3 من نفس العنقود.

| العنقود | المقالات |
|---------|----------|
| 1. Power Banks | `best-power-bank-egypt-2026` · `best-power-bank-router-power-outage-egypt` · `how-to-charge-power-bank-correctly` · `power-bank-10000mah-real-capacity-myth` · `power-bank-airplane-rules-egypt-2026` · `can-power-bank-charge-laptop-guide` |
| 2. Chargers | `best-iphone-17-charger-egypt` · `best-samsung-s26-charger` · `gan-charger-technology-guide-egypt` · `the-hidden-truth-about-gan-chargers-ahmed-medhat` · `best-car-charger-egypt-2026` |
| 3. Cables | `usb-c-cable-guide-egypt-2026` · `why-charging-cable-breaks-fast-causes-fixes` |
| 4. Authenticity | `how-to-identify-original-anker` · `how-to-spot-fake-chargers-7-tests` · `original-vs-fake-apple-charger-egypt` · `do-fake-chargers-damage-iphone-battery` |
| 5. Audio | `best-bluetooth-earbuds-egypt-2026` · `soundcore-models-guide-egypt-2026` |

---

## 🔗 الملفات المرتبطة

| الملف | الدور |
|------|------|
| [`cairovolt-blog.md`](cairovolt-blog.md) | القواعد الثابتة (Workflow + Schema + Templates + Cheat Sheet) |
| [`content-laws.md`](content-laws.md) | القوانين العابرة (i18n + Bilingual Parity + Voice + Authority + Anti-AI) |
| [`voice.md`](voice.md) | المرجع الكنوني لـ Voice & Tone |
| [`cairovolt_content_blueprint.md`](cairovolt_content_blueprint.md) | E-E-A-T + Burstiness + AEO + NLP المصري |
