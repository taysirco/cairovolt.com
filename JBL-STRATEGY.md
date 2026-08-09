# JBL Brand Strategy & Implementation Plan — CairoVolt

**Created:** 2026-08-09
**Owner:** SEO / Content / Catalog
**Scope:** Add JBL as the 4th first-class brand (`/jbl/{category}/{slug}`), with 4 sub-categories, ~22 products, full SEO/AEO/GEO support layer, targeting the 43,400/mo Egyptian "jbl" search cluster.
**Status:** BUILT & VERIFIED LOCALLY (2026-08-09: `npm run build` clean, 52 JBL pages prerendered ar+en, all consistency audits 0 issues) — ⛔ NOT DEPLOYED, NOT PUSHED. Deploy gates in §10 (images + owner sign-offs pending). The 3rd blog article (jbl-vs-soundcore) was deliberately CUT — `anker-soundcore-vs-jbl-vs-bose-speakers-egypt` (live since June) already owns that comparison; its product rail now carries 2 JBL slugs instead (rail-only edit, zero content drift).
**Precedent doc:** [SOUNDCORE-STRATEGY.md](SOUNDCORE-STRATEGY.md) (the v3 first-class-brand pattern this follows).

---

## 1. Keyword foundation (source: `jbl_broad-match_eg_2026-08-08.xlsx`, 102 keywords, 43,400 searches/mo)

**Targetable commercial volume: 42,400/mo (97.7%).**

### 1.1 Cluster → page map

| Cluster | Vol/mo | Target page | Top keywords |
|---|---:|---|---|
| Brand hub | 17,730 | `/jbl` | jbl (8,100) · سماعات jbl (4,400) · jbl سماعات (880) · سعر سماعات jbl بلوتوث (880) · سعر سماعة jbl (880) · jbl egypt (720) · سماعات بلوتوث jbl (590+390) · اسعار سماعات jbl (260) · jbl speakers egypt (210) · سعر jbl (170) · jbl speakers price (110) · price in egypt (70) · jbl سماعات بلوتوث (70) |
| Speakers category | 5,240 | `/jbl/speakers` | jbl speaker (3,600) · سماعات jbl كبيرة (590) · speaker jbl (210) · jbl bt speaker (140) · سبيكر jbl (140) · مكبر صوت jbl (110) · jbl box (110) · jbl mini speaker (110) · jbl big speakers (90) · jbl sound system (70) · jbl bluetooth speaker (70) |
| "صب" slang sub-cluster | 1,740 | `/jbl/speakers` (answer block) + blog | صب بلوتوث jbl (390) · سماعات صب jbl (320) · سعر صب jbl (260) · سماعه صب jbl (210) · jbl sub (140) · sub jbl (140) · jbl sub speaker (140) · jbl subwoofer (140) |
| Charge products | 2,790 | `/jbl/speakers/jbl-charge-6` + `-charge-5` | charge 5 (1,300) · charge 6 (1,000) · charge 4 (210) · charge (140) · charge 3 (140) |
| Go products | 1,780 | `/jbl/speakers/jbl-go-4` | go 4 (880) · go 3 (480) · go (210) · go 2 (210) |
| Xtreme products | 1,510 | `/jbl/speakers/jbl-xtreme-4` | extreme 4 (480) · xtreme 3 (320) · xtreme 4 (320) · xtreme (170) · extreme 2 (110) · xtreme 2 (110) |
| Flip products | 1,200 | `/jbl/speakers/jbl-flip-7` + `-flip-6` | flip 5 (480) · flip (320) · flip jbl (260) · flip 4 (140) |
| Headphones category | 4,940 | `/jbl/headphones` | jbl headphones (2,900) · headphone jbl (390) · هيدفون jbl (320) · headphones egypt (210) · headset (210) · سماعات راس jbl (170) · bluetooth/wireless headphones (140+140+140) · headset jbl (110) · bt headphones (70) · jbl tune (140) |
| Earbuds category | 2,150 | `/jbl/earbuds` | jbl airpods (590) · jbl earbuds (590) · ايربودز jbl (390) · سماعات jbl ايربودز (170) · airpods jbl (140) · wireless earbuds (90) · earphones (90) · wireless earphones (90) |
| T110 legacy | 420 | `/jbl/earbuds/jbl-t110` (+T110BT) | tune 110 (170) · t110bt (140) · t110 (110) |
| PartyBox category | 320 | `/jbl/partybox` | party box jbl (140) · بازوكا jbl (110) · jbl party box (70) |
| PartyBox 1000 | 420 | `/jbl/partybox/jbl-partybox-1000` | jbl partybox 1000 (210) · سعر بازوكا jbl 1000 في مصر (210) |
| PartyBox mic | 220 | `/jbl/partybox/jbl-partybox-wireless-mic` | jbl microphone (110) · mic jbl (110) |
| Clip products | 540 | `/jbl/speakers/jbl-clip-5` | clip 4 (320) · clip (110) · clip 3 (110) |
| Boombox products | 530 | `/jbl/speakers/jbl-boombox-3` | boombox (320) · boombox 2 (210) |
| Pulse products | 280 | `/jbl/speakers/jbl-pulse-5` | pulse 4 (140) · pulse 5 (140) |
| Tour Pro 2 | 260 | `/jbl/earbuds/jbl-tour-pro-2` | jbl tour pro 2 (260) |
| Soundbar | 220 | `/jbl` FAQ + speakers copy (no category yet) | jbl soundbar (110) · jbl speaker bar (110) |
| Tune 120TWS legacy | 110 | `/jbl/earbuds` copy (discontinued — answer, no product) | jbl tune 120tws (110) |
| Support content | 340 | `/jbl` FAQ + blog (NOT product pages) | توكيل jbl في مصر (140) · تصليح سماعات بلوتوث jbl (110) · مركز صيانة سماعات jbl (90) |

