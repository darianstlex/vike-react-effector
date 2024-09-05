import { fork, serialize } from 'effector';

import { model } from './model';

export const onGenerateRandom = async () => {
  const scope = fork({
    values: [[model.$telefunc, Math.round(Math.random() * 1000)]],
  });
  return serialize(scope);
};
