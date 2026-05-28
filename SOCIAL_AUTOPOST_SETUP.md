# 🚀 دليل إعداد النشر التلقائي على السوشيال ميديا

## كيف يعمل النظام؟

```
تضيف ملف تدوينة جديد في src/data/blog/
              ↓
git add . && git commit -m "new blog post"
              ↓
git push → GitHub يستقبل الـ push
              ↓
GitHub Action يشتغل تلقائياً (مجاني 100%)
              ↓
يكتشف الملف الجديد من git diff
              ↓
يقرأ العنوان والمقتطف والصورة من الملف
              ↓
ينشر على Facebook Page + Instagram
              ↓
✅ تم!
```

---

## الخطوة 1: احصل على Page Access Token

### أ) اذهب لـ Graph API Explorer
1. افتح: https://developers.facebook.com/tools/explorer/?app_id=907132105674243
2. انقر **"Generate Access Token"**
3. وافق على الصلاحيات (pages_manage_posts)
4. بعد التوليد، انقر **"User Token" ▼**
5. اختر **"Get Page Access Token"**
6. اختر صفحة **CairoVolt**
7. انسخ الـ token الجديد (يبدأ بـ EAA)

### ب) حوّله لـ Long-Lived Token (60 يوم)
```bash
curl "https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=907132105674243&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_TOKEN"
```

احتفظ بالـ `access_token` من الرد.

### ج) احصل على Page ID
```bash
curl "https://graph.facebook.com/v21.0/me?fields=id,name&access_token=YOUR_PAGE_TOKEN"
```

### د) احصل على Instagram User ID (اختياري)
```bash
curl "https://graph.facebook.com/v21.0/YOUR_PAGE_ID?fields=instagram_business_account&access_token=YOUR_PAGE_TOKEN"
```

---

## الخطوة 2: أضف Secrets في GitHub

1. افتح مستودعك على GitHub
2. اذهب لـ **Settings → Secrets and variables → Actions**
3. انقر **"New repository secret"** وأضف:

| الاسم | القيمة | مطلوب؟ |
|-------|--------|---------|
| `FB_PAGE_ACCESS_TOKEN` | الـ token من الخطوة 1 | ✅ نعم |
| `FB_PAGE_ID` | رقم صفحتك (مثل: 123456789) | ✅ نعم |
| `IG_USER_ID` | رقم Instagram Business | اختياري |
| `FB_TOKEN_CREATED_DATE` | تاريخ توليد الـ token (مثل: 2026-05-28) | للتنبيه |

---

## الخطوة 3: الاختبار

### اختبار dry run (بدون نشر فعلي):
1. اذهب لـ Actions في GitHub
2. اختر **"Auto-Post New Blog Articles to Social Media"**
3. انقر **"Run workflow"**
4. ادخل slug أي مقال موجود في `force_slug`
5. فعّل **"Dry run"**
6. انقر **Run**

### اختبار حقيقي:
```bash
# أضف مقال جديد
cp src/data/blog/best-power-bank-egypt-2026.ts src/data/blog/test-article-$(date +%s).ts
git add .
git commit -m "test: add new blog post for social auto-post"
git push
```

---

## ⏰ تجديد الـ Token (كل 60 يوم)

يُنبّهك النظام تلقائياً عند تشغيل workflow يدوي إذا كان الـ token سينتهي خلال 7 أيام.

لتجديده:
1. اتبع الخطوة 1 مرة أخرى
2. عدّل `FB_PAGE_ACCESS_TOKEN` في GitHub Secrets
3. عدّل `FB_TOKEN_CREATED_DATE` بالتاريخ الجديد

---

## 🐛 استكشاف الأخطاء

### المنشور لم يظهر على Facebook؟
- تأكد من أن الـ Token هو **Page Access Token** وليس User Token
- تأكد من أن التطبيق في **Development Mode** مع إضافة نفسك كـ Admin
- تحقق من logs الـ Action في GitHub → Actions

### Instagram لا يعمل؟
- تأكد من أن الحساب **Business Account** وليس شخصي
- تأكد من ربطه بالـ Facebook Page
- صورة الغلاف يجب أن تكون عامة (public URL)

---

## 📊 حدود الاستخدام المجاني

| الخدمة | الحد |
|--------|------|
| GitHub Actions | 2,000 دقيقة/شهر مجاناً |
| وقت كل run | ~2-3 دقائق |
| المقالات/شهر المجانية | ~600+ |
| Meta Graph API | مجاني بدون حد |
