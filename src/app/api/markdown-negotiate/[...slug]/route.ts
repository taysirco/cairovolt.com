import { NextRequest, NextResponse } from 'next/server';
import { staticProducts } from '@/lib/static-products';
import { FREE_SHIPPING_THRESHOLD, getShippingFee } from '@/lib/shipping';
import { KNOWN_TOP_SEGMENTS, LEGACY_PRODUCT_REDIRECTS, RETIRED_CATEGORY_REDIRECTS } from '@/lib/known-routes';
import { getGovernorateBySlug, governorates } from '@/data/governorates';
import { BostaTracker } from '@/lib/bosta';
import { solutionsDB } from '@/data/solutions-data';
import { isSelfControlledReference } from '@/lib/self-controlled-hosts';
import {
    getMerchantProductUrl,
    isRecallAffectedSlug,
    isRecallStockVerifiedOutsideScope,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
    STANDARD_RETURN_WINDOW_DAYS,
} from '@/lib/merchant-product-data';
import { getStoreShippingSummary } from '@/lib/warranty-policy';
import { BLOG_SCHEDULE } from '@/data/blog-schedule.generated';
import { categoryContent } from '@/data/category-content';
import { getBlogArticleBySlug, getLiveIndex } from '@/data/blog-index';
import type { BlogArticle } from '@/data/blog/_types';
import {
    localizeArabicBrandContent,
    localizeArabicBrandHtml,
    localizeArabicBrandNames,
} from '@/lib/arabic-brand-names';
import {
    formatAgentLabMarkdown,
    getAgentLabSummary,
    type AgentLocale,
} from '@/lib/agent-lab-export';
import {
    generateBrandCategoryMarkdown,
    generateBrandHubMarkdown,
    generateGenericCategoryMarkdown,
    generateLabHubMarkdown,
    generateSolutionMarkdown,
} from '@/lib/agent-hub-markdown';
// Same translation source the HTML policy pages render via next-intl —
// the markdown surface reuses the identical published copy, never new claims.
import enMessages from '../../../../../messages/en.json';
import arMessages from '../../../../../messages/ar.json';

/** Voice FAQs mirrored from src/app/[locale]/faq/page.tsx — keep strings identical. */
const VOICE_FAQS = {
    ar: [
        { question: 'لو المنتج وصلني فيه مشكلة أعمل إيه؟', answer: 'تواصل معنا على واتساب 01558245974 واحتفظ بالمنتج وملحقاته وتغليفه. يراجع فريقنا الحالة ويؤكد لك الإجراء المتاح وفق سياسة الإرجاع أو ضمان كايرو فولت.' },
        { question: 'هل بتقبلوا الدفع فودافون كاش أو إنستاباي؟', answer: 'حالياً الدفع عند الاستلام كاش فقط (COD). راجع إجمالي الطلب وتكلفة الشحن قبل التأكيد، وسياسة الإرجاع إذا ظهرت مشكلة بعد الاستلام.' },
        { question: 'الضمان بتاعكم بيغطي إيه بالظبط؟', answer: 'تظهر مدة ضمان كايرو فولت وشروطه في صفحة كل منتج. يغطي الضمان المنتجات المؤهلة وفق الشروط المكتوبة، ويحدد فريق الدعم الإجراء بعد فحص الحالة.' },
    ],
    en: [
        { question: 'What if my product arrives damaged?', answer: 'Contact us on WhatsApp at 01558245974 and keep the product, accessories, and packaging. Our team will review the case and confirm the available remedy under the return policy or CairoVolt warranty.' },
        { question: 'Do you accept Vodafone Cash or InstaPay?', answer: 'Currently we accept Cash on Delivery (COD) only. Review the order total and shipping cost before confirmation, and the return policy if an issue appears after receipt.' },
        { question: 'What exactly does your warranty cover?', answer: 'The CairoVolt warranty duration and terms are shown on each product page. Eligible cases are handled under those written terms after the support team reviews the product.' },
    ],
} as const;

