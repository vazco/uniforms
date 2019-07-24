import React from 'react';
import { ThemeProvider } from './ThemeContext';
import FormWrapper from './FormWrapper';
import Tabs from './Tabs';

const tabs = [
  { name: 'Semantic', value: 'semantic' },
  { name: 'Material', value: 'material' },
  { name: 'Bootstrap3', value: 'bootstrap3' },
  { name: 'Bootstrap4', value: 'bootstrap4' },
  { name: 'AntD', value: 'antd' },
  { name: 'Unstyled', value: 'unstyled' }
];

const TutorialForm = ({ children }) => (
  <Tabs group="tutorial" tabs={tabs}>
    {({ value: theme }) => (
      <ThemeProvider value={theme}>
        <FormWrapper>{children}</FormWrapper>
      </ThemeProvider>
    )}
  </Tabs>
);

export default TutorialForm;
