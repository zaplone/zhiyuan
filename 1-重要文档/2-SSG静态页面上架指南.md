# 登泰网站 SSG（静态导出）说明

本文档说明当前 **Next.js 14 + 独立站 API + i18n** 的静态站点生成方式。数据 API 生产基地址为 **`https://luyuan.zwstone.cn/api`**（见 `src/lib/siteApi.ts`）。

## 1. 当前策略

- **SSG**：生产环境 `output: 'export'`，在 `npm run build` 时根据 `generateStaticParams` 与数据拉取生成静态 HTML。
- **数据**：构建时由 Cloudflare（或本机）请求上述 API，**API 必须公网可访问**（不可使用本机 `localhost` 作为构建数据源，除非仅在本地调试且自行承担后果）。

## 2. API 与代码位置

- 数据请求与转换：`safetyshoe-frontend/src/lib/siteApi.ts`
- 环境变量：`NEXT_PUBLIC_SITE_API_URL`（推荐），兼容 `NEXT_PUBLIC_STRAPI_URL`（旧名）

## 3. 图片

静态导出下 `next.config.js` 中 `images.unoptimized: true`，图片 URL 一般由 API 返回完整 HTTPS 地址。

## 4. Cloudflare Pages 与更新

内容在业务后台更新后，需**重新触发前端构建**（推送代码或 Webhook），新的静态页才会包含最新数据。详见 [0-项目架构与运维指南.md](./0-项目架构与运维指南.md)。

## 5. 构建失败排查

1. 构建日志是否报错。  
2. 构建时能否访问 `NEXT_PUBLIC_SITE_API_URL`（证书、防火墙、DNS）。  
3. 本地执行 `cd safetyshoe-frontend && npm run build` 复现。

---

**说明**：历史上若文档写过「Strapi」「ISR」等与现网不一致的实现，以本仓库当前 `next.config.js` 与 `siteApi.ts` 为准。
