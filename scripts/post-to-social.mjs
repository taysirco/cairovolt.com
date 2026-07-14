#!/usr/bin/env node
/**
 * post-to-social.mjs
 * ينشر مقال جديد على Facebook Page + Instagram Business Account
 * يُستدعى من GitHub Actions فقط
 */

// ─── Config ──────────────────────────────────────────────────────────────────
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
const FB_PAGE_ID           = process.env.FB_PAGE_ID;
const IG_USER_ID           = process.env.IG_USER_ID;
const DRY_RUN              = process.env.DRY_RUN === 'true';

const ARTICLE_SLUG         = process.env.ARTICLE_SLUG;
const ARTICLE_TITLE_AR     = process.env.ARTICLE_TITLE_AR;
const ARTICLE_EXCERPT_AR   = process.env.ARTICLE_EXCERPT_AR;
const ARTICLE_COVER        = process.env.ARTICLE_COVER;
const ARTICLE_CATEGORY     = process.env.ARTICLE_CATEGORY || 'buying-guide';
const ARTICLE_READING_TIME = process.env.ARTICLE_READING_TIME || '5';

const ARTICLE_URL = `https://cairovolt.com/blog/${ARTICLE_SLUG}`;
const COVER_URL   = ARTICLE_COVER
  ? `https://cairovolt.com${ARTICLE_COVER}`
  : null;

// ─── Emoji Map ────────────────────────────────────────────────────────────────
const categoryEmojis = {
  'buying-guide': '🛒',
  'comparison':   '⚖️',
  'how-to':       '🔧',
  'review':       '⭐',
  'tips':         '💡',
};

const categoryArabic = {
  'buying-guide': 'دليل الشراء',
  'comparison':   'مقارنة شاملة',
  'how-to':       'شرح خطوة بخطوة',
  'review':       'مراجعة',
  'tips':         'نصائح',
};

// ─── بناء نص المنشور ──────────────────────────────────────────────────────────
function buildPostText() {
  const emoji = categoryEmojis[ARTICLE_CATEGORY] || '📝';
  const catAr = categoryArabic[ARTICLE_CATEGORY] || '';

  return `${emoji} ${ARTICLE_TITLE_AR}

${ARTICLE_EXCERPT_AR}

⏱️ وقت القراءة: ${ARTICLE_READING_TIME} دقائق
🔗 اقرأ المقال كاملاً 👇
${ARTICLE_URL}

━━━━━━━━━━━━━━━━
🏪 كايرو فولت — الوكيل الرسمي لـ Anker و Joyroom في مصر
📦 توصيل لكل المحافظات | ضمان أصلي
🌐 cairovolt.com`;
}

// ─── Facebook API Helper ───────────────────────────────────────────────────────
async function fbPost(endpoint, body) {
  const url = `https://graph.facebook.com/v21.0/${endpoint}`;
  
  if (DRY_RUN) {
    console.log(`\n🔵 [DRY RUN] POST ${url}`);
    console.log('Body:', JSON.stringify(body, null, 2));
    return { id: 'dry-run-id-' + Date.now() };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, access_token: FB_PAGE_ACCESS_TOKEN }),
  });

  const data = await res.json();
  
  if (!res.ok || data.error) {
    throw new Error(`Facebook API Error: ${JSON.stringify(data.error || data)}`);
  }
  
  return data;
}

