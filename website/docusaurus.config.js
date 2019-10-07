const path = require('path');

module.exports = {
  title: 'uniforms',
  tagline: 'A React library for building forms from any schema',
  organizationName: 'vazco',
  projectName: 'uniforms',
  baseUrl: '/',
  url: 'https://uniforms.tools/',
  customFields: {
    companies: [
      { url: 'https://www.deskpro.com/', image: 'deskpro.png', alt: 'Deskpro' },
      { url: 'https://www.nokia.com/', image: 'nokia.png', alt: 'Nokia' },
      {
        url:
          'https://github.com/react-page/react-page/tree/master/packages/plugins/createPluginMaterialUi',
        image: 'react-page.png',
        alt: 'React Page'
      },
      {
        url: 'https://graphback.dev',
        image: 'graphback.png',
        alt: 'Graphback'
      },
      {
        url: 'https://www.onyx-one.com/',
        image: 'onyx-one.png',
        alt: 'Onyx one'
      },
      { url: 'https://aerogear.org', image: 'aerogear.png', alt: 'Aerogear' },
      {
        url: 'https://cleverbeagle.com/together',
        image: 'cleverbeagle.png',
        alt: 'Clever Beagle'
      },
      { url: 'http://www.orionjs.org', image: 'orionjs.png', alt: 'Orion.js' },
      { url: 'https://boulder.care', image: 'boulder.svg', alt: 'Boulder Care' }
    ],
    email: 'hello@uniforms.tools',
    keywords: ['forms', 'react', 'schema']
  },
  themeConfig: {
    algolia: {
      algoliaOptions: {},
      apiKey: '513292b2605e0bc7bfdf63163dfde1c4',
      indexName: 'uniforms'
    },
    googleAnalytics: { trackingID: 'UA-136559762-4' },
    hotjar: { hjid: 1434110 },
    navbar: {
      links: [
        { label: 'Docs', to: '/docs/what-are-uniforms' },
        { label: 'Tutorial', to: '/docs/tutorials-basic-uniforms-usage' },
        { label: 'Playground', to: '/playground' },
        { label: 'GitHub', href: 'https://github.com/vazco/uniforms' }
      ],
      logo: {
        alt: 'uniforms logo',
        src: 'img/uniforms.svg'
      }
    }
  },
  favicon: 'favicon.ico',
  plugins: [path.resolve(__dirname, './plugins/docusaurus-plugin-hotjar')],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.json')
        },
        pages: {
          path: './pages'
        },
        theme: { customCss: path.join(__dirname, './theme/index.css') }
      }
    ]
  ]
};
