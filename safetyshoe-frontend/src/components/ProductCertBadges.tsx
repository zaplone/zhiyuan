import type { Product } from '@/types';

type ProductCertBadgesProps = {
  product: Product;
  compact?: boolean;
  /** 与卡片角标解耦，用于叠在图片底部的横排展示 */
  inline?: boolean;
};

export function ProductCertBadges({ product, compact, inline }: ProductCertBadgesProps) {
  const wrapper = inline
    ? 'flex flex-wrap items-center gap-1.5'
    : `absolute ${compact ? 'top-2 left-2' : 'top-4 left-4'} flex max-w-[55%] flex-col gap-1.5`;

  return (
    <div className={wrapper}>
      {product.safety_standard && (
        <span className="rounded border border-primary-500 bg-primary-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
          {product.safety_standard}
        </span>
      )}
      {(compact ? product.additional_certs?.slice(0, 2) : product.additional_certs)?.map((cert, idx) => (
        <span
          key={idx}
          className="rounded border border-slate-200 bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-900 shadow-sm backdrop-blur"
        >
          {cert}
        </span>
      ))}
    </div>
  );
}
