import Layout from '@theme/Layout';
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import LandingPage from '../components/LandingPage';

export default function HomePage() {
  const context = useDocusaurusContext();
  const {
    customFields: { keywords },
    tagline
  } = context.siteConfig;

  return (
    <Layout keywords={keywords} description={tagline}>
      <LandingPage />
    </Layout>
  );
}
