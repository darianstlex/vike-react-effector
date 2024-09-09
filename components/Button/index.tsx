import type { ReactNode } from 'react';
import React from 'react';

import styles from './index.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  secondary?: boolean;
}

export const Button = ({ children, secondary = false, type = 'button', ...props }: ButtonProps) => (
  <button className={[styles.button, secondary ? styles.buttonSecondary : ''].join(' ')} {...{ type, ...props }}>
    {children}
  </button>
);
