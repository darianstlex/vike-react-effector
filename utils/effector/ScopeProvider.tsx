import type { Scope, SerializedState } from 'effector';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import React, { createContext, useState } from 'react';
import type { PageContextClient } from 'vike/types';
import { usePageContext } from 'vike-react/usePageContext';

import { getScope, updateScope } from './scope';

interface ScopeProviderProps {
  children: ReactNode;
  value?: Scope;
}

export const ScopeContext = createContext<Scope | undefined>(undefined);
export const ScopeUpdateContext = createContext<(values: SerializedState) => void>(() => {});

export const ScopeProvider: React.FC<ScopeProviderProps> = ({ children, value }) => {
  const pageContext = usePageContext() as PageContextClient;
  const [scope, setScope] = useState<Scope | undefined>(value || getScope());

  const update = (values: SerializedState) => {
    const newScope = updateScope(values);
    setScope(newScope);
  };

  useEffect(() => {
    if (!pageContext.isHydration) {
      setScope(getScope());
    }
  }, [pageContext]);

  return (
    <ScopeContext.Provider value={scope}>
      <ScopeUpdateContext.Provider value={update}>{children}</ScopeUpdateContext.Provider>
    </ScopeContext.Provider>
  );
};
