# 🎬 CairoVolt — كتيّب إنتاج الفيديوهات (Prompts كاملة لـ 90 يوم)

> **مرافق لـ** [cairovolt-social-roadmap.md](cairovolt-social-roadmap.md) — ده ملف **التنفيذ**: كل فيديو بالـ prompt + المحتوى + الرابط + الأبعاد.
> **أنت تنفّذ بالـ AI** — أنا لا أولّد شيئاً هنا. انسخ الـ prompt، حطّ صورة المرجع، ولّد.
> **الموديلات:** فيديو = **Seedance 2.0** · صور/thumbnails = **Google Nano Banana**.

---

## §A — الأرقام: كم فيديو، أنواعه، أبعاده

### عدد الفيديوهات لكل منصة (على مدى 13 أسبوع)
| المنصة | النوع | العدد (توليد جديد) | إعادة استخدام |
|--------|------|---------------------|----------------|
| **YouTube** | Long-form (16:9) | **6** | — |
| **YouTube** | Shorts (9:16) | **26** (2/أسبوع) | — |
| **TikTok** | Native (9:16) | **13** (1/أسبوع) | + 26 إعادة نشر من Shorts |
| **Twitter/X** | Video | **0 توليد** | 13 إعادة استخدام لأفضل Shorts |
| **Twitter/X** | Thread نصي | — | 13 thread (قوالب §E) |
| | **إجمالي التوليد الجديد** | **45 فيديو فريد** | |

> 🟢 **مسار Lite (لو الميزانية ضيّقة):** 1 Short/أسبوع + TikTok native كل أسبوعين + 6 long-form = **~25 فيديو** بدل 45. نفس التغطية، إيقاع أبطأ.

### الأنواع والأبعاد (Specs)
| النوع | Aspect | الدقة (px) | المدة | Resolution param | كم clip من Seedance |
|------|--------|-----------|-------|------------------|----------------------|
| YouTube Short | **9:16** | 1080×1920 | 20–30s | `1080p` (أو `720p` للتوفير) | 2 clips × 12–15s |
| TikTok Native | **9:16** | 1080×1920 | 15–25s | `720p` | 1–2 clips |
| YouTube Long-form | **16:9** | 1920×1080 | 60–180s | `1080p` | 6–12 clips تُركَّب |
| X Video (reuse) | 9:16 أو 1:1 crop | — | ≤140s | — | إعادة قص |

### 💰 ميزانية الـ credits
- رصيدك الآن **4.5 credits** = ~فيديو واحد. **45 فيديو = شحن مطلوب.**
- التكلفة الفعلية لكل فيديو تظهر عند أول `generate_video` — **ولّد فيديو تجريبي واحد الأول، اقرأ التكلفة، اضرب × عدد الشهر.**
- وفّر: استخدم `720p` للـ Shorts الروتينية، و`1080p` للـ long-form والفيديو البطل فقط. الـ long-form بدّل clips الـ Seedance بـ slideshow من Nano Banana (صور) + voiceover لو غالية.

---

## §B — آلية التشغيل + القوالب المشتركة

### المرجع البصري (Reference image) — استخدم أصولك الحقيقية
- **غلاف المقال:** `/images/blog/posts/{slug}.webp` ← أفضل start_image (بيعبّر عن الموضوع أصلاً).
- **صورة منتج:** `public/products/anker/{handle}/` أو `public/products/joyroom/{handle}/` (مثل `anker-737-powerbank`, `anker-nano-45w`, `joyroom-power-bank-20000`).
- في Seedance: ارفع الصورة كـ `medias` بدور `image` أو `start_image`.

### 🎨 STYLE_BASE (انسخه في بداية كل prompt فيديو)
```
Cinematic tech-commercial, shot on 50mm, shallow depth of field, soft warm key light
with cool rim light, clean modern Egyptian apartment/desk setting, crisp 4K detail,
slow smooth camera push-in, premium minimalist brand mood. NO baked-in text
(captions added in edit). Product identity must stay consistent with the reference image.
```

### 🏷️ BRAND_BASE
```
Brand: CairoVolt (Egyptian phone-accessories retailer). Products: Anker / Joyroom / Soundcore.
Mood: trustworthy expert, slightly playful. Apply CairoVolt accent color in edit.
```

### 🔊 الصوت
Seedance 2.0 مفيهوش `generate_audio` — ضيف الـ voiceover (صوت "البروفيسور") + موسيقى + الكابشن في المونتاج (CapCut/Premiere). للإعلانات الجاهزة فيه بديل `Marketing Studio` فيه `generate_audio=true`.

### ⚖️ قانون الروابط (i18n)
- فيديو **عربي** → رابط `https://cairovolt.com/blog/{slug}` (**بدون** `/en/`).
- فيديو **EN** (يبدأ W7) → `https://cairovolt.com/en/blog/{slug}` فقط.

---

## §C — الجدول الرئيسي (الـ 45 فيديو في لمحة)

`ID` = أسبوع-نوع-رقم · S=Short · T=TikTok · L=Long-form

