import { sample } from 'effector';
import { getForm } from 'efx-forms';

const form = getForm({ name: 'user' });

sample({
  clock: form.onChange,
  source: form.$values,
  filter: (_, { name }) => ['firstName', 'lastName'].includes(name),
  fn: ({ firstName = '', lastName = '' }) => ({
    names: `${firstName} ${lastName}`,
  }),
  target: form.setValues,
});

sample({
  clock: form.onChange,
  source: form.$values,
  filter: (_, { name }) => ['names'].includes(name),
  fn: (_, { value }) => {
    const [firstName = '', lastName = ''] = value.split(' ');
    return { firstName, lastName };
  },
  target: form.setValues,
});
