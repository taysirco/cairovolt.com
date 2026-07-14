import Link from 'next/link';

export default function RootNotFound() {
    return (
        <html lang="ar" dir="rtl">
            <body className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-sans">
                <div className="text-center p-8 max-w-md mx-auto">
                    <h1 className="text-6xl font-black text-blue-600 mb-4">404</h1>
                    <h2 className="text-2xl font-bold mb-4">الصفحة غير موجودة</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        الصفحة التي تبحث عنها قد تكون نُقلت أو حُذفت أو لا يمكن الوصول إليها.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        ← العودة للرئيسية
                    </Link>
                </div>
            </body>
        </html>
    );
}
