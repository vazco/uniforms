import React from 'react';

const commonStyles = `
  body {
    margin: 0;
  }

  textarea[name="schema"] {
    font-family: monospace !important;
    min-height: 20em !important;
  }

  .frame-root {
    padding: 1rem !important;
  }
`;

const common = <style children={commonStyles} key="common" />;

const style = links =>
  links
    .map((link, index) => <link key={index} rel="stylesheet" href={link} />)
    .concat(common);
const styles = {
  antd: style([
    'https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.min.css'
  ]),

  bootstrap3: style([
    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css'
  ]),

  bootstrap4: style([
    'https://cdnjs.cloudflare.com/ajax/libs/octicons/3.5.0/octicons.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css'
  ]),

  material: style([]),

  semantic: style([
    'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.css'
  ]),

  unstyled: style([])
};

export default styles;
