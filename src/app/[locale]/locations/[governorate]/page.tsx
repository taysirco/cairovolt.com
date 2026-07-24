import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGovernorateBySlug, governorates } from '@/data/governorates';
import { BostaTracker } from '@/lib/bosta';
import { getShippingFee, FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { FAQPageSchema } from '@/components/schemas/StructuredDataSchemas';
import ShareAnalytics from '@/components/content/ShareAnalytics';

export const revalidate = 3600;
export const dynamicParams = false;

interface PageProps {
    params: Promise<{
        locale: string;
        governorate: string;
    }>;
}

export async function generateStaticParams() {
    return ['ar', 'en'].flatMap(locale =>
        governorates.map(governorate => ({ locale, governorate: governorate.slug })),
    );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, governorate: governorateSlug } = await params;
    const governorate = getGovernorateBySlug(governorateSlug);

    if (!governorate) return { title: 'Location Not Found' };

    const isArabic = locale === 'ar';
    const logistics = BostaTracker.getRegionalStats(governorate.slug, locale);
    const title = isArabic ? governorate.meta.titleAr : governorate.meta.titleEn;
    const description = isArabic
        ? `${governorate.meta.descriptionAr} التوصيل إلى ${governorate.nameAr}: ${logistics.delivery_estimate}، ويُؤكد الموعد بعد مراجعة العنوان.`
        : `${governorate.meta.descriptionEn} ${logistics.delivery_estimate} to ${governorate.nameEn}; the date is confirmed after address review.`;
    const canonical = `https://cairovolt.com${isArabic ? '' : '/en'}/locations/${governorate.slug}`;

    return {
        title: { absolute: title },
        description,
        robots: { index: true, follow: true },
        alternates: {
            canonical,
            languages: {
                'ar-EG': `https://cairovolt.com/locations/${governorate.slug}`,
                'en-EG': `https://cairovolt.com/en/locations/${governorate.slug}`,
                'x-default': `https://cairovolt.com/locations/${governorate.slug}`,
            },
        },
        openGraph: {
            title,
            description,
            url: canonical,
            locale: isArabic ? 'ar_EG' : 'en_US',
            type: 'website',
            images: [{
                url: '/og-cover.png',
                width: 1200,
                height: 630,
                alt: isArabic
                    ? `باور بانك وحلول شحن مع التوصيل إلى ${governorate.nameAr}`
                    : `Power banks and charging solutions with delivery to ${governorate.nameEn}`,
            }],
        },
        other: { 'geo.region': 'EG' },
    };
}

