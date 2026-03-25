import { fetchProducts, transformProduct } from '@/lib/siteApi';
import type { Product } from '@/types';

/** 首页一次拉取的产品条数（画廊轮播用） */
export const HOME_PRODUCT_FETCH_LIMIT = 20;

export type HomeProductsResult = {
  gallery: Product[];
};

function sortByFeaturedThenNew(a: Product, b: Product): number {
  const scoreA =
    (a.featured ? 10 : 0) + (a.is_new ? 5 : 0) + (a.bestseller ? 3 : 0);
  const scoreB =
    (b.featured ? 10 : 0) + (b.is_new ? 5 : 0) + (b.bestseller ? 3 : 0);
  return scoreB - scoreA;
}

/**
 * 构建时拉取首页产品：整批作画廊（最多 HOME_PRODUCT_FETCH_LIMIT 条）。
 */
export async function loadHomeProducts(locale: string): Promise<HomeProductsResult> {
  try {
    const raw = await fetchProducts(locale, { limit: HOME_PRODUCT_FETCH_LIMIT });
    if (raw.length === 0) {
      return { gallery: [] };
    }
    const transformed = raw.map((p) => transformProduct(p, locale)).sort(sortByFeaturedThenNew);
    return {
      gallery: transformed,
    };
  } catch (e) {
    console.error('[homepageData] loadHomeProducts:', e);
    return { gallery: [] };
  }
}
