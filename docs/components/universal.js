const antd = require('uniforms-antd');
const bootstrap3 = require('uniforms-bootstrap3');
const bootstrap4 = require('uniforms-bootstrap4');
const material = require('uniforms-material');
const semantic = require('uniforms-semantic');
const unstyled = require('uniforms-unstyled');
const React = require('react');

const { themeContext } = require('./ThemeContext');

const themes = {
  antd,
  bootstrap3,
  bootstrap4,
  material,
  semantic,
  unstyled
};

module.exports = {};

Object.keys(unstyled).forEach(component => {
  const renderThemedComponent = props => {
    const theme = React.useContext(themeContext);
    const Component = themes[theme][component];
    return <Component key={theme} {...props} />;
  };

  module.exports[component] = renderThemedComponent;
});
