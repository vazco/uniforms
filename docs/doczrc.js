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
    showPlaygroundEditor: true
  }
};
