import React from 'react';
import { usePageContext } from 'vike-react/usePageContext';

import { EffectorProvider, ScopeProvider } from '@utils/effector';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const scope = 'scope' in pageContext ? pageContext.scope : undefined;
  return (
    <ScopeProvider value={scope}>
      <EffectorProvider>{children}</EffectorProvider>
    </ScopeProvider>
  );
}
