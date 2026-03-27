/** 去重后的认证扫描件（对应 public/images/renzheng）。未列入的编号为同证异版/重复。 */

export const RENZHENG_BASE = '/images/renzheng' as const;

export type CertificateId =
  | 'eu_ce'
  | 'iso9001_en'
  | 'iso14001_en'
  | 'iso45001_en'
  | 'iso9001_zh'
  | 'iso14001_zh'
  | 'iso45001_zh';

export const CERTIFICATE_FILES: Record<CertificateId, string> = {
  eu_ce: 'eu_ce.png',
  iso9001_en: 'iso9001_en.png',
  iso14001_en: 'iso14001_en.png',
  iso45001_en: 'iso45001_en.png',
  iso9001_zh: 'iso9001_en.png',
  iso14001_zh: 'iso14001_en.png',
  iso45001_zh: 'iso45001_en.png',
};

/** 首页优先展示的 4 类资质 */
export const HOMEPAGE_CERTIFICATE_IDS: readonly CertificateId[] = [
  'eu_ce',
  'iso9001_en',
  'iso45001_en',
  'iso14001_en',
] as const;

/** 关于页 — 证书图库（4张真实证书） */
export const GALLERY_EN_IDS: readonly CertificateId[] = [
  'eu_ce',
  'iso9001_en',
  'iso14001_en',
  'iso45001_en',
] as const;

/** 关于页 — 中文证书（与英文共用同一套图片） */
export const GALLERY_ZH_IDS: readonly CertificateId[] = [
  'iso9001_en',
  'iso14001_en',
  'iso45001_en',
] as const;

export function certificateSrc(id: CertificateId): string {
  return `${RENZHENG_BASE}/${CERTIFICATE_FILES[id]}`;
}
