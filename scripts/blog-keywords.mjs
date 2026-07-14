#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// blog-keywords v3 — Smart keyword extraction for ANY blog article.
//
// ▸ 3 keyword sources:
//   1. complete-keywords.csv    (944 — model/bridge clusters)
//   2. master-relevant.csv      (651 — core/problem/bridge)
//   3. article-final.json       (category map)
//
// ▸ Smart matching with RELEVANCE SCORING:
//   - Parses slug into semantic tokens (brand, product, topic, intent)
//   - Scores each keyword by how many tokens it matches
//   - Requires minimum relevance threshold to eliminate noise
//   - Boosts exact phrase matches
//
// Usage:
//   npm run kw:blog -- --slug=samsung-25w-charger-original-vs-fake-comparison
//   npm run kw:blog -- --cluster=charging_problem
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KW_DIR = path.join(ROOT, 'keyword-research');
const CSV_COMPLETE = path.join(KW_DIR, 'complete-keywords.csv');
const CSV_MASTER = path.join(KW_DIR, 'master-relevant.csv');
const JSON_FINAL = path.join(KW_DIR, 'article-final.json');

const argv = process.argv.slice(2);
const flag = (n) => { const h = argv.find(a => a.startsWith(`--${n}=`)); return h ? h.split('=').slice(1).join('=') : undefined; };
const slug = flag('slug');
const clusterQ = flag('cluster');
if (!slug && !clusterQ) {
    console.error('استخدم --slug=<slug> أو --cluster=<نص>'); process.exit(1);
}

// ── Utils ──
const isArabic = (s) => /[ء-ي]/.test(s);
const cleanBOM = (s) => s.replace(/^\uFEFF/, '');

