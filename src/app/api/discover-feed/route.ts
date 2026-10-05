import { NextResponse } from 'next/server';
import { blogIndex, isIndexEntryLive } from '@/data/blog-index';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';

function xmlEscape(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function cdataEscape(value: string): string {
    return value.replace(/]]>/g, ']]]]><![CDATA[>');
}

const FEED_BASE_URL = 'https://cairovolt.com/api/discover-feed';

/**
 * RSS feed for recently published CairoVolt guides, with WebSub support.
 *   Arabic (default): https://cairovolt.com/api/discover-feed
 *   English:          https://cairovolt.com/api/discover-feed?locale=en
 *
 * Each locale's feed is advertised with <link rel="alternate"
 * type="application/rss+xml"> on that locale's blog pages, and
 * scripts/reveal-blog.mjs pings the WebSub hub for both URLs when an article
 * goes live.
 */
export async function GET(request: Request) {
    let isEnglish = false;
    try {
        isEnglish = new URL(request.url).searchParams.get('locale') === 'en';
    } catch {
        isEnglish = false;
    }
    const locale = isEnglish ? 'en' : 'ar';
    const selfUrl = isEnglish ? `${FEED_BASE_URL}?locale=en` : FEED_BASE_URL;

    const liveNewestFirst = blogIndex
        .filter(article => isIndexEntryLive(article))
        .sort((a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate))
        .slice(0, 10);

    const items = liveNewestFirst.map(article => {
        const image = article.coverImage
            ? (article.coverImage.startsWith('http') ? article.coverImage : `https://cairovolt.com${article.coverImage}`)
            : 'https://cairovolt.com/cairovolt_logo.webp';
        const link = isEnglish
            ? `https://cairovolt.com/en/blog/${article.slug}`
            : `https://cairovolt.com/blog/${article.slug}`;
        const trans = article.translations[locale];
        return {
            title: isEnglish ? trans.title : localizeArabicBrandNames(trans.title),
            link,
            image,
            description: isEnglish ? trans.excerpt : localizeArabicBrandNames(trans.excerpt),
            publishedAt: new Date(article.publishDate).toUTCString(),
        };
    });

    // lastBuildDate = the newest item's pubDate (not "now"), so the channel
    // only claims a change when a guide actually went live.
    const newestTimestamp = liveNewestFirst.length > 0 ? Date.parse(liveNewestFirst[0].publishDate) : NaN;
    const lastBuildDate = Number.isFinite(newestTimestamp)
        ? `\n    <lastBuildDate>${new Date(newestTimestamp).toUTCString()}</lastBuildDate>`
        : '';

    const channel = isEnglish
        ? {
            title: 'CairoVolt — Latest guides',
            link: 'https://cairovolt.com/en/blog',
            description: 'The latest mobile-accessory buying and how-to guides published on CairoVolt.',
            language: 'en-EG',
        }
        : {
            title: 'كايرو فولت — أحدث الأدلة',
            link: 'https://cairovolt.com',
            description: 'أحدث أدلة شراء واستخدام إكسسوارات الموبايل المنشورة على كايرو فولت.',
            language: 'ar-EG',
        };

    const itemsXml = items.map(item => `
    <item>
      <title><![CDATA[${cdataEscape(item.title)}]]></title>
      <link>${xmlEscape(item.link)}</link>
      <guid isPermaLink="true">${xmlEscape(item.link)}</guid>
      <pubDate>${item.publishedAt}</pubDate>
      <media:content url="${xmlEscape(item.image)}" medium="image" />
      <description><![CDATA[${cdataEscape(item.description)}]]></description>
    </item>`).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${xmlEscape(channel.title)}</title>
    <link>${xmlEscape(channel.link)}</link>
    <description>${xmlEscape(channel.description)}</description>
    <language>${channel.language}</language>${lastBuildDate}
    <atom:link href="${xmlEscape(selfUrl)}" rel="self" type="application/rss+xml" />
    <atom:link rel="hub" href="https://pubsubhubbub.appspot.com/" />
${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
