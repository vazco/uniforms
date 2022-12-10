const path = require('path');

module.exports = {
  title: 'uniforms | React form library for building forms from any schema',
  tagline:
    "When it comes to using build forms in React, it's always good to choose a trusted React form library. Build forms and enjoy peace of mind on your project.",
  organizationName: 'vazco',
  projectName: 'uniforms',
  baseUrl: '/',
  url: 'https://uniforms.tools',
  trailingSlash: true,
  customFields: {
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
    email: 'hello@uniforms.tools',
    keywords: ['forms', 'react', 'schema'],
  },
  themeConfig: {
    algolia: {
      apiKey: '9bab87682792c2bd77ec707a56669e29',
      appId: 'WWWW16GKXU',
      contextualSearch: false,
      indexName: 'uniforms',
      searchPagePath: false,
    },
    footer: { links: [] },
    docs: { sidebar: { hideable: true } },
    hotjar: { hjid: 1434110 },
    navbar: {
      items: [
        { label: 'Docs', to: '/docs/what-are-uniforms', position: 'left' },
        {
          label: 'Tutorial',
          to: '/docs/tutorials-basic-uniforms-usage',
          position: 'left',
        },
        { label: 'Playground', to: '/playground', position: 'left' },
        {
          label: 'GitHub',
          href: 'https://github.com/vazco/uniforms',
          position: 'left',
        },
        {
          label: 'Enterprise',
          href: 'https://www.vazco.eu/form-builder?utm_source=uniforms&utm_medium=Menu_CTA&utm_campaign=FormBuiler_uni_Menu_CTA&utm_id=FormBuilder_uniforms_menu',
          position: 'left',
        },
      ],
      logo: { alt: 'uniforms logo', src: 'img/uniforms.svg' },
    },
    prism: {
      theme: require('prism-react-renderer/themes/vsDark'),
    },
  },
  favicon: 'favicon.ico',
  plugins: [path.resolve(__dirname, './plugins/docusaurus-plugin-hotjar')],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarCollapsible: false,
          sidebarPath: require.resolve('./sidebars.json'),
        },
        googleAnalytics: { trackingID: 'UA-136559762-4' },
        gtag: { trackingID: 'GTM-5RFDRMB' },
        pages: { path: './pages' },
        theme: { customCss: path.join(__dirname, './src/theme/index.css') },
      },
    ],
  ],
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: 'throw',
};
