import Layout from '@theme/Layout';
import React from 'react';

import { Playground } from '../components/Playground';

export default function PlaygroundPage() {
  return (
    <Layout
      title="Check how it works | uniforms"
      description="Check how uniforms work, enjoy the schema-first approach of one of the most popular React form libraries, and build forms as easily as never before."
    >
      <Playground />
    </Layout>
  );
}
