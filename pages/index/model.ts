import { createEvent, createStore } from 'effector';

export const inc = createEvent();

export const $data = createStore('', { sid: '$data' });

export const $random = createStore(0, { sid: '$random' });

export const $counter = createStore(0, { sid: '$counter' }).on(inc, (val) => val + 1);

export const model = {
  inc,
  $data,
  $random,
  $counter,
};
