import { Metadata } from 'next';
import { generateCategoryMetadata, GenericCategoryContent } from '@/lib/generic-category-helpers';

export const revalidate = 3600;

const SLUG = 'chargers';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return generateCategoryMetadata(locale, SLUG);
}

export default async function ChargersPage({ params }: Props) {
    const { locale } = await params;
    return <GenericCategoryContent locale={locale} categorySlug={SLUG} />;
}
