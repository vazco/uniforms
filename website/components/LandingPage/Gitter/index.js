import React from 'react';
import classNames from 'classnames';

import Heading from '../common/Heading';
import Button from '../common/Button';
import styles from '../index.module.css';

export default function Gitter() {
  return (
    <div className={classNames('container', styles.section)}>
      <Heading centered>If You want to know more – join us at Gitter!</Heading>
      <Button centered to="https://gitter.im/vazco/uniforms">
        Our Gitter
      </Button>
    </div>
  );
}
