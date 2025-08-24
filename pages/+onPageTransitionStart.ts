import type { PageContextClient } from 'vike/types';

export const onPageTransitionStart = async (pageContext: PageContextClient) => {
  if (pageContext.isHydration) {
    document.querySelector('body')?.classList.add('page-is-transitioning');
  }
};
