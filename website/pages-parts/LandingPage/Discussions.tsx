import React from 'react';

import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import styles from '../../index.module.css';

export function Discussions() {
  return (
    <div className="section text--center">
      <Heading>
        If You want to know more – join us at GitHub Discussions!
      </Heading>
      <Button
        className={styles.discussions}
        to="https://github.com/vazco/uniforms/discussions"
      >
        GitHub Discussions
      </Button>
    </div>
  );
}
