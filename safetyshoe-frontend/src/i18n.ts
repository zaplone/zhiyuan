import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { locales } from './locales';

// 静态导入所有翻译文件（避免动态 import 路径解析问题）
import enMessages from './messages/en.json';
import zhMessages from './messages/zh.json';
import ruMessages from './messages/ru.json';
import deMessages from './messages/de.json';
import arMessages from './messages/ar.json';

type Messages = Record<string, any>;

function deepMerge(base: Messages, override: Messages): Messages {
  const result: Messages = {...base};
  for (const key of Object.keys(override)) {
    const value = override[key];
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      typeof base[key] === 'object' &&
      base[key] !== null &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key], value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

// 翻译文件映射表
const messages = {
  en: enMessages,
  zh: zhMessages,
  ru: deepMerge(enMessages as Messages, ruMessages as Messages),
  de: deepMerge(enMessages as Messages, deMessages as Messages),
  ar: deepMerge(enMessages as Messages, arMessages as Messages),
} as const;

export default getRequestConfig(async ({locale}) => {
  // 校验语言参数
  if (!locales.includes(locale as any)) notFound();

  // 返回对应的翻译文件和 locale
  return {
    locale,
    messages: messages[locale as keyof typeof messages]
  };
});