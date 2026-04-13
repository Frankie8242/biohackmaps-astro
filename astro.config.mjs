// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap({
    changefreq: 'weekly',
    lastmod: new Date(),
    serialize(item) {
      // High priority: homepage, venues index, cities index
      if (item.url === 'https://biohackmaps.com/' ||
          item.url === 'https://biohackmaps.com/venues/' ||
          item.url === 'https://biohackmaps.com/cities/') {
        item.priority = 1.0;
        item.changefreq = 'daily';
      }
      // High priority: city pages and modality pages
      else if (item.url.match(/\/cities\/[^/]+\/$/) ||
               item.url.match(/\/modalities\/[^/]+\/$/)) {
        item.priority = 0.9;
        item.changefreq = 'weekly';
      }
      // Medium-high: city×modality pages
      else if (item.url.match(/\/cities\/[^/]+\/[^/]+\/$/)) {
        item.priority = 0.8;
        item.changefreq = 'weekly';
      }
      // Medium: individual venue pages
      else if (item.url.match(/\/venues\/[^/]+\/$/)) {
        item.priority = 0.7;
        item.changefreq = 'monthly';
      }
      // Static pages
      else {
        item.priority = 0.5;
        item.changefreq = 'monthly';
      }
      return item;
    },
  })],
  site: 'https://biohackmaps.com',
});
