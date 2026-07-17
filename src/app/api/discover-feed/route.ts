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

/**
 * RSS feed for recently published CairoVolt guides, with WebSub support.
 * URL: https://cairovolt.com/api/discover-feed
 */
export async function GET() {
    const items = blogIndex
        .filter(article => isIndexEntryLive(article))
        .sort((a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate))
        .slice(0, 10)
        .map(article => {
            const image = article.coverImage
                ? (article.coverImage.startsWith('http') ? article.coverImage : `https://cairovolt.com${article.coverImage}`)
                : 'https://cairovolt.com/cairovolt_logo.webp';
            const link = `https://cairovolt.com/blog/${article.slug}`;
            return {
                title: localizeArabicBrandNames(article.translations.ar.title),
                link,
                image,
                description: localizeArabicBrandNames(article.translations.ar.excerpt),
                publishedAt: new Date(article.publishDate).toUTCString(),
            };
        });

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
    <title>كايرو فولت — أحدث الأدلة</title>
    <link>https://cairovolt.com</link>
    <description>أحدث أدلة شراء واستخدام إكسسوارات الموبايل المنشورة على كايرو فولت.</description>
    <language>ar-EG</language>
    <atom:link href="https://cairovolt.com/api/discover-feed" rel="self" type="application/rss+xml" />
    <atom:link rel="hub" href="https://pubsubhubbub.appspot.com/" />
${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
