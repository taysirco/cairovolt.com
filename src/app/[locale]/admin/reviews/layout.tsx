import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin - Reviews | CairoVolt',
    description: 'Review administration panel',
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
            noarchive: true,
            nosnippet: true,
        },
    },
};

export default function AdminReviewsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
