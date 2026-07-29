#!/usr/bin/env node

/**
 * update-prices.mjs — مزامنة أسعار البيع من النظام المحاسبي إلى ملفات المنتجات.
 *
 * النظام المحاسبي (leads-CRM → acc_products.sellPrice) هو مالك سعر التجزئة.
 * أسعار الموقع تعيش literals في src/data/products/*.ts وتُجمَّع وقت البناء،
 * فالمزامنة = ترقيع الملفات ثم commit → App Hosting يعيد النشر. يشغّله
 * .github/workflows/price-sync.yml (جدولة + dispatch من الـCRM عند أي تعديل).
 *
 * الأمان قبل السرعة:
 *  - السعر يُرقَّع فقط داخل نافذة 800 حرف بعد `sku:` المطابق وقبل أي sku تالٍ —
 *    لا يمكن أن يصيب سعر منتجٍ آخر أو رقماً داخل نص وصفي.
 *  - تغيّر أكبر من ±50% يُتخطى ويُبلَّغ (ALLOW_LARGE=1 يتجاوز الحارس عمداً).
 *  - originalPrice أقل من السعر الجديد يُرفع إليه — لا «خصم» وهمي معكوس.
 *  - بعد الترقيع يُعاد توليد client-catalog.generated.ts ثم تُقارَن أسعاره
 *    المُنفَّذة فعلياً (Node يشغّل ملفات TS نفسها) بالمستهدف — أي انحراف يُفشل
 *    العملية قبل أي commit.
 *
 * أوضاع التشغيل:
 *   CRM_BASE_URL + CRM_WEBHOOK_SECRET  مطلوبان للسحب من المحاسبة
 *   DRY_RUN=1      يطبع ما سيتغير دون كتابة
 *   ALLOW_LARGE=1  يسمح بتغيّر > ±50%
 *   --manifest     يطبع خريطة sku→price الحالية من الملفات (JSON) ويخرج
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';

const ROOT = join(import.meta.dirname, '..');
const PRODUCTS_DIR = join(ROOT, 'src', 'data', 'products');
const SHOWCASE = join(ROOT, 'src', 'data', 'showcase-products.ts');
const GENERATED = join(ROOT, 'src', 'data', 'client-catalog.generated.ts');

const DRY = process.env.DRY_RUN === '1';
const ALLOW_LARGE = process.env.ALLOW_LARGE === '1';
const MAX_RATIO = 0.5;
const WINDOW = 800; // أقصى مسافة بين sku والسعر التابع له في كل الملفات الحالية ~450 حرفاً

/** كل مواضع sku في نص الملف مع السعر/السعر الأصلي التابعين لكل منها. */
function extractEntries(source) {
    const entries = [];
    const skuRe = /\bsku:\s*["']([^"']+)["']/g;
    let m;
    const positions = [];
    while ((m = skuRe.exec(source)) !== null) positions.push({ sku: m[1], at: m.index });
    for (let i = 0; i < positions.length; i++) {
        const { sku, at } = positions[i];
        const next = i + 1 < positions.length ? positions[i + 1].at : source.length;
        const end = Math.min(at + WINDOW, next);
        const windowText = source.slice(at, end);
        const priceM = /\bprice:\s*(\d+)/.exec(windowText);
        if (!priceM) continue;
        const origM = /\boriginalPrice:\s*(\d+)/.exec(windowText);
        entries.push({
            sku,
            price: parseInt(priceM[1], 10),
            priceAt: at + priceM.index,
            priceRaw: priceM[0],
            originalPrice: origM ? parseInt(origM[1], 10) : null,
            origAt: origM ? at + origM.index : -1,
            origRaw: origM ? origM[0] : '',
        });
    }
    return entries;
}

/** استبدال literal واحد في موضع معلوم — بلا أي regex عام على الملف كله. */
function spliceAt(source, at, oldText, newText) {
    if (source.slice(at, at + oldText.length) !== oldText) {
        throw new Error(`splice mismatch at ${at}: expected "${oldText}"`);
    }
    return source.slice(0, at) + newText + source.slice(at + oldText.length);
}

