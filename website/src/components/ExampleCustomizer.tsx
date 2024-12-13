import React, { ComponentType } from 'react';
import { Box, Code, Database } from 'react-feather';

import { themeContext } from '../lib/universal';
import { CodeSection } from './CodeSection';
import { FormWrapper } from './FormWrapper';
import { TogglerTabs } from './TogglerTabs';

const tabs = [
  { name: 'Semantic', value: 'semantic' as const },
  { name: 'MUI', value: 'mui' as const },
  { name: 'Bootstrap4', value: 'bootstrap4' as const },
  { name: 'Bootstrap5', value: 'bootstrap5' as const },
  { name: 'AntD', value: 'antd' as const },
  { name: 'Unstyled', value: 'unstyled' as const },
];

const toggles = [
  { icon: <Box />, name: 'Example', tooltipText: 'Show example' },
  { icon: <Code />, name: 'Code', tooltipText: 'Show source code' },
  { icon: <Database />, name: 'Schema', tooltipText: 'Show schema' },
];

export type ExampleCustomizerProps = {
  code: { default: string };
  example: ComponentType;
  schema: { default: string };
};

export function ExampleCustomizer({
  code: { default: code },
  example: Example,
  schema: { default: schema },
}: ExampleCustomizerProps) {
  return (
    <TogglerTabs group="examples" tabsItems={tabs} togglerItems={toggles}>
      {({ tab: { value: theme }, toggle: { name } }) => {
        switch (name) {
          case 'Code':
            return (
              <CodeSection
                language="tsx"
                replace={{ "'[^']*?/universal'": `'uniforms-${theme}'` }}
                source={code}
              />
            );
          case 'Example':
            return (
              <themeContext.Provider value={theme}>
                <FormWrapper>
                  <Example />
                </FormWrapper>
              </themeContext.Provider>
            );
          case 'Schema':
            return <CodeSection language="tsx" source={schema} />;
          default:
            return null;
        }
      }}
    </TogglerTabs>
  );
}
