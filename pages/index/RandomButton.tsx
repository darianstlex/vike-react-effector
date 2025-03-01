import React from 'react';

import { Button } from '@components/Button';
import { useScopeUpdate } from '@utils/effector';

import { onGenerateRandom } from './RandomButton.telefunc';

export const RandomButton = () => {
  const updateScope = useScopeUpdate();
  const onClick = async () => {
    const scopeValues = await onGenerateRandom();
    updateScope(scopeValues);
  };

  return <Button onClick={onClick}>Test Telefunc scope update</Button>;
};
