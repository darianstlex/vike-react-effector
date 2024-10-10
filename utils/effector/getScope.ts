// implementation is taken from the official effector/next library
// to support proper scope updates and after transition effects

import type { createStore, Json, Node, Scope, StateRef } from 'effector';
import { fork, launch } from 'effector';

// types for convenience
type StoreSerializationConfig = Exclude<Parameters<typeof createStore>[1], undefined>['serialize'];

type ScopeInternal = Scope & {
  reg: Record<string, StateRef & { meta?: Record<string, string> }>;
  additionalLinks: Record<string, Node[]>;
};
type Values = Record<string, unknown>;

const isClient = typeof document !== 'undefined';

function getServerScope(values?: Values) {
  return fork({ values });
}

/**
 *
 * Handler to get current client scope.
 *
 * Required for proper integrations with dev-tools.
 *
 * @returns current client scope in browser and null in server environment
 */
export function getClientScope() {
  if (isClient) {
    return _currentScope;
  }

  return null;
}

/**
 * The following code is some VERY VERY VERY BAD HACKS.
 *
 * This only work for a compatibility layer with Next.js and only because of the peculiarities of Next.js behavior.
 *
 * This temporary solution on hacks allows us to solve the pain of library users when working with Next.js, as well as gather much more information to develop a better API.
 */
const _currentScope: Scope = fork();
let prevValues: Values;
/**
 * @private
 *
 * Should not be exported to the public API
 */
function INTERNAL_getClientScope(values?: Values) {
  if (
    !values ||
    /**
     * This is a hack to handle edge cases with shallow navigation
     *
     * In this case Next.js will basically re-use old pageProps,
     * but we already have the latest state in the client scope
     *
     * So this update is just skipped
     */
    values === prevValues
  )
    return _currentScope;

  /**
   * Saving previous values to handle edge cases with shallow navigation
   */
  prevValues = values;

  HACK_injectValues(_currentScope, values);
  HACK_updateScopeRefs(_currentScope, values);

  return _currentScope;
}

function HACK_injectValues(scope: Scope, values: Values) {
  // @ts-expect-error this is a really hacky way to "hydrate" scope
  Object.assign(scope.values.sidMap, values);
}

function HACK_updateScopeRefs(tscope: Scope, values: Values) {
  const scope = tscope as ScopeInternal;

  const linksToRun: string[] = [];

  for (const id in scope.reg) {
    if (Object.hasOwnProperty.call(scope.reg, id)) {
      const ref = scope.reg[id];

      /**
       * Schedule external watchers (useUnit, etc.) re-run
       */
      const nodeId = ref?.meta?.id;

      if (nodeId && scope.additionalLinks[nodeId]) {
        linksToRun.push(nodeId);
      }

      if (!ref.meta || (!ref.meta?.named && ref.meta?.derived)) {
        /**
         * Force recalculation of derived values
         */
        delete scope.reg[id];
      } else {
        /**
         * Update non-derived values
         */
        const sid = ref?.meta?.sid;
        if (sid && sid in values) {
          const serialize = ref?.meta?.serialize as StoreSerializationConfig;
          const read = serialize && serialize !== 'ignore' ? serialize?.read : null;
          ref.current = read ? read(values[sid] as Json) : values[sid];
        }
      }
    }
  }

  /**
   * Delay links run to separate task,
   * so React won't agro on us for updating state during render
   */
  queueMicrotask(() => {
    HACK_runScopeWatchers(scope, linksToRun);
  });
}

function HACK_runScopeWatchers(scope: ScopeInternal, linksToRun: string[]) {
  /**
   * Run watchers (`useUnit`, etc.) to push new values to them
   *
   * Manual launch is required because top-down re-render stops at `memo`-ed components
   */
  if (linksToRun.length) {
    linksToRun.forEach((nodeId) => {
      const links = scope.additionalLinks[nodeId];

      if (links) {
        links.forEach((link) => {
          if (link.meta.watchOp === 'store') {
            launch({
              target: link,
              /**
               * `effector-react` internals will get current value internally
               */
              params: null,
              scope,
            });
          }
        });
      }
    });
  }
}

export const getScope = isClient ? INTERNAL_getClientScope : getServerScope;
