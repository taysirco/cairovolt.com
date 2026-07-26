# CairoVolt Category Layer — Prioritised Content Action Plan
**Prepared 2026-07-26. All headline findings below were re-fetched live today** (`curl -s -m 40 "https://cairovolt.com<PATH>?cb=audit"`) and re-counted before writing; where a number appears, it was measured on today's HTML unless flagged as judgement.

---

## The single highest-leverage change

**Rebuild the shared "Model Comparison" table component so it is generated from the same product array that renders the grid, with live price and two real spec columns — and delete every hand-typed row.** This one component is the highest-value target on the whole category layer for four reasons that stack: (1) it is *the* element an answer engine lifts, and it is currently 100% empty — I counted `راجع صفحة المنتج` **10 times on /anker/power-banks** and **30 times on /soundcore/audio** today, with every "comparison basis" cell reading `المواصفات والتوافق`; (2) because rows are free-typed rather than bound to the catalogue, they publish *false* facts — `ساوندكور C40i | راجع صفحة المنتج | ANC مفتوح` renders today while the C40i product page states "No. It is an open-ear model without ANC", and /chargers still renders rows for `انكر 735`, `انكر 521 40W`, `انكر 312`, `جوي روم 33W` (2 occurrences each, AR+EN) — four models the store does not sell; (3) the tables contain **zero `<a>` elements**, so the densest block of model names on each page passes no internal link equity; (4) it is one component, so a single fix lands on ~20 URLs × 2 locales at once. Done looks like: no cell in any category table contains the string `راجع صفحة المنتج` / `See product page`, every model name is an anchor to its own product URL (lower-case brand segment), every price cell renders from the live price field, and a build-time assertion fails if any table row's SKU is not present in that page's ItemList.

---

## Theme 1 — Truthfulness and phantom SKUs (do before anything gets promoted into structured data)

These are correctness defects, not optimisation. Every one publishes a claim CairoVolt's own pages contradict.

**/soundcore/audio + /en/soundcore/audio.** Remove `R50i NC`, `Life Note 3` / `P3` and the `anker r50i nc` / `anker r100` keyword tokens from the meta descriptions, the two FAQs, the guide bullet and the table (`R50i NC` = 18 occurrences in the HTML; the page links 27 product URLs and none is `r50i-nc`). Replace with stocked models: R50i, P40i, Liberty 4 NC, A30i, Q30. Add the missing **Life P2i** row so all 27 stocked SKUs appear. Fix the C40i row to `بدون ANC — تصميم مفتوح` and the P41i row to the card's own spec (`Adaptive ANC | 11mm BassUp | 192h | 3,000mAh case`) — `XBS` appears 6 times on this page and nowhere else on the site. *Done:* zero occurrences of `R50i NC`, `Life Note 3`, `XBS`; 27 table rows = 27 grid SKUs.

**/earbuds + /en/earbuds.** A card advertises "سماعة ساوندكور R50i NC موديل A3959" with `href="/Soundcore/audio/anker-soundcore-r50i-nc"` (verified live today) which `curl -L` resolves to **soundcore-p30i-earbuds** — a different product. Either drop the card (and its 42dB ANC bullet with it) or point it at the real SKU; fix the capital-`S` segment either way.

**/joyroom/smart-watches + /en.** The grid holds one product (`joyroom-ft3-smartwatch`, 1,092 ج.م) while the page renders `FT5` **20 times** and `FC2` **8 times** today, including a three-column comparison table and a `FT3 Pro vs FT5` FAQ. Delete every FT5 / FC2 / "FT3 Pro" reference from the guide, both tables, the FAQ and the HowTo JSON-LD; rebuild as a single-model spec sheet for the JR-FT3 from its own product page. **Do not** add a second comparison column — there is no Anker or Soundcore smartwatch in the catalogue.

**/chargers + /en/chargers.** Rebuild the four phantom rows (735 / 521 40W / 312 / Joyroom 33W) from the actual grid — the "521" hit is especially bad because the only 521 on the site is a **256Wh AC power station**, not a 40W wall charger. Three of seven rows (Joyroom 20W, Anker Nano 20W, Anker 511 30W) already map to stock and can stay.

