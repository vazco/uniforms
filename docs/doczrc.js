import {css} from 'docz-plugin-css';

export default {
  base: '/uniforms/',
  title: 'uniforms',
  description: 'uniforms: A set of React libraries for building forms.',
  hashRouter: true,
  codeSandbox: false,
  propsParser: false,
  plugins: [css({preprocessor: 'postcss'})],
  themeConfig: {
    showPlaygroundEditor: true,
    styles: {
      h1: {
        fontFamily: 'initial'
      }
    }
  },
  menu: [
    {name: 'Introduction', menu: ['Installation', 'Quick start', 'Overview']},
    'Playground',
    'Forms',
    'Fields',
    {name: 'Schemas', menu: ['Concept', 'GraphQL', 'JSON Schema', 'SimpleSchema']},
    {name: 'Examples', menu: []},
    {name: 'Advanced topics', menu: ['Context data']},
    {name: 'FAQ', menu: []},
    {name: 'API', menu: []}
  ]
};
