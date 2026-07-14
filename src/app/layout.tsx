import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://cairovolt.com'),
  title: 'CairoVolt',
  description: 'CairoVolt — Premium Mobile Accessories in Egypt',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

/**
 * Root layout — This is the ONLY layout that renders <html> and <body>.
 * Routes in [locale]/ and /admin/ are nested layouts
 * that render their own content INSIDE this shell.
 *
 * For [locale] routes: [locale]/layout.tsx adds i18n, header, footer, etc.
 *   (includes /verify, which was moved into [locale] for SEO)
 * For /admin routes: admin/layout.tsx adds the admin shell.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
