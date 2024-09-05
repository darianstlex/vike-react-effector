import type { Scope, SerializedState } from 'effector';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import React, { createContext, useState } from 'react';

import { updateScope } from './scope';

interface ScopeProviderProps {
  children: ReactNode;
  value: Scope;
}

export const ScopeContext = createContext<Scope | undefined>(undefined);
export const ScopeUpdateContext = createContext<(values: SerializedState) => void>(() => {});

export const ScopeProvider: React.FC<ScopeProviderProps> = ({ children, value }) => {
  const [scope, setScope] = useState<Scope>(value);

  useEffect(() => {
    setScope(value);
  }, [value]);

  return (
    <ScopeContext.Provider value={scope}>
      <ScopeUpdateContext.Provider value={(values) => setScope(updateScope(values))}>
        {children}
      </ScopeUpdateContext.Provider>
    </ScopeContext.Provider>
  );
};
