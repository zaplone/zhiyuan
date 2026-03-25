import type { Product } from '@/types';

/** 与 ProductCategories / 产品列表页共用的筛选状态 */
export type CatalogFiltersState = {
  standard: string;
  feature: string;
  style: string;
  toeCap: string;
};

export function defaultCatalogFilters(): CatalogFiltersState {
  return {
    standard: 'All Standards',
    feature: 'All Features',
    style: 'All Styles',
    toeCap: 'All',
  };
}

/** 从当前产品列表去重得到筛选项（与后台字段一致） */
export function deriveFacets(products: Product[]) {
  const standards = new Set<string>();
  const styles = new Set<string>();
  const toeCaps = new Set<string>();
  for (const p of products) {
    if (p.safety_standard) standards.add(p.safety_standard);
    if (p.style) styles.add(p.style);
    if (p.materials?.toe_cap) toeCaps.add(p.materials.toe_cap);
  }
  const sortStr = (a: string, b: string) => a.localeCompare(b, undefined, { sensitivity: 'base' });
  return {
    standards: Array.from(standards).sort(sortStr),
    styles: Array.from(styles).sort(sortStr),
    toeCaps: Array.from(toeCaps).sort(sortStr),
  };
}

type MatchOptions = {
  /** 首页行业 Tab：'all' 或行业 id */
  industryTab?: string;
};

/**
 * 单条产品是否通过「目录」筛选（标准 / 特性 / 款式 / 鞋头 + 可选行业 Tab）
 */
export function productMatchesCatalogFilters(
  p: Product,
  filters: CatalogFiltersState,
  options?: MatchOptions
): boolean {
  if (options?.industryTab && options.industryTab !== 'all') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!p.industries?.includes(options.industryTab as any)) return false;
  }

  if (filters.standard !== 'All Standards' && p.safety_standard !== filters.standard) return false;
  if (filters.style !== 'All Styles' && p.style !== filters.style) return false;
  if (filters.toeCap !== 'All' && p.materials?.toe_cap !== filters.toeCap) return false;

  if (filters.feature !== 'All Features') {
    if (filters.feature === 'Waterproof') {
      return !!(
        p.additional_certs?.includes('WR') ||
        p.safety_standard === 'S3' ||
        p.materials?.upper?.toLowerCase().includes('waterproof')
      );
    }
    if (filters.feature === 'Metal Free') {
      return p.materials?.toe_cap !== 'Steel' && p.materials?.midsole !== 'Steel Plate';
    }
    if (filters.feature === 'Insulated') {
      return !!p.additional_certs?.includes('CI');
    }
    if (filters.feature === 'Slip Resistant') {
      return !!p.additional_certs?.includes('SRC');
    }
    return false;
  }

  return true;
}
