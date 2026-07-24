/**
 * Rich markdown for brand / category / lab / solutions hubs (AI agents).
 * Mirrors published HTML copy + live catalog + lab index — no invented claims.
 */
import { brandData } from '@/data/brand-data';
import { categoryContent } from '@/data/category-content';
import { getGenericCategory } from '@/data/generic-categories';
import { solutionsDB, getSolutionBySlug, getSolutionByIdOrSlug } from '@/data/solutions-data';
import { soundcoreHub } from '@/data/soundcore-hub';
import { staticProducts, getProductsByBrand, getProductsByBrandAndCategory } from '@/lib/static-products';
import {
    getMerchantProductUrl,
    MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS,
} from '@/lib/merchant-product-data';
import {
    getBrandDisplayName,
    localizeArabicBrandNames,
} from '@/lib/arabic-brand-names';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/shipping';
import { getAgentLabSummary, type AgentLocale } from '@/lib/agent-lab-export';
import { formatLabIndexMarkdown, getLabIndexRows } from '@/lib/lab-index';

const BASE_URL = 'https://cairovolt.com';

function clean(value: string | undefined): string {
    let text = (value || '').replace(/<[^>]+>/g, ' ');
    text = text
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&(?:#39|apos);/gi, "'")
        .replace(/&ndash;/gi, '–')
        .replace(/&mdash;/gi, '—')
        .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(parseInt(dec, 10)));
    return text.replace(/\s+/g, ' ').trim();
}

function isAgentCatalogProduct(product: (typeof staticProducts)[number]): boolean {
    return (
        product.status === 'active'
        && !MACHINE_CATALOG_EXCLUDED_PRODUCT_SLUGS.has(product.slug)
    );
}

function productLine(
    product: (typeof staticProducts)[number],
    locale: AgentLocale,
): string {
    const isAr = locale === 'ar';
    const name = isAr
        ? localizeArabicBrandNames(product.translations.ar.name)
        : product.translations.en.name;
    const url = getMerchantProductUrl(product, locale);
    const lab = getAgentLabSummary(product.slug, locale);
    const stock = product.stock > 0
        ? (isAr ? 'متوفر' : 'in stock')
        : (isAr ? 'غير متوفر' : 'out of stock');
    let line = `- [${name}](${url}) — ${product.price} EGP · ${stock}`;
    if (product.sku) line += ` · SKU ${product.sku}`;
    if (lab?.verdict) {
        const v = lab.verdict.replace(/\s+/g, ' ').trim().slice(0, 120);
        line += isAr ? ` · مختبر: ${v}` : ` · Lab: ${v}`;
    }
    return line;
}

function catalogFooter(locale: AgentLocale, localePrefix: string): string {
    const isAr = locale === 'ar';
    return isAr
        ? [
            '## روابط للوكلاء',
            '',
            `- الكتالوج (ماركداون): ${BASE_URL}/api/llms/catalog`,
            `- تصدير المختبر JSON: ${BASE_URL}/api/lab-data/json`,
            `- تصدير المختبر CSV: ${BASE_URL}/api/lab-data/csv`,
            `- صفحة المختبر: ${BASE_URL}${localePrefix}/lab`,
            `- تعليمات الذكاء الاصطناعي: ${BASE_URL}/llms.txt`,
            `- شحن مجاني فوق ${FREE_SHIPPING_THRESHOLD.toLocaleString('en-US')} جنيه`,
            '',
        ].join('\n')
        : [
            '## Agent links',
            '',
            `- Catalog (markdown): ${BASE_URL}/api/llms/catalog`,
            `- Lab export JSON: ${BASE_URL}/api/lab-data/json`,
            `- Lab export CSV: ${BASE_URL}/api/lab-data/csv`,
            `- Lab page: ${BASE_URL}${localePrefix}/lab`,
            `- AI instructions: ${BASE_URL}/llms.txt`,
            `- Free shipping above ${FREE_SHIPPING_THRESHOLD.toLocaleString('en-US')} EGP`,
            '',
        ].join('\n');
}

function activeBrandProducts(brand: string) {
    return getProductsByBrand(brand).filter(isAgentCatalogProduct);
}

