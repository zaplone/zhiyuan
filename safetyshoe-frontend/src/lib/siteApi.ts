/**
 * 独立站数据 API（鹿原 Nest 服务）。
 * 生产基地址：https://dtxy.zwstone.cn/api
 */
const SITE_API_BASE_URL = 'https://luyuan.zwstone.cn/api';

import { Product, SafetyStandard, Certification, MaterialSpec, ShoeStyle, Industry } from '@/types';

/** 独立站产品（standalone_products 公开接口） */
export interface StandaloneProduct {
  /** 升级后多为 UUID 字符串 */
  id: string | number;
  name: any;
  model_code: string;
  description?: any;
  images?: string[];
  moq?: string;
  safety_standard?: SafetyStandard;
  /** 旧字段名，兼容保留 */
  additionalCerts?: { id: number; name: string }[] | string[];
  /** 升级后公开列表使用 certifications */
  certifications?: { id: number; name: string }[] | string[];
  style?: ShoeStyle;
  industries?: string[] | { id: number; name: string }[];
  materials?: MaterialSpec;
  features?: string[] | { id: number; name: string }[];
  is_hot?: boolean;
  is_new?: boolean;
  isPublished?: boolean;
  /** 若接口返回：可选营销标记（首页两 Tab 使用 is_hot / is_new） */
  is_bestseller?: boolean;
  price_range?: string | null;
  specs_extra?: Record<string, string>;
  video_url?: string | null;
  /** 规格 PDF（若后端单独返回） */
  spec_pdf_url?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StandaloneListResponse {
  code: number;
  data: {
    list: StandaloneProduct[];
    total: number;
  };
}

/** 工厂新闻 / 动态（factory-updates 接口返回项） */
export interface FactoryNewsRecord {
  id: number;
  documentId: string;
  title: string;
  excerpt: string;
  content: string;
  image?: any;
  date: string;
  author: string;
  category: string;
  publishedAt?: string;
  media_type?: 'Article' | 'Video';
  video_url?: string;
}

export async function fetchAllNewsIds(): Promise<string[]> {
  try {
    const response = await fetch(
      `${SITE_API_BASE_URL}/factory-updates?pageSize=1000`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) return [];
    const data = await response.json();
    return data.data?.list?.map((item: any) => String(item.id)) || [];
  } catch (error) {
    console.error('Error fetching all news IDs:', error);
    return [];
  }
}

export async function fetchLatestNews(): Promise<FactoryNewsRecord[]> {
  try {
    const response = await fetch(
      `${SITE_API_BASE_URL}/factory-updates?pageSize=100`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) return [];
    const data = await response.json();
    return data.data?.list || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function fetchNewsItem(documentId: string): Promise<FactoryNewsRecord | null> {
  try {
    const url = `${SITE_API_BASE_URL}/factory-updates/${documentId}`;
    const response = await fetch(url, { next: { revalidate: 60 } });

    if (!response.ok) return null;
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching news item:', error);
    return null;
  }
}

export function transformNews(item: FactoryNewsRecord, locale: string = 'en') {
  if (!item) return null;

  const getI18nField = (field: any, fallback = ''): string => {
    if (!field) return fallback;
    if (typeof field === 'object') {
      return field[locale] || field.en || fallback;
    }
    if (typeof field === 'string') {
      try {
        const parsed = JSON.parse(field);
        if (parsed && typeof parsed === 'object') {
          return parsed[locale] || parsed.en || fallback || field;
        }
      } catch {
        // ignore
      }
      return field;
    }
    return fallback;
  };

  let imageUrl = 'https://images.unsplash.com/photo-1565514020176-db792f4b6d96?auto=format&fit=crop&q=80';

  const rawImage = item.image;
  if (rawImage) {
    let rawUrl = typeof rawImage === 'object' ? rawImage.url : rawImage;
    if (typeof rawUrl === 'string') {
      if (rawUrl.includes('undefined/')) {
        const R2_PUBLIC_URL = 'https://pub-9a6ce20adf6d44c499aad464d60190a1.r2.dev';
        rawUrl = rawUrl.replace('undefined/', `${R2_PUBLIC_URL}/`);
      }
      imageUrl = rawUrl.startsWith('http') ? rawUrl : `${SITE_API_BASE_URL}${rawUrl}`;
    }
  }

  return {
    id: String(item.id),
    title: getI18nField(item.title, 'Untitled News'),
    excerpt: getI18nField(item.excerpt, ''),
    content: getI18nField(item.content, ''),
    date: item.date || new Date().toISOString().split('T')[0],
    author: getI18nField(item.author, 'Admin'),
    category: getI18nField(item.category, 'News'),
    image: imageUrl,
    media_type: item.media_type || 'Article',
    video_url: item.video_url || '',
  };
}

/** 独立站询盘 POST /standalone/inquiries 的请求体（扁平 JSON，与 Nest DTO 一致） */
export type StandaloneInquiryPayload = {
  name: string;
  email: string;
  message: string;
  company?: string;
  product_name?: string;
  phone?: string;
  country?: string;
  product_id?: number;
  quantity?: number;
  target_price?: number;
};

function buildStandaloneInquiryBody(data: StandaloneInquiryPayload): Record<string, string | number> {
  const body: Record<string, string | number> = {
    name: data.name.trim(),
    email: data.email.trim(),
    message: data.message.trim(),
  };
  if (data.company?.trim()) body.company = data.company.trim();
  if (data.product_name?.trim()) body.product_name = data.product_name.trim();
  if (data.phone?.trim()) body.phone = data.phone.trim();
  if (data.country?.trim()) body.country = data.country.trim();
  if (data.product_id != null) body.product_id = data.product_id;
  if (data.quantity != null) body.quantity = data.quantity;
  if (data.target_price != null) body.target_price = data.target_price;
  return body;
}

/**
 * 提交询盘到独立站 API（Nest `POST {SITE_API_BASE_URL}/standalone/inquiries`）。
 * 产品详情、快速预览与 `api.ts` 中 inquiriesApi 共用此实现。
 */
export async function submitInquiry(data: StandaloneInquiryPayload): Promise<boolean> {
  try {
    const response = await fetch(`${SITE_API_BASE_URL}/standalone/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildStandaloneInquiryBody(data)),
    });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      console.error('submitInquiry failed:', response.status, text);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return false;
  }
}

export async function fetchProductBySlug(
  locale: string = 'en',
  slug: string
): Promise<StandaloneProduct | null> {
  try {
    const params = new URLSearchParams({
      page: '1',
      pageSize: '1',
      publishedOnly: 'true',
      // API 按 model_code 精确匹配且区分大小写；slug 来自 transformProduct 的 model_code，勿统一大写（如 g1231）。
      modelCode: slug.trim(),
    });

    const response = await fetch(
      `${SITE_API_BASE_URL}/standalone/products/public?${params.toString()}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      console.error('Failed to fetch product by slug:', response.statusText);
      return null;
    }

    const data: StandaloneListResponse = await response.json();
    const product = data.data?.list?.[0];
    return product || null;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}

export async function fetchProductById(id: string | number): Promise<StandaloneProduct | null> {
  try {
    const params = new URLSearchParams({
      page: '1',
      pageSize: '1',
      publishedOnly: 'true',
      id: String(id),
    });

    const response = await fetch(
      `${SITE_API_BASE_URL}/standalone/products/public?${params.toString()}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      console.error('Failed to fetch product by id:', response.statusText);
      return null;
    }

    const data: StandaloneListResponse = await response.json();
    const product = data.data?.list?.[0];
    return product || null;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }
}

/**
 * 拉取已发布产品列表（构建时与运行时均会请求独立站 API）
 */
export async function fetchProducts(
  locale: string = 'en',
  options?: { limit?: number }
): Promise<StandaloneProduct[]> {
  try {
    const pageSize = options?.limit ?? 100;
    const params = new URLSearchParams({
      page: '1',
      pageSize: String(pageSize),
      publishedOnly: 'true',
    });
    const response = await fetch(
      `${SITE_API_BASE_URL}/standalone/products/public?${params.toString()}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText);
      return [];
    }

    const data: StandaloneListResponse = await response.json();
    return data.data?.list || [];
  } catch (error) {
    console.error('Error fetching standalone products:', error);
    return [];
  }
}

export function transformProduct(product: StandaloneProduct, locale: string = 'en'): Product {
  if (!product) {
    return {
      id: 0,
      name: 'Error Loading',
      slug: 'error',
      safety_standard: 'SB',
      image: '/images/placeholder.svg',
    } as Product;
  }

  const gallery = Array.isArray(product.images) ? product.images : [];
  const mainImage = gallery[0] || '/images/placeholder.svg';

  // 兼容新格式（字符串数组）和旧格式（对象数组）
  const industries: Industry[] = Array.isArray(product.industries)
    ? product.industries.map((i: any) => typeof i === 'string' ? i : i.name || '').filter(Boolean) as Industry[]
    : [];

  const features: string[] = Array.isArray(product.features)
    ? product.features.map((f: any) => typeof f === 'string' ? f : f.name || '').filter(Boolean)
    : [];

  const mapCertList = (arr: unknown): Certification[] =>
    Array.isArray(arr)
      ? (arr as any[]).map((c) => (typeof c === 'string' ? c : c?.name || '')).filter(Boolean) as Certification[]
      : [];

  const fromAdditional = mapCertList(product.additionalCerts);
  const fromCertifications = mapCertList(product.certifications);
  const additionalCerts: Certification[] =
    fromAdditional.length && fromCertifications.length
      ? (Array.from(new Set([...fromAdditional, ...fromCertifications])) as Certification[])
      : fromAdditional.length
        ? fromAdditional
        : fromCertifications;

  const specsExtra = product.specs_extra || {};
  const extraCerts = specsExtra.certifications
    ? specsExtra.certifications.split(',').map((s: string) => s.trim()).filter(Boolean)
    : [];
  const extraIndustries = specsExtra.industries
    ? specsExtra.industries.split(',').map((s: string) => s.trim()).filter(Boolean)
    : [];
  const extraFeatures = specsExtra.features
    ? specsExtra.features.split(',').map((s: string) => s.trim()).filter(Boolean)
    : [];

  const mergedIndustries = industries.length ? industries : (extraIndustries as Industry[]);
  const mergedFeatures = features.length ? features : extraFeatures;
  const mergedCerts = additionalCerts.length ? additionalCerts : (extraCerts as Certification[]);

  return {
    id: product.id,
    name: getI18nValue(product.name, locale, 'Untitled Product'),
    slug: (product.model_code?.trim() || `prod-${product.id}`),
    model_code: product.model_code,
    description: getI18nValue(product.description, locale, ''),

    safety_standard: product.safety_standard,
    additional_certs: mergedCerts,
    style: product.style,
    industries: mergedIndustries,

    materials: product.materials || {},

    moq: product.moq || '500 Pairs',
    price_range: product.price_range ?? '',
    features: mergedFeatures,

    image: mainImage,
    images: gallery,
    video_url: product.video_url ?? undefined,
    spec_pdf_url:
      product.spec_pdf_url?.trim() ||
      (specsExtra.spec_pdf_url as string | undefined)?.trim() ||
      undefined,

    featured: product.is_hot || false,
    is_new: product.is_new || false,
    bestseller: product.is_bestseller || false,
    specs_extra: specsExtra,
    created_at: product.createdAt,
    updated_at: product.updatedAt,
  };
}

function getI18nValue(input: any, locale: string, fallback = ''): string {
  if (!input) return fallback;
  if (typeof input === 'object') {
    return input[locale] || input.en || fallback;
  }
  if (typeof input === 'string') {
    try {
      const parsed = JSON.parse(input);
      if (parsed && typeof parsed === 'object') {
        return parsed[locale] || parsed.en || fallback || input;
      }
    } catch {
      // ignore
    }
    return input;
  }
  return fallback;
}
