import { Metadata } from 'next';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';

    return {
        title: isAr ? 'اكتب تقييمك' : 'Write Review',
        description: isAr ? 'شارك رأيك في المنتج' : 'Share your product review',
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

export default function ReviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
