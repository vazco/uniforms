import React from 'react';

import Button from '../common/Button';
import Heading from '../common/Heading';
import styles from '../index.module.css';

export default function Gitter() {
  return (
    <div className="section text--center">
      <Heading>If You want to know more – join us at Gitter!</Heading>
      <Button className={styles.gitter} to="https://gitter.im/vazco/uniforms">
        Our Gitter
      </Button>
    </div>
  );
}
