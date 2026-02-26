"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface OrderItem {
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface OrderData {
    orderId: string;
    customerName: string;
    phone: string;
    whatsapp: string;
    address: string;
    city: string;
    cityLabel: string;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    total: number;
    orderDate: string;
}

// Governorate labels
const GOVERNORATE_LABELS: Record<string, string> = {
    'cairo': 'القاهرة',
    'giza': 'الجيزة',
    'alexandria': 'الإسكندرية',
    'qalyubia': 'القليوبية',
    'dakahlia': 'الدقهلية',
    'sharqia': 'الشرقية',
    'gharbia': 'الغربية',
    'monufia': 'المنوفية',
    'beheira': 'البحيرة',
    'kafr-el-sheikh': 'كفر الشيخ',
    'damietta': 'دمياط',
    'port-said': 'بورسعيد',
    'ismailia': 'الإسماعيلية',
    'suez': 'السويس',
    'fayoum': 'الفيوم',
    'beni-suef': 'بني سويف',
    'minya': 'المنيا',
    'asyut': 'أسيوط',
    'sohag': 'سوهاج',
    'qena': 'قنا',
    'luxor': 'الأقصر',
    'aswan': 'أسوان',
    'red-sea': 'البحر الأحمر',
    'north-sinai': 'شمال سيناء',
    'south-sinai': 'جنوب سيناء',
    'matrouh': 'مطروح',
    'new-valley': 'الوادي الجديد',
};

