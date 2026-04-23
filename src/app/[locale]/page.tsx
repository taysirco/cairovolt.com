import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Metadata } from 'next';
import { OrganizationSchema } from '@/components/schemas/OrganizationSchema';
import { WebSiteSchema, CollectionPageSchema, SpeakableSchema, LocalBusinessSchema } from '@/components/schemas/StructuredDataSchemas';
import { SvgIcon } from '@/components/ui/SvgIcon';
import FAQSection from '@/components/content/FAQSection';
import ShareAnalytics from '@/components/content/ShareAnalytics';
import HeroSection from '@/components/home/HeroSection';
import TrustRibbon from '@/components/home/TrustRibbon';
import ProductShowcase from '@/components/home/ProductShowcase';
import SocialProofStrip from '@/components/home/SocialProofStrip';
import BrandShowcase from '@/components/home/BrandShowcase';

// ISR: On-demand revalidation only (via /api/indexing webhook)

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const baseMetadata = {
    alternates: {
      // Arabic is default locale - no /ar/ prefix
      canonical: locale === 'ar' ? 'https://cairovolt.com' : 'https://cairovolt.com/en',
      languages: {
        'ar-EG': 'https://cairovolt.com',
        'en-EG': 'https://cairovolt.com/en',
        'x-default': 'https://cairovolt.com',
      },
    },
  };

  if (locale === 'en') {
    return {
      ...baseMetadata,
      title: { absolute: 'Mobile Accessories Egypt | Anker & Joyroom ⚡ Best Prices + COD' },
      description: 'Shop original mobile accessories in Egypt. Anker power banks, chargers, cables. Joyroom T03s earbuds. 100% authentic with official warranty. Fast shipping.',
      keywords: 'mobile accessories, anker egypt, joyroom, power bank, earbuds, anker charger, joyroom t03s',
      openGraph: {
        title: 'Mobile Accessories Egypt | Anker & Joyroom',
        description: 'Original Anker & Joyroom accessories with official warranty.',
        url: 'https://cairovolt.com/en',
        locale: 'en_US',
        type: 'website',
        siteName: 'CairoVolt',
        images: [{
          url: '/og-cover.png',
          width: 1200,
          height: 630,
          alt: 'CairoVolt - Mobile Accessories Egypt',
        }],
      },
      other: {
        'geo.region': 'EG',
        'geo.placename': 'Cairo, Egypt',
        'geo.position': '30.0444;31.2357',
        'ICBM': '30.0444, 31.2357',
      },
    };
  }

  // Arabic (default)
  return {
    ...baseMetadata,
    title: { absolute: 'اكسسوارات موبايل مصر | Anker Egypt & Joyroom - أفضل الأسعار' },
    description: 'متجر اكسسوارات موبايل في مصر. Anker Egypt، Joyroom أصلي. باور بانك، سماعات، شواحن، كابلات. أفضل أسعار وضمان رسمي. منتجات أصلية 100%.',
    keywords: 'اكسسوارات موبايل, انكر مصر, أنكر, جوي روم, باور بانك, سماعات, شاحن انكر, شاحن انكر الاصلي, soundcore, سماعة انكر, ايربودز انكر, باور بانك انكر',
    openGraph: {
      title: 'اكسسوارات موبايل مصر | Anker Egypt & Joyroom',
      description: 'أفضل اكسسوارات موبايل أصلية في مصر. Anker و Joyroom بضمان رسمي.',
      url: 'https://cairovolt.com',
      locale: 'ar_EG',
      type: 'website',
      siteName: 'كايرو فولت',
      images: [{
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'كايرو فولت - اكسسوارات موبايل مصر',
      }],
    },
    other: {
      'geo.region': 'EG',
      'geo.placename': 'القاهرة، مصر',
      'geo.position': '30.0444;31.2357',
      'ICBM': '30.0444, 31.2357',
    },
  };
}

