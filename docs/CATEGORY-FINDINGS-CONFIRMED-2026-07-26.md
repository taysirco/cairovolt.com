# CairoVolt — Confirmed Category Findings (adversarially verified)

Run 2026-07-26 · 22 pages · 200 raw findings · 77 high-severity · **73 confirmed**

Each entry below survived a second agent that re-fetched the page and tried to refute it.

---

## 1. `/en/anker`

**Problem:** Buying-summary block labelled "Straight from the Lab:" contains no measurements or citations

**Verification:** CONFIRMED verbatim. /en/anker renders `<strong>Straight from the Lab:</strong>` followed by exactly the quoted generic advice ("Choose an Anker product from the device requirement, not wattage alone...GaN, PowerIQ, and ActiveShield appear on selected models rather than every product."), inside `data-speakable="quick-answer"`. The block carries zero figures and zero citations. The AR sibling label is verbatim "في الجون:" (Egyptian idiom for 'spot on'), so the EN string is a mistranslation that accidentally asserts lab provenance — a direct E-E-A-T/attribution risk given the site's real bench-test program. The fix's reference pattern is real: /en/soundcore uses "Quick Take:" and /soundcore uses "باختصار:". ONE SUB-CLAIM IS WRONG and should not be repeated to the owner: "0 numeric figures anywhere on the page" is false — the rendered page contains 10000mAh, 20000mAh, 20W, 100W, 165W, 28h etc. in product cards. "0 <table> elements" IS correct (0 on both locales). Fix is a pure relabel, no fabricated data.

