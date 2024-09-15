import { useUnit } from 'effector-react';
import React from 'react';

import { appService } from '@services/app';

import { Counter } from './Counter.js';
import { model } from './model';
import { RandomButton } from './RandomButton';

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
      <ul>
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
          Async Counter: {appCounter}. <button onClick={incCounterFx}>inc</button>
        </li>
      </ul>
    </>
  );
}