function ConfirmContent() {
    const searchParams = useSearchParams();
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get order data from URL params or sessionStorage
        const orderParam = searchParams.get('order');

        if (orderParam) {
            try {
                const decoded = JSON.parse(decodeURIComponent(orderParam));
                setOrderData(decoded);
            } catch (e) {
                console.error('Failed to parse order data from URL');
            }
        } else {
            // Try sessionStorage
            try {
                const stored = sessionStorage.getItem('lastOrder');
                if (stored) {
                    setOrderData(JSON.parse(stored));
                }
            } catch (e) {
                console.error('Failed to read order data from sessionStorage');
            }
        }
        setLoading(false);
    }, [searchParams]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="animate-pulse">جاري التحميل...</div>
            </div>
        );
    }

    if (!orderData) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="bg-yellow-50 p-8 rounded-2xl max-w-md mx-auto">
                    <div className="text-5xl mb-4">⚠</div>
                    <h1 className="text-2xl font-bold text-yellow-700 mb-2">لا يوجد طلب</h1>
                    <p className="text-gray-600">لم يتم العثور على بيانات الطلب.</p>
                    <Link
                        href="/"
                        className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        العودة للتسوق
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <head>
                <meta name="robots" content="noindex,nofollow" />
            </head>
            <div className="container mx-auto px-4 py-8 max-w-3xl" dir="rtl">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-green-700 mb-2">تم تأكيد طلبك بنجاح! </h1>
                    <p className="text-gray-600">شكراً لك على ثقتك في كايرو فولت</p>
                </div>

                {/* Order ID and Date */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl mb-6 shadow-lg">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div>
                            <p className="text-blue-100 text-sm">رقم الطلب</p>
                            <p className="text-2xl font-bold font-mono">{orderData.orderId}</p>
                        </div>
                        <div className="text-left">
                            <p className="text-blue-100 text-sm">تاريخ الطلب</p>
                            <p className="font-bold">{orderData.orderDate}</p>
                        </div>
                    </div>
                </div>

                {/* Order Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Customer Info */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-sm">
                        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-2xl">👤</span> بيانات العميل
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                                <span className="text-gray-500">الاسم</span>
                                <span className="font-medium">{orderData.customerName}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                                <span className="text-gray-500">الهاتف</span>
                                <span className="font-medium font-mono" dir="ltr">{orderData.phone}</span>
                            </div>
                            {orderData.whatsapp && orderData.whatsapp !== orderData.phone && (
                                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                                    <span className="text-gray-500">واتساب</span>
                                    <span className="font-medium font-mono" dir="ltr">{orderData.whatsapp}</span>
                                </div>
                            )}
                            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                                <span className="text-gray-500">المحافظة</span>
                                <span className="font-medium">{orderData.cityLabel}</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-sm">
                        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <SvgIcon name="pin" className="w-6 h-6 inline-block" /> عنوان التوصيل
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{orderData.address}</p>
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                <SvgIcon name="truck" className="w-4 h-4 inline-block" /> سيتم التوصيل خلال 2-5 أيام عمل
                            </p>
                        </div>
                    </div>
                </div>

                {/* Products Invoice */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-sm mb-6">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <SvgIcon name="cart" className="w-6 h-6 inline-block" /> تفاصيل الفاتورة
                    </h2>

                    {/* Products List */}
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {orderData.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between py-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100 dark:border-gray-700">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-1"
                                                sizes="64px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <SvgIcon name="package" className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm sm:text-base line-clamp-2">{item.name}</p>
                                        <p className="text-sm text-gray-500 mt-1">الكمية: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="text-left flex-shrink-0 ms-2">
                                    <p className="font-bold text-sm sm:text-base">{(item.price * item.quantity).toLocaleString()} جنيه</p>
                                    {item.quantity > 1 && (
                                        <p className="text-xs text-gray-500">{item.price.toLocaleString()} × {item.quantity}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="mt-4 pt-4 border-t-2 border-gray-200 dark:border-gray-700 space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>المجموع الفرعي</span>
                            <span>{orderData.subtotal.toLocaleString()} جنيه</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>الشحن</span>
                            <span className={orderData.shipping === 0 ? 'text-green-600 font-medium' : ''}>
                                {orderData.shipping === 0 ? <>مجاني <SvgIcon name="gift" className="w-4 h-4 inline-block" /></> : `${orderData.shipping} جنيه`}
                            </span>
                        </div>
                        <div className="flex justify-between text-xl font-bold pt-2 border-t">
                            <span>الإجمالي</span>
                            <span className="text-green-600">{orderData.total.toLocaleString()} جنيه</span>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl mb-6 border border-green-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <SvgIcon name="money" className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="font-bold text-green-800 dark:text-green-400">الدفع عند الاستلام</h3>
                            <p className="text-sm text-green-600 dark:text-green-500">ادفع {orderData.total.toLocaleString()} جنيه عند استلام الطلب</p>
                        </div>
                    </div>
                </div>

                {/* What's Next */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border shadow-sm mb-6">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <SvgIcon name="clipboard" className="w-6 h-6 inline-block" /> الخطوات القادمة
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold text-sm">1</span>
                            </div>
                            <div>
                                <p className="font-medium">سنتواصل معك قريباً</p>
                                <p className="text-sm text-gray-500">للتأكد من بيانات الطلب والعنوان</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600 font-bold text-sm">2</span>
                            </div>
                            <div>
                                <p className="font-medium">تجهيز الطلب</p>
                                <p className="text-sm text-gray-500">سيتم تجهيز طلبك وشحنه خلال 24 ساعة</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-green-600 font-bold text-sm">3</span>
                            </div>
                            <div>
                                <p className="font-medium">استلام الطلب والدفع</p>
                                <p className="text-sm text-gray-500">الدفع عند الاستلام نقداً للمندوب</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-center"
                    >
                        متابعة التسوق
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="px-8 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-colors"
                    >
                        <SvgIcon name="printer" className="w-5 h-5 inline-block" /> طباعة الفاتورة
                    </button>
                </div>

                {/* WhatsApp Support */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm mb-2">هل لديك استفسار؟</p>
                    <a
                        href={`https://wa.me/201063374834?text=استفسار عن الطلب رقم ${orderData.orderId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                    >
                        <SvgIcon name="chat" className="w-5 h-5 inline-block" /> تواصل معنا عبر واتساب
                    </a>
                </div>
            </div>
        </>
    );
}

export default function ConfirmPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="animate-pulse">جاري التحميل...</div>
            </div>
        }>
            <ConfirmContent />
        </Suspense>
    );
}
