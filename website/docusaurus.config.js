const path = require('path');

module.exports = {
  title: 'uniforms',
  tagline: 'A set of React libraries for building forms.',
  organizationName: 'vazco',
  projectName: 'uniforms',
  baseUrl: '/',
  url: 'https://uniforms.tools/',
  themeConfig: {
    googleAnalytics: { trackingID: 'UA-136559762-4' },
    navbar: {
      links: [
        { label: 'Docs', to: 'docs/what-are-uniforms' },
        { label: 'Playground', to: 'playground' },
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