| ID | أسبوع | منصة | نوع | Aspect | مدة | يرتبط بمقال (slug) | الزاوية |
|----|-------|------|-----|--------|-----|--------------------|---------|
| W1-S1 | 1 | YT | Short | 9:16 | 25s | protect-phone-from-heat-summer-egypt | موبايلك بيسخن؟ 3 حركات فورية |
| W1-S2 | 1 | YT | Short | 9:16 | 25s | protect-phone-from-heat-summer-egypt | خطر سيبان الموبايل في العربية |
| W1-T1 | 1 | TikTok | Native | 9:16 | 18s | protect-phone-from-heat-summer-egypt | ميم: الموبايل زي الآيس كريم |
| W2-S1 | 2 | YT | Short | 9:16 | 28s | best-power-bank-router-power-outage-egypt | شغّل الراوتر بالباور بانك |
| W2-S2 | 2 | YT | Short | 9:16 | 25s | best-power-bank-router-power-outage-egypt | أنهي سعة تكفي ساعات نت؟ |
| W2-T1 | 2 | TikTok | Native | 9:16 | 20s | best-power-bank-router-power-outage-egypt | تخفيف الأحمال رجع 😩 |
| W2-L1 | 2 | YT | Long | 16:9 | 150s | best-power-bank-router-power-outage-egypt | دليل النجاة من قطع الكهرباء |
| W3-S1 | 3 | YT | Short | 9:16 | 25s | protect-cables-car-summer-heat-cairo | الكابل بيتقطع في العربية؟ |
| W3-S2 | 3 | YT | Short | 9:16 | 25s | best-car-charger-egypt-2026 | أحسن شاحن عربية 2026 |
| W3-T1 | 3 | TikTok | Native | 9:16 | 18s | protect-cables-car-summer-heat-cairo | حرارة العربية بتقتل الكابلات |
| W4-S1 | 4 | YT | Short | 9:16 | 28s | travel-charger-usb-c-usb-a-sahel-trip | شنطة شحن الساحل |
| W4-S2 | 4 | YT | Short | 9:16 | 25s | power-bank-airplane-rules-egypt-2026 | الباور بانك في الطيارة — القواعد |
| W4-T1 | 4 | TikTok | Native | 9:16 | 20s | travel-charger-usb-c-usb-a-sahel-trip | رايح الساحل؟ متنساش ده |
| W4-L1 | 4 | YT | Long | 16:9 | 160s | travel-charger-usb-c-usb-a-sahel-trip | دليل شحن إجازة الساحل الكامل |
| W5-S1 | 5 | YT | Short | 9:16 | 25s | protect-charger-egypt-voltage-fluctuation-summer | الكهربا بتقطّع بتحرق الشاحن |
| W5-S2 | 5 | YT | Short | 9:16 | 28s | why-power-bank-dies-after-6-months-mistakes | ليه الباور بانك بيموت بعد 6 شهور |
| W5-T1 | 5 | TikTok | Native | 9:16 | 18s | why-power-bank-dies-after-6-months-mistakes | 3 أخطاء بتقتل الباور بانك |
| W6-S1 | 6 | YT | Short | 9:16 | 25s | does-fast-charging-damage-battery-truth | الشحن السريع بيتلف البطارية؟ |
| W6-S2 | 6 | YT | Short | 9:16 | 25s | charge-phone-overnight-safe-or-not | الشحن بالليل خطر؟ |
| W6-T1 | 6 | TikTok | Native | 9:16 | 20s | does-fast-charging-damage-battery-truth | خرافة الشحن السريع |
| W6-L1 | 6 | YT | Long | 16:9 | 150s | does-fast-charging-damage-battery-truth | خرافات شحن البطارية (كلها) |
| W7-S1 | 7 | YT | Short | 9:16 | 28s | how-to-spot-fake-chargers-7-tests | 7 اختبارات تكشف المغشوش |
| W7-S2 | 7 | YT | Short | 9:16 | 25s | how-to-identify-original-anker | ازاي تعرف Anker الأصلي |
| W7-T1 | 7 | TikTok | Native | 9:16 | 18s | how-to-spot-fake-chargers-7-tests | اختبار الوزن بيفضح التقليد |
| W8-S1 | 8 | YT | Short | 9:16 | 25s | original-vs-fake-apple-charger-egypt | شاحن آبل أصلي vs تقليد |
| W8-S2 | 8 | YT | Short | 9:16 | 25s | do-fake-chargers-damage-iphone-battery | الشاحن المغشوش بيحرق الآيفون |
| W8-T1 | 8 | TikTok | Native | 9:16 | 20s | original-vs-fake-apple-charger-egypt | الفرق في 10 ثواني |
| W8-L1 | 8 | YT | Long | 16:9 | 170s | how-to-spot-fake-chargers-7-tests | ماستركلاس كشف التقليد |
| W9-S1 | 9 | YT | Short | 9:16 | 28s | anker-vs-joyroom-comparison | Anker vs Joyroom — مين يكسب؟ |
| W9-S2 | 9 | YT | Short | 9:16 | 25s | 5000-vs-10000-vs-20000-mah-which-capacity | أنهي سعة تناسبك؟ |
| W9-T1 | 9 | TikTok | Native | 9:16 | 18s | anker-vs-joyroom-comparison | غني vs اقتصادي |
| W10-S1 | 10 | YT | Short | 9:16 | 25s | iphone-17-pro-max-charger-20w-30w-45w-which | آيفون 17 — أنهي شاحن؟ |
| W10-S2 | 10 | YT | Short | 9:16 | 25s | galaxy-s26-ultra-vs-iphone-17-pro-max-power-bank-needs | جالاكسي vs آيفون |
| W10-T1 | 10 | TikTok | Native | 9:16 | 20s | iphone-17-pro-max-charger-20w-30w-45w-which | متضيّعش فلوس في وات زيادة |
| W10-L1 | 10 | YT | Long | 16:9 | 160s | iphone-17-pro-max-charger-20w-30w-45w-which | اختار شاحن موبايلك صح |
| W11-S1 | 11 | YT | Short | 9:16 | 25s | power-bank-gaming-pubg-freefire-cooling | باور بانك للجيمنج بمروحة |
| W11-S2 | 11 | YT | Short | 9:16 | 25s | power-bank-for-photographers-dslr-cameras | شحن الكاميرا للمصورين |
| W11-T1 | 11 | TikTok | Native | 9:16 | 18s | power-bank-gaming-pubg-freefire-cooling | الموبايل بيسخن في الـPUBG |
| W12-S1 | 12 | YT | Short | 9:16 | 28s | best-power-bank-egypt-2026 | أحسن باور بانك 2026 |
| W12-S2 | 12 | YT | Short | 9:16 | 25s | soundcore-models-guide-egypt-2026 | أنهي سماعة Soundcore؟ |
| W12-T1 | 12 | TikTok | Native | 9:16 | 20s | best-power-bank-egypt-2026 | الـ3 اللي بننصح بيهم |
| W12-L1 | 12 | YT | Long | 16:9 | 180s | best-power-bank-egypt-2026 | أفضل اكسسوارات الشحن 2026 |
| W13-S1 | 13 | YT | Short | 9:16 | 25s | gan-charger-technology-guide-egypt | تقنية GaN — ليه أصغر وأسرع |
| W13-S2 | 13 | YT | Short | 9:16 | 25s | best-power-bank-under-1000-egp-egypt | أحسن باور بانك تحت 1000ج |
| W13-T1 | 13 | TikTok | Native | 9:16 | 18s | gan-charger-technology-guide-egypt | GaN في جملة |