function benchCoverageLine(
    products: Array<(typeof staticProducts)[number]>,
    locale: AgentLocale,
): string {
    const isAr = locale === 'ar';
    let withBench = 0;
    for (const p of products) {
        if (getAgentLabSummary(p.slug, 'en')?.hasBench) withBench += 1;
    }
    return isAr
        ? `> تغطية المختبر المنشورة: **${withBench}** من **${products.length}** منتجًا في هذه القائمة.`
        : `> Published bench coverage: **${withBench}** of **${products.length}** products in this list.`;
}

function appendFaqBlock(
    title: string,
    items: Array<{ question: string; answer: string }> | undefined,
): string {
    if (!items?.length) return '';
    let md = `## ${title}\n\n`;
    for (const item of items) {
        md += `### ${clean(item.question)}\n\n${clean(item.answer)}\n\n`;
    }
    return md;
}

export function generateBrandHubMarkdown(
    brandSlug: string,
    locale: AgentLocale,
    localePrefix: string,
): string | null {
    if (brandSlug === 'soundcore') {
        return generateSoundcoreHubMarkdown(locale, localePrefix);
    }
    const brand = brandData[brandSlug];
    if (!brand) return null;
    const isAr = locale === 'ar';
    const display = getBrandDisplayName(brandSlug, locale);
    const meta = brand.metadata[locale];
    const url = `${BASE_URL}${localePrefix}/${brandSlug}`;
    const products = activeBrandProducts(brandSlug)
        .sort((a, b) => a.price - b.price);

    let md = `# ${display}\n\n`;
    md += `${clean(meta.description)}\n\n`;
    md += `${isAr ? 'الصفحة' : 'Page'}: ${url}\n\n`;

    if (brand.quickAnswer?.[locale]) {
        md += `## ${isAr ? 'ملخص سريع' : 'Quick answer'}\n\n> ${clean(brand.quickAnswer[locale])}\n\n`;
    }

    md += `## ${clean(brand.hero.badge[locale])}\n\n`;
    md += `${clean(brand.hero.description[locale])}\n\n`;
    for (const f of brand.hero.features) {
        md += `- ${clean(f[locale])}\n`;
    }
    md += '\n';

    if (brand.categories.length) {
        md += `## ${isAr ? 'الأقسام' : 'Categories'}\n\n`;
        for (const cat of brand.categories) {
            const href = cat.href.startsWith('http')
                ? cat.href
                : `${BASE_URL}${localePrefix}${cat.href.startsWith('/') ? cat.href : `/${cat.href}`}`;
            md += `- **[${clean(cat.title[locale])}](${href})** — ${clean(cat.description[locale])}\n`;
        }
        md += '\n';
    }

    if (brand.whySection?.items?.length) {
        md += `## ${clean(brand.whySection.title[locale])}\n\n`;
        for (const item of brand.whySection.items) {
            md += `### ${clean(item.title[locale])}\n\n${clean(item.description[locale])}\n\n`;
        }
    }

    if (brand.aboutSection) {
        md += `## ${clean(brand.aboutSection.title[locale])}\n\n`;
        md += `${clean(brand.aboutSection.history[locale])}\n\n`;
        if (brand.aboutSection.technologies?.length) {
            md += `### ${isAr ? 'تقنيات حسب الموديل' : 'Technologies by model'}\n\n`;
            for (const tech of brand.aboutSection.technologies) {
                md += `- **${clean(tech.name)}** — ${clean(tech.description[locale])}\n`;
            }
            md += '\n';
        }
    }

    const faq = brand.faq?.[locale];
    if (faq?.length) {
        md += `## ${isAr ? 'أسئلة شائعة' : 'FAQ'}\n\n`;
        for (const item of faq) {
            md += `### ${clean(item.question)}\n\n${clean(item.answer)}\n\n`;
        }
    }

    md += `## ${isAr ? 'منتجات في الكتالوج' : 'Catalog products'} (${products.length})\n\n`;
    md += `${benchCoverageLine(products, locale)}\n\n`;
    for (const p of products) md += `${productLine(p, locale)}\n`;
    md += '\n';
    md += catalogFooter(locale, localePrefix);
    return md;
}

