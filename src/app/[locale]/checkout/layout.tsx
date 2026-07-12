import { Metadata } from 'next';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';

    return {
        title: isAr ? 'إتمام الطلب' : 'Checkout',
        description: isAr
            ? 'أكمل طلبك — الدفع عند الاستلام متاح لكل محافظات مصر'
            : 'Complete your order - Cash on Delivery available',
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

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
