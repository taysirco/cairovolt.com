#!/usr/bin/env node
/**
 * post-scheduled-articles.mjs
 * ───────────────────────────────────────────────────────────────────────────
 * ينشر على Facebook Page + Instagram المقالات التي أصبحت LIVE فعلياً حسب جدول
 * النشر (publishDate)، وليس عند إضافة الملف. ده يصلح مشكلة إن كل المقالات
 * مرفوعة مسبقاً في الريبو وبتظهر تدريجياً كل يوم — الـ push مبيحصلش لما المقال
 * "يطلع"، فالنشر التلقائي كان بيقف.
 *
 * التشغيل: من GitHub Actions عبر cron كل بضع ساعات (+ workflow_dispatch يدوي).
 *
 * منطق منع التكرار (idempotency): ملف scripts/social-post-ledger.json فيه قائمة
 * الـ slugs المنشورة. كل تشغيل بينشر المقالات الـ LIVE اللي لسه مش في القائمة
 * (الأقدم أولاً، بحد أقصى MAX_PER_RUN)، وبيضيفها للقائمة. الـ workflow بيعمل
 * commit للقائمة بعد كده. عشان كده لو الـ cron اتأخر أو فات، بيعوّض في التشغيلة
 * اللي بعدها من غير تكرار.
 * ───────────────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname   = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = resolve(__dirname, '..');

// ─── Config ────────────────────────────────────────────────────────────────
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
const FB_PAGE_ID           = process.env.FB_PAGE_ID;
const IG_USER_ID           = process.env.IG_USER_ID;
const DRY_RUN              = process.env.DRY_RUN === 'true';
const FORCE_SLUG          = process.env.FORCE_SLUG?.trim() || '';
const SKIP_IG             = process.env.SKIP_IG === 'true';   // اختبار فيسبوك وحده بدون تكرار انستجرام
const MAX_PER_RUN          = Math.max(1, parseInt(process.env.MAX_PER_RUN || '2', 10));

const SCHEDULE_FILE = resolve(projectRoot, 'src/data/blog-schedule.generated.ts');
const LEDGER_FILE   = resolve(projectRoot, 'scripts/social-post-ledger.json');
const GH_OUTPUT     = process.env.GITHUB_OUTPUT;

const categoryEmojis = { 'buying-guide': '🛒', comparison: '⚖️', 'how-to': '🔧', review: '⭐', tips: '💡' };
const categoryArabic = { 'buying-guide': 'دليل الشراء', comparison: 'مقارنة شاملة', 'how-to': 'شرح خطوة بخطوة', review: 'مراجعة', tips: 'نصائح' };

// ─── Ledger ─────────────────────────────────────────────────────────────────
function loadLedger() {
  if (!existsSync(LEDGER_FILE)) return { note: '', posted: [], updatedAt: null };
  try {
    const j = JSON.parse(readFileSync(LEDGER_FILE, 'utf8'));
    if (!Array.isArray(j.posted)) j.posted = [];
    return j;
  } catch {
    return { note: '', posted: [], updatedAt: null };
  }
}
function saveLedger(ledger, iso) {
  ledger.updatedAt = iso;
  writeFileSync(LEDGER_FILE, JSON.stringify(ledger, null, 2) + '\n');
}

// ─── Schedule (slug -> publishDate epoch ms) ─────────────────────────────────
function loadSchedule() {
  const src = readFileSync(SCHEDULE_FILE, 'utf8');
  const re = /['"]([a-z0-9-]+)['"]\s*:\s*(\d+)/g;
  const map = new Map();
  let m;
  while ((m = re.exec(src))) map.set(m[1], Number(m[2]));
  return map;
}

// ─── Extract article fields from its raw .ts file ────────────────────────────
function readArticle(slug) {
  const file = resolve(projectRoot, `src/data/blog/${slug}.ts`);
  if (!existsSync(file)) return null;
  const content = readFileSync(file, 'utf8');
  const field = (name) => {
    for (const p of [new RegExp(`\\b${name}:\\s*['"\`]([^'"\`\\n]+)['"\`]`), new RegExp(`\\b${name}:\\s*([0-9]+)`)]) {
      const mm = content.match(p);
      if (mm?.[1]) return mm[1].trim();
    }
    return '';
  };
  const arSection = content.match(/\bar:\s*\{([\s\S]+?)(?:\ben:\s*\{|^\s*\})/m)?.[1] || '';
  const titleAr   = arSection.match(/\btitle:\s*['"`]([^'"`\n]+)['"`]/)?.[1]?.trim() || field('title');
  const excerptAr = arSection.match(/\bexcerpt:\s*['"`]([^'"`\n]+)['"`]/)?.[1]?.trim() || field('excerpt');
  return {
    slug,
    titleAr,
    excerptAr,
    category: field('category') || 'buying-guide',
    readingTime: field('readingTime') || '5',
    coverImage: (field('coverImage') || '').split('?')[0],
  };
}

// ─── Post text builders ──────────────────────────────────────────────────────
function buildPostText(a, url) {
  const emoji = categoryEmojis[a.category] || '📝';
  return `${emoji} ${a.titleAr}

${a.excerptAr}

⏱️ وقت القراءة: ${a.readingTime} دقائق
🔗 اقرأ المقال كاملاً 👇
${url}

━━━━━━━━━━━━━━━━
🏪 كايرو فولت — متجر متخصص في منتجات انكر وساوندكور وجوي روم
📦 توصيل لكل المحافظات | ضمان كايرو فولت
🌐 cairovolt.com`;
}
function buildIgCaption(a) {
  const emoji = categoryEmojis[a.category] || '📝';
  return `${emoji} ${a.titleAr}

${a.excerptAr}

⏱️ ${a.readingTime} دقائق قراءة
🔗 الرابط في البيو 👆

━━━━━━━━━━━━━━━━
#كايرو_فولت #اكسسوارات_موبايل #انكر #ساوندكور #جوي_روم
#باور_بانك #شواحن #سماعات #مصر
#CairoVolt #Anker #Soundcore #Joyroom #Egypt`;
}

// ─── Facebook Graph helper ───────────────────────────────────────────────────
async function fbPost(endpoint, body, token) {
  const url = `https://graph.facebook.com/v21.0/${endpoint}`;
  if (DRY_RUN) { console.log(`  🔵 [DRY RUN] POST ${url}`); return { id: 'dry-' + Date.now() }; }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, access_token: token || FB_PAGE_ACCESS_TOKEN }),
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(`FB API: ${JSON.stringify(data.error || data)}`);
  return data;
}

// النشر على صفحة فيسبوك لازم يتم "باسم الصفحة" عبر Page access token — مش الـ
// System User token مباشرةً (وإلا يرجع الخطأ: "must be posted to a page as the
// page itself" / نقص pages_manage_posts). فنشتقّ الـ page token من التوكن مرة واحدة.
let _pageToken = null;
async function getPageToken() {
  if (_pageToken) return _pageToken;
  if (DRY_RUN || !FB_PAGE_ID) return FB_PAGE_ACCESS_TOKEN;
  try {
    const qs = new URLSearchParams({ fields: 'access_token', access_token: FB_PAGE_ACCESS_TOKEN }).toString();
    const res = await fetch(`https://graph.facebook.com/v21.0/${FB_PAGE_ID}?${qs}`);
    const data = await res.json();
    if (data.access_token) { console.log('  🔑 تم اشتقاق Page token من التوكن'); _pageToken = data.access_token; return _pageToken; }
    console.log(`  ⚠️ تعذّر اشتقاق Page token: ${data.error?.message || 'لا يوجد token'} — استخدام التوكن الأصلي`);
  } catch (e) { console.log(`  ⚠️ خطأ اشتقاق Page token: ${e.message}`); }
  _pageToken = FB_PAGE_ACCESS_TOKEN;
  return _pageToken;
}

async function postToFacebook(a, url, coverUrl) {
  console.log('  📘 Facebook...');
  const message = buildPostText(a, url);
  const pageToken = await getPageToken();
  if (!DRY_RUN && coverUrl) {
    try {
      await fetch('https://graph.facebook.com/v21.0/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: url, scrape: true, access_token: pageToken }),
      });
      await new Promise(r => setTimeout(r, 1500));
    } catch { /* cache refresh best-effort */ }
  }
  if (coverUrl && !DRY_RUN) {
    const photoRes = await fetch(`https://graph.facebook.com/v21.0/${FB_PAGE_ID}/photos`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: coverUrl, published: false, access_token: pageToken }),
    });
    const photo = await photoRes.json();
    if (photo.id && !photo.error) {
      const r = await fbPost(`${FB_PAGE_ID}/feed`, { message, link: url, attached_media: [{ media_fbid: photo.id }] }, pageToken);
      return r.id;
    }
    console.log(`  ⚠️ رفع الصورة فشل: ${JSON.stringify(photo.error)} — نشر بالرابط فقط`);
  }
  const r = await fbPost(`${FB_PAGE_ID}/feed`, { message, link: url }, pageToken);
  return r.id;
}

