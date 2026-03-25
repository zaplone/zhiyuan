'use client';

import { useMemo } from 'react';
import { Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Product } from '@/types';
import type { CatalogFiltersState } from '@/lib/productCatalogFilters';
import { defaultCatalogFilters, deriveFacets } from '@/lib/productCatalogFilters';

type ControlsProps = {
  products: Product[];
  filters: CatalogFiltersState;
  onFiltersChange: (next: CatalogFiltersState) => void;
  onResetComplete?: () => void;
  className?: string;
};

/**
 * 仅筛选下拉 + 重置（无外层「筛选」标题卡片），供工具栏内联或 ProductCatalogFilterBar 复用。
 */
export function ProductCatalogFilterControls({
  products,
  filters,
  onFiltersChange,
  onResetComplete,
  className = '',
}: ControlsProps) {
  const t = useTranslations('ProductCategories');

  const FILTER_OPTIONS = useMemo(
    () => ({
      standard: [
        { value: 'All Standards', label: t('filter.standards.all') },
        { value: 'S3', label: 'S3' },
        { value: 'S1P', label: 'S1P' },
        { value: 'SB', label: 'SB' },
        { value: 'OB', label: 'OB' },
      ],
      feature: [
        { value: 'All Features', label: t('filter.features.all') },
        { value: 'Waterproof', label: t('filter.features.waterproof') },
        { value: 'Metal Free', label: t('filter.features.metalFree') },
        { value: 'Insulated', label: t('filter.features.insulated') },
        { value: 'Slip Resistant', label: t('filter.features.slipResistant') },
      ],
      style: [
        { value: 'All Styles', label: t('filter.styles.all') },
        { value: 'Low Cut', label: t('filter.styles.low') },
        { value: 'Mid Cut', label: t('filter.styles.mid') },
        { value: 'High Boot', label: t('filter.styles.high') },
      ],
    }),
    [t]
  );

  const facets = useMemo(() => deriveFacets(products), [products]);

  const standardOptions = useMemo(() => {
    const all = { value: 'All Standards', label: t('filter.standards.all') };
    if (facets.standards.length > 0) {
      return [all, ...facets.standards.map((s) => ({ value: s, label: s }))];
    }
    return FILTER_OPTIONS.standard;
  }, [facets.standards, t, FILTER_OPTIONS.standard]);

  const styleOptions = useMemo(() => {
    const all = { value: 'All Styles', label: t('filter.styles.all') };
    const map: Record<string, 'low' | 'mid' | 'high'> = {
      'Low Cut': 'low',
      'Mid Cut': 'mid',
      'High Boot': 'high',
    };
    const labelStyle = (s: string) => {
      const k = map[s];
      return k ? t(`filter.styles.${k}`) : s;
    };
    if (facets.styles.length > 0) {
      return [all, ...facets.styles.map((s) => ({ value: s, label: labelStyle(s) }))];
    }
    return FILTER_OPTIONS.style;
  }, [facets.styles, t, FILTER_OPTIONS.style]);

  const patch = (partial: Partial<CatalogFiltersState>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}>
      <select
        className="form-select min-w-[130px] max-w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-3 pr-8 text-sm focus:border-primary-500 focus:ring-primary-500 sm:min-w-[140px] sm:py-2.5 sm:pl-4 sm:pr-10"
        value={filters.standard}
        onChange={(e) => patch({ standard: e.target.value })}
        aria-label={t('filter.standards.all')}
      >
        {standardOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        className="form-select min-w-[130px] max-w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-3 pr-8 text-sm focus:border-primary-500 focus:ring-primary-500 sm:min-w-[140px] sm:py-2.5 sm:pl-4 sm:pr-10"
        value={filters.feature}
        onChange={(e) => patch({ feature: e.target.value })}
        aria-label={t('filter.features.all')}
      >
        {FILTER_OPTIONS.feature.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        className="form-select min-w-[130px] max-w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-3 pr-8 text-sm focus:border-primary-500 focus:ring-primary-500 sm:min-w-[140px] sm:py-2.5 sm:pl-4 sm:pr-10"
        value={filters.style}
        onChange={(e) => patch({ style: e.target.value })}
        aria-label={t('filter.styles.all')}
      >
        {styleOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {facets.toeCaps.length > 0 && (
        <select
          className="form-select min-w-[140px] max-w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-3 pr-8 text-sm focus:border-primary-500 focus:ring-primary-500 sm:min-w-[150px] sm:py-2.5 sm:pl-4 sm:pr-10"
          value={filters.toeCap}
          onChange={(e) => patch({ toeCap: e.target.value })}
          aria-label={t('filter.toe.label')}
        >
          <option value="All">{t('filter.toe.all')}</option>
          {facets.toeCaps.map((tc) => (
            <option key={tc} value={tc}>
              {tc}
            </option>
          ))}
        </select>
      )}

      <button
        type="button"
        onClick={() => {
          onFiltersChange(defaultCatalogFilters());
          onResetComplete?.();
        }}
        className="whitespace-nowrap px-2 text-sm text-slate-500 underline hover:text-red-500"
      >
        {t('filter.reset')}
      </button>
    </div>
  );
}

type BarProps = ControlsProps & {
  className?: string;
};

/**
 * 产品目录筛选条：标准 / 特性 / 款式 / 鞋头（动态去重）。
 * 用于 ProductCategories（独立一行）等。
 */
export function ProductCatalogFilterBar({
  products,
  filters,
  onFiltersChange,
  onResetComplete,
  className = '',
}: BarProps) {
  const t = useTranslations('ProductCategories');

  return (
    <div
      className={`mb-8 flex flex-col items-stretch justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center md:mb-12 ${className}`}
    >
      <div className="flex shrink-0 items-center gap-2 font-semibold text-slate-700">
        <Filter className="h-5 w-5 text-primary-600" aria-hidden />
        <span>{t('filter.label')}</span>
      </div>

      <ProductCatalogFilterControls
        products={products}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onResetComplete={onResetComplete}
        className="sm:justify-end"
      />
    </div>
  );
}
