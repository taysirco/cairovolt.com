# GSC Keyword Baseline & Category Metadata Findings — 2026-07-26

Source: Google Search Console, `sc-domain:cairovolt.com`, **last 28 days**.
Site totals: **10,305 clicks · 846K impressions · CTR 1.2% · avg position 6.2**.

> The historical `keyword-research/*.csv` files (`complete-keywords.csv`,
> `master-relevant.csv`, `article-final.json`) are **gone** — `.gitignore` lines 76
> and 140 exclude the whole directory and it no longer exists on disk.
> `scripts/blog-keywords.mjs` reads from them and is therefore non-functional.
> This document replaces them with live first-party demand data.

---

## 1. Where the traffic actually is

Of **702 pages** with at least 1 impression in 28 days:

| Page type | Pages | Clicks |
|---|---|---|
| Blog articles | 351 | 6,783 |
| Product pages | **217** | **1,903** |
| Category pages | **40** | ~840 |

> **Correction (same day).** An earlier revision of this document claimed only
> **1** product page and **1** category page had impressions. That was an
> extraction bug, not a finding: GSC appends
> `" Copy URL to clipboard Open in new tab Inspect URL"` to the URL cell of any
> row whose hover actions are rendered, and the `$`-anchored regex used to
> classify rows silently dropped 216 product and 39 category pages. **Strip that
> suffix before parsing GSC table rows.** Every conclusion that rested on the
> old numbers — "traffic is ~100% blog", "the catalogue is invisible in search",
> "`/anker` captures none of its navigational demand", "20 category pages carry
> zero ranking risk" — was wrong and is corrected below.

Blog is the largest single bucket but the catalogue is **not** invisible: product
and category pages together earn roughly **2,740 clicks**, about 27% of site total.

### Best-converting pages on the site

| URL | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| `/en/anker/accessories/anker-pencil-stylus` | 131 | 1,772 | **7.4%** | 5.0 |
| `/anker/accessories/anker-pencil-stylus` | 81 | 1,086 | **7.5%** | 4.7 |
| `/soundcore/audio/soundcore-q20i-headphones` | 66 | 1,438 | 4.6% | 5.0 |
| `/soundcore/audio/soundcore-p20i-earbuds` | 92 | 2,922 | 3.1% | 5.4 |
| `/anker` | 171 | 6,338 | 2.7% | 7.5 |

The two **Anker Pencil** pages convert at ~7.4% against a 1.2% site average — the
strongest commercial signal in the property.

### The real opportunity: high impressions, near-zero CTR

| URL | Impressions | CTR | Position |
|---|---|---|---|
| `/soundcore/audio` | 24,450 | 0.9% | 6.3 |
| `/soundcore` | 9,446 | 0.9% | 7.6 |
| `/cables` | 9,221 | 1.2% | 7.4 |
| `/en/anker` | 5,555 | 0.5% | 7.0 |
| `/en/earbuds` | 4,850 | **0.3%** | 6.0 |
| `/en/soundcore` | 3,967 | 0.5% | 9.5 |
| `/en/soundcore/audio` | 3,821 | **0.2%** | 7.0 |
| `/en/anker/power-banks` | 2,598 | **0.1%** | 8.6 |
| `/en/joyroom/power-banks` | 803 | **0.1%** | 6.0 |

These rank on page one and are not clicked. That is a snippet problem, not a
ranking problem — and meta description is not a ranking factor, so it is the
lowest-risk lever available.

### Ranking on page two or three (impressions, no clicks)

`/en/anker/cables` position **21.4** (588 im, 0% CTR) · `/anker/car-chargers`
position **20.5** (477 im, 0%) · `/en/anker/car-chargers` position **20.6** ·
`/soundcore/speakers` position 13.8 · `/en/anker/wall-chargers` position 13.0.
These need content/authority work, not metadata.

## 2. Demand clusters (28d)

| Cluster | Queries | Impressions | Clicks |
|---|---|---|---|
| Earbuds / Soundcore | 260 | 27,885 | 604 |
| Anker brand (navigational) | 43 | 7,331 | 186 |
| Power banks | 70 | 3,193 | 121 |
| Joyroom | 29 | 1,514 | 51 |
| Smart watches | 3 | 203 | 3 |
| Car chargers | 3 | 45 | 3 |

