import { Metadata } from 'next';
import { Suspense } from 'react';
import VerifyClient from './VerifyClient';

/* Page metadata */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isArabic = locale === 'ar';

    const title = isArabic
        ? 'التحقق من رقم السيريال وسجل الضمان — كايرو فولت'
        : 'Serial & Warranty Record Verification — CairoVolt';

    const description = isArabic
        ? 'أدخل رقم السيريال المطبوع على كرت الضمان للتحقق من أنه صادر عن كايرو فولت، ثم تفعيل سجل الضمان وفق مدة المنتج وشروطه المكتوبة أو عرض حالته.'
        : 'Enter the serial number printed on the warranty card to confirm that it was issued by CairoVolt, then activate or view the record under the product\'s written warranty terms.';

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
            title: isArabic ? 'التحقق من السيريال والضمان — كايرو فولت' : 'Serial & Warranty Verification — CairoVolt',
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

/* Server-rendered verification page */
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
                question: 'ما الذي يؤكده فحص رقم السيريال؟',
                answer: 'يؤكد الفحص أن رقم السيريال صدر من كايرو فولت وأن له سجلاً في قاعدة بيانات الضمان. لا يُعد هذا الفحص شهادة مستقلة من الشركة المصنعة لإثبات أصالة المنتج.',
            },
            {
                question: 'لماذا أتحقق من رقم السيريال؟',
                answer: 'للتحقق من تسجيل كرت الضمان لدى كايرو فولت، وتفعيل فترة الضمان المرتبطة بالسيريال أو عرض بيانات التفعيل السابقة.',
            },
            {
                question: 'كيف أجد رقم السيريال؟',
                answer: 'رقم السيريال المكون من 13 حرفاً (مثل CV-1XXXXXm313) مطبوع على كرت الضمان المرفق مع المنتج. يمكنك أيضاً مسح QR Code الموجود على الكرت لإدخاله تلقائياً.',
            },
            {
                question: 'ماذا يحدث بعد التفعيل؟',
                answer: 'إذا كان السيريال مسجلاً وغير مُفعّل، تُسجَّل بداية ضمان كايرو فولت وفق المدة المكتوبة للمنتج ويظهر رقم الضمان. وإذا كان مُفعّلاً من قبل، تظهر حالة السجل والتواريخ المسجلة.',
            },
        ]
        : [
            {
                question: 'What does the serial check confirm?',
                answer: 'It confirms that the serial number was issued by CairoVolt and has a record in the CairoVolt warranty database. It is not an independent manufacturer certificate of product authenticity.',
            },
            {
                question: 'Why should I check the serial number?',
                answer: 'To confirm that the warranty card is registered with CairoVolt and to activate the warranty period associated with the serial or view an existing activation.',
            },
            {
                question: 'Where do I find the serial number?',
                answer: 'The 13-character serial number (e.g., CV-1XXXXXm313) is printed on the warranty card included with your product. You can also scan the QR code on the card for automatic entry.',
            },
            {
                question: 'What happens after activation?',
                answer: 'If the registered serial is not yet active, the CairoVolt warranty record starts under the written terms for that product and a warranty number is shown. Existing records display their saved status and dates.',
            },
        ];

    return (
        <>
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

            {/* Server-rendered supporting content */}
            <section
                style={{ background: '#0a0a0b', borderTop: '1px solid #27272a', padding: '48px 0' }}
                dir={isArabic ? 'rtl' : 'ltr'}
            >
                <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 16px' }}>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.875rem)', fontWeight: 700, textAlign: 'center', color: '#fafafa', marginBottom: '32px' }}>
                        {isArabic
                            ? 'التحقق من رقم السيريال وسجل الضمان'
                            : 'Serial & Warranty Record Verification'}
                    </h2>

                    <p style={{ color: '#a1a1aa', textAlign: 'center', marginBottom: '40px', lineHeight: 1.7 }}>
                        {isArabic
                            ? 'أدخل رقم السيريال المطبوع على كرت الضمان للتحقق من أنه صادر عن كايرو فولت وتفعيل سجل الضمان وفق مدة المنتج وشروطه المكتوبة أو عرض حالته. هذا الفحص لا يحل محل تحقق الشركة المصنعة من أصالة المنتج.'
                            : 'Enter the serial number printed on the warranty card to confirm that it was issued by CairoVolt and activate or view the record under the product\'s written warranty terms. This check does not replace manufacturer authenticity verification.'}
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
                            { icon: '🛡️', label: isArabic ? 'مدة الضمان حسب المنتج' : 'Product-Specific Warranty' },
                            { icon: '✓', label: isArabic ? 'سيريال صادر من كايرو فولت' : 'CairoVolt-Issued Serial' },
                            { icon: '📱', label: isArabic ? 'إدخال مباشر أو QR' : 'Direct or QR Entry' },
                            { icon: '📋', label: isArabic ? 'عرض حالة التفعيل' : 'Activation Status' },
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
