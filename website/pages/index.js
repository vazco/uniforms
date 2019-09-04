import React from 'react';

import Layout from '@theme/Layout';

import LandingPage from '../components/LandingPage';

const keywords = ['forms', 'react', 'schema'];

export default function HomePage() {
  return (
    <Layout keywords={keywords}>
      <LandingPage />
    </Layout>
  );
}
