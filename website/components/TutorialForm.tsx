import React, { ReactNode } from 'react';

import { themeContext } from '../lib/universal';
import { FormWrapper } from './FormWrapper';
import { Tabs } from './Tabs';

const tabs = [
  { name: 'Semantic', value: 'semantic' as const },
  { name: 'MUI', value: 'mui' as const },
  { name: 'Bootstrap4', value: 'bootstrap4' as const },
  { name: 'Bootstrap5', value: 'bootstrap5' as const },
  { name: 'AntD', value: 'antd' as const },
  { name: 'Unstyled', value: 'unstyled' as const },
];

export type TutorialFormProps = { children: ReactNode };

export function TutorialForm({ children }: TutorialFormProps) {
  return (
    <Tabs group="tutorial" tabs={tabs}>
      {({ value: theme }) => (
        <themeContext.Provider value={theme}>
          <FormWrapper>{children}</FormWrapper>
        </themeContext.Provider>
      )}
    </Tabs>
  );
}
