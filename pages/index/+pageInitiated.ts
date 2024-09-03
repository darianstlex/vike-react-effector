import { sample } from 'effector';

import { createPageStart } from '@utils/effector';

import { $data, $random } from './model';

export const pageInitiated = createPageStart();

sample({
  clock: pageInitiated,
  fn: () => 'HELLO FROM SERVER',
  target: $data,
});

sample({
  clock: pageInitiated,
  fn: () => Math.round(Math.random() * 1000),
  target: $random,
});
