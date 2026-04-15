# MEMORY.md - 登泰网站项目记忆

## 项目信息
- **项目名称**：safetyshoe-frontend
- **类型**：Next.js 14 安全鞋电商网站
- **技术栈**：Next.js 14, React 18, TypeScript 5, Tailwind CSS, next-intl (i18n)
- **输出**：静态导出（out/ 目录）
- **国际化**：中英文（/en/, /zh/ 路由）

## 项目结构
```
safetyshoe-frontend/
├── src/
│   ├── app/[locale]/          # 国际化路由
│   │   ├── page.tsx           # 首页
│   │   ├── about/page.tsx     # 关于页面
│   │   └── services/oem/       # OEM服务页面
│   ├── components/             # React组件
│   ├── lib/                   # 工具函数和API
│   ├── types/                 # TypeScript类型
│   └── messages/              # 翻译文件 (en.json, zh.json)
├── public/images/
│   ├── about/                 # 工厂图片 (生产环境1-6.jpg, 全景图等)
│   └── products/              # 产品图片 (产品1-3.jpg等)
```

## 用户偏好与习惯
- 喜欢现代化、干净的设计风格
- 倾向于使用真实产品/工厂图片而非占位图
- 橙色/琥珀色作为强调色
- 工厂展示采用左侧文字+右侧大图+下方缩略图布局
- 视频播放按钮使用橙色圆形样式

## 关键组件修改记录

### 首页 (page.tsx)
组件顺序：Hero → GlobalCompliance → CertPreviewStrip → TechnicalMatrix → ManufacturingExcellence → GlobalReach → TechnicalOEM → Testimonials → FAQAndContact

### Hero组件
- 轮播图更新为：全景1.jpg + 生产环境1.jpg + 生产环境6.jpg

### ManufacturingExcellence组件
- 布局：左侧文字 + 右侧大视频封面 + 下方5张缩略图
- 去掉黑白滤镜，播放按钮改为橙色

### GlobalFootprint组件
- 案例图片替换为：产品1.jpg（欧洲）、产品2.jpg（美国）、产品3.jpg（中东）

### OEM页面
- 主图从 `/images/oem/hero-shoe.jpg` 替换为 `/images/products/产品1.jpg`
- 删除了 `mix-blend-multiply` 效果避免图片变色

### CustomizationOptions组件
- "Total Customization Freedom"图片从 `/images/oem/step5.png` 替换为 `/images/products/产品2.jpg`

## 可用资源

### 产品图片 (public/images/products/)
- 产品1.jpg, 产品2.jpg, 产品3.jpg
- composite-shoe.jpg, slip-resistant.jpg, steel-toe-boot.jpg, winter-boot.jpg

### 工厂图片 (public/images/about/)
- 裁切区.jpg（1号）、车缝区.jpg（2号）、成型区.jpg（3号）
- 装配区.jpg（4号）、质检区.jpg（5号）、包装发货.png（6号）
- 全景1.jpg, gongchang.jpg

### FactoryVideoGallery 组件
- 使用 i18n key（`zones.cutting.title` 等）而非硬编码文字
- 翻译位于 en.json / zh.json 的 `About.zones` 节点下
- 每个区域有 title（英/中）、zh（中文副标）、desc（描述）三个字段

## 常用命令
```bash
cd safetyshoe-frontend
npm run dev      # 开发服务器
npm run build    # 生产构建
npm run export   # 静态导出
```
