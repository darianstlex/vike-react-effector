# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Vike + React + Effector** application - a full-stack React application using Vike for SSR/routing, Effector for state management, and Telefunc for type-safe client-server communication.

**Tech Stack:**
- **Vike**: Meta-framework for React with SSR/SPA routing
- **React 19**: UI framework
- **Effector**: Reactive state manager 
- **Telefunc**: Type-safe RPC between client and server
- **Express**: Server framework
- **efx-forms**: Form library built on Effector
- **TypeScript**: Type safety throughout

## Common Commands

### Development
```bash
npm run dev        # Start development server (port 3001)
npm run build      # Build for production
npm start         # Build and start production server
npm run lint      # Run ESLint
```

### Development Server
- Runs on `http://localhost:3001`
- Uses Vite dev middleware in development
- Supports hot reload and fast refresh

## Architecture Overview

### Directory Structure
```
├── pages/           # Vike pages (file-based routing)
│   ├── +config.ts   # Global Vike configuration
│   ├── +Wrapper.tsx # App wrapper with Effector providers
│   └── [page]/      # Individual pages
├── server/          # Express server setup
├── components/      # Reusable React components
├── layouts/         # Layout components
├── services/        # Effector services/models
├── utils/effector/  # Effector utilities and providers
├── assets/          # Static assets
└── database/        # Mock database files
```

### Key Architectural Patterns

**1. Vike File-Based Routing**
- Each page is a directory in `/pages/`
- `+Page.tsx` - React component
- `+data.ts` - Server-side data fetching
- `+config.ts` - Page-specific configuration
- Special hooks: `+pageInitiated.ts` (server), `+pageStarted.ts` (client)

**2. Effector State Management**
- Models exported from `model.ts` files contain stores, events, and effects
- Each page can have its own model for local state
- Global services in `/services/` for app-wide state
- SSR-safe with `fork()` and `serialize()` for scope management

**3. Telefunc RPC Integration**
- `*.telefunc.ts` files define server functions
- Import and call from client components
- Type-safe communication between client/server
- Integrates with Effector through `fork()` and `serialize()`

**4. Effector SSR Architecture**
- `ScopeProvider` manages Effector scopes for SSR
- `EffectorProvider` provides React integration
- Server-side state serialized via `scopeValues` passed to client
- Custom `getScope()` utilities for accessing current scope

## Key Configuration Files

**TypeScript Paths** (defined in `tsconfig.json` and `vite.config.ts`):
- `@assets/*` → `./assets/*`
- `@components/*` → `./components/*` 
- `@layouts/*` → `./layouts/*`
- `@services/*` → `./services/*`
- `@styles/*` → `./styles/*`
- `@utils/*` → `./utils/*`
- `@/*` → `./*`

**Build Pipeline:**
- Uses SWC with `effector-swc-plugin` for Effector optimization
- React plugin with `effector/babel-plugin` 
- Vite for bundling with Vike plugin integration

## Effector Integration Patterns

**Page Models:**
```typescript
// pages/[page]/model.ts
export const someEvent = createEvent();
export const $store = createStore(initial);
export const model = { someEvent, $store };
```

**Telefunc + Effector:**
```typescript
// *.telefunc.ts files
export const serverFunction = async (params) => {
  const scope = fork({ values: [[model.$store, newValue]] });
  return serialize(scope);
};
```

**Form Integration:**
- Uses `efx-forms` library built on Effector
- Forms automatically integrate with Effector state
- Validation through `efx-forms/validators`

## Development Notes

**Server Setup:**
- Express server in `/server/entry.ts`
- Telefunc middleware for RPC endpoints
- Vike middleware for SSR/routing
- Development uses Vite dev middleware

**Component Patterns:**
- Components in `/components/` with TypeScript
- Form components integrate with `efx-forms`
- Button and Input components provide base UI elements

**State Management:**
- Page-level state in individual `model.ts` files
- App-level state in `/services/` directory
- SSR-safe patterns using Effector's `fork()` and scopes

**Linting/Formatting:**
- ESLint with TypeScript, React, and Prettier integration
- Import sorting with `eslint-plugin-simple-import-sort`
- Consistent code style enforced via Prettier
