import 'dotenv/config';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDevMiddleware } from 'vike/server';

import { handleTelefunc } from './handlers/telefunc';
import { handleVike } from './handlers/vike';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = `${__dirname}/..`;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

async function startServer() {
  const app = express();

  app.use(cookieParser());
  app.use(compression());
  app.use(express.text());

  if (process.env.NODE_ENV === 'production') {
    app.use(
      express.static(`${root}/dist/client`, {
        redirect: false,
      }),
    );
  } else {
    const { devMiddleware } = await createDevMiddleware({ root });
    app.use(devMiddleware);
  }

  // attach telefunc middleware
  handleTelefunc(app);

  // attach vike middleware
  handleVike(app);

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`); // eslint-disable-line
  });

  return app;
}

await startServer();
