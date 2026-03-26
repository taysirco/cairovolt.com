// Lab test data for: anker-737-powerbank
import type { ProductLabData } from './_shared';
import { EXPERTS } from './_shared';

export const anker_737_powerbank_lab: ProductLabData = {
        labTests: [
            {
                scenario: {
                    en: 'Power outage survival — WE VDSL Router + Dell XPS laptop during Egyptian load-shedding',
                    ar: 'سيناريو تخفيف الأحمال — تشغيل راوتر WE VDSL + لابتوب ديل XPS أثناء انقطاع الكهرباء بالتجمع',
                },
                result: {
                    en: 'Router ran for 14 hours 22 minutes continuously. No restart on power switch (Zero-Transfer Time). Max temperature: 41°C thanks to ActiveShield 2.0 chip.',
                    ar: 'الراوتر اشتغل 14 ساعة و22 دقيقة متواصلة. ما عملش ريستارت وقت التبديل (Zero-Transfer Time). أقصى حرارة: 41 درجة بفضل شريحة ActiveShield 2.0.',
                },
                conditions: {
                    en: 'Room temperature: 37°C, New Cairo 3 warehouse, August 2025',
                    ar: 'درجة حرارة الغرفة: 37 مئوية، مخزن التجمع الثالث، أغسطس 2025',
                },
                expertName: EXPERTS.POWER.name,
                expertProfileUrl: EXPERTS.POWER.profileUrl,
                expertTitle: { en: EXPERTS.POWER.titleEn, ar: EXPERTS.POWER.titleAr },
            },
        ],
        voiceFaqAr: [
            {
                question: 'هو باور بانك أنكر 737 بيشغل راوتر WE لما النور يقطع؟ وهل بيفصل والكهربا بترجع؟',
                answer: 'أيوة، بيشغل راوتر WE لفترة بتوصل لـ 14 ساعة. وبيشتغل كأنه UPS، يعني الراوتر مش هيفصل ولا هيعمل ريستارت لما الكهربا تقطع أو ترجع. بس هتحتاج تشتري وصلة تحويل من Type-C لـ 12V DC المخصوصة للراوتر.',
            },
            {
                question: 'لو طلبت أوردر النهاردة للتجمع أو زايد يوصلني امتى؟ وفيه مصاريف شحن؟',
                answer: 'لو طلبت قبل الساعة 2 الظهر، بيطلع من مخازننا في بوسطة ويوصلك القاهرة والجيزة خلال 24 لـ 48 ساعة بالكتير. وتكلفة الشحن 40 جنيه بس لأي محافظة، والشحن بيكون مجاني بالكامل لو طلبك معدي 500 جنيه.',
            },
            {
                question: 'إيه يضمنلي إن شواحن أنكر وجوي روم من كايرو فولت أصلية مش مضروبة؟',
                answer: 'كايرو فولت شركة مسجلة رسمياً (سجل تجاري 8446). كل منتجاتنا بتيجي متبرشمة وعليها الباركود الأصلي اللي تقدر تخدشه وتعمله سكان على موقع أنكر. ومعاك ضمان الوكيل الرسمي 18 شهر، وتقدر تدفع كاش بعد ما تعاين الأوردر بنفسك.',
            },
        ],
        voiceFaqEn: [
            {
                question: 'Does the Anker 737 power bank run a WE router during power outages?',
                answer: 'Yes, we tested it at CairoVolt Labs and it runs a WE VDSL router for up to 14 hours continuously. It works like a UPS — the router won\'t restart when power cuts or returns. You\'ll need a Type-C to 12V DC adapter cable for the router.',
            },
            {
                question: 'How fast is delivery and what are shipping costs?',
                answer: 'If you order before 2 PM, it ships from our Bosta warehouse. Cairo/Giza delivery in 24-48 hours. Shipping is 40 EGP to any governorate, and free for orders above 500 EGP.',
            },
            {
                question: 'How can I verify Anker products from CairoVolt are original?',
                answer: 'CairoVolt is a registered company (CR: 8446). All products come sealed with the original barcode you can scratch and verify on Anker\'s official site. 18-month official warranty included, and you can inspect before paying COD.',
            },
        ],
        isAccessoryFor: [
            { name: 'WE VDSL Router' },
            { name: 'Apple MacBook Pro' },
            { name: 'iPhone 15 Pro Max' },
            { name: 'Dell XPS Laptop' },
            { name: 'Samsung Galaxy S24 Ultra' },
        ],
        labMetrics: {
            actualCapacity_mAh: 24000,
            routerRuntimeHours: 14.37,
            maxTemp_C: 41,
            chargingSpeed_W: 140,
            devicesCharged: 5,
            actualWeight_g: 468,
        },
    };
