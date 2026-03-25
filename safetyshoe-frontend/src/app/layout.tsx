import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

/**
 * Next.js 要求根 layout 必须包含 html + body（App Router）。
 * 若只写 `return children` 会导致 dev 下路由异常，出现 /、/en/ 404 或浏览器「invalid response」。
 * 多语言与 RTL 由 [locale]/layout 内 LocaleHtmlAttributes 同步到 documentElement。
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
