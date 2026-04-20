'use client';

import { useState, useCallback } from 'react';
import { trackShare } from '@/lib/analytics';

interface ShareButtonsProps {
    slug: string;
    productName: string;
    price?: number;
    locale?: string;
    /** Compact mode for confirm page */
    compact?: boolean;
}

type ShareMethod = 'whatsapp' | 'facebook' | 'twitter' | 'copy_link' | 'native';

/** Build the short share URL using internal /go/ shortener */
function getShareUrl(slug: string): string {
    return `https://cairovolt.com/go/${slug}`;
}

/** Build WhatsApp share text */
function getWhatsAppText(productName: string, price: number | undefined, url: string, isArabic: boolean): string {
    if (isArabic) {
        const priceText = price ? ` بسعر ${price} جنيه فقط! 🔥` : '';
        return `شوف المنتج ده${priceText}\n${productName}\n${url}`;
    }
    const priceText = price ? ` for only ${price} EGP! 🔥` : '';
    return `Check this out${priceText}\n${productName}\n${url}`;
}

/** Build Twitter/X share text */
function getTwitterText(productName: string, isArabic: boolean): string {
    return isArabic
        ? `${productName} - أوريجينال ومتوفر على CairoVolt 🇪🇬`
        : `${productName} - Original & available on CairoVolt 🇪🇬`;
}

export default function ShareButtons({ slug, productName, price, locale = 'ar', compact = false }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const isArabic = locale === 'ar';
    const shareUrl = getShareUrl(slug);

    const handleShare = useCallback((method: ShareMethod) => {
        // Fire GA4 share event
        trackShare(method, slug, productName);

        switch (method) {
            case 'copy_link': {
                navigator.clipboard?.writeText(shareUrl).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }).catch(() => {
                    // Fallback for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = shareUrl;
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = '0';
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                });
                break;
            }
            case 'whatsapp': {
                const text = getWhatsAppText(productName, price, shareUrl, isArabic);
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
                break;
            }
            case 'facebook': {
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    '_blank',
                    'noopener,width=600,height=400'
                );
                break;
            }
            case 'twitter': {
                const text = getTwitterText(productName, isArabic);
                window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`,
                    '_blank',
                    'noopener,width=600,height=400'
                );
                break;
            }
            case 'native': {
                if (navigator.share) {
                    navigator.share({
                        title: productName,
                        text: isArabic
                            ? `${productName} - متوفر على CairoVolt`
                            : `${productName} - Available on CairoVolt`,
                        url: shareUrl,
                    }).catch(() => { /* user cancelled */ });
                }
                break;
            }
        }
    }, [slug, productName, price, shareUrl, isArabic]);

    const supportsNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

    const btnBase = compact
        ? 'inline-flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110 active:scale-95'
        : 'inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95';

    return (
        <div className={`flex items-center gap-2 ${compact ? '' : 'flex-wrap'}`} dir={isArabic ? 'rtl' : 'ltr'}>
            {!compact && (
                <span className="text-xs text-gray-400 font-medium">
                    {isArabic ? 'شارك:' : 'Share:'}
                </span>
            )}

            {/* Copy Link */}
            <button
                id="share-copy-link"
                onClick={() => handleShare('copy_link')}
                className={`${btnBase} ${copied
                    ? 'bg-green-100 dark:bg-green-900/40 text-green-600'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                title={copied ? (isArabic ? 'تم النسخ!' : 'Copied!') : (isArabic ? 'نسخ الرابط' : 'Copy Link')}
                aria-label={isArabic ? 'نسخ رابط المنتج' : 'Copy product link'}
            >
                {copied ? (
                    /* Checkmark icon */
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                ) : (
                    /* Link icon */
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                )}
                {!compact && (
                    <span>{copied ? (isArabic ? 'تم!' : 'Copied!') : (isArabic ? 'نسخ' : 'Copy')}</span>
                )}
            </button>

            {/* WhatsApp */}
            <button
                id="share-whatsapp"
                onClick={() => handleShare('whatsapp')}
                className={`${btnBase} bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20`}
                title={isArabic ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
                aria-label={isArabic ? 'مشاركة عبر واتساب' : 'Share on WhatsApp'}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {!compact && <span>{isArabic ? 'واتساب' : 'WhatsApp'}</span>}
            </button>

            {/* Facebook */}
            <button
                id="share-facebook"
                onClick={() => handleShare('facebook')}
                className={`${btnBase} bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20`}
                title={isArabic ? 'مشاركة على فيسبوك' : 'Share on Facebook'}
                aria-label={isArabic ? 'مشاركة على فيسبوك' : 'Share on Facebook'}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                {!compact && <span>{isArabic ? 'فيسبوك' : 'Facebook'}</span>}
            </button>

            {/* Twitter / X */}
            <button
                id="share-twitter"
                onClick={() => handleShare('twitter')}
                className={`${btnBase} bg-black/5 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:bg-black/10 dark:hover:bg-white/20`}
                title={isArabic ? 'مشاركة على X' : 'Share on X'}
                aria-label={isArabic ? 'مشاركة على X' : 'Share on X'}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                {!compact && <span>X</span>}
            </button>

            {/* Native Share (mobile only) */}
            {supportsNativeShare && (
                <button
                    id="share-native"
                    onClick={() => handleShare('native')}
                    className={`${btnBase} bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50`}
                    title={isArabic ? 'مشاركة' : 'Share'}
                    aria-label={isArabic ? 'مشاركة عبر التطبيقات' : 'Share via apps'}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                    {!compact && <span>{isArabic ? 'مشاركة' : 'Share'}</span>}
                </button>
            )}
        </div>
    );
}
