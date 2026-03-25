// 核心安全标准
export type SafetyStandard = 'SB' | 'S1' | 'S1P' | 'S2' | 'S3' | 'OB';

// 附加认证 (JSON 数组)
export type Certification = 'SRC' | 'HRO' | 'ESD' | 'WR' | 'CI' | 'HI';

// 材质配置 (Component)
export interface MaterialSpec {
  upper?: string;      // 鞋面 (e.g. Buffalo Leather)
  outsole?: string;    // 大底 (e.g. Dual Density PU)
  toe_cap?: 'Steel' | 'Composite' | 'Fiberglass' | 'None'; // 鞋头
  midsole?: 'Steel Plate' | 'Kevlar' | 'None'; // 中底
  lining?: string;     // 内里
}

// 款式 (Enum)
export type ShoeStyle = 'Low Cut' | 'Mid Cut' | 'High Boot' | 'Sandal' | 'Sporty';

// 行业 (Relation/JSON)
export type Industry = 'Construction' | 'Logistics' | 'Oil & Gas' | 'Food' | 'Executive' | 'Mining' | 'Chemical';

// 产品类型定义 (重构版)
export interface Product {
  /** 独立站升级后可能为 UUID 字符串；历史数据可能为数字 */
  id: string | number;
  documentId?: string; // 后端新闻条目 id（历史字段名）
  name: string;
  slug: string;
  model_code?: string; // 型号 (e.g. LY-8801)
  description?: string;
  
  // 核心结构化数据
  safety_standard?: SafetyStandard;
  additional_certs?: Certification[];
  materials?: MaterialSpec;
  style?: ShoeStyle;
  industries?: Industry[];
  
  // 业务数据
  moq?: string; // e.g. "500 Pairs"
  price_range?: string; // e.g. "$15-25"
  features?: string[]; // 兼容旧数据，或作为营销亮点 (e.g. "Best Seller")
  
  // 媒体
  image?: string; // 主图 URL
  images?: string[]; // 图集
  video_url?: string; // 产品视频 URL
  /** 规格/证书 PDF 直链（可选；也可由 specs_extra.spec_pdf_url 映射） */
  spec_pdf_url?: string;
  
  // 元数据（与独立站 API 对齐：is_hot → featured，is_new；公开列表未必返回 is_bestseller）
  /** 后端 is_hot：首页「热销」Tab（映射名 featured） */
  featured?: boolean;
  /** 后端 is_new：首页「新品」Tab */
  is_new?: boolean;
  /** 后端 is_bestseller（若接口返回）：详情/其它逻辑可用 */
  bestseller?: boolean;

  // 扩展规格（来自后端 specs_extra）
  specs_extra?: Record<string, string>;

  created_at?: string;
  updated_at?: string;
}

// ... (其他接口保持不变，为了节省篇幅，我只列出 Product 相关的核心修改)
// ... 下面是原有的辅助接口 ...

export interface ProductImage {
  id: number;
  url: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination: Pagination;
  };
}

// 分类
export interface Category {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  product_count: number;
}

// 询盘
export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  message: string;
  product_name?: string;
  quantity?: number;
  status?: string;
  created_at?: string;
}

// API 响应类型
export interface ProductsResponse extends ApiResponse<Product[]> {}
export interface CategoriesResponse extends ApiResponse<Category[]> {}
export interface CategoryResponse extends ApiResponse<Category> {}
export interface InquiryResponse extends ApiResponse<Inquiry> {}

// 询盘统计
export interface InquiryStats {
  total_products: number;
  draft_products: number;
  total_categories: number;
  pending_inquiries: number;
  today_inquiries: number;
  week_inquiries: number;
  month_inquiries: number;
}

// 搜索参数
export interface SearchParams {
  [key: string]: string | number | boolean | undefined;
  page?: number;
  limit?: number;
  sort?: string;
  category?: string;
  search?: string;
}
