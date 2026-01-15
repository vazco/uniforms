import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'uniforms | React form library for building forms from any schema',
  tagline:
    "When it comes to using build forms in React, it's always good to choose a trusted React form library. Build forms and enjoy peace of mind on your project.",
  favicon: 'img/favicon.ico',

  url: 'https://uniforms.tools',
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'vazco',
  projectName: 'uniforms',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: { sidebarPath: './sidebars.ts', includeCurrentVersion: false },
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/getting-started/migrating-3-to-4',
            from: ['/docs/getting-started/migrating-4-to-4'],
          },
        ],
      },
    ],
  ],

  customFields: {
    email: 'hello@uniforms.tools',
    companies: [
      { url: 'https://www.deskpro.com/', image: 'deskpro.png', alt: 'Deskpro' },
      { url: 'https://www.nokia.com/', image: 'nokia.png', alt: 'Nokia' },
      {
        url: 'https://react-page.github.io/',
        image: 'react-page.png',
        alt: 'React Page',
      },
      {
        url: 'https://github.com/aerogear/graphback',
        image: 'graphback.png',
        alt: 'Graphback',
      },
      {
        url: 'https://www.onyx-one.com/',
        image: 'onyx-one.png',
        alt: 'Onyx one',
      },
      { url: 'https://aerogear.org', image: 'aerogear.png', alt: 'Aerogear' },
      {
        url: 'https://cleverbeagle.com/together', // TODO: Replace me - the link is outdated
        image: 'cleverbeagle.png',
        alt: 'Clever Beagle',
      },
      { url: 'https://www.orionjs.com/', image: 'orionjs.png', alt: 'Orion.js' },
      {
        url: 'https://boulder.care',
        image: 'boulder.svg',
        alt: 'Boulder Care',
      },
    ],
  },

  themeConfig: {
    algolia: {
      apiKey: '9bab87682792c2bd77ec707a56669e29',
      appId: 'WWWW16GKXU',
      contextualSearch: false,
      indexName: 'uniforms',
      searchPagePath: false,
    },
    navbar: {
      logo: { alt: 'uniforms logo', src: 'img/uniforms.svg' },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          label: 'Playground',
          to: '/docs/examples/basic-usage',
          position: 'left',
        },
        {
          href: 'https://github.com/vazco/uniforms',
          label: 'GitHub',
          position: 'left',
        },
        {
          label: 'Enterprise',
          href: 'https://forminer.com/?utm_source=uniforms&utm_medium=Menu_CTA&utm_campaign=Forminer_uniforms_menu_CTA&utm_id=Forminer_uniforms_menu',
          position: 'left',
        },
        {
          label: 'Custom solutions',
          href: 'https://www.vazco.eu/',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
