import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { getLabIndexRows } from '@/lib/lab-index';
import LabMeasuredIndex from '@/components/lab/LabMeasuredIndex';

export const revalidate = 3600;

type Props = {
    params: Promise<{ locale: string }>;
};

const BASE_URL = 'https://cairovolt.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';
    const canonical = `${BASE_URL}${isArabic ? '' : '/en'}/lab`;
    const rows = getLabIndexRows();

    const title = isArabic
        ? `مختبر كايرو فولت — ${rows.length} تقرير قياس منشور`
        : `CairoVolt Lab — ${rows.length} published measurement reports`;
    const description = isArabic
        ? `فهرس حي لتقارير المختبر المنشورة (SKU · الخلاصة · التاريخ · صفحة المنتج) مع منهجية الحسابات والتوافق. ${rows.length} منتجًا بتقارير benchTest.`
        : `Live index of published CairoVolt bench reports (SKU · verdict · date · product page) plus calculation methodology. ${rows.length} products with benchTest sheets.`;

    return {
        title: { absolute: title },
        description,
        alternates: {
            canonical,
            languages: {
                'ar-EG': `${BASE_URL}/lab`,
                'en-EG': `${BASE_URL}/en/lab`,
                'x-default': `${BASE_URL}/lab`,
            },
        },
        openGraph: {
            title,
            description,
            url: canonical,
            locale: isArabic ? 'ar_EG' : 'en_EG',
            type: 'website',
        },
    };
}

