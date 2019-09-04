import React from 'react';

import Layout from '@theme/Layout';

import LandingPage from '../components/LandingPage';

const keywords = [
  'forms in react',
  'react forms',
  'react forms best practices',
  'react forms examples',
  'React Form Builder'
];

export default function HomePage() {
  return (
    <Layout keywords={keywords}>
      <LandingPage />
    </Layout>
  );
}
