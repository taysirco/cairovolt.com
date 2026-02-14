'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';

export default function ContactPageClient() {
    const locale = useLocale();
    const t = useTranslations('Footer');
    const tCommon = useTranslations('Common');
    const isRTL = locale === 'ar';

    return (
        <div className="min-h-screen pt-20 pb-16" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
                <div className="container mx-auto px-4">
                    <nav className="text-sm text-white/70 mb-6">
                        <Link href={`/${locale}`} className="hover:text-white">
                            {tCommon('home')}
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white font-medium">{t('contactUs')}</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {t('contactUs')}
                    </h1>
                    <p className="text-xl text-white/90">
                        {isRTL
                            ? 'نحن هنا لمساعدتك! تواصل معنا عبر أي من الطرق التالية'
                            : "We're here to help! Contact us through any of the following methods"}
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/201063374834"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all text-center"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-500 flex items-center justify-center text-white text-3xl">
                            <SvgIcon name="phone" className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            {isRTL ? 'واتساب' : 'WhatsApp'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            {isRTL ? 'تواصل معنا مباشرة' : 'Chat with us directly'}
                        </p>
                        <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium group-hover:bg-green-500 group-hover:text-white transition-colors">
                            {isRTL ? 'ابدأ المحادثة' : 'Start Chat'}
                        </span>
                    </a>

                    {/* Phone */}
                    <a
                        href="tel:+201063374834"
                        className="group p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all text-center"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-500 flex items-center justify-center text-white text-3xl">
                            <SvgIcon name="phone" className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            {isRTL ? 'اتصل بنا' : 'Call Us'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            {isRTL ? 'من 10 صباحاً - 10 مساءً' : '10 AM - 10 PM'}
                        </p>
                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            01063374834
                        </span>
                    </a>

                    {/* Email */}
                    <a
                        href="mailto:support@mobilestore.eg"
                        className="group p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all text-center"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500 flex items-center justify-center text-white text-3xl">
                            <SvgIcon name="chat" className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            {isRTL ? 'البريد الإلكتروني' : 'Email'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            {isRTL ? 'نرد خلال 24 ساعة' : 'We reply within 24 hours'}
                        </p>
                        <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            {isRTL ? 'أرسل رسالة' : 'Send Email'}
                        </span>
                    </a>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-12">
                    {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                </h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {(isRTL ? [
                        { q: 'ما هي طرق الدفع المتاحة؟', a: 'نوفر الدفع عند الاستلام (كاش) في جميع المحافظات، بالإضافة إلى الدفع بالبطاقة الائتمانية.' },
                        { q: 'كم تستغرق مدة الشحن؟', a: 'الشحن يستغرق من 2-3 أيام عمل للقاهرة والجيزة، و3-5 أيام للمحافظات الأخرى.' },
                        { q: 'هل المنتجات أصلية؟', a: 'نعم! جميع منتجاتنا أصلية 100% مع ضمان رسمي من الوكيل المعتمد.' },
                        { q: 'ما هي سياسة الاستبدال والإرجاع؟', a: 'يمكنك استبدال أو إرجاع المنتج خلال 14 يوم من تاريخ الاستلام بشرط أن يكون في حالته الأصلية.' },
                    ] : [
                        { q: 'What payment methods are available?', a: 'We offer Cash on Delivery (COD) in all governorates, plus credit card payment.' },
                        { q: 'How long does shipping take?', a: 'Shipping takes 2-3 business days for Cairo and Giza, and 3-5 days for other governorates.' },
                        { q: 'Are the products original?', a: 'Yes! All our products are 100% original with official warranty from the authorized dealer.' },
                        { q: 'What is the return policy?', a: 'You can exchange or return the product within 14 days of receipt, provided it\'s in its original condition.' },
                    ]).map((faq, idx) => (
                        <details
                            key={idx}
                            className="group p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                        >
                            <summary className="flex items-center justify-between cursor-pointer font-bold">
                                {faq.q}
                                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-gray-500 dark:text-gray-400 leading-relaxed">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <h3 className="text-2xl font-bold mb-4">
                        {isRTL ? 'تحتاج مساعدة سريعة؟' : 'Need Quick Help?'}
                    </h3>
                    <p className="mb-6 text-white/90">
                        {isRTL
                            ? 'تواصل معنا الآن عبر واتساب وسنرد عليك فوراً'
                            : 'Contact us now via WhatsApp and we\'ll respond immediately'}
                    </p>
                    <a
                        href="https://wa.me/201063374834"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-colors"
                    >
                        {isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                    </a>
                </div>
            </section>
        </div>
    );
}
