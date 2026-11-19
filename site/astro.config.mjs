import { defineConfig } from 'astro/config';

// Propostas de layout: cada página gera um .html autocontido (CSS inline),
// para poder ser aberta direto do disco ou numa prévia.
export default defineConfig({
  site: 'https://pazetto.net',
  build: { format: 'file', inlineStylesheets: 'always' },
});
