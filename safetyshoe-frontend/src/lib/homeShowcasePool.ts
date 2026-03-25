import type { Product } from '@/types';
import { compareProductsNewestFirst } from '@/lib/productSort';

/** 与后端一致：is_hot（热销/主推池）、is_new（新品） */
export type ShowcaseMode = 'featured' | 'new';

function dedupeById(products: Product[]): Product[] {
  const seen = new Set<string | number>();
  const out: Product[] = [];
  for (const p of products) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    out.push(p);
  }
  return out;
}

function sortByNewest(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
    if (tb !== ta) return tb - ta;
    return compareProductsNewestFirst(a, b);
  });
}

/** 无标记时两个 Tab 轮换顺序，避免看起来始终是同一批款 */
function rotateByMode(base: Product[], mode: ShowcaseMode): Product[] {
  if (base.length <= 1) return base;
  const k = mode === 'featured' ? 0 : 1;
  const r = k % base.length;
  return [...base.slice(r), ...base.slice(0, r)];
}

/**
 * 首页 Tab 对应的商品顺序（主推区取前 5、画廊共用）。
 * featured ← Product.featured（后端 is_hot）；new ← is_new
 */
export function getShowcasePool(products: Product[], mode: ShowcaseMode): Product[] {
  const list = dedupeById(products);
  if (list.length === 0) return [];

  if (mode === 'featured') {
    const tagged = list.filter((p) => p.featured === true);
    if (tagged.length > 0) {
      const rest = list.filter((p) => !tagged.some((t) => t.id === p.id));
      return dedupeById([...tagged, ...rest]);
    }
    const byNewest = [...list].sort(compareProductsNewestFirst);
    return rotateByMode(byNewest, 'featured');
  }

  const tagged = list.filter((p) => p.is_new === true);
  if (tagged.length > 0) {
    return dedupeById([...tagged, ...sortByNewest(list.filter((p) => !tagged.some((t) => t.id === p.id)))]);
  }
  const newestFirst = sortByNewest(list);
  const hasAnyDate = list.some((p) => p.created_at);
  if (hasAnyDate) return rotateByMode(newestFirst, 'new');
  return rotateByMode([...list].sort(compareProductsNewestFirst), 'new');
}

/** 主推区 1+4：顺序来自 getShowcasePool；不足时从全量列表补位 */
export function pickFiveProductsFromPool(poolOrdered: Product[], allProducts: Product[]): {
  hero: Product;
  side: Product[];
} {
  const poolD = dedupeById(poolOrdered);
  const allD = dedupeById(allProducts);
  const hero = poolD[0] ?? allD[0]!;
  let side = poolD.slice(1, 5);
  while (side.length < 4) {
    const next = allD.find((p) => p.id !== hero.id && !side.some((s) => s.id === p.id));
    if (!next) break;
    side.push(next);
  }
  return { hero, side };
}

export function showcaseUsedFallback(products: Product[], mode: ShowcaseMode): boolean {
  const list = dedupeById(products);
  if (mode === 'featured') {
    return list.filter((p) => p.featured === true).length < 5;
  }
  return list.filter((p) => p.is_new === true).length < 5;
}
