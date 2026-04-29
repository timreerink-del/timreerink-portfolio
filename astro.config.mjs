// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://timreerink.com',
  integrations: [mdx(), sitemap()],
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
  output: 'static',
  image: {
    layout: 'constrained',
  },
});
