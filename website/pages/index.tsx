import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/utils';
import Layout from '@theme/Layout';
import React from 'react';

import { LandingPage } from '../pages-parts/LandingPage/LandingPage';

ClassNameGenerator.configure(componentName => `😡-${componentName}`);

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
