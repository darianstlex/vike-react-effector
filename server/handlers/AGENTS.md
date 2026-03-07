# SERVER HANDLERS KNOWLEDGE BASE

**Generated:** 2026-03-07  
**Commit:** e70b57f

## OVERVIEW

Express middleware handlers for Vike SSR and Telefunc RPC integration.

## STRUCTURE

```
./server/handlers/
├── vike.ts           # Vike SSR handler: createDevMiddleware, handleVike()
└── telefunc.ts       # Telefunc RPC handler: POST /api/_data endpoint
```

## WHERE TO LOOK

| Task             | Location                      | Notes                                             |
| ---------------- | ----------------------------- | ------------------------------------------------- |
| Main entry point | `server/entry.ts`             | Express app setup, middleware chain               |
| Vike SSR         | `server/handlers/vike.ts`     | createDevMiddleware(), handleVike() for routing   |
| Telefunc RPC     | `server/handlers/telefunc.ts` | POST /api/\_data endpoint for client→server calls |

## CONVENTIONS

- **Telefunc config:** `config.telefuncUrl = '/api/_data'` in telefunc handler
- **RPC pattern:** Client calls Telefunc function → Express middleware → server handler
- **Dev vs prod:** createDevMiddleware() for development, express.static() for production
- **Order matters:** cookieParser → compression → text → telefunc → vike

## ANTI-PATTERNS

- ❌ Blocking main thread with synchronous operations in handlers
- ❌ Direct file system access without proper error handling
- ❌ Mixing SSR and client-side logic in same handler
