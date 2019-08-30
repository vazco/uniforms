import React from 'react';

import Heading from '../common/Heading';
import Section from '../common/Section';
import Button from '../common/Button';
import Matrix from '../../../../docs/compare-matrix-landing.md';

import styles from '../index.module.css';

export default function Comparison() {
  return (
    <>
      <Heading centered>
        Comparison
        <br />
        with similar libraries
      </Heading>
      <Section>
        <div className="col col--8 col--offset-2">
          <Matrix />
          <div className={styles.centered}>
            <Button to="/docs/compare-matrix">Read more</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