export function generateSoundcoreHubMarkdown(
    locale: AgentLocale,
    localePrefix: string,
): string {
    const isAr = locale === 'ar';
    const url = `${BASE_URL}${localePrefix}/soundcore`;
    const hub = soundcoreHub;
    const products = activeBrandProducts('soundcore').sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.price - b.price;
    });

    const quickAnswer = isAr
        ? 'ساوندكور علامة صوتيات ضمن عائلة انكر. تنقسم المنتجات هنا إلى سماعات شخصية ومكبرات صوت، لكن تقنيات ANC وHearID وLDAC وBassUp وPartyCast وتصنيفات IP ليست موجودة بالمستوى نفسه في كل موديل. صفحة المنتج هي المرجع للمواصفات والتوافق.'
        : 'Soundcore is an audio brand in the Anker family. This catalogue separates personal audio from speakers, but ANC, HearID, LDAC, BassUp, PartyCast, and IP ratings are not shared equally by every model. The product page is the specification and compatibility reference.';

    const faq = isAr
        ? [
            { question: 'ما علاقة ساوندكور بانكر؟', answer: 'ساوندكور علامة متخصصة في الصوتيات ضمن عائلة انكر. يعرض كايرو فولت منتجاتها في قسم السماعات الشخصية وقسم مكبرات الصوت.' },
            { question: 'كيف أختار بين أقسام ساوندكور؟', answer: 'اختر قسم audio للايربودز والهيدفون، وقسم speakers لمكبرات الصوت المحمولة. راجع صفحة المنتج للتأكد من المواصفات والتوافق والتوافر.' },
            { question: 'ما مدة ضمان كايرو فولت على منتجات ساوندكور؟', answer: 'تختلف مدة الضمان وأهليته حسب المنتج. صفحة كل منتج هي المرجع لشروط ضمان كايرو فولت المكتوبة وقت الطلب.' },
            { question: 'هل تطبيق ساوندكور يثبت أصالة المنتج؟', answer: 'توافق المنتج مع التطبيق ميزة تشغيلية وليس شهادة مستقلة من الشركة المصنّعة لإثبات الأصالة. راجع بيانات الموديل والفاتورة وأدوات الشركة المصنّعة إن وُجدت.' },
        ]
        : [
            { question: 'How are Soundcore and Anker related?', answer: 'Soundcore is an audio brand in the Anker family. CairoVolt groups its products into personal-audio and Bluetooth-speaker sections.' },
            { question: 'Which Soundcore category should I choose?', answer: 'Use the audio section for earbuds and headphones, and the speakers section for portable speakers. Check each product page for specifications, compatibility, and availability.' },
            { question: 'How long is the CairoVolt warranty on Soundcore products?', answer: 'Warranty eligibility and duration vary by product. The product page is the source for the written CairoVolt warranty terms at the time of ordering.' },
            { question: 'Does the Soundcore app prove that a product is authentic?', answer: 'App compatibility is an operating feature, not an independent manufacturer authenticity certificate. Check the model details, invoice, and any manufacturer verification tools that are available.' },
        ];

    let md = isAr
        ? `# ساوندكور من انكر — مصر\n\n`
        : `# Soundcore by Anker — Egypt\n\n`;
    md += isAr
        ? `تصفح ايربودز وهيدفون وسبيكرات ساوندكور، وقارن ANC والتطبيق وEQ والكودك والبطارية حسب الموديل.\n\n`
        : `Browse Soundcore earbuds, headphones, and speakers. Compare ANC, app/EQ, codecs, and battery by model.\n\n`;
    md += `${isAr ? 'الصفحة' : 'Page'}: ${url}\n\n`;
    md += `## ${isAr ? 'ملخص سريع' : 'Quick answer'}\n\n> ${quickAnswer}\n\n`;
    md += `## ${isAr ? 'ملاحظة التقنيات' : 'Technology note'}\n\n${clean(hub.technologyNote[locale])}\n\n`;

    md += `## ${isAr ? 'الأقسام' : 'Categories'}\n\n`;
    for (const cat of hub.categories) {
        const href = `${BASE_URL}${localePrefix}${cat.href}`;
        md += `- **[${clean(cat.title[locale])}](${href})** — ${clean(cat.description[locale])}\n`;
    }
    md += '\n';

    if (hub.technologyGlossary?.length) {
        md += `## ${isAr ? 'قاموس التقنيات' : 'Technology glossary'}\n\n`;
        for (const item of hub.technologyGlossary) {
            md += `### ${clean(item.name[locale])}\n\n`;
            md += `${clean(item.description[locale])}\n\n`;
            md += `_${clean(item.modelExamples[locale])}_\n\n`;
        }
    }

    md += appendFaqBlock(isAr ? 'أسئلة شائعة' : 'FAQ', faq);

    md += `## ${isAr ? 'منتجات في الكتالوج' : 'Catalog products'} (${products.length})\n\n`;
    md += `${benchCoverageLine(products, locale)}\n\n`;
    for (const p of products) md += `${productLine(p, locale)}\n`;
    md += '\n';
    md += catalogFooter(locale, localePrefix);
    return md;
}