async function postToInstagram(a, coverUrl) {
  if (!IG_USER_ID) { console.log('  ⏭️ Instagram: IG_USER_ID غير محدد — تخطي'); return null; }
  if (!coverUrl)   { console.log('  ⏭️ Instagram: لا توجد صورة غلاف — تخطي'); return null; }
  console.log('  📸 Instagram...');
  const container = await fbPost(`${IG_USER_ID}/media`, { image_url: coverUrl, caption: buildIgCaption(a) });
  if (!DRY_RUN) await new Promise(r => setTimeout(r, 3000));
  const pub = await fbPost(`${IG_USER_ID}/media_publish`, { creation_id: container.id });
  return pub.id;
}

// ─── Pick targets ─────────────────────────────────────────────────────────────
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;   // أمان: لا تنشر مقالاً طلع من أكثر من 7 أيام
function pickTargets(schedule, ledger, now) {
  if (FORCE_SLUG) return [FORCE_SLUG];        // التشغيل اليدوي يتجاوز الحارس الزمني
  const postedSet = new Set(ledger.posted);
  return [...schedule.entries()]
    // LIVE (طلع) + خلال آخر 7 أيام + مش منشور قبل كده. الحارس الزمني يمنع إعادة
    // نشر الأرشيف كله لو ضاع السجل لأي سبب — أقصى ما يحدث نشر آخر 7 أيام فقط.
    .filter(([slug, t]) => t <= now && t >= now - MAX_AGE_MS && !postedSet.has(slug))
    .sort((x, y) => x[1] - y[1])              // الأقدم أولاً
    .slice(0, MAX_PER_RUN)
    .map(([slug]) => slug);
}

