import { allSettled } from 'effector';
import { Provider } from 'effector-react';
import React, { useContext, useEffect, useRef } from 'react';
import { usePageContext } from 'vike-react/usePageContext';

import { ScopeContext } from './Context';

export const EffectorProvider = ({ children }: { children: React.ReactNode }) => {
  const busy = useRef<boolean>();
  const pageContext = usePageContext();
  const scope = useContext(ScopeContext);

  useEffect(() => {
    const firePageStarted = async () => {
      const { pageStarted } = pageContext.config;
      if (pageStarted && busy.current !== true) {
        busy.current = true;
        console.log('PAGE STARTED', pageContext);
        await allSettled(pageStarted, { scope: scope!, params: pageContext });
        busy.current = false;
      }
    };
    firePageStarted().catch(() => {
      throw 'Page start failed';
    });
  }, [pageContext]);

  return <Provider value={scope!}>{children}</Provider>;
};