export default async function GovernoratePage({ params }: PageProps) {
    const { locale, governorate: governorateSlug } = await params;
    const governorate = getGovernorateBySlug(governorateSlug);

    if (!governorate) return notFound();

    const isArabic = locale === 'ar';
    const prefix = isArabic ? '' : '/en';
    const governorateName = isArabic ? governorate.nameAr : governorate.nameEn;
    const logistics = BostaTracker.getRegionalStats(governorate.slug, locale);
    const shippingFee = getShippingFee(governorate.slug, 0);
    const freeShippingFrom = FREE_SHIPPING_THRESHOLD.toLocaleString('en-US');
    const cityList = (isArabic ? governorate.cities.ar : governorate.cities.en)
        .join(isArabic ? ' و' : ', ');
    const serviceUrl = `https://cairovolt.com${prefix}/locations/${governorate.slug}`;

    const solutionLinks = isArabic
        ? [
            {
                href: `${prefix}/power-banks`,
                icon: '🔋',
                title: 'باور بانك',
                text: 'قارن السعة بالـWh وقدرة الخرج والمنافذ والوزن قبل اختيار الموديل.',
            },
            {
                href: `${prefix}/chargers`,
                icon: '⚡',
                title: 'شواحن حائطية',
                text: 'طابق قدرة المنفذ ودعم PD أو PPS مع هاتفك أو التابلت أو اللابتوب.',
            },
            {
                href: `${prefix}/cables`,
                icon: '🔌',
                title: 'كابلات شحن',
                text: 'اختر طرفي الكابل وقدرة الشحن ونقل البيانات والطول المناسب للاستخدام.',
            },
        ]
        : [
            {
                href: `${prefix}/power-banks`,
                icon: '🔋',
                title: 'Power banks',
                text: 'Compare Wh capacity, output power, ports, and weight before choosing a model.',
            },
            {
                href: `${prefix}/chargers`,
                icon: '⚡',
                title: 'Wall chargers',
                text: 'Match per-port power and PD or PPS support to your phone, tablet, or laptop.',
            },
            {
                href: `${prefix}/cables`,
                icon: '🔌',
                title: 'Charging cables',
                text: 'Choose the connectors, charging rating, data support, and length you need.',
            },
        ];

    const questions = isArabic
        ? [
            {
                question: `التوصيل إلى ${governorate.nameAr} بياخد كام يوم؟`,
                answer: `${logistics.delivery_estimate}. المدة تقديرية، ويتواصل فريق كايرو فولت لتأكيد الموعد بعد مراجعة الطلب.`,
            },
            {
                question: `كم رسوم الشحن إلى ${governorate.nameAr}؟`,
                answer: `رسوم الشحن إلى ${governorate.nameAr} ${shippingFee} جنيهاً للطلبات الأقل من ${freeShippingFrom} جنيه، والشحن مجاني للطلبات من ${freeShippingFrom} جنيه فأكثر وفق سياسة الشحن.`,
            },
            {
                question: `هل الدفع عند الاستلام متاح في ${governorate.nameAr}؟`,
                answer: logistics.cash_on_delivery
                    ? 'نعم، الدفع عند الاستلام متاح للطلبات المؤهلة، ويُؤكد عند مراجعة الطلب.'
                    : 'تُراجع طريقة الدفع مع فريق كايرو فولت عند تأكيد الطلب.',
            },
            {
                question: 'إزاي أراجع الضمان والاسترجاع قبل الطلب؟',
                answer: 'توجد شروط الضمان والاسترجاع مكتوبة في صفحات السياسات، ويمكنك مراجعتها قبل تأكيد الطلب.',
            },
            {
                question: `إزاي أقدّر سعة الباور بانك المناسبة قبل الطلب إلى ${governorate.nameAr}؟`,
                answer: 'استخدم الطاقة بالـWh لا رقم mAh وحده: Wh تقريباً = mAh × الجهد الاسمي ÷ 1000، ثم اخصم فاقد التحويل كتقدير. راجع قيمة Wh المكتوبة على الموديل متى كانت متاحة.',
            },
            {
                question: 'هل الشاحن والكابل يغيران سرعة الشحن؟',
                answer: 'نعم، لكن الهاتف هو الذي يحدد ما يقبله. يجب أن تتوافق قدرة الشاحن والبروتوكول والكابل مع الجهاز؛ رقم الواط الأكبر وحده لا يضمن سرعة أعلى.',
            },
        ]
        : [
            {
                question: `How long does delivery to ${governorate.nameEn} take?`,
                answer: `${logistics.delivery_estimate}. This is an estimate; CairoVolt confirms the date after reviewing the order.`,
            },
            {
                question: `How much is shipping to ${governorate.nameEn}?`,
                answer: `Shipping to ${governorate.nameEn} costs ${shippingFee} EGP for orders under ${freeShippingFrom} EGP; orders of ${freeShippingFrom} EGP or more ship free under the shipping policy.`,
            },
            {
                question: `Is cash on delivery available in ${governorate.nameEn}?`,
                answer: logistics.cash_on_delivery
                    ? 'Yes. Cash on delivery is available for eligible orders and is confirmed during order review.'
                    : 'The available payment method is confirmed by CairoVolt when the order is reviewed.',
            },
            {
                question: 'Where can I review warranty and return terms?',
                answer: 'The warranty and return terms are published on the policy pages and can be reviewed before ordering.',
            },
            {
                question: `How do I estimate power-bank capacity before ordering to ${governorate.nameEn}?`,
                answer: 'Use energy in Wh rather than mAh alone: approximate Wh = mAh × nominal voltage ÷ 1,000, then allow for conversion loss as an estimate. Use the model label\'s Wh value when available.',
            },
            {
                question: 'Do the charger and cable affect charging speed?',
                answer: 'Yes, but the device controls what it accepts. Charger output, protocol, and cable must all match the device; a larger wattage label alone does not guarantee a faster result.',
            },
        ];

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: isArabic ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${prefix}` },
                    { name: isArabic ? 'الشحن والتوصيل' : 'Shipping', url: `https://cairovolt.com${prefix}/shipping` },
                    { name: governorateName, url: serviceUrl },
                ]}
                locale={locale}
            />

            <FAQPageSchema
                items={questions}
                locale={locale}
                url={serviceUrl}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: isArabic
                            ? `خدمة توصيل كايرو فولت إلى ${governorate.nameAr}`
                            : `CairoVolt delivery service to ${governorate.nameEn}`,
                        url: serviceUrl,
                        provider: { '@id': 'https://cairovolt.com/#organization' },
                        areaServed: {
                            '@type': 'AdministrativeArea',
                            name: governorate.nameEn,
                            containedInPlace: { '@type': 'Country', name: 'Egypt' },
                        },
                        serviceType: 'Product delivery',
                    }),
                }}
            />

            <main className="min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900">
                <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 py-16 text-white md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50">
                                <span aria-hidden="true">🚚</span>
                                {isArabic ? 'طاقة احتياطية ومعلومات توصيل' : 'Backup power and delivery information'}
                            </span>
                            <h1 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
                                {isArabic
                                    ? <>باور بانك وحلول طاقة احتياطية في <span className="text-blue-200">{governorate.nameAr}</span></>
                                    : <>Power banks and backup-power options in <span className="text-blue-200">{governorate.nameEn}</span></>}
                            </h1>
                            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                                {isArabic
                                    ? `قارن الطاقة بالـWh وقدرة الخرج والتوافق مع جهازك قبل استخدام الحل أثناء انقطاع الكهرباء، ثم راجع معلومات التوصيل إلى ${governorate.nameAr}.`
                                    : `Compare Wh energy, output power, and device compatibility before relying on an option during a power cut, then review delivery information for ${governorate.nameEn}.`}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="relative z-10 -mt-8 py-8">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900 md:p-8">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {isArabic
                                    ? `معلومات الطلب إلى ${governorate.nameAr}`
                                    : `Order information for ${governorate.nameEn}`}
                            </h2>
                            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <InfoCard
                                    value={logistics.delivery_estimate}
                                    label={isArabic ? 'مدة التوصيل التقديرية' : 'Estimated delivery time'}
                                    color="text-blue-600 dark:text-blue-400"
                                />
                                <InfoCard
                                    value={isArabic ? `${shippingFee} جنيه` : `${shippingFee} EGP`}
                                    label={isArabic
                                        ? `رسوم الشحن للطلبات الأقل من ${freeShippingFrom} جنيه`
                                        : `Shipping fee for orders under ${freeShippingFrom} EGP`}
                                    color="text-purple-600 dark:text-purple-400"
                                />
                                <InfoCard
                                    value={logistics.cash_on_delivery
                                        ? (isArabic ? 'متاح' : 'Available')
                                        : (isArabic ? 'يُراجع' : 'Reviewed')}
                                    label={isArabic ? 'الدفع عند الاستلام' : 'Cash on delivery'}
                                    color="text-green-600 dark:text-green-400"
                                />
                                <InfoCard
                                    value={isArabic ? 'بعد المراجعة' : 'After review'}
                                    label={isArabic ? 'تأكيد الموعد' : 'Date confirmation'}
                                    color="text-amber-600 dark:text-amber-400"
                                />
                            </div>
                            <p className="mt-5 text-center text-sm leading-6 text-gray-600 dark:text-gray-400">
                                {logistics.confirmation_note}
                            </p>
                            <p className="mt-2 text-center text-sm leading-6 text-gray-600 dark:text-gray-400">
                                {isArabic
                                    ? `الشحن مجاني للطلبات من ${freeShippingFrom} جنيه فأكثر، والتوصيل متاح للعناوين المؤهلة في ${governorate.nameAr} بما يشمل ${cityList} وباقي المناطق.`
                                    : `Shipping is free from ${freeShippingFrom} EGP, and delivery covers eligible addresses across ${governorate.nameEn}, including ${cityList}.`}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="container mx-auto max-w-5xl px-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                            {isArabic
                                ? `اختر حل الشحن المناسب مع التوصيل إلى ${governorate.nameAr}`
                                : `Choose a charging solution for delivery to ${governorate.nameEn}`}
                        </h2>
                        <p className="mt-3 max-w-3xl leading-7 text-gray-600 dark:text-gray-300">
                            {isArabic
                                ? `ابدأ باحتياج أجهزتك، ثم افتح صفحة الموديل لمراجعة السعر والتوافر الحاليين قبل طلب التوصيل إلى ${governorate.nameAr}. لا يحدد رقم mAh وحده عدد الشحنات، ولا يضمن رقم الواط وحده أعلى سرعة.`
                                : `Start with your device requirements, then check the model page for current price and availability before ordering to ${governorate.nameEn}. mAh alone does not determine charge count, and wattage alone does not guarantee maximum speed.`}
                        </p>
                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            {solutionLinks.map(solution => (
                                <Link
                                    key={solution.href}
                                    href={solution.href}
                                    className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                                >
                                    <span className="text-3xl" aria-hidden="true">{solution.icon}</span>
                                    <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
                                        {solution.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                        {solution.text}
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
                                        {isArabic ? 'قارن الخيارات' : 'Compare options'}
                                        <span aria-hidden="true">{isArabic ? '←' : '→'}</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-12 dark:bg-gray-900/50">
                    <div className="container mx-auto max-w-5xl px-4">
                        <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6 dark:border-blue-900/50 dark:bg-blue-950/20 md:p-10">
                            <span className="text-sm font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                                {isArabic ? 'حساب توضيحي — تقدير وليس وعد أداء' : 'Illustrative calculation — estimate, not a performance promise'}
                            </span>
                            <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                                {isArabic
                                    ? `كيف تقدّر سعة الباور بانك قبل الطلب إلى ${governorate.nameAr}؟`
                                    : `How to estimate power-bank capacity before ordering to ${governorate.nameEn}`}
                            </h2>
                            <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
                                {isArabic
                                    ? 'قارن الطاقة بالواط‑ساعة Wh لأن قيم mAh قد تكون محسوبة عند جهود اسمية مختلفة. إذا كانت قيمة Wh مكتوبة على ملصق الموديل فاستخدمها؛ وإلا يمكن إجراء الحساب التقريبي التالي بالجهد الاسمي المنشور.'
                                    : 'Compare energy in watt-hours (Wh), because mAh values can be stated at different nominal voltages. Use the model label’s Wh value when available; otherwise calculate an approximation with its published nominal voltage.'}
                            </p>

                            <div className="mt-6 grid gap-4 lg:grid-cols-3">
                                <EstimateStep
                                    number="1"
                                    title={isArabic ? 'حوّل mAh إلى Wh' : 'Convert mAh to Wh'}
                                    formula="Wh ≈ mAh × V ÷ 1,000"
                                    text={isArabic
                                        ? 'استخدم الجهد الاسمي المكتوب على البطارية أو في مواصفات الموديل.'
                                        : 'Use the nominal voltage printed on the battery or stated in the model specification.'}
                                />
                                <EstimateStep
                                    number="2"
                                    title={isArabic ? 'قدّر فاقد التحويل' : 'Allow for conversion loss'}
                                    formula="Usable Wh ≈ Wh × 0.65–0.80"
                                    text={isArabic
                                        ? 'النطاق 65%–80% افتراض توضيحي فقط؛ يختلف حسب الموديل والجهد والكابل والجهاز.'
                                        : 'The 65%–80% range is an illustrative assumption only; the model, voltage, cable, and device change the result.'}
                                />
                                <EstimateStep
                                    number="3"
                                    title={isArabic ? 'قدّر مكافئ الشحنات' : 'Estimate charge equivalents'}
                                    formula="Charges ≈ usable bank Wh ÷ device Wh"
                                    text={isArabic
                                        ? 'النتيجة مكافئ طاقة تقريبي، وليست عدداً مضموناً من الشحنات الكاملة.'
                                        : 'The result is an approximate energy equivalent, not a guaranteed number of full charges.'}
                                />
                            </div>

                            <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                                <table className="w-full min-w-[640px] text-sm">
                                    <thead className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 text-start font-bold">{isArabic ? 'مثال سعة اسمية' : 'Nominal-capacity example'}</th>
                                            <th className="px-4 py-3 text-start font-bold">{isArabic ? 'الطاقة النظرية' : 'Theoretical energy'}</th>
                                            <th className="px-4 py-3 text-start font-bold">{isArabic ? 'طاقة قابلة للاستخدام تقديرية' : 'Estimated usable energy'}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 text-gray-700 dark:divide-gray-700 dark:text-gray-300">
                                        <tr>
                                            <td className="px-4 py-3" dir="ltr">10,000 mAh @ 3.7 V</td>
                                            <td className="px-4 py-3" dir="ltr">≈ 37 Wh</td>
                                            <td className="px-4 py-3" dir="ltr">≈ 24–30 Wh</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3" dir="ltr">20,000 mAh @ 3.7 V</td>
                                            <td className="px-4 py-3" dir="ltr">≈ 74 Wh</td>
                                            <td className="px-4 py-3" dir="ltr">≈ 48–59 Wh</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                {isArabic
                                    ? 'مثال تقديري محايد: بطارية هاتف 5,000mAh عند 3.85V تساوي نحو 19.25Wh نظرياً. في المثال الأول يصبح الناتج نحو 1.2–1.6 مكافئ شحنة كاملة. الاستخدام أثناء الشحن وحالة البطارية والحرارة وكفاءة الأجهزة تغيّر النتيجة.'
                                    : 'Model-agnostic estimate: a 5,000mAh phone battery at 3.85V is about 19.25Wh theoretically. In the first example, that gives roughly 1.2–1.6 full-charge equivalents. Use during charging, battery condition, heat, and device efficiency change the result.'}
                            </p>
                            <h3 className="mt-8 text-lg font-bold text-gray-900 dark:text-white">
                                {isArabic
                                    ? 'اختر حل انقطاع الكهرباء حسب الجهاز'
                                    : 'Match the backup-power option to the device'}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                {isArabic
                                    ? 'الهاتف يحتاج إلى توافق الشاحن والكابل، واللابتوب يحتاج إلى USB-C PD بقدرة يقبلها، أما الراوتر فيجب مطابقة الجهد والقطبية والموصل. لا توصل أي جهاز منزلي بباور بانك ما لم ينص المصنع صراحةً على التوافق.'
                                    : 'A phone needs a compatible charger and cable; a laptop needs USB-C PD at a power level it accepts; and a router requires the correct voltage, polarity, and connector. Do not connect an appliance to a power bank unless its manufacturer explicitly supports that use.'}
                            </p>
                            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                {isArabic
                                    ? 'الواط W يصف قدرة الشحن المحتملة، بينما Wh يصف كمية الطاقة. طابق أيضاً بروتوكول الجهاز وقدرة كل منفذ والكابل؛ الصفحة الخاصة بكل موديل هي المرجع للمواصفات الحالية.'
                                    : 'Watts (W) describe potential charging power, while Wh describes energy quantity. Also match the device protocol, per-port output, and cable; the exact model page is the reference for current specifications.'}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="container mx-auto max-w-4xl px-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {isArabic ? 'قبل ما تأكد الطلب' : 'Before you confirm your order'}
                        </h2>
                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <PolicyCard
                                icon="📦"
                                title={isArabic ? 'اقرأ سياسة الشحن' : 'Read the shipping policy'}
                                text={isArabic
                                    ? 'راجع احتساب الرسوم والمدة ومراجعة العنوان قبل الطلب.'
                                    : 'Review fee calculation, timing, and address checks before ordering.'}
                                href={`${prefix}/shipping`}
                            />
                            <PolicyCard
                                icon="🛡️"
                                title={isArabic ? 'اقرأ شروط الضمان' : 'Read warranty terms'}
                                text={isArabic
                                    ? 'مدة وشروط الضمان مكتوبة حسب المنتج.'
                                    : 'Warranty duration and terms are published for each product.'}
                                href={`${prefix}/warranty`}
                            />
                            <PolicyCard
                                icon="↩️"
                                title={isArabic ? 'راجع سياسة الاسترجاع' : 'Review the return policy'}
                                text={isArabic
                                    ? 'اعرف الشروط والخطوات قبل الدفع.'
                                    : 'Check eligibility and steps before payment.'}
                                href={`${prefix}/return-policy`}
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-12 dark:bg-gray-800/30">
                    <div className="container mx-auto max-w-4xl px-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {isArabic
                                ? `أسئلة التوصيل إلى ${governorate.nameAr}`
                                : `Delivery questions for ${governorate.nameEn}`}
                        </h2>
                        <div className="mt-6 space-y-4">
                            {questions.map(item => (
                                <details key={item.question} className="group rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-medium text-gray-900 dark:text-white">
                                        <span>{item.question}</span>
                                        <span className="text-xl text-gray-400 transition-transform group-open:rotate-45">+</span>
                                    </summary>
                                    <p className="px-4 pb-4 leading-7 text-gray-600 dark:text-gray-300">{item.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white">
                            {isArabic ? 'صفحات التوصيل داخل مصر' : 'Delivery pages within Egypt'}
                        </h2>
                        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2">
                            {governorates.map(item => (
                                <Link
                                    key={item.slug}
                                    href={`${prefix}/locations/${item.slug}`}
                                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${item.slug === governorate.slug
                                        ? 'border-blue-600 bg-blue-600 font-bold text-white'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
                                >
                                    {isArabic ? item.nameAr : item.nameEn}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <ShareAnalytics />
            </main>
        </>
    );
}

function InfoCard({ value, label, color }: { value: string; label: string; color: string }) {
    return (
        <div className="rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-800/60">
            <div className={`text-lg font-bold md:text-xl ${color}`}>{value}</div>
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{label}</div>
        </div>
    );
}

function EstimateStep({
    number,
    title,
    formula,
    text,
}: {
    number: string;
    title: string;
    formula: string;
    text: string;
}) {
    return (
        <article className="rounded-2xl border border-blue-100 bg-white p-5 dark:border-blue-900/50 dark:bg-gray-900">
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                {number}
            </span>
            <h3 className="mt-4 font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-3 rounded-lg bg-gray-100 px-3 py-2 font-mono text-sm font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-100" dir="ltr">
                {formula}
            </p>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{text}</p>
        </article>
    );
}

function PolicyCard({ icon, title, text, href }: { icon: string; title: string; text: string; href?: string }) {
    const content = (
        <>
            <span className="text-2xl" aria-hidden="true">{icon}</span>
            <h3 className="mt-4 font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{text}</p>
        </>
    );

    const className = 'rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900';
    return href
        ? <Link href={href} className={`${className} transition hover:border-blue-400`}>{content}</Link>
        : <article className={className}>{content}</article>;
}
