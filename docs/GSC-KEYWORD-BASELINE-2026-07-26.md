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

Of **702 pages** with ≥1 impression in 28 days:

| Page type | Pages with impressions |
|---|---|
| Blog articles | **351** |
| Product pages | **1** |
| Category pages | **1** |

**The site's organic traffic is essentially 100% blog.** Twenty of the twenty-two
category pages and virtually the entire product catalogue are invisible in search.

The two exceptions:

| URL | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| `/soundcore/audio` | 227 | 24,450 | 0.9% | 6.3 |
| `/soundcore/audio/anker-soundcore-r50i-nc` | 216 | 14,294 | 1.5% | 7.6 |

Note the second one is the **retired alias** that 301s to `soundcore-p30i-earbuds`
(`next.config.ts:323`). Google still indexes and ranks the alias; visitors are
redirected, so the traffic is not lost, but the canonical product URL is not the
one earning position.

---

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

### Navigational Anker demand — **not served by `/anker`**
```
انكر              939 im    anker egypt      683 im
anker egypt       683 im    انكر مصر         451 im · 51 cl · pos 3.9
anker             330 im    توكيل انكر مصر   232 im
أنكر مصر          231 im    توكيل انكر       222 im
موقع انكر         141 im    موقع انكر مصر    135 im
```
≈ **3,364 impressions** of pure brand/navigational intent, while the `/anker`
brand hub records **zero impressions**. (Earbuds-flavoured Anker queries such as
`سماعات انكر` are correctly served by `/soundcore/audio`, since Soundcore is
Anker's audio brand — those are excluded from the figure above.)

### Smart watches — no AMOLED demand exists
Only 3 queries in the top 1,000, totalling 203 impressions. **Zero queries in the
entire 1,000-query set contain "AMOLED".** The strongest is a price-bracket query:
`افضل ساعة سمارت في حدود 1500` (150 im) — note the colloquial **سمارت**, not `ذكية`.

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
3. **20 category pages have zero impressions.** Their titles/metas can be changed
   freely — there is no ranking to protect. The constraint that applies elsewhere
   does not apply to them.
4. `scripts/blog-keywords.mjs` is broken until its CSV inputs are restored or the
   script is repointed at this baseline.
