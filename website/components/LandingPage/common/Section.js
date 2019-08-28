import React from 'react';
import classNames from 'classnames';

import styles from '../index.module.css';

export default function Section({ children, className, ...props }) {
  return (
    <div {...props} className={classNames('row', styles.section, className)}>
      {children}
    </div>
  );
}
