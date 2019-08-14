const path = require('path');

module.exports = {
  title: 'uniforms',
  tagline: 'A React library for building forms from any schema',
  organizationName: 'vazco',
  projectName: 'uniforms',
  baseUrl: '/',
  url: 'https://uniforms.tools/',
  customFields: {
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
    hotjar: { hjid: 1434110, manual: true },
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
