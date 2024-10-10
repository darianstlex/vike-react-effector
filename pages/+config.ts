import type { Config } from 'vike/types';
import vikeReact from 'vike-react/config';

import Head from '@layouts/HeadDefault';
import Layout from '@layouts/LayoutDefault';

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  cacheControl: 'public, max-age=604800',
  meta: {
    // Event - fires on server side when the page gets initiated
    pageInitiated: {
      env: { client: false, server: true },
    },
    // Event - fires on client side when the page started
    pageStarted: {
      env: { client: true, server: false },
    },
  },
  passToClient: ['scopeValues'],
  prerender: false,
  title: 'My Vike App',
  reactStrictMode: false,
  extends: vikeReact,
} satisfies Config;