> الـ 26 Short تُعاد نشرها على TikTok (= 26 repost) + أفضل 13 تُعاد على X كفيديو. صفر توليد إضافي.

---

## §D — الـ Prompts الكاملة (أسبوع بأسبوع)

> كل بلوك: **🔗 الرابط** · **📝 المحتوى** (هوك/متن/CTA + نص الشاشة) · **🎬 Seedance Prompt** (انسخه بعد STYLE_BASE + BRAND_BASE).

---

### 🟦 الأسبوع 1 — protect-phone-from-heat-summer-egypt
🎯 كلمة مفتاحية: «حماية الموبايل من حرارة الصيف» · 🔗 `https://cairovolt.com/blog/protect-phone-from-heat-summer-egypt`

**W1-S1 · YT Short · 9:16 · 25s**
- 📝 هوك: «موبايلك بيسخن في الشمس؟ متعملش الغلطة دي!» · متن: «3 حركات فورية: شيله من الشمس المباشرة، اقفل الشحن وهو سخن، وشيل الجراب» · CTA: «الشرح كامل — اللينك تحت 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A smartphone resting on a hot car dashboard under harsh Egyptian summer sun, heat shimmer in the air, then a hand moves it into cool shade near a fan. Macro shot of the phone surface. ref: /images/blog/posts/protect-phone-from-heat-summer-egypt.webp`

**W1-S2 · YT Short · 9:16 · 25s**
- 📝 هوك: «سايب موبايلك في العربية الصيف ده؟ 🥵» · متن: «جوه العربية الحرارة بتوصل 70°، البطارية بتتلف بسرعة» · CTA: «اعرف ازاي تحميه 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. Interior of a parked car under blazing sun, a phone on the seat, thermometer overlay feel, sweat-droplet condensation, dramatic warm light. Slow push-in on the phone. ref: /images/blog/posts/protect-phone-from-heat-summer-egypt.webp`

**W1-T1 · TikTok Native · 9:16 · 18s**
- 📝 هوك: «الموبايل في صيف مصر زي الآيس كريم 🍦 بيسيح» · متن: «بس الفرق إنك تقدر تنقذه — متشحنوش وهو سخن» · CTA: «نصايح كتير في المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. Playful: a smartphone next to a melting ice-cream cone on a sunny table, fun summer vibe, vibrant colors, quick zoom. ref: product photo public/products/anker/anker-nano-45w`

---

### 🟦 الأسبوع 2 — best-power-bank-router-power-outage-egypt (+ Long-form)
🎯 «باور بانك للراوتر وقت قطع الكهرباء» · 🔗 `https://cairovolt.com/blog/best-power-bank-router-power-outage-egypt`

**W2-S1 · YT Short · 9:16 · 28s**
- 📝 هوك: «الكهربا قطعت والنت راح؟ الحل هنا» · متن: «باور بانك بمخرج DC/USB بيشغّل الراوتر ساعات وانت مكمل شغل» · CTA: «أنهي موديل؟ 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A WiFi router on a shelf connected to a power bank during a blackout, warm candle-like ambient light, router LEDs glowing, cozy Egyptian living room. ref: public/products/anker/anker-521-powerhouse`

**W2-S2 · YT Short · 9:16 · 25s**
- 📝 هوك: «أنهي سعة تشغّل الراوتر أطول وقت؟» · متن: «20000mAh = ~6 ساعات نت. الأرقام كاملة في المقال» · CTA: «احسبها صح 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. Close-up of a 20000mAh power bank digital display showing capacity, next to a router, clean desk, soft light, numbers feel. ref: public/products/anker/anker-powercore-20000`