export function generateBrandCategoryMarkdown(
    brandSlug: string,
    categorySlug: string,
    locale: AgentLocale,
    localePrefix: string,
): string | null {
    const content = categoryContent[brandSlug]?.[categorySlug];
    if (!content) return null;
    const isAr = locale === 'ar';
    const page = content.pageContent[locale];
    const meta = content.metadata[locale];
    const url = `${BASE_URL}${localePrefix}/${brandSlug}/${categorySlug}`;
    const products = getProductsByBrandAndCategory(brandSlug, categorySlug)
        .filter(isAgentCatalogProduct)
        .sort((a, b) => a.price - b.price);

    let md = `# ${clean(page.title)}\n\n`;
    md += `${clean(page.subtitle)}\n\n`;
    md += `${clean(page.description || meta.description)}\n\n`;
    md += `${isAr ? 'الصفحة' : 'Page'}: ${url}\n\n`;

    const deep = content.powerBankData || content.soundcoreData;
    if (deep) {
        md += `## ${clean(deep.title[locale])}\n\n`;
        md += `**${clean(deep.tagline[locale])}**\n\n`;
        md += `${clean(deep.history[locale])}\n\n`;
        if (deep.technologies?.length) {
            md += `### ${isAr ? 'تقنيات مذكورة حسب الموديل' : 'Technologies (model-specific)'}\n\n`;
            for (const tech of deep.technologies.slice(0, 8)) {
                md += `- **${clean(tech.name)}** — ${clean(tech.description[locale])}\n`;
            }
            md += '\n';
        }
    }

    if (page.buyingGuide?.length) {
        md += `## ${isAr ? 'دليل الشراء' : 'Buying guide'}\n\n`;
        for (const section of page.buyingGuide) {
            md += `### ${clean(section.title)}\n\n${clean(section.content)}\n\n`;
        }
    }

    md += appendFaqBlock(isAr ? 'أسئلة شائعة' : 'FAQ', page.faq);
    md += appendFaqBlock(
        isAr ? 'أسئلة باور بانك' : 'Power bank FAQ',
        content.powerBankData?.faq?.[locale],
    );
    md += appendFaqBlock(
        isAr ? 'أسئلة ساوندكور' : 'Soundcore FAQ',
        content.soundcoreData?.faq?.[locale],
    );

    md += `## ${isAr ? 'المنتجات' : 'Products'} (${products.length})\n\n`;
    md += `${benchCoverageLine(products, locale)}\n\n`;
    for (const p of products) md += `${productLine(p, locale)}\n`;
    md += '\n';
    md += catalogFooter(locale, localePrefix);
    return md;
}

