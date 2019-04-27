module.exports = {
  title: 'uniforms',
  tagline: 'A set of React libraries for building forms.',
  organizationName: 'vazco',
  projectName: 'uniforms',
  baseUrl: '/uniforms/',
  url: 'https://vazco.github.io/',
  headerLinks: [{label: 'Docs', doc: 'installation'}, {label: 'Playground', page: 'playground'}],
  headerIcon: 'img/uniforms.svg',
  favicon: 'favicon.ico',
  plugins: [
    {
      name: '@docusaurus/plugin-content-docs',
      options: {path: '../docs', sidebarPath: require.resolve('./sidebars.json')}
    },
    {
      name: '@docusaurus/plugin-content-pages'
    }
  ]
};