function loadProductFiles() {
    return readdirSync(PRODUCTS_DIR)
        .filter((f) => f.endsWith('.ts') && f !== '_categories.ts')
        .map((f) => join(PRODUCTS_DIR, f));
}

// ─────────────────────────── --manifest ───────────────────────────
if (process.argv.includes('--manifest')) {
    const manifest = [];
    for (const file of loadProductFiles()) {
        const src = readFileSync(file, 'utf8');
        const slugM = /\bslug:\s*["']([^"']+)["']/.exec(src);
        for (const e of extractEntries(src)) {
            manifest.push({ sku: e.sku, price: e.price, originalPrice: e.originalPrice, file: file.replace(ROOT + '/', ''), slug: slugM ? slugM[1] : '' });
        }
    }
    console.log(JSON.stringify(manifest, null, 1));
    process.exit(0);
}

// ─────────────────────────── سحب أسعار المحاسبة ───────────────────────────
const BASE = (process.env.CRM_BASE_URL || '').replace(/\/+$/, '');
const SECRET = process.env.CRM_WEBHOOK_SECRET || '';
if (!BASE || !SECRET) {
    console.error('❌ CRM_BASE_URL و CRM_WEBHOOK_SECRET مطلوبان');
    process.exit(1);
}

const res = await fetch(`${BASE}/api/public/wholesale-prices`, {
    headers: { Authorization: `Bearer ${SECRET}` },
    signal: AbortSignal.timeout(20_000),
});
if (!res.ok) {
    console.error(`❌ المحاسبة ردّت ${res.status} — إلغاء بلا أي تعديل`);
    process.exit(1);
}
const { items } = await res.json();
if (!Array.isArray(items) || items.length === 0) {
    console.error('❌ رد المحاسبة بلا أصناف — إلغاء بلا أي تعديل (لا نُفسّر العطل كأسعار صفرية)');
    process.exit(1);
}
const target = new Map();
for (const it of items) {
    const sku = String(it.sku || '').trim().toUpperCase();
    const sell = Math.round(Number(it.sellPrice) || 0);
    if (sku && sell > 0) target.set(sku, sell);
}
console.log(`🏭 المحاسبة: ${target.size} صنفاً بسعر بيع معتمد`);

// ─────────────────────────── ترقيع ملفات المنتجات ───────────────────────────
const changes = [];   // {file, sku, from, to}
const skipped = [];   // تغيّرات فوق الحارس
const skuToNewPrice = new Map(); // بعد الترقيع — لمرآة الواجهة showcase
const skuToSlug = new Map();

for (const file of loadProductFiles()) {
    let src = readFileSync(file, 'utf8');
    const slugM = /\bslug:\s*["']([^"']+)["']/.exec(src);
    let touched = false;
    // نرقّع من آخر موضع لأول موضع حتى لا تتحرك المواضع المحسوبة
    const entries = extractEntries(src).reverse();
    for (const e of entries) {
        const skuKey = e.sku.toUpperCase();
        if (slugM) skuToSlug.set(skuKey, slugM[1]);
        const want = target.get(skuKey);
        if (!want) continue;
        skuToNewPrice.set(skuKey, want);
        if (e.price === want) continue;
        const ratio = Math.abs(want - e.price) / e.price;
        if (ratio > MAX_RATIO && !ALLOW_LARGE) {
            skipped.push({ file: file.replace(ROOT + '/', ''), sku: e.sku, from: e.price, to: want, pct: Math.round(ratio * 100) });
            continue;
        }
        // originalPrice أولاً (موضعه بعد السعر غالباً لكن الترقيع بالمواضع المطلقة —
        // نبدأ بالأبعد في الملف). لو أصبح أقل من السعر الجديد نرفعه إليه.
        if (e.originalPrice !== null && e.originalPrice < want && e.origAt > e.priceAt) {
            src = spliceAt(src, e.origAt, e.origRaw, `originalPrice: ${want}`);
        }
        src = spliceAt(src, e.priceAt, e.priceRaw, `price: ${want}`);
        if (e.originalPrice !== null && e.originalPrice < want && e.origAt !== -1 && e.origAt < e.priceAt) {
            src = spliceAt(src, e.origAt, e.origRaw, `originalPrice: ${want}`);
        }
        changes.push({ file: file.replace(ROOT + '/', ''), sku: e.sku, from: e.price, to: want });
        touched = true;
    }
    if (touched && !DRY) writeFileSync(file, src);
}

