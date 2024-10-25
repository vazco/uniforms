// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    starlight({
      title: 'uniforms',
      social: {
        github: 'https://github.com/vazco/uniforms',
      },
      sidebar: [
        {
          label: 'Introduction',
          autogenerate: { directory: 'introduction' },
        },
        {
          label: 'Getting started',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'API Reference',
          autogenerate: { directory: 'api-reference' },
        },
        {
          label: 'Tutorials',
          autogenerate: { directory: 'tutorials' },
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Examples',
          autogenerate: { directory: 'examples' },
        },
        {
          label: 'Under the hood',
          autogenerate: { directory: 'under-the-hood' },
        },
        {
          label: 'Compare matrix',
          link: '/compare-matrix-landing',
        },
      ],
    }),
  ],
});