// ─────────────────────────────────────────────────────────────────────────────
// Semantic slug decomposition
// ─────────────────────────────────────────────────────────────────────────────
function decomposeSlug(s) {
    const tokens = s.split('-').filter(t => t.length > 1);

    // Bilingual search terms — each term has a weight
    const terms = []; // { text: string, lang: 'ar'|'en'|'*', weight: number }

    // ── Brand layer ──
    const brandMap = {
        'samsung':   { ar: ['سامسونج','شاحن سامسونج'], en: ['samsung'] },
        'iphone':    { ar: ['ايفون','آيفون','شاحن ايفون'], en: ['iphone','apple'] },
        'anker':     { ar: ['انكر','أنكر'], en: ['anker'] },
        'soundcore': { ar: ['ساوند كور'], en: ['soundcore'] },
        'oppo':      { ar: ['اوبو'], en: ['oppo'] },
        'xiaomi':    { ar: ['شاومي','ريدمي'], en: ['xiaomi','redmi'] },
        'realme':    { ar: ['ريلمي'], en: ['realme'] },
        'joyroom':   { ar: ['جويروم'], en: ['joyroom'] },
        'huawei':    { ar: ['هواوي'], en: ['huawei'] },
        'apple':     { ar: ['ابل','آبل'], en: ['apple'] },
        'kemei':     { ar: ['كيمي'], en: ['kemei'] },
        'moser':     { ar: ['موزر'], en: ['moser'] },
    };

    // ── Product layer ──
    const productMap = {
        'charger':      { ar: ['شاحن','شواحن','الشاحن','رأس شاحن','الشحن'], en: ['charger','charging adapter'] },
        'power':        { ar: ['باور بانك','بطارية محمولة','بنك طاقة'], en: ['power bank','powerbank','portable charger'] },
        'cable':        { ar: ['كابل','سلك شحن','وصلة','كيبل'], en: ['cable','cord'] },
        'earbuds':      { ar: ['سماعة','سماعات','ايربودز'], en: ['earbuds','earphones'] },
        'headphones':   { ar: ['سماعة رأس','هيدفون'], en: ['headphones','over-ear'] },
        'speaker':      { ar: ['سبيكر','مكبر صوت'], en: ['speaker','bluetooth speaker'] },
        'watch':        { ar: ['ساعة','ساعة ذكية'], en: ['watch','smartwatch'] },
        'wireless':     { ar: ['لاسلكي','وايرلس'], en: ['wireless','qi','magsafe'] },
    };

    // ── Topic/Intent layer ──
    const topicMap = {
        'fake':         { ar: ['تقليد','مقلد','مضروب'], en: ['fake','counterfeit','knockoff'] },
        'original':     { ar: ['أصلي','اصلي','ضمان','الأصلي'], en: ['original','genuine','authentic','real'] },
        'comparison':   { ar: ['مقارنة','ضد','الفرق'], en: ['vs','versus','comparison','difference'] },
        'guide':        { ar: ['دليل'], en: ['guide'] },
        'price':        { ar: ['سعر','أسعار','ثمن'], en: ['price','cost','prices'] },
        'best':         { ar: ['أفضل','افضل'], en: ['best','top'] },
        'fast':         { ar: ['سريع','شحن سريع'], en: ['fast','super fast','quick charge'] },
        'battery':      { ar: ['بطارية','شحن البطارية'], en: ['battery'] },
        'protect':      { ar: ['حماية','حمي','أمان'], en: ['protect','protection','safety'] },
        'explosion':    { ar: ['انفجار','حريق'], en: ['explosion','fire','dangerous'] },
        'heat':         { ar: ['حرارة','سخونة','سخن'], en: ['heat','hot','overheat','temperature'] },
        'damage':       { ar: ['ضرر','تلف'], en: ['damage','harm'] },
        'speed':        { ar: ['سرعة'], en: ['speed'] },
        'identify':     { ar: ['تعرف','تكشف','تفرق'], en: ['identify','spot','detect','tell'] },
        'gan':          { ar: ['جان','نيتريد الجاليوم'], en: ['gan','gallium nitride'] },
        'usb':          { ar: [], en: ['usb-c','usb','type-c','lightning'] },
        'pd':           { ar: [], en: ['pd','pps','qc','quick charge'] },
        'car':          { ar: ['عربية','سيارة'], en: ['car'] },
        'laptop':       { ar: ['لابتوب'], en: ['laptop'] },
        'transfer':     { ar: ['نقل','بيانات'], en: ['transfer','data'] },
        'warranty':     { ar: ['ضمان','استبدال','توكيل'], en: ['warranty','replacement','authorized'] },
        'egypt':        { ar: ['مصر','القاهرة'], en: ['egypt','cairo'] },
    };

    // Detect matches
    const detected = { brands: [], products: [], topics: [] };

    for (const [key, val] of Object.entries(brandMap)) {
        if (tokens.includes(key) || s.includes(key)) {
            detected.brands.push(key);
            val.ar.forEach(t => terms.push({ text: t, lang: 'ar', weight: 3 }));
            val.en.forEach(t => terms.push({ text: t, lang: 'en', weight: 3 }));
        }
    }
    for (const [key, val] of Object.entries(productMap)) {
        if (tokens.includes(key)) {
            detected.products.push(key);
            val.ar.forEach(t => terms.push({ text: t, lang: 'ar', weight: 3 }));
            val.en.forEach(t => terms.push({ text: t, lang: 'en', weight: 3 }));
        }
    }
    for (const [key, val] of Object.entries(topicMap)) {
        if (tokens.includes(key)) {
            detected.topics.push(key);
            val.ar.forEach(t => terms.push({ text: t, lang: 'ar', weight: 2 }));
            val.en.forEach(t => terms.push({ text: t, lang: 'en', weight: 2 }));
        }
    }

    // Watt/mAh numbers
    const wm = s.match(/(\d+)w/); if (wm) { terms.push({ text: `${wm[1]}w`, lang: '*', weight: 4 }, { text: `${wm[1]} واط`, lang: 'ar', weight: 4 }); }
    const mm = s.match(/(\d+)mah/); if (mm) { terms.push({ text: `${mm[1]}mah`, lang: '*', weight: 4 }, { text: `${mm[1]} ملي`, lang: 'ar', weight: 3 }); }

    // Compound phrases (high value — brand+product combos)
    if (detected.brands.length && detected.products.length) {
        const b = detected.brands[0], p = detected.products[0];
        const combos = {
            'samsung+charger': { ar: ['شاحن سامسونج','شاحن سامسونج اصلي','شاحن سامسونج الأصلي','شواحن سامسونج'], en: ['samsung charger','samsung original charger'] },
            'samsung+power':   { ar: ['باور بانك سامسونج'], en: ['samsung power bank'] },
            'iphone+charger':  { ar: ['شاحن ايفون','شاحن ايفون اصلي','شاحن آيفون'], en: ['iphone charger','apple charger'] },
            'iphone+cable':    { ar: ['كابل ايفون','وصلة ايفون','سلك ايفون'], en: ['iphone cable','lightning cable'] },
            'anker+charger':   { ar: ['شاحن انكر','شواحن انكر'], en: ['anker charger'] },
            'anker+power':     { ar: ['باور بانك انكر'], en: ['anker power bank'] },
            'anker+cable':     { ar: ['كابل انكر'], en: ['anker cable'] },
        };
        const comboKey = `${b}+${p}`;
        if (combos[comboKey]) {
            combos[comboKey].ar.forEach(t => terms.push({ text: t, lang: 'ar', weight: 5 }));
            combos[comboKey].en.forEach(t => terms.push({ text: t, lang: 'en', weight: 5 }));
        }
    }

    return { terms, detected };
}

