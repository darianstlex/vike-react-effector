/// <reference types="vite/client" />
import type { Scope } from 'effector';

declare global {
  interface Window {
    __VIKE_EFX_SCOPE?: Scope;
  }
}

export {};