// ─── 1. نشر على Facebook Page ────────────────────────────────────────────────
async function postToFacebook() {
  console.log('\n📘 النشر على Facebook Page...');

  const postText = buildPostText();

  // الخطوة 1: إجبار Facebook على قراءة OG tags الجديدة (مسح cache القديم)
  if (!DRY_RUN && COVER_URL) {
    console.log('  🔄 تحديث Facebook OG cache...');
    try {
      const scrapeUrl = `https://graph.facebook.com/v21.0/?id=${encodeURIComponent(ARTICLE_URL)}&scrape=true&access_token=${FB_PAGE_ACCESS_TOKEN}`;
      const scrapeRes = await fetch(scrapeUrl, { method: 'POST' });
      const scrapeData = await scrapeRes.json();
      if (scrapeData.og_object) {
        console.log('  ✅ Cache محدّث بنجاح');
      } else {
        console.log('  ⚠️ Scrape: ' + JSON.stringify(scrapeData).slice(0, 100));
      }
    } catch (e) {
      console.log(`  ⚠️ Scrape فشل: ${e.message} — متابعة...`);
    }
    await new Promise(r => setTimeout(r, 2000));
  }

  let result;

  // الخطوة 2: رفع صورة الغلاف مباشرة (يضمن ظهورها بدون الاعتماد على cache)
  if (COVER_URL && !DRY_RUN) {
    console.log('  📸 رفع صورة الغلاف مباشرة على Facebook...');
    const photoRes = await fetch(`https://graph.facebook.com/v21.0/${FB_PAGE_ID}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: COVER_URL,
        published: false,
        access_token: FB_PAGE_ACCESS_TOKEN,
      }),
    });
    const photoData = await photoRes.json();

    if (photoData.id && !photoData.error) {
      console.log(`  ✅ Photo ID: ${photoData.id} — ربط بالمنشور...`);
      result = await fbPost(`${FB_PAGE_ID}/feed`, {
        message: postText,
        link: ARTICLE_URL,
        attached_media: [{ media_fbid: photoData.id }],
      });
    } else {
      console.log(`  ⚠️ رفع الصورة فشل: ${JSON.stringify(photoData.error)} — نشر بالـ link فقط`);
      result = await fbPost(`${FB_PAGE_ID}/feed`, {
        message: postText,
        link: ARTICLE_URL,
      });
    }
  } else {
    result = await fbPost(`${FB_PAGE_ID}/feed`, {
      message: postText,
      link: ARTICLE_URL,
    });
  }

  console.log(`✅ Facebook: نُشر بنجاح! Post ID: ${result.id}`);
  return result.id;
}

// ─── 2. نشر على Instagram ────────────────────────────────────────────────────
async function postToInstagram() {
  if (!IG_USER_ID) {
    console.log('⚠️ IG_USER_ID غير محدد — تخطي Instagram');
    return null;
  }
  
  if (!COVER_URL) {
    console.log('⚠️ لا توجد صورة غلاف — تخطي Instagram (يتطلب صورة)');
    return null;
  }

  console.log('\n📸 النشر على Instagram...');

  const caption = buildInstagramCaption();

  // الخطوة 1: إنشاء container
  console.log('  📤 إنشاء media container...');
  const containerResult = await fbPost(`${IG_USER_ID}/media`, {
    image_url: COVER_URL,
    caption: caption,
  });
  
  const containerId = containerResult.id;
  console.log(`  ✅ Container ID: ${containerId}`);

  // انتظر ثانية واحدة (Instagram يحتاج وقتاً لمعالجة الصورة)
  if (!DRY_RUN) {
    await new Promise(r => setTimeout(r, 3000));
  }

  // الخطوة 2: نشر الـ container
  console.log('  📢 نشر على Instagram...');
  const publishResult = await fbPost(`${IG_USER_ID}/media_publish`, {
    creation_id: containerId,
  });

  console.log(`✅ Instagram: نُشر بنجاح! Media ID: ${publishResult.id}`);
  return publishResult.id;
}

function buildInstagramCaption() {
  const emoji = categoryEmojis[ARTICLE_CATEGORY] || '📝';
  
  // Instagram يسمح بـ 2200 حرف بحد أقصى
  return `${emoji} ${ARTICLE_TITLE_AR}

${ARTICLE_EXCERPT_AR}

⏱️ ${ARTICLE_READING_TIME} دقائق قراءة
🔗 الرابط في البيو 👆

━━━━━━━━━━━━━━━━
#كايرو_فولت #اكسسوارات_موبايل #انكر #جوي_روم
#باور_بانك #شواحن #سماعات #مصر
#CairoVolt #Anker #Joyroom #Egypt
#MobileAccessories #PowerBank`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 بدء النشر على السوشيال ميديا...');
  console.log(`📄 المقال: ${ARTICLE_SLUG}`);
  console.log(`🌐 الرابط: ${ARTICLE_URL}`);
  console.log(`🖼️  الغلاف: ${COVER_URL || 'لا توجد صورة'}`);
  if (DRY_RUN) console.log('🔵 وضع DRY RUN — لن يتم نشر فعلي\n');

  // التحقق من الـ secrets المطلوبة
  if (!FB_PAGE_ACCESS_TOKEN && !DRY_RUN) {
    console.error('❌ FB_PAGE_ACCESS_TOKEN غير محدد!');
    console.error('   أضفه في: Settings → Secrets and variables → Actions → New repository secret');
    process.exit(1);
  }

  if (!FB_PAGE_ID && !DRY_RUN) {
    console.error('❌ FB_PAGE_ID غير محدد!');
    process.exit(1);
  }

  if (!ARTICLE_SLUG) {
    console.error('❌ ARTICLE_SLUG غير محدد!');
    process.exit(1);
  }

  const results = {
    facebook: null,
    instagram: null,
    errors: [],
  };

  // نشر Facebook
  try {
    results.facebook = await postToFacebook();
  } catch (err) {
    console.error('❌ فشل النشر على Facebook:', err.message);
    results.errors.push(`Facebook: ${err.message}`);
  }

  // نشر Instagram
  try {
    results.instagram = await postToInstagram();
  } catch (err) {
    console.error('❌ فشل النشر على Instagram:', err.message);
    results.errors.push(`Instagram: ${err.message}`);
  }

  // ملخص النتائج
  console.log('\n' + '═'.repeat(50));
  console.log('📊 ملخص النشر:');
  console.log(`  Facebook:  ${results.facebook ? `✅ ${results.facebook}` : '❌ فشل'}`);
  console.log(`  Instagram: ${results.instagram ? `✅ ${results.instagram}` : (IG_USER_ID ? '❌ فشل' : '⏭️ تم التخطي')}`);
  console.log('═'.repeat(50));

  if (results.errors.length > 0 && !results.facebook && !results.instagram) {
    console.error('\n❌ فشل النشر بالكامل!');
    process.exit(1);
  }

  console.log('\n🎉 تم النشر بنجاح!');
}

main().catch(err => {
  console.error('💥 خطأ غير متوقع:', err);
  process.exit(1);
});