**/joyroom/cables + /en.** Delete the S-M411 bullet (the 11 stocked MPNs are JR-S-CL20, JR-S-AL24, JR-S-CL30B, JR-S-CC100 …). For the "Type-C 100W للابتوب" bullet and the `جوي روم 100W Type-C` row, **do not just delete** — replace with CairoVolt's own published position on JR-S-CC100: the box markets 100W, the bench found no E-marker and a 57.9W ceiling, so it is a ~60W/3A-class cable and must not be recommended for laptop charging. Also rewrite the FAQ `⚠️ ليه كابل جوي روم أحسن من كابل أبل الأصلي؟` — a comparative-superiority claim that breaches the editorial rules — as `إيه الفرق بين كابل جوي روم وكابل أبل الأصلي؟` with an attribute-only answer.

**/anker/car-chargers + /en.** The FAQ answers the S26 Ultra question with "موديل 323 بقدرة 52W" — no such SKU. Rewrite using only figures on the two product pages: A2741 has USB-C PD with PPS (measured peak 29.3W on USB-C); A2732 is 35W *shared across two ports*, 19.8W peak on USB-C, no PPS. **Never describe the A2732 USB-C port as 35W** — that is the combined figure.

**/joyroom/car-accessories + /en.** Three table rows name models that match none of the three grid SKUs (JR-CCL05 69W / JR-ZS295 / ZS290 at 513 / 169 / 934 ج.م). Rebuild to real SKUs with links. The "60W" charger is a *real* SKU in a sibling category — but its MPN identity (JR-CL26) is still flagged unverified pending the owner's physical check, so cross-link it with **no wattage-per-port claim**.

**/en/joyroom/wall-chargers + /joyroom.** Delete the `Joyroom 35W GaN Dual` and `Joyroom 65W Laptop Charger` rows and the `20W or 35W?` / `20W, 35W, 65W` guide+FAQ blocks — the page states "4 products, EGP 236–1,206" and `35`, `65`, `GaN` return 0 on the /joyroom hub. If no stocked SKU declares GaN, remove "GaN" from the subtitle rather than keeping a comparison the range can't support.

**/joyroom/power-banks (AR).** The table calls the 10,000mAh SKU "22.5W" while its own card says `خرج قياسي 5V/2.1A`, and invents a "Pro" suffix on the 20,000. Also drop `الفئة الاقتصادية (منقذ الطلبة)` from the 1,624 ج.م title — the 20,000mAh unit sits three cards above at 997 ج.م. State the only differentiator the page's data supports (listed 16.2mm thickness); **do not** claim display or port count as advantages of the pricier unit — the 20,000 has both.

**/anker hub count.** Title and meta say `35 منتج`; the child grids and `/api/llms/catalog` both total **33** (33+24+31 = 88, matching `llms.txt`). Derive the count from the catalogue query.

**/anker/power-banks — the safety item.** `استدعاء` and `CPSC` return **0 occurrences** on this page today, while the A1263 card is rendered and its product page opens with the June 2025 CPSC recall notice and the `anker.com/a1263-recall` URL. Surface a short recall flag on the browse card. This is the highest-consequence single line in the plan.

---

## Theme 2 — AEO structure (cheap, mechanical, big machine-readability payoff)

**FAQPage JSON-LD on all 22 categories × 2 locales.** `FAQPage` = 0 on every category document I fetched today (re-confirmed on /anker/power-banks, /soundcore/audio, /earbuds, /joyroom/smart-watches, /chargers); `/en/faq` emits 2, proving the serialiser exists. Generate `mainEntity` **from the same source array that renders the `<details>` accordion** so drift is structurally impossible. Two gates before shipping: no answer over 50 words, and no question carrying a superiority claim (the Joyroom cables FAQ above must be fixed *first* — do not promote an error into structured data). **Be honest with the owner about the payoff:** Google has not shown FAQ rich results for commercial sites since Aug 2023, so this is an AI/agent-extraction win, not a SERP-snippet win.

