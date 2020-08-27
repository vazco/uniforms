import classNames from 'classnames';
import React from 'react';

import styles from '../index.module.css';

export type OvalProps = JSX.IntrinsicElements['span'];

export function Oval({ children, className, ...props }: OvalProps) {
  return (
    <span {...props} className={classNames(styles.oval, className)}>
      {children}
    </span>
  );
}
