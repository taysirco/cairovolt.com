import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CairoVolt — لوحة إعداد الشحنات',
    description: 'لوحة تحكم داخلية لتوليد سيريالات وكروت QR للشحنات',
    robots: { index: false, follow: false },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl">
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Outfit:wght@400;600;700&display=swap"
                />
            </head>
            <body style={{
                margin: 0,
                padding: 0,
                fontFamily: "'Cairo', 'Outfit', system-ui, sans-serif",
                backgroundColor: '#09090b',
                color: '#fafafa',
                minHeight: '100vh',
                WebkitFontSmoothing: 'antialiased',
            }}>
                {children}
            </body>
        </html>
    );
}
