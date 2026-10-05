// Server Component — recall disclosure for blog articles.
// DO NOT add 'use client' here (it reads the full catalogue).

import Link from 'next/link';
import { getProductBySlug } from '@/lib/static-products';
import {
    RECALL_AFFECTED_PRODUCT_SLUGS,
    RECALL_STOCK_VERIFIED_OUTSIDE_SCOPE,
    getMerchantProductUrl,
    isRecallStockVerifiedOutsideScope,
} from '@/lib/merchant-product-data';

/**
 * WHY THIS EXISTS
 * Recall findings live on the product pages (src/data/details/<slug>.ts), but
 * 28 live guides recommended or discussed the recalled A1263 / A1681 without a
 * word about it. A reader who acts on a guide never sees the PDP banner, so the
 * guide itself has to say it — scoped and sourced, directly under the quick
 * answer, never buried.
 *
 * Copy sources:
 *  - A1263: src/data/details/anker-powercore-10000.ts (US CPSC June 2025 recall
 *    of US-market units made Jan 2016 – Oct 2019; serial check at
 *    anker.com/a1263-recall).
 *  - A1681: anker.com/rc2506 (Anker's global voluntary power-bank recall; the
 *    page lists model A1681 and tells owners to verify the serial and, if
 *    affected, stop using the unit) + RECALL_STOCK_VERIFIED_OUTSIDE_SCOPE (the
 *    owner's dated serial check of CairoVolt stock).
 */

const A1263_SLUG = 'anker-powercore-10000';
const A1681_SLUG = 'anker-zolo-a1681-20000';

/**
 * Model mentions that map to a recall-affected catalogue slug. A body link to the
 * model's product page counts too: a guide that links the PDP without naming the
 * model still sends readers to a recalled product.
 */
const TEXT_PATTERNS: Array<{ re: RegExp; slug: string }> = [
    { re: /A1263|PowerCore\s*10000|باور ?كور 10000|\/anker-powercore-10000(?![a-z0-9.-])/i, slug: A1263_SLUG },
    { re: /A1681|\/anker-zolo-a1681-20000(?![a-z0-9.-])/, slug: A1681_SLUG },
];

/**
 * Recall-affected slugs an article touches: its curated relatedProducts that are
 * in RECALL_AFFECTED_PRODUCT_SLUGS, plus model mentions anywhere in the supplied
 * text (content, quick answer, FAQ). Order is stable (A1263, A1681).
 */
export function getArticleRecallSlugs(relatedProducts: readonly string[], texts: readonly (string | undefined)[]): string[] {
    const found = new Set<string>();
    for (const slug of relatedProducts) {
        if (RECALL_AFFECTED_PRODUCT_SLUGS.has(slug)) found.add(slug);
    }
    const haystack = texts.filter((t): t is string => typeof t === 'string' && t.length > 0).join('\n');
    for (const { re, slug } of TEXT_PATTERNS) {
        if (re.test(haystack)) found.add(slug);
    }
    return [A1263_SLUG, A1681_SLUG].filter(slug => found.has(slug));
}

function productPath(slug: string, locale: string): string | null {
    const product = getProductBySlug(slug);
    if (!product || product.status !== 'active') return null;
    return getMerchantProductUrl(product, locale).replace(/^https:\/\/cairovolt\.com/, '') || null;
}

function ExternalRecallLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
            dir="ltr"
        >
            {label}
        </a>
    );
}

interface RecallNoticeProps {
    /** Output of getArticleRecallSlugs(). Renders nothing when empty. */
    slugs: readonly string[];
    locale: string;
}

