import React from 'react';
import {
  Box as BoxIcon,
  Code as CodeIcon,
  Database as DatabaseIcon
} from 'react-feather';

import CodeSection from './CodeSection';
import FormWrapper from './FormWrapper';
import TogglerTabs from './TogglerTabs';
import { ThemeProvider } from './ThemeContext';

const tabs = [
  { name: 'Semantic', value: 'semantic' },
  { name: 'Material', value: 'material' },
  { name: 'Bootstrap3', value: 'bootstrap3' },
  { name: 'Bootstrap4', value: 'bootstrap4' },
  { name: 'AntD', value: 'antd' },
  { name: 'Unstyled', value: 'unstyled' }
];

const toggles = [
  {
    name: 'Example',
    tooltipText: 'Show example',
    icon: <BoxIcon />,
    active: true
  },
  { name: 'Code', tooltipText: 'Show source code', icon: <CodeIcon /> },
  { name: 'Schema', tooltipText: 'Show schema', icon: <DatabaseIcon /> }
];

export default function ExampleCustomizer({
  code: { default: code },
  example: { default: Example },
  schema: { default: schema }
}) {
  return (
    <TogglerTabs group="examples" tabsItems={tabs} togglerItems={toggles}>
      {({ tab: { value: theme }, toggle: { name } }) => {
        switch (name) {
          case 'Code':
            return (
              <CodeSection
                language="js"
                replace={{ "'[^']*?/universal'": `'uniforms-${theme}'` }}
                source={code}
              />
            );
          case 'Example':
            return (
              <ThemeProvider value={theme}>
                <FormWrapper>
                  <Example />
                </FormWrapper>
              </ThemeProvider>
            );
          case 'Schema':
            return <CodeSection language="js" source={schema} />;
          default:
            return null;
        }
      }}
    </TogglerTabs>
  );
}
