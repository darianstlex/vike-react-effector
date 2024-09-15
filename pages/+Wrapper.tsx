import React from 'react';

import { EffectorProvider, ScopeProvider } from '@utils/effector';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <ScopeProvider>
      <EffectorProvider>{children}</EffectorProvider>
    </ScopeProvider>
  );
}
