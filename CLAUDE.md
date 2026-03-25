# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

- **Project**: safetyshoe-frontend - Next.js 14 e-commerce website for industrial safety shoes
- **Stack**: Next.js 14, React 18, TypeScript 5, Tailwind CSS, next-intl (i18n)
- **Output**: Static export (no server-side features in production)
- **Hosting**: Cloudflare Pages

## Commands

```bash
cd safetyshoe-frontend

# Development
npm run dev              # Start dev server at http://localhost:3000

# Build & Production
npm run build            # Production build with static export
npm run start            # Start production server
npm run export           # Generate static files to out/ directory

# Linting
npm run lint             # Run ESLint
```

## Architecture

- **App Router**: Uses Next.js App Router with `[locale]` dynamic segment for i18n routes (e.g., `/en/`, `/zh/`)
- **Static Export**: Production build configured with `output: 'export'` - all pages prerendered to HTML
- **i18n**: Routes are locale-prefixed; use `next-intl` for translations; locale determined from URL
- **API Layer**: Data fetched at build time via `generateStaticParams`; API utilities in `@/lib/api.ts` and `@/lib/siteApi.ts`

## Key Files

- `src/app/[locale]/` - Localized page routes (about, products, news, services, etc.)
- `src/components/` - React components (mostly client components with `'use client'`)
- `src/lib/api.ts` & `siteApi.ts` - API client utilities for backend communication
- `src/messages/` - Translation JSON files (en.json, zh.json)
- `src/types/` - TypeScript type definitions

## Detailed Guidelines

See [AGENTS.md](./AGENTS.md) for comprehensive code style, component patterns, TypeScript conventions, and common tasks.

## No Tests

This project has no test suite. Do not add tests unless explicitly requested.