import { Metadata } from 'next';
import Link from 'next/link';
import { labData } from '@/data/product-tests';
import { staticProducts } from '@/lib/static-products';
import { getBrandDisplayName, localizeArabicBrandNames } from '@/lib/arabic-brand-names';

export const revalidate = 86400;

type Props = {
    params: Promise<{ locale: string }>;
};

const BASE = 'https://cairovolt.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';
    const testedCount = Object.keys(labData).length;

    return {
        title: isArabic
            ? `مختبرات كايرو فولت — ${testedCount}+ منتج مُختبر فعلياً في مصر`
            : `CairoVolt Labs — ${testedCount}+ Products Actually Tested in Egypt`,
        description: isArabic
            ? `بيانات اختبار حقيقية من مصر: السعة الفعلية للباور بانك، الحرارة تحت شبكة كهرباء 190–240V، عمر البطارية، ودورات الثني للكابلات. ${testedCount}+ منتج مُختبر بظروف الاستخدام المصرية.`
            : `Real test data from Egypt: actual power bank capacity, thermals on the 190–240V grid, battery life, cable bend cycles. ${testedCount}+ products tested under Egyptian conditions.`,
        alternates: {
            canonical: isArabic ? `${BASE}/lab` : `${BASE}/en/lab`,
            languages: {
                'ar-EG': `${BASE}/lab`,
                'en-EG': `${BASE}/en/lab`,
                'x-default': `${BASE}/lab`,
            },
        },
        openGraph: {
            title: isArabic ? 'مختبرات كايرو فولت — بيانات اختبار حقيقية' : 'CairoVolt Labs — Real Test Data',
            description: isArabic
                ? 'نختبر ما نبيعه: قياسات فعلية تحت ظروف الاستخدام المصرية.'
                : 'We test what we sell: real measurements under Egyptian conditions.',
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
        },
    };
}

/** Human-readable chips for the headline metrics of each tested product */
function metricChips(metrics: Record<string, number | undefined>, isArabic: boolean): string[] {
    const chips: string[] = [];
    if (metrics.actualCapacity_mAh) chips.push(isArabic ? `سعة فعلية ${metrics.actualCapacity_mAh} مللي أمبير` : `${metrics.actualCapacity_mAh} mAh actual`);
    if (metrics.routerRuntimeHours) chips.push(isArabic ? `يشغّل الراوتر ${metrics.routerRuntimeHours} ساعة` : `${metrics.routerRuntimeHours}h router runtime`);
    if (metrics.maxTemp_C) chips.push(isArabic ? `أقصى حرارة ${metrics.maxTemp_C}°C` : `${metrics.maxTemp_C}°C max temp`);
    if (metrics.realEfficiency) chips.push(isArabic ? `كفاءة ${metrics.realEfficiency}%` : `${metrics.realEfficiency}% efficiency`);
    if (metrics.bendCycles) chips.push(isArabic ? `${metrics.bendCycles.toLocaleString()} دورة ثني` : `${metrics.bendCycles.toLocaleString()} bend cycles`);
    if (metrics.batteryLife_hours) chips.push(isArabic ? `بطارية ${metrics.batteryLife_hours} ساعة` : `${metrics.batteryLife_hours}h battery`);
    if (metrics.noiseReduction_dB) chips.push(isArabic ? `عزل ${metrics.noiseReduction_dB} ديسيبل` : `${metrics.noiseReduction_dB} dB ANC`);
    if (metrics.chargingSpeed_W) chips.push(isArabic ? `شحن ${metrics.chargingSpeed_W} واط` : `${metrics.chargingSpeed_W}W charging`);
    return chips.slice(0, 3);
}

