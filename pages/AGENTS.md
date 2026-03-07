# PAGES KNOWLEDGE BASE

**Generated:** 2026-03-07  
**Commit:** e70b57f

## OVERVIEW

Vike page routing system with SSR, data fetching, and client-side hydration patterns.

## STRUCTURE

```
./pages/
├── +config.ts              # Global config: Layout, Head, meta, vike-react extends
├── +Page.tsx               # (root) Wrapper for all pages
├── +onBeforeRender.ts      # Server-side hook
├── +onBeforeRenderClient.ts# Client-side hook
├── +onPageTransitionStart.ts/pageTransitionEnd.ts
├── _error/+Page.tsx        # 404/500 handler via is404 flag
├── index/                  # Home page with Effector demo
│   ├── +Page.tsx
│   └── model.ts            # Page-local effector store
├── todo/                   # Todo list with static data from database/
├── form/                   # Form component example
└── star-wars/              # Data fetching with dynamic routing (@id)
```

## WHERE TO LOOK

| Task            | Location                         | Notes                              |
| --------------- | -------------------------------- | ---------------------------------- |
| Add new page    | `pages/{pageName}/+Page.tsx`     | Vike auto-routes based on path     |
| Page data fetch | `{pageName}/+data.ts`            | Server-side, returns data to +Page |
| Page title      | `{pageName}/+title.ts`           | Sets document.title                |
| Global config   | `pages/+config.ts`               | Layout, Head, meta for all pages   |
| SSR event       | `pages/+onBeforeRender.ts`       | Fires before server render         |
| CSR event       | `pages/+onBeforeRenderClient.ts` | Fires on client hydration          |

## CONVENTIONS

- All Vike convention files start with `+` prefix
- Pages inherit from `pages/+config.ts` (Layout, HeadDefault)
- Data fetching via `+data.ts` returns object merged into page context
- Use `useData<T>()` hook in +Page to access fetched data
- SSR/CSR events use Vike hooks at root `/pages/` level

## ANTI-PATTERNS

- ❌ Direct store access without `useUnit` from effector-react
- ❌ Client-side-only logic in +data.ts (must be server-compatible)
- ❌ Modifying scope values directly in page components
