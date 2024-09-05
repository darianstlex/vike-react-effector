import React, { useContext } from 'react';

import { ScopeUpdateContext } from '@utils/effector';

import { onGenerateRandom } from './RandomButton.telefunc';

export const RandomButton = () => {
  const updateScope = useContext(ScopeUpdateContext);
  const onClick = async () => {
    const scopeValues = await onGenerateRandom();
    updateScope(scopeValues);
  };

  return <button onClick={onClick}>Test Telefunc scope update</button>;
};
