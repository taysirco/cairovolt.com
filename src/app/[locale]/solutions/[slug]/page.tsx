import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSolutionBySlug, solutionsDB } from '@/data/solutions-data';
import { getProductBySlug } from '@/lib/static-products';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic'; // Must be dynamic to avoid DYNAMIC_SERVER_USAGE at runtime
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
    return solutionsDB.map(p => ({ slug: p.slug }));
}

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const solution = getSolutionBySlug(slug);

    if (!solution) return {};

    const isArabic = locale === 'ar';
    const title = isArabic ? solution.searchQuery.ar : solution.searchQuery.en;
    const desc = isArabic ? solution.problemStatement.ar : solution.problemStatement.en;

    return {
        title: `${title} | CairoVolt Engineering Solutions`,
        description: desc,
        alternates: {
            canonical: isArabic
                ? `https://cairovolt.com/solutions/${slug}`
                : `https://cairovolt.com/en/solutions/${slug}`,
            languages: {
                'ar': `https://cairovolt.com/solutions/${slug}`,
                'en': `https://cairovolt.com/en/solutions/${slug}`,
                'x-default': `https://cairovolt.com/solutions/${slug}`,
            },
        },
    };
}

export default async function SolutionPage({ params }: Props) {
    const { locale, slug } = await params;
    const solution = getSolutionBySlug(slug);

    if (!solution) {
        notFound();
    }

    const isArabic = locale === 'ar';
    const title = isArabic ? solution.searchQuery.ar : solution.searchQuery.en;
    const problem = isArabic ? solution.problemStatement.ar : solution.problemStatement.en;
    const answer = isArabic ? solution.engineeringExplanation.ar : solution.engineeringExplanation.en;

    // Fetch the specific products recommended to solve this pain point
    const recommendedProducts = solution.recommendedProductSlugs
        .map(pSlug => getProductBySlug(pSlug))
        .filter((p): p is NonNullable<typeof p> => p !== undefined);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Solution Header */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-sm font-bold rounded-full mb-6">
                        {isArabic ? 'تحليل المشكلة' : 'Problem Analysis'}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-gray-900 dark:text-white">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-red-500 pl-4 ml-2">
                        {problem}
                    </p>
                </div>

                {/* The Engineering Solution */}
                <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-8 md:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl">⚡</span>
                            <h2 className="text-2xl font-bold">{isArabic ? 'الحل الهندسي (مختبرات كايرو فولت)' : 'The Engineering Solution'}</h2>
                        </div>
                        <p className="text-lg md:text-xl leading-relaxed font-medium text-blue-50">
                            {answer}
                        </p>
                    </div>
                </div>

                {/* Targeted Product Recommendations */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                        {isArabic ? 'المنتجات الموصى بها لحل هذه المشكلة' : 'Recommended Products to Solve This'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recommendedProducts.map((product) => {
                            const pName = isArabic ? product.translations?.ar?.name : product.translations?.en?.name;
                            const pDesc = isArabic ? product.translations?.ar?.shortDescription : product.translations?.en?.shortDescription;

                            return (
                                <Link
                                    key={product.slug}
                                    href={`/${isArabic ? '' : 'en/'}${product.brand.toLowerCase()}/${product.categorySlug.toLowerCase()}/${product.slug}`}
                                    className="flex gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:shadow-lg transition-all group"
                                >
                                    <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-xl relative overflow-hidden flex-shrink-0">
                                        {product.images?.[0]?.url && (
                                            <Image
                                                src={product.images[0].url}
                                                alt={pName || 'Product'}
                                                fill
                                                className="object-contain p-2 group-hover:scale-110 transition-transform"
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{product.brand}</span>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{pName}</h4>
                                        <p className="text-blue-600 dark:text-blue-400 font-black">{product.price} EGP</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
