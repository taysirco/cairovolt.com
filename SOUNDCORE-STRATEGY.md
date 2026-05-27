# Soundcore Targeting Strategy — Architectural Rationale

**Last updated:** 2026-05-27
**Owner:** SEO / Content
**Scope:** How CairoVolt structures URL targeting + anchor text for the "Soundcore" keyword cluster (Anker's audio sub-brand).

---

## 🚀 v3 Update — Full Migration Complete (2026-05-27)

> **What changed:** Phase B migration executed. Soundcore is no longer hosted under `/anker/audio` + `/anker/speakers` — it now has its own complete URL tree at `/soundcore/audio` + `/soundcore/speakers` with all 31 products migrated.
>
> **Why:** Section 7 of this doc originally recommended Option B as the proper long-term architecture, but the initial deployment (v1-v2) implemented Option A as a quick win. v3 completes the architecture by migrating products' `brand` field from `"Anker"` to `"Soundcore"`, moving category-content files, and adding 301 redirects to preserve link equity.

### v3 — Live URL Structure

```
/soundcore                                  ← Brand hub (custom route)
├── /soundcore/audio                        ← Earbuds & headphones category
│   ├── /soundcore/audio/anker-soundcore-r50i
│   ├── /soundcore/audio/soundcore-liberty-4-nc
│   └── ... (27 products)
└── /soundcore/speakers                     ← Bluetooth speakers category
    ├── /soundcore/speakers/anker-soundcore-motion-plus
    └── ... (4 products)
```

### v3 — Migration Effects

| Aspect | Before (v1-v2) | After (v3) |
|---|---|---|
| Product `brand` field | `"Anker"` | `"Soundcore"` (31 products) |
| Product URL | `/anker/audio/{slug}` | `/soundcore/audio/{slug}` |
| Category-content file | `category-content/anker/audio.ts` | `category-content/soundcore/audio.ts` |
| Old URL → new URL | n/a | 301 redirect (preserves ~95% link equity) |
| Anker brand page (`/anker`) | Listed Soundcore Earbuds + Speakers as categories | Only 4 charging categories + 1 cross-link card to `/soundcore` |
| ProductSchema `brand` | `"Anker"` | `"Soundcore"` (better entity precision) |
| Breadcrumb hierarchy | Home → Anker → Audio → R50i | Home → Soundcore → Audio → R50i |

### v3 — 301 Redirect Coverage

The middleware (`src/middleware.ts`) intercepts the legacy paths and 301-redirects to the new ones:

```
GET /anker/audio                  → 301 → /soundcore/audio
GET /anker/audio/{slug}           → 301 → /soundcore/audio/{slug}
GET /anker/speakers               → 301 → /soundcore/speakers
GET /anker/speakers/{slug}        → 301 → /soundcore/speakers/{slug}
GET /en/anker/{audio|speakers}/*  → 301 → /en/soundcore/{audio|speakers}/*
```

**The historical Option A vs Option B analysis below remains useful as decision context.** Specific URL paths in Sections 1-10 below reflect the original Option A state and may say `/anker/audio` — read them as historical narrative. The current live structure is the v3 one shown above.

---

## 1. The Problem We Fixed

The original Anchor Text Strategy mapped **all four high-volume "Soundcore" keywords** to the master Anker brand page:

| Keyword | Volume/mo | Old target | Issue |
|---|---|---|---|
| `soundcore` | 14,800 | `/anker` | Conflates a sub-brand with the parent |
| `anker soundcore` | 3,600 | `/anker` | Same |
| `ساوند كور` | 1,900 | `/anker` | Same |
| `anker soundcore egypt` | 110 | `/anker` | Same |

**Combined:** ~20,410 searches/month were being funnelled to a page that is 60% non-audio content (chargers + cables + power banks).

### Why this hurt rankings
1. **Topical dilution.** Google's relevance scoring measures the semantic distance between the query and the landing page. `/anker` covers six categories — only two are audio. Sending "soundcore" there made the page look like a weak audio match compared to dedicated competitor pages (soundcore.com, amazon.com/stores/soundcore).
2. **Anchor-text saturation.** ~40% of inbound anchors pointing at `/anker` carried the word "soundcore." Penguin-era signals flag this kind of mismatch as either keyword stuffing or topical confusion.
3. **No hub authority.** "Soundcore" is a brand name with its own Wikipedia presence, own dot-com, own product roadmap. Having no dedicated hub on our site meant we forfeited the brand-search query class entirely.

---

## 2. The Decision: Option B (Dedicated `/soundcore` Hub)

Two options were on the table:

- **Option A** (simpler): Split the "soundcore" keyword between `/anker/audio` (~80% intent) and `/anker/speakers` (~20% intent). No new pages.
- **Option B** (chosen): Build a real `/soundcore` and `/en/soundcore` hub page that semantically mirrors the brand's own architecture (`soundcore.com` separates audio products from speakers).

### Why B over A
- The keyword cluster (~20K searches/mo) is large enough to warrant its own URL — comparable in volume to entire site sections like `/anker/wall-chargers`.
- The hub page captures **navigational queries** ("what is Soundcore?", "Soundcore products", "ساوند كور إيه") which neither `/anker/audio` nor `/anker/speakers` answers cleanly.
- It mirrors Anker's own brand structure: Anker.com has a distinct soundcore.com sub-property. Replicating this hierarchy makes our entity graph match the real world.
- A hub gives us a natural target for off-site link building around the word "Soundcore" without further muddying `/anker`.

---

## 3. New Architecture

```
/                                  → CairoVolt homepage
├── /anker                         → Anker BRAND (charging-centric: power banks, chargers, cables)
│   ├── /anker/power-banks
│   ├── /anker/wall-chargers
│   ├── /anker/car-chargers
│   ├── /anker/cables
│   ├── /anker/audio               ← Soundcore earbuds + headphones
│   └── /anker/speakers            ← Soundcore Bluetooth speakers
│
└── /soundcore                     ← ✨ NEW — Soundcore sub-brand HUB
    │  (lists /anker/audio + /anker/speakers as its two children)
    │  Cross-links to /anker (parent brand)
    └── No subpages of its own (avoids duplicate IA)
```

### Routing decision
The hub lives as a **custom Next.js route** at [src/app/[locale]/soundcore/page.tsx](src/app/[locale]/soundcore/page.tsx) — NOT as an entry in `brandData`. Reason: every product in our catalog is recorded with `brand: "Anker"`. Adding `soundcore` to `brandData` would have broken `BestSellingProducts` (which filters by `p.brand.toLowerCase() === brandSlug`), or forced us to add an exception. A custom route gives full creative control over the hub layout while keeping the product taxonomy clean.

### Schema posture
- `/soundcore` declares **Soundcore as the primary entity** (`about: [soundcore, anker, cairovolt]`) with audio-domain mentions (`bluetooth, earbuds, speaker, anc`). This is the inverse of `/anker`, which declares **Anker as primary** with charging-domain mentions.
- Breadcrumb structured data: `Home → Anker → Soundcore` (linking the parent brand for entity graph clarity, even though the URL is top-level for keyword strength).
- Hreflang `ar-EG ↔ en-EG` configured with `x-default → ar`.
- Sitemap priority **0.95** (highest in the brand-hub tier).

---

## 4. Keyword Map Changes

### Moved OUT of `/anker` → INTO `/soundcore`

| Keyword | Vol | Old | New |
|---|---:|---|---|
| `soundcore` | 14,800 | /anker | **/soundcore** |
| `anker soundcore` | 3,600 | /anker | **/soundcore** |
| `ساوند كور` | 1,900 | /anker | **/soundcore** |
| `anker soundcore egypt` | 110 | /anker | **/soundcore** |

### Added NEW to `/soundcore` hub (previously untargeted)

| Keyword | Vol | Type |
|---|---:|---|
| `soundcore egypt` | 320 | 🟢 Exact |
| `ساوند كور مصر` | 260 | 🟢 Exact |
| `soundcore audio` | 90 | 🔵 Partial |
| `ساوند كور انكر` | 90 | 🔵 Partial |
| `soundcore by anker` | 70 | 🟢 Exact |
| `منتجات ساوند كور` | 70 | 🔵 Partial |

**Hub total: 10 keywords, ~21,540 searches/mo.**

### Expanded `/anker/speakers` (2 → 17 keywords)
The previous strategy had only `anker speaker` (320) and `anker bluetooth speaker` (110) at the speakers section. The new strategy adds 15 keywords across Arabic and English, including:

- `soundcore speaker` (480), `soundcore speakers` (390)
- `سبيكر انكر` (260), `مكبر صوت انكر` (210), `سبيكر ساوند كور` (170)
- `soundcore bluetooth speaker` (140), `سعر سبيكر انكر` (140)
- `anker portable speaker` (110), `مكبر صوت ساوند كور` (110)
- `anker waterproof speaker` (90), `سبيكر بلوتوث انكر` (90)
- `soundcore party speaker` (70), `سبيكر للحفلات انكر` (70)
- `anker speaker price egypt` (60)
- `سماعة بلوتوث انكر كبيرة` (170) — captures Egyptian colloquial "سماعة كبيرة" = speaker

Plus 10 product-specific keywords routed to `/anker/speakers/{slug}` (Motion+, Flare 2, Rave 3, Select 4 Go).

### Expanded `/anker/audio` (12 → 17 keywords)
Added: `ايربودز ساوند كور` (180), `soundcore headphones` (140), `سماعات انكر ساوند كور` (110), `soundcore tws` (90), `افضل سماعة انكر` (90).

### `/anker` slimmed down
After the cleanup, `/anker` carries **only 16 charging-and-brand keywords** — no Soundcore terms remain. Page-level intent now matches the page content (chargers, power banks, cables, brand verification).

---

## 5. Page Priority Reordering

Old top-5 → New top-7:

| Old # | Page | New # | Why moved |
|---|---|---|---|
| ⭐ 5 | /anker | ⭐ 7 | No longer carries the 20K Soundcore cluster |
| — | /soundcore | ⭐ 2 | **NEW** — receives the 20K cluster |
| #19 | /anker/speakers | ⭐ 6 | 2 → 17 keywords + 4 product slugs |
| #8 | /anker/audio | #10 | Slight drop because /soundcore now absorbs generic queries |

---

## 6. Anchor-Text Rules Updated

Two new strict rules were added to the "قواعد الأنكور" sheet:

1. **`/anker ≠ Soundcore`** — `/anker` is for chargers, cables, and power banks. Any anchor containing "soundcore" or "ساوند كور" must point to `/soundcore`, `/anker/audio`, `/anker/speakers`, or a product slug.
2. **`/soundcore ≠ /anker/audio`** — `/soundcore` is the hub for navigational/brand queries ("what is Soundcore"). `/anker/audio` is for transactional earbud queries. When in doubt, ask: *does the searcher want to understand the brand, or buy a specific earbud?* The first goes to the hub; the second to the category page.

---

## 7. Internal Linking Implementation

A **bilingual cross-link banner** was added inside [CategoryTemplate.tsx](src/components/CategoryTemplate.tsx#L222-L255) that appears only when `categorySlug === 'audio' || 'speakers'` AND `brand === 'Anker'`. The banner sits above the category hero and contains:

- A statement of family: *"Part of the Soundcore by Anker family"* / *"هذه صفحة من عائلة Soundcore by Anker"*
- A prominent button to `/soundcore`
- A secondary button to the *other* category (audio ↔ speakers cross-link)

This creates a triangulated link pattern:
```
/anker/audio  ←→  /soundcore  ←→  /anker/speakers
       ↘                              ↙
                  (direct sibling link)
```

The hub page itself also links back to both children via two large feature cards and a bottom CTA.

---

## 8. What to Measure (90-Day Plan)

| Metric | Where | Goal |
|---|---|---|
| Impressions on "soundcore" query | GSC, filtered to `/soundcore` | First impressions within 14 days of crawl |
| CTR on "soundcore" query | GSC | > 3% by day 60 |
| `/anker` average position for non-Soundcore terms | GSC | Improvement of +1–3 positions (less topical dilution) |
| Hub → category click-through | GA4 events on the two CTA cards | > 40% of /soundcore sessions click into /anker/audio or /anker/speakers |
| `/anker/speakers` ranking for new 15 keywords | Ahrefs rank tracker | Top 20 within 90 days for 50%+ of new keywords |

---

## 9. Files Touched in This Change

| File | Change |
|---|---|
| [src/data/soundcore-hub.ts](src/data/soundcore-hub.ts) | NEW — hub content data (history, technologies, FAQ, metadata) |
| [src/app/[locale]/soundcore/page.tsx](src/app/[locale]/soundcore/page.tsx) | NEW — hub route (~340 lines) |
| [src/components/CategoryTemplate.tsx](src/components/CategoryTemplate.tsx) | Added Soundcore family banner for `audio`/`speakers` |
| [src/app/sitemap.ts](src/app/sitemap.ts) | Added `/soundcore` at priority 0.95 with hreflang |
| [CairoVolt-Anchor-Text-Strategy-FINAL.xlsx](CairoVolt-Anchor-Text-Strategy-FINAL.xlsx) | Regenerated with three sheets: keyword map, anchor rules, priority |
| [scripts/rebuild_anchor_strategy.py](scripts/rebuild_anchor_strategy.py) | NEW — reproducible generator for the xlsx (single source of truth) |

---

## 10. Future-Proofing

If Soundcore launches a third product line (smart-glasses are rumored), the hub absorbs it without restructuring. Add a third category card to `soundcoreHub.categories` in [src/data/soundcore-hub.ts](src/data/soundcore-hub.ts), create the corresponding `/anker/<new-category>` page, and the hub auto-expands.

If Anker eventually fully separates Soundcore (the parent company has hinted at a spinoff), we can promote `/soundcore` to a true top-level brand by:
1. Re-tagging Soundcore products from `brand: "Anker"` to `brand: "Soundcore"` in the product files.
2. Adding `soundcore` to `brandData` with its own theme.
3. Migrating `/anker/audio` → `/soundcore/audio` and `/anker/speakers` → `/soundcore/speakers` with 301 redirects.

The current architecture makes that migration low-risk because the hub already exists at the destination URL.
