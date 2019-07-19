import React from 'react';
import CodeBlock from '@theme/CodeBlock';

function Code({ children, language }) {
  return <CodeBlock children={children} className={language} />;
}

export default Code;
