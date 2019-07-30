import Link from '@docusaurus/Link';
import React from 'react';

import Matrix from '../../../docs/compare-matrix-landing.md';
import { Row } from './Grid';

export default function CompareMatrix() {
  return (
    <Row>
      <h2>Comparison with similar libraries.</h2>
      <Matrix />
      <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
        <Link to="/docs/compare-matrix">Read more</Link>
      </div>
    </Row>
  );
}
