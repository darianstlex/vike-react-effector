import type { Scope, SerializedState } from 'effector';
import { fork, serialize } from 'effector';

export const getScope = () => window.__VIKE_EFX_SCOPE;

export const updateScope = (values?: SerializedState): Scope => {
  window.__VIKE_EFX_SCOPE = fork({
    values: {
      ...(window.__VIKE_EFX_SCOPE ? serialize(window.__VIKE_EFX_SCOPE) : {}),
      ...(values || {}),
    },
  });

  return window.__VIKE_EFX_SCOPE;
};