export function RecallNotice({ slugs, locale }: RecallNoticeProps) {
    const isArabic = locale === 'ar';
    const items = slugs.filter(slug => slug === A1263_SLUG || slug === A1681_SLUG);
    if (items.length === 0) return null;

    const pdpLabel = isArabic ? 'تفاصيل الاستدعاء في صفحة المنتج' : 'Recall details on the product page';

    return (
        <div className="mb-6 space-y-3" data-recall-notice="true">
            {items.map(slug => {
                const pdp = productPath(slug, locale);

                if (slug === A1263_SLUG) {
                    return (
                        <div
                            key={slug}
                            role="note"
                            className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm leading-7 text-red-900 dark:border-red-800 dark:bg-red-950/40 dark:text-red-100"
                        >
                            <p className="font-bold">
                                {isArabic
                                    ? '⚠️ تنبيه استدعاء: انكر PowerCore 10000 (موديل A1263)'
                                    : '⚠️ Recall notice: Anker PowerCore 10000 (model A1263)'}
                            </p>
                            <p className="mt-1">
                                {isArabic ? (
                                    <>
                                        في يونيو 2025 أعلنت هيئة سلامة المنتجات الأمريكية (CPSC) استدعاء وحدات A1263 المصنّعة للسوق الأمريكي بين يناير 2016 وأكتوبر 2019 بسبب خطر السخونة والحريق. لو عندك A1263، تحقّق من الرقم التسلسلي على{' '}
                                        <ExternalRecallLink href="https://www.anker.com/a1263-recall" label="anker.com/a1263-recall" />{' '}
                                        قبل استخدامه.
                                    </>
                                ) : (
                                    <>
                                        In June 2025 the US CPSC announced a recall of A1263 units made for the US market between January 2016 and October 2019 over an overheating and fire hazard. If you own an A1263, check its serial at{' '}
                                        <ExternalRecallLink href="https://www.anker.com/a1263-recall" label="anker.com/a1263-recall" />{' '}
                                        before using it.
                                    </>
                                )}
                            </p>
                            {pdp && (
                                <p className="mt-1">
                                    <Link href={pdp} className="font-semibold underline">{pdpLabel}</Link>
                                </p>
                            )}
                        </div>
                    );
                }

                // A1681 — model listed in Anker's rc2506 programme.
                const verified = isRecallStockVerifiedOutsideScope(slug);
                const checkedOn = verified ? RECALL_STOCK_VERIFIED_OUTSIDE_SCOPE[slug]?.checkedOn : undefined;
                return (
                    <div
                        key={slug}
                        role="note"
                        className={verified
                            ? 'rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-7 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100'
                            : 'rounded-xl border border-red-300 bg-red-50 p-4 text-sm leading-7 text-red-900 dark:border-red-800 dark:bg-red-950/40 dark:text-red-100'}
                    >
                        <p className="font-bold">
                            {isArabic
                                ? '⚠️ تنبيه استدعاء: باور بانك انكر زولو 20K (موديل A1681)'
                                : '⚠️ Recall notice: Anker Zolo Power Bank 20K (model A1681)'}
                        </p>
                        <p className="mt-1">
                            {verified && checkedOn ? (
                                isArabic ? (
                                    <>
                                        الموديل A1681 مُدرج في برنامج الاستدعاء العالمي لبعض باور بانك انكر (
                                        <ExternalRecallLink href="https://www.anker.com/rc2506" label="anker.com/rc2506" />
                                        ). فحصت كايرو فولت الأرقام التسلسلية لمخزونها بتاريخ {checkedOn} ووجدتها خارج النطاق المتأثر — تحقّق من سيريال وحدتك عند الاستلام.
                                    </>
                                ) : (
                                    <>
                                        Model A1681 appears in Anker&apos;s global power-bank recall (
                                        <ExternalRecallLink href="https://www.anker.com/rc2506" label="anker.com/rc2506" />
                                        ). CairoVolt serial-checked its stock outside the affected range on {checkedOn} — check your unit&apos;s serial on arrival.
                                    </>
                                )
                            ) : (
                                isArabic ? (
                                    <>
                                        الموديل A1681 مُدرج في برنامج الاستدعاء العالمي لبعض باور بانك انكر. تحقّق من السيريال على{' '}
                                        <ExternalRecallLink href="https://www.anker.com/rc2506" label="anker.com/rc2506" />
                                        ؛ ولو كانت وحدتك ضمن النطاق المتأثر، أوقف استخدامها واتبع إجراءات انكر.
                                    </>
                                ) : (
                                    <>
                                        Model A1681 appears in Anker&apos;s global power-bank recall: check your serial at{' '}
                                        <ExternalRecallLink href="https://www.anker.com/rc2506" label="anker.com/rc2506" />
                                        ; if affected, stop using it and follow Anker&apos;s remedy.
                                    </>
                                )
                            )}
                        </p>
                        {pdp && (
                            <p className="mt-1">
                                <Link href={pdp} className="font-semibold underline">{pdpLabel}</Link>
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default RecallNotice;
