import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { brandData } from '@/data/brand-data';
import { resolveMinPriceToken } from '@/lib/meta-price-token';
import { BreadcrumbSchema } from '@/components/schemas/ProductSchema';
import { BrandOverviewBlock } from '@/components/content/CategoryOverviewBlock';
import { SvgIcon } from '@/components/ui/SvgIcon';
import { QuickAnswerBox } from '@/components/ui/QuickAnswerBox';
import ShareAnalytics from '@/components/content/ShareAnalytics';
import { staticProducts } from '@/lib/static-products';
import BestSellingProducts from '@/components/products/BestSellingProducts';
import SoundcoreFamilyStrip from '@/components/products/SoundcoreFamilyStrip';
import CategoryDiscoveryGrid from '@/components/brand/CategoryDiscoveryGrid';
import { getBrandDisplayName, localizeArabicBrandNames } from '@/lib/arabic-brand-names';

// ISR: On-demand revalidation only (via /api/indexing webhook)
export const dynamicParams = false; // Unknown slugs → automatic 404 (prevents soft 404)

type Props = {
    params: Promise<{ locale: string; brand: string }>;
};

function getBrandPageCopy(brandSlug: string, brandName: string, isArabic: boolean) {
    const isAnker = brandSlug === 'anker';
    const isJbl = brandSlug === 'jbl';

    if (isArabic) {
        const common = {
            guideFeatures: ['السعر والتوافر في صفحة المنتج', 'ضمان كايرو فولت حسب المنتج', 'التوصيل والدفع حسب الطلب'],
            serviceBadges: [
                { icon: 'clipboard', title: 'بيانات الموديل', description: 'مواصفات وتوافق واضحان' },
                { icon: 'shield', title: 'ضمان كايرو فولت', description: 'المدة والشروط حسب المنتج' },
                { icon: 'package', title: 'التوافر', description: 'يُراجع عند تأكيد الطلب' },
                { icon: 'truck', title: 'التوصيل', description: 'حسب العنوان والطلب' },
            ],
            shoppingSteps: [
                { icon: 'phone', title: 'حدد جهازك', description: 'اعرف المنفذ وقدرة الشحن والميزات التي يدعمها جهازك.' },
                { icon: 'scale', title: 'قارن الموديلات', description: 'قارن المواصفات والسعر الحالي والملحقات المرفقة دون الاعتماد على اسم العلامة وحده.' },
                { icon: 'clipboard', title: 'راجع تفاصيل الطلب', description: 'تحقق من التوافر وخيارات الدفع والتوصيل وشروط ضمان كايرو فولت قبل التأكيد.' },
            ],
            commonFaq: [
                { question: `كيف أختار منتج ${brandName} المناسب؟`, answer: 'ابدأ بمواصفات جهازك: نوع المنفذ، قدرة الشحن المطلوبة، والسعة أو الميزات التي تحتاجها. بعد ذلك قارن الموديلات المطابقة في القسم المناسب.' },
                { question: 'أين أجد السعر والتوافر الحاليين؟', answer: 'توضح صفحة كل منتج السعر الحالي وحالة التوافر. يُراجع التوافر مرة أخرى عند تأكيد الطلب.' },
                { question: 'ما مدة ضمان كايرو فولت؟', answer: 'تختلف مدة الضمان وأهليته حسب المنتج. الشروط المكتوبة في صفحة المنتج وقت الطلب هي المرجع.' },
                { question: 'هل سجل ضمان كايرو فولت يثبت أصالة المنتج؟', answer: 'لا. سجل كايرو فولت يؤكد بيانات تغطية المتجر فقط، وليس شهادة أصالة من الشركة المصنّعة. راجع رقم الموديل ووثائق الشركة وأدواتها إن وُجدت.' },
            ],
        };

        if (isAnker) {
            return {
                ...common,
                description: 'انكر في مصر — شواحن GaN وباور بانك PowerCore وكابلات وشواحن سيارة من {minPrice} جنيه. ضمان كايرو فولت والدفع عند الاستلام.',
                keywords: 'انكر, منتجات انكر, انكر مصر, شاحن انكر, باور بانك انكر, كابل انكر, شاحن سيارة انكر, كايرو فولت',
                quickAnswer: 'اختيار منتج انكر يبدأ من احتياج الجهاز لا من رقم الواط وحده: تحقق من المنفذ وبروتوكول الشحن والقدرة التي يقبلها جهازك، ثم قارن السعة والمنافذ والكابل المرفق. تقنيات GaN وPowerIQ وActiveShield تظهر في موديلات محددة وليست ميزة موحّدة لكل المنتجات.',
                overviewLabel: 'دليل تقنيات الشحن',
                overviewTitle: 'كيف تقرأ كتالوج انكر قبل الشراء؟',
                overviewParagraphs: [
                    'يركز كتالوج انكر في كايرو فولت على الطاقة المحمولة والشحن: باور بانك، شواحن حائط، كابلات وشواحن سيارة. أما ساوندكور فهي عائلة الصوتيات المرتبطة بانكر ولها أقسام منفصلة للسماعات ومكبرات الصوت.',
                    'في شاحن الحائط، قارن القدرة الكلية وقدرة كل منفذ ودعم USB Power Delivery أو PPS عند حاجة جهازك إليهما؛ فقد تتوزع القدرة عند تشغيل أكثر من منفذ. كما يجب أن يتحمل الكابل القدرة المطلوبة، لأن اسم التقنية أو رقم الواط على الشاحن وحده لا يضمن أعلى سرعة لكل جهاز.',
                    'في الباور بانك، السعة المكتوبة بالـmAh تصف خلايا البطارية وليست كمية الطاقة التي تصل كاملة إلى الهاتف بعد تحويل الجهد. لذلك قارن السعة وWh إن كانت مذكورة، وقدرة الخرج، ونوع المنافذ، والوزن، والكابل المدمج وفق استخدامك. راجع صفحة الموديل لأن GaN وPowerIQ وActiveShield والتوافق تختلف من منتج إلى آخر.',
                ],
                categoryDescriptions: {
                    '/anker/power-banks': 'قارن السعة وWh وقدرة USB-C وعدد المنافذ والوزن والكابلات المدمجة؛ الطاقة الفعلية المتاحة تتأثر بتحويل الجهد والجهاز المستخدم.',
                    '/anker/wall-chargers': 'اختر حسب قدرة كل منفذ ودعم PD أو PPS وتقاسم القدرة بين المنافذ، ثم طابق ذلك مع الهاتف أو التابلت أو اللابتوب والكابل.',
                    '/anker/cables': 'راجع نوع الطرفين والطول وقدرة الشحن وسرعة نقل البيانات؛ الكابل المناسب للشحن العالي ليس بالضرورة الأسرع في نقل الملفات.',
                    '/anker/car-chargers': 'قارن نوع المنافذ والقدرة الكلية ودعم البروتوكول المطلوب، وتأكد من ملاءمة مقبس السيارة قبل الاستخدام.',
                    '/soundcore': 'انتقل إلى ساوندكور لمقارنة ايربودز وهيدفون ومكبرات صوت؛ خصائص ANC والتطبيق وLDAC ومقاومة المياه تختلف حسب الموديل.',
                } as Record<string, string>,
                faq: [
                    { question: 'هل وجود GaN أو PowerIQ يعني أن كل شواحن انكر متشابهة؟', answer: 'لا. هذه أسماء لتقنيات أو عائلات خصائص تظهر في موديلات محددة. عدد المنافذ والقدرة وبروتوكولات PD وPPS وطريقة توزيع الطاقة تختلف، لذلك ارجع إلى مواصفات الموديل وجهازك.' },
                    ...common.commonFaq,
                ],
            };
        }

        if (isJbl) {
            return {
                ...common,
                shoppingSteps: [
                    { icon: 'compass', title: 'حدد مكان الاستخدام', description: 'قعدة بيت هادية غير خروجة ساحل غير فرح — كل استخدام له حجم سبيكر أو نوع سماعة مختلف.' },
                    { icon: 'scale', title: 'قارن الأرقام المعلنة', description: 'ساعات البطارية وتصنيف IP والوزن حسب مواصفات JBL المعلنة لكل موديل، مش حسب اسم العائلة وحده.' },
                    { icon: 'clipboard', title: 'راجع تفاصيل الطلب', description: 'تحقق من التوافر وخيارات الدفع والتوصيل وشروط ضمان كايرو فولت قبل التأكيد.' },
                ],
                description: 'JBL في مصر — سبيكرات بلوتوث وبارتي بوكس وسماعات رأس وايربودز من {minPrice} جنيه. ضمان كايرو فولت 12 شهر والدفع عند الاستلام.',
                keywords: 'jbl, سماعات jbl, سبيكر jbl, سعر سماعة jbl, اسعار سماعات jbl, بارتي بوكس jbl, ايربودز jbl, كايرو فولت',
                quickAnswer: 'اختيار منتج JBL بيبدأ من مكان الاستخدام مش من الشكل: السبيكرات المحمولة زي Go وFlip وCharge للخروجات والبيت، والبارتي بوكس للمناسبات والأفراح، وسماعات الرأس والايربودز للاستخدام الشخصي. قارن ساعات البطارية وتصنيف مقاومة الماء المعلنين من JBL لكل موديل، وافتكر إن الصوت العالي بيقلل ساعات التشغيل عن الرقم المعلن.',
                overviewLabel: 'دليل صوتيات JBL',
                overviewTitle: 'كيف تقرأ كتالوج JBL قبل الشراء؟',
                overviewParagraphs: [
                    'يغطي كتالوج JBL في كايرو فولت أربعة أقسام: سبيكرات بلوتوث محمولة من Go 4 حتى Boombox 3، وسبيكرات بارتي بوكس للمناسبات، وسماعات رأس Tune، وايربودز من T110 السلكية حتى Tour Pro 2. الاسم التجاري الواحد قد يضم أجيالًا مختلفة المواصفات، لذلك ارجع دائمًا إلى رقم الموديل نفسه.',
                    'في السبيكرات، حجم الدرايفر هو الفيزياء الأساسية: مساحة أكبر بتحرّك هواء أكتر فباص أعمق، لكن بوزن وسعر أعلى. قارن ساعات التشغيل المعلنة وتصنيف IP والوزن حسب الموديل، وخد بالك إن دعم ربط السبيكرات ببعضها (PartyBoost أو Auracast) بيختلف بين الأجيال والنظامان مش متوافقين مع بعض.',
                    'في السماعات الشخصية، حدد الأول شكل الارتداء: سماعة رأس للجلسات الطويلة براحة وبطارية أكبر، أو ايربودز خفيفة للتنقل والجيم. خصائص عزل الضوضاء ودعم التطبيق بتظهر في موديلات محددة مش في الكل، وساعات البطارية المعلنة بتقل مع رفع الصوت وتشغيل العزل.',
                ],
                categoryDescriptions: {
                    '/jbl/speakers': 'قارن ساعات البطارية المعلنة وتصنيف IP والوزن ونظام ربط السبيكرات؛ الحجم الأكبر بيدي باص أعمق لكن بوزن وسعر أعلى.',
                    '/jbl/partybox': 'راجع مصدر الطاقة (بطارية أو كهرباء) ومداخل الميكروفون والوزن وطريقة النقل؛ سبيكرات المناسبات تحتاج تخطيطًا للمساحة والكهرباء.',
                    '/jbl/headphones': 'اختر بين أون-إير وأوفر-إير، وراجع ساعات البطارية المعلنة ودعم عزل الضوضاء في الموديلات التي توفره.',
                    '/jbl/earbuds': 'قارن السلكية بموديلات البلوتوث، وراجع بطارية العلبة والعزل ودعم التطبيق حسب الموديل.',
                } as Record<string, string>,
                faq: [
                    { question: 'كام سعر سماعات JBL في مصر؟', answer: 'الأسعار في كايرو فولت بتبدأ من 249 جنيه لسماعة T110 السلك، والايربودز اللاسلكية من 2449 جنيه، وسماعات الراس من 2149 جنيه، وسبيكرات البلوتوث من 2049 لحد 22649 جنيه، والبارتي بوكس من 20099 لحد 65999 جنيه. السعر الحالي والمخزون بيظهروا في صفحة كل منتج وبيتغيروا مع العروض.' },
                    { question: 'هل كايرو فولت بتبيع ساوند بار JBL؟', answer: 'لأ، حاليًا مفيش ساوند بار JBL في كايرو فولت — المتاح هو السبيكرات المحمولة والبارتي بوكس وسماعات الراس والايربودز. لو عايز صوت للتلفزيون، السبيكر البلوتوث بيتوصل لكن ممكن تلاحظ تأخير بسيط في الصوت حسب التلفزيون.' },
                    { question: 'كيف أختار منتج JBL المناسب؟', answer: 'ابدأ من مكان الاستخدام وحجم المساحة: سبيكر محمول للخروجات والبيت، بارتي بوكس للمناسبات، سماعة رأس أو ايربودز للاستخدام الشخصي. بعد كده قارن ساعات البطارية وتصنيف مقاومة الماء المعلنين من JBL لكل موديل في القسم المناسب.' },
                    { question: 'هل دعم ربط السبيكرات يعني إمكانية ربط أي سبيكرين JBL؟', answer: 'لا. الربط بيشتغل بين الموديلات اللي بتدعم النظام نفسه: PartyBoost مع PartyBoost، وAuracast مع Auracast، والنظامان غير متوافقين مع بعضهما. راجع نظام الربط المذكور في مواصفات كل موديل قبل شراء سبيكر تاني.' },
                    ...common.commonFaq.slice(1),
                ],
            };
        }

        return {
            ...common,
            description: 'جوي روم في مصر — ايربودز T03s وباور بانك وشواحن وكابلات وساعات وحوامل سيارة من {minPrice} جنيه. ضمان كايرو فولت والدفع عند الاستلام.',
            keywords: 'جوي روم, منتجات جوي روم, جوي روم مصر, سماعات جوي روم, باور بانك جوي روم, شاحن جوي روم, كابل جوي روم, ساعات جوي روم, كايرو فولت',
            quickAnswer: 'منتجات جوي روم تغطي فئات متعددة، وقد تتشابه الأسماء بينما تختلف المنافذ والقدرة أو التطبيق والتوافق. ابدأ برقم الموديل واحتياج جهازك، ثم راجع مواصفات الشحن أو الصوت أو التثبيت في صفحة المنتج قبل مقارنة السعر.',
            overviewLabel: 'دليل فئات جوي روم',
            overviewTitle: 'اختيار موديل جوي روم حسب الاستخدام',
            overviewParagraphs: [
                'يجمع كتالوج جوي روم ملحقات للاستخدام اليومي تشمل الشحن والطاقة والصوتيات والساعات وملحقات السيارة. رقم الموديل مهم لأن منتجين متقاربين في الاسم قد يختلفان في نوع المنفذ أو القدرة أو التطبيق والملحقات المرفقة.',
                'للشواحن والباور بانك، طابق بروتوكول الشحن وقدرة المنفذ مع جهازك، وراجع ما إذا كانت القدرة موزعة على أكثر من منفذ. وفي الكابلات، تحقق من طرفي التوصيل والطول والقدرة ونقل البيانات بدل الاعتماد على الشكل الخارجي فقط.',
                'للسماعات والساعات وحوامل السيارة، قارن توافق نظام التشغيل أو التطبيق، وتقييم مقاومة الماء إن وُجد، وأبعاد التثبيت وطريقته. مزايا الصحة في الساعات للاستخدام العام وليست بديلًا عن الأجهزة أو الاستشارة الطبية، وصفحة المنتج هي المرجع للمزايا الفعلية لكل موديل.',
            ],
            categoryDescriptions: {
                '/joyroom/audio': 'قارن تصميم السماعة والبطارية والميكروفونات وأوضاع التحكم ودعم التطبيق؛ العزل وخصائص الصوت تختلف حسب الموديل.',
                '/joyroom/power-banks': 'راجع السعة وقدرة الإدخال والإخراج ونوع المنافذ والكابل المدمج والوزن، مع توقع فاقد طبيعي عند تحويل الجهد.',
                '/joyroom/wall-chargers': 'طابق قدرة USB-C أو USB-A وبروتوكول الشحن مع جهازك، وراجع توزيع القدرة عند استخدام أكثر من منفذ.',
                '/joyroom/cables': 'اختر طرفي الكابل والطول وقدرة الشحن ونقل البيانات المناسبة؛ لا تدعم كل الكابلات الوظائف نفسها.',
                '/joyroom/smart-watches': 'تحقق من توافق التطبيق والهاتف والبطارية والحساسات وتصنيف مقاومة الماء؛ بيانات النشاط للاستخدام العام وليست تشخيصًا طبيًا.',
                '/joyroom/car-holders': 'قارن مكان التثبيت وأبعاد الهاتف ونوع الإمساك أو المغناطيس، وتأكد من ثبات الحامل دون حجب الرؤية أو أدوات القيادة.',
                '/joyroom/car-accessories': 'تصفح شواحن وحوامل السيارة، وطابق قدرة الشحن وطريقة التثبيت والمقاس مع السيارة والهاتف.',
            } as Record<string, string>,
            faq: [
                { question: 'لماذا يجب مراجعة رقم موديل جوي روم؟', answer: 'لأن الاسم التجاري الواحد قد يشمل إصدارات بمنافذ أو قدرة أو تطبيق وملحقات مختلفة. رقم الموديل ومواصفات صفحة المنتج هما الأدق عند المقارنة.' },
                ...common.commonFaq,
            ],
        };
    }

    const common = {
        guideFeatures: ['Price and availability on each product page', 'Product-specific CairoVolt warranty', 'Order-specific delivery and payment'],
        serviceBadges: [
            { icon: 'clipboard', title: 'Model details', description: 'Clear specifications and compatibility' },
            { icon: 'shield', title: 'CairoVolt warranty', description: 'Product-specific duration and terms' },
            { icon: 'package', title: 'Availability', description: 'Reviewed during order confirmation' },
            { icon: 'truck', title: 'Delivery', description: 'Based on the address and order' },
        ],
        shoppingSteps: [
            { icon: 'phone', title: 'Identify your device', description: 'Check the connector, required charging output, and the features your device supports.' },
            { icon: 'scale', title: 'Compare models', description: 'Compare specifications, current price, and included accessories rather than relying on the brand name alone.' },
            { icon: 'clipboard', title: 'Review order details', description: 'Confirm availability, payment, delivery, and CairoVolt warranty terms before ordering.' },
        ],
        commonFaq: [
            { question: `How do I choose the right ${brandName} product?`, answer: 'Start with your device requirements: connector, required charging output, and the capacity or features you need. Then compare matching models in the relevant category.' },
            { question: 'Where can I find the current price and availability?', answer: 'Each product page states its current price and availability. Availability is reviewed again when the order is confirmed.' },
            { question: 'How long is the CairoVolt warranty?', answer: 'Warranty eligibility and duration vary by product. The written terms on the product page at order time are the reference.' },
            { question: 'Does a CairoVolt warranty record prove authenticity?', answer: 'No. A CairoVolt record confirms store warranty information only; it is not a manufacturer authenticity certificate. Review the model number, manufacturer documentation, and any available manufacturer tools.' },
        ],
    };

    if (isAnker) {
        return {
            ...common,
            description: 'Anker in Egypt — GaN wall chargers, PowerCore power banks, cables and car chargers from {minPrice} EGP. CairoVolt warranty and cash on delivery.',
            keywords: 'Anker, Anker Egypt, Anker charger, Anker power bank, Anker cable, Anker car charger, CairoVolt',
            quickAnswer: 'Choose an Anker product from the device requirement, not wattage alone: check the connector, charging protocol, and power accepted by your device, then compare capacity, ports, and the included cable. GaN, PowerIQ, and ActiveShield appear on selected models rather than every product.',
            overviewLabel: 'Charging technology guide',
            overviewTitle: 'How to read the Anker catalogue before buying',
            overviewParagraphs: [
                'CairoVolt’s Anker catalogue focuses on portable power and charging: power banks, wall chargers, cables, and car chargers. Soundcore is the related Anker audio family, with separate sections for personal audio and Bluetooth speakers.',
                'For a wall charger, compare total output, per-port output, and USB Power Delivery or PPS support when your device requires them; available power may be shared when several ports are active. The cable must also support the required output, so a technology name or headline wattage alone does not guarantee the fastest rate for every device.',
                'For a power bank, the printed mAh figure describes the internal cell capacity, not the full energy delivered after voltage conversion. Compare capacity, Wh where listed, output, ports, weight, and any built-in cable for your use. Check the product record because GaN, PowerIQ, ActiveShield, and compatibility vary by model.',
            ],
            categoryDescriptions: {
                '/anker/power-banks': 'Compare capacity, Wh, USB-C output, port count, weight, and built-in cables; usable output is affected by voltage conversion and the connected device.',
                '/anker/wall-chargers': 'Choose by per-port output, PD or PPS support, and power sharing, then match the charger and cable to your phone, tablet, or laptop.',
                '/anker/cables': 'Check both connectors, length, charging rating, and data speed; a cable suited to high-power charging is not necessarily the fastest for file transfer.',
                '/anker/car-chargers': 'Compare port layout, total output, and required protocol support, and confirm that the charger fits the vehicle socket.',
                '/soundcore': 'Visit Soundcore for earbuds, headphones, and speakers; ANC, app support, LDAC, and water ratings vary by model.',
            } as Record<string, string>,
            faq: [
                { question: 'Do GaN or PowerIQ make every Anker charger equivalent?', answer: 'No. These names identify technologies or feature families used on selected models. Port count, output, PD/PPS support, and power-sharing behavior vary, so check the exact model and your device requirements.' },
                ...common.commonFaq,
            ],
        };
    }

    if (isJbl) {
        return {
            ...common,
            shoppingSteps: [
                { icon: 'compass', title: 'Identify the listening place', description: 'A quiet room, a beach trip, and a wedding each call for a different speaker size or headphone type.' },
                { icon: 'scale', title: 'Compare the listed figures', description: 'Battery hours, IP rating, and weight are JBL-listed per model — compare those rather than the family name alone.' },
                { icon: 'clipboard', title: 'Review order details', description: 'Confirm availability, payment, delivery, and CairoVolt warranty terms before ordering.' },
            ],
            description: 'JBL in Egypt — Bluetooth speakers, PartyBox, headphones and earbuds from {minPrice} EGP. CairoVolt 12-month warranty and cash on delivery.',
            keywords: 'JBL, JBL Egypt, JBL speakers, JBL speakers price in Egypt, JBL PartyBox, JBL headphones, JBL earbuds, CairoVolt',
            quickAnswer: 'Choose a JBL product by where it will play, not by looks: portable speakers such as Go, Flip, and Charge suit outings and home, PartyBox models suit events, and headphones or earbuds suit personal listening. Compare the JBL-listed battery hours and water rating per model; louder playback shortens runtime below the listed figure.',
            overviewLabel: 'JBL audio guide',
            overviewTitle: 'How to read the JBL catalogue before buying',
            overviewParagraphs: [
                'CairoVolt’s JBL catalogue covers four sections: portable Bluetooth speakers from the Go 4 up to the Boombox 3, PartyBox event speakers, Tune headphones, and earbuds from the wired T110 to the Tour Pro 2. One product family can span generations with different specifications, so always check the exact model number.',
                'For speakers, driver size is the underlying physics: a larger driver moves more air and produces deeper bass, at the cost of weight and price. Compare the listed playtime, IP rating, and weight per model, and note that speaker-linking support (PartyBoost or Auracast) differs by generation and the two standards do not link to each other.',
                'For personal audio, decide the wearing style first: headphones for long comfortable sessions with a larger battery, or light earbuds for commuting and the gym. Noise cancelling and app support appear on selected models rather than all of them, and listed battery hours drop with higher volume and active noise control.',
            ],
            categoryDescriptions: {
                '/jbl/speakers': 'Compare listed battery hours, IP rating, weight, and the speaker-linking standard; a larger size gives deeper bass at higher weight and price.',
                '/jbl/partybox': 'Review the power source (battery or mains), mic inputs, weight, and transport method; event speakers need space and power planning.',
                '/jbl/headphones': 'Choose between on-ear and over-ear, then check listed battery hours and noise-cancelling support on the models that include it.',
                '/jbl/earbuds': 'Compare wired and Bluetooth models, then review case battery, noise control, and app support per model.',
            } as Record<string, string>,
            faq: [
                { question: 'How much do JBL products cost in Egypt?', answer: 'At CairoVolt prices start at 249 EGP for the wired T110 earphones, with wireless earbuds from 2,449 EGP, headphones from 2,149 EGP, Bluetooth speakers from 2,049 to 22,649 EGP, and PartyBox models from 20,099 to 65,999 EGP. The live price and stock appear on each product page and change with promotions.' },
                { question: 'Does CairoVolt sell JBL soundbars?', answer: 'No — CairoVolt does not currently stock JBL soundbars. The range here is portable speakers, PartyBox party speakers, headphones and earbuds. For TV audio a Bluetooth speaker can connect, though some audio delay is possible depending on the TV.' },
                { question: 'How do I choose the right JBL product?', answer: 'Start from where it will play and the space size: a portable speaker for outings and home, a PartyBox for events, headphones or earbuds for personal listening. Then compare the JBL-listed battery hours and water rating per model in the relevant category.' },
                { question: 'Does speaker-linking support mean any two JBL speakers can pair together?', answer: 'No. Linking works between models that support the same standard: PartyBoost with PartyBoost, and Auracast with Auracast — the two standards are not compatible with each other. Check the linking standard listed in each model’s specifications before buying a second speaker.' },
                ...common.commonFaq.slice(1),
            ],
        };
    }

    return {
        ...common,
        description: 'Joyroom in Egypt — T03s earbuds, power banks, chargers, cables, smartwatches and car mounts from {minPrice} EGP. CairoVolt warranty and cash on delivery.',
        keywords: 'Joyroom, Joyroom Egypt, Joyroom earbuds, Joyroom power bank, Joyroom charger, Joyroom cable, Joyroom smartwatch, CairoVolt',
        quickAnswer: 'Joyroom spans several accessory categories, and similarly named models can differ in ports, output, app support, or compatibility. Start with the exact model and your device requirements, then review the relevant charging, audio, or mounting specifications before comparing price.',
        overviewLabel: 'Joyroom category guide',
        overviewTitle: 'Choose a Joyroom model by use case',
        overviewParagraphs: [
            'The Joyroom catalogue covers everyday charging, portable power, audio, smartwatches, and car accessories. The exact model number matters because products with similar names can differ in connector, output, app support, and included accessories.',
            'For chargers and power banks, match the charging protocol and per-port output to your device and check whether power is shared across ports. For cables, confirm both connectors, length, charging rating, and data support rather than relying on appearance alone.',
            'For earbuds, watches, and car holders, compare operating-system or app compatibility, any stated water rating, and the dimensions or mounting method. Watch health features are general wellness aids, not medical devices; the product page is the reference for the features included with each model.',
        ],
        categoryDescriptions: {
            '/joyroom/audio': 'Compare fit, battery, microphones, controls, and app support; noise control and audio features vary by model.',
            '/joyroom/power-banks': 'Review capacity, input/output power, ports, built-in cables, and weight, allowing for normal voltage-conversion loss.',
            '/joyroom/wall-chargers': 'Match USB-C or USB-A output and charging protocol to your device, and check power distribution when multiple ports are used.',
            '/joyroom/cables': 'Choose the required connectors, length, charging rating, and data support; not every cable supports the same functions.',
            '/joyroom/smart-watches': 'Check phone/app compatibility, battery, sensors, and water rating; activity data is for general wellness rather than medical diagnosis.',
            '/joyroom/car-holders': 'Compare mounting position, phone dimensions, and magnetic or clamp retention without obstructing the road or vehicle controls.',
            '/joyroom/car-accessories': 'Browse car chargers and mounts, matching output, mounting method, and dimensions to the vehicle and phone.',
        } as Record<string, string>,
        faq: [
            { question: 'Why should I check the exact Joyroom model number?', answer: 'A product family can include versions with different connectors, output, app support, and accessories. The model number and product-page specifications are the most reliable comparison points.' },
            ...common.commonFaq,
        ],
    };
}

