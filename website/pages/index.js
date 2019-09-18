import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Layout from '@theme/Layout';
import LandingPage from '../components/LandingPage';

export default function HomePage() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  const { tagline: description, customFields: { keywords } = {} } = siteConfig;
  return (
    <Layout keywords={keywords} description={description}>
      <LandingPage />
    </Layout>
  );
}