/**
 * Markdown Content Negotiation Handler
 * /api/markdown-negotiate/[...slug]/route.ts
 *
 * When the middleware detects Accept: text/markdown, it rewrites
 * the request here. This handler serves markdown representations
 * of CairoVolt pages to AI agents.
 *
 * Strategy:
 * - Homepages (/index = Arabic, /en = English) → serve llms.txt (our curated
 *   markdown representation), canonical to the matching HTML home.
 * - Product, brand, category, blog, lab, solution, governorate and policy
 *   pages → generated from the same data the HTML page renders.
 * - Anything else → 404. There is no generic stub: a 550-byte "CairoVolt —
 *   <Path>" page served with 200 told agents less than the HTML page did.
 *   The middleware only rewrites negotiated requests for paths that have a
 *   generator (src/lib/markdown-twin-routes.ts), so those fall through to HTML.
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
const PRODUCT_BRANDS = new Set(['anker', 'joyroom', 'soundcore', 'jbl']);

// Single-segment collection landing pages (brand hubs + generic categories).
const COLLECTION_ROOTS = new Set([
    'anker',
    'joyroom',
    'soundcore',
    'jbl',
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

// 404 for a path that passes the HTML gates but has no markdown generator
// (contact, team, verify, terms, privacy, …). Same status and headers as
// markdownNotFound, but it does not claim the HTML page is missing.
function markdownUnavailable(path: string): NextResponse {
    const md = `# No markdown version

No markdown version is available for cairovolt.com/${path}. If the page exists, read its HTML at ${BASE_URL}/${path}.

- [Markdown pages that exist](${BASE_URL}/llms.txt) (see "Public Resources")
- [Full Product Catalog (Markdown)](${BASE_URL}/api/llms/catalog)
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
    // 'en' is the English homepage (/en). It used to fall through to the
    // generic stub ("# CairoVolt — En", 541 bytes).
    const isEnglishHome = path === 'en';
    const isHome = path === 'index' || path === '' || isEnglishHome;
    // The HTML page this markdown is an alternate representation OF. Every 200
    // below advertises it as rel="canonical" (see markdownContent).
    const canonicalUrl = isEnglishHome
        ? `${BASE_URL}/en`
        : isHome ? BASE_URL : `${BASE_URL}/${path}`;

    // Homepage → serve llms.txt (our comprehensive markdown representation).
    // Call the route handler DIRECTLY — an HTTP self-fetch here once pinned a
    // stale CDN copy of the old llms.txt into the data cache and re-published
    // removed claims to AI agents. In-process = always the deployed content.
    if (isHome) {
        try {
            const { GET: llmsGet } = await import('@/app/.well-known/llms.txt/route');
            const llmsContent = await llmsGet().text();
            const homeResponse = markdownContent(llmsContent, canonicalUrl);
            homeResponse.headers.set('X-Content-Source', 'llms.txt');
            return homeResponse;
        } catch {
            // Fall through; an unrenderable home ends in the 404 below.
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
        // Lowercased in the same hop, matching the HTML middleware — otherwise
        // /ar/Anker would chain through /Anker before reaching /anker.
        if (slug[0] === 'ar') {
            return markdownRedirect(
                slug.length === 1 ? '/' : `/${slug.slice(1).join('/').toLowerCase()}`,
            );
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

        // Retired CATEGORY prefix 301s — same map and regex as the middleware.
        const retiredCategory = pathname.match(
            /^(\/en)?\/((?:anker|joyroom|soundcore|jbl)\/[a-z0-9-]+)(?:\/.*)?$/
        );
        if (retiredCategory) {
            const categoryTarget = RETIRED_CATEGORY_REDIRECTS[retiredCategory[2]];
            if (categoryTarget) {
                return markdownRedirect(`${retiredCategory[1] || ''}${categoryTarget}`);
            }
        }

        // Retired product slug 301s — same map and regex as the middleware.
        const legacyProduct = pathname.match(
            /^(\/en)?\/(?:anker|joyroom|soundcore|jbl)(?:\/[a-z0-9-]+)?\/([a-z0-9-]+)\/?$/
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
            return markdownContent(md, canonicalUrl);
        }

        // No matching brand+category+slug in the catalog → not found,
        // matching the HTML product page's not-found result.
        return markdownNotFound(path);
    }

    // Brand and category collection pages — rich hub markdown (not stubs).
    if (routeSegments.length <= 2 && COLLECTION_ROOTS.has(routeSegments[0] || '')) {
        // Two-segment paths are only valid brand/category combinations —
        // the same closed space the HTML [brand]/[category] page enforces
        // via categoryContent + dynamicParams=false.
        if (routeSegments.length === 2
            && !categoryContent[routeSegments[0]]?.[routeSegments[1]]) {
            return markdownNotFound(path);
        }

        const hubLocale: AgentLocale = localePrefix === '/en' ? 'en' : 'ar';

        let hubMd: string | null = null;
        if (routeSegments.length === 1) {
            const root = routeSegments[0];
            if (PRODUCT_BRANDS.has(root)) {
                hubMd = generateBrandHubMarkdown(root, hubLocale, localePrefix);
            } else {
                hubMd = generateGenericCategoryMarkdown(root, hubLocale, localePrefix);
            }
        } else if (routeSegments.length === 2) {
            hubMd = generateBrandCategoryMarkdown(
                routeSegments[0],
                routeSegments[1],
                hubLocale,
                localePrefix,
            );
        }

        if (hubMd) {
            return markdownContent(hubMd, canonicalUrl);
        }

        // Allowlisted collection roots must always have a generator. Never serve
        // the old English stub (cloaking-adjacent vs HTML richness claims).
        return markdownNotFound(path);
    }

    // Deeper paths under the product/collection trees have no HTML route
    // (products are exactly three segments) → not found, like the HTML site.
    if (!isHome && routeSegments.length >= 2 && COLLECTION_ROOTS.has(routeSegments[0] || '')) {
        return markdownNotFound(path);
    }

    // ── Real content for editorial and policy pages (AR default, /en → EN) ──
    const isArabicSurface = localePrefix === '';
    const hubLocale: AgentLocale = isArabicSurface ? 'ar' : 'en';

    // Lab hub — measured index + methodology (same truth as HTML /lab).
    if (routeSegments.length === 1 && routeSegments[0] === 'lab') {
        return markdownContent(generateLabHubMarkdown(hubLocale, localePrefix), canonicalUrl);
    }

    // Individual solution pages. /solutions itself has no HTML page (404), so
    // its markdown 404s too — status parity; /faq lists every solution.
    if (routeSegments.length === 1 && routeSegments[0] === 'solutions') {
        return markdownNotFound(path);
    }
    if (routeSegments.length === 2 && routeSegments[0] === 'solutions') {
        const solutionMd = generateSolutionMarkdown(routeSegments[1], hubLocale, localePrefix);
        if (solutionMd) return markdownContent(solutionMd, canonicalUrl);
        return markdownNotFound(path);
    }

    // Blog listing → live article index with links.
    if (routeSegments.length === 1 && routeSegments[0] === 'blog') {
        return markdownContent(generateBlogListingMarkdown(isArabicSurface, localePrefix), canonicalUrl);
    }

    // Live blog articles → full article markdown. Unknown or not-yet-published
    // slugs were already 404ed by the scheduling gate above, so any slug that
    // reaches this branch is a live article.
    if (routeSegments.length === 2 && routeSegments[0] === 'blog') {
        const article = await getBlogArticleBySlug(routeSegments[1]);
        if (article) {
            return markdownContent(generateBlogArticleMarkdown(article, isArabicSurface, localePrefix), canonicalUrl);
        }
        return markdownNotFound(path);
    }

    // Policy and info pages → the same published copy the HTML pages render.
    if (routeSegments.length === 1 && KNOWN_PAGE_SLUGS.has(routeSegments[0])) {
        return markdownContent(generateKnownPageMarkdown(routeSegments[0], isArabicSurface, localePrefix), canonicalUrl);
    }

    // Governorate delivery pages (/locations/<governorate>) — same data and
    // the same six FAQs as the HTML page. /locations itself has no page.
    if (routeSegments.length === 2 && routeSegments[0] === 'locations') {
        const governorate = getGovernorateBySlug(routeSegments[1]);
        if (governorate) {
            return markdownContent(generateLocationMarkdown(governorate, isArabicSurface, localePrefix), canonicalUrl);
        }
        return markdownNotFound(path);
    }

    // No generator for this path (contact, team, verify, terms, privacy, …).
    // 404 rather than a thin stub; negotiated requests for these paths never
    // get here because the middleware leaves them on the HTML page.
    return markdownUnavailable(path);
}


function plainText(value: string | undefined): string {
    return (value || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Shared 200 response for negotiated markdown content pages.
 *
 * This markdown is an ALTERNATE REPRESENTATION of an HTML page that already
 * exists at a canonical URL, so it must never compete with that page in a
 * search index. Two headers enforce that:
 *   - `X-Robots-Tag: noindex` drops /api/markdown-negotiate/* from indexes.
 *   - `Link: <html-url>; rel="canonical"` consolidates any signal a crawler
 *     that reaches the alternate format anyway would otherwise strand there.
 * Neither header blocks fetching, so AI agents keep full access — and robots.txt
 * still allows the path explicitly for the AI crawler group.
 */
