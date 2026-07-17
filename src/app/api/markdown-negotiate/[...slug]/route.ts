import { NextRequest, NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import { KNOWN_TOP_SEGMENTS, LEGACY_PRODUCT_REDIRECTS } from '@/lib/known-routes';
import { BLOG_SCHEDULE } from '@/data/blog-schedule.generated';
import { categoryContent } from '@/data/category-content';
import { getBlogArticleBySlug, getLiveIndex } from '@/data/blog-index';
import type { BlogArticle } from '@/data/blog/_types';
import {
    localizeArabicBrandContent,
    localizeArabicBrandHtml,
    localizeArabicBrandNames,
} from '@/lib/arabic-brand-names';
// Same translation source the HTML policy pages render via next-intl —
// the markdown surface reuses the identical published copy, never new claims.
import enMessages from '../../../../../messages/en.json';
import arMessages from '../../../../../messages/ar.json';

/**
 * Markdown Content Negotiation Handler
 * /api/markdown-negotiate/[...slug]/route.ts
 *
 * When the middleware detects Accept: text/markdown, it rewrites
 * the request here. This handler serves markdown representations
 * of CairoVolt pages to AI agents.
 *
 * Strategy:
 * - Homepage → serves llms.txt (our curated markdown representation)
 * - Product pages → generate markdown from product data
 * - Other pages → return a minimal markdown summary
 *
 * IMPORTANT — status parity with the HTML surface: the middleware rewrite
 * happens BEFORE its canonicalization/404 gates, so this handler replays
 * the SAME gates (same order, same truth sources — src/middleware.ts /
 * src/lib/known-routes.ts). A URL that 301s or 404s for an HTML client
 * must 301/404 identically for a markdown client; anything else is
 * cloaking-adjacent differential content.
 *
 * Standard: https://accept.md / Cloudflare Markdown-for-Agents
 */

export const revalidate = 3600;

const BASE_URL = 'https://cairovolt.com';

// Product route trees: /[brand]/[category]/[slug] (closed, validated space).
const PRODUCT_BRANDS = new Set(['anker', 'joyroom', 'soundcore']);

// Single-segment collection landing pages (brand hubs + generic categories).
const COLLECTION_ROOTS = new Set([
    'anker',
    'joyroom',
    'soundcore',
    'power-banks',
    'chargers',
    'cables',
    'earbuds',
]);

// Mirrors the middleware's NOT_FOUND_HTML response (status, noindex,
// short cache) in markdown form for the negotiated surface.
function markdownNotFound(path: string): NextResponse {
    const md = `# 404 — Page Not Found

There is no page at cairovolt.com/${path}.

- [CairoVolt Homepage](${BASE_URL})
- [Full Product Catalog (Markdown)](${BASE_URL}/api/llms/catalog)
- [AI Instructions](${BASE_URL}/.well-known/llms.txt)
`;
    return new NextResponse(md, {
        status: 404,
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'X-Robots-Tag': 'noindex',
            'Cache-Control': 'public, max-age=300',
        },
    });
}

