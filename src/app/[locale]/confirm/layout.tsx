import { Metadata } from 'next';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';

    return {
        title: isAr ? 'تأكيد الطلب' : 'Order Confirmation',
        description: isAr
            ? 'تم استلام طلبك بنجاح — هنتواصل معاك لتأكيد التوصيل'
            : 'Your order has been confirmed',
        robots: {
            index: false,
            follow: false,
            googleBot: {
                index: false,
                follow: false,
            },
        },
    };
}

export default function ConfirmLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
