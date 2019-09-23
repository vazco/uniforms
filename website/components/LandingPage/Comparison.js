import React from 'react';

import Button from './Button';
import Heading from './Heading';
import Matrix from '../../../docs/compare-matrix-landing.md';
import styles from './index.module.css';

export default function Comparison() {
  return (
    <div className="section text--center">
      <Heading>
        Comparison
        <br />
        with similar libraries
      </Heading>
      <div className="col col--8 col--offset-2">
        <Matrix />
        <div className={styles.centered}>
          <Button to="/docs/compare-matrix">Read more</Button>
        </div>
      </div>
    </div>
  );
}