**W2-T1 · TikTok Native · 9:16 · 20s**
- 📝 هوك: «تخفيف الأحمال رجع 😩» · متن: «مش هنقعد في الضلمة وبدون نت — باور بانك واحد بيحل الموضوع» · CTA: «اللي بننصح بيه في المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. Lights flicker off in a room, then a power bank keeps the router and a phone alive, relief mood, dramatic dark-to-glow transition. ref: public/products/anker/anker-737-powerbank`

**W2-L1 · YT Long-form · 16:9 · 150s** — «دليل النجاة من قطع الكهرباء: ازاي تفضل online»
- 📝 بنية: مقدمة (مشكلة تخفيف الأحمال) → ما هو الباور بانك المناسب للراوتر → حساب السعة/الساعات → 3 موديلات مرشحة → نصائح أمان → CTA
- 🎬 ركّب 8–10 clips: `STYLE_BASE + BRAND_BASE. Scene set: blackout in Egyptian home → router on power bank → close-ups of 3 power banks (anker-521-powerhouse, anker-737-powerbank, anker-powercore-20000) → person working on laptop calmly. 16:9, cinematic b-roll per scene.` + voiceover + chapters.

---

### 🟦 الأسبوع 3 — protect-cables-car-summer-heat-cairo (+ best-car-charger-egypt-2026)
🎯 «حماية الكابلات من حرارة العربية» · 🔗 pillar: `https://cairovolt.com/blog/protect-cables-car-summer-heat-cairo`

**W3-S1 · YT Short · 9:16 · 25s** — 🔗 protect-cables-car-summer-heat-cairo
- 📝 هوك: «كابلك بيتقطع بسرعة؟ السبب العربية!» · متن: «حرارة العربية بتجفّف عزل الكابل ويتشقق — سيبه في مكان مظلل» · CTA: «نصايح الحماية 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A charging cable left on a hot car dashboard, close macro of cracked cable insulation vs a healthy braided cable, harsh sunlight. ref: public/products/joyroom/joyroom-type-c-lightning-braided`

**W3-S2 · YT Short · 9:16 · 25s** — 🔗 `https://cairovolt.com/blog/best-car-charger-egypt-2026`
- 📝 هوك: «أحسن شاحن عربية في 2026؟» · متن: «شاحن GaN بمنفذين USB-C بيشحن موبايلين بسرعة وانت سايق» · CTA: «المقارنة الكاملة 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A dual-port car charger plugged into a modern car socket, two phones fast-charging, dashboard at golden hour, premium feel. ref: public/products/joyroom/joyroom-60w-car-charger`

**W3-T1 · TikTok Native · 9:16 · 18s** — 🔗 protect-cables-car-summer-heat-cairo
- 📝 هوك: «حرارة عربيتك بتقتل كابلاتك 🔥» · متن: «خبّيهم في الدرج، وجيب كابل braided يستحمل» · CTA: «التفاصيل في المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. Quick demo: tossing a cable into a car glovebox vs leaving it baking on the seat, summer car interior, snappy cuts. ref: public/products/joyroom/joyroom-type-c-lightning-braided`

---

### 🟦 الأسبوع 4 — travel-charger-usb-c-usb-a-sahel-trip (+ airplane rules) (+ Long-form)
🎯 «شاحن السفر للساحل» · 🔗 pillar: `https://cairovolt.com/blog/travel-charger-usb-c-usb-a-sahel-trip`

**W4-S1 · YT Short · 9:16 · 28s** — 🔗 travel-charger-usb-c-usb-a-sahel-trip
- 📝 هوك: «رايح الساحل؟ دي شنطة الشحن المثالية» · متن: «شاحن متعدد المنافذ + باور بانك + كابلين = مفيش قلق» · CTA: «القائمة كاملة 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. Flat-lay of travel charging kit (multi-port charger, power bank, cables) in an open beach bag, sand and sea background, bright summer holiday vibe. ref: public/products/anker/anker-a2147-gan-charger-30W`

**W4-S2 · YT Short · 9:16 · 25s** — 🔗 `https://cairovolt.com/blog/power-bank-airplane-rules-egypt-2026`
- 📝 هوك: «الباور بانك مسموح في الطيارة؟» · متن: «أقل من 100Wh = آه في الكابينة. أكتر = ممنوع» · CTA: «القواعد بالتفصيل 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A power bank inside carry-on luggage at an airport security tray, boarding-pass and passport beside it, clean travel aesthetic. ref: public/products/anker/anker-powercore-20000`

**W4-T1 · TikTok Native · 9:16 · 20s** — 🔗 travel-charger-usb-c-usb-a-sahel-trip
- 📝 هوك: «رايح الساحل ومنساش الشاحن؟ 🏖️» · متن: «خد الكيت ده وانت مرتاح طول الإجازة» · CTA: «الكيت كامل في المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. Packing montage for a beach trip, hand dropping charging gear into a bag, sunny upbeat mood, fast cuts. ref: public/products/anker/anker-a2147-gan-charger-30W`