function markdownContent(md: string, canonicalUrl: string): NextResponse {
    return new NextResponse(md, {
        headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'X-Robots-Tag': 'noindex',
            Link: `<${canonicalUrl}>; rel="canonical"`,
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
        : `Buying guides, comparisons, how-tos, reviews, and tips for Anker, Joyroom, Soundcore, and JBL accessories in Egypt. Published articles: ${entries.length}.\n\n`;
    md += isArabic
        ? `النسخة الماركداون الكاملة لأي مقال على ${BASE_URL}/api/markdown-negotiate${localePrefix}/blog/{slug}.\n\n`
        : `Full markdown of any article: ${BASE_URL}/api/markdown-negotiate${localePrefix}/blog/{slug}.\n\n`;

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

    // Products the article links to, with today's catalogue price — so an
    // agent reading an older article never has to trust a price in its prose.
    const discussed = productsLinkedInContent(rawTrans.content);
    if (discussed.length > 0) {
        md += `## ${isArabic ? 'المنتجات المذكورة' : 'Products discussed'}\n\n`;
        md += isArabic
            ? 'السعر الحالي في الكتالوج؛ صفحة المنتج هي المرجع وقت الطلب.\n\n'
            : 'Current catalogue price; the product page is authoritative when ordering.\n\n';
        for (const product of discussed) {
            const name = isArabic
                ? localizeArabicBrandNames(plainText(product.translations.ar.name))
                : plainText(product.translations.en.name);
            const price = product.price.toLocaleString('en-US');
            const url = getMerchantProductUrl(product, isArabic ? 'ar' : 'en');
            // Never bury a recall: every recall-affected model carries the
            // marker, worded by whether CairoVolt's stock was serial-checked.
            const recall = !isRecallAffectedSlug(product.slug)
                ? ''
                : isRecallStockVerifiedOutsideScope(product.slug)
                    ? (isArabic
                        ? ' — ⚠️ موديل مُدرج في برنامج استدعاء من انكر؛ فُحص مخزوننا خارج النطاق المتأثر — راجع صفحة المنتج وتحقق من السيريال'
                        : ' — ⚠️ model named in an Anker recall programme; our stock was serial-checked outside the affected range — see the product page and check your serial')
                    : (isArabic
                        ? ' — ⚠️ استدعاء — راجع صفحة المنتج وتحقق من السيريال'
                        : ' — ⚠️ Recall — see the product page and check your serial');
            md += `- [${name}](${url}) — ${isArabic ? `${price} جنيه` : `${price} EGP`}${recall}\n`;
        }
        md += '\n';
    }

    // The article's cited sources (rendered on the HTML page as "References").
    const sources = (article.externalReferences || []).filter(ref => isExternalSource(ref.url));
    if (sources.length > 0) {
        md += `## ${isArabic ? 'المصادر' : 'Sources'}\n\n`;
        for (const ref of sources) {
            const title = isArabic ? ref.title.ar : ref.title.en;
            const note = ref.note ? (isArabic ? ref.note.ar : ref.note.en) : '';
            md += `- [${title}](${ref.url})${note ? ` — ${note}` : ''}\n`;
        }
        md += '\n';
    }

    md += isArabic
        ? `## روابط\n\n- المدونة: ${BASE_URL}${localePrefix}/blog\n- الكتالوج الكامل (ماركداون): ${BASE_URL}/api/llms/catalog\n`
        : `## Links\n\n- Blog: ${BASE_URL}${localePrefix}/blog\n- Full Product Catalog (Markdown): ${BASE_URL}/api/llms/catalog\n`;
    return md;
}

// CairoVolt-controlled properties are not independent sources — see
// src/lib/self-controlled-hosts.ts.
function isExternalSource(url: string): boolean {
    return !isSelfControlledReference(url);
}

const PRODUCT_LINK_RE = /href=(["'])(?:https?:\/\/(?:www\.)?cairovolt\.com)?(?:\/en)?\/(anker|joyroom|soundcore|jbl)\/([a-z0-9-]+)\/([a-z0-9.-]+)\/?(?:[?#][^"']*)?\1/gi;

/** Active, machine-listed catalogue products linked from the article body, in order of first link. */
function productsLinkedInContent(html: string | undefined): Array<(typeof staticProducts)[number]> {
    const found: Array<(typeof staticProducts)[number]> = [];
    const seen = new Set<string>();
    for (const match of (html || '').matchAll(PRODUCT_LINK_RE)) {
        const slug = match[4].toLowerCase();
        if (seen.has(slug)) continue;
        seen.add(slug);
        const product = staticProducts.find(item => item.slug === slug);
        if (
            product
            && product.status === 'active'
            && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
        ) {
            found.push(product);
        }
    }
    return found;
}

/**
 * Delivery-time breakdown shared by the /shipping twin. Same derivation as the
 * HTML page (src/app/[locale]/shipping/page.tsx): governorate deliveryDays to
 * deliveryDays + 1 business days.
 */
function deliveryBreakdown(isArabic: boolean) {
    const days = governorates.map(item => item.deliveryDays);
    const fastestDays = Math.min(...days);
    const slowestDays = Math.max(...days);
    const middle = governorates
        .filter(item => item.deliveryDays !== fastestDays && item.deliveryDays !== slowestDays)
        .map(item => item.deliveryDays);
    const otherRange = middle.length
        ? `${Math.min(...middle)}–${Math.max(...middle) + 1}`
        : `${slowestDays}–${slowestDays + 1}`;
    const slowestNames = governorates
        .filter(item => item.deliveryDays === slowestDays)
        .map(item => (isArabic ? item.nameAr : item.nameEn));
    const slowestLabel = isArabic
        ? slowestNames.join(' و')
        : slowestNames.length > 1
            ? `${slowestNames.slice(0, -1).join(', ')} and ${slowestNames[slowestNames.length - 1]}`
            : slowestNames.join('');
    // Arabic: "1–2 يوم عمل" (as the Cairo card and the existing copy write it), "2–3 أيام عمل" otherwise.
    const businessDays = (range: string) => (isArabic
        ? `${range} ${range.startsWith('1–') ? 'يوم عمل' : 'أيام عمل'}`
        : `${range} business days`);
    return { fastestDays, slowestDays, otherRange, slowestLabel, businessDays };
}

/**
 * /locations/<governorate> — mirrors src/app/[locale]/locations/[governorate]/page.tsx.
 * The six questions below are copied from that page; keep the strings identical.
 */
function generateLocationMarkdown(
    governorate: NonNullable<ReturnType<typeof getGovernorateBySlug>>,
    isArabic: boolean,
    localePrefix: string,
): string {
    const locale = isArabic ? 'ar' : 'en';
    const logistics = BostaTracker.getRegionalStats(governorate.slug, locale);
    const shippingFee = getShippingFee(governorate.slug, 0);
    const freeShippingFrom = FREE_SHIPPING_THRESHOLD.toLocaleString('en-US');
    const cityList = (isArabic ? governorate.cities.ar : governorate.cities.en).join(isArabic ? ' و' : ', ');
    const pageUrl = `${BASE_URL}${localePrefix}/locations/${governorate.slug}`;

    const questions = isArabic
        ? [
            {
                question: `التوصيل إلى ${governorate.nameAr} بياخد كام يوم؟`,
                answer: `${logistics.delivery_estimate}. المدة تقديرية، ويتواصل فريق كايرو فولت لتأكيد الموعد بعد مراجعة الطلب.`,
            },
            {
                question: `كم رسوم الشحن إلى ${governorate.nameAr}؟`,
                answer: `رسوم الشحن إلى ${governorate.nameAr} ${shippingFee} جنيهاً للطلبات الأقل من ${freeShippingFrom} جنيه، والشحن مجاني للطلبات من ${freeShippingFrom} جنيه فأكثر وفق سياسة الشحن.`,
            },
            {
                question: `هل الدفع عند الاستلام متاح في ${governorate.nameAr}؟`,
                answer: logistics.cash_on_delivery
                    ? 'نعم، الدفع عند الاستلام متاح للطلبات المؤهلة، ويُؤكد عند مراجعة الطلب.'
                    : 'تُراجع طريقة الدفع مع فريق كايرو فولت عند تأكيد الطلب.',
            },
            {
                question: 'إزاي أراجع الضمان والاسترجاع قبل الطلب؟',
                answer: 'توجد شروط الضمان والاسترجاع مكتوبة في صفحات السياسات، ويمكنك مراجعتها قبل تأكيد الطلب.',
            },
            {
                question: `إزاي أقدّر سعة الباور بانك المناسبة قبل الطلب إلى ${governorate.nameAr}؟`,
                answer: 'استخدم الطاقة بالـWh لا رقم mAh وحده: Wh تقريباً = mAh × الجهد الاسمي ÷ 1000، ثم اخصم فاقد التحويل كتقدير. راجع قيمة Wh المكتوبة على الموديل متى كانت متاحة.',
            },
            {
                question: 'هل الشاحن والكابل يغيران سرعة الشحن؟',
                answer: 'نعم، لكن الهاتف هو الذي يحدد ما يقبله. يجب أن تتوافق قدرة الشاحن والبروتوكول والكابل مع الجهاز؛ رقم الواط الأكبر وحده لا يضمن سرعة أعلى.',
            },
        ]
        : [
            {
                question: `How long does delivery to ${governorate.nameEn} take?`,
                answer: `${logistics.delivery_estimate}. This is an estimate; CairoVolt confirms the date after reviewing the order.`,
            },
            {
                question: `How much is shipping to ${governorate.nameEn}?`,
                answer: `Shipping to ${governorate.nameEn} costs ${shippingFee} EGP for orders under ${freeShippingFrom} EGP; orders of ${freeShippingFrom} EGP or more ship free under the shipping policy.`,
            },
            {
                question: `Is cash on delivery available in ${governorate.nameEn}?`,
                answer: logistics.cash_on_delivery
                    ? 'Yes. Cash on delivery is available for eligible orders and is confirmed during order review.'
                    : 'The available payment method is confirmed by CairoVolt when the order is reviewed.',
            },
            {
                question: 'Where can I review warranty and return terms?',
                answer: 'The warranty and return terms are published on the policy pages and can be reviewed before ordering.',
            },
            {
                question: `How do I estimate power-bank capacity before ordering to ${governorate.nameEn}?`,
                answer: 'Use energy in Wh rather than mAh alone: approximate Wh = mAh × nominal voltage ÷ 1,000, then allow for conversion loss as an estimate. Use the model label\'s Wh value when available.',
            },
            {
                question: 'Do the charger and cable affect charging speed?',
                answer: 'Yes, but the device controls what it accepts. Charger output, protocol, and cable must all match the device; a larger wattage label alone does not guarantee a faster result.',
            },
        ];

    let md = isArabic
        ? `# باور بانك وحلول طاقة احتياطية في ${governorate.nameAr}\n\n`
        : `# Power banks and backup-power options in ${governorate.nameEn}\n\n`;
    md += isArabic
        ? `## معلومات الطلب إلى ${governorate.nameAr}\n\n`
        : `## Order information for ${governorate.nameEn}\n\n`;
    md += isArabic
        ? `| البند | القيمة |\n|---|---|\n`
            + `| مدة التوصيل التقديرية | ${logistics.delivery_estimate} |\n`
            + `| رسوم الشحن للطلبات الأقل من ${freeShippingFrom} جنيه | ${shippingFee} جنيه |\n`
            + `| الشحن المجاني | للطلبات من ${freeShippingFrom} جنيه فأكثر |\n`
            + `| الدفع عند الاستلام | ${logistics.cash_on_delivery ? 'متاح' : 'يُراجع'} |\n`
            + `| تأكيد الموعد | بعد المراجعة |\n\n`
        : `| Item | Value |\n|---|---|\n`
            + `| Estimated delivery time | ${logistics.delivery_estimate} |\n`
            + `| Shipping fee for orders under ${freeShippingFrom} EGP | ${shippingFee} EGP |\n`
            + `| Free shipping | Orders of ${freeShippingFrom} EGP or more |\n`
            + `| Cash on delivery | ${logistics.cash_on_delivery ? 'Available' : 'Reviewed'} |\n`
            + `| Date confirmation | After review |\n\n`;
    md += `${logistics.confirmation_note}\n\n`;
    md += isArabic
        ? `الشحن مجاني للطلبات من ${freeShippingFrom} جنيه فأكثر، والتوصيل متاح للعناوين المؤهلة في ${governorate.nameAr} بما يشمل ${cityList} وباقي المناطق.\n\n`
        : `Shipping is free from ${freeShippingFrom} EGP, and delivery covers eligible addresses across ${governorate.nameEn}, including ${cityList}.\n\n`;

    md += isArabic
        ? `## أسئلة التوصيل إلى ${governorate.nameAr}\n\n`
        : `## Delivery questions for ${governorate.nameEn}\n\n`;
    for (const item of questions) {
        md += `### ${item.question}\n\n${item.answer}\n\n`;
    }

    md += isArabic
        ? `## روابط\n\n- سياسة الشحن: ${BASE_URL}${localePrefix}/shipping\n- سياسة الإرجاع: ${BASE_URL}${localePrefix}/return-policy\n- الضمان: ${BASE_URL}${localePrefix}/warranty\n- باور بانك: ${BASE_URL}${localePrefix}/power-banks\n- شواحن: ${BASE_URL}${localePrefix}/chargers\n- كابلات: ${BASE_URL}${localePrefix}/cables\n- سماعات: ${BASE_URL}${localePrefix}/earbuds\n- الصفحة: ${pageUrl}\n`
        : `## Links\n\n- Shipping policy: ${BASE_URL}${localePrefix}/shipping\n- Return policy: ${BASE_URL}${localePrefix}/return-policy\n- Warranty: ${BASE_URL}${localePrefix}/warranty\n- Power banks: ${BASE_URL}${localePrefix}/power-banks\n- Chargers: ${BASE_URL}${localePrefix}/chargers\n- Cables: ${BASE_URL}${localePrefix}/cables\n- Earbuds and speakers: ${BASE_URL}${localePrefix}/earbuds\n- Page: ${pageUrl}\n`;
    return md;
}

// Policy/info pages whose markdown mirrors the published HTML copy.
const KNOWN_PAGE_SLUGS = new Set(['about', 'faq', 'shipping', 'return-policy', 'warranty']);

// Same order as faqCategories in src/app/[locale]/faq/page.tsx.
const FAQ_CATEGORY_KEYS = ['ordering', 'shipping', 'returns', 'warranty', 'products', 'payment'] as const;

function generateKnownPageMarkdown(
    page: string,
    isArabic: boolean,
    localePrefix: string,
): string {
    // messages/*.json is the source the HTML pages render via next-intl.
    const m = (isArabic ? arMessages : enMessages) as typeof enMessages;
    const pageUrl = `${BASE_URL}${localePrefix}/${page}`;

    const contactBlock = isArabic
        ? `## تواصل معنا\n\n- واتساب: +201558245974\n- البريد الإلكتروني: info@cairovolt.com\n- الصفحة: ${pageUrl}\n`
        : `## Contact\n\n- WhatsApp: +201558245974\n- Email: info@cairovolt.com\n- Page: ${pageUrl}\n`;

    if (page === 'shipping') {
        const s = m.Shipping;
        const areas = (['cairo', 'giza', 'alexandria', 'delta', 'upperEgypt', 'redSea'] as const)
            .map(area => `- ${s.deliveryAreas[area]}`)
            .join('\n');
        // The estimate strings are the ones the HTML page renders, derived
        // from the same governorate data (see deliveryBreakdown).
        const d = deliveryBreakdown(isArabic);
        const cairoEstimate = isArabic
            ? `تقدير شائع: ${d.fastestDays}–${d.fastestDays + 1} يوم عمل`
            : `Common estimate: ${d.fastestDays}–${d.fastestDays + 1} business days`;
        const provincesEstimate = isArabic
            ? `تقدير شائع: ${d.businessDays(d.otherRange)}`
            : `Common estimate: ${d.businessDays(d.otherRange)}`;
        const slowestRange = `${d.slowestDays}–${d.slowestDays + 1}`;
        const slowestEstimate = isArabic
            ? `تقدير: ${d.businessDays(slowestRange)}`
            : `Estimate: ${d.businessDays(slowestRange)}`;
        const governorateLines = governorates
            .map(item => {
                const name = isArabic ? item.nameAr : item.nameEn;
                const fee = getShippingFee(item.slug, 0);
                return `- [${name}](${BASE_URL}${localePrefix}/locations/${item.slug}) — ${d.businessDays(`${item.deliveryDays}–${item.deliveryDays + 1}`)} · ${isArabic ? `${fee} جنيه` : `${fee} EGP`}`;
            })
            .join('\n');
        return `# ${s.title}\n\n${isArabic ? 'رسوم الشحن ' : 'Shipping: '}${getStoreShippingSummary(isArabic ? 'ar' : 'en', governorates)}\n\n`
            + `## ${s.deliveryAreas.title}\n\n${s.deliveryAreas.description}\n\n${areas}\n\n`
            + `## ${s.deliveryTime.title}\n\n- ${s.deliveryTime.cairo}: ${cairoEstimate}\n- ${s.deliveryTime.provinces}: ${provincesEstimate}\n- ${d.slowestLabel}: ${slowestEstimate}\n\n`
            + (isArabic
                ? `المدد تقديرية وتُؤكد بعد مراجعة العنوان. المحافظات الأطول في مدة التوصيل (${d.slowestLabel}) تستغرق ${d.businessDays(slowestRange)}.\n\n`
                : `Estimates are confirmed after the address is reviewed. The governorates with the longest estimate (${d.slowestLabel}) take ${d.businessDays(slowestRange)}.\n\n`)
            + `## ${isArabic ? 'التوصيل حسب المحافظة' : 'Delivery by governorate'}\n\n`
            + (isArabic
                ? 'المدة التقديرية ورسوم الشحن للطلبات الأقل من حد الشحن المجاني لكل محافظة.\n\n'
                : 'Estimated delivery time and the shipping fee below the free-shipping threshold for each governorate.\n\n')
            + `${governorateLines}\n\n`
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
            + `## ${r.window.title}\n\n${STANDARD_RETURN_WINDOW_DAYS} ${r.window.days} — ${r.window.description}\n\n`
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
            ? 'هذه سياسة ضمان كايرو فولت للمنتجات المؤهلة: 18 شهرًا لمنتجات انكر وساوندكور، و12 شهرًا لمنتجات جوي روم وJBL، ما لم تعرض صفحة منتج محدد مدة مختلفة. لا تمثل ضمانًا من الشركة المصنّعة إلا إذا ذُكر ذلك صراحةً مع مستند يمكن التحقق منه. صفحة المنتج وتأكيد الطلب هما مرجع المدة المطبقة وقت الشراء.'
            : 'Eligible Anker and Soundcore products carry an 18-month CairoVolt store warranty, while eligible Joyroom and JBL products carry 12 months unless a specific product page states a different duration. This is not a manufacturer-issued warranty unless expressly stated with verifiable documentation. The product page and order confirmation record the terms applicable at purchase.';
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
        const voiceTitle = isArabic ? 'أسئلة الشارع' : 'Common Questions';
        md += `## ${voiceTitle}\n\n`;
        for (const qa of isArabic ? VOICE_FAQS.ar : VOICE_FAQS.en) {
            md += `### ${qa.question}\n\n${qa.answer}\n\n`;
        }
        // Mirrors the "Common solutions" section on the HTML /faq page.
        md += `## ${isArabic ? 'حلول شائعة' : 'Common solutions'}\n\n`;
        for (const solution of solutionsDB) {
            const title = isArabic ? solution.searchQuery.ar : solution.searchQuery.en;
            md += `- [${title}](${BASE_URL}${localePrefix}/solutions/${solution.slug})\n`;
        }
        md += '\n';
        return md + contactBlock;
    }

    // page === 'about'
    const a = m.About;
    const whyUs = (['original', 'warranty', 'prices', 'support'] as const)
        .map(item => `- **${a.whyUs[item].title}** — ${a.whyUs[item].description}`)
        .join('\n');
    const brandNames = isArabic
        ? { anker: 'انكر', joyroom: 'جوي روم', jbl: 'JBL' }
        : { anker: 'Anker', joyroom: 'Joyroom', jbl: 'JBL' };
    return `# ${a.title}\n\n${a.subtitle}\n\n`
        + `## ${a.mission.title}\n\n${a.mission.description}\n\n`
        + `## ${a.relationship.title}\n\n${a.relationship.description}\n\n`
        + `## ${a.whyUs.title}\n\n${whyUs}\n\n`
        + `## ${a.brands.title}\n\n- ${brandNames.anker}: ${a.brands.anker}\n- ${brandNames.joyroom}: ${a.brands.joyroom}\n- ${brandNames.jbl}: ${a.brands.jbl}\n\n`
        + contactBlock;
}

function generateProductMarkdown(
    product: (typeof staticProducts)[number],
    localePrefix: string,
): string {
    const locale: AgentLocale = localePrefix === '/en' ? 'en' : 'ar';
    const isArabic = locale === 'ar';
    const nameEn = plainText(product.translations.en.name);
    const nameAr = localizeArabicBrandNames(plainText(product.translations.ar.name));
    const descEn = plainText(
        product.translations.en.shortDescription || product.translations.en.description,
    );
    const descAr = localizeArabicBrandNames(plainText(
        product.translations.ar.shortDescription || product.translations.ar.description,
    ));
    const primaryName = isArabic ? (nameAr || nameEn) : nameEn;
    const secondaryName = isArabic ? nameEn : nameAr;
    const description = isArabic
        ? (descAr || descEn)
        : (descEn || descAr);
    const productPath = `${localePrefix}/${product.brand.toLowerCase()}/${product.categorySlug}/${product.slug}`;
    const productUrl = `https://cairovolt.com${productPath}`;
    const labSummary = getAgentLabSummary(product.slug, locale, { maxResults: 8 });
    const labBlock = labSummary ? `\n${formatAgentLabMarkdown(labSummary, locale)}\n` : '';

    const fieldsTitle = isArabic ? 'الحقول' : 'Field';
    const valuesTitle = isArabic ? 'القيمة' : 'Value';
    const descHeading = isArabic ? 'الوصف' : 'Description';
    const buyHeading = isArabic ? 'طلب هذا المنتج' : 'Buy This Product';
    const linksHeading = isArabic ? 'روابط' : 'Links';
    const fallbackDesc = isArabic
        ? `${primaryName} مدرج في كتالوج كايرو فولت.`
        : `${primaryName} is listed in the CairoVolt catalog.`;

    return `# ${primaryName}${secondaryName && secondaryName !== primaryName ? ` (${secondaryName})` : ''}

| ${fieldsTitle} | ${valuesTitle} |
|-------|-------|
| Brand | ${product.brand} |
| Category | ${product.categorySlug} |
| Price | ${product.price} EGP |
| In Stock | ${product.stock > 0 ? (isArabic ? 'نعم' : 'Yes') : (isArabic ? 'لا' : 'No')} |
| Shipping | Free above ${FREE_SHIPPING_THRESHOLD.toLocaleString('en-US')} EGP |
| Payment | Cash on Delivery |

## ${descHeading}

${description || fallbackDesc}
${labBlock}
## ${buyHeading}

\`\`\`bash
curl -X POST "https://cairovolt.com/api/v1/checkout" \\
  -H "Content-Type: application/json" \\
  -d '{"slug": "${product.slug}", "quantity": 1, "customerName": "...", "phone": "...", "address": "...", "city": "cairo"}'
\`\`\`

## ${linksHeading}

- [${isArabic ? 'صفحة المنتج' : 'Product Page'}](${productUrl})
- [${isArabic ? 'الكتالوج الكامل' : 'Full Catalog'}](https://cairovolt.com/api/llms/catalog)
- [${isArabic ? 'تصدير المختبر' : 'Lab export'}](https://cairovolt.com/api/lab-data/json)
`;
}
