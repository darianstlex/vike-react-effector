import { fileURLToPath, URL } from 'node:url';
import { telefunc } from 'telefunc/vite';
import swc from 'unplugin-swc';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    vike(),
    react({
      babel: {
        plugins: ['effector/babel-plugin'],
        babelrc: true,
      },
    }),
    telefunc(),
    swc.vite({
      jsc: {
        experimental: {
          plugins: [['effector-swc-plugin', {}]],
        },
      },
    }),
  ],
  ssr: {
    noExternal: ['efx-forms'],
  },
  resolve: {
    alias: {
      '@assets': fileURLToPath(new URL('./assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./components', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./layouts', import.meta.url)),
      '@services': fileURLToPath(new URL('./services', import.meta.url)),
      '@styles': fileURLToPath(new URL('./styles', import.meta.url)),
      '@utils': fileURLToPath(new URL('./utils', import.meta.url)),
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
});
