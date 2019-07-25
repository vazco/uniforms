import DocusaurusContext from '@docusaurus/context';
import Link from '@docusaurus/Link';
import React, { useContext } from 'react';

import Matrix from '../../../docs/compare-matrix.md';
import { Row } from './Grid';

export default function CompareMatrix() {
  const { siteConfig } = useContext(DocusaurusContext);

  return (
    <Row>
      <h2>Comparison with similar libraries.</h2>
      <Matrix />
      <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
        <Link to={`${siteConfig.baseUrl}docs/api-forms`}>Read more</Link>
      </div>
    </Row>
  );
}
