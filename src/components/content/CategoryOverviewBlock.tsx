import { SvgIcon } from '@/components/ui/SvgIcon';
import { localizeArabicBrandNames } from '@/lib/arabic-brand-names';

// ============================================
// CATEGORY OVERVIEW BLOCK
// ============================================
// This component provides helpful context blocks
// that are optimized for quick user understanding

interface CategoryOverviewBlockProps {
    productName: string;
    brand: string;
    category: string;
    price: number;
    locale: string;
    variant?: 'product' | 'category' | 'brand';
    shortDescription?: string;
}

/**
 * Category Overview Block Component
 * Provides immediate, concise answers for users
 * Position: Immediately after Hero section for maximum visibility
 */
export function CategoryOverviewBlock({
    productName,
    brand,
    category,
    price,
    locale,
    variant = 'product',
    shortDescription
}: CategoryOverviewBlockProps) {
    const isArabic = locale === 'ar';
    const displayProductName = isArabic ? localizeArabicBrandNames(productName) : productName;
    const displayBrand = isArabic ? localizeArabicBrandNames(brand) : brand;
    const displayCategory = isArabic ? localizeArabicBrandNames(category) : category;
    const displayDescription = shortDescription
        ? (isArabic ? localizeArabicBrandNames(shortDescription) : shortDescription)
        : undefined;

    // Hash to rotate content naturally based on the product/brand
    const hash = typeof productName === 'string' ? productName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;

    const arAriaTypes = ['ملخص سريع', 'إجابتك هنا', 'نظرة سريعة', 'الخلاصة المختصرة'];
    const enAriaTypes = ['Quick Summary', 'TL;DR', 'At a Glance', 'Fast Facts'];

    const arHeadings = ['إجابة سريعة', 'الخلاصة من الآخر', 'في السريع كده', 'عشان وقتك يهمنا', 'ع الماشي'];
    const enHeadings = ['Quick Answer', 'The Bottom Line', 'In a Nutshell', 'For Your Time', 'Quick Facts'];

    const selectedArAria = arAriaTypes[hash % arAriaTypes.length];
    const selectedEnAria = enAriaTypes[hash % enAriaTypes.length];
    const selectedArHeading = arHeadings[hash % arHeadings.length];
    const selectedEnHeading = enHeadings[hash % enHeadings.length];

    // Generate summary based on variant
    const getSummary = () => {
        const formattedPrice = new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-EG', {
            style: 'currency',
            currency: 'EGP',
            maximumFractionDigits: 0
        }).format(price);

        if (variant === 'product') {
            const arProductTemplates = [
                `${displayProductName} من ${displayBrand} متوفر بسعر ${formattedPrice}. راجع المواصفات والتوافر ومدة ضمان كايرو فولت وشروطه في صفحة المنتج. ${displayDescription || 'تظهر تفاصيل الطلب قبل إتمام الشراء.'}`,
                `${displayProductName} من ${displayBrand} بسعر ${formattedPrice}. قارن قدرة الشحن والتوافق والملحقات المرفقة قبل الطلب. ${displayDescription || 'صفحة المنتج هي المرجع للتفاصيل الحالية.'}`,
                `تعرّف على ${displayProductName} من ${displayBrand} بسعر ${formattedPrice}. توضح الصفحة مواصفات الموديل والتوافر وشروط ضمان كايرو فولت. ${displayDescription || 'اختره بعد التأكد من توافقه مع جهازك.'}`,
                `${displayProductName} ضمن قسم ${displayCategory} بسعر ${formattedPrice}. راجع بيانات الموديل وخيارات الدفع والتوصيل المتاحة لعنوانك. ${displayDescription || 'قد تختلف المزايا حسب الموديل.'}`,
            ];
            const enProductTemplates = [
                `${displayProductName} by ${displayBrand} is listed at ${formattedPrice}. Review specifications, availability, and the written CairoVolt warranty duration and terms on the product page. ${displayDescription || 'Order details are shown before checkout.'}`,
                `${displayProductName} by ${displayBrand} is listed at ${formattedPrice}. Compare charging output, compatibility, and included accessories before ordering. ${displayDescription || 'The product page is the source for current details.'}`,
                `Review ${displayProductName} by ${displayBrand} at ${formattedPrice}. The page states the model specifications, availability, and CairoVolt warranty terms. ${displayDescription || 'Confirm compatibility with your device before ordering.'}`,
                `${displayProductName} appears in the ${displayCategory} section at ${formattedPrice}. Check the model details and the payment and delivery options available for your address. ${displayDescription || 'Features can vary by model.'}`,
            ];
            return isArabic ? arProductTemplates[hash % arProductTemplates.length] : enProductTemplates[hash % enProductTemplates.length];
        }

        if (variant === 'category') {
            const arCatTemplates = [
                `تصفح قسم ${displayCategory} من ${displayBrand} بأسعار تبدأ من ${formattedPrice}. تعرض كل صفحة مواصفات الموديل والتوافر وشروط ضمان كايرو فولت.`,
                `قارن منتجات ${displayCategory} من ${displayBrand} ابتداءً من ${formattedPrice}. تحقق من القدرة والتوافق والملحقات قبل اختيار المنتج.`,
                `يضم قسم ${displayCategory} من ${displayBrand} خيارات تبدأ من ${formattedPrice}. تتحدد خيارات الدفع والتوصيل ومدة الضمان حسب المنتج والطلب.`,
            ];
            const enCatTemplates = [
                `Browse ${displayBrand} ${displayCategory} from ${formattedPrice}. Each product page states the model specifications, availability, and CairoVolt warranty terms.`,
                `Compare ${displayBrand} ${displayCategory} from ${formattedPrice}. Check output, compatibility, and included accessories before choosing a product.`,
                `${displayBrand} ${displayCategory} options start at ${formattedPrice}. Payment, delivery, and warranty details vary by product and order.`,
            ];
            return isArabic ? arCatTemplates[hash % arCatTemplates.length] : enCatTemplates[hash % enCatTemplates.length];
        }

        if (variant === 'brand') {
            if (isArabic) {
                return `تصفح منتجات ${displayBrand} المتاحة في قسم ${displayCategory}. توضح صفحة كل منتج السعر والمواصفات والتوافر ومدة ضمان كايرو فولت وشروطه.`;
            }
            return `Browse available ${displayBrand} products in the ${displayCategory} section. Each product page states its price, specifications, availability, and CairoVolt warranty terms.`;
        }

        return '';
    };

    return (
        <section
            className="speakable-content category-overview-block bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 md:p-6 my-4 md:my-6 border border-gray-200 dark:border-gray-700"
            aria-label={isArabic ? selectedArAria : selectedEnAria}
        >
            {/* Icon Indicator */}
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <div className="flex-1">
                    {/* Quick Answer Label */}
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1 block">
                        {isArabic ? <><SvgIcon name="sparkles" className="w-4 h-4 inline-block" /> {selectedArHeading}</> : <><SvgIcon name="sparkles" className="w-4 h-4 inline-block" /> {selectedEnHeading}</>}
                    </span>

                    {/* Main Summary Content - 40-60 words */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                        {getSummary()}
                    </p>
                </div>
            </div>

            {/* Quality Indicators — Dynamically Rotated */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400">
                {(() => {
                    const arInfoSets = [
                        ['السعر الحالي موضح', 'شروط ضمان كايرو فولت', 'التوصيل حسب العنوان'],
                        ['مواصفات الموديل', 'التوافر وقت الطلب', 'خيارات الدفع المتاحة'],
                        ['التوافق حسب الجهاز', 'مدة الضمان حسب المنتج', 'دعم كايرو فولت'],
                        ['تفاصيل الملحقات', 'سياسة الاستبدال مكتوبة', 'مراجعة الطلب قبل الشحن'],
                    ];
                    const enInfoSets = [
                        ['Current price shown', 'CairoVolt warranty terms', 'Address-based delivery'],
                        ['Model specifications', 'Availability at order time', 'Available payment options'],
                        ['Device compatibility', 'Product-specific warranty', 'CairoVolt support'],
                        ['Included accessories', 'Written exchange policy', 'Order review before dispatch'],
                    ];
                    const infoSet = isArabic ? arInfoSets[hash % arInfoSets.length] : enInfoSets[hash % enInfoSets.length];
                    return infoSet.map((text, i) => (
                        <span key={i} className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {text}
                        </span>
                    ));
                })()}
            </div>
        </section>
    );
}

// ============================================
// COLLECTION OVERVIEW BLOCK - For Category Pages
// ============================================

interface CollectionOverviewBlockProps {
    categoryName: string;
    categoryNameAr: string;
    brand: string;
    productCount: number;
    priceRange: { min: number; max: number };
    locale: string;
}

export function CollectionOverviewBlock({
    categoryName,
    categoryNameAr,
    brand,
    productCount,
    priceRange,
    locale
}: CollectionOverviewBlockProps) {
    const isArabic = locale === 'ar';
    const displayBrand = isArabic ? localizeArabicBrandNames(brand) : brand;
    const hash = typeof categoryName === 'string' ? categoryName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;

    const arCategoryAria = ['نظرة عامة على القسم', 'اكتشف القسم', 'محتويات القسم سريعا'];
    const enCategoryAria = ['Category Overview', 'Discover Category', 'Category at a glance'];

    const arCategoryHeading = ['ملخص القسم', 'جولة في القسم', 'دليلك للقسم'];
    const enCategoryHeading = ['Category Overview', 'Category Tour', 'Category Guide'];

    const selectedArAria = arCategoryAria[hash % arCategoryAria.length];
    const selectedEnAria = enCategoryAria[hash % enCategoryAria.length];
    const selectedArHeading = arCategoryHeading[hash % arCategoryHeading.length];
    const selectedEnHeading = enCategoryHeading[hash % enCategoryHeading.length];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-EG', {
            style: 'currency',
            currency: 'EGP',
            maximumFractionDigits: 0
        }).format(price);
    };

    const getSummary = () => {
        const name = isArabic ? categoryNameAr : categoryName;

        if (isArabic) {
            return `تصفح ${productCount} منتجًا من ${name} ${displayBrand}. تتراوح الأسعار الحالية من ${formatPrice(priceRange.min)} إلى ${formatPrice(priceRange.max)}، وتوضح صفحة كل منتج مواصفاته وتوافره وشروط ضمان كايرو فولت.`;
        }
        return `Browse ${productCount} ${displayBrand} ${name} products. Current prices range from ${formatPrice(priceRange.min)} to ${formatPrice(priceRange.max)}, and each product page states its specifications, availability, and CairoVolt warranty terms.`;
    };

    return (
        <section
            className="speakable-content collection-overview-block bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 md:p-6 my-4 md:my-6 border border-blue-100 dark:border-blue-800"
            aria-label={isArabic ? selectedArAria : selectedEnAria}
        >
            <div className="flex items-start gap-4">
                {/* Category Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-xl flex items-center justify-center">
                    <SvgIcon name="phone" className="w-6 h-6" />
                </div>

                <div className="flex-1">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2 block">
                        {isArabic ? <><SvgIcon name="clipboard" className="w-4 h-4 inline-block" /> {selectedArHeading}</> : <><SvgIcon name="clipboard" className="w-4 h-4 inline-block" /> {selectedEnHeading}</>}
                    </span>

                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                        {getSummary()}
                    </p>

                    {/* Quick Stats */}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {productCount}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                {isArabic ? 'منتج' : 'Products'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
                                {isArabic ? 'حسب المنتج' : 'By product'}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                {isArabic ? 'مدة الضمان' : 'Warranty term'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {isArabic ? 'حسب العنوان' : 'By address'}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                {isArabic ? 'التوصيل' : 'Delivery'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// BRAND OVERVIEW BLOCK - For Brand Hub Pages
// ============================================

interface BrandOverviewBlockProps {
    brandName: string;
    brandDescription: string;
    categoryCount: number;
    totalProducts: number;
    locale: string;
}

export function BrandOverviewBlock({
    brandName,
    brandDescription,
    categoryCount,
    totalProducts,
    locale
}: BrandOverviewBlockProps) {
    const isArabic = locale === 'ar';
    const displayBrandName = isArabic ? localizeArabicBrandNames(brandName) : brandName;
    const displayBrandDescription = isArabic ? localizeArabicBrandNames(brandDescription) : brandDescription;

    const getSummary = () => {
        if (isArabic) {
            return `${displayBrandName} على كايرو فولت. ${displayBrandDescription} تضم الصفحة ${totalProducts} منتجًا في ${categoryCount} أقسام، مع توضيح مدة ضمان كايرو فولت وشروطه على صفحة كل منتج، وتوصيل متاح داخل مصر حسب العنوان.`;
        }
        return `${displayBrandName} at CairoVolt. ${displayBrandDescription} This page covers ${totalProducts} products across ${categoryCount} categories. CairoVolt warranty duration and terms are stated on each product page, with delivery in Egypt subject to the address.`;
    };

    return (
        <section
            className="speakable-content brand-overview-block bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-5 md:p-6 my-4 md:my-6"
            aria-label={isArabic ? 'نظرة عامة على العلامة التجارية' : 'Brand Overview'}
        >
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <SvgIcon name="trophy" className="w-6 h-6" />
                </div>

                <div className="flex-1">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2 block">
                        {isArabic ? <><SvgIcon name="target" className="w-4 h-4 inline-block" /> ملخص العلامة</> : <><SvgIcon name="target" className="w-4 h-4 inline-block" /> Brand summary</>}
                    </span>

                    <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                        {getSummary()}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default CategoryOverviewBlock;