// ─────────────────────────────────────────────────────────────────────────────
// Load all keyword sources into a flat list
// ─────────────────────────────────────────────────────────────────────────────
const allKeywords = []; // { kw, vol, source, lang }
const seenKw = new Set();
const addKw = (kw, vol, source) => {
    if (!kw || seenKw.has(kw)) return;
    seenKw.add(kw);
    allKeywords.push({ kw, vol, source, lang: isArabic(kw) ? 'ar' : 'en' });
};

// Source 1: complete-keywords.csv
if (fs.existsSync(CSV_COMPLETE)) {
    const text = cleanBOM(fs.readFileSync(CSV_COMPLETE, 'utf8'));
    for (const line of text.split(/\r?\n/).slice(1)) {
        if (!line.trim()) continue;
        const parts = line.split(',');
        addKw(parts[2]?.trim(), parseInt(parts[3]) || 0, 'complete');
    }
}

// Source 2: master-relevant.csv
if (fs.existsSync(CSV_MASTER)) {
    const text = cleanBOM(fs.readFileSync(CSV_MASTER, 'utf8'));
    for (const line of text.split(/\r?\n/).slice(1)) {
        if (!line.trim()) continue;
        const parts = line.split(',');
        addKw(parts[1]?.trim(), parseInt(parts[2]) || 0, 'master');
    }
}

// Source 3: article-final.json
if (fs.existsSync(JSON_FINAL)) {
    const data = JSON.parse(fs.readFileSync(JSON_FINAL, 'utf8'));
    for (const cat of Object.values(data)) {
        for (const sub of Object.values(cat)) {
            if (sub.top) sub.top.forEach(item => addKw(item.kw, item.vol || 0, 'final'));
        }
    }
}

console.log(`\n📊 مصادر البيانات: ${allKeywords.length} كلمة مفتاحية فريدة`);

// ─────────────────────────────────────────────────────────────────────────────
// Score and match
// ─────────────────────────────────────────────────────────────────────────────
let results = [];