**Corrected fix:** Change the EN label "Straight from the Lab:" to "Quick Take:" and the AR label "في الجون:" to "باختصار:", matching the pattern already live on /en/soundcore and /soundcore. Reserve "lab"/"bench"/"معمل" wording for blocks that carry an actual CairoVolt bench figure with a sample ID or a named third-party measurement with a URL. Add no measurements here. (Drop the auditor's "0 numeric figures on the page" claim — it is false.)

---

## 2. `/anker`

**Problem:** Egypt localisation limited to "في مصر"; no city/governorate, no COD outside footer, no Egyptian usage context

**Verification:** CONFIRMED by token count on the rendered page (scripts stripped): AR /anker — القاهرة 0, الإسكندرية 0, محافظ 0, الدفع عند الاستلام 1 (footer only, verbatim "الدفع عند الاستلام (كاش) متاح للطلبات والعناوين المؤهلة — وكل طلب بفاتورة."). The only body-copy delivery line is verbatim "وتوصيل متاح داخل مصر حسب العنوان". EN /anker — "Cash on Delivery" 1 (footer), standalone "Cairo" (excluding CairoVolt) 0, Giza 0, Alexandria 0, governorate 0. The fix is grounded: /shipping already publishes "✓ القاهرة ✓ الجيزة ✓ الإسكندرية ✓ محافظات الدلتا ✓ محافظات الصعيد ✓ البحر الأحمر" and EN "✓ Cairo ✓ Giza ✓ Alexandria ✓ Delta Region ✓ Upper Egypt ✓ Red Sea", plus "Cairo & Giza 1–2 business days / Other Governorates 3–5 business days" and free shipping ≥3,700 EGP. ONE PART OF THE FIX MUST BE DROPPED: the suggested "covers a phone through a scheduled grid outage" line asserts a current Egyptian load-shedding schedule that the site cannot source and that is not stated on any policy page — that is an unsourced factual claim about Egypt, not a product spec.

**Corrected fix:** Add two lines to the brand-hub buying summary, both traceable to /shipping: (1) AR "الدفع عند الاستلام هو وسيلة الدفع المتاحة، وتُعرض أهليته للعنوان والطلب قبل التأكيد" / EN "Cash on delivery is the payment method; eligibility for the address and order is shown before you confirm." (2) AR "التوصيل متاح للعناوين المؤهلة في القاهرة والجيزة والإسكندرية ومحافظات الدلتا والصعيد والبحر الأحمر" / EN "Delivery is available to eligible addresses in Cairo, Giza, Alexandria, the Delta, Upper Egypt and the Red Sea governorates." Link both to /shipping. Do NOT copy delivery-day estimates into the hub (they live on the policy page and would go stale), and do NOT add the grid-outage sentence — use a neutral usage line instead, e.g. "a long commute or a full day out of reach of a socket".

---

## 3. `/en/anker/power-banks`

**Problem:** <title> repeats "in Egypt" twice and runs to 87 characters

**Verification:** CONFIRMED to the character. Live <title> = "Anker Power Banks in Egypt by Capacity and Output in Egypt ⚡ 12 Products | Prices & COD" = 87 chars, with "in Egypt" at positions 19 and 50. The sibling comparison is also exact: /en/anker/wall-chargers = "Anker Chargers by Power and Protocol in Egypt ⚡ 10 Products | Prices & COD" = 74 chars, single geo token. H1 is verbatim "Anker Power Banks in Egypt by Capacity and Output" and is fine as the auditor says. The duplication is a template bug in the EN geo-suffix (the EN suffix is "Prices & COD", which does not carry the locale, so the category-name string and the template both inject it). Proposed replacement is 66 chars, front-loads the head term, keeps one geo token, invents nothing — "mAh, Wh & USB-C PD" are all attributes already printed on the page's product cards.

---

## 4. `/anker/car-chargers`

**Problem:** FAQ answers the Samsung S26 Ultra question with a "323 model at 52W" that is not in the catalogue

**Verification:** CONFIRMED verbatim in both locales. AR visible <details>: "هل يشحن سامسونج S26 Ultra بسرعة؟ ▼ موديل 323 بقدرة 52W يوفر منفذ USB-C PD حتى 30W." EN: "Will it charge a Samsung S26 Ultra quickly? → The 323 model at 52W provides a USB-C PD port up to 30W." The page's ItemList carries exactly 4 products: anker-a2216-magnetic-wireless-car-charger, anker-car-charger-dual-usb, anker-a2732-charger-35w, anker-a2741-charger-30w. No 323 / 52W SKU exists in the grid or in sitemap.xml. Material: this is the page's single highest-intent extractable answer. HOWEVER THE PROPOSED REPLACEMENT INTRODUCES A NEW ERROR: it says "USB-C PD تصل إلى 35 واط (A2732)", but CairoVolt's own A2732 product page publishes "USB-C Port: Up to 20W PD (fixed rails only) — PDOs: 5V/3A · 9V/2.22A (FNB58); NO 12V/15V/20V fixed PDOs; NO PPS APDO" and "A2732 peaks: 19.8W C / 14.9W A / 34.7W simultaneous · NO PPS". 35W is the combined two-port figure, not the USB-C port. The A2741 half of the fix is sound: the same page states "A2741 peaks: 29.3W C ... HAS PPS".

**Corrected fix:** Rewrite using only figures already published on the two product pages, ≤50 words. AR: "شواحن السيارة هنا: A2741 يوفر USB-C PD مع دعم PPS (ذروة مقاسة 29.3 واط على منفذ USB-C)، وA2732 مجموعه 35 واط موزّعاً على منفذين (ذروة 19.8 واط على USB-C، بدون PPS). سرعة سامسونج تعتمد على بروفايل PPS الذي يطلبه هاتفك وعلى الكابل." EN mirror: "Of the chargers listed here, the A2741 has a USB-C PD port with PPS (measured peak 29.3W on USB-C); the A2732 is 35W shared across two ports (19.8W peak on USB-C, no PPS). Samsung speed depends on the PPS profile your phone requests and on the cable." Do not describe the A2732 USB-C port as 35W.

---

## 5. `/en/joyroom/cables`

**Problem:** EN <title>/H1 differentiator is "Auto-Disconnect Tech", a feature attributed to S-M411, a model not among the 11 listed products; AR sibling targets a different concept

**Verification:** CONFIRMED. Live EN <title> = "Joyroom Cables (Auto-Disconnect Tech) in Egypt ⚡ 11 Products | Prices & COD" (75 chars); H1 = "Joyroom Cables (Auto-Disconnect Tech)"; body copy verbatim "Joyroom lists Auto-Disconnect for the S-M411 according to its product specification." AR sibling title = "كابلات جوي روم للشحن ونقل البيانات ⚡ 11 منتج | الأسعار والتوصيل في مصر", H1 = "كابلات جوي روم للشحن ونقل البيانات" — a different positioning, confirming the locale mismatch. The 11 ItemList URLs contain no S-M411, and spot-checked MPNs are JR-S-CL20, JR-S-AL24, JR-S-CL30B — none is S-M411. THE PROPOSED TITLE'S WATTAGE RANGE IS WRONG: /en/joyroom/cables/joyroom-type-c-to-type-c-cable is <title>Joyroom JR-S-CC100 USB-C Cable</title> and is a 100W part, so the range is 20W–100W, not 20W–60W. Also note the page's own FAQ contains "⚠️ ليه كابل جوي روم أحسن من كابل أبل الأصلي؟" ("why is a Joyroom cable better than an original Apple cable") — a comparative-superiority claim that breaches the editorial rules and should be fixed in the same pass.

**Corrected fix:** EN title: "Joyroom Charging Cables in Egypt — USB-C, Lightning, 20W–100W ⚡ 11 Products | COD". EN H1: "Joyroom Charging Cables — USB-C, Lightning and Micro-USB". Keep Auto-Disconnect only as a body line, and drop the "S-M411" reference entirely (that model is not sold) or replace it with the stocked MPNs whose own product pages list the feature. While in this file, also rewrite the FAQ question "⚠️ ليه كابل جوي روم أحسن من كابل أبل الأصلي؟" into a non-comparative form, e.g. "إيه اللي أراجعه قبل ما أستبدل كابل الايفون الأصلي؟".

---

## 6. `/joyroom/audio`

**Problem:** Both comparison tables are content-free — every price and spec cell defers to the product page although the values are printed in the cards above

**Verification:** CONFIRMED verbatim. Table 1 renders "الموديل | السعر الحالي | ANC | عمر البطارية | الاستخدام المقترح" with rows "JR-T03 | راجع صفحة المنتج | راجع المواصفات | المدة المعلنة في صفحة المنتج" and "T03s Pro | راجع صفحة المنتج | حسب الإصدار | المدة المعلنة في صفحة المنتج". Bottom table rows "جوي روم T03s Pro ANC | راجع صفحة المنتج | ANC حسب الإصدار | المواصفات والتوافق" and "جوي روم JR-T03 لاسلكي | راجع صفحة المنتج | بديل ايربودز كلاسيكي". The data is indeed already on the page and the auditor's mapping is correct: T03s Pro card = 664 ج.م, "Bluetooth 5.3 | تصنيف IPX5"; JR-T03 card = 774 ج.م, "تشغيل إجمالي معلن حتى 20 ساعة | Bluetooth 5.0 | تصنيف IPX4". Only 2 products are on this page, so both tables are 100% empty of decision content. Fix uses only manufacturer-listed values already rendered and labels runtime as stated — compliant.

**Corrected fix:** Same fix, with one implementation constraint: bind the price cell to the same live price field the card renders (currently 664 / 774 ج.م) rather than hardcoding numerals into the table copy — hardcoded EGP goes stale and the price footprint is already duplicated across ~20 places. Populate: T03s Pro = live price / ANC (حسب الإصدار) / Bluetooth 5.3 / IPX5; JR-T03 = live price / بدون ANC / Bluetooth 5.0 / IPX4 / "تشغيل إجمالي معلن حتى ٢٠ ساعة". Keep "معلن"/"listed" on the runtime figure. Apply the same pattern to the identical empty tables on cables, car-accessories, car-chargers and the /en/ mirrors.

---

## 7. `/joyroom/smart-watches`

**Problem:** Buying guide, main comparison table and one FAQ are about FT5 and FC2 models not sold; the only stocked watch never appears in the comparison

**Verification:** CONFIRMED in full. Page states verbatim "تصفح 1 منتجًا من ساعات ذكية جوي روم. تتراوح الأسعار الحالية من ١٬٠٩٢ ج.م. إلى ١٬٠٩٢ ج.م." and the ItemList has exactly one URL: /joyroom/smart-watches/joyroom-ft3-smartwatch (<title>ساعة جوي روم FT3 | IP68 وأوضاع رياضية | مصر</title>, mpn JR-FT3). The guide table renders verbatim "الميزة | FT3 Pro | FT5 | FC2" with "AMOLED 1.43\" | IPS 1.83\" | AMOLED 1.32\"", "حتى 7 أيام | حتى 5 أيام | حتى 6 أيام", "52 جرام | 48 جرام | 45 جرام"; the FAQ reads "إيه الفرق بين FT3 Pro و FT5؟ أختار أنهي؟"; the bottom table sells "جوي روم FT5 شاشة كبيرة 1.83\"". EN mirror identical ("Model Comparison: FT3 Pro vs FT5 vs FC2"). /joyroom returns FT5 = 0 and FC2 = 0. Note the stocked SKU is FT3, not FT3 Pro — so even the first table column names a variant the site does not sell. ONE PART OF THE FIX IS NOT EXECUTABLE: there is no Anker/Soundcore smartwatch in the catalogue to use as a second comparison column.

**Corrected fix:** Delete every FT5 / FC2 / "FT3 Pro" reference from the buying guide, both tables, the FAQ and the JSON-LD HowTo steps in both locales. Rebuild the table as a single-model spec sheet for the stocked JR-FT3, using only figures already published on /joyroom/smart-watches/joyroom-ft3-smartwatch (display type and size, listed battery days, Bluetooth version, IP rating, weight) plus the live EGP price. Drop the second comparison column — no Anker or Soundcore smartwatch is stocked. Rewrite the FT3-Pro-vs-FT5 FAQ as a question about the FT3 (e.g. compatibility and app support). If FT5/FC2 ever become orderable, list them as products first.

---

## 8. `/en/joyroom/power-banks`

**Problem:** EN <title> repeats "in Egypt" twice at 88 chars; AR duplicates the geo token and uses "3 منتج" instead of "3 منتجات"

**Verification:** CONFIRMED to the character. EN <title> = "Joyroom Power Banks in Egypt by Capacity and Output in Egypt ⚡ 3 Products | Prices & COD" = 88 chars. AR <title> = "باور بانك جوي روم في مصر حسب السعة والقدرة ⚡ 3 منتج | الأسعار والتوصيل في مصر" = 77 chars, with "في مصر" at two positions. The Arabic grammar point is correct and correctly scoped: 3–10 takes the plural tamyīz ("3 منتجات"), while 11–99 takes the singular — so /anker/power-banks' "12 منتج" is already correct and must NOT be swept up in the fix. THE PROPOSED EN TITLE IS WRONG: the auditor assumes "the suffix already supplies in Egypt", but the EN suffix is "| Prices & COD" and carries no locale — their replacement would strip Egypt out of the EN title entirely on an Egypt-only storefront. Duplicate of finding #16 (same page, same defect); merge before shipping.

**Corrected fix:** EN: "Joyroom Power Banks in Egypt by Capacity and Output ⚡ 3 Products | Prices & COD" (78 chars, one geo token) or shorter "Joyroom Power Banks in Egypt ⚡ 3 Models by mAh & Wh | Prices & COD". AR: "باور بانك جوي روم حسب السعة والقدرة ⚡ 3 منتجات | الأسعار والتوصيل في مصر" — here the AR suffix genuinely does supply "في مصر", so remove the leading one. Fix the counter grammar only for counts 3–10; leave "12 منتج", "27 منتج" etc. unchanged.

---

## 9. `/soundcore/audio`

**Problem:** The model-comparison table states specs that contradict the product cards above it and the product pages

**Verification:** CONFIRMED on all three cells, both locales. Table renders verbatim "Soundcore C40i | See product page | ANC Open-Ear" and "ساوندكور C40i | راجع صفحة المنتج | ANC مفتوح", while /en/soundcore/audio/soundcore-c40i-earbuds renders verbatim "Does C40i have ANC?" → "No. It is an open-ear model without ANC." (product <title> is "Soundcore C40i A3331 Open-Ear Clip Earbuds"). Table renders "Soundcore P41i | See product page | 60h + XBS" while the P41i card on the same page reads "Soundcore P41i | Adaptive ANC | 11mm BassUp | 192h Battery | 3,000mAh Powerbank Case | BT 5.3". Token counts verified: XBS = 6, BassUp = 80 (EN) / 81 (AR); XBS is used nowhere else on the site. This is the highest-value finding in the set — it is an extractable table publishing false facts about stock, including an ANC claim on a no-ANC product. Fix copies only values already published on CairoVolt's own pages.

---

## 10. `/chargers`

**Problem:** Charger comparison table lists four models CairoVolt does not sell

**Verification:** CONFIRMED. Table renders verbatim "انكر 312 25W | حتى 25W وفق إصدار الموديل", "جوي روم 33W | حتى 33W", "انكر 521 40W | حتى 40W", "انكر 735 65W | حتى 65W" (EN mirror: "Anker 312 25W", "Joyroom 33W", "Anker 521 40W", "Anker 735 65W"). None appears in the product grid, whose alt text I enumerated: JR-TCF20 20W, JR-TCF23 25W, Joyroom 30W PD+QC, Joyroom 3-in-1 MagSafe 15W, A2347K11 20W, A2147 511 Nano 3 30W, A2322K11 25W PPS, A2149P21 20W, A2698 Zolo 30W, A121D 45W display, A2664 45W 1C, A2692 45W Nano Pro, A2669 Prime 67W, A2688 Prime 100W. sitemap.xml (620 URLs) contains no 735/312/33W charger; the only "521" is /anker/power-banks/anker-521-powerhouse — a 256Wh power station, not a 40W wall charger, so that row is doubly misleading. Three of the seven rows (Joyroom 20W, Anker Nano 20W, Anker 511 30W) do map to real stock, so the fix is a rebuild of four rows plus linking, not a rewrite from scratch. All proposed row data comes from the cards themselves — compliant.

---

## 11. `/power-banks`

**Problem:** Every category page renders a visible FAQ block but none emits FAQPage JSON-LD

**Verification:** CONFIRMED by grep on the fetched documents. FAQPage = 0 on /power-banks, /en/power-banks, /chargers, /en/chargers, /earbuds, /en/earbuds, /anker, /en/anker, /en/anker/power-banks, /joyroom/audio, /en/soundcore/audio, /joyroom/smart-watches, /en/joyroom/cables. FAQPage = 2 on /en/faq, proving the site already has the serializer. /power-banks' JSON-LD type inventory is WebSite, OnlineStore, Brand, BreadcrumbList, HowTo, HowToStep, CollectionPage, ItemList, Organization, Thing (+ shipping/return nodes) — no FAQPage, as claimed. The visible block is real: 8 <details> elements on /power-banks and /en/power-banks, containing verbatim "ما الفرق بين PD و QC في الشحن السريع؟". The fix generates mainEntity from the same source array as the accordion, so nothing markup-only is introduced. Caveat to pass to the owner: since Aug 2023 Google no longer shows FAQ rich results for non-government/health sites, so the payoff here is AI/answer-engine extraction, not SERP real estate — worth doing, but do not sell it as a rich-snippet win. Duplicate of finding #17; merge.

---

## 12. `/earbuds`

**Problem:** Six over-ear headphone models are in the grid but title, H1, meta and all H2s use only 'earbuds' / 'سماعات بلوتوث'

**Verification:** CONFIRMED. AR <title> = "دليل أفضل سماعات بلوتوث في مصر | ساوندكور وجوي روم | كايرو فولت", H1 = "سماعات بلوتوث في مصر"; the 8 content H2s are "نصائح الشراء / الأسئلة الشائعة / كيف تختار سماعات البلوتوث المناسبة في مصر؟ / دليل الأسعار / أفضل سماعات بإلغاء ضوضاء (ANC) في مصر / بديل AirPods بسعر أقل / كيف تفرق بين الأصلية والتقليد / كيفية تشغيل واستخدام سماعات البلوتوث" — none names over-ear. Token counts on rendered text: AR هيدفون = 1 (verbatim inside the card "سماعة ساوندكور Life Q20 | 40mm Hi-Res | عزل ضوضاء | 60 ساعة | هيدفون"), سماعات راس = 0, سماعة راس = 0. EN: "over-ear"/"Over-Ear" = 2 and "Headphone" = 1, all inside card text. The over-ear models are in the EN grid: Q20i, Space Q45, Space One, Q11i, Life Q20, Life Q30 (all 40mm). One correction to the evidence: on the AR page only 4 of the 6 (Q20i, Q11i, Life Q20, Q30) appear in the first-page render — Space Q45 and Space One load on later pagination — so write the new section from the models the AR grid actually shows first. Fix adds a spec-anchored H2 using driver size and runtime already on the cards; compliant.

---

## 13. `/power-banks`

**Problem:** Airline travel invoked five times as the reason to check watt-hours, but no threshold is ever stated, while a 256Wh power station is listed

**Verification:** CONFIRMED. Rendered AR text contains "قواعد شركة الطيران" 3× plus "حدود شركة الطيران", including verbatim "2 للسفر والرحلات: اختر 20,000mAh وتأكد من أن طاقة البطارية بالواط/ساعة ضمن قواعد شركة الطيران" and the FAQ "كيف أختار باور بانك للسفر والرحلات؟ ▼ راجع قيمة Wh المطبوعة والوزن واحتياجاتك، ثم تحقق من قواعد شركة الطيران والرحلة قبل السفر." Zero occurrences of 100Wh or 160Wh. The Wh values the fix proposes to map are all already printed on the page — I extracted exactly 37Wh, 72Wh, 74Wh, 86.4Wh, 90Wh, 94.72Wh and "محطة طاقة انكر 521 بسعة 256Wh". So no new measurement is invented: the thresholds are third-party regulatory limits (IATA/ICAO) that must carry a URL, and the mapping is arithmetic on the site's own published figures. Highest-utility GEO fix in the set — it turns five dead-end deflections into the one answer the query asks for.

**Corrected fix:** Same fix. Two guardrails: (1) cite the IATA Lithium Battery Guidance / ICAO passenger provisions page by name with a live URL and a 'as published at time of writing' date, and state that the operating carrier's own rules govern — do not present the 100Wh/160Wh bands as CairoVolt policy. (2) For the in-flight-USE bans, cite each carrier's own policy page individually (e.g. the Emirates and flydubai notices effective 1 Oct 2025) rather than making a blanket claim about 'airlines serving Cairo'.

---

## 14. `/earbuds`

**Problem:** Hub title is a paraphrase of the blog guide title — duplicate intent

**Verification:** CONFIRMED, both strings verbatim. /earbuds <title> = "دليل أفضل سماعات بلوتوث في مصر | ساوندكور وجوي روم | كايرو فولت"; /blog/best-bluetooth-earbuds-egypt-2026 <title> = "أفضل سماعات بلوتوث في مصر | ساوندكور vs جوي روم | مقارنة شاملة". Same head term, same brand pair, same market — genuine cannibalisation, not a platitude. The fix carries a second benefit the auditor did not flag: the current hub H2 "أفضل سماعات بإلغاء ضوضاء (ANC) في مصر" / "Best Noise Cancelling (ANC) Earbuds in Egypt" is itself a live breach of the no-superlatives rule ("أفضل"/"Best"), as is "أفضل" in the AR <title>, so removing them is required regardless of the SEO argument. Note the EN hub title is already superlative-free ("Bluetooth Earbuds Guide Egypt | Soundcore & Joyroom | CairoVolt"), so the EN change is de-duplication only.

---

## 15. `/joyroom/power-banks`

**Problem:** Title says the country twice in both locales; EN version is 88 characters

**Verification:** CONFIRMED — same measurements as finding #8, which covers the same URL pair. EN <title> = "Joyroom Power Banks in Egypt by Capacity and Output in Egypt ⚡ 3 Products | Prices & COD" (88 chars, the longest I measured across the 20+ pages fetched); AR <title> = "باور بانك جوي روم في مصر حسب السعة والقدرة ⚡ 3 منتج | الأسعار والتوصيل في مصر" (77 chars, "في مصر" twice). This one's proposed fix is BETTER than #8's because it keeps a geo token in the EN title instead of deleting it. Its AR replacement is safe but note it drops the ⚡ separator and the "3 منتجات" plural correction that #8 correctly identifies — merge the two findings and take the best half of each.

**Corrected fix:** Ship as ONE fix merged with finding #8. EN: "Joyroom Power Banks in Egypt ⚡ 3 Models by Capacity & Output | Prices & COD" (75 chars, single geo token). AR: "باور بانك جوي روم حسب السعة والقدرة ⚡ 3 منتجات | الأسعار والتوصيل في مصر" (geo token only in the suffix, plural counter corrected). Apply the same de-duplication to /en/anker/power-banks (finding #3) since it is the same template bug.

---

## 16. `/anker/power-banks`

**Problem:** No category page emits FAQPage JSON-LD although each renders 5–8 shopper Q&As under 50 words, and /en/faq proves the site can

**Verification:** CONFIRMED. FAQPage = 0 across every category document I fetched (both locales of /anker, /power-banks, /chargers, /earbuds, /soundcore/audio, /joyroom/audio, /joyroom/smart-watches, /joyroom/cables, /anker/power-banks, /anker/car-chargers); FAQPage = 2 on /en/faq. /en/anker/power-banks renders 5 <details> blocks including the exact quoted Q&A: "Are Anker power banks allowed on flights?" → "Check the Wh value printed on the model and the current rules of your airline, route, and country. Approval and carry-on requirements vary, so do not rely on mAh or the product name alone." (42 words, inside the 50-word ceiling). Serialization-only change, text copied verbatim from the visible accordion, so it satisfies the mirror-visible-text rule. This is the same defect as finding #11 at wider scope — ship once across all 22 category pages × 2 locales rather than twice.

**Corrected fix:** Merge with finding #11 and implement once: generate mainEntity from the same source array that renders the <details> accordion so drift is structurally impossible, on all 22 category paths in both locales (Arabic visible text for the unprefixed pages). Before shipping, run one pass to confirm no FAQ answer exceeds 50 words and that no FAQ question carries a comparative-superiority claim — /joyroom/cables currently has "⚠️ ليه كابل جوي روم أحسن من كابل أبل الأصلي؟", which must be rewritten BEFORE it gets promoted into structured data.

---

## 17. `/earbuds`

**Problem:** The AirPods Pro 2 vs Liberty 4 Pro vs P20i comparison table has correct axes but no values in any cell

**Verification:** CONFIRMED verbatim, cell for cell: "Price in Egypt | Check the selected retailer | Check the product page | Check the product page"; "ANC | Check Apple specifications | Check the model's modes | Check the model page"; "Battery (earbuds) | Manufacturer-rated conditions | Manufacturer-rated conditions | Manufacturer-rated conditions"; "Battery (with case) | Check current specifications | Check current specifications | Check current specifications"; plus "Codec and app", "Compatibility" and "Price difference" rows in the same style. Every one of the 21 data cells defers. The fix is executable and compliant: /api/lab-data/json returns 88 items with benchCoveredCount 88 and carries hasBench:true entries for BOTH soundcore-p20i-earbuds (measured "9h 35 min single-bud · 28h 30 min with case", codecs SBC+AAC only, no ANC) and soundcore-liberty-4-pro (sample CV-EB-A3954-001, "9h 51min AAC ANC-OFF @50%", LDAC ANC-OFF 8h 04min, AAC ANC-ON 6h 22min), each with verdict/testDate/engineer/sampleId/methodology fields. So the two Soundcore columns can be filled entirely from CairoVolt's own bench sheets plus manufacturer-listed figures.

**Corrected fix:** Same fix, with labelling discipline: mark each cell either 'listed' (manufacturer) or 'CairoVolt measured — sample <sampleId>' and never blend the two in one cell; carry the test conditions with the number (e.g. "9h 51min · AAC · ANC off · 50% vol · CV-EB-A3954-001") since the bench sheets show runtime swings of −18% to −45% by codec/ANC state. For the AirPods column, either cite Apple's own spec page by URL for every cell or delete the column — do not leave a mixed row where two columns are sourced and one is not.

---

## 18. `/anker`

**Problem:** The three brand hubs contain no table or structured comparison of any kind

**Verification:** CONFIRMED by direct count on the rendered HTML: <table> elements = 0 on /anker, /en/anker, /soundcore, /en/soundcore, /joyroom, /en/joyroom. The /anker hub's only structured content is the category carousel ("Anker Power Banks 10K-25K mAh", "Anker Chargers 20W-100W GaN", "Anker Cables USB-C - Lightning", "Anker Car Chargers MagSafe - USB-C PD"). Both cited exemplars are real and populated: /cables renders "الجهاز | المنفذ | الكابل المطلوب" with rows "iPhone 17 / 16 / 15 | USB-C | USB-C to USB-C", "iPhone 14 وما قبله | Lightning | USB-C to Lightning", "MacBook Air / Pro | USB-C | USB-C to USB-C (100W+)", and /joyroom/smart-watches does carry real values (AMOLED 1.43\", IP68, 52g). Caveat the owner must know: that smart-watch table is exactly the one finding #7 proves is about unsold models — so cite /cables as the pattern, never the watch table. Fix uses only catalogue-derived data (category → use → listed output range → EGP range), so it is compliant.

**Corrected fix:** Add one decision table per brand hub modelled ONLY on the /cables "Device | Port | Cable Needed" table — do not use the /joyroom/smart-watches table as a model, since finding #7 establishes its rows describe FT5/FC2 units that are not sold. Axes: category → typical use → listed output/capacity range → live EGP price range, every row linking to that category page, and every value derived from products actually in the grid. Ship this only after findings #7, #9 and #10 land, so the new hub tables are not built from the same phantom-SKU habit.

---

## 19. `/joyroom`

**Problem:** Arabic quick-answer block labelled "مباشرة من المعمل:" ("straight from the lab") over advice containing no measurement; English counterpart says "In short:".

**Verification:** CONFIRMED and worse than reported. Verbatim in the live AR HTML: `<strong ...>مباشرة من المعمل:</strong> منتجات جوي روم تغطي فئات متعددة، وقد تتشابه الأسماء بينما تختلف المنافذ والقدرة أو التطبيق والتوافق...` inside `data-speakable="quick-answer"`. Zero numeric values in that paragraph. /en/joyroom's same block reads "In short:". Sweeping the other hubs shows the label is inconsistent AND the lab claim recurs: /en/anker = "Straight from the Lab:" over pure selection advice (no measurement), /anker AR = "في الجون:" (garbled Arabic, not idiomatic), /soundcore = "باختصار:", /en/soundcore = "Quick Take:". Implying a bench provenance that does not exist directly contradicts the source-attribution rule. Fix is a label change only — no fabricated data.

**Corrected fix:** Standardise the quick-answer label to "باختصار:" / "In short:" across all three brand hubs in both locales. Three separate corrections are needed, not one: (a) /joyroom "مباشرة من المعمل:" → "باختصار:"; (b) /en/anker "Straight from the Lab:" → "In short:" (same false lab provenance, missed by the auditor); (c) /anker "في الجون:" → "باختصار:" (currently non-idiomatic Arabic). Reserve any "من المعمل / from the lab" label strictly for blocks that carry an actual CairoVolt bench figure.

---

## 20. `/joyroom`

**Problem:** No Egyptian locality, no cash-on-delivery in body copy, no local usage context on the Joyroom brand hub.

**Verification:** Core measurements CONFIRMED on the rendered visible text (RSC script payload excluded): "القاهرة" = 0, "الإسكندرية" = 0, "محافظ" = 0, "الدفع عند الاستلام" = 1 and that single hit is the sitewide footer line "الدفع عند الاستلام (كاش) متاح للطلبات والعناوين المؤهلة — وكل طلب بفاتورة." Body delivery copy is only "...وتوصيل متاح داخل مصر حسب العنوان." plus the tile "التوصيل / حسب العنوان والطلب" — both quoted correctly. HOWEVER one supporting claim is FALSE: the string "الدفع عند الاستلام — يُؤكد مع مراجعة الطلب" does not exist on /soundcore/audio; that page's 28 COD hits are per-product-card badges, not a body tile. The comparative framing dies; the underlying gap does not. Governorate naming is supportable: /shipping (not /shipping-policy, which 404s) states "نخدم عناوين توصيل مؤهلة في محافظات مصر" and lists القاهرة / الجيزة / الإسكندرية / محافظات الدلتا / محافظات الصعيد.

**Corrected fix:** Drop the false /soundcore comparison. On /joyroom: (a) add COD to the body tile row using the site's own eligibility wording, e.g. "الدفع عند الاستلام — للطلبات والعناوين المؤهلة"; (b) name coverage only as the policy states it — "عناوين مؤهلة في محافظات مصر: القاهرة والجيزة والإسكندرية ومحافظات الدلتا والصعيد" — linked to /shipping, never as a blanket "كل المحافظات"; (c) give the car-accessories and smart-watch tiles one concrete usage line each (car mount for long daily commutes, retractable car charger for delivery-driver shifts). No wattage, runtime or coverage number that is not already published on the product page or /shipping.

---

## 21. `/anker/power-banks`

**Problem:** Two FAQ answers point to a capacity table in the buying guide that does not exist; the guide is prose bullets with no per-model figures.

**Verification:** CONFIRMED verbatim. FAQ line: "راجع جدول السعات في دليل الشراء بالأسفل. باختصار: 10K للجيب واليوم العادي، 20K للسفر والرحلات الطويلة." and "القاعدة: كل 5,000mAh = شحنة كاملة تقريباً (بعد خصم 15% خسارة التحويل). راجع الجدول في دليل الشراء للأرقام الدقيقة حسب الموديل." The buying guide below is three prose bullets ("10,000 مللي أمبير:", "20,000 مللي أمبير:", "27,650 مللي أمبير (Prime):") with no figures. The page's one `<table>` is a model/price grid whose every data cell reads "راجع صفحة المنتج" / "المواصفات والتوافق" — it is not a capacity table and contains no per-model numbers. The fix is buildable from on-page data: I confirmed 37Wh, 72Wh (x2), 74Wh-class, 86.4Wh, 90Wh, 94.72Wh and 256Wh are already printed in the product-card blurbs on this same page.

**Corrected fix:** Build the capacity table from the Wh values already rendered on this page's product cards, one row per stocked model, sourced as manufacturer-listed. Any phone-charge column must be labelled "est." with the divisor visible (e.g. "est. 72Wh ÷ ~12.5Wh iPhone battery, ~85% conversion") and must not be presented as a CairoVolt measurement. For the 11 models that do have a published bench sheet, use the measured usable-Wh figure with the existing CairoVolt attribution instead of the estimate. If the table is not built this cycle, delete both forward references rather than leaving the broken promise.

---

## 22. `/anker/wall-chargers`

**Problem:** 10 category pages render 5–8 visible FAQs but none emits FAQPage structured data.

**Verification:** CONFIRMED. Parsing every ld+json block on /anker/wall-chargers returns only WebSite/SearchAction/OnlineStore/PostalAddress/ShippingService/MerchantReturnPolicy/Brand, BreadcrumbList, HowTo and ItemList — no FAQPage, no Question node. `grep FAQPage` = 0 across all 18 category HTML files fetched. The page carries 8 `<summary>` FAQs including the quoted "هل بيستحمل تذبذب كهرباء مصر؟". Summary counts verified: wall-chargers 8, car-chargers 8, car-accessories 8, /power-banks 8, /soundcore/audio 5, /joyroom 5. Caveat on value: Google restricted FAQ rich results to government/health sites in Aug 2023, so expect no SERP snippet gain — the real payoff is machine-readable answer extraction (AEO/LLM), which is what the dimension claims. Fix mirrors visible text, so it satisfies the mirror rule.

**Corrected fix:** Emit FAQPage JSON-LD generated from the same source object that renders the `<details>` blocks so markup and visible text cannot drift. Frame the expected benefit as answer extraction by AI/agent crawlers, not SERP rich results (deprecated for commercial sites since Aug 2023). No Review or AggregateRating nodes.

---

## 23. `/joyroom/car-accessories`

**Problem:** Buying guide, two FAQs and the comparison table describe a "60W" Joyroom car charger while the page's only charger is the 69W JR-CCL05; table rows name three models that match none of the three grid products.

**Verification:** CONFIRMED verbatim. FAQ: "شاحن جوي روم 60W بيشحن كام جهاز في نفس الوقت؟" and "موديل 60W يوفر USB-C PD ومنفذ USB-A لشحن جهازين متوافقين..."; guide bullet "حتى 60W:". Grid card: "شاحن سيارة جوي روم JR-CCL05 القابل للسحب 4 في 1 بقدرة 69 واط | كابلين + منفذين". Table rows extracted from the live HTML: "جوي روم 60W Car Charger | راجع صفحة المنتج | شحن سريع", "جوي روم Magnetic Car Holder", "جوي روم Dashboard Mount" vs actual SKUs JR-CCL05 / JR-ZS295 / ZS290. Prices 513 / 169 / 934 ج.م confirmed. ONE correction to the diagnosis: the 60W charger is not a phantom — https://cairovolt.com/joyroom/car-chargers/joyroom-60w-car-charger returns 200. It is a real SKU sitting in a sibling category, so the defect is mismatch-to-grid, not an invented product.

**Corrected fix:** Rebuild the three comparison-table rows to the page's real SKUs (JR-CCL05 69W, JR-ZS295, ZS290) with the prices already rendered (٥١٣ / ١٦٩ / ٩٣٤ ج.م) and link each row to its product page. Rewrite the two FAQs around the JR-CCL05 configuration already on the card (two retractable cables USB-C + Lightning, USB-A 2.4A, USB-C 3A, up to 4 devices, 69W shared total). Do NOT restate specs for the 60W model — its MPN identity (JR-CL26) is still flagged as unverified pending the owner's physical check — if it is kept in the copy at all, reference it only as a cross-link to /joyroom/car-chargers/joyroom-60w-car-charger with no wattage-per-port claims. Apply the same edit to /en/joyroom/car-accessories.

---

## 24. `/joyroom/car-chargers`

**Problem:** The page defers to the 69W power-distribution table seven times but never reproduces it.

**Verification:** CONFIRMED. Deferrals located in the rendered AR text: "قدرة 69W حسب جدول التوزيع المطبوع" (tile), "...قدرة إجمالية 69 واط، راجع جدول التوزيع..." (card), "...بقدرة إجمالية 69 واط حسب جدول التوزيع المطبوع على الوحدة..." (intro), "...حصة كل منفذ أو كابل بتتحدد حسب جدول التوزيع المطبوع على الوحدة... راجع الجدول في صفحة المنتج وطابقه مع متطلبات موبايلك قبل الشراء." (FAQ), "قارن المنافذ وجدول توزيع القدرة ودعم PD/PPS...", "...راجع جدول توزيع الطاقة المطبوع على الوحدة وفي صفحة المنتج.", "...طابق متطلبات جهازك مع الجدول في صفحة المنتج." — seven, as claimed. The only `<table>` on the page is the generic model/price grid; no port-combination table exists. For a 4-device shared-power charger this is the single decision-critical fact. The fix uses manufacturer-printed data with an explicit unpublished-combination fallback, so it requires no invented measurement.

**Corrected fix:** Reproduce the distribution rows exactly as printed on the JR-CCL05 unit/box, attributed as manufacturer-printed (not CairoVolt-measured), under a heading such as "قدرة 69W بتتوزع إزاي بين المنافذ؟". If the printed table cannot be read off stock on hand, publish only the two figures already on the card (USB-A 2.4A, USB-C 3A) and state plainly which multi-device combinations the manufacturer does not publish — do not interpolate the split. Mirror on /en/joyroom/car-chargers, and remove the deferral sentences that would become circular once the table is on-page.

---

## 25. `/joyroom/smart-watches`

**Problem:** Page tells shoppers to verify the companion app but never names it, and omits charging time, strap width, case size and Arabic-interface support.

**Verification:** CONFIRMED. Verbatim: "التطبيق: تحقق من اسم التطبيق وإصدارات iOS وAndroid المدعومة قبل الشراء." and "...راجع صفحة المنتج وقائمة الأنظمة المدعومة في متجر التطبيق." No app name anywhere in the body. Measured on visible text: "سوار" = 4, "ملم" = 0, "mm" = 0, "عربي"/"العربية" = 0, "وقت الشحن" = 0, "قطر" = 0. Instructing a buyer to verify an app you refuse to name is a genuine dead-end, and Arabic UI support is a real purchase blocker in this market. Additional defect the auditor missed, same section: the grid holds exactly ONE product ("ساعة جوي روم FT3", 1,092 ج.م) while the buying guide compares "FT3 Pro وFT5 وFC2" — three models not on the page. The "mark as est." instruction in the proposed fix is wrong for physical dimensions and needs replacing.

**Corrected fix:** Name the companion app and its minimum iOS/Android versions with the App Store / Play listing URL as the citation. Add a spec block carrying ONLY values the manufacturer publishes — charging time, strap width in mm, case diameter — and where a value is not published write "غير معلن من الشركة" rather than estimating it; "est." is for calculated energy figures, not for dimensions we simply have not sourced. State Arabic display support for watch and app only after verifying it on the unit or in the manufacturer listing; if unverified, omit the line entirely. Separately, fix the buying guide so it compares the model actually stocked (FT3) instead of FT3 Pro / FT5 / FC2, or stock and link those models.

---

## 26. `/en/joyroom/wall-chargers`

**Problem:** Subtitle promises a GaN/PD/PPS/ports/protections comparison but no model is identified as GaN or PPS-capable and no PD profiles, plug standard, size or weight are given.

**Verification:** CONFIRMED with one overstatement. Subtitle verbatim: "Compare GaN, USB-C PD, PPS, ports, and listed protections". The four stocked SKUs are JR-TCF23 25W, a 30W PD+QC dual, a 3-in-1 MagSafe station and a 20W PD single-port — none is declared GaN, none is declared PPS-capable, and no PD voltage/current profile, plug type, size or weight appears on any card. The auditor's "no product card names PPS" is slightly off: the 25W card does say "Match PD/PPS output profiles to your phone" — but that is an instruction, not a support declaration, so the substance holds. Promising a GaN comparison on a four-SKU range where GaN is never attributed to any model is a real subtitle-to-content mismatch.

**Corrected fix:** Add a four-row table (JR-TCF20 20W, JR-TCF23 25W, 30W PD+QC dual, 3-in-1 station) with columns for manufacturer-listed PD profiles, PPS yes/no + range, GaN yes/no, port layout, plug type and live EGP price. Every cell must come from the manufacturer listing; where Joyroom does not publish a value, print "not listed by the manufacturer" — never infer GaN or PPS from wattage or size. If none of the four is a declared GaN model, delete GaN from the subtitle in both locales rather than keeping a comparison the range cannot support. Note the 3-in-1 MagSafe station is a wireless station, so PD-profile columns should read n/a rather than be filled by analogy.

---

## 27. `/soundcore/audio`

**Problem:** Meta descriptions, two FAQs, the buying guide and the comparison table promote R50i NC (plus Life Note 3 / P3 and an "anker r100" keyword) — models with no product page — while the in-stock Life P2i is missing from the table.

**Verification:** CONFIRMED in full, every quote exact. AR description: "قارن سماعات ساوندكور R50i وR50i NC وP20i وK20i وA30i وLiberty حسب ANC والترميزات والملاءمة والبطارية." EN: "Compare Soundcore earbuds in Egypt: R50i, R50i NC, P20i, K20i, A30i, and Liberty models...". "R50i NC" = 18 occurrences in the HTML. Extracted table row: "Soundcore R50i NC | See product page | ANC Noise Cancel | Specifications & compatibility". Buying guide: "P40i / Life Note 3:" (EN) and "P40i / P3:" (AR). Keywords meta contains "anker r50i nc" and "anker r100". The page links 27 unique product URLs and none is r50i-nc (only anker-soundcore-r50i and soundcore-r50i-vi-earbuds). Table has 27 data rows; Life P2i is absent although /soundcore/audio/anker-soundcore-life-p2i is in the grid — so a ghost occupies a row a real SKU should hold. All proposed replacements are verified stocked: P40i, P41i, Liberty 4 NC, Liberty 5, A30i, Q30. The suggested blog fallback /blog/soundcore-r50i-nc-anc-earbuds-full-review returns 200.

**Corrected fix:** As proposed, with one tightening: swap the ghost models out of both descriptions (→ R50i, P40i, Liberty 4 NC, A30i, Q30), rewrite the ANC FAQ to name only stocked ANC models, change the guide bullet to "P40i / P41i", delete the "anker r50i nc" and "anker r100" keyword tokens, and add the Life P2i row so all 27 stocked models appear. If the R50i NC row is retained for search demand it must be explicitly labelled "غير متوفر حالياً / not currently stocked" and link the review — an unavailable model must never sit in a comparison table with a "See product page" cell that resolves to nothing.

---

## 28. `/power-banks`

**Problem:** Both on-page comparison tables are 100% placeholder — every data cell says "check the product page" or "calculate it yourself".

**Verification:** CONFIRMED, quotes exact. Table 2 row extracted live: "10,000mAh | راجع ملصق الموديل | احسب من Wh | حسب الموديل | توازن محتمل بين الحجم والطاقة" — identical pattern for 5,000 / 20,000 / 30,000. Table 1 row: "20,000mAh | 20,000 | Wh والقدرة والمنافذ | حسب الموديل | راجع صفحة المنتج | طاقة أكبر ووزن أعلى". Not one data cell carries a value. The fix is fully supportable from this same page: 37Wh, 72Wh, 74Wh, 86.4Wh, 90Wh, 94.72Wh and 256Wh are already printed in the product-card blurbs, so no new measurement is needed.

**Corrected fix:** Fill the cells with the manufacturer-listed Wh figures already on this page's cards and add a weight column from each product page. Phone-charge counts must be labelled "est." with the divisor shown (e.g. "est. 72Wh ÷ ~12.5Wh iPhone battery, before conversion loss") and must not be styled to look like bench results. Where a bench sheet exists for the model, prefer the measured usable-Wh figure with the standing CairoVolt attribution. Mirror on /en/power-banks.

---

## 29. `/power-banks`

**Problem:** The editorial body across all four generic hubs contains zero in-content links; the only post-grid links are blog cards.

**Verification:** CONFIRMED by direct extraction. Slicing each page's HTML from the editorial heading onward and pulling every `<a href>`: /power-banks → 4 links, all /blog/best-power-bank-egypt-2026, /blog/anker-vs-joyroom-comparison, /blog/how-to-charge-power-bank-correctly, /blog. /chargers → 4 (3 blog + /blog). /cables → 3 (2 blog + /blog). No sibling-category, brand-hub or model link anywhere in the editorial. The unlinked PD sentence is confirmed verbatim on /power-banks: "دعم PD أو QC يختلف بين موديلات باور بانك انكر و جوي روم؛ راجع جدول منافذ المنتج المحدد." — the brand names are styled emphasis, not anchors. The only brand-hub links on the page are two "تسوق انكر" / "تسوق جوي روم" buttons that sit ABOVE the editorial, so the editorial itself is genuinely link-dead.

**Corrected fix:** As proposed. Link the model names inside each comparison table to their product URLs, link the first mention of each sibling category with the descriptive anchor the copy already uses, and turn "باور بانك انكر" / "باور بانك جوي روم" in the PD paragraph into links to /anker/power-banks and /joyroom/power-banks. Emit all of these lower-case (see the capitalised-segment finding) so the new links do not inherit the existing 301 hop.

---

## 30. `/earbuds`

**Problem:** The category hub and the blog buying guide carry near-identical titles targeting the same query with the same brand pair in both locales.

**Verification:** CONFIRMED by live fetch of all four URLs. /earbuds `<title>` = "دليل أفضل سماعات بلوتوث في مصر | ساوندكور وجوي روم | كايرو فولت", H1 = "سماعات بلوتوث في مصر". /blog/best-bluetooth-earbuds-egypt-2026 `<title>` = "أفضل سماعات بلوتوث في مصر | ساوندكور vs جوي روم | مقارنة شاملة", H1 = "أفضل سماعات بلوتوث في مصر: ساوندكور vs جوي روم". EN: "Bluetooth Earbuds Guide Egypt | Soundcore & Joyroom | CairoVolt" vs "Best Bluetooth Earbuds Egypt | Soundcore vs Joyroom | Complete Guide". The hub title literally contains "دليل أفضل سماعات بلوتوث في مصر", i.e. the blog's exact head term plus the same brand pair — a real overlap, not a platitude. The proposed replacement title carries no superlative and COD is a true claim, but "مقاسات" is meaningless for earbuds.

**Corrected fix:** Split intent, but check GSC first: the standing rule is not to mass-edit long metaTitles that are already proven in SERP, so pull this URL's impressions/position before rewriting. If clear to proceed, give the hub the transactional half — e.g. "سماعات بلوتوث ساوندكور وجوي روم في مصر | الأسعار والدفع عند الاستلام" (drop "مقاسات", drop "دليل أفضل") — and leave "أفضل … vs …" to the blog. Point the blog's buying CTAs at the hub and keep the hub's single link to the blog for the comparison.

---

## 31. `/earbuds`

**Problem:** /earbuds is a near-total superset of /soundcore/audio — all 27 Soundcore products are re-carded on the hub and over half the brand page's body copy is duplicated there.

**Verification:** CONFIRMED and slightly understated. /en/earbuds links 30 unique product URLs, /en/soundcore/audio links 27; overlap is 27/27 = 100% of the brand page, with zero Soundcore SKUs unique to the brand page. Line-level diff of body text >40 chars: 58 of the brand page's 95 substantive lines also appear on /earbuds, accounting for 1,131 of 1,841 words = 61% (auditor said 51–53%; the true figure is higher). The quoted shared blurb "40mm dual-layer drivers | manufacturer-stated Adaptive ANC | LDAC support | listed 50h battery with ANC, 65h without" appears once on each page, as claimed. The brand page currently has no unique inventory or unique copy to rank on. One wording risk in the fix: "top pick" edges toward the banned superlative register in Arabic.

**Corrected fix:** As proposed — strip the exhaustive 30-card grid from /earbuds and rebuild it as a cross-brand decision layer (Soundcore-vs-Joyroom selection table on ANC type, codec, driver size, manufacturer-rated battery, price band) plus 6–8 need-based cards deep-linking into /soundcore/audio and /joyroom/audio — with the labels phrased as need-fit, not ranking: "مناسبة لـ / suited to" rather than "أفضل اختيار / top pick". Every table value must be manufacturer-stated and already present on the product page. Head-term split as described: /earbuds owns "سماعات بلوتوث في مصر", /soundcore/audio owns "سماعات ساوندكور".

---

## 32. `/anker/wall-chargers`

**Problem:** /anker/wall-chargers and /joyroom/wall-chargers are the same page with the brand word swapped — identical H1 pattern, heading skeleton and meta formula.

**Verification:** Evidence CONFIRMED, diagnosis label wrong. Live H1s: "Anker Chargers by Power and Protocol" vs "Joyroom Chargers by Power and Protocol"; AR "شاحن انكر بالقدرة والبروتوكول المناسبين" vs "شواحن جوي روم حسب القدرة والبروتوكول". Metas quoted accurately: "Compare Anker chargers in Egypt by USB-C PD/PPS support, output, ports, and GaN features..." vs "Compare Joyroom chargers by output, USB-C PD/PPS support, ports, GaN, and protection features...". H2 claim is slightly off — Anker has four H2s (Products / Smart Buying Guide / FAQ / Explore More), Joyroom three (no Explore More). This is NOT cannibalisation: the two pages target different brand head terms and cannot compete for the same query. What is real is zero differentiation on pages whose catalogues differ 10 SKUs vs 4. Both SKU counts verified from the titles and grids, and the Joyroom 3-in-1 MagSafe station referenced in the fix is a real stocked product.

**Corrected fix:** Re-file as thin/templated differentiation rather than cannibalisation — do not expect a ranking-conflict resolution, expect better topical coverage per brand. Give each page an angle its own catalogue supports: Anker (10 SKUs, 20W single-port to 100W 3-port) → "شواحن انكر من 20 إلى 100 واط: اختيار المنفذ والقدرة للابتوب والموبايل" with H2s on multi-port power sharing and GaN size trade-offs; Joyroom (4 SKUs, 20–30W plus the 3-in-1 wireless station) → "شواحن جوي روم 20–30 واط ومحطة الشحن اللاسلكي 3 في 1". Reuse only model-level facts already published; add no new measurements, and do not attribute GaN to any model that does not declare it.

---

## 33. `/power-banks`

**Problem:** Generic hubs emit brand-layer links with a capitalised segment that 301-redirects, so all hub→brand link equity passes through a redirect hop.

**Verification:** CONFIRMED by direct measurement and live curl. Capitalised-segment anchors: /power-banks 18, /en/power-banks 18, /earbuds 32, /en/earbuds 32, /chargers 17, /cables 19 — samples "/Anker/power-banks", "/Joyroom/power-banks/joyroom-power-bank-20000", "/en/Soundcore/audio/anker-soundcore-k20i". Redirect behaviour verified: https://cairovolt.com/en/Anker/power-banks → 301 → https://cairovolt.com/en/anker/power-banks; https://cairovolt.com/Anker/power-banks → 301 → /anker/power-banks; the lower-case form returns 200. The brand-layer pages themselves emit none. This is a one-line helper fix with no editorial content implications.

**Corrected fix:** Lower-case the brand segment in the helper that builds hub product/category hrefs so the four generic hubs emit /anker/…, /joyroom/…, /soundcore/… directly, in both locales. Apply before adding the new in-content links recommended for the editorial bodies so the new links do not inherit the hop.

---

## 34. `/anker/power-banks`

**Problem:** Category body is streamed into a hidden out-of-order Suspense container; <main> ships only a loading skeleton.

**Verification:** Byte-level evidence CONFIRMED exactly. In the raw HTML of /en/anker/power-banks, `<main>` spans 25033–26173 and contains only `<!--$?--><template id="B:0"></template><div class="animate-pulse" aria-busy="true" aria-label="Loading content">…`; the sole `<h1>` sits at byte 57355 inside `<div hidden id="S:1">` which opens at 52891. But the severity is overstated and must be downgraded: the real content IS in the same HTTP response, and a plain tag-stripping extractor recovers the full page text (I did exactly that to audit every page in this batch). The zero-word outcome requires an extractor that both scopes to `<main>` AND honours `hidden` — a narrower profile than "any fetcher that does not execute JS". Googlebot renders this fine, and the Accept: text/markdown twin serves negotiating agents. It is also rendering plumbing rather than content.

**Corrected fix:** Re-file as medium severity, and take the cheap half only: move the quick-answer block, the FAQ and the comparison table above the Suspense boundary so they land inside `<main>` in the initial byte stream. Do not re-architect the whole category body render for this. Verify by re-fetching and confirming the `<h1>` byte offset falls inside the `<main>` range.

---

## 35. `/anker/power-banks`

**Problem:** CairoVolt's own bench measurements never appear on the category HTML although the markdown twin of the same URL carries a lab verdict for every product.

**Verification:** CONFIRMED on both sides. `curl -H "Accept: text/markdown"` on /en/anker/power-banks returns 12 "Lab:" lines, e.g. "Lab: A110D delivered 31.1Wh usable (84.1% of 37Wh) with real 22.5W-class peaks — 21.7W USB-C / 21.4W built-in cable" and "Lab: A1260 delivered 61.4Wh usable (85.3% of 72Wh). Port 1 is real 17.1W QC…". The HTML of the same URL contains 0 occurrences of "CairoVolt measured", "Wh usable" or "bench", and exactly one /lab reference — the sitewide footer link href="/en/lab". This is genuine first-party data already written and already published on one surface, so surfacing it needs no new measurement and is the strongest differentiator these pages have.

**Corrected fix:** Surface the existing one-line lab verdict on the HTML product card and in the comparison table for each model that actually has a published bench sheet (11 today — do not extend the treatment to models without one, and do not let an "est." figure inherit the measured styling). Keep the standing CairoVolt-measured attribution and link /lab for the method. Two guards: any model carrying a safety recall (A1263 / CPSC Jun 2025) must show the recall status next to its lab line, not buried; and add no Review or AggregateRating JSON-LD alongside — the lab verdict stays visible prose plus, at most, non-review structured data.

---

## 36. `/joyroom`

**Problem:** Arabic page uses Latin "Joyroom" in the section H2 and all seven category CTA anchors, breaking the Arabic brand-spelling rule

**Verification:** CONFIRMED verbatim. My fetch: visible-text Latin "Joyroom" = 8, "جوي روم" = 56, "جويروم" = 0. H2 is exactly "اختر قسم منتجات Joyroom الذي يحل احتياجك", and the seven CTA anchors are exactly "تصفّح سماعات Joyroom←" (/joyroom/audio), "تصفّح باور بانك Joyroom←" (/joyroom/power-banks), "تصفّح شواحن Joyroom←" (/joyroom/wall-chargers), "تصفّح كابلات Joyroom←" (/joyroom/cables), "تصفّح ساعات Joyroom←" (/joyroom/smart-watches), "تصفّح حوامل Joyroom←" (/joyroom/car-holders), "تصفّح إكسسوارات سيارة Joyroom←" (/joyroom/car-accessories). Contrast verified: /anker has "انكر" 58x, Latin "Anker" 0x, anchors "تصفّح باور بانك انكر", "تصفّح شواحن انكر", "تصفّح كابلات انكر", "تصفّح شواحن سيارة انكر". Fix is pure copy replacement, no fabricated data, no superlatives — compliant.

**Corrected fix:** Apply as proposed. One refinement: the card headings above each CTA already read "حوامل سيارة جوي روم", so use "تصفّح حوامل سيارة جوي روم" to match, and add the one-word variant only once as "جوي روم (جويروم)" in body prose to avoid keyword-stuffing.

---

## 37. `/anker`

**Problem:** Five visible FAQ accordions carry no FAQPage structured data on any of the six brand hubs

**Verification:** CONFIRMED. Grep of live source: '"FAQPage"' = 0 and '"Question"' = 0 on all six hubs (/anker, /en/anker, /joyroom, /en/joyroom, /soundcore, /en/soundcore), while <summary> elements = 5, 5, 5, 5, 4, 4 respectively. The quoted question renders verbatim: "هل وجود GaN أو PowerIQ يعني أن كل شواحن انكر متشابهة؟" (plus "كيف أختار منتج انكر المناسب؟", "أين أجد السعر والتوافر الحاليين؟", "ما مدة ضمان كايرو فولت؟", "هل سجل ضمان كايرو فولت يثبت أصالة المنتج؟"). Minor evidence imprecision: the JSON-LD type inventory is larger than the auditor listed (WebSite, OnlineStore, ShippingService, MerchantReturnPolicy, etc.), but FAQPage/Question are genuinely absent. Fix is serialisation of already-visible text — satisfies the mirror-visible-text rule and involves no reviews/ratings.

**Corrected fix:** Emit FAQPage JSON-LD generated from the rendered <summary>/<details> strings themselves (not a parallel copy deck) so markup can never drift from visible text. Do NOT add Review or AggregateRating nodes alongside it.

---

## 38. `/anker/power-banks`

**Problem:** Arabic buying guide claims Prime speeds "تصل لـ 250 وات" with no attribution and no such product on the page; Arabic series list is also missing the Series 7 bullet the English page has

**Verification:** CONFIRMED verbatim. Live AR text: "• سلسلة Prime (الجيل الجديد): أحدث تكنولوجيا، شاشات رقمية، وسرعات تصل لـ 250 وات لشحن كل أجهزتك." Highest listed output on the page is "انكر برايم باور بانك 20000mAh (A1336) — 200 واط 3 في 1". AR has exactly 3 series bullets (سلسلة 3, سلسلة 5, سلسلة Prime); EN has 4, including "Series 7 (Super Fast): High-speed charging for laptops and tablets. (e.g., Anker 737 with 140W output)." EN Prime bullet carries no wattage, exactly as quoted. The Anker 737 is carded on the page as "باور بانك انكر 737 (A1289011) | بروفايلات PD 3.1 مدرجة حتى 140 واط". Fix replaces an unsourced number with an on-page listed spec — compliant.

**Corrected fix:** Delete "وسرعات تصل لـ 250 وات". Replacement text must stay inside what the page lists: "سلسلة Prime: موديلات بخرج إجمالي معلن أعلى؛ أعلى موديل معروض هنا هو A1336 بخرج إجمالي معلن 200 واط." For the new Series 7 bullet use the page's own wording: "سلسلة 7: خرج أعلى للابتوب والتابلت — انكر 737 (A1289011) ببروفايلات PD 3.1 مدرجة حتى 140 واط." Do not import Anker line-wide wattage claims that no listed SKU supports.

---

## 39. `/anker/power-banks`

**Problem:** "Model Comparison" table has a placeholder price column, a boilerplate comparison-basis column, and no links in any row

**Verification:** CONFIRMED and broader than claimed. Headers are exactly "الموديل | السعر الحالي | الميزة الرئيسية | أساس المقارنة". All 9 data rows have "راجع صفحة المنتج" in col 2 and "المواصفات والتوافق" in col 4, including the two quoted rows verbatim. Table contains zero <a> elements. I reproduced the identical pattern on /joyroom/power-banks (3 rows), /anker/cables (6 rows), /soundcore/audio (27 rows) and /joyroom/car-holders (2 rows) — all 0 anchors, all identical cols 2 and 4. Fix uses data already rendered on the same page's cards — no invented measurements.

**Corrected fix:** Apply as proposed, with one constraint: the replacement spec columns must be populated from the same product-data source that renders the card bullets (e.g. "سعة معلنة 20000mAh / 72Wh", "خرج إجمالي معلن 200 واط"), not hand-typed, and every figure must keep its "معلن" labelling. Render the price cell from the live price field so it cannot drift; if a price cannot be rendered, drop the column entirely rather than shipping a placeholder.

---

## 40. `/joyroom/car-chargers`

**Problem:** Single-SKU category whose title near-duplicates its own product page title, with the same SKU also listed on /joyroom/car-accessories

**Verification:** CONFIRMED. Live ItemList on the category: numberOfItems = 1, sole url https://cairovolt.com/joyroom/car-chargers/joyroom-60w-car-charger. Category <title> = "شاحن سيارة جوي روم 69W قابل للسحب 4 في 1 ⚡ الأسعار والتوصيل في مصر"; product <title> (fetched live) = "شاحن سيارة جوي روم JR-CCL05 القابل للسحب 4 في 1 بقدرة 69 واط". /joyroom/car-accessories ItemList (numberOfItems = 3) lists that same product URL first. Three URLs describing one unit is real and material. Fix is compliant, but the canonicalisation half is risky.

**Corrected fix:** Take only the retitle branch, not the cross-canonical branch: the site's canonical/sitemap layer is currently clean (620 self-canonical URLs) and pointing one live category at a different URL would de-index a crawled page for a single-SKU reason that changes as soon as a second charger is stocked. Retitle to a category framing the product page cannot answer — AR <title> "شواحن سيارة جوي روم في مصر — اختيار القدرة والمنافذ حسب عربيتك", H1 "شاحن سيارة جوي روم في مصر" — and move "JR-CCL05 قابل للسحب 4 في 1 بقدرة 69 واط" into the first body paragraph. This resolves this finding and the /joyroom/car-chargers keywords finding with one edit.

---

## 41. `/en/joyroom/car-chargers`

**Problem:** The two editorial in-body links on the English page point at unprefixed Arabic URLs

**Verification:** CONFIRMED exactly. Parsing every internal anchor on the live EN page, the only non-/en hrefs besides the deliberate language switcher ("العربية" → /joyroom/car-chargers) and the Cloudflare email-protection link are: href="/joyroom/car-holders" text "Joyroom car phone holder" and href="/anker/car-chargers" text "Anker car chargers". Both anchor texts are English, both sit in body copy, and the page's nav links do carry /en. Fix is a pure href correction — compliant.

**Corrected fix:** Apply as proposed. The renderer-level fix is the right scope: the same defect reproduces on /en/soundcore/audio and /en/soundcore/speakers, so resolve category-copy links against the active locale rather than patching individual strings.

---

## 42. `/joyroom/power-banks`

**Problem:** Comparison table labels the 10,000mAh SKU "22.5W" while the card for the same SKU states 5V/2.1A, and adds an invented "Pro" to the 20,000mAh model name

**Verification:** CONFIRMED in both locales. AR card: "باور بانك جوي روم 10000 مللي | الفئة الاقتصادية (منقذ الطلبة) 🔋 سعة خلايا معلنة 10,000 مللي أمبير (37Wh) | ⚡ خرج قياسي 5V/2.1A". AR table row: "جوي روم 10000mAh Slim 22.5W | راجع صفحة المنتج | حجم مدمج | المواصفات والتوافق". EN card: "Joyroom 10000mAh Slim Power Bank | Dual USB | LED Display 🔋 Manufacturer-listed 10,000mAh (37Wh) | ⚡ Standard 5V/2.1A Output"; EN table: "Joyroom 10000mAh Slim 22.5W". The 20,000 SKU is listed as "Joyroom 20000mAh Power Bank | 22.5W PD+QC | Triple Output" — no "Pro" anywhere outside the table. A self-contradicting spec on one page is materially worse than a thin page. Fix uses only figures already on the page — compliant.

**Corrected fix:** Apply as proposed. Explicitly: the table's model column must carry the product name only ("باور بانك جوي روم 10000 مللي" / "باور بانك جوي روم 20000"), and any wattage must move into a separate output column sourced from the same field that renders the card bullet — 5V/2.1A for the 10,000, "حتى فئة 22.5W" for the 20,000. Do not restate 22.5W for the 10,000 SKU under any label.

---

## 43. `/joyroom/car-holders`

**Problem:** Page repeatedly tells readers to check weight limit and clamp size but publishes no weight, clamp width, or holding-force figure anywhere

**Verification:** CONFIRMED. All four quoted strings render verbatim: "راجع حد الوزن لتجنب الضغط على الفتحة", "راجع حد الوزن وتوافق السطح قبل التركيب", "راجع حد الوزن المعلن للموديل", "راجع نطاق المقاس والوزن للمشبك", plus the unqualified "مغناطيس N52 معلن". Measured on the live page: "جرام" 0, "كجم" 0, zero "<number> مم" matches. Both cited MPNs (JR-ZS295, JR-ZS290) do appear on the page, so the fix targets real SKUs. The fix as written is compliant because it requires manufacturer-published figures with attribution and explicitly instructs saying so when a figure is unpublished — it does not license invention.

**Corrected fix:** Apply, but bind it hard: publish clamp width (mm), max supported phone weight (g) and magnet holding force ONLY where those figures appear in Joyroom's own published listing for JR-ZS295 / JR-ZS290, each rendered with the source named and linked (e.g. "وفق صفحة جوي روم للموديل JR-ZS290"). Where Joyroom does not publish a figure, replace the "راجع حد الوزن" line with the explicit statement that the manufacturer does not publish it. Do not estimate, do not bench-derive a holding force, and do not carry a figure over from a different ZS-series model.

---

## 44. `/en/soundcore/audio`

**Problem:** Every in-copy editorial link on the English page points at unprefixed Arabic URLs

**Verification:** CONFIRMED exactly. Live anchor parse of /en/soundcore/audio returns exactly four non-/en editorial hrefs: /soundcore ("Soundcore Hub"), /anker/cables ("Anker cables"), /anker/power-banks ("Anker power banks"), /soundcore/speakers ("Soundcore speakers") — the only other unprefixed hrefs are the language switcher and the Cloudflare email link. /en/soundcore/speakers reproduces it with four anchors to /soundcore, /soundcore/audio, /anker/cables, /anker/power-banks (anchor text "Soundcore earbuds" rather than "Soundcore audio", an immaterial slip). Nav on the same pages correctly uses /en. Compliant href-only fix.

**Corrected fix:** Apply as proposed, at the renderer, and include /en/joyroom/car-chargers in the same sweep — it has the same defect with two anchors.

---

## 45. `/earbuds`

**Problem:** AirPods-alternative comparison table has 21 data cells and all are placeholders

**Verification:** Problem CONFIRMED, auditor's fix contains bad numbers. Table is exactly 7 rows x 3 columns under headers "المقارنة | AirPods Pro 2 | ساوندكور Liberty 4 Pro | ساوندكور P20i", and every cell is a placeholder, including the three quoted rows verbatim and "حسب ظروف الشركة" x3. BUT the proposed replacement figures are wrong: the live Liberty 4 Pro card reads "5,830 ج.م" (6,870 struck through, -15%), not 4,700 — 4,700 ج.م belongs to a different, over-ear model on the same page (40mm driver, 40h ANC/55h). And the live P20i card reads "699 ج.م" (790 struck through), not 774 — 774 ج.م is the Joyroom JR-T03. The spec halves do check out verbatim: "درايفر ACAA 10.5mm+4.6mm محوري | عزل تكيفي ANC 3.0 (7 مستشعرات) | LDAC Hi-Res | 40 ساعة" and "درايفر 10mm BassUp | بطارية معلنة حتى 30 ساعة إجمالًا | Bluetooth 5.3 | تصنيف IPX5". Shipping the auditor's prices would publish two false prices.

**Corrected fix:** Populate the two CairoVolt columns from the page's own card fields, with prices RENDERED from the live price source rather than hardcoded — as of this fetch that is Liberty 4 Pro 5,830 ج.م and P20i 699 ج.م, not 4,700 / 774. Specs are safe to carry as-is: Liberty 4 Pro = ACAA 10.5mm+4.6mm coaxial, adaptive ANC 3.0 (7 sensors), LDAC Hi-Res, 40h, IPX5; P20i = 10mm BassUp, Bluetooth 5.3, up to 30h total, IPX5 — each kept with its "معلن" qualifier. For the AirPods Pro 2 column, link Apple's published spec page and quote only what that page states; if a cell cannot be sourced, delete the row rather than leaving a placeholder. Drop the "فرق السعر" row or compute it from the two rendered prices.

---

## 46. `/power-banks`

**Problem:** The highest-intent price FAQ returns a non-answer while live EGP prices render 20 lines above it; same on /cables and /earbuds

**Verification:** CONFIRMED. /power-banks FAQ renders verbatim: "كم سعر باور بانك 20000 في مصر؟ ▼ السعر والمخزون يتغيران حسب الموديل والقدرة والمنافذ. تعرض بطاقة المنتج وصفحته السعر الحالي الذي يُستخدم في الطلب." The grid above renders "997 ج.م" and "1,730 ج.م" as quoted; page price tokens span 850 to 5,900 ج.م, matching the proposed range endpoints. /cables carries the identical non-answer under "كم سعر كابل شحن سريع في مصر؟". One transcription slip: the /earbuds question is "كم سعر سماعات البلوتوث في كايرو فولت؟", not "كام سعر…" — same non-answer body, so the pattern claim holds. Fix keeps answers under 50 words and derives from real rendered prices.

**Corrected fix:** Apply, with the range values computed at render time from the same price source that feeds the cards — never hardcoded, since the auditor's own quoted figures for /earbuds were already stale by one fetch. Keep each answer under 50 words, keep "الدفع عند الاستلام" and "السعر الحالي على صفحة المنتج", and mirror the same sentence into any FAQ JSON-LD.

---

## 47. `/power-banks`

**Problem:** Hub title and the blog it links to both lead with the identical Arabic head term plus the identical brand pair

**Verification:** CONFIRMED. /power-banks <title> = "دليل أفضل باور بانك في مصر | انكر وجوي روم 10000 و20000"; /blog/best-power-bank-egypt-2026 <title> = "أفضل باور بانك في مصر | مقارنة انكر vs جوي روم | دليل شامل", H1 = "أفضل باور بانك في مصر: دليل الشراء الشامل"; the hub's source does link that blog slug. Additional point in the finding's favour that the auditor missed: the current hub title contains the banned superlative "أفضل", so the retitle is required on editorial grounds too. The auditor's own proposed replacement, however, keeps "انكر وجوي روم" — directly contradicting its sibling finding on the same title.

**Corrected fix:** Do not ship the auditor's proposed title ("باور بانك انكر وجوي روم 10000 و20000 في مصر…") — it reintroduces the brand-term competition the keywords finding flags on the same element. Ship ONE unbranded, non-superlative title and use it to satisfy both findings: AR "باور بانك في مصر: مقارنة بالواط/ساعة والقدرة والوزن | كايرو فولت", EN "Power Banks in Egypt: Compare Wh, Output and Weight". Keep the cross-link to the blog. Separately, note the blog itself still leads with "أفضل" — that superlative needs its own pass, which is out of scope here.

---

## 48. `/power-banks`

**Problem:** Generic hub title claims both brand terms, competing with /anker/power-banks and /joyroom/power-banks instead of owning the unbranded head term

**Verification:** CONFIRMED. All three titles verified live: hub "دليل أفضل باور بانك في مصر | انكر وجوي روم 10000 و20000", /anker/power-banks "باور بانك انكر في مصر حسب السعة والقدرة ⚡ 12 منتج | الأسعار والتوصيل في مصر", /joyroom/power-banks "باور بانك جوي روم في مصر حسب السعة والقدرة ⚡ 3 منتج | الأسعار والتوصيل في مصر". The hub's ItemList shows numberOfItems 16 and links 13 Anker + 3 Joyroom power-bank products, so the overlap claim is materially right (the "12/12" figure is slightly off — the hub carries 13 Anker items). Fix removes both the brand duplication and the banned "أفضل" — compliant and strictly improving.

**Corrected fix:** Apply as proposed. This is the title to ship; it supersedes the alternative proposed in the cannibalization finding on the same element. Hand the brand terms down via named intro links to /anker/power-banks and /joyroom/power-banks rather than in the title or meta.

---

## 49. `/anker/cables`

**Problem:** The two Arabic cable category H1s differ by one brand token, while the English versions do differentiate

**Verification:** CONFIRMED verbatim in all four cases. AR: "كابلات انكر PowerLine للشحن ونقل البيانات" vs "كابلات جوي روم للشحن ونقل البيانات". EN: "Anker PowerLine Charging and Data Cables" vs "Joyroom Cables (Auto-Disconnect Tech)". The Joyroom angle is supported in AR body — "الفصل التلقائي" appears 5x, e.g. "موديل جوي روم S-M411 ميزة الفصل التلقائي وفق مواصفات المنتج" — and the title states 11 منتج. One evidence slip: "انحناء" appears 0 times on /anker/cables; the attribute is on the page under a different word, "ثني" ("نايلون مضفر (35,000 دورة ثني)", "راجع تقييم الثني المكتوب للموديل", "تحقق من MFi وUSB-PD واختبار الثني"), with MFi 11x and PD 12x. So the substance holds but the proposed Arabic wording must change.

**Corrected fix:** Joyroom AR H1 as proposed: "كابلات جوي روم بتقنية الفصل التلقائي — 11 موديل" (keep the count rendered, not hardcoded). Anker AR H1 must use the page's own term: "كابلات انكر PowerLine: MFi وUSB-C PD وتقييم الثني المعلن" — not "الانحناء", which appears nowhere on the page. Keep "معلن"/"مكتوب" qualifiers; do not restate the 35,000-cycle figure in the H1 without its per-model attribution.

---

## 50. `/earbuds`

**Problem:** A product card advertises a Soundcore R50i NC (A3959) whose link resolves to a different product, and which the brand category does not stock

**Verification:** CONFIRMED, and this is the most concrete defect in the set. The /earbuds card renders "سماعة ساوندكور R50i NC موديل A3959 | عزل وبطارية معلنان من الشركة | علبة بحامل" with href "/Soundcore/audio/anker-soundcore-r50i-nc". curl -L on both locales resolves to https://cairovolt.com/soundcore/audio/soundcore-p30i-earbuds and https://cairovolt.com/en/soundcore/audio/soundcore-p30i-earbuds, HTTP 200 — a completely different SKU. /en/soundcore/audio (title "⚡ 27 Products") links 27 product URLs and contains no r50i-nc card (only anker-soundcore-r50i and soundcore-r50i-vi-earbuds), yet its FAQ asks "What is the difference between Soundcore R50i, K20i, and R50i NC?" and its comparison table lists a "Soundcore R50i NC" row. Fix requires no new claims.

**Corrected fix:** Apply as proposed. Whichever branch is chosen, also fix the card's href casing ("/Soundcore/…" with a capital S is what triggers the redirect chain into P30i) and re-check the other capitalised category hrefs on /earbuds and /power-banks for the same pattern. If the SKU is dropped, remove the 42dB ANC bullet with it rather than reassigning it to another model.

---

## 51. `/soundcore/audio`

**Problem:** The 27-product category never uses the head term "سماعات بلوتوث" / "Bluetooth earbuds" in either locale

**Verification:** CONFIRMED in substance. EN: "Bluetooth earbuds" 0x and "wireless earbuds" 0x across 2,876 extracted words. AR: the exact phrase "سماعات بلوتوث" appears once in my extraction, but the single occurrence is in the global footer category nav ("تسوق حسب الفئة … سماعات بلوتوث"), not in the H1, intro or body — so the auditor's body-level claim of 0x stands. H1s verified: "سماعات ساوندكور الأصلية" / "Original Soundcore Earbuds". Fix adds a real head term plus locality, no superlatives, no invented claims, and does not collide with /earbuds (H1 there is "سماعات بلوتوث في مصر").

**Corrected fix:** Apply as proposed. Since /earbuds already owns the bare head term with H1 "سماعات بلوتوث في مصر", keep this page strictly brand-qualified — "سماعات بلوتوث ساوندكور الأصلية في مصر" / "Original Soundcore Bluetooth Earbuds in Egypt" — and add the phrase once in the opening paragraph only.

---

## 52. `/joyroom/car-chargers`

**Problem:** Category title and H1 are a single SKU's spec string rather than the category head term

**Verification:** CONFIRMED. AR <title> = "شاحن سيارة جوي روم 69W قابل للسحب 4 في 1 ⚡ الأسعار والتوصيل في مصر", AR H1 = "شاحن سيارة جوي روم 69W قابل للسحب 4 في 1", ItemList numberOfItems = 1. EN H1 = "Joyroom Car Chargers" (correct) while EN meta opens "Joyroom JR-CCL05 retractable 4-in-1 car charger in Egypt…" — exactly as claimed. "شاحن سيارة" appears 7x in the extracted text (auditor said 6x; immaterial). Fix is a retitle to category framing with the SKU detail preserved in body — compliant.

**Corrected fix:** Apply as proposed, and merge it with the cannibalization fix for the same URL so the page is edited once: AR H1 "شاحن سيارة جوي روم في مصر", AR <title> a category framing the product page cannot answer (e.g. "شواحن سيارة جوي روم في مصر — اختيار القدرة والمنافذ حسب عربيتك"), with "JR-CCL05 قابل للسحب 4 في 1 بقدرة 69 واط" moved to the first body paragraph. Also strip the SKU from the EN meta description so it stops mirroring the product page.

---

## 53. `/anker/power-banks`

**Problem:** Brand-category pages are not answer-first: the descriptive paragraph sits below the product grid and FAQ

**Verification:** CONFIRMED in substance, exact percentages differ by segmentation method. On /en/anker/power-banks I segmented the rendered body into 216 blocks: the first product card appears at block 70, and the paragraph "Sudden power outage or a long trip with low phone battery? Compare Anker power banks by rated capacity, printed Wh, port output…" appears at block 183 — 85% depth by my method vs the auditor's 74%, i.e. worse, not better. On /joyroom/power-banks the descriptive block "باور بانك جوي روم: سعات عملية وخيارات شحن متنوعة" lands at 51% (auditor said 58%), again well below the grid. The ordering defect is real; the depth percentages are method-dependent and should not be quoted as measurements. Fix is a reordering of existing copy — no new claims, fully compliant.

**Corrected fix:** Apply as proposed (move the existing paragraph directly under the H1, demote the trust chips), but drop the specific depth percentages from any writeup — they vary with how the DOM is segmented and are not reproducible figures. Verify the change on one page before rolling to all 15, since the chips and grid are shared components.

---

## 54. `/joyroom/car-accessories`

**Problem:** The markdown twin reports zero products while the HTML renders three, in both locales

**Verification:** CONFIRMED. curl -H 'Accept: text/markdown' on /en/joyroom/car-accessories returns "## Products (0)" and "> Published bench coverage: **0** of **0** products in this list."; the Arabic twin returns "## المنتجات (0)". The HTML at the same URLs has <title> "Joyroom Car Accessories in Egypt ⚡ 3 Products | Prices & COD" / "اكسسوارات سيارة جوي روم ⚡ 3 منتج…", ItemList numberOfItems = 3, listing joyroom-60w-car-charger, joyroom-car-phone-mount and joyroom-car-mount-zs290. Control check supports the aggregate-view diagnosis: the markdown twins for the sibling categories resolve correctly — /en/joyroom/car-chargers returns "## Products (1)" and /en/joyroom/power-banks returns "## Products (3)". A content-negotiating assistant is currently told CairoVolt stocks no Joyroom car accessories. Fix is a generator bug fix — compliant.

**Corrected fix:** Apply as proposed. Also add a build-time invariant asserting markdown product count equals HTML ItemList numberOfItems for every category URL, so aggregate views cannot silently regress to zero again.

---

## 55. `/soundcore`

**Problem:** Over-ear headphones badged as earbuds in the grid; no هيدفون badge exists despite the title promising headphones.

**Verification:** VERIFIED live. /soundcore grid: 12 cards, badges measured — 11 × "ايربودز", 1 × "سبيكر" (Motion+), 0 × "هيدفون". Q20i, سبيس Q45 and سبيس ون are all badged "ايربودز". /en/soundcore is identical: 11 × "Earbuds", 1 × "Speaker", 0 × "Headphones". The contradiction is verbatim real — same page line 191 EN: "Catalogue examples: R50i NC and Liberty 4 NC earbuds, plus Space One and Q45 headphones." AR line 196: "أمثلة من الكتالوج: ايربودز R50i NC وLiberty 4 NC، وهيدفون Space One وQ45." Title confirms the promise: "<title>ساوندكور من انكر مصر | سماعات وايربودز وسبيكرات</title>" / "<title>Soundcore by Anker Egypt | Earbuds, Headphones & Speakers</title>". Fix is compliant (a taxonomy correction, no invented data). One factual error in the auditor's fix: Liberty 4 Pro is NOT an over-ear — its own card reads "ACAA 10.5mm+4.6mm Coaxial Dual Driver … IPX5", i.e. TWS in-ear.

**Corrected fix:** Add a third badge value ("هيدفون" / "Headphones") and reassign ONLY the three genuine over-ears in this grid — Q20i, Space Q45, Space One (all list 40mm drivers and 3.5mm wired input on their own cards). Leave Liberty 4 Pro, Liberty 4 NC, Liberty 5, P20i/P25i/P30i/K20i badged "ايربودز", and give Life U2i its true neckband form factor. Do not invent a badge for any model whose form factor is not stated on its own product page. Separately, surface more than one speaker in the grid (the /soundcore/speakers section stocks 4) so the "سبيكرات" half of the H1 is actually served.

---

## 56. `/anker`

**Problem:** No answer-first block; first paragraph under H1 is a verbatim copy of the meta description and is a browse instruction, while buying guidance sits ~2/3 down.

**Verification:** VERIFIED live. The string "تصفح شواحن وباور بانك وكابلات وشواحن سيارة انكر في مصر. قارن قدرة USB-C وبروتوكولات PD وPPS والسعة والمنافذ والتوافق، ثم راجع السعر وشروط ضمان كايرو فولت في صفحة المنتج." is the exact <meta name="description"> AND appears twice in visible body text: at visible line 75 (intro under H1 "منتجات انكر في مصر") and again at line 300 inside "ملخص العلامة". H2 "ملخص انكر للشراء في مصر" is at line 216 of 333 (65% depth). Same duplication independently confirmed on /en/anker (2) and /joyroom (2). Counter-check confirms the /soundcore control: its meta description "تصفح ايربودز وهيدفون وسبيكرات ساوندكور من انكر في مصر…" occurs 0 times in body text. Fix requires no fabricated data — the EGP band and category mapping are already rendered on the page.

---

## 57. `/anker/power-banks`

**Problem:** A1263 PowerCore 10000 listed on the category page with no trace of the CPSC recall its own product page discloses at the top.

**Verification:** VERIFIED live. On /anker/power-banks and /en/anker/power-banks the strings "استدعاء", "recall" and "CPSC" each return 0 occurrences. The card renders as "باور بانك انكر PowerCore 10000 مللي أمبير موديل A1263 · 🔋 تحقق من 10,000 مللي أمبير وقيمة Wh | ⚡ راجع بروفايلات الخرج | 🔌 منافذ حسب الوحدة | ⚖️ أكد الوزن والأبعاد على الصفحة · 1,300 ج.م". The product page /anker/power-banks/anker-powercore-10000 opens verbatim with: "⚠️ استدعاء (لا تتخطَّ): في يونيو 2025 استرجعت CPSC الأمريكية وحدات انكر PowerCore 10000 موديل A1263 المصنّعة للسوق الأمريكي بين يناير 2016 وأكتوبر 2019 — خطر حرارة/حريق. تحقق من رقم السيريال على https://www.anker.com/a1263-recall". Fix is fully compliant: it reuses a disclosure the site already publishes and cites CPSC/Anker with a URL — no new measurement, no superlative. This is the highest-consequence finding in the set (a safety caveat stripped from the browse surface).

---

## 58. `/joyroom/cables`

**Problem:** Intro and the whole "how to choose" guide are built around an S-M411 cable and a 100W Type-C tier the page does not sell.

**Verification:** VERIFIED live, and the real problem is worse than described. S-M411: confirmed phantom — appears at visible lines 219 and 233 ("S-M411 (للايفون القديم): كابل قماشي، يدعم الفصل التلقائي، ولمبة LED") and in the EN twin ("S-M411 (Listing)"), but the 11 product URLs on the page carry MPNs JR-S-CL20, JR-S-CL30B, JR-S-AL24, JR-S-CC100 etc. — no S-M411 anywhere. 100W: the auditor called it phantom; in fact SKU JR-S-CC100 IS on the page, and CairoVolt's OWN bench report on it explicitly rejects the 100W class: "بوابة صدق §7.4 في CairoVolt تلغي هذا التسويق: FNIRSI FNB58 PD Info لم ترصد أي شريحة E-marker" and "أعلى قدرة مُررت 57.9 واط مستقرة … فئة 3A / ~60 واط. 5A / 100 واط غير مدّعى وغير مُتحقَّق". So the category page's bullet "Type-C 100W: مناسب لبعض اللابتوبات" and its table row "جوي روم 100W Type-C | للابتوب" contradict the store's own published measurement — a truthfulness defect, not just an inventory mismatch.

**Corrected fix:** Rewrite the three guide tiers around real inventory and the real printed band (٤٣–٢٣٧ ج.م): (1) USB-A→Micro / USB-A→Lightning for older phones and power banks, (2) 20W–30W PD USB-C→Lightning for iPhone up to 14, (3) 60W USB-C→USB-C for USB-C phones and tablets. DELETE the S-M411 bullet entirely (no such SKU). For the 100W bullet and the "جوي روم 100W Type-C | للابتوب" comparison row, do not merely delete — replace with the store's own verified position on JR-S-CC100: the box markets "100W PD" but CairoVolt's bench found no E-marker and a measured 57.9W ceiling, so it is a ~60W/3A-class cable and must not be recommended for laptop-class charging. Apply the identical change to /en/joyroom/cables. Also fix the FAQ "إيه الفرق بين كابل 60W و 100W؟", which currently implies the catalogue offers a real 100W option.

---

## 59. `/joyroom/audio, /joyroom/cables, /joyroom/car-accessories, /joyroom/car-chargers (and all four /en/ counterparts)`

**Problem:** All eight pages render 8 visible FAQ Q&A pairs but ship no FAQPage structured data; only BreadcrumbList, HowTo and ItemList are emitted.

**Verification:** VERIFIED live on all 8 pages, exactly as claimed. grep -c FAQPage = 0 on every one. Each page renders exactly 8 <details> blocks (counted: 8/8/8/8/8/8/8/8). Emitted @type set per page confirmed as BreadcrumbList, HowTo, HowToStep, ItemList, ListItem (plus site-wide OnlineStore/WebSite/Brand/shipping nodes) — no FAQPage. The markdown leak is also verbatim confirmed in the live JSON-LD on /joyroom/cables: {"@type":"HowToStep","position":1,"name":"كيف تختار الكابل المناسب؟","text":"\n- **S-M411 (للايفون القديم):** كابل قماشي، يدعم الفصل التلقائي…"}. Fix is the most compliant in the set: it markups text already visible on the page (satisfies the mirror rule), adds no content, and the answers are already ≤50 words. Note the interaction with finding #4 — do not markup the S-M411/100W steps until that copy is corrected, or the error gets amplified into structured data.

---

## 60. `/en/joyroom/wall-chargers`

**Problem:** Comparison table and buying-guide/FAQ blocks steer shoppers to a 35W GaN dual-port and a 65W laptop charger that do not exist in the catalogue.

**Verification:** VERIFIED live, verbatim. Table rows present: "Joyroom 35W GaN Dual | See product page | Dual Port by Model | Specifications & compatibility" and "Joyroom 65W Laptop Charger | See product page | Laptop-Ready". Guide H3 "Should I buy 20W or 35W?" and FAQ "What is the difference between 20W, 35W, and 65W?" both present. The page itself states "Browse 4 Joyroom Wall Chargers products. Current prices range from EGP 236 to EGP 1,206" and its only 4 product links are joyroom-20w-usb-c-charger, joyroom-25w-fast-charger, joyroom-30w-fast-charger, joyroom-3-in-1-wireless-charging-station. Independently confirmed the /joyroom hub returns 0 occurrences of "35", "65" and "GaN". Fix is compliant — it asks only for live EGP prices and manufacturer-listed per-port output, both already published, and forbids reintroducing 35W/65W copy unless stocked.

---

## 61. `/joyroom/power-banks`

**Problem:** Arabic title sells the most expensive power bank on the page as the budget/student option, and nothing explains the price inversion.

**Verification:** VERIFIED live. Card 1: "باور بانك جوي روم 10000 مللي | الفئة الاقتصادية (منقذ الطلبة)" — "🔋 سعة خلايا معلنة 10,000 مللي أمبير (37Wh) | ⚡ خرج قياسي 5V/2.1A | 📊 شاشة نسبة تقديرية | 📏 سمك معلن 16.2مم | 🔌 مخرجا USB" at 1,624 ج.م. Card 2: "باور بانك جوي روم 20000 | ثلاثة مخارج وشاشة LED" at 997 ج.م. Card 3: magnetic JR-W050 10,000mAh at 850 ج.م. The page's own band line says "تتراوح الأسعار الحالية من ٨٥٠ ج.م. إلى ١٬٦٢٤ ج.م." The EN twin carries no equivalent claim: "Joyroom 10000mAh Slim Power Bank | Dual USB | LED Display". So the AR title is factually false against the page's own prices. NOTE: the auditor's second fix step is unsound — the 20,000mAh unit ALSO has an LED display and lists 3 ports and a 22.5W class versus the 10,000mAh's 2 ports and 5V/2.1A, so "display" and "ports" cannot be presented as advantages of the pricier unit.

**Corrected fix:** Remove "الفئة الاقتصادية (منقذ الطلبة)" from the 1,624 ج.م title and align it with the English (capacity, dual USB, display, listed 16.2mm thickness). In the catalogue-comparison block, state only the one differentiator that survives the page's own data — the listed 16.2mm thickness/slim form — and state plainly that the 20,000mAh model lists double the capacity, three outputs and a 22.5W-class profile at a lower current price, so buyers choosing the 10,000mAh are paying for size, not capability. Do NOT claim the display or port count as advantages of the pricier unit; they are not. No superlative, no invented measurement — every figure is already printed on the two cards.

---

## 62. `/en/joyroom/car-holders`

**Problem:** Closing comparison table asserts a mounting method the product's own card declines to state, prints no price, and links nowhere.

**Verification:** VERIFIED live, verbatim. Table: "Joyroom Dashboard 360 (Adhesive) | See product page | Dashboard Mount | Specifications & compatibility" and "Joyroom JR-ZS290 MagSafe (Magnetic) | See product page | MagSafe iPhone | Specifications & compatibility". The matching card reads "Joyroom Car Phone Mount | Verify Phone and Vehicle Fit — 🚗 Car phone mount | 📱 Verify the listed phone and case dimensions | 🔄 Adjustable viewing angle | 🧾 Confirm the supplied mounting method and parts" at 169 EGP; the second is 934 EGP. Both prices are rendered on the same screen while the table says "See product page". Neither table row is an anchor — the only /en/joyroom/car-holders/* links on the page are the two product cards. The auditor's MPN guess checks out: the first product's JSON-LD carries "mpn":"JR-ZS295". Fix is compliant and explicitly refuses to assert an unconfirmed mounting method — it is stricter than the current page, not looser.

---

## 63. `/soundcore/audio`

**Problem:** Page links to zero blog guides despite 20+ directly matching audio guides, including ones answering its own printed FAQ questions.

**Verification:** VERIFIED live. The only blog hrefs in the whole document are href="/blog" ×2 (AR) and href="/en/blog" ×2 (EN) — zero /blog/<slug> links in the body. Both FAQ questions exist verbatim: "Do Soundcore earbuds support ANC (Active Noise Cancelling)?" and "Which is better: Soundcore or AirPods?". The "Perfect for Egyptian Daily Life:" bullet block also exists. I HTTP-checked all 10 proposed destination slugs — all return 200: airpods-pro-3-vs-soundcore-liberty-4-nc, anc-vs-enc-vs-transparency-mode-difference, soundcore-models-guide-egypt-2026, best-bluetooth-earbuds-egypt-2026, on-ear-vs-over-ear-vs-in-ear-headphones, soundcore-earbuds-under-1000-egp-students, gaming-earbuds-pubg-freefire-low-latency, earbuds-gym-running-no-drop-sweat-resistant, earbuds-for-quran-recitation-clear-sound, bluetooth-earbuds-by-phone-brand-iphone-samsung-xiaomi-oppo. Fix is compliant — descriptive anchors to existing live pages, no fabricated content. One caveat to carry: if finding #5's FAQPage markup is later added to this page, the schema answer text must mirror the visible answer including the added link's anchor text.

---

## 64. `/power-banks`

**Problem:** ~1,000 words of editorial contain zero numeric specifications, so there is no quotable sentence answering "which power bank should I buy in Egypt".

**Verification:** VERIFIED live with a stricter test than the auditor's. I isolated the editorial (everything after the product grid, 1,182 words on /en/power-banks) and extracted every numeric token: the complete set is 1, 2, 3, 4, 5, 7, 5,000, 10,000/10000, 20/20,000/20000, 24,000/24000, 30,000/30000 — i.e. capacity class labels and list counters only. Zero W, Wh, mm or g values anywhere in the editorial. Every Wh/W figure on the page (37Wh, 72Wh, 74Wh, 86.4Wh, 90Wh, 94.72Wh, 22.5W, 140W, 165W, 200W, 256Wh) sits inside product cards, above the editorial. Representative copy confirmed verbatim: "For a limited budget: Compare 10000mAh models by output, size, and current product-page price". The fix's method is compliant (reuse manufacturer-listed card figures, mark derived charge counts "est."), but its worked example mis-pairs a SKU with a price.

**Corrected fix:** Convert each advice bullet into a stated fact anchored to a SKU on the page, using only figures already printed on that SKU's card. Correct pairings verified live: Joyroom 10000mAh Slim = 37Wh, listed 16.2mm thickness, 5V/2.1A, 1,624 ج.م (NOT 850 ج.م — 850 ج.م is the JR-W050 MagSafe 10,000mAh); Anker PowerCore 20000 = 72Wh dual USB-A; Anker 737 (A1289011) = listed 24,000mAh / 86.4Wh, PD 3.1 profiles to 140W, 4,999 ج.م; Anker 521 PowerHouse = 256Wh, 200W AC. Label every manufacturer figure "listed", label any derived phone-charge count "est." with the Wh formula shown, and use CairoVolt bench figures only where a published bench-test exists for that exact SKU.

---

## 65. `/chargers`

**Problem:** Meta description sells wireless chargers but "لاسلكي" appears zero times on the page; the hub never mentions car chargers.

**Verification:** VERIFIED live, with one correction to the linking claim. Meta description confirmed verbatim: "دليل لاختيار شاحن ايفون أو سامسونج أو شاحن لاسلكي في مصر. قارن دعم USB-C PD وPPS وGaN لكل موديل…". Rendered text counts on /chargers: "لاسلكي" = 0, "شاحن سيارة" = 0. On /en/chargers "wireless" appears exactly once, at line 135 inside the Joyroom 3-in-1 card ("Three wireless charging positions | verify phone, watch and case compatibility…") — never in the editorial. /joyroom/car-chargers returns 200 and appears 16× in sitemap.xml. CORRECTION: the claim "links to neither" is not accurate — /anker/car-chargers IS linked, but only from the global mega-menu (character offset 13,908 of 246,451, anchor "شواحن سيارة"), not from any body copy; /joyroom/car-chargers is linked 0 times from this page.

**Corrected fix:** Pick one and execute it fully: (a) add a short "شاحن لاسلكي وMagSafe" section covering the Joyroom 3-in-1 station already carded on the page, plus a "شواحن سيارة" section with in-body links to BOTH /anker/car-chargers and /joyroom/car-chargers (the latter is currently unlinked from this hub entirely; the former is reachable only via the global nav); or (b) remove "شاحن لاسلكي" from the meta description so it matches what the page delivers. Do not describe wireless output speeds beyond what the Joyroom 3-in-1 card and its product page already state.

---

## 66. `/chargers`

**Problem:** An Egypt charger hub never mentions 220V/50Hz mains, the plug standard, or which chargers ship with a European pin.

**Verification:** VERIFIED live with the auditor's scoping. "220" = 0 occurrences on the entire page (AR and EN). "فيشة" = 0, "بريزة" = 0. "100–240 فولت" appears exactly once, inside the Joyroom 30W card. The editorial section itself contains no mains-voltage or plug discussion. NOTE on the auditor's grep: "قابس" actually occurs 12× and "فولت" 9× page-wide — but every قابس hit is inside a product card ("قابس قابل للطي", "قابس 180°") and every فولت hit is either the brand name "كايرو فولت" or the single "100–240 فولت" card line, so the editorial-scoped claim stands. Two errors in the proposed fix must be corrected before it is actionable.

**Corrected fix:** Add a short "الشحن في مصر: 220 فولت والقابس" block stating that Egyptian mains is 220V/50Hz on Type C/F sockets, attributed to a named source with a URL (e.g. IEC World Plugs). Do NOT assert that "every charger listed here accepts 100–240V" — only one card on this page (the Joyroom 30W) currently prints that input range; instead instruct buyers to read the input label on each product page, and state the range only for the specific SKUs whose own listing prints it. Name only foldable-plug models that are actually on this page: Anker Zolo A2698 ("GaN وقابس قابل للطي") and Anker Nano 45W A121D ("قابس 180°"). Drop A1637 from the fix — it returns 0 occurrences on /chargers.

---

## 67. `/power-banks`

**Problem:** Hub and blog buying guide target the identical head term with nearly identical titles, splitting the query.

**Verification:** VERIFIED live, both titles verbatim. Hub: "<title>دليل أفضل باور بانك في مصر | انكر وجوي روم 10000 و20000</title>". Blog: "<title>أفضل باور بانك في مصر | مقارنة انكر vs جوي روم | دليل شامل</title>". Both promise "أفضل باور بانك في مصر" plus an Anker-vs-Joyroom comparison. The hub links to the article under "مقالات ذات صلة" with anchor "أفضل باور بانك في مصر: دليل الشراء الشامل" — i.e. the hub currently reinforces the duplicate term rather than handing it off. Additional supporting evidence the auditor missed: the hub's own H2s repeat the superlative — "أفضل باور بانك 10000 مللي أمبير في مصر" and "أفضل باور بانك 20000 مللي أمبير للسفر". The fix is doubly justified: it de-cannibalizes AND removes "أفضل", which the hard editorial rules prohibit outright. Both must be fixed in the H2s as well as the <title>.

---

## 68. `/anker/car-chargers`

**Problem:** Seven of ten brand+category pages carry zero topical H2 — the entire heading structure is reusable chrome.

**Verification:** VERIFIED live and the count is exact (if anything understated). Full H2 sets extracted from live HTML: /anker/wall-chargers, /anker/car-chargers, /anker/cables, /joyroom/cables = "المنتجات || دليل الشراء الذكي || الأسئلة الشائعة || استكشف المزيد"; /joyroom/wall-chargers, /joyroom/car-chargers, /joyroom/audio = "المنتجات || دليل الشراء الذكي || الأسئلة الشائعة". Exactly three of the ten named pages carry one topical H2: /anker/power-banks ("انكر PowerCore: سعات وقدرات تناسب استخدامات مختلفة"), /joyroom/power-banks ("باور بانك جوي روم: سعات عملية وخيارات شحن متنوعة"), /soundcore/audio ("ساوندكور: سماعات شخصية وسبيكرات حسب طريقة الاستماع"). Scope is actually wider than reported — /soundcore/speakers, /joyroom/car-accessories and /joyroom/car-holders also carry zero, making it 10 of 13. Both worked examples check out against live inventory: /anker/car-chargers stocks a dual-USB 24W, A2732 35W, A2741 30W and the magnetic Qi2 A2216; /joyroom/audio stocks JR-T03 and T03S Pro. Fix requires only headings derived from each page's own catalogue — no new claims.

---

## 69. `/chargers`

**Problem:** Charger guide reasons only about iPhone and Samsung, never Xiaomi/Oppo/Infinix/Tecno/Realme, which are a large share of the Egyptian install base.

**Verification:** VERIFIED live. Rendered-text counts on /chargers: "شاومي" 0, "اوبو" 0, "انفينكس" 0, "تكنو" 0, "ريلمي" 0, "هواوي" 0. Identical on /en/chargers: Xiaomi 0, Oppo 0, Infinix 0, Tecno 0, Realme 0, Huawei 0. iPhone/Samsung dominate ("ايفون" 11, "سامسونج" 8, both including nav). The device-specific H2s are exactly the two named: "اختيار شاحن ايفون 17 في مصر" and "اختيار شاحن سامسونج S26 في مصر". The fix is compliant on its face — it explicitly requires "est." labelling for non-bench-tested figures and a URL for any third-party spec, and the substantive claim it asks for (proprietary fast-charge protocols are not reachable by generic USB-C PD; PD is a safe interoperable baseline) is a protocol fact, not a measurement. Enforce that constraint literally: no charge-time number may be published for a Xiaomi/Infinix/Tecno/Oppo handset unless it is bench-tested or carries a named cited source with a URL.

---

## 70. `/soundcore/speakers`

**Problem:** Bluetooth speaker page uses formal MSA in its H1 and barely uses the colloquial terms Egyptians type.

**Verification:** VERIFIED live with minor count corrections. H1 confirmed verbatim: "مكبرات صوت انكر ساوندكور". EN H1 is "Soundcore Speakers" (no "Bluetooth", no "Egypt"). "سماعة بلوتوث" = 0 occurrences, exactly as claimed. The FAQ register contrast is verbatim real: "هل سبيكر انكر بيشتغل مع ايفون 17 وسامسونج S26؟". Count corrections (auditor's figures were slightly low): my rendered-text counts are "بلوتوث" 3 (two of which are global mega-menu items, leaving one in an FAQ answer), "سبيكر" 12, "مكبر" 8 — the direction and the conclusion are unchanged: "بلوتوث" appears essentially once in the page's own body. Title/meta also split registers: "<title>مكبرات صوت انكر ساوندكور ⚡ 4 منتج…" against a meta description that says "قارن سبيكرات ساوندكور…". Fix is a register change only — no fabricated data, no superlative — and the de-cannibalization instruction (use "سبيكر بلوتوث", never "سماعة بلوتوث", to avoid competing with /earbuds and /soundcore/audio) is sound.

---

## 71. `/soundcore/audio`

**Problem:** The "<Category> Model Comparison" table is entirely placeholder — every price cell and every comparison cell is boilerplate.

**Verification:** VERIFIED live and the scale is LARGER than reported. I parsed every <tbody> on my fetches: /soundcore/audio and /en/soundcore/audio each render a 27-row table in which 27/27 price cells read "See product page"/"راجع صفحة المنتج" and 27/27 basis cells read "Specifications & compatibility"/"المواصفات والتوافق". Quoted rows confirmed verbatim: "Soundcore K20i | See product page | Semi-In-Ear | Specifications & compatibility", "Soundcore R50i | See product page | Compact TWS | …", "Soundcore A25i | See product page | 🆕 28h Battery | …". Same 100% placeholder rate measured on every brand+category page fetched (anker/power-banks 9/9, anker/cables 6/6, anker/car-chargers 4/4, joyroom/* 1–4 rows each, soundcore/speakers 4/4). Notably the HUB pages (/chargers, /power-banks, /cables, /earbuds, AR and EN) have 0 placeholder cells — real data is already rendered there, proving the capability exists. The data source also checks out: /api/llms/catalog is live and emits per-SKU "- Price: 2999 EGP" lines. Fix is compliant — it forbids publishing any number that is neither a labelled manufacturer rating nor a labelled CairoVolt bench figure.

---

## 72. `/anker/power-banks`

**Problem:** Both titles repeat the locality token twice, producing an 87-character machine-generated-looking title.

**Verification:** VERIFIED live, exact. EN <title> = "Anker Power Banks in Egypt by Capacity and Output in Egypt ⚡ 12 Products | Prices & COD" — 87 characters after entity-decoding, with "in Egypt" appearing 2×. AR <title> = "باور بانك انكر في مصر حسب السعة والقدرة ⚡ 12 منتج | الأسعار والتوصيل في مصر" with "في مصر" appearing 2×. Root cause confirmed: the H1s are "Anker Power Banks in Egypt by Capacity and Output" / "باور بانك انكر في مصر حسب السعة والقدرة", i.e. the template concatenates an H1 that already carries the locality token with a suffix that carries it again. Fix is compliant (no superlative, no invented data) and the template-level remedy — strip the locality token from the H1 half when the suffix supplies it — is the correct fix rather than a one-page patch. Confirm the same duplication does not exist on sibling pages before shipping the template change.

---

## 73. `/chargers`

**Problem:** The category layer is essentially country-agnostic beyond "Egypt" in titles and the COD line.

**Verification:** VERIFIED live across the 14 EN category/hub pages I fetched, and the pattern holds: "governorate" = 0 on every page; "Sahel|Hurghada|Alexandria" = 0 on all but /en/anker/power-banks (2); "outage" = 0 on all but /en/anker/power-banks (2). Every "Cairo" hit on the other pages is the brand string CairoVolt, not a place. The single locally-framed page is confirmed verbatim: "Regular Cairo day, Hurghada or Sahel trip, or extended power outage — we have the right capacity for every situation." at visible line 295 of 394 = 75% page depth. The proposed shipping figures are verifiable: /shipping renders "🎉 شحن مجاني للطلبات بقيمة 3,700 جنيه أو أكثر!" and "الطلبات أقل من 3,700 جنيه: من 70 إلى 130 جنيه حسب المحافظة". Fix is compliant as written (sourced facts only, nothing asserted that is not already published or citable) but needs one guardrail against creating 22 near-identical blocks.

**Corrected fix:** Add one short Egypt paragraph near the top of each category, but make it CATEGORY-SPECIFIC rather than a repeated boilerplate: power-bank categories get the airline carry-on framing plus the Wh figures already on their cards; charger categories get 220V/50Hz mains and plug type (sourced, per finding #12); car categories get the 12V/24V socket and dashboard-heat framing the /anker/car-chargers copy already uses ("راجع توافق الشاحن مع منفذ السيارة 12V أو 24V… ولا تتركه تحت الشمس المباشرة"); audio categories get commute/heat-and-sweat framing. Cite the delivery band (70–130 ج.م by governorate, free from 3,700 ج.م) to /shipping and place it in ONE shared component, not duplicated as prose on 22 pages. Attribute Cairo ambient-temperature figures to a named third party with a URL; assert no figure not already published on the site or citable.

---
