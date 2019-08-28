import React from 'react';
import classNames from 'classnames';

import Heading from '../common/Heading';
import styles from '../index.module.css';

export default function Gitter() {
  return (
    <div className={classNames('container', styles.section)}>
      <Heading centered>If You want to know more – join us at Gitter!</Heading>
      <button
        className={classNames(
          'button button--lg button--primary',
          styles.centered,
          styles['call-to-action']
        )}
      >
        Our Gitter
      </button>
    </div>
  );
}
