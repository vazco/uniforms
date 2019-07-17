module.exports = {
  title: 'uniforms',
  tagline: 'A set of React libraries for building forms.',
  organizationName: 'vazco',
  projectName: 'uniforms',
  baseUrl: '/',
  url: 'https://uniforms.tools/',
  themeConfig: {
    navbar: {
      links: [
        { label: 'Docs', to: 'docs/installation' },
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
        }
      }
    ]
  ]
};