export default async function LabPage({ params }: Props) {
    const { locale } = await params;
    const isArabic = locale === 'ar';
    const prefix = isArabic ? '' : '/en';

    const testedSlugs = Object.keys(labData);
    const testedCount = testedSlugs.length;

    // Join lab entries with the catalog (link + name + image); entries without
    // a catalog product are counted but not carded.
    const cards = testedSlugs
        .map(slug => {
            const product = staticProducts.find(p => p.slug === slug);
            if (!product) return null;
            const lab = labData[slug];
            const test = lab.labTests?.[0];
            return {
                slug,
                url: `${prefix}/${product.brand.toLowerCase()}/${product.categorySlug.toLowerCase()}/${slug}`,
                name: isArabic
                    ? localizeArabicBrandNames(product.translations?.ar?.name || slug)
                    : product.translations?.en?.name || slug,
                brand: getBrandDisplayName(product.brand, locale),
                image: product.images?.[0]?.url || '',
                scenario: test ? (isArabic ? localizeArabicBrandNames(test.scenario.ar) : test.scenario.en) : '',
                conditions: test ? (isArabic ? localizeArabicBrandNames(test.conditions.ar) : test.conditions.en) : '',
                chips: metricChips((lab.labMetrics || {}) as Record<string, number | undefined>, isArabic),
            };
        })
        .filter((c): c is NonNullable<typeof c> => c !== null);

    // Dataset JSON-LD — makes the lab data eligible for Google Dataset Search
    // and gives AI engines a citable, machine-readable source.
    const datasetSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Dataset',
                '@id': `${BASE}/lab#dataset`,
                name: isArabic
                    ? 'بيانات اختبارات مختبرات كايرو فولت — إكسسوارات الموبايل في الظروف المصرية'
                    : 'CairoVolt Labs Test Data — Mobile Accessories under Egyptian Conditions',
                description: isArabic
                    ? `قياسات اختبار فعلية لـ${testedCount}+ من إكسسوارات الموبايل (انكر، جوي روم، ساوندكور) تحت ظروف الاستخدام المصرية: تذبذب شبكة الكهرباء 190–240V، حرارة الصيف، انقطاعات الكهرباء. تشمل: السعة الفعلية، زمن تشغيل الراوتر، أقصى حرارة، الكفاءة الحقيقية، دورات الثني، عمر البطارية.`
                    : `Actual test measurements for ${testedCount}+ mobile accessories (Anker, Joyroom, Soundcore) under Egyptian conditions: 190–240V grid fluctuation, summer heat, load-shedding. Covers: actual capacity, router runtime, max temperature, real efficiency, bend cycles, battery life.`,
                url: `${BASE}${prefix}/lab`,
                creator: { '@id': `${BASE}/#organization` },
                publisher: { '@id': `${BASE}/#organization` },
                inLanguage: ['ar-EG', 'en-EG'],
                isAccessibleForFree: true,
                spatialCoverage: { '@type': 'Place', name: 'Egypt' },
                variableMeasured: [
                    'actualCapacity_mAh', 'routerRuntimeHours', 'maxTemp_C',
                    'chargeCycles', 'realEfficiency', 'bendCycles',
                    'noiseReduction_dB', 'batteryLife_hours', 'chargingSpeed_W',
                ].map(v => ({ '@type': 'PropertyValue', name: v })),
                distribution: [
                    {
                        '@type': 'DataDownload',
                        encodingFormat: 'application/json',
                        contentUrl: `${BASE}/api/lab-data/json`,
                    },
                    {
                        '@type': 'DataDownload',
                        encodingFormat: 'text/csv',
                        contentUrl: `${BASE}/api/lab-data/csv`,
                    },
                ],
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: isArabic ? 'الرئيسية' : 'Home', item: `${BASE}${prefix || '/'}` },
                    { '@type': 'ListItem', position: 2, name: isArabic ? 'المختبر' : 'Lab', item: `${BASE}${prefix}/lab` },
                ],
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
            />
            <div dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Hero */}
                <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 dark:from-gray-950 dark:via-blue-950 dark:to-gray-950 text-white py-16">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {isArabic ? '🔬 مختبرات كايرو فولت' : '🔬 CairoVolt Labs'}
                        </h1>
                        <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
                            {isArabic
                                ? `لا ننقل مواصفات المصنّع — نقيسها. ${testedCount}+ منتج مُختبر تحت ظروف الاستخدام المصرية الحقيقية: تذبذب الكهرباء (190–240V)، حرارة الصيف، قطع الكهرباء، ومترو القاهرة.`
                                : `We don't copy manufacturer specs — we measure them. ${testedCount}+ products tested under real Egyptian conditions: grid fluctuation (190–240V), summer heat, load-shedding, and the Cairo metro.`}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-6 text-sm">
                            <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
                                {isArabic ? `${testedCount}+ منتج مُختبر` : `${testedCount}+ products tested`}
                            </span>
                            <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
                                {isArabic ? 'القياسات منشورة كبيانات مفتوحة' : 'Published as open data'}
                            </span>
                            <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
                                {isArabic ? 'مختبر القاهرة الجديدة ودمياط الجديدة' : 'New Cairo & New Damietta facilities'}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Methodology */}
                <section className="py-10 bg-gray-50 dark:bg-gray-900/40">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {isArabic ? 'منهجية الاختبار' : 'Testing methodology'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                                <div className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {isArabic ? '⚡ ظروف الشبكة المصرية' : '⚡ Egyptian grid conditions'}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {isArabic
                                        ? 'الشحن يُقاس على جهد متذبذب 190–240V كما في الشبكة الفعلية، لا على جهد معملي ثابت.'
                                        : 'Charging measured on a fluctuating 190–240V supply as found on the real grid, not a stable lab feed.'}
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                                <div className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {isArabic ? '🔋 سيناريوهات قطع الكهرباء' : '🔋 Load-shedding scenarios'}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {isArabic
                                        ? 'زمن تشغيل راوتر WE VDSL الفعلي يُقاس بالساعات حتى نفاد الشحنة — أهم رقم لأي بيت مصري.'
                                        : 'Actual WE VDSL router runtime measured in hours to depletion — the number that matters in every Egyptian home.'}
                                </p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                                <div className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {isArabic ? '🌡️ الاستخدام الواقعي' : '🌡️ Real-world usage'}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {isArabic
                                        ? 'اختبارات حمل يومي: مترو القاهرة، السفر، حرارة الصيف — مع قياس الحرارة القصوى والسعة الفعلية.'
                                        : 'Daily-carry tests: Cairo metro, travel, summer heat — logging max temperature and actual delivered capacity.'}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-6 text-sm">
                            <a href="/api/lab-data/json" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                {isArabic ? '⬇ البيانات كاملة JSON' : '⬇ Full data (JSON)'}
                            </a>
                            <a href="/api/lab-data/csv" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                {isArabic ? '⬇ البيانات كاملة CSV' : '⬇ Full data (CSV)'}
                            </a>
                        </div>
                    </div>
                </section>

                {/* Tested products */}
                <section className="py-12">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                            {isArabic ? 'المنتجات المُختبرة' : 'Tested products'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {cards.map(card => (
                                <Link
                                    key={card.slug}
                                    href={card.url}
                                    className="block bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        {card.image && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={card.image.replace(/\.webp$/, '-480.webp')}
                                                alt={card.name}
                                                width={64}
                                                height={64}
                                                loading="lazy"
                                                className="w-16 h-16 rounded-xl object-cover bg-gray-50 dark:bg-gray-800 shrink-0"
                                            />
                                        )}
                                        <div className="min-w-0">
                                            <div className="font-bold text-gray-900 dark:text-white">{card.name}</div>
                                            <div className="text-xs text-gray-500 mb-2">{card.brand}</div>
                                            {card.scenario && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                                                    {card.scenario}
                                                </p>
                                            )}
                                            <div className="flex flex-wrap gap-1.5">
                                                {card.chips.map((chip, i) => (
                                                    <span key={i} className="text-[11px] bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full px-2.5 py-0.5">
                                                        {chip}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-8">
                            {isArabic
                                ? `كل بطاقة تفتح صفحة المنتج وفيها تفاصيل الاختبار كاملة (السيناريو، الظروف، النتيجة). إجمالي الاختبارات المنشورة: ${testedCount}.`
                                : `Each card opens the product page with the full test details (scenario, conditions, result). Total published tests: ${testedCount}.`}
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