**W4-L1 · YT Long-form · 16:9 · 160s** — «دليل شحن إجازة الساحل الكامل»
- 📝 بنية: ليه السفر بيحتاج تجهيز شحن → الشاحن المتعدد → الباور بانك المناسب → قواعد الطيارة → كابلات تستحمل الشمس → CTA
- 🎬 ركّب clips: `STYLE_BASE + BRAND_BASE. Sequence: beach house, car trip, airport, charging gear flat-lays (anker-a2147-gan-charger-30W, anker-powercore-20000, joyroom cables). 16:9 summer travel cinematic.` + voiceover.

---

### 🟦 الأسبوع 5 — protect-charger-egypt-voltage-fluctuation-summer (+ why power bank dies)
🎯 «حماية الشاحن من تذبذب الكهرباء» · 🔗 `https://cairovolt.com/blog/protect-charger-egypt-voltage-fluctuation-summer`

**W5-S1 · YT Short · 9:16 · 25s** — 🔗 protect-charger-egypt-voltage-fluctuation-summer
- 📝 هوك: «الكهربا بتقطّع وترجع؟ بتحرق شاحنك!» · متن: «الطفرات الكهربائية بتقتل الشواحن — استخدم شاحن بحماية ومنظّم» · CTA: «ازاي تحمي شاحنك 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A wall socket with a subtle electric spark/surge effect, a quality charger plugged in safely, warm dramatic light, tech-safety mood. ref: public/products/anker/anker-a2741-charger-30w`

**W5-S2 · YT Short · 9:16 · 28s** — 🔗 `https://cairovolt.com/blog/why-power-bank-dies-after-6-months-mistakes`
- 📝 هوك: «باور بانكك بيموت بعد 6 شهور؟ السبب إنت» · متن: «تفضيه لآخره، تسيبه في الشمس، تشحنه غلط» · CTA: «الأخطاء كاملة 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A power bank shown aging: full → draining → swollen, conceptual timeline, clean studio, slight dramatic lighting. ref: public/products/anker/anker-powercore-10000`

**W5-T1 · TikTok Native · 9:16 · 18s** — 🔗 why-power-bank-dies-after-6-months-mistakes
- 📝 هوك: «3 أخطاء بتقتل الباور بانك ☠️» · متن: «1- تفضيه خالص 2- الحرارة 3- الكابل الوحش» · CTA: «صلّحهم من المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. Three quick vignettes of power-bank misuse, numbered-list energy, snappy transitions. ref: public/products/anker/anker-powercore-10000`

---

### 🟦 الأسبوع 6 — does-fast-charging-damage-battery-truth (+ overnight) (+ Long-form)
🎯 «هل الشحن السريع يتلف البطارية» · 🔗 `https://cairovolt.com/blog/does-fast-charging-damage-battery-truth`

**W6-S1 · YT Short · 9:16 · 25s** — 🔗 does-fast-charging-damage-battery-truth
- 📝 هوك: «الشحن السريع بيتلف البطارية؟ الحقيقة 🔬» · متن: «لأ — لو الشاحن أصلي ومعتمد. الموبايل بينظّم التيار لوحده» · CTA: «العلم كامل 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A phone fast-charging with an animated battery percentage rising, scientific clean lab vibe, glowing battery icon, myth-busting mood. ref: public/products/anker/anker-nano-45w`

**W6-S2 · YT Short · 9:16 · 25s** — 🔗 `https://cairovolt.com/blog/charge-phone-overnight-safe-or-not`
- 📝 هوك: «بتشحن موبايلك بالليل؟ ده آمن؟» · متن: «الموبايلات الحديثة بتقف عند 100% — بس الحرارة هي العدو» · CTA: «التفاصيل 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A phone charging on a nightstand at night, soft blue ambient light, calm bedroom, battery at 100%, peaceful mood. ref: public/products/anker/anker-a2732-charger-35w`

**W6-T1 · TikTok Native · 9:16 · 20s** — 🔗 does-fast-charging-damage-battery-truth
- 📝 هوك: «خرافة: الشحن السريع بيحرق البطارية 🚫» · متن: «الحقيقة العلمية هتفاجئك» · CTA: «اكتشفها في المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. Bold myth-vs-fact reveal, a charger with a 'FALSE' stamp concept, energetic, clean. ref: public/products/anker/anker-nano-45w`

**W6-L1 · YT Long-form · 16:9 · 150s** — «خرافات شحن البطارية كلها»
- 📝 بنية: 5 خرافات (السريع، بالليل، التفريغ الكامل، الشاحن التاني، 100%) → الحقيقة العلمية لكل واحدة → CTA
- 🎬 ركّب clips: `STYLE_BASE + BRAND_BASE. Myth-busting series, 5 segments each with a charging scene + science visual, lab-clean aesthetic. 16:9.` + voiceover + chapters لكل خرافة.

---

### 🟦 الأسبوع 7 — how-to-spot-fake-chargers-7-tests (+ identify anker) · **بدء مسار EN**
🎯 «كشف الشاحن المغشوش» · 🔗 `https://cairovolt.com/blog/how-to-spot-fake-chargers-7-tests`

**W7-S1 · YT Short · 9:16 · 28s** — 🔗 how-to-spot-fake-chargers-7-tests
- 📝 هوك: «7 اختبارات تكشف الشاحن المغشوش في ثواني» · متن: «الوزن، الكتابة، المنفذ، الوصلة... جرّبهم» · CTA: «الـ7 كاملين 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. Side-by-side of a genuine vs fake charger, hands inspecting weight and print quality, investigative close-ups, sharp light. ref: public/products/anker/anker-powerport-25w`
- 🌍 EN نسخة: link `https://cairovolt.com/en/blog/how-to-spot-fake-chargers-7-tests`

