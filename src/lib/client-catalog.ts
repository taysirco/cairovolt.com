/**
 * client-catalog.ts — Client-safe catalog helpers.
 *
 * Binds the shared catalog logic (@/lib/catalog-core) to the slim generated
 * catalog (src/data/client-catalog.generated.ts — pricing/bundle facts only,
 * NO descriptions), so client components get catalog pricing without shipping
 * the ~1.5MB full catalog to the browser.
 *
 * Client components must import from HERE, never from '@/lib/static-products'
 * (which throws in the browser by design).
 */

import { clientCatalog, type ClientCatalogProduct } from '@/data/client-catalog.generated';
import {
    resolveCatalogPricingFrom,
    getSmartBundleProductsFrom,
    type CatalogPricing,
    type BundleResultOf,
} from '@/lib/catalog-core';

export type { ClientCatalogProduct };
export type { CatalogPricing };
export { clientCatalog };

export function getProductBySlug(slug: string): ClientCatalogProduct | undefined {
    return clientCatalog.find(p => p.slug === slug);
}

/** Same pricing rules the server enforces at order time — see catalog-core. */
export function resolveCatalogPricing(item: {
    productId?: string;
    sku?: string;
    slug?: string;
}): CatalogPricing {
    return resolveCatalogPricingFrom(clientCatalog, item);
}

/** Same bundle engine the server uses — bound to the slim catalog. */
export function getSmartBundleProducts(
    product: ClientCatalogProduct,
): BundleResultOf<ClientCatalogProduct> {
    return getSmartBundleProductsFrom(clientCatalog, product);
}
