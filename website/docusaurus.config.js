const path = require('path');

module.exports = {
  customFields: {
    email: 'hello@uniforms.tools',
    keywords: ['forms', 'react', 'schema']
  },
  title: 'uniforms',
  tagline: 'A React library for building forms from any schema',
  organizationName: 'vazco',
  projectName: 'uniforms',
  baseUrl: '/',
  url: 'https://uniforms.tools/',
  themeConfig: {
    algolia: {
      algoliaOptions: {},
      apiKey: '513292b2605e0bc7bfdf63163dfde1c4',
      indexName: 'uniforms'
    },
    googleAnalytics: { trackingID: 'UA-136559762-4' },
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
