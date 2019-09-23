import React from 'react';
import classNames from 'classnames';

import styles from './index.module.css';

export default function Subtitle({ children, className, ...props }) {
  return (
    <p
      {...props}
      className={classNames(styles.text, styles['section-subtitle'], className)}
    >
      {children}
    </p>
  );
}
