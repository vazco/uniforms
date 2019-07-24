import React from 'react';

import Matrix from '../../../docs/compare-matrix.md';
import { Row } from './Grid';

export default function CompareMatrix() {
  return (
    <Row>
      <h2>Comparison with similar libraries.</h2>
      <Matrix />
      <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
        <a href="/docs/api-forms">Read more</a>
      </div>
    </Row>
  );
}
