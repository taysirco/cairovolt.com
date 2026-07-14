'use client';

import { useState } from 'react';

interface IndexResult {
    slug: string;
    url: string;
    success: boolean;
    error?: string;
}

/**
 * Admin page for manually triggering Google Indexing API
 * Accessible at /admin/indexing — protected by noindex robots meta
 * Use to force-reindex products after price/stock changes
 */
export default function AdminIndexingPage() {
    const [slug, setSlug] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [actionType, setActionType] = useState<'URL_UPDATED' | 'URL_DELETED'>('URL_UPDATED');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<IndexResult[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!slug.trim()) return;

        setLoading(true);
        const brandLower = (brand || 'anker').toLowerCase();
        const catSlug = category || 'power-banks';
        const url = `https://cairovolt.com/${brandLower}/${catSlug}/${slug.trim()}`;
        const urlEn = `https://cairovolt.com/en/${brandLower}/${catSlug}/${slug.trim()}`;

        try {
            // Ping AR version
            const res = await fetch('/api/indexing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, type: actionType, slug: slug.trim() }),
            });
            const data = await res.json();

            // Ping EN version
            const resEn = await fetch('/api/indexing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: urlEn, type: actionType, slug: slug.trim() }),
            });
            const dataEn = await resEn.json();

            setResults(prev => [
                { slug: slug.trim(), url, success: data.success, error: data.error },
                { slug: slug.trim(), url: urlEn, success: dataEn.success, error: dataEn.error },
                ...prev.slice(0, 18),
            ]);
        } catch (_err) {
            setResults(prev => [
                { slug: slug.trim(), url, success: false, error: 'Network error' },
                ...prev.slice(0, 18),
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Bulk ping all products from static data
    const handleBulkPing = async () => {
        setLoading(true);
        try {
            // Use the existing feed to get all product URLs
            const feedRes = await fetch('/api/feed');
            const feedXml = await feedRes.text();
            const urlMatches = feedXml.match(/https:\/\/cairovolt\.com\/[^\s<"]+/g) || [];
            const productUrls = [...new Set(urlMatches.filter(u => u.includes('/anker/') || u.includes('/joyroom/')))].slice(0, 20);

            const newResults: IndexResult[] = [];
            for (const productUrl of productUrls) {
                const res = await fetch('/api/indexing', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: productUrl, type: 'URL_UPDATED' }),
                });
                const data = await res.json();
                newResults.push({ slug: productUrl.split('/').pop() || '', url: productUrl, success: data.success, error: data.error });
                // Small delay to avoid rate limiting (200 requests/day limit)
                await new Promise(r => setTimeout(r, 500));
            }
            setResults(newResults);
        } catch (_err) {
            alert('Bulk ping failed. Check console.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6" dir="ltr">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-blue-400 mb-2">⚡ Google Indexing Control Panel</h1>
                    <p className="text-gray-400 text-sm">Force-reindex product pages instantly. Quota: 200 requests/day.</p>
                    <div className="mt-2 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded text-yellow-300 text-xs">
                        ⚠️ Requires INDEXING_WEBHOOK_SECRET env var. Ensure Google Search Console ownership is set up.
                    </div>
                </div>

                {/* Single Product Form */}
                <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
                    <h2 className="text-lg font-bold text-white mb-4">🎯 Single Product Ping</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Brand</label>
                            <select
                                value={brand}
                                onChange={e => setBrand(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                            >
                                <option value="anker">anker</option>
                                <option value="joyroom">joyroom</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Category Slug</label>
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm"
                            >
                                <option value="power-banks">power-banks</option>
                                <option value="wall-chargers">wall-chargers</option>
                                <option value="cables">cables</option>
                                <option value="car-chargers">car-chargers</option>
                                <option value="audio">audio</option>
                                <option value="smart-watches">smart-watches</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-400 mb-1">Product Slug</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={e => setSlug(e.target.value)}
                            placeholder="anker-737-power-bank"
                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white text-sm font-mono"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-400 mb-1">Action</label>
                        <div className="flex gap-3">
                            {(['URL_UPDATED', 'URL_DELETED'] as const).map(type => (
                                <label key={type} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="actionType"
                                        value={type}
                                        checked={actionType === type}
                                        onChange={() => setActionType(type)}
                                        className="accent-blue-500"
                                    />
                                    <span className={`text-sm ${type === 'URL_DELETED' ? 'text-red-400' : 'text-green-400'}`}>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading || !slug.trim()}
                            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg font-bold transition-colors"
                        >
                            {loading ? '⏳ Pinging...' : '🚀 Ping Google Now'}
                        </button>
                        <button
                            type="button"
                            onClick={handleBulkPing}
                            disabled={loading}
                            className="px-5 py-3 bg-purple-700 hover:bg-purple-600 disabled:opacity-50 rounded-lg font-bold transition-colors text-sm"
                        >
                            📦 Bulk Ping All
                        </button>
                    </div>
                </form>

                {/* Results */}
                {results.length > 0 && (
                    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                        <h2 className="text-lg font-bold mb-4">📋 Results ({results.length})</h2>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {results.map((r, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center gap-3 p-3 rounded-lg text-sm font-mono ${
                                        r.success ? 'bg-green-900/20 border border-green-700/30' : 'bg-red-900/20 border border-red-700/30'
                                    }`}
                                >
                                    <span>{r.success ? '✅' : '❌'}</span>
                                    <span className="text-gray-300 flex-1 truncate">{r.url}</span>
                                    {r.error && <span className="text-red-400 text-xs">{r.error}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
