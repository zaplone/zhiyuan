'use client';

import { useEffect } from 'react';

/** 根布局固定 lang=en；在 [locale] 下用 effect 同步真实语言与 RTL（不能嵌套第二套 html） */
export function LocaleHtmlAttributes({ locale }: { locale: string }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);
  return null;
}
