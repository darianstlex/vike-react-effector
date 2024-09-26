import type { IRFieldProps } from 'efx-forms';
import { Field } from 'efx-forms';
import type { InputHTMLAttributes } from 'react';
import React from 'react';

import styles from './index.module.css';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id?: string;
  label: string;
  name: string;
  onChange?: (val: string) => void;
  error?: string;
}

export const Input = ({ id, label, error, onChange, name, value, ...rest }: InputProps) => (
  <div className={styles.inputWrapper}>
    <label htmlFor={id || name}>{label}</label>
    <input
      name={name}
      id={id || name}
      className={`${styles.inputField} ${error ? styles.error : ''}`}
      type="text"
      onChange={(e) => onChange?.(e.target.value)}
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
