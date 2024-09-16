import React from 'react';

import { useScopeUpdate } from '@utils/effector';

import { onGenerateRandom } from './RandomButton.telefunc';

export const RandomButton = () => {
  const updateScope = useScopeUpdate();
  const onClick = async () => {
    const scopeValues = await onGenerateRandom();
    updateScope(scopeValues);
  };

  return <button onClick={onClick}>Test Telefunc scope update</button>;
};
