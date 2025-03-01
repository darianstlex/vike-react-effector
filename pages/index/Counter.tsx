import { useUnit } from 'effector-react';
import React from 'react';

import { Button } from '@components/Button';

import { model } from './model';

export function Counter() {
  const [counter, inc] = useUnit([model.$counter, model.inc]);

  return <Button onClick={inc}>Counter {counter}</Button>;
}
