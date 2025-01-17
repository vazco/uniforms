import React from 'react';

import Matrix from './compare-matrix-landing.md';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import styles from '../../css/index.module.css';

export function Comparison() {
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
          <Button to="/docs/introduction/comparison-table">Read more</Button>
        </div>
      </div>
    </div>
  );
}
