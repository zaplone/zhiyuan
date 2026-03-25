import { MetadataRoute } from 'next';
import { fetchProducts, transformProduct, fetchAllNewsIds } from '@/lib/siteApi';
import { locales } from '@/locales';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://zhiyuansafety.com';

/** 固定页面配置：路径 / 更新频率 / 优先级 */
const STATIC_PAGES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '',            changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/products',   changeFrequency: 'daily',   priority: 0.9 },
  { path: '/services/oem', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/news',       changeFrequency: 'daily',   priority: 0.8 },
  { path: '/about',      changeFrequency: 'monthly', priority: 0.7 },
  { path: '/faq',        changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy',    changeFrequency: 'yearly',  priority: 0.3 },
  { path: '/terms',      changeFrequency: 'yearly',  priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // ── 1. 固定页面（每个语言各一份）──────────────────────────────────────
  for (const locale of locales) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}/`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  // ── 2. 产品详情页 ──────────────────────────────────────────────────────
  try {
    // 只需以英文拉一次产品列表（slug = model_code，与语言无关）
    const rawProducts = await fetchProducts('en', { limit: 500 });

    for (const locale of locales) {
      for (const raw of rawProducts) {
        const product = transformProduct(raw, locale);
        if (!product?.slug || product.slug === 'error') continue;

        entries.push({
          url: `${SITE_URL}/${locale}/products/${product.slug}/`,
          lastModified: product.updated_at
            ? new Date(product.updated_at)
            : new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  } catch (err) {
    console.error('[sitemap] Failed to fetch products:', err);
  }

  // ── 3. 新闻详情页 ──────────────────────────────────────────────────────
  try {
    const newsIds = await fetchAllNewsIds();

    for (const locale of locales) {
      for (const id of newsIds) {
        entries.push({
          url: `${SITE_URL}/${locale}/news/${id}/`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
  } catch (err) {
    console.error('[sitemap] Failed to fetch news:', err);
  }

  return entries;
}
