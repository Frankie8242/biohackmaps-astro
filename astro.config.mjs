// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap({
    changefreq: 'weekly',
    lastmod: new Date(),
  })],
  site: 'https://biohackmaps.com',
});
