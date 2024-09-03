import { useUnit } from 'effector-react';
import React from 'react';

import { model } from './model';

export function Counter() {
  const [counter, inc] = useUnit([model.$counter, model.inc]);

  return (
    <button type="button" onClick={inc}>
      Counter {counter}
    </button>
  );
}
