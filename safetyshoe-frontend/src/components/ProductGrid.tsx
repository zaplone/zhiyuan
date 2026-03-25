'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LayoutGrid, List, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import type { CatalogFiltersState } from '@/lib/productCatalogFilters';
import { compareProductsNewestFirst } from '@/lib/productSort';
import type { Product } from '@/types';
import { ProductCatalogFilterControls } from '@/components/ProductCatalogFilterBar';
import { ProductQuickView } from './ProductQuickView';

interface ProductGridProps {
  products: any[];
  locale?: string;
  viewMode?: 'grid' | 'list';
  filters?: Record<string, string[]>;
  searchQuery?: string | null;
  /** 与工具栏合并展示目录筛选（/products） */
  catalogFilters?: CatalogFiltersState;
  onCatalogFiltersChange?: (next: CatalogFiltersState) => void;
  /** deriveFacets 用全量列表；不传则用 products */
  facetSourceProducts?: Product[];
}

export function ProductGrid({
  products,
  locale = 'en',
  viewMode: initialViewMode,
  filters = {},
  searchQuery = '',
  catalogFilters,
  onCatalogFiltersChange,
  facetSourceProducts,
}: ProductGridProps) {
  const t = useTranslations('ProductGrid');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialViewMode || 'grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Quick View State
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reset pagination when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, catalogFilters]);

  const ITEMS_PER_PAGE = 12;

  // 筛选值 → API 数据对应（与后端一致）
  const normalizeIndustry = (s: string) =>
    s.toLowerCase().replace(/\s+/g, '').replace(/&/g, '');
  const filterStandardToEnum: Record<string, string> = {
    sb: 'SB', sbp: 'S1P', s1: 'S1', s1p: 'S1P', s2: 'S2', s3: 'S3', ob: 'OB',
  };
  const filterFeatureToCertsAndKeywords: Record<string, { certs?: string[]; keywords: string[] }> = {
    'waterproof': { certs: ['WR'], keywords: ['waterproof', 'water resistant', 'water-resistant'] },
    'slip-resistant': { certs: ['SRC'], keywords: ['slip', 'slip resistant', 'slip-resistant'] },
    'metal-free': { keywords: ['metal free', 'metal-free', 'composite toe', 'non-metal'] },
    'esd': { certs: ['ESD'], keywords: ['antistatic', 'anti-static', 'esd'] },
    'heat-resistant': { certs: ['HRO'], keywords: ['heat', 'heat resistant', 'heat-resistant'] },
    'cold-insulated': { certs: ['CI'], keywords: ['cold', 'insulated', 'insulation', 'ci'] },
    'metatarsal': { certs: ['M', 'HI'], keywords: ['metatarsal', 'metatarsal guard'] },
  };
  const filterMaterialKeywords: Record<string, string[]> = {
    'leather-full': ['full grain', 'full grain leather', 'full leather'],
    'leather-split': ['split leather', 'split grain'],
    'microfiber': ['microfiber', 'micro-fiber'],
    'mesh': ['mesh', 'breathable mesh'],
    'pvc-rubber': ['pvc', 'rubber'],
  };

  const filteredProducts = products.filter(product => {
    // 1. 搜索：名称、描述、行业
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name?.toLowerCase().includes(q);
      const matchDesc = product.description?.toLowerCase().includes(q);
      const matchIndustries = product.industries?.some((ind: unknown) =>
        String(ind ?? '').toLowerCase().includes(q)
      );
      if (!matchName && !matchDesc && !matchIndustries) return false;
    }

    // 2. 侧栏筛选（对应 API：industries, safety_standard, features, additional_certs, materials）
    for (const [key, values] of Object.entries(filters)) {
      if (!values || values.length === 0) continue;

      if (key === 'category') {
        // 对应 product.industries (JSON 数组，如 ["Construction", "Mining"])
        const productIndustryNorm = (product.industries || []).map((ind: unknown) =>
          normalizeIndustry(String(ind))
        );
        const hasMatch = values.some((v: string) => {
          const vNorm = normalizeIndustry(v.replace(/-/g, ''));
          return productIndustryNorm.some((p: string) => p.includes(vNorm) || vNorm.includes(p));
        });
        if (!hasMatch) return false;
      }

      if (key === 'standard') {
        // 对应 product.safety_standard (枚举: SB, S1, S1P, S2, S3, OB)
        const hasMatch = values.some(v => {
          const enumVal = filterStandardToEnum[v] || v.toUpperCase();
          return product.safety_standard === enumVal;
        });
        if (!hasMatch) return false;
      }

      if (key === 'feature') {
        // 对应 product.features (字符串数组) + product.additional_certs (如 WR, SRC)
        const certs = (product.additional_certs || []) as string[];
        const featStrs = (product.features || []).map((f: string) => f.toLowerCase());
        const hasMatch = values.some((v: string) => {
          const map = filterFeatureToCertsAndKeywords[v];
          if (!map) return featStrs.some((f: string) => f.includes(v.replace(/-/g, ' ')));
          if (map.certs?.some(c => certs.includes(c))) return true;
          return map.keywords.some(kw => featStrs.some((f: string) => f.includes(kw)));
        });
        if (!hasMatch) return false;
      }

      if (key === 'material') {
        // 对应 product.materials (component: upper, outsole, toe_cap, midsole, lining)
        const matStr = JSON.stringify(product.materials || {}).toLowerCase();
        const hasMatch = values.some(v => {
          const keywords = filterMaterialKeywords[v] || [v.replace(/-/g, ' ')];
          return keywords.some(kw => matStr.includes(kw));
        });
        if (!hasMatch) return false;
      }
    }

    return true;
  });

  /** 按更新时间/创建时间新到旧（id 已为 UUID 时不再用数字减法） */
  const sortedProducts = [...filteredProducts].sort(compareProductsNewestFirst);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleQuickView = (product: any) => {
    // 移动端 (< 768px) 直接跳转详情页，使用原生跳转更可靠
    if (window.innerWidth < 768) {
      window.location.href = `/${locale}/products/${product.slug}`;
      return;
    }
    // PC 端打开弹窗
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (products.length === 0) {
    return (
      <div className="flex-1 py-20 text-center bg-white rounded-xl border border-dashed border-slate-300">
        <div className="text-4xl mb-4">📦</div>
        <h3 className="text-lg font-bold text-slate-900">{t('noProducts')}</h3>
        <p className="text-slate-500">{t('noProductsDesc')}</p>
      </div>
    );
  }

  return (
    <div className="flex-1">

      {/* Toolbar：目录筛选 + Showing + 视图（同一卡片） */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:flex-wrap xl:items-center xl:gap-x-4 xl:gap-y-3">
          <div className="shrink-0 text-sm font-medium text-slate-500">
            {t('showing', {
              from: (currentPage - 1) * ITEMS_PER_PAGE + 1,
              to: Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length),
              total: sortedProducts.length,
            })}
          </div>

          {catalogFilters != null && onCatalogFiltersChange != null && (
            <div className="min-w-0 flex-1 xl:min-w-[min(100%,28rem)]">
              <ProductCatalogFilterControls
                products={facetSourceProducts ?? (products as Product[])}
                filters={catalogFilters}
                onFiltersChange={onCatalogFiltersChange}
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 xl:ml-auto xl:shrink-0">
            <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`rounded-md p-1.5 transition-all ${
                  viewMode === 'grid' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
                title={t('gridView')}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`rounded-md p-1.5 transition-all ${
                  viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
                title={t('listView')}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleQuickView(product)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white ring-1 ring-inset ring-slate-100">
                {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain object-center p-3 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <span className="text-sm">No Image</span>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.is_new && <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">NEW</span>}
                  {product.featured && <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">HOT</span>}
                </div>

                {/* Hover：不模糊主图，仅底部轻渐变 + 按钮（B2B 需能看清鞋款） */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-slate-900/55 via-slate-900/20 to-transparent pb-3 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="pointer-events-none inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 shadow-md sm:text-sm">
                    <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                    {t('quickView')}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded capitalize">
                    {product.industries?.[0] ?? ''}
                  </span>
                  {product.safety_standard && (
                    <span className="text-xs font-bold text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded">
                      {product.safety_standard}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2 truncate group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>MOQ: <strong className="text-slate-700">{product.moq}</strong></span>
                  {product.price_range ? <span>Est. {product.price_range}</span> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {currentProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col sm:flex-row cursor-pointer"
              onClick={() => handleQuickView(product)}
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-white ring-1 ring-inset ring-slate-100 sm:w-52 md:w-56">
                {product.image && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain object-center p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <span className="text-sm">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col justify-center flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded capitalize">
                    {product.industries?.[0] ?? ''}
                  </span>
                  {product.safety_standard && (
                    <span className="text-xs font-bold text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded">
                      {product.safety_standard}
                    </span>
                  )}
                  {product.is_new && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>}
                  {product.featured && <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded">HOT</span>}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-4 text-sm mt-auto">
                  <div className="flex items-center gap-1 text-slate-500">
                    <span className="font-semibold text-slate-900">MOQ:</span> {product.moq}
                  </div>
                  <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <span className="font-semibold text-slate-900">Price:</span> {product.price_range ?? '—'}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t sm:border-t-0 sm:border-l border-slate-100 flex items-center justify-center bg-slate-50 sm:w-40 flex-shrink-0">
                <button className="w-full sm:w-auto bg-white border border-slate-200 hover:border-primary-500 hover:text-primary-600 text-slate-700 font-bold py-2 px-4 rounded-lg transition-all shadow-sm text-sm">
                  {t('viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title={t('prev')}
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                currentPage === i + 1
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title={t('next')}
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickView 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
