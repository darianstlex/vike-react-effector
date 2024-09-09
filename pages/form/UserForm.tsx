import { Form } from 'efx-forms';
import { useFormMethods } from 'efx-forms/useFormMethods';
import React from 'react';

import { Button } from '@components/Button';
import { TextField } from '@components/Input';

import { onSubmit } from './UserForm.telefunc';

export const UserForm = () => {
  const form = useFormMethods('user');

  const handleSubmit = (values: Record<string, any>) => {
    void onSubmit(values);
    form.reset();
  };

  return (
    <Form name="user" onSubmit={handleSubmit}>
      <TextField name="firstName" label="First Name" />
      <TextField name="lastName" label="Last Name" />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