export async function generateStaticParams() {
    const brands = Object.keys(brandData);
    const locales = ['ar', 'en'];
    return locales.flatMap(locale =>
        brands.map(brand => ({ locale, brand }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, brand } = await params;
    const data = brandData[brand.toLowerCase()];

    if (!data) return {};

    const isArabic = locale === 'ar';
    const brandName = data.hero.title.replace(/\s*Egypt$/i, '');
    const brandDisplayName = getBrandDisplayName(brandName, locale);
    const copy = getBrandPageCopy(brand.toLowerCase(), brandDisplayName, isArabic);

    // Use first product image for this brand as the social share image
    // Falls back to layout logo if no products found
    const brandFirstProduct = staticProducts.find(
        p => p.brand.toLowerCase() === brand.toLowerCase() && p.images?.[0]?.url
    );
    const socialImageUrl = brandFirstProduct?.images[0]?.url
        ? `https://cairovolt.com${brandFirstProduct.images[0].url}`
        : undefined;
    const firstProductImageAlt = brandFirstProduct?.images[0]?.alt;
    const socialImageAlt = firstProductImageAlt
        ? (isArabic ? localizeArabicBrandNames(firstProductImageAlt) : firstProductImageAlt)
        : (isArabic ? `${brandDisplayName} - كايرو فولت مصر` : `${data.hero.title} - CairoVolt Egypt`);

    // Descriptive brand page title based on the active catalogue.
    const brandProducts = staticProducts.filter(
        p => p.status === 'active' && p.brand.toLowerCase() === brand.toLowerCase()
    );
    const brandProductCount = brandProducts.length;
    // The copy may quote this brand's entry price with a {minPrice} token.
    const metaDescription = resolveMinPriceToken(copy.description, brandProducts);
    const arTitle = `منتجات ${brandDisplayName} في مصر | ${brandProductCount} منتج | ضمان كايرو فولت`;
    const enTitle = `${brandName} Products in Egypt | ${brandProductCount} Products | CairoVolt Warranty`;

    const dynamicTitle = isArabic ? arTitle : enTitle;
    const canonical = isArabic
        ? `https://cairovolt.com/${brand.toLowerCase()}`
        : `https://cairovolt.com/en/${brand.toLowerCase()}`;

    // Strict lowercase for canonical URLs (URL best practice)
    return {
        title: { absolute: dynamicTitle },
        description: metaDescription,
        keywords: copy.keywords,
        alternates: {
            canonical,
            languages: {
                'ar-EG': `https://cairovolt.com/${brand.toLowerCase()}`,
                'en-EG': `https://cairovolt.com/en/${brand.toLowerCase()}`,
                'x-default': `https://cairovolt.com/${brand.toLowerCase()}`,
            },
        },
        openGraph: {
            title: dynamicTitle,
            description: metaDescription,
            url: canonical,
            siteName: 'CairoVolt',
            locale: isArabic ? 'ar_EG' : 'en_EG',
            type: 'website',
            ...(socialImageUrl && {
                images: [{ url: socialImageUrl, alt: socialImageAlt, width: 800, height: 800 }]
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: dynamicTitle,
            description: metaDescription,
            images: socialImageUrl ? [socialImageUrl] : undefined,
        },
    };
}

export default async function BrandHubPage({ params }: Props) {
    const { locale, brand } = await params;
    const isRTL = locale === 'ar';
    const data = brandData[brand.toLowerCase()];

    if (!data) {
        notFound();
    }

    const brandProductCount = staticProducts.filter(product =>
        product.status === 'active' && product.brand.toLowerCase() === brand.toLowerCase()
    ).length;
    const brandName = data.hero.title.replace(/\s*Egypt$/i, '');
    const brandDisplayName = getBrandDisplayName(brandName, locale);
    const arabicCopy = getBrandPageCopy(
        brand.toLowerCase(),
        getBrandDisplayName(brandName, 'ar'),
        true,
    );
    const englishCopy = getBrandPageCopy(brand.toLowerCase(), brandName, false);
    const copy = isRTL ? arabicCopy : englishCopy;
    const pageHeading = isRTL
        ? `منتجات ${brandDisplayName} في مصر`
        : `${brandName} Products in Egypt`;
    // Same {minPrice} resolution generateMetadata does. This string is also the
    // hero paragraph and feeds the page's JSON-LD, so leaving it raw would print
    // a literal token on screen and in structured data.
    const brandProducts = staticProducts.filter(
        product => product.status === 'active' && product.brand.toLowerCase() === brand.toLowerCase()
    );
    const pageDescription = resolveMinPriceToken(copy.description, brandProducts);
    const safeCategories = data.categories.map((category) => ({
        href: category.href,
        icon: category.icon,
        title: {
            en: category.title.en,
            ar: localizeArabicBrandNames(category.title.ar),
        },
        description: {
            en: englishCopy.categoryDescriptions[category.href]
                || `Browse available ${category.title.en}. Review current specifications and compatibility on each product page.`,
            ar: arabicCopy.categoryDescriptions[category.href]
                || `تصفح ${localizeArabicBrandNames(category.title.ar)}، وراجع المواصفات والتوافق في صفحة كل منتج.`,
        },
    }));

    // Helper to get localized href
    const getLocalizedHref = (path: string) => {
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return isRTL ? cleanPath : `/${locale}${cleanPath}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Structured data */}
            <BreadcrumbSchema
                items={[
                    { name: isRTL ? 'الرئيسية' : 'Home', url: `https://cairovolt.com${isRTL ? '' : '/en'}` },
                    { name: isRTL ? brandDisplayName : data.hero.title, url: `https://cairovolt.com${isRTL ? '' : '/en'}/${brand.toLowerCase()}` },
                ]}
                locale={locale}
            />

            {/* FAQs remain visible; no FAQPage markup is asserted for this commerce page. */}

            {/* Compact commerce header: one clear H1 and a short, visible answer.
                The category and product decision layers follow immediately in
                the same DOM order for customers, crawlers, and screen readers. */}
            <header id="brand-hero" className="relative scroll-mt-32 overflow-hidden py-4 md:py-5">
                {/* Dynamic Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${data.hero.bgGradient} opacity-90`}></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>

                {/* Content */}
                <div className="container relative z-10 mx-auto px-4 text-center lg:grid lg:grid-cols-5 lg:items-center lg:gap-8 lg:text-start">
                    <div className="lg:col-span-3">
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-[11px] font-bold tracking-wide text-white md:text-xs">
                                {isRTL ? `كتالوج ${brandDisplayName}` : `${brandName} Catalogue`}
                            </span>
                        </div>

                        <h1 className="mb-2 bg-gradient-to-b from-white to-white/70 bg-clip-text text-2xl font-black leading-tight tracking-tight text-transparent drop-shadow-sm md:text-3xl lg:text-4xl">
                            {pageHeading}
                        </h1>

                        <p data-top-summary className={`mx-auto mb-4 max-w-4xl text-sm font-light leading-relaxed md:text-base lg:mx-0 lg:mb-0 ${brand === 'joyroom' ? 'text-red-50' : brand === 'jbl' ? 'text-orange-50' : 'text-blue-50'
                            }`}>
                            {pageDescription}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2.5 lg:col-span-2 lg:justify-end">
                        <a
                            href="#shop-by-category"
                            className="group inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-black text-gray-900 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl md:text-sm"
                        >
                            <SvgIcon name="compass" className={`h-4 w-4 ${brand === 'joyroom' ? 'text-red-600' : brand === 'jbl' ? 'text-orange-600' : 'text-blue-600'}`} />
                            {isRTL ? 'اختر القسم' : 'Choose a category'}
                            <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
                        </a>
                        <a
                            href="#best-sellers"
                            className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-black text-white backdrop-blur-sm transition hover:bg-white/20 md:text-sm"
                        >
                            <SvgIcon name="fire" className="h-4 w-4" />
                            {isRTL ? 'منتجات مختارة' : 'Featured products'}
                            <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
                        </a>

                        {data.hero.heroProduct && (
                            <Link
                                href={getLocalizedHref(data.hero.heroProduct.link.href)}
                                className="group hidden min-h-10 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-black text-white backdrop-blur-sm transition hover:bg-white/20 md:text-sm lg:inline-flex"
                            >
                                <SvgIcon name="star" className="h-4 w-4" />
                                <span>{isRTL ? 'عرض منتج مميز' : 'View a featured product'}</span>
                                <span aria-hidden="true" className={`${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`}>
                                    {isRTL ? '←' : '→'}
                                </span>
                            </Link>
                        )}

                        <span className="hidden text-[11px] font-medium text-white/80 sm:inline md:text-xs">
                            {isRTL ? 'ضمان كايرو فولت حسب المنتج' : 'Product-specific CairoVolt warranty'}
                        </span>
                    </div>
                </div>
            </header>

            {/* Product-information reminder for Joyroom shoppers. */}
            {brand === 'joyroom' && (
                <div className="overflow-hidden bg-yellow-400 py-2 text-black">
                    <div className="container mx-auto flex items-center justify-center gap-2 px-4 text-center text-xs font-bold md:text-sm">
                        {isRTL ? 'راجع رقم الموديل ومواصفاته وشروط ضمان كايرو فولت في صفحة المنتج قبل الطلب.' : 'Review the model number, specifications, and CairoVolt warranty terms on the product page before ordering.'}
                    </div>
                </div>
            )}

            <div id="commerce-entry">
                <CategoryDiscoveryGrid
                    collection={brand as 'anker' | 'joyroom' | 'jbl'}
                    categories={safeCategories}
                    locale={locale}
                    pageName={pageHeading}
                    pageDescription={pageDescription}
                />

                <BestSellingProducts
                    brandSlug={brand}
                    brandDisplayName={isRTL ? brandDisplayName : data.hero.title}
                    locale={locale}
                    maxProducts={20}
                />
            </div>

            {/* Visible, server-rendered answer-engine context remains on the
                page, but follows the shopping decisions instead of blocking
                them above the fold. */}
            <section id="brand-guide" aria-labelledby={`${brand}-guide-heading`} className="scroll-mt-32 bg-white py-8 dark:bg-gray-950 sm:py-10">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-5 max-w-3xl text-center">
                        <span className={`text-xs font-black uppercase tracking-wide ${brand === 'joyroom' ? 'text-red-700' : brand === 'jbl' ? 'text-orange-700' : 'text-blue-700'}`}>
                            {isRTL ? 'معلومات الشراء' : 'Buying information'}
                        </span>
                        <h2 id={`${brand}-guide-heading`} className="mt-2 text-2xl font-black text-gray-950 dark:text-white md:text-3xl">
                            {isRTL ? `ملخص ${brandDisplayName} للشراء في مصر` : `${brandName} buying summary for Egypt`}
                        </h2>
                    </div>

                    <div className="mx-auto mb-5 max-w-3xl">
                        <QuickAnswerBox
                            answer={copy.quickAnswer}
                            locale={locale}
                            variant="subtle"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {copy.guideFeatures.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 md:px-5 md:py-2.5 md:text-sm">
                                <span className="text-green-600" aria-hidden="true">✓</span>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section aria-labelledby={`${brand}-catalogue-context-heading`} className="border-y border-gray-100 bg-gray-50 py-12 dark:border-gray-800 dark:bg-gray-900/70">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-7 max-w-3xl">
                            <span className={`text-xs font-black uppercase tracking-wide ${brand === 'joyroom' ? 'text-red-700 dark:text-red-300' : brand === 'jbl' ? 'text-orange-700 dark:text-orange-300' : 'text-blue-700 dark:text-blue-300'}`}>
                                {copy.overviewLabel}
                            </span>
                            <h2 id={`${brand}-catalogue-context-heading`} className="mt-2 text-2xl font-black text-gray-950 dark:text-white md:text-4xl">
                                {copy.overviewTitle}
                            </h2>
                        </div>

                        <div className="grid gap-5 text-sm leading-7 text-gray-700 dark:text-gray-300 md:grid-cols-3 md:text-base">
                            {copy.overviewParagraphs.map((paragraph) => (
                                <p key={paragraph} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-950">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <nav aria-label={isRTL ? `أقسام ${brandDisplayName}` : `${brandName} categories`} className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {safeCategories.map((category) => (
                                <Link
                                    key={category.href}
                                    href={getLocalizedHref(category.href)}
                                    className={`group flex h-full flex-col rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-gray-950 ${brand === 'joyroom'
                                        ? 'border-red-200 text-red-800 hover:border-red-400 dark:border-red-900 dark:text-red-300'
                                        : brand === 'jbl'
                                            ? 'border-orange-200 text-orange-800 hover:border-orange-400 dark:border-orange-900 dark:text-orange-300'
                                            : 'border-blue-200 text-blue-800 hover:border-blue-400 dark:border-blue-900 dark:text-blue-300'
                                    }`}
                                >
                                    <span className="inline-flex items-center justify-between gap-3 text-sm font-black">
                                        {isRTL ? category.title.ar : category.title.en}
                                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">{isRTL ? '←' : '→'}</span>
                                    </span>
                                    <span className="mt-2 text-xs font-normal leading-6 text-gray-600 dark:text-gray-400">
                                        {isRTL ? category.description.ar : category.description.en}
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </section>

            {/* The Soundcore relationship remains visible and crawlable, but
                no longer sits between Anker shoppers and Anker products. */}
            {brand === 'anker' && <SoundcoreFamilyStrip locale={locale} />}

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* Extended Info Section: Brand Overview & Trust Elements */}
            {/* Brand content section */}
            {/* ═══════════════════════════════════════════════════════════ */}

            {/* Brand Overview Block - Content Context */}
            <div className="container mx-auto px-4 py-4 relative z-20">
                <BrandOverviewBlock
                    brandName={isRTL ? brandDisplayName : brandName}
                    brandDescription={pageDescription}
                    categoryCount={data.categories.length}
                    totalProducts={brandProductCount}
                    locale={locale}
                />
            </div>

            {/* Current store and catalogue information. */}
            <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-6 border-y border-gray-100 dark:border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {copy.serviceBadges.map((badge) => (
                            <div key={badge.title} className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
                                <SvgIcon name={badge.icon} className="w-7 h-7 mb-2" />
                                <span className="font-bold text-sm text-gray-900 dark:text-white">
                                    {badge.title}
                                </span>
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {badge.description}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Neutral shopping guidance based on product-page information. */}
            <section className="border-t border-gray-100 bg-white py-14 dark:border-gray-900 dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-10 max-w-3xl text-center">
                        <h2 className="text-3xl font-black dark:text-white md:text-4xl">
                            {isRTL ? `كيف تختار من منتجات ${brandDisplayName}` : `How to choose a ${brandName} product`}
                        </h2>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">
                            {isRTL
                                ? 'استخدم مواصفات جهازك وبيانات صفحة المنتج للوصول إلى اختيار مناسب.'
                                : 'Use your device requirements and the product-page details to make a suitable choice.'}
                        </p>
                    </div>
                    <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
                        {copy.shoppingSteps.map((step) => (
                            <div key={step.title} className="rounded-3xl border border-gray-100 bg-gray-50 p-7 text-center dark:border-gray-800 dark:bg-gray-900">
                                <SvgIcon name={step.icon} className="mx-auto mb-4 h-9 w-9 text-blue-600 dark:text-blue-400" />
                                <h3 className="text-lg font-bold text-gray-950 dark:text-white">{step.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section (Accordion) */}
            <section className="py-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                    </h2>
                    <div className="space-y-4">
                        {copy.faq.map((item) => (
                            <details key={item.question} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 open:shadow-lg transition-all duration-300">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <span className="font-bold text-lg dark:text-white">{item.question}</span>
                                    <span className="transform group-open:rotate-180 transition-transform duration-300 text-gray-400">
                                        ▼
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-4">
                                    {item.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQSection removed — was duplicating the same FAQ questions shown above */}

            {/* Share Analytics — captures WhatsApp shares */}
            <ShareAnalytics />

        </div>
    );
}