**W7-S2 · YT Short · 9:16 · 25s** — 🔗 `https://cairovolt.com/blog/how-to-identify-original-anker`
- 📝 هوك: «ازاي تعرف Anker الأصلي؟» · متن: «الباركود، الهولوجرام، جودة التغليف، الموقع الرسمي» · CTA: «الدليل 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. Close-up of an authentic Anker box, hologram sticker and serial barcode being scanned by a phone, trust/authenticity mood. ref: public/products/anker/anker-nano-45w-smart-display-charger`

**W7-T1 · TikTok Native · 9:16 · 18s** — 🔗 how-to-spot-fake-chargers-7-tests
- 📝 هوك: «اختبار الوزن بيفضح التقليد ⚖️» · متن: «الأصلي أتقل لأن فيه مكوّنات حقيقية» · CTA: «6 اختبارات تانية في المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. Two chargers on a small scale, the genuine one heavier, satisfying reveal, crisp macro. ref: public/products/anker/anker-powerport-25w`

---

### 🟦 الأسبوع 8 — original-vs-fake-apple-charger-egypt (+ fake damage) (+ Long-form)
🎯 «شاحن آبل أصلي vs تقليد» · 🔗 `https://cairovolt.com/blog/original-vs-fake-apple-charger-egypt`

**W8-S1 · YT Short · 9:16 · 25s** — 🔗 original-vs-fake-apple-charger-egypt
- 📝 هوك: «شاحن آيفون أصلي ولا تقليد؟ بصّ كده» · متن: «الفرق في الخط، الـ pins، والوزن — التقليد بيبان» · CTA: «الفروق كلها 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. Macro comparison of a genuine vs counterfeit Apple-style charger, focus on pin finish and text engraving, investigative lighting. ref: public/products/anker/anker-powerport-20w`

**W8-S2 · YT Short · 9:16 · 25s** — 🔗 `https://cairovolt.com/blog/do-fake-chargers-damage-iphone-battery`
- 📝 هوك: «الشاحن المغشوش بيحرق بطارية الآيفون؟ 🔥» · متن: «آه — تيار غير منظّم بيتلف الخلايا ويسخّن الجهاز» · CTA: «احمِ آيفونك 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A cheap fake charger overheating concept (subtle heat glow) next to an iPhone, warning mood, dramatic. ref: public/products/anker/anker-a2732-charger-35w`

**W8-T1 · TikTok Native · 9:16 · 20s** — 🔗 original-vs-fake-apple-charger-egypt
- 📝 هوك: «الفرق بين الأصلي والتقليد في 10 ثواني» · متن: «تابع وانت هتفرق على طول» · CTA: «التفاصيل في المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. Fast 10-second genuine-vs-fake reveal, split-screen energy, snappy. ref: public/products/anker/anker-powerport-20w`

**W8-L1 · YT Long-form · 16:9 · 170s** — «ماستركلاس كشف التقليد» (→ embed في المقال)
- 📝 بنية: ليه التقليد خطر → الـ7 اختبارات بالتفصيل والعملي → حالة آبل → نصيحة الشراء من مصدر موثوق → CTA
- 🎬 ركّب clips: `STYLE_BASE + BRAND_BASE. Detailed forensic comparison series, multiple chargers, scale/print/port close-ups, expert-on-camera feel. 16:9.` + voiceover. **ثم ضمّنه (embed) داخل المقال.**

---

### 🟦 الأسبوع 9 — anker-vs-joyroom-comparison (+ capacity)
🎯 «Anker ضد Joyroom» · 🔗 `https://cairovolt.com/blog/anker-vs-joyroom-comparison`

**W9-S1 · YT Short · 9:16 · 28s** — 🔗 anker-vs-joyroom-comparison
- 📝 هوك: «Anker غالي... Joyroom أرخص... مين يكسب؟» · متن: «الجودة vs السعر — كل واحد ليه ميزته حسب احتياجك» · CTA: «المقارنة الكاملة 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. Versus layout: Anker product on one side, Joyroom on the other, split-screen showdown, dynamic camera, premium vs value mood. ref: public/products/anker/anker-powercore-20000 + public/products/joyroom/joyroom-power-bank-20000`

**W9-S2 · YT Short · 9:16 · 25s** — 🔗 `https://cairovolt.com/blog/5000-vs-10000-vs-20000-mah-which-capacity`
- 📝 هوك: «5000 ولا 10000 ولا 20000؟» · متن: «5000=طوارئ، 10000=يوم، 20000=سفر. اختار صح» · CTA: «الجدول 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. Three power banks of increasing size lined up, scale comparison, clean studio, numbers feel. ref: public/products/anker/anker-powercore-10000`

**W9-T1 · TikTok Native · 9:16 · 18s** — 🔗 anker-vs-joyroom-comparison
- 📝 هوك: «غني ولا اقتصادي؟ 🤔» · متن: «Anker للجودة طويلة المدى، Joyroom للميزانية» · CTA: «قرّر من المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. Quick versus reveal, two power banks, playful decision mood. ref: public/products/joyroom/joyroom-power-bank-20000`

---

### 🟦 الأسبوع 10 — iphone-17-pro-max-charger (+ galaxy vs iphone) (+ Long-form)
🎯 «شاحن آيفون 17 — أنهي وات» · 🔗 `https://cairovolt.com/blog/iphone-17-pro-max-charger-20w-30w-45w-which`