// ─────────────────────────── مرآة الواجهة showcase-products.ts ───────────────────────────
{
    let src = readFileSync(SHOWCASE, 'utf8');
    const slugToSku = new Map([...skuToSlug].map(([sku, slug]) => [slug, sku]));
    const slugRe = /\bslug:\s*["']([^"']+)["']/g;
    const blocks = [];
    let m;
    while ((m = slugRe.exec(src)) !== null) blocks.push({ slug: m[1], at: m.index });
    let touched = false;
    for (let i = blocks.length - 1; i >= 0; i--) {
        const { slug, at } = blocks[i];
        const sku = slugToSku.get(slug);
        const want = sku ? skuToNewPrice.get(sku) : null;
        if (!want) continue;
        const end = i + 1 < blocks.length ? blocks[i + 1].at : src.length;
        const windowText = src.slice(at, Math.min(at + WINDOW, end));
        const priceM = /\bprice:\s*(\d+)/.exec(windowText);
        if (!priceM) continue;
        const current = parseInt(priceM[1], 10);
        if (current !== want) {
            src = spliceAt(src, at + priceM.index, priceM[0], `price: ${want}`);
            changes.push({ file: 'src/data/showcase-products.ts', sku, from: current, to: want });
            touched = true;
        }
        const origM = /\boriginalPrice:\s*(\d+)/.exec(src.slice(at, Math.min(at + WINDOW, end + 40)));
        if (origM && parseInt(origM[1], 10) < want) {
            src = spliceAt(src, at + origM.index, origM[0], `originalPrice: ${want}`);
            touched = true;
        }
    }
    if (touched && !DRY) writeFileSync(SHOWCASE, src);
}

// ─────────────────────────── تقرير + تحقق مغلق الحلقة ───────────────────────────
for (const c of changes) console.log(`  💱 ${c.sku}: ${c.from} → ${c.to} (${c.file})`);
for (const s of skipped) console.log(`  ⛔ تخطٍّ (تغيّر ${s.pct}% > 50%): ${s.sku} ${s.from} → ${s.to} — مرّره بـALLOW_LARGE=1 لو مقصود`);
console.log(`\n📊 تغييرات: ${changes.length} | متخطّى: ${skipped.length}`);

if (DRY) {
    console.log('🧪 DRY_RUN — لم يُكتب أي ملف');
    process.exit(0);
}

if (changes.length > 0) {
    // إعادة توليد كتالوج العميل تنفّذ ملفات TS المرقَّعة فعلياً — خطأ syntax يفشل هنا
    const gen = spawnSync('node', ['scripts/generate-client-catalog.mjs'], { cwd: ROOT, stdio: 'inherit' });
    if (gen.status !== 0) {
        console.error('❌ فشل توليد كتالوج العميل بعد الترقيع — راجع الملفات، لا commit');
        process.exit(1);
    }
    // تحقق نهائي: الأسعار المُنفَّذة من الملفات نفسها تطابق المستهدف
    const generated = readFileSync(GENERATED, 'utf8');
    const genEntries = extractEntries(generated);
    const genBySku = new Map(genEntries.map((e) => [e.sku.toUpperCase(), e.price]));
    let bad = 0;
    for (const c of changes) {
        const got = genBySku.get(c.sku.toUpperCase());
        // showcase ليست في كتالوج العميل — نتحقق من أصناف المنتجات فقط
        if (c.file.startsWith('src/data/products/') && got !== c.to) {
            console.error(`❌ تحقق فاشل: ${c.sku} متوقع ${c.to} لكن الكتالوج المولَّد يحمل ${got}`);
            bad++;
        }
    }
    if (bad > 0) process.exit(1);
    console.log('✅ التحقق المغلق نجح — الأسعار المُنفَّذة تطابق المحاسبة');
}
