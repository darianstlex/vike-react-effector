import { useUnit } from 'effector-react';
import React from 'react';

import { Counter } from './Counter.js';
import { model } from './model';

export default function Page() {
  const [data, random] = useUnit([model.$data, model.$random]);
  return (
    <>
      <h1>My Vike app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Initiated on client. <Counter />
        </li>
        <li>Data: {data}</li>
        <li>From server: {random}</li>
      </ul>
    </>
  );
}