export function generateGenericCategoryMarkdown(
    categorySlug: string,
    locale: AgentLocale,
    localePrefix: string,
): string | null {
    const data = getGenericCategory(categorySlug);
    if (!data) return null;
    const isAr = locale === 'ar';
    const page = data.pageContent[locale];
    const meta = data.metadata[locale];
    const faq = data.faq[locale];
    const url = `${BASE_URL}${localePrefix}/${categorySlug}`;

    const products = data.brandCategories
        .flatMap(bc =>
            staticProducts.filter(
                p =>
                    isAgentCatalogProduct(p)
                    && p.brand.toLowerCase() === bc.brand.toLowerCase()
                    && p.categorySlug === bc.categorySlug,
            ),
        )
        .sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return a.price - b.price;
        });

    let md = `# ${clean(page.title)}\n\n`;
    md += `${clean(page.subtitle || '')}\n\n`;
    md += `${clean(page.intro || meta.description)}\n\n`;
    md += `${isAr ? 'الصفحة' : 'Page'}: ${url}\n\n`;

    if (page.buyingTips?.length) {
        md += `## ${isAr ? 'نصائح الشراء' : 'Buying tips'}\n\n`;
        for (const tip of page.buyingTips) md += `- ${clean(tip)}\n`;
        md += '\n';
    }

    if (faq?.length) {
        md += `## ${isAr ? 'أسئلة شائعة' : 'FAQ'}\n\n`;
        for (const item of faq) {
            md += `### ${clean(item.question)}\n\n${clean(item.answer)}\n\n`;
        }
    }

    md += `## ${isAr ? 'المنتجات' : 'Products'} (${products.length})\n\n`;
    md += `${benchCoverageLine(products, locale)}\n\n`;
    for (const p of products) md += `${productLine(p, locale)}\n`;
    md += '\n';
    md += catalogFooter(locale, localePrefix);
    return md;
}

export function generateLabHubMarkdown(
    locale: AgentLocale,
    localePrefix: string,
): string {
    const isAr = locale === 'ar';
    const url = `${BASE_URL}${localePrefix}/lab`;
    const rows = getLabIndexRows();

    let md = isAr
        ? `# مختبر كايرو فولت — فهرس القياسات\n\n`
        : `# CairoVolt Lab — measured index\n\n`;

    md += isAr
        ? `مركز المواصفات والقياسات المنشورة لكايرو فولت. الحسابات التقديرية موضحة بفرضياتها، وتقارير المختبر تأتي من أوراق benchTest الفعلية فقط.\n\n`
        : `CairoVolt specifications and published measurements hub. Estimates disclose assumptions; bench rows come only from real benchTest sheets.\n\n`;
    md += `${isAr ? 'الصفحة' : 'Page'}: ${url}\n\n`;

    md += formatLabIndexMarkdown(locale, rows);
    md += '\n\n';

    md += isAr ? `## المنهجية\n\n` : `## Methodology\n\n`;
    if (isAr) {
        md += `- **المصدر أولاً:** رقم الموديل والمواصفات المنشورة، ثم مطابقة العبوة وصفحة المنتج.\n`;
        md += `- **الحساب ≠ القياس:** نتائج mAh/Wh التقديرية تُعرض مع المعادلة والافتراضات.\n`;
        md += `- **الموديل قبل العلامة:** PD وPPS وGaN وANC وLDAC ميزات موديل وليست عامة لكل العلامة.\n\n`;
    } else {
        md += `- **Source first:** model number and manufacturer specs, then packaging and product page.\n`;
        md += `- **Calculations ≠ measurements:** mAh/Wh estimates show formulas and assumptions.\n`;
        md += `- **Model before brand:** PD, PPS, GaN, ANC, LDAC are model-specific.\n\n`;
    }

    md += isAr
        ? `## ملخص سريع\n\n- منتجات بتقارير مقاسة: ${rows.length}\n- تصدير الآلة: ${BASE_URL}/api/lab-data/json\n- CSV: ${BASE_URL}/api/lab-data/csv\n\n`
        : `## Snapshot\n\n- Bench-covered products: ${rows.length}\n- Machine export: ${BASE_URL}/api/lab-data/json\n- CSV: ${BASE_URL}/api/lab-data/csv\n\n`;

    md += catalogFooter(locale, localePrefix);
    return md;
}