**W10-S1 · YT Short · 9:16 · 25s** — 🔗 iphone-17-pro-max-charger-20w-30w-45w-which
- 📝 هوك: «آيفون 17 برو ماكس — أنهي شاحن؟» · متن: «30W هو الـ sweet spot — أكتر مش هيفرق» · CTA: «ليه؟ في المقال 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. An iPhone-style phone with chargers of 20W/30W/45W lined up, the 30W highlighted, clean tech studio. ref: public/products/anker/anker-a2741-charger-30w`

**W10-S2 · YT Short · 9:16 · 25s** — 🔗 `https://cairovolt.com/blog/galaxy-s26-ultra-vs-iphone-17-pro-max-power-bank-needs`
- 📝 هوك: «جالاكسي vs آيفون — مين محتاج باور بانك أكبر؟» · متن: «الفرق في سعة البطارية وسرعة الشحن» · CTA: «المقارنة 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. Two flagship-style phones side by side with battery icons, versus mood, premium. ref: public/products/anker/anker-737-powerbank`

**W10-T1 · TikTok Native · 9:16 · 20s** — 🔗 iphone-17-pro-max-charger-20w-30w-45w-which
- 📝 هوك: «متضيّعش فلوس في وات إنت مش محتاجه!» · متن: «30W كفاية لآيفونك — الزيادة تسويق» · CTA: «الحقيقة في المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. Money-saving angle, a 30W charger highlighted vs an expensive bigger one crossed out, smart-shopper mood. ref: public/products/anker/anker-a2741-charger-30w`

**W10-L1 · YT Long-form · 16:9 · 160s** — «اختار شاحن موبايلك صح»
- 📝 بنية: ازاي تعرف وات موبايلك → جدول الموبايلات الشهيرة → آيفون vs أندرويد → GaN → CTA
- 🎬 ركّب clips: `STYLE_BASE + BRAND_BASE. Charger-matching guide, multiple phones + chargers, table-on-screen feel, expert tone. 16:9.` + voiceover.

---

### 🟦 الأسبوع 11 — gaming + photographers (نيش)
🎯 «باور بانك للجيمنج» · 🔗 `https://cairovolt.com/blog/power-bank-gaming-pubg-freefire-cooling`

**W11-S1 · YT Short · 9:16 · 25s** — 🔗 power-bank-gaming-pubg-freefire-cooling
- 📝 هوك: «الموبايل بيسخن وبيهنّج في الـPUBG؟» · متن: «باور بانك بمروحة تبريد بيخليك تلعب وتشحن من غير حرارة» · CTA: «الموديلات 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A gaming phone with a magnetic cooling power bank attached, RGB gamer setup, intense play, cool blue accents. ref: public/products/anker/anker-622-maggo`

**W11-S2 · YT Short · 9:16 · 25s** — 🔗 `https://cairovolt.com/blog/power-bank-for-photographers-dslr-cameras`
- 📝 هوك: «مصوّر؟ كاميرتك مش لازم تفصل» · متن: «باور بانك بـPD بيشحن الـDSLR والميرورليس في الميدان» · CTA: «التفاصيل 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A photographer outdoors charging a mirrorless camera from a power bank via USB-C, golden hour, creative-pro mood. ref: public/products/anker/anker-prime-a1695-25000`

**W11-T1 · TikTok Native · 9:16 · 18s** — 🔗 power-bank-gaming-pubg-freefire-cooling
- 📝 هوك: «الموبايل سخن وانت بتكسب الماتش؟ 😤» · متن: «التبريد المغناطيسي بينقذك» · CTA: «الحل في المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. Gamer frustration to relief, cooling power bank snaps on, snappy energetic cuts. ref: public/products/anker/anker-622-maggo`

---

### 🟦 الأسبوع 12 — best-power-bank-egypt-2026 (+ soundcore) (+ Long-form)
🎯 «أفضل باور بانك في مصر 2026» · 🔗 `https://cairovolt.com/blog/best-power-bank-egypt-2026`

**W12-S1 · YT Short · 9:16 · 28s** — 🔗 best-power-bank-egypt-2026
- 📝 هوك: «أحسن باور بانك تشتريه في 2026؟» · متن: «جمّعنا الأفضل سعة/سعر/جودة في مصر» · CTA: «القائمة 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. Hero lineup of top power banks on a pedestal, award-show lighting, premium reveal, 2026 feel. ref: public/products/anker/anker-737-powerbank`

**W12-S2 · YT Short · 9:16 · 25s** — 🔗 `https://cairovolt.com/blog/soundcore-models-guide-egypt-2026`
- 📝 هوك: «أنهي سماعة Soundcore تناسبك؟» · متن: «من P20i الاقتصادية لـ Liberty 4 Pro — لكل ميزانية» · CTA: «الدليل 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. Several Soundcore earbuds cases arranged by tier, lifestyle music mood, clean colorful. ref: public/products/anker/soundcore-p40i-earbuds`

**W12-T1 · TikTok Native · 9:16 · 20s** — 🔗 best-power-bank-egypt-2026
- 📝 هوك: «الـ3 باور بانك اللي بننصح بيهم 👌» · متن: «اقتصادي، متوسط، وحش — لكل واحد سبب» · CTA: «الأسباب في المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. Top-3 reveal, three power banks with rank badges, satisfying countdown. ref: public/products/anker/anker-powercore-20000`

