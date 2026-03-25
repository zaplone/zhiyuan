import type { Product } from '@/types';

/**
 * 产品列表排序：优先按 updated_at / created_at 新到旧；无日期时用 id 字符串降序（兼容 UUID）。
 * 替代原先 `b.id - a.id`（升级后 id 为字符串会得 NaN）。
 */
export function compareProductsNewestFirst(a: Product, b: Product): number {
  const ta = a.updated_at || a.created_at;
  const tb = b.updated_at || b.created_at;
  if (ta && tb) {
    const diff = new Date(tb).getTime() - new Date(ta).getTime();
    if (diff !== 0) return diff;
  }
  return String(b.id).localeCompare(String(a.id));
}