export default function Home() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Categories for CollectionPageSchema — preserve SEO structured data
  const schemaCategories = isRTL
    ? [
      { title: 'باور بانك', href: '/anker/power-banks' },
      { title: 'سماعات', href: '/joyroom/audio' },
      { title: 'شواحن', href: '/anker/wall-chargers' },
      { title: 'كابلات', href: '/anker/cables' },
    ]
    : [
      { title: 'Power Banks', href: '/en/anker/power-banks' },
      { title: 'Earbuds', href: '/en/joyroom/audio' },
      { title: 'Chargers', href: '/en/anker/wall-chargers' },
      { title: 'Cables', href: '/en/anker/cables' },
    ];

  return (
    <>
      {/* ==================== Structured Data Markup ==================== */}
      <OrganizationSchema locale={locale} />
      <LocalBusinessSchema locale={locale} />
      <WebSiteSchema locale={locale} />
      <CollectionPageSchema
        locale={locale}
        collections={schemaCategories.map(cat => ({
          name: cat.title,
          url: `https://cairovolt.com${cat.href}`,
          description: isRTL ? `تسوق ${cat.title} الأصلية` : `Shop original ${cat.title}`,
        }))}
      />
      <SpeakableSchema
        pageUrl={`https://cairovolt.com${isRTL ? '' : '/en'}`}
        speakableSelectors={['h1', '.hero-description', '.quality-badges']}
        headline={isRTL ? 'اكسسوارات موبايل Anker و Joyroom في مصر' : 'Anker & Joyroom Mobile Accessories in Egypt'}
        description={isRTL
          ? 'متجر إكسسوارات الموبايل الأصلية في مصر. باور بانك، سماعات، شواحن وكابلات Anker و Joyroom بضمان رسمي.'
          : 'Original mobile accessories store in Egypt. Power banks, earbuds, chargers & cables from Anker & Joyroom with official warranty.'}
        locale={locale}
      />
      {/* FAQPage Schema — Rich Snippets for high-volume queries */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': isRTL ? [
              {
                '@type': 'Question',
                'name': 'فين فروع وتوكيل انكر في مصر؟',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'كايرو فولت هو الموزع المعتمد لمنتجات انكر في مصر. نوصل لكل المحافظات عبر شركة بوسطة (Active). مقرنا في التجمع الثالث، القاهرة الجديدة.' }
              },
              {
                '@type': 'Question',
                'name': 'إزاي أتأكد إن شاحن انكر الأصلي مش تقليد؟',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'كل منتج انكر أصلي عليه كود QR على العلبة. امسحه على anker.com/verify وهيأكدلك الأصالة فوراً. لو اشتريت من كايرو فولت، كل المنتجات أصلية 100% مع ضمان 18 شهر.' }
              },
              {
                '@type': 'Question',
                'name': 'كم سعر باور بانك انكر 10000 في مصر؟',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'سعر باور بانك انكر 10000 هو 1,300 جنيه في كايرو فولت. يشمل ضمان 18 شهر وتوصيل سريع لكل مصر مع إمكانية الدفع عند الاستلام.' }
              },
              {
                '@type': 'Question',
                'name': 'كم سعر سماعة انكر Soundcore R50i في مصر؟',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'سعر سماعة Soundcore R50i هو 950 جنيه في كايرو فولت. بطارية 30 ساعة، BassUp، IPX5. ضمان 18 شهر وتوصيل لكل المحافظات.' }
              },
            ] : [
              {
                '@type': 'Question',
                'name': 'Where are Anker authorized dealers in Egypt?',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'CairoVolt is the authorized Anker distributor in Egypt, delivering to all 27 governorates via Active (Bosta) courier. Based in New Cairo 3rd Settlement.' }
              },
              {
                '@type': 'Question',
                'name': 'How to verify an original Anker charger?',
                'acceptedAnswer': { '@type': 'Answer', 'text': 'Every original Anker product has a QR code on the box. Scan it at anker.com/verify for instant authenticity confirmation. CairoVolt products are 100% original with 18-month warranty.' }
              },
            ]
          })
        }}
      />

      <div className="flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>

        {/* ==================== 1. Immersive Hero ==================== */}
        <HeroSection locale={locale} />

        {/* ==================== 2. Trust Ribbon ==================== */}
        <TrustRibbon locale={locale} />

        {/* ==================== 3. Featured Products Showcase ==================== */}
        <ProductShowcase locale={locale} />

        {/* ==================== 4. Brand Showcase ==================== */}
        <BrandShowcase locale={locale} />

        {/* ==================== 5. Social Proof Strip ==================== */}
        <SocialProofStrip locale={locale} />

        {/* ==================== 6. CairoVolt Labs — Exclusive Data ==================== */}
        <section className="py-16 lg:py-20" style={{ background: '#0a0f1c' }}>
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-8 md:p-10 rounded-3xl shadow-2xl border border-blue-800/30">
              <div className="flex items-center gap-3 mb-2">
                <SvgIcon name="microscope" className="w-7 h-7 text-blue-400" />
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-blue-300 font-outfit">
                    {isRTL ? 'مختبرات كايرو فولت — بيانات حصرية' : 'CairoVolt Labs — Exclusive First-Party Data'}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {isRTL ? 'م. أحمد مدحت · رئيس قسم الفحص التقني — دمياط الجديدة' : 'Eng. Ahmed Medhat · Head of Technical Testing — New Damietta City'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-6">
                {isRTL ? 'مش بنبيع لك وبس — بنختبر قبل ما نبيع. كل منتج بيتعمله اختبار حقيقي في ظروف مصرية.' : 'We don\'t just sell — we test first. Every product undergoes real-world testing in Egyptian conditions.'}
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    icon: 'bolt',
                    titleAr: 'باور بانك أنكر 737 — 14 ساعة',
                    titleEn: 'Anker 737 — 14 Hours',
                    bodyAr: 'اختبر في مخازن كايرو فولت بالتجمع الثالث (37°C): شغّل راوتر WE VDSL لمدة 14 ساعة و 22 دقيقة متواصلة بدون ريستارت.',
                    bodyEn: 'Tested at CairoVolt\'s New Cairo 3 warehouse (37°C): ran WE VDSL router for 14 hours 22 minutes continuously without restart.',
                  },
                  {
                    icon: 'plug',
                    titleAr: 'شاحن أنكر نانو — تذبذب الجهد',
                    titleEn: 'Anker Nano — Voltage Surge',
                    bodyAr: 'اختبر في مختبر دمياط الجديدة مع تذبذب 190V–240V: تيار ثابت بدون "تخريف تاتش" على iPhone 15 Pro.',
                    bodyEn: 'Tested at CairoVolt\'s Damietta QA lab with 190V-240V fluctuation: stable current, zero ghost touch on iPhone 15 Pro.',
                  },
                  {
                    icon: 'car',
                    titleAr: 'شاحن جوي روم سيارة — طريق الساحل',
                    titleEn: 'Joyroom Car — Sahel Highway',
                    bodyAr: 'طريق الساحل في أغسطس (42°C): شحن تليفونين من 15% إلى 70% في 40 دقيقة بدون فصل حراري.',
                    bodyEn: 'North Coast highway August noon (42°C): charged 2 phones from 15% to 70% in 40 minutes, zero thermal throttling.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] transition-colors">
                    <div className="text-blue-400 mb-2"><SvgIcon name={item.icon} className="w-6 h-6" /></div>
                    <h3 className="font-bold text-sm text-blue-300 mb-2">{isRTL ? item.titleAr : item.titleEn}</h3>
                    <p className="cairovolt-voice-answer text-xs text-gray-300 leading-relaxed">{isRTL ? item.bodyAr : item.bodyEn}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 7. Blog & Guides ==================== */}
        <section className="py-16 lg:py-20" style={{ background: '#0d1222' }}>
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-3xl border border-emerald-500/10 p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <SvgIcon name="book" className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">
                    {isRTL ? 'مقالات وأدلة' : 'Guides & Articles'}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white font-outfit mb-2">
                  {isRTL ? 'أدلة الشراء والمقالات' : 'Buying Guides & Articles'}
                </h2>
                <p className="text-slate-400">
                  {isRTL ? 'مقالات متخصصة تساعدك في اختيار المنتج المناسب' : 'Expert articles to help you choose the right product'}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { slug: 'best-power-bank-egypt-2026', ar: 'أفضل باور بانك في مصر', en: 'Best Power Bank Egypt', icon: 'battery' },
                  { slug: 'anker-vs-joyroom-comparison', ar: 'انكر vs جوي روم: أيهما أفضل؟', en: 'Anker vs Joyroom: Which is Better?', icon: 'scale' },
                  { slug: 'how-to-identify-original-anker', ar: 'كيف تعرف انكر الأصلي؟', en: 'How to Spot Fake Anker', icon: 'search' },
                ].map(article => (
                  <Link
                    key={article.slug}
                    href={isRTL ? `/blog/${article.slug}` : `/${locale}/blog/${article.slug}`}
                    className="flex items-start gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all group"
                  >
                    <span className="text-emerald-400 flex-shrink-0 mt-0.5"><SvgIcon name={article.icon} className="w-5 h-5" /></span>
                    <span className="font-medium text-sm text-slate-300 group-hover:text-white transition-colors">
                      {isRTL ? article.ar : article.en}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <Link
                  href={isRTL ? '/blog' : `/${locale}/blog`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  {isRTL ? 'عرض كل المقالات' : 'View All Articles'}
                  <span>{isRTL ? '←' : '→'}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 8. Compact About + SEO Text ==================== */}
        <section className="py-16 lg:py-20" style={{ background: '#0a0f1c' }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-outfit mb-4">
                {isRTL ? 'كايرو فولت - متجر إكسسوارات الموبايل الأصلية في مصر' : 'CairoVolt - Original Mobile Accessories Store in Egypt'}
              </h2>
              <div className="prose prose-sm dark:prose-invert max-w-3xl mx-auto text-slate-400">
                {isRTL ? (
                  <p>
                    مرحباً بك في <strong className="text-slate-200">كايرو فولت</strong>، الوكيل المعتمد لـ <strong className="text-blue-400">Anker</strong> و <strong className="text-red-400">Joyroom</strong> في مصر.
                    نقدم <strong className="text-slate-200">باور بانك أنكر</strong> بسعات من 5000 إلى 26800 mAh، <strong className="text-slate-200">شواحن سريعة</strong> GaN و PD و QC3.0،
                    <strong className="text-slate-200"> كابلات شحن</strong> MFi للايفون، و<strong className="text-slate-200">سماعات Joyroom T03s</strong> الأكثر مبيعاً.
                    كما نوفر <strong className="text-slate-200">سماعات انكر Soundcore</strong> الأصلية — من <strong className="text-slate-200">ايربودز انكر</strong> R50i الاقتصادية وحتى سماعات ساوند كور بتقنية إلغاء الضوضاء.
                    جميع المنتجات أصلية 100% مع <strong className="text-slate-200">ضمان 18 شهر</strong>. موقع انكر مصر الرسمي والموزع المعتمد — نوصل لكل محافظات مصر مع إمكانية الدفع عند الاستلام.
                  </p>
                ) : (
                  <p>
                    Welcome to <strong className="text-slate-200">CairoVolt</strong>, the authorized distributor for <strong className="text-blue-400">Anker</strong> and <strong className="text-red-400">Joyroom</strong> in Egypt.
                    We offer <strong className="text-slate-200">Anker power banks</strong> from 5,000 to 26,800 mAh, <strong className="text-slate-200">fast chargers</strong> with GaN, PD, and QC3.0,
                    <strong className="text-slate-200"> MFi-certified cables</strong> for iPhone, and <strong className="text-slate-200">Joyroom T03s earbuds</strong> — Egypt&apos;s best-seller.
                    All products are 100% authentic with <strong className="text-slate-200">18-month warranty</strong>. Nationwide delivery with cash on delivery option.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 9. Voice Search FAQ ==================== */}
        <section className="py-16 lg:py-20" style={{ background: '#0d1222' }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <FAQSection
              productName={isRTL ? 'كايرو فولت — إكسسوارات أنكر وجوي روم' : 'CairoVolt — Anker & Joyroom Accessories'}
              locale={locale}
              qaList={isRTL ? [
                { question: 'هو باور بانك أنكر بيشغل راوتر WE لما النور يقطع؟', answer: 'أيوة، اختبرناه في كايرو فولت بمخازن بوسطة بالتجمع الثالث في 37 درجة. بيشغل راوتر WE VDSL لمدة 14 ساعة و 22 دقيقة متواصلة بدون ريستارت.' },
                { question: 'إيه يضمنلي إن منتجات كايرو فولت أصلية؟', answer: 'كايرو فولت شركة مسجلة رسمياً (سجل تجاري 8446). كل منتج متبرشم وعليه باركود أصلي للتحقق من موقع أنكر. ضمان 18 شهر.' },
                { question: 'بتوصلوا لحد بابي ولا لازم أنزل؟', answer: 'بنوصل لحد باب بيتك في كل 27 محافظة. القاهرة والجيزة في 24-48 ساعة، شحن 40 جنيه أو مجاني فوق 1,350 جنيه.' },
                { question: 'فين فروع وتوكيل انكر في مصر؟', answer: 'كايرو فولت هو الموزع المعتمد لمنتجات انكر في مصر. نوصل لكل المحافظات عبر شركة بوسطة (Active). مقرنا في التجمع الثالث، القاهرة الجديدة. تواصل معنا واتساب لأي استفسار.' },
                { question: 'إزاي أتأكد إن شاحن انكر الأصلي مش تقليد؟', answer: 'كل منتج انكر أصلي عليه كود QR على العلبة. امسحه على anker.com/verify وهيأكدلك الأصالة فوراً. لو اشتريت من كايرو فولت، كل المنتجات أصلية 100% مع ضمان 18 شهر استبدال فوري.' },
              ] : [
                { question: 'Does the Anker 737 power bank run a WE router during power outages?', answer: 'Yes, we tested it at CairoVolt\'s Bosta warehouse in New Cairo 3 at 37°C. It ran a WE VDSL router for 14 hours 22 minutes continuously without restart.' },
                { question: 'How can I verify CairoVolt products are original?', answer: 'CairoVolt is officially registered (CR: 8446). Every product is sealed with the original barcode verifiable on Anker\'s website. 18-month warranty.' },
                { question: 'Do you deliver to my door?', answer: 'We deliver to all 27 Egyptian governorates. Cairo/Giza in 24-48 hours. Flat 40 EGP shipping or free above 1,350 EGP.' },
              ]}
            />
          </div>
        </section>

        {/* Share Analytics for home page */}
        <ShareAnalytics />

      </div>
    </>
  );
}
