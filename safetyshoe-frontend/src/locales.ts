/**
 * 支持的语言列表，与 i18n 及 generateStaticParams 共用，避免从 i18n.ts 直接导入导致 webpack 报错。
 */
/** 与 src/messages/*.json 及 i18n.ts 中 messages 键一致；ar 在 LocaleHtmlAttributes 中走 RTL */
export const locales = ['en', 'zh', 'ru', 'de', 'ar'] as const;
export type Locale = (typeof locales)[number];
