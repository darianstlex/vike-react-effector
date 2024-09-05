import React from 'react';
import { usePageContext } from 'vike-react/usePageContext';

import { EffectorProvider, ScopeProvider, useScope } from '@utils/effector';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const scope = 'scope' in pageContext ? pageContext.scope : useScope();
  return (
    <ScopeProvider value={scope!}>
      <EffectorProvider>{children}</EffectorProvider>
    </ScopeProvider>
  );
}