if (clusterQ) {
    const q = clusterQ.toLowerCase();
    // Direct cluster mode — search keyword text
    results = allKeywords.filter(r => r.kw.toLowerCase().includes(q)).map(r => ({ ...r, score: 10 }));
} else {
    const { terms, detected } = decomposeSlug(slug);

    console.log(`🧠 تحليل: brands=[${detected.brands}] products=[${detected.products}] topics=[${detected.topics}]`);
    console.log(`   ${terms.length} مصطلح بحث مولّد\n`);

    for (const r of allKeywords) {
        const kwLower = r.kw.toLowerCase();
        let score = 0;
        let matchedTerms = 0;
        let matchedLayers = new Set(); // brand, product, topic

        for (const term of terms) {
            // Language filter: ar terms match ar keywords, en match en, * matches both
            if (term.lang !== '*' && term.lang !== r.lang) continue;

            if (kwLower.includes(term.text.toLowerCase())) {
                score += term.weight;
                matchedTerms++;
                // Track which layers matched
                if (detected.brands.some(b => term.text.toLowerCase().includes(b))) matchedLayers.add('brand');
                if (detected.products.some(p => {
                    const pTerms = { charger: ['شاحن','charger'], power: ['باور','power'], cable: ['كابل','cable'],
                                     earbuds: ['سماعة','earbud'], speaker: ['سبيكر','speaker'], watch: ['ساعة','watch'],
                                     wireless: ['لاسلكي','wireless'] };
                    return (pTerms[p] || []).some(pt => term.text.toLowerCase().includes(pt));
                })) matchedLayers.add('product');
                if (detected.topics.some(t => term.text.toLowerCase().includes(t))) matchedLayers.add('topic');
            }
        }

        // ── Relevance threshold ──
        // Lower threshold when we have compound terms (brand+product)
        const hasBrandAndProduct = detected.brands.length > 0 && detected.products.length > 0;
        const minScore = hasBrandAndProduct ? 3 : 2;

        if (score >= minScore && matchedTerms >= 1) {
            results.push({ ...r, score, matchedTerms, layers: [...matchedLayers] });
        }
    }

    // ── Smart Generation: if CSV data is sparse, generate topic-specific keywords ──
    if (results.length < 15) {
        const generated = [];
        const genSet = new Set(results.map(r => r.kw));

        // Brand + Product combos (most valuable for SEO)
        const brandAr = { samsung: 'سامسونج', iphone: 'ايفون', anker: 'انكر', apple: 'ابل', oppo: 'اوبو', xiaomi: 'شاومي', joyroom: 'جويروم', huawei: 'هواوي', realme: 'ريلمي' };
        const productAr = { charger: 'شاحن', power: 'باور بانك', cable: 'كابل', earbuds: 'سماعة', speaker: 'سبيكر', watch: 'ساعة', wireless: 'شاحن لاسلكي' };
        const productEn = { charger: 'charger', power: 'power bank', cable: 'cable', earbuds: 'earbuds', speaker: 'speaker', watch: 'watch', wireless: 'wireless charger' };
        const topicAr = { fake: 'تقليد', original: 'اصلي', price: 'سعر', best: 'أفضل', guide: 'دليل', comparison: 'مقارنة', fast: 'سريع', protect: 'حماية', explosion: 'انفجار', heat: 'حرارة', battery: 'بطارية', damage: 'ضرر', identify: 'كشف', warranty: 'ضمان', egypt: 'مصر' };
        const topicEn = { fake: 'fake', original: 'original', price: 'price', best: 'best', guide: 'guide', comparison: 'vs', fast: 'fast charging', protect: 'safety', explosion: 'explosion', heat: 'overheating', battery: 'battery', damage: 'damage', identify: 'identify', warranty: 'warranty', egypt: 'egypt' };

        const addGen = (kw, lang) => { if (!genSet.has(kw)) { genSet.add(kw); generated.push({ kw, vol: 0, source: 'generated', lang, score: 8, matchedTerms: 3, layers: ['generated'] }); } };

        for (const b of detected.brands) {
            const bAr = brandAr[b] || b;
            for (const p of detected.products) {
                const pAr = productAr[p] || p;
                const pEn = productEn[p] || p;
                // Base: brand+product
                addGen(`${pAr} ${bAr}`, 'ar');
                addGen(`${pAr} ${bAr} اصلي`, 'ar');
                addGen(`${pAr} ${bAr} في مصر`, 'ar');
                addGen(`سعر ${pAr} ${bAr}`, 'ar');
                addGen(`${b} ${pEn}`, 'en');
                addGen(`${b} ${pEn} original`, 'en');
                addGen(`${b} ${pEn} price egypt`, 'en');

                // With wattage
                const wm = slug.match(/(\d+)w/);
                if (wm) {
                    addGen(`${pAr} ${bAr} ${wm[1]} واط`, 'ar');
                    addGen(`${pAr} ${bAr} ${wm[1]}w`, 'ar');
                    addGen(`${b} ${wm[1]}w ${pEn}`, 'en');
                }
                const mm = slug.match(/(\d+)mah/);
                if (mm) {
                    addGen(`${pAr} ${bAr} ${mm[1]}`, 'ar');
                    addGen(`${b} ${mm[1]}mah ${pEn}`, 'en');
                }

                // With topics
                for (const t of detected.topics) {
                    const tAr = topicAr[t] || t;
                    const tEn = topicEn[t] || t;
                    addGen(`${pAr} ${bAr} ${tAr}`, 'ar');
                    addGen(`${b} ${pEn} ${tEn}`, 'en');
                    // Long-tail
                    addGen(`كشف ${pAr} ${bAr} ال${tAr}`, 'ar');
                    addGen(`الفرق بين ${pAr} ${bAr} الاصلي وال${tAr}`, 'ar');
                    addGen(`how to spot ${tEn} ${b} ${pEn}`, 'en');
                }
            }

            // Brand-only with topics
            for (const t of detected.topics) {
                addGen(`${bAr} ${topicAr[t] || t}`, 'ar');
                addGen(`${b} ${topicEn[t] || t}`, 'en');
            }
        }

        // Product-only with topics (no brand)
        if (!detected.brands.length) {
            for (const p of detected.products) {
                for (const t of detected.topics) {
                    addGen(`${productAr[p] || p} ${topicAr[t] || t}`, 'ar');
                    addGen(`${productEn[p] || p} ${topicEn[t] || t}`, 'en');
                    addGen(`${productAr[p] || p} ${topicAr[t] || t} في مصر`, 'ar');
                }
            }
        }

        results.push(...generated);
    }
}

