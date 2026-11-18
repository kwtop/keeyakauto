import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { SITE_URL } from './site.config.mjs';

export default defineConfig({
  site: SITE_URL,
  integrations: [react()],
  devToolbar: { enabled: false },
  vite: { server: { proxy: { '/api': { target: 'http://127.0.0.1:8789', changeOrigin: false } } } },
  trailingSlash: 'always',
  output: 'static'
});
