import React from 'react';

import styles from '../../index.module.css';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';

export function Gitter() {
  return (
    <div className="section text--center">
      <Heading>If You want to know more – join us at Gitter!</Heading>
      <Button className={styles.gitter} to="https://gitter.im/vazco/uniforms">
        Our Gitter
      </Button>
    </div>
  );
}