// ── Sort by score then volume ──
results.sort((a, b) => (b.score - a.score) || (b.vol - a.vol));

// ── Dedupe ──
const seen = new Set();
results = results.filter(r => { if (seen.has(r.kw)) return false; seen.add(r.kw); return true; });

if (!results.length) {
    console.error(`\n✗ لا كلمات مفتاحية مطابقة لـ: ${slug || clusterQ}`);
    console.error('   جرّب --cluster=<نص> يدوياً (مثال: --cluster=شاحن أو --cluster=charger)');
    process.exit(1);
}

// Separate generated from CSV matches
const generated = results.filter(r => r.source === 'generated');
const fromCSV = results.filter(r => r.source !== 'generated');

// Sort CSV by score desc, then volume desc
fromCSV.sort((a, b) => (b.score - a.score) || (b.vol - a.vol));

// ── Output ──
const all = [...generated, ...fromCSV]; // generated first
const total = all.reduce((s, r) => s + r.vol, 0);
const arAll = all.filter(r => r.lang === 'ar');
const enAll = all.filter(r => r.lang === 'en');

console.log(`🎯 ${slug || clusterQ}  —  ${all.length} كلمة | ${total.toLocaleString()} بحث/شهر`);
console.log(`   🌐 عربي: ${arAll.length} (${arAll.reduce((s,r)=>s+r.vol,0).toLocaleString()}) · إنجليزي: ${enAll.length} (${enAll.reduce((s,r)=>s+r.vol,0).toLocaleString()})`);
if (generated.length) console.log(`   🤖 مولّدة ذكياً: ${generated.length} كلمة (خاصة بالموضوع)`);
console.log();

// Print generated first (most relevant)
if (generated.length) {
    console.log('── كلمات مولّدة (خاصة بالموضوع) ──');
    generated.forEach(r => console.log(`  ★     0 | ${r.lang} | ${r.kw}`));
    console.log();
}

// Print top CSV matches
if (fromCSV.length) {
    console.log('── كلمات من البحث (CSV) ──');
    const topCSV = fromCSV.slice(0, 25);
    topCSV.forEach(r => console.log(`  ${String(r.vol).padStart(6)} | ${r.lang} | ${r.kw}`));
    if (fromCSV.length > 25) console.log(`  ... و ${fromCSV.length - 25} كلمة أخرى`);
    console.log();
}

// ── Ready-to-paste keywords — generated first, then high-volume CSV ──
const arGenerated = generated.filter(r => r.lang === 'ar');
const enGenerated = generated.filter(r => r.lang === 'en');
const arCSV = fromCSV.filter(r => r.lang === 'ar');
const enCSV = fromCSV.filter(r => r.lang === 'en');

const pickAr = [...arGenerated.slice(0, 8), ...arCSV.slice(0, 4)].map(r => r.kw).slice(0, 12);
const pickEn = [...enGenerated.slice(0, 6), ...enCSV.slice(0, 4)].map(r => r.kw).slice(0, 10);

console.log(`${'═'.repeat(60)}`);
console.log(`📋 AR → translations.ar.keywords (8-12):`);
console.log(`   '${pickAr.join(', ')}'`);
if (pickEn.length) {
    console.log(`\n📋 EN → translations.en.keywords (8-12):`);
    console.log(`   '${pickEn.join(', ')}'`);
}
if (pickEn.length < 8) {
    console.log(`\n⚠️  كلمات EN قليلة (${enAll.length}) — كمّل en.keywords بترجمة أعلى كلمات AR + مصطلحات السوق الإنجليزي.`);
}
console.log(`\n💡 وزّع الكلمات على العنوان/H2/FAQ/المتن — لا تحشُها.\n`);

