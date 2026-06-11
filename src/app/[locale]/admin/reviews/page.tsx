'use client';

import { useState, useEffect } from 'react';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface ReviewRequest {
    id: string;
    rowNumber: number;
    customerName: string;
    customerPhone: string;
    productName?: string;
    sheetProductName?: string;
    reviewUrl?: string;
    whatsappLink?: string;
    status: string;
    reason?: string;
    createdAt: string;
}

const ADMIN_KEY_STORAGE = 'cv_admin_key';

function getAdminKey(): string {
    if (typeof window === 'undefined') return '';
    let key = localStorage.getItem(ADMIN_KEY_STORAGE) || '';
    if (!key) {
        key = window.prompt('أدخل مفتاح الأدمن (ADMIN_TASKS_SECRET):')?.trim() || '';
        if (key) localStorage.setItem(ADMIN_KEY_STORAGE, key);
    }
    return key;
}

export default function ReviewsDashboard() {
    const [requests, setRequests] = useState<ReviewRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [syncResults, setSyncResults] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const authHeaders = (): Record<string, string> => ({
        'Authorization': `Bearer ${getAdminKey()}`,
        'Content-Type': 'application/json',
    });

    const handleAuthFailure = () => {
        localStorage.removeItem(ADMIN_KEY_STORAGE);
        setError('المفتاح غير صحيح — حدّث الصفحة وأدخله من جديد');
    };

    // Fetch existing review requests
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/reviews/sync', { method: 'POST', headers: authHeaders() });
            if (response.status === 401) { handleAuthFailure(); return; }
            const data = await response.json();
            if (data.success) {
                setRequests(data.requests || []);
            } else {
                setError(data.error);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Sync new orders from Google Sheets
    const syncFromSheets = async () => {
        setSyncing(true);
        setSyncResults(null);
        setError(null);
        try {
            const response = await fetch('/api/reviews/sync', { headers: authHeaders() });
            if (response.status === 401) { handleAuthFailure(); return; }
            const data = await response.json();
            setSyncResults(data);
            if (data.success) {
                // Refresh the list
                await fetchRequests();
            } else {
                setError(data.error);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSyncing(false);
        }
    };

    // Mark a request as sent (after opening WhatsApp) or dismissed
    const updateStatus = async (id: string, status: 'sent' | 'dismissed') => {
        try {
            const response = await fetch('/api/reviews/sync', {
                method: 'PATCH',
                headers: authHeaders(),
                body: JSON.stringify({ id, status }),
            });
            if (response.status === 401) { handleAuthFailure(); return; }
            const data = await response.json();
            if (data.success) {
                setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
            } else {
                setError(data.error);
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8" dir="rtl">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <SvgIcon name="chart" className="w-6 h-6" />
                                لوحة تحكم التقييمات
                            </h1>
                            <p className="text-gray-500 mt-1">
                                مزامنة طلبات التقييم من Google Sheets
                            </p>
                        </div>
                        <button
                            onClick={syncFromSheets}
                            disabled={syncing}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-all flex items-center gap-2"
                        >
                            {syncing ? (
                                <>
                                    <SvgIcon name="arrows-rotate" className="w-5 h-5 animate-spin" />
                                    جاري المزامنة...
                                </>
                            ) : (
                                <>
                                    <SvgIcon name="arrows-rotate" className="w-5 h-5" />
                                    مزامنة الطلبات الجديدة
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                        <SvgIcon name="x-circle" className="w-5 h-5 inline-block" /> {error}
                    </div>
                )}

                {/* Sync Results */}
                {syncResults && (
                    <div className={`border px-4 py-3 rounded-xl mb-6 ${syncResults.success
                        ? 'bg-green-100 border-green-200 text-green-700'
                        : 'bg-yellow-100 border-yellow-200 text-yellow-700'
                        }`}>
                        {syncResults.success ? (
                            <>
                                <SvgIcon name="check-circle" className="w-5 h-5 inline-block" /> تم معالجة {syncResults.processed} طلب جديد
                                {syncResults.results?.map((r: any, i: number) => (
                                    <div key={i} className="mt-2 text-sm">
                                        صف {r.rowNumber}: {r.customerName} - {r.productName}
                                        {r.status === 'created' && (
                                            <a
                                                href={r.whatsappLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mr-2 text-green-600 underline"
                                            >
                                                <SvgIcon name="phone" className="w-4 h-4 inline-block" /> إرسال عبر واتساب
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <><SvgIcon name="shield" className="w-5 h-5 inline-block" /> {syncResults.error}</>
                        )}
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
                        <div className="text-3xl font-bold text-blue-600">{requests.length}</div>
                        <div className="text-gray-500 text-sm">إجمالي الطلبات</div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
                        <div className="text-3xl font-bold text-yellow-600">
                            {requests.filter(r => r.status === 'pending').length}
                        </div>
                        <div className="text-gray-500 text-sm">جاهزة للإرسال</div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
                        <div className="text-3xl font-bold text-green-600">
                            {requests.filter(r => r.status === 'sent' || r.status === 'completed').length}
                        </div>
                        <div className="text-gray-500 text-sm">تم الإرسال</div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
                        <div className="text-3xl font-bold text-red-600">
                            {requests.filter(r => r.status === 'unmatched').length}
                        </div>
                        <div className="text-gray-500 text-sm">تحتاج مطابقة يدوية</div>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                        <h2 className="font-bold text-lg">طلبات التقييم</h2>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-500">
                            <SvgIcon name="arrows-rotate" className="w-6 h-6 animate-spin mx-auto" />
                            <p className="mt-2">جاري التحميل...</p>
                        </div>
                    ) : requests.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <SvgIcon name="mail" className="w-10 h-10 mx-auto" />
                            <p className="mt-2">لا توجد طلبات تقييم بعد</p>
                            <p className="text-sm">اضغط "مزامنة الطلبات الجديدة" لجلب الطلبات من Google Sheets</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">المنتج</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجراءات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {requests.map((request) => (
                                        <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                            <td className="px-4 py-3">
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {request.customerName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {request.customerPhone}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                                {request.productName || request.sheetProductName}
                                                {request.status === 'unmatched' && (
                                                    <div className="text-xs text-red-500 mt-1">
                                                        {request.reason === 'invalid-phone' ? 'رقم واتساب غير صالح' : 'لم يُطابق منتجاً في الكتالوج'}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 text-xs rounded-full ${{
                                                    completed: 'bg-green-100 text-green-700',
                                                    sent: 'bg-green-100 text-green-700',
                                                    pending: 'bg-yellow-100 text-yellow-700',
                                                    unmatched: 'bg-red-100 text-red-700',
                                                    dismissed: 'bg-gray-200 text-gray-600',
                                                }[request.status] || 'bg-yellow-100 text-yellow-700'}`}>
                                                    {{
                                                        completed: 'تم التقييم',
                                                        sent: 'تم الإرسال',
                                                        pending: 'جاهزة للإرسال',
                                                        unmatched: 'مطابقة يدوية',
                                                        dismissed: 'مُتجاهَلة',
                                                    }[request.status] || request.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">
                                                {request.createdAt
                                                    ? new Date(request.createdAt).toLocaleDateString('ar-EG')
                                                    : '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2 flex-wrap">
                                                    {request.whatsappLink && (
                                                        <a
                                                            href={request.whatsappLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                                                        >
                                                            <SvgIcon name="phone" className="w-4 h-4 inline-block" /> واتساب
                                                        </a>
                                                    )}
                                                    {request.status === 'pending' && (
                                                        <button
                                                            onClick={() => updateStatus(request.id, 'sent')}
                                                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                                                        >
                                                            ✓ تم الإرسال
                                                        </button>
                                                    )}
                                                    {(request.status === 'pending' || request.status === 'unmatched') && (
                                                        <button
                                                            onClick={() => updateStatus(request.id, 'dismissed')}
                                                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg transition-colors"
                                                        >
                                                            تجاهل
                                                        </button>
                                                    )}
                                                    {request.reviewUrl && (
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(request.reviewUrl!)}
                                                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg transition-colors"
                                                        >
                                                            <SvgIcon name="clipboard" className="w-4 h-4 inline-block" /> نسخ
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">
                        <SvgIcon name="clipboard" className="w-5 h-5 inline-block" /> كيفية الاستخدام
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-blue-700 dark:text-blue-400 text-sm">
                        <li>غيّر حالة الطلب في Google Sheets إلى <strong>"تم التوصيل"</strong></li>
                        <li>المزامنة تعمل تلقائياً كل يوم (أو اضغط <strong>"مزامنة الطلبات الجديدة"</strong> يدوياً) — تُعالَج الطلبات بعد 6 أيام من تاريخ الطلب وحتى 45 يوماً</li>
                        <li>اضغط <strong>"واتساب"</strong> لفتح الرسالة الجاهزة وإرسالها، ثم اضغط <strong>"✓ تم الإرسال"</strong></li>
                        <li>الطلبات في قسم <strong>"مطابقة يدوية"</strong> اسم منتجها في الشيت لم يطابق الكتالوج — راسل العميل يدوياً أو تجاهلها</li>
                        <li>العميل يرى كود شكر (<strong>{'SHOKRAN10'}</strong>) بعد إرسال أي تقييم — إيجابي أو سلبي — لا تَعِد به مقابل تقييم إيجابي أبداً</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
