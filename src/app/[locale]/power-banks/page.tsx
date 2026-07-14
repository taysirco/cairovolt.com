import { Metadata } from 'next';
import { generateCategoryMetadata, GenericCategoryContent } from '@/lib/generic-category-helpers';

// ISR: On-demand revalidation only (via /api/indexing webhook)

const SLUG = 'power-banks';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return generateCategoryMetadata(locale, SLUG);
}

export default async function PowerBanksPage({ params }: Props) {
    const { locale } = await params;
    return <GenericCategoryContent locale={locale} categorySlug={SLUG} />;
}