### 1.2 Excluded (with reasons)

| Keyword | Vol | Why excluded |
|---|---:|---|
| jbl logo | 110 | Brand-asset search, zero commercial intent |
| jbl wwe | 110 | The WWE wrestler John "Bradshaw" Layfield — irrelevant |
| سماعات سقف jbl | 170 | JBL Pro installed ceiling audio — separate vertical, not stocked |
| jbl car speakers / سماعات سيارة jbl | 180 | Car audio vertical — not stocked (Cairo Sales owns this niche) |
| jbl 5 | 90 | Ambiguous fragment; covered organically by Charge 5/Flip pages |

### 1.3 Egyptian-language intelligence (unique content angles nobody targets)

- **"صب" = "sub"** — Egyptian slang for bass-heavy Bluetooth speakers (NOT a literal subwoofer). 1,740/mo. Answer block on `/jbl/speakers` + dedicated blog explainer.
- **"بازوكا" = bazooka** — Egyptian slang for large party speakers (PartyBox class). Targeted on `/jbl/partybox`.
- **"ايربودز/airpods jbl"** — "AirPods" genericized to mean any TWS earbuds. `/jbl/earbuds` targets it head-on.
- **"سماعات jbl كبيرة"** — ambiguous (big speakers / over-ear headphones); dual-covered on speakers + headphones copy.
- Egyptians write "jbl" in **Latin script inside Arabic queries** (سماعات jbl: 4,400 vs ~0 for سماعات جي بي إل) → **JBL stays Latin in Arabic copy** (unlike انكر/جوي روم). `getBrandDisplayName` returns "JBL" for both locales; Arabic variant spellings (جي بي إل/جي بي ال) added to search normalization only.

---

## 2. Architecture

```
/jbl                       ← brand hub (Pattern A: brandData entry, [brand] route) — 17,730/mo
├── /jbl/speakers          ← portable BT speakers (9 products) — ~13,000/mo combined
├── /jbl/partybox          ← PartyBox + بازوكا + mics (5 products) — ~960/mo    [NEW category slug]
├── /jbl/headphones        ← on/over-ear (3 products) — ~4,940/mo               [NEW category slug]
└── /jbl/earbuds           ← TWS + wired in-ear legacy (5 products) — ~2,940/mo [NEW category slug]
```