// Permanent redirect to the SAME canonical destination the HTML middleware
// uses. A markdown client re-requests the canonical URL with its original
// Accept header and receives the canonical page's markdown.
function markdownRedirect(targetPath: string): NextResponse {
    return NextResponse.redirect(`${BASE_URL}${targetPath}`, 301);
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const { slug } = await params;
    const path = slug.join('/');
    const baseUrl = BASE_URL;
    const isHome = path === 'index' || path === '';

    // Homepage → serve llms.txt (our comprehensive markdown representation).
    // Call the route handler DIRECTLY — an HTTP self-fetch here once pinned a
    // stale CDN copy of the old llms.txt into the data cache and re-published
    // removed claims to AI agents. In-process = always the deployed content.
    if (isHome) {
        try {
            const { GET: llmsGet } = await import('@/app/.well-known/llms.txt/route');
            const llmsContent = await llmsGet().text();
            return new NextResponse(llmsContent, {
                headers: {
                    'Content-Type': 'text/markdown; charset=utf-8',
                    'Vary': 'Accept',
                    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
                    'X-Content-Source': 'llms.txt',
                },
            });
        } catch {
            // Fall through to generic handler
        }
    }

    // ── Replay the HTML middleware gates (same order — src/middleware.ts) ──
    // The markdown rewrite fires before those gates run, so they are applied
    // here to keep status codes identical across the two surfaces.
    const pathname = `/${path}`;
    if (!isHome) {
        // Broken / malformed URLs → home.
        if (pathname === '/$' || pathname === '/&') {
            return markdownRedirect('/');
        }

        // Canonicalize the optional Arabic prefix with a permanent redirect.
        if (slug[0] === 'ar') {
            return markdownRedirect(slug.length === 1 ? '/' : `/${slug.slice(1).join('/')}`);
        }

        // Strict lowercase enforcement.
        if (pathname !== pathname.toLowerCase()) {
            return markdownRedirect(pathname.toLowerCase());
        }

        // Soundcore audio products use the dedicated /soundcore route tree.
        const soundcoreMigration = pathname.match(
            /^(\/en)?\/anker\/(audio|speakers)(\/.*)?$/
        );
        if (soundcoreMigration) {
            const [, migrationLocale, migrationCategory, rest] = soundcoreMigration;
            return markdownRedirect(`${migrationLocale || ''}/soundcore/${migrationCategory}${rest || ''}`);
        }

        // Retired product slug 301s — same map and regex as the middleware.
        const legacyProduct = pathname.match(
            /^(\/en)?\/(?:anker|joyroom|soundcore)(?:\/[a-z0-9-]+)?\/([a-z0-9-]+)\/?$/
        );
        if (legacyProduct) {
            const target = LEGACY_PRODUCT_REDIRECTS[legacyProduct[2]];
            if (target) {
                return markdownRedirect(`${legacyProduct[1] || ''}${target}`);
            }
        }
    }

    const routeSegments = slug[0] === 'en' || slug[0] === 'ar' ? slug.slice(1) : slug;
    const localePrefix = slug[0] === 'en' ? '/en' : '';

    if (!isHome) {
        // Real 404 for unknown top-level segments — same allowlist as the HTML gate.
        const firstSegment = routeSegments[0];
        if (firstSegment && !KNOWN_TOP_SEGMENTS.has(firstSegment)) {
            return markdownNotFound(path);
        }

        // Blog scheduling gate — 404 for unknown OR not-yet-published article
        // slugs, evaluated per-request so no cache can freeze the time gate.
        const blogArticle = pathname.match(/^(?:\/(?:en|ar))?\/blog\/([^/]+)\/?$/);
        if (blogArticle) {
            const ts = BLOG_SCHEDULE[blogArticle[1]];
            if (ts === undefined || ts > Date.now()) {
                return markdownNotFound(path);
            }
        }
    }

    // Product pages follow /[brand]/[category]/[slug], with an optional /en.
    if (routeSegments.length === 3 && PRODUCT_BRANDS.has(routeSegments[0])) {
        const [brand, category, productSlug] = routeSegments;
        const product = staticProducts.find(item =>
            item.slug === productSlug
            && item.brand.toLowerCase() === brand.toLowerCase()
            && item.categorySlug === category,
        );

        if (product) {
            const md = generateProductMarkdown(product, localePrefix);
            return new NextResponse(md, {
                headers: {
                    'Content-Type': 'text/markdown; charset=utf-8',
                    'Vary': 'Accept',
                    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
                },
            });
        }

        // No matching brand+category+slug in the catalog → not found,
        // matching the HTML product page's not-found result.
        return markdownNotFound(path);
    }

    // Brand and category collection pages.
    if (routeSegments.length <= 2 && COLLECTION_ROOTS.has(routeSegments[0] || '')) {
        // Two-segment paths are only valid brand/category combinations —
        // the same closed space the HTML [brand]/[category] page enforces
        // via categoryContent + dynamicParams=false.
        if (routeSegments.length === 2
            && !categoryContent[routeSegments[0]]?.[routeSegments[1]]) {
            return markdownNotFound(path);
        }

        const segment = routeSegments.at(-1) || '';
        const md = `# CairoVolt — ${segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}

Browse this collection at [cairovolt.com/${path}](${baseUrl}/${path})

## About CairoVolt

CairoVolt is an Egyptian online store for **Anker**, **Joyroom**, and **Soundcore** accessories.

- Service area: Egypt
- Free shipping above ${FREE_SHIPPING_THRESHOLD.toLocaleString('en-US')} EGP
- 💰 Cash on Delivery
- ✅ CairoVolt warranty-card serial lookup available at ${baseUrl}/verify

## API Access

- Product catalog: ${baseUrl}/api/llms/catalog
- OpenAPI spec: ${baseUrl}/api/openapi.json
`;

        return new NextResponse(md, {
            headers: {
                'Content-Type': 'text/markdown; charset=utf-8',
                'Vary': 'Accept',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });
    }

    // Deeper paths under the product/collection trees have no HTML route
    // (products are exactly three segments) → not found, like the HTML site.
    if (!isHome && routeSegments.length >= 2 && COLLECTION_ROOTS.has(routeSegments[0] || '')) {
        return markdownNotFound(path);
    }

    // ── Real content for editorial and policy pages (AR default, /en → EN) ──
    const isArabicSurface = localePrefix === '';

    // Blog listing → live article index with links.
    if (routeSegments.length === 1 && routeSegments[0] === 'blog') {
        return markdownContent(generateBlogListingMarkdown(isArabicSurface, localePrefix));
    }

    // Live blog articles → full article markdown. Unknown or not-yet-published
    // slugs were already 404ed by the scheduling gate above, so any slug that
    // reaches this branch is a live article.
    if (routeSegments.length === 2 && routeSegments[0] === 'blog') {
        const article = await getBlogArticleBySlug(routeSegments[1]);
        if (article) {
            return markdownContent(generateBlogArticleMarkdown(article, isArabicSurface, localePrefix));
        }
        return markdownNotFound(path);
    }

    // Policy and info pages → the same published copy the HTML pages render.
    if (routeSegments.length === 1 && KNOWN_PAGE_SLUGS.has(routeSegments[0])) {
        return markdownContent(generateKnownPageMarkdown(routeSegments[0], isArabicSurface, localePrefix));
    }

    // Generic fallback for the remaining KNOWN static pages (contact,
    // locations, solutions, verify, …) —
    // a basic markdown page with navigation hints.
    const md = `# CairoVolt — ${path.replace(/-/g, ' ').replace(/\//g, ' / ').replace(/\b\w/g, c => c.toUpperCase())}

This page is available at [cairovolt.com/${path}](${baseUrl}/${path})

## About CairoVolt

CairoVolt is an Egyptian online store for **Anker**, **Joyroom**, and **Soundcore** accessories.

### Key Links

- [Full Product Catalog (Markdown)](${baseUrl}/api/llms/catalog)
- [OpenAPI Specification](${baseUrl}/api/openapi.json)
- [AI Instructions](${baseUrl}/.well-known/llms.txt)

### Contact

- WhatsApp: +201558245974
- Email: support@cairovolt.com
- Website: ${baseUrl}
`;

    return new NextResponse(md, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}


function plainText(value: string | undefined): string {
    return (value || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// Shared 200 response for negotiated markdown content pages.
function markdownContent(md: string): NextResponse {
    return new NextResponse(md, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}

function decodeEntities(value: string): string {
    return value
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&(?:#39|apos);/gi, "'")
        .replace(/&ndash;/gi, '–')
        .replace(/&mdash;/gi, '—')
        .replace(/&hellip;/gi, '…')
        .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(parseInt(dec, 10)));
}

// GFM tables need a header-separator row; the tag conversion below only
// produces plain pipe rows, so insert the separator after each table's
// first row.
function addTableSeparators(md: string): string {
    const lines = md.split('\n');
    const isRow = (line: string | undefined) => !!line && /^\|.*\|$/.test(line.trim());
    const out: string[] = [];
    for (let i = 0; i < lines.length; i++) {
        out.push(lines[i]);
        if (isRow(lines[i]) && !isRow(lines[i - 1]) && isRow(lines[i + 1])) {
            const cols = Math.max(lines[i].trim().split('|').length - 2, 1);
            out.push(`|${Array(cols).fill('---').join('|')}|`);
        }
    }
    return out.join('\n');
}

/**
 * Small deterministic HTML→markdown mapping for article content.
 * Handles the tags the blog content actually uses (headings, paragraphs,
 * lists, tables, emphasis, links); everything else is stripped to text.
 */
function htmlToMarkdown(html: string): string {
    let md = html || '';
    md = md.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ');
    md = md.replace(/<!--[\s\S]*?-->/g, ' ');
    // Tables → pipe rows. Collapse whitespace inside each row first so cells
    // written across multiple source lines still form a single pipe row.
    md = md.replace(/<tr[\s\S]*?<\/tr>/gi, row => row.replace(/\s+/g, ' '));
    md = md.replace(/<\/(?:td|th)>/gi, ' | ');
    md = md.replace(/<tr[^>]*>/gi, '\n| ');
    md = md.replace(/<\/tr>/gi, '\n');
    md = md.replace(/<\/table>/gi, '\n\n');
    // Headings.
    md = md.replace(/<h1[^>]*>/gi, '\n\n# ');
    md = md.replace(/<h2[^>]*>/gi, '\n\n## ');
    md = md.replace(/<h3[^>]*>/gi, '\n\n### ');
    md = md.replace(/<h4[^>]*>/gi, '\n\n#### ');
    md = md.replace(/<h5[^>]*>/gi, '\n\n##### ');
    md = md.replace(/<\/h[1-6]>/gi, '\n\n');
    // Lists.
    md = md.replace(/<li[^>]*>/gi, '\n- ');
    md = md.replace(/<\/(?:ul|ol)>/gi, '\n\n');
    // Paragraph-level breaks.
    md = md.replace(/<\/p>/gi, '\n\n');
    md = md.replace(/<br\s*\/?>/gi, '\n');
    md = md.replace(/<\/div>/gi, '\n');
    md = md.replace(/<\/blockquote>/gi, '\n\n');
    // Emphasis.
    md = md.replace(/<\/?(?:strong|b)>/gi, '**');
    md = md.replace(/<\/?(?:em|i)>/gi, '*');
    // Links — keep destinations, absolutize root-relative hrefs.
    md = md.replace(
        /<a\s[^>]*href=(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi,
        (_match, _quote: string, href: string, text: string) => {
            const label = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            const target = href.startsWith('/') ? `${BASE_URL}${href}` : href;
            return label ? `[${label}](${target})` : target;
        },
    );
    // Strip any remaining tags, decode entities, normalize whitespace.
    md = md.replace(/<[^>]+>/g, ' ');
    md = decodeEntities(md);
    md = md
        .split('\n')
        .map(line => line.replace(/[ \t]+/g, ' ').trim())
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    // Rows of one table must be adjacent lines for GFM parsing.
    md = md.replace(/\|\n+(?=\|)/g, '|\n');
    return addTableSeparators(md);
}

// Same category labels the blog article page renders.
const BLOG_CATEGORY_LABELS: Record<BlogArticle['category'], { ar: string; en: string }> = {
    'buying-guide': { ar: 'دليل شراء', en: 'Buying Guide' },
    'comparison': { ar: 'مقارنة', en: 'Comparison' },
    'how-to': { ar: 'شرح', en: 'How-To' },
    'review': { ar: 'مراجعة', en: 'Review' },
    'tips': { ar: 'نصائح', en: 'Tips' },
};

// Same methodology note the HTML article page shows above the content.
const METHODOLOGY_NOTE = {
    ar: 'ما لم تتضمن الفقرة مصدراً أو تقرير قياس موثقاً، تُفهم أرقام الأداء وعدد الشحنات كحسابات أو أمثلة تقديرية وليست نتائج اختبار معملي أو وعد أداء. راجع مواصفات الشركة المصنّعة للموديل وحالة جهازك والكابل قبل اتخاذ القرار.',
    en: 'Unless a paragraph links to a source or a documented measurement report, performance figures and charge counts should be read as calculations or illustrative estimates, not laboratory results or performance promises. Check the manufacturer specifications for the exact model, your device condition, and the cable before deciding.',
};

function generateBlogListingMarkdown(isArabic: boolean, localePrefix: string): string {
    const entries = [...getLiveIndex()].sort(
        (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    );

    let md = isArabic ? '# مدونة كايرو فولت\n\n' : '# CairoVolt Blog\n\n';
    md += isArabic
        ? `أدلة شراء ومقارنات وشروحات ومراجعات ونصائح لإكسسوارات انكر وجوي روم وساوندكور في مصر. عدد المقالات المنشورة: ${entries.length}.\n\n`
        : `Buying guides, comparisons, how-tos, reviews, and tips for Anker, Joyroom, and Soundcore accessories in Egypt. Published articles: ${entries.length}.\n\n`;
    md += isArabic
        ? 'كل رابط مقال يعيد نسخة ماركداون كاملة عند طلبه بترويسة `Accept: text/markdown`.\n\n'
        : 'Each article URL returns full markdown when requested with `Accept: text/markdown`.\n\n';

    for (const entry of entries) {
        const title = isArabic
            ? localizeArabicBrandNames(entry.translations.ar.title)
            : entry.translations.en.title;
        const category = BLOG_CATEGORY_LABELS[entry.category][isArabic ? 'ar' : 'en'];
        md += `- [${title}](${BASE_URL}${localePrefix}/blog/${entry.slug}) — ${category} · ${(entry.publishDate || '').slice(0, 10)}\n`;
    }

    md += isArabic
        ? `\n## روابط\n\n- الكتالوج الكامل (ماركداون): ${BASE_URL}/api/llms/catalog\n- تعليمات الذكاء الاصطناعي: ${BASE_URL}/llms.txt\n`
        : `\n## Links\n\n- Full Product Catalog (Markdown): ${BASE_URL}/api/llms/catalog\n- AI Instructions: ${BASE_URL}/llms.txt\n`;
    return md;
}

function generateBlogArticleMarkdown(
    article: BlogArticle,
    isArabic: boolean,
    localePrefix: string,
): string {
    const rawTrans = article.translations[isArabic ? 'ar' : 'en'];
    // Mirror the HTML page: Arabic text fields use the Arabic brand spellings,
    // rich HTML is localized text-node-by-text-node (URLs stay untouched).
    const textTrans = isArabic
        ? localizeArabicBrandContent({ ...rawTrans, content: '' })
        : rawTrans;
    const contentMd = htmlToMarkdown(
        isArabic ? localizeArabicBrandHtml(rawTrans.content) : rawTrans.content,
    );
    const articleUrl = `${BASE_URL}${localePrefix}/blog/${article.slug}`;
    const catLabel = BLOG_CATEGORY_LABELS[article.category][isArabic ? 'ar' : 'en'];
    const published = (article.publishDate || '').slice(0, 10);
    const modified = (article.modifiedDate || '').slice(0, 10);

    let md = `# ${textTrans.title}\n\n`;
    md += isArabic
        ? `${catLabel} — مدونة كايرو فولت · نُشر ${published}${modified && modified !== published ? ` · آخر تحديث ${modified}` : ''} · ${article.readingTime} دقائق قراءة\n\n`
        : `${catLabel} — CairoVolt Blog · Published ${published}${modified && modified !== published ? ` · Updated ${modified}` : ''} · ${article.readingTime} min read\n\n`;
    md += `${isArabic ? 'رابط المقال' : 'Article page'}: ${articleUrl}\n\n`;

    if (textTrans.quickAnswer) {
        md += `## ${isArabic ? 'ملخص سريع' : 'Quick Answer'}\n\n> ${textTrans.quickAnswer}\n\n`;
    }
    if (textTrans.excerpt) {
        md += `${textTrans.excerpt}\n\n`;
    }

    md += `> **${isArabic ? 'ملاحظة عن المنهجية' : 'Methodology note'}:** ${METHODOLOGY_NOTE[isArabic ? 'ar' : 'en']}\n\n`;

    md += `${contentMd}\n\n`;

    if (textTrans.faq && textTrans.faq.length > 0) {
        md += `## ${isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}\n\n`;
        for (const item of textTrans.faq) {
            md += `### ${item.question}\n\n${item.answer}\n\n`;
        }
    }

    md += isArabic
        ? `## روابط\n\n- المدونة: ${BASE_URL}${localePrefix}/blog\n- الكتالوج الكامل (ماركداون): ${BASE_URL}/api/llms/catalog\n`
        : `## Links\n\n- Blog: ${BASE_URL}${localePrefix}/blog\n- Full Product Catalog (Markdown): ${BASE_URL}/api/llms/catalog\n`;
    return md;
}

// Policy/info pages whose markdown mirrors the published HTML copy.
const KNOWN_PAGE_SLUGS = new Set(['about', 'faq', 'shipping', 'return-policy', 'warranty']);

const FAQ_CATEGORY_KEYS = ['ordering', 'shipping', 'warranty', 'products', 'payment'] as const;

function generateKnownPageMarkdown(
    page: string,
    isArabic: boolean,
    localePrefix: string,
): string {
    // messages/*.json is the source the HTML pages render via next-intl.
    const m = (isArabic ? arMessages : enMessages) as typeof enMessages;
    const pageUrl = `${BASE_URL}${localePrefix}/${page}`;

    const contactBlock = isArabic
        ? `## تواصل معنا\n\n- واتساب: +201558245974\n- البريد الإلكتروني: support@cairovolt.com\n- الصفحة: ${pageUrl}\n`
        : `## Contact\n\n- WhatsApp: +201558245974\n- Email: support@cairovolt.com\n- Page: ${pageUrl}\n`;

    if (page === 'shipping') {
        const s = m.Shipping;
        const areas = (['cairo', 'giza', 'alexandria', 'delta', 'upperEgypt', 'redSea'] as const)
            .map(area => `- ${s.deliveryAreas[area]}`)
            .join('\n');
        // The two estimate strings are the exact ones the HTML page renders.
        const cairoEstimate = isArabic ? 'تقدير شائع: 1–2 يوم عمل' : 'Common estimate: 1–2 business days';
        const provincesEstimate = isArabic ? 'تقدير شائع: 3–5 أيام عمل' : 'Common estimate: 3–5 business days';
        return `# ${s.title}\n\n${s.metaDescription}\n\n`
            + `## ${s.deliveryAreas.title}\n\n${s.deliveryAreas.description}\n\n${areas}\n\n`
            + `## ${s.deliveryTime.title}\n\n- ${s.deliveryTime.cairo}: ${cairoEstimate}\n- ${s.deliveryTime.provinces}: ${provincesEstimate}\n\n`
            + `## ${s.shippingCost.title}\n\n${s.shippingCost.freeShipping.replace('🎉 ', '')}\n\n${s.shippingCost.belowMinimum}\n\n`
            + `## ${s.cod.title}\n\n${s.cod.description}\n\n`
            + contactBlock;
    }

    if (page === 'return-policy') {
        const r = m.ReturnPolicy;
        const eligible = (['unused', 'originalPackaging', 'accessories', 'receipt'] as const)
            .map(item => `- ${r.eligible[item]}`)
            .join('\n');
        const nonReturnable = (['opened', 'damaged', 'misuse', 'noPackaging'] as const)
            .map(item => `- ${r.nonReturnable[item]}`)
            .join('\n');
        const steps = (['step1', 'step2', 'step3', 'step4'] as const)
            .map((step, index) => `${index + 1}. ${r.howToReturn[step]}`)
            .join('\n');
        const defective = (['freeReturn', 'fullRefund', 'warranty'] as const)
            .map(item => `- ${r.defective[item]}`)
            .join('\n');
        return `# ${r.title}\n\n${r.lastUpdated}\n\n`
            + `## ${r.window.title}\n\n14 ${r.window.days} — ${r.window.description}\n\n`
            + `## ${r.eligible.title}\n\n${eligible}\n\n`
            + `## ${r.nonReturnable.title}\n\n${nonReturnable}\n\n`
            + `## ${r.howToReturn.title}\n\n${steps}\n\n`
            + `## ${r.refund.title}\n\n- ${r.refund.processing}: 5-7 ${r.refund.businessDays}\n- ${r.refund.method}: ${r.refund.methodDescription}\n\n${r.refund.shippingNote}\n\n`
            + `## ${r.defective.title}\n\n${r.defective.description}\n\n${defective}\n\n`
            + contactBlock;
    }

    if (page === 'warranty') {
        const w = m.Warranty;
        // Same period paragraph the HTML page renders above the duration tiles.
        const periodParagraph = isArabic
            ? 'هذه سياسة ضمان كايرو فولت للمنتجات المؤهلة: 18 شهرًا لمنتجات انكر وساوندكور، و12 شهرًا لمنتجات جوي روم، ما لم تعرض صفحة منتج محدد مدة مختلفة. لا تمثل ضمانًا من الشركة المصنّعة إلا إذا ذُكر ذلك صراحةً مع مستند يمكن التحقق منه. صفحة المنتج وتأكيد الطلب هما مرجع المدة المطبقة وقت الشراء.'
            : 'Eligible Anker and Soundcore products carry an 18-month CairoVolt store warranty, while eligible Joyroom products carry 12 months unless a specific product page states a different duration. This is not a manufacturer-issued warranty unless expressly stated with verifiable documentation. The product page and order confirmation record the terms applicable at purchase.';
        const covered = (['manufacturing', 'battery', 'charging', 'ports'] as const)
            .map(item => `- ${w.covered[item]}`)
            .join('\n');
        const notCovered = (['physical', 'water', 'misuse', 'unauthorized'] as const)
            .map(item => `- ${w.notCovered[item]}`)
            .join('\n');
        const steps = (['step1', 'step2', 'step3', 'step4'] as const)
            .map((step, index) => `${index + 1}. ${w.howToClaim[step]}`)
            .join('\n');
        return `# ${w.title}\n\n${w.metaDescription}\n\n`
            + `## ${w.period.title}\n\n${periodParagraph}\n\n`
            + `## ${w.covered.title}\n\n${covered}\n\n`
            + `## ${w.notCovered.title}\n\n${notCovered}\n\n`
            + `## ${w.howToClaim.title}\n\n${steps}\n\n`
            + `${isArabic ? 'التحقق من سيريال بطاقة ضمان كايرو فولت' : 'CairoVolt warranty-card serial check'}: ${BASE_URL}${localePrefix}/verify\n\n`
            + contactBlock;
    }

    if (page === 'faq') {
        const f = m.FAQ;
        let md = `# ${f.title}\n\n${f.subtitle}\n\n`;
        for (const category of FAQ_CATEGORY_KEYS) {
            const cat = f.categories[category];
            md += `## ${cat.title}\n\n`;
            for (const num of [1, 2, 3] as const) {
                md += `### ${cat[`q${num}`]}\n\n${cat[`a${num}`]}\n\n`;
            }
        }
        return md + contactBlock;
    }

    // page === 'about'
    const a = m.About;
    const whyUs = (['original', 'warranty', 'prices', 'support'] as const)
        .map(item => `- **${a.whyUs[item].title}** — ${a.whyUs[item].description}`)
        .join('\n');
    const brandNames = isArabic
        ? { anker: 'انكر', joyroom: 'جوي روم' }
        : { anker: 'Anker', joyroom: 'Joyroom' };
    return `# ${a.title}\n\n${a.subtitle}\n\n`
        + `## ${a.mission.title}\n\n${a.mission.description}\n\n`
        + `## ${a.relationship.title}\n\n${a.relationship.description}\n\n`
        + `## ${a.whyUs.title}\n\n${whyUs}\n\n`
        + `## ${a.brands.title}\n\n- ${brandNames.anker}: ${a.brands.anker}\n- ${brandNames.joyroom}: ${a.brands.joyroom}\n\n`
        + contactBlock;
}

function generateProductMarkdown(
    product: (typeof staticProducts)[number],
    localePrefix: string,
): string {
    const name = plainText(product.translations.en.name);
    const nameAr = plainText(product.translations.ar.name);
    const description = plainText(
        product.translations.en.shortDescription || product.translations.en.description,
    );
    const productPath = `${localePrefix}/${product.brand.toLowerCase()}/${product.categorySlug}/${product.slug}`;
    const productUrl = `https://cairovolt.com${productPath}`;

    return `# ${name}${nameAr ? ` (${nameAr})` : ''}

| Field | Value |
|-------|-------|
| Brand | ${product.brand} |
| Category | ${product.categorySlug} |
| Price | ${product.price} EGP |
| In Stock | ${product.stock > 0 ? 'Yes' : 'No'} |
| Shipping | Free above ${FREE_SHIPPING_THRESHOLD.toLocaleString('en-US')} EGP |
| Payment | Cash on Delivery |

## Description

${description || `${name} is listed in the CairoVolt catalog.`}

## Buy This Product

\`\`\`bash
curl -X POST "https://cairovolt.com/api/v1/checkout" \\
  -H "Content-Type: application/json" \\
  -d '{"slug": "${product.slug}", "quantity": 1, "customerName": "...", "phone": "...", "address": "...", "city": "cairo"}'
\`\`\`

## Links

- [Product Page](${productUrl})
- [Full Catalog](https://cairovolt.com/api/llms/catalog)
`;
}