**Answer the price FAQs.** `/power-banks` asks `كم سعر باور بانك 20000 في مصر؟` and answers with nothing, while the grid above renders 850–5,900 ج.م. Same pattern on /cables, /earbuds, /joyroom/car-holders, /joyroom/car-chargers, /joyroom/smart-watches. Inject the **template-computed** range (never hardcoded — the auditor's own quoted /earbuds prices were stale within one fetch), keep `الدفع عند الاستلام`, keep the volatility caveat, stay under 50 words.

**Answer-first blocks.** On the 15 brand+category pages the descriptive paragraph sits below the grid and the FAQ. Move it directly under the H1. Verify on one page before rolling out — grid and trust chips are shared components. (I am *not* quoting depth percentages: they vary by DOM segmentation and are not reproducible.)

**Cheap render fixes with outsized agent impact:**
- Markdown twin of `/joyroom/car-accessories` returns `## Products (0)` in both locales while the HTML lists 3. Fix the generator and add a build-time invariant: markdown product count == HTML `ItemList.numberOfItems` for every category.
- Markdown tables are emitted on a single physical line (header + separator + all rows joined) — unparseable. Emit newlines.
- Raw markdown leaks into HowTo JSON-LD (`\n- **10,000 مللي أمبير:**`, `[كابلات انكر](/anker/cables)`). Strip before serialising.
- `/en/anker` and `/en/joyroom` markdown twins serve a `## Quick answer` block that exists nowhere in the HTML — that is markup-only content. Render it visibly or stop serving it.
- Add a `## Category Hubs` section to `llms.txt` listing all 22 category URLs; the file currently lists only 3 brand hubs while claiming category hubs return rich content.
- Move the quick-answer, FAQ and comparison table above the Suspense boundary on `/anker/power-banks` so they land inside `<main>` in the first byte stream. **Medium, not high** — the content *is* in the same response and a plain tag-stripper recovers it; only an extractor that scopes to `<main>` *and* honours `hidden` sees nothing.

**Relabel the fake lab blocks.** `/en/anker` renders `<strong>Straight from the Lab:</strong>` over pure selection advice with no measurement; `/joyroom` renders `مباشرة من المعمل:`; `/anker` renders the non-idiomatic `في الجون:`. Standardise all three to `باختصار:` / `In short:`, matching `/soundcore` and `/en/soundcore` which already do this. Reserve "lab / معمل / bench" strictly for blocks carrying a real CairoVolt bench figure with a sample ID. This is a one-word change with a direct E-E-A-T payoff given the real bench programme.

---

## Theme 3 — Surface the bench data (the only true differentiator)

`curl -H "Accept: text/markdown" /en/anker/power-banks` returns **12 `Lab:` lines** — e.g. "A110D delivered 31.1Wh usable (84.1% of 37Wh)", "A1260 delivered 61.4Wh usable (85.3% of 72Wh)" — while the HTML of the same URL contains **zero** occurrences of "Wh usable" or "bench". First-party measured data, already written, already published on one surface, invisible on the other.

Surface the one-line lab verdict on the HTML card and in the comparison table for the **11 models that have a published bench sheet only**. Guards: never let an `est.` figure inherit measured styling; show the A1263 recall status adjacent to its lab line, not buried; add **no** Review or AggregateRating JSON-LD alongside (merchant-policy rule, non-negotiable).

Related: build the capacity table `/anker/power-banks` promises twice and never delivers (`راجع جدول السعات في دليل الشراء بالأسفل`). Every input already renders on the page — 37Wh, 72Wh, 74Wh, 86.4Wh, 90Wh, 94.72Wh, 256Wh. Phone-charge columns must read `est.` with the divisor visible. Where a bench sheet exists, use the measured usable-Wh instead of the estimate. If the table isn't built this cycle, **delete both forward references** rather than leaving the broken promise. Also delete the unsourced `سرعات تصل لـ 250 وات` Prime claim (highest listed output on the page is 200W) and restore the missing Series 7 bullet using the page's own A1289011 / 140W wording.

---

## Theme 4 — Egypt specificity (the biggest genuine content gap)

Measured on rendered visible text: on `/anker` and `/joyroom`, `القاهرة` = 0, `الإسكندرية` = 0, `محافظ` = 0, and the single `الدفع عند الاستلام` hit is the sitewide footer. Across the 14 EN category pages, `governorate` = 0 everywhere.

**Do:** add one short Egypt paragraph per category, sourced only to `/shipping` (which already publishes ✓القاهرة ✓الجيزة ✓الإسكندرية ✓الدلتا ✓الصعيد ✓البحر الأحمر, 70–130 ج.م by governorate, free ≥3,700 ج.م). Put it in **one shared component**, not 22 hand-written prose blocks, and make the *category-specific* half vary: power banks get the airline Wh framing, chargers get 220V/50Hz + plug type, car categories get the 12V/24V + dashboard-heat framing already in the /anker/car-chargers copy, audio gets commute/heat. Do **not** copy delivery-day estimates into hubs (they go stale on the policy page).

**The single most useful Egypt fix: state the airline watt-hour threshold.** `/power-banks` invokes airline rules five times (`قواعد شركة الطيران` ×3 plus `حدود شركة الطيران`) and states no number — while `100Wh` and `160Wh` return 0 and a **256Wh** power station is listed. Add the IATA/ICAO bands with a named source and live URL and an "as published at time of writing" date, state that the operating carrier's rules govern, and map the page's own printed Wh values against it (37 / 72 / 74 / 86.4 / 90 / 94.72Wh under; the 521 station does not fly). For in-flight-**use** bans, cite each carrier's own policy page individually (Emirates and flydubai, effective 1 Oct 2025) — never a blanket claim about "airlines serving Cairo".

**`/chargers` mains block.** `220` = 0, `فيشة` = 0, `بريزة` = 0 on the whole page. Add a short `الشحن في مصر: 220 فولت والقابس` block citing a named source (IEC World Plugs) for 220V/50Hz on Type C/F. **Do not** assert "every charger here accepts 100–240V" — only the Joyroom 30W card prints that range today. Name only foldable-plug models actually on the page (Anker Zolo A2698, Nano 45W A121D); drop A1637, which returns 0 occurrences.

**Reject:** the "covers a phone through a scheduled grid outage" line and any load-shedding schedule. That is an unsourced factual claim about Egypt that no CairoVolt page supports. Use a neutral usage line — "a long commute or a full day out of reach of a socket".

---

## Theme 5 — Cannibalisation

**Real and worth fixing:**
- `/earbuds` vs `/soundcore/audio`: `/en/earbuds` links 30 product URLs, `/en/soundcore/audio` links 27, overlap **27/27 = 100%**; 58 of the brand page's 95 substantive lines and **1,131 of 1,841 words (61%)** are duplicated. Strip the exhaustive grid from `/earbuds` and rebuild it as a cross-brand decision layer (Soundcore vs Joyroom on ANC type, codec, driver size, listed battery, price band) plus 6–8 need-based cards deep-linking into the brand pages. Label them `مناسبة لـ / suited to`, **not** `أفضل اختيار / top pick`.
- Hub vs blog title collisions. `/earbuds` = `دليل أفضل سماعات بلوتوث في مصر…` vs `/blog/best-bluetooth-earbuds-egypt-2026` = `أفضل سماعات بلوتوث في مصر…`; `/power-banks` = `دليل أفضل باور بانك في مصر | انكر وجوي روم…` vs the equivalent blog. Both hub titles also carry the banned `أفضل`, so the rewrite is mandatory on editorial grounds regardless of the SEO argument. Ship **one** title per URL: `/power-banks` → `باور بانك في مصر: مقارنة بالواط/ساعة والقدرة والوزن | كايرو فولت` (this supersedes the branded alternative — do not reintroduce `انكر وجوي روم`, which re-creates the brand-page conflict). Hand brand terms down via named intro links. Same treatment for the H2s: `أفضل باور بانك 10000 مللي أمبير في مصر` → `اختيار باور بانك 10000 مللي أمبير في مصر`; `أفضل سماعات بإلغاء ضوضاء (ANC) في مصر` → spec-anchored; `Contact us on WhatsApp for the best deals` → `…about availability`.
- **Check GSC first** on any URL with proven impressions before rewriting a long metaTitle — the standing rule against mass-editing SERP-proven titles still applies. These are targeted single-page edits, not a sweep.

**Re-filed, not cannibalisation:** `/anker/wall-chargers` vs `/joyroom/wall-chargers` are near-identical templates, but they target different brand head terms and cannot compete for the same query. Treat as thin differentiation: give Anker (10 SKUs, 20W–100W) a multi-port-sharing and GaN-size angle, Joyroom (4 SKUs) a 20–30W + 3-in-1 wireless-station angle.

---

## Theme 6 — Keywords and titles (surgical only)

- **Geo duplication, template bug, 4 titles.** `/en/anker/power-banks` = `Anker Power Banks in Egypt by Capacity and Output in Egypt ⚡ 12 Products | Prices & COD` — **87 chars, "in Egypt" at positions 19 and 50**; `/en/joyroom/power-banks` = 88 chars. The EN suffix is `| Prices & COD` and carries **no** locale, so keep exactly one "in Egypt": `Joyroom Power Banks in Egypt ⚡ 3 Models by Capacity & Output | Prices & COD` (75). The AR suffix *does* supply `في مصر`, so strip the leading one there.
- **Arabic counter grammar.** 3–10 takes plural `منتجات`; 11+ takes `منتجًا`. Fix `3 منتج` → `3 منتجات`; leave `12 منتج`/`27 منتج` alone except to correct to `منتجًا`. Also branch the single-product template so `/joyroom/smart-watches` stops printing `من ١٬٠٩٢ ج.م. إلى ١٬٠٩٢ ج.م.`
- **Head terms missing from the pages that stock the products.** `/soundcore/audio` never uses `سماعات بلوتوث` / "Bluetooth earbuds" in body copy (only the global footer nav); add it once in the opening paragraph, brand-qualified (`سماعات بلوتوث ساوندكور الأصلية في مصر`) so it does not collide with `/earbuds`, whose H1 already owns the bare term. `/earbuds` stocks six 40mm over-ear models but `سماعات راس` = 0 and `هيدفون` = 1 (inside a card) — add one spec-anchored over-ear H2, written from the four models the **AR** grid actually shows on first paginated render (Q20i, Q11i, Life Q20, Q30). `/soundcore/speakers` H1 is formal `مكبرات صوت` while the body uses `سبيكر` 12× — switch to `سبيكرات بلوتوث انكر ساوندكور`, and use `سبيكر بلوتوث`, never `سماعة بلوتوث`, to avoid competing with /earbuds.
- **`/joyroom` Arabic brand spelling.** Latin "Joyroom" appears 8× in visible text — the H2 `اختر قسم منتجات Joyroom الذي يحل احتياجك` and all seven CTA anchors — against `جوي روم` 56×. `/anker` gets this right (Latin "Anker" = 0). Pure copy replacement; match the card headings (`تصفّح حوامل سيارة جوي روم`).
- **`/en/joyroom/cables` title/H1.** Currently `Joyroom Cables (Auto-Disconnect Tech)` — a feature attributed to a model not sold. Change to `Joyroom Charging Cables in Egypt — USB-C, Lightning, 20W–100W ⚡ 11 Products | COD`; note the range is 20W–**100W** nominal (JR-S-CC100 is a listed 100W part) but the body must carry the store's own measured caveat from Theme 1.

---

## Theme 7 — Internal linking (all cheap, all mechanical)

1. **Lower-case the brand segment** in the hub href helper. Measured capitalised anchors that 301: `/power-banks` 18, `/en/power-banks` 18, `/earbuds` 32, `/en/earbuds` 32, `/chargers` 17, `/cables` 19. Ship this **before** adding new links so they don't inherit the hop.
2. **Locale-resolve category copy links at the renderer.** `/en/soundcore/audio` emits English anchors to `/soundcore`, `/anker/cables`, `/anker/power-banks`, `/soundcore/speakers`; same defect on `/en/soundcore/speakers` and `/en/joyroom/car-chargers`. Fix once in the renderer, not per string.
3. **The editorial bodies are link-dead.** Slicing from the editorial heading onward: `/power-banks` → 4 links, all blog; `/chargers` → 4; `/cables` → 3. Link model names in the (newly populated) tables, link the first mention of each sibling category, and turn `باور بانك انكر` / `باور بانك جوي روم` in the PD paragraph into real anchors.
4. **Blog links.** Zero `/blog/<slug>` links in any category body across all pages checked. Add 2–3 per category to articles verified live at 200 — e.g. `/soundcore/audio` → `airpods-pro-3-vs-soundcore-liberty-4-nc`, `anc-vs-enc-vs-transparency-mode-difference`, `soundcore-models-guide-egypt-2026`; `/soundcore/speakers` → `anker-soundcore-vs-jbl-vs-bose-speakers-egypt` from the JBL FAQ.
5. **Orphan:** `/anker/accessories` is in the sitemap but `anker/accessories` returns 0 matches in `/anker` and `/en/anker` HTML. Add it to the hub carousel or fold the single SKU elsewhere.
6. **Data gap:** `anker-zolo-a1681-20000` is carded on `/power-banks` but absent from `/anker/power-banks`, which titles itself "12 Products" while the hub shows 13 Anker banks. Fix the collection predicate. Conversely `/chargers` cards the same Nano 45W twice (`anker-nano-45w-1c-pd` redirects to `anker-nano-45w`) — de-duplicate.

---

## Do first (cheap, high impact — one sprint)

Brand-segment lower-casing · locale-prefix fix at the renderer · the three quick-answer label changes · Arabic counter grammar + single-product price range · the four duplicated-geo titles · FAQPage JSON-LD from the existing accordion source · markdown newline + markdown-in-JSON-LD strip + car-accessories zero-product bug · price-FAQ range injection · phantom-SKU deletions (they are deletions, not authoring) · A1263 recall flag on the browse card · `/joyroom` Latin brand spelling · superlative removal in titles/H2s/CTA.

## Bigger content investment (schedule deliberately)

Comparison-table component rebuild with live price binding and link-per-row · surfacing the 11 bench verdicts into HTML · the `/anker/power-banks` capacity table with `est.` discipline · the `/earbuds` → decision-layer restructure and the 27-card de-duplication · the per-category Egypt block plus the sourced airline-Wh and 220V blocks · answer-first reordering across 15 pages · per-brand differentiation copy for the wall-charger pair · the Joyroom 69W distribution table (needs the printed table read off physical stock — if it can't be read, publish only USB-A 2.4A / USB-C 3A and say plainly which combinations the manufacturer does not publish).

---

## Explicitly NOT recommended

- **Any fabricated or estimated measurement to fill a table cell.** Where a manufacturer does not publish clamp width, phone weight limit, magnet holding force, charging time, strap width or case diameter, print `غير معلن من الشركة`. `est.` is for calculated energy figures with the formula shown — never for physical dimensions we simply have not sourced.
- **The A2732-as-35W-USB-C wording** proposed by the audit. CairoVolt's own product page publishes 19.8W peak on USB-C, no PPS. Shipping 35W would publish a false spec.
- **The Liberty 4 Pro = 4,700 ج.م and P20i = 774 ج.م figures** in the /earbuds table proposal. Live cards read **5,830 ج.م** and **699 ج.م**; 4,700 belongs to a different over-ear model and 774 is the Joyroom JR-T03. Bind to the live price field; hardcode nothing (the price footprint already spans ~20 places).
- **Badging Liberty 4 Pro as over-ear.** Its own card reads `ACAA 10.5mm+4.6mm Coaxial Dual Driver`; it is TWS in-ear. Only Q20i, Space Q45 and Space One get the new `هيدفون` badge.
- **A second comparison column on /joyroom/smart-watches.** No Anker or Soundcore smartwatch exists to compare against.
- **The grid-outage / load-shedding sentence** on brand hubs — unsourced factual claim about Egypt.
- **"Every charger here accepts 100–240V"** — only one card prints that range today.
- **Cross-canonicalising /joyroom/car-chargers** into /joyroom/car-accessories. The canonical layer is clean (620 self-canonical URLs); de-indexing a live page over a one-SKU condition that changes the moment a second charger is stocked is not worth it. Take the retitle branch only.
- **Selling FAQPage as a rich-snippet win.** Google restricted FAQ rich results to government/health sites in Aug 2023. The payoff is agent extraction.
- **Any Review or AggregateRating JSON-LD**, any "أفضل / Best / #1 / أرخص", any claim of authorised-distributor status, and any restatement of specs for the Joyroom 60W car charger while its JR-CL26 MPN identity is unverified.
- **A mass metaTitle sweep.** Only the ~8 titles named above change; the 175 long-but-SERP-proven titles stay, and even the named ones get a GSC check first.

---

## Measured vs judgement

**Measured today, verbatim or by count:** the placeholder-cell counts (10 / 30), `FAQPage` = 0 on all five pages fetched, `استدعاء`/`CPSC` = 0 on /anker/power-banks with the A1263 card present, the `ساوندكور C40i | راجع صفحة المنتج | ANC مفتوح` and `ساوندكور P41i | … | 60h + XBS` rows, `href="/Soundcore/audio/anker-soundcore-r50i-nc"`, FT5 ×20 / FC2 ×8 / FT3 ×26 on the smart-watch page, and the four phantom charger rows ×2 locales. The 87/88-char titles, the 27/27 product overlap, the 61% duplicate-word figure, the capitalised-anchor counts and the 12 `Lab:` lines in the markdown twin are measured from the verified-findings pass, not re-measured today.

**Judgement, not measurement:** that the comparison table is the single highest-leverage target (a reasoned ranking of confirmed defects by blast radius × extraction value, not an observed traffic effect); that Egypt specificity will convert better than it currently does; that colloquial variants like `بور بانك`, `سبيكر`, `عربية`, `ستاند` reflect real Egyptian query phrasing — no volume data was pulled, so treat those as phrasing hypotheses, cheap to add and cheap to reverse. Depth percentages for below-the-fold copy are deliberately omitted as non-reproducible. CrUX still has no field data, so nothing here is justified on performance grounds.