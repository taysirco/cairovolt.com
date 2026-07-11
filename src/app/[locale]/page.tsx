import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { CollectionPageSchema, SpeakableSchema, LocalBusinessSchema } from '@/components/schemas/StructuredDataSchemas';
import { SvgIcon } from '@/components/ui/SvgIcon';
import FAQSection from '@/components/content/FAQSection';
import ShareAnalytics from '@/components/content/ShareAnalytics';
import HeroSection from '@/components/home/HeroSection';
import TrustRibbon from '@/components/home/TrustRibbon';
import ProductShowcase from '@/components/home/ProductShowcase';
import BrandShowcase from '@/components/home/BrandShowcase';
import ShopByNeed from '@/components/home/ShopByNeed';
import ProductFinder from '@/components/home/ProductFinder';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const baseMetadata = {
    alternates: {
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
      title: { absolute: 'Mobile Accessories Egypt | Anker, Soundcore & Joyroom' },
      description: 'Shop original Anker, Soundcore, and Joyroom accessories in Egypt. Power banks, earbuds, chargers, and cables with clear warranty terms and cash on delivery.',
      keywords: 'mobile accessories, anker egypt, soundcore egypt, joyroom, power bank, earbuds, anker charger, joyroom t03s',
      openGraph: {
        title: 'Mobile Accessories Egypt | CairoVolt',
        description: 'Original Anker, Soundcore, and Joyroom accessories with nationwide delivery and cash on delivery.',
        url: 'https://cairovolt.com/en',
        locale: 'en_US',
        type: 'website',
        siteName: 'CairoVolt',
        images: [{
          url: '/og-cover.png',
          width: 640,
          height: 640,
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

  return {
    ...baseMetadata,
    title: { absolute: 'اكسسوارات موبايل مصر | Anker وSoundcore وJoyroom' },
    description: 'تسوق منتجات Anker وSoundcore وJoyroom الأصلية في مصر. باور بانك، سماعات، شواحن وكابلات بضمان واضح حسب المنتج والدفع عند الاستلام.',
    keywords: 'اكسسوارات موبايل, انكر مصر, أنكر, ساوند كور, جوي روم, باور بانك, سماعات, شاحن انكر, soundcore, ايربودز انكر',
    openGraph: {
      title: 'اكسسوارات موبايل مصر | كايرو فولت',
      description: 'منتجات Anker وSoundcore وJoyroom الأصلية مع توصيل لكل مصر والدفع عند الاستلام.',
      url: 'https://cairovolt.com',
      locale: 'ar_EG',
      type: 'website',
      siteName: 'كايرو فولت',
      images: [{
        url: '/og-cover.png',
        width: 640,
        height: 640,
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

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isRTL = locale === 'ar';

  const schemaCategories = isRTL
    ? [
      { title: 'باور بانك', href: '/anker/power-banks' },
      { title: 'ساوند كور (Soundcore)', href: '/soundcore' },
      { title: 'سماعات جوي روم', href: '/joyroom/audio' },
      { title: 'شواحن', href: '/anker/wall-chargers' },
      { title: 'كابلات', href: '/anker/cables' },
    ]
    : [
      { title: 'Power Banks', href: '/en/anker/power-banks' },
      { title: 'Soundcore Audio', href: '/en/soundcore' },
      { title: 'Joyroom Earbuds', href: '/en/joyroom/audio' },
      { title: 'Chargers', href: '/en/anker/wall-chargers' },
      { title: 'Cables', href: '/en/anker/cables' },
    ];

  const prefix = isRTL ? '' : '/en';

  return (
    <>
      <LocalBusinessSchema locale={locale} />
      <CollectionPageSchema
        locale={locale}
        collections={schemaCategories.map((category) => ({
          name: category.title,
          url: `https://cairovolt.com${category.href}`,
          description: isRTL ? `تسوق ${category.title} الأصلية` : `Shop original ${category.title}`,
        }))}
      />
      <SpeakableSchema
        pageUrl={`https://cairovolt.com${prefix}`}
        speakableSelectors={['h1', '.hero-description', '.quality-badges']}
        headline={isRTL ? 'اكسسوارات موبايل Anker وSoundcore وJoyroom في مصر' : 'Anker, Soundcore, and Joyroom accessories in Egypt'}
        description={isRTL
          ? 'منتجات أصلية مرتبة حسب الاستخدام، مع توصيل لكل مصر والدفع عند الاستلام.'
          : 'Original accessories organized by use, with delivery across Egypt and cash on delivery.'}
        locale={locale}
      />

      <div className="flex flex-col bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
        <HeroSection locale={locale} />
        <TrustRibbon locale={locale} />

        <div>
          <ShopByNeed locale={locale} />
        </div>

        <div>
          <ProductShowcase locale={locale} />
        </div>

        <div>
          <BrandShowcase locale={locale} />
        </div>

        <div>
          <ProductFinder locale={locale} />
        </div>

        <section className="bg-white py-16 text-[#07111f] lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                <SvgIcon name="shield" className="h-5 w-5" />
                {isRTL ? 'راحة البال جزء من الطلب' : 'Confidence is part of the order'}
              </span>
              <h2 className="mt-3 font-outfit text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                {isRTL ? 'اشتري وإنت فاهم كل خطوة.' : 'Buy with every step made clear.'}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                {isRTL
                  ? 'الثقة مش Badge على الشاشة؛ هي معلومات تقدر تراجعها، وضمان مكتوب، وسياسة واضحة قبل الدفع.'
                  : 'Trust is not a badge on a screen. It is information you can check, written warranty terms, and clear policies before payment.'}
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: 'check-circle',
                  titleAr: 'تحقق من الأصالة',
                  titleEn: 'Verify authenticity',
                  bodyAr: 'اعرف مكان الكود وطريقة المراجعة قبل ما تعتمد على شكل العلبة فقط.',
                  bodyEn: 'Learn where the code is and how to check it before relying on packaging alone.',
                  href: '/verify',
                  ctaAr: 'افتح أداة التحقق',
                  ctaEn: 'Open verification',
                },
                {
                  icon: 'microscope',
                  titleAr: 'افهم المواصفة الحقيقية',
                  titleEn: 'Understand the real spec',
                  bodyAr: 'نشرح القدرة، التوافق والاستخدام المناسب بلغة عملية من غير مصطلحات مربكة.',
                  bodyEn: 'We explain power, compatibility, and fit in practical language without confusing jargon.',
                  href: '/lab',
                  ctaAr: 'ادخل المختبر',
                  ctaEn: 'Visit the lab',
                },
                {
                  icon: 'truck',
                  titleAr: 'اعرف اللي هيحصل بعد الطلب',
                  titleEn: 'Know what happens next',
                  bodyAr: 'راجع التوصيل والدفع والاسترجاع قبل ما تضغط تأكيد الطلب.',
                  bodyEn: 'Review delivery, payment, and returns before you confirm the order.',
                  href: '/shipping',
                  ctaAr: 'تفاصيل التوصيل',
                  ctaEn: 'Delivery details',
                },
              ].map((item) => (
                <article key={item.icon} className="group rounded-[1.75rem] border border-slate-200 bg-[#f7f8fa] p-7 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-[0_20px_55px_rgba(15,23,42,.09)]">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm">
                    <SvgIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-outfit text-xl font-bold">{isRTL ? item.titleAr : item.titleEn}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{isRTL ? item.bodyAr : item.bodyEn}</p>
                  <Link href={`${prefix}${item.href}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                    {isRTL ? item.ctaAr : item.ctaEn}
                    <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">{isRTL ? '←' : '→'}</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f5f6f8] py-16 text-[#07111f] lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-700">
                  <SvgIcon name="book" className="h-5 w-5" />
                  {isRTL ? 'اقرأ قبل ما تدفع' : 'Read before you spend'}
                </span>
                <h2 className="mt-3 font-outfit text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                  {isRTL ? 'أدلة تختصر عليك المقارنة.' : 'Guides that shorten the comparison.'}
                </h2>
              </div>
              <Link href={`${prefix}/blog`} className="inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                {isRTL ? 'كل الأدلة والمقالات' : 'All guides and articles'}
                <span>{isRTL ? '←' : '→'}</span>
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { slug: 'best-power-bank-egypt-2026', ar: 'إزاي تختار باور بانك يناسب يومك؟', en: 'How to choose a power bank for your day', icon: 'battery', tone: 'bg-blue-50 text-blue-800' },
                { slug: 'anker-vs-joyroom-comparison', ar: 'Anker ولا Joyroom: الفرق فين؟', en: 'Anker or Joyroom: where is the difference?', icon: 'scale', tone: 'bg-emerald-50 text-emerald-800' },
                { slug: 'how-to-identify-original-anker', ar: 'علامات تساعدك تعرف Anker الأصلي', en: 'Clues that help identify original Anker', icon: 'search', tone: 'bg-amber-50 text-amber-800' },
              ].map((article) => (
                <Link
                  key={article.slug}
                  href={`${prefix}/blog/${article.slug}`}
                  className="group flex min-h-52 flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_55px_rgba(15,23,42,.08)]"
                >
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${article.tone}`}>
                    <SvgIcon name={article.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-outfit text-xl font-bold leading-8">{isRTL ? article.ar : article.en}</h3>
                  <span className="mt-auto pt-5 text-sm font-bold text-blue-700">
                    {isRTL ? 'اقرأ الدليل ←' : 'Read the guide →'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 text-[#07111f] lg:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-outfit text-2xl font-bold sm:text-3xl">
              {isRTL ? 'كايرو فولت — اختيار أوضح لإكسسوارات الموبايل في مصر' : 'CairoVolt — a clearer way to choose mobile accessories in Egypt'}
            </h2>
            <div className="mx-auto mt-4 max-w-3xl text-sm leading-8 text-slate-600">
              {isRTL ? (
                <p>
                  كايرو فولت يجمع منتجات <strong className="text-slate-900">Anker</strong> للشحن والطاقة، ومنتجات <strong className="text-slate-900">Soundcore</strong> للصوتيات، وخيارات <strong className="text-slate-900">Joyroom</strong> العملية للاستخدام اليومي. تقدر تقارن بين الباور بانك، الشواحن، الكابلات، الايربودز والهيدفون، وتشوف السعر والتوافق والضمان الخاص بكل منتج قبل الطلب. التوصيل متاح لمحافظات مصر مع إمكانية الدفع عند الاستلام.
                </p>
              ) : (
                <p>
                  CairoVolt brings together <strong className="text-slate-900">Anker</strong> charging and power products, <strong className="text-slate-900">Soundcore</strong> audio, and practical <strong className="text-slate-900">Joyroom</strong> everyday options. Compare power banks, chargers, cables, earbuds, and headphones with clear pricing, compatibility, and product-specific warranty terms before ordering. Delivery is available across Egypt with cash on delivery.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="dark bg-[#07111f] py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <FAQSection
              productName={isRTL ? 'كايرو فولت — Anker وSoundcore وJoyroom' : 'CairoVolt — Anker, Soundcore & Joyroom'}
              locale={locale}
              qaList={isRTL ? [
                { question: 'أبدأ منين لو مش عارف الموديل المناسب؟', answer: 'ابدأ بقسم «اختار حسب استخدامك» أو مساعد الاختيار السريع في الصفحة. اختار هل محتاج صوت أفضل، بطارية أطول، أو شحن أسرع، وحدد ميزانيتك عشان تشوف نقطة بداية مناسبة.' },
                { question: 'إزاي أتأكد إن المنتج أصلي؟', answer: 'راجع كود أو باركود التحقق الموجود على العبوة واتبع خطوات صفحة التحقق في كايرو فولت. لا تعتمد على شكل العلبة فقط، واحتفظ بالفاتورة وبيانات الضمان.' },
                { question: 'الضمان كام شهر؟', answer: 'مدة الضمان تختلف حسب العلامة والموديل، لذلك نعرضها في صفحة كل منتج بدل وعد عام واحد. راجع بند الضمان في صفحة المنتج قبل إتمام الطلب.' },
                { question: 'هل الدفع عند الاستلام متاح؟', answer: 'نعم، الدفع عند الاستلام متاح للطلبات المؤهلة. تفاصيل المبلغ والشحن تظهر بوضوح أثناء إتمام الطلب.' },
                { question: 'هل التوصيل متاح خارج القاهرة؟', answer: 'نعم، التوصيل متاح لمحافظات مصر. مدة ورسوم الشحن تعتمد على المحافظة وتظهر قبل تأكيد الطلب.' },
                { question: 'لو المنتج مش مناسب، أعمل إيه؟', answer: 'راجع سياسة الاسترجاع والاستبدال لمعرفة الشروط والمدة وحالة العبوة المطلوبة، وتواصل مع الدعم قبل إرسال المنتج.' },
              ] : [
                { question: 'Where do I start if I do not know the right model?', answer: 'Start with Shop by Need or the quick choice assistant on this page. Choose better sound, longer battery, or faster charging, then set a budget for a useful starting point.' },
                { question: 'How can I check that a product is original?', answer: 'Check the verification code or barcode on the packaging and follow CairoVolt\'s verification steps. Do not rely on box appearance alone, and keep your invoice and warranty information.' },
                { question: 'How long is the warranty?', answer: 'Warranty length varies by brand and model, so it is shown on each product page instead of using one blanket promise. Review the warranty section before ordering.' },
                { question: 'Is cash on delivery available?', answer: 'Yes, cash on delivery is available for eligible orders. The order total and delivery details are shown during checkout.' },
                { question: 'Do you deliver outside Cairo?', answer: 'Yes, delivery is available across Egypt. Timing and fees depend on the governorate and are shown before order confirmation.' },
                { question: 'What if the product is not right for me?', answer: 'Review the return and replacement policy for the applicable conditions, timeframe, and packaging requirements, then contact support before sending the item.' },
              ]}
            />
          </div>
        </section>

        <ShareAnalytics />
      </div>
    </>
  );
}