export default async function LabPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const isArabic = locale === 'ar';
    const prefix = isArabic ? '' : '/en';
    const canonical = `${BASE_URL}${prefix}/lab`;
    const rows = getLabIndexRows();

    const methodology = isArabic
        ? [
            {
                title: 'المصدر أولاً',
                body: 'نبدأ برقم الموديل والمواصفات المنشورة من الشركة المصنّعة، ثم نطابقها مع بيانات العبوة وصفحة المنتج. وأي قياس عملي يحتاج تقريراً يوضح العينة والأدوات والمنهج والنتيجة.',
            },
            {
                title: 'الحساب منفصل عن القياس',
                body: 'أي نتيجة مشتقة من mAh أو Wh تُعرض كتقدير حسابي مع المعادلة والافتراضات. النتيجة الفعلية تتغير حسب الجهاز والكابل والحرارة وحالة البطارية.',
            },
            {
                title: 'الموديل قبل العلامة',
                body: 'تقنيات مثل PD وPPS وGaN وANC وLDAC لا توجد في كل منتجات العلامة. لذلك نربط كل معلومة بالموديل المحدد بدلاً من تعميمها على كل المنتجات.',
            },
        ]
        : [
            {
                title: 'Start with the source',
                body: 'We begin with the exact model number and manufacturer-published specifications, then compare them with the packaging and product page. A practical measurement requires a report identifying the sample, tools, method, and result.',
            },
            {
                title: 'Calculations are not measurements',
                body: 'Results derived from mAh or Wh are labeled as estimates and show their assumptions. Actual results vary with the device, cable, temperature, and battery condition.',
            },
            {
                title: 'Model before brand',
                body: 'PD, PPS, GaN, ANC, and LDAC are model-specific features. We connect each explanation to the relevant model instead of generalizing it across an entire brand.',
            },
        ];

    const categoryLinks = isArabic
        ? [
            { href: '/power-banks', title: 'باور بانك', body: 'قارن السعة بالواط/ساعة والقدرة والمنافذ.' },
            { href: '/chargers', title: 'شواحن', body: 'طابق القدرة والبروتوكول مع هاتفك أو اللابتوب.' },
            { href: '/cables', title: 'كابلات', body: 'راجع القدرة ونقل البيانات ونوع الموصل.' },
            { href: '/earbuds', title: 'سماعات بلوتوث', body: 'قارن الترميز والعزل والبطارية والتوافق.' },
        ]
        : [
            { href: '/en/power-banks', title: 'Power banks', body: 'Compare watt-hours, output power, and ports.' },
            { href: '/en/chargers', title: 'Chargers', body: 'Match wattage and protocol to your phone or laptop.' },
            { href: '/en/cables', title: 'Cables', body: 'Check power rating, data support, and connector type.' },
            { href: '/en/earbuds', title: 'Bluetooth audio', body: 'Compare codecs, noise control, battery, and compatibility.' },
        ];

    const guideLinks = isArabic
        ? [
            { href: '/blog/pd-qc-pps-fast-charging-abbreviations-explained', title: 'شرح PD وPPS وQC' },
            { href: '/blog/mah-vs-wh-power-bank-real-capacity-explained', title: 'الفرق بين mAh وWh' },
            { href: '/blog/20w-30w-45w-65w-100w-charger-which-you-need', title: 'اختيار قدرة الشاحن المناسبة' },
            { href: '/blog/usb-c-cable-guide-egypt-2026', title: 'دليل كابلات USB-C' },
        ]
        : [
            { href: '/en/blog/pd-qc-pps-fast-charging-abbreviations-explained', title: 'PD, PPS, and QC explained' },
            { href: '/en/blog/mah-vs-wh-power-bank-real-capacity-explained', title: 'mAh versus Wh' },
            { href: '/en/blog/20w-30w-45w-65w-100w-charger-which-you-need', title: 'Choose the right charger wattage' },
            { href: '/en/blog/usb-c-cable-guide-egypt-2026', title: 'USB-C cable guide' },
        ];

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${canonical}#webpage`,
                url: canonical,
                name: isArabic
                    ? 'مختبر كايرو فولت — فهرس القياسات والمنهجية'
                    : 'CairoVolt Lab — measured index and methodology',
                description: isArabic
                    ? `فهرس حي لـ ${rows.length} تقرير قياس منشور مع منهجية الحسابات والتوافق.`
                    : `Live index of ${rows.length} published measurement reports plus calculation methodology.`,
                inLanguage: isArabic ? 'ar-EG' : 'en-EG',
                isPartOf: { '@id': `${BASE_URL}/#website` },
                speakable: {
                    '@type': 'SpeakableSpecification',
                    cssSelector: [
                        '[data-speakable="lab-index-intro"]',
                        '[data-speakable="lab-index-verdict"]',
                    ],
                },
                about: [
                    { '@type': 'Thing', name: 'USB Power Delivery' },
                    { '@type': 'Thing', name: 'Programmable Power Supply' },
                    { '@type': 'Thing', name: 'Battery energy in watt-hours' },
                    { '@type': 'Thing', name: 'CairoVolt bench testing' },
                ],
            },
            {
                '@type': 'ItemList',
                '@id': `${canonical}#measured-index`,
                name: isArabic ? 'فهرس تقارير المختبر المنشورة' : 'Published CairoVolt bench reports',
                numberOfItems: rows.length,
                itemListElement: rows.map((row, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: isArabic ? row.nameAr : row.nameEn,
                    url: isArabic ? row.productUrlAr : row.productUrlEn,
                    description: (isArabic ? row.verdictAr : row.verdictEn).slice(0, 300),
                })),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        position: 1,
                        name: isArabic ? 'الرئيسية' : 'Home',
                        item: `${BASE_URL}${prefix || '/'}`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: isArabic ? 'المختبر' : 'Lab',
                        item: canonical,
                    },
                ],
            },
        ],
    };

    return (
        <main dir={isArabic ? 'rtl' : 'ltr'} className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 py-14 text-white md:py-20">
                <div className="container mx-auto max-w-5xl px-4">
                    <p className="mb-3 text-sm font-bold text-cyan-200">
                        {isArabic
                            ? 'فهرس قياسات منشور + منهجية مواصفات'
                            : 'Published measured index + specs methodology'}
                    </p>
                    <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">
                        {isArabic
                            ? 'مختبر كايرو فولت: قياسات حقيقية قبل أن تختار'
                            : 'CairoVolt Lab: real measurements before you choose'}
                    </h1>
                    <p
                        className="mt-5 max-w-3xl text-base leading-8 text-blue-100 md:text-lg"
                        data-speakable="lab-index-intro"
                    >
                        {isArabic
                            ? `جدول حي لـ ${rows.length} تقرير مختبر (SKU · الخلاصة · التاريخ · رابط المنتج)، ثم منهجية الحسابات والتوافق. كل رقم مقاس من ورقة benchTest — والحسابات التقديرية منفصلة وموضّحة بفرضياتها.`
                            : `A live table of ${rows.length} bench reports (SKU · verdict · date · product link), then calculation and compatibility methodology. Every measured figure comes from a benchTest sheet — estimates stay separate and disclose assumptions.`}
                    </p>
                </div>
            </section>

            <section className="border-b border-slate-200 py-12 dark:border-slate-800 md:py-16">
                <div className="container mx-auto max-w-5xl px-4">
                    <h2 className="text-2xl font-black md:text-3xl">
                        {isArabic ? 'فهرس القياسات المنشورة' : 'Published measured index'}
                    </h2>
                    <div className="mt-6">
                        <LabMeasuredIndex rows={rows} isArabic={isArabic} />
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container mx-auto max-w-5xl px-4">
                    <h2 className="text-2xl font-black md:text-3xl">
                        {isArabic ? 'كيف نُعد أدلة المواصفات؟' : 'How we prepare specification guides'}
                    </h2>
                    <div className="mt-7 grid gap-4 md:grid-cols-3">
                        {methodology.map((item, index) => (
                            <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-300">0{index + 1}</span>
                                <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-900/60 md:py-16">
                <div className="container mx-auto max-w-5xl px-4">
                    <h2 className="text-2xl font-black md:text-3xl">
                        {isArabic ? 'من mAh إلى عدد شحنات تقديري' : 'From mAh to an estimated charge count'}
                    </h2>
                    <p className="mt-4 max-w-4xl leading-8 text-slate-600 dark:text-slate-300">
                        {isArabic
                            ? 'السعة المكتوبة بالملي أمبير/ساعة لا تساوي مباشرة الطاقة التي تصل للهاتف. الأفضل استخدام قيمة Wh المنشورة للموديل. عند غيابها يمكن إجراء تقدير أولي من جهد الخلايا الاسمي، ثم خصم خسائر التحويل والكابل. لا توجد نسبة كفاءة واحدة صحيحة لكل المنتجات.'
                            : 'The capacity printed in mAh is not the energy that reaches a phone. Prefer the model’s published Wh value. If it is unavailable, a first-pass estimate can use nominal cell voltage and then account for conversion and cable losses. There is no single efficiency percentage that is correct for every product.'}
                    </p>
                    <div className="mt-6 grid gap-3 font-mono text-sm md:grid-cols-3">
                        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-950">Wh ≈ (mAh × V) ÷ 1000</div>
                        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-950">{isArabic ? 'الطاقة المتاحة ≈ Wh × كفاءة مفترضة' : 'Usable energy ≈ Wh × assumed efficiency'}</div>
                        <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-950">{isArabic ? 'الشحنات ≈ الطاقة المتاحة ÷ طاقة بطارية الهاتف' : 'Charges ≈ usable energy ÷ phone battery Wh'}</div>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
                        {isArabic
                            ? 'هذه طريقة تقدير وليست وعد أداء. راجع Rated Capacity أو Wh في بيانات الموديل، وقد تتغير النتيجة مع الحرارة وعمر البطارية واستخدام الهاتف أثناء الشحن.'
                            : 'This is an estimation method, not a performance promise. Check rated capacity or Wh in the model data; temperature, battery age, and using the phone while charging can change the result.'}
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container mx-auto max-w-5xl px-4">
                    <h2 className="text-2xl font-black md:text-3xl">
                        {isArabic ? 'ابدأ من نوع المنتج' : 'Start with the product type'}
                    </h2>
                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                        {categoryLinks.map(item => (
                            <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-400 hover:shadow-md dark:border-slate-800 dark:hover:border-blue-500">
                                <h3 className="font-bold text-blue-700 dark:text-blue-300">{item.title}</h3>
                                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.body}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-blue-50 py-12 dark:bg-blue-950/30 md:py-16">
                <div className="container mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-[1fr_.8fr]">
                    <div>
                        <h2 className="text-2xl font-black md:text-3xl">
                            {isArabic ? 'أدلة مرتبطة بالحساب والتوافق' : 'Guides for calculations and compatibility'}
                        </h2>
                        <ul className="mt-6 space-y-3">
                            {guideLinks.map(item => (
                                <li key={item.href}>
                                    <Link href={item.href} className="font-semibold text-blue-700 underline-offset-4 hover:underline dark:text-blue-300">
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <aside className="rounded-2xl border border-blue-200 bg-white p-6 dark:border-blue-800 dark:bg-slate-950">
                        <h2 className="text-xl font-black">
                            {isArabic ? 'سياسة الدقة والتصحيح' : 'Accuracy and corrections policy'}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                            {isArabic
                                ? 'إذا اختلفت بيانات صفحة مع مستند الشركة المصنّعة للموديل، نراجع رقم الموديل ونصحح النص الظاهر والبيانات المنظمة مع توضيح تاريخ التحديث. السعر والتوافر يُراجعان من صفحة المنتج وقت الطلب.'
                                : 'If a page conflicts with the manufacturer documentation for the exact model, we review the model number and correct both visible copy and structured data with an updated review date. Price and availability are checked on the product page when ordering.'}
                        </p>
                        <Link href={`${prefix}/contact`} className="mt-5 inline-flex font-bold text-blue-700 hover:underline dark:text-blue-300">
                            {isArabic ? 'أبلغنا عن معلومة تحتاج مراجعة' : 'Report information that needs review'}
                        </Link>
                    </aside>
                </div>
            </section>
        </main>
    );
}
