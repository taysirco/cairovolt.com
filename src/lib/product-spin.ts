/**
 * product-spin.ts
 *
 * Build-time helper that counts 360° spin master frames for a given product
 * from the generated public-image manifest — the SAME source of truth the
 * image sitemap reads. No runtime filesystem access, so it is safe to call
 * from the server component (page.tsx) on Firebase App Hosting.
 *
 * A "spin" is considered present only when its master frames
 *   /products/<brand>/<slug>/spin/<slug>-spin-NN.webp
 * are listed in the manifest (which is derived from `git ls-files`) — an
 * untracked file on disk is NOT counted, which matches the "ship dark until
 * the owner drops real frames" contract.
 *
 * The viewer itself will read the -800.webp / -480.webp siblings; those are
 * NOT counted here (we count masters only, so a partial regen doesn't inflate
 * the frame count).
 */
import { PUBLIC_IMAGE_PATHS } from '../app/image-sitemap.xml/public-image-paths.generated';

const ESC = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function getSpin360FrameCount(brand: string, slug: string): number {
  const b = brand.toLowerCase();
  const re = new RegExp(`^/products/${ESC(b)}/${ESC(slug)}/spin/${ESC(slug)}-spin-\\d{2}\\.webp$`);
  let n = 0;
  for (const p of PUBLIC_IMAGE_PATHS) if (re.test(p)) n++;
  return n;
}

/** Absolute path (public root) to the master file for a given 1-based frame index. */
export function getSpin360FrameMasterPath(brand: string, slug: string, frame1: number): string {
  const nn = String(frame1).padStart(2, '0');
  return `/products/${brand.toLowerCase()}/${slug}/spin/${slug}-spin-${nn}.webp`;
}
