# EFFECTOR UTILITIES KNOWLEDGE BASE

**Generated:** 2026-03-07  
**Commit:** e70b57f

## OVERVIEW

SSR-compatible Effector scope management utilities for cross-boundary state synchronization.

## STRUCTURE

```
./utils/effector/
├── getScope.ts           # Core SSR hack: fork() for server, internal_getClientScope() for client
├── EffectorProvider.tsx  # Provider component for scope propagation
├── ScopeProvider.tsx     # Scope context provider wrapper
├── events.ts             # Page lifecycle events (createPageInit, createPageStart)
└── index.ts              # Re-exports, README.md: full API docs
```

## WHERE TO LOOK

| Task              | Location                              | Notes                                                 |
| ----------------- | ------------------------------------- | ----------------------------------------------------- |
| Get current scope | `utils/effector/getScope.ts`          | Returns fork() on server, \_currentScope on client    |
| Page init event   | `utils/effector/events.ts`            | createPageInit() - fires server-side before render    |
| Page start event  | `utils/effector/events.ts`            | createPageStart() - fires client-side after hydration |
| Scope provider    | `utils/effector/EffectorProvider.tsx` | Wraps app with scope context for SSR                  |

## CONVENTIONS

- **SSR hack:** getScope() uses fork() on server, INTERNAL_getClientScope() on client (from effector/next)
- **Page lifecycle:** createPageInit() triggers before server render, createPageStart() after hydration
- **Scope inheritance:** Pages inherit server-scoped stores via getScope() hack
- **Never modify scope directly:** Always use events/effects to trigger state changes

## ANTI-PATTERNS

- ❌ Direct store value modification (use events/effects)
- ❌ Accessing document/window in server code or +data.ts
- ❌ Creating new stores without proper serialization config (`serialize: 'ignore'` for client-only)
