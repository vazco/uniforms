import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/utils';
import Layout from '@theme/Layout';
import React from 'react';

import { Playground } from '../components/Playground';

ClassNameGenerator.configure(componentName => `😡φ(*￣0￣)-${componentName}`);

export default function PlaygroundPage() {
  return (
    <Layout>
      <Playground />
    </Layout>
  );
}
