import { allSettled, fork, serialize } from 'effector';
import type { PageContextClient } from 'vike/types';

import { appService } from '@services/app';

export const onBeforeRenderClient = async (pageContext: PageContextClient) => {
  const { scopeValues } = pageContext;
  window.__VIKE_EFX_SCOPE = fork({
    values: {
      ...(window.__VIKE_EFX_SCOPE ? serialize(window.__VIKE_EFX_SCOPE) : {}),
      ...scopeValues,
    },
  });
  if (pageContext.isHydration) {
    await allSettled(appService.appStarted, { scope: window.__VIKE_EFX_SCOPE });
  }
};
