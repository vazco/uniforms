import React from 'react';
import classNames from 'classnames';

import styles from './index.module.css';

export default function Oval({ children, className, size, ...props }) {
  return (
    <span
      {...props}
      style={size && { width: `${size}`, height: `${size}` }}
      className={classNames(styles.oval, className)}
    >
      {children}
    </span>
  );
}
