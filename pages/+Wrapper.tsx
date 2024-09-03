import { allSettled } from 'effector';
import { Provider } from 'effector-react';
import React, { useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';

export default function WrapperEffector({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const scope = 'scope' in pageContext ? pageContext.scope : window.__VIKE_EFX_SCOPE;

  useEffect(() => {
    const firePageStarted = async () => {
      const { pageStarted } = pageContext.config;
      if (pageStarted) {
        await allSettled(pageStarted, { scope: scope!, params: pageContext });
      }
    };
    firePageStarted().catch(() => {
      throw 'Page start failed';
    });
  }, []);

  return <Provider value={scope!}>{children}</Provider>;
}
