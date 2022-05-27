import Layout from '@theme/Layout';
import React from 'react';

import { Playground } from '../components/Playground';

export default function PlaygroundPage() {
  return (
    <Layout
      title="Check how it works | uniforms"
      description="Check how uniforms work, and enjoy the schema-first approach of one of the most popular React form libraries and enjoy building forms like never before."
    >
      <Playground />
    </Layout>
  );
}
