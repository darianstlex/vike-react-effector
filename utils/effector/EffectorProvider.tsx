import { allSettled } from 'effector';
import { Provider } from 'effector-react';
import React, { useContext, useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';

import { ScopeContext } from './ScopeProvider';

export const EffectorProvider = ({ children }: { children: React.ReactNode }) => {
  const pageContext = usePageContext();
  const scope = useContext(ScopeContext);

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
  }, [pageContext]);

  return <Provider value={scope!}>{children}</Provider>;
};
