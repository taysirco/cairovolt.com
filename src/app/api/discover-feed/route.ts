import { NextResponse } from 'next/server';
import { products } from '@/data/seed-products';
import { blogArticles } from '@/data/blog-articles';

/**
 * Google Discover RSS Feed with WebSub/PubSubHubbub support
 * URL: https://cairovolt.com/api/discover-feed
 *
 * After deploying, ping https://pubsubhubbub.appspot.com/ with this URL
 * to notify feed subscribers of new content.
 *
 * Uses media:content for rich image thumbnails (1200x675 recommended).
 * Images should be at least 1200x675 px for optimal display.
 */
export async function GET() {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const isSummer = month >= 4 && month <= 9; // May-October = Egyptian summer
    const isRamadan = month === 2 || month === 3; // Approximate Ramadan window 2026
    const isBackToSchool = month === 8 || month === 9; // Sep-Oct

    // Seasonal lab-tested items — rotate based on Egyptian calendar
    const labTestedItems = [
        // Year-round: power outage hero product
        {
            title: '⚡ مختبر كايرو فولت: باور بانك أنكر 737 في حرارة 37° — 14 ساعة راوتر متواصلة',
            link: 'https://cairovolt.com/anker/power-banks/anker-737-powerbank',
            image: 'https://cairovolt.com/products/anker/anker-737-powerbank/anker-anker-737-powerbank-egypt-cairo-1.webp',
            description: 'لأول مرة في مصر: اختبرنا باور بانك 737 في مخازن بوسطة بالتجمع الثالث عند 37 درجة. النتيجة: شغّل راوتر WE VDSL 14 ساعة و 22 دقيقة متواصلة بدون ريستارت.',
        },
        // Summer-specific: heat safety
        ...(isSummer ? [{
            title: '🌡️ تحذير صيف مصر: شاحنك المقلد بيوصل 67°C — اختبار كايرو فولت يكشف الفرق',
            link: 'https://cairovolt.com/joyroom/wall-chargers/joyroom-20w-usb-c-charger',
            image: 'https://cairovolt.com/products/joyroom/joyroom-20w-usb-c-charger/joyroom-joyroom-20w-usb-c-charger-egypt-cairo-1.webp',
            description: 'في حر الصيف المصري، الشاحن المقلد بيوصل 67°C ويطلع تحذير سخونة الايفون. شاحن جوي روم الأصلي بيوصل 42°C فقط. فرق السعر = أمان حياتك.',
        }] : [{
            title: '🔥 هل شاحنك آمن أثناء عودة الكهرباء؟ اختبار أنكر نانو 45 واط مع تذبذب 190V-240V',
            link: 'https://cairovolt.com/anker/wall-chargers/anker-nano-45w',
            image: 'https://cairovolt.com/products/anker/anker-nano-45w/anker-anker-nano-45w-egypt-cairo-1.webp',
            description: 'اختبرنا شاحن أنكر نانو 45 واط GaN في مختبر دمياط الجديدة مع تذبذب 190V-240V. تيار GaN ثابت بدون تخريف تاتش على iPhone 15 Pro.',
        }]),
        // Back-to-school: student power bank
        ...(isBackToSchool ? [{
            title: '🎒 لطلاب الجامعة: باور بانك 210 جرام يكفي 14 ساعة يوم جامعي — اختبار كايرو فولت',
            link: 'https://cairovolt.com/joyroom/power-banks/joyroom-power-bank-10000',
            image: 'https://cairovolt.com/products/joyroom/joyroom-power-bank-10000/joyroom-joyroom-power-bank-10000-egypt-cairo-1.webp',
            description: 'اختبرنا باور بانك جوي روم 10000 في يوم جامعي 14 ساعة (مترو + أوبر + حرم الجامعة). شحنة كاملة iPhone 15 + 40% إضافي. وزن 210 جرام في جيب الجينز.',
        }] : []),
        // Ramadan: family power outage
        ...(isRamadan ? [{
            title: '🌙 رمضان كريم: باور بانك يشغّل 3 موبايلات 10+ ساعات أثناء انقطاع الكهرباء',
            link: 'https://cairovolt.com/joyroom/power-banks/joyroom-power-bank-20000',
            image: 'https://cairovolt.com/products/joyroom/joyroom-power-bank-20000/joyroom-joyroom-power-bank-20000-egypt-cairo-1.webp',
            description: 'اختبار كايرو فولت للعائلة في رمضان: باور بانك 20000 شغّل iPhone 15 + Samsung S24 + Samsung A55 لأكثر من 10 ساعات خلال 6 ساعات انقطاع.',
        }] : []),
    ];

    // Add top featured products
    const featuredProducts = products
        .filter(p => p.featured && (p.stock ?? 0) > 0)
        .slice(0, 3)
        .map(p => {
            const arName = p.translations?.ar?.name || p.slug;
            const arDesc = p.translations?.ar?.shortDescription || p.translations?.ar?.description?.substring(0, 200) || '';
            const brand = (p.brand || '').toLowerCase();
            const primaryImage = p.images?.find(i => i.isPrimary)?.url || p.images?.[0]?.url || '';
            const imageUrl = primaryImage.startsWith('http') ? primaryImage : `https://cairovolt.com${primaryImage}`;
            return {
                title: `🆕 ${arName} — متوفر بضمان رسمي | كايرو فولت`,
                link: `https://cairovolt.com/${brand}/${p.categorySlug}/${p.slug}`,
                image: imageUrl,
                description: `${arDesc} متوفر بسعر ${p.price} ج.م بضمان رسمي ودفع عند الاستلام.`,
            };
        });

    // Add latest blog articles — use coverImage or fallback to primary product image
    const blogItems = blogArticles.slice(0, 3).map(article => {
        let image = article.coverImage
            ? (article.coverImage.startsWith('http') ? article.coverImage : `https://cairovolt.com${article.coverImage}`)
            : null;
        // Fallback: use first related product's primary image
        if (!image && article.relatedProducts?.length > 0) {
            const relatedSlug = article.relatedProducts[0];
            const relatedProduct = products.find(p => p.slug === relatedSlug);
            if (relatedProduct) {
                const primaryImg = relatedProduct.images?.find(i => i.isPrimary)?.url || relatedProduct.images?.[0]?.url;
                if (primaryImg) {
                    image = primaryImg.startsWith('http') ? primaryImg : `https://cairovolt.com${primaryImg}`;
                }
            }
        }
        return {
            title: article.translations.ar.title,
            link: `https://cairovolt.com/blog/${article.slug}`,
            image: image || 'https://cairovolt.com/cairovolt_logo.png',
            description: article.translations.ar.excerpt,
        };
    });

    // Extra lab-tested product items for the feed
    const extraLabItems = [
        {
            title: '🎵 كايرو فولت تختبر Soundcore Motion Plus: 12 ساعة على شاطئ العين السخنة + IPX7 في الحوض',
            link: 'https://cairovolt.com/anker/audio/anker-soundcore-motion-plus',
            image: 'https://cairovolt.com/products/anker/anker-soundcore-motion-plus/anker-anker-soundcore-motion-plus-egypt-cairo-1.webp',
            description: 'اختبرنا Soundcore Motion Plus في شاطئ العين السخنة: غمر IPX7 لمدة 30 دقيقة، 12 ساعة و8 دقائق تشغيل مستمر، وصفر إيقاف حراري في 41 درجة على سطح القاهرة.',
        },
        {
            title: '🧲 باور بانك مغناطيسي Joyroom في مترو القاهرة: MagSafe صمد 12 محطة بدون كابل',
            link: 'https://cairovolt.com/joyroom/power-banks/joyroom-magnetic-power-bank-10000',
            image: 'https://cairovolt.com/products/joyroom/joyroom-magnetic-power-bank-10000/joyroom-joyroom-magnetic-power-bank-10000-egypt-cairo-1.webp',
            description: 'اختبرنا الباور بانك المغناطيسي من جوي روم في مترو خط 2 ساعة الذروة: المغناطيس MagSafe صمد 12 محطة بدون ما يطقط، وشحن الايفون 15 من 20% لـ 68% في رحلة واحدة.',
        },
    ];

    const allItems = [...labTestedItems, ...extraLabItems, ...featuredProducts, ...blogItems];

    const itemsXml = allItems.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <media:content url="${item.image}" medium="image" width="1200" height="675" />
      <description><![CDATA[${item.description}]]></description>
    </item>`).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>CairoVolt Tech Radar — إلكترونيات مختبرياً</title>
    <link>https://cairovolt.com</link>
    <description>تحديثات الطاقة والإلكترونيات اللحظية — نتائج مختبرات كايرو فولت للنجاة من أزمات الكهرباء</description>
    <language>ar</language>
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