Decisions & rationale:
- **Pattern A (brandData), not a bespoke hub route** — recon confirmed the soundcore custom-route pattern requires hand-wiring sitemap/agent-hub/knowledge-graph; Pattern A gets all of it free. The `[brand]/page.tsx` `getBrandPageCopy()` gets an explicit `jbl` branch (otherwise it renders Joyroom copy).
- **`headphones`, `earbuds`, `partybox` are NEW category slugs** in `_categories.ts` (order 9–11) — keyword volumes justify separate landing pages vs the combined `audio` slug; mirrors JBL's own site IA (entity-graph alignment, same rationale as SOUNDCORE-STRATEGY §2). `speakers` slug reused.
- **No `soundbars` category** (220/mo, no confirmed stockable assortment) — targeted via `/jbl` FAQ + speakers copy; add later if stocked (future-proofing like SOUNDCORE-STRATEGY §10).
- **No new generic top-level hubs** (/speakers, /headphones) in this phase — avoid cannibalizing brand category pages; revisit when a second speaker brand justifies aggregation. JBL added to existing generic `/earbuds` aggregator.
- **brandColor: `'orange'`** (JBL's actual brand color; reuses existing union member — no widening of `brandColor`). Per-component JBL branches use orange/amber gradients distinct from Soundcore's orange-pink.
- **SKU family: `JB01`–`JB22`** (verified free; existing space uses AA/AC/AK/AP/AR/JC/JH/JK/JP/JR/JW/SH/SS).
- **Warranty: 12 months CairoVolt store warranty** (`jbl-` prefix branch in warranty-policy) — matches observed Egypt norms (Amazon.eg "1 Year Local"); ⚠️ owner may adjust before deploy.

---

## 3. Product roster (22 products, all specs vendor-attributed, all prices ⚠️ FLAGGED for owner confirmation)

Prices = observed Egyptian street prices (Aug 2026, sources logged in research files); `price` set near verified street mid-point; `originalPrice` = display strikethrough +11–19%. **GTIN = "" everywhere** until owner scans physical boxes (GTIN prefix allowlist untouched).

### /jbl/speakers (9)

| Slug | SKU | Model | Key vendor specs | EGP price (basis) |
|---|---|---|---|---|
| jbl-go-4 | JB01 | Go 4 | 4.2W RMS, 7h(+2 boost), IP67, BT 5.3, Auracast, 190g | 2,099 (2B 1,899–2,099; Noon 2,333) |
| jbl-clip-5 | JB02 | Clip 5 | 7W, 12h(+3), IP67, BT 5.3, carabiner, 285g | 2,999 (Noon 2,550; 2B 2,999–3,299) |
| jbl-flip-6 | JB03 | Flip 6 | 30W (20+10), 12h, IP67, BT 5.1, PartyBoost, 550g | 6,499 (BTech 5,490–6,999) |
| jbl-flip-7 | JB04 | Flip 7 | 35W, 14h(+2), IP68, BT 5.4, Auracast, USB-C lossless, 560g | 7,499 (2B 6,499–7,499; Sharaf 7,149) |
| jbl-charge-5 | JB05 | Charge 5 | 40W (30+10), 20h, IP67, BT 5.1, 7,500mAh powerbank, 960g | 6,999 (Noon 5,800; Vodafone 7,299) |
| jbl-charge-6 | JB06 | Charge 6 | 45W, 24h(+4), IP68, drop-proof 1m, BT 5.4, Auracast, powerbank, 990g | 8,499 (LiveStores 7,599; Vodafone 8,399; 2B 9,499) |
| jbl-xtreme-4 | JB07 | Xtreme 4 | up to 100W, 24h(+6), IP67, BT 5.3, replaceable battery, powerbank, 2.1kg | 21,999 (GW 17,012; 2B 21,999; Amazon 23,200) |
| jbl-pulse-5 | JB08 | Pulse 5 | 40W, 12h, IP67, BT 5.3, 360° light dome, ~1.5kg | 15,999 (Amazon.eg 16,000 — thin stock ⚠️) |
| jbl-boombox-3 | JB09 | Boombox 3 | 180W AC/~136W batt, 24h, IP67, BT 5.3, 6.7kg | 26,999 (Reverb 21,776; Noon 23,999; 2B 28,999) |

### /jbl/partybox (5)

| Slug | SKU | Model | Key vendor specs | EGP price (basis) |
|---|---|---|---|---|
| jbl-partybox-encore-essential | JB10 | PartyBox Encore Essential | 100W, 6h, IPX4, BT 5.1, mic input, lightshow, ~6kg | 20,999 (Vodafone 19,500; Noon 21,720) |
| jbl-partybox-club-120 | JB11 | PartyBox Club 120 | 160W, 12h swappable battery, IPX4, BT 5.3, Auracast, dual mic+guitar in, 10.6kg | 21,999 (Jumia 18,888; Raneen 23,570) |
| jbl-partybox-stage-320 | JB12 | PartyBox Stage 320 | 240W, 18h swappable 68Wh battery, IPX4, BT 5.3, Auracast, wheels, 16.5kg | 28,999 (PrimeTech 27,750; Noon 28,769; 2B 29,999) |
| jbl-partybox-1000 | JB13 | PartyBox 1000 | 1100W, AC-only, DJ pad + gesture wristband, 34.7kg | 62,999 (Amazon 58,999–62,035; 2B 65,999) ⚠️ flagship-priced, stock decision critical |
| jbl-partybox-wireless-mic | JB14 | PartyBox Wireless Mic (set of 2) | 2.4GHz dongle, 30m range, ~20h | 8,999 (Jumia 6,999–8,999) |

### /jbl/headphones (3)

| Slug | SKU | Model | Key vendor specs | EGP price (basis) |
|---|---|---|---|---|
| jbl-tune-520bt | JB15 | Tune 520BT (on-ear) | 33mm, 57h, 5-min→3h, BT 5.3, multipoint, app | 1,999 (Noon ~1,950–1,980) |
| jbl-tune-720bt | JB16 | Tune 720BT (over-ear) | 40mm, 76h, BT 5.3, multipoint, detachable aux | 3,299 (Noon 3,199; TOP Shop 3,479) |
| jbl-tune-770nc | JB17 | Tune 770NC (over-ear ANC) | 40mm, Adaptive ANC, 70h/44h ANC, BT 5.3, LE-Audio-ready, aux | 5,499 (Amazon 5,339+) |

### /jbl/earbuds (5)

| Slug | SKU | Model | Key vendor specs | EGP price (basis) |
|---|---|---|---|---|
| jbl-wave-beam | JB18 | Wave Beam TWS | 8mm, 32h total, BT 5.2, IP54, Smart Ambient | 2,199 (Amazon from 1,669; Jumia 3,333 — wide spread ⚠️) |
| jbl-tune-buds | JB19 | Tune Buds TWS ANC | ANC, 48h total, BT 5.3, 4 mics, IP54 | 4,999 (Noon 5,899 marketplace-inflated ⚠️) |
| jbl-tour-pro-2 | JB20 | Tour Pro 2 (smart-case flagship) | True Adaptive ANC, touchscreen case, 10+30h, BT 5.3 LE, 6 mics, IPX5 | 24,999 (Sharaf 25,940) ⚠️ NO Hi-Res claim (contested — LDAC absent) |
| jbl-t110 | JB21 | T110 wired in-ear | 9mm Pure Bass, 3.5mm, 1-button mic, flat cable | 449 (Amazon 299; range 299–699) — counterfeit-hero page |
| jbl-t110bt | JB22 | T110BT neckband | 6h battery, micro-USB, BT 4.0, magnetic buds | 449 (BTech 220 clearance ⚠️ EOL — owner stock decision) |

**Deliberately NOT built** (documented so nobody "fixes" the gap): Go 3/Go Essential/Clip 4/Flip 5/Charge 4/Xtreme 2–3/Pulse 4/Boombox 2/PartyBox 110/310/710/Encore 2/Boombox 3 Wi-Fi (superseded/thin/residual — covered as comparison mentions), Tune 510BT/660NC/Live line (cannibalize chosen Tunes), Tune 120TWS (discontinued — answer block only), Tune 570BT (not an Egypt SKU), Endurance Race (no Egypt presence), Vibe/Wave siblings & gen-2s (add when stocked), soundbars (no category yet), car audio & ceiling (excluded verticals).

---

## 4. Honesty rails (non-negotiable, inherited from project law)

1. **NO fabricated bench tests** — `details/*.ts` files carry `aiTldr` + `specifications` only, every number manufacturer-attributed ("حسب المواصفات المعلنة" / "manufacturer-listed"). `benchTest` omitted for all JBL products until real CairoVolt bench sessions happen (per BENCH-TEST-PROTOCOL.md).
2. **NO fabricated reviews** — every JBL product gets a review file exporting `[]` + `productReviewsDb` registration. **This is load-bearing:** `getProductReviews()` falls back to a 7–12 synthetic-review generator + fabricated AggregateRating for any slug missing from the DB. Real reviews arrive only via the order-gated Firestore system.
3. **NO self-authored Review/AggregateRating JSON-LD** (Google Merchant policy; existing discipline preserved).
4. **Warranty honesty** — JBL's official Egypt warranty duration is UNVERIFIED; we state only CairoVolt's own 12-month store warranty. JBL Pro's 7-year warranty is pro-gear only — never referenced.
5. **توكيل honesty** — CairoVolt is an independent retailer, NOT the official JBL agent. Al-Tawheed Group self-describes as the authorized distributor (their claim, so attributed). jbl.com.eg does not exist; jblegypt.com is a grey/refurb storefront — NEVER cited. About-page legal disclaimer extended to include JBL.
6. **Counterfeit content** cites only JBL's official "Buy Authentic" program + price-spread evidence; no invented Egyptian statistics.
7. **Tour Pro 2 ≠ Hi-Res** (launched without LDAC; contested claim). Hi-Res language reserved for Tour Pro 3 if ever stocked.
8. **est. discipline** — any estimated figure (e.g. per-phone charge counts from Wh math) labeled `est.` with formula.
9. **Awards** only with model+year+verifiable source: Red Dot (PartyBox Stage 320, 110, 1000…), iF 2025 (Charge 6, Flip 7, Encore 2), CES honoree (Tour Pro 3). Nothing generic.

---

## 5. File-by-file implementation checklist

### Wave 1 — Brand + category infrastructure (one-time)

**Routing / registration (miss = sitewide 404):**
- [ ] `src/lib/known-routes.ts` — `'jbl'` → `KNOWN_TOP_SEGMENTS`
- [ ] `src/data/brand-data.ts` — full `jbl: BrandData` entry (hero, categories w/ `/jbl/*` hrefs, whySection, aboutSection, trustBadges, metadata ar/en, article, faq, quickAnswer ≤50w)
- [ ] `src/app/[locale]/[brand]/page.tsx` — explicit `jbl` branch in `getBrandPageCopy()` (else renders Joyroom copy); color ternaries (5×) + `collection` cast widened
- [ ] `src/data/products/_categories.ts` — new entries: `headphones` (order 9), `earbuds` (10), `partybox` (11) with ar/en names+keywords
- [ ] `src/data/category-content/_types.ts` — widen `brand` union +`'JBL'`
- [ ] `src/data/category-content/jbl/{speakers,partybox,headphones,earbuds}.ts` — 4 new CategoryContent files (metadata, description w/ internal links, buyingGuide→HowTo, FAQ, qualityBadges, products list synced to real catalog)
- [ ] `src/data/category-content.ts` — import + `jbl:` block (creates routes + sitemap + markdown validity)
- [ ] `src/app/api/markdown-negotiate/[...slug]/route.ts` — `'jbl'` → `PRODUCT_BRANDS` + `COLLECTION_ROOTS`; brand prose L322/L483 updated
- [ ] `src/data/category-discovery.ts` — `'jbl'` → `DiscoveryCollectionKey` + full `jbl` collection (4 cards; imageBase paths under `/images/categories/jbl/` — placeholder-safe until art lands)
- [ ] `src/middleware.ts` — extend retired-slug regexes `|jbl` (fail-open future-proofing)

**Identity / display:**
- [ ] `src/lib/brand-entities.ts` — JBL BrandEntity (Wikidata **Q1153754**, Wikipedia, jbl.com — all verified live)
- [ ] `src/components/schemas/ProductSchema.tsx` — `manufacturerMap['JBL'] = Harman International Industries`
- [ ] `src/lib/arabic-brand-names.ts` — `getBrandDisplayName` explicit `jbl → 'JBL'` both locales (kills "Jbl"); JBL stays Latin in Arabic (keyword-data-driven decision §1.3) — no Arabic replacement pass
- [ ] `src/lib/htmlSanitize.ts` — brand + new category slug Arabic labels for blog-link localization
- [ ] `messages/ar.json` + `messages/en.json` — `Brands.jbl(+Description)`, `Categories.{headphones,earbuds,partybox}`, `Footer.shopJbl`, `HomePage.shopJbl`+subtitle, `PageMeta.jblTitle`+home pair, `Warranty` JBL keys+copy, `About.brands.jbl`+disclaimer, FAQ brand mentions
- [ ] `src/components/CategoryTemplate.tsx` — `translatedBrandValue` JBL branch (kills "جوي روم" mislabel); `categoryKeyMap` + new slugs; color handling
- [ ] `.../[slug]/ProductPageClient.tsx` — brand-name fallback JBL branch; `categoryKeyMap` new slugs; `fallbackGradientClass`/`selectedThumbnailClass`/badge JBL orange branches
- [ ] `.../[slug]/page.tsx` — brandColor ternary JBL case

**Commerce / warranty:**
- [ ] `src/lib/catalog-core.ts` — `BRAND_FAMILIES['jbl']=['jbl']`; `complementaryMatrix` rows for `headphones`/`earbuds`/`partybox` (+ speakers row check)
- [ ] `src/lib/warranty-policy.ts` — `jbl-` prefix → 12 months
- [ ] `src/app/[locale]/warranty/page.tsx` — JBL duration prose + brand card (ar/en)
- [ ] `src/app/[locale]/verify/VerifyClient.tsx` — `jbl-` serial-prefix brand branch; filter union + button
- [ ] `src/app/api/v1/checkout/route.ts` — Arabic normalization `جي بي ال/إل → jbl`
- [ ] `src/lib/product-names.ts` — all 22 slugs (blocks warranty activation otherwise)

**Navigation / linking:**
- [ ] `src/components/Header.tsx` — `jblCategories` + JBL dropdown
- [ ] `src/components/MobileMenu.tsx` — JBL section
- [ ] `src/components/Footer.tsx` — JBL links column; awards strip: only verified JBL entries (Red Dot PartyBox line, iF 2025 Charge 6/Flip 7)
- [ ] `src/app/[locale]/not-found.tsx` — Shop JBL link
- [ ] `src/components/UX/RouteIntelligence.tsx` — `jbl` prefetch map
- [ ] `src/app/[locale]/page.tsx` — metadata, `schemaCategories`, brand prose, FAQ productName
- [ ] `src/components/home/BrandShowcase.tsx` — 4th JBL panel (placeholder-safe art)
- [ ] `src/components/home/{ProductShowcase,ProductFinder}.tsx` — brand color branch; `brandRank.JBL=3`; `matchesNeed` sound → +`headphones`/`earbuds`/`partybox`; whyPick entries
- [ ] `src/data/showcase-products.ts` — 2–4 JBL entries (exact price/image mirror)
- [ ] `src/data/content-graph.ts` — `jbl` node + inbound links added from `/soundcore/speakers`, `/soundcore/audio`, `/joyroom/audio` nodes
- [ ] `src/components/content/RelatedLinks.tsx` — brand union + detection + color
- [ ] `src/data/generic-categories/_types.ts` — brand union +`'JBL'`; `earbuds.ts` — JBL brandCategory row
- [ ] `src/lib/generic-category-helpers.tsx` — JBL pill/badge color branch
- [ ] `src/app/[locale]/about/page.tsx` — JBL brand card

**SEO/AEO machine surfaces:**
- [ ] `src/app/.well-known/llms.txt/route.ts` — brands list, distributor disclaimer, Brand Hubs + `/jbl`
- [ ] `src/app/feed.xml/route.ts` — description +JBL
- [ ] `src/components/content/GlobalBusinessSchema.tsx` — descriptions + `knowsAbout` (+speakers/headphones), mirrored in `src/app/api/knowledge-graph/route.ts`
- [ ] `src/app/api/feed/route.ts` — `GOOGLE_CATEGORY` for `headphones` (Headphones & Headsets), `earbuds`, `partybox` (speakers exists)
- [ ] `src/app/image-sitemap.xml/route.ts` — `visibleCategoryHrefs.jbl`
- [ ] `src/app/[locale]/search/` — cosmetic brand strings
- [ ] `src/app/[locale]/blog/[slug]/page.tsx` — Shop JBL CTA + brand card color branch
- [ ] `src/lib/merchant-product-data.ts` — JBL slugs → `MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS` (imageless feed protection, §10 gate 1); bump `CATALOG_LAST_REVIEWED_AT`
- [ ] `public/opensearch.xml` + `openapi.json` examples — cosmetic (real slugs only)
- [ ] `src/app/[locale]/admin/indexing/page.tsx` — jbl option

### Wave 2 — Per product ×22
- [ ] `src/data/products/{slug}.ts` — full record (dependency-free; brand "JBL"; JBnn SKU; EGP price + originalPrice +11–19%; images array pointing at `/products/jbl/{slug}/…` conventions (files arrive later — all render paths fall back gracefully, verified); ar/en translations incl. 5 FAQs; buyer-warning; i18n Quarantine hrefs)
- [ ] `src/data/details/{slug}.ts` — aiTldr + specifications (+localContext), vendor-attributed, NO benchTest
- [ ] `src/data/reviews/{slug}.ts` — `export const {slug}_reviews: ProductReview[] = []`
- [ ] Barrels: `seed-products.ts` (import line must match generator regex) + `product-details.ts` + `product-reviews.ts`
- [ ] `src/lib/product-names.ts` entry
- [ ] Bidirectional cross-sell within JBL family
- [ ] `category-content/jbl/*.ts` products arrays kept in exact sync (name/price/badge)

### Wave 3 — Content & support layer
- [ ] Blog: `jbl-original-vs-fake-egypt` (counterfeit guide, T110 anchor, Buy Authentic citation) · `jbl-sub-speaker-meaning` (صب explainer) · `jbl-vs-soundcore-egypt` (honest cross-brand comparison) — publishDates scheduled, cover images flagged, `node scripts/generate-blog-index.mjs` + commit BOTH generated files
- [ ] `/jbl` FAQ: توكيل/صيانة/أصلي honest answers (§4.5–6)
- [ ] Existing-content links (zero-drift discipline): light-touch additions only, no rewrites of ranking copy
- [ ] `new_product_guide.md` — JBL brand/category/SKU documentation updates

### Wave 4 — Verification (all before any commit)
- [ ] `node scripts/generate-client-catalog.mjs` → JBL slugs present in `client-catalog.generated.ts`
- [ ] `node scripts/generate-blog-index.mjs` → both generated files updated
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` clean; inspect `.next/server/app/**` for /jbl pages (preview_start broken in this repo)
- [ ] SKU uniqueness grep; i18n Quarantine greps (AR hrefs no `/en/`, EN hrefs with `/en/`) = 0 lines
- [ ] Multi-agent adversarial audit: spec-vs-source, price-footprint consistency, no fabrication, schema discipline
- [ ] Local commit(s) on `main`. **NO push. NO rollout.**

---

## 6. Brand entity data (verified)

- JBL: founded 1946 by James B. Lansing; Harman International (1969) → Samsung Electronics (2017). Wikidata **Q1153754**; Harman **Q1585599**. Official: jbl.com. Tagline "Dare to Listen".
- Cinema heritage (Harman newsroom): 2002 Academy Sci-Tech Awards to JBL engineers; sound for 93rd Academy Awards (2021). Safe framings: "75+ years of pro-audio heritage".
- **jbl.com.eg does not exist. jblegypt.com is untrustworthy (grey/refurb).** Egypt distribution: Al-Tawheed Group (self-described authorized distributor) + major retail (BTech, 2B, Noon, Amazon.eg, Sharaf DG…).

## 7. Cannibalization guards

- JBL pages target only jbl-modified queries; generic terms (سماعات بلوتوث, مكبر صوت) remain with existing pages.
- Soundcore speakers FAQ already references JBL comparisons (honest retailer neutrality) — left as-is; contentGraph links now flow both ways.
- `/jbl` hub = navigational/brand queries; `/jbl/{cat}` = transactional (anchor rule mirror of SOUNDCORE-STRATEGY §6).

## 8. What to measure (90-day, post-deploy)

| Metric | Where | Goal |
|---|---|---|
| Impressions on "jbl" cluster | GSC filtered /jbl* | first impressions ≤14 days post-crawl |
| "سماعات jbl" position | GSC | top-20 by day 45, top-10 by day 90 |
| Product-page CTR (charge 5/6, go 4) | GSC | >3% by day 60 |
| صب/بازوكا answer capture | GSC + AI Overview spot checks | featured answer within 60 days |
| Hub → category CTR | GA4 | >40% of /jbl sessions click a category |

## 9. CRM / external tasks (owner or separate repo)

1. leads-CRM `acc_products`: add JB01–JB22 SKUs with wholesale prices + warrantyMonths (tier-1 warranty resolution).
2. Optional launch coupon (e.g. JBL10) created in CRM (no store code needed).
3. TikTok catalog: add JBL SKUs if VSA used.
4. Physical box check on first stock arrival: GTIN scan (then add Harman GS1 prefix to BOTH `DOCUMENTED_CATALOG_GTIN_PREFIXES` and `functions/index.js documentedPrefixes`), warranty card duration verify.

## 10. Deploy gates (ALL must pass before rollout — currently ⛔ BLOCKED by design)

1. **Owner: product images** → `public/products/jbl/{slug}/` (master+800+480+thumb via pipeline; git add before build; then remove slugs from `MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS`).
2. **Owner: stock confirmation** per §3 roster (esp. >15K EGP tier: Xtreme 4, Boombox 3, PartyBox line, Tour Pro 2; and EOL T110BT).
3. **Owner: price confirmation** (all flagged; volatile market).
4. **Owner: warranty duration sign-off** (12-month default set).
5. Category card art + BrandShowcase cutout (or ship with safe fallbacks).
6. Blog cover images for the 3 articles.
7. Final build + preview + manual App Hosting rollout (never auto).
8. Post-deploy: GSC sitemap resubmit, IndexNow ping via existing reveal cron.

Free-shipping note: threshold 3,700 EGP means every JBL speaker ≥ Flip 6 ships free automatically — confirm COD risk appetite on 20K+ partybox orders.
