import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
        docs: { sidebarPath: './sidebars.ts' },
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  customFields: {
    email: 'hello@uniforms.tools',
    companies: [
      { url: 'https://www.deskpro.com/', image: 'deskpro.png', alt: 'Deskpro' },
      { url: 'https://www.nokia.com/', image: 'nokia.png', alt: 'Nokia' },
      {
        url: 'https://github.com/react-page/react-page/tree/master/packages/plugins/createPluginMaterialUi',
        image: 'react-page.png',
        alt: 'React Page',
      },
      {
        url: 'https://graphback.dev',
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
        url: 'https://cleverbeagle.com/together',
        image: 'cleverbeagle.png',
        alt: 'Clever Beagle',
      },
      { url: 'http://www.orionjs.org', image: 'orionjs.png', alt: 'Orion.js' },
      {
        url: 'https://boulder.care',
        image: 'boulder.svg',
        alt: 'Boulder Care',
      },
    ],
  },

  themeConfig: {
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
          href: 'https://github.com/vazco/uniforms',
          label: 'GitHub',
          position: 'left',
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
