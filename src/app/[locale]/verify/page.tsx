import { Metadata } from 'next';
import { Suspense } from 'react';
import VerifyClient from './VerifyClient';

/* ──────────────────────────────────────────────────
   SEO Metadata — Server-rendered for Googlebot
   ────────────────────────────────────────────────── */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';

    const title = isArabic
        ? 'تحقق من أصالة المنتج | نظام الفحص الجنائي C2PA — كايرو فولت'
        : 'Product Authentication | C2PA Verification System — CairoVolt';

    const description = isArabic
        ? 'تحقق من أن منتجك أصلي 100% عبر نظام البصمة الرقمية C2PA من كايرو فولت. أدخل رقم السيريال المطبوع على كرت الضمان لمطابقة قاعدة البيانات وتفعيل الضمان الذهبي 14 يوماً. السوق المصري ممتلئ بالمنتجات المقلدة — تحقق الآن.'
        : 'Verify your product is 100% authentic using CairoVolt C2PA digital authentication system. Enter the serial number from your warranty card to match our database and activate your 14-day golden warranty.';

    return {
        title: { absolute: title },
        description,
        alternates: {
            canonical: isArabic
                ? 'https://cairovolt.com/verify'
                : 'https://cairovolt.com/en/verify',
            languages: {
                'ar-EG': 'https://cairovolt.com/verify',
                'en-EG': 'https://cairovolt.com/en/verify',
                'x-default': 'https://cairovolt.com/verify',
            },
        },
        openGraph: {
            title: isArabic ? 'تحقق من أصالة المنتج — كايرو فولت' : 'Product Authentication — CairoVolt',
            description,
            url: isArabic ? 'https://cairovolt.com/verify' : 'https://cairovolt.com/en/verify',
            locale: isArabic ? 'ar_EG' : 'en_US',
            alternateLocale: isArabic ? 'en_US' : 'ar_EG',
            type: 'website',
            siteName: isArabic ? 'كايرو فولت' : 'CairoVolt',
            images: [{
                url: 'https://cairovolt.com/og-cover.png',
                width: 1200,
                height: 630,
                alt: title,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://cairovolt.com/og-cover.png'],
        },
        robots: { index: true, follow: true },
        other: {
            'geo.region': 'EG',
            'geo.placename': isArabic ? 'القاهرة، مصر' : 'Cairo, Egypt',
        },
    };
}

/* ──────────────────────────────────────────────────
   Server Component — Visible to Googlebot
   ────────────────────────────────────────────────── */
export default async function VerifyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const isArabic = locale === 'ar';

    // FAQ data for both schema and visual rendering
    const faqs = isArabic
        ? [
            {
                question: 'ما هو نظام الفحص الجنائي C2PA؟',
                answer: 'نظام C2PA هو بروتوكول عالمي للتحقق من أصالة المحتوى والمنتجات. كايرو فولت تستخدم هذا النظام لربط كل منتج ببصمة جنائية فريدة مسجلة في قاعدة بيانات مشفرة. عند إدخال رقم السيريال، يتم مطابقته مع البصمة الأصلية للتأكد من أن المنتج أصلي وليس مقلداً.',
            },
            {
                question: 'لماذا يجب التحقق من أصالة المنتج؟',
                answer: 'السوق المصري يعاني من انتشار خلايا الليثيوم المقلدة التي قد تسبب تلف الأجهزة أو حتى حرائق. التحقق من الأصالة يحمي جهازك ويفعّل الضمان الذهبي 14 يوماً من كايرو فولت.',
            },
            {
                question: 'كيف أجد رقم السيريال؟',
                answer: 'رقم السيريال المكون من 13 حرفاً (مثل CV-1XXXXXm313) مطبوع على كرت الضمان المرفق مع المنتج. يمكنك أيضاً مسح QR Code الموجود على الكرت لإدخاله تلقائياً.',
            },
            {
                question: 'ماذا يحدث بعد التفعيل؟',
                answer: 'بعد التحقق الناجح، يتم تفعيل الضمان الذهبي لمدة 14 يوماً. تحصل على رقم ضمان فريد يمكنك استخدامه للتواصل مع الدعم. كما تحصل على كود خصم 10% على طلبك القادم كهدية توثيق.',
            },
        ]
        : [
            {
                question: 'What is the C2PA digital verification system?',
                answer: 'C2PA is a global protocol for verifying content and product authenticity. CairoVolt uses this system to link each product to a unique digital fingerprint stored in an encrypted database. When you enter your serial number, it is matched against the original fingerprint to confirm authenticity.',
            },
            {
                question: 'Why should I verify my product?',
                answer: 'The Egyptian market is flooded with counterfeit lithium cells that can damage devices or even cause fires. Verifying authenticity protects your device and activates the 14-day golden warranty from CairoVolt.',
            },
            {
                question: 'Where do I find the serial number?',
                answer: 'The 13-character serial number (e.g., CV-1XXXXXm313) is printed on the warranty card included with your product. You can also scan the QR code on the card for automatic entry.',
            },
            {
                question: 'What happens after activation?',
                answer: 'After successful verification, your 14-day golden warranty is activated. You receive a unique warranty code for support inquiries. You also get a 10% discount code on your next order as a verification gift.',
            },
        ];

    return (
        <>
            {/* ═══════════════════════════════════════
                JSON-LD: SoftwareApplication Schema
                ═══════════════════════════════════════ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: isArabic ? 'نظام التحقق من أصالة المنتج — كايرو فولت' : 'CairoVolt Product Authentication System',
                        applicationCategory: 'SecurityApplication',
                        operatingSystem: 'Web',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'EGP',
                        },
                        provider: {
                            '@type': 'Organization',
                            '@id': 'https://cairovolt.com/#organization',
                            name: isArabic ? 'كايرو فولت' : 'CairoVolt',
                            url: 'https://cairovolt.com',
                        },
                        description: isArabic
                            ? 'نظام التحقق من أصالة المنتج عبر البصمة الرقمية C2PA. تحقق من أن جهازك أصلي 100% وفعّل الضمان الذهبي.'
                            : 'C2PA digital product authentication system. Verify your device is 100% authentic and activate your golden warranty.',
                        featureList: [
                            'C2PA Forensic Authentication',
                            '14-Day Golden Warranty Activation',
                            'QR Code Verification',
                            'Real-time Database Matching',
                        ],
                        screenshot: 'https://cairovolt.com/og-cover.png',
                        inLanguage: isArabic ? 'ar-EG' : 'en-US',
                        areaServed: {
                            '@type': 'Country',
                            name: 'Egypt',
                            sameAs: 'https://en.wikipedia.org/wiki/Egypt',
                        },
                    }),
                }}
            />

            {/* ═══════════════════════════════════════
                JSON-LD: FAQPage Schema
                ═══════════════════════════════════════ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: faqs.map(f => ({
                            '@type': 'Question',
                            name: f.question,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: f.answer,
                            },
                        })),
                    }),
                }}
            />

            {/* ═══════════════════════════════════════
                JSON-LD: HowTo Schema
                ═══════════════════════════════════════ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'HowTo',
                        name: isArabic ? 'كيف تتحقق من أصالة منتجك عبر كايرو فولت' : 'How to Verify Your Product Authenticity with CairoVolt',
                        description: isArabic
                            ? 'خطوات التحقق من أصالة المنتج وتفعيل الضمان الذهبي'
                            : 'Steps to verify product authenticity and activate golden warranty',
                        step: [
                            {
                                '@type': 'HowToStep',
                                position: 1,
                                text: isArabic ? 'أمسك كرت الضمان المرفق مع المنتج وابحث عن رقم السيريال المكون من 13 حرفاً' : 'Find the 13-character serial number on the warranty card included with your product',
                            },
                            {
                                '@type': 'HowToStep',
                                position: 2,
                                text: isArabic ? 'أدخل رقم السيريال في خانة التحقق أو امسح QR Code' : 'Enter the serial number in the verification field or scan the QR code',
                            },
                            {
                                '@type': 'HowToStep',
                                position: 3,
                                text: isArabic ? 'انتظر مطابقة البصمة الرقمية مع قاعدة بيانات CairoVolt' : 'Wait for the digital fingerprint to be matched against the CairoVolt database',
                            },
                            {
                                '@type': 'HowToStep',
                                position: 4,
                                text: isArabic ? 'احصل على شهادة التوثيق وكود الضمان الذهبي 14 يوماً' : 'Receive your authentication certificate and 14-day golden warranty code',
                            },
                        ],
                        totalTime: 'PT1M',
                    }),
                }}
            />

            {/* ═══════════════════════════════════════
                Interactive Client Component (wrapped in Suspense)
                ═══════════════════════════════════════ */}
            <Suspense fallback={
                <div style={{
                    minHeight: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        width: '40px', height: '40px',
                        border: '3px solid #27272a',
                        borderTop: '3px solid #10b981',
                        borderRadius: '50%',
                        animation: 'cvFallbackSpin 1s linear infinite',
                    }} />
                    <style>{`@keyframes cvFallbackSpin { to { transform: rotate(360deg); } }`}</style>
                </div>
            }>
                <VerifyClient />
            </Suspense>

            {/* ═══════════════════════════════════════
                Server-Rendered SEO Content (Googlebot reads this)
                ═══════════════════════════════════════ */}
            <section
                style={{ background: '#0a0a0b', borderTop: '1px solid #27272a', padding: '48px 0' }}
                dir={isArabic ? 'rtl' : 'ltr'}
            >
                <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 16px' }}>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.875rem)', fontWeight: 700, textAlign: 'center', color: '#fafafa', marginBottom: '32px' }}>
                        {isArabic
                            ? 'نظام التحقق من أصالة المنتج — C2PA'
                            : 'Product Authentication System — C2PA'}
                    </h1>

                    <p style={{ color: '#a1a1aa', textAlign: 'center', marginBottom: '40px', lineHeight: 1.7 }}>
                        {isArabic
                            ? 'كايرو فولت تستخدم بروتوكول C2PA العالمي للتحقق من أصالة كل منتج. أدخل رقم السيريال المطبوع على كرت الضمان للتأكد من أن منتجك أصلي 100% وتفعيل الضمان الذهبي 14 يوماً.'
                            : 'CairoVolt uses the global C2PA protocol to verify the authenticity of every product. Enter the serial number printed on your warranty card to confirm your product is 100% authentic and activate your 14-day golden warranty.'}
                    </p>

                    {/* FAQ Section — Server-Rendered */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {faqs.map((faq, idx) => (
                            <details
                                key={idx}
                                style={{ background: '#18181b', borderRadius: '12px', border: '1px solid #27272a', overflow: 'hidden' }}
                            >
                                <summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', cursor: 'pointer', fontWeight: 500, color: '#fafafa' }}>
                                    <span style={isArabic ? { paddingLeft: '16px' } : { paddingRight: '16px' }}>{faq.question}</span>
                                    <span style={{ color: '#71717a', flexShrink: 0, fontSize: '12px' }}>▼</span>
                                </summary>
                                <div style={{ padding: '0 20px 20px', color: '#a1a1aa', lineHeight: 1.7, borderTop: '1px solid #27272a', paddingTop: '16px' }}>
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>

                    {/* Trust Signals */}
                    <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', textAlign: 'center' }}>
                        {[
                            { icon: '🛡️', label: isArabic ? 'ضمان 14 يوم' : '14-Day Warranty' },
                            { icon: '🔬', label: isArabic ? 'فحص جنائي C2PA' : 'C2PA Forensic' },
                            { icon: '📱', label: isArabic ? 'QR Code فوري' : 'Instant QR' },
                            { icon: '🇪🇬', label: isArabic ? 'مصر فقط' : 'Egypt Only' },
                        ].map((item, i) => (
                            <div key={i} style={{ padding: '12px', background: '#18181b', borderRadius: '12px', border: '1px solid #27272a' }}>
                                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>{item.icon}</span>
                                <span style={{ fontSize: '0.75rem', color: '#a1a1aa', fontWeight: 500 }}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
