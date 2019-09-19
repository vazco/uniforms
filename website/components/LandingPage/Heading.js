import React from 'react';
import classNames from 'classnames';

import styles from './index.module.css';

export default function Heading({ children, className, ...props }) {
  return (
    <h1 {...props} className={classNames(styles.heading, className)}>
      {children}
    </h1>
  );
}
