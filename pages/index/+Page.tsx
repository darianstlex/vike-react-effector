import { useUnit } from 'effector-react';
import React from 'react';

import { Button } from '@components/Button';
import { appService } from '@services/app';

import { Counter } from './Counter.js';
import { model } from './model';
import { RandomButton } from './RandomButton';

import styles from './Page.module.css';

export default function Page() {
  const [data, random, telefunc, appState, appCounter, incCounterFx] = useUnit([
    model.$data,
    model.$random,
    model.$telefunc,
    appService.$appState,
    appService.$appCounter,
    appService.incCounterFx,
  ]);
  return (
    <>
      <h1>My Vike app</h1>
      This page is:
      <ul className={styles.list}>
        <li>Rendered to HTML.</li>
        <li suppressHydrationWarning>App State: {appState}</li>
        <li>
          Initiated on client. <Counter />
        </li>
        <li>Data: {data}</li>
        <li>From server: {random}</li>
        <li>
          Telefunc: {telefunc} <RandomButton />
        </li>
        <li>
          Async Counter: {appCounter}. <Button onClick={incCounterFx}>inc</Button>
        </li>
      </ul>
    </>
  );
}