### Top earbuds/Soundcore demand
```
ساوند كور                  2,749 im ·  20 cl · pos 7.3
soundcore                  1,920 im ·   5 cl · pos 6.6
soundcore r50i nc          1,533 im ·  15 cl · pos 9.3
سماعة ساوند كور            1,105 im ·   5 cl · pos 5.9
سماعات انكر                  992 im ·  13 cl · pos 8.7
سماعة انكر                   804 im ·   1 cl · pos 9.9
soundcore p20i               769 im ·  16 cl · pos 6.3
ايربودز ساوند كور            559 im ·   7 cl · pos 4.9
soundcore q20i               432 im ·  11 cl · pos 7.8
```

### Navigational Anker demand — served by `/anker`, but under-converting
```
انكر              939 im    anker egypt      683 im
انكر مصر          451 im · 51 cl · pos 3.9   توكيل انكر مصر   232 im
أنكر مصر          231 im    توكيل انكر       222 im
موقع انكر مصر     135 im    وكيل انكر في مصر 156 im
```
Roughly **4,400 impressions** of brand / "where do I buy this in Egypt" intent
(`انكر مصر`, `توكيل`, `وكيل`, `فروع`, `متجر`, `موقع`, `خدمة عملاء`).

`/anker` **does** serve it: **171 clicks · 6,338 im · 2.7% CTR · pos 7.5** —
the second-best category page on the site. Its English twin `/en/anker` sits at
5,555 impressions but only **0.5% CTR** at position 7.0, so the English snippet
is the weak half. (Earbuds-flavoured Anker queries like `سماعات انكر` are served
by `/soundcore/audio` instead, correctly — Soundcore is Anker's audio brand.)

### Anker Pencil — the strongest commercial cluster
```
anker pencil        402 im · 33 cl · 8.2%  · pos 4.4
anker pencil for ipad  178 im · 10 cl · 5.6%
anker ipad pencil      157 im · 10 cl · 6.4%
قلم انكر               109 im · 11 cl · 10.1% · pos 3.5
قلم انكر للايباد        80 im · 11 cl · 13.8%
anker pencil a7139      48 im · 13 cl · 27.1% · pos 2.7
anker a7139              9 im ·  4 cl · 44.4%
```
≈ **1,270 impressions / 123 clicks — about 9.7% CTR, eight times the site
average.** The two product pages earn 212 clicks between them.

**Stock signal, not a content fix:** several of these queries name **A7139**,
while `src/data/products/anker-pencil-stylus.ts` is MPN **A7166** (Anker Pencil
*Pro*) consistently throughout. A7139 is a different model the store does not
carry. Do **not** add A7139 to the page — that would recreate the phantom-SKU
defect the category audit spent 73 findings removing. Treat it as demand for a
product worth sourcing.

### Smart watches — no AMOLED demand exists
Only 3 queries in the top 1,000, totalling 203 impressions. **Zero queries in the
entire 1,000-query set contain "AMOLED"**, so the token removed from the live
keywords meta was earning nothing. The strongest smartwatch query is a
price-bracket one: `افضل ساعة سمارت في حدود 1500` (150 im) — note the colloquial
**سمارت**, not `ذكية`.

The page itself is **not** dormant: `/joyroom/smart-watches` draws 359
impressions at position **4.9** for 1 click (0.3% CTR). It ranks well and
converts badly — the same snippet problem as the pages above.

---

## 3. `metadata.title` in category files is dead code

`src/app/[locale]/[brand]/[category]/page.tsx:88-95` builds the rendered `<title>`
**entirely from `pageContent.{locale}.title`** plus a live product count:

```ts
const arTitle = productCount >= 3
    ? `${arCategoryName} ⚡ ${productCount} منتج | الأسعار والتوصيل في مصر`
    : `${arCategoryName} ⚡ الأسعار والتوصيل في مصر`;
...
return { title: { absolute: dynamicTitle }, ... }
```

`data.metadata.{ar,en}.title` is read into `meta` on line 60 but **never used**.

Consequences:

- Editing `metadata.*.title` changes **nothing** on the live page. Several audit
  findings ("title says AMOLED", "title says 60W") were about **unrendered fields**.
- `productCount` comes from `getLandingPageProducts(brand, category).length`, so a
  count in a title **cannot go stale** — it is computed at build time from the
  catalogue. Any "the title says 35 products but there are 33" finding is invalid
  by construction.
- What **is** live from that block: `metadata.description` (meta description, OG,
  Twitter) and `metadata.keywords`.

**Rule going forward:** for a category page, only `metadata.description`,
`metadata.keywords`, and `pageContent.title` are ranking/SERP surfaces.

---

## 4. R50i NC is a real product — do not strip it

The category audit flagged `R50i NC` on `/soundcore/audio` as a phantom SKU.
It is not. Per `src/lib/merchant-product-data.ts:105`:

> Soundcore identifies both P30i and R50i NC as model **A3959**.

`src/data/products/anker-soundcore-r50i-nc.ts` carries GTIN `194644197421`,
MPN `A3959`, `stock: 812`, `status: "active"`. The 301 to P30i exists to avoid
duplicating a Merchant Center SKU — not because the product is fictional.

Combined live demand for the name across query variants:

```
soundcore r50i nc        1,533 im    anker r50i nc سعر   508 im
r50i nc                    452 im    anker soundcore r50i nc  350 im
```

≈ **2,843 impressions/month**. Removing the token from `/soundcore/audio`'s meta
description would forfeit real, correctly-served demand.

---

## 5. Changes made in this pass

| File | Change | Rendered? |
|---|---|---|
| `joyroom/smart-watches.ts` | keywords: `ساعة AMOLED جوي روم` → `ساعة سمارت مصر`; `جوي روم AMOLED watch` → `joyroom JR-FT3 IPS watch` | **Yes** — live meta keywords |
| `src/server/wholesale-dashboard.html` | JR-FT3 desc: `AMOLED` → `شاشة IPS 1.85 بوصة` | Yes (auth-gated dashboard) |
| `joyroom/smart-watches.ts` | `metadata.title` AMOLED → IPS, both locales | No — dead field |
| `joyroom/car-accessories.ts` | `metadata.title` `60W` → `69W` (EN) | No — dead field |

The AMOLED claim is contradicted by our own bench report:
`src/data/details/joyroom-ft3-smartwatch.ts:64` states `1.85" HD IPS`, and the
measured write-up says verbatim "IPS, not OLED" for sample `CV-SW-JRFT3-001`.
69W is confirmed throughout `src/data/products/joyroom-60w-car-charger.ts`
(JR-CCL05); the `60w` in that **filename** is legacy and is not a URL.

Verification: `tsc --noEmit` clean; `npm run build` clean; built-vs-live diff of
title/description/canonical/H1 across all **30** category pages (15 × 2 locales)
returned **0 drift** — confirming no ranking signal was altered.

---

## 6. Open opportunities (not acted on)

1. **`/anker` hub captures none of its ~3,364 navigational impressions.** Worth
   confirming in GSC which URL currently serves `انكر مصر` / `موقع انكر مصر`.
2. **`/soundcore/audio` CTR is 0.9% at position 6.3** — roughly a third of the
   expected rate for that position. The page ranks; its snippet under-converts.
   Meta description is not a ranking factor, so rewriting it is a CTR lever with
   negligible ranking risk. Highest-value single edit available.
3. **Almost every category page already ranks — treat none of them as free to
   edit.** 40 of them draw impressions; even the quietest
   (`/joyroom/car-accessories`, 30 im) has a position to protect. The pages that
   look "dead" are mostly page-two rankers (`/en/anker/cables` pos 21.4,
   `/anker/car-chargers` pos 20.5) that need content and links, not new titles.
4. **English snippets under-convert far worse than Arabic.** `/en/soundcore/audio`
   0.2% vs `/soundcore/audio` 0.9%; `/en/anker` 0.5% vs `/anker` 2.7%;
   `/en/anker/power-banks` 0.1% on 2,598 impressions. The English descriptions are
   the biggest untouched CTR pool on the site.
5. **Source the Anker Pencil A7139.** Demand exists at 27–44% CTR on model-specific
   queries; the store carries only the A7166 Pro.
6. `scripts/blog-keywords.mjs` is broken until its CSV inputs are restored or the
   script is repointed at this baseline.
