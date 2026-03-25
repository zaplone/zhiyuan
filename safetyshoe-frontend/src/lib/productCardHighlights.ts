import type { Product } from '@/types';

const MAX_TAG_LEN = 48;
const DEFAULT_MAX_TAGS = 4;

/**
 * 首页卡片「卖点」标签（不新加 API 字段时的折中方案）：
 * 1. specs_extra.card_highlights：逗号/中文逗号分隔的短标签（可选，需后端在 specs_extra 写入）
 * 2. specs_extra.highlight_1 … highlight_4：单条短文案（可选）
 * 3. features：结构化特性名，取前几条
 */
export function productCardSellingTags(p: Product, max = DEFAULT_MAX_TAGS): string[] {
  const extra = p.specs_extra ?? {};

  const fromCsv =
    typeof extra.card_highlights === 'string'
      ? extra.card_highlights
          .split(/[,，]/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  const fromKeys = ['highlight_1', 'highlight_2', 'highlight_3', 'highlight_4']
    .map((k) => (typeof extra[k] === 'string' ? extra[k]!.trim() : ''))
    .filter(Boolean);

  const fromFeatures = (p.features ?? []).map((f) => f.trim()).filter(Boolean);

  const merged = [...fromCsv, ...fromKeys, ...fromFeatures];
  const seen = new Set<string>();
  const out: string[] = [];

  for (const raw of merged) {
    if (raw.length > MAX_TAG_LEN) continue;
    const key = raw.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(raw);
    if (out.length >= max) break;
  }

  return out;
}

/** 主推大图底部一行卖点：用前 1～2 个标签拼接，不用长 description */
export function heroSellingLine(p: Product): string | null {
  const tags = productCardSellingTags(p, 4);
  if (tags.length === 0) return null;
  const line = tags.slice(0, 2).join(' · ');
  return line.length > 160 ? `${line.slice(0, 157)}…` : line;
}
