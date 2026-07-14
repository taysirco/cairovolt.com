// Auto-generated barrel index — DO NOT EDIT MANUALLY

export type { GenericCategory } from './generic-categories/_types';
import type { GenericCategory } from './generic-categories/_types';

import { power_banks_generic } from './generic-categories/power-banks';
import { chargers_generic } from './generic-categories/chargers';
import { earbuds_generic } from './generic-categories/earbuds';
import { cables_generic } from './generic-categories/cables';

export const genericCategories: import('./generic-categories/_types').GenericCategory[] = [
    power_banks_generic,
    chargers_generic,
    earbuds_generic,
    cables_generic,
];

export function getGenericCategory(slug: string): GenericCategory | undefined {
    return genericCategories.find(c => c.slug === slug);
}

export function getAllGenericCategorySlugs(): string[] {
    return genericCategories.map(c => c.slug);
}
