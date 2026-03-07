# COMPONENTS KNOWLEDGE BASE

**Generated:** 2026-03-07  
**Commit:** e70b57f

## OVERVIEW

Reusable UI components with CSS Modules styling and Effector integration patterns.

## STRUCTURE

```
./components/
├── Button/
│   ├── index.tsx         # Component implementation
│   └── index.module.css  # Scoped styles
├── Input/
│   ├── index.tsx
│   └── index.module.css
└── Link.tsx              # Shared link component (no folder)
```

## WHERE TO LOOK

| Task                 | Location                                      | Notes                            |
| -------------------- | --------------------------------------------- | -------------------------------- |
| Create new component | `components/{ComponentName}/index.tsx`        | Use PascalCase directory name    |
| Component styles     | `components/{ComponentName}/index.module.css` | CSS Modules, scoped to component |
| Import components    | `import { Button } from '@components/Button'` | Path alias @components/\*        |

## CONVENTIONS

- **Structure:** Folder per component with `index.tsx` as entry point
- **Styling:** CSS Modules exclusively (`*.module.css`) - no global styles
- **Exports:** Named exports preferred, barrel export via index.tsx
- **Props:** TypeScript interfaces defined inline or in separate .d.ts

## ANTI-PATTERNS

- ❌ Global CSS imports in components (use module.css only)
- ❌ Direct DOM manipulation without refs
- ❌ Missing TypeScript prop types
