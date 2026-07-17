'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { trackWhatsappClick, trackPhoneClick, trackEmailClick } from '@/lib/analytics';

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
                        <Link href={`${locale === 'ar' ? '/' : '/en'}`} className="hover:text-white">
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

            <section className="container mx-auto px-4 pt-10">
                <div className="max-w-4xl mx-auto rounded-2xl border border-blue-100 bg-blue-50/70 p-5 text-sm leading-relaxed text-blue-950 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100">
                    <h2 className="font-bold mb-2">
                        {isRTL ? 'بيانات المتجر وطريقة الخدمة' : 'Store identity and service model'}
                    </h2>
                    <p>
                        {isRTL
                            ? 'الاسم المستخدم في الموقع والطلبات: كايرو فولت (CairoVolt). نحن بائع تجزئة إلكتروني مستقل ولسنا وكيلاً أو موزعاً رسمياً للعلامات المعروضة. نخدم عناوين التوصيل المؤهلة داخل مصر، ولا نعلن حالياً عن فرع استقبال أو استلام حضوري. تكلفة الشحن والمدة التقديرية تتحددان حسب العنوان وتظهران قبل تأكيد الطلب.'
                            : 'The name used on this website and order records is CairoVolt. We are an independent online retailer, not an official agent or authorized distributor of the displayed brands. We serve eligible delivery addresses in Egypt and do not currently advertise a walk-in or pickup branch. Shipping cost and estimated timing depend on the address and are shown before order confirmation.'}
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/201558245974"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsappClick('contact')}
                        className="group p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all text-center"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-500 flex items-center justify-center text-white text-3xl">
                            <SvgIcon name="phone" className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            {isRTL ? 'واتساب' : 'WhatsApp'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {isRTL ? 'تواصل معنا مباشرة' : 'Chat with us directly'}
                        </p>
                        <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium group-hover:bg-green-500 group-hover:text-white transition-colors">
                            {isRTL ? 'ابدأ المحادثة' : 'Start Chat'}
                        </span>
                    </a>

                    {/* Phone */}
                    <a
                        href="tel:+201558245974"
                        onClick={() => trackPhoneClick()}
                        className="group p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all text-center"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-500 flex items-center justify-center text-white text-3xl">
                            <SvgIcon name="phone" className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            {isRTL ? 'اتصل بنا' : 'Call Us'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {isRTL ? 'من 10 صباحاً - 10 مساءً' : '10 AM - 10 PM'}
                        </p>
                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            01558245974
                        </span>
                    </a>

                    {/* Email */}
                    <a
                        href="mailto:support@cairovolt.com"
                        onClick={() => trackEmailClick()}
                        className="group p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all text-center"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500 flex items-center justify-center text-white text-3xl">
                            <SvgIcon name="chat" className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            {isRTL ? 'البريد الإلكتروني' : 'Email'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {isRTL ? 'أرسل تفاصيل استفسارك' : 'Send your enquiry details'}
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
                        { q: 'ما هي طرق الدفع المتاحة؟', a: 'نوفر حالياً الدفع عند الاستلام في المحافظات التي تشملها خدمة التوصيل.' },
                        { q: 'كم تستغرق مدة الشحن؟', a: 'المدة التقديرية غالباً 1-2 يوم عمل للقاهرة والجيزة و3-5 أيام عمل لباقي العناوين المؤهلة، وقد تختلف حسب العنوان وشركة الشحن.' },
                        { q: 'أين أجد بيانات المنتج والضمان؟', a: 'تعرض صفحة كل منتج رقم الموديل والمواصفات والسعر والتوافر وشروط ضمان كايرو فولت المكتوبة. سجل الضمان لا يعد شهادة أصالة من الشركة المصنّعة.' },
                        { q: 'ما هي سياسة الاستبدال والإرجاع؟', a: 'يمكن طلب إرجاع المنتج المؤهل خلال 14 يوماً من الاستلام، وتحدد السياسة المنشورة شروط الحالة والفحص والشحن والاسترداد.' },
                    ] : [
                        { q: 'What payment methods are available?', a: 'We currently offer Cash on Delivery in the governorates covered by our delivery service.' },
                        { q: 'How long does shipping take?', a: 'The estimate is commonly 1-2 business days for Cairo and Giza and 3-5 business days for other eligible addresses, but it can vary by address and carrier.' },
                        { q: 'Where can I find product and warranty details?', a: 'Each product page lists the model, specifications, price, availability, and written CairoVolt warranty terms. The warranty record is not a manufacturer authenticity certificate.' },
                        { q: 'What is the return policy?', a: 'You may request a return for an eligible product within 14 days of receipt. The published policy states the condition, inspection, shipping, and refund requirements.' },
                    ]).map((faq, idx) => (
                        <details
                            key={idx}
                            className="group p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                        >
                            <summary className="flex items-center justify-between cursor-pointer font-bold">
                                {faq.q}
                                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
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
                            ? 'أرسل استفسارك عبر واتساب وسيتابعه فريق خدمة العملاء'
                            : 'Send your enquiry on WhatsApp for follow-up by our customer-service team'}
                    </p>
                    <a
                        href="https://wa.me/201558245974"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsappClick('contact')}
                        className="inline-block px-8 py-3 bg-white text-green-600 font-bold rounded-full hover:bg-gray-100 transition-colors"
                    >
                        {isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                    </a>
                </div>
            </section>
        </div>
    );
}
