# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-07  
**Commit:** e70b57f  
**Branch:** main

## OVERVIEW

Vike-based SSR React app with Effector state management. Full-stack TypeScript server using Express, Telefunc for RPC, Vite bundler.

## STRUCTURE

```
./
├── pages/          # Vike page routes (+Page.tsx, +data.ts)
├── components/     # Reusable UI components (button, input)
├── layouts/        # Default LayoutDefault, HeadDefault
├── utils/effector/ # Effector scope management utilities
├── services/app/   # App-level Effector stores
├── server/         # Express entry + handlers (vike, telefunc)
├── database/       # Static data (todoItems.ts)
└── assets/         # SVG logos, static assets
```

## WHERE TO LOOK

| Task                 | Location                                           | Notes                                       |
| -------------------- | -------------------------------------------------- | ------------------------------------------- |
| Add new page         | `pages/{name}/+Page.tsx`                           | Vike convention files: +Page, +data, +title |
| Modify global layout | `layouts/LayoutDefault.tsx`                        | Wraps all pages with sidebar nav            |
| Effector store       | `services/app/index.ts`, `utils/effector/`         | Use fork/getScope for SSR scoping           |
| Server entry         | `server/entry.ts`                                  | Express app, middleware setup               |
| API RPC calls        | Telefunc handlers in `server/handlers/telefunc.ts` | POST /api/\_data                            |
| Component styling    | `{component}/index.module.css`                     | CSS Modules per component                   |

## CONVENTIONS

- **File naming:** Vike convention files prefixed with `+` (`+Page.tsx`, `+config.ts`)
- **Imports:** Path aliases via tsconfig: `@components/*`, `@utils/*`, `@services/*`, `@layouts/*`, `@assets/*`
- **Effector scope:** Always use `getScope()` for SSR, never direct store access across boundaries
- **Styling:** CSS Modules exclusively (`*.module.css`)
- **Formatting:** Prettier with 120-char printWidth, single quotes (`.prettierrc`)
- **ESLint:** strict mode, simple-import-sort, no-unused-vars off

## ANTI-PATTERNS

- ❌ Direct store access without `useUnit` in components
- ❌ Importing server code to client or vice versa
- ❌ Using global CSS instead of CSS Modules for components
- ❌ Modifying scope values directly (always use events/effects)
- ❌ Ignoring SSR/CSR boundary when accessing `document` or `window`

## UNIQUE STYLES

- **Dual Effector plugins:** Babel + SWC both enabled in Vite config
- **Scope inheritance:** Pages inherit server-scoped stores via `getScope()` hack from effector/next
- **Telefunc integration:** RPC calls routed through Express middleware at `/api/_data`

## COMMANDS

```bash
npm run dev    # Start dev server with Vike HMR
npm run build  # Build for production
npm run start  # Run production build
npm run lint   # ESLint check
```

## NOTES

- **SSR/CSR balance:** Pages initiated on server (`+pageInitiated`), started on client (`+pageStarted`)
- **Page transitions:** Hooks `+onPageTransitionStart.ts`, `+onPageTransitionEnd.ts` at `/pages/` root
- **Error pages:** `_error/+Page.tsx` handles both 404 and 500 via `is404` flag from Vike
- **Vike extends:** All pages inherit from `pages/+config.ts` (Layout, Head, meta)