**W12-L1 · YT Long-form · 16:9 · 180s** — «أفضل اكسسوارات الشحن 2026»
- 📝 بنية: أفضل باور بانك → أفضل شاحن → أفضل كابل → أفضل سماعة → نصيحة شراء → CTA
- 🎬 ركّب clips: `STYLE_BASE + BRAND_BASE. Annual best-of showcase, category-by-category product hero shots (power bank, charger, cable, earbuds), awards aesthetic. 16:9.` + voiceover + chapters.

---

### 🟦 الأسبوع 13 — gan-charger-technology + (under 1000) + مراجعة الربع
🎯 «تقنية GaN» · 🔗 `https://cairovolt.com/blog/gan-charger-technology-guide-egypt`

**W13-S1 · YT Short · 9:16 · 25s** — 🔗 gan-charger-technology-guide-egypt
- 📝 هوك: «ليه شواحن GaN أصغر وأسرع؟» · متن: «مادة نيتريد الجاليوم بتسمح بحرارة أقل وحجم أصغر» · CTA: «الشرح العلمي 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. A tiny GaN charger next to a bulky old charger, size-shock comparison, futuristic tech glow, science mood. ref: public/products/anker/anker-a2147-gan-charger-30W`

**W13-S2 · YT Short · 9:16 · 25s** — 🔗 `https://cairovolt.com/blog/best-power-bank-under-1000-egp-egypt`
- 📝 هوك: «أحسن باور بانك تحت 1000 جنيه؟» · متن: «جودة كويسة من غير ما تكسر الميزانية» · CTA: «الترشيحات 👇»
- 🎬 `STYLE_BASE + BRAND_BASE. Budget-hero power bank with a price-tag concept under 1000 EGP, value-for-money mood, clean. ref: public/products/joyroom/joyroom-power-bank-10000`

**W13-T1 · TikTok Native · 9:16 · 18s** — 🔗 gan-charger-technology-guide-egypt
- 📝 هوك: «GaN في جملة واحدة 🤓» · متن: «أصغر + أبرد + أسرع — التكنولوجيا الجديدة للشواحن» · CTA: «العلم كامل في المقال»
- 🎬 `STYLE_BASE + BRAND_BASE. One-liner explainer, GaN charger spinning with a tech highlight, crisp minimal. ref: public/products/anker/anker-a2147-gan-charger-30W`

> **W13 كمان:** اعمل compilation reel لأفضل 5 لحظات من الربع (بدون توليد جديد) + راجع §9 KPIs في الرودماب وخطّط Q4.

---

## §E — قوالب النص المصاحب (Captions / Descriptions / Threads)

### YouTube Short / TikTok caption (عربي)
```
{الهوك} 🔋
{جملة القيمة}
📖 الشرح الكامل: https://cairovolt.com/blog/{slug}
🏪 كايرو فولت — اكسسوارات أصلية بضمان | توصيل لكل مصر
#كايرو_فولت #شواحن #باور_بانك #مصر #انكر #{hashtag_موضوعي}
```

### YouTube Long-form description
```
{السطر الأول = الكلمة المفتاحية + القيمة}
📖 المقال الكامل: https://cairovolt.com/blog/{slug}

⏱️ المحتوى:
0:00 المقدمة
0:20 {القسم 1}
...

🛒 المنتجات: https://cairovolt.com/products
🏪 كايرو فولت — الوكيل الرسمي Anker / Joyroom في مصر
#كايرو_فولت #{keyword}
```

### Twitter/X Thread (لكل أسبوع — من المقال المحوري)
```
1/ 🧵 {هوك صادم من موضوع الأسبوع}
2/ {نقطة + رقم}
3/ {نقطة}
4/ {نقطة}
5/ الخلاصة + ⚠️ تحذير
6/ التفاصيل الكاملة 👇 https://cairovolt.com/blog/{slug}
```

> 🌍 **مسار EN (من W7):** نفس القوالب بالإنجليزي، والرابط `https://cairovolt.com/en/blog/{slug}` فقط.

---

## §F — تسلسل التنفيذ لكل فيديو (الـ Workflow)

1. اختر الـ ID من §C.
2. افتح بلوكه في §D → انسخ الـ Seedance Prompt (بعد ما تلزق STYLE_BASE + BRAND_BASE).
3. ارفع صورة المرجع (غلاف المقال أو صورة المنتج).
4. ولّد بـ Seedance 2.0 → `aspect=9:16` (أو 16:9 للـ Long) · `resolution` حسب §A.
5. في المونتاج: ضيف نص الشاشة (من 📝) + voiceover (صوت البروفيسور) + موسيقى + لوجو.
6. للـ thumbnail (YouTube): ولّد بـ Nano Banana صورة 16:9 بعنوان عربي واضح.
7. انشر + حط الكابشن/الوصف (§E) + الرابط الصحيح (§B i18n).
8. سجّل الأداء في §9 KPIs (الرودماب).

> ⚠️ **حارس الميزانية:** ولّد فيديو تجريبي واحد الأول، اقرأ تكلفة الـ credit الفعلية، وبعدين قرّر تشحن قد إيه للشهر. متستهلكش آخر credit.

---

*آخر تحديث: 2026-05-29 · مرافق لـ cairovolt-social-roadmap.md · ضمن نظام CairoVolt الموثّق.*
