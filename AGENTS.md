# AGENTS.md - Development Guide for Agentic Coding

This document provides guidelines for agentic coding agents working in this codebase.

## Project Overview

- **Project Name**: safetyshoe-frontend
- **Type**: Next.js 14 E-commerce Website (Industrial Safety Shoes)
- **Tech Stack**: Next.js 14, React 18, TypeScript 5, Tailwind CSS, next-intl (i18n)
- **Output**: Static export for hosting on various platforms

## Build / Development Commands

```bash
# Development
cd safetyshoe-frontend
npm run dev          # Start development server (http://localhost:3000)

# Production Build
npm run build        # Build for production (enables static export)
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint

# Static Export (for hosting)
npm run export       # Generate static files (out/ directory)

# Deployment
npm run deploy       # Deploy to production server (runs ../deploy-to-server.sh)
```

**Note**: This project has no test suite. Do not write tests unless explicitly requested.

## Code Style Guidelines

### General Principles

- Write clean, readable, and maintainable code
- Use TypeScript for all new files with strict typing
- Follow the existing patterns in the codebase
- Keep components small and focused (single responsibility)
- Use meaningful variable and function names

### Imports & Path Aliases

The project uses path aliases configured in `tsconfig.json`:

```typescript
// Use these imports instead of relative paths when possible
import { Product } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { ProductCard } from '@/components/ProductCard';
import { useLocale } from 'next-intl';

// Available aliases:
@/components/*   -> ./src/components/*
@/lib/*          -> ./src/lib/*
@/types/*        -> ./src/types/*
@/app/*          -> ./src/app/*
```

### File & Component Naming

- **Components**: PascalCase (e.g., `ProductCard.tsx`, `Hero.tsx`)
- **Utilities/Lib files**: camelCase (e.g., `api.ts`, `utils.ts`)
- **Types**: PascalCase in `src/types/index.ts`
- **React Components**: Export as named function, e.g., `export function ProductCard(...)`

### TypeScript Conventions

- Use `interface` for object shapes and public APIs
- Use `type` for unions, intersections, and primitives
- Avoid `any` - use `unknown` when type is truly unknown
- Always type function parameters and return values

```typescript
// Good
interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  // ...
}

// Avoid
function ProductCard(props) {  // No types
```

### React Patterns

- **Client Components**: Add `'use client'` directive at top for components using hooks
- **Component Props**: Define interface for each component's props
- **Optional Props**: Use `?` for optional properties with `className?: string` as standard
- **Conditionals**: Use early returns for empty states

```typescript
'use client';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className={cn('grid grid-cols-3 gap-4', className)}>
      {/* ... */}
    </div>
  );
}
```

### CSS & Tailwind CSS

- Use Tailwind CSS classes for all styling
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Follow custom theme colors: `primary`, `secondary`, `accent`
- Use semantic class names when possible

```typescript
import { cn } from '@/lib/utils';

// Conditional classes
<div className={cn('base-class', condition && 'conditional-class', className)}>

// Merge props className
<div className={cn('default-styles', className)}>
```

### API & Data Fetching

- Use the API utilities in `@/lib/api.ts` and `@/lib/siteApi.ts`
- Handle errors with try-catch and provide meaningful error messages
- Use cached API requests for data that doesn't change frequently

```typescript
try {
  const products = await productsApi.getProducts({ category: 'safety' });
} catch (error) {
  console.error('Failed to fetch products:', error);
  // Handle error appropriately
}
```

### Error Handling

- Use try-catch for async operations
- Create meaningful error messages
- Handle errors at the appropriate level (component vs page)

```typescript
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
```

### Internationalization (i18n)

- Use `next-intl` for internationalization
- Use `useLocale()` hook to get current locale
- Use `getTranslations` or `useTranslations` for translations

```typescript
import { useLocale } from 'next-intl';

export function MyComponent() {
  const locale = useLocale();
  // Use locale for locale-specific logic
}
```

### Naming Conventions

- **Components**: `ProductCard`, `HeroSection` (PascalCase)
- **Functions**: `getProducts`, `formatPrice` (camelCase)
- **Constants**: `API_BASE_URL`, `MAX_ITEMS` (SCREAMING_SNAKE_CASE)
- **Interfaces**: `Product`, `CategoryResponse` (PascalCase)
- **Files**: `product-card.tsx`, `api.ts` (kebab-case)

### What NOT To Do

1. **Don't use `any`** - Use proper typing or `unknown`
2. **Don't create new test files** - No test framework is set up
3. **Don't modify `.env` files** - They contain production credentials
4. **Don't commit secrets** - Use environment variables
5. **Don't use relative imports** - Prefer path aliases
6. **Don't skip TypeScript types** - Always type function parameters

## Project Structure

```
safetyshoe-frontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── [locale]/     # Localization routes
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   ├── lib/              # Utilities and API clients
│   ├── types/            # TypeScript type definitions
│   ├── messages/        # Translation files (en.json, zh.json, etc.)
│   └── i18n.ts          # Internationalization config
├── public/               # Static assets
├── tailwind.config.js   # Tailwind configuration
├── next.config.js       # Next.js configuration
└── package.json         # Dependencies
```

## Common Tasks

### Creating a New Component

```typescript
// src/components/NewComponent.tsx
'use client';

import { cn } from '@/lib/utils';

interface NewComponentProps {
  title: string;
  className?: string;
}

export function NewComponent({ title, className }: NewComponentProps) {
  return (
    <div className={cn('default-styles', className)}>
      {title}
    </div>
  );
}
```

### Adding a New API Endpoint

Add to `src/lib/api.ts` following the existing pattern:

```typescript
export const newApi = {
  async getData(params: SearchParams = {}): Promise<DataResponse> {
    const queryString = buildQueryString(params);
    return apiRequest<DataResponse>(`/api/new-endpoint${queryString}`);
  },
};
```

### Working with Environment Variables

```typescript
// Read-only access
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// NEVER write to environment variables
// NEVER commit .env files
```

## Important Notes

1. **No Tests**: This project has no test suite. Do not add tests.
2. **Static Export**: Production build uses `output: 'export'` - no server-side features work in production
3. **Images**: Configured with `unoptimized: true` for static export compatibility
4. **i18n**: Routes are prefixed with locale (`/en/`, `/zh/`, etc.)
5. **Chinese Comments**: Some existing code contains Chinese comments - you may keep them for context but prefer English for new code