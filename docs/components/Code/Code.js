import React from 'react';
import CodeBlock from '@theme/CodeBlock';

function Code({ children, language }) {
  return (
    // TODO: Move this to outer .css, or apply class from docusaurus
    <span style={{ fontSize: '.9em' }}>
      <CodeBlock children={children} className={language} />
    </span>
  );
}

export default Code;
