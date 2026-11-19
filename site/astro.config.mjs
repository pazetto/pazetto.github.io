import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pazetto.net',
  // Gera blog.html, blog/slug.html… O Firebase (cleanUrls) serve sem o ".html".
  build: { format: 'file', inlineStylesheets: 'always' },
  markdown: { shikiConfig: { theme: 'github-dark-dimmed' } },
});
