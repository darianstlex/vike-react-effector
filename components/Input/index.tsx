import type { IFieldProps, IRFieldProps } from 'efx-forms';
import { Field } from 'efx-forms';
import type { InputHTMLAttributes } from 'react';
import React from 'react';

import styles from './index.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
  name: string;
}

export const Input = ({ id, label, error, onChange, name, value, ...rest }: InputProps & IFieldProps) => (
  <div className={styles.inputWrapper}>
    <label htmlFor={id || name}>{label}</label>
    <input
      name={name}
      id={id || name}
      className={styles.inputField}
      type="text"
      onChange={(e) => onChange(e.target.value)}
      value={value || ''}
      {...rest}
    />
    {error && (
      <span data-test={`${name}-error`} className={styles.inputError}>
        {error}
      </span>
    )}
  </div>
);

export const TextField = ({ name, ...rest }: Omit<IRFieldProps, 'Field'> & InputProps) => (
  <Field name={name} Field={Input} {...rest} />
);

export const NumberField = ({ name, ...rest }: Omit<IRFieldProps, 'Field'> & InputProps) => (
  <Field
    name={name}
    Field={Input}
    type="number"
    format={(num: number) => `${num}`}
    parse={(num: number) => Number(num)}
    {...rest}
  />
);