// ─── Token healthcheck (read-only — لا ينشر أي شيء) ──────────────────────────
// يتحقق أن FB_PAGE_ACCESS_TOKEN يقبله فيسبوك، ويصل للصفحة + انستجرام، ودائم،
// وعنده الصلاحيات المطلوبة. لا يطبع قيمة التوكن أبداً. يُستدعى في DRY_RUN فقط.
async function graphGet(path, params = {}) {
  const qs = new URLSearchParams({ ...params, access_token: FB_PAGE_ACCESS_TOKEN }).toString();
  const res = await fetch(`https://graph.facebook.com/v21.0/${path}?${qs}`);
  let data = {};
  try { data = await res.json(); } catch { /* non-json */ }
  return { ok: res.ok && !data.error, data };
}

async function healthcheck() {
  console.log('\n🩺 فحص التوكن (قراءة فقط — بدون نشر)');
  if (!FB_PAGE_ACCESS_TOKEN) { console.log('  ❌ FB_PAGE_ACCESS_TOKEN غير موجود'); return false; }
  let critical = true;

  // 1) صلاحية التوكن نفسه
  {
    const { ok, data } = await graphGet('me', { fields: 'id,name' });
    if (ok) console.log(`  ✅ التوكن صالح — الحساب: ${data.name || data.id}`);
    else { console.log(`  ❌ التوكن غير صالح: ${data.error?.message || JSON.stringify(data)}`); critical = false; }
  }

  // 2) الصفحة متاحة بالتوكن (شرط النشر على فيسبوك)
  if (FB_PAGE_ID) {
    const { ok, data } = await graphGet(FB_PAGE_ID, { fields: 'id,name' });
    if (ok) console.log(`  ✅ صفحة فيسبوك متاحة: ${data.name} (${data.id})`);
    else { console.log(`  ❌ الصفحة غير متاحة بالتوكن: ${data.error?.message || JSON.stringify(data)}`); critical = false; }
  } else { console.log('  ⚠️ FB_PAGE_ID غير محدد'); }

  // 3) انستجرام متاح بالتوكن
  if (IG_USER_ID) {
    const { ok, data } = await graphGet(IG_USER_ID, { fields: 'id,username' });
    if (ok) console.log(`  ✅ انستجرام متاح: @${data.username} (${data.id})`);
    else console.log(`  ⚠️ انستجرام غير متاح بالتوكن: ${data.error?.message || JSON.stringify(data)}`);
  } else { console.log('  ⚠️ IG_USER_ID غير محدد'); }

  // 4) الديمومة + الصلاحيات (self-debug — أفضل جهد، بدون طباعة التوكن)
  try {
    const qs = new URLSearchParams({ input_token: FB_PAGE_ACCESS_TOKEN, access_token: FB_PAGE_ACCESS_TOKEN }).toString();
    const res = await fetch(`https://graph.facebook.com/v21.0/debug_token?${qs}`);
    const d = (await res.json()).data;
    if (d && d.type) {
      const exp = d.expires_at === 0 ? 'دائم لا ينتهي ✅' : new Date(d.expires_at * 1000).toISOString().slice(0, 10);
      console.log(`  🗓️ انتهاء الصلاحية: ${exp}   |   النوع: ${d.type}`);
      if (Array.isArray(d.scopes)) {
        const need = ['pages_manage_posts', 'pages_read_engagement', 'instagram_basic', 'instagram_content_publish'];
        const missing = need.filter(s => !d.scopes.includes(s));
        if (missing.length === 0) console.log('  🔐 كل صلاحيات النشر المطلوبة موجودة ✅');
        else console.log(`  ⚠️ صلاحيات نشر ناقصة: ${missing.join(', ')}`);
      }
    }
  } catch { /* self-debug غير مدعوم لهذا التوكن — تخطي */ }

  return critical;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const now = Date.now();
  const nowIso = new Date(now).toISOString();
  console.log('🚀 نشر المقالات المجدولة الحيّة على السوشيال ميديا');
  if (DRY_RUN) console.log('🔵 DRY RUN — لا نشر فعلي');

  if (!DRY_RUN && (!FB_PAGE_ACCESS_TOKEN || !FB_PAGE_ID)) {
    console.error('❌ FB_PAGE_ACCESS_TOKEN أو FB_PAGE_ID غير محدد في الـ secrets');
    process.exit(1);
  }

  // في التشغيل التجريبي: افحص التوكن فعلياً ضد Graph API (بدون نشر) وأبلغ بالنتيجة
  if (DRY_RUN) {
    const healthy = await healthcheck();
    console.log(healthy
      ? '\n✅ فحص التوكن نجح — التوكن شغّال وجاهز للنشر على فيسبوك + انستجرام'
      : '\n❌ فحص التوكن فشل — راجع الأخطاء أعلاه');
    if (!healthy) process.exit(1);
  }

  const schedule = loadSchedule();
  const ledger   = loadLedger();
  console.log(`🗓️ الجدول: ${schedule.size} مقال | السجل: ${ledger.posted.length} منشور سابقاً`);

  const targets = pickTargets(schedule, ledger, now);
  if (targets.length === 0) {
    console.log('ℹ️ لا مقالات جديدة أصبحت حيّة للنشر الآن.');
    if (GH_OUTPUT) writeFileSync(GH_OUTPUT, 'ledger_changed=false\nposted_count=0\n', { flag: 'a' });
    return;
  }
  console.log(`🎯 مقالات للنشر (${targets.length}): ${targets.join(', ')}`);

  const postedSet = new Set(ledger.posted);
  let postedCount = 0;
  const failures = [];

  for (const slug of targets) {
    const a = readArticle(slug);
    if (!a || !a.titleAr) { console.warn(`  ⚠️ تعذّر قراءة بيانات ${slug} — تخطي`); failures.push(slug); continue; }
    const url = `https://cairovolt.com/blog/${slug}`;
    const coverUrl = a.coverImage ? `https://cairovolt.com${a.coverImage}` : null;
    console.log(`\n── ${slug} ──\n   ${a.titleAr}`);
    let fb = null, ig = null;
    try { fb = await postToFacebook(a, url, coverUrl); console.log(`  ✅ FB: ${fb}`); }
    catch (e) { console.error(`  ❌ FB فشل: ${e.message}`); }
    if (SKIP_IG) { console.log('  ⏭️ Instagram: تخطّي (SKIP_IG)'); }
    else {
      try { ig = await postToInstagram(a, coverUrl); if (ig) console.log(`  ✅ IG: ${ig}`); }
      catch (e) { console.error(`  ❌ IG فشل: ${e.message}`); }
    }
    if (fb || ig) { postedSet.add(slug); postedCount++; }   // سجّل فقط عند نجاح واحد على الأقل
    else { failures.push(slug); }                            // فشل كامل → يُعاد المحاولة لاحقاً
  }

  ledger.posted = [...postedSet];
  const changed = postedCount > 0;
  if (changed && !DRY_RUN) saveLedger(ledger, nowIso);

  console.log('\n' + '═'.repeat(48));
  console.log(`📊 نُشر: ${postedCount} | فشل: ${failures.length}${failures.length ? ' (' + failures.join(', ') + ')' : ''}`);
  console.log('═'.repeat(48));

  if (GH_OUTPUT) writeFileSync(GH_OUTPUT, `ledger_changed=${changed && !DRY_RUN}\nposted_count=${postedCount}\n`, { flag: 'a' });

  // فشل كامل لكل الأهداف (غالباً token منتهي) → علّم التشغيلة كفاشلة للتنبيه
  if (postedCount === 0 && failures.length > 0) process.exit(1);
}

main().catch(err => { console.error('💥 خطأ غير متوقع:', err); process.exit(1); });
