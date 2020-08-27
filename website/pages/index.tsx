import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';

import { LandingPage } from '../pages-parts/LandingPage/LandingPage';

export default function IndexPage() {
  const context = useDocusaurusContext();
  const {
    customFields: { keywords },
    tagline,
  } = context.siteConfig;

  return (
    <Layout description={tagline} keywords={keywords}>
      <LandingPage />
    </Layout>
  );
}
