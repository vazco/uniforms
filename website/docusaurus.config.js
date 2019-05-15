module.exports = {
  title: 'uniforms',
  tagline: 'A set of React libraries for building forms.',
  organizationName: 'vazco',
  projectName: 'uniforms',
  baseUrl: '/uniforms/',
  url: 'https://vazco.github.io/',
  themeConfig: {
    headerLinks: [
      {label: 'Docs', url: 'docs/installation'},
      {label: 'Playground', url: 'playground'},
      {label: 'GitHub', href: 'https://github.com/vazco/uniforms'}
    ]
  },
  headerIcon: 'img/uniforms.svg',
  favicon: 'favicon.ico',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.json')
        }
      }
    ]
  ]
};
