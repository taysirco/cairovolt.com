import { Metadata } from 'next';
import { Suspense } from 'react';

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

// The checkout page reads useSearchParams(), which needs a Suspense boundary to
// prerender. The route-level loading.tsx used to provide one implicitly; it was
// removed so content pages stream their main content inline instead of inside
// a hidden <div> (which non-JS crawlers drop).
export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div className="min-h-[60vh] animate-pulse" aria-busy="true" />}>
            {children}
        </Suspense>
    );
}
