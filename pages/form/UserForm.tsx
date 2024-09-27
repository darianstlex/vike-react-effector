import './service';

import { Form } from 'efx-forms';
import { useFormMethods } from 'efx-forms/useFormMethods';
import { max, min, required } from 'efx-forms/validators';
import React from 'react';

import { Button } from '@components/Button';
import { NumberField, TextField } from '@components/Input';

import { onSubmit } from './UserForm.telefunc';

export const UserForm = () => {
  const { reset } = useFormMethods('user');

  const handleSubmit = async (values: Record<string, any>) => {
    const data = await onSubmit(values);
    if (data) throw data;
    else reset();
  };

  return (
    <Form name="user" onSubmit={handleSubmit}>
      <TextField name="firstName" label="First Name" validators={[required()]} />
      <TextField name="lastName" label="Last Name" validators={[required()]} />
      <NumberField name="age" label="Age" validators={[min({ value: 1 }), max({ value: 150 })]} />
      <TextField name="names" label="Names" />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