export function generateSolutionsListingMarkdown(
    locale: AgentLocale,
    localePrefix: string,
): string {
    const isAr = locale === 'ar';
    let md = isAr ? `# حلول كايرو فولت\n\n` : `# CairoVolt Solutions\n\n`;
    md += isAr
        ? `صفحات حل مشكلة → تحليل هندسي → منتجات موصى بها من الكتالوج.\n\n`
        : `Problem → engineering answer → recommended catalog products.\n\n`;

    for (const s of solutionsDB) {
        const title = s.searchQuery[locale];
        const href = `${BASE_URL}${localePrefix}/solutions/${s.slug}`;
        md += `- [${clean(title)}](${href})\n`;
    }
    md += '\n';
    md += catalogFooter(locale, localePrefix);
    return md;
}

export function generateSolutionMarkdown(
    slug: string,
    locale: AgentLocale,
    localePrefix: string,
): string | null {
    const solution = getSolutionBySlug(slug);
    if (!solution) return null;
    const isAr = locale === 'ar';
    const url = `${BASE_URL}${localePrefix}/solutions/${slug}`;

    const products = solution.recommendedProductSlugs
        .map(s => staticProducts.find(p => p.slug === s && isAgentCatalogProduct(p)))
        .filter((p): p is NonNullable<typeof p> => Boolean(p));
    const missingSlugs = solution.recommendedProductSlugs.filter(
        s => !staticProducts.some(p => p.slug === s && isAgentCatalogProduct(p)),
    );

    let md = `# ${clean(solution.searchQuery[locale])}\n\n`;
    md += `${isAr ? 'الصفحة' : 'Page'}: ${url}\n\n`;
    md += `## ${isAr ? 'المشكلة' : 'Problem'}\n\n${clean(solution.problemStatement[locale])}\n\n`;
    md += `## ${isAr ? 'التحليل الهندسي' : 'Engineering explanation'}\n\n${clean(solution.engineeringExplanation[locale])}\n\n`;

    if (solution.steps?.[locale]?.length) {
        md += `## ${isAr ? 'خطوات عملية' : 'Practical steps'}\n\n`;
        solution.steps[locale].forEach((step, i) => {
            md += `${i + 1}. ${clean(step)}\n`;
        });
        md += '\n';
    }

    md += `## ${isAr ? 'منتجات موصى بها' : 'Recommended products'}\n\n`;
    if (!products.length) {
        md += isAr
            ? '_لا توجد منتجات نشطة مطابقة في الكتالوج الحالي._\n\n'
            : '_No matching active catalog products at the moment._\n\n';
    } else {
        for (const p of products) md += `${productLine(p, locale)}\n`;
        md += '\n';
        md += `${benchCoverageLine(products, locale)}\n\n`;
    }
    if (missingSlugs.length) {
        md += isAr
            ? `> ملاحظة فهرسة: هذه الـ slugs مذكورة في بيانات الحل لكنها غير نشطة/غير موجودة في الكتالوج الآن: ${missingSlugs.join(', ')}\n\n`
            : `> Catalog note: these solution slugs are referenced but not active/present in the live catalog: ${missingSlugs.join(', ')}\n\n`;
    }

    if (solution.faqs?.length) {
        md += `## ${isAr ? 'أسئلة شائعة' : 'FAQ'}\n\n`;
        for (const faq of solution.faqs) {
            md += `### ${clean(faq.question[locale])}\n\n${clean(faq.answer[locale])}\n\n`;
        }
    }

    if (solution.relatedSolutions.length) {
        const relatedLinks: string[] = [];
        for (const rel of solution.relatedSolutions) {
            const related = getSolutionByIdOrSlug(rel);
            if (!related) continue;
            relatedLinks.push(
                `- [${clean(related.searchQuery[locale])}](${BASE_URL}${localePrefix}/solutions/${related.slug})`,
            );
        }
        if (relatedLinks.length) {
            md += `## ${isAr ? 'حلول ذات صلة' : 'Related solutions'}\n\n`;
            md += `${relatedLinks.join('\n')}\n\n`;
        }
    }

    md += catalogFooter(locale, localePrefix);
    return md;
}
