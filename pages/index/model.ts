import { createEvent, createStore } from 'effector';

export const inc = createEvent();

export const $data = createStore('');

export const $random = createStore(0);

export const $telefunc = createStore(0);

export const $counter = createStore(0).on(inc, (val) => val + 1);

export const model = {
  inc,
  $data,
  $random,
  $counter,
  $telefunc,
};
